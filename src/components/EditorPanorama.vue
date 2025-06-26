<template>
  <div class="editor-viewer">
    <PanoramaViewerGroup
      :viewers="viewers"
      ref="viewerGroup"
      initialViewerName="street"
      :progressiveLoading="true"
      :resolutions="resolutions"
    />
    <button class="save-btn" @click="handleSaveConfig">保存当前json文件</button>
    <JsonViewerModal
      :json="streetConfigState"
      title="Street Viewer 配置 (只读)"
      :visible="showStreetJson"
      @close="showStreetJson = false"
    />
    <JsonViewerModal
      :json="sceneConfigState"
      title="Scene Viewer 配置 (只读)"
      :visible="showSceneJson"
      @close="showSceneJson = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw, computed, watch } from 'vue';
import PanoramaViewerGroup from '@/components/pano/base-components/PanoramaViewerGroup.vue';
import EditorStreetViewer from './EditorStreetViewer.vue';
import EditorSceneViewer from './EditorSceneViewer.vue';
import { saveJsonToFile } from '@/components/pano/composables/editorFileUtils';
import { useStreetViewerConfig } from '@/components/pano/composables/useStreetViewerConfig';
import { useSceneViewerConfig } from '@/components/pano/composables/useSceneViewerConfig';
import JsonViewerModal from './JsonViewerModal.vue';

const viewerGroup = ref();
const resolutions = ["1920x960", "3840x1920", "7680x3840"];
const viewers = [
  { name: 'street', component: markRaw(EditorStreetViewer) },
  { name: 'scene', component: markRaw(EditorSceneViewer) }
];

// 内存副本
const streetConfigState = ref<any>(null);
const sceneConfigState = ref<any>(null);

const { viewerconfig: streetConfig, configFileName: streetFile } = useStreetViewerConfig();
const { viewerconfig: sceneConfig, configFileName: sceneFile } = useSceneViewerConfig();

// 当前viewer类型
const currentViewer = computed(() => viewerGroup.value?.currentViewer || 'street');

// 弹窗显示状态
const showStreetJson = ref(false);
const showSceneJson = ref(false);

// 监听配置加载，存入内存并自动弹窗
watch(streetConfig, (val) => {
  if (val) {
    streetConfigState.value = JSON.parse(JSON.stringify(val));
    showStreetJson.value = true;
  }
}, { immediate: true });
watch(sceneConfig, (val) => {
  if (val) {
    sceneConfigState.value = JSON.parse(JSON.stringify(val));
    showSceneJson.value = true;
  }
}, { immediate: true });

// 只在首次读取时自动弹出新窗口，不再弹出网页内弹窗
function openJsonWindow(type: 'street' | 'scene', json: any) {
  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(`<!DOCTYPE html><html><head><title>${type}-viewer-config.json</title><style>body{margin:0;background:#f8f8f8;}pre{padding:24px;font-size:15px;font-family:'Fira Mono','Consolas','Menlo',monospace;white-space:pre-wrap;word-break:break-all;background:#fff;border-radius:8px;max-width:90vw;max-height:90vh;overflow:auto;margin:40px auto;box-shadow:0 4px 24px rgba(0,0,0,0.12);}</style></head><body><pre>${JSON.stringify(json, null, 2)}</pre></body></html>`);
  win.document.close();
}

let streetJsonWindowOpened = false;
let sceneJsonWindowOpened = false;

watch(streetConfig, (val, oldVal) => {
  if (val && !streetJsonWindowOpened) {
    streetConfigState.value = JSON.parse(JSON.stringify(val));
    openJsonWindow('street', val);
    streetJsonWindowOpened = true;
    showStreetJson.value = false;
  }
}, { immediate: true });
watch(sceneConfig, (val, oldVal) => {
  if (val && !sceneJsonWindowOpened) {
    sceneConfigState.value = JSON.parse(JSON.stringify(val));
    openJsonWindow('scene', val);
    sceneJsonWindowOpened = true;
    showSceneJson.value = false;
  }
}, { immediate: true });

function handleSaveConfig() {
  if (currentViewer.value === 'street') {
    if (streetConfigState.value) {
      saveJsonToFile(streetConfigState.value, 'street-viewer-config');
    }
  } else if (currentViewer.value === 'scene') {
    if (sceneConfigState.value) {
      saveJsonToFile(sceneConfigState.value, 'scene-viewer-config');
    }
  }
}
</script>

<style scoped>
.editor-viewer {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #222;
}
.save-btn {
  position: absolute;
  top: 20px;
  right: 40px;
  z-index: 1001;
  padding: 8px 20px;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.save-btn:hover {
  background: #66b1ff;
}
</style>
