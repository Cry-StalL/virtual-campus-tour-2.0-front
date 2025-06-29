<template>
  <div class="m_sidebar-content" style="margin: 0%; padding: 0%;">
    <div style="height: 5vh; "></div>
    <div style="width: 100%; height: 10vh; display: flex; align-items: center; justify-content: center; ">
      <img src="../../assets/icons/logo.png" class="project-name">
    </div>

  
    <div class="m_sidebar-m_menu" style="height: 30vh;">
      <!-- 地点跳转 -->
      <div class="m_menu-section" style="">
        <button class="m_menu-button" @click="toggleSection('location')" :class="{ active: sectionsState.location }">
          <text class="m_menu-text" :style="{ color: sectionsState.location?'#005826':'black'}" >地点跳转</text>
        </button>
      </div>
      
      <!-- 实用信息 -->
      <div class="m_menu-section">
        <button class="m_menu-button" @click="toggleSection('info')" :class="{ active: sectionsState.info }">
          <text class="m_menu-text" :style="{ color: sectionsState.info?'#005826':'black'}" >实用信息</text>
        </button>
      </div>
            
      <!-- 帮助 -->
       
      <div class="m_menu-section">
        <button class="m_menu-button" @click="toggleSection('help')" :class="{ active: sectionsState.help }">
          <text class="m_menu-text" :style="{ color: sectionsState.help?'#005826':'black'}" >帮助中心</text>
        </button>
      </div>
      
      
      <!-- 隐私政策 -->
      <div class="m_menu-section">
        <button class="m_menu-button" @click="toggleSection('privacy')" :class="{ active: sectionsState.privacy }">
          <text class="m_menu-text" :style="{ color: sectionsState.privacy?'#005826':'black'}">隐私政策</text>
        </button>
      </div>

      <!-- 关于我们 -->
      <div class="m_menu-section">
        <button class="m_menu-button" @click="toggleSection('about')" :class="{ active: sectionsState.about }">
          <text class="m_menu-text" :style="{ color: sectionsState.about?'#005826':'black'}">关于我们</text>
        </button>
      </div>

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
    clearm_SideBarChoose: {
      type: Boolean,
      default: false,
    },
  })
// 监听 clearm_SideBarChoose 的变化
watch(
  () => props.clearm_SideBarChoose,
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


.m_sidebar-content {
  padding: 0%;
  margin: 0%;
  height: 100%;
  overflow-y: hidden;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: linear-gradient(
    to bottom,
    transparent 15vh,
    #F1F0EA 15vh,
    #F1F0EA 46vh,
    transparent 46vh
  );

}

.m_sidebar-m_menu {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-top: 3vh; */
  flex-direction: column;
}


/* 云游中珠 */
.project-name {
  height: 5vh;
  width: 20vh;
  margin-left: 1vw;
  font-size: 1.4vw;
  font-weight: bold;

  white-space: nowrap;
}

.m_menu-section {
  width: 100%;
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #005826; */
}


.m_menu-button {
  border: 0;

  margin-left: 15%;
  margin-right: 15%;
  width: 70%;
  height: 5vh;
  background-color: rgba(255, 255, 255, 0);

  color: black;
  display: flex;

  font-weight: normal;
  text-decoration-line: none;
}

.m_menu-button:hover,
.m_menu-button:active,
.m_menu-button.active {
  font-weight: bold;
  text-decoration-line: underline;
  color: #005826;
}

.m_menu-icon{
  width: 1.3vw;
  height: 1.3vw;
  margin: auto;

  align-items: center;
  justify-content: center;
  margin-right: 1vw;
}

.m_menu-text{
  width: 80%;
  margin-left: 10%;
  font-size: 2vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 0.2vh;
  font-family: "Microsoft YaHei";
  color: black;
}



</style>