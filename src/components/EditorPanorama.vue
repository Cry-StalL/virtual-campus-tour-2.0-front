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
import StreetViewer from '@/components/pano/StreetViewer.vue';
import SceneViewer from '@/components/pano/SceneViewer.vue';

const viewerGroup = ref();
const resolutions = ["1920x960", "3840x1920", "7680x3840"];
const viewers = [
  { name: 'street', component: markRaw(StreetViewer) },
  { name: 'scene', component: markRaw(SceneViewer) }
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
