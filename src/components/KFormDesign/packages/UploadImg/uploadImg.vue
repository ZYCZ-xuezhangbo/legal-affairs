<!--
 * @Description: 对上传图片组件进行封装
 -->
<template>
  <div :style="{ width: record.options.width }" class="upload-img-box-9136076486841527">
    <a-upload name="file" :headers="config.uploadImageHeaders || record.options.headers" :data="config.uploadImageData || optionsData" :action="$uploadFileUrl" :multiple="record.options.multiple" :listType="record.options.listType" :disabled="record.options.disabled || parentDisabled" :fileList="fileList" accept="image/jpeg, image/png" @change="handleChange" @preview="handlePreview" :remove="remove" :beforeUpload="beforeUpload">
      <a-button v-if="record.options.listType !== 'picture-card' && fileList.length < record.options.limit" :disabled="record.options.disabled || parentDisabled">
        <a-icon type="upload" /> {{ record.options.placeholder || '上传' }}
      </a-button>
      <div v-if="record.options.listType === 'picture-card' && fileList.length < record.options.limit" :disabled="record.options.disabled || parentDisabled">
        <a-icon type="plus" />
        <div class="ant-upload-text">{{ record.options.placeholder || '上传' }}</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImageUrl" />
    </a-modal>
  </div>
</template>

<script>
import { RESPONSE_CODE } from '@/store/mutation-types'

export default {
  name: 'KUploadImg',
  props: {
    record: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      type: [String, Array],
      default() {
        return []
      }
    },
    config: {
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
  data() {
    return {
      fileList: [],
      previewVisible: false,
      previewImageUrl: ''
    }
  },
  watch: {
    value: {
      // value 需要深度监听及默认先执行handler函数
      handler(val) {
        if (val) {
          this.setFileList()
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    optionsData() {
      try {
        return JSON.parse(this.record.options.data)
      } catch (e) {
        return {}
      }
    }
  },
  methods: {
    setFileList() {
      // 当传入value改变时，fileList也要改变
      // 如果传入的值为字符串，则转成json
      if (typeof this.value === 'string') {
        this.fileList = JSON.parse(this.value)
        // 将转好的json覆盖组件默认值的字符串
        this.handleSelectChange()
      } else {
        this.fileList = this.value
      }
    },
    handleSelectChange() {
      setTimeout(() => {
        const arr = this.fileList.map(item => {
          if (typeof item.response !== 'undefined') {
            const res = item.response
            return {
              type: 'img',
              name: item.name,
              status: item.status,
              uid: item.uid,
              url: res.data.url || ''
            }
          } else {
            return {
              type: 'img',
              name: item.name,
              status: item.status,
              uid: item.uid,
              url: item.url || ''
            }
          }
        })

        this.$emit('change', arr)
        this.$emit('input', arr)
      }, 10)
    },
    handlePreview(file) {
      // 预览图片
      this.previewImageUrl = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleCancel() {
      // 取消操作
      this.previewVisible = false
    },
    remove() {
      this.handleSelectChange()
    },
    beforeUpload(e, files) {
      if (files.length + this.fileList.length > this.record.options.limit) {
        this.$message.warning(`最大上传数量为${this.record.options.limit}`)
        files.splice(this.record.options.limit - this.fileList.length)
      }

      const isJpgOrPng = e.type === 'image/jpeg' || e.type === 'image/png'
      if (!isJpgOrPng) this.$message.error('只可上传jpg或png格式的图片')

      const maxSize = 2 // 单位：M
      const isSize = e.size / 1024 / 1024 < maxSize
      if (!isSize) this.$message.error(`图片大小不可大于${maxSize}MB`)

      const result = isJpgOrPng && isSize
      if (result) {
        return Promise.resolve()
      } else {
        return Promise.reject(new Error())
      }
    },
    handleChange(info) {
      // 上传数据改变时
      this.fileList = info.fileList
      if (info.file.status === 'done') {
        const res = info.file.response
        if (res.code === RESPONSE_CODE.S0000) {
          this.handleSelectChange()
        } else {
          this.fileList.pop()
          this.$message.error('图片上传失败')
        }
      } else if (info.file.status === 'error') {
        this.$message.error('图片上传失败')
      }
    }
  }
}
</script>
<style lang="less">
.upload-img-box-9136076486841527 {
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
}
</style>
