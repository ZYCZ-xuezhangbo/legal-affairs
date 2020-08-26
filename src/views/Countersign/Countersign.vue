<template>
  <page-header-wrapper>
    <Edit api="generalMatter" :dict="dict" :act="dialog.act" :show="dialog.showAdd" :id="dialog.editId" @close="dialog.showAdd=false" @success="getList" />

    <Search @search="handleSearch" />

    <List api="generalMatter" :columns="columns" :actions="['edit', 'delete']" :loading="loading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" />
  </page-header-wrapper>
</template>

<script>
import { ACTIONS } from '@/store/mutation-types'
import { page as httpGetList, getDict as httpGetDict } from '@/api/generalMatter'
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
        editId: '',
        act: '',
        showAdd: false
      },
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
      ],
      dict: {}
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
      this.dialog.act = ACTIONS.Add
      this.dialog.showAdd = true
    },
    handleActClick({ act, item }) {
      const id = item.id
      this.dialog.act = act
      this.dialog.editId = id

      if (act === ACTIONS.Edit) this.dialog.showAdd = true
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
