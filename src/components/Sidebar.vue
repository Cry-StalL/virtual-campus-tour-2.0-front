<template>
  <div class="sidebar-content" style="height: 100vh; margin: 0%; padding: 0%;">
    <div style="height: 12vh; "></div>
    <div style="width: 100%; height: 10vh; ">
      <img src="../../assets/icons/logo.png" class="project-name">
    </div>
    <div style="height: 6vh; "></div>

    <div class="sidebar-menu" style="height: 41vh;">
      <!-- 地点跳转 -->
      <div class="menu-section">
        <button class="menu-button" @click="toggleSection('location')" :class="{ active: sectionsState.location }">
          <img class="menu-icon" src="../../assets/icons/location_selected.png" v-show="sectionsState.location" />
          <img class="menu-icon" src="../../assets/icons/location.png" v-show="!sectionsState.location" />
          <text class="menu-text" :style="{ color: sectionsState.location?'#005826':'black'}" >地点跳转</text>
        </button>
      </div>
      
      <!-- 实用信息 -->
      <div class="menu-section">
        <button class="menu-button" @click="toggleSection('info')" :class="{ active: sectionsState.info }">
          <img class="menu-icon" src="../../assets/icons/info_selected.png" v-show="sectionsState.info" />
          <img class="menu-icon" src="../../assets/icons/info.png" v-show="!sectionsState.info" />
          <text class="menu-text" :style="{ color: sectionsState.info?'#005826':'black'}" >实用信息</text>
        </button>
      </div>
            
      <!-- 帮助 -->
       
      <div class="menu-section">
        <button class="menu-button" @click="toggleSection('help')" :class="{ active: sectionsState.help }">
          <img class="menu-icon" src="../../assets/icons/help_selected.png" v-show="sectionsState.help" />
          <img class="menu-icon" src="../../assets/icons/help.png" v-show="!sectionsState.help" />
          <text class="menu-text" :style="{ color: sectionsState.help?'#005826':'black'}" >帮助中心</text>
        </button>
      </div>
      
      
      <!-- 隐私政策 -->
      <div class="menu-section">
        <button class="menu-button" @click="toggleSection('privacy')" :class="{ active: sectionsState.privacy }">
          <img class="menu-icon" src="../../assets/icons/privacy_selected.png" v-show="sectionsState.privacy" />
          <img class="menu-icon" src="../../assets/icons/privacy.png" v-show="!sectionsState.privacy" />
          <text class="menu-text" :style="{ color: sectionsState.privacy?'#005826':'black'}">隐私政策</text>
        </button>
      </div>

      <!-- 关于我们 -->
      <div class="menu-section">
        <button class="menu-button" @click="toggleSection('about')" :class="{ active: sectionsState.about }">
          <img class="menu-icon" src="../../assets/icons/about_selected.png" v-show="sectionsState.about" />
          <img class="menu-icon" src="../../assets/icons/about.png" v-show="!sectionsState.about" />
          <text class="menu-text" :style="{ color: sectionsState.about?'#005826':'black'}">关于我们</text>
        </button>
      </div>


    </div>

    <div style="display: flex; flex-direction: column; justify-content: center; padding-top: 4vh; height: 20vh;" >
        <img src="../../assets/xiaoxun.png" style="width: 70%; margin-left: 15%; ">
    </div>


  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed, watch } from 'vue';
  const emit = defineEmits([
        'toggle-site-choose',
    'toggle-useful-info',
    'toggle-help-view',
    'toggle-about-view', 
    'toggle-privacy-view'
  ]);
  // Define types
  type SectionState = {
    location: boolean;
    info: boolean;
    help: boolean;
    privacy: boolean;
    about: boolean;

    [key: string]: boolean; // Index signature for dynamic access
  };


  const sectionsState = ref<SectionState>({
    location: false,
    info: false,
    help: false,
    privacy: false,
    about: false
  });
  const change_Show_Place = () => {
    emit('toggle-site-choose'); // 触发自定义事件，通知父组件
  };
  const showInfo = () => {
    emit('toggle-useful-info'); 
  };

  const navigateToHelp = (type: string) => {
    emit('toggle-help-view'); // 触发帮助页面显示事件
  };

  const navigateToAbout = (type: string) => {
    emit('toggle-about-view'); // 触发关于我们页面显示事件
  };



  const navigateToPrivacy = (type: string) => {
    emit('toggle-privacy-view'); // 触发隐私政策页面显示事件
  };

  const toggleSection = (section: string) => {
    if (!sectionsState.value[section]){// 原来是false
      sectionsState.value['location'] = false;
      sectionsState.value['info'] = false;
      sectionsState.value['help'] = false;
      sectionsState.value['privacy'] = false;
      sectionsState.value['about'] = false;
      sectionsState.value[section] = true;
    }else{// 原来是true
      sectionsState.value['location'] = false;
      sectionsState.value['info'] = false;
      sectionsState.value['help'] = false;
      sectionsState.value['privacy'] = false;
      sectionsState.value['about'] = false;
    }
    
    
  };

  // 监听 sectionsState 的变化
  const watchSection = (sectionKey: keyof SectionState, callback: () => void) => {
    watch(
      () => sectionsState.value[sectionKey],
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          callback();
        }
      }
    );
  };

  watchSection('location', change_Show_Place);
  watchSection('info', showInfo);
  watchSection('help', () => navigateToHelp('help'));
  watchSection('privacy', () => navigateToPrivacy('privacy'));
  watchSection('about', () => navigateToAbout('about'));

  const props = defineProps({
    clearSideBarChoose: {
      type: Boolean,
      default: false,
    },
  })
