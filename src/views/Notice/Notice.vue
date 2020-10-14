<template>
  <page-header-wrapper>
    <Edit api="announcement" :form-data="formData" :is-edit="dialog.isEdit" :show="dialog.showAdd" :id="dialog.editId" @close="dialog.showAdd=false" @success="getList" />
    <Search @search="handleSearch" />
    <List api="announcement" :columns="columns" :actions="[ACTIONS.Edit, ACTIONS.Delete]" :loading="loading" :export-loading="exportLoading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" @export="handleExport" />
  </page-header-wrapper>
</template>

<script>
import paginationMixin from '@/mixin/pagination-mixin'
import { page as httpGetList, export_ as httpExport } from '@/api/announcement'
import { PageEdit as Edit, PageList as List } from '@/components'
import Search from './components/Search'

export default {
  mixins: [paginationMixin],
  components: {
    Search,
    List,
    Edit
  },
  data() {
    return {
      dialog: {
        editId: 0,
        isEdit: false,
        showAdd: false
      },
      formData: require('@/formBuilder/announcement.json'),
      columns: [
        {
          title: '公告时间',
          dataIndex: 'createTime',
          key: 'createTime'
        },
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title'
        },
        {
          title: '发布单位',
          dataIndex: 'releaseCompany',
          key: 'releaseCompany'
        },
        {
          title: '发布人',
          dataIndex: 'releasePerson',
          key: 'releasePerson'
        }
      ]
    }
  },
  methods: {
    getList() {
      this.getListMixin(httpGetList)
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
