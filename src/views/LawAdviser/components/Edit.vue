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
            <a-col v-bind="span">
              <a-form-model-item label="头像" prop="portrait">
                <ImgUpload :record="portraitRecord" :value="form.portrait" @change="e=>form.portrait=e" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="公司" prop="company">
                <a-select v-model="form.company" :disabled="disabled">
                  <a-select-option v-for="(item,index) in dict.COMPANY" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="部门" prop="dept">
                <a-select v-model="form.dept" :disabled="disabled">
                  <a-select-option v-for="(item,index) in dict.DEPT" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="用户名" prop="userName">
                <a-select v-model="form.userName" :disabled="disabled">
                  <a-select-option v-for="(item,index) in dict.USERNAME" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="姓名" prop="name">
                <a-input v-model="form.name" placeholder="请输入" :disabled="disabled" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="性别" prop="gender">
                <a-radio-group name="gender" v-model="form.gender" :disabled="disabled">
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
              <a-form-model-item label="出生日期" prop="birthDate">
                <a-date-picker v-model="form.birthDate" :disabled="disabled" inputReadOnly @change="(e,str)=>form.birthDate=str" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="顾问类别" prop="counselorType">
                <a-select v-model="form.counselorType" :disabled="disabled">
                  <a-select-option v-for="(item,index) in dict.LAW" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="是否法学类专业" prop="legalMajor">
                <a-radio-group name="legalMajor" :disabled="disabled" v-model="form.legalMajor">
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
              <a-form-model-item label="学校" prop="school">
                <a-input v-model="form.school" :disabled="disabled" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="专业名称" prop="majorName">
                <a-input v-model="form.majorName" :disabled="disabled" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="职务" prop="duty">
                <a-input v-model="form.duty" :disabled="disabled" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="是否专职" prop="fullTime">
                <a-radio-group name="fullTime" :disabled="disabled" v-model="form.fullTime">
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
              <a-form-model-item label="办公室电话" prop="officePhone">
                <a-input v-model="form.officePhone" :disabled="disabled" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="是否具备法律职业资格" prop="professionStatus">
                <a-radio-group name="professionStatus" :disabled="disabled" v-model="form.professionStatus">
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
              <a-form-model-item label="法律职业资格证书编号" prop="legalCertificateNumber">
                <a-input v-model="form.legalCertificateNumber" :disabled="disabled || form.professionStatus==='0'" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="是否有企业法律顾问职业资格" prop="legalProfession">
                <a-radio-group name="legalProfession" :disabled="disabled" v-model="form.legalProfession">
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
              <a-form-model-item label="企业法律顾问职业资格证书编号" prop="certificateNumber">
                <a-input v-model="form.certificateNumber" :disabled="disabled || form.legalProfession==='0'" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="顾问职业岗位等级资格" prop="professionGrade">
                <a-select v-model="form.professionGrade" :disabled="disabled || form.legalProfession==='0'">
                  <a-select-option v-for="(item,index) in dict.POST" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="分管工作" prop="work">
                <a-textarea placeholder="分管工作" :disabled="disabled" :auto-size="{ minRows: 3, maxRows: 10 }" v-model="form.work" />
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
        return {}
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
      if (newVal && [ACTIONS.Edit, ACTIONS.Detail].includes(this.act)) {
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
    portraitRecord() {
      return {
        key: new Date().getTime(),
        model: 'upload',
        options: {
          limit: 1,
          listType: 'picture-card',
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
      return this.act === ACTIONS.Detail && this.id !== ''
    },
    rules() {
      return {
        birthDate: [validateRequired],
        certificateNumber: [this.form.legalProfession === '0' ? {} : validateRequired],
        professionGrade: [this.form.legalProfession === '0' ? {} : validateRequired],
        company: [validateRequired],
        counselorType: [validateRequired],
        dept: [validateRequired],
        duty: [validateRequired],
        fullTime: [validateRequired],
        gender: [validateRequired],
        lammyCompany: [validateRequired],
        lammyDept: [validateRequired],
        legalCertificateNumber: [this.form.professionStatus === '0' ? {} : validateRequired],
        legalMajor: [validateRequired],
        legalProfession: [validateRequired],
        majorName: [validateRequired],
        name: [validateRequired],
        officePhone: [validateRequired],
        professionStatus: [validateRequired],
        school: [validateRequired],
        userName: [validateRequired],
        work: [validateRequired]
      }
    }
  },
  data() {
    return {
      gutter: 48,
      span: {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 6
      },
      form: {
        birthDate: '',
        certificateNumber: '',
        company: '',
        counselorType: '',
        dept: '',
        duty: '',
        fullTime: '',
        gender: '1',
        lammyCompany: '',
        lammyDept: '',
        legalCertificateNumber: '',
        legalMajor: '',
        legalProfession: '0',
        majorName: '',
        name: '',
        officePhone: '',
        portrait: [],
        professionGrade: '',
        professionStatus: '0',
        resourceUrl: [],
        school: '',
        userName: '',
        work: ''
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
