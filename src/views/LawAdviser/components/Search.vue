<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form-model ref="searchForm" layout="inline" :model="searchForm">
          <a-row :gutter="searchTableGrid.gutter">
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="法学类专业" prop="legalMajor">
                <a-select v-model="searchForm.legalMajor">
                  <a-select-option value="">
                    {{ $t('select.search.all') }}
                  </a-select-option>
                  <a-select-option value="1">
                    是
                  </a-select-option>
                  <a-select-option value="0">
                    否
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="法律职业资格" prop="professionStatus">
                <a-select v-model="searchForm.professionStatus">
                  <a-select-option value="">
                    {{ $t('select.search.all') }}
                  </a-select-option>
                  <a-select-option value="1">
                    是
                  </a-select-option>
                  <a-select-option value="0">
                    否
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="企业法律顾问职业资格" prop="legalProfession">
                <a-select v-model="searchForm.legalProfession">
                  <a-select-option value="">
                    {{ $t('select.search.all') }}
                  </a-select-option>
                  <a-select-option value="1">
                    是
                  </a-select-option>
                  <a-select-option value="0">
                    否
                  </a-select-option>
                </a-select>
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
  props: {
  },
  data() {
    return {
      searchForm: {
        legalMajor: '', // 是否法学类专业
        legalProfession: '', // 是否有企业法律顾问职业资格（0：否，1：是）
        professionStatus: '' // 是否有法律职业资格（0：否，1：是）
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
</style>
