<template>
  <a-modal v-bind="editModal" :title="dialogTitle" :visible="show" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel" :width="dialogWidth">
    <template #footer>
      <button-cancel @click="handleCancel">{{ act===ACTIONS.Detail?'关闭':'取消' }}</button-cancel>
      <button-confirm :show="!disabled" :loading="confirmLoading" @click="handleOk" />
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
</template>

<script>
import { ACTIONS } from '@/store/mutation-types'
import dialogEditMixin from '@/mixin/dialogEditMixin'
import FileUpload from '@/components/KFormDesign/packages/UploadFile'
import { required as validateRequired, max30Str as validataMax30, phone as validatePhone } from '@/utils/formValidate'

export default {
  mixins: [dialogEditMixin],
  components: {
    FileUpload
  },
  props: {
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
  computed: {
    disabled() {
      return this.act === ACTIONS.Detail
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
  methods: { }
}
</script>

<style>
</style>
