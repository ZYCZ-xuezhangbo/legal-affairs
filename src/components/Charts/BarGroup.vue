<template>
  <div v-if="show">
    <v-chart :height="400" :data="newData" :forceFit="true">
      <v-coord type="rect" direction="LT" />
      <v-tooltip />
      <v-legend />
      <v-axis dataKey="value" position="right" :show="false" />
      <v-axis dataKey="x" :label="label" />
      <v-bar position="x*value" color="type" :adjust="adjust" />
    </v-chart>
  </div>
</template>

<script>

const DataSet = require('@antv/data-set')

export default {
  props: {
    data: {
      type: Array,
      default() {
        return [
          { x: '律所1', y1: 2800, y2: 2260 }
        ]
      }
    },
    y1Text: {
      type: String,
      default: '数量'
    },
    y2Text: {
      type: String,
      default: '金额(万元)'
    }
  },
  data() {
    return {
      show: false,
      label: { offset: 12 },
      adjust: [{ type: 'dodge', marginRatio: 1 / 32 }]
    }
  },
  computed: {
    newData() {
      const newSourceData = this.data.map(v => {
        v[`${this.y1Text}`] = v.y1
        v[`${this.y2Text}`] = v.y2
        return v
      })
      const dv = new DataSet.View().source(newSourceData)
      dv.transform({
        type: 'fold',
        fields: [`${this.y1Text}`, `${this.y2Text}`],
        key: 'type',
        value: 'value'
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
