<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form-model ref="searchForm" layout="inline" :model="searchForm">
        <a-row :gutter="searchTableGrid.gutter">
          <a-col v-bind="searchTableGrid.span">
            <a-form-model-item label="律所名称" prop="outsideLawFirmName">
              <a-select v-model="searchForm.outsideLawFirmName">
                <a-select-option value="">
                  {{ $t('select.search.all') }}
                </a-select-option>
                <a-select-option :value="item.code" v-for="(item,index) in lawFirmList" :key="index">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col v-bind="searchTableGrid.span">
            <a-form-model-item label="律师名称" prop="lawName">
              <a-input v-model="searchForm.lawName" placeholder="律师名称" />
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
  props: {
    lawFirmList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      searchForm: {
        outsideLawFirmName: '', // 律所id
        lawName: '' // 律师名称
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
