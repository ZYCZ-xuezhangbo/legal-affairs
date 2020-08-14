<template>
  <div>
    <Search />
    <List api="user" :title="listTitle" :columns="columns" :actions="['edit', 'look','caseProgress']" :loading="loading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" />
  </div>
</template>

<script>
import moment from 'moment'
import Search from './Search'
import { PageList as List } from '@/components'

const list = []
for (let i = 0; i < 10; i++) {
  const item = {
    key: i,
    id: i,
    order: i,
    unitInvolvedOfWe: `${i}股份有限公司有限公司有限公`,
    litigationStatus: '原告',
    latestCaseNumber: `SDFWEIFJ32${i}`,
    causeOfAction: '人格纠纷',
    timeOfLitigation: moment().calendar(),
    isMajorCase: '是',
    amountInvolved: `9438${i}`,
    competentCourt: `${i}法院`,
    stageOfTheCase: '二审',
    progressStatus: '审理'
  }

  list.push(item)
}
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
          title: '序号',
          dataIndex: 'order',
          key: 'order'
        },
        {
          title: '我方涉案单位',
          dataIndex: 'unitInvolvedOfWe',
          key: 'unitInvolvedOfWe',
          scopedSlots: { customRender: 'unitInvolvedOfWe' }
        },
        {
          title: '诉讼地位',
          dataIndex: 'litigationStatus',
          key: 'litigationStatus'
        },
        {
          title: '最新案号',
          dataIndex: 'latestCaseNumber',
          key: 'latestCaseNumber',
          scopedSlots: { customRender: 'latestCaseNumber' }
        },
        {
          title: '案由',
          dataIndex: 'causeOfAction',
          key: 'causeOfAction'
        },
        {
          title: '成诉时间',
          dataIndex: 'timeOfLitigation',
          key: 'timeOfLitigation'
        },
        {
          title: '是否重大案件',
          dataIndex: 'isMajorCase',
          key: 'isMajorCase'
        },
        {
          title: '涉案金额',
          dataIndex: 'amountInvolved',
          key: 'amountInvolved'
        },
        {
          title: '管辖法院',
          dataIndex: 'competentCourt',
          key: 'competentCourt'
        },
        {
          title: '案件所处阶段',
          dataIndex: 'stageOfTheCase',
          key: 'stageOfTheCase'
        },
        {
          title: '进展状态',
          dataIndex: 'progressStatus',
          key: 'progressStatus'
        }
      ],
      list
    }
  },
  methods: {
    handleReload({ pageNum, pageSize }) {
      this.pagination.pageNum = pageNum
      this.pagination.pageSize = pageSize
      this.getList()
    },
    getList() {
      console.log('case list getList()')
    },
    handleShowAdd() { },
    handleActClick({ act, id }) {
      console.log(act + ',' + id)
      if (act === 'edit') {
        this.$router.push(`/case/caseDetail/${id}`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
