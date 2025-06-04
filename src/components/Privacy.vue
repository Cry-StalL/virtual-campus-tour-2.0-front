<template>
  <div class="privacy-container">
    <div class="delete-button">
      <el-button style="background-color: rgba(0, 0, 0, 0); border: 0;" @click="closePrivacyView">
        <img style="width: 3vw; height: 3vw;" src="../../assets/icons/delete.png">
      </el-button>
    </div>
    
    <div class="header">
      <text class="title">隐私政策</text>
    </div>
    
    <div class="content">
      <div class="privacy-section">
        <h3 class="section-title">隐私保护承诺</h3>
        <div class="policy-content">
          <p>Virtual Campus Tour 2.0 深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等。</p>
          <p>本隐私政策适用于您使用我们提供的虚拟校园导览服务。</p>
        </div>
      </div>
      
      <div class="privacy-section">
        <h3 class="section-title">我们收集的信息</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-icon">👤</span>
            <div>
              <h4>基础信息</h4>
              <p>为了提供个性化服务，我们可能收集您的昵称、头像等基本信息。</p>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">📱</span>
            <div>
              <h4>设备信息</h4>
              <p>为优化体验，我们会收集设备型号、操作系统、浏览器类型等信息。</p>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">📊</span>
            <div>
              <h4>使用数据</h4>
              <p>包括访问时间、浏览记录、操作行为等，用于改善服务质量。</p>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">🌐</span>
            <div>
              <h4>网络信息</h4>
              <p>IP地址、网络连接状态等，用于保障服务稳定性和安全性。</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="privacy-section">
        <h3 class="section-title">信息使用目的</h3>
        <div class="purpose-list">
          <div class="purpose-item">
            <span class="purpose-number">1</span>
            <div>
              <h4>服务提供</h4>
              <p>为您提供虚拟校园导览服务，包括个性化推荐和功能定制。</p>
            </div>
          </div>
          <div class="purpose-item">
            <span class="purpose-number">2</span>
            <div>
              <h4>服务改进</h4>
              <p>分析使用情况，优化产品功能，提升用户体验质量。</p>
            </div>
          </div>
          <div class="purpose-item">
            <span class="purpose-number">3</span>
            <div>
              <h4>安全保障</h4>
              <p>防范安全风险，保护系统和用户信息安全。</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="privacy-section">
        <h3 class="section-title">信息保护措施</h3>
        <div class="protection-content">
          <div class="protection-item">
            <h4>🔐 技术保护</h4>
            <p>采用业界标准的安全技术和程序，包括数据加密、访问控制、安全传输等。</p>
          </div>
          <div class="protection-item">
            <h4>🏢 管理保护</h4>
            <p>建立严格的数据访问权限管理制度，确保只有授权人员能够访问个人信息。</p>
          </div>
          <div class="protection-item">
            <h4>📋 制度保护</h4>
            <p>制定完善的隐私保护制度和应急预案，定期进行安全评估和培训。</p>
          </div>
        </div>
      </div>
      
      <div class="privacy-section">
        <h3 class="section-title">您的权利</h3>
        <div class="rights-content">
          <div class="rights-grid">
            <div class="rights-item">
              <span class="rights-icon">👁️</span>
              <div>
                <h4>知情权</h4>
                <p>了解个人信息的收集、使用情况</p>
              </div>
            </div>
            <div class="rights-item">
              <span class="rights-icon">✏️</span>
              <div>
                <h4>更正权</h4>
                <p>更正不准确或不完整的个人信息</p>
              </div>
            </div>
            <div class="rights-item">
              <span class="rights-icon">🗑️</span>
              <div>
                <h4>删除权</h4>
                <p>在特定条件下删除个人信息</p>
              </div>
            </div>
            <div class="rights-item">
              <span class="rights-icon">🔒</span>
              <div>
                <h4>控制权</h4>
                <p>控制个人信息的处理和使用</p>
              </div>
            </div>
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

.header {
  width: 100%;
  height: 12%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #e0e0e0;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
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

.privacy-section {
  margin-bottom: 2vw;
  padding: 1.5vw;
  background-color: rgba(248, 249, 250, 0.8);
  border-radius: 0.8vw;
  border-left: 4px solid #ff6b6b;
}

.section-title {
  font-size: 1.5vw;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 1vw;
  padding-bottom: 0.5vw;
  border-bottom: 1px solid #bdc3c7;
}

.policy-content p {
  font-size: 1vw;
  line-height: 1.8;
  color: #555;
  margin-bottom: 1vw;
  text-align: justify;
}

.info-grid, .rights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: 1vw;
}

.info-item, .rights-item {
  display: flex;
  align-items: flex-start;
  padding: 1vw;
  background-color: white;
  border-radius: 0.5vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-icon, .rights-icon {
  font-size: 1.5vw;
  margin-right: 1vw;
  margin-top: 0.2vw;
}

.info-item h4, .rights-item h4 {
  font-size: 1.1vw;
  font-weight: 600;
  color: #34495e;
  margin: 0 0 0.5vw 0;
}

.info-item p, .rights-item p {
  font-size: 0.9vw;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.purpose-list {
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.purpose-item {
  display: flex;
  align-items: center;
  padding: 1vw;
  background-color: white;
  border-radius: 0.5vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.purpose-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2vw;
  height: 2vw;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  border-radius: 50%;
  font-weight: bold;
  font-size: 1vw;
  margin-right: 1vw;
  flex-shrink: 0;
}

.purpose-item h4 {
  font-size: 1.1vw;
  font-weight: 600;
  color: #34495e;
  margin: 0 0 0.5vw 0;
  text-align: center;
}

.purpose-item p {
  font-size: 0.9vw;
  color: #666;
  margin: 0;
  line-height: 1.5;
  text-align: center;
}

.protection-content {
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.protection-item {
  padding: 1vw;
  background-color: white;
  border-radius: 0.5vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.protection-item h4 {
  font-size: 1.1vw;
  font-weight: 600;
  color: #34495e;
  margin: 0 0 0.5vw 0;
}

.protection-item p {
  font-size: 0.9vw;
  color: #666;
  margin: 0;
  line-height: 1.6;
}

.cookie-content {
  background-color: white;
  padding: 1.5vw;
  border-radius: 0.5vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cookie-content p {
  font-size: 1vw;
  color: #555;
  margin-bottom: 1vw;
  line-height: 1.6;
}

.cookie-list {
  list-style: none;
  padding: 0;
  margin: 1vw 0;
}

.cookie-list li {
  font-size: 0.9vw;
  color: #666;
  margin-bottom: 0.5vw;
  padding-left: 1vw;
  position: relative;
  line-height: 1.5;
}

.cookie-list li::before {
  content: "•";
  color: #ff6b6b;
  font-size: 1.2vw;
  position: absolute;
  left: 0;
}

.rights-content {
  background-color: white;
  padding: 1.5vw;
  border-radius: 0.5vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.rights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: 1vw;
}

.rights-item {
  display: flex;
  align-items: flex-start;
  padding: 1vw;
  background-color: white;
  border-radius: 0.5vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.rights-icon {
  font-size: 1.5vw;
  margin-right: 1vw;
  margin-top: 0.2vw;
}

.rights-item h4 {
  font-size: 1.1vw;
  font-weight: 600;
  color: #34495e;
  margin: 0 0 0.5vw 0;
}

.rights-item p {
  font-size: 0.9vw;
  color: #666;
  margin: 0;
  line-height: 1.5;
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