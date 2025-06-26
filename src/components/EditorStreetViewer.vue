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

const addScene = async () => {
  let state: any = null;
  try {
    if (window.opener && window.opener.streetConfigState) {
      state = window.opener.streetConfigState;
    }
  } catch (e) {}
  if (!state && typeof window !== 'undefined' && (window as any).streetConfigState) {
    state = (window as any).streetConfigState;
  }
  if (!state || !Array.isArray(state.value.scenes)) return;

  const scenes = state.value.scenes;
  let newSceneId = '';
  let autoSuggest = false;
  if (scenes.length > 0) {
    const lastId = scenes[scenes.length - 1].sceneId;
    // 检查格式 location-x-y
    const match = lastId.match(/^(.*)-(\d+)-(\d+)$/);
    if (match) {
      const prefix = match[1];
      const num1 = match[2];
      const num2 = match[3];
      const nextNum2 = String(Number(num2) + 1);
      newSceneId = `${prefix}-${num1}-${nextNum2}`;
      autoSuggest = true;
      // 弹窗询问
      const res = window.confirm(`自动设置sceneId为“${newSceneId}”？\n选择“确定”自动设置，选择“取消”手动输入。`);
      if (res) {
        // 自动设置
        state.value.scenes.push({
          sceneId: newSceneId,
          relativeImagePath: '',
          hotspots: []
        });
        return;
      }
      // 否则进入手动输入
    }
  }
  // 手动输入
  let manualId = window.prompt('请输入新场景的sceneId：', '');
  if (manualId && manualId.trim()) {
    state.value.scenes.push({
      sceneId: manualId.trim(),
      relativeImagePath: '',
      hotspots: []
    });
  }
  // 用户取消则不添加
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
