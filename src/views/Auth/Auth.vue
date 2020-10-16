<template>
  <page-header-wrapper>
    <Edit api="systemMenu" :act="dialog.act" :show.sync="dialog.showEdit" :id="dialog.editId" />
    <Search @search="handleSearch" />
    <List api="systemMenu" :columns="columns" :show-extra="false" :actions="[ACTIONS.Detail]" :loading="loading" :list="list" :pagination="pagination" @reload="handleReload" @actClick="handleActClick" />
  </page-header-wrapper>
</template>

<script>
import { page as httpGetList } from '@/api/systemMenu'
import paginationMixin from '@/mixin/pagination-mixin'
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
