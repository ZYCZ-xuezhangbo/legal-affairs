<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form-model ref="searchForm" layout="inline" :model="searchForm">
        <a-row :gutter="searchTableGrid.gutter">
          <a-col v-bind="searchTableGrid.span">
            <a-form-model-item label="权限名称" prop="name">
              <a-input v-model="searchForm.name" placeholder="权限名称" />
            </a-form-model-item>
          </a-col>
          <a-col v-bind="searchTableGrid.span">
            <a-form-model-item>
              <button-search @click="handleSearch" />
              <button-reset @click="resetForm" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        roleMsg: ''
      }
    }
  },
  computed: {
    searchTableGrid() {
      return this.$store.getters.searchTableGrid
    }
  },
  methods: {
    resetForm() {
      this.$refs.searchForm.resetFields()
    },
    handleSearch() {
      this.$emit('search', this.searchForm)
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .ant-btn + .ant-btn {
  margin-left: 8px;
}
</style>
