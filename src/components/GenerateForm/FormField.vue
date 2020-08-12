<template>
  <a-form-model-item v-bind="itemModel(listItem)">
    <template v-if="listItem.type === 'input'">
      <a-input-password v-if="listItem.options.showPassword" :placeholder="listItem.name" />
      <a-input v-else v-model="form[listItem.model]" :placeholder="listItem.name" />
    </template>
    <template v-else-if="listItem.type === 'select'">
      <a-select v-if="!listItem.options.remote" v-model="form[listItem.model]">
        <a-select-option v-for="(selectItem,selectIndex) in listItem.options.options" :key="selectIndex" :value="selectItem.value">{{ selectItem.label }}</a-select-option>
      </a-select>
    </template>
    <template v-else-if="listItem.type === 'date'">
      <a-date-picker v-model="form[listItem.model]" input-read-only :type="listItem.options.type" :placeholder="listItem.options.placeholder" :style="{width:listItem.options.width}" @change="(e,date) => handleDateChange(date, listItem.model)" />
    </template>
    <template v-else-if="listItem.type === 'radio'">
      <a-radio-group v-model="form[listItem.model]">
        <a-radio v-for="(radioItem,radioIndex) in listItem.options.options" :key="radioIndex" :value="radioItem.value" :style="radioStyle(listItem)"> {{ radioItem.label }} </a-radio>
      </a-radio-group>
    </template>
    <template v-else-if="listItem.type === 'checkbox'">
      <a-checkbox-group v-model="form[listItem.model]">
        <a-checkbox v-for="(cbItem,cbIndex) in listItem.options.options" :key="cbIndex" :value="cbItem.value" :name="cbItem.label"> Online </a-checkbox>
      </a-checkbox-group>
    </template>
    <template v-else-if="listItem.type === 'switch'">
      <a-switch v-model="form[listItem.model]" />
    </template>
  </a-form-model-item>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    },
    listItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    itemModel(i) {
      const item = i.options
      if (i.options.hideLabel) item.lable = ''
      else item.label = i.name
      item.prop = i.model
      item.rules = i.rules
      return item
    },
    radioStyle(i) {
      if (!i.options.inline) {
        return {
          display: 'block',
          height: '30px',
          lineHeight: '30px'
        }
      } else if (i.options.width === '100%') {
        return {}
      }
    }
  }
}
</script>

<style>
</style>
