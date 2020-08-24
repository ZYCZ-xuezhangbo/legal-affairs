<template>
  <page-header-wrapper>
    <template #content>
      <a-row type="flex">
        <a-col class="margin-bottom">
          <a-button type="primary" class="margin-right-lg" @click="dialog.caseRelationShow=true">选择关联案件</a-button>
        </a-col>
        <a-col :flex="1">
          <template v-if="relationCase">
            <span class="margin-right-lg margin-bottom" style="display:inline-block">
              我方涉案单位：{{ relationCase.ourUnits }}，诉讼地位：{{ relationCase.locusStand }}，案号：{{ relationCase.caseNo }}
            </span>
            <a class="text-red margin-bottom" style="display:inline-block" @click="relationCase=null">
              取消关联 <a-icon type="close-circle"></a-icon>
            </a>
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
import { create as httpCreate, getCaseDictionaries as httpGetDict } from '@/api/case'
import CaseRelation from './components/CaseRelation'
import CaseDetailForm from '../CaseDetail/components/CaseDetailForm'

export default {
  components: {
    CaseRelation,
    CaseDetailForm
  },
  data() {
    return {
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
    }
  },
  created () {
    console.log(this.$route.query.caseId)
  },
  mounted() {
    httpGetDict().then(res => {
      this.dict.lawsuit = res.data.LAWSUIT
    })
  }
}
</script>

<style lang="less" scoped>
</style>
