<template>
  <div>
    <a-modal v-bind="editModal" :title="modalTitle" :visible="show" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel" :width="1000">
      <template #footer>
        <a-button @click="handleCancel">取消</a-button>
        <a-button v-if="act!==ACTIONS.Detail" type="primary" :loading="confirmLoading" @click="handleOk">确定</a-button>
      </template>
      <a-skeleton v-show="pageLoading" active />
      <div v-show="!pageLoading">
        <a-form-model ref="form" :rules="rules" :model="form">
          <a-row :gutter="gutter">
            <a-col v-bind="span">
              <a-form-model-item label="律所名称" prop="lawFirmName">
                <a-input v-model="form.lawFirmName" :disabled="disabled" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="地址" prop="address">
                <a-input v-model="form.address" :disabled="disabled" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="联系人" prop="linkman">
                <a-input v-model="form.linkman" :disabled="disabled" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="联系电话" prop="phone">
                <a-input-number v-model="form.phone" :disabled="disabled" placeholder="请输入" class="response" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="律所简介" prop="lawFirmDesc">
                <a-textarea placeholder="律所简介" :disabled="disabled" v-model="form.lawFirmDesc" :auto-size="{ minRows: 5, maxRows: 15 }" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="展示图片" prop="photographs">
                <img-upload :record="imgRecord" :value="form.photographs" @change="e=>form.photographs=e" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="展示视频" prop="videos">
                <file-upload :record="videoRecord" :value="form.videos" @change="e=>form.videos=e" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="附件" prop="resourceUrl">
                <file-upload :record="fileRecord" :value="form.resourceUrl" @change="e=>form.resourceUrl=e" />
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
import test from '@/utils/test'
import ImgUpload from '@/components/KFormDesign/packages/UploadImg'
import FileUpload from '@/components/KFormDesign/packages/UploadFile'

const validateRequired = { required: true, message: '必填项', trigger: ['change', 'blur'] }

export default {
  props: {
    act: {
      type: String,
      default: ''
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
    lawFirmList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    ImgUpload,
    FileUpload
  },
  watch: {
    show(newVal, oldVal) {
      this.$nextTick(() => this.$refs.form.resetFields())
      if (newVal && ['edit', 'detail'].includes(this.act)) {
        this.getDetail()
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
    imgRecord() {
      return {
        key: new Date().getTime(),
        model: 'upload',
        options: {
          limit: 3,
          listType: 'picture-card',
          disabled: this.disabled
        }
      }
    },
    videoRecord() {
      return {
        options: {
          limit: 1,
          disabled: this.disabled
        }
      }
    },
    fileRecord() {
      return {
        options: {
          limit: 1000,
          disabled: this.disabled
        }
      }
    },
    modalTitle() {
      let title = ''
      if (this.act === 'edit') {
        title = '修改'
      } else if (this.act === 'detail') {
        title = '查看'
      } else if (this.act === 'add') {
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
      ACTIONS,
      gutter: 48,
      span: {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 6
      },
      form: {
        address: '',
        lammyCompany: '',
        lammyDept: '',
        lawFirmDesc: '',
        lawFirmName: '',
        linkman: '',
        phone: '',
        photographs: [],
        resourceUrl: [],
        videos: []
      },
      rules: {
        lawFirmName: [validateRequired],
        address: [validateRequired],
        linkman: [validateRequired],
        lawFirmDesc: [validateRequired],
        phone: [
          validateRequired,
          {
            validator: (rule, value, callback) => {
              if (test.mobile(value)) callback()
              else callback(new Error(this.$t('message.form.validate.mobile.fail')))
            },
            trigger: 'blur'
          }
        ]
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
        } else if (this.act === ACTIONS.Add) { // 新增
          this.API.create(this.form).then(res => {
            this.requestSuccess()
          }).finally(() => {
            this.confirmLoading = false
          })
        }
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
