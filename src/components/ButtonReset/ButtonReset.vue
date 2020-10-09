<template>
  <a-button @click="handleClick"> 重置 </a-button>
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
