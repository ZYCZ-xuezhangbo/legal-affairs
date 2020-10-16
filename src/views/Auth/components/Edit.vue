<template>
  <a-modal :title="dialogTitle" :visible="show" @cancel="handleCancel" :width="dialogWidth">
    <template #footer>
      <button-cancel @click="handleCancel" />
    </template>
    <a-skeleton v-show="pageLoading" active />
    <div v-show="!pageLoading">
      <a-form-model ref="form" :model="form">
        <a-row :gutter="gutter">
          <a-col v-bind="span">
            <a-form-model-item label="权限名称" prop="name">
              <a-input v-model="form.name" placeholder="权限名称" disabled />
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="权限标识" prop="permission">
              <a-input v-model="form.permission" placeholder="权限标识" disabled />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
  </a-modal>
</template>

<script>
import { dialogEditMixin } from '@/mixin/dialogEdit-mixin'

export default {
  mixins: [dialogEditMixin],
  data() {
    return {
      form: {
        name: '',
        permission: ''
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
