import type { Ref } from 'vue';
import * as THREE from 'three';
import type { HotSpot } from './types';

interface EventHandlerProps {
  debug?: boolean;
}

export function useEventHandlers(
  camera: Ref<THREE.PerspectiveCamera | null>,
  renderer: Ref<THREE.WebGLRenderer | null>,
  scene: Ref<THREE.Scene | null>,
  hotspotObjects: Ref<THREE.Object3D[]>,
  props: EventHandlerProps,
  currentSceneId: Ref<string>,
  handleHotspotClick: (hotspot: HotSpot) => void,
  convertScreenToSphericalCoordinates: (screenX: number, screenY: number) => { longitude: number; latitude: number } | null,
  emit: any
) {
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

  return {
    handleSceneClick,
    handleMouseMove,
    getCoordinateFromClick
  };
} 