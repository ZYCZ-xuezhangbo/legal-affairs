<template>
  <page-header-wrapper>
    <Edit api="legalDept" :act="dialog.act" :dict="dict" :show="dialog.showAdd" :id="dialog.editId" @close="dialog.showAdd=false" @success="getList" />

    <Search :company-list="dict.COMPANY" :dept-list="dict.DEPT" @search="handleSearch" />

    <List api="legalDept" :columns="columns" :actions="['edit', 'detail', 'delete']" :loading="loading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" />
  </page-header-wrapper>
</template>

<script>
import { page as httpGetList, getDeptDictionary as httpGetDict } from '@/api/legalDept'
import Search from './components/Search'
import Edit from './components/Edit'
import { PageList as List } from '@/components'

const ADD = 'add'
const EDIT = 'edit'
const DETAIL = 'detail'

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
        act: '',
        showAdd: false
      },
      searchData: {},
      list: [],
      dict: {
        DEPT: [],
        COMPANY: []
      },
      loading: false,
      pagination: {
        pageNum: 1,
        pageSize: 10,
        pageTotal: 0
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
      this.dialog.act = ADD
      this.dialog.showAdd = true
    },
    handleActClick({ act, item }) {
      const id = item.id

      this.dialog.act = act
      this.dialog.editId = id

      if ([DETAIL, EDIT].includes(act)) {
        this.dialog.showAdd = true
      }
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
