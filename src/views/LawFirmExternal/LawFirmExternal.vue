<template>
  <page-header-wrapper>
    <Edit api="outsideLawFirm" :form-data="formData" :is-edit="dialog.isEdit" :show="dialog.showAdd" :id="dialog.editId" @close="dialog.showAdd=false" @success="getList" />
    <Detail api="outsideLawFirm" :show="dialog.showDetail" :id="dialog.editId" @close="dialog.showDetail=false" />
    <Search @search="handleSearch" />

    <List api="outsideLawFirm" :columns="columns" :actions="['edit', 'detail']" :loading="loading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" />

  </page-header-wrapper>
</template>

<script>
import { page as httpGetList } from '@/api/outsideLawFirm'
import { PageEdit as Edit, PageList as List } from '@/components'
import Search from './components/Search'
import Detail from './components/Detail'

export default {
  components: {
    Search,
    Detail,
    List,
    Edit
  },
  data() {
    return {
      dialog: {
        editId: 0,
        isEdit: false,
        showAdd: false,
        showDetail: false
      },
      formData: require('@/formBuilder/lawFirmExternal.json'),
      searchData: {},
      list: [],
      loading: false,
      pagination: {
        pageNum: 1,
        pageSize: 10,
        pageTotal: 0
      },
      columns: [
        {
          title: '律所名称',
          dataIndex: 'lawFirmName',
          key: 'lawFirmName'
        },
        {
          title: '地址',
          dataIndex: 'address',
          key: 'address'
        },
        {
          title: '联系人',
          dataIndex: 'linkman',
          key: 'linkman'
        },
        {
          title: '联系电话',
          dataIndex: 'phone',
          key: 'phone'
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
    handleActClick({ act, id }) {
      if (act === 'edit') {
        this.dialog.editId = id
        this.dialog.isEdit = true
        this.dialog.showAdd = true
      } else if (act === 'detail') {
        this.dialog.editId = id
        this.dialog.showDetail = true
      }
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
