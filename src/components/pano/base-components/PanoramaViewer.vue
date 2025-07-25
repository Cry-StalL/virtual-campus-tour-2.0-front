<template>
  <div class="panorama-container">
    <div v-if="!errorMessage" id="panorama-viewer" ref="viewerContainer"></div>
    <div v-else class="error-overlay">
      <div class="error-content">
        <el-icon class="error-icon"><Warning /></el-icon>
        <div class="error-message">{{ errorMessage }}</div>
      </div>
    </div>

    <!-- 加载进度条 -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <div class="loading-text">
          正在加载全景图<span class="loading-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </div>
        <div class="loading-progress-container">
          <div class="loading-progress-bar">
            <div 
              class="loading-progress-fill" 
              :style="{ width: loadingProgress + '%' }"
            ></div>
          </div>
          <div class="loading-progress-text">{{ Math.round(loadingProgress) }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, shallowRef, nextTick } from 'vue';
import { ElIcon, ElMessage } from 'element-plus';
import { Warning } from '@element-plus/icons-vue';
import { useThreeJsSetup } from './composables/useThreeJsSetup';
import { useCoordinateConverter } from './composables/useCoordinateConverter';
import { useErrorHandler } from './composables/useErrorHandler';
import type { PanoramaViewerProps, HotSpot, Scene } from './composables/types';
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { APP_CONFIG, API_CONFIG } from '@/config/config';

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
  debug: false,
  progressiveLoading: false,
  resolutions: () => ["1920x960", "3840x1920", "7680x3840"],
  initialScene: 0
});

const viewerContainer = ref<HTMLElement | null>(null);

// 加载进度状态
const isLoading = ref(false);
const loadingProgress = ref(0);

// 初始化错误处理器
const { errorMessage, showError, hideError } = useErrorHandler(emit);

// 初始化 Three.js 环境
const {
  scene,
  camera,
  renderer,
  labelRenderer,
  controls,
  initThreeJs,
  animate,
  onWindowResize,
  onMouseWheel,
  disposeThreeJs,
  resetAutoRotate,
} = useThreeJsSetup(viewerContainer, {
  initialFov: props.initialFov,
  minFov: props.minFov,
  maxFov: props.maxFov,
  rotateSpeed: props.rotateSpeed,
  zoomSpeed: props.zoomSpeed,
  dampingFactor: props.dampingFactor,
  fovDampingFactor: props.fovDampingFactor,
  minLongitude: props.minLongitude,
  maxLongitude: props.maxLongitude,
  minLatitude: props.minLatitude,
  maxLatitude: props.maxLatitude
});

let hotspotObject: THREE.Sprite | THREE.Mesh;

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

