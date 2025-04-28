<template>
  <div class="sidebar-content">
    <div style="height: 12vh;"></div>
    <text class="project-name">Virtual Campus Tour</text>
    <div style="height: 4vh;"></div>

    <div class="sidebar-menu">
      <!-- 地点跳转 -->
      <div class="menu-section">
        <button class="menu-button" @click="toggleSection('location')">
          <img class="menu-icon" :src="sectionsState.location ? '/icons/SideBar/location_selected.png' : '/icons/SideBar/location.png'" />
          <text class="menu-text" :style="{ fontWeight: sectionsState.location?'bold':'normal', textDecoration: sectionsState.location?'underline':'none'}" >地点跳转</text>
        </button>
      </div>
      
      <!-- 实用信息 -->
      <div class="menu-section"  @click="toggleSection('info')">
        <button class="menu-button">
          <img class="menu-icon" :src="sectionsState.info ? '/icons/SideBar/info_selected.png' : '/icons/SideBar/info.png'" />
          <text class="menu-text" :style="{ fontWeight: sectionsState.info?'bold':'normal', textDecoration: sectionsState.info?'underline':'none'}">实用信息</text>
        </button>
      </div>
      
      <!-- 帮助 -->
      <div class="menu-section">
        <button class="menu-button" @click="toggleSection('help')">
          <img class="menu-icon" :src="sectionsState.help ? '/icons/SideBar/help_selected.png' : '/icons/SideBar/help.png'" />
          <text class="menu-text" :style="{ fontWeight: sectionsState.help?'bold':'normal', textDecoration: sectionsState.help?'underline':'none'}">帮助</text>
        </button>
      </div>
      
      <!-- 语言 -->
      <div class="menu-section">
        <button class="menu-button" @click="toggleSection('language')">
          <img class="menu-icon" :src="sectionsState.language ? '/icons/SideBar/language_selected.png' : '/icons/SideBar/language.png'" />
          <text class="menu-text" :style="{ fontWeight: sectionsState.language?'bold':'normal', textDecoration: sectionsState.language?'underline':'none'}">Language</text>
        </button>
      </div>
      
      <!-- 隐私政策 -->
      <div class="menu-section">
        <button class="menu-button" @click="toggleSection('privacy')">
          <img class="menu-icon" :src="sectionsState.privacy ? '/icons/SideBar/privacy_selected.png' : '/icons/SideBar/privacy.png'" />
          <text class="menu-text" :style="{ fontWeight: sectionsState.privacy?'bold':'normal', textDecoration: sectionsState.privacy?'underline':'none'}">隐私政策</text>
        </button>
      </div>

      <!-- 关于我们 -->
      <div class="menu-section">
        <button class="menu-button" @click="toggleSection('about')">
          <img class="menu-icon" src="/icons/SideBar/about_selected.png" v-if="sectionsState.about" />
          <img class="menu-icon" src="/icons/SideBar/about.png" v-else />
          <text class="menu-text" :style="{ fontWeight: sectionsState.about?'bold':'normal', textDecoration: sectionsState.about?'underline':'none'}">关于我们</text>
        </button>
      </div>

      

    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed, watch } from 'vue';
  const emit = defineEmits(['toggle-site-choose', 'toggle-useful-info']);
  // Define types
  type SectionState = {
    location: boolean;
    info: boolean;
    help: boolean;
    language: boolean;
    privacy: boolean;
    about: boolean;

    [key: string]: boolean; // Index signature for dynamic access
  };
  const src_path1 = ref('/icons/SideBar/help_selected.png')
  const src_path2 = ref('/icons/SideBar/help.png')

  const sectionsState = ref<SectionState>({
    location: false,
    info: false,
    help: false,
    language: false,
    privacy: false,
    about: false
  });
  const showPlace = () => {
    emit('toggle-site-choose'); // 触发自定义事件，通知父组件
  };
  const showInfo = () => {
    emit('toggle-useful-info'); 
  };
  const navigateToPlace = (location: string) => {
    console.log(`Navigating to ${location}`);
  };

  const navigateToInfo = (type: string) => {
    console.log(`导航到实用信息: ${type}`);
  };

  const navigateToHelp = (type: string) => {
    console.log(`导航到帮助页面: ${type}`);
  };

  const navigateToAbout = (type: string) => {
    console.log(`导航到关于我们页面: ${type}`);
  };

  const navigateToLanguage = (type: string) => {
    console.log(`导航到语言页面: ${type}`);
  };

  const navigateToPrivacy = (type: string) => {
    console.log(`导航到隐私政策页面: ${type}`);
  };

  const toggleSection = (section: string) => {
    sectionsState.value['location'] = false;
    sectionsState.value['info'] = false;
    sectionsState.value['help'] = false;
    sectionsState.value['language'] = false;
    sectionsState.value['privacy'] = false;
    sectionsState.value['about'] = false;
    sectionsState.value[section] = true;
  };

  // 监听 sectionsState 的变化
  watch(
    sectionsState.value,
    (newValue) => {
      if (newValue.location == true) {
        showPlace();
      }
      if (newValue.info == true) {
        showInfo();
      }
      if (newValue.help == true) {
        navigateToHelp('help');
      }
      if (newValue.language == true) {
        navigateToLanguage('language');
      }
      if (newValue.privacy == true) {
        navigateToPrivacy('privacy');
      }
      if (newValue.about == true) {
        navigateToAbout('about');
      }
    },
  );
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
      sectionsState.value['language'] = false;
      sectionsState.value['privacy'] = false;
      sectionsState.value['about'] = false;
    }else{
      sectionsState.value['location'] = false;
      sectionsState.value['info'] = false;
      sectionsState.value['help'] = false;
      sectionsState.value['language'] = false;
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
  height: 100%;

  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  color: black;
  transition: left 0.3s ease;
  z-index: 20;
  overflow-y: auto;
}
.sidebar.active {
  left: 0%;
}

.sidebar-content {
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.sidebar-menu {
  flex-direction: column;
}


/* 云游中珠 */
.project-name {
  height: 10vh;
  width: 100%;

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
  margin-left: 12%;
  width: 80%;
  height: 80%;
  background-color: rgba(255, 255, 255, 0);

  color: black;
  display: flex;
}
.menu-button:hover {
  text-decoration-line: underline;
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
  font-size: 1.5vw;
  text-align: left;
  display: flex;
  align-items: center;
  padding-bottom: 0.2vh;
}





</style>