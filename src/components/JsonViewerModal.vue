<template>
  <div class="json-viewer-modal" v-if="visible">
    <div class="json-viewer-content">
      <div class="json-viewer-header">
        <span>{{ title }}</span>
        <button class="close-btn" @click="close">×</button>
      </div>
      <pre class="json-viewer-pre">{{ jsonStr }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
const props = defineProps<{
  json: any,
  title: string,
  visible: boolean,
}>();
const emit = defineEmits(['close']);
const jsonStr = computed(() => JSON.stringify(props.json, null, 2));
function close() {
  emit('close');
}
</script>

<style scoped>
.json-viewer-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.json-viewer-content {
  background: #fff;
  border-radius: 8px;
  min-width: 400px;
  max-width: 80vw;
  max-height: 80vh;
  box-shadow: 0 4px 24px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
}
.json-viewer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid #eee;
  font-weight: bold;
  font-size: 18px;
}
.close-btn {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
}
.json-viewer-pre {
  padding: 20px;
  margin: 0;
  font-size: 15px;
  font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
  white-space: pre-wrap;
  word-break: break-all;
  background: #f8f8f8;
  border-radius: 0 0 8px 8px;
  max-height: 60vh;
  overflow: auto;
}
</style>
