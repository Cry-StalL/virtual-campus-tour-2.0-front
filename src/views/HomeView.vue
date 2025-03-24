<template>
  <div class="home">
    <PanoramaViewer imagePath="/images/panorama.jpg" />
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
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style> 