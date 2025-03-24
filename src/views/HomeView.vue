<template>
  <div class="home">
    <div class="content">
      <!-- 这里将放置全景导览的主要内容 -->
      <PanoramaViewer />
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里将添加组件逻辑
import PanoramaViewer from '../components/PanoramaViewer.vue';

// 在使用 <script setup> 时，不需要使用 defineComponent
// 组件会自动注册，不需要在 components 选项中声明
</script>

<style scoped>
.home {
  padding: 20px;
}

.content {
  margin-top: 20px;
}
</style> 