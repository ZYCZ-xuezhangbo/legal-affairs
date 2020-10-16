<template>
  <a-modal v-bind="editModal" :title="dialogTitle" :visible="show" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel" :width="dialogWidth">
    <template #footer>
      <button-cancel @click="handleCancel" />
      <button-confirm :loading="confirmLoading" @click="handleOk" />
    </template>
    <a-skeleton v-show="pageLoading" active />
    <div v-show="!pageLoading">
      <a-form-model ref="form" :rules="rules" :model="form">
        <a-row :gutter="gutter">
          <a-col v-bind="span">
            <a-form-model-item label="名称" prop="name">
              <a-input v-model="form.name" :disabled="disabled" placeholder="请输入" />
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="类型" prop="type">
              <a-select v-model="form.type" :disabled="disabled">
                <a-select-option v-for="(item,index) in dict" :key="index" :value="item.code">
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
import { ACTIONS } from '@/store/mutation-types'
import { dialogEditMixin } from '@/mixin/dialogEdit-mixin'
import FileUpload from '@/components/KFormDesign/packages/UploadFile'
import { required as validateRequired } from '@/utils/formValidate'

export default {
  mixins: [dialogEditMixin],
  props: {
    dict: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    FileUpload
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
      return this.act === ACTIONS.Detail
    },
    rules() {
      return {
        name: [validateRequired],
        type: [validateRequired]
      }
    }
  },
  data() {
    return {
      ACTIONS,
      form: {
        name: '',
        type: '',
        resourceUrl: []
      }
    }
  }
}
</script>

<style>
</style>
