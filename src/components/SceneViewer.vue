<template>
  <div class="scene-viewer">
    <!-- 使用基础 Viewer 组件 -->
    <PanoramaViewer :scenes="scenes" />
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
import { ref } from 'vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import PanoramaViewer from './base-components/PanoramaViewer.vue';

const props = defineProps<{ switchViewer: (name: string) => void }>();

// 处理返回按钮点击
const handleReturn = () => {
  if (props.switchViewer) {
    props.switchViewer('street');
  }
};

// 定义场景数据
const scenes = ref([
  {
    sceneId: "scene1",
    imagePath: "/images/panorama.jpg",
  },
]);
</script>
  
<style scoped>
.scene-viewer {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  position: relative;
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