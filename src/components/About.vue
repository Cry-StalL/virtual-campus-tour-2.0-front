<template>
  <div class="about-container">
    <div class="delete-button">
      <el-button style="background-color: rgba(0, 0, 0, 0); border: 0;" @click="closeAboutView">
        <img style="width: 3vw; height: 3vw;" src="../../assets/icons/delete.png">
      </el-button>
    </div>
    
    <div class="header">
      <text class="title" style="color: #005826; font-size: 1.8vw; margin-top: 1vh;">关于我们</text>
    </div>
    
    <div class="content">
      <div class="about-section" style="height: 22vh;">
        <text class="section-title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          项目介绍&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </text>
        <div class="intro-content" style="display: flex; flex-direction: column; align-items: center; ">
          <text style="width: 60%; text-align: center; font-size: 0.8vw; margin-bottom: 1vh; ">云游中珠（Virtual Campus Tour）是一个全景校园游览系统，包含街景云游、实用信息、发布弹幕等功能，旨在为中山大学珠海校区的师生同学、校友访客等提供沉浸式的校园体验。</text>
          
          <text style="width: 60%; text-align: center; font-size: 0.8vw; margin-bottom: 1vh; ">云游中珠诞生于中山大学软件工程学院综合实训，系统使用基于Three.js的自研3D全景架构，以及Vue3和Golang语言编写，部署于阿里云服务器，域名为https:sysu.site。</text>
          
          <text style="width: 60%; text-align: center; font-size: 0.8vw; margin-bottom: 1vh; ">在此感谢各位参与此项目的各位指导老师和测试用户的支持！</text>

        </div>
      </div>
      
      <div class="about-section" style="height: 27vh;">
        <text class="section-title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          开发团队&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </text>
        <div class="contact-grid">
          <div class="contact-item" style="width: 14vh; height: 18vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="display: flex; flex-direction: column; ">
              <img src="../../assets//developer1.jpg" style="width: 10vh; height: 10vh; border-radius: 0%;">
              <text style="width: 100%; text-align: center; font-size: 2vh; margin-top: 2vh; margin-bottom: 1vh; height: 0.8vw;">Mark.G</text>
            </div>
          </div>

          <div class="contact-item" style="width: 14vh; height: 18vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="display: flex; flex-direction: column; ">
              <img src="../../assets//developer2.jpg" style="width: 10vh; height: 10vh; border-radius: 0%;">
              <text style="width: 100%; text-align: center; font-size: 2vh; margin-top: 2vh; margin-bottom: 1vh; height: 0.8vw;">Sitan Han</text>
            </div>
          </div>

          <div class="contact-item" style="width: 14vh; height: 18vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="display: flex; flex-direction: column; ">
              <img src="../../assets//developer3.jpg" style="width: 10vh; height: 10vh; border-radius: 0%;">
              <text style="width: 100%; text-align: center; font-size: 2vh; margin-top: 2vh; margin-bottom: 1vh; height: 0.8vw;">duanchy3</text>
            </div>
          </div>

          <div class="contact-item" style="width: 14vh; height: 18vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="display: flex; flex-direction: column; ">
              <img src="../../assets//developer4.jpg" style="width: 10vh; height: 10vh; border-radius: 0%;">
              <text style="width: 100%; text-align: center; font-size: 2vh; margin-top: 2vh; margin-bottom: 1vh; height: 0.8vw;">小高</text>
            </div>
          </div>

          <div class="contact-item" style="width: 14vh; height: 18vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="display: flex; flex-direction: column; ">
              <img src="../../assets//developer5.jpg" style="width: 10vh; height: 10vh; border-radius: 0%;">
              <text style="width: 100%; text-align: center; font-size: 2vh; margin-top: 2vh; margin-bottom: 1vh; height: 0.8vw;">luozhj33</text>
            </div>
          </div>

        </div>
      </div>

      <div class="about-section" style="height: 15vh;">
        <text class="section-title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          联系方式&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </text>
        <div class="contact-grid">
          <div class="contact-item">
            <span class="contact-icon" style="margin-left: 20%;">📧</span>
            <div style="width: 40%; margin-right: 30%; display: flex; flex-direction: column; ">
              <text style="width: 100%; text-align: center; font-size: 0.6vw; font-weight: bold; margin-top: 1vh; margin-bottom: 0.5vh;">邮箱</text>
              <text style="width: 100%; text-align: center; font-size: 0.6vw; margin-bottom: 1vh; height: 0.8vw;">442085931@qq.com</text>
            </div>
          </div>
          <div class="contact-item">
            <span class="contact-icon">🐙</span>
            <div style="width: 50%; margin-right: 20%; display: flex; flex-direction: column; ">
              <text style="width: 100%; text-align: center; font-size: 0.6vw; font-weight: bold; margin-top: 1vh; margin-bottom: 0.5vh;">GitHub</text>
              <div style="display: flex; flex-direction: row;">
                <el-button style="font-size: 1.2vh; width: 5vw; height: 2.3vh; margin-bottom: 1vh;" @click="redirectTo_front">
                  前端仓库
                </el-button>
                <el-button style="font-size: 1.2vh; width: 5vw; height: 2.3vh; margin-bottom: 1vh;" @click="redirectTo_back">
                  后端仓库
                </el-button>
              </div>  
              
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

const redirectTo_front = () => {
    window.open('https://github.com/Cry-StalL/virtual-campus-tour-2.0-front');
};

const redirectTo_back = () => {
    window.open('https://github.com/Cry-StalL/virtual-campus-tour-2.0-back');
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

.about-section {
  margin-top: 2vh;
  margin-bottom: 2vh;
  border-radius: 12px;
  width: 60vw;
  height: 20vh;
  background-color: white;
  box-sizing: border-box;
  word-wrap: break-word;
  overflow-wrap: break-word;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-title {
  font-size: 2vh;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 0.5vh;
  margin-bottom: 1.5vh;
  border-bottom: 1px solid #bdc3c7;
  /* text-align: left; */
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: 15px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1vh;
  width: 28%;
  height: 6vh;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: center;
  /* justify-content: center; */
}

.contact-icon {
  font-size: 20px;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 0.5vh;
  width: 10%;
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