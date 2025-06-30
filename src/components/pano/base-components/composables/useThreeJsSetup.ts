import { ref, shallowRef } from 'vue';
import type { Ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

// 设备检测功能 - 与项目中其他组件保持一致
const isMobileDevice = (): boolean => {
  const ua = navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
};

// 定义Props接口
interface ThreeJsProps {
  initialFov: number;
  minFov: number;
  maxFov: number;
  rotateSpeed: number;
  zoomSpeed: number;
  dampingFactor: number;
  fovDampingFactor: number;
  // 视角限制属性
  minLongitude?: number;
  maxLongitude?: number;
  minLatitude?: number;
  maxLatitude?: number;
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
  
  // 检测设备类型
  const isMobile = isMobileDevice();
  
  // 根据设备类型调整参数
  const getDeviceSpecificParams = () => {
    if (isMobile) {
      return {
        // 手机端参数：更大的FOV范围，更快的旋转速度
        minFov: props.minFov,
        maxFov: props.maxFov,
        rotateSpeed: props.rotateSpeed * 2, // 增加旋转速度
        zoomSpeed: props.zoomSpeed * 3, // 增加缩放速度
        dampingFactor: props.dampingFactor * 0.8, // 稍微减少阻尼，让操作更灵敏
        fovDampingFactor: props.fovDampingFactor * 1.2 // 稍微增加FOV阻尼，让缩放更平滑
      };
    } else {
      return {
        // 桌面端参数：保持原有逻辑
        minFov: props.minFov,
        maxFov: props.maxFov,
        rotateSpeed: props.rotateSpeed,
        zoomSpeed: props.zoomSpeed,
        dampingFactor: props.dampingFactor,
        fovDampingFactor: props.fovDampingFactor
      };
    }
  };

  const deviceParams = getDeviceSpecificParams();
  
  // FOV 相关变量
  let currentFov = props.initialFov;
  let targetFov = props.initialFov;

  // 自动旋转相关状态
  const autoRotate = ref<boolean>(false);
  const autoRotateSpeed = ref<number>(-0.5); // 自动旋转速度，负值为顺时针旋转
  let autoRotateTimer: number | null = null;
  const autoRotateDelay = 5000; // 5秒无操作后开始自动旋转

  // 启动自动旋转定时器
  const startAutoRotateTimer = () => {
    stopAutoRotateTimer(); // 先清除之前的定时器
    autoRotateTimer = window.setTimeout(() => {
      autoRotate.value = true;
    }, autoRotateDelay);
  };

  // 停止自动旋转定时器
  const stopAutoRotateTimer = () => {
    if (autoRotateTimer) {
      window.clearTimeout(autoRotateTimer);
      autoRotateTimer = null;
    }
  };

  // 停止自动旋转并重置定时器
  const resetAutoRotate = () => {
    autoRotate.value = false;
    startAutoRotateTimer();
  };
  
  // 手机端触摸事件处理函数
  let lastTouchDistance = 0;
  
  const handleTouchStart = (event: TouchEvent) => {
    if (event.touches.length === 2) {
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      lastTouchDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
    }
  };
  
  const handleTouchMove = (event: TouchEvent) => {
    if (event.touches.length === 2 && camera.value) {
      event.preventDefault();
      
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      const currentDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      if (lastTouchDistance > 0) {
        const delta = currentDistance - lastTouchDistance;
        const scaleFactor = delta * 0.01; // 调整缩放敏感度
        
        targetFov -= scaleFactor * deviceParams.zoomSpeed;
        
        // 应用设备特定的FOV限制
        targetFov = Math.max(deviceParams.minFov, Math.min(deviceParams.maxFov, targetFov));
        
        console.log('手机端双指缩放:', {
          delta: delta,
          scaleFactor: scaleFactor,
          targetFov: targetFov,
          minFov: deviceParams.minFov,
          maxFov: deviceParams.maxFov
        });
        
        // 重置自动旋转
        resetAutoRotate();
      }
      
      lastTouchDistance = currentDistance;
    }
  };
  
  const handleTouchEnd = () => {
    lastTouchDistance = 0;
  };

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
    
    // 添加控制器，使用设备特定参数
    controls.value = new OrbitControls(camera.value, renderer.value.domElement);
    controls.value.enableZoom = true;
    controls.value.enablePan = false;
    controls.value.rotateSpeed = deviceParams.rotateSpeed;
    controls.value.minDistance = 0.1;
    controls.value.maxDistance = 100;
    controls.value.zoomSpeed = deviceParams.zoomSpeed;
    controls.value.enableDamping = true;
    controls.value.dampingFactor = deviceParams.dampingFactor;

    // 手机端特殊处理：自定义触摸缩放处理
    if (isMobile) {
      controls.value.touches = {
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN
      };
      
      // 添加触摸事件监听器
      renderer.value.domElement.addEventListener('touchstart', handleTouchStart, { passive: false });
      renderer.value.domElement.addEventListener('touchmove', handleTouchMove, { passive: false });
      renderer.value.domElement.addEventListener('touchend', handleTouchEnd);
    }

    // 启动自动旋转定时器
    startAutoRotateTimer();
  };

  // 处理鼠标滚轮事件
  const onMouseWheel = (event: WheelEvent) => {
    event.preventDefault();
    
    if (!camera.value) return;
    
    const delta = Math.sign(event.deltaY);
    targetFov += delta * deviceParams.zoomSpeed;
    
    // 使用设备特定的FOV范围限制
    targetFov = Math.max(deviceParams.minFov, Math.min(deviceParams.maxFov, targetFov));

    // 重置自动旋转
    resetAutoRotate();
  };

  // 动画循环
  const animate = () => {
    if (!scene.value || !camera.value || !renderer.value || !labelRenderer.value) return;
    
    isAnimating.value = true;
    
    const animateFrame = () => {
      if (!isAnimating.value) return;
      
      // 应用FOV缩放惯性，使用设备特定的阻尼参数
      if (camera.value && Math.abs(currentFov - targetFov) > 0.01) {
        currentFov += (targetFov - currentFov) * deviceParams.fovDampingFactor;
        camera.value.fov = currentFov;
        camera.value.updateProjectionMatrix();
      }

      // 自动旋转逻辑
      if (controls.value) {
        controls.value.autoRotate = autoRotate.value;
        controls.value.autoRotateSpeed = autoRotate.value ? autoRotateSpeed.value : 0;
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
    stopAutoRotateTimer();
  };

  // 释放资源
  const disposeThreeJs = () => {
    stopAnimation();
    
    // 移除触摸事件监听器（如果存在）
    if (renderer.value && isMobile) {
      const domElement = renderer.value.domElement;
      // 移除我们添加的触摸事件监听器
      domElement.removeEventListener('touchstart', handleTouchStart);
      domElement.removeEventListener('touchmove', handleTouchMove);
      domElement.removeEventListener('touchend', handleTouchEnd);
    }
    
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
    currentFov,
    // 自动旋转相关方法
    autoRotate,
    autoRotateSpeed,
    resetAutoRotate,
    startAutoRotateTimer,
    stopAutoRotateTimer,
    // 导出设备检测信息（用于调试）
    isMobile,
    deviceParams
  };
} 