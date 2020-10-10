<template>
  <div>
    <Search :dic-data="searchDictData" @search="handleSearch" />
    <List api="user" :title="listTitle" :scroll-width="1800" :columns="columns" :actions="[ACTIONS.Detail,ACTIONS.Edit]" :loading="loading" :export-loading="exportLoading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleCaseEntry" @actClick="handleActClick" @export="handleExport" />
  </div>
</template>

<script>
import { ACTIONS } from '@/store/mutation-types'
import { saveAs } from '@/utils/util'
import { page as httpGetCaseList, export_ as httpExport } from '@/api/case'
import { PageList as List } from '@/components'
import Search from './Search'

export default {
  components: {
    Search,
    List
  },
  props: {
    type: {
      type: String,
      default: '0'
    },
    listTitle: {
      type: String,
      default: ''
    },
    searchDictData: {
      type: Object,
      default() {
        return {
          ourUnits: [],
          caseTypeList: [],
          caseStageList: []
        }
      }
    }
  },
  data() {
    return {
      ACTIONS,
      dialog: {
        caseId: '',
        showAddJinzhan: false
      },
      searchForm: {},
      loading: false,
      exportLoading: false,
      pagination: {
        pageNum: 1,
        pageSize: 10,
        pageTotal: 0
      },
      columns: [
        {
          title: '我方涉案单位',
          dataIndex: 'ourUnits',
          key: 'ourUnits'
        },
        {
          title: '诉讼地位',
          dataIndex: 'locusStand',
          key: 'locusStand'
        },
        {
          title: '案号',
          dataIndex: 'caseNo',
          key: 'caseNo'
        },
        {
          title: '案由',
          dataIndex: 'brief',
          key: 'brief'
        },
        {
          title: '成诉时间',
          dataIndex: 'lawsuitTime',
          key: 'lawsuitTime'
        },
        {
          title: '是否重大案件',
          dataIndex: 'importantCase',
          key: 'importantCase'
        },
        {
          title: '涉案金额(万元)',
          dataIndex: 'caseAmount',
          key: 'caseAmount'
        },
        {
          title: '管辖法院',
          dataIndex: 'competentCourt',
          key: 'competentCourt'
        },
        {
          title: '案件所处阶段',
          dataIndex: 'caseStage',
          key: 'caseStage'
        },
        {
          title: '进展状态',
          dataIndex: 'progressStatus',
          key: 'progressStatus'
        }
      ],
      list: [],
      caseProStatus: []
    }
  },
  methods: {
    handleSearch(e) {
      this.pagination.pageNum = 1
      this.searchForm = e
      this.getList()
    },
    handleReload(e) {
      if (e) {
        this.pagination.pageNum = e.pageNum
        this.pagination.pageSize = e.pageSize
      }
      this.getList()
    },
    getList() {
      this.loading = true
      httpGetCaseList({ type: this.type, ...this.pagination, ...this.searchForm }).then(res => {
        this.list = res.data.list
        this.pagination.pageTotal = res.data.total
      }).finally(() => {
        this.loading = false
      })
    },
    handleCaseEntry() {
      this.$router.push('/case/caseEntry')
    },
    handleActClick({ act, item }) {
      if (act === ACTIONS.Edit) {
        this.$router.push({
          path: '/case/caseDetail',
          query: {
            id: item.id,
            fId: item.caseFolderId,
            isEdit: 1
          }
        })
      } else if (act === 'caseProgress') {
        // this.caseProStatus = []
        // httpGetProStatusDict({ lawsuit: item.locusStandCode, stage: item.caseStageCode }).then(res => {
        //   this.caseProStatus = res.data
        // })
        // this.dialog.caseId = item.id
        // this.dialog.showAddJinzhan = true
      } else if (act === ACTIONS.Detail) {
        this.$router.push({
          path: '/case/caseDetail',
          query: {
            id: item.id,
            fId: item.caseFolderId,
            isEdit: 0
          }
        })
      }
    },
    handleExport() {
      this.exportLoading = true
      httpExport({ type: this.type, ...this.searchForm }).then(res => {
        const fileName = this.$route.meta.title || ''
        const curDate = new Date().getTime()
        saveAs(res, `${fileName}${curDate}.xlsx`)
      }).finally(() => {
        this.exportLoading = false
      })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
</style>
