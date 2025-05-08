<template>
  <div class="profile">
    <el-card class="profile-card">
      <div class="profile-header">
        <h2>个人信息</h2>
      </div>
      
      <div class="avatar-section">
        <div class="avatar-container" @click="openAvatarDialog">
          <el-avatar :src="form.avatar" :size="120"></el-avatar>
          <div class="avatar-overlay">
            <el-icon><Camera /></el-icon>
            <span>更换头像</span>
          </div>
        </div>
      </div>

      <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        label-position="left"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="name" class="username-item">
          <el-input v-model="form.name" :disabled="!isEditingUsername">
            <template #prefix><el-icon><User /></el-icon></template>
          </el-input>
          <template v-if="!isEditingUsername">
            <el-button type="primary" @click="startEditingUsername" class="username-edit-btn">
              <el-icon><Edit /></el-icon> 修改用户名
            </el-button>
          </template>
          <template v-else>
            <div class="username-action-btns">
              <el-button type="success" @click="saveUsername">
                <el-icon><Check /></el-icon> 保存
              </el-button>
              <el-button @click="cancelEditingUsername">
                <el-icon><Close /></el-icon> 取消
              </el-button>
            </div>
          </template>
        </el-form-item>
        
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" type="email" disabled>
            <template #prefix><el-icon><Message /></el-icon></template>
          </el-input>
        </el-form-item>

        <el-form-item label="注册时间">
          <el-input v-model="form.registerTime" disabled>
            <template #prefix><el-icon><Calendar /></el-icon></template>
          </el-input>
        </el-form-item>

        <template v-if="isResetingPassword">
          <el-form-item label="新密码" prop="pass">
            <el-input type="password" v-model="form.pass" autocomplete="off" placeholder="请输入新密码">
              <template #prefix><el-icon><Lock /></el-icon></template>
            </el-input>
          </el-form-item>
          
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="form.checkPass" autocomplete="off" placeholder="请再次输入新密码">
              <template #prefix><el-icon><Lock /></el-icon></template>
            </el-input>
          </el-form-item>
        </template>
      </el-form>
      
      <div class="action-buttons">
        <template v-if="!isResetingPassword">
          <el-button type="warning" @click="startPasswordReset" round>
            <el-icon><Lock /></el-icon> 重置密码
          </el-button>
          <el-button type="danger" @click="handleLogout" round>
            <el-icon><SwitchButton /></el-icon> 注销账号
          </el-button>
        </template>

        <template v-if="isResetingPassword">
          <el-button type="success" @click="savePassword" round>
            <el-icon><Check /></el-icon> 保存密码
          </el-button>
          <el-button @click="cancelPasswordReset" round>
            <el-icon><Close /></el-icon> 取消
          </el-button>
        </template>
      </div>
    </el-card>
    

    <!-- 留言记录 -->
    <el-card class="message-history-card">
      <div class="message-header">
        <h2>我的留言</h2>
      </div>
      
      <div class="message-list" v-if="userMessages.length > 0">
        <el-timeline>
          <el-timeline-item
            v-for="(message, index) in userMessages"
            :key="index"
            :timestamp="formatTime(message.createTime)"
            placement="top"
            :color="getMessageColor(index)"
            :hide-timestamp="false"
            class="custom-timeline-item"
          >
            <el-card class="message-card">
              <div class="message-content">{{ message.content }}</div>
              <div class="message-location">{{ message.location }}</div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
      
      <div class="empty-messages" v-else>
        <el-empty description="暂无留言记录" :image-size="100">
          <template #image>
            <el-icon style="font-size: 60px; color: #909399;"><ChatDotRound /></el-icon>
          </template>
        </el-empty>
      </div>
    </el-card>
    
    <!-- 使用头像选择组件 -->
    <AvatarSelector 
      v-model:visible="showAvatarDialog"
      :current-avatar="form.avatar"
      @confirm="handleAvatarConfirm"
      @cancel="handleAvatarCancel"
    />

    <!-- 返回按钮 -->
    <div class="back-button-container">
      <router-link to="/">
        <el-button round>
          <el-icon><Back /></el-icon> 返回
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { User, Message, Lock, Edit, Check, Close, Back, Camera, Calendar, ChatDotRound, SwitchButton } from '@element-plus/icons-vue'
import Cookies from 'js-cookie';
import axios from 'axios';
import AvatarSelector from '@/components/AvatarSelector.vue';
import { th } from 'element-plus/es/locales.mjs';

