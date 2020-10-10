<template>
  <div>
    <a-card :bordered="false" :title="title" class="margin-top-lg">
      <template #extra>
        <button-add @click="handleShowAdd" />
        <button-export :loading="exportLoading" @click="handleExport" />
      </template>
      <a-table v-bind="tableModal" :loading="loading" :columns="columnList" :data-source="list" :pagination="false" :row-key="e => e.id">
        <template #action="item">
          <span v-if="actList.length>0">
            <span v-for="(v,k) in actList" :key="k">
              <a @click="handleClick(v.code,item)">{{ v.name }}</a>
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
import { ACTIONS, ACTIONS_ORDER } from '@/store/mutation-types'
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
    exportLoading: {
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
    scrollWidth: {
      type: Number,
      default: 0
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
      const col = this.columns
      const item = {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' }
      }
      if (this.scrollWidth > 0) item.fixed = 'right'
      col.push(item)
      return col
    },
    tableModal() {
      if (this.scrollWidth > 0) {
        return {
          scroll: { x: this.scrollWidth }
        }
      } else {
        return {}
      }
    },
    actList() {
      const list = []
      for (let i = 0; i < this.actions.length; i++) {
        const code = this.actions[i]
        const item = { name: '', code }
        switch (code) {
          case ACTIONS.Detail:
            item.name = '查看'
            break
          case ACTIONS.Edit:
            item.name = '修改'
            break
          case ACTIONS.Rate:
            item.name = '评价'
            break
          case ACTIONS.Delete:
            item.name = '删除'
            break
          case ACTIONS.Download:
            item.name = '下载'
            break
          case ACTIONS.Preview:
            item.name = '预览'
            break
          case ACTIONS.Role:
            item.name = '角色'
            break
          case ACTIONS.Auth:
            item.name = '权限'
            break
          case ACTIONS.Add:
            item.name = '新增'
            break
          default:
            break
        }
        list.push(item)
      }

      // 按固定顺序排序
      list.sort((a, b) => {
        return ACTIONS_ORDER.indexOf(a.code) - ACTIONS_ORDER.indexOf(b.code)
      })
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
    handleClick(act, item) {
      const id = item.id
      if (act === ACTIONS.Delete) {
        this.handleDelete(id)
      } else {
        this.$emit('actClick', { act, item })
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
            this.$emit('reload', {
              pageNum: this.pagination.pageNum,
              pageSize: this.pagination.pageSize
            })
          })
        }
      })
    },
    handleExport() {
      this.$emit('export')
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-btn + .ant-btn {
  margin-left: 8px;
}
</style>
