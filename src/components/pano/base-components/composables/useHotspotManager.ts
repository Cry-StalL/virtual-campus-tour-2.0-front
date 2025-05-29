import { ref } from 'vue';
import type { Ref } from 'vue';
import * as THREE from 'three';
import type { HotSpot } from './types';

export function useHotspotManager(
  scene: Ref<THREE.Scene | null>,
  showError: (message: string) => void,
  validateHotspot: (hotspot: HotSpot) => boolean,
  latLonToVector3: (lat: number, lon: number, radius: number) => THREE.Vector3,
  switchScene: (targetSceneId: string) => void,
  emit: any
) {
  const hotspotObjects = ref<THREE.Object3D[]>([]);

  // 创建热点
  const createHotspot = (hotspot: HotSpot) => {
    if (!scene.value || !validateHotspot(hotspot)) return null;
    
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
      // 添加热点类名
      (sprite as any).userData = { class: 'hotspot' };
      
      // 添加到场景
      scene.value.add(sprite);
      hotspotObjects.value.push(sprite);
      
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
      scene.value.add(hotspotMesh);
      hotspotObjects.value.push(hotspotMesh);
      
      return hotspotMesh;
    }
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
    
    hotspotObjects.value.forEach(obj => {
      scene.value?.remove(obj);
    });
    hotspotObjects.value = [];
  };

  // 创建多个热点
  const createHotspots = (hotspots: HotSpot[]) => {
    clearHotspots();
    return hotspots.map(hotspot => createHotspot(hotspot)).filter(Boolean);
  };

  return {
    hotspotObjects,
    createHotspot,
    createHotspots,
    handleHotspotClick,
    clearHotspots
  };
} 