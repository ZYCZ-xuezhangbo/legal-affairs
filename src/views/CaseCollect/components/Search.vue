<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form-model ref="searchForm" layout="inline" :model="searchForm" :rules="rules">
          <a-row :gutter="searchTableGrid.gutter">
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="报表" prop="tableName">
                <a-select v-model="searchForm.tableName">
                  <a-select-option v-for="(item,index) in tableType" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item label="时间" prop="startTime">
                <a-date-picker v-model="searchForm.startTime" inputReadOnly placeholder="开始时间" @change="(e,str)=>searchForm.startTime=str" style="width:50%">
                  <template #suffixIcon></template>
                </a-date-picker>
                <a-date-picker v-model="searchForm.endTime" inputReadOnly placeholder="结束时间" @change="(e,str)=>searchForm.endTime=str" style="width:50%">
                  <template #suffixIcon></template>
                </a-date-picker>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="searchTableGrid.span">
              <a-form-model-item>
                <button-export :loading="exportLoading" @click="handleExport" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </div>
    </a-card>
  </div>
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
      searchForm: {
        tableName: '',
        startTime: '',
        endTime: ''
      },
      rules: {
        tableName: [validateRequired]
      }
    }
  },
  computed: {
    searchTableGrid() {
      return this.$store.getters.searchTableGrid
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

<style>
</style>
