<template>
  <page-header-wrapper :back="()=>$router.back()">
    <!-- 新增进展 - 弹框 -->
    <ModalAddJinzhan :show="dialog.showAddJinzhan" :case-id="caseId" :case-pro-status="caseProStatus" @close="dialog.showAddJinzhan=false" @reload="getCaseInfo" />

    <CaseFolderDetail :loading="caseFolderLoading" :case-folder-id="caseFolderId" :case-id="caseId" :data="caseFolderInfo" @changeStep="handleChangeStep" @changeFav="handleChangeFav" @reload="getCaseFolderInfo" />

    <a-card :bordered="false" :tab-list="tabs" :active-tab-key="activeTab" @tabChange="handleTabChange" class="margin-top-lg">
      <template #tabBarExtraContent>
        <div v-show="activeTab=='1'">
          <a-button type="primary" @click="dialog.showAddJinzhan=true">新增进展</a-button>
          <a-button :type="isEdit?'':'primary'" @click="handleEditBtnClick">
            {{ isEdit?'取消修改':'修改' }}
          </a-button>
        </div>
      </template>
      <div v-show="activeTab=='1'">
        <TabCaseDetail :loading="caseInfoLoading" :act="formAct" :case-info="caseInfo" :case-pro-status="caseProStatus" @submit="handleCaseUpdate" />
      </div>
      <div v-show="activeTab=='2'">
        <TabCaseModifyRecord :list="modifyRecord" :loading="modifyLoading" :pagination="modifyRecordPagination" @reload="handleModifyRecordReload" />
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getProgressDictionary as httpGetProStatusDict } from '@/api/caseProgress'
import { getCaseFolderById as httpGetCaseFolderById, getById as httpGetCaseInfo, getCaseLogList as httpGetUpdateHistory } from '@/api/case'
import CaseFolderDetail from './components/CaseFolderDetail'
import TabCaseDetail from './components/TabCaseDetail'
import TabCaseModifyRecord from './components/TabCaseModifyRecord'
import ModalAddJinzhan from './components/ModalAddJinzhan'

// const caseStageDict = ['FIRST_INSTANCE', 'SECOND_INSTANCE', 'EXECUTE', 'REVIEW_INSTANCE', 'ARBITRATION', 'NOT_LAWSUIT', 'FINALITY']
const EDIT = 'edit'
const DETAIL = 'detail'
const paginatinoInit = {
  pageNum: 1,
  pageSize: 10,
  pageTotal: 0
}

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
      formAct: DETAIL, // 表单状态：detail、edit、add
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
      modifyLoading: false, // 案件修改记录loading
      modifyRecord: [], // 案件修改记录
      modifyRecordPagination: paginatinoInit,
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
  computed: {
    isEdit() {
      return this.formAct === EDIT
    }
  },
  methods: {
    handleChangeStep(caseId) {
      this.modifyRecord = []
      this.modifyRecordPagination = paginatinoInit
      this.activeTab = '1'
      this.formAct = DETAIL
      this.caseId = caseId
      this.getCaseInfo()
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
    getCaseInfo() {
      this.caseInfoLoading = true
      httpGetCaseInfo(this.caseId).then(res => {
        this.caseInfo = res.data
        this.getProStatus(res.data.locusStand, res.data.caseStage)
      }).finally(() => {
        this.caseInfoLoading = false
      })

      // this.getUpdateHistory()
    },
    getUpdateHistory() {
      this.modifyLoading = true
      httpGetUpdateHistory({ caseId: this.caseId, ...this.modifyRecordPagination }).then(res => {
        this.modifyRecord = res.data.list
        this.modifyRecordPagination.pageTotal = res.data.total
      }).finally(() => {
        this.modifyLoading = false
      })
    },
    /**
     * 获取案件进展字典
     * @param {string} lawsuit 诉讼地位
     * @param {string} stage 案件阶段
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
    handleCaseUpdate() {
      this.getCaseInfo()
      this.modifyRecord = []
      this.formAct = DETAIL
      document.documentElement.scrollTop = 0
    },
    handleEditBtnClick() {
      if (this.formAct === EDIT) {
        this.formAct = DETAIL
      } else {
        this.formAct = EDIT
      }
    },
    handleModifyRecordReload({ pageNum, pageSize }) {
      this.modifyRecordPagination.pageNum = pageNum
      this.modifyRecordPagination.pageSize = pageSize
      this.getUpdateHistory()
    },
    handleTabChange(e) {
      this.activeTab = e
      if (this.modifyRecord.length <= 0) {
        this.getUpdateHistory()
      }
    }
  },
  created() {
    this.caseId = this.$route.params.id
    this.caseFolderId = this.$route.params.fId
  },
  mounted() {
    this.getCaseFolderInfo()
    this.getCaseInfo()
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-btn + .ant-btn {
  margin-left: 8px;
}
</style>
