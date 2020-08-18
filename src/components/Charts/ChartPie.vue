<template>
  <div v-if="show">
    <div v-if="title" class="text-center text-gray padding-bottom-lg">{{ title }}</div>
    <v-chart :forceFit="true" :height="400" :data="list" :scale="scale">
      <v-tooltip :showTitle="false" />
      <v-axis />
      <v-legend dataKey="k" />
      <v-pie position="p" color="k" :vStyle="pieStyle" :label="labelConfig" />
      <v-coord type="theta" v-bind="coordModal" />
    </v-chart>
  </div>
</template>

<script>
const DataSet = require('@antv/data-set')

const scale = [{
  dataKey: 'p',
  alias: '占比',
  min: 0,
  formatter: '.0%'
}]

export default {
  props: {
    isRing: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default() {
        return [
          { k: '事例一', v: 10 }
        ]
      }
    }
  },
  data() {
    return {
      show: false,
      scale,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      },
      labelConfig: ['p', {
        formatter: (val, item) => {
          return `${item.point.k}：${val}，数量：${item.point.v}`
        }
      }]
    }
  },
  computed: {
    coordModal() {
      if (this.isRing) {
        return { radius: 0.75, innerRadius: 0.6 }
      } else {
        return {}
      }
    },
    list() {
      const sum = this.data.reduce((accumulator, current) => accumulator + current.v, 0)
      const l = this.data.map(item => {
        item.p = Math.round(item.v / sum * 100)
        return item
      })

      const dv = new DataSet.View().source(l)
      dv.transform({
        type: 'percent',
        field: 'p',
        dimension: 'k',
        as: 'p'
      })
      return dv.rows
    }
  },
  mounted() {
    setTimeout(() => {
      this.show = true
    }, 50)
  }
}
</script>

<style lang="less" scoped>
</style>
