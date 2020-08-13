<template>
  <div>
    <Search class="search" ref="search" :tab="tab" />
    <TabWork v-if="tab==='1'" :data-pie="tabWord.dataPie" :data-bar="tabWord.dataBar" />
    <TabEvaluate v-else-if="tab==='2'" :data-pie="tabEvaluate.dataPie" :data-bar="tabEvaluate.dataBar" />
    <TabEvaluateRank v-else-if="tab==='3'" />
  </div>
</template>

<script>
import Search from './Search'
import TabWork from './TabWork'
import TabEvaluate from './TabEvaluate'
import TabEvaluateRank from './TabEvaluateRank'

export default {
  components: {
    Search,
    TabWork,
    TabEvaluate,
    TabEvaluateRank
  },
  props: {
    tab: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      tabWord: {
        dataPie: [
          { k: '事例1', v: 41 },
          { k: '事例2', v: 22 },
          { k: '事例3', v: 13 },
          { k: '事例4', v: 14 },
          { k: '事例5', v: 5 }
        ],
        dataBar: [
          { x: '律所1', y1: 2800, y2: 2260 },
          { x: '律所2', y1: 800, y2: 569 },
          { x: '律所3', y1: 741, y2: 785 },
          { x: '律所4', y1: 521, y2: 125 }
        ]
      },
      tabEvaluate: {
        dataPie: [
          { k: '事例1', v: 41 },
          { k: '事例2', v: 22 },
          { k: '事例3', v: 13 },
          { k: '事例4', v: 14 },
          { k: '事例5', v: 5 }
        ],
        dataBar: [
          { x: '美国', y: 29034 },
          { x: '中国', y: 131744 },
          { x: '印度', y: 104970 },
          { x: '印尼', y: 23489 },
          { x: '巴西', y: 18203 }
        ]
      }
    }
  },
  methods: {
    search() {
      const form = this.$refs.search.form
      console.log(form)
    }
  }
}
</script>

<style>
.search {
  margin-bottom: 50px;
}
</style>
