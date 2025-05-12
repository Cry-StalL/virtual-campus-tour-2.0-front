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
    <!-- 留言按钮 -->
    <div class="message-button" @click="openMessageDialog">
      <el-icon><ChatDotRound /></el-icon>
    </div>
    <!-- 弹幕开关按钮 -->
    <div class="danmaku-toggle-button" @click="toggleDanmaku">
      <span>{{ showDanmaku ? '隐藏弹幕' : '开启弹幕' }}</span>
    </div>

    <!-- 留言对话框 -->
    <el-dialog
      v-model="showMessageDialog"
      width="500px"
      :close-on-click-modal="false"
      class="message-dialog"
      top="40vh"
      destroy-on-close
    >
      <template #header>
        <div class="dialog-header">
          <el-icon style="color: #409EFF; font-size: 22px;"><ChatDotRound /></el-icon>
          <span style="color: #409EFF; font-size: 18px; font-weight: 600;">发表留言</span>
        </div>
      </template>
      <el-form :model="messageForm">
        <el-form-item>
          <el-input
            v-model="messageForm.content"
            type="textarea"
            :rows="4"
            placeholder="发个友善的留言吧！"
            class="message-input"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showMessageDialog = false" class="cancel-btn">取消</el-button>
          <el-button type="primary" @click="submitMessage" class="submit-btn">提交留言</el-button>
        </span>
      </template>
    </el-dialog>

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
import { ArrowLeft, ChatDotRound } from '@element-plus/icons-vue';
import PanoramaViewer from './base-components/PanoramaViewer.vue';
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

onMounted(() => {
  fetchMessages();
  console.log('SceneViewer mounted, isLoggedIn:', props.isLoggedIn);
});

onBeforeUnmount(() => {
  // 清除定时器，避免内存泄漏
  if (messageIntervalId.value) {
    clearInterval(messageIntervalId.value);
    messageIntervalId.value = null;
  }
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

//打开留言框
const openMessageDialog = () => {
  if(isUserLoggedIn.value){
    showMessageDialog.value = true;
  }else{
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

  try {
    const panoramaViewer = panoramaViewerRef.value as any;
    const currentSceneId = panoramaViewer?.getCurrentSceneId();

    const response = await axios.post(getApiUrl('users/messages'), {
      content: messageForm.value.content,
      userId: userId.value,
      username: userName.value,
      panoramaId: currentSceneId
    });

    if (response.data.success) {
      // 创建新留言对象
      const newMessage = {
        content: messageForm.value.content,
        userId: userId.value,
        username: userName.value,
        panoramaId: currentSceneId
      };

      // 添加到留言列表
      allMessages.value.push(newMessage);

      // 立即显示新发表的留言
      setTimeout(() => {
        messages.value.push({
          content: newMessage.content,
          top: Math.random() * 80,
          duration: 15 + Math.random() * 5,
          color: getRandomColor()
        });
      }, 10);

      // 如果是第一条留言，启动循环
      if (allMessages.value.length === 1) {
        startMessageCycle();
      }

      ElMessage.success('留言提交成功');
      showMessageDialog.value = false;
      messageForm.value.content = '';
    } else {
      ElMessage.error('留言提交失败');
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

</script>

<style scoped>
.scene-viewer {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  position: relative;
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

/* 对话框样式 */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

:deep(.message-dialog) {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

:deep(.message-dialog .el-dialog__header) {
  margin: 0;
  padding: 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e0e5ec;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

:deep(.message-dialog .el-dialog__title) {
  color: white;
  font-size: 20px;
  font-weight: 600;
}

:deep(.message-dialog .el-dialog__body) {
  padding: 30px 30px 20px;
  background-color: #f8f9fa;
}

:deep(.message-dialog .el-dialog__footer) {
  padding: 0 30px 25px;
  background-color: #f8f9fa;
  border-top: none;
}

.dialog-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dialog-header span {
  color: #303133;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.dialog-icon {
  font-size: 22px;
  color: #409EFF;
}

:deep(.el-dialog__close) {
  color: #606266;
  font-size: 18px;
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