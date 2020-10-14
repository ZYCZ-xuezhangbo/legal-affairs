<template>
  <a-card :loading="loading" :bordered="false" title="外部律所服务">
    <a-row>
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
  components: {
    ChartPie,
    ChartBarGroup
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
  computed: {
    dataPie() {
      if (this.data.lawFirmChartXYDTOList) return this.data.lawFirmChartXYDTOList.map(v => ({ k: v.key, v: v.value }))
      return []
    },
    dataBar() {
      if (this.data.lawFirmChartXYYDTODTOList) return this.data.lawFirmChartXYYDTODTOList.map(v => ({ x: v.key, y1: v.value1, y2: v.value2 }))
      return []
    }
  }
}
</script>

<style>
</style>
