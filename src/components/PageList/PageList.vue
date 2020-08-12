<template>
  <div>
    <a-card :bordered="false" :title="title" class="margin-top-lg">
      <template #extra>
        <a-button class="margin-right" type="primary" @click="handleShowAdd"> 新建 </a-button>
        <a-button type="primary" @click="handleExport"> 导出 </a-button>
      </template>
      <a-table :loading="loading" :columns="columnList" :data-source="list" :pagination="false" :row-key="e => e.id">
        <template #action="item">
          <span v-if="actList.length>0">
            <span v-for="(v,k) in actList" :key="k">
              <a @click="handleClick(v.code,item.id)">{{ v.name }}</a>
              <a-divider v-if="k < actList.length-1" type="vertical" />
            </span>
          </span>
        </template>
      </a-table>
      <Pagination :page-num="pagination.pageNum" :page-size="pagination.pageSize" :total="pagination.pageTotal" @change="handlePageNumChange" @sizeChange="handlePageSizeChange" />
    </a-card>
  </div>
</template>

<script>
import { Pagination } from '@/components'

export default {
  components: {
    Pagination
  },
  props: {
    api: {
      type: String,
      require: true,
      default: 'user'
    },
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      require: true,
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
    columns: {
      type: Array,
      require: true,
      default() {
        return []
      }
    },
    actions: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      API: require(`@/api/${this.api}`)
    }
  },
  computed: {
    columnList() {
      const c = this.columns
      c.push({
        title: '操作',
        align: 'right',
        key: 'action',
        scopedSlots: { customRender: 'action' }
      })
      return c
    },
    actList() {
      const list = []
      for (let i = 0; i < this.actions.length; i++) {
        const code = this.actions[i]
        const item = { name: '', code }
        switch (code) {
          case 'edit':
            item.name = '修改'
            break
          case 'look':
            item.name = '查看'
            break
          case 'caseProgress':
            item.name = '案件进展'
            break
          case 'delete':
            item.name = '删除'
            break
          case 'download':
            item.name = '下载'
            break
          default:
            break
        }

        list.push(item)
      }
      return list
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
    },
    handleClick(act, id) {
      if (act === 'delete') {
        this.handleDelete(id)
      } else {
        this.$emit('actClick', { act, id })
      }
    },
    handleShowAdd() {
      this.$emit('showAdd')
    },
    handleDelete(id) {
      this.$confirm({
        title: '删除',
        content: '确定删除该数据吗？',
        okType: 'danger',
        cancelText: '取消',
        okText: '确定',
        onOk: () => {
          return this.API.delete_(id).then(res => {
            this.$message.success(res.msg)
            this.$emit('reload', {
              pageNum: this.pagination.pageNum,
              pageSize: this.pagination.pageSize
            })
          })
        }
      })
    },
    handleExport() {
      this.$message.info('导出')
    }
  }
}
</script>

<style>
</style>
