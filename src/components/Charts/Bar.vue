<template>
  <div v-if="show">
    <div v-if="title" class="text-center text-gray padding-bottom">{{ title }}</div>
    <v-chart :height="height" :data="list" :forceFit="true" :scale="scale">
      <v-coord v-if="isDirection" type="rect" direction="LB" />
      <v-tooltip />
      <v-axis dataKey="x" />
      <v-bar position="x*y" />
    </v-chart>
  </div>
</template>

<script>
const DataSet = require('@antv/data-set')

export default {
  name: 'Bar',
  props: {
    isDirection: {
      type: Boolean,
      default: false
    },
    isSort: {
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
          { x: 'x1', y: 'y1' },
          { x: 'x2', y: 'y2' }
        ]
      }
    },
    height: {
      type: Number,
      default: 400
    },
    scale: {
      type: Array,
      default() {
        return [{
          dataKey: 'x'
        }, {
          dataKey: 'y',
          alias: '数量'
        }]
      }
    },
    tooltip: {
      type: Array,
      default() {
        return [
          'x*y',
          (x, y) => ({
            name: x,
            value: y
          })
        ]
      }
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    list() {
      if (this.isSort) {
        const dv = new DataSet.View().source(this.data)
        dv.transform({
          type: 'sort',
          callback(a, b) {
            return b.y - a.y
          }
        })
        return dv.rows
      } else {
        if (this.isDirection) {
          const v = this.data
          return v.reverse()
        } else {
          return this.data
        }
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.show = true
    }, 50)
  }
}
</script>
