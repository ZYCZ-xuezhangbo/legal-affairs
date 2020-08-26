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
              <a-form-model-item label="律师名称" prop="lawName">
                <a-input v-model="form.lawName" :disabled="disabled" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="性别" prop="gender">
                <a-radio-group name="gender" :disabled="disabled" v-model="form.gender">
                  <a-radio value="1">
                    男
                  </a-radio>
                  <a-radio value="0">
                    女
                  </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="年龄" prop="age">
                <a-input-number v-model="form.age" :disabled="disabled" placeholder="请输入" class="response" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="学历" prop="educationBackground">
                <a-input v-model="form.educationBackground" :disabled="disabled" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="执业年限" prop="professionalLife">
                <a-input-number v-model="form.professionalLife" :disabled="disabled" placeholder="请输入" class="response" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="是否具有企业法律职业资格" prop="legalProfession">
                <a-radio-group name="radioGroup" v-model="form.legalProfession">
                  <a-radio value="1">
                    是
                  </a-radio>
                  <a-radio value="0">
                    否
                  </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="专业" prop="major">
                <a-input v-model="form.major" :disabled="disabled" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="联系电话" prop="phone">
                <a-input-number v-model="form.phone" :disabled="disabled" placeholder="请输入" class="response" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="所属律所" prop="outsideLawFirmName">
                <a-select v-model="form.outsideLawFirmName" :disabled="disabled">
                  <a-select-option :value="item.code" v-for="(item,index) in lawFirmList" :key="index">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="主要服务内容" prop="serviceContent">
                <a-textarea placeholder="主要服务内容" :disabled="disabled" v-model="form.serviceContent" :auto-size="{ minRows: 2, maxRows: 6 }" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="展示视频" prop="videos">
                <FileUpload :record="fileRecord" :value="form.videos" @change="e=>form.videos=e" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="展示图片" prop="photographs">
                <ImgUpload :record="portraitRecord" :value="form.photographs" @change="e=>form.photographs=e" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="文件" prop="resourceUrl">
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
      if (newVal && ['edit', 'detail'].includes(this.act)) {
        this.getDetail()
      } else if (newVal && this.act === 'add') {
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
    portraitRecord() {
      return {
        key: new Date().getTime(),
        model: 'upload',
        options: {
          action: this.$uploadImageUrl,
          defaultValue: [],
          fileName: 'image',
          limit: 1,
          listType: 'picture-card',
          width: '100%',
          disabled: this.disabled
        }
      }
    },
    fileRecord() {
      return {
        options: {
          defaultValue: [],
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
        age: 0,
        educationBackground: '',
        gender: '1',
        lammyCompany: '',
        lammyDept: '',
        lawName: '',
        legalProfession: '',
        major: '',
        outsideLawFirmName: '',
        phone: '',
        photographs: [],
        professionalLife: 0,
        resourceUrl: [],
        serviceContent: '',
        videos: []
      },
      rules: {
        age: [validateRequired],
        educationBackground: [validateRequired],
        gender: [validateRequired],
        lammyCompany: [validateRequired],
        lammyDept: [validateRequired],
        lawName: [validateRequired],
        legalProfession: [validateRequired],
        major: [validateRequired],
        outsideLawFirmName: [validateRequired],
        professionalLife: [validateRequired],
        serviceContent: [validateRequired],
        phone: [
          validateRequired,
          {
            validator: (rule, value, callback) => {
              if (!value || value === '') {
                callback()
              } else {
                if (test.mobile(value)) callback()
                else callback(new Error(this.$t('message.form.validate.mobile.fail')))
              }
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
