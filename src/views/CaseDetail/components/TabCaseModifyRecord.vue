<template>
  <div>
    <a-table :columns="columns" :data-source="list" :loading="loading" :pagination="false" :row-key="e=>e.id">
      <template #contentList="list">
        <a-tag v-for="(item,index) in list" :key="index">
          {{ item }}
        </a-tag>
      </template>
    </a-table>
    <Pagination :page-num="pagination.pageNum" :page-size="pagination.pageSize" :total="pagination.pageTotal" @change="handlePageNumChange" @sizeChange="handlePageSizeChange" />
  </div>
</template>

<script>
import { Pagination } from '@/components'

export default {
  components: {
    Pagination
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    pagination: {
      type: Object,
      default() {
        return {
          pageNum: 1,
          pageSize: 10,
          pageTotal: 0
        }
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      columns: [
        {
          title: '日期',
          dataIndex: 'dateTime',
          key: 'dateTime'
        },
        {
          title: '时间',
          dataIndex: 'time',
          key: 'time'
        },
        {
          title: '操作人',
          dataIndex: 'author',
          key: 'author'
        },
        {
          title: '操作',
          dataIndex: 'operate',
          key: 'operate'
        },
        {
          title: '内容',
          dataIndex: 'contentList',
          key: 'contentList',
          scopedSlots: { customRender: 'contentList' }
        }
      ]
    }
  },
  methods: {
    handlePageNumChange(e) {
      this.$emit('reload', {
        pageNum: e.page,
        pageSize: e.pageSize
      })
    },
    handlePageSizeChange(e) {
      this.$emit('reload', {
        pageNum: 1,
        pageSize: e.size
      })
    }
  }
}
</script>

<style>
</style>
