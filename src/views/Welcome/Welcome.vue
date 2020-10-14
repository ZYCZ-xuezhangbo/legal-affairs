<template>
  <a-result :title="msg">
    <template #icon>
      <a-icon type="smile" theme="twoTone" />
    </template>
  </a-result>
</template>

<script>
import { timeFix, welcome } from '@/utils/util'

export default {
  computed: {
    msg() {
      return `${timeFix()}，${welcome()}`
    }
  }
}
</script>

<style>
</style>
