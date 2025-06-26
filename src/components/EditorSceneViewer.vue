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
    <button class="add-scene-btn" @click="addScene" v-if="sceneConfig">添加场景</button>
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
              <button class="jump-btn" @click="jumpToScene(i)">跳转</button>
              <button class="delete-btn" @click="deleteScene(i)">删除</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
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
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';
import PanoramaViewer from '@/components/pano/base-components/PanoramaViewer.vue';
import { useSceneViewerConfig } from '@/components/pano/composables/useSceneViewerConfig';

const { viewerconfig: sceneConfig, configFileName } = useSceneViewerConfig();
const props = defineProps<{ switchViewer: (name: string) => void }>();
const emit = defineEmits(['sceneChanged']);

const showSceneListModal = ref(false);
const sceneList = ref<any[]>([]);
const panoramaViewerRef = ref();

const openSceneList = () => {
  if (!sceneConfig.value || !Array.isArray(sceneConfig.value.scenes)) return;
  sceneList.value = sceneConfig.value.scenes;
  showSceneListModal.value = true;
};
const closeSceneList = () => {
  showSceneListModal.value = false;
};
const deleteScene = (idx: number) => {
  if (!sceneConfig.value || !Array.isArray(sceneConfig.value.scenes)) return;
  const scene = sceneConfig.value.scenes[idx];
  if (!scene) return;
  const ok = window.confirm(`确定要删除场景“${scene.sceneId || '(未设置sceneId)'}”吗？`);
  if (ok) {
    sceneConfig.value.scenes.splice(idx, 1);
    sceneList.value = sceneConfig.value.scenes;
  }
};
const addScene = async () => {
  if (!sceneConfig.value || !Array.isArray(sceneConfig.value.scenes)) return;
  const scenes = sceneConfig.value.scenes;
  let newSceneId = '';
  let autoSuggest = false;
  if (scenes.length > 0) {
    const lastId = scenes[scenes.length - 1].sceneId;
    const match = lastId.match(/^(.*)-(\d+)-(\d+)$/);
    if (match) {
      const prefix = match[1];
      const num1 = match[2];
      const num2 = match[3];
      const nextNum2 = String(Number(num2) + 1);
      newSceneId = `${prefix}-${num1}-${nextNum2}`;
      autoSuggest = true;
      const res = window.confirm(`自动设置sceneId为“${newSceneId}”？\n选择“确定”自动设置，选择“取消”手动输入。`);
      if (res) {
        scenes.push({
          sceneId: newSceneId,
          relativeImagePath: '',
          hotspots: []
        });
        jumpToScene(scenes.length - 1);
        return;
      }
    }
  }
  let manualId = window.prompt('请输入新场景的sceneId：', '');
  if (manualId && manualId.trim()) {
    scenes.push({
      sceneId: manualId.trim(),
      relativeImagePath: '',
      hotspots: []
    });
    jumpToScene(scenes.length - 1);
  }
};
const jumpToScene = (idx: number) => {
  if (panoramaViewerRef.value && typeof panoramaViewerRef.value.switchScene === 'function') {
    panoramaViewerRef.value.switchScene(idx);
    emit('sceneChanged', idx);
    closeSceneList();
  }
};

const hasPrompted = ref(false);
onMounted(() => {
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
.scene-viewer {
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
