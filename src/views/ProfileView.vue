<template>
  <div class="profile">
    <el-card class="profile-card">
      <div class="profile-header">
        <h2>个人主页</h2>
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
        :disabled="!isEditing"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name">
            <template #prefix><el-icon><User /></el-icon></template>
          </el-input>
        </el-form-item>
        
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" type="number">
            <template #prefix><el-icon><Calendar /></el-icon></template>
          </el-input>
        </el-form-item>
        
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio value="1" size="large">男</el-radio>
            <el-radio value="2" size="large">女</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" type="email">
            <template #prefix><el-icon><Message /></el-icon></template>
          </el-input>
        </el-form-item>

        <template v-if="isEditing">
          <el-form-item label="密码" prop="pass">
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
        <el-button v-if="!isEditing" type="primary" @click="startEditing" round>
          <el-icon><Edit /></el-icon> 编辑资料
        </el-button>
        <template v-else>
          <el-button type="success" @click="saveChanges" round>
            <el-icon><Check /></el-icon> 保存
          </el-button>
          <el-button @click="cancelEditing" round>
            <el-icon><Close /></el-icon> 取消
          </el-button>
        </template>
        
        <router-link to="/">
          <el-button round>
            <el-icon><Back /></el-icon> 返回首页
          </el-button>
        </router-link>
      </div>
    </el-card>
    
    <!-- 头像选择对话框 -->
    <el-dialog 
      title="选择头像" 
      v-model="showAvatarDialog" 
      width="800px"
      center
      custom-class="avatar-dialog"
    >
      <div class="avatar-gallery">
        <div 
          v-for="(avatar, index) in avatarOptions" 
          :key="index" 
          class="avatar-option"
          :class="{ 'selected': selectedAvatar === avatar }"
          @click="selectAvatar(avatar)"
        >
          <el-avatar :src="avatar" :size="90"></el-avatar>
        </div>
      </div>
      
      <div class="dialog-footer-center">
        <el-button @click="showAvatarDialog = false" round>
          <el-icon><Close /></el-icon> 取消
        </el-button>
        <el-button type="primary" @click="confirmAvatar" round>
          <el-icon><Check /></el-icon> 确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { User, Calendar, Message, Lock, Edit, Check, Close, Back, Camera } from '@element-plus/icons-vue'

export default {
  components: {
    User, Calendar, Message, Lock, Edit, Check, Close, Back, Camera
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

    const validateAge = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入年龄"));
      } else if (!Number.isInteger(Number(value))) {
        callback(new Error("年龄必须是整数"));
      } else if (value < 1 || value > 120) {
        callback(new Error("年龄必须在1-99之间"));
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
      if (this.isEditing && value === "") {
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
      if (this.isEditing && value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      form: {
        name: 'chen',
        age: '21',
        gender: '1',
        email: '',
        pass: '',
        checkPass: '',
        avatar: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        

      },
      rules: {
        name: [
          { required: true, validator: validateUsername, trigger: "blur" }
        ],
        age: [
          { required: true, validator: validateAge, trigger: "blur" }
        ],
        gender: [
          { required: true, message: "请选择性别", trigger: "change" }
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
      originalForm: {},
      isEditing: false,
      showAvatarDialog: false,
      selectedAvatar: '',
      avatarOptions: [
        'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
      ]
    }
  },
  methods: {
    // 开始编辑资料
    startEditing() {
      // 保存原始数据，以便取消时恢复
      this.originalForm = JSON.parse(JSON.stringify(this.form));
      this.isEditing = true;
    },
    
    // 保存变更
    saveChanges() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 模拟API保存
          setTimeout(() => {
            this.$message({
              message: '个人资料已更新',
              type: 'success'
            });
            this.isEditing = false;
            // 清空密码字段
            this.form.pass = '';
            this.form.checkPass = '';
          }, 600);
        } else {
          this.$message({
            message: '表单验证失败，请检查输入',
            type: 'error'
          });
          return false;
        }
      });
    },
    
    // 取消编辑
    cancelEditing() {
      // 恢复原始数据
      this.form = JSON.parse(JSON.stringify(this.originalForm));
      this.isEditing = false;
      // 重置表单验证状态
      this.$refs.form.clearValidate();
    },
    
    // 打开头像选择对话框
    openAvatarDialog() {
      this.selectedAvatar = this.form.avatar; // 默认选中当前头像
      this.showAvatarDialog = true;
    },
    
    // 选择头像
    selectAvatar(avatar) {
      this.selectedAvatar = avatar;
    },
    
    // 确认头像选择
    confirmAvatar() {
      if (this.selectedAvatar) {
        this.form.avatar = this.selectedAvatar;
        this.$message({
          message: '头像已更新',
          type: 'success'
        });
      }
      this.showAvatarDialog = false;
    },
    
    // 取消头像更改
    cancelAvatarChange() {
      this.selectedAvatar = '';
      this.showAvatarDialog = false;
    }
  }
}
</script>

<style scoped>
.profile {
  width: 100%;
  min-height: 100vh;
  max-height: 200%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.profile-card {
  width: 100%;
  max-width: 650px;
  margin: auto;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: all 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.profile-header {
  text-align: center;
  margin-bottom: 30px;
  position: relative;
}

.profile-header h2 {
  font-size: 28px;
  color: #409EFF;
  margin: 0;
  font-weight: 600;
  padding-bottom: 10px;
  position: relative;
}

.profile-header h2:after {
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
}

:deep(.el-input__inner) {
  border-radius: 8px;
  height: 45px;
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

:deep(.el-radio) {
  margin-right: 15px;
}

:deep(.el-button) {
  padding: 12px 25px;
  font-weight: 500;
  transition: all 0.3s ease;
}

:deep(.el-button:hover) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}
</style>