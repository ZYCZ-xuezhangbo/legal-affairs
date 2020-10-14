<template>
  <a-button v-if="show" :loading="loading" type="primary" @click="handleClick"> 确定 </a-button>
</template>

<script>
export default {
  name: 'ButtonConfirm',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: true
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
