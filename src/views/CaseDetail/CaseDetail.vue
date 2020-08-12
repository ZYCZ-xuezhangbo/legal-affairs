<template>
  <page-header-wrapper :title="false" :breadcrumb="false">
    <!-- 新增回款 - 弹框 -->
    <a-modal title="新增回款" ok-text="提交" :visible="dialog.showAddHuikuan" :confirm-loading="false" @ok="dialog.showAddHuikuan=false" @cancel="dialog.showAddHuikuan=false">
      <a-table :columns="addHuikuanColumns" :data-source="data" bordered>
        <template #action>
          <a>修改</a>
        </template>
      </a-table>
    </a-modal>
    <!-- 新增进展 - 弹框 -->
    <a-modal title="新增进展" ok-text="提交" :visible="dialog.showAddJinzhan" :confirm-loading="false" @ok="dialog.showAddJinzhan=false" @cancel="dialog.showAddJinzhan=false">
      TODO
    </a-modal>

    <template #content>
      <a-page-header title="返回" sub-title="案件进展" @back="handleGoBack" style="padding:0;" />
    </template>
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="24" :md="16">
          <a-descriptions>
            <a-descriptions-item label="执行金额（元）">
              10000
            </a-descriptions-item>
            <a-descriptions-item label="未回款">
              10000
            </a-descriptions-item>
            <a-descriptions-item label="已回款">
              10000
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :sm="24" :md="8" :class="!isMobile?'text-right':''">
          <a-button type="primary" class="margin-right" @click="dialog.showAddHuikuan=true">新增回款</a-button>
          <a-button type="primary" class="margin-right" @click="handleGoCaseEntry">新增案件</a-button>
          <a-button type="primary">终结</a-button>
        </a-col>
      </a-row>
      <div class="margin-top-xl">
        <a-row type="flex" justify="center" align="middle">
          <a-col :sm="24" :md="12">
            <a-steps :current="curStep" @change="handleStepChange">
              <a-step title="一审" />
              <a-step title="二审" />
              <a-step title="再审" />
              <a-step title="执行" disabled />
            </a-steps>
          </a-col>
          <a-col>
            <img src="~@/assets/icons/yizhongjie.svg" class="svg-yzj" alt="">
          </a-col>
        </a-row>
      </div>
    </a-card>
    <a-card :bordered="false" :tab-list="tabs" :active-tab-key="activeTab" @tabChange="handleTabChange" class="margin-top-lg">
      <template #tabBarExtraContent>
        <div v-show="activeTab=='1'">
          <a-button type="primary" class="margin-right" @click="dialog.showAddJinzhan=true">新增进展</a-button>
          <a-button type="primary" icon="edit">修改</a-button>
        </div>
      </template>
      <div v-show="activeTab=='1'">
        <TabCaseDetail></TabCaseDetail>
      </div>
      <div v-show="activeTab=='2'">
        <TabCaseModifyRecord></TabCaseModifyRecord>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import TabCaseDetail from './components/TabCaseDetail'
import TabCaseModifyRecord from './components/TabCaseModifyRecord'

const list = []
for (let i = 0; i < 100; i++) {
  list.push({
    key: i.toString(),
    money: `1000 ${i}`,
    date: '2020-01-02'
  })
}
export default {
  components: {
    TabCaseDetail,
    TabCaseModifyRecord
  },
  data() {
    return {
      caseId: 0,
      dialog: {
        showAddHuikuan: false,
        showAddJinzhan: false
      },
      curStep: 1,
      activeTab: '1',
      tabs: [
        {
          key: '1',
          tab: '案件详情'
        },
        {
          key: '2',
          tab: '案件修改记录'
        }
      ],
      addHuikuanColumns: [
        {
          title: '回款',
          dataIndex: 'money',
          width: '35%',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '回款时间',
          dataIndex: 'date',
          width: '35%',
          scopedSlots: { customRender: 'age' }
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: list,
      editingKey: ''
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  methods: {
    handleGoBack() {
      this.$router.back(-1)
    },
    handleStepChange(e) {
      this.curStep = e
    },
    handleTabChange(e) {
      this.activeTab = e
    },
    handleGoCaseEntry() {
      this.$router.push('/case/caseEntry')
    }
  },
  created() {
    this.caseId = this.$route.params.id
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-page-header-content {
  padding-top: 0;
}
.svg-yzj {
  width: 140px;
  margin-left: 12px;
  cursor: pointer;
}
</style>
