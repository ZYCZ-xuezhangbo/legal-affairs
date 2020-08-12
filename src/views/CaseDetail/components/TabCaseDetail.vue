<template>
  <div>
    <a-form-model ref="form" layout="vertical" :model="form" :rules="rules">
      <a-row :gutter="48">
        <a-col :sm="24" :md="8">
          <a-form-model-item label="我方涉案单位" prop="unitInvolvedOfWe">
            <a-select v-model="form.unitInvolvedOfWe" :disabled="!isModify">
              <a-select-option value="xx公司1">
                xx公司1
              </a-select-option>
              <a-select-option value="xx公司2">
                xx公司2
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :sm="24" :md="8">
          <a-form-model-item label="诉讼地位" prop="litigationStatus">
            <a-select v-model="form.litigationStatus" :disabled="!isModify">
              <a-select-option value="原告">
                原告
              </a-select-option>
              <a-select-option value="被告">
                被告
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :sm="24" :md="8">
          <a-form-model-item label="案由" prop="causeOfAction">
            <a-tree-select v-model="form.causeOfAction" style="width: 100%" :searchValue="anyouSearchValue" :dropdown-style="{ maxHeight: '45vh', overflow: 'auto' }" treeDataSimpleMode show-search treeNodeFilterProp="label" :tree-data="anyou" tree-default-expand-all @search="causeOfActionSearch">
              <template #suffixIcon>
                <a-icon v-show="anyouLoading" type="loading" />
              </template>
            </a-tree-select>
          </a-form-model-item>
        </a-col>
        <a-col :sm="24" :md="8">
          <a-form-model-item label="案号" prop="caseNumber">
            <a-input v-model="form.caseNumber" placeholder="案号" :disabled="!isModify" />
          </a-form-model-item>
        </a-col>
        <a-col :sm="24" :md="8">
          <a-form-model-item label="成诉时间" prop="litigationDate">
            <a-date-picker v-model="form.litigationDate" type="date" placeholder="成诉时间" :disabled="!isModify" style="width: 100%;" />
          </a-form-model-item>
        </a-col>
        <a-col :sm="24" :md="8">
          <a-form-model-item label="案件种类" prop="caseType">
            <a-input v-model="form.caseType" placeholder="案件种类" :disabled="!isModify" />
          </a-form-model-item>
        </a-col>
        <a-col :sm="24" :md="8">
          <a-form-model-item label="涉案金额（元）" prop="involvedMoney">
            <a-input-number v-model="form.involvedMoney" :min="1" :disabled="!isModify" style="width:100%;" />
          </a-form-model-item>
        </a-col>
        <a-col :sm="24" :md="8">
          <a-form-model-item label="案件所处阶段" prop="caseStep">
            <a-input v-model="form.caseStep" placeholder="案件所处阶段" :disabled="!isModify" />
          </a-form-model-item>
        </a-col>
        <a-col :sm="24" :md="8">
          <a-form-model-item label="重大案件" prop="majorCases">
            <a-input v-model="form.majorCases" type="textarea" :auto-size="{ minRows: 4, maxRows: 6 }" placeholder="重大案件" :disabled="!isModify" />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <footer-toolbar v-if="isModify" :is-mobile="isMobile">
      <a-button type="primary" @click="handleSubmit">提交</a-button>
    </footer-toolbar>
  </div>
</template>

<script>
import { get as httpGetCauseOfAction } from '@/api/case'
import { FooterToolbar } from '@/components'

const rules = {
  unitInvolvedOfWe: [
    { required: true, message: `该项为必填项`, trigger: 'change' }
  ],
  litigationStatus: [
    { required: true, message: `该项为必填项`, trigger: 'change' }
  ],
  causeOfAction: [
    { required: true, message: `该项为必填项`, trigger: 'change' }
  ],
  caseNumber: [
    { required: true, message: `该项为必填项`, trigger: 'blur' },
    { min: 3, max: 5, message: '长度必须大于3且小于5', trigger: 'blur' },
    { pattern: /^[\u4e00-\u9fa5]+$/, message: '只能输入中文', trigger: 'blur' }
  ],
  litigationDate: [
    { required: true, message: `该项为必填项`, trigger: 'change' }
  ],
  involvedMoney: [
    { required: true, message: `该项为必填项`, trigger: 'change' }
  ]
}

export default {
  components: {
    FooterToolbar
  },
  data() {
    return {
      rules,
      isModify: true,
      anyouSearchTimer: null,
      anyouLoading: false,
      anyou: [],
      anyouSearchValue: '',
      form: {
        unitInvolvedOfWe: '',
        litigationStatus: '',
        causeOfAction: '',
        caseNumber: '',
        litigationDate: '',
        caseType: '',
        caseStep: '',
        majorCases: '',
        involvedMoney: ''
      }
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  methods: {
    handleModify() {
      this.isModify = true
    },
    handleShowAddJinzhan() {
      this.$emit('showAddJinzhan')
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isModify = false
        } else {
          return false
        }
      })
    },
    causeOfActionSearch(keyword) {
      if (keyword === '') return

      if (this.anyouSearchTimer) clearTimeout(this.anyouSearchTimer)
      this.anyouSearchTimer = setTimeout(() => {
        this.anyouLoading = true
        httpGetCauseOfAction(keyword).then(res => {
          const list = res.data.map(v => ({ id: v.id, value: v.value, label: v.label, pId: v.pid }))
          this.anyou = list
        }).finally(() => {
          this.anyouSearchValue = keyword
          this.anyouLoading = false
        })
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.dropdown-m {
  max-height: 45vh !important;
}
</style>
