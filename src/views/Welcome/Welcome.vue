<template>
  <a-result :title="msg">
    <template #icon>
      <a-icon type="smile" theme="twoTone" />
    </template>
  </a-result>
</template>

<script>
import { timeFix } from '@/utils/util'
import defaultSetting from '@/config/defaultSettings'

export default {
  computed: {
    msg() {
      const username = this.$store.getters.userInfo.userName
      return `${timeFix()}，${username}，欢迎进入${defaultSetting.title}`
    }
  }
}
</script>

<style>
</style>
