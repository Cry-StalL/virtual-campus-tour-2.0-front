<template>
  <div class="scene-viewer">
    <!-- 使用基础 Viewer 组件 -->
    <PanoramaViewer 
      ref="panoramaViewerRef" 
      v-if="viewerconfig"
      :scenes="viewerconfig.scenes.map(scene => ({
        ...scene,
        hotspots: (scene.hotspots || []).map(h => ({ ...h }))
      }))"
      :progressiveLoading="viewerconfig.progressiveLoading"
      :resolutions="viewerconfig.resolutions"
      :initialScene="props.initialScene ?? viewerconfig.initialScene"
      :handleReturnToStreet="handleReturnToStreet"
    />
    
    <!-- 可拖动留言预览框 -->
    <div 
      v-show="isDraggingMessage" 
      class="message-preview" 
      :style="{ left: previewPosition.x + 'px', top: previewPosition.y + 'px' }"
      @mousedown.stop.prevent="startDragging"
    >
      <div class="message-preview-content">
        {{ messageForm.content || '拖动预览框到想要展示的位置' }}
      </div>
      <div class="message-preview-anchor"></div>
    </div>
    
    <!-- 留言按钮 -->
    <div class="message-button" @click="openMessageDialog">
      <el-icon><ChatDotRound /></el-icon>
    </div>

    <!-- 自定义留言输入面板 (替代el-dialog) -->
    <div 
      v-if="showMessageDialog" 
      class="custom-message-panel"
      :style="{ left: '50%', bottom: '20px', transform: 'translateX(-50%)' }"
    >
      <div class="panel-header">
        <el-icon class="panel-icon"><ChatDotRound /></el-icon>
        <span class="panel-title">发表留言</span>
        <el-icon class="panel-close" @click="cancelMessage"><Close /></el-icon>
      </div>
      <div class="panel-body">
        <el-form :model="messageForm">
          <el-form-item>
            <el-input
              v-model="messageForm.content"
              type="textarea"
              :rows="3"
              placeholder="发个友善的留言吧！"
              class="message-input"
              maxlength="50"
              show-word-limit
            />
          </el-form-item>
          <el-form-item>
            <span class="position-instruction">
              <el-icon><Position /></el-icon>
              <span>拖动留言预览框到想要展示的位置</span>
            </span>
          </el-form-item>
        </el-form>
      </div>
      <div class="panel-footer">
        <el-button @click="cancelMessage" class="cancel-btn">取消</el-button>
        <el-button type="primary" @click="submitMessage" class="submit-btn">提交留言</el-button>
      </div>
    </div>

    <!-- 返回按钮 -->
    <el-button
      class="return-button"
      type="primary"
      round
      @click="handleReturn"
      size="large"
    >
      <el-icon><ArrowLeft /></el-icon>
      返回街景
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, computed, watch, nextTick } from 'vue';
import { ArrowLeft, ChatDotRound, Position, Close } from '@element-plus/icons-vue';
import PanoramaViewer from '@/components/pano/base-components/PanoramaViewer.vue';
import { useSceneViewerConfig } from './composables/useSceneViewerConfig';
import type { HotSpot } from '@/components/pano/base-components/composables/types';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { getApiUrl } from '@/config/config.ts';

const panoramaViewerRef = ref(null);

const props = defineProps<{
  switchViewer: (name: string) => void,
  handleReturnToStreet?: () => void, // 可选的返回街景方法
  isLoggedIn?: boolean,
  userID?: string,
  username?: string,
  initialScene?: string | number
}>();

// 使用 computed 属性来监控 props 的变化
const isUserLoggedIn = computed(() => props.isLoggedIn === true);
const userId = computed(() => parseInt(props.userID || '0'));
const userName = computed(() => props.username || '');

// 调试输出
watch(() => props.isLoggedIn, (newVal, oldVal) => {
  console.log(`isLoggedIn changed from ${oldVal} to ${newVal}`);
}, { immediate: true });

