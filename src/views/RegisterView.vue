<template>
  <div>
    <div class="register">
      <el-card class="box-card">
        <h2>注册</h2>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-position="left"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="uname">
            <el-input v-model="ruleForm.uname"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              type="email"
              v-model="ruleForm.email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <div class="code-input">
              <el-input
                v-model="ruleForm.code"
                placeholder="请输入验证码"
                autocomplete="off"
              ></el-input>
              <el-button 
                type="primary" 
                :disabled="isCodeButtonDisabled"
                @click="getCode"
              >
                {{ codeButtonText }}
              </el-button>
            </div>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="btnGroup">
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            v-loading="loading"
            >提交</el-button
          >
          <el-button @click="goBack">返回</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>


  
<script>
  import axios from 'axios'

  export default {
    data() {
      var validateUsername = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入用户名"));
        } else if (!/^[\u4e00-\u9fa5\w-]{3,20}$/.test(value)) {
          callback(new Error("用户名无效!"));
        } else {
          callback();
        }
      };

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

      var validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };

      var validateCode = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入验证码"));
        } else if (!/^\d{6}$/.test(value)) {
          callback(new Error("验证码必须是6位数字"));
        } else {
          callback();
        }
      };

      return {
        ruleForm: {
          uname: "",
          email: "",
          code: "",
          pass: "",
          password: "",
        },

        rules: {
          uname: [
            { required: true, validator: validateUsername, trigger: "blur" },
          ],
          email: [
            { required: true, validator: validateEmail, trigger: "blur" },
          ],
          code: [
            { required: true, validator: validateCode, trigger: "blur" },
          ],
          pass: [
            { required: true, validator: validatePass, trigger: "blur" },
          ],
          password: [
            { required: true, validator: validatePass2, trigger: "blur" },
          ],
        },
        isCodeButtonDisabled: false,
        codeButtonText: "获取验证码",
        countdown: 60,
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          this.loading = true;

          if (valid) {
            let _this = this;

            // 获取表单数据
            const name = _this.ruleForm.uname;
            const email = _this.ruleForm.email;
            const password = _this.ruleForm.password;
            const code = _this.ruleForm.code;

            // 使用 axios 将登录信息发送到后端
            axios.post(
              'http://localhost:8080/api/user/register',
              {
                name: name,
                email: email,
                password: password,
                code: code,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                }
              }
            )
            .then(response => {
              console.log(response.data);

              if (response.data.code === 200) {
                
                this.$router.push('/login');
                // 显示后端响应的成功信息
                this.$message({
                  message: response.data.message,
                  type: "success",
                });
              }
              _this.loading = false;
            })
            .catch(error => {
              //校验请求返回结果
              console.error("登录请求失败:", error);
              console.log('Request Headers:', error.config.headers);
              console.log('Request Data:', error.config.data); // 打印请求体
              console.log('Response Status:', error.response ? error.response.status : 'No response');
              console.log('Response Data:', error.response ? error.response.data : 'No response data');

              this.$message({
                message: error.response.data.message,
                type: "warning",
              });
              _this.loading = false;
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      goBack() {
        this.$router.go(-1);
      },
      getCode() {
        if (!this.ruleForm.email) {
          this.$message({
            message: "请先输入邮箱",
            type: "warning",
          });
          return;
        }
        if (!/^\d{11}$/.test(this.ruleForm.email)) {
          this.$message({
            message: "请输入正确的邮箱",
            type: "warning",
          });
          return;
        }

        this.isCodeButtonDisabled = true;
        this.countdown = 60;
        
        // 发送获取验证码请求
        axios.post(
          'http://localhost:8080/api/user/sendCode',
          {
            email: this.ruleForm.email
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        )
        .then(response => {
          if (response.data.code === 200) {
            this.$message({
              message: "验证码已发送",
              type: "success",
            });
            this.startCountdown();
          } else {
            this.$message({
              message: response.data.message || "发送失败",
              type: "error",
            });
            this.isCodeButtonDisabled = false;
            this.codeButtonText = "获取验证码";
          }
        })
        .catch(error => {
          this.$message({
            message: error.response?.data?.message || "发送失败",
            type: "error",
          });
          this.isCodeButtonDisabled = false;
          this.codeButtonText = "获取验证码";
        });
      },

      startCountdown() {
        const timer = setInterval(() => {
          if (this.countdown > 0) {
            this.countdown--;
            this.codeButtonText = `${this.countdown}s后重试`;
          } else {
            clearInterval(timer);
            this.isCodeButtonDisabled = false;
            this.codeButtonText = "获取验证码";
          }
        }, 1000);
      },
    },
  };
  </script>
  


  <style scoped>
  .register {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }
  .box-card {
    margin: auto auto;
    width: 500px;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    transition: all 0.4s ease;
  }
  
  .box-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }

  .box-card h2 {
    text-align: center;
    color: #409eff;
    font-size: 28px;
    margin-bottom: 40px;
    font-weight: 600;
    position: relative;
    padding-bottom: 10px;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    letter-spacing: 1px;
  }
  
  .box-card h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #409eff, #3a8ee6);
    border-radius: 3px;
  }

  .login-from {
    margin: auto auto;
    padding: 0 20px;
  }

  :deep(.el-form-item__label) {
    font-size: 16px;
    font-weight: 600;
    color: #606266;
    white-space: nowrap;
    font-family: 'Helvetica Neue', Arial, sans-serif;
  }

  :deep(.el-form-item) {
    margin-bottom: 25px;
    transition: all 0.3s ease;
  }
  
  :deep(.el-form-item:hover) {
    transform: translateY(-2px);
  }
  
  :deep(.el-input) {
    transition: all 0.3s ease;
  }
  
  :deep(.el-input__inner) {
    transition: all 0.3s ease;
  }
  
  :deep(.el-input__wrapper) {
    box-shadow: none !important;
    border: 1px solid #dcdfe6;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  :deep(.el-input__wrapper:hover) {
    border-color: #409eff;
    box-shadow: 0 3px 10px rgba(64, 158, 255, 0.15) !important;
  }

  :deep(.el-input__wrapper.is-focus) {
    border-color: #409eff;
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2) !important;
    transform: translateY(-1px);
  }

  .code-input {
    display: flex;
    gap: 12px;
  }

  .code-input .el-input {
    flex: 1;
  }

  .code-input .el-button {
    width: 120px;
    padding: 0;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .code-input .el-button:not(:disabled):hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(64, 158, 255, 0.25);
  }

  .btnGroup {
    margin-top: 35px;
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  .btnGroup .el-button {
    min-width: 120px;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.3s ease;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    letter-spacing: 0.5px;
    font-size: 15px;
  }

  .btnGroup .el-button--primary {
    background: linear-gradient(135deg, #409eff 0%, #3a8ee6 100%);
    border: none;
  }

  .btnGroup .el-button--primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(64, 158, 255, 0.25);
  }

  .btnGroup .el-button--default {
    border: 1px solid #dcdfe6;
  }

  .btnGroup .el-button--default:hover {
    border-color: #409eff;
    color: #409eff;
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(64, 158, 255, 0.1);
  }

  :deep(.el-form-item.is-error .el-input__wrapper) {
    box-shadow: 0 0 0 2px rgba(245, 108, 108, 0.1) !important;
  }

  :deep(.el-form-item__error) {
    padding-top: 4px;
    font-size: 13px;
    color: #f56c6c;
  }
  </style>