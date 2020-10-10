<template>
  <page-header-wrapper>
    <Edit api="informant" :is-edit="dialog.isEdit" :dict="dict" :show="dialog.showAdd" :id="dialog.editId" @close="dialog.showAdd=false" @success="getList" />

    <Search :company-list="dict.COMPANY" @search="handleSearch" />

    <List api="informant" :columns="columns" :actions="['edit', 'delete']" :loading="loading" :export-loading="exportLoading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" @export="handleExport" />
  </page-header-wrapper>
</template>

<script>
import { page as httpGetList, getInformantDictionary as httpGetDict, export_ as httpExport } from '@/api/informant'
import { saveAs } from '@/utils/util'
import Search from './components/Search'
import Edit from './components/Edit'
import { PageList as List } from '@/components'

export default {
  components: {
    Search,
    List,
    Edit
  },
  data() {
    return {
      dialog: {
        editId: 0,
        isEdit: false,
        showAdd: false
      },
      searchData: {},
      list: [],
      dict: {
        USERNAME: [],
        DEPT: [],
        COMPANY: []
      },
      columns: [
        {
          title: '公司',
          dataIndex: 'company',
          key: 'company'
        },
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '部门名称',
          dataIndex: 'deptName',
          key: 'deptName'
        },
        {
          title: '联系电话',
          dataIndex: 'phone',
          key: 'phone'
        },
        {
          title: '办公室电话',
          dataIndex: 'officePhone',
          key: 'officePhone'
        }
      ],
      loading: false,
      exportLoading: false,
      pagination: {
        pageNum: 1,
        pageSize: 10,
        pageTotal: 0
      }
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
    getDict() {
      httpGetDict().then(res => {
        this.dict = res.data
      })
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
      this.dialog.isEdit = false
      this.dialog.showAdd = true
    },
    handleActClick({ act, item }) {
      const id = item.id
      if (act === 'edit') {
        this.dialog.editId = id
        this.dialog.isEdit = true
        this.dialog.showAdd = true
      }
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
    this.getDict()
    this.getList()
  }
}
</script>

<style>
</style>
