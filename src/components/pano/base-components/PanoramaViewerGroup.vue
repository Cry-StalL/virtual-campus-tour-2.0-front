<template>
  <div class="panorama-viewer-group">
    <component 
      :is="currentViewerComponent" 
      v-if="currentViewerComponent" 
      :switchViewer="switchViewer"
      :isLoggedIn="isLoggedIn"
      :userID="userID"
      :username="username"
      :progressiveLoading="progressiveLoading"
      :resolutions="resolutions"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';

// 定义 Viewer 类型
interface Viewer {
  name: string;
  component: any;
}

// 接收 Viewer 列表和初始 Viewer 名称作为 props
const props = defineProps<{ 
  viewers: Viewer[], 
  initialViewerName: string,
  isLoggedIn?: boolean,
  userID?: string,
  username?: string,
  progressiveLoading?: boolean,
  resolutions?: string[]
}>();

// 使用 computed 属性来监控 props 的变化
const isLoggedIn = computed(() => props.isLoggedIn === true);
const userID = computed(() => props.userID || '0');
const username = computed(() => props.username || '');
const progressiveLoading = computed(() => props.progressiveLoading || false);
const resolutions = computed(() => props.resolutions || ["1920x960", "3840x1920", "7680x3840"]);

// 管理 Viewer 实例
const viewers = ref<Record<string, Viewer>>({});
const currentViewer = ref<string | null>(props.initialViewerName || null);

// 初始化 Viewer
props.viewers.forEach(viewer => {
  viewers.value[viewer.name] = viewer;
});

// 设置初始 Viewer
if (props.initialViewerName && viewers.value[props.initialViewerName]) {
  currentViewer.value = props.initialViewerName;
} else if (props.initialViewerName) {
  console.error(`Initial viewer not found: ${props.initialViewerName}`);
}

// 切换 Viewer
const switchViewer = (name: string) => {
  if (viewers.value[name]) {
    currentViewer.value = name;
    console.log(`Switched to viewer: ${name}`);
  } else {
    console.error(`Viewer not found: ${name}`);
  }
};

// 获取当前 Viewer 组件
const currentViewerComponent = computed(() => {
  return currentViewer.value ? viewers.value[currentViewer.value].component : null;
});

// 暴露方法
defineExpose({
  switchViewer
});
</script>

<style scoped>
.panorama-viewer-group {
  width: 100%;
  height: 100%;
}
</style> 