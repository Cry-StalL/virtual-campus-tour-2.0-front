<template>
  <div class="scene-viewer">
    <!-- 使用基础 Viewer 组件 -->
    <PanoramaViewer ref="panoramaViewerRef" :scenes="scenes" />
    <!-- 弹幕显示区域 -->
    <div class="danmaku-container" v-show="showDanmaku">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="danmaku-item"
        :style="{
            top: `${message.top}%`,
            '--duration': `${message.duration}s`,
            color: message.color
          }"
      >
        {{ message.content }}
      </div>
    </div>
    
    <!-- 可拖动留言预览框 -->
    <div 
      v-show="isDraggingMessage" 
      class="message-preview" 
      :style="{ left: previewPosition.x + 'px', top: previewPosition.y + 'px' }"
      @mousedown.stop.prevent="startDragging"
    >
      <div class="message-preview-header">
        <span>预览 - 拖动到想要的位置</span>
      </div>
      <div class="message-preview-content">
        {{ messageForm.content || '拖动预览框到想要展示的位置' }}
      </div>
      <div class="message-preview-anchor"></div>
    </div>
    
    <!-- 留言按钮 -->
    <div class="message-button" @click="openMessageDialog">
      <el-icon><ChatDotRound /></el-icon>
    </div>
    <!-- 弹幕开关按钮 -->
    <div class="danmaku-toggle-button" @click="toggleDanmaku">
      <span>{{ showDanmaku ? '隐藏弹幕' : '开启弹幕' }}</span>
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
              <span>{{ isDraggingMessage ? '拖动留言预览框到想要展示的位置' : '点击开启位置选择' }}</span>
            </span>
            <el-switch
              v-model="isDraggingMessage"
              active-text="位置选择"
              inactive-text="取消选择"
              class="position-switch"
            />
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
import { onBeforeUnmount, onMounted, ref, computed, watch } from 'vue';
import { ArrowLeft, ChatDotRound, Position, Close } from '@element-plus/icons-vue';
import PanoramaViewer from '@/components/pano/base-components/PanoramaViewer.vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { getApiUrl } from '@/config/config.ts';

const panoramaViewerRef = ref(null);

const props = defineProps<{
  switchViewer: (name: string) => void,
  isLoggedIn?: boolean,
  userID?: string,
  username?: string
}>();

// 使用 computed 属性来监控 props 的变化
const isUserLoggedIn = computed(() => props.isLoggedIn === true);
const userId = computed(() => props.userID || '0');
const userName = computed(() => props.username || '');

// 调试输出
watch(() => props.isLoggedIn, (newVal, oldVal) => {
  console.log(`isLoggedIn changed from ${oldVal} to ${newVal}`);
}, { immediate: true });

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
  fetchMessages();
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
  if (props.switchViewer) {
    props.switchViewer('street');
  }
};

// 定义场景数据
const scenes = ref([
  {
    sceneId: "scene1",
    imagePath: "/images/panorama.jpg",
  },
]);

// 留言相关
const showMessageDialog = ref(false);
const messageForm = ref({
  content: ''
});
const messages = ref<Array<{
  content: string;
  top: number;
  duration: number;
  color: string;
}>>([]);
const allMessages = ref<Array<{
  content: string;
  userId?: string;
  username?: string;
  panoramaId?: string;
}>>([]);
const messageIntervalId = ref<number | null>(null);
const showDanmaku = ref(true);

// 坐标选择相关
const isCoordinateSelectionMode = ref(false);
const selectedCoordinate = ref<{ longitude: number; latitude: number; sceneId: string } | null>(null);

//打开留言框
const openMessageDialog = () => {
  if (isUserLoggedIn.value) {
    showMessageDialog.value = true;
  } else {
    ElMessage.warning('请先登录');
  }
};

// 开始循环播放留言
const startMessageCycle = () => {
  // 清除可能存在的旧定时器
  if (messageIntervalId.value) {
    clearInterval(messageIntervalId.value);
  }

  // 如果没有留言，不启动循环
  if (allMessages.value.length === 0) {
    return;
  }

  // 每 3 秒显示一条留言
  const cycleInterval = 3 * 1000;
  let currentIndex = 0;

  // 只有当当前没有显示留言时，才立即显示第一条
  if (messages.value.length === 0) {
    displayMessage(currentIndex);
  }

  // 设置定时器，每隔5秒显示下一条
  messageIntervalId.value = window.setInterval(() => {
    // 移动到下一条留言
    currentIndex = (currentIndex + 1) % allMessages.value.length;

    displayMessage(currentIndex);
  }, cycleInterval);
};

// 显示单条留言
const displayMessage = (index: number) => {
  if (index >= 0 && index < allMessages.value.length) {
    const msg = allMessages.value[index];

    // 创建新的留言，确保从右侧飘入
    setTimeout(() => {
      messages.value.push({
        content: msg.content,
        top: Math.random() * 80,
        duration: 15 + Math.random() * 5, // 稍微延长显示时间
        color: getRandomColor()
      });
    }, 10); // 短暂延迟，确保动画正确触发
  }
};

