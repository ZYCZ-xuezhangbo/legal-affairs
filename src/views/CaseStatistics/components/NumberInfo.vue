<template>
  <a-card :bordered="false" :loading="loading" class="margin-top-lg">
    <div class="statistics-title">{{ title }}</div>
    <div class="statistics-num">
      <a class="number">{{ info.number | NumberFormat }}</a>
    </div>
    <a-row type="flex" class="margin-top-lg">
      <a-col :flex="1">
        <a-statistic title="本单位" :value="info.deptNum" />
      </a-col>
      <a-col :flex="1">
        <a-statistic title="占比" :value="proNum" suffix="%" />
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import NP from 'number-precision'

export default {
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    info: {
      type: Object,
      default() {
        return {
          number: 0,
          deptNum: 0
        }
      }
    }
  },
  computed: {
    proNum() {
      return (NP.divide(this.info.deptNum, this.info.number) * 100).toFixed(2)
    }
  }
}
</script>

<style scoped lang="less">
.number {
  cursor: text;
}
.statistics-title {
  font-size: 16px;
}
.statistics-num {
  font-size: 34px;
}
</style>
