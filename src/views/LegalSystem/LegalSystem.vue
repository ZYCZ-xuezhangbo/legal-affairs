<template>
  <page-header-wrapper>
    <Edit api="legalSystem" :act="dialog.act" :dict="typeList" :show.sync="dialog.showEdit" :id="dialog.editId" @success="getList" />
    <Search :type-list="typeList" @search="handleSearch" />
    <List api="legalSystem" :columns="columns" :actions="[ACTIONS.Edit, ACTIONS.Delete]" :loading="loading" :export-loading="exportLoading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" @export="handleExport" />
  </page-header-wrapper>
</template>

<script>
import { paginationMixin } from '@/mixin/pagination-mixin'
import { page as httpGetList, getLegalSystemType as httpGetTypeList, export_ as httpExport } from '@/api/legalSystem'
import Search from './components/Search'
import { PageList as List } from '@/components'

export default {
  mixins: [paginationMixin],
  components: {
    Search,
    List,
    Edit: () => import('./components/Edit')
  },
  data() {
    return {
      typeList: [],
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type'
        },
        {
          title: '发布公司',
          dataIndex: 'releaseCompany',
          key: 'releaseCompany'
        },
        {
          title: '发布人',
          dataIndex: 'releasePerson',
          key: 'releasePerson'
        },
        {
          title: '发布时间',
          dataIndex: 'createTime',
          key: 'createTime'
        }
      ]
    }
  },
  methods: {
    getList() {
      this.getListMixin(httpGetList)
    },
    getTypeList() {
      httpGetTypeList().then(res => {
        this.typeList = res.data
      })
    },
    handleExport() {
      this.export(httpExport)
    }
  },
  mounted() {
    this.getList()
    this.getTypeList()
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-btn + .ant-btn {
  margin-left: 12px;
}
</style>
