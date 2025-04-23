<template>
  <div class="scene-viewer">
    <!-- 使用基础 Viewer 组件 -->
    <PanoramaViewer :scenes="scenes" />
    <!-- 弹幕显示区域 -->
    <div class="danmaku-container">
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
import { ref } from 'vue';
import {ArrowLeft, ChatDotRound} from '@element-plus/icons-vue';
import PanoramaViewer from './base-components/PanoramaViewer.vue';

const props = defineProps<{ switchViewer: (name: string) => void }>();

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

//打开留言框
const openMessageDialog = () => {
  if(isLoggedIn.value){
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

  // 每5秒显示一条留言
  const cycleInterval = 5 * 1000;
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

  try {
    const currentSceneId = panoramaViewer.value?.getCurrentSceneId();

    const response = await axios.post('http://localhost:8080/api/v1/users/messages', {
      content: messageForm.value.content,
      userId: userID.value,
      username: username.value,
      panoramaId: currentSceneId
    });

    if (response.data.success) {
      // 创建新留言对象
      const newMessage = {
        content: messageForm.value.content,
        userId: userID.value,
        username: username.value,
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
    const currentSceneId = panoramaViewer.value?.getCurrentSceneId();
    // 获取当前全景图的留言
    const response = await axios.get(`http://localhost:8080/api/v1/users/messages?panoramaId=${currentSceneId}`);
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
</style>
