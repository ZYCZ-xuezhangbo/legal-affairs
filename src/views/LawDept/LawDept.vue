<template>
  <page-header-wrapper>
    <Edit api="legalDept" :act="dialog.act" :dict="dict" :show="dialog.showAdd" :id="dialog.editId" @close="dialog.showAdd=false" @success="getList" />

    <Search :company-list="dict.COMPANY" :dept-list="dict.DEPT" @search="handleSearch" />

    <List api="legalDept" :columns="columns" :actions="[ACTIONS.Detail, ACTIONS.Edit, ACTIONS.Delete]" :loading="loading" :export-loading="exportLoading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" @export="handleExport" />
  </page-header-wrapper>
</template>

<script>
import paginationMixin from '@/mixin/paginationMixin'
import { page as httpGetList, getDeptDictionary as httpGetDict, export_ as httpExport } from '@/api/legalDept'
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
        act: '',
        showAdd: false
      },
      dict: {
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
          title: '部门名称',
          dataIndex: 'deptName',
          key: 'deptName'
        },
        {
          title: '部门类型',
          dataIndex: 'deptType',
          key: 'deptType'
        },
        {
          title: '部门电话',
          dataIndex: 'deptPhone',
          key: 'deptPhone'
        },
        {
          title: '负责人',
          dataIndex: 'principal',
          key: 'principal'
        },
        {
          title: '联络人',
          dataIndex: 'contactPerson',
          key: 'contactPerson'
        },
        {
          title: '联络人办公室电话',
          dataIndex: 'contactOfficePhone',
          key: 'contactOfficePhone1'
        },
        {
          title: '联络人手机号',
          dataIndex: 'contactPhone',
          key: 'contactPhone'
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
      this.dialog.act = this.ACTIONS.Add
      this.dialog.showAdd = true
    },
    handleActClick({ act, item }) {
      const id = item.id
      this.dialog.act = act
      this.dialog.editId = id
      if ([this.ACTIONS.Detail, this.ACTIONS.Edit].includes(act)) {
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
