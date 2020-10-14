<template>
  <a-button @click="handleClick">
    <slot>关闭</slot>
  </a-button>
</template>

<script>
export default {
  name: 'ButtonCancel',
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style>
</style>
