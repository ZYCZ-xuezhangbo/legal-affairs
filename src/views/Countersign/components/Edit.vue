<template>
  <div>
    <a-modal v-bind="editModal" :title="modalTitle" :visible="show" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel" :width="1000">
      <template v-if="act==='detail'" #footer>
        <a-button @click="$emit('close')">关闭</a-button>
      </template>
      <a-skeleton v-show="pageLoading" active />
      <div v-show="!pageLoading">
        <a-form-model ref="form" :rules="rules" :model="form">
          <a-row :gutter="gutter">
            <a-col :span="24">
              <a-form-model-item label="会签名称" prop="name">
                <a-input v-model="form.name" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="审核意见" prop="opinion">
                <a-textarea v-model="form.opinion" :auto-size="{ minRows: 5, maxRows: 15 }" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="接收人部门" prop="recipientDepartment">
                <a-select v-model="form.recipientDepartment" :disabled="disabled">
                  <a-select-option v-for="(item,index) in dict.RECIPIENTDEPT" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="接收人" prop="recipient">
                <a-select v-model="form.recipient" :disabled="disabled">
                  <a-select-option v-for="(item,index) in dict.RECIPIENT" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="附件" prop="resourceUrl">
                <FileUpload :record="fileRecord" :value="form.resourceUrl" @change="e=>form.resourceUrl=e" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { ACTIONS } from '@/store/mutation-types'
import FileUpload from '@/components/KFormDesign/packages/UploadFile'

const validateRequired = { required: true, message: '必填项', trigger: ['change', 'blur'] }

export default {
  components: {
    FileUpload
  },
  props: {
    act: {
      type: String,
      default: ''
    },
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
    },
    dict: {
      type: Object,
      default() {
        return {
          RECIPIENTDEPT: [], // 接收人部门
          RECIPIENT: [] // 接收人
        }
      }
    }
  },
  watch: {
    show(newVal, oldVal) {
      if (newVal && [ACTIONS.Edit].includes(this.act)) {
        this.getDetail()
      } else if (newVal && this.act === ACTIONS.Add) {
        this.$nextTick(() => {
          this.$refs.form.resetFields()
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
    },
    fileRecord() {
      return {
        options: {
          defaultValue: this.form.resourceUrl,
          downloadWay: 'a',
          width: '100%',
          limit: 1000,
          fileName: 'file',
          action: this.$uploadFileUrl,
          disabled: this.disabled
        }
      }
    },
    modalTitle() {
      let title = ''
      if (this.act === ACTIONS.Edit) {
        title = '修改'
      } else if (this.act === ACTIONS.Detail) {
        title = '查看'
      } else if (this.act === ACTIONS.Add) {
        title = '新增'
      }
      return title
    },
    disabled() {
      return this.act === 'detail' && this.id !== ''
    }
  },
  data() {
    return {
      gutter: 48,
      span: {
        xs: 24,
        sm: 12
      },
      form: {
        lammyCompany: '',
        lammyDept: '',
        name: '',
        opinion: '',
        recipient: '',
        recipientDepartment: '',
        resourceUrl: []
      },
      rules: {
        birthDate: [validateRequired],
        lammyCompany: [validateRequired],
        lammyDept: [validateRequired],
        name: [validateRequired],
        opinion: [validateRequired],
        recipient: [validateRequired],
        recipientDepartment: [validateRequired]
      },
      pageLoading: false,
      confirmLoading: false,
      API: require(`@/api/${this.api}`)
    }
  },
  methods: {
    handleOk() {
      this.$refs.form.validate().then(formData => {
        this.confirmLoading = true
        if (this.act === ACTIONS.Edit) { // 修改
          this.API.update({ id: this.id, ...this.form }).then(res => {
            this.requestSuccess()
          }).finally(() => {
            this.confirmLoading = false
          })
        } else { // 新增
          this.API.create(this.form).then(res => {
            this.requestSuccess()
          }).finally(() => {
            this.confirmLoading = false
          })
        }
      }).catch(() => {
        this.$message.warning(this.$t('message.form.validate.fail'))
      })
    },
    getDetail() {
      this.pageLoading = true
      this.API.getById(this.id).then(res => {
        this.form = res.data
      }).finally(() => {
        this.pageLoading = false
      })
    },
    handleCancel() {
      this.$emit('close')
      this.pageLoading = false
    },
    requestSuccess() {
      this.$emit('success')
      this.$emit('close')
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style>
</style>
