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
      :initialScene="viewerInitialScene[currentViewer!]"
      :handleReturnToStreet="handleReturnToStreet"
      :handleReturnToAerial="handleReturnToAerial"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, onMounted } from 'vue';

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
const viewerInitialScene = ref<Record<string, string | number | undefined>>({});

// 记录上一次 street viewer 的 sceneId
const lastStreetSceneId = ref<string | number | undefined>(undefined);
// 记录上一次 aerial viewer 的 sceneId
const lastAerialSceneId = ref<string | number | undefined>(undefined);

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
const switchViewer = (targetViewerName: string, targetSceneId?: string) => {
  if (!viewers.value[targetViewerName]) {
    console.error(`Viewer not found: ${targetViewerName}`);
    return;
  }

  // 如果从 street 跳到 scene，记录当前 street 的 sceneId
  if (currentViewer.value === 'street' && targetViewerName === 'scene') {
    // 尝试通过 window.streetViewer 获取当前 sceneId
    const streetViewer = (window as any).streetViewer;
    if (streetViewer && typeof streetViewer.getCurrentSceneId === 'function') {
      lastStreetSceneId.value = streetViewer.getCurrentSceneId();
    }
  }

  // 如果从 aerial 跳到 street，记录当前 aerial 的 sceneId
  if (currentViewer.value === 'aerial' && targetViewerName === 'street') {
    // 尝试通过 window.aerialViewer 获取当前 sceneId
    const aerialViewer = (window as any).aerialViewer;
    if (aerialViewer && typeof aerialViewer.getCurrentSceneId === 'function') {
      lastAerialSceneId.value = aerialViewer.getCurrentSceneId();
    }
  }

  // 先切换 viewer
  currentViewer.value = targetViewerName;
  console.log(`Switched to viewer: ${targetViewerName}`);

  // 切换到目标场景（如有指定）
  if (targetSceneId) {
    viewerInitialScene.value[targetViewerName] = targetSceneId;
  }
};

// 提供一个方法用于返回街景时恢复 sceneId
const handleReturnToStreet = () => {
  switchViewer('street', typeof lastStreetSceneId.value === 'string' ? lastStreetSceneId.value : undefined);
};

// 提供一个方法用于返回航拍图时恢复 sceneId
const handleReturnToAerial = () => {
  switchViewer('aerial', typeof lastAerialSceneId.value === 'string' ? lastAerialSceneId.value : undefined);
};

// 获取当前 Viewer 组件
const currentViewerComponent = computed(() => {
  return currentViewer.value ? viewers.value[currentViewer.value].component : null;
});

// 暴露方法和属性
defineExpose({
  switchViewer,
  handleReturnToStreet,
  handleReturnToAerial,
  currentViewer
});

// onMounted(() => {
  // console.log('viewers:', props.viewers);
  // console.log('initialViewerName:', props.initialViewerName);
  // console.log('isLoggedIn:', props.isLoggedIn);
  // console.log('userID:', props.userID);
  // console.log('username:', props.username);
  // console.log('progressiveLoading:', props.progressiveLoading);
  // console.log('resolutions:', props.resolutions);
// });

</script>

<style scoped>
.panorama-viewer-group {
  width: 100%;
  height: 100%;
}
</style>