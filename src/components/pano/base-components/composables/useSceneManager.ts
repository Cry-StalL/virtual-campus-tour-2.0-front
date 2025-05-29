import { ref } from 'vue';
import type { Ref } from 'vue';
import * as THREE from 'three';
import type { Scene, HotSpot } from './types';

export function useSceneManager(
  props: { scenes: Scene[] },
  scene: Ref<THREE.Scene | null>,
  createHotspot: (hotspot: HotSpot) => void,
  clearHotspots: () => void,
  showError: (message: string) => void,
  emit: any
) {
  const currentSceneIndex = ref<number>(0);
  const currentSceneId = ref<string>('');
  const currentSphere = ref<THREE.Mesh | null>(null);

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
    if (currentSphere.value) {
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
        
        // 使用更高分辨率的球体几何体
        const geometry = new THREE.SphereGeometry(500, 96, 64);
        geometry.scale(-1, 1, 1); 
        
        const material = new THREE.MeshBasicMaterial({
          map: texture
        });
        
        currentSphere.value = new THREE.Mesh(geometry, material);
        scene.value.add(currentSphere.value);
        
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

  // 获取当前场景索引
  const getCurrentSceneIndex = (): number => {
    return currentSceneIndex.value;
  };

  return {
    currentSceneIndex,
    currentSceneId,
    currentSphere,
    validateSceneIds,
    validateHotspot,
    switchScene,
    getCurrentSceneId,
    getCurrentSceneIndex
  };
} 