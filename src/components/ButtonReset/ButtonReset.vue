<template>
  <a-button @click="handleClick">
    <slot> 重置 </slot>
  </a-button>
</template>

<script>
export default {
  name: 'ButtonReset',
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style>
</style>
