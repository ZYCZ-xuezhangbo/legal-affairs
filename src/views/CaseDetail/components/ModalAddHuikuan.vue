<template>
  <div>
    <a-modal title="新增回款" ok-text="提交" :visible="show" :confirm-loading="submitLoading" @ok="handleClose" @cancel="handleClose">
      <a-table :columns="columns" :data-source="data" bordered>
        <template #action>
          <a>修改</a>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const list = []
    for (let i = 0; i < 100; i++) {
      list.push({
        key: i.toString(),
        money: `1000 ${i}`,
        date: '2020-01-02'
      })
    }
    return {
      submitLoading: false,
      columns: [
        {
          title: '回款',
          dataIndex: 'money',
          width: '35%',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '回款时间',
          dataIndex: 'date',
          width: '35%',
          scopedSlots: { customRender: 'age' }
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: list
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
</style>
