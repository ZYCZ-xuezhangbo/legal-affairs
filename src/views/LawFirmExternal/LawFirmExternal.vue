<template>
  <page-header-wrapper>
    <!-- <Detail api="outsideLawFirm" :show="dialog.showDetail" :id="dialog.editId" @close="dialog.showDetail=false" /> -->

    <Edit api="outsideLawFirm" :act="dialog.act" :show.sync="dialog.showEdit" :id="dialog.editId" @success="getList" />
    <Search @search="handleSearch" />
    <List api="outsideLawFirm" :columns="columns" :actions="[ACTIONS.Detail,ACTIONS.Edit]" :loading="loading" :export-loading="exportLoading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" @export="handleExport" />

  </page-header-wrapper>
</template>

<script>
import paginationMixin from '@/mixin/paginationMixin'
import { page as httpGetList, export_ as httpExport } from '@/api/outsideLawFirm'
import { PageList as List } from '@/components'
import Edit from './components/Edit'
import Search from './components/Search'

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
          title: '律所名称',
          dataIndex: 'lawFirmName',
          key: 'lawFirmName'
        },
        {
          title: '地址',
          dataIndex: 'address',
          key: 'address'
        },
        {
          title: '联系人',
          dataIndex: 'linkman',
          key: 'linkman'
        },
        {
          title: '联系电话',
          dataIndex: 'phone',
          key: 'phone'
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
      const id = item.id
      this.dialog.editId = id
      this.dialog.act = act
      this.dialog.showEdit = true
    },
    handleExport() {
      this.export(httpExport)
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-btn + .ant-btn {
  margin-left: 12px;
}
</style>
