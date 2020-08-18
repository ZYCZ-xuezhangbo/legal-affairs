<template>
  <a-card :bordered="false">
    <a-row :gutter="48">
      <a-col :sm="24" :md="12">
        <ChartPie :data="dataPie" title="律所服务类型" />
      </a-col>
      <a-col :sm="24" :md="12">
        <ChartBarGroup :data="dataBar" title="律所服务统计" />
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { ChartPie, ChartBarGroup } from '@/components'

export default {
  props: {
    dataPie: {
      type: Array,
      default() {
        return []
      }
    },
    dataBar: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    ChartPie, ChartBarGroup
  }
}
</script>

<style>
</style>
