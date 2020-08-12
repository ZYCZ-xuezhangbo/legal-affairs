<template>
  <div>
    <LegalSystem />
    <CaseStatistics class="margin-top-lg" :pie-data="pieData" :majorCasesData="majorCasesData" :barData="barData" />
    <LegalReview class="margin-top-lg" />
    <FirmExternal class="margin-top-lg" :pie-data="pieData" :bar-group-data="barGroupData" />
    <Propaganda class="margin-top-lg" />
  </div>
</template>

<script>
import LegalSystem from './components/LegalSystem'
import CaseStatistics from './components/CaseStatistics'
import LegalReview from './components/LegalReview'
import FirmExternal from './components/FirmExternal'
import Propaganda from './components/Propaganda'

export default {
  components: {
    LegalSystem,
    CaseStatistics,
    LegalReview,
    FirmExternal,
    Propaganda
  },
  data() {
    return {
      pieData: [
        { k: '事例1', v: 41 },
        { k: '事例2', v: 22 },
        { k: '事例3', v: 13 },
        { k: '事例4', v: 14 },
        { k: '事例5', v: 5 }
      ],
      barData: [
        { x: '美国', y: 29034 },
        { x: '中国', y: 131744 },
        { x: '印度', y: 104970 },
        { x: '印尼', y: 23489 },
        { x: '巴西', y: 18203 }
      ],
      barGroupData: [
        { x: '律所1', y1: 2800, y2: 2260 },
        { x: '律所2', y1: 800, y2: 569 },
        { x: '律所3', y1: 741, y2: 785 },
        { x: '律所4', y1: 521, y2: 125 }
      ],
      majorCasesData: [
        {
          key: '1',
          name: 'John Brown',
          money: '300',
          num: '10'
        },
        {
          key: '2',
          name: 'John Brown1',
          money: '3001',
          num: '102'
        },
        {
          key: '3',
          name: 'John Brown2',
          money: '3002',
          num: '101'
        }
      ]
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.app.isMobile
    }
  }
}
</script>

<style lang="less" scoped>
</style>
