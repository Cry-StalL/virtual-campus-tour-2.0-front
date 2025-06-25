<template>
  <div>
    <div class="login">
      <el-card class="box-card">
        <h2>登录</h2>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-position="left"
          class="login-from"
        >

          <el-form-item prop="email">
            <el-input 
              type="email"
              v-model="ruleForm.email"
              autocomplete="off"
            ><template #prefix>
              <el-text style="font-size: 16px; font-weight: bold; color: red;">*&nbsp;</el-text>
              <el-text style="font-size: 16px; font-weight: bold;">邮箱</el-text>
              </template></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ><template #prefix>
              <el-text style="font-size: 16px; font-weight: bold; color: red;">*&nbsp;</el-text>
              <el-text style="font-size: 16px; font-weight: bold;">密码</el-text>
              </template></el-input>
          </el-form-item>
        </el-form>
        <div class="btnGroup">
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            v-loading="loading" class="ttt">登录</el-button>
          <router-link to="/" style="width: 30%;" >
            <el-button style="width: 100%;">返回</el-button>

          </router-link>
        </div>
        <div class="divider">
          <span class="line"></span>
          <span class="text">或</span>
          <span class="line"></span>
        </div>
        <div class="register-link">
          <span>还没有账号？</span>
          <router-link to="/register">立即注册</router-link>
        </div>
      </el-card>
    </div>
  </div>
</template>
  
<script>
  import axios from 'axios'
  import Cookies from 'js-cookie'
  import { getApiUrl } from '@/config/config.ts';

  export default {
    data() {
      var validateEmail = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("邮箱不能为空！"));
        } else if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value)) {
          callback(new Error("请输入有效的邮箱地址"));
        } else {
          callback();
        }
      };

      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if (!/^\S{8,}$/.test(value)) {
          callback(new Error("密码不能少于8位或密码无效!"));
        } else {
          if (this.ruleForm.checkPass !== "") {
            this.$refs.ruleForm.validateField("checkPass");
          }
          callback();
        }
      };

      return {
        ruleForm: {
          email: "",
          password: "",
        },
        rules: {
          email: [
            { required: true, validator: validateEmail, trigger: "blur" },
          ],
          password: [
            { required: true, validator: validatePass, trigger: "blur" },
          ],
        },
        loading: false,
      };
    },
    methods: {
      
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          this.loading = true;

          if (valid) {
            let _this = this;

            // 获取表单数据
            const email = _this.ruleForm.email;
            const password = _this.ruleForm.password;

            console.log(email);

            // 使用 axios 将登录信息发送到后端
            axios.post(
              getApiUrl('users/login'), 
              {
                email: email,
                password: password
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                }
              }
            )
            .then(response => {
              if (response.data.code === 0) {
                // 获取用户信息
                const userId = response.data.data.user_id;
                const username = response.data.data.username;

                // 存储用户信息到 Cookies
                Cookies.set('userId', userId, { expires: 1 }); // 设置1天后过期
                Cookies.set('username', username, { expires: 1 });
                Cookies.set('email', email, { expires: 1 });


                this.$message({
                  message: "登录成功！",
                  type: "success",
                });
                this.$router.push('/');
              } else {
                this.$message({
                  message: "登录失败",
                  type: "error",
                });
              }
              _this.loading = false;
            })
            .catch(error => {
              console.error("登录请求失败:", error);
              
              // 处理错误消息
              let errorMessage = "登录失败，请稍后重试";
              if (error.response?.data) {
                switch (error.response.data.code) {
                  case 1001:
                    errorMessage = "邮箱或密码错误";
                    break;
                  case 1002:
                    errorMessage = "用户不存在";
                    break;
                  case 1003:
                    errorMessage = "密码错误";
                    break;
                  default:
                    errorMessage = error.response.data.message || errorMessage;
                }
              }
              
              this.$message({
                message: errorMessage,
                type: "error",
              });
              _this.loading = false;
            });
          } else {
            console.log("表单验证失败");
            this.loading = false;
            return false;
          }
        });
      }
    },
  };
</script>
  
