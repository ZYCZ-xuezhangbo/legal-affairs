<template>
  <a-result status="403" title="403" sub-title="抱歉，您没有访问此页面的权限">
    <template #extra>
      <a-button type="primary" @click="toHome">
        返回登录页
      </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: 'Exception403',
  methods: {
    toHome() {
      this.$store.dispatch('Logout').then(() => {
        this.$router.push('/user/login')
      })
    }
  }
}
</script>
