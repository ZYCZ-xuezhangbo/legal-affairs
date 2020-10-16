<template>
  <a-modal v-bind="editModal" :title="dialogTitle" :visible="show" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel" :width="dialogWidth">
    <template v-if="act===ACTIONS.Detail" #footer>
      <button-cancel @click="handleCancel" />
    </template>
    <a-skeleton v-show="pageLoading" active />
    <div v-show="!pageLoading">
      <a-form-model ref="form" :rules="rules" :model="form">
        <a-row :gutter="gutter">
          <a-col :span="24">
            <a-form-model-item label="会签名称" prop="name">
              <a-input v-model="form.name" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="审核意见" prop="opinion">
              <a-textarea v-model="form.opinion" :auto-size="{ minRows: 5, maxRows: 15 }" />
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="接收人部门" prop="recipientDepartment">
              <a-select v-model="form.recipientDepartment" :disabled="disabled">
                <a-select-option v-for="(item,index) in dict.RECIPIENTDEPT" :key="index" :value="item.code">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="接收人" prop="recipient">
              <a-select v-model="form.recipient" :disabled="disabled">
                <a-select-option v-for="(item,index) in dict.RECIPIENT" :key="index" :value="item.code">
                  {{ item.name }}
                </a-select-option>
              </a-select>
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
import { dialogEditMixin } from '@/mixin/dialogEdit-mixin'
import { ACTIONS } from '@/store/mutation-types'
import FileUpload from '@/components/KFormDesign/packages/UploadFile'
import { required as validateRequired } from '@/utils/formValidate'

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
          RECIPIENTDEPT: [], // 接收人部门
          RECIPIENT: [] // 接收人
        }
      }
    }
  },
  computed: {
    fileRecord() {
      return {
        options: {
          limit: 1000,
          disabled: this.disabled
        }
      }
    },
    disabled() {
      return this.act === ACTIONS.Detail && this.id !== ''
    }
  },
  data() {
    return {
      ACTIONS,
      form: {
        lammyCompany: '',
        lammyDept: '',
        name: '',
        opinion: '',
        recipient: '',
        recipientDepartment: '',
        resourceUrl: []
      },
      rules: {
        birthDate: [validateRequired],
        lammyCompany: [validateRequired],
        lammyDept: [validateRequired],
        name: [validateRequired],
        opinion: [validateRequired],
        recipient: [validateRequired],
        recipientDepartment: [validateRequired]
      }
    }
  }
}
</script>

<style>
</style>
