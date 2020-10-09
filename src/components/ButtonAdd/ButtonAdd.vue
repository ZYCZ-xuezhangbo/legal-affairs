<template>
  <a-button type="primary" @click="handleClick"> 新建 </a-button>
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
