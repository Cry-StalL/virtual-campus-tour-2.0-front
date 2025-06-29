<template>
    <div class="home">
    <div class="content" @click="handleContentClick">
      <!-- 全景导览 -->
      <PanoramaViewerGroup
        :viewers="viewers"
        ref="viewerGroup"
        initialViewerName="street"
        :isLoggedIn="isLoggedIn"
        :userID="userID"
        :username="username"
        :progressiveLoading="true"
        :resolutions="resolutions"
        class="panorama-container"
      />

      <!-- 全景图旋转视频 -->
      <!-- <div v-if="showIntroVideo" class="intro-video-container">
        <video 
          src="/111.mp4" 
          autoplay 
          muted 
          @ended="onVideoEnded"
          @error="onVideoError"
        ></video>
      </div> -->

    </div>

    <!-- 侧边栏切换按钮 -->
    <div class="toggle-btn" @click.stop="toggleSidebar">
      <div style="background-color: white; margin: auto auto; width: 100%; height: 100%; display: flex; align-items: center; border-radius: 50%;">
        <img class="toggle-icon" v-show="!sidebarVisible" src="/icons/SideBar/more.png" >
        <img class="toggle-icon" v-show="sidebarVisible" src="../../assets/icons/close.png" >
      </div>
    </div>

    <!-- 侧边栏 -->
    <div class="sidebar" :class="{ active: sidebarVisible }" @click.stop>
      <Sidebar 
        @toggle-site-choose="toggleSiteChoose" 
        @toggle-useful-info="toggleUsefulInfo" 
        @toggle-help-view="toggleHelpView"
        @toggle-about-view="toggleAboutView"
        @toggle-privacy-view="togglePrivacyView"
        :clearSideBarChoose="clearSideBarChoose" 
      />
    </div>


    <!-- 地点跳转 -->
    <div class="sitechoose" :class="{ active: siteChooseVisible }" @click.stop>
      <SiteChoose @closeSiteChooseView="closeSiteChoose"/>
    </div>
    

    <!-- 实用信息 -->
    <div class="usefulinfo" :class="{ active: usefulInfoVisible }" @click.stop>
      <UsefulInfo @closeUsefulInfoView="closeUsefulInfo"/>
    </div>

    <!-- 帮助界面 -->
    <div class="helpview" :class="{ active: helpViewVisible }" @click.stop>
      <Help @closeHelpView="closeHelpView"/>
    </div>

    <!-- 关于我们界面 -->
    <div class="aboutview" :class="{ active: aboutViewVisible }" @click.stop>
      <About @closeAboutView="closeAboutView"/>
    </div>

    <!-- 隐私政策界面 -->
    <div class="privacyview" :class="{ active: privacyViewVisible }" @click.stop>
      <Privacy @closePrivacyView="closePrivacyView"/>
    </div>

    <!-- 登录和注册 -->
    <div class="btnGroup1" @click.stop>
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
import { ref, onMounted, computed, onBeforeUnmount, markRaw } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { ArrowDown, User, SwitchButton } from '@element-plus/icons-vue';
import PanoramaViewerGroup from '@/components/pano/base-components/PanoramaViewerGroup.vue';
import Sidebar from '@/components/Sidebar.vue';
import { ElMessage } from 'element-plus';
import { APP_CONFIG } from '@/config/config';
import StreetViewer from '@/components/pano/StreetViewer.vue';
import SceneViewer from '@/components/pano/SceneViewer.vue';
import SiteChoose from '@/components/SiteChoose.vue';
import UsefulInfo from '@/components/usefulInfo.vue';
import Help from '@/components/Help.vue';
import About from '@/components/About.vue';
import Privacy from '@/components/Privacy.vue';

// Define types
type SectionState = {
  location: boolean;
  info: boolean;
  help: boolean;
  about: boolean;
  [key: string]: boolean;
};

const viewerGroup = ref();

const router = useRouter();
const userID = ref('0');
const username = ref('');
const sidebarVisible = ref(false);
const currentPanoramaId = ref('1');
const resolutions = ref(["1920x960", "3840x1920", "7680x3840"]); // 定义分辨率列表

