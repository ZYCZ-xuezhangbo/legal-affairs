<template>
  <page-header-wrapper>
    <Edit api="outsideLawManager" :act="dialog.act" :show.sync="dialog.showEdit" :id="dialog.editId" :law-firm-list="lawFirmList" @success="getList" />
    <Search :law-firm-list="lawFirmList" @search="handleSearch" />
    <List api="outsideLawManager" :columns="columns" :actions="[ACTIONS.Edit, ACTIONS.Detail]" :loading="loading" :export-loading="exportLoading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" @export="handleExport" />
  </page-header-wrapper>
</template>

<script>
import paginationMixin from '@/mixin/pagination-mixin'
import { page as httpGetList, getLawFirmName as httpGetLawFirmList, export_ as httpExport } from '@/api/outsideLawManager'
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
      lawFirmList: [], // 律所列表
      columns: [
        {
          title: '律所名称',
          dataIndex: 'outsideLawFirmName',
          key: 'outsideLawFirmName'
        },
        {
          title: '服务律师',
          dataIndex: 'lawName',
          key: 'lawName'
        },
        {
          title: '性别',
          dataIndex: 'gender',
          key: 'gender'
        },
        {
          title: '学历',
          dataIndex: 'educationBackground',
          key: 'educationBackground'
        },
        {
          title: '专业',
          dataIndex: 'major',
          key: 'major'
        },
        {
          title: '电话',
          dataIndex: 'phone',
          key: 'phone'
        },
        {
          title: '是否有企业法律职业顾问资格',
          dataIndex: 'legalProfession',
          key: 'legalProfession'
        }
      ]
    }
  },
  methods: {
    getList() {
      this.getListMixin(httpGetList)
    },
    getLawFirmList() {
      httpGetLawFirmList().then(res => {
        this.lawFirmList = res.data
      })
    },
    handleExport() {
      this.export(httpExport)
    }
  },
  mounted() {
    this.getList()
    this.getLawFirmList()
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-btn + .ant-btn {
  margin-left: 12px;
}
</style>
