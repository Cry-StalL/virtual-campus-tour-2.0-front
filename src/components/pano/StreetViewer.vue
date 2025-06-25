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
    />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import PanoramaViewer from '@/components/pano/base-components/PanoramaViewer.vue';
import { useStreetViewerConfig } from './composables/useStreetViewerConfig';

const panoramaViewerRef = ref(null);
const props = defineProps<{ switchViewer: (name: string) => void }>();

const { viewerconfig: viewerconfig, error } = useStreetViewerConfig();

function handleHotspotClick(hotspot: any) {
  if (hotspot.title === '切换到场景视图' && props.switchViewer && typeof props.switchViewer === 'function') {
    props.switchViewer('scene');
  }
}
</script>

<style scoped>
.street-viewer {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
}
</style>
