<template>
  <page-header-wrapper :tab-list="tabList" :tab-active-key="activeTab" @tabChange="e => activeTab = e">
    <CasePage v-show="activeTab === ZAISU" :type="ZAISU" :list-title="listTitle" :search-dict-data="searchDictData" />
    <CasePage v-show="activeTab === YEAR" :type="YEAR" :list-title="listTitle" :search-dict-data="searchDictData" />
    <CasePage v-show="activeTab === ALL" :type="ALL" :list-title="listTitle" :search-dict-data="searchDictData" />
    <CasePage v-show="activeTab === FAV" :type="FAV" :list-title="listTitle" :search-dict-data="searchDictData" />
  </page-header-wrapper>
</template>

<script>
import { getCaseDictionaries as httpGetDict } from '@/api/case'

const ZAISU = '0'
const YEAR = '1'
const ALL = '2'
const FAV = '3'

export default {
  components: {
    CasePage: () => import('./components/CasePage')
  },
  data() {
    return {
      ZAISU,
      YEAR,
      ALL,
      FAV,
      activeTab: ZAISU,
      tabList: [
        {
          key: ZAISU,
          tab: '在诉案件'
        },
        {
          key: YEAR,
          tab: '年度结案'
        },
        {
          key: ALL,
          tab: '全部案件'
        },
        {
          key: FAV,
          tab: '收藏案件'
        }
      ],
      ourUnits: [], // 涉案单位列表
      caseTypeList: [], // 案件种类列表
      caseStageList: [] // 案件阶段列表
    }
  },
  computed: {
    listTitle() {
      return this.tabList.find(v => v.key === this.activeTab).tab
    },
    searchDictData() {
      return {
        ourUnits: this.ourUnits,
        caseTypeList: this.caseTypeList,
        caseStageList: this.caseStageList
      }
    }
  },
  mounted() {
    httpGetDict().then(res => {
      this.caseTypeList = res.data.CASETYPE
      this.caseStageList = res.data.STAGE
      this.ourUnits = res.data.COMPANY
    })
  }
}
</script>

<style lang="less" scoped>
</style>
