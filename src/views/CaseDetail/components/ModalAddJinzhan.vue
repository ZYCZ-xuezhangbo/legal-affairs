<template>
  <div>
    <a-modal title="新增进展" ok-text="提交" :visible="show" :confirm-loading="submitLoading" @ok="handleClose" @cancel="handleClose">
      TODO
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      submitLoading: false
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
</style>
