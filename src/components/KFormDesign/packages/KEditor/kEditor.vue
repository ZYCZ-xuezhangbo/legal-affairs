<!--
 * @Description: 对vue-quill-editor封装
 -->
<template>
  <div>
    <WangEditor ref="vueQuillEditor" :height="record.options.height" :value="value" :disabled="record.options.disabled || parentDisabled" @change="onEditorChange" />
  </div>
</template>
<script>
import WangEditor from '@/components/Editor/WangEditor'

export default {
  name: 'Editor',
  props: {
    value: {
      type: String,
      default: ''
    },
    record: {
      type: Object,
      default() {
        return {}
      }
    },
    parentDisabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    WangEditor
  },
  data() {
    return {
    }
  },
  methods: {
    onEditorChange(html) {
      this.$emit('change', html)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
