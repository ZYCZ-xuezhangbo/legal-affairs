<template>
  <div>
    <a-modal v-bind="editModal" title="关联角色" :visible="show" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel" :width="1000">
      <a-skeleton v-show="pageLoading" active />
      <div v-show="!pageLoading">
        <a-form-model ref="form" :rules="rules" :model="form">
          <a-row>
            <a-col>
              <a-form-model-item label="" prop="roleIdList">
                <a-checkbox-group :options="roleAllList" v-model="form.roleIdList" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>

<script>
import dialogEditMixin from '@/mixin/dialogEditMixin'
import { requiredOfArray } from '@/utils/formValidate'

export default {
  mixins: [dialogEditMixin],
  data() {
    return {
      roleAllList: [],
      form: {
        roleIdList: []
      },
      rules: {
        roleIdList: [requiredOfArray]
      }
    }
  },
  methods: {
    getDetail() {
      this.pageLoading = true
      this.API.getById(this.id).then(res => {
        const roleList = res.data.userRoleDTOList
        this.roleAllList = roleList.map(v => ({ value: v.id, label: v.roleMsg }))
        this.form.roleIdList = roleList.filter(v => v.userOwned).map(v => (v.id))
      }).finally(() => {
        this.pageLoading = false
      })
    }
  }
}
</script>

<style>
</style>