// 获取完整的图片 URL
const getFullImageUrl = (relativeImagePath: string): string => {
  // return "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/aabbcc.jpg";
  // alert(relativeImagePath);
  const base = import.meta.env.VITE_OSS_BASE_URL
  const rel = relativeImagePath.replace(/^\//, '');
  return `${base}/${rel}`;
};

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
  if (hotspot.type === 'switchScene') {
    if (!hotspot.targetSceneId) {
      showError(`热点配置错误: 热点ID "${hotspot.id}" 的类型为 "switchScene"，但未提供 targetSceneId`);
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
  } else if (hotspot.type === 'enterSceneViewer') {
    // enterSceneViewer 类型不需要额外验证
    return true;
  } else if (hotspot.type === 'aerial') {
    // aerial 类型需要验证 targetStreetSceneId
    if (!hotspot.targetStreetSceneId) {
      showError(`热点配置错误: 热点ID "${hotspot.id}" 的类型为 "aerial"，但未提供 targetStreetSceneId`);
      return false;
    }
    return true;
  }
  else {
    showError(`热点配置错误: 热点ID "${hotspot.id}" 的类型 "${hotspot.type}" 未知`);
    return false;
  }
  
  return true;
};

// 创建热点
const createHotspot = (hotspot: HotSpot) => {
  if (!scene.value || !validateHotspot(hotspot)) return null;

  // 自动绑定icon
  if (!hotspot.icon) {
    if (hotspot.type === 'switchScene') {
      hotspot.icon = '/icons/arrow_hotspot.png';
    } else if (hotspot.type === 'enterSceneViewer') {
      hotspot.icon = '/icons/scene_hotspot.png';
    } else if (hotspot.type === 'aerial') {
      hotspot.icon = '/icons/aerial_hotspot.png';
    }
  }

  let material: THREE.SpriteMaterial | THREE.MeshBasicMaterial;
  
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
    // 根据图片实际尺寸设置sprite缩放
    textureLoader.load(hotspot.icon, (texture) => {
      const { image } = texture;
      if (image && image.width && image.height) {
        const scale = 40; // 基准缩放（可根据实际需求调整）
        const aspect = image.width / image.height;
        sprite.scale.set(scale * aspect, scale, 1);
      } else {
        sprite.scale.set(40, 40, 1); // 默认缩放
      }
    });
    
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
    
    // return sprite;
    hotspotObject = sprite;
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
    scene.value.add(hotspotMesh);
    hotspotObject = hotspotMesh;

    
    // 使用非响应式方式更新数组
    const newHotspots = [...hotspotObjects.value];
    newHotspots.push(hotspotMesh);
    hotspotObjects.value = newHotspots;
    
    // return hotspotMesh;
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

    const label = new CSS2DObject(messageDiv);
    label.position.copy(hotspotObject.position);
    label.position.y += 20; // 向上偏移，使标签显示在热点上方
    
    scene.value.add(label);
    hotspotObjects.value.push(label as any);
  }
  
  return hotspotObject;
};

