<template>
  <div>
    <a-table :columns="columns" :data-source="data" :bordered="true" :pagination="false" :row-key="e=>e.id">
      <template #title>
        律师评价排名
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
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

<style>
</style>
