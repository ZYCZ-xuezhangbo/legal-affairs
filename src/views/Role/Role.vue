<template>
  <page-header-wrapper>
    <Edit api="systemRole" :show.sync="dialog.showEdit" :is-edit="dialog.isEdit" :id="dialog.editId" :menu-list="menuList" @success="getList" />
    <Search @search="handleSearch" />
    <List api="systemRole" :columns="columns" :show-extra="[ACTIONS.Add]" :actions="[ACTIONS.Edit, ACTIONS.Delete]" :loading="loading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" />
  </page-header-wrapper>
</template>

<script>
import { page as httpGetList } from '@/api/systemRole'
import { list as httpGetMenuList } from '@/api/systemMenu'
import paginationMixin from '@/mixin/paginationMixin'
import { PageList as List } from '@/components'
import Search from './components/Search'
import Edit from './components/Edit'

export default {
  mixins: [paginationMixin],
  components: {
    Search,
    List,
    Edit
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
      this.loading = true
      httpGetList({ ...this.pagination, ...this.searchData }).then(res => {
        this.list = res.data.list
        this.pagination.pageTotal = res.data.total
      }).finally(() => {
        this.loading = false
      })
    },
    getDict() {
      httpGetMenuList().then(res => {
        this.menuList = res.data
      })
    },
    handleActClick({ act, item }) {
      if (act === this.ACTIONS.Edit) {
        this.dialog.editId = item.id
        this.dialog.showEdit = true
        this.dialog.isEdit = true
      }
    },
    handleShowAdd() {
      this.dialog.showEdit = true
      this.dialog.isEdit = false
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