// 视频播放状态控制
const showIntroVideo = ref(false); // 默认为false，通过检查来决定是否显示
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

// 检查视频是否已经播放过
const checkVideoPlayStatus = () => {
  const hasPlayedIntro = sessionStorage.getItem('hasPlayedIntroVideo');
  if (!hasPlayedIntro) {
    showIntroVideo.value = true;
  }
};

const isLoggedIn = computed(() => {
  return Number(userID.value) !== 0;
});

// 侧边栏点击显示地点跳转
const siteChooseVisible = ref(false);
const usefulInfoVisible = ref(false);
const helpViewVisible = ref(false);
const aboutViewVisible = ref(false);
const privacyViewVisible = ref(false);

let clearSideBarChoose = ref(false);

// 切换侧边栏显示状态
const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value;
  if (!sidebarVisible.value) {
    siteChooseVisible.value = false;
    usefulInfoVisible.value = false;
    helpViewVisible.value = false;
    aboutViewVisible.value = false;
    privacyViewVisible.value = false;
  }
};

// 处理点击内容区域
const handleContentClick = () => {
  if (sidebarVisible.value) {
    sidebarVisible.value = false;
    siteChooseVisible.value = false;
    usefulInfoVisible.value = false;
    helpViewVisible.value = false;
    aboutViewVisible.value = false;
    privacyViewVisible.value = false;
  }
};


const toggleSiteChoose = () => {
  siteChooseVisible.value = !siteChooseVisible.value; // 切换显示状态
  usefulInfoVisible.value = false;
  helpViewVisible.value = false;
  aboutViewVisible.value = false;
  privacyViewVisible.value = false;
};
const toggleUsefulInfo = () => {
  usefulInfoVisible.value = !usefulInfoVisible.value; // 切换显示状态
  siteChooseVisible.value = false;
  helpViewVisible.value = false;
  aboutViewVisible.value = false;
  privacyViewVisible.value = false;
};
const toggleHelpView = () => {
  helpViewVisible.value = !helpViewVisible.value;
  siteChooseVisible.value = false;
  usefulInfoVisible.value = false;
  aboutViewVisible.value = false;
  privacyViewVisible.value = false;
};
const toggleAboutView = () => {
  aboutViewVisible.value = !aboutViewVisible.value;
  siteChooseVisible.value = false;
  usefulInfoVisible.value = false;
  helpViewVisible.value = false;
  privacyViewVisible.value = false;
};
const togglePrivacyView = () => {
  privacyViewVisible.value = !privacyViewVisible.value;
  siteChooseVisible.value = false;
  usefulInfoVisible.value = false;
  helpViewVisible.value = false;
  aboutViewVisible.value = false;
};
const closeSiteChoose = () => {
  // alert(siteChooseVisible.value)
  siteChooseVisible.value = !siteChooseVisible.value; // 切换显示状态
  clearSideBarChoose.value = !clearSideBarChoose.value;
  // alert(siteChooseVisible.value)

};
const closeUsefulInfo = () => {
  clearSideBarChoose.value = !clearSideBarChoose.value;
  usefulInfoVisible.value = !usefulInfoVisible.value; // 切换显示状态
};
const closeHelpView = () => {
  clearSideBarChoose.value = !clearSideBarChoose.value;
  helpViewVisible.value = !helpViewVisible.value;
};
const closeAboutView = () => {
  clearSideBarChoose.value = !clearSideBarChoose.value;
  aboutViewVisible.value = !aboutViewVisible.value;
};
const closePrivacyView = () => {
  clearSideBarChoose.value = !clearSideBarChoose.value;
  privacyViewVisible.value = !privacyViewVisible.value;
};


// 导航相关函数
function goToLogin() {
router.push('/login');
}

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

// 视频播放控制方法
const onVideoEnded = () => {
  // 标记视频已播放过
  sessionStorage.setItem('hasPlayedIntroVideo', 'true');
  // 视频播放完后停留0.3秒
  setTimeout(() => {
    showIntroVideo.value = false;
  }, 300);
};

const onVideoError = () => {
  sessionStorage.setItem('hasPlayedIntroVideo', 'true');
  showIntroVideo.value = false;
};

