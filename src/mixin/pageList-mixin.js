import { ACTIONS, ACTIONS_ENTIRY } from '@/store/mutation-types'
import { array as isArray } from '@/utils/test'
import { Pagination } from '@/components'
import PageListActions from '@/components/PageListActions/PageListActions'

const pageListMixin = {
  components: {
    Pagination,
    PageListActions
  },
  props: {
    api: {
      type: String,
      default: ''
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
    },
    showExtra: {
      // 类型为Boolean时：全部显示或全部隐藏，类型为Array时：仅显示数组中的元素
      type: [Boolean, Array],
      default: true
    }
  },
  data() {
    return {
      ADD: ACTIONS.Add,
      EXPORT: ACTIONS.Export,
      API: this.api !== '' ? require(`@/api/${this.api}`) : ''
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
      return this.scrollWidth > 0 ? { scroll: { x: this.scrollWidth } } : {}
    },
    actList() {
      const list = ACTIONS_ENTIRY.filter(v => this.actions.includes(v.code))
      // 按固定顺序排序
      list.sort((a, b) => ACTIONS_ENTIRY.findIndex(v => v.code === a.code) - ACTIONS_ENTIRY.findIndex(v => v.code === b.code))
      return list
    }
  },
  methods: {
    extraIsShow(code) {
      if (typeof this.showExtra === 'boolean') {
        return this.showExtra
      } else if (isArray(this.showExtra)) {
        return this.showExtra.includes(code)
      }
      return true
    },
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
          if (this.api !== '') {
            return this.API.delete_(id).then(() => {
              this.$emit('reload', {
                pageNum: this.pagination.pageNum,
                pageSize: this.pagination.pageSize
              })
            })
          }
        }
      })
    },
    handleExport() {
      this.$emit('export')
    }
  }
}

export {
  pageListMixin
}
