<template>
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
                <a-select-option v-for="(item,index) in dict.COMPANY" :key="index" :value="item.code">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col v-bind="searchTableGrid.span">
            <a-form-model-item label="法学类专业" prop="legalMajor">
              <a-select v-model="searchForm.legalMajor">
                <a-select-option v-for="(item,index) in trueOrFalse" :key="index" :value="item.code">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col v-bind="searchTableGrid.span">
            <a-form-model-item label="法律职业资格" prop="professionStatus">
              <a-select v-model="searchForm.professionStatus">
                <a-select-option v-for="(item,index) in trueOrFalse" :key="index" :value="item.code">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col v-bind="searchTableGrid.span">
            <a-form-model-item label="企业法律顾问职业资格" prop="legalProfession">
              <a-select v-model="searchForm.legalProfession">
                <a-select-option v-for="(item,index) in trueOrFalse" :key="index" :value="item.code">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col v-bind="searchTableGrid.span">
            <a-form-model-item>
              <button-search class="margin-right" @click="handleSearch" />
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
    dict: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      trueOrFalse: [
        {
          code: '',
          name: this.$t('select.search.all')
        }, {
          code: '0',
          name: '否'
        }, {
          code: '1',
          name: '是'
        }
      ],
      searchForm: {
        company: '',
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
