<template>
  <a-button type="primary" @click="handleClick">
    <slot> 新建 </slot>
  </a-button>
</template>

<script>
export default {
  name: 'ButtonAdd',
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style>
</style>
