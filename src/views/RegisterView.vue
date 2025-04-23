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
          class="register-form"
        >
          <el-form-item prop="uname">
            <el-input v-model="ruleForm.uname"><template #prefix>
              <el-text style="font-size: 1.1vw; font-weight: bold; color: red;">*&nbsp;</el-text>
              <el-text style="font-size: 1.1vw; font-weight: bold; width: 3.5vw; text-align: left;">用户名</el-text>
              </template></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              type="email"
              v-model="ruleForm.email"
              autocomplete="off"
            ><template #prefix>
              <el-text style="font-size: 1.1vw; font-weight: bold; color: red;">*&nbsp;</el-text>
              <el-text style="font-size: 1.1vw; font-weight: bold; width: 3.5vw; text-align: left;">邮箱</el-text>
              </template></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <div class="code-input">
              <el-input
                v-model="ruleForm.code"
                placeholder="请输入验证码"
                autocomplete="off"
              ><template #prefix>
              <el-text style="font-size: 1.1vw; font-weight: bold; color: red;">*&nbsp;</el-text>
              <el-text style="font-size: 1.1vw; font-weight: bold; width: 3.5vw; text-align: left;">验证码</el-text>
              </template></el-input>
              <el-button 
                type="primary" 
                style="height: 36px; height: 80%; margin: auto auto;"
                :disabled="isCodeButtonDisabled"
                @click="getCode"
              >
                {{ codeButtonText }}
              </el-button>
            </div>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ><template #prefix>
              <el-text style="font-size: 1.1vw; font-weight: bold; color: red;">*&nbsp;</el-text>
              <el-text style="font-size: 1.1vw; font-weight: bold; width: 4.2vw; text-align: left;">密码</el-text>
              </template></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ><template #prefix>
              <el-text style="font-size: 1.1vw; font-weight: bold; color: red;">*&nbsp;</el-text>
              <el-text style="font-size: 1.1vw; font-weight: bold; width: 4.2vw; text-align: left;">验证密码</el-text>
              </template></el-input>
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
        <div style="height: 10vh;"></div>
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
        } else if (!/^[\u4e00-\u9fa5\w-]{4,20}$/.test(value)) {
          callback(new Error("用户名长度必须在4-20个字符之间"));
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
        } else if (!/^\S{6,20}$/.test(value)) {
          callback(new Error("密码长度必须在6-20个字符之间"));
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
            const username = _this.ruleForm.uname;
            const email = _this.ruleForm.email;
            const password = _this.ruleForm.password;
            const code = _this.ruleForm.code;

            // 使用 axios 将注册信息发送到后端
            axios.post(
              'http://localhost:8080/api/v1/users/register',
              {
                username: username,
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
              if (response.data.code === 0) {
                this.$message({
                  message: "注册成功！",
                  type: "success",
                });
                // 注册成功后跳转到登录页
                this.$router.push('/login');
              } else {
                this.$message({
                  message: "注册失败",
                  type: "error",
                });
              }
              _this.loading = false;
            })
            .catch(error => {
              console.error("注册请求失败:", error);
              
              // 处理错误消息
              let errorMessage = "注册失败，请稍后重试";
              if (error.response?.data) {
                switch (error.response.data.code) {
                  case 1001:
                    errorMessage = "邮箱已注册";
                    break;
                  case 1002:
                    errorMessage = "用户名已存在";
                    break;
                  case 1003:
                    errorMessage = "验证码不正确";
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

        // 验证邮箱格式
        if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(this.ruleForm.email)) {
          this.$message({
            message: "请输入有效的邮箱地址",
            type: "warning",
          });
          return;
        }

        this.isCodeButtonDisabled = true;
        this.countdown = 60;
        
        // 发送获取验证码请求
        axios.post(
          'http://localhost:8080/api/v1/users/email-code',
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
          if (response.data.code === 0) {
            this.$message({
              message: response.data.message || "验证码已发送",
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
          console.error("验证码发送失败:", error);
          
          // 处理错误消息
          let errorMessage = "验证码发送失败，请稍后重试";
          if (error.response?.data) {
            switch (error.response.data.code) {
              case 2001:
                errorMessage = "邮箱已被注册";
                break;
              case 2002:
                errorMessage = "邮箱格式不正确";
                break;
              case 2003:
                errorMessage = "发送过于频繁，请稍后再试";
                break;
              case 2004:
                errorMessage = "IP发送次数过多，请稍后再试";
                break;
              case 2005:
                errorMessage = "邮件发送失败，请稍后重试";
                break;
              default:
                errorMessage = error.response.data.message || errorMessage;
            }
          }
          
          this.$message({
            message: errorMessage,
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
  /* 整个页面 */
  .register {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100vh;
    /* background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); */
    background-image: url('123.jpg');
    background-size: cover;
    background-position: center;
  }
  /* register那一块 */
  .box-card {
    margin: auto auto;
    width: 28%;
    height: 64vh;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.88);
    /* backdrop-filter: blur(10px); */
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
    margin-bottom: 38px;
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
  /* 5行表格 */
  .register-form {
    margin: auto auto;
    /* padding: 0 20px; */
    width: 90%;
    height: 80%;
    /* background-color: #3a8ee6; */
  }

  :deep(.el-form-item__label) {
    font-size: 16px;
    font-weight: 600;
    color: #606266;
    white-space: nowrap;
    font-family: 'Helvetica Neue', Arial, sans-serif;
  }

  :deep(.el-form-item) {
    margin-bottom: 23px;
    transition: all 0.3s ease;
  }
  
  :deep(.el-form-item:hover) {
    transform: translateY(-2px);
  }
  
  :deep(.el-input) {
    transition: all 0.3s ease;
    /* background-color: #409eff; */
    height: 5vh;
    /* padding-left: 50px; */
    /* width: 20vw; */
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
    width: 100%;
    height: 100%;
  }

  .code-input .el-input {
    flex: 1;
  }

  .code-input .el-button {
    width: 32%;
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
    width: 30%;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.3s ease;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    letter-spacing: 0.5px;
    font-size: 15px;
    height: 40px;
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