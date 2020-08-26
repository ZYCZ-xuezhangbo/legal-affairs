<template>
  <div>
    <a-modal v-bind="editModal" :title="title" :visible="show" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel" :width="1000">
      <template #footer>
        <a-button @click="handleCancel">{{ act===ACTIONS.Detail?'关闭':'取消' }}</a-button>
        <a-button v-if="act!==ACTIONS.Detail" type="primary" @click="handleOk">确定</a-button>
      </template>
      <a-skeleton v-show="pageLoading" active />
      <div v-show="!pageLoading">
        <a-form-model ref="form" :rules="rules" :model="form">
          <a-row :gutter="gutter">
            <a-col v-bind="span">
              <a-form-model-item label="头像" prop="portrait">
                <template #help> {{ $t('help.upload.avatar') }} </template>
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
                <a-input v-model="form.name" :disabled="disabled" placeholder="请输入" />
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
              <a-form-model-item label="出生日期" prop="birthDate">
                <a-date-picker v-model="form.birthDate" :disabled="disabled" inputReadOnly @change="(e,str)=>form.birthDate=str" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="开始参加工作时间" prop="joinWork">
                <a-date-picker v-model="form.joinWork" :disabled="disabled" @change="(e,str)=>form.joinWork=str" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="办公室电话" prop="officePhone">
                <a-input v-model="form.officePhone" :disabled="disabled" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="手机" prop="phone">
                <a-input v-model="form.phone" :disabled="disabled" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="学历" prop="educationBackground">
                <a-input v-model="form.educationBackground" :disabled="disabled" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="学制" prop="educationalSystem">
                <a-input v-model="form.educationalSystem" :disabled="disabled" placeholder="请输入" />
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
              <a-form-model-item label="法学类专业" prop="legalMajor">
                <a-radio-group name="gender" :disabled="disabled" v-model="form.legalMajor">
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
              <a-form-model-item label="岗位名称" prop="postName">
                <a-input v-model="form.postName" :disabled="disabled" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="岗级" prop="postLevel">
                <a-select v-model="form.postLevel" :disabled="disabled">
                  <a-select-option v-for="(item,index) in dict.POST" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="负责工作" prop="work">
                <a-input v-model="form.work" :disabled="disabled" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="开始任职时间" prop="employmentPeriod">
                <a-date-picker v-model="form.employmentPeriod" :disabled="disabled" inputReadOnly @change="(e,str)=>form.joinemploymentPeriodWork=str" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="专职" prop="fullTime">
                <a-radio-group name="fullTime" v-model="form.fullTime" :disabled="disabled">
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
              <a-form-model-item label="是否具备法律职业资格" prop="legalProfession">
                <a-radio-group name="legalProfession" v-model="form.legalProfession" :disabled="disabled">
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
              <a-form-model-item label="法律职业资格证书编号" prop="certificateNumber">
                <a-input v-model="form.certificateNumber" :disabled="disabled" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="是否有企业法律顾问职业资格" prop="enterpriseProfession">
                <a-radio-group name="enterpriseProfession" v-model="form.enterpriseProfession" :disabled="disabled">
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
              <a-form-model-item label="企业法律顾问职业资格证书编号" prop="enterpriseNumber">
                <a-input v-model="form.enterpriseNumber" :disabled="disabled" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="顾问职业岗位等级资格" prop="professionGrade">
                <a-select v-model="form.professionGrade" :disabled="disabled">
                  <a-select-option v-for="(item,index) in dict.GRADE" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="附件">
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
      if (newVal && [ACTIONS.Detail, ACTIONS.Edit].includes(this.act)) {
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
    disabled() {
      return this.act === ACTIONS.Detail
    },
    title() {
      let title = ''
      if (this.act === ACTIONS.Detail) {
        title = '查看'
      } else if (this.act === ACTIONS.Edit) {
        title = '修改'
      } else if (this.act === ACTIONS.Add) {
        title = '新增'
      }
      return title
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
        birthDate: '',
        certificateNumber: '',
        company: '',
        dept: '',
        educationBackground: '',
        educationalSystem: '',
        employmentPeriod: '',
        enterpriseNumber: '',
        enterpriseProfession: '',
        fullTime: '',
        gender: '',
        joinWork: '',
        lammyCompany: '',
        lammyDept: '',
        legalMajor: '',
        legalProfession: '',
        majorName: '',
        name: '',
        officePhone: '',
        phone: '',
        portrait: [],
        postLevel: '',
        postName: '',
        professionGrade: '',
        resourceUrl: [],
        school: '',
        userName: '',
        work: ''
      },
      rules: {
        birthDate: [validateRequired],
        certificateNumber: [validateRequired],
        company: [validateRequired],
        dept: [validateRequired],
        educationBackground: [validateRequired],
        educationalSystem: [validateRequired],
        employmentPeriod: [validateRequired],
        enterpriseNumber: [validateRequired],
        enterpriseProfession: [validateRequired],
        fullTime: [validateRequired],
        gender: [validateRequired],
        joinWork: [validateRequired],
        lammyCompany: [validateRequired],
        lammyDept: [validateRequired],
        legalMajor: [validateRequired],
        legalProfession: [validateRequired],
        majorName: [validateRequired],
        name: [validateRequired],
        officePhone: [validateRequired],
        phone: [validateRequired],
        portrait: [validateRequired],
        postLevel: [validateRequired],
        postName: [validateRequired],
        professionGrade: [validateRequired],
        school: [validateRequired],
        userName: [validateRequired],
        work: [validateRequired]
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
