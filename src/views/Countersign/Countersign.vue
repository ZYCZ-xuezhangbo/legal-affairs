<template>
  <page-header-wrapper>
    <Edit api="generalMatter" :dict="dict" :act="dialog.act" :show.sync="dialog.showEdit" :id="dialog.editId" @success="getList" />
    <Search @search="handleSearch" />
    <List api="generalMatter" :columns="columns" :actions="[ACTIONS.Edit, ACTIONS.Delete]" :loading="loading" :export-loading="exportLoading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" @export="handleExport" />
  </page-header-wrapper>
</template>

<script>
import { paginationMixin } from '@/mixin/pagination-mixin'
import { page as httpGetList, getDict as httpGetDict, export_ as httpExport } from '@/api/generalMatter'
import { PageList as List } from '@/components'
import Search from './components/Search'

export default {
  mixins: [paginationMixin],
  components: {
    Search,
    List,
    Edit: () => import('./components/Edit')
  },
  data() {
    return {
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
      this.getListMixin(httpGetList)
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
