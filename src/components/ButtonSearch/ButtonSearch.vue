<template>
  <a-button type="primary" @click="handleClick"> 搜索 </a-button>
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
