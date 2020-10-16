<template>
  <page-header-wrapper>
    <Edit api="systemUser" :act="dialog.act" :show.sync="dialog.showEdit" :id="dialog.editId" @success="getList" />
    <Search @search="handleSearch" />
    <List :columns="columns" :show-extra="false" :actions="[ACTIONS.Edit]" :loading="loading" :list="list" :pagination="pagination" @reload="handleReload" @actClick="handleActClick" />
  </page-header-wrapper>
</template>

<script>
import { page as httpGetList } from '@/api/systemUser'
import { paginationMixin } from '@/mixin/pagination-mixin'
import List from './components/List'
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
      this.getListMixin(httpGetList)
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style>
</style>
