<template>
  <page-header-wrapper>
    <Edit api="systemUser" :act="dialog.act" :show.sync="dialog.showEdit" :id="dialog.editId" @success="getList" />
    <Search @search="handleSearch" />
    <List :columns="columns" :show-extra="false" :actions="[ACTIONS.Edit]" :loading="loading" :list="list" :pagination="pagination" @reload="handleReload" @actClick="handleActClick" />
  </page-header-wrapper>
</template>

<script>
import { page as httpGetList } from '@/api/systemUser'
import paginationMixin from '@/mixin/paginationMixin'
import List from './components/List'
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
      columns: [
        {
          title: '账号',
          dataIndex: 'username',
          key: 'username'
        },
        {
          title: '用户名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone'
        },
        {
          title: '角色',
          dataIndex: 'roleMsgList',
          key: 'roleMsgList',
          width: '30%',
          scopedSlots: { customRender: 'roleMsgList' }
        },
        {
          title: '状态',
          dataIndex: 'statusMsg',
          key: 'statusMsg'
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
    handleActClick({ act, item }) {
      this.dialog.editId = item.id
      this.dialog.act = act
      if (act === this.ACTIONS.Edit) {
        this.dialog.showEdit = true
      }
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style>
</style>
