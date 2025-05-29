import { ref, shallowRef } from 'vue';
import type { Ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

// 定义Props接口
interface ThreeJsProps {
  initialFov: number;
  minFov: number;
  maxFov: number;
  rotateSpeed: number;
  zoomSpeed: number;
  dampingFactor: number;
  fovDampingFactor: number;
}

export function useThreeJsSetup(
  viewerContainer: Ref<HTMLElement | null>,
  props: ThreeJsProps
) {
  const scene = shallowRef<THREE.Scene | null>(null);
  const camera = shallowRef<THREE.PerspectiveCamera | null>(null);
  const renderer = shallowRef<THREE.WebGLRenderer | null>(null);
  const labelRenderer = shallowRef<CSS2DRenderer | null>(null);
  const controls = shallowRef<OrbitControls | null>(null);
  const isAnimating = ref<boolean>(false);
  
  // FOV 相关变量
  let currentFov = props.initialFov;
  let targetFov = props.initialFov;

  // 初始化 Three.js 环境
  const initThreeJs = () => {
    if (!viewerContainer.value) return;
    
    // 创建场景
    scene.value = new THREE.Scene();
    
    // 创建相机
    camera.value = new THREE.PerspectiveCamera(
      props.initialFov,
      viewerContainer.value.clientWidth / viewerContainer.value.clientHeight,
      0.1,
      1000
    );
    camera.value.position.set(0, 0, 0.1);
    currentFov = targetFov = camera.value.fov;
    
    // 创建渲染器
    renderer.value = new THREE.WebGLRenderer({ antialias: true });
    renderer.value.setSize(viewerContainer.value.clientWidth, viewerContainer.value.clientHeight);
    // 设置渲染器的CSS样式
    renderer.value.domElement.style.cursor = 'default';
    // 设置设备像素比以提高渲染质量
    renderer.value.setPixelRatio(window.devicePixelRatio);
    viewerContainer.value.appendChild(renderer.value.domElement);
    
    // 创建CSS2D渲染器
    labelRenderer.value = new CSS2DRenderer();
    labelRenderer.value.setSize(viewerContainer.value.clientWidth, viewerContainer.value.clientHeight);
    labelRenderer.value.domElement.style.position = 'absolute';
    labelRenderer.value.domElement.style.top = '0';
    labelRenderer.value.domElement.style.pointerEvents = 'none';
    viewerContainer.value.appendChild(labelRenderer.value.domElement);
    
    // 添加控制器
    controls.value = new OrbitControls(camera.value, renderer.value.domElement);
    controls.value.enableZoom = true;
    controls.value.enablePan = false;
    controls.value.rotateSpeed = props.rotateSpeed;
    controls.value.minDistance = 0.1;
    controls.value.maxDistance = 100;
    controls.value.zoomSpeed = props.zoomSpeed;
    controls.value.enableDamping = true;
    controls.value.dampingFactor = props.dampingFactor;
  };

  // 处理鼠标滚轮事件
  const onMouseWheel = (event: WheelEvent) => {
    event.preventDefault();
    
    if (!camera.value) return;
    
    const delta = Math.sign(event.deltaY);
    targetFov += delta * props.zoomSpeed;
    
    // 限制目标FOV范围
    targetFov = Math.max(props.minFov, Math.min(props.maxFov, targetFov));
  };

  // 动画循环
  const animate = () => {
    if (!scene.value || !camera.value || !renderer.value || !labelRenderer.value) return;
    
    isAnimating.value = true;
    
    const animateFrame = () => {
      if (!isAnimating.value) return;
      
      // 应用FOV缩放惯性
      if (camera.value && Math.abs(currentFov - targetFov) > 0.01) {
        currentFov += (targetFov - currentFov) * props.fovDampingFactor;
        camera.value.fov = currentFov;
        camera.value.updateProjectionMatrix();
      }
      
      controls.value?.update();
      renderer.value?.render(scene.value!, camera.value!);
      labelRenderer.value?.render(scene.value!, camera.value!);
      requestAnimationFrame(animateFrame);
    };
    
    animateFrame();
  };

  // 处理窗口大小变化
  const onWindowResize = () => {
    if (!camera.value || !renderer.value || !labelRenderer.value || !viewerContainer.value) return;
    
    camera.value.aspect = viewerContainer.value.clientWidth / viewerContainer.value.clientHeight;
    camera.value.updateProjectionMatrix();
    renderer.value.setSize(viewerContainer.value.clientWidth, viewerContainer.value.clientHeight);
    labelRenderer.value.setSize(viewerContainer.value.clientWidth, viewerContainer.value.clientHeight);
  };

  // 停止动画
  const stopAnimation = () => {
    isAnimating.value = false;
  };

  // 释放资源
  const disposeThreeJs = () => {
    stopAnimation();
    
    if (renderer.value && viewerContainer.value) {
      viewerContainer.value.removeChild(renderer.value.domElement);
    }
    
    if (labelRenderer.value && viewerContainer.value) {
      viewerContainer.value.removeChild(labelRenderer.value.domElement);
    }
    
    controls.value?.dispose();
    
    // 清空引用
    scene.value = null;
    camera.value = null;
    renderer.value = null;
    labelRenderer.value = null;
    controls.value = null;
  };
  
  return {
    scene,
    camera,
    renderer,
    labelRenderer,
    controls,
    isAnimating,
    initThreeJs,
    animate,
    onWindowResize,
    onMouseWheel,
    stopAnimation,
    disposeThreeJs,
    targetFov,
    currentFov
  };
} 