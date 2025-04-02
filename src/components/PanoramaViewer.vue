<template>
  <div class="panorama-container">
    <div id="panorama-viewer" ref="viewerContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
}

// 定义热点接口
interface HotSpot {
  id: string;
  longitude: number; // 经度 (-180 到 180)
  latitude: number;  // 纬度 (-90 到 90)
  icon?: string;     // 图标路径
  title?: string;    // 标题
  description?: string; // 描述
}

const props = withDefaults(defineProps<Props>(), {
  initialFov: 75,
  minFov: 30,
  maxFov: 90,
  rotateSpeed: -0.15,
  zoomSpeed: 2.0,
  dampingFactor: 0.1,
  fovDampingFactor: 0.1,
  hotspots: () => []
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

// 处理热点点击
const handleHotspotClick = (event: MouseEvent) => {
  if (!camera || !renderer || !scene) return;
  
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  
  const intersects = raycaster.intersectObjects(hotspotObjects);
  if (intersects.length > 0) {
    const hotspotData = (intersects[0].object as any).hotspotData;
    console.log('Clicked hotspot:', hotspotData);
    // 这里可以触发热点点击事件
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
  viewerContainer.value.addEventListener('click', handleHotspotClick);
  
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
    viewerContainer.value.removeEventListener('click', handleHotspotClick);
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