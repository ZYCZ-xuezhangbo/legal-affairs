<template>
  <div>
    <a-modal title="新增进展" ok-text="提交" :visible="show" :confirm-loading="submitLoading" width="1000px" @ok="handleSubmit" @cancel="handleClose">
      <a-form-model ref="form" :model="form" :rules="rules">
        <a-row :gutter="48">
          <a-col :md="24" :lg="12">
            <a-form-model-item label="进展状态" prop="progressStatus">
              <a-select v-model="form.progressStatus" placeholder="进展状态">
                <a-select-option v-for="(item,index) in caseProStatus" :key="index" :value="item.code">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :md="24" :lg="12">
            <a-form-model-item label="进展时间" prop="progressTime">
              <a-date-picker v-model="form.progressTime" inputReadOnly @change="(e,str)=>form.progressTime=str" class="response" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="内容" prop="content">
              <a-textarea v-model="form.content" :auto-size="{ minRows: 5, maxRows: 10 }" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="附件" prop="resourceUrl">
              <UploadFile :value="form.resourceUrl" :record="uploadFileRecord" @change="e=>form.resourceUrl=e" />
            </a-form-model-item>
          </a-col>
          <a-col :md="24" :lg="12">
            <a-form-model-item label="是否提醒" prop="remind">
              <a-checkbox v-model="form.remind">
                提醒
              </a-checkbox>
            </a-form-model-item>
          </a-col>
          <a-col :md="24" :lg="12">
            <a-form-model-item label="提醒时间" prop="remindTime">
              <a-date-picker v-model="form.remindTime" inputReadOnly @change="(e,str)=>form.remindTime=str" class="response" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { create as httpCreate } from '@/api/caseProgress'
import UploadFile from '@/components/KFormDesign/packages/UploadFile'

const validateRequired = { required: true, message: '必填项', trigger: ['change', 'blur'] }

export default {
  components: {
    UploadFile
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    caseId: {
      type: String,
      default: ''
    },
    caseProStatus: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      submitLoading: false,
      form: {
        content: '',
        progressStatus: '',
        progressTime: '',
        remind: false,
        remindTime: '',
        resourceUrl: []
      },
      uploadFileRecord: {
        options: {
          downloadWay: 'a',
          limit: 1000,
          fileName: 'file'
        }
      }
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.form.resetFields()
        })
      }
    }
  },
  computed: {
    rules() {
      return {
        content: [validateRequired],
        progressStatus: [validateRequired],
        progressTime: [validateRequired],
        remindTime: [
          { required: this.form.remind, message: '必填项', trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleSubmit() {
      this.$refs.form.validate().then(() => {
        this.submitLoading = true

        httpCreate({ caseId: this.caseId, ...this.form }).then(() => {
          this.$emit('reload')
          this.handleClose()
        }).finally(() => {
          this.submitLoading = false
        })
      })
    }
  }
}
</script>

<style scoped>
</style>
