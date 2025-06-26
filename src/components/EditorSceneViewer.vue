<template>
  <div class="scene-viewer">
    <PanoramaViewer 
      ref="panoramaViewerRef"
      v-if="sceneConfig"
      :scenes="sceneConfig.scenes"
      :progressiveLoading="sceneConfig.progressiveLoading"
      :resolutions="sceneConfig.resolutions"
      debug
    />
    <button class="select-img-btn main" @click="selectPanoramaCurrent" v-if="sceneConfig && currentSceneIdx >= 0">选择当前全景图</button>
    <button class="add-scene-btn" @click="() => addScene(jumpToScene)" v-if="sceneConfig">添加场景</button>
    <button class="show-scene-list-btn" @click="openSceneList" v-if="sceneConfig">显示场景列表</button>
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
    <!-- 返回按钮 -->
    <el-button
      class="return-button"
      type="primary"
      round
      @click="handleReturn"
      size="large"
    >
      <el-icon><ArrowLeft /></el-icon>
      返回街景
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';
import PanoramaViewer from '@/components/pano/base-components/PanoramaViewer.vue';
import { useSceneViewerConfig } from '@/components/pano/composables/useSceneViewerConfig';
import { useSceneEditor } from '@/components/pano/composables/useSceneEditor';

const { viewerconfig: sceneConfig, configFileName } = useSceneViewerConfig();
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
} = useSceneEditor(sceneConfig);

const jumpToScene = (idx: number) => {
  if (panoramaViewerRef.value && typeof panoramaViewerRef.value.switchScene === 'function') {
    panoramaViewerRef.value.switchScene(idx);
    currentSceneIdx.value = idx;
    emit('sceneChanged', idx);
    closeSceneList();
  }
};

const hasPrompted = ref(false);
onMounted(() => {
  currentSceneIdx.value = 0;
  if (!hasPrompted.value && configFileName.value) {
    alert('当前读取的Scene配置文件：' + configFileName.value);
    hasPrompted.value = true;
  }
});

const handleReturn = () => {
  if (props.switchViewer) {
    props.switchViewer('street');
  }
};
</script>

<style scoped>
.select-img-btn.main {
  position: fixed;
  left: 50%;
  bottom: 220px;
  transform: translateX(-50%);
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