onMounted(() => {
  window.sceneViewer = {
    switchScene: (name: string) => {
      if (panoramaViewerRef.value) {
        panoramaViewerRef.value.switchScene(name);
      }
    }
  };
});

defineExpose(
  // 暴露子组件的switchScene
  {
    switchScene: (name: string) => {
      if (panoramaViewerRef.value) {
        panoramaViewerRef.value.switchScene(name);
      }
    }
  }
);

// 留言预览相关
const isDraggingMessage = ref(false);
const previewPosition = ref({ x: 100, y: 100 });
const isDragging = ref(false);
const dragOffset = ref({ x: 0, y: 0 });

// 监听isDraggingMessage变化
watch(isDraggingMessage, (newVal) => {
  if (newVal) {
    // 如果开启了预览，设置初始位置为视窗中央
    previewPosition.value = {
      x: window.innerWidth / 2 - 150,
      y: window.innerHeight / 2 - 50
    };
  }
});

// 开始拖拽
const startDragging = (event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
  
  isDragging.value = true;
  
  // 计算鼠标点击位置与预览框左上角的偏移量
  dragOffset.value = {
    x: event.clientX - previewPosition.value.x,
    y: event.clientY - previewPosition.value.y
  };
  
  // 添加鼠标移动和鼠标释放事件监听
  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', stopDragging);
  
  console.log('拖拽开始');
};

// 处理拖拽
const handleDrag = (event: MouseEvent) => {
  if (!isDragging.value) return;
  
  event.preventDefault();
  event.stopPropagation();
  
  // 更新预览框位置
  previewPosition.value = {
    x: event.clientX - dragOffset.value.x,
    y: event.clientY - dragOffset.value.y
  };
  
  // 限制预览框不超出屏幕边界
  if (previewPosition.value.x < 0) previewPosition.value.x = 0;
  if (previewPosition.value.y < 0) previewPosition.value.y = 0;
  if (previewPosition.value.x > window.innerWidth - 300) previewPosition.value.x = window.innerWidth - 300;
  if (previewPosition.value.y > window.innerHeight - 100) previewPosition.value.y = window.innerHeight - 100;
};

// 停止拖拽
const stopDragging = (event: MouseEvent) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  isDragging.value = false;
  
  // 移除事件监听
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', stopDragging);
  
  console.log('拖拽结束');
};

// 取消留言
const cancelMessage = () => {
  showMessageDialog.value = false;
  isDraggingMessage.value = false;
  messageForm.value.content = '';
};

onMounted(() => {
  console.log('SceneViewer mounted, isLoggedIn:', props.isLoggedIn);
  
  // 监听窗口大小变化
  window.addEventListener('resize', handleResize);
});

// 处理窗口大小变化
const handleResize = () => {
  // 仅处理预览框位置，确保不超出屏幕
  if (previewPosition.value.x > window.innerWidth - 300) {
    previewPosition.value.x = window.innerWidth - 300;
  }
  if (previewPosition.value.y > window.innerHeight - 100) {
    previewPosition.value.y = window.innerHeight - 100;
  }
};

onBeforeUnmount(() => {
  // 清除定时器和事件监听，避免内存泄漏
  if (messageIntervalId.value) {
    clearInterval(messageIntervalId.value);
    messageIntervalId.value = null;
  }
  
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', stopDragging);
  window.removeEventListener('resize', handleResize);
});

// 处理返回按钮点击
const handleReturn = () => {
  // 优先调用父组件暴露的 handleReturnToStreet 方法（如果有）
  if ((props as any).handleReturnToStreet) {
    (props as any).handleReturnToStreet();
    
  } else if (props.switchViewer) {
    console.log('切换到街景视图，默认场景为0')
    props.switchViewer('street', 0); // 切换到街景视图，默认场景为0
  }
};

const { viewerconfig, error } = useSceneViewerConfig();

// scenes ref for easier access and reactivity
const scenes = computed(() => viewerconfig.value?.scenes || []);

// 留言相关
const showMessageDialog = ref(false);
const messageForm = ref({
  content: ''
});
const allMessages = ref<Array<{
  content: string;
  userId?: string;
  username?: string;
  panoramaId?: string;
  position?: {
    longitude: number;
    latitude: number;
  };
}>>([]);
const messageIntervalId = ref<number | null>(null);

