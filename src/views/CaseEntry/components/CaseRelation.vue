<template>
  <a-modal title="关联案件选择" :visible="show" @ok="handleOk" @cancel="handleCancel" :width="1000">
    <template #footer>
      <button-cancel @click="handleCancel" />
    </template>
    <div class="table-page-search-wrapper">
      <a-form-model ref="searchForm" layout="inline" :model="searchForm">
        <a-row :gutter="gutter">
          <a-col v-bind="span">
            <a-form-model-item label="成诉时间" prop="legalMajor">
              <a-date-picker v-model="searchForm.startTime" inputReadOnly placeholder="开始时间" @change="(e,str)=>searchForm.startTime=str" class="response" />
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="成诉时间" prop="legalMajor">
              <a-date-picker v-model="searchForm.endTime" inputReadOnly placeholder="结束时间" @change="(e,str)=>searchForm.endTime=str" class="response" />
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="案件号" prop="caseNo">
              <a-input v-model="searchForm.caseNo" placeholder="请输入" />
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="案由" prop="professionStatus">
              <a-tree-select v-model="searchForm.brief" style="width: 100%;overflow:hidden;" allowClear :searchValue="briefSearchValue" :dropdown-style="{ maxHeight: '45vh', overflow: 'auto' }" treeDataSimpleMode show-search treeNodeFilterProp="label" :tree-data="briefList" tree-default-expand-all placeholder="案由" @search="handleSearchbriefList">
                <template #suffixIcon>
                  <a-icon v-show="briefLoading" type="loading" />
                </template>
              </a-tree-select>
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="诉讼地位" prop="locusStand">
              <a-select v-model="searchForm.locusStand" placeholder="诉讼地位" allowClear>
                <a-select-option v-for="(item,index) in lawsuit" :key="index" :value="item.code">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="我方涉案单位" prop="ourUnits">
              <a-input v-model="searchForm.ourUnits" placeholder="请输入" />
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item>
              <button-search class="margin-right" @click="handleSearch" />
              <button-reset @click="resetForm" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
    <a-table :loading="loading" :columns="columns" :data-source="data" :pagination="pagination" :row-key="e => e.id">
      <template #action="item">
        <a @click="handleChoose(item)">选择</a>
      </template>
    </a-table>
  </a-modal>
</template>

<script>
import { relevancyPage as httpGetRelationList, getBrief as httpGetBriefList } from '@/api/case'
import { Pagination } from '@/components'

export default {
  components: {
    Pagination
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    lawsuit: { // 诉讼地位
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      id: '',
      gutter: 48,
      span: {
        sm: 24,
        md: 12,
        lg: 8
      },
      loading: false,
      searchForm: {
        brief: undefined,
        caseNo: '',
        endTime: '',
        locusStand: undefined,
        ourUnits: '',
        startTime: ''
      },
      pagination: {
        pageNum: 1,
        pageSize: 10,
        pageTotal: 0,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total, range) => {
          return `共${total}条`
        },
        onChange: ({ page, pageSize }) => {
          this.pagination.pageNum = page
          this.pagination.pageSize = pageSize
          this.getList()
        },
        onShowSizeChange: ({ size }) => {
          this.pagination.pageNum = 1
          this.pagination.pageSize = size
          this.getList()
        }
      },
      columns: [
        {
          title: '成诉时间',
          dataIndex: 'lawsuitTime',
          key: 'lawsuitTime'
        },
        {
          title: '案由',
          dataIndex: 'brief',
          key: 'brief'
        },
        {
          title: '涉案单位',
          dataIndex: 'ourUnits',
          key: 'ourUnits'
        },
        {
          title: '涉案单位诉讼地位',
          dataIndex: 'locusStand',
          key: 'locusStand'
        },
        {
          title: '案号',
          dataIndex: 'caseNo',
          key: 'caseNo'
        },
        {
          title: '操作',
          align: 'right',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: [],
      briefList: [], // 案由列表
      briefSearchValue: '',
      briefLoading: false
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.getList()
      }
    }
  },
  methods: {
    handleSearch() {
      this.pagination.pageNum = 1
      this.getList()
    },
    resetForm() {
      this.searchForm = {}
    },
    handleOk() {
      this.$emit('choose', this.id)
    },
    handleCancel() {
      this.$emit('close')
    },
    getList() {
      this.loading = true
      httpGetRelationList({
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize,
        ...this.searchForm
      }).then(res => {
        this.data = res.data.list
        this.pagination.pageTotal = res.total
      }).finally(() => {
        this.loading = false
      })
    },
    handleChoose(item) {
      this.$emit('choose', item)
    },
    /**
     * 搜索案由列表
     */
    handleSearchbriefList(keyword) {
      this.briefSearchValue = keyword

      if (keyword !== '') {
        if (this.briefTimer) clearTimeout(this.briefTimer)
        this.briefTimer = setTimeout(() => {
          this.briefLoading = true
          httpGetBriefList(keyword).then(res => {
            const list = res.data.map(v => {
              v.pId = v.pid
              return v
            })
            this.briefList = list
          }).finally(() => {
            this.briefLoading = false
          })
        }, 1000)
      }
    }
  }
}
</script>

<style>
</style>
