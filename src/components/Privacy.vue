<template>
  <div class="privacy-container">
    <div class="delete-button">
      <el-button style="background-color: rgba(0, 0, 0, 0); border: 0;" @click="closePrivacyView">
        <img style="width: 3vw; height: 3vw;" src="../../assets/icons/delete.png">
      </el-button>
    </div>
    
    <div class="header">
      <text class="title" style="color: #005826; font-size: 1.8vw; margin-top: 1vh;">隐私政策</text>
    </div>
    
    <div class="content">
      <div class="privacy-section" style="height: 11vh;">
        <text class="section-title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          隐私保护承诺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </text>
        <div class="policy-content">
          <text style="width: 90%; text-align: center; font-size: 0.8vw; margin-bottom: 1vh;">我们承诺我们所收集的信息仅会被用于云游中珠 (Virtual Campus Tour) 虚拟校园导览服务中。</text>
        </div>
      </div>
      
      <div class="privacy-section" style="height: 16vh;">
        <text class="section-title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          我们收集的信息&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </text>
        <div class="info-grid" >
          <div class="info-item">
            <span class="info-icon">👤</span>
            <div style="display: flex; flex-direction: column; ">
              <text style="width: 90%; text-align: center; font-size: 0.6vw; font-weight: bold; margin-top: 1vh; margin-bottom: 0.5vh;">基础信息</text>
              <text style="width: 90%; text-align: center; font-size: 0.6vw; margin-bottom: 1vh;">为了提供个性化服务，我们可能收集您的昵称、头像等基本信息。</text>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">📱</span>
            <div style="display: flex; flex-direction: column; ">
              <text style="width: 90%; text-align: center; font-size: 0.6vw; font-weight: bold; margin-top: 1vh; margin-bottom: 0.5vh;">设备信息</text>
              <text style="width: 90%; text-align: center; font-size: 0.6vw; margin-bottom: 1vh;">为优化体验，我们会收集设备型号、操作系统、浏览器类型等信息。</text>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">📊</span>
            <div style="display: flex; flex-direction: column; ">
              <text style="width: 90%; text-align: center; font-size: 0.6vw; font-weight: bold; margin-top: 1vh; margin-bottom: 0.5vh;">使用数据</text>
              <text style="width: 90%; text-align: center; font-size: 0.6vw; margin-bottom: 1vh;">包括访问时间、浏览记录、操作行为等，用于改善服务质量。</text>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">🌐</span>
            <div style="display: flex; flex-direction: column; ">
              <text style="width: 90%; text-align: center; font-size: 0.6vw; font-weight: bold; margin-top: 1vh; margin-bottom: 0.5vh;">网络信息</text>
              <text style="width: 90%; text-align: center; font-size: 0.6vw; margin-bottom: 1vh;">IP地址、网络连接状态等，用于保障服务稳定性和安全性。</text>
            </div>
          </div>
        </div>
      </div>
      
      <div class="privacy-section" style="height: 14vh;">
        <text class="section-title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          信息使用目的&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </text>
        <div class="purpose-list">
          <div class="purpose-item">
            <span class="purpose-number">1</span>
            <div style="width: 70%; display: flex; flex-direction: column; ">
              <text style="width: 100%; text-align: center; font-size: 0.6vw; font-weight: bold; margin-top: 1vh; margin-bottom: 0.5vh;">服务提供</text>
              <text style="width: 100%; text-align: center; font-size: 0.6vw; margin-bottom: 1vh;">为您提供虚拟校园导览服务。</text>
            </div>
          </div>
          <div class="purpose-item">
            <span class="purpose-number">2</span>
            <div style="width: 70%; display: flex; flex-direction: column; ">
              <text style="width: 100%; text-align: center; font-size: 0.6vw; font-weight: bold; margin-top: 1vh; margin-bottom: 0.5vh;">服务改进</text>
              <text style="width: 100%; text-align: center; font-size: 0.6vw; margin-bottom: 1vh;">分析使用情况，优化产品功能，提升用户体验。</text>
            </div>
          </div>
          <div class="purpose-item">
            <span class="purpose-number">3</span>
            <div style="width: 70%; display: flex; flex-direction: column; ">
              <text style="width: 100%; text-align: center; font-size: 0.6vw; font-weight: bold; margin-top: 1vh; margin-bottom: 0.5vh;">安全保障</text>
              <text style="width: 100%; text-align: center; font-size: 0.6vw; margin-bottom: 1vh;">防范安全风险，保护系统和用户信息安全。</text>
            </div>
          </div>
        </div>
      </div>
      
      <div class="privacy-section" style="height: 14vh;">
        <text class="section-title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          信息保护措施&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </text>
        <div class="protection-content">
          <div class="protection-item">
            <text style="width: 100%; text-align: center; font-size: 0.6vw; font-weight: bold; margin-top: 1vh; margin-bottom: 0.5vh;">🔐 技术保护</text>
            <text style="width: 100%; text-align: center; font-size: 0.6vw; margin-bottom: 1vh;">我们的网站部署与数据存储由阿里云提供服务与安全保障。</text>
          </div>
          <div class="protection-item">
            <text style="width: 100%; text-align: center; font-size: 0.6vw; font-weight: bold; margin-top: 1vh; margin-bottom: 0.5vh;">🏢 管理保护</text>
            <text style="width: 100%; text-align: center; font-size: 0.6vw; margin-bottom: 1vh;">我们确保只有开发团队中的授权人员才能访问个人信息。</text>
          </div>
         
        </div>
      </div>
      
      
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['closePrivacyView']);

