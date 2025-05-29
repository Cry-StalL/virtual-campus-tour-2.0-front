<template>
  <div class="panorama-container">
    <div v-if="!errorMessage" id="panorama-viewer" ref="viewerContainer"></div>
    <div v-else class="error-overlay">
      <div class="error-content">
        <el-icon class="error-icon"><Warning /></el-icon>
        <div class="error-message">{{ errorMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { ElMessage, ElIcon } from 'element-plus';
import { ref, onMounted, onBeforeUnmount, watch, shallowRef } from 'vue';
import { ElIcon } from 'element-plus';
import { Warning } from '@element-plus/icons-vue';
import { useThreeJsSetup } from './composables/useThreeJsSetup';
import { useCoordinateConverter } from './composables/useCoordinateConverter';
import { useErrorHandler } from './composables/useErrorHandler';
import type { PanoramaViewerProps, HotSpot, Scene } from './composables/types';

// 定义事件
const emit = defineEmits<{
  (e: 'hotspotClick', hotspot: HotSpot): void;
  (e: 'sceneChange', index: number): void;
  (e: 'error', message: string): void;
  (e: 'coordinateSelected', coordinates: { longitude: number; latitude: number; sceneId: string }): void;
}>();

// 定义组件的props
const props = withDefaults(defineProps<PanoramaViewerProps>(), {
  initialFov: 75,
  minFov: 30,
  maxFov: 90,
  rotateSpeed: -0.15,
  zoomSpeed: 2.0,
  dampingFactor: 0.1,
  fovDampingFactor: 0.1,
  debug: false
});

const viewerContainer = ref<HTMLElement | null>(null);

// 初始化错误处理器
const { errorMessage, showError, hideError } = useErrorHandler(emit);

// 初始化 Three.js 环境
const {
  scene,
  camera,
  renderer,
  controls,
  initThreeJs,
  animate,
  onWindowResize,
  onMouseWheel,
  disposeThreeJs,
} = useThreeJsSetup(viewerContainer, props);

// 初始化坐标转换工具
const {
  latLonToVector3,
  vector3ToLatLon,
  convertScreenToSphericalCoordinates
} = useCoordinateConverter(camera, renderer, scene);

// 使用shallowRef保存Three.js对象，避免响应式系统代理干扰
const hotspotObjects = shallowRef<THREE.Object3D[]>([]);
const currentSceneIndex = ref<number>(0);
const currentSceneId = ref<string>('');
const currentSphere = shallowRef<THREE.Mesh | null>(null);

// 验证场景ID是否重复
const validateSceneIds = (): boolean => {
  const sceneIds = new Set<string>();
  for (const scene of props.scenes) {
    if (sceneIds.has(scene.sceneId)) {
      showError(`场景ID重复: ${scene.sceneId}`);
      return false;
    }
    sceneIds.add(scene.sceneId);
  }
  return true;
};

// 验证热点配置
const validateHotspot = (hotspot: HotSpot): boolean => {
  if (hotspot.type === 'scene') {
    if (!hotspot.targetSceneId) {
      showError(`热点配置错误: 热点ID "${hotspot.id}" 的类型为 "scene"，但未提供 targetSceneId`);
      return false;
    }
    
    const targetSceneExists = props.scenes.some(scene => scene.sceneId === hotspot.targetSceneId);
    if (!targetSceneExists) {
      showError(`热点配置错误: 热点ID "${hotspot.id}" 的目标场景 "${hotspot.targetSceneId}" 不存在`);
      return false;
    }
  } else if (hotspot.type === 'custom') {
    // custom 类型不需要特别的验证，因为它完全依赖用户自定义的点击处理函数
    return true;
  } else {
    showError(`热点配置错误: 热点ID "${hotspot.id}" 的类型 "${hotspot.type}" 未知`);
    return false;
  }
  
  return true;
};

// 创建热点
const createHotspot = (hotspot: HotSpot) => {
  if (!scene.value || !validateHotspot(hotspot)) return null;
  
  let material: THREE.SpriteMaterial | THREE.MeshBasicMaterial;
  let hotspotObject: THREE.Sprite | THREE.Mesh;
  
  if (hotspot.icon) {
    // 使用图标作为热点
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(hotspot.icon);
    material = new THREE.SpriteMaterial({ 
      map: texture,
      transparent: true,
      depthTest: false
    });
    
    const sprite = new THREE.Sprite(material as THREE.SpriteMaterial);
    sprite.scale.set(20, 20, 1);
    
    // 设置热点位置
    const position = latLonToVector3(hotspot.latitude, hotspot.longitude, 490);
    sprite.position.copy(position);
    
    // 添加热点数据
    (sprite as any).hotspotData = hotspot;
    // 添加热点类名
    (sprite as any).userData = { class: 'hotspot' };
    
    // 添加到场景
    scene.value.add(sprite);
    
    // 使用非响应式方式更新数组
    const newHotspots = [...hotspotObjects.value];
    newHotspots.push(sprite);
    hotspotObjects.value = newHotspots;
    
    return sprite;
  } else {
    // 使用默认几何体作为热点
    const geometry = new THREE.SphereGeometry(5, 16, 16);
    material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.8
    });
    
    const hotspotMesh = new THREE.Mesh(geometry, material);
    
    // 设置热点位置
    const position = latLonToVector3(hotspot.latitude, hotspot.longitude, 490);
    hotspotMesh.position.copy(position);
    
    // 添加热点数据
    (hotspotMesh as any).hotspotData = hotspot;
    // 添加热点类名
    (hotspotMesh as any).userData = { class: 'hotspot' };
    
    // 添加到场景
    scene.add(hotspotMesh);
    hotspotObjects.push(hotspotMesh);
    hotspotObject = hotspotMesh;
  }

  // 创建消息预览标签
  if (hotspot.description) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-hotspot-preview';
    messageDiv.innerHTML = `
      <div class="message-hotspot-content">
        ${hotspot.description}
      </div>
      <div class="message-hotspot-anchor"></div>
    `;
    scene.value.add(hotspotMesh);
    
    // 使用非响应式方式更新数组
    const newHotspots = [...hotspotObjects.value];
    newHotspots.push(hotspotMesh);
    hotspotObjects.value = newHotspots;
    
    const label = new CSS2DObject(messageDiv);
    label.position.copy(hotspotObject.position);
    label.position.y += 20; // 向上偏移，使标签显示在热点上方
    
    scene.add(label);
    hotspotObjects.push(label as any);
  }
  
  return hotspotObject;
};

