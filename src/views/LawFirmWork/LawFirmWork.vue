<template>
  <page-header-wrapper>
    <Edit api="lawFirmWork" :act="dialog.act" :dict="dict" :show="dialog.showAdd" :id="dialog.id" :law-firm-list="lawFirmList" @close="dialog.showAdd=false" @success="getList" />

    <Search :dict="dict" @search="handleSearch" />

    <List api="lawFirmWork" :columns="columns" :actions="[ACTIONS.Detail, ACTIONS.Edit, ACTIONS.Rate]" :loading="loading" :export-loading="exportLoading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" @export="handleExport" />
  </page-header-wrapper>
</template>

<script>
import { ACTIONS } from '@/store/mutation-types'
import { saveAs } from '@/utils/util'
import { page as httpGetList, getDict as httpGetDict, export_ as httpExport } from '@/api/lawFirmWork'
import { getLawFirmName as httpGetLawFirmList } from '@/api/outsideLawManager'
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
      ACTIONS,
      dialog: {
        id: 0,
        act: '',
        showAdd: false
      },
      searchData: {},
      list: [],
      lawFirmList: [], // 律所列表
      loading: false,
      exportLoading: false,
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
      this.dialog.act = ACTIONS.Add
      this.dialog.showAdd = true
    },
    handleActClick({ act, item }) {
      const id = item.id

      this.dialog.id = id
      this.dialog.act = act
      this.dialog.showAdd = true
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
      this.exportLoading = true
      httpExport(this.searchData).then(res => {
        const fileName = this.$route.meta.title || ''
        const timestamp = new Date().getTime()
        saveAs(res, `${fileName}${timestamp}.xlsx`)
      }).finally(() => {
        this.exportLoading = false
      })
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
