<template>
  <a-button type="primary" :loading="loading" @click="handleClick"> 导出 </a-button>
</template>

<script>
export default {
  name: 'ButtonExport',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style>
</style>
