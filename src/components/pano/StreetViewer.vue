<template>
  <div class="street-viewer">
    <!-- 使用基础 Viewer 组件 -->
    <PanoramaViewer ref="panoramaViewerRef" :scenes="scenes" />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import PanoramaViewer from '@/components/pano/base-components/PanoramaViewer.vue';

const panoramaViewerRef = ref(null);
const props = defineProps<{ switchViewer: (name: string) => void }>();

// 定义场景数据
const scenes = ref([
  {
    sceneId: "scene",
    imagePath: "http://127.0.0.1:8080/assets/panos/streets/byy_road1/1.jpg",
    hotspots: [
      {
        type: 'custom',
        longitude: 10.24,
        latitude: 10.72,
        icon: "/icons/scene_hotspot.png",
        title: '切换到场景视图',
        description: '',
        onClick: () => {
          if (props.switchViewer && typeof props.switchViewer === 'function') {
            props.switchViewer('scene');
          }
        }
      }
    ]
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
