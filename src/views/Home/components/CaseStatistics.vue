<template>
  <a-card :loading="loading" :bordered="false" title="案件统计">
    <a-row :gutter="50">
      <a-col :sm="24" :md="6">
        <a-card class="margin-bottom-lg">
          <a-statistic title="在诉案件数量" :value="data.litigationCaseNum"> </a-statistic>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="6">
        <a-card class="margin-bottom-lg">
          <a-statistic title="本年度结案案件数量" :value="data.yearClosedCaseNum"> </a-statistic>
        </a-card>
      </a-col>
    </a-row>
    <a-row class="margin-top-lg">
      <a-col :sm="24" :md="12">
        <ChartPie title="各阶段案件数量占比" is-ring :data="dataPie" />
      </a-col>
      <a-col :sm="24" :md="12">
        <ChartBar title="各案件种类数量" :is-direction="false" :data="dataBar" />
      </a-col>
    </a-row>
    <a-table :columns="columns" :data-source="data.majorCaseDTOList" bordered :pagination="false" :row-key="e=>e.companyName">
      <template #title>
        各单位重大案件
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { ChartPie, ChartBar } from '@/components'

export default {
  components: {
    ChartPie,
    ChartBar
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      columns: [
        {
          title: '单位',
          dataIndex: 'companyName'
        },
        {
          title: '数量',
          dataIndex: 'number'
        },
        {
          title: '金额（万元）',
          dataIndex: 'money'
        }
      ]
    }
  },
  computed: {
    dataPie() {
      if (this.data.circularChartXYDTOList) return this.data.circularChartXYDTOList.map(v => ({ k: v.key, v: v.value }))
      return []
    },
    dataBar() {
      if (this.data.formChartXYDTOList) return this.data.formChartXYDTOList.map(v => ({ x: v.key, y: v.value }))
      return []
    }
  }
}
</script>

<style>
</style>
