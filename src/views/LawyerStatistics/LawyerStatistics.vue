<template>
  <page-header-wrapper :tab-list="tabs" :tab-active-key="activeTab" @tabChange="e => activeTab = e">
    <Page ref="page1" v-show="activeTab==='1'" :tab="activeTab" />
    <Page ref="page2" v-show="activeTab==='2'" :tab="activeTab" />
    <Page ref="page3" v-show="activeTab==='3'" :tab="activeTab" />
  </page-header-wrapper>
</template>

<script>
import Page from './components/Page'

export default {
  components: {
    Page
  },
  data() {
    return {
      tabs: [
        {
          key: '1',
          tab: '律师工作统计'
        },
        {
          key: '2',
          tab: '律师评价统计'
        },
        {
          key: '3',
          tab: '律师评价排行'
        }
      ],
      activeTab: '1',
      span: {
        md: 24,
        lg: 12
      },
      regDateForm: {
        dateType: 'month',
        startDate: '',
        endDate: ''
      },
      pieData: [
        { k: '事例1', v: 41 },
        { k: '事例2', v: 22 },
        { k: '事例3', v: 13 },
        { k: '事例4', v: 14 },
        { k: '事例5', v: 5 }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 18px;
  margin-bottom: 10px;
}
/deep/ .ant-form-item {
  margin-bottom: 0;
}
</style>
