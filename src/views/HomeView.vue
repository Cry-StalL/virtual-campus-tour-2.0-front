<template>
  <div class="home">
    <div class="content">
      <!-- 全景导览的主要内容 -->
      <PanoramaViewer 
        imagePath="/images/panorama.jpg"
        :hotspots="hotspots"
      />
    </div>

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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { ArrowRight, ArrowLeft, ArrowDown, User, SwitchButton } from '@element-plus/icons-vue';
import PanoramaViewer from '../components/PanoramaViewer.vue';
import Sidebar from '../components/Sidebar.vue';
import { ElMessage } from 'element-plus';

// 导入HotSpot接口类型 TODO
interface HotSpot {
  id: string;
  longitude: number;
  latitude: number;
  icon?: string;
  title?: string;
  description?: string;
  onClick?: (params?: any) => void;
  params?: any;
}

// Define types
type SectionState = {
  location: boolean;
  info: boolean;
  help: boolean;
  about: boolean;
  [key: string]: boolean; // Index signature for dynamic access
};

// 定义热点数据
const hotspots = [
  {
    id: '1',
    longitude: 0.24,
    latitude: -0.72,
    icon: "/icons/arrow_hotspot.png",
    title: '图书馆',
    description: '这是图书馆的位置',
    onClick: (params: any) => {
      console.log('图书馆热点被点击', params);
      // 显示提示框
      ElMessage({
        message: '您点击了图书馆热点',
        type: 'info',
        duration: 3000
      });
    },
    params: {
      sceneId: 'library',
      transition: 'fade'
    }
  },
  // {
  //   id: '2',
  //   longitude: 90,
  //   latitude: 25,
  //   title: '教学楼A',
  //   description: '这是教学楼A的位置',
  //   onClick: (params: any) => {
  //     console.log('教学楼A热点被点击', params);
  //     // 显示提示框
  //     ElMessage({
  //       message: '您点击了教学楼A热点',
  //       type: 'info',
  //       duration: 3000
  //     });
  //   },
  //   params: {
  //     sceneId: 'jxl',
  //     transition: 'fade'
  //   }
  // },
  // {
  //   id: '3',
  //   longitude: -120,
  //   latitude: -20,
  //   title: '体育馆',
  //   description: '这是体育馆的位置',
  //   onClick: (params: any) => {
  //     console.log('体育馆热点被点击', params);
  //     // 显示提示框
  //     ElMessage({
  //       message: '您点击了体育馆热点',
  //       type: 'info',
  //       duration: 3000
  //     });
  //   },
  //   params: {
  //     sceneId: 'gym',
  //     transition: 'fade'
  //   }
  // },
];

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
</style>
