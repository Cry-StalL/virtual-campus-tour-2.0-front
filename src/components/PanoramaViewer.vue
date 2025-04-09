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
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ElMessage, ElIcon } from 'element-plus';
import { Warning } from '@element-plus/icons-vue';

// 定义事件
const emit = defineEmits<{
  (e: 'hotspotClick', hotspot: HotSpot): void;
  (e: 'sceneChange', index: number): void;
  (e: 'error', message: string): void;
}>();

// 定义组件的props
interface Props {
  scenes: Scene[]; // 场景数组
  initialFov?: number; // 初始视场角
  minFov?: number; // 最小视场角
  maxFov?: number; // 最大视场角
  rotateSpeed?: number; // 旋转速度
  zoomSpeed?: number; // 缩放速度
  dampingFactor?: number; // 阻尼系数
  fovDampingFactor?: number; // FOV阻尼系数
  debug?: boolean; // debug模式
}

// 定义场景接口
interface Scene {
  sceneId: string;     // 场景唯一标识符
  imagePath: string;   // 全景图片的路径
  hotspots?: HotSpot[]; // 热点数组
}

// 定义热点接口
interface HotSpot {
  id: string;
  type: string;        // 热点类型
  longitude: number;   // 经度 (-180 到 180)
  latitude: number;    // 纬度 (-90 到 90)
  icon?: string;       // 图标路径
  title?: string;      // 标题
  description?: string; // 描述
  targetSceneId?: string; // 目标场景ID（当type为"scene"时必填）
  onClick?: (params?: any) => void; // 点击处理函数
  onClickParams?: any; // 传递给点击处理函数的参数
}

const props = withDefaults(defineProps<Props>(), {
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
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let controls: OrbitControls | null = null;
let isAnimating = false;
let targetFov = props.initialFov;
let currentFov = props.initialFov;
let hotspotObjects: THREE.Mesh[] = []; // 存储热点对象的数组
let currentSceneIndex = 0; // 当前场景索引
let currentSphere: THREE.Mesh | null = null; // 当前全景球体
const errorMessage = ref<string>(''); // 错误消息
let errorTimeout: number | null = null; // 错误消息定时器

// 将经纬度转换为3D坐标
const latLonToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));
  
  return new THREE.Vector3(x, y, z);
};

// 验证场景ID是否重复
const validateSceneIds = () => {
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
  } else {
    showError(`热点配置错误: 热点ID "${hotspot.id}" 的类型 "${hotspot.type}" 未知`);
    return false;
  }
  
  return true;
};

// 处理热点点击
const handleHotspotClick = (hotspot: HotSpot) => {
  if (!validateHotspot(hotspot)) {
    return;
  }

  if (hotspot.type === 'scene' && hotspot.targetSceneId) {
    switchScene(hotspot.targetSceneId);
  }
};

// 创建热点
const createHotspot = (hotspot: HotSpot) => {
  if (!scene || !validateHotspot(hotspot)) return;
  
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
    sprite.scale.set(20, 20, 1);
    
    // 设置热点位置
    const position = latLonToVector3(hotspot.latitude, hotspot.longitude, 490);
    sprite.position.copy(position);
    
    // 添加热点数据
    (sprite as any).hotspotData = hotspot;
    
    // 添加到场景
    scene.add(sprite);
    hotspotObjects.push(sprite as any);
    
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
    
    // 添加到场景
    scene.add(hotspotMesh);
    hotspotObjects.push(hotspotMesh);
    
    return hotspotMesh;
  }
};

// 显示错误信息
const showError = (message: string) => {
  errorMessage.value = message;
  emit('error', message);
  
  // 停止动画循环
  isAnimating = false;
};

// 隐藏错误信息
const hideError = () => {
  errorMessage.value = '';
  
  // 重新开始动画循环
  if (scene && camera && renderer) {
    isAnimating = true;
    animate();
  }
};

