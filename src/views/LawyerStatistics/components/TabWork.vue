<template>
  <div>
    <a-row :gutter="48">
      <a-col :sm="24" :md="12">
        <ChartPie :data="dataPie" />
      </a-col>
      <a-col :sm="24" :md="12">
        <ChartBarGroup :data="dataBar" />
      </a-col>
    </a-row>
  </div>
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