// 生成随机颜色
const getRandomColor = () => {
  const colors = [
    '#409EFF', '#67C23A', '#E6A23C', '#F56C6C',
    '#909399', '#9B59B6', '#1ABC9C', '#3498DB'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// 切换弹幕显示状态
const toggleDanmaku = () => {
  showDanmaku.value = !showDanmaku.value;

  if (showDanmaku.value) {
    // 重新启动弹幕循环
    startMessageCycle();
  } else {
    // 停止弹幕循环
    if (messageIntervalId.value) {
      clearInterval(messageIntervalId.value);
      messageIntervalId.value = null;
    }
    // 清除现有弹幕
    messages.value = [];
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
    // 获取预览框底部锚点的位置
    const anchorX = previewPosition.value.x + 10; // 锚点位于预览框左下角
    const anchorY = previewPosition.value.y + 100; // 根据预览框高度调整
    
    // 使用全景查看器提供的坐标转换接口获取三维坐标
    const panoramaViewer = panoramaViewerRef.value as any;
    if (!panoramaViewer || !panoramaViewer.convertScreenToSphericalCoordinates) {
      ElMessage.error('坐标转换接口不可用');
      return;
    }
    
    // 获取三维坐标
    const coordinates = panoramaViewer.convertScreenToSphericalCoordinates(anchorX, anchorY);
    if (!coordinates) {
      ElMessage.error('坐标转换失败');
      return;
    }
    
    console.log('留言位置三维坐标:', coordinates);
    const currentSceneId = panoramaViewer.getCurrentSceneId();
    
    // 这里添加后续的后端保存逻辑
    // ...
    
    // 临时模拟成功
    ElMessage.success('留言提交成功');
    showMessageDialog.value = false;
    isDraggingMessage.value = false;
    messageForm.value.content = '';
    
  } catch (error) {
    console.error('提交留言失败:', error);
    ElMessage.error('留言提交失败，请稍后重试');
  }
};

// 获取历史留言
const fetchMessages = async () => {
  try {
    const panoramaViewer = panoramaViewerRef.value as any;
    const currentSceneId = panoramaViewer?.getCurrentSceneId();
    // 获取当前全景图的留言
    const response = await axios.get(getApiUrl(`users/messages?panoramaId=${currentSceneId}`));
    if (response.data.success) {
      // 保存所有留言
      allMessages.value = response.data.data || [];

      // 重新启动循环播放
      startMessageCycle();
    }
  } catch (error) {
    console.error('获取留言失败:', error);
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
  width: 300px;
  min-height: 80px;
  background: linear-gradient(135deg, rgba(255, 150, 50, 0.95) 0%, rgba(255, 102, 0, 0.95) 100%);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  padding: 15px;
  color: white;
  font-size: 16px;
  cursor: move;
  z-index: 2001; /* 确保在对话框之上 */
  user-select: none;
  transition: box-shadow 0.2s;
  overflow: hidden;
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
  margin-bottom: 20px;
  min-height: 40px;
}

.message-preview-anchor {
  position: absolute;
  bottom: -5px;
  left: 10px;
  width: 15px;
  height: 15px;
  background-color: white;
  border-radius: 50%;
  border: 2px solid rgba(255, 102, 0, 0.95);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 2002; /* 确保在预览框之上 */
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
  background-color: rgba(255, 255, 255, 0.65);
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

/* 弹幕样式 */
.danmaku-container {
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  height: 25%; /* 减小区域高度，只占中间部分 */
  pointer-events: none;
  overflow: hidden;
  z-index: 50;
}

.danmaku-item {
  position: absolute;
  right: 0; /* Start position at the right edge */
  white-space: nowrap;
  font-size: 16px; /* 减小字体大小 */
  font-weight: 500; /* 减轻字体粗细 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  animation: danmaku linear forwards;
  animation-duration: var(--duration, 15s);
  padding: 4px 10px; /* 减小内边距 */
  background-color: rgba(0, 0, 0, 0.3); /* 增加透明度 */
  border-radius: 20px;
  backdrop-filter: blur(2px);
  z-index: 100;
  transform: translateX(100%); /* Start off-screen */
}

@keyframes danmaku {
  from {
    transform: translateX(100%); /* Start off-screen to the right */
  }
  to {
    transform: translateX(-100vw); /* Move left beyond the viewport */
  }
}

/* 弹幕开关按钮样式 */
.danmaku-toggle-button {
  position: fixed;
  right: 30px;
  bottom: 5px;
  padding: 4px 8px;
  border-radius: 20px;
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

.danmaku-toggle-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(64, 158, 255, 0.4);
}

.danmaku-toggle-button span {
  font-size: 14px;
  font-weight: 600;
}
</style>
