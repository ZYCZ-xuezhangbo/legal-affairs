<template>
  <page-header-wrapper>
    <Edit api="legalCounsel" :act="dialog.act" :dict="dict" :show.sync="dialog.showEdit" :id="dialog.editId" @success="getList" />
    <Search :dict="dict" @search="handleSearch" />
    <List api="legalCounsel" :columns="columns" :actions="[ACTIONS.Edit, ACTIONS.Detail, ACTIONS.Delete]" :loading="loading" :export-loading="exportLoading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" @export="handleExport" />
  </page-header-wrapper>
</template>

<script>
import paginationMixin from '@/mixin/paginationMixin'
import { page as httpGetList, getDict as httpGetDict, export_ as httpExport } from '@/api/legalCounsel'
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
          title: '类型',
          dataIndex: 'counselorType',
          key: 'counselorType'
        },
        {
          title: '专业',
          dataIndex: 'majorName',
          key: 'majorName'
        },
        {
          title: '职务',
          dataIndex: 'duty',
          key: 'duty'
        },
        {
          title: '办公室电话',
          dataIndex: 'officePhone',
          key: 'officePhone'
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
        this.list = res.data.list.map(v => {
          v.legalMajor = v.legalMajor === '0' ? '否' : '是'
          v.fullTime = v.fullTime === '0' ? '否' : '是'
          v.gender = v.gender === '0' ? '女' : '男'
          return v
        })
        this.pagination.pageTotal = res.data.total
      }).finally(() => {
        this.loading = false
      })
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
