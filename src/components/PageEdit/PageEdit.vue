<template>
  <div>
    <a-modal v-bind="editModal" :title="isEdit?'编辑':'新建'" :visible="show" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel" :width="1000">
      <k-form-build ref="form" :value="formData" :dynamic-data="dynamicData" />
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    id: {
      type: [String, Number],
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    api: {
      type: String,
      default: ''
    },
    formData: {
      type: Object,
      default() {
        return {}
      }
    },
    dynamicData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    show(newVal, oldVal) {
      if (newVal && this.isEdit) {
        this.getDetail()
      } else if (newVal && !this.isEdit) {
        this.$nextTick(() => {
          this.$refs.form.reset()
        })
      }
    }
  },
  computed: {
    editModal() {
      if (this.confirmLoading) {
        return {
          closable: false,
          keyboard: false,
          maskClosable: false
        }
      }
      return ''
    }
  },
  data() {
    return {
      confirmLoading: false,
      API: require(`@/api/${this.api}`)
    }
  },
  methods: {
    handleOk() {
      this.$refs.form.getData().then(formData => {
        this.confirmLoading = true
        if (this.isEdit) { // 修改
          this.API.update({ id: this.id, ...formData }).then(res => {
            this.requestSuccess(res.msg)
          }).finally(() => {
            this.confirmLoading = false
          })
        } else { // 新增
          this.API.create(formData).then(res => {
            this.requestSuccess(res.msg)
          }).finally(() => {
            this.confirmLoading = false
          })
        }
      })
    },
    getDetail() {
      const pageLoading = this.$message.loading(this.$t('messageLoadingText'), 0)
      this.API.getById(this.id).then(res => {
        this.$refs.form.setData(res.data).catch(e => console.log(e))
      }).finally(() => {
        setTimeout(pageLoading, 0)
      })
    },
    handleCancel() {
      this.$emit('close')
      this.pageLoading = false
    },
    requestSuccess(msg) {
      this.$message.success(msg)
      this.$emit('success')
      this.$emit('close')
      this.$refs.form.reset()
    }
  }
}
</script>

<style>
</style>
