<template>
  <div class="sidebar-content" style="height: 100vh; margin: 0%; padding: 0%;">
    <div style="height: 12vh; "></div>
    <div style="width: 100%; height: 10vh; ">
      <img src="../../assets/icons/logo.png" class="project-name">
    </div>
    <div style="height: 6vh; "></div>

    <div class="sidebar-menu" style="height: 44vh;">
      <!-- 地点跳转 -->
      <div class="menu-section">
        <button class="menu-button" @click="toggleSection('location')" :class="{ active: sectionsState.location }">
          <img class="menu-icon" :src="sectionsState.location ? '/icons/SideBar/location_selected.png' : '/icons/SideBar/location.png'" />
          <text class="menu-text" :style="{ color: sectionsState.location?'#005826':'black'}" >地点跳转</text>
        </button>
      </div>
      
      <!-- 实用信息 -->
      <div class="menu-section">
        <button class="menu-button" @click="toggleSection('info')" :class="{ active: sectionsState.info }">
          <img class="menu-icon" :src="sectionsState.info ? '/icons/SideBar/info_selected.png' : '/icons/SideBar/info.png'" />
          <text class="menu-text" :style="{ color: sectionsState.info?'#005826':'black'}" >实用信息</text>
        </button>
      </div>
            
      <!-- 帮助 -->
       
      <div class="menu-section">
        <button class="menu-button" @click="toggleSection('help')" :class="{ active: sectionsState.help }">
          <img class="menu-icon" :src="sectionsState.help ? '/icons/SideBar/help_selected.png' : '/icons/SideBar/help.png'" />
          <text class="menu-text" :style="{ color: sectionsState.help?'#005826':'black'}" >帮助</text>
        </button>
      </div>
      
      <!-- 语言 -->
      <div class="menu-section">
        <button class="menu-button" @click="toggleSection('language')" :class="{ active: sectionsState.language }">
          <img class="menu-icon" :src="sectionsState.language ? '/icons/SideBar/language_selected.png' : '/icons/SideBar/language.png'" />
          <text class="menu-text" :style="{ color: sectionsState.language?'#005826':'black'}">Language</text>
        </button>
      </div>
      
      <!-- 隐私政策 -->
      <div class="menu-section">
        <button class="menu-button" @click="toggleSection('privacy')" :class="{ active: sectionsState.privacy }">
          <img class="menu-icon" :src="sectionsState.privacy ? '/icons/SideBar/privacy_selected.png' : '/icons/SideBar/privacy.png'" />
          <text class="menu-text" :style="{ color: sectionsState.privacy?'#005826':'black'}">隐私政策</text>
        </button>
      </div>

      <!-- 关于我们 -->
      <div class="menu-section">
        <button class="menu-button" @click="toggleSection('about')" :class="{ active: sectionsState.about }">
          <img class="menu-icon" src="/icons/SideBar/about_selected.png" v-if="sectionsState.about" />
          <img class="menu-icon" src="/icons/SideBar/about.png" v-else />
          <text class="menu-text" :style="{ color: sectionsState.about?'#005826':'black'}">关于我们</text>
        </button>
      </div>
    </div>

    <div style="display: flex; flex-direction: column; justify-content: center; padding-top: 4vh; height: 20vh;" >
        <img src="../../assets/xiaoxun.png" style="width: 75%; margin-left: 10%; ">
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
    'toggle-privacy-view',
    'toggle-language-view'
  ]);
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

  const navigateToHelp = (type: string) => {
    emit('toggle-help-view'); // 触发帮助页面显示事件
  };

  const navigateToAbout = (type: string) => {
    emit('toggle-about-view'); // 触发关于我们页面显示事件
  };

  const navigateToLanguage = (type: string) => {
    emit('toggle-language-view'); // 触发语言页面显示事件
  };

  const navigateToPrivacy = (type: string) => {
    emit('toggle-privacy-view'); // 触发隐私政策页面显示事件
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
    #F1F0EB 25vh,
    #F1F0EB 73vh,
    #005826 73vh,
    #005826 100vh,
    transparent 100vh
  );

}

.sidebar-menu {
  /* height: 60vh; */
  flex-direction: column;
}


/* 云游中珠 */
.project-name {
  height: 3vw;
  width: 12vw;
  margin-left: 0vw;
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
  margin-left: 20%;
  width: 80%;
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





</style>