<template>
  <div>
    <!-- 新增回款 - 弹框 -->
    <ModalAddHuikuan :show="dialog.showAddHuikuan" :case-folder-id="caseFolderId" :list="data.caseReturnedMoneyList" :payment-received="paymentReceived" @close="dialog.showAddHuikuan=false" @reload="handleReload" />
    <!-- 终结 - 弹框 -->
    <ModalCaseFinality :show="dialog.showCaseFinality" :is-edit="caseFinalityIsEdit" :case-folder-id="caseFolderId" @close="dialog.showCaseFinality=false" @reload="handleReload" />

    <a-card :bordered="false">
      <a-skeleton v-show="loading" active />
      <div v-show="!loading">
        <a-row>
          <a-col :sm="24" :md="12">
            <a-descriptions>
              <a-descriptions-item label="执行金额(万元)">
                {{ sumPayment }}
              </a-descriptions-item>
              <a-descriptions-item label="未回款(万元)">
                {{ notPayment }}
              </a-descriptions-item>
              <a-descriptions-item label="已回款(万元)">
                {{ paymentReceived }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="24" :md="12" :class="!isMobile?'text-right':''">
            <a-button type="primary" :disabled="btnAddHuikuanDisabled" @click="dialog.showAddHuikuan=true">新增回款</a-button>
            <a-button type="primary" @click="handleGoCaseEntry">新增案件</a-button>
            <a-button type="primary" :disabled="btnCaseFinalityDisabled" @click="handleShowCaseFinality(true)">终结</a-button>
            <a-button :type="isFav?'primary':''" :loading="favLoading" @click="handleChangeFav">
              <a-icon v-if="!favLoading && isFav" theme="filled" type="star"></a-icon>
              {{ isFav?'已收藏':'收藏' }}
            </a-button>
          </a-col>
        </a-row>
        <div class="margin-top-xl">
          <a-divider dashed />
          <a-row type="flex" justify="center">
            <a-col :span="24">
              <a-steps :current="curStep" @change="handleStepChange" :style="stepStyle">
                <a-step v-for="(item,index) in data.caseStageList" :key="index" :status="curStep===index?'process':'wait'" :title="item.caseStageValue">
                  <a-icon slot="icon" :type="curStep===index?'folder-open':'folder'" />
                </a-step>
              </a-steps>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { changeFavoriteState as httpChangeFav } from '@/api/case'
import NP from 'number-precision'
import ModalAddHuikuan from './ModalAddHuikuan'
import ModalCaseFinality from './ModalCaseFinality'

const FINALITY = 'FINALITY'
const EXECUTE = 'EXECUTE'
export default {
  components: {
    ModalAddHuikuan,
    ModalCaseFinality
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    caseId: {
      type: String,
      default: ''
    },
    caseFolderId: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default() {
        return {
          caseAmount: 0, // 执行金额
          caseReturnedMoneyList: [], // 回款列表
          caseStageList: [], // 案件阶段
          collect: 0 // 是否收藏
        }
      }
    }
  },
  data() {
    return {
      dialog: {
        showAddHuikuan: false,
        showCaseFinality: false
      },
      caseFinalityIsEdit: true,
      favLoading: false
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.app.isMobile
    },
    isFav() {
      return this.data.collect === '1'
    },
    // 当前所选中的阶段
    curStep() {
      return this.data.caseStageList.findIndex(v => v.id === this.caseId)
    },
    stepStyle() {
      if (this.$store.state.app.isMobile) {
        return {
          width: '100%'
        }
      } else {
        return {
          width: '70%',
          margin: '0 auto'
        }
      }
    },
    // “新增回款”按钮是否可点击
    btnAddHuikuanDisabled() {
      // 如果案件阶段列表中没有“执行”阶段，则不可点击
      return this.data.caseStageList.findIndex(v => v.caseStage === EXECUTE) <= -1
    },
    // “终结”按钮是否可点击
    btnCaseFinalityDisabled() {
      // 如果案件阶段列表中存在“终结”阶段，则不可点击
      return this.data.caseStageList.findIndex(v => v.caseStage === FINALITY) > -1
    },
    // 执行金额
    sumPayment() {
      return this.data.caseAmount && this.data.caseAmount || 0
    },
    // 已回款金额
    paymentReceived() {
      if (this.data) {
        const list = this.data.caseReturnedMoneyList
        if (list === null || list.length <= 0) {
          return 0
        } else {
          return list.reduce((accumulator, current) => NP.plus(accumulator, current.returnedMoney), 0)
        }
      }
      return 0
    },
    // 未回款金额
    notPayment() {
      if (this.sumPayment === 0) {
        return 0
      } else {
        return NP.minus(this.sumPayment, this.paymentReceived)
      }
    }
  },
  methods: {
    handleStepChange(e) {
      const chooseCaseId = this.data.caseStageList[e].id
      const caseCode = this.data.caseStageList[e].caseStage
      if (caseCode === FINALITY) {
        this.handleShowCaseFinality(false)
      } else {
        this.$emit('changeStep', chooseCaseId)
      }
    },
    handleGoCaseEntry() {
      this.$router.push('/case/caseEntry')
    },
    handleShowCaseFinality(isEdit = true) {
      this.caseFinalityIsEdit = isEdit
      this.dialog.showCaseFinality = true
    },
    handleChangeFav() {
      this.favLoading = true
      const state = this.data.collect === '1' ? '0' : '1'

      httpChangeFav({ caseFolderId: this.caseFolderId, favoriteState: state }).then(res => {
        this.$emit('changeFav', state)
      }).finally(() => {
        this.favLoading = false
      })
    },
    handleReload() {
      this.$emit('reload')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
