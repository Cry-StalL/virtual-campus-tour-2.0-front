<template>
  <div class="scene-viewer">
    <!-- 使用基础 Viewer 组件 -->
    <PanoramaViewer :scenes="scenes" />
  </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import PanoramaViewer from './base-components/PanoramaViewer.vue';

// 定义场景数据
const scenes = ref([
  {
    sceneId: "scene1",
    imagePath: "/images/panorama.jpg",
  },
]);
</script>
  
<style scoped>
.street-viewer {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
}
</style> 