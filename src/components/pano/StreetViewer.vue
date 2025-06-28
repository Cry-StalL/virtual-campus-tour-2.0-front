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
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';
import PanoramaViewer from '@/components/pano/base-components/PanoramaViewer.vue';
import { useStreetViewerConfig } from './composables/useStreetViewerConfig';

const panoramaViewerRef = ref(null);
const props = defineProps<{ 
  switchViewer: (name: string) => void;
  initialScene?: number | string;
}>();

const { viewerconfig: viewerconfig, error } = useStreetViewerConfig();

function handleHotspotClick(hotspot: any) {
  // 这里不再处理切换到场景视图的逻辑，交由PanoramaViewer处理
}

onMounted(() => {
  window.streetViewer = {
    switchScene: (name: string) => {
      if (panoramaViewerRef.value) {
        panoramaViewerRef.value.switchScene(name);
      }
    }
  };
});

defineExpose(
  // 暴露子组件的switchScene
  {
    switchScene: (name: string) => {
      if (panoramaViewerRef.value) {
        panoramaViewerRef.value.switchScene(name);
      }
    }
  }
);
</script>

<style scoped>
.street-viewer {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
}
</style>
