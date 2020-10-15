<template>
  <a-button type="primary" @click="handleClick">
    <slot> 搜索 </slot>
  </a-button>
</template>

<script>
export default {
  name: 'ButtonSearch',
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style>
</style>
