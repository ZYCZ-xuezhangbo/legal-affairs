
import { ACTIONS } from '@/store/mutation-types'
import { saveAs } from '@/utils/util'

export default {
  data() {
    return {
      ACTIONS,
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
    export(httpExport) {
      this.exportLoading = true
      httpExport(this.searchData).then(res => {
        const fileName = this.$route.meta.title || ''
        const timestamp = new Date().getTime()
        saveAs(res, `${fileName}${timestamp}.xlsx`)
      }).finally(() => {
        this.exportLoading = false
      })
    }
  }
}
