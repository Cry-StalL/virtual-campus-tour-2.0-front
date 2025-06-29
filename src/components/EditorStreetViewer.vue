<template>
  <div class="street-viewer">
    <PanoramaViewer 
      ref="panoramaViewerRef" 
      v-if="streetConfig"
      :scenes="streetConfig.scenes"
      :progressiveLoading="streetConfig.progressiveLoading"
      :resolutions="streetConfig.resolutions"
      debug
      :switchViewer="props.switchViewer"
      :initialScene="props.initialScene ?? streetConfig.initialScene"
      @coordinateSelected="onPanoramaClick"
      :placingHotspot="placingHotspot"
      :tempHotspot="tempHotspot"
      @sceneChanged="onSceneChangedByViewer"
    />
    <button class="add-scene-btn" @click="() => addScene(jumpToScene)" v-if="streetConfig">添加场景</button>
    <button class="show-scene-list-btn" @click="openSceneList" v-if="streetConfig">显示场景列表</button>
    <button class="select-img-btn main" @click="selectPanoramaCurrent" v-if="streetConfig && currentSceneIdx >= 0">更改当前全景图</button>
    <button class="add-hotspot-btn" @click="startAddHotspot" v-if="streetConfig && currentSceneIdx >= 0">添加热点</button>
    <span v-if="placingHotspot" class="hotspot-tip">请在全景图上点击选择热点位置</span>
    
    <!-- 热点类型选择弹窗 -->
    <div v-if="showHotspotTypeModal" class="hotspot-type-modal">
      <div class="hotspot-type-content">
        <div class="hotspot-type-header">选择热点类型</div>
        <div class="hotspot-type-select">
          <button class="hotspot-type-btn" @click="selectHotspotType('switchScene')">切换场景（switchScene）</button>
          <button class="hotspot-type-btn" @click="selectHotspotType('enterSceneViewer')">进入场景视图（enterSceneViewer）</button>
        </div>
        <button class="cancel-btn" @click="cancelAddHotspot">取消</button>
      </div>
    </div>
    <!-- 确认放置热点按钮，仅在placingHotspot且已放置热点时显示 -->
    <button v-if="placingHotspot && placedHotspot" class="confirm-hotspot-btn" @click="confirmPlacingHotspot">确认放置热点</button>
    <button v-if="placingHotspot" class="cancel-hotspot-btn" @click="cancelAddHotspot">取消添加</button>

    <div v-if="showSceneListModal" class="scene-list-modal">
      <div class="scene-list-content">
        <div class="scene-list-header">
          <span>场景列表</span>
          <button class="close-btn" @click="closeSceneList">×</button>
        </div>
        <ul class="scene-list-ul">
          <li v-for="(scene, i) in sceneList" :key="i">
            <span>{{ i + 1 }}. {{ scene.sceneId || '(未设置sceneId)' }}</span>
            <div>
              <button class="jump-btn" @click="() => jumpToScene(i)">跳转</button>
              <button class="delete-btn" @click="() => deleteScene(i)">删除</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 目标场景选择弹窗 -->
    <div v-if="showTargetSceneModal" class="target-scene-modal">
      <div class="target-scene-content">
        <div class="target-scene-header">
          {{ tempHotspot.value && tempHotspot.value.type === 'enterSceneViewer' ? '选择目标场景视图' : '选择目标场景' }}
        </div>
        <ul class="target-scene-list">
          <li v-if="tempHotspot.value && tempHotspot.value.type === 'enterSceneViewer'"
              v-for="scene in (props.sceneConfig && props.sceneConfig.value ? props.sceneConfig.value.scenes : [])" :key="'sceneViewer-' + scene.sceneId" @click="setTargetSceneId(scene.sceneId)">
            {{ scene.sceneId || '(未设置sceneId)' }}
          </li>
          <li v-else v-for="scene in sceneList" :key="'street-' + scene.sceneId" @click="setTargetSceneId(scene.sceneId)">
            {{ scene.sceneId || '(未设置sceneId)' }}
          </li>
        </ul>
        <button class="back-btn" @click="showTargetSceneModal = false">返回</button>
      </div>
    </div>
    <div v-if="placingHotspot" class="hotspot-adding-modal" style="pointer-events:none;background:none;"></div>
    <input
      ref="fileInputRef"
      type="file"
      :accept="fileMode === 'file' ? '.jpg' : undefined"
      :webkitdirectory="fileMode === 'dir' ? true : undefined"
      style="display:none"
      @change="onFileChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits, nextTick, watch, computed } from 'vue';
