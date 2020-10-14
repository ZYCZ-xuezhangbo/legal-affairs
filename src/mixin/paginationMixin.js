import { ACTIONS } from '@/store/mutation-types'
import { saveAs } from '@/utils/util'
import { object as isObject } from '@/utils/test'

export default {
  data() {
    return {
      ACTIONS,
      dialog: {
        editId: '',
        act: '',
        showEdit: false
      },
      searchData: {},
      list: [],
      loading: false,
      exportLoading: false,
      pagination: {
        pageNum: 1,
        pageSize: 10,
        pageTotal: 0
      }
    }
  },
  methods: {
    handleShowAdd() {
      this.dialog.act = this.ACTIONS.Add
      this.dialog.showEdit = true
    },
    handleSearch(data) {
      this.pagination.pageNum = 1
      this.searchData = data
      this.getList()
    },
    handleReload(e) {
      if (e) {
        this.pagination.pageNum = e.pageNum
        this.pagination.pageSize = e.pageSize
      }
      this.getList()
    },
    export(httpExport, condition) {
      const params = isObject(condition) ? condition : {}
      this.exportLoading = true

      httpExport({ ...this.searchData, ...params }).then(res => {
        const fileName = this.$route.meta.title || ''
        const timestamp = new Date().getTime()
        saveAs(res, `${fileName}${timestamp}.xlsx`)
      }).finally(() => {
        this.exportLoading = false
      })
    }
  }
}
