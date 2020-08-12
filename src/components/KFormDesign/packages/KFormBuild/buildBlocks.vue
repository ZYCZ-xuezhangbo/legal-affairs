<template>
  <!-- 栅格布局 -->
  <a-row v-if="record.type === 'grid'" class="grid-row" :gutter="record.options.gutter">
    <a-col class="grid-col" v-for="(colItem, idnex) in record.columns" :key="idnex" :xs="colItem.xs || 0" :sm="colItem.sm || 0" :md="colItem.md || 0" :lg="colItem.lg || 0" :xl="colItem.xl || 0">
      <buildBlocks ref="nestedComponents" @handleReset="handleReset" @change="handleChange" v-for="item in colItem.list" :disabled="disabled" :dynamicData="dynamicData" :key="item.key" :record="item" :formConfig="formConfig" :config="config" />
    </a-col>
  </a-row>
  <!-- 卡片布局 -->
  <a-card v-else-if="record.type === 'card'" class="grid-row" :title="record.label" :bordered="record.options.bordered">
    <buildBlocks ref="nestedComponents" @handleReset="handleReset" @change="handleChange" v-for="item in record.list" :disabled="disabled" :dynamicData="dynamicData" :key="item.key" :record="item" :formConfig="formConfig" :config="config" />
  </a-card>
  <!-- 表格布局 -->
  <table v-else-if="record.type === 'table'" class="kk-table-9136076486841527" :class="{
    bright: record.options.bright,
    small: record.options.small,
    bordered: record.options.bordered
  }" :style="record.options.customStyle">
    <tr v-for="(trItem, trIndex) in record.trs" :key="trIndex">
      <td class="table-td" v-for="(tdItem, tdIndex) in trItem.tds" :key="tdIndex" :colspan="tdItem.colspan" :rowspan="tdItem.rowspan">
        <buildBlocks ref="nestedComponents" @handleReset="handleReset" @change="handleChange" v-for="item in tdItem.list" :disabled="disabled" :dynamicData="dynamicData" :key="item.key" :record="item" :formConfig="formConfig" :config="config" />
      </td>
    </tr>
  </table>

  <KFormItem v-else ref="nestedComponents" @handleReset="handleReset" @change="handleChange" :disabled="disabled" :dynamicData="dynamicData" :key="record.key" :record="record" :formConfig="formConfig" :config="config" />
</template>
<script>

import KFormItem from '../KFormItem/index'
export default {
  name: 'BuildBlocks',
  props: {
    record: {
      type: Object,
      required: true
    },
    formConfig: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      default: () => ({})
    },
    dynamicData: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    KFormItem
  },
  methods: {
    validationSubform() {
      // 验证动态表格
      const nestedComponents = this.$refs.nestedComponents
      if (
        typeof nestedComponents === 'object' &&
        nestedComponents instanceof Array
      ) {
        for (let i = 0; nestedComponents.length > i; i++) {
          if (!nestedComponents[i].validationSubform()) {
            return false
          }
        }
        return true
      } else if (typeof nestedComponents !== 'undefined') {
        return nestedComponents.validationSubform()
      } else {
        return true
      }
    },
    handleChange(value, key) {
      this.$emit('change', value, key)
    },
    handleReset() {
      this.$emit('handleReset')
    }
  }
}
</script>
