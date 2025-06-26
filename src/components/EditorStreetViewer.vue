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
    <button class="add-scene-btn" @click="addScene" v-if="viewerconfig">添加场景</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PanoramaViewer from '@/components/pano/base-components/PanoramaViewer.vue';
import { useStreetViewerConfig } from '@/components/pano/composables/useStreetViewerConfig';
import type { SceneConfig } from '@/components/pano/composables/ViewerConfigTypes';

const { viewerconfig, configFileName } = useStreetViewerConfig();
const props = defineProps<{ switchViewer: (name: string) => void }>();

const addScene = () => {
  // 优先通过 window.opener 修改主页面 streetConfigState
  let state: any = null;
  try {
    if (window.opener && window.opener.streetConfigState) {
      state = window.opener.streetConfigState;
    }
  } catch (e) {}
  if (!state && typeof window !== 'undefined' && (window as any).streetConfigState) {
    state = (window as any).streetConfigState;
  }
  if (state && Array.isArray(state.value.scenes)) {
    state.value.scenes.push({
      sceneId: '',
      relativeImagePath: '',
      hotspots: []
    });
  }
};

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
.add-scene-btn {
  position: fixed;
  right: 30px;
  bottom: 90px;
  z-index: 200;
  font-size: 16px;
  padding: 12px 24px;
  background: #67c23a;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}
.add-scene-btn:hover {
  background: #85ce61;
}
</style>

<script lang="ts">
declare global {
  interface Window {
    __streetConfigPromptedCount?: { count: number };
  }
}
</script>
