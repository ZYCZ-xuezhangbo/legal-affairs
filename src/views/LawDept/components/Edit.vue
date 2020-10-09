<template>
  <div>
    <a-modal v-bind="editModal" :title="title" :visible="show" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel" :width="1000">
      <template #footer>
        <a-button @click="handleCancel">{{ act===ACTIONS.Detail?'关闭':'取消' }}</a-button>
        <a-button v-if="!disabled" type="primary" :loading="confirmLoading" @click="handleOk">确定</a-button>
      </template>
      <a-skeleton v-show="pageLoading" active />
      <div v-show="!pageLoading">
        <a-form-model ref="form" :rules="rules" :model="form">
          <a-row :gutter="gutter">
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
              <a-form-model-item label="部门" prop="deptName">
                <a-select v-model="form.deptName" :disabled="disabled">
                  <a-select-option v-for="(item,index) in dict.DEPT" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="部门类型" prop="deptType">
                <a-select v-model="form.deptType" :disabled="disabled">
                  <a-select-option v-for="(item,index) in dict.DEPTTYPE" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="部门电话" prop="deptPhone">
                <a-input v-model="form.deptPhone" :disabled="disabled" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="负责人" prop="principal">
                <a-input v-model="form.principal" :disabled="disabled" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="联络人" prop="contactPerson">
                <a-input v-model="form.contactPerson" :disabled="disabled" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="联络人办公室电话" prop="contactOfficePhone">
                <a-input v-model="form.contactOfficePhone" :disabled="disabled" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="联络人手机号" prop="contactPhone">
                <a-input v-model="form.contactPhone" :disabled="disabled" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="部门职责" prop="deptObligation">
                <a-textarea v-model="form.deptObligation" :disabled="disabled" :auto-size="{ minRows: 5, maxRows: 15 }" />
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
import { required as validateRequired, max30Str as validataMax30, phone as validatePhone } from '@/utils/formValidate'

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
        return {
          DEPTTYPE: [], // 部门类型
          DEPT: [], // 部门列表
          COMPANY: [] // 公司列表
        }
      }
    }
  },
  watch: {
    show(newVal, oldVal) {
      this.$nextTick(() => this.$refs.form.resetFields())
      if (newVal && this.act === ACTIONS.Detail || this.act === ACTIONS.Edit) {
        this.getDetail()
      }
    }
  },
  computed: {
    title() {
      if (this.act === ACTIONS.Detail) {
        return '详情'
      } else if (this.act === ACTIONS.Add) {
        return '新增'
      } else if (this.act === ACTIONS.Edit) {
        return '修改'
      }
      return ''
    },
    disabled() {
      return this.act === ACTIONS.Detail
    },
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
          defaultValue: [],
          limit: 1000,
          disabled: this.disabled
        }
      }
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
      pageLoading: false,
      confirmLoading: false,
      API: require(`@/api/${this.api}`),
      form: {
        company: '',
        contactOfficePhone: '',
        contactPerson: '',
        contactPhone: '',
        deptName: '',
        deptObligation: '',
        deptPhone: '',
        deptType: '',
        lammyCompany: '',
        lammyDept: '',
        principal: '',
        resourceUrl: []
      },
      rules: {
        company: [validateRequired],
        contactOfficePhone: [validateRequired, validataMax30],
        contactPerson: [validateRequired, validataMax30],
        contactPhone: [validateRequired, validatePhone, validataMax30],
        deptName: [validateRequired],
        deptObligation: [validateRequired],
        deptPhone: [validateRequired, validataMax30],
        deptType: [validateRequired],
        lammyCompany: [validateRequired],
        lammyDept: [validateRequired],
        principal: [validateRequired, validataMax30]
      }
    }
  },
  methods: {
    handleOk() {
      this.$refs.form.validate().then(() => {
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
