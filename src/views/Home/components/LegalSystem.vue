<template>
  <a-card :bordered="false" title="法律体系">
    <a-row :gutter="50">
      <a-col :sm="24" :md="8">
        <a-card class="margin-bottom-lg">
          <a-statistic title="总法顾问人员数量" :value="data.adviserNum"> </a-statistic>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="8">
        <a-card class="margin-bottom-lg">
          <a-statistic title="法律人员数量" :value="data.legalPersonnelNum"> </a-statistic>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="8">
        <a-card class="margin-bottom-lg">
          <a-statistic title="法律制度数量" :value="data.legalSystemNum"> </a-statistic>
        </a-card>
      </a-col>
    </a-row>
    <a-card>
      <div class="text-center text-gray margin-bottom">法律人员</div>
      <a-row :gutter="48">
        <a-col :sm="24" :md="8">
          <LegalSystemChart title="有专业背景" :total="data.legalPersonnelNum" :value="data.professionalNum" />
        </a-col>
        <a-col :sm="24" :md="8">
          <LegalSystemChart title="有职业资格" :total="data.legalPersonnelNum" :value="data.occupationalNum" />
        </a-col>
        <a-col :sm="24" :md="8">
          <LegalSystemChart title="专职" :total="data.legalPersonnelNum" :value="data.soleDutyNum" />
        </a-col>
      </a-row>
    </a-card>
  </a-card>
</template>

<script>
import LegalSystemChart from './LegalSystemChart'

export default {
  components: {
    LegalSystemChart
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style>
</style>