//打开留言框
const openMessageDialog = () => {
  if (isUserLoggedIn.value) {
    showMessageDialog.value = true;
    // 自动启用位置选择
    isDraggingMessage.value = true;
    
    // 初始化预览框位置到视窗中央
    previewPosition.value = {
      x: window.innerWidth / 2 - 150,
      y: window.innerHeight / 2 - 50
    };
  } else {
    ElMessage.warning('请先登录');
  }
};

// 提交留言
const submitMessage = async () => {
  if (!messageForm.value.content.trim()) {
    ElMessage.warning('请输入留言内容');
    return;
  }

  if (!isUserLoggedIn.value) {
    ElMessage.warning('请先登录');
    return;
  }
  
  if (!isDraggingMessage.value) {
    ElMessage.warning('请先拖动预览框选择留言位置');
    return;
  }

  try {
    // 获取白色圆点的精确位置（而不是预览框的位置）
    // 圆点位于锚线的底部，锚线从预览框中央延伸出来
    const circleX = previewPosition.value.x + 150 / 2; // 预览框宽度的一半（居中）
    const circleY = previewPosition.value.y + 40 + 20 + 5; // 预览框高度 + 锚线长度 + 圆点垂直偏移
    
    // 使用全景查看器提供的坐标转换接口获取三维坐标
    const panoramaViewer = panoramaViewerRef.value as any;
    if (!panoramaViewer || !panoramaViewer.convertScreenToSphericalCoordinates) {
      ElMessage.error('坐标转换接口不可用');
      return;
    }
    
    // 获取三维坐标
    const coordinates = panoramaViewer.convertScreenToSphericalCoordinates(circleX, circleY);
    if (!coordinates) {
      ElMessage.error('坐标转换失败');
      return;
    }
    
    console.log('白色圆点的二维坐标:', { x: circleX, y: circleY });
    console.log('转换后的三维坐标:', coordinates);
    
    const currentSceneId = panoramaViewer.getCurrentSceneId();
    
    // 准备要发送到后端的数据
    const messageData = {
      content: messageForm.value.content,
      userId: userId.value,
      username: userName.value,
      panoramaId: currentSceneId,
      position: {
        longitude: coordinates.longitude,
        latitude: coordinates.latitude
      }
    };
    
    console.log('将发送到后端的数据:', messageData);
    
    // 发送留言到后端
    const response = await axios.post(getApiUrl('users/messages'), messageData);
    
    if (response.data.success) {
      ElMessage.success('留言提交成功');
      showMessageDialog.value = false;
      isDraggingMessage.value = false;
      messageForm.value.content = '';
      
      // 直接添加新的留言热点
      const newMessage = response.data.data;
      if (newMessage && newMessage.position) {
        const newHotspot: HotSpot = {
          type: 'custom',
          longitude: newMessage.position.longitude,
          latitude: newMessage.position.latitude,
          icon: '/icons/message_hotspot.png',     //没找到合适的图标
          title: newMessage.username || '匿名用户',
          description: newMessage.content,
          onClick: () => {
            ElMessage({
              message: newMessage.username + ':' + newMessage.content,
              type: 'info',
              duration: 3000
            });
          }
        };
        
        // 添加到当前场景的热点数组
        if (!scenes.value[0].hotspots) {
          scenes.value[0].hotspots = [];
        }
        scenes.value[0].hotspots.push(newHotspot);
        
        // 重新加载当前场景以显示新热点
        panoramaViewer.switchScene(currentSceneId);
      }
    } else {
      throw new Error(response.data.message || '提交失败');
    }
    
  } catch (error) {
    console.error('提交留言失败:', error);
    ElMessage.error('留言提交失败，请稍后重试');
  }
};

