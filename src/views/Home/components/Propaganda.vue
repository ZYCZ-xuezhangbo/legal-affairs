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
      <div v-show="radioVal===1">
        <a-table :columns="columns" :data-source="data.legalSystemList" :bordered="false" :pagination="false" :row-key="e=>e.id">
          <template #title>
            {{ tableTitle }}
          </template>
        </a-table>
      </div>
      <div v-show="radioVal===2">
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
      radioVal: 1,
      radios: [
        {
          key: 1,
          name: '法律制度'
        },
        {
          key: 2,
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
          dataIndex: 'time'
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
