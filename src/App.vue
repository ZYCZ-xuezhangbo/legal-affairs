<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <a-back-top />
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import antd from 'ant-design-vue/es/locale-provider/zh_CN'

export default {
  computed: {
    locale() {
      return antd
    }
  }
}
</script>
