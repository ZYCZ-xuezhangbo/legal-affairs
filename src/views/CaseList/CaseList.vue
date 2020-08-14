<template>
  <page-header-wrapper :tab-list="tabList" :tab-active-key="activeTab" @tabChange="e => activeTab = e">
    <CasePage v-show="activeTab === '1'" type="zaisu" :list-title="listTitle" />
    <CasePage v-show="activeTab === '2'" type="year" :list-title="listTitle" />
    <CasePage v-show="activeTab === '3'" type="all" :list-title="listTitle" />
    <CasePage v-show="activeTab === '4'" type="fav" :list-title="listTitle" />
  </page-header-wrapper>
</template>

<script>
import CasePage from './components/CasePage'

export default {
  components: {
    CasePage
  },
  data() {
    return {
      activeTab: '1',
      tabList: [
        {
          key: '1',
          tab: '在诉案件'
        },
        {
          key: '2',
          tab: '年度结案'
        },
        {
          key: '3',
          tab: '全部案件'
        },
        {
          key: '4',
          tab: '收藏案件'
        }
      ]
    }
  },
  computed: {
    listTitle() {
      return this.tabList.find(v => v.key === this.activeTab).tab
    }
  }
}
</script>

<style lang="less" scoped>

</style>