const closePrivacyView = () => {
  emit('closePrivacyView');
};
</script>

<style scoped>
.privacy-container {
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

.privacy-section {
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
  text-align: left;
  /* width: 100%; */
}

.policy-content p {
  font-size: 14px;
  line-height: 1.8;
  color: #555;
  text-align: justify;
  margin-bottom: 2vh;
  padding: 1.5vh;
}

.info-grid, .rights-grid {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: 15px;
}

.info-item, .rights-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1vh;
  width: 23%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* align-items: center;
  justify-content: center */
}

.info-icon, .rights-icon {
  font-size: 20px;
  margin-left: 0.3vw;
  margin-top: 0.5vh;
}

.info-item h4, .rights-item h4 {
  font-size: 16px;
  font-weight: 600;
  color: #34495e;
  margin: 0 0 8px 0;
}

.info-item p, .rights-item p {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.purpose-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: 15px;
}

.purpose-item {
  display: flex;
  align-items: center;
  /* padding: 15px; */
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 30%;
}

.purpose-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.2vw;
  height: 1.2vw;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  border-radius: 50%;
  font-weight: bold;
  margin-right: 15px;
  flex-shrink: 0;
  font-size: 0.8vw;
  margin-left: 2vw;
  /* margin-top: 0.5vh; */
}

.purpose-item h4 {
  font-size: 16px;
  font-weight: 600;
  color: #34495e;
  margin: 0 0 8px 0;
  text-align: center;
}

.purpose-item p {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
  text-align: center;
}

.protection-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: 15px;
}

.protection-item {
 
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 15px; */
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 40%;
}

.protection-item h4 {
  font-size: 16px;
  font-weight: 600;
  color: #34495e;
  margin: 0 0 8px 0;
}

.protection-item p {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.6;
}

.cookie-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cookie-content p {
  font-size: 14px;
  color: #555;
  margin-bottom: 15px;
  line-height: 1.6;
}

.cookie-list {
  list-style: none;
  padding: 0;
  margin: 15px 0;
}

.cookie-list li {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  padding-left: 15px;
  position: relative;
  line-height: 1.5;
}

.cookie-list li::before {
  content: "•";
  color: #ff6b6b;
  font-size: 16px;
  position: absolute;
  left: 0;
}

.rights-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.rights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: 15px;
}

