<template>
  <page-header-wrapper>
    <Edit api="generalMatter" :dict="dict" :act="dialog.act" :show="dialog.showAdd" :id="dialog.editId" @close="dialog.showAdd=false" @success="getList" />

    <Search @search="handleSearch" />

    <List api="generalMatter" :columns="columns" :actions="[ACTIONS.Edit, ACTIONS.Delete]" :loading="loading" :export-loading="exportLoading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" @export="handleExport" />
  </page-header-wrapper>
</template>

<script>
import paginationMixin from '@/mixin/paginationMixin'
import { page as httpGetList, getDict as httpGetDict, export_ as httpExport } from '@/api/generalMatter'
import { PageList as List } from '@/components'
import Search from './components/Search'
import Edit from './components/Edit'

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
        editId: '',
        act: '',
        showAdd: false
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

      if (act === this.ACTIONS.Edit) this.dialog.showAdd = true
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
