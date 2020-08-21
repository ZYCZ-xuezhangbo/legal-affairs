<template>
  <div>
    <a-modal title="终结" :visible="show" @cancel="handleClose">
      <template #footer>
        <a-button v-if="isEdit" type="primary" :loading="submitLoading" @click="handleSubmit">保存</a-button>
        <a-button @click="handleClose">取消</a-button>
      </template>

      <a-skeleton v-show="pageLoading" active />
      <div v-show="!pageLoading">
        <a-form-model ref="form" :model="form">
          <a-form-model-item label="" prop="content">
            <a-textarea v-model="form.content" :disabled="!isEdit" :auto-size="{ minRows: 5, maxRows: 10 }" />
          </a-form-model-item>
          <a-form-model-item label="附件" prop="resourceUrl">
            <UploadFile :value="form.resourceUrl" :record="uploadFileRecord" @change="e=>form.resourceUrl=e" />
          </a-form-model-item>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { create as httpCreate, getByCaseFolderId as httpGetInfo } from '@/api/caseFinality'
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
    caseFolderId: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      pageLoading: false,
      form: {
        content: '',
        resourceUrl: []
      },
      submitLoading: false

    }
  },
  computed: {
    uploadFileRecord() {
      return {
        options: {
          title: '上传',
          downloadWay: 'a',
          limit: 1000,
          fileName: 'file',
          action: this.$uploadFileUrl,
          disabled: !this.isEdit
        }
      }
    }
  },
  watch: {
    show(val) {
      if (val && !this.isEdit) {
        this.pageLoading = true
        httpGetInfo(this.caseFolderId).then(res => {
          this.form = res.data
        }).finally(() => {
          this.pageLoading = false
        })
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
      this.$refs.form.resetFields()
    },
    handleSubmit() {
      this.submitLoading = true
      httpCreate({ caseFolderId: this.caseFolderId, ...this.form }).then(res => {
        this.handleClose()
        this.$emit('reload')
      }).finally(() => {
        this.submitLoading = false
      })
    }
  }
}
</script>

<style>
</style>
