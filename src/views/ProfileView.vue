<template>
  <div class="profile">
    <img src="../../assets/login_background.jpg" />
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
        label-width="auto"
        font-size="5%"
        style="display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0%;
        margin: 0%;
        margin-bottom: 0vh;"
      >
        <el-form-item style="margin-bottom: 1.5vh;" label="用户名" prop="name" class="username-item" >
          <el-input v-model="form.name" :disabled="!isEditingUsername" style="width: 40%; margin-right: 0%;">
            <template #prefix><el-icon><User /></el-icon></template>
          </el-input>
          <template v-if="!isEditingUsername">
            <el-button type="primary" @click="startEditingUsername" class="username-edit-btn" style="width: 40%;">
              <el-icon><Edit /></el-icon> 修改用户名
            </el-button>
          </template>
          <template v-else>
            <div class="username-action-btns">
              <el-button type="success" @click="saveUsername" >
                <el-icon><Check /></el-icon> 保存
              </el-button>
              <el-button @click="cancelEditingUsername" >
                <el-icon><Close /></el-icon> 取消
              </el-button>
            </div>
          </template>
        </el-form-item>
        
        <el-form-item style="margin-bottom: 1.5vh; width: 90%;" label="邮箱" prop="email" class="username-item" >
          <el-input v-model="form.email" type="email" disabled style="width: 80%;">
            <template #prefix><el-icon><Message /></el-icon></template>
          </el-input>
        </el-form-item>

        <el-form-item label="注册时间" class="username-item" style="margin-bottom: 1.5vh; width: 90%;">
          <el-input v-model="form.registerTime" disabled>
            <template #prefix><el-icon><Calendar /></el-icon></template>
          </el-input>
        </el-form-item>

        <template v-if="isResetingPassword">
          <el-form-item label="新密码" prop="pass" style="margin-bottom: 1.5vh; width: 90%;">
            <el-input type="password" v-model="form.pass" autocomplete="off" placeholder="请输入新密码">
              <template #prefix><el-icon><Lock /></el-icon></template>
            </el-input>
          </el-form-item>
          
          <el-form-item label="确认密码" prop="checkPass" style="margin-bottom: 1.5vh; width: 90%;">
            <el-input type="password" v-model="form.checkPass" autocomplete="off" placeholder="请再次输入新密码">
              <template #prefix><el-icon><Lock /></el-icon></template>
            </el-input>
          </el-form-item>
        </template>
      </el-form>
      
      <div class="action-buttons">
        <template v-if="!isResetingPassword">
          <el-button type="warning" @click="startPasswordReset" round style="height: 4vh; border-radius: 12px;" >
            <el-icon><Lock /></el-icon> 重置密码
          </el-button>
          <el-button type="danger" @click="handleLogout" round style="height: 4vh; border-radius: 12px;">
            <el-icon><SwitchButton /></el-icon> 注销账号
          </el-button>
        </template>

        <template v-if="isResetingPassword">
          <div class="password-reset-buttons">
            <el-button type="success" @click="savePassword" round class="password-reset-btn">
              <el-icon><Check /></el-icon> 保存密码
            </el-button>
            <el-button @click="cancelPasswordReset" round class="password-reset-btn">
              <el-icon><Close /></el-icon> 取消
            </el-button>
          </div>
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
              <div class="message-actions">
                <el-button 
                  type="danger" 
                  size="small" 
                  @click="handleDeleteMessage(message)"
                  class="delete-btn"
                >
                  <el-icon><Delete /></el-icon>
                  删除
                </el-button>
              </div>
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
        <el-button round style="height: 4vh;">
          <el-icon><Back /></el-icon> 返回
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { User, Message, Lock, Edit, Check, Close, Back, Camera, Calendar, ChatDotRound, SwitchButton, Delete } from '@element-plus/icons-vue'
import Cookies from 'js-cookie';
import axios from 'axios';
import AvatarSelector from '@/components/AvatarSelector.vue';

import { getApiUrl } from '@/config/config.ts';


