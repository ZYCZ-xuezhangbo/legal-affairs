<template>
  <page-header-wrapper>
    <Search :table-type="tableType" :export-loading="exportLoading" @export="handleExport" />
    <List :columns="columns" :show-extra="false" :actions="[ACTIONS.Download]" :loading="loading" :list="list" :pagination="pagination" @reload="handleReload" @actClick="handleActClick" />
  </page-header-wrapper>
</template>

<script>
import { ACTIONS } from '@/store/mutation-types'
import { downloadFile } from '@/utils/util'
import { paginationMixin } from '@/mixin/pagination-mixin'
import { list as httpGetList, export_ as httpExport, getCollectType } from '@/api/caseCollect'
import { PageList as List } from '@/components'
import Search from './components/Search'

export default {
  mixins: [paginationMixin],
  components: {
    Search,
    List
  },
  data() {
    return {
      tableType: [], // 报表类型
      columns: [
        {
          title: '报表名称',
          dataIndex: 'tableName',
          key: 'tableName'
        },
        {
          title: '统计时间',
          dataIndex: 'statisticsTime',
          key: 'statisticsTime'
        },
        {
          title: '生成时间',
          dataIndex: 'createTime',
          key: 'createTime'
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status'
        }
      ]
    }
  },
  methods: {
    handleExport(e) {
      this.searchData = e
      this.exportLoading = true
      httpExport(this.searchData).then(() => {
        this.$message.success('导出成功')
        this.getList()
      }).finally(() => {
        this.exportLoading = false
      })
    },
    getList() {
      this.getListMixin(httpGetList)
    },
    getDict() {
      getCollectType().then(res => {
        this.tableType = res.data
      })
    },
    handleActClick({ act, item }) {
      if (act === ACTIONS.Download) {
        const fileName = `${item.tableName}${new Date().getTime()}`
        const loading = this.$message.loading('下载中...', 0)

        downloadFile(item.url, fileName, 'ajax').catch(() => {
          this.$message.error('下载失败')
        }).finally(() => {
          setTimeout(loading, 1000)
        })
      }
    }
  },
  mounted() {
    this.getDict()
    this.getList()
  }
}
</script>

<style lang="less" scoped>
</style>
