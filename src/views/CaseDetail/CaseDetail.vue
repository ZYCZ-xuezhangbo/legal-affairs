<template>
  <page-header-wrapper :back="()=>$router.back(-1)">
    <!-- 新增回款 - 弹框 -->
    <ModalAddHuikuan :show="dialog.showAddHuikuan" @close="dialog.showAddHuikuan=false" />
    <!-- 新增进展 - 弹框 -->
    <ModalAddJinzhan :show="dialog.showAddJinzhan" @close="dialog.showAddJinzhan=false" />

    <a-card :bordered="false">
      <a-row>
        <a-col :sm="24" :md="12">
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
        <a-col :sm="24" :md="12" :class="!isMobile?'text-right':''">
          <a-button type="primary" @click="dialog.showAddHuikuan=true">新增回款</a-button>
          <a-button type="primary" @click="handleGoCaseEntry">新增案件</a-button>
          <a-button type="primary">终结</a-button>
          <a-button type="primary">
            <a-icon theme="filled" type="star"></a-icon>
            已收藏
          </a-button>
        </a-col>
      </a-row>
      <div class="margin-top-xl">
        <a-divider dashed />
        <a-row type="flex" justify="center">
          <a-col :span="24">
            <a-steps v-model="curStep" @change="handleStepChange" style="width:70%;margin:0 auto;">
              <a-step v-for="(item,index) in stepList" :key="index" :status="curStep===index?'process':'wait'" :title="item.name">
                <a-icon slot="icon" :type="curStep===index?'folder-open':'folder'" />
              </a-step>
            </a-steps>
          </a-col>
        </a-row>
      </div>
    </a-card>
    <a-card :bordered="false" :tab-list="tabs" :active-tab-key="activeTab" @tabChange="handleTabChange" class="margin-top-lg">
      <template #tabBarExtraContent>
        <div v-show="activeTab=='1'">
          <a-button type="primary" @click="dialog.showAddJinzhan=true">新增进展</a-button>
          <a-button type="primary" icon="edit">修改</a-button>
        </div>
      </template>
      <div v-show="activeTab=='1'">
        <TabCaseDetail />
      </div>
      <div v-show="activeTab=='2'">
        <TabCaseModifyRecord />
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import TabCaseDetail from './components/TabCaseDetail'
import TabCaseModifyRecord from './components/TabCaseModifyRecord'
import ModalAddHuikuan from './components/ModalAddHuikuan'
import ModalAddJinzhan from './components/ModalAddJinzhan'

export default {
  components: {
    TabCaseDetail,
    TabCaseModifyRecord,
    ModalAddHuikuan,
    ModalAddJinzhan
  },
  data() {
    return {
      caseId: '', // 案件id
      caseFolderId: '', // 案件夹id
      dialog: {
        showAddHuikuan: false,
        showAddJinzhan: false
      },
      stepList: [
        {
          id: '1',
          name: '一审',
          isFinish: false
        },
        {
          id: '2',
          name: '二审',
          isFinish: false
        },
        {
          id: '3',
          name: '执行',
          isFinish: false
        }
      ],
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
      editingKey: ''
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  methods: {
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
    this.caseFolderId = this.$route.params.fId
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-btn + .ant-btn {
  margin-left: 8px;
}
</style>
