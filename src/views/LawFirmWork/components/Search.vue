<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form-model ref="searchForm" layout="inline" :model="searchForm">
          <a-row :gutter="searchTableGrid.gutter">
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="公司" prop="company">
                <a-input v-model="searchForm.company" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="律所名称" prop="lawFirmName">
                <a-input v-model="searchForm.lawFirmName" placeholder="律所名称" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="律师名称" prop="lawName">
                <a-input v-model="searchForm.lawName" placeholder="律师名称" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="评价状态" prop="scoreStatus">
                <a-select v-model="searchForm.scoreStatus">
                  <a-select-option value="">
                    {{ $t('select.search.all') }}
                  </a-select-option>
                  <a-select-option value="1">
                    已评价
                  </a-select-option>
                  <a-select-option value="0">
                    未评价
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="服务类型" prop="serviceType">
                <a-select v-model="searchForm.serviceType">
                  <a-select-option value="">
                    {{ $t('select.search.all') }}
                  </a-select-option>
                  <a-select-option v-for="(item,index) in dict.LAYERTYPE" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="时间" prop="startTime">
                <a-date-picker v-model="searchForm.startTime" inputReadOnly placeholder="开始时间" @change="(e,str)=>searchForm.startTime=str" class="response" style="width:50%">
                  <template #suffixIcon></template>
                </a-date-picker>
                <a-date-picker v-model="searchForm.endTime" inputReadOnly placeholder="结束时间" @change="(e,str)=>searchForm.endTime=str" class="response" style="width:50%">
                  <template #suffixIcon></template>
                </a-date-picker>
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
      searchForm: {
        company: '',
        endTime: '',
        lawFirmName: '',
        lawName: '',
        serviceType: '',
        startTime: '',
        scoreStatus: ''
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
