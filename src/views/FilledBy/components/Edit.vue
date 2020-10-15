<template>
  <a-modal v-bind="editModal" :title="dialogTitle" :visible="show" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel" :width="dialogWidth">
    <a-skeleton v-show="pageLoading" active />
    <div v-show="!pageLoading">
      <a-form-model ref="form" :rules="rules" :model="form">
        <a-row :gutter="gutter">
          <a-col v-bind="span">
            <a-form-model-item label="公司" prop="company">
              <a-select v-model="form.company">
                <a-select-option v-for="(item,index) in dict.COMPANY" :key="index" :value="item.code">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="部门" prop="deptName">
              <a-select v-model="form.deptName">
                <a-select-option v-for="(item,index) in dict.DEPT" :key="index" :value="item.code">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="用户名" prop="userName">
              <a-select v-model="form.userName">
                <a-select-option v-for="(item,index) in dict.USERNAME" :key="index" :value="item.code">
                  {{ item.name }}
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
            <a-form-model-item label="办公室电话" prop="officePhone">
              <a-input v-model="form.officePhone" />
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="联系电话" prop="phone">
              <a-input v-model="form.phone" class="response" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
  </a-modal>
</template>

<script>
import dialogEditMixin from '@/mixin/dialogEdit-mixin'
import { required as validateRequired, phone as validatePhone, max30Str } from '@/utils/formValidate'

export default {
  mixins: [dialogEditMixin],
  props: {
    dict: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      form: {
        company: '',
        deptName: '',
        lammyCompany: '',
        lammyDept: '',
        name: '',
        officePhone: '',
        phone: '',
        userName: ''
      },
      rules: {
        company: [validateRequired],
        deptName: [validateRequired],
        lammyCompany: [validateRequired],
        lammyDept: [validateRequired],
        name: [validateRequired, max30Str],
        officePhone: [validateRequired, max30Str],
        phone: [validateRequired, validatePhone],
        userName: [validateRequired]
      }
    }
  }
}
</script>

<style>
</style>
