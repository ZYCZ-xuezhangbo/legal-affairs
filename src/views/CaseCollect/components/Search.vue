<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form-model ref="searchForm" layout="inline" :model="searchForm" :rules="rules">
        <a-row :gutter="gutter">
          <a-col v-bind="span">
            <a-form-model-item label="报表" prop="tableType">
              <a-select v-model="searchForm.tableType">
                <a-select-option v-for="(item,index) in tableType" :key="index" :value="item.code">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="时间" prop="startTime">
              <a-date-picker v-model="searchForm.startTime" inputReadOnly placeholder="开始时间" @change="(e,str)=>searchForm.startTime=str" style="width:50%">
                <template #suffixIcon></template>
              </a-date-picker>
              <a-date-picker v-model="searchForm.endTime" inputReadOnly placeholder="结束时间" @change="(e,str)=>searchForm.endTime=str" style="width:50%">
                <template #suffixIcon></template>
              </a-date-picker>
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item>
              <button-export :loading="exportLoading" @click="handleExport" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
  </a-card>
</template>

<script>
import { required as validateRequired } from '@/utils/formValidate'

export default {
  props: {
    tableType: {
      type: Array,
      default() {
        return []
      }
    },
    exportLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      span: { lg: 24, xl: 12, xxl: 8 },
      searchForm: {
        tableType: '',
        startTime: '',
        endTime: ''
      },
      rules: {
        tableType: [validateRequired]
      }
    }
  },
  computed: {
    gutter() {
      return this.$store.getters.searchTableGrid.gutter
    }
  },
  methods: {
    handleExport() {
      this.$refs.searchForm.validate().then(() => {
        this.$emit('export', this.searchForm)
      }).catch((e) => { })
    }
  }
}
</script>

<style scoped lang="less">
</style>
