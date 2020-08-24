<template>
  <div>
    <LegalSystem :data="indexLegalSystemDTO" />
    <CaseStatistics class="margin-top-lg" :data="indexCaseDTO" />
    <LegalReview class="margin-top-lg" :data="indexLegalReviewDTO" />
    <FirmExternal class="margin-top-lg" :data="indexOutsideLawFirmDTO" />
    <Propaganda class="margin-top-lg" :data="indexPublicityDTO" />
  </div>
</template>

<script>
import { info as httpGetData } from '@/api/home'
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
      // 案件统计
      indexCaseDTO: {
        // 各阶段案件数量占比
        circularChartXYDTOList: [
          {
            key: '',
            value: 0
          }
        ],
        // 各案件总类数量
        formChartXYDTOList: [
          {
            key: '',
            value: 0
          }
        ],
        litigationCaseNum: 0, // 在诉案件数量
        // 各单位重大案件
        majorCaseDTOList: [
          {
            companyName: '',
            money: 0,
            number: 0
          }
        ],
        yearClosedCaseNum: 0 // 年度案件结案数量
      },
      // 法律审核
      indexLegalReviewDTO: {
        contractReviewMoney: 0, // 合同万元
        contractReviewNum: 0, // 合同审核
        countersignatureReview: 0, // 会签审核
        decisionReview: 0, // 决策审核
        systemReviewNum: 0// 制度审核
      },
      // 法律体系
      indexLegalSystemDTO: {
        adviserNum: 0, // 总法顾问人员数量
        legalPersonnelNum: 0, // 法律人员数量
        legalSystemNum: 0, // 法律制度数量
        occupationalNum: 0, // 职业资格数量
        professionalNum: 0, // 专业背景数量
        soleDutyNum: 0// 专职数量
      },
      // 外部律所服务
      indexOutsideLawFirmDTO: {
        // 律所服务类型
        lawFirmChartXYDTOList: [
          {
            key: '',
            value: 0
          }
        ],
        // 律所服务统计
        lawFirmChartXYYDTODTOList: [
          {
            key: '',
            value1: 0,
            value2: 0
          }
        ]
      },
      // 普法宣传平台
      indexPublicityDTO: {
        legalSystemList: [], // 法律制度
        noticeList: [], // 公告列表
        policyList: []
      }
    }
  },
  methods: {
    getData() {
      httpGetData().then(res => {
        this.indexCaseDTO = res.data.indexCaseDTO
        this.indexLegalReviewDTO = res.data.indexLegalReviewDTO
        this.indexLegalSystemDTO = res.data.indexLegalSystemDTO
        this.indexOutsideLawFirmDTO = res.data.indexOutsideLawFirmDTO
        this.indexPublicityDTO = res.data.indexPublicityDTO
      })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
</style>
