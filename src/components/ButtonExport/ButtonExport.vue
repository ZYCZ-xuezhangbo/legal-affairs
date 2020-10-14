<template>
  <a-button type="primary" :loading="loading" @click="handleClick">
    <slot>{{ btnText }}</slot>
  </a-button>
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
  computed: {
    btnText() {
      return this.loading ? '导出中...' : '导出'
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
