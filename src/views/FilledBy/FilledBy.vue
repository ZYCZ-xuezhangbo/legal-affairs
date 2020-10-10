<template>
  <page-header-wrapper>
    <Edit api="informant" :is-edit="dialog.isEdit" :dict="dict" :show="dialog.showAdd" :id="dialog.editId" @close="dialog.showAdd=false" @success="getList" />

    <Search :company-list="dict.COMPANY" @search="handleSearch" />

    <List api="informant" :columns="columns" :actions="['edit', 'delete']" :loading="loading" :export-loading="exportLoading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" @export="handleExport" />
  </page-header-wrapper>
</template>

<script>
import { page as httpGetList, getInformantDictionary as httpGetDict, export_ as httpExport } from '@/api/informant'
import paginationMixin from '@/mixin/paginationMixin'
import Search from './components/Search'
import Edit from './components/Edit'
import { PageList as List } from '@/components'

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
        editId: 0,
        isEdit: false,
        showAdd: false
      },
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
      ]
    }
  },
  methods: {
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
      if (act === this.ACTIONS.Edit) {
        this.dialog.editId = id
        this.dialog.isEdit = true
        this.dialog.showAdd = true
      }
    },
    handleExport() {
      this.export(httpExport)
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