// 监听 clearSideBarChoose 的变化
watch(
  () => props.clearSideBarChoose,
  (newValue) => {
    if (newValue === true) {
      sectionsState.value['location'] = false;
      sectionsState.value['info'] = false;
      sectionsState.value['help'] = false;
      sectionsState.value['privacy'] = false;
      sectionsState.value['about'] = false;
    }else{
      sectionsState.value['location'] = false;
      sectionsState.value['info'] = false;
      sectionsState.value['help'] = false;
      sectionsState.value['privacy'] = false;
      sectionsState.value['about'] = false;
    }
  }
);
  

  

  onMounted(() => {

  });

</script>




<style>
/* 侧边栏样式 */
.sidebar {
  position: absolute;
  top: 0;
  left: -300px; /* 桌面端默认隐藏 */
  width: 300px; /* 桌面端固定宽度 */
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  color: black;
  transition: left 0.3s ease;
  z-index: 20;
  overflow-y: hidden;
}
.sidebar.active {
  left: 0%;
}

.sidebar-content {
  padding: 0;
  margin: 0;
  height: 100%;
  overflow-y: hidden;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: linear-gradient(
    to bottom,
    transparent 25vh,
    #F1F0EA 25vh,
    #F1F0EA 73vh,
    #005826 73vh,
    #005826 100vh,
    transparent 100vh
  );

}

.sidebar-menu {
  /* height: 60vh; */
  margin-top: 3vh;
  flex-direction: column;
}


/* 云游中珠 */
.project-name {
  height: 3vw;
  width: 12vw;
  margin-left: 1vw;
  font-size: 1.4vw;
  font-weight: bold;

  white-space: nowrap;
}

.menu-section {
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
}


.menu-button {
  border: 0;
  margin-left: 25%;
  width: 70%;
  height: 80%;
  background-color: rgba(255, 255, 255, 0);

  color: black;
  display: flex;

  font-weight: normal;
  text-decoration-line: none;
}

.menu-button:hover,
.menu-button:active,
.menu-button.active {
  font-weight: bold;
  text-decoration-line: underline;
  color: #005826;
}

.menu-icon{
  width: 1.3vw;
  height: 1.3vw;
  margin: auto;

  align-items: center;
  justify-content: center;
  margin-right: 1vw;
}

.menu-text{
  width: 80%;
  font-size: 1.3vw;
  text-align: left;
  display: flex;
  align-items: center;
  padding-bottom: 0.2vh;
  font-family: "Microsoft YaHei";
  color: black;
  /* font-weight: normal; */
}

/* 18:9 手机屏幕适配 - 侧边栏占屏幕宽度的1/3 */
@media (max-width: 768px) and (orientation: portrait) {
  .sidebar {
    width: 33.33vw;
    min-width: 120px;
    left: -50vw; /* 确保完全隐藏 */
  }
  .sidebar.active {
    left: 0%;
  }
  
  .sidebar-content {
    padding: 0;
    margin: 0;
    width: 100%;
  }

  /* Logo适配 */
  .project-name {
    height: 8vw;
    width: 28vw;
    margin-left: 2.5vw;
    font-size: 3.5vw;
    font-weight: bold;
    white-space: nowrap;
  }

  /* 菜单按钮适配 */
  .menu-section {
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .menu-button {
    border: 0;
    margin-left: 15%;
    width: 85%;
    height: 85%;
    background-color: rgba(255, 255, 255, 0);
    color: black;
    display: flex;
    font-weight: normal;
    text-decoration-line: none;
    padding: 2px 0;
  }

  /* 图标适配 */
  .menu-icon {
    width: 4vw;
    height: 4vw;
    margin: auto;
    align-items: center;
    justify-content: center;
    margin-right: 2vw;
    min-width: 16px;
    min-height: 16px;
  }

  /* 文字适配 */
  .menu-text {
    width: 80%;
    font-size: 3.2vw;
    text-align: left;
    display: flex;
    align-items: center;
    padding-bottom: 0.2vh;
    font-family: "Microsoft YaHei";
    color: black;
  }

  /* 底部logo适配 */
  .sidebar-content > div:last-child {
    padding-top: 2vh;
    height: 18vh;
  }
  
  .sidebar-content > div:last-child img {
    width: 80%;
    margin-left: 10%;
  }
}

</style>