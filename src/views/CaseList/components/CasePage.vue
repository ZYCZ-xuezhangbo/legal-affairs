<template>
  <div>
    <Search :dic-data="searchDictData" @search="handleSearch" />
    <List api="user" :title="listTitle" :columns="columns" :actions="['edit','caseProgress']" :loading="loading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" />
  </div>
</template>

<script>
import { page as httpGetCaseList } from '@/api/case'
import Search from './Search'
import { PageList as List } from '@/components'

export default {
  components: {
    Search,
    List
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
      list: []
    }
  },
  methods: {
    handleSearch(e) {
      this.pagination.pageNum = 1
      this.searchForm = e
      this.getList()
    },
    handleReload({ pageNum, pageSize }) {
      this.pagination.pageNum = pageNum
      this.pagination.pageSize = pageSize
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
    handleShowAdd() {
      this.$router.push('/case/caseEntry')
    },
    handleActClick({ act, item }) {
      if (act === 'edit') {
        this.$router.push(`/case/caseDetail/${item.id}/${item.caseFolderId}`)
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
