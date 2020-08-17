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
        { k: '一审', v: 41 },
        { k: '二审', v: 22 },
        { k: '执行', v: 13 },
        { k: '再审', v: 14 },
        { k: '结案', v: 5 }
      ],
      barData: [
        { x: '破产清算', y: 29034 },
        { x: '行政诉讼', y: 131744 },
        { x: '工程纠纷', y: 104970 },
        { x: '生产作业纠纷', y: 23489 },
        { x: '土地使用权纠纷', y: 12822 },
        { x: '贸易纠纷', y: 13803 },
        { x: '其他', y: 14823 }
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
          name: '股份有限公司1',
          money: '300',
          num: '10'
        },
        {
          key: '2',
          name: '股份有限公司2',
          money: '3001',
          num: '102'
        },
        {
          key: '3',
          name: '股份有限公司3',
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