// 处理热点点击
const handleHotspotClick = (hotspot: HotSpot) => {
  if (!validateHotspot(hotspot)) {
    return;
  }

  if (hotspot.type === 'switchScene' && hotspot.targetSceneId) {
    switchScene(hotspot.targetSceneId);
  } 
  else if (hotspot.type === 'enterSceneViewer') {
    if (props.switchViewer && typeof props.switchViewer === 'function') {
      if (hotspot.targetSceneViewerSceneId) {
        // console.log(`切换到场景视图，目标场景ID: ${hotspot.targetSceneViewerSceneId}`);
        // 切换到场景视图，传递场景ID参数
        (props.switchViewer as any)('scene', hotspot.targetSceneViewerSceneId);
      } else {
        showError(`热点ID "${hotspot.id}" 的类型为 "enterSceneViewer"，但未提供 targetSceneViewerSceneId`);
        // props.switchViewer('scene');
      }
      
    }
  }
  else if (hotspot.type === 'aerial') {
    if (props.switchViewer && typeof props.switchViewer === 'function') {
      if (hotspot.targetStreetSceneId) {
        // 切换到街景视图，传递目标场景ID参数
        (props.switchViewer as any)('street', hotspot.targetStreetSceneId);
      } else {
        showError(`热点ID "${hotspot.id}" 的类型为 "aerial"，但未提供 targetStreetSceneId`);
      }
    }
  }
  else if (hotspot.type === 'custom') {
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

// 渐进加载图片
const loadImageProgressively = (baseImagePath: string, targetMesh: THREE.Mesh) => {
  if (!scene.value) return;
  
  isLoading.value = true;
  loadingProgress.value = 0;
  
  const textureLoader = new THREE.TextureLoader();
  let firstImageLoaded = false;
  
  props.resolutions.forEach((resolution, index) => {
    const imagePath = getFullImageUrl(`${baseImagePath}/${resolution}.jpg`);
    if (props.debug) {
      console.log(`加载分辨率图片: ${imagePath}`);
    }
    
    textureLoader.load(
      imagePath,
      // onLoad
      (texture: THREE.Texture) => {
        if (!scene.value) return;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.generateMipmaps = false;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.anisotropy = renderer.value?.capabilities.getMaxAnisotropy() || 1;
        const material = targetMesh.material as THREE.MeshBasicMaterial;
        if (!material.map || index > props.resolutions.indexOf(
          material.userData.currentResolution as string || props.resolutions[0]
        )) {
          material.map = texture;
          material.needsUpdate = true;
          material.userData.currentResolution = resolution;
          if (props.debug) {
            console.log(`已加载分辨率: ${resolution}`);
          }
        }
        
        // 第一个分辨率（较模糊版本）加载完成后立即隐藏进度条
        if (index === 0 && !firstImageLoaded) {
          firstImageLoaded = true;
          loadingProgress.value = 100;
          setTimeout(() => {
            isLoading.value = false;
            loadingProgress.value = 0;
          }, 300); // 短暂延迟让用户看到完成状态
        }
      },
      // onProgress - 只跟踪第一个分辨率（较模糊版本）的详细进度
      index === 0 ? (progressEvent: ProgressEvent) => {
        if (progressEvent.lengthComputable && !firstImageLoaded) {
          loadingProgress.value = (progressEvent.loaded / progressEvent.total) * 100;
        }
      } : undefined,
      // onError
      (err: unknown) => {
        const errorMessage = err instanceof Error ? err.message : '未知错误';
        if (props.debug) {
          console.error(`加载分辨率 ${resolution} 失败: ${errorMessage}`);
        }
        
        // 如果第一个分辨率加载失败，隐藏进度条并显示错误
        if (index === 0 && !firstImageLoaded) {
          firstImageLoaded = true;
          isLoading.value = false;
          loadingProgress.value = 0;
          showError(`加载场景图片失败: ${errorMessage}`);
        }
      }
    );
  });
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
  
  const newScene = props.scenes[targetIndex];
  
  // 获取当前场景的默认朝向配置（如果是初始加载，使用0作为默认值）
  const currentScene = currentSceneIndex.value >= 0 ? props.scenes[currentSceneIndex.value] : null;
  const currentDefaultLongitude = currentScene?.initialLongitude || 0;
  const currentDefaultLatitude = currentScene?.initialLatitude || 0;
  
  // 获取用户当前视角
  const currentViewAngle = getCurrentViewAngle();
  
  // 计算用户相对于当前场景默认朝向的偏移
  const userOffsetLongitude = currentViewAngle.longitude - currentDefaultLongitude;
  const userOffsetLatitude = currentViewAngle.latitude - currentDefaultLatitude;
  
  currentSceneIndex.value = targetIndex;
  currentSceneId.value = newScene.sceneId;
  
  // 移除当前全景球体
  if (currentSphere.value && scene.value) {
    scene.value.remove(currentSphere.value);
    currentSphere.value = null;
  }
  
  // 清除现有热点
  clearHotspots();
  
  // 创建全景球体的标准几何体和材质
  const geometry = new THREE.SphereGeometry(500, 96, 64); 
  geometry.scale(-1, 1, 1); 
  
  const material = new THREE.MeshBasicMaterial();
  
  // 创建球体网格
  const mesh = new THREE.Mesh(geometry, material);
  scene.value.add(mesh);
  currentSphere.value = mesh;
  
  // 根据是否启用渐进加载来处理图片加载
  if (props.progressiveLoading) {
    // 渐进加载模式
    loadImageProgressively(newScene.relativeImagePath, mesh);
  } else {
    // 标准加载模式
    isLoading.value = true;
    loadingProgress.value = 0;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      getFullImageUrl(`${newScene.relativeImagePath}/1920x960.jpg`),
      // onLoad
      (texture: THREE.Texture) => {
        if (!scene.value) return;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.generateMipmaps = false;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.anisotropy = renderer.value?.capabilities.getMaxAnisotropy() || 1;
        material.map = texture;
        material.needsUpdate = true;
        
        // 加载完成，隐藏进度条
        setTimeout(() => {
          isLoading.value = false;
          loadingProgress.value = 0;
        }, 500);
      },
      // onProgress
      (progressEvent: ProgressEvent) => {
        if (progressEvent.lengthComputable) {
          loadingProgress.value = (progressEvent.loaded / progressEvent.total) * 100;
        }
      },
      // onError
      (err: unknown) => {
        const errorMessage = err instanceof Error ? err.message : '未知错误';
        showError(`加载场景图片失败: ${errorMessage}`);
        
        // 出错时隐藏进度条
        isLoading.value = false;
        loadingProgress.value = 0;
      }
    );
  }
  
  // 初始化热点
  if (newScene.hotspots) {
    newScene.hotspots.forEach(hotspot => {
      createHotspot(hotspot);
    });
  }
  
  // 触发场景切换事件
  emit('sceneChange', targetIndex);

  // 设置视角 - 保持用户相对偏移，应用新场景的默认朝向
  if (controls.value && camera.value) {
    // 获取新场景的默认朝向
    const newDefaultLongitude = newScene.initialLongitude || 0;
    const newDefaultLatitude = newScene.initialLatitude || 0;
    
    // 计算最终视角：新场景默认朝向 + 用户相对偏移
    const finalLongitude = newDefaultLongitude + userOffsetLongitude;
    const finalLatitude = newDefaultLatitude + userOffsetLatitude;
    
    // 规范化经纬度到有效范围
    const normalizedLongitude = ((finalLongitude + 540) % 360) - 180; // -180 到 180
    const normalizedLatitude = Math.max(-90, Math.min(90, finalLatitude)); // -90 到 90
    
    // Debug信息
    console.log('场景切换视角调试:', {
      from: currentScene?.sceneId || 'initial',
      to: newScene.sceneId,
      currentViewAngle,
      currentDefault: { longitude: currentDefaultLongitude, latitude: currentDefaultLatitude },
      userOffset: { longitude: userOffsetLongitude, latitude: userOffsetLatitude },
      newDefault: { longitude: newDefaultLongitude, latitude: newDefaultLatitude },
      finalView: { longitude: normalizedLongitude, latitude: normalizedLatitude }
    });
    
    // 使用现有的latLonToVector3函数设置相机位置
    const radius = controls.value.getDistance();
    const camPos = latLonToVector3(-normalizedLatitude, normalizedLongitude + 180, radius);
    controls.value.object.position.set(
      controls.value.target.x + camPos.x,
      controls.value.target.y + camPos.y,
      controls.value.target.z + camPos.z
    );
    controls.value.object.lookAt(controls.value.target);
    controls.value.update();
  }

  // 在场景切换后重新应用视角限制
  nextTick(() => {
    // console.log('场景切换后重新应用视角限制');
    applyViewLimits();
  });
};

// 获取当前场景ID
const getCurrentSceneId = (): string => {
  return currentSceneId.value;
};

// 处理场景点击
const handleSceneClick = (event: MouseEvent) => {
  if (!camera.value || !renderer.value || !scene.value) return;

  // 重置自动旋转
  resetAutoRotate();

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

  // 如果在debug模式下，打印到控制台、复制到剪贴板并显示提示
  if (props.debug && APP_CONFIG.debug.enabled) {
    console.log('点击位置坐标:', coordinates, '场景ID:', currentSceneId.value);
    
    // 复制坐标和场景ID到剪贴板
    const coordinateText = `longitude: ${coordinates.longitude}, latitude: ${coordinates.latitude}, sceneId: ${currentSceneId.value}`;
    try {
      navigator.clipboard.writeText(coordinateText).then(() => {
        ElMessage.success('坐标和场景ID已复制到剪贴板');
      }).catch(() => {
        // 如果现代 Clipboard API 失败，尝试传统方法
        const textArea = document.createElement('textarea');
        textArea.value = coordinateText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        ElMessage.success('坐标和场景ID已复制到剪贴板');
      });
    } catch (error) {
      console.error('复制坐标失败:', error);
      ElMessage.error('复制坐标失败');
    }
  }
  
  // 触发坐标选择事件
  emit('coordinateSelected', coordinateData);
};

// 添加鼠标移动事件处理
const handleMouseMove = (event: MouseEvent) => {
  if (!camera.value || !renderer.value || !scene.value) return;

  // 重置自动旋转
  resetAutoRotate();

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

// 获取当前相机朝向的经纬度
const getCurrentViewAngle = (): { longitude: number; latitude: number } => {
  if (!camera.value || !controls.value) {
    return { longitude: 0, latitude: 0 };
  }
  
  // 使用相机朝向向量来计算经纬度（与convertScreenToSphericalCoordinates保持一致）
  const direction = new THREE.Vector3();
  camera.value.getWorldDirection(direction);
  
  // 直接使用现有的 vector3ToLatLon 方法
  const coordinates = vector3ToLatLon(direction);
  
  // 应用与 convertScreenToSphericalCoordinates 相同的修正逻辑
  const correctedLongitude = coordinates.longitude - 180;
  const normalizedLongitude = ((correctedLongitude + 540) % 360) - 180;
  
  return {
    longitude: parseFloat(normalizedLongitude.toFixed(2)),
    latitude: parseFloat(coordinates.latitude.toFixed(2))
  };
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

// 监听视角限制属性变化并动态更新
watch(
  () => [props.minLongitude, props.maxLongitude, props.minLatitude, props.maxLatitude],
  () => {
    applyViewLimits();
  },
  { deep: true }
);

// 应用视角限制的函数
const applyViewLimits = () => {
  if (!controls.value) {
    // console.log('OrbitControls未初始化，跳过视角限制应用');
    return;
  }
  
  // console.log('开始应用视角限制:', {
  //   minLatitude: props.minLatitude,
  //   maxLatitude: props.maxLatitude,
  //   minLongitude: props.minLongitude,
  //   maxLongitude: props.maxLongitude
  // });

  // 重置角度限制为默认值（无限制）
  controls.value.minAzimuthAngle = -Infinity;
  controls.value.maxAzimuthAngle = Infinity;
  controls.value.minPolarAngle = 0;
  controls.value.maxPolarAngle = Math.PI;

  // 将经纬度转换为OrbitControls的角度系统
  const latLonToOrbitAngles = (latitude: number, longitude: number) => {
    // 经度转方位角：经度0度对应OrbitControls的-90度方位角
    const azimuthAngle = THREE.MathUtils.degToRad(-longitude - 90);
    // 纬度转极角：纬度90度对应极角0度，纬度-90度对应极角180度
    const polarAngle = THREE.MathUtils.degToRad(90 - latitude);
    return { azimuthAngle, polarAngle };
  };

  // 应用纬度限制（极角限制）
  if (props.minLatitude !== undefined) {
    // console.log('应用最小纬度限制:', props.minLatitude);
    const { polarAngle } = latLonToOrbitAngles(props.minLatitude, 0);
    controls.value.maxPolarAngle = Math.min(Math.PI, polarAngle);
    // console.log('设置maxPolarAngle为:', controls.value.maxPolarAngle, '弧度，约', THREE.MathUtils.radToDeg(controls.value.maxPolarAngle), '度');
    // console.log('这意味着最低只能看到纬度:', props.minLatitude, '度');
  }
  
  if (props.maxLatitude !== undefined) {
    // console.log('应用最大纬度限制:', props.maxLatitude);
    const { polarAngle } = latLonToOrbitAngles(props.maxLatitude, 0);
    controls.value.minPolarAngle = Math.max(0, polarAngle);
    // console.log('设置minPolarAngle为:', controls.value.minPolarAngle, '弧度，约', THREE.MathUtils.radToDeg(controls.value.minPolarAngle), '度');
    // console.log('这意味着最高只能看到纬度:', props.maxLatitude, '度');
  }

  // 应用经度限制（方位角限制）
  if (props.minLongitude !== undefined && props.maxLongitude !== undefined) {
    // console.log('应用经度限制:', props.minLongitude, 'to', props.maxLongitude);
    const { azimuthAngle: minAzimuth } = latLonToOrbitAngles(0, props.maxLongitude);
    const { azimuthAngle: maxAzimuth } = latLonToOrbitAngles(0, props.minLongitude);
    
    controls.value.minAzimuthAngle = minAzimuth;
    controls.value.maxAzimuthAngle = maxAzimuth;
  }

  // console.log('视角限制已应用:', {
  //   minLongitude: props.minLongitude,
  //   maxLongitude: props.maxLongitude,
  //   minLatitude: props.minLatitude,
  //   maxLatitude: props.maxLatitude,
  //   minAzimuthAngle: controls.value.minAzimuthAngle,
  //   maxAzimuthAngle: controls.value.maxAzimuthAngle,
  //   minPolarAngle: controls.value.minPolarAngle,
  //   maxPolarAngle: controls.value.maxPolarAngle
  // });

  // 强制更新controls以应用新的限制
  controls.value.update();
  
  // console.log('视角限制应用完成');
};

onMounted(() => {
  // 初始化 Three.js 环境
  initThreeJs();
  
  // 添加事件监听
  viewerContainer.value?.addEventListener('wheel', onMouseWheel, { passive: false });
  viewerContainer.value?.addEventListener('click', handleSceneClick);
  viewerContainer.value?.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', onWindowResize);
  
  // 监听OrbitControls的交互事件，在用户拖拽时重置自动旋转
  if (controls.value) {
    controls.value.addEventListener('start', () => {
      resetAutoRotate();
    });
  }
  
  // 在nextTick中应用视角限制，确保controls已初始化
  nextTick(() => {
    // console.log('在nextTick中调用applyViewLimits');
    applyViewLimits();
    
    // 再添加一个延迟调用，确保OrbitControls完全初始化
    setTimeout(() => {
      // console.log('延迟500ms后再次调用applyViewLimits');
      applyViewLimits();
    }, 500);
  });
  
  // 加载指定的初始场景
  if (props.scenes.length > 0) {
    // alert('初始场景索引：' + props.initialScene);
    switchScene(props.initialScene);
  }
  
  // 开始动画循环
  animate();
});

onBeforeUnmount(() => {
  // 移除事件监听
  viewerContainer.value?.removeEventListener('wheel', onMouseWheel);
  viewerContainer.value?.removeEventListener('click', handleSceneClick);
  viewerContainer.value?.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('resize', onWindowResize);
  
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

/* 消息预览框样式 */
:deep(.message-hotspot-preview) {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 8px 12px;
  color: #ffffff;
  font-size: 13px;
  min-width: 120px;
  max-width: 180px;
  min-height: 32px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  transform: translate(-50%, -100%);
  margin-top: -16px;
  pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  line-height: 1.4;
}
:deep(.message-hotspot-content) {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 24px;
  word-break: break-word;
  color: #ffffff;
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

/* 加载进度条样式 */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
}

.loading-content {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  text-align: center;
  max-width: 80%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #409EFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 18px;
  color: #303133;
  word-break: break-word;
}

.loading-dots span {
  animation: fade 1.4s ease-in-out infinite;
}

.loading-dots span:nth-child(1) {
  animation-delay: 0s;
}

.loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes fade {
  0%, 80%, 100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
}

.loading-progress-container {
  margin-top: 20px;
}

.loading-progress-bar {
  width: 100%;
  height: 20px;
  background: linear-gradient(
    45deg,
    #f0f0f0 25%,
    #e8e8e8 25%,
    #e8e8e8 50%,
    #f0f0f0 50%,
    #f0f0f0 75%,
    #e8e8e8 75%
  );
  background-size: 20px 20px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  animation: scroll-background 2s linear infinite;
}

@keyframes scroll-background {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 20px 0;
  }
}

.loading-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #409EFF 0%, #66B1FF 100%);
  border-radius: 10px;
  transition: width 0.3s ease;
  position: relative;
  overflow: hidden;
}

.loading-progress-fill::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

.loading-progress-text {
  font-size: 14px;
  color: #303133;
  margin-top: 5px;
}
</style>


