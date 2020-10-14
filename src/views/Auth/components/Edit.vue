<template>
  <div>
    <a-modal title="查看" :visible="show" @cancel="handleCancel" :width="1000">
      <template #footer>
        <button-cancel @click="handleCancel" />
      </template>
      <a-skeleton v-show="pageLoading" active />
      <div v-show="!pageLoading">
        <a-form-model ref="form" :model="form">
          <a-row :gutter="gutter">
            <a-col v-bind="span">
              <a-form-model-item label="权限名称" prop="name">
                <a-input v-model="form.name" placeholder="权限名称" disabled />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="权限标识" prop="permission">
                <a-input v-model="form.permission" placeholder="权限标识" disabled />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    api: {
      type: String,
      default: ''
    }
  },
  watch: {
    show(newVal, oldVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.getDetail()
        })
      }
    }
  },
  data() {
    return {
      gutter: 48,
      span: {
        xs: 24,
        md: 12
      },
      pageLoading: false,
      confirmLoading: false,
      API: require(`@/api/${this.api}`),
      form: {
        name: '',
        permission: ''
      }
    }
  },
  methods: {
    getDetail() {
      this.pageLoading = true
      this.API.getById(this.id).then(res => {
        this.form = res.data
      }).finally(() => {
        this.pageLoading = false
      })
    },
    handleCancel() {
      this.$emit('update:show', false)
      this.pageLoading = false
    }
  }
}
</script>

<style scoped lang="less">
</style>
