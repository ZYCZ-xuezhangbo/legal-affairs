<template>
  <page-header-wrapper>
    <DialogRichText :show.sync="showPreview" :content="richText" />
    <Edit api="workTrend" :form-data="formData" :is-edit="dialog.isEdit" :show="dialog.showAdd" :id="dialog.editId" @close="dialog.showAdd=false" @success="getList" />
    <Search @search="handleSearch" />
    <List api="workTrend" :columns="columns" :actions="[ACTIONS.Edit, ACTIONS.Delete, ACTIONS.Preview]" :loading="loading" :export-loading="exportLoading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" @export="handleExport" />
  </page-header-wrapper>
</template>

<script>
import paginationMixin from '@/mixin/pagination-mixin'
import { page as httpGetList, getById as httpGetById, export_ as httpExport } from '@/api/workTrend'
import { PageEdit as Edit, PageList as List } from '@/components'
import Search from './components/Search'
import DialogRichText from '@/components/DialogRichText'

export default {
  mixins: [paginationMixin],
  components: {
    Search,
    List,
    Edit,
    DialogRichText
  },
  data() {
    return {
      dialog: {
        editId: 0,
        isEdit: false,
        showAdd: false
      },
      formData: require('@/formBuilder/workDynamic.json'),
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
      if (act === this.ACTIONS.Edit) {
        this.dialog.editId = id
        this.dialog.isEdit = true
        this.dialog.showAdd = true
      } else if (act === this.ACTIONS.Preview) {
        this.richText = ''
        this.showPreview = true
        httpGetById(id).then(res => {
          this.richText = res.data.others
        })
      }
    },
    handleExport() {
      this.export(httpExport)
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
