<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form-model ref="searchForm" layout="inline" :model="searchForm">
          <a-row :gutter="searchTableGrid.gutter">
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="公告标题" prop="title">
                <a-input v-model="searchForm.title" placeholder="公告标题" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="发布时间" prop="startDate">
                <a-date-picker class="date" v-model="searchForm.startDate" format="YYYY-MM-DD" placeholder="开始时间" inputReadOnly @change="(e,str)=>searchForm.startDate=str" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="至" prop="endDate">
                <a-date-picker class="date" v-model="searchForm.endDate" format="YYYY-MM-DD" placeholder="结束时间" inputReadOnly @change="(e,str)=>searchForm.endDate=str" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="发布人" prop="releasePerson">
                <a-input v-model="searchForm.releasePerson" placeholder="发布人" />
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
        title: '', // 标题
        startDate: null,
        endDate: null,
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

<style lang="less" scoped>
.date {
  width: 100%;
}
</style>