import PanoramaViewer from '@/components/pano/base-components/PanoramaViewer.vue';
import { useStreetViewerConfig } from '@/components/pano/composables/useStreetViewerConfig';
import { useSceneEditor } from '@/components/pano/composables/useSceneEditor';
import { add } from 'three/tsl';

const { viewerconfig: streetConfig, configFileName } = useStreetViewerConfig();
const props = defineProps<{ switchViewer: (name: string, sceneIdx?: number) => void, initialScene?: number | string, sceneConfig: any }>();
const emit = defineEmits(['sceneChanged']);

// 使用 useSceneEditor 统一场景编辑逻辑
const {
  showSceneListModal,
  sceneList,
  panoramaViewerRef,
  fileInputRef,
  fileMode,
  fileTargetIdx,
  currentSceneIdx,
  openSceneList,
  closeSceneList,
  deleteScene,
  addScene,
  selectPanoramaCurrent,
  onFileChange
} = useSceneEditor(streetConfig);

const jumpToScene = (idx: number) => {
  if (panoramaViewerRef.value && typeof panoramaViewerRef.value.switchScene === 'function') {
    panoramaViewerRef.value.switchScene(idx);
    currentSceneIdx.value = idx;
    emit('sceneChanged', idx); // 通知父组件场景已切换
    closeSceneList();
  }
};

// 监听控件内场景切换事件，保持currentSceneIdx同步
const onSceneChangedByViewer = (idx: number) => {
  currentSceneIdx.value = idx;
  emit('sceneChanged', idx);
};

// 响应 streetConfig 变化，自动刷新全景显示器，停留在当前场景
watch(
  () => streetConfig.value,
  (newVal, oldVal) => {
    if (panoramaViewerRef.value && typeof panoramaViewerRef.value.switchScene === 'function') {
      // 保持 currentSceneIdx 不变
      nextTick(() => {
        panoramaViewerRef.value.switchScene(currentSceneIdx.value || 0);
      });
    }
  },
  { deep: true }
);

// 只提示一次配置文件名
const promptCounter = window.__streetConfigPromptedCount = window.__streetConfigPromptedCount || { count: 0 };
onMounted(() => {
  currentSceneIdx.value = 0;
  if (promptCounter.count === 0 && configFileName.value) {
    alert('当前读取的Street配置文件：' + configFileName.value);
    promptCounter.count++;
  }
  window.streetViewer = {
    switchScene: (name: string) => {
      if (panoramaViewerRef.value) {
        panoramaViewerRef.value.switchScene(name);
      }
    },
    getCurrentSceneId: () => {
      if (panoramaViewerRef.value && typeof panoramaViewerRef.value.getCurrentSceneId === 'function') {
        return panoramaViewerRef.value.getCurrentSceneId();
      }
      return undefined;
    }
  };
});

// 添加热点相关逻辑
const placingHotspot = ref(false);
const tempHotspot = ref<any>(null);
const placedHotspot = computed(() => !!(tempHotspot.value && tempHotspot.value.position));
const showTargetSceneModal = ref(false);
// 新增：热点类型选择弹窗
const showHotspotTypeModal = ref(false);

// PanoramaViewer 需要支持 @click-on-panorama 事件，返回点击的坐标
const onPanoramaClick = (coords: any) => {
  if (!placingHotspot.value) return;
  // 直接使用传入的经纬度（useCoordinateConverter已保证正确）
  if (coords && (coords.longitude !== undefined && coords.latitude !== undefined)) {
    tempHotspot.value.position = {
      longitude: coords.longitude,
      latitude: coords.latitude
    };
    // icon和type根据当前选择类型设置
    if (tempHotspot.value.type === 'switchScene') {
      tempHotspot.value.icon = 'icons/arrow_hotspot.png';
    } else if (tempHotspot.value.type === 'enterSceneViewer') {
      tempHotspot.value.icon = 'icons/scene_hotspot.png';
    }
  }
};

