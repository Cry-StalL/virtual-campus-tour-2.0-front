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
    <button class="show-scene-list-btn" @click="openSceneList" v-if="viewerconfig">显示场景列表</button>

    <div v-if="showSceneListModal" class="scene-list-modal">
      <div class="scene-list-content">
        <div class="scene-list-header">
          <span>场景列表</span>
          <button class="close-btn" @click="closeSceneList">×</button>
        </div>
        <ul class="scene-list-ul">
          <li v-for="(scene, i) in sceneList" :key="i">
            <span>{{ i + 1 }}. {{ scene.sceneId || '(未设置sceneId)' }}</span>
            <button class="delete-btn" @click="deleteScene(i)">删除</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PanoramaViewer from '@/components/pano/base-components/PanoramaViewer.vue';
import { useStreetViewerConfig } from '@/components/pano/composables/useStreetViewerConfig';
import type { SceneConfig } from '@/components/pano/composables/ViewerConfigTypes';

const { viewerconfig, configFileName } = useStreetViewerConfig();
const props = defineProps<{ switchViewer: (name: string) => void }>();

const showSceneListModal = ref(false);

const getSceneState = () => {
  let state: any = null;
  try {
    if (window.opener && window.opener.streetConfigState) {
      state = window.opener.streetConfigState;
    }
  } catch (e) {}
  if (!state && typeof window !== 'undefined' && (window as any).streetConfigState) {
    state = (window as any).streetConfigState;
  }
  return state;
};

const sceneList = ref<SceneConfig[]>([]);

const openSceneList = () => {
  const state = getSceneState();
  if (!state || !Array.isArray(state.value.scenes)) return;
  sceneList.value = state.value.scenes;
  showSceneListModal.value = true;
};

const closeSceneList = () => {
  showSceneListModal.value = false;
};

const deleteScene = (idx: number) => {
  const state = getSceneState();
  if (!state || !Array.isArray(state.value.scenes)) return;
  const scene = state.value.scenes[idx];
  if (!scene) return;
  const ok = window.confirm(`确定要删除场景“${scene.sceneId || '(未设置sceneId)'}”吗？`);
  if (ok) {
    state.value.scenes.splice(idx, 1);
    // 立即刷新弹窗内容
    sceneList.value = state.value.scenes;
  }
};

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
.show-scene-list-btn {
  position: fixed;
  right: 30px;
  bottom: 150px;
  z-index: 200;
  font-size: 16px;
  padding: 12px 24px;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}
.show-scene-list-btn:hover {
  background: #66b1ff;
}
.scene-list-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.scene-list-content {
  background: #fff;
  border-radius: 10px;
  min-width: 340px;
  min-height: 180px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 24px 24px 12px 24px;
  position: relative;
}
.scene-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}
.close-btn {
  background: none;
  border: none;
  font-size: 26px;
  cursor: pointer;
  color: #888;
}
.scene-list-ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.scene-list-ul li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 16px;
}
.delete-btn {
  background: #f56c6c;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 14px;
  font-size: 15px;
  cursor: pointer;
  margin-left: 12px;
}
.delete-btn:hover {
  background: #ff7875;
}
</style>

<script lang="ts">
declare global {
  interface Window {
    __streetConfigPromptedCount?: { count: number };
  }
}
</script>