// 切换场景
const switchScene = (target: number | string) => {
  if (!scene) return;
  
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
  
  currentSceneIndex = targetIndex;
  const newScene = props.scenes[targetIndex];
  
  // 移除当前全景球体
  if (currentSphere) {
    scene.remove(currentSphere);
    currentSphere = null;
  }
  
  // 清除现有热点
  hotspotObjects.forEach(obj => {
    scene?.remove(obj);
  });
  hotspotObjects = [];
  
  // 加载新场景的全景图
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    newScene.imagePath,
    (texture: THREE.Texture) => {
      const geometry = new THREE.SphereGeometry(500, 60, 40);
      geometry.scale(-1, 1, 1);
      
      const material = new THREE.MeshBasicMaterial({
        map: texture
      });
      
      currentSphere = new THREE.Mesh(geometry, material);
      scene?.add(currentSphere);
      
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

// 监听场景数组变化
watch(() => props.scenes, () => {
  if (!validateSceneIds()) {
    return;
  }
}, { deep: true });

// 将3D坐标转换为经纬度
const vector3ToLatLon = (point: THREE.Vector3): { longitude: number; latitude: number } => {
  // 标准化向量
  const normalized = point.clone().normalize();
  
  // 计算经纬度
  const latitude = 90 - (Math.acos(normalized.y) * 180) / Math.PI;
  const longitude = ((Math.atan2(normalized.z, -normalized.x) * 180) / Math.PI);
  
  return {
    latitude: parseFloat(latitude.toFixed(2)),
    longitude: parseFloat(longitude.toFixed(2))
  };
};

// 处理场景点击
const handleSceneClick = (event: MouseEvent) => {
  if (!camera || !renderer || !scene) return;

  // 计算归一化的设备坐标
  const mouse = new THREE.Vector2();
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  // 首先检查是否点击到热点，是的话直接return
  const hotspotIntersects = raycaster.intersectObjects(hotspotObjects);
  if (hotspotIntersects.length > 0) {
    const hotspotData = (hotspotIntersects[0].object as any).hotspotData as HotSpot;
    handleHotspotClick(hotspotData);
    return;
  }

  // 如果不是热点，且在debug模式下，则获取点击位置的坐标
  if (props.debug) {
    // 在全景图中，我们需要从相机发射一条射线到球体内表面
    // 由于我们是在球体内部，需要直接计算射线与全景球的交点
    const direction = new THREE.Vector3();
    raycaster.ray.direction.normalize();
    direction.copy(raycaster.ray.direction);
    
    // 直接使用射线方向来计算经纬度坐标
    // 因为射线方向就是从相机（球心）指向球面的单位向量
    const coordinates = vector3ToLatLon(direction);
    
    // 修正经度值，减去180度使其与热点坐标系统一致
    const correctedLongitude = coordinates.longitude - 180;
    // 规范化经度到 -180 到 180 范围内
    const normalizedLongitude = ((correctedLongitude + 540) % 360) - 180;
    
    const coordText = `longitude: ${parseFloat(normalizedLongitude.toFixed(2))}, latitude: ${coordinates.latitude}`;
    
    // 复制到剪贴板
    navigator.clipboard.writeText(coordText).then(() => {
      ElMessage({
        message: '坐标已复制到剪贴板',
        type: 'success',
        duration: 2000
      });
      console.log('点击位置坐标:', coordText);
    }).catch(err => {
      console.error('复制失败:', err);
      ElMessage({
        message: '复制坐标失败',
        type: 'error',
        duration: 2000
      });
    });
  }
};

// 初始化全景图
const initPanorama = () => {
  if (!viewerContainer.value) return;
  
  // 验证场景ID
  if (!validateSceneIds()) {
    return;
  }
  
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
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(viewerContainer.value.clientWidth, viewerContainer.value.clientHeight);
  viewerContainer.value.appendChild(renderer.domElement);
  
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
  
  // 加载第一个场景
  if (props.scenes.length > 0) {
    switchScene(0);
  }
  
  // 添加窗口大小变化监听
  window.addEventListener('resize', onWindowResize);
  
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
  if (!scene || !camera || !renderer) return;
  
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
    requestAnimationFrame(animateFrame);
  };
  
  animateFrame();
};

const onWindowResize = () => {
  if (!camera || !renderer || !viewerContainer.value) return;
  
  camera.aspect = viewerContainer.value.clientWidth / viewerContainer.value.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(viewerContainer.value.clientWidth, viewerContainer.value.clientHeight);
};

onMounted(() => {
  initPanorama();
});

onBeforeUnmount(() => {
  isAnimating = false;
  window.removeEventListener('resize', onWindowResize);
  
  if (viewerContainer.value) {
    viewerContainer.value.removeEventListener('wheel', onMouseWheel);
    viewerContainer.value.removeEventListener('click', handleSceneClick);
  }
  
  if (renderer && viewerContainer.value) {
    viewerContainer.value.removeChild(renderer.domElement);
  }
  
  controls?.dispose();
  scene = null;
  camera = null;
  renderer = null;
  controls = null;
});

// 暴露方法
defineExpose({
  switchScene,
  showError,
  hideError
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