<template>
  <page-header-wrapper>
    <Edit api="informant" :act="dialog.act" :dict="dict" :show.sync="dialog.showEdit" :id="dialog.editId" @success="getList" />
    <Search :company-list="dict.COMPANY" @search="handleSearch" />
    <List api="informant" :columns="columns" :actions="[ACTIONS.Edit, ACTIONS.Delete]" :loading="loading" :export-loading="exportLoading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" @export="handleExport" />
  </page-header-wrapper>
</template>

<script>
import { page as httpGetList, getInformantDictionary as httpGetDict, export_ as httpExport } from '@/api/informant'
import paginationMixin from '@/mixin/pagination-mixin'
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
