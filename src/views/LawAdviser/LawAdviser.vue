<template>
  <page-header-wrapper>

    <Edit api="legalCounsel" :act="dialog.act" :dict="dict" :show="dialog.showAdd" :id="dialog.id" @close="dialog.showAdd=false" @success="getList" />

    <Search :dict="dict" @search="handleSearch" />

    <List api="legalCounsel" :columns="columns" :actions="['edit', 'detail', 'delete']" :loading="loading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" />

  </page-header-wrapper>
</template>

<script>
import { ACTIONS } from '@/store/mutation-types'
import { page as httpGetList, getDict as httpGetDict } from '@/api/legalCounsel'
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
        id: '',
        act: '',
        showAdd: false
      },
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
          title: '公司',
          dataIndex: 'company',
          key: 'company'
        },
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '类型',
          dataIndex: 'counselorType',
          key: 'counselorType'
        },
        {
          title: '专业',
          dataIndex: 'majorName',
          key: 'majorName'
        },
        {
          title: '职务',
          dataIndex: 'duty',
          key: 'duty'
        },
        {
          title: '办公室电话',
          dataIndex: 'officePhone',
          key: 'officePhone'
        }
      ],
      dict: {}
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
    getDict() {
      httpGetDict().then(res => {
        this.dict = res.data
      })
    },
    getList() {
      this.loading = true
      httpGetList({ ...this.pagination, ...this.searchData }).then(res => {
        this.list = res.data.list.map(v => {
          v.legalMajor = v.legalMajor === '0' ? '否' : '是'
          v.fullTime = v.fullTime === '0' ? '否' : '是'
          v.gender = v.gender === '0' ? '女' : '男'
          return v
        })
        this.pagination.pageTotal = res.data.total
      }).finally(() => {
        this.loading = false
      })
    },
    handleShowAdd() {
      this.dialog.act = ACTIONS.Add
      this.dialog.showAdd = true
    },
    handleActClick({ act, item }) {
      const id = item.id
      this.dialog.act = act
      this.dialog.id = id
      this.dialog.showAdd = true
    }
  },
  mounted() {
    this.getDict()
    this.getList()
  }
}
</script>

<style>
</style>
