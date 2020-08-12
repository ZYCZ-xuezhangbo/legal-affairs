<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form-model ref="searchForm" layout="inline" :model="searchForm">
          <a-row :gutter="searchTableGrid.gutter">
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="标题" prop="title">
                <a-input v-model="searchForm.title" placeholder="标题" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="发布公司" prop="releaseCompany">
                <a-input v-model="searchForm.releaseCompany" placeholder="发布公司" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="发布人" prop="releasePerson">
                <a-input v-model="searchForm.releasePerson" placeholder="发布人" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item>
                <a-button type="primary" @click="handleSearch">搜索</a-button>
                <a-button @click="resetForm">重置</a-button>
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
        title: '', // 标题
        releaseCompany: '', // 发布公司
        releasePerson: '' // 发布人
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

<style>
</style>
