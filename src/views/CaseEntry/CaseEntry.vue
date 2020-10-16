<template>
  <page-header-wrapper>
    <template #content>
      <a-row type="flex">
        <a-col class="margin-bottom">
          <a-button v-show="!relationCase" type="primary" class="margin-right-lg" @click="dialog.caseRelationShow=true">选择关联案件</a-button>
        </a-col>
        <a-col :flex="1">
          <template v-if="relationCase">
            <span class="margin-right-lg margin-bottom" style="display:inline-block">
              <span class="text-gray">我方涉案单位：</span>{{ relationCase.ourUnits }}
              <a-divider type="vertical" />
              <span class="text-gray">诉讼地位：</span>{{ relationCase.locusStand }}
              <a-divider type="vertical" />
              <span class="text-gray">案号：</span>{{ relationCase.caseNo }}
            </span>
            <!-- <a class="text-red margin-bottom" style="display:inline-block" @click="relationCase=null">
              取消关联 <a-icon type="close-circle"></a-icon>
            </a> -->
            <a-button class="text-red margin-bottom" type="dashed" icon="close-circle" @click="relationCase=null">取消关联</a-button>
          </template>
        </a-col>
      </a-row>
    </template>
    <CaseRelation :show="dialog.caseRelationShow" :lawsuit="dict.lawsuit" @choose="handleCaseRelationChoose" @close="dialog.caseRelationShow=false" />
    <a-card :bordered="false">
      <CaseDetailForm :submitLoading="submitLoading" act="add" @submit="handleSubmit" />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { create as httpCreate, getCaseDictionaries as httpGetDict, getBasicInfoById as httpGetBasicInfoById } from '@/api/case'
import CaseRelation from './components/CaseRelation'
import CaseDetailForm from '../CaseDetail/components/CaseDetailForm'

export default {
  components: {
    CaseRelation,
    CaseDetailForm
  },
  data() {
    return {
      isDefaultRelationCase: false,
      submitLoading: false,
      dialog: {
        caseRelationShow: false
      },
      dict: {},
      relationCase: null // 关联案件详情
    }
  },
  methods: {
    /**
     * 提交
     */
    handleSubmit(form) {
      const caseFolderId = (this.relationCase && this.relationCase.caseFolderId) || ''

      this.submitLoading = true

      if (form.caseNo === '') form.caseNo = '暂无案号'

      httpCreate({ caseFolderId, ...form }).then(res => {
        this.$router.push('/case/caseList')
      }).finally(() => {
        this.submitLoading = false
      })
    },
    /**
     * 选中一条关联案件
     */
    handleCaseRelationChoose(item) {
      this.dialog.caseRelationShow = false
      this.relationCase = item
    },
    getDict() {
      httpGetDict().then(res => {
        this.dict.lawsuit = res.data.LAWSUIT
      })
    },
    getCaseBasicInfo(caseId) {
      httpGetBasicInfoById(caseId).then(res => {
        this.relationCase = res.data
      })
    }
  },
  created() {
    const caseId = this.$route.query.caseId
    if (caseId) {
      this.isDefaultRelationCase = true
      this.getCaseBasicInfo(caseId)
    }
  },
  mounted() {
    this.getDict()
  }
}
</script>

<style lang="less" scoped>
</style>
