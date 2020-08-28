<template>
  <div :class="prefixCls">
    <div :style="{'height':height+'px'}" ref="editor" class="editor-wrapper"></div>
  </div>
</template>

<script>
import WEditor from 'wangeditor'
import { upload } from '@/api/file'

export default {
  name: 'WangEditor',
  props: {
    prefixCls: {
      type: String,
      default: 'ant-editor-wang'
    },
    height: {
      type: Number,
      default: 200
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editor: null,
      editorContent: null
    }
  },
  watch: {
    value(val) {
      this.editorContent = val
      this.editor.txt.html(val)
    },
    disabled(newVal, oldVal) {
      if (newVal) {
        this.editor.$textElem.attr('contenteditable', false)
      } else {
        this.editor.$textElem.attr('contenteditable', true)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initEditor()
    })
  },
  methods: {
    initEditor() {
      this.editor = new WEditor(this.$refs.editor)
      this.editor.customConfig.zIndex = 1
      this.editor.customConfig.onchange = (html) => {
        this.editorContent = html
        this.$emit('change', this.editorContent)
      }
      this.editor.customConfig.customUploadImg = (files, insert) => {
        const formData = new FormData()
        formData.append('file', files[0], files[0].name)
        upload(formData).then(res => {
          const url = res.data.url
          insert(url)
        })
      }
      this.editor.create()
    }
  }
}
</script>

<style lang="less" scoped>
.ant-editor-wang {
  .editor-wrapper {
    text-align: left;
    /deep/ .w-e-toolbar {
      border-radius: 5px 5px 0 0;
      background-color: rgba(225, 225, 225, 0.1);
    }
    /deep/ .w-e-text-container {
      border-radius: 0 0 5px 5px;
      height: calc(100% - 33px) !important;
    }
  }
}
</style>
