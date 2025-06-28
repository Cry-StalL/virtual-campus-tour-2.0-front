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

.delete-button img {
  width: 30px;
  height: 30px;
}

.header {
  width: 100%;
  height: 12%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #e0e0e0;
  background: white;
  color: w#005826;
  flex-shrink: 0;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.content {
  background-image: url(../../assets/background.png);
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  width: 100%;
}

.help-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: rgba(248, 249, 250, 0.8);
  border-radius: 12px;
  border-left: 4px solid #3498db;
  box-sizing: border-box;
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid #bdc3c7;
}

.help-item, .faq-item {
  margin-bottom: 18px;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .help-container {
    border-radius: 12px;
  }
  
  .delete-button img {
    width: 24px;
    height: 24px;
  }
  
  .title {
    font-size: 20px;
  }
  
  .content {
    padding: 15px;
  }
  
  .help-section {
    margin-bottom: 25px;
    padding: 15px;
    border-radius: 10px;
  }
  
  .section-title {
    font-size: 18px;
    margin-bottom: 12px;
  }
  
  .help-item, .faq-item {
    margin-bottom: 15px;
    padding: 12px;
  }
  
  .help-item h4, .faq-item h4 {
    font-size: 15px;
    margin-bottom: 6px;
  }
  
  .help-item p, .faq-item p {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .delete-button img {
    width: 20px;
    height: 20px;
  }
  
  .title {
    font-size: 18px;
  }
  
  .content {
    padding: 12px;
  }
  
  .help-section {
    margin-bottom: 20px;
    padding: 12px;
    border-radius: 8px;
  }
  
  .section-title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .help-item, .faq-item {
    margin-bottom: 12px;
    padding: 10px;
  }
  
  .help-item h4, .faq-item h4 {
    font-size: 14px;
    margin-bottom: 5px;
  }
  
  .help-item p, .faq-item p {
    font-size: 12px;
    line-height: 1.5;
  }
}

@media (max-width: 320px) {
  .delete-button img {
    width: 18px;
    height: 18px;
  }
  
  .title {
    font-size: 16px;
  }
  
  .content {
    padding: 10px;
  }
  
  .help-section {
    margin-bottom: 15px;
    padding: 10px;
  }
  
  .section-title {
    font-size: 15px;
    margin-bottom: 8px;
  }
  
  .help-item, .faq-item {
    margin-bottom: 10px;
    padding: 8px;
  }
  
  .help-item h4, .faq-item h4 {
    font-size: 13px;
    margin-bottom: 4px;
  }
  
  .help-item p, .faq-item p {
    font-size: 11px;
    line-height: 1.4;
  }
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