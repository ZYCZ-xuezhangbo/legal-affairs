<template>
  <a-button type="primary" @click="handleClick"> 导出 </a-button>
</template>

<script>
export default {
  name: 'ButtonExport',
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style>
</style>
