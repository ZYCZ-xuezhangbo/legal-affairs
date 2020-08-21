<template>
  <page-header-wrapper :back="()=>$router.back()">
    <!-- 新增进展 - 弹框 -->
    <ModalAddJinzhan :show="dialog.showAddJinzhan" :case-id="caseId" :case-pro-status="caseProStatus" @close="dialog.showAddJinzhan=false" @reload="handleReloadCaseInfo" />

    <CaseFolderDetail :loading="caseFolderLoading" :case-folder-id="caseFolderId" :case-id="chooseCaseId" :data="caseFolderInfo" @changeStep="handleChangeStep" @changeFav="handleChangeFav" @reload="getCaseFolderInfo" />

    <a-card :bordered="false" :tab-list="tabs" :active-tab-key="activeTab" @tabChange="e=>activeTab=e" class="margin-top-lg">
      <template #tabBarExtraContent>
        <div v-show="activeTab=='1'">
          <a-button type="primary" @click="dialog.showAddJinzhan=true">新增进展</a-button>
          <a-button type="primary" @click="isEdit=true">修改</a-button>
        </div>
      </template>
      <div v-show="activeTab=='1'">
        <TabCaseDetail :loading="caseInfoLoading" :is-edit="isEdit" :case-info="caseInfo" :case-pro-status="caseProStatus" />
      </div>
      <div v-show="activeTab=='2'">
        <TabCaseModifyRecord />
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getProgressDictionary as httpGetProStatusDict } from '@/api/caseProgress'
import { getCaseFolderById as httpGetCaseFolderById, getById as httpGetCaseInfo } from '@/api/case'
import CaseFolderDetail from './components/CaseFolderDetail'
import TabCaseDetail from './components/TabCaseDetail'
import TabCaseModifyRecord from './components/TabCaseModifyRecord'
import ModalAddJinzhan from './components/ModalAddJinzhan'

// const caseStageDict = ['FIRST_INSTANCE', 'SECOND_INSTANCE', 'EXECUTE', 'REVIEW_INSTANCE', 'ARBITRATION', 'NOT_LAWSUIT', 'FINALITY']

export default {
  components: {
    CaseFolderDetail,
    TabCaseDetail,
    TabCaseModifyRecord,
    ModalAddJinzhan
  },
  data() {
    return {
      caseId: '', // 案件id
      caseFolderId: '', // 案件夹id
      chooseCaseId: '',
      isEdit: false,
      caseFolderLoading: false, // 案件夹详情loading
      caseInfoLoading: false, // 案件详情loading
      dialog: {
        showAddHuikuan: false,
        showAddJinzhan: false
      },
      caseFolderInfo: {
        caseStageList: [], // 案件阶段
        caseAmount: 0, // 执行金额
        caseReturnedMoneyList: [], // 回款列表
        collect: false // 此案件夹是否已收藏
      },
      caseInfo: {}, // 案件详情
      caseProStatus: [], // 案件进展列表
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
      ]
    }
  },
  methods: {
    handleChangeStep(caseId) {
      this.isEdit = false
      this.chooseCaseId = caseId
      this.getCaseInfo(caseId)
    },
    getCaseFolderInfo() {
      this.caseFolderLoading = true
      httpGetCaseFolderById(this.caseFolderId).then(res => {
        this.caseFolderInfo = res.data
      }).finally(() => {
        this.caseFolderLoading = false
      })
    },
    /**
     * 获取案件详情
     */
    getCaseInfo(caseId) {
      this.caseInfoLoading = true
      httpGetCaseInfo(caseId).then(res => {
        this.caseInfo = res.data
        this.getProStatus(res.data.caseStage, res.data.locusStand)
      }).finally(() => {
        this.caseInfoLoading = false
      })
    },
    /**
     * 获取案件进展字典
     * @param {string} lawsuit 案件阶段
     * @param {string} stage 诉讼地位
     */
    getProStatus(lawsuit, stage) {
      httpGetProStatusDict({ lawsuit, stage }).then(res => {
        this.caseProStatus = res.data
      }).finally(() => {
        this.proStatusLoading = false
      })
    },
    handleChangeFav(state) {
      this.caseFolderInfo.collect = state
    },
    handleReloadCaseInfo() {
      this.getCaseInfo(this.chooseCaseId)
    }
  },
  created() {
    this.caseId = this.chooseCaseId = this.$route.params.id
    this.caseFolderId = this.$route.params.fId
  },
  mounted() {
    this.getCaseFolderInfo()
    this.getCaseInfo(this.caseId)
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-btn + .ant-btn {
  margin-left: 8px;
}
</style>
