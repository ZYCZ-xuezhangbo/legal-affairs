<template>
  <div>
    <a-card :bordered="false" title="法律审核">
      <a-row :gutter="50">
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <Statistics :values="statistics.item1" title="规章制度审核" />
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <Statistics :values="statistics.item2" title="合同审核" />
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <Statistics :values="statistics.item3" title="重大经营决策审核" />
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <Statistics :values="statistics.item4" title="一般事项会签审核" />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import Statistics from './LegalReviewStatistic'

export default {
  components: {
    Statistics
  },
  data() {
    return {
      statistics: {
        item1: [
          {
            value: 12,
            suffix: '件'
          }
        ],
        item2: [
          {
            value: 16,
            suffix: '件'
          },
          {
            value: 98,
            suffix: '万元'
          }
        ],
        item3: [
          {
            value: 26,
            suffix: '件'
          }
        ],
        item4: [
          {
            value: 53,
            suffix: '件'
          }
        ]
      }
    }
  }
}
</script>

<style>
</style>
