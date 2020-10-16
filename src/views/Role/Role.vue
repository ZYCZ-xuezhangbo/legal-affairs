<template>
  <page-header-wrapper>
    <Edit api="systemRole" :act="dialog.act" :show.sync="dialog.showEdit" :id="dialog.editId" :menu-list="menuList" @success="getList" />
    <Search @search="handleSearch" />
    <List api="systemRole" :columns="columns" :show-extra="[ACTIONS.Add]" :actions="[ACTIONS.Edit, ACTIONS.Delete]" :loading="loading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" />
  </page-header-wrapper>
</template>

<script>
import { page as httpGetList } from '@/api/systemRole'
import { list as httpGetMenuList } from '@/api/systemMenu'
import { paginationMixin } from '@/mixin/pagination-mixin'
import { PageList as List } from '@/components'
import Search from './components/Search'

export default {
  mixins: [paginationMixin],
  components: {
    Search,
    List,
    Edit: () => import('./components/Edit')
  },
  data() {
    return {
      dialog: {
        showEdit: false,
        editId: '',
        isEdit: false
      },
      menuList: [], // 权限字典
      columns: [
        {
          title: '角色名称',
          dataIndex: 'roleMsg',
          key: 'roleMsg'
        },
        {
          title: '角色编码',
          dataIndex: 'roleName',
          key: 'roleName'
        }
      ]
    }
  },
  methods: {
    getList() {
      this.getListMixin(httpGetList)
    },
    getDict() {
      httpGetMenuList().then(res => {
        this.menuList = res.data
      })
    }
  },
  mounted() {
    this.getDict()
    this.getList()
  }
}
</script>

<style>
</style>
