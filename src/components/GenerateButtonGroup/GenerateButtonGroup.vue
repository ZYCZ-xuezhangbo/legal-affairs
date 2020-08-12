<template>
  <div>
    <a-row :gutter="12" v-bind="rowModel" :class="isMobile?'mobile':'row'">
      <a-col>
        <a-button type="primary" @click="handleSubmit" :loading="submitLoading" :block="isMobile" :disabled="submitLoading?false:buttonsDisabled">提交</a-button>
        <a-button @click="handleReset" :block="isMobile" :disabled="buttonsDisabled">重置</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  props: {
    submitLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.app.isMobile
    },
    rowModel() {
      let item = {}
      if (!this.$store.state.app.isMobile) {
        item = {
          type: 'flex',
          justify: 'center',
          align: 'middle'
        }
      }
      return item
    },
    buttonsDisabled() {
      return this.submitLoading
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit')
    },
    handleReset() {
      this.$emit('reset')
    }
  }
}
</script>

<style lang="less" socped>
.row /deep/ button {
  margin-right: 12px;
}
.mobile {
  /deep/ button {
    margin-bottom: 12px;
    margin-left: 0 !important;
  }
}
</style>