.rights-item {
  display: flex;
  align-items: flex-start;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.rights-icon {
  font-size: 20px;
  margin-right: 15px;
  margin-top: 3px;
}

.rights-item h4 {
  font-size: 16px;
  font-weight: 600;
  color: #34495e;
  margin: 0 0 8px 0;
}

.rights-item p {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .privacy-container {
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
  
  .privacy-section {
    margin-bottom: 25px;
    padding: 15px;
    border-radius: 10px;
  }
  
  .section-title {
    font-size: 18px;
    margin-bottom: 12px;
  }
  
  .policy-content p {
    font-size: 13px;
    margin-bottom: 12px;
  }
  
  .info-grid, .rights-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .info-item, .rights-item {
    padding: 12px;
  }
  
  .info-icon, .rights-icon {
    font-size: 18px;
    margin-right: 12px;
  }
  
  .info-item h4, .rights-item h4 {
    font-size: 15px;
    margin-bottom: 6px;
  }
  
  .info-item p, .rights-item p {
    font-size: 13px;
  }
  
  .purpose-list {
    gap: 12px;
  }
  
  .purpose-item {
    padding: 12px;
  }
  
  .purpose-number {
    width: 28px;
    height: 28px;
    font-size: 13px;
    margin-right: 12px;
  }
  
  .purpose-item h4 {
    font-size: 15px;
    margin-bottom: 6px;
  }
  
  .purpose-item p {
    font-size: 13px;
  }
  
  .protection-content {
    gap: 12px;
  }
  
  .protection-item {
    padding: 12px;
  }
  
  .protection-item h4 {
    font-size: 15px;
    margin-bottom: 6px;
  }
  
  .protection-item p {
    font-size: 13px;
  }
  
  .cookie-content {
    padding: 15px;
  }
  
  .cookie-content p {
    font-size: 13px;
    margin-bottom: 12px;
  }
  
  .cookie-list li {
    font-size: 13px;
    margin-bottom: 6px;
    padding-left: 12px;
  }
  
  .cookie-list li::before {
    font-size: 15px;
  }
  
  .rights-content {
    padding: 15px;
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
  
  .privacy-section {
    margin-bottom: 20px;
    padding: 12px;
    border-radius: 8px;
  }
  
  .section-title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .policy-content p {
    font-size: 12px;
    margin-bottom: 10px;
  }
  
  .info-item, .rights-item {
    padding: 10px;
    flex-direction: column;
    text-align: center;
  }
  
  .info-icon, .rights-icon {
    font-size: 16px;
    margin-right: 0;
    margin-bottom: 8px;
  }
  
  .info-item h4, .rights-item h4 {
    font-size: 14px;
    margin-bottom: 4px;
  }
  
  .info-item p, .rights-item p {
    font-size: 12px;
  }
  
  .purpose-item {
    padding: 10px;
    flex-direction: column;
    text-align: center;
  }
  
  .purpose-number {
    width: 24px;
    height: 24px;
    font-size: 12px;
    margin-right: 0;
    margin-bottom: 8px;
  }
  
  .purpose-item h4 {
    font-size: 14px;
    margin-bottom: 4px;
  }
  
  .purpose-item p {
    font-size: 12px;
  }
  
  .protection-item {
    padding: 10px;
  }
  
  .protection-item h4 {
    font-size: 14px;
    margin-bottom: 4px;
  }
  
  .protection-item p {
    font-size: 12px;
  }
  
  .cookie-content {
    padding: 12px;
  }
  
  .cookie-content p {
    font-size: 12px;
    margin-bottom: 10px;
  }
  
  .cookie-list li {
    font-size: 12px;
    margin-bottom: 4px;
    padding-left: 10px;
  }
  
  .cookie-list li::before {
    font-size: 14px;
  }
  
  .rights-content {
    padding: 12px;
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
  
  .privacy-section {
    margin-bottom: 15px;
    padding: 10px;
  }
  
  .section-title {
    font-size: 15px;
    margin-bottom: 8px;
  }
  
  .policy-content p {
    font-size: 11px;
    margin-bottom: 8px;
  }
  
  .info-item, .rights-item {
    padding: 8px;
  }
  
  .info-icon, .rights-icon {
    font-size: 14px;
    margin-bottom: 6px;
  }
  
  .info-item h4, .rights-item h4 {
    font-size: 13px;
    margin-bottom: 3px;
  }
  
  .info-item p, .rights-item p {
    font-size: 11px;
  }
  
  .purpose-item {
    padding: 8px;
  }
  
  .purpose-number {
    width: 20px;
    height: 20px;
    font-size: 11px;
    margin-bottom: 6px;
  }
  
  .purpose-item h4 {
    font-size: 13px;
    margin-bottom: 3px;
  }
  
  .purpose-item p {
    font-size: 11px;
  }
  
  .protection-item {
    padding: 8px;
  }
  
  .protection-item h4 {
    font-size: 13px;
    margin-bottom: 3px;
  }
  
  .protection-item p {
    font-size: 11px;
  }
  
  .cookie-content {
    padding: 10px;
  }
  
  .cookie-content p {
    font-size: 11px;
    margin-bottom: 8px;
  }
  
  .cookie-list li {
    font-size: 11px;
    margin-bottom: 3px;
    padding-left: 8px;
  }
  
  .cookie-list li::before {
    font-size: 13px;
  }
  
  .rights-content {
    padding: 10px;
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