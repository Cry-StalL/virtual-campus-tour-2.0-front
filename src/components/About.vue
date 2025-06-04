<template>
  <div class="about-container">
    <div class="delete-button">
      <el-button style="background-color: rgba(0, 0, 0, 0); border: 0;" @click="closeAboutView">
        <img style="width: 3vw; height: 3vw;" src="../../assets/icons/delete.png">
      </el-button>
    </div>
    
    <div class="header">
      <text class="title">关于我们</text>
    </div>
    
    <div class="content">
      <div class="about-section">
        <h3 class="section-title">项目介绍</h3>
        <div class="intro-content">
          <p>Virtual Campus Tour 2.0 是一个创新的虚拟校园导览系统，旨在为用户提供沉浸式的校园体验。</p>
          <p>通过先进的3D技术和全景展示，我们让您能够足不出户就能深入了解美丽的校园环境，获得身临其境的参观体验。</p>
          <div class="features">
            <div class="feature-item">
              <span class="feature-icon">🏫</span>
              <div>
                <h4>全景校园</h4>
                <p>360度全景展示校园各个角落</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🎮</span>
              <div>
                <h4>交互体验</h4>
                <p>流畅的3D导航和交互操作</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🌐</span>
              <div>
                <h4>多语言</h4>
                <p>支持多种语言，服务全球用户</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="about-section">
        <h3 class="section-title">联系方式</h3>
        <div class="contact-grid">
          <div class="contact-item">
            <span class="contact-icon">📧</span>
            <div>
              <h4>邮箱</h4>
              <p>info@virtualcampus.edu.cn</p>
            </div>
          </div>
          <div class="contact-item">
            <span class="contact-icon">🐙</span>
            <div>
              <h4>GitHub</h4>
              <p><a href="https://github.com/Cry-StalL/virtual-campus-tour-2.0-front" target="_blank" class="contact-link">github.com/virtual-campus-tour</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['closeAboutView']);

const closeAboutView = () => {
  emit('closeAboutView');
};
</script>

<style scoped>
.about-container {
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  flex-shrink: 0;
}

.title {
  font-size: 2.2vw;
  font-weight: bold;
}

.content {
  flex: 1;
  padding: 1.5vw;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  width: 100%;
}

.about-section {
  margin-bottom: 2vw;
  padding: 1.5vw;
  background-color: rgba(248, 249, 250, 0.8);
  border-radius: 0.8vw;
  border-left: 4px solid #667eea;
}

.section-title {
  font-size: 1.5vw;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 1vw;
  padding-bottom: 0.5vw;
  border-bottom: 1px solid #bdc3c7;
}

.intro-content p {
  font-size: 1.1vw;
  line-height: 1.8;
  color: #555;
  margin-bottom: 1vw;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: 1vw;
  margin-top: 1.5vw;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 1vw;
  background-color: white;
  border-radius: 0.5vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2vw;
  margin-right: 1vw;
}

.feature-item h4 {
  font-size: 1.1vw;
  font-weight: 600;
  color: #34495e;
  margin: 0 0 0.3vw 0;
}

.feature-item p {
  font-size: 0.9vw;
  color: #666;
  margin: 0;
}

.tech-stack {
  background-color: white;
  padding: 1.5vw;
  border-radius: 0.5vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tech-category {
  margin-bottom: 1.5vw;
}

.tech-category:last-child {
  margin-bottom: 0;
}

.tech-category h4 {
  font-size: 1.2vw;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 0.8vw;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5vw;
}

.tech-tag {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.3vw 0.8vw;
  border-radius: 1vw;
  font-size: 0.9vw;
  font-weight: 500;
}

.team-info {
  background-color: white;
  padding: 1.5vw;
  border-radius: 0.5vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.team-info p {
  font-size: 1.1vw;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1.5vw;
}

.team-stats {
  display: flex;
  justify-content: space-around;
  gap: 1vw;
}

.stat-item {
  text-align: center;
  padding: 1vw;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 0.5vw;
  color: white;
  flex: 1;
}

.stat-number {
  display: block;
  font-size: 1.8vw;
  font-weight: bold;
  margin-bottom: 0.3vw;
}

.stat-label {
  font-size: 0.9vw;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
  gap: 1vw;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 1vw;
  background-color: white;
  border-radius: 0.5vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.contact-icon {
  font-size: 1.5vw;
  margin-right: 1vw;
}

.contact-item h4 {
  font-size: 1vw;
  font-weight: 600;
  color: #34495e;
  margin: 0 0 0.3vw 0;
}

.contact-item p {
  font-size: 0.9vw;
  color: #666;
  margin: 0;
}

.contact-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border-bottom: 1px solid transparent;
}

.contact-link:hover {
  color: #764ba2;
  border-bottom: 1px solid #764ba2;
  text-decoration: none;
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