<template>
  <page-header-wrapper>
    <Edit api="generalMatter" :form-data="formData" :is-edit="dialog.isEdit" :show="dialog.showAdd" :id="dialog.editId" @close="dialog.showAdd=false" @success="getList" />

    <Search @search="handleSearch" />

    <List api="generalMatter" :columns="columns" :actions="['edit', 'delete']" :loading="loading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" />
  </page-header-wrapper>
</template>

<script>
import { page as httpGetList } from '@/api/generalMatter'
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
      formData: require('@/formBuilder/countersign.json'),
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
          title: '公司',
          dataIndex: 'lammyCompany',
          key: 'lammyCompany'
        },
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '登记日期',
          dataIndex: 'createTime',
          key: 'createTime'
        },
        {
          title: '撰写人',
          dataIndex: 'writer',
          key: 'writer'
        },
        {
          title: '接收人',
          dataIndex: 'recipient',
          key: 'recipient'
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
