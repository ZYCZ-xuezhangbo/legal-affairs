<template>
  <a-modal v-bind="editModal" :title="dialogTitle" :visible="show" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel" :width="dialogWidth">
    <a-skeleton v-show="pageLoading" active />
    <div v-show="!pageLoading">
      <a-form-model ref="form" :rules="rules" :model="form">
        <a-row :gutter="gutter">
          <a-col v-bind="span">
            <a-form-model-item label="角色编码" prop="roleName">
              <a-input v-model="form.roleName" placeholder="角色编码" />
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="角色名称" prop="roleMsg">
              <a-input v-model="form.roleMsg" placeholder="角色名称" />
            </a-form-model-item>
          </a-col>
          <a-col v-if="menuList && menuList.length>0" :span="24">
            <a-form-model-item label="权限" prop="menuIdList">
              <a-tree v-model="form.menuIdList" block-node :default-expanded-keys="defaultExpandedKeys" :replace-fields="replaceFields" checkable auto-expand-parent :tree-data="menuList" @check="handleCheck" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
  </a-modal>
</template>

<script>
import { ACTIONS } from '@/store/mutation-types'
import dialogEditMixin from '@/mixin/dialogEdit-mixin'
import { required as validateRequired, requiredOfArray } from '@/utils/formValidate'

export default {
  mixins: [dialogEditMixin],
  props: {
    menuList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    defaultExpandedKeys() {
      return this.menuList.map(v => v.id)
    }
  },
  data() {
    return {
      span: {
        xs: 24,
        md: 12
      },
      replaceFields: {
        children: 'menuChildResDTOList',
        title: 'name',
        key: 'id'
      },
      menuIdList: [], // 这里的list包括了pid在内的所有元素，保存时应使用该字段
      form: {
        menuIdList: [], // 这里会将pid过滤掉，保存时不能使用该字段
        roleMsg: '',
        roleName: ''
      },
      rules: {
        menuIdList: [requiredOfArray],
        roleMsg: [validateRequired],
        roleName: [validateRequired]
      }
    }
  },
  methods: {
    handleCheck(checkedKeys, { halfCheckedKeys }) {
      this.menuIdList = [...checkedKeys, ...halfCheckedKeys]
    },
    handleOk() {
      this.$refs.form.validate().then(() => {
        this.confirmLoading = true
        const isEdit = this.act === ACTIONS.Edit
        const api = isEdit ? this.API.update : this.API.create
        const paramsId = isEdit ? { id: this.id } : {}

        api({ ...paramsId, ...this.form, menuIdList: this.menuIdList }).then(res => {
          this.requestSuccess()
        }).finally(() => {
          this.confirmLoading = false
        })
      })
    },
    getDetail() {
      this.pageLoading = true
      this.API.getById(this.id).then(res => {
        this.form = res.data
        this.menuIdList = res.data.menuIdList

        // 过滤掉pid，因为树结构显示时不能选中pid，否则会将所有子元素都选中。
        const menuIdsFilterPid = res.data.menuIdList.filter(v => {
          return this.menuList.findIndex(v1 => v1.id === v && v1.menuChildResDTOList) <= -1
        })
        this.form.menuIdList = menuIdsFilterPid
      }).finally(() => {
        this.pageLoading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .ant-checkbox-group-item {
  width: 30%;
  padding: 8px 0;
}

@media screen and(max-width: 1200px) {
  /deep/ .ant-checkbox-group-item {
    width: 45%;
  }
}

@media screen and(max-width: 575px) {
  /deep/ .ant-checkbox-group-item {
    width: 100%;
  }
}
</style>
