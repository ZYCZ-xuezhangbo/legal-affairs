<template>
  <div>
    <a-card :bordered="false" title="法律审核">
      <a-row :gutter="50">
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <Statistics :values="statistics.systemReview" title="规章制度审核" jump-url="https://www.baidu.com" />
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <Statistics :values="statistics.contractReview" title="合同审核" />
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <Statistics :values="statistics.decisionReview" title="重大经营决策审核" />
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <Statistics :values="statistics.countersignatureReview" title="一般事项会签审核" />
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
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    statistics() {
      return {
        systemReview: [
          {
            value: this.data.systemReviewNum,
            suffix: '件'
          }
        ],
        contractReview: [
          {
            value: this.data.contractReviewNum,
            suffix: '件'
          },
          {
            value: this.data.contractReviewMoney,
            suffix: '万元'
          }
        ],
        decisionReview: [
          {
            value: this.data.decisionReview,
            suffix: '件'
          }
        ],
        countersignatureReview: [
          {
            value: this.data.countersignatureReview,
            suffix: '件'
          }
        ]
      }
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
