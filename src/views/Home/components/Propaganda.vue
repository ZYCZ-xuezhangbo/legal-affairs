<template>
  <div>
    <a-card :bordered="false" title="普法宣传平台">
      <template #extra>
        <a-radio-group v-model="radioVal">
          <a-radio-button v-for="(item,index) in radios" :key="index" :value="item.key">
            {{ item.name }}
          </a-radio-button>
        </a-radio-group>
      </template>
      <div v-show="radioVal===WORK">
        <a-table :columns="columns" :data-source="data.workTrendList" :bordered="false" :pagination="false" :row-key="e=>e.id">
          <template #title>
            {{ tableTitle }}
          </template>
        </a-table>
      </div>
      <div v-show="radioVal===POLICY">
        <a-table :columns="columns" :data-source="data.policyList" :bordered="false" :pagination="false" :row-key="e=>e.id">
          <template #title>
            {{ tableTitle }}
          </template>
        </a-table>
      </div>
      <div v-show="radioVal===NOTICE">
        <a-table :columns="columns" :data-source="data.noticeList" :bordered="false" :pagination="false" :row-key="e=>e.id">
          <template #title>
            {{ tableTitle }}
          </template>
        </a-table>
      </div>
    </a-card>
  </div>
</template>

<script>
const WORK = '1'
const POLICY = '2'
const NOTICE = '3'

export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      WORK,
      POLICY,
      NOTICE,
      radioVal: WORK,
      radios: [
        {
          key: WORK,
          name: '工作动态'
        },
        {
          key: POLICY,
          name: '国资政策'
        },
        {
          key: NOTICE,
          name: '公告'
        }
      ],
      columns: [
        {
          title: '标题',
          dataIndex: 'title'
        },
        {
          title: '日期',
          dataIndex: 'createTime'
        }
      ]
    }
  },
  computed: {
    tableTitle() {
      return this.radios.find(v => v.key === this.radioVal).name
    }
  }
}
</script>

<style>
</style>
