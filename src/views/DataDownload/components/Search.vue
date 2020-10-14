<template>
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
            <a-form-model-item label="类型" prop="type">
              <a-select v-model="searchForm.type" placeholder="类型">
                <a-select-option :value="item.code" v-for="(item,index) in typeList" :key="index">
                  {{ item.name }}
                </a-select-option>
              </a-select>
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
</template>

<script>
export default {
  props: {
    typeList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      searchForm: {
        name: '', // 名称
        type: '', // 类型
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
