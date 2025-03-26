<template>
  <div class="home">
    <div class="content">
      <!-- 全景导览的主要内容 -->
      <PanoramaViewer imagePath="/images/panorama.jpg" />
    </div>

    <!-- 侧边栏切换按钮 -->
    <div class="toggle-btn" @click="toggleSidebar">
      <el-icon>
        <ArrowRight v-if="!sidebarVisible" />
        <ArrowLeft v-else />
      </el-icon>
    </div>

    <!-- 侧边栏 -->
    <div class="sidebar" :class="{ active: sidebarVisible }">
      <div class="sidebar-content">
        <h3>Virtual Campus Tour</h3>
        <div class="sidebar-menu">
          <!-- 地点跳转 -->
          <div class="menu-section">
            <div class="section-title" @click="toggleSection('location')">
              地点跳转
              <el-icon class="section-icon">
                <ArrowDown v-if="sectionsState.location" />
                <ArrowRight v-else />
              </el-icon>
            </div>
            <transition name="section">
              <div class="section-content" v-if="sectionsState.location">
                <div class="menu-item" @click="navigateTo('overview')">校园概览</div>
                <div class="menu-item" @click="navigateTo('teaching')">教学楼</div>
                <div class="menu-item" @click="navigateTo('library')">图书馆</div>
                <div class="menu-item" @click="navigateTo('dorm')">宿舍区</div>
                <div class="menu-item" @click="navigateTo('sports')">体育馆</div>
              </div>
            </transition>
          </div>
          
          <!-- 实用信息 -->
          <div class="menu-section">
            <div class="section-title" @click="toggleSection('info')">
              实用信息
              <el-icon class="section-icon">
                <ArrowDown v-if="sectionsState.info" />
                <ArrowRight v-else />
              </el-icon>
            </div>
            <transition name="section">
              <div class="section-content" v-if="sectionsState.info">

              </div>
            </transition>
          </div>
          
          <!-- 帮助 -->
          <div class="menu-section">
            <div class="section-title" @click="toggleSection('help')">
              帮助
              <el-icon class="section-icon">
                <ArrowDown v-if="sectionsState.help" />
                <ArrowRight v-else />
              </el-icon>
            </div>
            <transition name="section">
              <div class="section-content" v-if="sectionsState.help">
                <div class="menu-item" @click="navigateToHelp('guide')">使用指南</div>
                <div class="menu-item" @click="navigateToHelp('faq')">常见问题</div>
              </div>
            </transition>
          </div>
          
          <!-- 关于我们 -->
          <div class="menu-section">
            <div class="section-title" @click="toggleSection('about')">
              关于我们
              <el-icon class="section-icon">
                <ArrowDown v-if="sectionsState.about" />
                <ArrowRight v-else />
              </el-icon>
            </div>
            <transition name="section">
              <div class="section-content" v-if="sectionsState.about">
                <div class="menu-item" @click="navigateToAbout('team')">团队介绍</div>
                <div class="menu-item" @click="navigateToAbout('contact')">联系我们</div>
              </div>
            </transition>
          </div>
        </div>
      </div>
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
                <el-dropdown-item @click="goToPersonal">
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { ArrowRight, ArrowLeft, ArrowDown, User, SwitchButton } from '@element-plus/icons-vue';
import PanoramaViewer from '../components/PanoramaViewer.vue';

// Define types
type SectionState = {
  location: boolean;
  info: boolean;
  help: boolean;
  about: boolean;
  [key: string]: boolean; // Index signature for dynamic access
};

const router = useRouter();
const userID = ref('0');
const username = ref('');
const sidebarVisible = ref(false);
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

const goToPersonal = () => {
  router.push('/personal');
};

const logout = () => {
  // 清除用户Cookie
  Cookies.set('userId', '0', { expires: 1 });
  Cookies.set('username', '', { expires: 1 });
  
  userID.value = '0';
  username.value = '';
  
  router.push('/login');
};

const navigateTo = (location: string) => {
  console.log(`Navigating to ${location}`);
  // 导航后关闭侧边栏
  sidebarVisible.value = false;
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

onMounted(() => {
  checkLoginStatus();
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

.menu-item {
  padding: 12px 10px;
  margin-bottom: 5px;
  border-radius: 4px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #f0f0f0;
}

/* 侧边栏切换按钮样式 */
.toggle-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 40px;
  height: 40px;
  background-color: #409EFF;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 30;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.toggle-btn:hover {
  transform: scale(1.1);
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
</style>
