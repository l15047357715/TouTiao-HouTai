<template>
  <div class="login-box">
    <el-card class="box-card">
      <div class="logo">
        <img src="../../assets/img/logo_index.png" />
      </div>
      <el-form :model="formData" :rules="rule" ref="form">
        <el-form-item prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="code">
          <el-input v-model="formData.code" placeholder="请输入验证码" class="left"></el-input>
          <el-button class="right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="formData.check" label="我已阅读并同意用户协议和隐私条款"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        mobile: '',
        code: '',
        check: false
      },
      rule: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码必须为6位数字' }
        ],
        check: [
          {
            validator: function (rule, value, callBack) {
              if (value) {
                callBack()
              } else {
                callBack(new Error('同意才能继续'))
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate(boolean => {
        if (boolean) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.formData
          }).then(res => {
            localStorage.setItem('token', res.data.token)
            this.$router.push('/home')
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-box {
  height: 100vh;
  background: url("../../assets/img//login_bg.jpg") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    width: 500px;
    height: 400px;
    .logo {
      text-align: center;
      margin: 30px 0;
      img {
        height: 50px;
      }
    }
    .code {
      .left {
        width: 73%;
      }
      .right {
        width: 25%;
        float: right;
      }
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
