<template>
  <a-row type="flex" align="middle">
    <a-col :span="6" class="text-right">
      <div class="title">{{ title }}</div>
      <a-statistic title="占比" :value="pro"> </a-statistic>
    </a-col>
    <a-col :span="18">
      <div v-if="total>0">
        <ChartRingSimple :total="total" :value="value" />
      </div>
      <div v-else class="text-center text-gray"> 暂无数据 </div>
    </a-col>
  </a-row>
</template>

<script>
import ChartRingSimple from '@/components/Charts/ChartRingSimple'

export default {
  components: {
    ChartRingSimple
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    total: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    pro() {
      if (this.value === 0 || this.total === 0) {
        return '0%'
      } else {
        return Math.round(this.value / this.total * 100) + '%'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 16px;
  margin-bottom: 15px;
}
</style>
