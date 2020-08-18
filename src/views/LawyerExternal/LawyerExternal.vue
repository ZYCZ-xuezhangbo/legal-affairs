<template>
  <page-header-wrapper>
    <Edit api="outsideLawManager" :act="dialog.act" :show="dialog.showAdd" :id="dialog.id" :law-firm-list="lawFirmList" @close="dialog.showAdd=false" @success="getList" />

    <Search :law-firm-list="lawFirmList" @search="handleSearch" />

    <List api="outsideLawManager" :columns="columns" :actions="['edit', 'detail']" :loading="loading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" />

  </page-header-wrapper>
</template>

<script>
import { page as httpGetList, getLawFirmName as httpGetLawFirmList } from '@/api/outsideLawManager'
import Search from './components/Search'
import Edit from './components/Edit'
import { PageList as List } from '@/components'

export default {
  components: {
    Search,
    List,
    Edit
  },
  data() {
    return {
      dialog: {
        id: 0,
        act: '',
        showAdd: false
      },
      searchData: {},
      list: [],
      lawFirmList: [], // 律所列表
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
          title: '服务律师',
          dataIndex: 'lawName',
          key: 'lawName'
        },
        {
          title: '性别',
          dataIndex: 'gender',
          key: 'gender'
        },
        {
          title: '学历',
          dataIndex: 'educationBackground',
          key: 'educationBackground'
        },
        {
          title: '专业类别',
          dataIndex: 'major',
          key: 'major'
        },
        {
          title: '电话',
          dataIndex: 'phone',
          key: 'phone'
        },
        {
          title: '是否有企业法律职业顾问资格',
          dataIndex: 'legalProfession',
          key: 'legalProfession'
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
      this.dialog.act = 'add'
      this.dialog.showAdd = true
    },
    handleActClick({ act, item }) {
      const id = item.id
      this.dialog.id = id
      this.dialog.act = act
      this.dialog.showAdd = true
    },
    getLawFirmList() {
      httpGetLawFirmList().then(res => {
        this.lawFirmList = res.data
      })
    }
  },
  mounted() {
    this.getList()
    this.getLawFirmList()
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-btn + .ant-btn {
  margin-left: 12px;
}
</style>
