<template>
  <div class="home">
    <div class="content">
      <!-- 全景导览的主要内容 -->
   
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

      <PanoramaViewerGroup :viewers="viewers" ref="viewerGroup" initialViewerName="street"/>

    </div>

    <!-- 调试按钮 -->
    <el-button 
      v-if="config.debug.enabled"
      class="debug-btn"  
      size="small" 
      @click="showCurrentSceneId">
      调试按钮: 显示当前场景ID
    </el-button>

    <!-- 侧边栏切换按钮 -->
    <div class="toggle-btn" @click="toggleSidebar">
      <img class="toggle-icon" src="../../assets/icons/more.png" >
    </div>

    <!-- 侧边栏 -->
    <div class="sidebar" :class="{ active: sidebarVisible }">
      <Sidebar />        
    </div>

    <!-- 登录和注册 -->
    <div class="btnGroup1">
      <template v-if="isLoggedIn">
        <div class="user-info">
          <el-avatar :size="32" class="user-avatar">{{ username.charAt(0) }}</el-avatar>
          <el-dropdown trigger="click">
            <span class="user-dropdown">
              <span class="username">{{ username }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goToProfile">
                  <el-icon><User /></el-icon>个人中心
                </el-dropdown-item>
                <el-dropdown-item @click="logout">
                  <el-icon><SwitchButton /></el-icon>退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>
      <template v-else>
        <div class="auth-buttons">
          <el-button type="primary" class="login-btn" @click="goToLogin">登录</el-button>
          <el-button class="register-btn" @click="goToRegister">注册</el-button>
        </div>
      </template>
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { ArrowRight, ArrowLeft, ArrowDown, User, SwitchButton, ChatDotRound } from '@element-plus/icons-vue';
import PanoramaViewerGroup from '@/components/base-components/PanoramaViewerGroup.vue';
import axios from 'axios';
import Sidebar from '@/components/Sidebar.vue';
import { ElMessage } from 'element-plus';
import { config } from '@/config/config';
import StreetViewer from '@/components/StreetViewer.vue';
import SceneViewer from '@/components/SceneViewer.vue';

// 导入HotSpot接口类型
interface HotSpot {
  id?: string;
  type: string;        // 热点类型
  longitude: number;
  latitude: number;
  icon?: string;
  title?: string;
  description?: string;
  targetSceneId?: string; // 目标场景ID（当type为"scene"时必填）
  onClick?: (params?: any) => void;
  params?: any;
}

// 定义场景接口
interface Scene {
  sceneId: string;
  imagePath: string;
  hotspots?: HotSpot[];
}

// Define types
type SectionState = {
  location: boolean;
  info: boolean;
  help: boolean;
  about: boolean;
  [key: string]: boolean;
};

// 定义场景数据
const scenes: Scene[] = [
  {
    sceneId: "1",
    imagePath: "/images/panorama.jpg",
    hotspots: [
      {
        type: 'scene',
        longitude: 0.24,
        latitude: -0.72,
        icon: "/icons/arrow_hotspot.png",
        title: '图书馆',
        description: '这是图书馆的位置',
        targetSceneId: "2"
      },

      {
        type: 'custom',
        longitude: 10.24,
        latitude: 10.72,
        icon: "/icons/scene_hotspot.png",
        title: '图书馆',
        description: '这是图书馆的位置',
      }
    ]
  },

  {
    sceneId: "2",
    imagePath: "/images/p1.jpg",
    hotspots: [
      {
        type: 'scene',
        longitude: 8,
        latitude: -8,
        icon: "/icons/arrow_hotspot.png",
        title: '图书馆',
        description: '这是图书馆的位置',
        targetSceneId: "1"
      },

      {
        type: 'custom',
        longitude: -10.24,
        latitude: -10.72,
        icon: "/icons/scene_hotspot.png",
      }
    ]
  },
];

const viewerGroup = ref();

// 处理场景切换事件
const handleSceneChange = (index: number) => {
  console.log('场景已切换到:', index);
  ElMessage({
    message: `已切换到场景 ${index + 1}`,
    type: 'info',
    duration: 2000
  });
  
  // 场景切换后获取该场景的历史留言
  fetchMessages();
};

const router = useRouter();
const userID = ref('0');
const username = ref('');
const sidebarVisible = ref(false);
const currentPanoramaId = ref('1');
const sectionsState = ref<SectionState>({
  location: false,
  info: false,
  help: false,
  about: false
});

// 检查用户登录状态
const checkLoginStatus = () => {
  username.value = Cookies.get('username') || '';
  userID.value = Cookies.get('userId') || '0';
};

const isLoggedIn = computed(() => {
  return Number(userID.value || 0) !== 0;
});

// 切换侧边栏显示状态
const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value;
};

// 导航相关函数
const goToLogin = () => {
  router.push('/login');
};

const goToRegister = () => {
  router.push('/register');
};

const goToProfile = () => {
  router.push('/profile');
};

