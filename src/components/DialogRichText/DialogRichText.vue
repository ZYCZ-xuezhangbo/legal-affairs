<template>
  <a-modal title="预览" :visible="show" :width="1000" @cancel="handleClose">
    <template #footer>
      <a-button @click="handleClose">关闭</a-button>
    </template>
    <a-skeleton v-show="curContent===''" active />
    <div v-show="curContent!==''" v-html="curContent"></div>
  </a-modal>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      curContent: this.content
    }
  },
  watch: {
    content(val) {
      this.$nextTick(() => {
        this.curContent = val
      })
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style>
</style>
