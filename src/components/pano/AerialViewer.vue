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
      :debug="APP_CONFIG.debug.enabled"
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
import { APP_CONFIG } from '@/config/config';

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
        longitude: -76.8, latitude: -17.25,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'yxdd-1-68' // 对应街景场景ID
      },
      {
        type: 'aerial',
        longitude: -13.15, latitude: -12.75,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'yxdd-2-12' // 对应街景场景ID
      },
      {
        type: 'aerial',
        longitude: 9.95, latitude: -5.69,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'yxdd-2-23' // 对应街景场景ID
      },
      {
        type: 'aerial',
        longitude: 35.79, latitude: -16.28,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'rh-4-5' // 对应街景场景ID
      },
      {
        type: 'aerial',
        longitude: 64.82, latitude: -13.29,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'rh-3-25' // 对应街景场景ID
      },
      {
        type: 'aerial',
        longitude: 33.04, latitude: -6.45,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'hq-2-21' // 对应街景场景ID
      },
      {
        type: 'aerial',
        longitude: 91.66, latitude: -16.16, 
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'rh-1-16' // 对应街景场景ID
      },
      {
        type: 'aerial',
        longitude: -138.98, latitude: -85.98, 
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'rh-1-9' // 对应街景场景ID
      },
      {
        type: 'aerial',
        longitude: -35.37, latitude: -8.16, 
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'jy-2-11' // 对应街景场景ID
      },
      {
        type: 'aerial',
        longitude: -147.59, latitude: -18.08, 
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'jxl-1-6' // 对应街景场景ID
      },
      {
        type: 'aerial',
        longitude: -108.91, latitude: -10.21,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'yxdd-1-59' // 对应街景场景ID
      },
      {
        type: 'aerial',
        longitude: 120.51, latitude: -4.84,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'rh-1-31' // 对应街景场景ID
      }
    ]
  },
  {
    sceneId: 'aerial-2', 
    relativeImagePath: 'assets/panos/aerials/2',
    hotspots: [
      {
        type: 'aerial',
        longitude: -1.96, latitude: -20.9, 
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'yxdd-1-68' // 对应街景场景ID
      },
      {
        type: 'aerial',
        longitude: 28.5, latitude: -12.36, 
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'rh-1-9' // 对应街景场景ID
      },
      {
        type: 'aerial',
        longitude: -49.43, latitude: -13.29,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'jy-1-1' // 对应街景场景ID
      },
      {
        type: 'aerial',
        longitude: 76.94, latitude: -14.26, 
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'jxl-3-7' // 对应街景场景ID
      },
      {
        type: 'aerial',
        longitude: -9.05, latitude: -76.29, 
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'yxdd-1-56' // 对应街景场景ID
      },
      {
        type: 'aerial',
        longitude: -176.06, latitude: -25.73, 
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'yxdd-1-47' // 对应街景场景ID
      },
      {
        type: 'aerial',
        longitude: 170.79, latitude: -8.96,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'hl-4-6' // 对应街景场景ID
      },
      {
        type: 'aerial',
        longitude: -137.11, latitude: -12.22,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'ly-2-12' // 对应街景场景ID
      },
      {
        type: 'aerial',
        longitude: 99.74, latitude: -8.49,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'hl-1-1' // 对应街景场景ID
      },
      {
        type: 'aerial',
        longitude: 143.84, latitude: -37.66, 
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'yxdd-3-4' // 对应街景场景ID
      }
    ]
  },
  {
    sceneId: 'aerial-3',
    relativeImagePath: 'assets/panos/aerials/3', 
    hotspots: [
      {
        type: 'aerial',
        longitude: -170.04,
        latitude: -62.64,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'ry-1-3' // 对应街景场景ID
      },
      {
        type: 'aerial',
        longitude: -3.51,
        latitude: -66.82,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'yxdd-1-16' // 对应街景场景ID 
      },
      {
        type: 'aerial',
        longitude:  -14.33,
        latitude:  -46.96,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'hl-5-4' // 对应街景场景ID 
      },
      {
        type: 'aerial',
        longitude: -66.97, latitude: -19.45, 
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'hl-4-6' // 对应街景场景ID 
      },
      {
        type: 'aerial',
        longitude: 82.18, latitude: -24.93,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'yxdd-1-1' // 对应街景场景ID 
      },
      {
        type: 'aerial',
        longitude: 78.76, latitude: -14.68,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'tq-1-15' // 对应街景场景ID 
      },
      {
        type: 'aerial',
        longitude: -174.87, latitude: -32.76,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'ry-1-8' // 对应街景场景ID 
      },
      {
        type: 'aerial',
        longitude: -178.94, latitude: -16.08,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'ry-1-16' // 对应街景场景ID 
      },
      {
        type: 'aerial',
        longitude: -81.39, latitude: -12.37,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'yxdd-1-43' // 对应街景场景ID 
      },
      {
        type: 'aerial',
        longitude: -52.75, latitude: -9.98,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'hl-1-11' // 对应街景场景ID 
      },
      {
        type: 'aerial',
        longitude: 49.44, latitude: -17.77,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'hl-2-8' // 对应街景场景ID 
      },
      {
        type: 'aerial',
        longitude: 13.47, latitude: -17.5,
        icon: 'icons/aerial_hotspot.png',
        targetStreetSceneId: 'hl-2-18' // 对应街景场景ID 
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