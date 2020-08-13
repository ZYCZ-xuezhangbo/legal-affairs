<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form-model ref="searchForm" layout="inline" :model="searchForm">
          <a-row :gutter="searchTableGrid.gutter">
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="律所名称" prop="lawFirmName">
                <a-input v-model="searchForm.lawFirmName" placeholder="律所名称" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="联系人" prop="linkman">
                <a-input v-model="searchForm.linkman" placeholder="联系人" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="地址" prop="address">
                <a-input v-model="searchForm.address" placeholder="地址" />
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
        lawFirmName: '', // 标题
        linkman: '',
        address: ''
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