const logout = () => {
  // 清除用户Cookie
  Cookies.set('userId', '0', { expires: 1 });
  Cookies.set('username', '', { expires: 1 });
  Cookies.set('email', '', { expires: 1 });

  userID.value = '0';
  username.value = '';
  
  router.push('/login');
};

const navigateToInfo = (type: string) => {
  console.log(`导航到实用信息: ${type}`);
  // 这里可以实现具体的导航逻辑

  sidebarVisible.value = false;
};

const navigateToHelp = (type: string) => {
  console.log(`导航到帮助页面: ${type}`);
  // 这里可以实现具体的导航逻辑

  sidebarVisible.value = false;
};

const navigateToAbout = (type: string) => {
  console.log(`导航到关于我们页面: ${type}`);
  // 这里可以实现具体的导航逻辑

  sidebarVisible.value = false;
};

const toggleSection = (section: string) => {
  sectionsState.value[section] = !sectionsState.value[section];
};

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

// 显示当前场景ID
const showCurrentSceneId = () => {
  const currentSceneId = viewerGroup.value?.getCurrentSceneId();
  ElMessage({
    message: `当前场景ID: ${currentSceneId}`,
    type: 'info',
    duration: 3000
  });
  console.log('当前场景ID:', currentSceneId);
};

const viewers = [
  { name: 'street', component: StreetViewer },
  { name: 'scene', component: SceneViewer }
];

onMounted(() => {
  checkLoginStatus();
  fetchMessages();
});

onBeforeUnmount(() => {
  // 清除定时器，避免内存泄漏
  if (messageIntervalId.value) {
    clearInterval(messageIntervalId.value);
    messageIntervalId.value = null;
  }
});
</script>

<style>
body, html, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.home {
  width: 100%;
  height: 100vh;
  position: relative;
}

.content {
  width: 100%;
  height: 100vh;
}

.btnGroup1 {
  position: absolute;
  top: 15px;
  right: 20px;
  z-index: 10;
}

/* 侧边栏切换按钮样式 */
.toggle-btn {
  display: flex;
  position: absolute;
  top: 2%;
  left: 1.5%;
  width: 3vw;
  height: 3vw;

  /* background-color: #409EFF; */

 
  z-index: 999;

  transition: transform 0.3s;
}

/* 侧边栏样式 */
.sidebar {
  position: absolute;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease;
  z-index: 20;
  overflow-y: auto;
}

.sidebar.active {
  left: 0;
}

.sidebar-content {
  padding: 20px;
}

.sidebar-header {
  padding-top: 40px; /* 标题顶部的边距 */
}

.sidebar-content h3 {
  margin-top: 10px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
}

.toggle-btn:hover {
  transform: scale(1.1);
}

.toggle-icon{
  width: 65%;
  height: 65%;
  margin: auto;
}

.menu-section {
  margin-bottom: 15px;
}

.section-title {
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 10px;
  padding: 8px 5px;
  border-radius: 4px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;
}

.section-title:hover {
  background-color: #f5f7fa;
}

.section-icon {
  font-size: 14px;
  margin-right: 5px;
}

.section-content {
  padding-left: 10px;
  font-size: 16px !important;
  font-weight: 600 !important;
  color: #606266 !important;
  font-family: 'Helvetica Neue', Arial, sans-serif !important;
}

/* Section transition animations */
.section-enter-active,
.section-leave-active {
  transition: all 0.3s ease;
  max-height: 300px;
  overflow: hidden;
}

.section-enter-from,
.section-leave-to {
  max-height: 0;
  opacity: 0;
  margin: 0;
  padding: 0;
}

/* 登录和注册按钮样式 */
.auth-buttons {
  display: flex;
  gap: 10px;
  align-items: center;
}

.login-btn {
  border-radius: 20px;
  padding: 8px 20px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(64, 158, 255, 0.2);
}

.register-btn {
  border-radius: 20px;
  padding: 8px 20px;
  font-weight: 500;
  background-color: white;
  color: #409EFF;
  border: 1px solid #d9ecff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.register-btn:hover {
  background-color: #ecf5ff;
  border-color: #c6e2ff;
  color: #409EFF;
}

/* 用户信息样式 */
.user-info {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 22px;
  padding: 4px 8px 4px 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.user-avatar {
  background-color: #409EFF;
  color: white;
  font-weight: bold;
  margin-right: 8px;
}

.user-dropdown {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 4px;
}

.username {
  margin-right: 4px;
  font-size: 14px;
  color: #303133;
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 留言按钮样式 */
.message-button {
  position: fixed;
  right: 30px;
  bottom: 30px;
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 50;
}

.danmaku-item {
  position: absolute;
  right: 0; /* Start position at the right edge */
  white-space: nowrap;
  font-size: 20px;
  font-weight: 600;
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
  animation: danmaku linear forwards;
  animation-duration: var(--duration, 15s);
  padding: 6px 12px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(4px);
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

/* 调试按钮样式 */
.debug-btn {
  position: absolute;
  bottom: 40px;
  left: 15px;
  z-index: 10;
}


</style>
