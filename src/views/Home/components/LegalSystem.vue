<template>
  <a-card :bordered="false" title="法律体系">
    <a-row :gutter="50">
      <a-col :sm="24" :md="8">
        <a-card class="margin-bottom-lg">
          <a-statistic title="总法顾问人员数量" :value="1234"> </a-statistic>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="8">
        <a-card class="margin-bottom-lg">
          <a-statistic title="法律人员数量" :value="1234"> </a-statistic>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="8">
        <a-card class="margin-bottom-lg">
          <a-statistic title="法律制度数量" :value="1234"> </a-statistic>
        </a-card>
      </a-col>
    </a-row>
    <a-card>
      <div class="text-center text-gray margin-bottom">法律人员</div>
      <a-row :gutter="48">
        <a-col :sm="24" :md="8">
          <LegalSystemChart title="有专业背景" :total="127" :value="98" />
        </a-col>
        <a-col :sm="24" :md="8">
          <LegalSystemChart title="有职业资格" :total="127" :value="58" />
        </a-col>
        <a-col :sm="24" :md="8">
          <LegalSystemChart title="专职" :total="127" :value="37" />
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
  methods: {
  }
}
</script>

<style>
</style>
