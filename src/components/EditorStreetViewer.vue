<template>
  <div class="street-viewer">
    <PanoramaViewer 
      ref="panoramaViewerRef" 
      v-if="streetConfig"
      :scenes="streetConfig.scenes"
      :progressiveLoading="streetConfig.progressiveLoading"
      :resolutions="streetConfig.resolutions"
      debug
      :switchViewer="props.switchViewer"
    />
    <button class="add-scene-btn" @click="() => addScene(jumpToScene)" v-if="streetConfig">添加场景</button>
    <button class="show-scene-list-btn" @click="openSceneList" v-if="streetConfig">显示场景列表</button>
    <button class="select-img-btn main" @click="selectPanoramaCurrent" v-if="streetConfig && currentSceneIdx >= 0">更改当前全景图</button>
    <div v-if="showSceneListModal" class="scene-list-modal">
      <div class="scene-list-content">
        <div class="scene-list-header">
          <span>场景列表</span>
          <button class="close-btn" @click="closeSceneList">×</button>
        </div>
        <ul class="scene-list-ul">
          <li v-for="(scene, i) in sceneList" :key="i">
            <span>{{ i + 1 }}. {{ scene.sceneId || '(未设置sceneId)' }}</span>
            <div>
              <button class="jump-btn" @click="() => jumpToScene(i)">跳转</button>
              <button class="delete-btn" @click="() => deleteScene(i)">删除</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <input
      ref="fileInputRef"
      type="file"
      :accept="fileMode === 'file' ? '.jpg' : undefined"
      :webkitdirectory="fileMode === 'dir' ? true : undefined"
      style="display:none"
      @change="onFileChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits, nextTick, watch } from 'vue';
import PanoramaViewer from '@/components/pano/base-components/PanoramaViewer.vue';
import { useStreetViewerConfig } from '@/components/pano/composables/useStreetViewerConfig';
import { useSceneEditor } from '@/components/pano/composables/useSceneEditor';

const { viewerconfig: streetConfig, configFileName } = useStreetViewerConfig();
const props = defineProps<{ switchViewer: (name: string) => void }>();
const emit = defineEmits(['sceneChanged']);

// 使用 useSceneEditor 统一场景编辑逻辑
const {
  showSceneListModal,
  sceneList,
  panoramaViewerRef,
  fileInputRef,
  fileMode,
  fileTargetIdx,
  currentSceneIdx,
  openSceneList,
  closeSceneList,
  deleteScene,
  addScene,
  selectPanoramaCurrent,
  onFileChange
} = useSceneEditor(streetConfig);

const jumpToScene = (idx: number) => {
  if (panoramaViewerRef.value && typeof panoramaViewerRef.value.switchScene === 'function') {
    panoramaViewerRef.value.switchScene(idx);
    currentSceneIdx.value = idx;
    emit('sceneChanged', idx); // 通知父组件场景已切换
    closeSceneList();
  }
};

// 响应 streetConfig 变化，自动刷新全景显示器，停留在当前场景
watch(
  () => streetConfig.value,
  (newVal, oldVal) => {
    if (panoramaViewerRef.value && typeof panoramaViewerRef.value.switchScene === 'function') {
      // 保持 currentSceneIdx 不变
      nextTick(() => {
        panoramaViewerRef.value.switchScene(currentSceneIdx.value || 0);
      });
    }
  },
  { deep: true }
);

// 只提示一次配置文件名
const promptCounter = window.__streetConfigPromptedCount = window.__streetConfigPromptedCount || { count: 0 };
onMounted(() => {
  currentSceneIdx.value = 0;
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
.jump-btn {
  background: #67c23a;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 14px;
  font-size: 15px;
  cursor: pointer;
  margin-right: 8px;
}
.jump-btn:hover {
  background: #85ce61;
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
.select-img-btn.main {
  position: fixed;
  right: 30px;
  bottom: 210px;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px 32px;
  font-size: 18px;
  cursor: pointer;
  z-index: 201;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}
.select-img-btn.main:hover {
  background: #66b1ff;
}
</style>

<script lang="ts">
declare global {
  interface Window {
    __streetConfigPromptedCount?: { count: number };
  }
}
</script>
