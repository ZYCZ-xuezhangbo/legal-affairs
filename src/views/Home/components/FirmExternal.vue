<template>
  <div>
    <a-card :bordered="false" title="外部律所服务">
      <a-row>
        <a-col :sm="24" :md="12">
          <ChartPie :data="pieData" title="律所服务类型" />
        </a-col>
        <a-col :sm="24" :md="12">
          <ChartBarGroup :data="barGroupData" title="律所服务统计" />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import { ChartPie, ChartBarGroup } from '@/components'

export default {
  components: {
    ChartPie,
    ChartBarGroup
  },
  props: {
    pieData: {
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
    barGroupData: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
</style>
