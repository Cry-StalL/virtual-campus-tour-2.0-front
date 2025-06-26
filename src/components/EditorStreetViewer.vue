<template>
  <div class="street-viewer">
    <PanoramaViewer 
      ref="panoramaViewerRef" 
      v-if="viewerconfig"
      :scenes="viewerconfig.scenes"
      :progressiveLoading="viewerconfig.progressiveLoading"
      :resolutions="viewerconfig.resolutions"
      debug
      :switchViewer="props.switchViewer"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PanoramaViewer from '@/components/pano/base-components/PanoramaViewer.vue';
import { useStreetViewerConfig } from '@/components/pano/composables/useStreetViewerConfig';

const { viewerconfig, configFileName } = useStreetViewerConfig();
const props = defineProps<{ switchViewer: (name: string) => void }>();

// 计数器，保证只提示一次
const promptCounter = window.__streetConfigPromptedCount = window.__streetConfigPromptedCount || { count: 0 };

onMounted(() => {
  if (promptCounter.count === 0 && configFileName.value) {
    alert('当前读取的Street配置文件：' + configFileName.value);
    promptCounter.count++;
  }
});
</script>

<style scoped>
.street-viewer {
  width: 100vw;
  height: 100vh;
  background: #222;
}
</style>

<script lang="ts">
declare global {
  interface Window {
    __streetConfigPromptedCount?: { count: number };
  }
}
</script>
