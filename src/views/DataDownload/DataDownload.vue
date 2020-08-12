<template>
  <page-header-wrapper>
    <Edit api="material" :form-data="formData" :dynamic-data="dynamicData" :is-edit="dialog.isEdit" :show="dialog.showAdd" :type-list="typeList" :id="dialog.editId" @close="dialog.showAdd=false" @success="getList" />

    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form-model ref="searchForm" layout="inline" :model="searchForm">
          <a-row :gutter="searchTableGrid.gutter">
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="名称" prop="name">
                <a-input v-model="searchForm.name" placeholder="名称" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="类型" prop="type">
                <a-select v-model="searchForm.type" placeholder="类型">
                  <a-select-option :value="item.code" v-for="(item,index) in typeList" :key="index">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="发布人" prop="releasePerson">
                <a-input v-model="searchForm.releasePerson" placeholder="发布人" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item>
                <a-button type="primary" @click="handleSearch">搜索</a-button>
                <a-button @click="resetForm">重置</a-button>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </div>
    </a-card>

    <List api="material" :columns="columns" :actions="['edit', 'download', 'delete']" :loading="loading" :list="list" :pagination="pagination" @reload="handleReload" @showAdd="handleShowAdd" @actClick="handleActClick" />
  </page-header-wrapper>
</template>

<script>
import { page as httpGetList, getTypeList as httpGetTypeList } from '@/api/material'
import { PageEdit as Edit, PageList as List } from '@/components'

export default {
  components: {
    Edit,
    List
  },
  data() {
    return {
      dialog: {
        editId: 0,
        isEdit: false,
        showAdd: false
      },
      searchForm: {
        name: '', // 名称
        type: '', // 类型
        releasePerson: '' // 发布人
      },
      formData: require('@/formBuilder/dataDownload.json'),
      dynamicData: {},
      loading: false,
      typeList: [],
      list: [],
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
          dataIndex: 'updateTime',
          key: 'updateTime'
        }
      ]
    }
  },
  computed: {
    searchTableGrid() {
      return this.$store.getters.searchTableGrid
    }
  },
  methods: {
    resetForm() {
      this.$refs.searchForm.resetFields()
    },
    handleSearch() {
      this.pagination.pageNum = 1
      this.getList()
    },
    handleReload({ pageNum, pageSize }) {
      this.pagination.pageNum = pageNum
      this.pagination.pageSize = pageSize
      this.getList()
    },
    getList() {
      this.loading = true
      httpGetList({ ...this.pagination, ...this.searchForm }).then(res => {
        this.list = res.data.list
        this.pagination.pageTotal = res.data.total
      }).finally(() => {
        this.loading = false
      })
    },
    getTypeList() {
      httpGetTypeList().then(res => {
        this.typeList = [{
          code: '',
          name: '---全部---'
        }, ...res.data]
        this.dynamicData.typeList = this.typeList.map(v => ({ label: v.name, value: v.code }))
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