const viewers = [
  { name: 'street', component: markRaw(StreetViewer) },
  { name: 'scene', component: markRaw(SceneViewer) }
];

onMounted(() => {
  checkLoginStatus();
  checkVideoPlayStatus();
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
  top: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  z-index: 999;
  transition: transform 0.3s;
  cursor: pointer;
}

/* 侧边栏样式 */
.sidebar {
  position: absolute;
  top: 0;
  left: -300px; /* 桌面端固定宽度 */
  width: 300px;
  height: 100vh;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease;
  z-index: 20;
  /* overflow-y: auto; */
}

.sidebar.active {
  left: 0;
}

/* 移动端样式 */
@media (max-width: 768px) and (orientation: portrait) {
  .sidebar {
    width: 33.33vw;
    min-width: 120px;
    left: -50vw; /* 确保完全隐藏 */
  }
  
  .sidebar.active {
    left: 0;
  }
  
  /* 移动端切换按钮 */
  .toggle-btn {
    top: 15px;
    left: 15px;
    width: 40px;
    height: 40px;
  }
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

/* 切换按钮图标样式 */
.toggle-icon {
  width: 65%;
  height: 65%;
  margin: auto;
  object-fit: contain;
}

/* 移动端图标调整 */
@media (max-width: 768px) and (orientation: portrait) {
  .toggle-icon {
    width: 70%;
    height: 70%;
  }
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
  /* border-radius: 20px; */
  padding: 8px 20px;
  height: 3vh;
  width: 4vw;
  font-size: 0.8vw;
  border-radius: 0.5vw;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(64, 158, 255, 0.2);
  background-color: #7F0000;
  border-color: #7F0000;
}
.login-btn:hover {
  background-color: #AF0000;
  border-color: #AF0000;
  /* color: #409EFF; */
}

.register-btn {
  /* border-radius: 20px; */
  padding: 8px 20px;
  height: 3vh;
  width: 4vw;
  font-size: 0.8vw;
  border-radius: 0.5vw;
  font-weight: 500;
  background-color: white;
  color: #D8915C;
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
  height: 4vh;

}

.user-avatar {
  background-color: whi;
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

/* 场景跳转 */
.sitechoose {
  z-index: 10;
  position: fixed;
  top: 7vh;

  height: 90vh;
  width: 78vw;
  left: -100vw;
  margin-left: 2vw;

  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 1vw;
  transition: left 0.5s ease;
  
  overflow-y: auto;
}

.sitechoose.active {
  left: 18vw;
}

/* 实用信息 */
.usefulinfo {
  z-index: 10;
  position: fixed;
  top: 7vh;

  height: 90vh;
  width: 78vw;
  left: -100vw;
  margin-left: 2vw;

  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 1vw;
  transition: left 0.5s ease;
  
  overflow-y: auto;
}

.usefulinfo.active {
  left: 18vw;
}

/* 帮助界面 */
.helpview {
  z-index: 10;
  position: fixed;
  top: 7vh;

  height: 90vh;
  width: 78vw;
  left: -100vw;
  margin-left: 2vw;

  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 1vw;
  transition: left 0.5s ease;
  
  overflow-y: auto;
}

.helpview.active {
  left: 18vw;
}

/* 关于我们界面 */
.aboutview {
  z-index: 10;
  position: fixed;
  top: 7vh;

  height: 90vh;
  width: 78vw;
  left: -100vw;
  margin-left: 2vw;

  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 1vw;
  transition: left 0.5s ease;
  
  overflow-y: auto;
}

.aboutview.active {
  left: 18vw;
}

/* 隐私政策界面 */
.privacyview {
  z-index: 10;
  position: fixed;
  top: 7vh;

  height: 90vh;
  width: 78vw;
  left: -100vw;
  margin-left: 2vw;

  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 1vw;
  transition: left 0.5s ease;
  
  overflow-y: auto;
}

.privacyview.active {
  left: 18vw;
}

/* 全景图容器样式 */
.panorama-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* 全景图视频容器样式 */
.intro-video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 15;
}

.intro-video-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
