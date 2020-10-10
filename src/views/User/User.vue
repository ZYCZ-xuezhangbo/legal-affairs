<template>
  <page-header-wrapper>
    用户列表
    <!-- <Search @search="handleSearch" />
    <List api="" :columns="columns" :actions="[ACTIONS.Role]" :loading="loading" :list="list" :pagination="pagination" @reload="handleReload" @actClick="handleActClick" /> -->
  </page-header-wrapper>
</template>

<script>
import { page as httpGetList } from '@/api/systemUser'
import { PageList as List } from '@/components'
import paginationMixin from '@/mixin/paginationMixin'
import Search from './components/Search'

export default {
  mixins: [paginationMixin],
  components: {
    Search,
    List
  },
  data() {
    return {
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '账号',
          dataIndex: 'account',
          key: 'account'
        },
        {
          title: '用户名',
          dataIndex: 'userName',
          key: 'userName'
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone'
        },
        {
          title: '状态',
          dataIndex: 'state',
          key: 'state'
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
      console.log(item)
    }
  },
  mounted() {
    // this.getList()
  }
}
</script>

<style>
</style>
