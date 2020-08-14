<template>
  <page-header-wrapper>
    <Edit api="legalDept" :form-data="formData" :is-edit="dialog.isEdit" :show="dialog.showAdd" :id="dialog.editId" @close="dialog.showAdd=false" @success="getList" />

    <Search :company-list="companyList" :dept-list="deptList" @search="handleSearch" />

    <List api="legalDept" :columns="columns" :actions="['edit', 'look', 'delete']" :loading="loading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" />
  </page-header-wrapper>
</template>

<script>
import { page as httpGetList } from '@/api/legalDept'
import Search from './components/Search'
import { PageEdit as Edit, PageList as List } from '@/components'

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
      formData: require('@/formBuilder/lawDept.json'),
      searchData: {},
      list: [],
      companyList: [
        {
          code: '',
          name: '不限'
        },
        {
          code: 'com1',
          name: '公司1'
        },
        {
          code: 'com2',
          name: '公司2'
        }
      ],
      deptList: [
        {
          code: '',
          name: '不限'
        },
        {
          code: 'dept1',
          name: '部门1'
        },
        {
          code: 'dept2',
          name: '部门2'
        }
      ],
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
          title: '办公电话',
          dataIndex: 'contactOfficePhone',
          key: 'contactOfficePhone'
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
    handleActClick({ act, id }) {
      if (act === 'edit') {
        this.dialog.editId = id
        this.dialog.isEdit = true
        this.dialog.showAdd = true
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
