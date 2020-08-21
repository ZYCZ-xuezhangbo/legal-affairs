<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-form-model ref="searchForm" layout="horizontal" :model="searchForm" :label-col="{span:8}" :wrapper-col="{span:16}">
        <a-row :gutter="48">
          <a-col :xs="24" :sm="12" :md="8" :lg="6">
            <a-form-model-item label="律师事务所" prop="lawFirm">
              <a-input v-model="searchForm.lawFirm" placeholder="律师事务所" />
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :lg="6">
            <a-form-model-item label="律师姓名" prop="lawyerName">
              <a-input v-model="searchForm.lawyerName" placeholder="律师姓名" />
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :lg="6">
            <a-form-model-item label="聘用类型" prop="employ">
              <a-input v-model="searchForm.employ" placeholder="聘用类型" />
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :lg="6">
            <a-form-model-item label="登记状态" prop="registerStatus">
              <a-select v-model="searchForm.registerStatus" style="width: 100%">
                <a-select-option value="1">
                  不限
                </a-select-option>
                <a-select-option value="2">
                  审核通过
                </a-select-option>
                <a-select-option value="3">
                  待审核
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :lg="6">
            <a-form-model-item>
              <a-button type="primary" class="margin-right">搜索</a-button>
              <a-button @click="handleSearchReset">重置</a-button>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    <a-card class="margin-top-lg" :bordered="false">
      <div class="padding-bottom-lg">
        <a-button type="primary" class="margin-right" @click="handleAdd">新建</a-button>
        <a-button type="primary">导出</a-button>
      </div>
      <a-table :columns="columns" :data-source="data" :row-key="e=>e.id">
        <template #action>
          <a>查看</a>
        </template>
      </a-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { mapState } from 'vuex'

const data = []
for (let i = 0; i < 10; i++) {
  data.push({
    id: i,
    key: i,
    ssdw: `送审单位${i}`,
    fwlsuo: `服务律所${i}`,
    fwlshi: `服务律师${i}`,
    fwlx: `服务类型${i}`,
    xpfs: `选聘方式${i}`,
    djzt: `等级状态${i}`
  })
}
export default {
  data() {
    return {
      dialog: {
        showLawyerReviewModal: false
      },
      loading: {
        addLoading: false
      },
      searchForm: {
        lawFirm: '',
        lawyerName: '',
        employ: '',
        registerStatus: ''
      },
      columns: [
        {
          title: '送审单位',
          dataIndex: 'ssdw',
          key: 'ssdw'
        },
        {
          title: '服务律所',
          dataIndex: 'fwlsuo',
          key: 'fwlsuo'
        },
        {
          title: '服务律师',
          dataIndex: 'fwlshi',
          key: 'fwlshi'
        },
        {
          title: '服务类型',
          key: 'fwlx',
          dataIndex: 'fwlx'
        },
        {
          title: '选聘方式',
          key: 'xpfs',
          dataIndex: 'xpfs'
        },
        {
          title: '等级状态',
          key: 'djzt',
          dataIndex: 'djzt'
        },
        {
          title: '操作',
          align: 'right',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data
    }
  },
  computed: {
    ...mapState({
      isMobile: state => state.app.isMobile
    }),
    addModalModel() {
      const item = {}
      if (this.loading.addLoading) {
        item.maskClosable = false
        item.keyboard = false
        item.closable = false
      }
      return item
    }
  },
  methods: {
    handleSearchReset() {
      this.$refs.searchForm.resetFields()
    },
    handleAdd() {
      this.dialog.showLawyerReviewModal = true
    },
    handleAddSubmit() {
      this.loading.addLoading = true
      this.$refs.addForm.validation().then(() => {
        setTimeout(() => {
          this.dialog.showLawyerReviewModal = false
          this.loading.addLoading = false
          this.$message.success('提交成功')
          this.handleAddReset()
        }, 2000)
      }).catch(() => {
        this.loading.addLoading = false
      })
    },
    handleAddReset() {
      this.$refs.addForm.reset()
    }
  }

}
</script>

<style>
</style>
