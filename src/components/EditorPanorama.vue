<template>
  <div class="editor-viewer">
    <div class="scene-id-bar">
      当前 sceneId：{{ currentSceneIdDisplay }}
    </div>
    <PanoramaViewerGroup
      :viewers="viewers"
      ref="viewerGroup"
      initialViewerName="street"
      :progressiveLoading="true"
      :resolutions="resolutions"
      @sceneChanged="onSceneChanged"
    />
  </div>
</template>

<script setup lang="ts">
import { markRaw, watch, ref, computed } from 'vue';
import PanoramaViewerGroup from '@/components/pano/base-components/PanoramaViewerGroup.vue';
import EditorStreetViewer from './EditorStreetViewer.vue';
import EditorSceneViewer from './EditorSceneViewer.vue';
import { saveJsonToFile } from '@/components/pano/composables/editorFileUtils';
import { useStreetViewerConfig } from '@/components/pano/composables/useStreetViewerConfig';
import { useSceneViewerConfig } from '@/components/pano/composables/useSceneViewerConfig';

const viewerGroup = ref();
const resolutions = ["1920x960", "3840x1920", "7680x3840"];
const viewers = [
  { name: 'street', component: markRaw(EditorStreetViewer) },
  { name: 'scene', component: markRaw(EditorSceneViewer) }
];

// 直接使用响应式 streetConfig/sceneConfig
const { viewerconfig: streetConfig, configFileName: streetFile } = useStreetViewerConfig();
const { viewerconfig: sceneConfig, configFileName: sceneFile } = useSceneViewerConfig();

// 当前场景索引
const currentSceneIdx = ref(0);

// 弹窗显示状态（如有需要可保留）
const showStreetJson = ref(false);
const showSceneJson = ref(false);

// 只在首次读取时弹出新窗口，后续每次json变更都自动刷新窗口内容
let streetJsonWindow: Window | null = null;
let sceneJsonWindow: Window | null = null;

function openOrUpdateJsonWindow(type: 'street' | 'scene', json: any) {
  let win: Window | null;
  if (type === 'street') {
    if (!streetJsonWindow || streetJsonWindow.closed) {
      streetJsonWindow = window.open('', '_blank');
    }
    win = streetJsonWindow;
  } else {
    if (!sceneJsonWindow || sceneJsonWindow.closed) {
      sceneJsonWindow = window.open('', '_blank');
    }
    win = sceneJsonWindow;
  }
  if (!win) return;
  // 生成唯一变量名，避免多窗口冲突
  const varName = `__${type}JsonData`;
  // 如果窗口已存在则只刷新内容，不重新打开
  if (win.document.body && win.document.getElementById('json-pre')) {
    const pre = win.document.getElementById('json-pre');
    if (pre) pre.textContent = JSON.stringify(json, null, 2);
    (win as any)[varName] = json;
    return;
  }
  win.document.open();
  win.document.write(`<!DOCTYPE html><html><head><title>${type}-viewer-config.json</title><style>body{margin:0;background:#f8f8f8;}pre{padding:24px;font-size:15px;font-family:'Fira Mono','Consolas','Menlo',monospace;white-space:pre-wrap;word-break:break-all;background:#fff;border-radius:8px;max-width:90vw;max-height:90vh;overflow:auto;margin:40px auto 80px auto;box-shadow:0 4px 24px rgba(0,0,0,0.12);} .save-btn{position:fixed;right:40px;bottom:40px;z-index:1001;padding:12px 32px;background:#409eff;color:#fff;border:none;border-radius:6px;font-size:18px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.12);} .save-btn:hover{background:#66b1ff;}</style></head><body><pre id="json-pre">${JSON.stringify(json, null, 2)}</pre><button class='save-btn' id='saveBtn'>保存${type==='street'?'Street':'Scene'}配置</button><script>window.${varName} = ${JSON.stringify(json)};document.getElementById('saveBtn').onclick = function () { if(window.opener && typeof window.opener.saveJson === 'function'){ window.opener.saveJson('${type}'); } else { alert('主页面未找到 saveJson 方法'); } };
  // 定时同步主页面最新json
  setInterval(function(){
    try {
      if(window.opener && window.opener.${type}Config && window.opener.${type}Config.value){
        var latest = window.opener.${type}Config.value;
        document.getElementById('json-pre').textContent = JSON.stringify(latest, null, 2);
        window.${varName} = latest;
      }
    } catch(e){}
  }, 500);
  <\/script></body></html>`);
  win.document.close();
}

let streetJsonWindowInitialized = false;
let sceneJsonWindowInitialized = false;

// 直接 watch 响应式对象
watch(streetConfig, (val) => {
  if (val && !streetJsonWindowInitialized) {
    openOrUpdateJsonWindow('street', val);
    streetJsonWindowInitialized = true;
    showStreetJson.value = false;
  }
});
watch(sceneConfig, (val) => {
  if (val && !sceneJsonWindowInitialized) {
    openOrUpdateJsonWindow('scene', val);
    sceneJsonWindowInitialized = true;
    showSceneJson.value = false;
  }
});
// 每次变更都刷新窗口内容
watch(streetConfig, (val) => {
  if (val && streetJsonWindow) {
    openOrUpdateJsonWindow('street', val);
  }
});
watch(sceneConfig, (val) => {
  if (val && sceneJsonWindow) {
    openOrUpdateJsonWindow('scene', val);
  }
});

function saveJson(type: 'street' | 'scene') {
  if (type === 'street' && streetConfig.value) {
    saveJsonToFile(streetConfig.value, 'street-viewer-config');
  } else if (type === 'scene' && sceneConfig.value) {
    saveJsonToFile(sceneConfig.value, 'scene-viewer-config');
  }
}
// 让新窗口能通过 window.opener.saveJson 调用
(window as any).saveJson = saveJson;
(window as any).streetConfig = streetConfig;
(window as any).sceneConfig = sceneConfig;

/**
 * 获取当前viewer名称（'street' 或 'scene'）
 */
function getCurrentViewerName(): string {
  return viewerGroup.value?.getCurrentViewerName?.() || 'street';
}

const dummySceneChange = ref(0);
function onSceneChanged(idx: number) {
  currentSceneIdx.value = idx;
}

// 获取当前 sceneId
const currentSceneIdDisplay = computed(() => {
  const viewerName = getCurrentViewerName();
  let config = viewerName === 'street' ? streetConfig.value : sceneConfig.value;
  if (!config || !Array.isArray(config.scenes) || config.scenes.length === 0) return '无';
  let idx = currentSceneIdx.value;
  if (idx < 0 || idx >= config.scenes.length) idx = 0;
  return config.scenes[idx]?.sceneId || '无';
});
</script>

<style scoped>
.editor-viewer {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #222;
}
.scene-id-bar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2000;
  background: #f0f0f0;
  color: #111;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 32px 10px 20px;
  border-bottom-right-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  user-select: none;
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
