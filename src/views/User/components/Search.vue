<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form-model ref="searchForm" layout="inline" :model="searchForm">
          <a-row :gutter="searchTableGrid.gutter">
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="用户名称" prop="userName">
                <a-input v-model="searchForm.userName" placeholder="用户名称" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="用户公司" prop="company">
                <a-input v-model="searchForm.company" placeholder="用户公司" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="用户部门" prop="dept">
                <a-input v-model="searchForm.dept" placeholder="用户部门" />
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        userName: '', // 用户名称
        company: '', // 用户公司
        dept: '' // 用户部门
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