// 进入选择目标场景/场景视图
const nextSetTargetScene = () => {
  if (!tempHotspot.value.position) {
    window.alert('请先选择热点位置！');
    return;
  }
  // 直接确认，无需弹窗
  confirmPlacingHotspot();
};

// 选择目标场景/场景视图
const setTargetSceneId = (sceneId: string) => {
  // 兼容旧流程，但不再弹窗
};

// 确认放置热点
const confirmPlacingHotspot = () => {
  // 直接添加热点，enterSceneViewer类型targetSceneViewerSceneId为'undefined'
  const scene = streetConfig.value?.scenes?.[currentSceneIdx.value];
  if (scene) {
    if (!Array.isArray(scene.hotspots)) scene.hotspots = [];
    if (tempHotspot.value.type === 'switchScene') {
      // 仍然需要选择目标场景，保留原逻辑
      showTargetSceneModal.value = true;
      return;
    } else if (tempHotspot.value.type === 'enterSceneViewer') {
      scene.hotspots.push({
        type: tempHotspot.value.type,
        longitude: tempHotspot.value.position.longitude,
        latitude: tempHotspot.value.position.latitude,
        icon: tempHotspot.value.icon || 'icons/scene_hotspot.png',
        title: '进入场景视图',
        description: '',
        targetSceneViewerSceneId: 'undefined'
      });
    }
  }
  // 结束添加流程
  placingHotspot.value = false;
  tempHotspot.value = null;
};

// 取消添加
const cancelAddHotspot = () => {
  showHotspotTypeModal.value = false;
  placingHotspot.value = false;
  tempHotspot.value = null;
  showTargetSceneModal.value = false;
};

// 修改 startAddHotspot：弹出类型选择弹窗
const startAddHotspot = () => {
  showHotspotTypeModal.value = true;
};
// 选择热点类型后进入选点流程
const selectHotspotType = (type: string) => {
  showHotspotTypeModal.value = false;
  placingHotspot.value = true;
  tempHotspot.value = {
    type,
    position: null,
    targetSceneId: null,
    targetSceneViewerSceneId: null
  };
};
const cancelHotspotTypeSelect = () => {
  showHotspotTypeModal.value = false;
};

defineExpose({
  switchScene: (name: string) => {
    if (panoramaViewerRef.value) {
      panoramaViewerRef.value.switchScene(name);
    }
  },
  getCurrentSceneId: () => {
    if (panoramaViewerRef.value && typeof panoramaViewerRef.value.getCurrentSceneId === 'function') {
      return panoramaViewerRef.value.getCurrentSceneId();
    }
    return undefined;
  }
});
</script>

<style scoped>
.street-viewer {
  width: 100vw;
  height: 100vh;
  background: #222;
}
.add-scene-btn {
  position: fixed;
  right: 30px;
  bottom: 90px;
  z-index: 200;
  font-size: 16px;
  padding: 12px 24px;
  background: #67c23a;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}
.add-scene-btn:hover {
  background: #85ce61;
}
.show-scene-list-btn {
  position: fixed;
  right: 30px;
  bottom: 150px;
  z-index: 200;
  font-size: 16px;
  padding: 12px 24px;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}
.show-scene-list-btn:hover {
  background: #66b1ff;
}
.scene-list-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.scene-list-content {
  background: #fff;
  border-radius: 10px;
  min-width: 340px;
  min-height: 180px;
  max-height: 80vh; /* 限制整体弹窗最大高度 */
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 24px 24px 12px 24px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.scene-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}
.close-btn {
  background: none;
  border: none;
  font-size: 26px;
  cursor: pointer;
  color: #888;
}
.scene-list-ul {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;      /* 超出时出现滚动条 */
  flex: 1 1 auto;        /* 填充剩余空间 */
  max-height: 80vh;      /* 列表最大高度，超出滚动 */
}
.scene-list-ul li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 16px;
}
.jump-btn {
  background: #67c23a;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 14px;
  font-size: 15px;
  cursor: pointer;
  margin-right: 8px;
}
.jump-btn:hover {
  background: #85ce61;
}
.delete-btn {
  background: #f56c6c;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 14px;
  font-size: 15px;
  cursor: pointer;
  margin-left: 12px;
}
.delete-btn:hover {
  background: #ff7875;
}
.select-img-btn.main {
  position: fixed;
  right: 30px;
  bottom: 210px;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px 32px;
  font-size: 18px;
  cursor: pointer;
  z-index: 201;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}
