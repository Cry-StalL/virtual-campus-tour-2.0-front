<template>
  <div class="panorama-container">
    <div id="panorama-viewer" ref="viewerContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const viewerContainer = ref<HTMLElement | null>(null);
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let controls: OrbitControls | null = null;
let isAnimating = false;
let targetFov = 75; // 目标FOV值，用于实现缩放惯性
let currentFov = 75; // 当前FOV值
const fovDampingFactor = 0.1; // FOV阻尼系数，控制缩放惯性大小，增加可以加快响应速度

const initPanorama = () => {
  if (!viewerContainer.value) return;
  
  // 创建场景
  scene = new THREE.Scene();
  
  // 创建相机
  camera = new THREE.PerspectiveCamera(
    75,
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
  controls.enableZoom = true; // 启用缩放
  controls.enablePan = false; // 禁用平移
  controls.rotateSpeed = -0.15; // 设置旋转速度. 设为负值反转方向
  controls.minDistance = 0.1; // 设置最小缩放距离
  controls.maxDistance = 100; // 设置最大缩放距离
  controls.zoomSpeed = 2.0; // 增加缩放速度
  
  // 添加惯性
  controls.enableDamping = true; // 启用阻尼效果，提供惯性
  controls.dampingFactor = 0.1; // 增加阻尼系数，加快响应速度
  
  // 添加鼠标滚轮事件监听
  viewerContainer.value.addEventListener('wheel', onMouseWheel, { passive: false });
  
  // 加载全景图
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('/images/panorama.jpg', (texture) => {
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    // 翻转几何体，使图像朝内
    geometry.scale(-1, 1, 1);
    
    const material = new THREE.MeshBasicMaterial({
      map: texture
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    scene?.add(sphere);
    
    animate();
  });
  
  // 添加窗口大小变化监听
  window.addEventListener('resize', onWindowResize);
};

// 处理鼠标滚轮事件
const onMouseWheel = (event: WheelEvent) => {
  event.preventDefault();
  
  if (!camera) return;
  
  // 获取滚轮方向
  const delta = Math.sign(event.deltaY);
  
  // 计算新的目标FOV（视场角）
  const zoomSpeed = 4; // 增加缩放速度从2到4
  targetFov += delta * zoomSpeed;
  
  // 限制目标FOV范围，防止过度缩放
  targetFov = Math.max(30, Math.min(90, targetFov));
};

const animate = () => {
  if (!scene || !camera || !renderer) return;
  
  isAnimating = true;
  
  const animateFrame = () => {
    if (!isAnimating) return;
    
    // 应用FOV缩放惯性
    if (camera && Math.abs(currentFov - targetFov) > 0.01) {
      currentFov += (targetFov - currentFov) * fovDampingFactor;
      camera.fov = currentFov;
      camera.updateProjectionMatrix();
    }
    
    controls?.update(); // 更新控制器（必须在每帧调用以实现阻尼效果）
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
  
  // 移除鼠标滚轮事件监听
  if (viewerContainer.value) {
    viewerContainer.value.removeEventListener('wheel', onMouseWheel);
  }
  
  if (renderer && viewerContainer.value) {
    viewerContainer.value.removeChild(renderer.domElement);
  }
  
  // 清理资源
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
  height: calc(100vh - 40px);
  padding: 20px;
  box-sizing: border-box;
}

#panorama-viewer {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
}
</style>