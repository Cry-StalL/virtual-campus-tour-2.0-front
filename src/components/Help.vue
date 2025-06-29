<template>
  <div class="help-container">
    <div class="delete-button">
      <el-button style="background-color: rgba(0, 0, 0, 0); border: 0;" @click.stop="closeHelpView">
        <img style="width: 2vw; height: 2vw;" src="../../assets/icons/delete.png">
      </el-button>
    </div>
    
    <div class="header">
      <text class="title" style="color: #005826; font-size: 1.8vw; margin-top: 1vh;">帮助中心</text>
    </div>
    
    <div class="content" >
      <div class="help-section" >
        <text class="section-title">如何使用虚拟校园导览</text>
        <div class="help-item" >
          <text style="width: 90%; text-align: center; font-size: 0.8vw;">🎮 街景云游 ——— 在主页面：点击下方蓝色箭头即可实现前进与后退；点击望远镜图标即可进入场景的沉浸式高清观赏。</text>
        </div>
        <div class="help-item">
          <text style="width: 90%; text-align: center; font-size: 0.8vw;">📍 地点导航 ——— 在左侧边栏：点击"地点跳转"，可在地图上选择闪动的红点或通过搜索框搜索，跳转到对应地点。</text>
        </div>
        <div class="help-item">
          <text style="width: 90%; text-align: center; font-size: 0.8vw;">ℹ️ 实用信息 ——— 在左侧边栏：点击"实用信息"，可以查看学习、饮食、住宿、交通等校园信息介绍。</text>
        </div>
        <div class="help-item">
          <text style="width: 90%; text-align: center; font-size: 0.8vw;">👤 个人设置 ——— 在右上角：您可以点击注册按钮，使用邮箱进行注册；登陆后可自定义头像，在沉浸式场景发表弹幕等。</text>
        </div>
      </div>
      
      <div class="help-section">
        <text class="section-title">常见问题</text>
        <div class="help-item" >
          <text style="width: 90%; text-align: center; font-size: 0.8vw; font-weight: bold; margin-bottom: 0.5vh; text-align: left; margin-left: 5vw;">Q: 为什么页面加载很慢？</text>
          <text style="width: 90%; text-align: center; font-size: 0.7vw; text-align: left; margin-left: 5vw;">A: 全景导览需要加载3D模型和全景图片，建议使用稳定的网络连接。首次访问可能需要较长加载时间。</text>
        </div>
        <div class="help-item">
          <text style="width: 90%; text-align: center; font-size: 0.8vw; font-weight: bold; margin-bottom: 0.5vh; text-align: left; margin-left: 5vw;">Q: 如何获得最佳页面显示体验？</text>
          <text style="width: 90%; text-align: center; font-size: 0.7vw; text-align: left; margin-left: 5vw;">A: 建议使用Chrome、Edge、Safari等浏览器，在16:9的4K屏幕上游览。</text>
        </div>
        <div class="help-item">
          <text style="width: 90%; text-align: center; font-size: 0.8vw; font-weight: bold; margin-bottom: 0.5vh; text-align: left; margin-left: 5vw;">Q: 支持哪些设备？</text>
          <text style="width: 90%; text-align: center; font-size: 0.7vw; text-align: left; margin-left: 5vw;">A: 目前仅支持电脑设备。如需在平板电脑及手机上使用请选择横屏，以减小屏幕比例带来的显示问题。</text>
        </div>
      </div>

     
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['closeHelpView']);

const closeHelpView = () => {
  emit('closeHelpView');
};
</script>

<style scoped>
.help-container {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 1vw;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
}

.delete-button {
  position: absolute;
  right: 2%;
  top: 2%;
  z-index: 10;
}

.delete-button img {
  width: 30px;
  height: 30px;
}

.header {
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #e0e0e0;
  background: white;
  color: #005826;
  flex-shrink: 0;
}

.title {
  font-size: 4vh;
  font-weight: bold;
  color: white;
}

.content {
  background-image: url(../../assets/background.png);
  flex: 1;
  padding: 0vh;
  /* overflow-y: auto; */
  overflow-x: hidden;
  box-sizing: border-box;
  width: 100%;
  height: 70vh;
  background-color: blue;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.help-section {
  
  /* margin-bottom: 30px; */
  /* padding: 20px; */
  margin-top: 2vh;
  margin-bottom: 2vh;
  /* background-color: rgba(248, 249, 250, 0.8); */
  border-radius: 12px;
  width: 60vw;
  height: 35vh;
  background-color: white;
  /* border-left: 4px solid #3498db; */
  box-sizing: border-box;
  /* width: 100%; */
  word-wrap: break-word;
  overflow-wrap: break-word;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: #005826; */

}

.section-title {
  font-size: 2vh;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 0.5vh;
  margin-bottom: 1.5vh;
  /* padding-bottom: 8px; */
  border-bottom: 1px solid #bdc3c7;
  text-align: center;
  /* width: 50%; */
  /* margin-left: 15vw; */
  /* background-color: #005826; */
}

.help-item, .faq-item {
  margin-bottom: 2vh;
  padding: 1.5vh;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: 90%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.help-item h4, .faq-item h4 {
  font-size: 16px;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 8px;
}

.help-item p, .faq-item p {
  font-size: 14px;
  line-height: 1.6;
  color: #555;
  margin: 0;
}

/* 滚动条美化 */
.content::-webkit-scrollbar {
  width: 8px;
}

.content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 手机端自适应 (18:9 比例) */
@media screen and (max-width: 768px) and (orientation: portrait) {
  .help-container {
    border-radius: 0;
    width: 66.67vw;
    max-width: 66.67vw;
    height: 100%;
    margin-left: 33.33vw;
    position: relative;
    overflow: hidden;
  }
  
  .delete-button {
    right: 3%;
    top: 2%;
  }
  
  .delete-button img {
    width: 40px;
    height: 40px;
  }
  
  .header {
    height: 8vh;
    padding: 0 8px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    flex-shrink: 0;
  }
  
  .title {
    font-size: 18px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .content {
    height: auto;
    max-height: 82vh;
    padding: 8px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
  }
  
  .help-section {
    width: 100%;
    max-width: 100%;
    height: auto !important;
    min-height: auto !important;
    margin-top: 12px;
    margin-bottom: 15px;
    padding: 15px;
    box-sizing: border-box;
    overflow: visible;
  }
  
  .section-title {
    font-size: 16px;
    text-align: center;
    margin-bottom: 15px;
    padding: 0 0 8px 0;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .help-item {
    width: 100%;
    max-width: 100%;
    margin-bottom: 15px;
    padding: 12px;
    box-sizing: border-box;
    overflow: visible;
    background-color: rgba(248, 249, 250, 0.8);
    border-radius: 6px;
    min-height: auto;
  }
  
  .help-item text {
    font-size: 13px !important;
    text-align: left !important;
    margin-left: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    display: block;
    line-height: 1.5;
  }
  
  /* 调整常见问题的样式 */
  .help-item text[style*="font-weight: bold"] {
    font-size: 14px !important;
    margin-bottom: 8px;
    display: block;
  }
  
  .help-item text[style*="font-size: 0.7vw"] {
    font-size: 12px !important;
    line-height: 1.4;
    margin-top: 5px;
    display: block;
  }
}
</style> 