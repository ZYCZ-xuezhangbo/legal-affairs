<template>
  <div>
    <a-badge :dot="dot">
      <a-icon type="mail" :style="iconStyle" />
    </a-badge>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dot: false,
      iconStyle: {
        'font-size': '18px'
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
</style>
