<template>
  <div>
    <a-skeleton v-show="loading" active />
    <div v-show="!loading">
      <CaseDetailForm :case-info="caseInfo" :case-pro-status="caseProStatus" :is-edit="isEdit" :submitLoading="submitLoading" @submit="handleSubmit" />
    </div>
  </div>
</template>

<script>
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
    isEdit: {
      type: Boolean,
      default: false
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
      console.log(form)
    }
  }
}
</script>

<style lang="less" scoped>
.dropdown-m {
  max-height: 45vh !important;
}
</style>
