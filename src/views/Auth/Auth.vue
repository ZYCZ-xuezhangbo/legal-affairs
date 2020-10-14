<template>
  <page-header-wrapper>
    <Edit api="systemMenu" :act="dialog.act" :show.sync="dialog.showEdit" :id="dialog.editId" />
    <Search @search="handleSearch" />
    <List api="systemMenu" :columns="columns" :show-extra="false" :actions="[ACTIONS.Detail]" :loading="loading" :list="list" :pagination="pagination" @reload="handleReload" @actClick="handleActClick" />
  </page-header-wrapper>
</template>

<script>
import { page as httpGetList } from '@/api/systemMenu'
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
      columns: [
        {
          title: '权限名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '权限标识',
          dataIndex: 'permission',
          key: 'permission'
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
      this.dialog.act = act
      this.dialog.editId = item.id
      if (act === this.ACTIONS.Detail) {
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
