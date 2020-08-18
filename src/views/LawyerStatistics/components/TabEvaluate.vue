<template>
  <div>
    <a-card :bordered="false">
      <a-row :gutter="48">
        <a-col :sm="24" :md="12">
          <ChartPie :data="dataPie" title="外聘律师工作数量：67" />
        </a-col>
        <a-col :sm="24" :md="12">
          <ChartBar :data="dataBar" :is-direction="true" title="各评分内工作数" />
        </a-col>
      </a-row>
    </a-card>
    <a-card :bordered="false" class="margin-top-lg">
      <a-table :columns="columns" :data-source="data" :bordered="true" :pagination="false" :row-key="e=>e.id">
        <template #title>
          律师评价排名
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { ChartPie, ChartBar } from '@/components'

export default {
  props: {
    dataPie: {
      type: Array,
      default() {
        return []
      }
    },
    dataBar: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    ChartPie,
    ChartBar
  },
  data() {
    return {
      data: [
        {
          id: 1,
          name: '名称',
          score: 100
        }
      ],
      columns: [
        {
          title: '标题',
          dataIndex: 'name'
        },
        {
          title: '综合评分',
          dataIndex: 'score'
        }
      ]
    }
  }
}
</script>

<style scoped>
.charts-title {
  font-size: 15px;
  padding-bottom: 40px;
  text-align: center;
}
</style>
