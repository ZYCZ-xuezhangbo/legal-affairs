<template>
  <page-header-wrapper>
    <Edit api="legalCounsel" :form-data="formData" :is-edit="dialog.isEdit" :show="dialog.showAdd" :id="dialog.editId" @close="dialog.showAdd=false" @success="getList" />

    <Search @search="handleSearch" />

    <List api="legalCounsel" :columns="columns" :actions="['edit', 'look', 'delete']" :loading="loading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" />
  </page-header-wrapper>
</template>

<script>
import { page as httpGetList } from '@/api/legalCounsel'
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
        editId: '',
        isEdit: false,
        showAdd: false
      },
      formData: require('@/formBuilder/lawAdviser.json'),
      searchData: {},
      list: [],
      loading: false,
      pagination: {
        pageNum: 1,
        pageSize: 10,
        pageTotal: 0
      },
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '性别',
          dataIndex: 'gender',
          key: 'gender'
        },
        {
          title: '类别',
          dataIndex: 'counselorType',
          key: 'counselorType'
        },
        {
          title: '出生日期',
          dataIndex: 'birthDate',
          key: 'birthDate'
        },
        {
          title: '是否法学类专业',
          dataIndex: 'legalMajor',
          key: 'legalMajor'
        },
        {
          title: '专业名称',
          dataIndex: 'majorName',
          key: 'majorName'
        },
        {
          title: '职务',
          dataIndex: 'duty',
          key: 'duty'
        },
        {
          title: '是否专职',
          dataIndex: 'fullTime',
          key: 'fullTime'
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
