<template>
  <div class="editor-viewer">
    <PanoramaViewerGroup
      :viewers="viewers"
      ref="viewerGroup"
      initialViewerName="street"
      :progressiveLoading="true"
      :resolutions="resolutions"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue';
import PanoramaViewerGroup from '@/components/pano/base-components/PanoramaViewerGroup.vue';
import EditorStreetViewer from './EditorStreetViewer.vue';
import EditorSceneViewer from './EditorSceneViewer.vue';

const viewerGroup = ref();
const resolutions = ["1920x960", "3840x1920", "7680x3840"];
const viewers = [
  { name: 'street', component: markRaw(EditorStreetViewer) },
  { name: 'scene', component: markRaw(EditorSceneViewer) }
];
</script>

<style scoped>
.editor-viewer {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #222;
}
</style>