// 处理热点点击
const handleHotspotClick = (hotspot: HotSpot) => {
  if (!validateHotspot(hotspot)) {
    return;
  }

  if (hotspot.type === 'scene' && hotspot.targetSceneId) {
    switchScene(hotspot.targetSceneId);
  } else if (hotspot.type === 'custom') {
    // 对于自定义热点，触发hotspotClick事件，由父组件处理
    emit('hotspotClick', hotspot);
    
    // 如果提供了onClick回调，则调用它
    if (typeof hotspot.onClick === 'function') {
      hotspot.onClick(hotspot.onClickParams);
    }
  }
};

// 清除所有热点
const clearHotspots = () => {
  if (!scene.value) return;
  
  for (const obj of hotspotObjects.value) {
    scene.value?.remove(obj);
  }
  
  hotspotObjects.value = [];
};

// 切换场景
const switchScene = (target: number | string) => {
  if (!scene.value) return;
  
  let targetIndex: number;
  
  if (typeof target === 'string') {
    // 通过场景ID查找索引
    targetIndex = props.scenes.findIndex(s => s.sceneId === target);
    if (targetIndex === -1) {
      showError(`未找到场景ID: ${target}`);
      return;
    }
  } else {
    // 直接使用索引
    targetIndex = target;
    if (targetIndex < 0 || targetIndex >= props.scenes.length) {
      showError(`场景索引超出范围: ${targetIndex}`);
      return;
    }
  }
  
  currentSceneIndex.value = targetIndex;
  const newScene = props.scenes[targetIndex];
  currentSceneId.value = newScene.sceneId;
  
  // 移除当前全景球体
  if (currentSphere.value && scene.value) {
    scene.value.remove(currentSphere.value);
    currentSphere.value = null;
  }
  
  // 清除现有热点
  clearHotspots();
  
  // 加载新场景的全景图
  const textureLoader = new THREE.TextureLoader();
  
  textureLoader.load(
    newScene.imagePath,
    (texture: THREE.Texture) => {
      if (!scene.value) return;
      
      // 设置正确的色彩空间，防止图像过亮
      texture.colorSpace = THREE.SRGBColorSpace;
      
      // 提高纹理质量设置
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = renderer.value?.capabilities.getMaxAnisotropy() || 1;
      
      // 使用更高分辨率的球体几何体
      const geometry = new THREE.SphereGeometry(500, 96, 64); 
      geometry.scale(-1, 1, 1); 
      
      const material = new THREE.MeshBasicMaterial({
        map: texture
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      scene.value.add(mesh);
      currentSphere.value = mesh;
      
      // 初始化热点
      if (newScene.hotspots) {
        newScene.hotspots.forEach(hotspot => {
          createHotspot(hotspot);
        });
      }
      
      // 触发场景切换事件
      emit('sceneChange', targetIndex);
    },
    undefined,
    (err: unknown) => {
      const errorMessage = err instanceof Error ? err.message : '未知错误';
      showError(`加载场景图片失败: ${errorMessage}`);
    }
  );
};

// 获取当前场景ID
const getCurrentSceneId = (): string => {
  return currentSceneId.value;
};

// 处理场景点击
const handleSceneClick = (event: MouseEvent) => {
  if (!camera.value || !renderer.value || !scene.value) return;

  // 计算归一化的设备坐标
  const mouse = new THREE.Vector2();
  const rect = renderer.value.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera.value);

  // 首先检查是否点击到热点，是的话直接return
  const hotspotIntersects = raycaster.intersectObjects(hotspotObjects.value);
  if (hotspotIntersects.length > 0) {
    const hotspotData = (hotspotIntersects[0].object as any).hotspotData as HotSpot;
    handleHotspotClick(hotspotData);
    // 点击后立即重置光标样式
    renderer.value.domElement.style.cursor = 'default';
    return;
  }

  // 获取点击位置的坐标
  const coordinates = convertScreenToSphericalCoordinates(event.clientX, event.clientY);
  
  if (!coordinates) return;

  // 创建完整的坐标数据，包含当前场景ID
  const coordinateData = {
    ...coordinates,
    sceneId: currentSceneId.value
  };

  // 如果在debug模式下，打印到控制台
  if (props.debug) {
    console.log('点击位置坐标:', coordinates);
  }
  
  // 触发坐标选择事件
  emit('coordinateSelected', coordinateData);
};

// 添加鼠标移动事件处理
const handleMouseMove = (event: MouseEvent) => {
  if (!camera.value || !renderer.value || !scene.value) return;

  // 计算归一化的设备坐标
  const mouse = new THREE.Vector2();
  const rect = renderer.value.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera.value);

  // 检查是否悬停在热点上
  const hotspotIntersects = raycaster.intersectObjects(hotspotObjects.value);
  // 只有当鼠标移动时才更新光标样式
  if (event.type === 'mousemove') {
    renderer.value.domElement.style.cursor = hotspotIntersects.length > 0 ? 'pointer' : 'default';
  }
};

