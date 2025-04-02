<template>
  <div class="panorama-container">
    <div id="panorama-viewer" ref="viewerContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ElMessage } from 'element-plus';

// 定义事件 TODO
const emit = defineEmits<{
  (e: 'hotspotClick', hotspot: HotSpot): void
}>();

// 定义组件的props
interface Props {
  imagePath: string; // 全景图路径
  initialFov?: number; // 初始视场角
  minFov?: number; // 最小视场角
  maxFov?: number; // 最大视场角
  rotateSpeed?: number; // 旋转速度
  zoomSpeed?: number; // 缩放速度
  dampingFactor?: number; // 阻尼系数
  fovDampingFactor?: number; // FOV阻尼系数
  hotspots?: HotSpot[]; // 热点数组
  debug?: boolean; // debug模式
}

// 定义热点接口
interface HotSpot {
  id: string;
  longitude: number; // 经度 (-180 到 180)
  latitude: number;  // 纬度 (-90 到 90)
  icon?: string;     // 图标路径
  title?: string;    // 标题
  description?: string; // 描述
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
  hotspots: () => [],
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

// 将经纬度转换为3D坐标
const latLonToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));
  
  return new THREE.Vector3(x, y, z);
};

// 创建热点
const createHotspot = (hotspot: HotSpot) => {
  if (!scene) return;
  
  // 创建热点几何体（这里使用一个简单的球体作为示例）
  const geometry = new THREE.SphereGeometry(5, 16, 16);
  const material = new THREE.MeshBasicMaterial({
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
};

// 初始化所有热点
const initHotspots = () => {
  if (!scene) return;
  
  // 清除现有热点
  hotspotObjects.forEach(obj => {
    scene?.remove(obj);
  });
  hotspotObjects = [];
  
  // 创建新热点
  props.hotspots.forEach(hotspot => {
    createHotspot(hotspot);
  });
};

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
    emit('hotspotClick', hotspotData);
    if (hotspotData.onClick) {
      hotspotData.onClick(hotspotData.onClickParams);
    }
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

const initPanorama = () => {
  if (!viewerContainer.value) return;
  
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
  
  // 加载全景图
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(props.imagePath, (texture) => {
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    
    const material = new THREE.MeshBasicMaterial({
      map: texture
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    scene?.add(sphere);
    
    // 初始化热点
    initHotspots();
    
    animate();
  });
  
  // 添加窗口大小变化监听
  window.addEventListener('resize', onWindowResize);
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
</style>