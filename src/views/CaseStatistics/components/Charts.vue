<template>
  <a-card :bordered="false" :loading="loading" class="margin-top-lg">
    <a-row :gutter="gutter">
      <a-col v-bind="span">
        <ChartPie is-ring :data="dataPie" title="各阶段案件数量占比" />
      </a-col>
      <a-col v-bind="span">
        <ChartBar :data="dataBar" title="案件种类统计" />
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { ChartPie, ChartBar } from '@/components'

export default {
  props: {
    grid: {
      type: Object,
      default() {
        return {
          gutter: 0,
          span: {}
        }
      }
    },
    loading: {
      type: Boolean,
      default: true
    },
    dataPie: {
      type: Array,
      default() {
        return [
          // { k: '一审', v: 41 }
        ]
      }
    },
    dataBar: {
      type: Array,
      default() {
        return [
          // { x: '破产清算', y: 29034 }
        ]
      }
    }
  },
  components: {
    ChartPie,
    ChartBar
  },
  computed: {
    gutter() {
      return this.grid.gutter
    },
    span() {
      return this.grid.span
    }
  }
}
</script>

<style scoped lang="less">
</style>
