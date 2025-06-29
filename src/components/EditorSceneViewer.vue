<template>
  <div class="scene-viewer">
    <PanoramaViewer 
      ref="panoramaViewerRef"
      v-if="sceneConfig"
      :scenes="sceneConfig.scenes"
      :progressiveLoading="sceneConfig.progressiveLoading"
      :resolutions="sceneConfig.resolutions"
      :initialScene="props.initialScene ?? sceneConfig.initialScene"
      debug
    />
    <button class="select-img-btn main" @click="selectPanoramaCurrent" v-if="sceneConfig && currentSceneIdx >= 0">更改当前全景图</button>
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
import { ref, onMounted, defineEmits, watch, nextTick } from 'vue';
import PanoramaViewer from '@/components/pano/base-components/PanoramaViewer.vue';
import { useSceneViewerConfig } from '@/components/pano/composables/useSceneViewerConfig';
import { useSceneEditor } from '@/components/pano/composables/useSceneEditor';

const { viewerconfig: sceneConfig, configFileName } = useSceneViewerConfig();
const props = defineProps<{ switchViewer: (name: string, sceneIdx?: number) => void, initialScene?: string | number, handleReturnToStreet?: () => void }>();
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

// 响应 sceneConfig 变化，自动刷新全景显示器，停留在当前场景
watch(
  () => sceneConfig.value,
  (newVal, oldVal) => {
    if (panoramaViewerRef.value && typeof panoramaViewerRef.value.switchScene === 'function') {
      nextTick(() => {
        panoramaViewerRef.value.switchScene(currentSceneIdx.value || 0);
      });
    }
  },
  { deep: true }
);

const hasPrompted = ref(false);
onMounted(() => {
  let initIdx = 0;
  if (props.initialScene !== undefined && sceneConfig.value && Array.isArray(sceneConfig.value.scenes)) {
    if (typeof props.initialScene === 'number') {
      initIdx = props.initialScene;
    } else {
      // 按sceneId查找
      const idx = sceneConfig.value.scenes.findIndex(s => s.sceneId == props.initialScene);
      if (idx >= 0) initIdx = idx;
    }
  }
  currentSceneIdx.value = initIdx;
  if (panoramaViewerRef.value && typeof panoramaViewerRef.value.switchScene === 'function') {
    nextTick(() => panoramaViewerRef.value.switchScene(initIdx));
  }
  if (!hasPrompted.value && configFileName.value) {
    alert('当前读取的Scene配置文件：' + configFileName.value);
    hasPrompted.value = true;
  }
});

const handleReturn = () => {
  if (props.handleReturnToStreet) {
    props.handleReturnToStreet();
  } else if (props.switchViewer) {
    props.switchViewer('street', 0);
  }
};
</script>

<style scoped>
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
.add-hotspot-btn {
  position: fixed;
  right: 30px;
  bottom: 270px;
  z-index: 200;
  font-size: 16px;
  padding: 12px 24px;
  background: #e6a23c;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}
.add-hotspot-btn:hover {
  background: #f7c24d;
}
.hotspot-tip {
  position: fixed;
  right: 30px;
  bottom: 320px;
  background: #fffbe6;
  color: #e6a23c;
  padding: 8px 18px;
  border-radius: 6px;
  font-size: 16px;
  z-index: 210;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
}
.hotspot-adding-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 4000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hotspot-adding-content {
  background: #fff;
  border-radius: 10px;
  min-width: 300px;
  max-width: 500px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 24px;
  position: relative;
}
.hotspot-adding-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}
.hotspot-type-select {
  margin-bottom: 16px;
}
.hotspot-position-preview {
  margin-bottom: 16px;
}
.next-btn, .confirm-btn, .cancel-btn {
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;
}
.next-btn:hover, .confirm-btn:hover, .cancel-btn:hover {
  background: #66b1ff;
}
.target-scene-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 4000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.target-scene-content {
  background: #fff;
  border-radius: 10px;
  min-width: 300px;
  max-width: 500px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 24px;
  position: relative;
}
.target-scene-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}
.target-scene-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.target-scene-list li {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  font-size: 16px;
}
.target-scene-list li:hover {
  background: #f5f5f5;
}

.confirm-hotspot-btn {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30px;
  background: #67c23a;
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 7px 22px;
  font-size: 15px;
  min-width: 90px;
  min-height: 36px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  z-index: 4101;
}
.confirm-hotspot-btn:hover {
  background: #85ce61;
}
.cancel-hotspot-btn {
  position: fixed;
  left: 30px;
  bottom: 30px;
  background: #f56c6c;
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 7px 22px;
  font-size: 15px;
  min-width: 90px;
  min-height: 36px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  z-index: 4101;
}
.cancel-hotspot-btn:hover {
  background: #ff7875;
}
.hotspot-type-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 4100;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hotspot-type-content {
  background: #fff;
  border-radius: 10px;
  min-width: 300px;
  max-width: 400px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hotspot-type-header {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 18px;
}
.hotspot-type-select {
  margin-bottom: 18px;
}
.hotspot-type-btn {
  background: #e6a23c;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px 32px;
  font-size: 17px;
  cursor: pointer;
  margin-bottom: 10px;
}
.hotspot-type-btn:hover {
  background: #f7c24d;
}
.cancel-btn {
  background: #f56c6c;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
.cancel-btn:hover {
  background: #ff7875;
}
.back-btn {
  background: #888;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 16px;
}
.back-btn:hover {
  background: #b0b0b0;
}

.return-button {
  position: fixed;
  bottom: 30px;
  left: 30px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 12px 20px;
  font-size: 16px;
  background-color: rgba(64, 158, 255, 0.9);
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.return-button:hover {
  background-color: rgba(64, 158, 255, 1);
  transform: scale(1.05);
}

.return-button .el-icon {
  margin-right: 5px;
}
</style>
