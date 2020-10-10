<template>
  <page-header-wrapper>
    <Edit api="legalMember" :dict="dict" :act="dialog.act" :show="dialog.showAdd" :id="dialog.editId" @close="dialog.showAdd=false" @success="getList" />
    <Search :company-list="companyList" @search="handleSearch" />

    <List api="legalMember" :columns="columns" :actions="['edit','detail', 'delete']" :loading="loading" :export-loading="exportLoading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" @export="handleExport" />
  </page-header-wrapper>
</template>

<script>
import paginationMixin from '@/mixin/paginationMixin'
import { page as httpGetList, getDict as httpGetDict, export_ as httpExport } from '@/api/legalMember'
import Search from './components/Search'
import Edit from './components/Edit'
import { PageList as List } from '@/components'

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
        editId: '',
        act: '',
        showAdd: false
      },
      companyList: [
        {
          code: '',
          name: '不限'
        },
        {
          code: 'com1',
          name: '公司1'
        },
        {
          code: 'com2',
          name: '公司2'
        }
      ],
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
          title: '性别',
          dataIndex: 'gender',
          key: 'gender'
        },
        {
          title: '毕业院校',
          dataIndex: 'school',
          key: 'school'
        },
        {
          title: '专业',
          dataIndex: 'majorName',
          key: 'majorName'
        },
        {
          title: '参加工作时间',
          dataIndex: 'joinWork',
          key: 'joinWork'
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
    getDict() {
      httpGetDict().then(res => {
        this.dict = res.data
      })
    },
    getList() {
      this.loading = true
      httpGetList({ ...this.pagination, ...this.searchData }).then(res => {
        this.list = res.data.list.map(v => {
          v.gender = v.gender === '0' ? '女' : '男'
          return v
        })
        this.pagination.pageTotal = res.data.total
      }).finally(() => {
        this.loading = false
      })
    },
    handleShowAdd() {
      this.dialog.act = this.ACTIONS.Add
      this.dialog.showAdd = true
    },
    handleActClick({ act, item }) {
      const id = item.id
      this.dialog.act = act
      this.dialog.editId = id
      this.dialog.showAdd = true
    },
    handleExport() {
      this.export(httpExport)
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
