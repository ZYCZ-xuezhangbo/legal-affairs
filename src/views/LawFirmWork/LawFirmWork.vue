<template>
  <page-header-wrapper>
    <Edit api="lawFirmWork" :act="dialog.act" :dict="dict" :show.sync="dialog.showEdit" :id="dialog.editId" :law-firm-list="lawFirmList" @success="getList" />
    <Search :dict="dict" @search="handleSearch" />
    <List api="lawFirmWork" :columns="columns" :actions="[ACTIONS.Detail, ACTIONS.Edit, ACTIONS.Rate]" :loading="loading" :export-loading="exportLoading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" @export="handleExport" />
  </page-header-wrapper>
</template>

<script>
import paginationMixin from '@/mixin/paginationMixin'
import { page as httpGetList, getDict as httpGetDict, export_ as httpExport } from '@/api/lawFirmWork'
import { getLawFirmName as httpGetLawFirmList } from '@/api/outsideLawManager'
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
      lawFirmList: [], // 律所列表
      columns: [
        {
          title: '公司',
          dataIndex: 'lammyCompany',
          key: 'lammyCompany'
        },
        {
          title: '服务律所',
          dataIndex: 'lawFirmName',
          key: 'lawFirmName'
        },
        {
          title: '服务律师',
          dataIndex: 'lawName',
          key: 'lawName'
        },
        {
          title: '服务类型',
          dataIndex: 'serviceType',
          key: 'serviceType'
        },
        {
          title: '开始时间',
          dataIndex: 'serviceTimeStart',
          key: 'serviceTimeStart'
        },
        {
          title: '结束时间',
          dataIndex: 'serviceTimeEnd',
          key: 'serviceTimeEnd'
        },
        {
          title: '服务费',
          dataIndex: 'serviceCharge',
          key: 'serviceCharge'
        },
        {
          title: '评分',
          dataIndex: 'scoreCount',
          key: 'scoreCount'
        }
      ],
      dict: {}
    }
  },
  methods: {
    getList() {
      this.loading = true
      httpGetList({ ...this.pagination, ...this.searchData }).then(res => {
        this.list = res.data.list
        this.pagination.pageTotal = res.data.total
      }).finally(() => {
        this.loading = false
      })
    },
    handleActClick({ act, item }) {
      const id = item.id
      this.dialog.editId = id
      this.dialog.act = act
      this.dialog.showEdit = true
    },
    getLawFirmList() {
      httpGetLawFirmList().then(res => {
        this.lawFirmList = res.data
      })
    },
    getDict() {
      httpGetDict().then(res => {
        this.dict = res.data
      })
    },
    handleExport() {
      this.export(httpExport)
    }
  },
  mounted() {
    this.getDict()
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
