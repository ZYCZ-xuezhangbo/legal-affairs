<template>
  <div>
    <ModalAddJinzhan :show="dialog.showAddJinzhan" :case-id="dialog.caseId" :case-pro-status="caseProStatus" @close="dialog.showAddJinzhan=false" @reload="handleReload" />

    <Search :dic-data="searchDictData" @search="handleSearch" />
    <List api="user" :title="listTitle" :columns="columns" :actions="['edit','caseProgress']" :loading="loading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleCaseEntry" @actClick="handleActClick" />
  </div>
</template>

<script>
import { page as httpGetCaseList } from '@/api/case'
import { getProgressDictionary as httpGetProStatusDict } from '@/api/caseProgress'
import { PageList as List } from '@/components'
import Search from './Search'
import ModalAddJinzhan from '../../CaseDetail/components/ModalAddJinzhan'

export default {
  components: {
    Search,
    List,
    ModalAddJinzhan
  },
  props: {
    type: {
      type: String,
      default: ''
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
      dialog: {
        caseId: '',
        showAddJinzhan: false
      },
      searchForm: {},
      loading: false,
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
      if (act === 'edit') {
        this.$router.push(`/case/caseDetail/${item.id}/${item.caseFolderId}`)
      } else if (act === 'caseProgress') {
        this.caseProStatus = []
        httpGetProStatusDict({ lawsuit: item.locusStandCode, stage: item.caseStageCode }).then(res => {
          this.caseProStatus = res.data
        })
        this.dialog.caseId = item.id
        this.dialog.showAddJinzhan = true
      }
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
</style>
