<template>
  <div>
    <a-card :bordered="false" title="案件统计">
      <a-row :gutter="50">
        <a-col v-for="(item,index) in 2" :key="index" :sm="24" :md="6">
          <a-card class="margin-bottom-lg">
            <a-statistic :title="'标题'+index" :value="1234+index"> </a-statistic>
          </a-card>
        </a-col>
      </a-row>
      <a-row class="margin-top-lg">
        <a-col :sm="24" :md="12">
          <div class="text-center text-gray">各阶段案件数量占比</div>
          <ChartRing :data="ringData" />
        </a-col>
        <a-col :sm="24" :md="12">
          <div class="text-center text-gray">各案件种类数量</div>
          <ChartBar :data="barData" is-direction />
        </a-col>
      </a-row>
      <a-table :columns="majorCasesColumn" :data-source="majorCasesData" bordered :pagination="false">
        <template #title>
          各单位重大案件
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { ChartRing, ChartBar } from '@/components'

export default {
  components: {
    ChartRing,
    ChartBar
  },
  props: {
    ringData: {
      type: Array,
      default() {
        return []
      }
    },
    barData: {
      type: Array,
      default() {
        return []
      }
    },
    majorCasesData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      majorCasesColumn: [
        {
          title: '单位',
          dataIndex: 'name'
        },
        {
          title: '数量',
          dataIndex: 'num'
        },
        {
          title: '金额（万元）',
          dataIndex: 'money'
        }
      ]
    }
  }
}
</script>

<style>
</style>
