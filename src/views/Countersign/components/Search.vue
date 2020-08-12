<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form-model ref="searchForm" layout="inline" :model="searchForm">
          <a-row :gutter="searchTableGrid.gutter">
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="名称" prop="name">
                <a-input v-model="searchForm.name" placeholder="名称" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="发布时间" prop="startDate">
                <a-date-picker class="date" v-model="searchForm.startDate" format="YYYY-MM-DD" placeholder="开始时间" inputReadOnly @change="handleStartDateChange" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="至" prop="endDate">
                <a-date-picker class="date" v-model="searchForm.endDate" format="YYYY-MM-DD" placeholder="结束时间" inputReadOnly @change="handleEndDateChange" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item>
                <a-button class="margin-right" type="primary" @click="handleSearch">搜索</a-button>
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
        name: '',
        startDate: '',
        endDate: ''
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
    },
    handleStartDateChange(date, dateStr) {
      this.searchForm.startDate = dateStr
    },
    handleEndDateChange(date, dateStr) {
      this.searchForm.endDate = dateStr
    }
  }
}
</script>

<style lang="less" scoped>
.date {
  width: 100%;
}
</style>
