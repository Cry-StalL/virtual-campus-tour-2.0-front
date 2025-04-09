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
            animationDuration: `${message.duration}s`,
            color: message.color
          }"
        >
          {{ message.content }}
        </div>
      </div>

      <PanoramaViewer 
        :scenes="scenes"
        @sceneChange="handleSceneChange"
        ref="panoramaViewer"
      />

    </div>

    <!-- 调试按钮 -->
    <el-button 
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
    <div class="message-button" @click="showMessageDialog = true">
      <el-icon><ChatDotRound /></el-icon>
    </div>

    <!-- 留言对话框 -->
    <el-dialog
      v-model="showMessageDialog"
      width="500px"
      :close-on-click-modal="false"
      class="message-dialog"
    >
      <el-form :model="messageForm">
        <el-form-item>
          <el-input
            v-model="messageForm.content"
            type="textarea"
            :rows="4"
            placeholder="发个友善的留言吧！"
            class="message-input"
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
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { ArrowRight, ArrowLeft, ArrowDown, User, SwitchButton, ChatDotRound } from '@element-plus/icons-vue';
import PanoramaViewer from '../components/PanoramaViewer.vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import Sidebar from '../components/Sidebar.vue';
import { ElMessage } from 'element-plus';

// 导入HotSpot接口类型
interface HotSpot {
  id: string;
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
        id: '2',
        type: 'scene',
        longitude: 0.24,
        latitude: -0.72,
        icon: "/icons/arrow_hotspot.png",
        title: '图书馆',
        description: '这是图书馆的位置',
        targetSceneId: "2"
      }
    ]
  },

  {
    sceneId: "2",
    imagePath: "/images/p1.jpg",
    hotspots: [
      {
        id: '2',
        type: 'scene',
        longitude: 8,
        latitude: -8,
        icon: "/icons/arrow_hotspot.png",
        title: '图书馆',
        description: '这是图书馆的位置',
        targetSceneId: "1"
      }
    ]
  },
];

const panoramaViewer = ref();

// 处理场景切换事件
const handleSceneChange = (index: number) => {
  console.log('场景已切换到:', index);
  ElMessage({
    message: `已切换到场景 ${index + 1}`,
    type: 'info',
    duration: 2000
  });
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

const navigateTo = (location: string) => {
  // 暂时不设置全景图ID和不执行导航操作
  sidebarVisible.value = false;
  // 仍然需要获取留言
  fetchMessages();
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
    // 提交到后端，带上全景图ID
    const response = await axios.post('http://localhost:8080/api/v1/users/messages', {
      content: messageForm.value.content,
      userId: userID.value,
      username: username.value,
      panoramaId: currentPanoramaId.value
    });

    if (response.data.success) {
      // 添加新留言到弹幕列表
      const newMessage = {
        content: messageForm.value.content,
        top: Math.random() * 80,
        duration: 10 + Math.random() * 5,
        color: getRandomColor()
      };
      messages.value.push(newMessage);
      
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
    // 获取当前全景图的留言
    const response = await axios.get(`http://localhost:8080/api/v1/users/messages?panoramaId=${currentPanoramaId.value}`);
    if (response.data.success) {
      messages.value = response.data.data.map((msg: any) => ({
        content: msg.content,
        top: Math.random() * 80,
        duration: 10 + Math.random() * 5,
        color: getRandomColor()
      }));
    }
  } catch (error) {
    console.error('获取留言失败:', error);
  }
};

// 显示当前场景ID
const showCurrentSceneId = () => {
  const currentSceneId = panoramaViewer.value?.getCurrentSceneId();
  ElMessage({
    message: `当前场景ID: ${currentSceneId}`,
    type: 'info',
    duration: 3000
  });
  console.log('当前场景ID:', currentSceneId);
};

onMounted(() => {
  checkLoginStatus();
  fetchMessages();
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
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #409EFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 1000;
}

.message-button:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
}

.message-button .el-icon {
  font-size: 24px;
}

/* 对话框样式 */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

:deep(.message-dialog) {
  border-radius: 12px;
  overflow: hidden;
}

:deep(.message-dialog .el-dialog__header) {
  margin: 0;
  padding: 20px;
  background: linear-gradient(135deg, #409EFF 0%, #53a8ff 100%);
}

:deep(.message-dialog .el-dialog__title) {
  color: white;
  font-size: 20px;
  font-weight: 600;
}

:deep(.message-dialog .el-dialog__body) {
  padding: 30px;
}

:deep(.message-dialog .el-dialog__footer) {
  padding: 20px;
  border-top: 1px solid #f0f0f0;
}

.dialog-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dialog-icon {
  font-size: 24px;
  color: white;
}

:deep(.message-input .el-textarea__inner) {
  min-height: 150px !important;
  resize: none;
  border-radius: 8px;
  border: 1px solid #dcdfe6;
  padding: 15px;
  font-size: 16px;
  line-height: 1.6;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

:deep(.message-input .el-textarea__inner:focus) {
  border-color: #409EFF;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

:deep(.message-input .el-textarea__inner::placeholder) {
  color: #909399;
  font-size: 14px;
}

.cancel-btn {
  border-radius: 20px;
  padding: 10px 25px;
  font-weight: 500;
  background-color: #f5f7fa;
  border: 1px solid #dcdfe6;
  color: #606266;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background-color: #f0f2f5;
  border-color: #c0c4cc;
  color: #303133;
}

.submit-btn {
  border-radius: 20px;
  padding: 10px 25px;
  font-weight: 500;
  background: linear-gradient(135deg, #409EFF 0%, #53a8ff 100%);
  border: none;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

:deep(.el-dialog__close) {
  color: white;
  font-size: 18px;
}

:deep(.el-dialog__close:hover) {
  color: #f0f0f0;
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
}

.danmaku-item {
  position: absolute;
  right: -200px;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  animation: danmaku linear;
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(4px);
}

@keyframes danmaku {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100vw);
  }

/* 调试按钮样式 */
.debug-btn {
  position: absolute;
  bottom: 40px;
  left: 15px;
  z-index: 10;
}
</style>
