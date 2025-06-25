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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  flex-shrink: 0;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  width: 100%;
}

.about-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: rgba(248, 249, 250, 0.8);
  border-radius: 12px;
  border-left: 4px solid #667eea;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid #bdc3c7;
}

.intro-content p {
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  margin-bottom: 15px;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: 15px;
  margin-top: 20px;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 24px;
  margin-right: 15px;
}

.feature-item h4 {
  font-size: 16px;
  font-weight: 600;
  color: #34495e;
  margin: 0 0 5px 0;
}

.feature-item p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.tech-stack {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tech-category {
  margin-bottom: 20px;
}

.tech-category:last-child {
  margin-bottom: 0;
}

.tech-category h4 {
  font-size: 18px;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 12px;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 500;
}

.team-info {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.team-info p {
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  margin-bottom: 20px;
}

.team-stats {
  display: flex;
  justify-content: space-around;
  gap: 15px;
}

.stat-item {
  text-align: center;
  padding: 15px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 8px;
  color: white;
  flex: 1;
}

.stat-number {
  display: block;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
  gap: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.contact-icon {
  font-size: 20px;
  margin-right: 15px;
}

.contact-item h4 {
  font-size: 16px;
  font-weight: 600;
  color: #34495e;
  margin: 0 0 5px 0;
}

.contact-item p {
  font-size: 14px;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .about-container {
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
  
  .about-section {
    margin-bottom: 25px;
    padding: 15px;
    border-radius: 10px;
  }
  
  .section-title {
    font-size: 18px;
  }
  
  .intro-content p {
    font-size: 15px;
  }
  
  .features {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .feature-item {
    padding: 12px;
  }
  
  .feature-icon {
    font-size: 20px;
    margin-right: 12px;
  }
  
  .feature-item h4 {
    font-size: 15px;
  }
  
  .feature-item p {
    font-size: 13px;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .contact-item {
    padding: 12px;
  }
  
  .contact-icon {
    font-size: 18px;
    margin-right: 12px;
  }
  
  .contact-item h4 {
    font-size: 15px;
  }
  
  .contact-item p {
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
  
  .about-section {
    margin-bottom: 20px;
    padding: 12px;
    border-radius: 8px;
  }
  
  .section-title {
    font-size: 16px;
    margin-bottom: 12px;
  }
  
  .intro-content p {
    font-size: 14px;
    margin-bottom: 12px;
  }
  
  .features {
    gap: 10px;
    margin-top: 15px;
  }
  
  .feature-item {
    padding: 10px;
    flex-direction: column;
    text-align: center;
  }
  
  .feature-icon {
    font-size: 18px;
    margin-right: 0;
    margin-bottom: 8px;
  }
  
  .feature-item h4 {
    font-size: 14px;
    margin-bottom: 4px;
  }
  
  .feature-item p {
    font-size: 12px;
  }
  
  .contact-item {
    padding: 10px;
    flex-direction: column;
    text-align: center;
  }
  
  .contact-icon {
    font-size: 16px;
    margin-right: 0;
    margin-bottom: 8px;
  }
  
  .contact-item h4 {
    font-size: 14px;
    margin-bottom: 4px;
  }
  
  .contact-item p {
    font-size: 12px;
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
  
  .about-section {
    margin-bottom: 15px;
    padding: 10px;
  }
  
  .section-title {
    font-size: 15px;
    margin-bottom: 10px;
  }
  
  .intro-content p {
    font-size: 13px;
    margin-bottom: 10px;
  }
  
  .feature-item {
    padding: 8px;
  }
  
  .feature-icon {
    font-size: 16px;
    margin-bottom: 6px;
  }
  
  .feature-item h4 {
    font-size: 13px;
  }
  
  .feature-item p {
    font-size: 11px;
  }
  
  .contact-item {
    padding: 8px;
  }
  
  .contact-icon {
    font-size: 14px;
    margin-bottom: 6px;
  }
  
  .contact-item h4 {
    font-size: 13px;
  }
  
  .contact-item p {
    font-size: 11px;
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