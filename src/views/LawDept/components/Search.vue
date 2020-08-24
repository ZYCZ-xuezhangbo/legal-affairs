<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form-model ref="searchForm" layout="inline" :model="searchForm">
          <a-row :gutter="searchTableGrid.gutter">
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="公司" prop="company">
                <a-select v-model="searchForm.company">
                  <a-select-option value="">
                    {{ $t('select.search.all') }}
                  </a-select-option>
                  <a-select-option v-for="(item,index) in companyList" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="部门" prop="deptName">
                <a-select v-model="searchForm.deptName">
                  <a-select-option value="">
                    {{ $t('select.search.all') }}
                  </a-select-option>
                  <a-select-option v-for="(item,index) in deptList" :key="index" :value="item.code">
                    {{ item.name }}
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
    companyList: {
      type: Array,
      default() {
        return []
      }
    },
    deptList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      searchForm: {
        company: '',
        deptName: ''
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
