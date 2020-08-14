<template>
  <div>
    <a-modal v-bind="editModal" :title="isEdit?'编辑':'新建'" :visible="show" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel" :width="1000">
      <a-skeleton v-show="pageLoading" active />
      <div v-show="!pageLoading">
        <a-form-model ref="form" :model="form">
          <a-row :gutter="gutter">
            <a-col v-bind="span">
              <a-form-model-item label="头像" prop="portrait">
                <ImgUpload :record="portraitRecord" :value="form.portrait" @change="e=>form.portrait=e" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="公司" prop="company">
                <a-select v-model="form.company">
                  <a-select-option value="0">
                    公司0
                  </a-select-option>
                  <a-select-option value="1">
                    公司1
                  </a-select-option>
                  <a-select-option value="2">
                    公司2
                  </a-select-option>
                  <a-select-option value="3">
                    公司3
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="部门" prop="dept">
                <a-select v-model="form.dept">
                  <a-select-option value="0">
                    部门0
                  </a-select-option>
                  <a-select-option value="1">
                    部门1
                  </a-select-option>
                  <a-select-option value="2">
                    部门2
                  </a-select-option>
                  <a-select-option value="3">
                    部门3
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="用户名" prop="userName">
                <a-select v-model="form.userName">
                  <a-select-option value="0">
                    用户名0
                  </a-select-option>
                  <a-select-option value="1">
                    用户名1
                  </a-select-option>
                  <a-select-option value="2">
                    用户名2
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="姓名" prop="name">
                <a-input v-model="form.name" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="性别" prop="gender">
                <a-radio-group name="gender" v-model="form.gender">
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
                <a-date-picker v-model="form.birthDate" inputReadOnly @change="(e,str)=>form.birthDate=str" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="开始参加工作时间" prop="joinWork">
                <a-date-picker v-model="form.joinWork" @change="(e,str)=>form.joinWork=str" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="办公室电话" prop="officePhone">
                <a-input v-model="form.officePhone" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="手机" prop="phone">
                <a-input v-model="form.phone" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="学历" prop="educationBackground">
                <a-input v-model="form.educationBackground" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="学制" prop="educationalSystem">
                <a-input v-model="form.educationalSystem" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="学校" prop="school">
                <a-input v-model="form.school" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="专业名称" prop="majorName">
                <a-input v-model="form.majorName" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="法学类专业" prop="legalMajor">
                <a-radio-group name="gender" v-model="form.legalMajor">
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
                <a-input v-model="form.postName" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="岗级" prop="postLevel">
                <a-select v-model="form.postLevel">
                  <a-select-option value="0">
                    岗级0
                  </a-select-option>
                  <a-select-option value="1">
                    岗级11
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="负责工作" prop="work">
                <a-input v-model="form.work" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="开始任职时间" prop="employmentPeriod">
                <a-date-picker v-model="form.employmentPeriod" inputReadOnly @change="(e,str)=>form.joinemploymentPeriodWork=str" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="专职" prop="fullTime">
                <a-radio-group name="fullTime" v-model="form.fullTime">
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
                <a-radio-group name="legalProfession" v-model="form.legalProfession">
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
                <a-input v-model="form.certificateNumber" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="是否有企业法律顾问职业资格" prop="enterpriseProfession">
                <a-radio-group name="enterpriseProfession" v-model="form.enterpriseProfession">
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
                <a-input v-model="form.enterpriseNumber" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="顾问职业岗位等级资格" prop="professionGrade">
                <a-select v-model="form.professionGrade">
                  <a-select-option value="0">
                    等级0
                  </a-select-option>
                  <a-select-option value="1">
                    等级1
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
import ImgUpload from '@/components/KFormDesign/packages/UploadImg'
import FileUpload from '@/components/KFormDesign/packages/UploadFile'

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
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
    }
  },
  components: {
    ImgUpload,
    FileUpload
  },
  watch: {
    show(newVal, oldVal) {
      if (newVal && this.isEdit) {
        this.getDetail()
      } else if (newVal && !this.isEdit) {
        this.$nextTick(() => {
          this.form = {}
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
          defaultValue: this.form.portrait,
          fileName: 'image',
          limit: 1,
          listType: 'picture-card',
          width: '100%'
        }
      }
    },
    fileRecord() {
      return {
        options: {
          defaultValue: this.form.resourceUrl,
          downloadWay: 'a',
          width: '100%',
          limit: 1000,
          fileName: 'file',
          action: this.$uploadFileUrl
        }
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
      pageLoading: false,
      confirmLoading: false,
      API: require(`@/api/${this.api}`)
    }
  },
  methods: {
    handleOk() {
      this.$refs.form.validate().then(formData => {
        this.confirmLoading = true
        if (this.isEdit) { // 修改
          this.API.update({ id: this.id, ...this.form }).then(res => {
            this.requestSuccess(res.msg)
          }).finally(() => {
            this.confirmLoading = false
          })
        } else { // 新增
          this.API.create(this.form).then(res => {
            this.requestSuccess(res.msg)
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
    requestSuccess(msg) {
      this.$message.success(msg)
      this.$emit('success')
      this.$emit('close')
      this.$refs.form.resetFields()
    },
    handlePortraitChange(list) {
      this.form.portrait = list
    },
    handleFileChange(list) {
      this.form.resourceUrl = list
    }
  }
}
</script>

<style>
</style>
