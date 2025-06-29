<template>
  <div class="street-viewer">
    <!-- 使用基础 Viewer 组件 -->
    <PanoramaViewer 
      ref="panoramaViewerRef" 
      v-if="viewerconfig"
      :scenes="viewerconfig.scenes.map(scene => ({
        ...scene,
        hotspots: scene.hotspots.map(h => ({
          ...h,
          onClick: () => handleHotspotClick(h)
        }))
      }))"
      :progressiveLoading="viewerconfig.progressiveLoading"
      :resolutions="viewerconfig.resolutions"
      :switchViewer="props.switchViewer" 
      :initialScene="props.initialScene ?? viewerconfig.initialScene"
    />

    <!-- 返回航拍图按钮 -->
    <el-button
      class="return-button"
      type="primary"
      round
      @click="handleReturnToAerial"
      size="large"
    >
      <el-icon><ArrowLeft /></el-icon>
      返回航拍图
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import PanoramaViewer from '@/components/pano/base-components/PanoramaViewer.vue';
import { useStreetViewerConfig } from './composables/useStreetViewerConfig';

const panoramaViewerRef = ref(null);
const props = defineProps<{ 
  switchViewer: (name: string) => void;
  initialScene?: number | string;
  handleReturnToAerial?: () => void; // 返回航拍图的方法
}>();

const { viewerconfig: viewerconfig, error } = useStreetViewerConfig();

function handleHotspotClick(hotspot: any) {
  // 这里不再处理切换到场景视图的逻辑，交由PanoramaViewer处理
}

const handleReturnToAerial = () => {
  if (props.handleReturnToAerial) {
    props.handleReturnToAerial();
  }
};

onMounted(() => {
  (window as any).streetViewer = {
    switchScene: (name: string) => {
      if (panoramaViewerRef.value) {
        (panoramaViewerRef.value as any).switchScene(name);
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

defineExpose(
  // 暴露子组件的switchScene和getCurrentSceneId
  {
    switchScene: (name: string) => {
      if (panoramaViewerRef.value) {
        (panoramaViewerRef.value as any).switchScene(name);
      }
    },
    getCurrentSceneId: () => {
      if (panoramaViewerRef.value && typeof (panoramaViewerRef.value as any).getCurrentSceneId === 'function') {
        return (panoramaViewerRef.value as any).getCurrentSceneId();
      }
      return undefined;
    }
  }
);
</script>

<style scoped>
.street-viewer {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  position: relative;
}

.return-button {
  position: fixed;
  bottom: 30px;
  left: 30px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 12px 20px;
  font-size: 16px;
  background-color: rgba(64, 158, 255, 0.9);
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.return-button:hover {
  background-color: rgba(64, 158, 255, 1);
  transform: scale(1.05);
}

.return-button .el-icon {
  margin-right: 5px;
}
</style>