export default {
  components: {
    User, Message, Lock, Edit, Check, Close, Back, Camera, Calendar, ChatDotRound, SwitchButton, Delete,
    AvatarSelector
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!/^[\u4e00-\u9fa5\w-]{4,20}$/.test(value)) {
        callback(new Error("用户名必须为4-20位中文、字母、数字、下划线或连字符"));
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
      } else if (value && !/^\S{6,}$/.test(value)) {
        callback(new Error("密码不能少于6位且不能包含空格"));
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

      axios.post(getApiUrl('users/getUserCreationTime'), {
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

      // 添加用户名合法性判断
      if (!this.form.name || this.form.name.trim() === '') {
        this.$message({
          message: '请输入用户名',
          type: 'error'
        });
        return;
      }

      if (!/^[\u4e00-\u9fa5\w-]{4,20}$/.test(this.form.name)) {
        this.$message({
          message: '用户名必须为4-20位中文、字母、数字、下划线或连字符',
          type: 'error'
        });
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
          axios.post(getApiUrl('users/updateUsername'), {
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
          axios.post(getApiUrl('users/resetPassword'), {
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
      axios.post(getApiUrl('users/getUserMessages'), {
        userId: parseInt(this.form.userId)
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          loading.close();
          
          if (response.data.code === 0) {
            // 获取留言数据并排序，确保每条留言都有id字段
            this.userMessages = (response.data.data || []).map(message => ({
              ...message,
              id: message.id || message.messageId // 使用id或messageId作为唯一标识
            })).sort((a, b) => {
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
      
      try {
        const date = new Date(timestamp);
        // 检查日期是否有效
        if (isNaN(date.getTime())) {
          return '未知时间';
        }
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
    },

    // 删除留言
    handleDeleteMessage(message) {
      this.$confirm('确定要删除这条留言吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 显示加载状态
        const loading = this.$loading({
          lock: true,
          text: '删除中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        // 调用API删除留言
        axios.post(getApiUrl('users/deleteMessage'), {
          messageId: message.id
        })
        .then(response => {
          loading.close();
          
          if (response.data.code === 0) {
            // 从列表中移除该留言
            this.userMessages = this.userMessages.filter(m => m.id !== message.id);
            
            this.$message({
              type: 'success',
              message: '留言已删除'
            });
          } else {
            this.$message({
              type: 'error',
              message: response.data.message || '删除失败'
            });
          }
        })
        .catch(error => {
          loading.close();
          console.error('删除留言失败:', error);
          
          let errorMessage = '网络错误，请稍后重试';
          if (error.response) {
            errorMessage = error.response.data.message || `服务器错误 (${error.response.status})`;
          }
          
          this.$message({
            type: 'error',
            message: errorMessage
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
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
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  height: auto;
  overflow-y: auto;
  overflow-x: auto;
  padding: 40px;
  gap: 30px;
  position: relative;
}

.profile img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  object-fit: cover;  /* 裁剪图片以填满整个容器 */
  z-index: 1;
}

.profile-card, .message-history-card {
  width: 100%;
  max-width: 500px;
  height: fit-content;
  margin-bottom: 30px;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.78);
  transition: all 0.3s ease;
  z-index: 100;
  position: relative;
}

.profile-card:hover, .message-history-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.message-history-card {
  max-height: 70vh;
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
  /* gap: 15px; */
  margin-top: 5vh;
  /* height: 8vh; */
}

/* 密码重置按钮容器 */
.password-reset-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: -3vh;
  width: 100%;
  flex-wrap: wrap;
}

/* 密码重置按钮样式 */
.password-reset-btn {
  height: 4vh !important;
  border-radius: 12px !important;
  padding: 8px 20px !important;
  margin: 0 !important;
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
  /* gap: 10px; */
  width: 90%;
  padding: 0%;
  /* margin: 0%; */
  margin-bottom: 1vh;
  /* background-color: #53a8ff; */
  /* margin-bottom: -2vh; */
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
    overflow-y: visible;
  }
}

@media (max-width: 768px) {
  .profile {
    padding: 20px 20px 80px 20px;
    height: auto;
    min-height: 100vh;
    align-items: flex-start;
    flex-direction: column;
    -webkit-overflow-scrolling: touch; /* iOS平滑滚动 */
  }
  
  .profile-card, .message-history-card {
    width: 100%;
    max-width: 90vw;
    padding: 1.5rem;
    margin: 1rem auto;
    margin-bottom: 20px;
  }
  
  .message-history-card {
    max-height: none !important;
    overflow-y: visible !important;
  }
  
  .profile-header h2, .message-header h2 {
    font-size: 24px;
    margin-bottom: 30px;
  }
  
  .action-buttons {
    gap: 15px;
    margin-top: 25px;
  }
  
  .action-buttons .el-button {
    max-width: 150px;
    padding: 8px 16px;
    font-size: 13px;
  }
  
  /* 用户名输入框与按钮同行布局 */
  .username-item :deep(.el-form-item__label) {
    margin-bottom: 8px !important;
    white-space: nowrap !important;
    min-width: 80px !important;
    width: auto !important;
    flex-shrink: 0 !important;
  }
  
  .username-item :deep(.el-form-item__content) {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 10px !important;
  }
  
  .username-item :deep(.el-input) {
    flex: 1 !important;
    max-width: 200px !important;
  }
  
  .username-item .username-edit-btn {
    width: 110px !important;
    height: 38px !important;
    margin: 0 !important;
    flex-shrink: 0 !important;
    font-size: 13px !important;
    padding: 0 !important;
    border-radius: 6px !important;
  }
  
  .username-item .username-action-btns {
    display: flex !important;
    gap: 8px !important;
    margin: 0 !important;
    flex-shrink: 0 !important;
  }
  
  .username-item .username-action-btns .el-button {
    width: 55px !important;
    height: 38px !important;
    padding: 0 !important;
    font-size: 12px !important;
  }
  
  .username-edit-btn {
    max-width: 150px;
    padding: 8px 16px;
    font-size: 13px;
  }
  
  :deep(.username-edit-btn.el-button) {
    padding: 8px 16px !important;
    font-size: 13px !important;
    height: 36px !important;
  }
  
  .username-action-btns .el-button {
    max-width: 100px;
    padding: 6px 12px;
    font-size: 12px;
  }
  
  :deep(.el-input) {
    max-width: 250px;
  }
  
  :deep(.el-input__inner) {
    height: 38px;
    font-size: 14px;
  }
  
  :deep(.el-button) {
    height: 36px;
    font-size: 13px;
    padding: 0 16px;
  }
  
  .back-button-container {
    top: 15px;
    right: 15px;
    height: 4vh;
  }
}

/* 18:9 手机屏幕适配  */
@media (max-width: 480px) {
  .profile {
    flex-direction: column;
    padding: 1.5rem 1.5rem 100px 1.5rem;
    gap: 20px;
    height: auto;
    min-height: 100vh;
    align-items: flex-start;
    justify-content: flex-start;
    -webkit-overflow-scrolling: touch; /* iOS平滑滚动 */
  }
  
  .profile-card, .message-history-card {
    width: 100%;
    max-width: 95vw;
    min-width: unset;
    padding: 1.5rem;
    margin: 0.5rem auto;
    margin-bottom: 20px;
  }
  
  .message-history-card {
    max-height: none !important;
    overflow-y: visible !important;
  }
  
  .profile-header h2, .message-header h2 {
    font-size: 22px;
    margin-bottom: 25px;
  }
  
  .action-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin-top: 25px;
    width: 100%;
  }
  
  .action-buttons .el-button {
    width: 180px;
    height: 40px;
    font-size: 14px;
    padding: 0;
    border-radius: 8px;
    margin: 0 auto;
  }
  
  /* 移动端密码重置按钮 */
  .password-reset-buttons {
    display: flex;
    flex-direction: row !important;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
    width: 100%;
  }
  
  .password-reset-btn {
    width: 120px !important;
    height: 40px !important;
    font-size: 13px !important;
    padding: 0 !important;
    border-radius: 8px !important;
    margin: 0 !important;
  }
  
  .username-item {
    display: flex !important;
    flex-direction: column !important;
    align-items: stretch !important;
  }
  
  .username-item :deep(.el-form-item__label) {
    margin-bottom: 8px !important;
    white-space: nowrap !important;
    min-width: 80px !important;
    width: auto !important;
    flex-shrink: 0 !important;
  }
  
  .username-item :deep(.el-form-item__content) {
    display: flex !important;
    flex-direction: row !important;
    align-items: flex-start !important;
    gap: 8px !important;
  }
  
  .username-item :deep(.el-input) {
    flex: 1 !important;
    max-width: 200px !important;
  }
  
  .username-item .username-edit-btn {
    width: 100px !important;
    height: 38px !important;
    margin: 0 !important;
    flex-shrink: 0 !important;
    font-size: 12px !important;
    padding: 0 !important;
    border-radius: 6px !important;
  }
  
  .username-item .username-action-btns {
    display: flex !important;
    gap: 6px !important;
    margin: 0 !important;
    flex-shrink: 0 !important;
  }
  
  .username-item .username-action-btns .el-button {
    width: 50px !important;
    height: 38px !important;
    padding: 0 !important;
    font-size: 12px !important;
  }
  
  .username-action-btns .el-button {
    width: 75px;
    height: 32px;
    padding: 0;
    font-size: 12px;
    border-radius: 6px;
  }
  
  :deep(.el-input) {
    max-width: 220px;
    width: 220px;
  }
  
  :deep(.el-input__inner) {
    height: 38px;
    font-size: 14px;
  }
  

}

/* 小屏幕手机适配 */
@media (max-width: 375px) {
  .profile {
    flex-direction: column;
    padding: 1rem 1rem 120px 1rem;
    gap: 15px;
    height: auto;
    min-height: 100vh;
    align-items: flex-start;
    justify-content: flex-start;
    -webkit-overflow-scrolling: touch; /* iOS平滑滚动 */
  }
  
  .profile-card, .message-history-card {
    width: 100%;
    max-width: 95vw;
    min-width: unset;
    padding: 1.2rem;
    margin: 0.5rem auto;
    margin-bottom: 15px;
  }
  
  .message-history-card {
    max-height: none !important;
    overflow-y: visible !important;
  }
  
  .profile-header h2, .message-header h2 {
    font-size: 20px;
    margin-bottom: 20px;
  }
  
  .action-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-top: 20px;
  }
  
  .action-buttons .el-button {
    width: 180px;
    height: 38px;
    font-size: 14px;
    padding: 0;
    border-radius: 8px;
  }
  
  .username-item {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  
  .username-item :deep(.el-form-item__label) {
    white-space: nowrap !important;
    min-width: 80px !important;
    width: auto !important;
    flex-shrink: 0 !important;
  }
  
  .username-edit-btn {
    width: 180px;
    height: 38px;
    margin-left: 0;
    margin-top: 0;
    align-self: center;
    font-size: 14px;
    padding: 0;
    border-radius: 8px;
  }
  
  :deep(.username-edit-btn.el-button) {
    width: 180px !important;
    height: 38px !important;
    padding: 0 !important;
    font-size: 14px !important;
  }
  
  .username-action-btns {
    width: 100%;
    justify-content: center;
    margin-left: 0;
    margin-top: 0;
    gap: 10px;
  }
  
  .username-action-btns .el-button {
    width: 80px;
    height: 34px;
    padding: 0;
    font-size: 12px;
    border-radius: 6px;
  }
  
  :deep(.el-input) {
    max-width: 100%;
    width: 100%;
  }
  
  :deep(.el-input__inner) {
    height: 40px;
    font-size: 14px;
  }
  

  
  .avatar-container {
    width: 100px;
    height: 100px;
  }
  
  :deep(.el-avatar) {
    width: 100px !important;
    height: 100px !important;
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.el-timeline-item__timestamp::before),
:deep(.el-timeline-item__timestamp::after) {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, #d9d9d9, transparent);
  margin: 0 15px;
}

:deep(.el-timeline-item__timestamp::before) {
  background: linear-gradient(90deg, transparent, #d9d9d9);
}

:deep(.el-timeline-item__timestamp::after) {
  background: linear-gradient(90deg, #d9d9d9, transparent);
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
  transition: all 0.3s ease;
}

.back-button-container .el-button:hover {
  background-color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 手机屏幕返回按钮适配 */
@media (max-width: 480px) {
  .back-button-container {
    top: 15px !important;
    right: 15px !important;
  }
  
  .back-button-container .el-button {
    padding: 8px 12px !important;
    font-size: 13px !important;
    height: 36px !important;
    min-width: 80px !important;
    background-color: rgba(255, 255, 255, 0.95) !important;
    border: 1px solid #e0e0e0 !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  }
  
  .back-button-container .el-button:hover {
    background-color: #fff !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  }
}

@media (max-width: 375px) {
  .back-button-container {
    top: 15px !important;
    right: 15px !important;
  }
  
  .back-button-container .el-button {
    padding: 6px 10px !important;
    font-size: 12px !important;
    height: 32px !important;
    min-width: 70px !important;
    background-color: rgba(255, 255, 255, 0.95) !important;
    border: 1px solid #e0e0e0 !important;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1) !important;
  }
  
  .back-button-container .el-button:hover {
    background-color: #fff !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15) !important;
  }
}

.message-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.delete-btn {
  padding: 6px 12px;
  font-size: 13px;
}

.delete-btn .el-icon {
  margin-right: 4px;
}

.message-card {
  position: relative;
  transition: all 0.3s ease;
}

.message-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>

<style>
/* 全局字体样式 */
.el-form-item__label {
font-size: 16px !important;
font-weight: 600 !important;
color: #606266 !important;
font-family: 'Helvetica Neue', Arial, sans-serif !important;
white-space: nowrap !important;
}

.el-button {
font-family: 'Helvetica Neue', Arial, sans-serif !important;
letter-spacing: 0.5px !important;
}

h2 {
font-family: 'Helvetica Neue', Arial, sans-serif !important;
letter-spacing: 1px !important;
}

/* 移动端滚动优化 */
@media (max-width: 768px) {
  html, body {
    overflow-x: hidden !important;
    overflow-y: auto !important;
    height: auto !important;
    min-height: 100vh !important;
    -webkit-overflow-scrolling: touch !important;
  }
  
  #app {
    overflow-x: hidden !important;
    overflow-y: auto !important;
    height: auto !important;
    min-height: 100vh !important;
    -webkit-overflow-scrolling: touch !important;
  }
  
  .profile {
    position: relative !important;
  }
}
</style>