<template>
  <a-pagination class="pagination" :current="pageNum" :total="total" :page-size="pageSize" :show-quick-jumper="showQuickJumper" :show-size-changer="showSizeChanger" :show-total="showTotal" @change="handleChange" @showSizeChange="handleShowSizeChange" />
</template>

<script>
export default {
  props: {
    pageNum: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    showSizeChanger: {
      type: Boolean,
      default: true
    },
    showQuickJumper: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showTotal: (total, range) => {
        return `共${this.total}条`
      }
    }
  },
  methods: {
    handleChange(page, pageSize) {
      this.$emit('change', { page, pageSize })
    },
    handleShowSizeChange(current, size) {
      this.$emit('sizeChange', { current, size })
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  float: right;
  margin: 16px 0;
}
</style>