// 获取历史留言
const fetchMessages = async () => {
  try {
    const panoramaViewer = panoramaViewerRef.value as any;
    const currentSceneId = panoramaViewer.getCurrentSceneId();
    
    // 获取当前全景图的留言
    const response = await axios.get(getApiUrl(`users/messages?panoramaId=${currentSceneId}`));
    if (response.data.success) {
      // 保存所有留言
      allMessages.value = response.data.data || [];

      console.log('allMessages', allMessages.value);
      
      // 更新场景的热点配置
      scenes.value[0].hotspots = allMessages.value
        .filter((message): message is typeof message & { position: { longitude: number; latitude: number } } => 
          message.position !== undefined)
        .map(message => ({
          type: 'custom',
          longitude: message.position.longitude,
          latitude: message.position.latitude,
          icon: '/icons/message_hotspot.png',    //没找到合适的图标
          title: message.username || '匿名用户',
          description: message.content,
          onClick: () => {
            // 点击热点时显示消息内容
            ElMessage({
              message: message.username + '：' + message.content,
              type: 'info',
              duration: 3000
            });
          }
        }));
      
      // 重新加载当前场景以更新热点
      panoramaViewer.switchScene(currentSceneId);
    }
  } catch (error) {
    console.error('获取留言失败:', error);
    ElMessage.error('获取留言失败，请稍后重试');
  }
};

// 自定义留言输入面板的拖动功能
const panelPosition = ref({ x: 0, y: 0 });
const startDraggingPanel = (event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
  
  isDragging.value = true;
  
  // 计算鼠标点击位置与面板左上角的偏移量
  dragOffset.value = {
    x: event.clientX - panelPosition.value.x,
    y: event.clientY - panelPosition.value.y
  };
  
  // 添加鼠标移动和鼠标释放事件监听
  document.addEventListener('mousemove', handleDragPanel);
  document.addEventListener('mouseup', stopDraggingPanel);
  
  console.log('拖拽开始');
};

// 处理拖拽
const handleDragPanel = (event: MouseEvent) => {
  if (!isDragging.value) return;
  
  event.preventDefault();
  event.stopPropagation();
  
  // 更新面板位置
  panelPosition.value = {
    x: event.clientX - dragOffset.value.x,
    y: event.clientY - dragOffset.value.y
  };
  
  // 限制面板不超出屏幕边界
  if (panelPosition.value.x < 0) panelPosition.value.x = 0;
  if (panelPosition.value.y < 0) panelPosition.value.y = 0;
  if (panelPosition.value.x > window.innerWidth - 500) panelPosition.value.x = window.innerWidth - 500;
  if (panelPosition.value.y > window.innerHeight - 300) panelPosition.value.y = window.innerHeight - 300;
};

// 停止拖拽
const stopDraggingPanel = (event: MouseEvent) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  isDragging.value = false;
  
  // 移除事件监听
  document.removeEventListener('mousemove', handleDragPanel);
  document.removeEventListener('mouseup', stopDraggingPanel);
  
  console.log('拖拽结束');
};

// 监听 viewerconfig 加载和 PanoramaViewer 初始化后再调用 fetchMessages
watch(
  () => viewerconfig.value,
  async (val) => {
    if (val) {
      await nextTick();
      if (panoramaViewerRef.value && typeof panoramaViewerRef.value.getCurrentSceneId === 'function') {
        fetchMessages();
      }
    }
  },
  { immediate: true }
);

</script>

<style scoped>
.scene-viewer {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  position: relative;
  pointer-events: auto;
}

/* 让全景容器接收所有鼠标事件 */
:deep(#panorama-viewer) {
  pointer-events: auto !important;
}

/* 确保留言对话框不会阻碍全景图的拖动 */
:deep(.el-overlay) {
  pointer-events: none !important;
  background-color: transparent !important;
}