export default {
  components: {
    User, Message, Lock, Edit, Check, Close, Back, Camera, Calendar, ChatDotRound, SwitchButton,
    AvatarSelector
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!/^[\u4e00-\u9fa5\w-]{3,20}$/.test(value)) {
        callback(new Error("用户名必须为3-20位中文、字母、数字、下划线或连字符"));
      } else {
        callback();
      }
    };

    const validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback();  // 邮箱可以为空
      } else if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value)) {
        callback(new Error("请输入有效的邮箱地址"));
      } else {
        callback();
      }
    };

    const validatePass = (rule, value, callback) => {
      if (this.isResetingPassword && value === "") {
        callback(new Error("请输入密码"));
      } else if (value && !/^\S{8,}$/.test(value)) {
        callback(new Error("密码不能少于8位且不能包含空格"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };

    const validatePass2 = (rule, value, callback) => {
      if (this.isResetingPassword && value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      form: {
        userId: 0,
        name: '',
        email: '',
        pass: '',
        checkPass: '',
        avatar: '/images/avatar/avatar1.jpg',
        registerTime: ''
      },
      rules: {
        name: [
          { validator: validateUsername, trigger: "blur" }
        ],
        email: [
          { validator: validateEmail, trigger: "blur" }
        ],
        pass: [
          { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { validator: validatePass2, trigger: "blur" }
        ]
      },
      originalName: '',
      isEditingUsername: false,
      isResetingPassword: false,
      showAvatarDialog: false,
      userMessages: [] // 用户留言数组
    }
  },
  mounted() {
    this.getUserInfo();
    this.fetchUserMessages();
    
  },
  methods: {
    // 从 cookie 中获取用户信息
    getUserInfo() {
      this.form.userId = Number(Cookies.get('userId') || 0);
      this.form.name = Cookies.get('username') || '';
      this.form.email = Cookies.get('email') || '';

      const avatarId = Cookies.get('avatarId') || 'avatar1';
      this.form.avatar = `/images/avatar/${avatarId}.jpg`;
      
      this.fetchUserCreationTime();
    },

    // 获取用户创建时间
    fetchUserCreationTime() {
      if (!this.form.userId || isNaN(this.form.userId)) {
        return;
      }

      axios.post('http://localhost:8080/api/v1/users/getUserCreationTime', {
        userId: parseInt(this.form.userId)
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.data.code === 0) {
          this.form.registerTime = response.data.data;
        }
      })
      .catch(error => {
        this.form.registerTime = '未知';
      });
    },
    
    // 开始编辑用户名
    startEditingUsername() {
      this.originalName = this.form.name;
      this.isEditingUsername = true;
    },
    
    // 保存用户名
    saveUsername() {
      // 检查用户名是否实际发生了变化
      if (this.form.name === this.originalName) {
        this.$message({
          message: '用户名未修改',
          type: 'info'
        });
        this.isEditingUsername = false;
        return;
      }

      this.$refs.form.validateField('name', (valid) => {
        if (valid) {
          // 显示加载提示
          const loading = this.$loading({
            lock: true,
            text: '保存中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          
          // 调用API更新用户名
          axios.post('http://localhost:8080/api/v1/users/updateUsername', {
            userId: this.form.userId,
            username: this.form.name
          })
          .then(response => {
            // 关闭加载提示
            loading.close();
            
            if (response.data.code === 200) {
              // 保存成功，更新cookie
              Cookies.set('username', this.form.name);
              
              this.$message({
                message: '用户名已更新',
                type: 'success'
              });
              this.isEditingUsername = false;
            } else {
              // 显示错误信息
              this.$message({
                message: response.data.message || '用户名更新失败',
                type: 'error'
              });
            }
          })
          .catch(error => {
            // 关闭加载提示
            loading.close();
            
            console.error('更新用户名出错:', error);
            this.$message({
              message: '网络错误，请稍后重试',
              type: 'error'
            });
          });
        } else {
          this.$message({
            message: '用户名验证失败，请检查输入',
            type: 'error'
          });
        }
      });
    },
    
    // 取消编辑用户名
    cancelEditingUsername() {
      this.form.name = this.originalName;
      this.isEditingUsername = false;
      this.$refs.form.clearValidate('name');
    },

    // 开始重置密码
    startPasswordReset() {
      this.form.pass = '';
      this.form.checkPass = '';
      this.isResetingPassword = true;
    },

    // 保存新密码
    savePassword() {
      this.$refs.form.validateField(['pass', 'checkPass'], (valid) => {
        if (valid) {
          // 显示加载提示
          const loading = this.$loading({
            lock: true,
            text: '保存中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          
          // 调用API重置密码
          axios.post('http://localhost:8080/api/v1/users/resetPassword', {
            userId: this.form.userId,
            password: this.form.pass
          })
          .then(response => {
            // 关闭加载提示
            loading.close();
            
            if (response.data.code === 200) {
              this.$message({
                message: '密码已重置',
                type: 'success'
              });
              this.isResetingPassword = false;
              this.form.pass = '';
              this.form.checkPass = '';
            } else {
              // 显示错误信息
              this.$message({
                message: response.data.message || '密码重置失败',
                type: 'error'
              });
            }
          })
          .catch(error => {
            // 关闭加载提示
            loading.close();
            
            console.error('重置密码出错:', error);
            this.$message({
              message: '网络错误，请稍后重试',
              type: 'error'
            });
          });
        } else {
          this.$message({
            message: '请输入正确的密码',
            type: 'error'
          });
        }
      });
    },

    // 取消重置密码
    cancelPasswordReset() {
      this.form.pass = '';
      this.form.checkPass = '';
      this.isResetingPassword = false;
      this.$refs.form.clearValidate(['pass', 'checkPass']);
    },
    
    // 打开头像选择对话框
    openAvatarDialog() {
      this.showAvatarDialog = true;
    },

    // 处理头像选择确认
    handleAvatarConfirm(newAvatar) {
      this.form.avatar = newAvatar;
      // 从头像路径中提取ID
      const avatarId = newAvatar.split('/').pop().replace('.jpg', '');
      // 保存头像ID到cookies
      Cookies.set('avatarId', avatarId);
      this.$message({
        message: '头像已更新',
        type: 'success'
      });
      this.showAvatarDialog = false;
    },

    // 处理头像选择取消
    handleAvatarCancel() {
      this.showAvatarDialog = false;
    },
    
    // 获取用户留言记录
    fetchUserMessages() {
      // 显示加载状态
      const loading = this.$loading({
        lock: true,
        text: '加载留言记录...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      
      // 确保userId是有效的数字
      if (!this.form.userId || isNaN(this.form.userId)) {
        loading.close();
        this.$message({
          message: '无效的用户ID',
          type: 'error'
        });
        return;
      }

      // 调用API获取用户留言数据
      axios.post(`http://localhost:8080/api/v1/users/getUserMessages`, {
        userId: parseInt(this.form.userId)
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          loading.close();
          
          if (response.data.code === 0) {
            // 获取留言数据并排序
            this.userMessages = (response.data.data || []).sort((a, b) => {
              return new Date(b.createTime) - new Date(a.createTime);
            });
            
            // 如果没有留言记录
            if (this.userMessages.length === 0) {
              this.$message({
                message: '暂无留言记录',
                type: 'info'
              });
            }
          } else {
            // 显示错误信息
            this.$message({
              message: response.data.message || '获取留言记录失败',
              type: 'error'
            });
          }
        })
        .catch(error => {
          loading.close();
          console.error('获取用户留言失败:', error);
          
          let errorMessage = '网络错误，请稍后重试';
          if (error.response) {
            console.error('Error response:', error.response.data);
            errorMessage = error.response.data.message || `服务器错误 (${error.response.status})`;
          } else if (error.request) {
            console.error('No response received:', error.request);
            errorMessage = '服务器无响应，请检查网络连接';
          }
          
          this.$message({
            message: errorMessage,
            type: 'error'
          });
        });
    },
    
    // 格式化时间
    formatTime(timestamp) {
      if (!timestamp) return '未知时间';
      
      // 如果已经是格式化的时间字符串，直接返回
      if (typeof timestamp === 'string' && timestamp.includes('-') && timestamp.includes(':')) {
        return timestamp;
      }
      
      try {
        const date = new Date(timestamp);
        return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
      } catch (e) {
        return '未知时间';
      }
      
      // 数字补零
      function padZero(num) {
        return num < 10 ? '0' + num : num;
      }
    },
    
    // 获取留言颜色
    getMessageColor(index) {
      const colors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399'];
      return colors[index % colors.length];
    },
    
    // 注销账号
    handleLogout() {
      this.$confirm('确定要注销账号吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          // 清除所有cookie
          Cookies.remove('userId');
          Cookies.remove('username');
          Cookies.remove('email');
          Cookies.remove('avatarId');
            
          // 显示成功消息
          this.$message({
            type: 'success',  
            message: '账号已注销'
          });
            
          // 延迟跳转到登录页
          setTimeout(() => {
            this.$router.push('/login');
          }, 500);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消注销'
        });          
      });
    }
  }
}
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: auto;
  min-height: 100vh;
  /* background: linear-gradient(135deg, #FFFEFF 0%, #FFFFEE 100%); */
  background-image: url('123.jpg');
  background-size: cover;
  background-position: center;
  overflow-y: auto;
  padding: 40px;
  gap: 30px;
  position: relative; /* Add position relative */
}

.profile-card, .message-history-card {
  width: 100%;
  max-width: 500px;
  height: fit-content;
  margin: 0;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: all 0.3s ease;
}

.profile-card:hover, .message-history-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.message-history-card {
  max-height: 600px;
  overflow-y: auto;
}

.profile-header, .message-header {
  text-align: center;
  margin-bottom: 30px;
  position: relative;
}

.profile-header h2, .message-header h2 {
  font-size: 28px;
  color: #409EFF;
  margin: 0;
  font-weight: 600;
  padding-bottom: 10px;
  position: relative;
}

.profile-header h2:after, .message-header h2:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #409EFF, #53a8ff);
  border-radius: 3px;
}

.avatar-section {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.avatar-container {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s;
}

.avatar-container:hover {
  transform: scale(1.05);
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
  color: white;
  border-radius: 50%;
}

.avatar-overlay i {
  font-size: 24px;
  margin-bottom: 5px;
}

.avatar-container:hover .avatar-overlay {
  opacity: 1;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
}

.avatar-gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  margin-bottom: 25px;
  padding: 20px;
}

.avatar-option {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  border-radius: 12px;
  transition: all 0.3s;
}

.avatar-option:hover {
  background-color: #f0f9ff;
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.avatar-option.selected {
  background-color: #e1f3d8;
  border: 2px solid #67c23a;
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.dialog-footer-center {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
}

/* 用户名编辑按钮样式 */
.username-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.username-edit-btn {
  align-self: center;
  margin-top: 5px;
  font-size: 14px;
  padding: 10px 20px !important;
}

.username-action-btns {
  display: flex;
  gap: 10px;
  margin-top: 5px;
  align-self: center;
}

/* 表单容器样式 */
:deep(.el-form) {
  max-width: 450px;
  margin: 0 auto;
}

:deep(.el-form-item) {
  display: flex;
  align-items: flex-start;
}

:deep(.el-form-item__content) {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

/* 响应式布局 */
@media (min-width: 768px) {
  .username-item {
    flex-direction: row;
    align-items: center;
  }
  
  .el-input {
    flex: 1;
    max-width: 280px;
  }
  
  :deep(.el-form-item__content) {
    justify-content: flex-start;
    display: flex;
    align-items: center;
  }
  
  .username-edit-btn {
    margin-left: 15px;
    margin-top: 0;
    font-size: 14px;
    padding: 10px 20px !important;
    height: auto;
    align-self: center;
  }
  
  .username-action-btns {
    margin-left: 15px;
    margin-top: 0;
    align-self: center;
  }
}

/* 自定义对话框样式 */
:deep(.avatar-dialog) {
  border-radius: 15px;
  overflow: hidden;
}

:deep(.avatar-dialog .el-dialog__header) {
  background-color: #409EFF;
  color: white;
  padding: 15px 20px;
}

:deep(.avatar-dialog .el-dialog__title) {
  color: white;
  font-weight: 600;
}

:deep(.avatar-dialog .el-dialog__body) {
  padding: 30px;
}

/* 表单项样式 */
:deep(.el-form-item) {
  margin-bottom: 22px;
  transition: all 0.3s ease;
}

:deep(.el-form-item:hover) {
  transform: translateY(-2px);
}

:deep(.el-input) {
  transition: all 0.3s ease;
  width: 100%;
  max-width: 320px;
}

:deep(.el-input__inner) {
  border-radius: 8px;
  height: 42px;
}

/* 移除多余的样式 */
:deep(.el-input__wrapper) {
  box-shadow: none !important;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  transition: all 0.3s ease;
}

:deep(.el-input__wrapper:hover) {
  border-color: #409EFF;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.1) !important;
}

:deep(.el-input__wrapper.is-focus) {
  border-color: #409EFF;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2) !important;
}

:deep(.el-button) {
  padding: 10px 22px;
  font-weight: 500;
  transition: all 0.3s ease;
}

:deep(.el-button:hover) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

/* 修改用户名按钮特殊样式 */
:deep(.username-edit-btn.el-button) {
  padding: 10px 25px;
  font-weight: 500;
  font-size: 15px;
}

:deep(.username-action-btns .el-button) {
  padding: 8px 15px;
}

.message-list {
  padding: 0 10px;
}

.message-card {
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.message-content {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 8px;
}

.message-location {
  font-size: 14px;
  color: #909399;
  display: flex;
  align-items: center;
}

.message-location:before {
  content: '📍';
  margin-right: 5px;
}

.empty-messages {
  padding: 40px 0;
  text-align: center;
}

/* 媒体查询 - 响应式设计 */
@media (max-width: 1200px) {
  .profile {
    flex-direction: column;
    align-items: center;
    padding: 30px;
  }
  
  .profile-card, .message-history-card {
    max-width: 600px;
    margin-bottom: 30px;
  }
  
  .message-history-card {
    max-height: none;
  }
}

@media (max-width: 768px) {
  .profile {
    padding: 20px;
  }
  
  .profile-card, .message-history-card {
    max-width: 90%;
    padding: 20px;
  }
  
  .message-list {
    padding: 0 5px;
  }
}

/* 自定义时间线样式 */
:deep(.el-timeline) {
  padding-left: 0;
}

:deep(.el-timeline-item__tail) {
  display: none;
}

:deep(.el-timeline-item__node) {
  left: 0;
}

:deep(.el-timeline-item__wrapper) {
  padding-left: 26px;
}

:deep(.el-timeline-item__timestamp) {
  margin-top: 8px;
  margin-bottom: 16px;
  padding-left: 0;
  color: #909399;
  font-size: 12px;
}

:deep(.custom-timeline-item) {
  margin-bottom: 20px;
}

/* 返回按钮 */
.back-button-container {
  position: absolute;
  top: 20px;
  right: 100px;
  z-index: 1000;
}

.back-button-container .el-button {
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.back-button-container .el-button:hover {
  background-color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>

<style>
/* 全局字体样式 */
.el-form-item__label {
font-size: 16px !important;
font-weight: 600 !important;
color: #606266 !important;
font-family: 'Helvetica Neue', Arial, sans-serif !important;
}

.el-button {
font-family: 'Helvetica Neue', Arial, sans-serif !important;
letter-spacing: 0.5px !important;
}

h2 {
font-family: 'Helvetica Neue', Arial, sans-serif !important;
letter-spacing: 1px !important;
}
</style>