<style scoped>
  /* 整个页面 */
  .login {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100vh; 
    /* background: linear-gradient(135deg, #FFFEFF 0%, #FFFFEE 100%); */
    background-image: url('123.jpg');
    background-size: cover;
    background-position: center;
  }
  /* login */
  .box-card {
    margin: auto auto;
    width: 400px;
    min-width: 320px;
    max-width: 400px;
    min-height: 400px;
    max-height: 450px;
    transition: all 0.3s ease;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.88); /* 半透明背景色 */
    padding: 2rem; /* 使用rem单位 */
    position: relative; /* 添加 position 属性 */
    z-index: 2;
  }

  /* 鼠标放在login上会移动 */
  .box-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  /* 两行表格 */
  .login-from {
    /* background-color: #409EFF; */
    margin: auto auto;
    width: 100%;
    /* padding: 0 20px; */
  }
  
  /* 美化输入框样式 */
  :deep(.el-input) {
    transition: all 0.3s ease;
  }
  
  :deep(.el-input__inner) {
    border-radius: 8px;
    height: 45px;
    font-size: 16px; /* 固定字体大小 */
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
  
  /* 美化按钮样式 */
  :deep(.el-button) {
    border-radius: 8px;
    transition: all 0.3s ease;
    height: 40px;
    padding: 0 25px;
    font-size: 16px; /* 固定字体大小 */
  }
  
  :deep(.el-button:hover) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
  }
  
  /* 美化标题样式 */
  h2 {
    text-align: center;
    color: #409EFF;
    margin-bottom: 40px;
    font-weight: 600;
    position: relative;
    padding-bottom: 10px;
    font-size: 28px;
  }
  
  h2:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #409EFF, #53a8ff);
    border-radius: 3px;
  }
  
  /* 美化按钮组样式 */
  .btnGroup {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 35px;
    flex-wrap: wrap; /* 允许按钮换行 */
  }
  
  /* 注册链接样式 */
  .register-link {
    text-align: center;
    margin-top: 25px;
    /* color: #606266; */
    font-size: 14px;
  }
  
  .register-link a {
    color: #409EFF;
    text-decoration: none;
    margin-left: 5px;
    transition: all 0.3s ease;
  }
  
  .register-link a:hover {
    color: #66b1ff;
    text-decoration: underline;
  }
  
  /* 分隔线样式 */
  .divider {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 25px 0;
  }
  
  .divider .line {
    flex: 1;
    height: 1px;
    background: #dcdfe6;
  }
  
  .divider .text {
    padding: 0 20px;
    color: #909399;
    font-size: 14px;
  }
  
  .ttt{
    /* background-color: #909399; */
    width: 120px; /* 固定按钮宽度 */
    min-width: 120px; /* 最小宽度 */
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .box-card {
      width: 400px;
      max-width: 90vw;
      padding: 1.5rem;
      margin: 1rem;
    }
    
    h2 {
      font-size: 24px;
      margin-bottom: 30px;
    }
    
    .btnGroup {
      gap: 15px;
      margin-top: 25px;
    }
    
    .ttt {
      width: 100px;
      min-width: 100px;
    }
    
    :deep(.el-input__inner) {
      height: 40px;
      font-size: 14px;
    }
    
    :deep(.el-button) {
      height: 38px;
      font-size: 14px;
      padding: 0 20px;
    }
  }

  @media (max-width: 480px) {
    .box-card {
      width: 400px;
      max-width: 95vw;
      padding: 1rem;
      margin: 0.5rem;
    }
    
    h2 {
      font-size: 22px;
      margin-bottom: 25px;
    }
    
    .btnGroup {
      flex-direction: column;
      gap: 10px;
      margin-top: 20px;
    }
    
    .ttt {
      width: 100%;
      max-width: 150px;  /* 限制最大宽度 */
      min-width: auto;
    }
    
    .btnGroup .el-button {
      max-width: 150px;  /* 限制所有按钮最大宽度 */
    }
    
    :deep(.el-input__inner) {
      height: 38px;
      font-size: 14px;
    }
    
    :deep(.el-button) {
      height: 36px;
      font-size: 14px;
      padding: 0 15px;
    }
    
    .divider {
      margin: 20px 0;
    }
    
    .register-link {
      margin-top: 20px;
      font-size: 13px;
    }
  }

  /* 超小屏幕适配 */
  @media (max-width: 320px) {
    .box-card {
      width: 400px;
      max-width: 98vw;
      padding: 0.8rem;
    }
    
    h2 {
      font-size: 20px;
      margin-bottom: 20px;
    }
    
    .ttt {
      max-width: 120px;  /* 超小屏幕进一步限制 */
    }
    
    .btnGroup .el-button {
      max-width: 120px;
    }
    
    :deep(.el-input__inner) {
      height: 36px;
      font-size: 13px;
    }
    
    :deep(.el-button) {
      height: 34px;
      font-size: 13px;
      padding: 0 12px;
    }
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
