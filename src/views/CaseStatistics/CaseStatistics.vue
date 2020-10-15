<template>
  <page-header-wrapper>
    <Search :grid="grid" :condition="condition" :dict="dict" @search="getList" />
    <Charts :grid="grid" :data-pie="dataPie" :data-bar="dataBar" :loading="loading" />
    <a-row :gutter="gutter">
      <a-col v-bind="span">
        <NumberInfo title="案件数量合计" :info="caseNumberInfo" :loading="loading" />
      </a-col>
      <a-col v-bind="span">
        <NumberInfo title="案件金额（万元）" :info="caseMoneyInfo" :loading="loading" />
      </a-col>
    </a-row>
    <List title="各单位案件" :columns="columns" :list="caseList" :loading="loading" />
    <List title="各单位重大案件" :columns="columns" :list="caseMajorList" :loading="loading" />
  </page-header-wrapper>
</template>

<script>
import { getCaseDictionaries } from '@/api/case'
import { list as httpGetList } from '@/api/caseStatistics'
import { getInformantDictionary as httpGetCompanyList } from '@/api/informant'
import Search from './components/Search'
import Charts from './components/Charts'
import NumberInfo from './components/NumberInfo'
import List from './components/List'

export default {
  components: {
    Search,
    Charts,
    NumberInfo,
    List
  },
  data() {
    return {
      grid: {
        gutter: 12,
        span: {
          md: 24,
          lg: 12
        }
      },
      condition: {
        dateType: 0,
        startTime: '',
        endTime: '',
        amountType: 0,
        caseAmountStart: '',
        caseAmountEnd: '',
        locusStand: [],
        company: ''
      },
      loading: true,
      searchData: {},
      // 字典相关
      dict: {
        locusStand: [], // 诉讼地位
        company: [] // 所有公司列表
      },
      // 饼图
      dataPie: [],
      // 柱状图
      dataBar: [],
      // 案件数量合计
      caseNumberInfo: {
        number: 0,
        deptNum: 0
      },
      // 案件金额
      caseMoneyInfo: {
        number: 0,
        deptNum: 0
      },
      columns: [
        {
          title: '单位',
          dataIndex: 'companyName'
        },
        {
          title: '数量',
          dataIndex: 'number'
        },
        {
          title: '金额（万元）',
          dataIndex: 'money'
        }
      ],
      caseList: [], // 各单位案件列表
      caseMajorList: [] // 各单位重大案件列表
    }
  },
  computed: {
    gutter() {
      return this.grid.gutter
    },
    span() {
      return this.grid.span
    }
  },
  methods: {
    getDict() {
      getCaseDictionaries().then(res => {
        this.dict.locusStand = res.data.LAWSUIT.map(v => ({ label: v.name, value: v.code }))
      })
      httpGetCompanyList().then(res => {
        this.dict.company = res.data.COMPANY
      })
    },
    getList() {
      this.loading = true
      httpGetList(this.condition).then(res => {
        const data = res.data
        this.caseNumberInfo = {
          number: data.caseNum.caseTotalNum,
          deptNum: data.caseNum.unitsCaseNum
        }
        this.caseMoneyInfo = {
          number: data.caseAmount.caseTotalAmount,
          deptNum: data.caseAmount.unitsCaseAmount
        }
        this.caseList = data.caseDTOList
        this.caseMajorList = data.majorCaseDTOList
        this.dataPie = data.circularChartXYDTOList.map(v => ({ k: v.key, v: v.value }))
        this.dataBar = data.formChartXYDTOList.map(v => ({ x: v.key, y: v.value }))
      }).finally(() => {
        this.loading = false
      })
    }
  },
  mounted() {
    this.getDict()
    this.getList()
  }
}
</script>

<style scoped>
</style>
