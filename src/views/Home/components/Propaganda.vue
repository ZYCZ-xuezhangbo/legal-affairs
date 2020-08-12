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
      <a-table :columns="columns" :data-source="data" :bordered="false" :pagination="false" :row-key="e=>e.id">
        <template #title>
          {{ tableTitle }}
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
export default {
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
          dataIndex: 'name'
        },
        {
          title: '日期',
          dataIndex: 'date'
        }
      ],
      data: [
        {
          id: 1,
          name: 'name1',
          date: '2020-01-01'
        },
        {
          id: 2,
          name: 'name2',
          date: '2020-01-02'
        }
      ]
    }
  },
  computed: {
    tableTitle() {
      return this.radios.find(v => v.key === this.radioVal).name
    }
  },
  methods: {
    handleRadioChange(e) {
      console.log(e)
    }
  }
}
</script>

<style>
</style>
