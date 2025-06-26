<template>
  <div class="scene-viewer">
    <PanoramaViewer 
      v-if="viewerconfig"
      :scenes="viewerconfig.scenes"
      :progressiveLoading="viewerconfig.progressiveLoading"
      :resolutions="viewerconfig.resolutions"
      debug
    />
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
import PanoramaViewer from '@/components/pano/base-components/PanoramaViewer.vue';
import { useSceneViewerConfig } from '@/components/pano/composables/useSceneViewerConfig';

const { viewerconfig } = useSceneViewerConfig();

const props = defineProps<{
  switchViewer: (name: string) => void;
}>();

// 处理返回按钮点击
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
