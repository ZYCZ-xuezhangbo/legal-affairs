<template>
  <div class="main">
    <a-form-model ref="formLogin" :model="form" :rules="rules" class="user-layout-login">
      <a-form-model-item>
        <a-alert v-if="isLoginError" type="error" showIcon :message="loginErrorMsg===''? 'error':loginErrorMsg" />
      </a-form-model-item>
      <a-form-model-item prop="username">
        <a-input v-model="form.username" placeholder="账户" @keydown.enter="handleSubmit" />
      </a-form-model-item>
      <a-form-model-item prop="password">
        <a-input-password v-model="form.password" placeholder="密码" autocomplete="on" @keydown.enter="handleSubmit" />
      </a-form-model-item>
      <a-form-model-item>
        <a-button size="large" type="primary" class="login-button" :loading="loginLoading" @click="handleSubmit">登录</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { DEFAULT_ROUTE_PATH } from '@/store/mutation-types'

export default {
  data() {
    return {
      loginLoading: false,
      isLoginError: false,
      loginErrorMsg: '',
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入帐户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['Login']),
    handleSubmit() {
      this.$refs.formLogin.validate().then(() => {
        this.loginLoading = true

        this.Login({
          username: this.form.username,
          password: this.form.password
        }).then(() => {
          this.loginSuccess()
        }).catch(err => {
          this.requestFailed(err.msg || err.message)
        }).finally(() => {
          // 由于进入首页时，页面跳转会有延迟，所以loading要延迟几秒再消失
          setTimeout(() => {
            this.loginLoading = false
          }, 1000)
        })
      })
    },
    loginSuccess() {
      this.isLoginError = false
      this.$router.push(DEFAULT_ROUTE_PATH)
    },
    requestFailed(msg) {
      this.isLoginError = true
      this.loginErrorMsg = msg
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }
}
@media screen and(max-width: 575px) {
  .user-layout-login {
    margin: 0 15px;
  }
}
</style>
