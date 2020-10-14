<template>
  <page-header-wrapper>
    <!-- <Edit api="legalSystem" :form-data="formData" :dynamic-data="dynamicData" :is-edit="dialog.isEdit" :type-list="typeList" :show="dialog.showAdd" :id="dialog.editId" @close="dialog.showAdd=false" @success="getList" /> -->
    <Edit api="legalSystem" :act="dialog.act" :dict="typeList" :show.sync="dialog.showEdit" :id="dialog.editId" @success="getList" />
    <Search :type-list="typeList" @search="handleSearch" />
    <List api="legalSystem" :columns="columns" :actions="[ACTIONS.Edit, ACTIONS.Delete]" :loading="loading" :export-loading="exportLoading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" @export="handleExport" />
  </page-header-wrapper>
</template>

<script>
import paginationMixin from '@/mixin/paginationMixin'
import { page as httpGetList, getLegalSystemType as httpGetTypeList, export_ as httpExport } from '@/api/legalSystem'
import Search from './components/Search'
import { PageList as List } from '@/components'
import Edit from './components/Edit'

export default {
  mixins: [paginationMixin],
  components: {
    Search,
    List,
    Edit
  },
  data() {
    return {
      formData: require('@/formBuilder/legalSystem.json'),
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
    handleActClick({ act, item }) {
      this.dialog.act = act
      this.dialog.editId = item.id
      if (act === this.ACTIONS.Edit) {
        this.dialog.showEdit = true
      }
    },
    getTypeList() {
      httpGetTypeList().then(res => {
        this.typeList = res.data
      })
    },
    handleExport() {
      this.export(httpExport)
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