/* 留言预览框样式 */
.message-preview {
  position: fixed;
  width: 150px;
  min-height: 40px;
  background: linear-gradient(135deg, rgba(255, 150, 50, 0.95) 0%, rgba(255, 102, 0, 0.95) 100%);
  border-radius: 10px;
  padding: 10px;
  color: white;
  font-size: 14px;
  cursor: move;
  z-index: 2001; /* 确保在对话框之上 */
  user-select: none;
  transition: box-shadow 0.2s;
  overflow: visible; /* 修改为visible以显示超出的线条 */
  word-break: break-word;
  pointer-events: auto;
  transform: translate3d(0, 0, 0); /* 启用硬件加速 */
  will-change: transform; /* 告知浏览器该元素会频繁变化 */
  touch-action: none; /* 禁用默认触控行为 */
}

.message-preview:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}

.message-preview-header {
  margin-bottom: 10px;
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.message-preview-content {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  min-height: 30px;
}

.message-preview-anchor {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background-color: white;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5); /* 添加阴影使白线更明显 */
  z-index: 2002;
}

.message-preview-anchor::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: -4px;
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5); /* 添加阴影使白圈更明显 */
  z-index: 2002;
}

.return-button {
  position: fixed;
  bottom: 30px;
  left: 30px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 12px 20px;
  font-size: 16px;
  background-color: rgba(64, 158, 255, 0.9);
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.return-button:hover {
  background-color: rgba(64, 158, 255, 1);
  transform: scale(1.05);
}

.return-button .el-icon {
  margin-right: 5px;
}

/* 留言按钮样式 */
.message-button {
  position: fixed;
  right: 30px;
  bottom: 40px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #409EFF 0%, #53a8ff 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(64, 158, 255, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
}

.message-button:hover {
  transform: scale(1.08) translateY(-3px);
  box-shadow: 0 6px 20px rgba(64, 158, 255, 0.4);
}

.message-button .el-icon {
  font-size: 26px;
}

/* 自定义留言输入面板样式 */
.custom-message-panel {
  position: fixed;
  width: 500px;
  background-color: rgba(255, 255, 255, 0.40);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  pointer-events: auto;
  z-index: 2000;
  transition: box-shadow 0.3s;
}

.custom-message-panel:hover {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.panel-header {
  padding: 15px;
  background-color: rgba(248, 249, 250, 0.7);
  border-bottom: 1px solid rgba(224, 229, 236, 0.7);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
  gap: 10px;
  user-select: none;
}

.panel-icon {
  color: #409EFF;
  font-size: 22px;
}

.panel-title {
  color: #303133;
  font-size: 18px;
  font-weight: 600;
  flex-grow: 1;
}

.panel-close {
  color: #606266;
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s;
}

.panel-close:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: #F56C6C;
}

.panel-body {
  padding: 20px 30px 10px;
  background-color: rgba(248, 249, 250, 0.7);
}

.panel-footer {
  padding: 0 30px 15px;
  background-color: rgba(248, 249, 250, 0.7);
  border-top: none;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-bottom: 20px;
}

.cancel-btn,
.submit-btn {
  padding: 8px 20px;
  border-radius: 20px;
  background-color: rgba(64, 158, 255, 0.9);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover,
.submit-btn:hover {
  background-color: rgba(64, 158, 255, 1);
  transform: scale(1.05);
}

.message-input {
  width: 100%;
  margin-bottom: 10px;
}

.position-instruction {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #606266;
  margin-bottom: 10px;
}

.position-switch {
  margin-left: 10px;
}

/* 留言热点样式 */
.message-hotspot-preview {
  position: absolute;
  width: 150px;
  min-height: 40px;
  background: linear-gradient(135deg, rgba(255, 150, 50, 0.95) 0%, rgba(255, 102, 0, 0.95) 100%);
  border-radius: 10px;
  padding: 10px;
  color: white;
  font-size: 14px;
  z-index: 2001;
  user-select: none;
  transition: box-shadow 0.2s;
  overflow: visible;
  word-break: break-word;
  transform: translate3d(0, 0, 0);
  will-change: transform;
  pointer-events: none;
  margin-top: -60px;
  margin-left: -75px;
}

.message-hotspot-preview:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}

.message-hotspot-content {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  min-height: 30px;
}

.message-hotspot-anchor {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background-color: white;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  z-index: 2002;
}

.message-hotspot-anchor::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: -4px;
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  z-index: 2002;
}

</style>
