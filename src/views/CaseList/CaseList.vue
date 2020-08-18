<template>
  <page-header-wrapper :tab-list="tabList" :tab-active-key="activeTab" @tabChange="e => activeTab = e">
    <CasePage v-show="activeTab === '0'" type="0" :list-title="listTitle" :search-dict-data="searchDictData" />
    <CasePage v-show="activeTab === '1'" type="1" :list-title="listTitle" :search-dict-data="searchDictData" />
    <CasePage v-show="activeTab === '2'" type="2" :list-title="listTitle" :search-dict-data="searchDictData" />
    <CasePage v-show="activeTab === '3'" type="3" :list-title="listTitle" :search-dict-data="searchDictData" />
  </page-header-wrapper>
</template>

<script>
import { getCaseDictionaries as httpGetDict } from '@/api/case'
import CasePage from './components/CasePage'

export default {
  components: {
    CasePage
  },
  data() {
    return {
      activeTab: '0',
      tabList: [
        {
          key: '0',
          tab: '在诉案件'
        },
        {
          key: '1',
          tab: '年度结案'
        },
        {
          key: '2',
          tab: '全部案件'
        },
        {
          key: '3',
          tab: '收藏案件'
        }
      ],
      ourUnits: [ // 涉案单位列表
        {
          code: '1',
          name: '单位1'
        }, {
          code: '2',
          name: '单位2'
        }
      ],
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
    })
  }
}
</script>

<style lang="less" scoped>
</style>
