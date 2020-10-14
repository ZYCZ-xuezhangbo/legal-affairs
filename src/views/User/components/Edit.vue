<template>
  <div>
    <a-modal v-bind="editModal" title="关联角色" :visible="show" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel" :width="1000">
      <a-skeleton v-show="pageLoading" active />
      <div v-show="!pageLoading">
        <a-form-model ref="form" :rules="rules" :model="form">
          <a-row>
            <a-col>
              <a-form-model-item label="" prop="roleIdList">
                <a-checkbox-group :options="roleAllList" v-model="form.roleIdList" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { requiredOfArray } from '@/utils/formValidate'

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
    show(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.getDetail()
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
      pageLoading: false,
      confirmLoading: false,
      API: require(`@/api/${this.api}`),
      roleAllList: [],
      form: {
        roleIdList: []
      },
      rules: {
        roleIdList: [requiredOfArray]
      }
    }
  },
  methods: {
    handleOk() {
      this.$refs.form.validate().then(() => {
        this.confirmLoading = true
        this.API.update({ id: this.id, ...this.form }).then(res => {
          this.requestSuccess()
        }).finally(() => {
          this.confirmLoading = false
        })
      })
    },
    getDetail() {
      this.pageLoading = true
      this.API.getById(this.id).then(res => {
        const roleList = res.data.userRoleDTOList
        this.roleAllList = roleList.map(v => ({ value: v.id, label: v.roleMsg }))
        this.form.roleIdList = roleList.filter(v => v.userOwned).map(v => (v.id))
      }).finally(() => {
        this.pageLoading = false
      })
    },
    handleCancel() {
      this.$emit('update:show', false)
      this.pageLoading = false
    },
    requestSuccess() {
      this.$emit('success')
      this.handleCancel()
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style>
</style>
