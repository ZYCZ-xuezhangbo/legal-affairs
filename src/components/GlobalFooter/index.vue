<template>
  <!-- <global-footer class="footer custom-render">
    <template v-slot:links>
      <a href="https://www.github.com/vueComponent/pro-layout" target="_blank">Pro Layout</a>
      <a href="https://www.github.com/vueComponent/ant-design-vue-pro" target="_blank">Github</a>
      <a href="https://www.github.com/sendya/" target="_blank">@Sendya</a>
    </template>
    <template v-slot:copyright>
      <a href="https://github.com/vueComponent" target="_blank">vueComponent</a>
    </template>
  </global-footer> -->
  <div class="m-footer">
    法务系统
  </div>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
<style lang="less" scoped>
.m-footer {
  text-align: center;
  color: #aaa;
}
</style>
