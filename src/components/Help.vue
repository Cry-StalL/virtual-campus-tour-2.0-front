<template>
  <div class="help-container">
    <div class="delete-button">
      <el-button style="background-color: rgba(0, 0, 0, 0); border: 0;" @click="closeHelpView">
        <img style="width: 3vw; height: 3vw;" src="../../assets/icons/delete.png">
      </el-button>
    </div>
    
    <div class="header">
      <text class="title">帮助中心</text>
    </div>
    
    <div class="content">
      <div class="help-section">
        <h3 class="section-title">如何使用虚拟校园导览</h3>
        <div class="help-item">
          <h4>📍 地点导航</h4>
          <p>点击左侧边栏的"地点跳转"可以选择想要参观的校园地点，系统会自动为您导航到对应位置。</p>
        </div>
        <div class="help-item">
          <h4>🎮 操作控制</h4>
          <p>使用鼠标拖拽可以改变视角，滚轮可以缩放视图（VR模式有待开发）。</p>
        </div>
        <div class="help-item">
          <h4>ℹ️ 实用信息</h4>
          <p>点击"实用信息"可以查看校园各个区域的详细介绍。</p>
        </div>
        <div class="help-item">
          <h4>👤 个人设置</h4>
          <p>您可以自定义虚拟形象，选择合适的语言设置，获得更好的体验。</p>
        </div>
      </div>
      
      <div class="help-section">
        <h3 class="section-title">常见问题</h3>
        <div class="faq-item">
          <h4>Q: 为什么页面加载很慢？</h4>
          <p>A: 虚拟导览需要加载3D模型和全景图片，建议使用稳定的网络连接。首次访问可能需要较长加载时间。</p>
        </div>
        <div class="faq-item">
          <h4>Q: 如何获得最佳体验？</h4>
          <p>A: 建议使用浏览器有 Chrome、Firefox、Safari 等。</p>
        </div>
        <div class="faq-item">
          <h4>Q: 支持哪些设备？</h4>
          <p>A: 目前仅支持电脑设备。</p>
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

.header {
  width: 100%;
  height: 12%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #e0e0e0;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  flex-shrink: 0;
}

.title {
  font-size: 2.2vw;
  font-weight: bold;
  color: white;
}

.content {
  flex: 1;
  padding: 1.5vw;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  width: 100%;
}

.help-section {
  margin-bottom: 2vw;
  padding: 1.5vw;
  background-color: rgba(248, 249, 250, 0.8);
  border-radius: 0.8vw;
  border-left: 4px solid #3498db;
  box-sizing: border-box;
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.section-title {
  font-size: 1.5vw;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 1vw;
  padding-bottom: 0.5vw;
  border-bottom: 1px solid #bdc3c7;
}

.help-item, .faq-item {
  margin-bottom: 1.2vw;
  padding: 1vw;
  background-color: white;
  border-radius: 0.5vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.help-item h4, .faq-item h4 {
  font-size: 1.2vw;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 0.5vw;
}

.help-item p, .faq-item p {
  font-size: 1vw;
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
</style> 