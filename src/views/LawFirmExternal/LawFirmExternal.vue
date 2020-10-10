<template>
  <page-header-wrapper>
    <!-- <Detail api="outsideLawFirm" :show="dialog.showDetail" :id="dialog.editId" @close="dialog.showDetail=false" /> -->

    <Edit api="outsideLawFirm" :act="dialog.act" :show="dialog.showAdd" :id="dialog.editId" @close="dialog.showAdd=false" @success="getList" />
    <Search @search="handleSearch" />
    <List api="outsideLawFirm" :columns="columns" :actions="[ACTIONS.Detail,ACTIONS.Edit]" :loading="loading" :export-loading="exportLoading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" @export="handleExport" />

  </page-header-wrapper>
</template>

<script>
import { ACTIONS } from '@/store/mutation-types'
import { saveAs } from '@/utils/util'
import { page as httpGetList, export_ as httpExport } from '@/api/outsideLawFirm'
import { PageList as List } from '@/components'
import Edit from './components/Edit'
import Search from './components/Search'

export default {
  components: {
    Search,
    List,
    Edit
  },
  data() {
    return {
      ACTIONS,
      dialog: {
        editId: '',
        act: '',
        showAdd: false
      },
      searchData: {},
      list: [],
      loading: false,
      exportLoading: false,
      pagination: {
        pageNum: 1,
        pageSize: 10,
        pageTotal: 0
      },
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
    handleSearch(data) {
      this.pagination.pageNum = 1
      this.searchData = data
      this.getList()
    },
    handleReload({ pageNum, pageSize }) {
      this.pagination.pageNum = pageNum
      this.pagination.pageSize = pageSize
      this.getList()
    },
    getList() {
      this.loading = true
      httpGetList({ ...this.pagination, ...this.searchData }).then(res => {
        this.list = res.data.list
        this.pagination.pageTotal = res.data.total
      }).finally(() => {
        this.loading = false
      })
    },
    handleShowAdd() {
      this.dialog.act = ACTIONS.Add
      this.dialog.showAdd = true
    },
    handleActClick({ act, item }) {
      const id = item.id
      this.dialog.editId = id
      this.dialog.act = act
      this.dialog.showAdd = true
    },
    handleExport() {
      this.exportLoading = true
      httpExport(this.searchData).then(res => {
        const fileName = this.$route.meta.title || ''
        const timestamp = new Date().getTime()
        saveAs(res, `${fileName}${timestamp}.xlsx`)
      }).finally(() => {
        this.exportLoading = false
      })
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
