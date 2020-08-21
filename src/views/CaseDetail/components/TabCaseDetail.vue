<template>
  <div>
    <a-skeleton v-show="loading" active />
    <div v-show="!loading">
      <CaseDetailForm :case-info="caseInfo" :case-pro-status="caseProStatus" :act="act" :submitLoading="submitLoading" @submit="handleSubmit" />
    </div>
  </div>
</template>

<script>
import { update as httpUpdate } from '@/api/case'
import CaseDetailForm from './CaseDetailForm'

export default {
  components: {
    CaseDetailForm
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    caseInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    caseProStatus: {
      type: Array,
      default() {
        return []
      }
    },
    act: {
      type: String,
      default: 'detail'
    }
  },
  data() {
    return {
      isModify: true,
      submitLoading: false,
      dict: {}
    }
  },
  computed: {
    span() {
      return this.$store.getters.searchTableGrid.span
    }
  },
  methods: {
    handleModify() {
      this.isModify = true
    },
    handleSubmit(form) {
      this.submitLoading = true
      httpUpdate(form).then(res => {
        this.$emit('submit')
      }).finally(() => {
        this.submitLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.dropdown-m {
  max-height: 45vh !important;
}
</style>