.select-img-btn.main:hover {
  background: #66b1ff;
}
.add-hotspot-btn {
  position: fixed;
  right: 30px;
  bottom: 270px;
  z-index: 200;
  font-size: 16px;
  padding: 12px 24px;
  background: #e6a23c;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}
.add-hotspot-btn:hover {
  background: #f7c24d;
}
.hotspot-tip {
  position: fixed;
  right: 30px;
  bottom: 320px;
  background: #fffbe6;
  color: #e6a23c;
  padding: 8px 18px;
  border-radius: 6px;
  font-size: 16px;
  z-index: 210;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
}
.hotspot-adding-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 4000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hotspot-adding-content {
  background: #fff;
  border-radius: 10px;
  min-width: 300px;
  max-width: 500px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 24px;
  position: relative;
}
.hotspot-adding-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}
.hotspot-type-select {
  margin-bottom: 16px;
}
.hotspot-position-preview {
  margin-bottom: 16px;
}
.next-btn, .confirm-btn, .cancel-btn {
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;
}
.next-btn:hover, .confirm-btn:hover, .cancel-btn:hover {
  background: #66b1ff;
}
.target-scene-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 4000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.target-scene-content {
  background: #fff;
  border-radius: 10px;
  min-width: 340px;
  min-height: 180px;
  max-height: 80vh; /* 限制整体弹窗最大高度 */
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 24px 24px 12px 24px;
  position: relative;
  display: flex;
  flex-direction: column;
}
.target-scene-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}
.target-scene-list {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;      /* 超出时出现滚动条 */
  flex: 1 1 auto;        /* 填充剩余空间 */
  max-height: 80vh;      /* 列表最大高度，超出滚动 */
}
.target-scene-list li {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  font-size: 16px;
}
.target-scene-list li:hover {
  background: #f5f5f5;
}

.confirm-hotspot-btn {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30px;
  background: #67c23a;
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 7px 22px;
  font-size: 15px;
  min-width: 90px;
  min-height: 36px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  z-index: 4101;
}
.confirm-hotspot-btn:hover {
  background: #85ce61;
}
.cancel-hotspot-btn {
  position: fixed;
  left: 30px;
  bottom: 30px;
  background: #f56c6c;
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 7px 22px;
  font-size: 15px;
  min-width: 90px;
  min-height: 36px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  z-index: 4101;
}
.cancel-hotspot-btn:hover {
  background: #ff7875;
}
.hotspot-type-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 4100;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hotspot-type-content {
  background: #fff;
  border-radius: 10px;
  min-width: 300px;
  max-width: 400px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hotspot-type-header {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 18px;
}
.hotspot-type-select {
  margin-bottom: 18px;
}
.hotspot-type-btn {
  background: #e6a23c;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px 32px;
  font-size: 17px;
  cursor: pointer;
  margin-bottom: 10px;
}
.hotspot-type-btn:hover {
  background: #f7c24d;
}
.cancel-btn {
  background: #f56c6c;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
.cancel-btn:hover {
  background: #ff7875;
}
.back-btn {
  background: #888;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 16px;
}
.back-btn:hover {
  background: #b0b0b0;
}
</style>

<script lang="ts">
declare global {
  interface Window {
    streetViewer?: any;
    __streetConfigPromptedCount?: { count: number };
  }
}
</script>
