<template>
  <div class="aerial-viewer">
    <!-- 使用基础 Viewer 组件 -->
    <PanoramaViewer 
      ref="panoramaViewerRef" 
      :scenes="aerialScenes"
      :progressiveLoading="true"
      :resolutions="['3000x1500', '12000x6000']"
      :switchViewer="props.switchViewer" 
      :initialScene="props.initialScene ?? 0"
      @hotspotClick="handleHotspotClick"
      @sceneChange="handleSceneChange"
    />
    
    <!-- 场景切换按钮 -->
    <div class="scene-buttons">
      <button 
        v-for="(scene, index) in aerialScenes" 
        :key="scene.sceneId"
        @click="switchToScene(index)"
        :class="{ active: currentSceneIndex === index }"
        class="scene-button"
      >
        {{ sceneNames[index] }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import PanoramaViewer from '@/components/pano/base-components/PanoramaViewer.vue';
import type { Scene } from '@/components/pano/base-components/composables/types';

const panoramaViewerRef = ref(null);

const props = defineProps<{ 
  switchViewer: (name: string, targetSceneId?: string) => void;
  initialScene?: number | string;
}>();

// 航拍图配置
const aerialScenes: Scene[] = [
  {
    sceneId: 'aerial-1',
    relativeImagePath: 'assets/panos/aerials/1',
    hotspots: [
      {
        type: 'aerial',
        longitude: 0,
        latitude: 0,
        icon: '/icons/aerial_hotspot.png',
        targetStreetSceneId: 'ry-1-16' // 对应街景场景ID
      }
    ]
  },
  {
    sceneId: 'aerial-2', 
    relativeImagePath: 'assets/panos/aerials/2',
    hotspots: [
      {
        type: 'aerial',
        longitude: 45,
        latitude: 0,
        icon: '/icons/aerial_hotspot.png',
        targetStreetSceneId: 'byy-1-16' // 对应街景场景ID
      }
    ]
  },
  {
    sceneId: 'aerial-3',
    relativeImagePath: 'assets/panos/aerials/3', 
    hotspots: [
      {
        type: 'aerial',
        longitude: -45,
        latitude: 0,
        icon: '/icons/aerial_hotspot.png',
        targetStreetSceneId: 'ry-2-1' // 对应街景场景ID
      }
    ]
  }
];

// 场景名称映射
const sceneNames = ['隐湖上空', '教学楼上空', '榕园上空'];

// 计算初始场景索引
const getInitialSceneIndex = () => {
  if (props.initialScene === undefined || props.initialScene === null) {
    return 0;
  }
  
  if (typeof props.initialScene === 'number') {
    return props.initialScene;
  }
  
  if (typeof props.initialScene === 'string') {
    const sceneIndex = aerialScenes.findIndex(scene => scene.sceneId === props.initialScene);
    return sceneIndex !== -1 ? sceneIndex : 0;
  }
  
  return 0;
};

const currentSceneIndex = ref(getInitialSceneIndex());

// 监听initialScene变化，更新按钮状态
watch(() => props.initialScene, (newValue) => {
  if (newValue !== undefined && newValue !== null) {
    if (typeof newValue === 'number') {
      currentSceneIndex.value = newValue;
    } else if (typeof newValue === 'string') {
      const sceneIndex = aerialScenes.findIndex(scene => scene.sceneId === newValue);
      if (sceneIndex !== -1) {
        currentSceneIndex.value = sceneIndex;
      }
    }
  }
}, { immediate: true });

// 处理热点点击
function handleHotspotClick(hotspot: any) {
  if (hotspot.type === 'aerial' && hotspot.targetStreetSceneId) {
    // 切换到街景视图的指定场景
    props.switchViewer('street', hotspot.targetStreetSceneId);
  }
}

// 处理场景切换事件，同步按钮选中状态
function handleSceneChange(sceneIndex: number) {
  currentSceneIndex.value = sceneIndex;
}

// 切换场景
const switchToScene = (sceneIndex: number) => {
  if (panoramaViewerRef.value) {
    (panoramaViewerRef.value as any).switchScene(sceneIndex);
    currentSceneIndex.value = sceneIndex;
  }
};

onMounted(() => {
  // 设置全局引用，便于其他组件访问
  (window as any).aerialViewer = {
    switchScene: (name: string) => {
      if (panoramaViewerRef.value) {
        (panoramaViewerRef.value as any).switchScene(name);
        
        // 如果是通过场景ID切换，需要找到对应的索引来更新按钮状态
        if (typeof name === 'string') {
          const sceneIndex = aerialScenes.findIndex(scene => scene.sceneId === name);
          if (sceneIndex !== -1) {
            currentSceneIndex.value = sceneIndex;
          }
        } else if (typeof name === 'number') {
          currentSceneIndex.value = name;
        }
      }
    },
    getCurrentSceneId: () => {
      if (panoramaViewerRef.value && typeof (panoramaViewerRef.value as any).getCurrentSceneId === 'function') {
        return (panoramaViewerRef.value as any).getCurrentSceneId();
      }
      return undefined;
    }
  };
});

defineExpose({
  switchScene: (name: string) => {
    if (panoramaViewerRef.value) {
      (panoramaViewerRef.value as any).switchScene(name);
      
      // 如果是通过场景ID切换，需要找到对应的索引来更新按钮状态
      if (typeof name === 'string') {
        const sceneIndex = aerialScenes.findIndex(scene => scene.sceneId === name);
        if (sceneIndex !== -1) {
          currentSceneIndex.value = sceneIndex;
        }
      } else if (typeof name === 'number') {
        currentSceneIndex.value = name;
      }
    }
  },
  getCurrentSceneId: () => {
    if (panoramaViewerRef.value && typeof (panoramaViewerRef.value as any).getCurrentSceneId === 'function') {
      return (panoramaViewerRef.value as any).getCurrentSceneId();
    }
    return undefined;
  }
});
</script>

<style scoped>
.aerial-viewer {
  width: 100%;
  height: 100%;
  position: relative;
}

.scene-buttons {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
}

.scene-button {
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

.scene-button:hover {
  background: rgba(0, 0, 0, 0.8);
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-2px);
}

.scene-button.active {
  background: rgba(64, 158, 255, 0.8);
  border-color: rgba(64, 158, 255, 1);
  box-shadow: 0 0 12px rgba(64, 158, 255, 0.4);
}

/* 移动端样式 */
@media (max-width: 768px) {
  .scene-buttons {
    bottom: 20px;
    gap: 8px;
  }
  
  .scene-button {
    padding: 6px 12px;
    font-size: 12px;
  }
}
</style> 