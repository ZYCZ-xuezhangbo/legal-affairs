<template>
  <div>
    <a-table :columns="columns" :data-source="list">
      <template #action>
        <a>修改</a>
      </template>
    </a-table>
  </div>
</template>

<script>
const list = [
  {
    key: '1',
    date: '2020-01-02',
    time: '11:01:01',
    operator: '张三',
    content: '案由'
  }
]
export default {
  data() {
    return {
      columns: [
        {
          title: '日期',
          dataIndex: 'date',
          key: 'date'
        },
        {
          title: '时间',
          dataIndex: 'time',
          key: 'time'
        },
        {
          title: '操作人',
          dataIndex: 'operator',
          key: 'operator'
        },
        {
          title: '内容',
          dataIndex: 'content',
          key: 'content'
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      list
    }
  }
}
</script>

<style>
</style>
