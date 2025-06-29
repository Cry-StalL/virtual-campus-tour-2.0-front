<template>
  <div class="about-container">
    <div class="delete-button">
      <el-button style="background-color: rgba(0, 0, 0, 0); border: 0;" @click.stop="closeAboutView">
        <img style="width: 2vw; height: 2vw;" src="../../assets/icons/delete.png">
      </el-button>
    </div>
    
    <div class="header">
      <text class="title" style="color: #005826; font-size: 1.8vw; margin-top: 1vh;">关于我们</text>
    </div>
    
    <div class="content">
      <div class="about-section" style="height: 22vh;">
        <text class="section-title">项目介绍</text>
        <div class="intro-content" style="display: flex; flex-direction: column; align-items: center; ">
          <text style="width: 60%; text-align: center; font-size: 0.8vw; margin-bottom: 1vh; ">云游中珠（Virtual Campus Tour）是一个全景校园游览系统，包含街景云游、实用信息、发布弹幕等功能，旨在为中山大学珠海校区的师生同学、校友访客等提供沉浸式的校园体验。</text>
          
          <text style="width: 60%; text-align: center; font-size: 0.8vw; margin-bottom: 1vh; ">云游中珠诞生于中山大学软件工程学院综合实训，系统使用基于Three.js的自研3D全景架构，以及Vue3和Golang语言编写，部署于阿里云服务器，域名为https:sysu.site。</text>
          
          <text style="width: 60%; text-align: center; font-size: 0.8vw; margin-bottom: 1vh; ">在此感谢各位参与此项目的各位指导老师和测试用户的支持！</text>

        </div>
      </div>
      
      <div class="about-section" style="height: 27vh;">
        <text class="section-title">开发团队</text>
        <div class="contact-grid">
          <div class="contact-item" style="width: 14vh; height: 18vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="display: flex; flex-direction: column; ">
              <img src="../../assets/developer1.jpg" style="width: 10vh; height: 10vh; border-radius: 0%;">
              <text style="width: 100%; text-align: center; font-size: 2vh; margin-top: 2vh; margin-bottom: 1vh; height: 0.8vw;">Mark.G</text>
            </div>
          </div>

          <div class="contact-item" style="width: 14vh; height: 18vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="display: flex; flex-direction: column; ">
              <img src="../../assets/developer2.jpg" style="width: 10vh; height: 10vh; border-radius: 0%;">
              <text style="width: 100%; text-align: center; font-size: 2vh; margin-top: 2vh; margin-bottom: 1vh; height: 0.8vw;">Sitan Han</text>
            </div>
          </div>

          <div class="contact-item" style="width: 14vh; height: 18vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="display: flex; flex-direction: column; ">
              <img src="../../assets/developer3.jpg" style="width: 10vh; height: 10vh; border-radius: 0%;">
              <text style="width: 100%; text-align: center; font-size: 2vh; margin-top: 2vh; margin-bottom: 1vh; height: 0.8vw;">duanchy3</text>
            </div>
          </div>

          <div class="contact-item" style="width: 14vh; height: 18vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="display: flex; flex-direction: column; ">
              <img src="../../assets/developer4.jpg" style="width: 10vh; height: 10vh; border-radius: 0%;">
              <text style="width: 100%; text-align: center; font-size: 2vh; margin-top: 2vh; margin-bottom: 1vh; height: 0.8vw;">小高</text>
            </div>
          </div>

          <div class="contact-item" style="width: 14vh; height: 18vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="display: flex; flex-direction: column; ">
              <img src="../../assets/developer5.jpg" style="width: 10vh; height: 10vh; border-radius: 0%;">
              <text style="width: 100%; text-align: center; font-size: 2vh; margin-top: 2vh; margin-bottom: 1vh; height: 0.8vw;">luozhj33</text>
            </div>
          </div>

        </div>
      </div>

      <div class="about-section" style="height: 15vh;">
        <text class="section-title">联系方式</text>
        <div class="contact-grid">
          <div class="contact-item">
            <span class="contact-icon" style="margin-left: 20%;">📧</span>
            <div style="width: 40%; margin-right: 30%; display: flex; flex-direction: column; ">
              <text style="width: 120%; text-align: center; font-size: 0.6vw; font-weight: bold; margin-top: 1vh; margin-bottom: 0.5vh;">邮箱</text>
              <text style="width: 120%; text-align: center; font-size: 0.6vw; margin-bottom: 1vh; height: 0.8vw;">virtual_sysu_tour@qq.com</text>
            </div>
          </div>
          <div class="contact-item">
            <span class="contact-icon">🐙</span>
            <div style="width: 50%; margin-right: 20%; display: flex; flex-direction: column; ">
              <text style="width: 120%; text-align: center; font-size: 0.6vw; font-weight: bold; margin-top: 1vh; margin-bottom: 0.5vh;">GitHub</text>
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
  .about-container {
    border-radius: 1vw;
    width: 100%;
    max-width: 100%;
    height: 100%;
    margin-left: 0%;
    position: relative;
    overflow: hidden;
  }
  
  .delete-button {
    right: 3%;
    top: 2%;
  }
  
  .delete-button img {
    width: 20px !important;
    height: 20px !important;
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
    padding: 12px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
  }
  
  .about-section {
    width: 100%;
    max-width: 100%;
    height: auto !important;
    min-height: auto !important;
    margin-top: 20px;
    margin-bottom: 25px;
    padding: 20px;
    box-sizing: border-box;
    overflow: visible;
  }
  
  .section-title {
    font-size: 16px;
    text-align: center;
    margin-bottom: 20px;
    padding: 0 0 12px 0;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .intro-content text {
    font-size: 13px !important;
    width: 90% !important;
    max-width: 90% !important;
    line-height: 1.6;
    margin-bottom: 16px !important;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    display: block;
  }
  
  /* 开发团队部分 - 美化布局 */
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    width: 100%;
    max-width: 100%;
    justify-items: center;
    margin-top: 20px;
    padding: 0 10px;
  }
  
  /* 第5个成员单独占一行并居中 */
  .about-section[style*="height: 27vh"] .contact-grid .contact-item:nth-child(5) {
    grid-column: 1 / -1;
    justify-self: center;
    margin-top: 10px;
  }
  
  .about-section[style*="height: 27vh"] {
    min-height: auto;
    padding: 30px 15px 40px 15px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
  }
  
  .about-section[style*="height: 27vh"] .contact-item {
    width: 120px !important;
    max-width: 120px;
    height: auto !important;
    min-height: 160px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 18px;
    box-sizing: border-box;
    overflow: visible;
    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
    border-radius: 20px;
    margin-bottom: 20px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.9);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  
  /* 添加微妙的悬浮背景效果 */
  .about-section[style*="height: 27vh"] .contact-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 88, 38, 0.05) 0%, rgba(0, 88, 38, 0.1) 100%);
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
  }
  
  .about-section[style*="height: 27vh"] .contact-item:hover::before {
    opacity: 1;
  }
  
  .about-section[style*="height: 27vh"] .contact-item:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
    border-color: rgba(0, 88, 38, 0.25);
  }
  
  .about-section[style*="height: 27vh"] .contact-item > div {
    position: relative;
    z-index: 1;
  }
  
  .about-section[style*="height: 27vh"] .contact-item img {
    width: 85px !important;
    height: 85px !important;
    border-radius: 50%;
    border: 4px solid #ffffff;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    object-fit: cover;
    background: #f8f9fa;
  }
  
  .about-section[style*="height: 27vh"] .contact-item:hover img {
    transform: scale(1.08);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    border-color: rgba(0, 88, 38, 0.4);
  }
  
  /* 第5个成员的头像特别突出 */
  .about-section[style*="height: 27vh"] .contact-item:nth-child(5) {
    width: 130px !important;
    max-width: 130px;
    min-height: 170px;
    background: linear-gradient(145deg, #ffffff 0%, #f0f8f0 100%);
    box-shadow: 0 10px 30px rgba(0, 88, 38, 0.15);
    border: 2px solid rgba(0, 88, 38, 0.1);
  }
  
  .about-section[style*="height: 27vh"] .contact-item:nth-child(5) img {
    width: 95px !important;
    height: 95px !important;
    border: 5px solid #ffffff;
    box-shadow: 0 8px 24px rgba(0, 88, 38, 0.2);
  }
  
  .about-section[style*="height: 27vh"] .contact-item:nth-child(5):hover {
    box-shadow: 0 20px 50px rgba(0, 88, 38, 0.25);
    border-color: rgba(0, 88, 38, 0.3);
  }
  
  .about-section[style*="height: 27vh"] .contact-item text {
    font-size: 14px !important;
    font-weight: 700 !important;
    margin-top: 15px !important;
    text-align: center;
    height: auto !important;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    max-width: 100%;
    line-height: 1.4;
    color: #2c3e50 !important;
    transition: all 0.3s ease;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  
  .about-section[style*="height: 27vh"] .contact-item:hover text {
    color: #005826 !important;
    transform: translateY(-2px);
  }
  
  /* 第5个成员的名字特别样式 */
  .about-section[style*="height: 27vh"] .contact-item:nth-child(5) text {
    font-size: 15px !important;
    color: #005826 !important;
    font-weight: 800 !important;
  }
  
  /* 联系方式部分 */
  .about-section[style*="height: 15vh"] {
    height: auto;
    min-height: auto;
    padding-bottom: 30px;
  }
  
  .about-section[style*="height: 15vh"] .contact-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 16px;
    align-items: stretch;
    justify-content: flex-start;
  }
  
  .about-section[style*="height: 15vh"] .contact-item {
    width: 100%;
    max-width: 100%;
    height: auto;
    min-height: 70px;
    padding: 16px;
    align-items: center;
    box-sizing: border-box;
    overflow: visible;
    background-color: rgba(248, 249, 250, 0.8);
    border-radius: 6px;
    margin-bottom: 16px;
  }
  
  .contact-icon {
    font-size: 18px !important;
    margin-left: 0 !important;
    margin-right: 12px !important;
    width: auto !important;
    flex-shrink: 0;
  }
  
  /* 覆盖联系方式内容的所有内联样式 */
  .about-section[style*="height: 15vh"] .contact-item div {
    width: 100% !important;
    max-width: 100% !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    flex: 1;
  }
  
  .about-section[style*="height: 15vh"] .contact-item text {
    font-size: 12px !important;
    width: 100% !important;
    max-width: 100% !important;
    text-align: left !important;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    display: block;
    line-height: 1.5;
    margin-bottom: 6px;
    margin-top: 0 !important;
    height: auto !important;
  }
  
  .about-section[style*="height: 15vh"] .contact-item text[style*="font-weight: bold"] {
    font-size: 13px !important;
    margin-bottom: 8px;
    display: block;
    padding-bottom: 4px;
  }
  
  /* GitHub按钮调整 */
  .about-section[style*="height: 15vh"] .contact-item div[style*="flex-direction: row"] {
    display: flex !important;
    flex-direction: column !important;
    align-items: stretch !important;
    justify-content: center !important;
    gap: 8px;
    width: 100% !important;
    max-width: 100% !important;
    margin-top: 10px !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding: 0 !important;
  }
  
  .about-section[style*="height: 15vh"] .contact-item .el-button {
    width: 100% !important;
    max-width: 100% !important;
    height: 36px !important;
    font-size: 11px !important;
    margin: 0 !important;
    margin-bottom: 0 !important;
    box-sizing: border-box;
    padding: 8px 12px !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border: 1px solid #ddd !important;
    border-radius: 4px !important;
    text-align: center !important;
  }
  
  /* 确保最后一个项目有额外的底部间距 */
  .about-section[style*="height: 27vh"] .contact-item:last-child,
  .about-section[style*="height: 15vh"] .contact-item:last-child {
    margin-bottom: 25px;
  }
}
</style> 