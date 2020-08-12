<!--
 * @Description: 时间选择器
 -->
<template>
  <a-time-picker :style="`width:${record.options.width}`" :disabled="record.options.disabled || parentDisabled" :allowClear="record.options.clearable" :placeholder="record.options.placeholder" :format="record.options.format" @change="handleSelectChange" :value="time" />
</template>
<script>
import moment from 'moment'
export default {
  props: {
    record: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      type: String,
      default: ''
    },
    parentDisabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    time() {
      if (!this.value) {
        return undefined
      } else {
        return moment(this.value, this.record.options.format)
      }
    }
  },
  methods: {
    handleSelectChange(val) {
      let time
      if (!val) {
        time = ''
      } else {
        time = val.format(this.record.options.format)
      }
      this.$emit('change', time)
      this.$emit('input', time)
    }
  }
}
</script>
