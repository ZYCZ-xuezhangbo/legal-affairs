<template>
  <div>
    <a-modal :title="title" ok-text="提交" :visible="show" :confirm-loading="confirmLoading" @ok="handleSubmit" @cancel="handleClose">
      <a-form-model ref="form" :model="form" :rules="rules">
        <a-form-model-item label="回款金额" prop="returnedMoney">
          <a-input-number v-model="form.returnedMoney" :precision="2" :min="0" placeholder="回款金额" class="response" />
        </a-form-model-item>
        <a-form-model-item label="回款日期" prop="returnedTime">
          <a-date-picker v-model="form.returnedTime" inputReadOnly @change="(e,str)=>form.returnedTime=str" class="response" />
        </a-form-model-item>
        <a-form-model-item label="附件" prop="resourceUrl">
          <UploadFile :value="form.resourceUrl" :record="uploadFileRecord" @change="e=>form.caseAccessory=e" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { create as httpCreate, update as httpUpdate } from '@/api/caseReturned'
import UploadFile from '@/components/KFormDesign/packages/UploadFile'

export default {
  components: {
    UploadFile
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default() {
        return {}
      }
    },
    caseFolderId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      confirmLoading: false,
      form: {
        id: '',
        resourceUrl: [],
        returnedMoney: 0,
        returnedTime: ''
      },
      uploadFileRecord: {
        options: {
          downloadWay: 'a',
          limit: 1000,
          fileName: 'file',
          action: this.$uploadFileUrl
        }
      },
      rules: {
        returnedMoney: [
          { required: true, message: '必填项', trigger: 'blur' }
        ],
        returnedTime: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  watch: {
    info(val) {
      this.form = val
    },
    isEdit(val) {
      if (!val) {
        this.form = {}
      }
    }
  },
  computed: {
    title() {
      return this.isEdit ? '修改回款' : '新增回款'
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate().then(() => {
        if (this.isEdit) {
          this.confirmLoading = true
          httpUpdate(this.form).then(res => {
            this.handleClose()
            this.$emit('reload')
          }).finally(() => {
            this.confirmLoading = false
          })
        } else {
          this.confirmLoading = true
          httpCreate({ caseFolderId: this.caseFolderId, ...this.form }).then(res => {
            this.handleClose()
            this.$emit('reload')
          }).finally(() => {
            this.confirmLoading = false
          })
        }
      })
    },
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style>
</style>
