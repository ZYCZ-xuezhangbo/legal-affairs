<template>
  <div>
    <a-card :bordered="false" title="外部律所服务">
      <a-row>
        <a-col :sm="24" :md="12">
          <ChartPie :data="pieData" />
        </a-col>
        <a-col :sm="24" :md="12">
          <ChartBarGroup :data="barGroupData" />
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
