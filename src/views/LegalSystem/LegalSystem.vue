<template>
  <page-header-wrapper>
    <Edit api="legalSystem" :form-data="formData" :dynamic-data="dynamicData" :is-edit="dialog.isEdit" :type-list="typeList" :show="dialog.showAdd" :id="dialog.editId" @close="dialog.showAdd=false" @success="getList" />

    <Search :type-list="typeList" @search="handleSearch" />

    <List api="legalSystem" :columns="columns" :actions="[ACTIONS.Edit, ACTIONS.Delete]" :loading="loading" :export-loading="exportLoading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" @export="handleExport" />

  </page-header-wrapper>
</template>

<script>
import { ACTIONS } from '@/store/mutation-types'
import { saveAs } from '@/utils/util'
import { page as httpGetList, getLegalSystemType as httpGetTypeList, export_ as httpExport } from '@/api/legalSystem'
import Search from './components/Search'
import { PageEdit as Edit, PageList as List } from '@/components'

export default {
  components: {
    Search,
    List,
    Edit
  },
  data() {
    return {
      ACTIONS,
      dialog: {
        editId: 0,
        isEdit: false,
        showAdd: false
      },
      formData: require('@/formBuilder/legalSystem.json'),
      dynamicData: {},
      typeList: [],
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
      if (act === 'edit') {
        this.dialog.editId = id
        this.dialog.isEdit = true
        this.dialog.showAdd = true
      }
    },
    getTypeList() {
      httpGetTypeList().then(res => {
        this.typeList = res.data
        this.typeList.unshift({
          code: '',
          name: '不限'
        })
        this.dynamicData.typeList = this.typeList.map(v => ({ label: v.name, value: v.code }))
      })
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
    this.getTypeList()
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-btn + .ant-btn {
  margin-left: 12px;
}
</style>
