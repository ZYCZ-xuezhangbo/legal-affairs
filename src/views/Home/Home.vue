<template>
  <div>
    <LegalSystem />
    <CaseStatistics class="margin-top-lg" :ringData="ringData" :majorCasesData="majorCasesData" :barData="barData" />
    <LegalReview class="margin-top-lg"/>
  </div>
</template>

<script>
import LegalSystem from './components/LegalSystem'
import CaseStatistics from './components/CaseStatistics'
import LegalReview from './components/LegalReview'

export default {
  components: {
    LegalSystem,
    CaseStatistics,
    LegalReview
  },
  data() {
    return {
      ringData: [
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
