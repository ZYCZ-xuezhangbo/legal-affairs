<template>
  <page-header-wrapper>
    <Edit api="material" :form-data="formData" :dynamic-data="dynamicData" :is-edit="dialog.isEdit" :show="dialog.showAdd" :type-list="typeList" :id="dialog.editId" @close="dialog.showAdd=false" @success="getList" />

    <Search :type-list="typeList" @search="handleSearch" />

    <List api="material" :columns="columns" :actions="[ACTIONS.Edit, ACTIONS.Download, ACTIONS.Delete]" :loading="loading" :export-loading="exportLoading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" @export="handleExport" />
  </page-header-wrapper>
</template>

<script>
import paginationMixin from '@/mixin/pagination-mixin'
import { page as httpGetList, getTypeList as httpGetTypeList, export_ as httpExport } from '@/api/material'
import { PageEdit as Edit, PageList as List } from '@/components'
import Search from './components/Search'

export default {
  mixins: [paginationMixin],
  components: {
    Edit,
    List,
    Search
  },
  data() {
    return {
      dialog: {
        editId: 0,
        isEdit: false,
        showAdd: false
      },
      formData: require('@/formBuilder/dataDownload.json'),
      dynamicData: {},
      typeList: [],
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type'
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
      ]
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
    getTypeList() {
      httpGetTypeList().then(res => {
        this.typeList = [
          {
            code: '',
            name: '不限'
          },
          ...res.data
        ]
        this.dynamicData.typeList = this.typeList.map(v => ({ label: v.name, value: v.code }))
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
      }
    },
    handleExport() {
      this.export(httpExport)
    }
  },
  mounted() {
    this.getTypeList()
    this.getList()
  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/es/style/color/colors.less';

/deep/ .ant-btn + .ant-btn {
  margin-left: 12px;
}
</style>