// 获取3D坐标点
const getCoordinateFromClick = (event: MouseEvent): { longitude: number; latitude: number; sceneId: string } | null => {
  const coordinates = convertScreenToSphericalCoordinates(event.clientX, event.clientY);
  if (!coordinates) return null;
  
  return {
    ...coordinates,
    sceneId: currentSceneId.value
  };
};

// 监听场景数组变化
watch(() => props.scenes, () => {
  if (!validateSceneIds()) {
    return;
  }
}, { deep: true });

onMounted(() => {
  // 初始化 Three.js 环境
  initThreeJs();
  
  // 创建场景
  scene = new THREE.Scene();
  
  // 创建相机
  camera = new THREE.PerspectiveCamera(
    props.initialFov,
    viewerContainer.value.clientWidth / viewerContainer.value.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 0.1);
  currentFov = targetFov = camera.fov;
  
  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(viewerContainer.value.clientWidth, viewerContainer.value.clientHeight);
  renderer.domElement.style.cursor = 'default';
  renderer.setPixelRatio(window.devicePixelRatio);
  viewerContainer.value.appendChild(renderer.domElement);

  // 创建CSS2D渲染器
  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(viewerContainer.value.clientWidth, viewerContainer.value.clientHeight);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0';
  labelRenderer.domElement.style.pointerEvents = 'none';
  viewerContainer.value.appendChild(labelRenderer.domElement);
  
  // 添加控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
  controls.enablePan = false;
  controls.rotateSpeed = props.rotateSpeed;
  controls.minDistance = 0.1;
  controls.maxDistance = 100;
  controls.zoomSpeed = props.zoomSpeed;
  controls.enableDamping = true;
  controls.dampingFactor = props.dampingFactor;
  
  // 添加鼠标滚轮事件监听
  viewerContainer.value.addEventListener('wheel', onMouseWheel, { passive: false });
  
  // 添加热点点击事件监听
  viewerContainer.value?.addEventListener('click', handleSceneClick);
  viewerContainer.value?.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', onWindowResize);
  
  // 加载第一个场景
  if (props.scenes.length > 0) {
    switchScene(0);
  }
  
  // 开始动画循环
  animate();
};

// 处理鼠标滚轮事件
const onMouseWheel = (event: WheelEvent) => {
  event.preventDefault();
  
  if (!camera) return;
  
  const delta = Math.sign(event.deltaY);
  targetFov += delta * props.zoomSpeed;
  
  // 限制目标FOV范围
  targetFov = Math.max(props.minFov, Math.min(props.maxFov, targetFov));
};

const animate = () => {
  if (!scene || !camera || !renderer || !labelRenderer) return;
  
  isAnimating = true;
  
  const animateFrame = () => {
    if (!isAnimating) return;
    
    // 应用FOV缩放惯性
    if (camera && Math.abs(currentFov - targetFov) > 0.01) {
      currentFov += (targetFov - currentFov) * props.fovDampingFactor;
      camera.fov = currentFov;
      camera.updateProjectionMatrix();
    }
    
    controls?.update();
    renderer?.render(scene!, camera!);
    labelRenderer?.render(scene!, camera!);
    requestAnimationFrame(animateFrame);
  };
  
  animateFrame();
};

const onWindowResize = () => {
  if (!camera || !renderer || !labelRenderer || !viewerContainer.value) return;
  
  camera.aspect = viewerContainer.value.clientWidth / viewerContainer.value.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(viewerContainer.value.clientWidth, viewerContainer.value.clientHeight);
  labelRenderer.setSize(viewerContainer.value.clientWidth, viewerContainer.value.clientHeight);
};

onMounted(() => {
  initPanorama();
  // 添加鼠标移动事件监听
  viewerContainer.value?.addEventListener('mousemove', handleMouseMove);
});

onBeforeUnmount(() => {
  // 移除事件监听
  if (viewerContainer.value) {
    viewerContainer.value.removeEventListener('wheel', onMouseWheel);
    viewerContainer.value.removeEventListener('click', handleSceneClick);
    viewerContainer.value.removeEventListener('mousemove', handleMouseMove);
  }
  
  window.removeEventListener('resize', onWindowResize);
  
  if (renderer && viewerContainer.value) {
    viewerContainer.value.removeChild(renderer.domElement);
  }
  
  if (labelRenderer && viewerContainer.value) {
    viewerContainer.value.removeChild(labelRenderer.domElement);
  }
  
  controls?.dispose();
  scene = null;
  camera = null;
  renderer = null;
  labelRenderer = null;
  controls = null;
  
  // 清理资源
  disposeThreeJs();
});

// 暴露方法
defineExpose({
  switchScene,
  showError,
  hideError,
  getCurrentSceneId,
  getCoordinateFromClick,
  convertScreenToSphericalCoordinates
});
</script>

<style scoped>
.panorama-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 0;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

#panorama-viewer {
  width: 100%;
  height: 100%;
  border-radius: 0;
  overflow: hidden;
}

#panorama-viewer :deep(.hotspot) {
  cursor: pointer;
}

/* 消息预览框样式 */
:deep(.message-hotspot-preview) {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 240, 240, 0.95) 100%);
  border-radius: 8px;
  padding: 8px 12px;
  color: #666666;
  font-size: 13px;
  min-width: 120px;
  max-width: 180px;
  min-height: 32px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(4px);
  transform: translate(-50%, -100%);
  margin-top: -16px;
  pointer-events: none;
  border: 1px solid rgba(0, 0, 0, 0.08);
  line-height: 1.4;
}

:deep(.message-hotspot-content) {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 24px;
  word-break: break-word;
  color: #666666;
  font-weight: 500;
}

:deep(.message-hotspot-anchor) {
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
  width: 1.5px;
  height: 16px;
  background-color: #ffffff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
}

:deep(.message-hotspot-anchor::after) {
  content: "";
  position: absolute;
  bottom: -4px;
  left: -3px;
  width: 8px;
  height: 8px;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.error-content {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  text-align: center;
  max-width: 80%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.error-icon {
  font-size: 48px;
  color: #F56C6C;
  margin-bottom: 20px;
}

.error-message {
  font-size: 18px;
  color: #303133;
  word-break: break-word;
}
</style>