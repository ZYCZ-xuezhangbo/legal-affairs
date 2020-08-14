<template>
  <page-header-wrapper>
    <!-- <Edit api="legalMember" :form-data="formData" :is-edit="dialog.isEdit" :show="dialog.showAdd" :id="dialog.editId" @close="dialog.showAdd=false" @success="getList" /> -->
    <Edit api="legalMember" :is-edit="dialog.isEdit" :show="dialog.showAdd" :id="dialog.editId" @close="dialog.showAdd=false" @success="getList" />

    <Search :company-list="companyList" @search="handleSearch" />

    <List api="legalMember" :columns="columns" :actions="['edit','look', 'delete']" :loading="loading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" />
  </page-header-wrapper>
</template>

<script>
import { page as httpGetList } from '@/api/legalMember'
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
        editId: 0,
        isEdit: false,
        showAdd: false
      },
      formData: require('@/formBuilder/filledBy.json'),
      searchData: {},
      list: [],
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
      loading: false,
      pagination: {
        pageNum: 1,
        pageSize: 10,
        pageTotal: 0
      }
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
      this.dialog.isEdit = false
      this.dialog.showAdd = true
    },
    handleActClick({ act, id }) {
      if (act === 'edit') {
        this.dialog.editId = id
        this.dialog.isEdit = true
        this.dialog.showAdd = true
      }
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style>
</style>
