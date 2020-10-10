<template>
  <page-header-wrapper>
    <DialogRichText :show.sync="showPreview" :content="richText" />

    <Edit api="workTrend" :form-data="formData" :is-edit="dialog.isEdit" :show="dialog.showAdd" :id="dialog.editId" @close="dialog.showAdd=false" @success="getList" />

    <Search @search="handleSearch" />

    <List api="workTrend" :columns="columns" :actions="[ACTIONS.Edit, ACTIONS.Delete, ACTIONS.Preview]" :loading="loading" :export-loading="exportLoading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" @export="handleExport" />
  </page-header-wrapper>
</template>

<script>
import { ACTIONS } from '@/store/mutation-types'
import { saveAs } from '@/utils/util'
import { page as httpGetList, getById as httpGetById, export_ as httpExport } from '@/api/workTrend'
import { PageEdit as Edit, PageList as List } from '@/components'
import Search from './components/Search'
import DialogRichText from '@/components/DialogRichText'

export default {
  components: {
    Search,
    List,
    Edit,
    DialogRichText
  },
  data() {
    return {
      ACTIONS,
      dialog: {
        editId: 0,
        isEdit: false,
        showAdd: false
      },
      formData: require('@/formBuilder/workDynamic.json'),
      searchData: {},
      list: [],
      loading: false,
      exportLoading: false,
      pagination: {
        pageNum: 1,
        pageSize: 10,
        pageTotal: 0
      },
      columns: [
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title'
        },
        {
          title: '发布公司',
          dataIndex: 'releaseCompany',
          key: 'releaseCompany'
        },
        {
          title: '发布人',
          dataIndex: 'releasePerson',
          key: 'releasePerson'
        },
        {
          title: '发布时间',
          dataIndex: 'createTime',
          key: 'createTime'
        }
      ],
      showPreview: false, // 是否显示预览框
      richText: '' // 预览框中的富文本内容
    }
  },
  methods: {
    handleSearch(data) {
      this.pagination.pageNum = 1
      this.searchData = data
      this.getList()
    },
    handleReload({ pageNum, pageSize }) {
      this.pagination.pageNum = pageNum
      this.pagination.pageSize = pageSize
      this.getList()
    },
    getList() {
      this.loading = true
      httpGetList({ ...this.pagination, ...this.searchData }).then(res => {
        this.list = res.data.list
        this.pagination.pageTotal = res.data.total
      }).finally(() => {
        this.loading = false
      })
    },
    handleShowAdd() {
      this.dialog.isEdit = false
      this.dialog.showAdd = true
    },
    handleActClick({ act, item }) {
      const id = item.id
      if (act === ACTIONS.Edit) {
        this.dialog.editId = id
        this.dialog.isEdit = true
        this.dialog.showAdd = true
      } else if (act === ACTIONS.Preview) {
        this.richText = ''
        this.showPreview = true
        httpGetById(id).then(res => {
          this.richText = res.data.others
        })
      }
    },
    handleExport() {
      this.exportLoading = true
      httpExport(this.searchData).then(res => {
        const fileName = this.$route.meta.title || ''
        const timestamp = new Date().getTime()
        saveAs(res, `${fileName}${timestamp}.xlsx`)
      }).finally(() => {
        this.exportLoading = false
      })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-btn + .ant-btn {
  margin-left: 12px;
}
</style>
