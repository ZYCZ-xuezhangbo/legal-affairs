<!--
 * @Description: 对上传文件组件进行封装
 -->
<template>
  <div :style="{ width: record.options.width }">
    <a-upload v-if="!record.options.drag" :disabled="record.options.disabled || parentDisabled" :name="config.uploadFileName || record.options.fileName" :headers="config.uploadFileHeaders || record.options.headers" :data="config.uploadFileData || optionsData" :action="config.uploadFile || record.options.action" :multiple="record.options.multiple" :fileList="fileList" @preview="handlePreview" @change="handleChange" :remove="remove" :beforeUpload="beforeUpload">
      <a-button v-if="fileList.length < record.options.limit" :disabled="record.options.disabled || parentDisabled">
        <a-icon type="upload" /> {{ record.options.placeholder }}
      </a-button>
    </a-upload>
    <a-upload-dragger v-else :disabled="record.options.disabled || parentDisabled" :name="config.uploadFileName || record.options.fileName" :headers="config.uploadFileHeaders || record.options.headers" :data="config.uploadFileData || optionsData" :action="config.uploadFile || record.options.action" :multiple="record.options.multiple" :fileList="fileList" @preview="handlePreview" @change="handleChange" :remove="remove" :beforeUpload="beforeUpload">
      <p class="ant-upload-drag-icon">
        <a-icon type="cloud-upload" />
      </p>
      <p class="ant-upload-text">单击或拖动文件到此区域</p>
    </a-upload-dragger>
  </div>
</template>
<script>

export default {
  name: 'KUploadFile',
  props: {
    record: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      type: [String, Array],
      default: ''
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
    },
    dynamicData: {
      default: false
    }
  },
  data() {
    return {
      fileList: []
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
              type: 'file',
              name: item.name,
              status: item.status,
              // uid: res.data.fileId || Date.now(),
              uid: new Date().getTime(),
              url: res.data.url || ''
            }
          } else {
            return {
              type: 'file',
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
      // 下载文件
      const downloadWay = this.record.options.downloadWay
      const dynamicFun = this.record.options.dynamicFun
      if (downloadWay === 'a') {
        // 使用a标签下载
        const a = document.createElement('a')
        a.href = file.url || file.thumbUrl
        a.download = file.name
        a.click()
      } else if (downloadWay === 'ajax') {
        // 使用ajax获取文件blob，并保持到本地
        this.getBlob(file.url || file.thumbUrl).then(blob => {
          this.saveAs(blob, file.name)
        })
      } else if (downloadWay === 'dynamic') {
        // 触发动态函数
        this.dynamicData[dynamicFun](file)
      }
    },
    /**
     * 获取 blob
     * url 目标文件地址
     */
    getBlob(url) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest()

        xhr.open('GET', url, true)
        xhr.responseType = 'blob'
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(xhr.response)
          }
        }

        xhr.send()
      })
    },
    /**
     * 保存 blob
     * filename 想要保存的文件名称
     */
    saveAs(blob, filename) {
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename)
      } else {
        const link = document.createElement('a')
        const body = document.querySelector('body')
        link.href = window.URL.createObjectURL(blob)
        link.download = filename

        // fix Firefox
        link.style.display = 'none'
        body.appendChild(link)

        link.click()
        body.removeChild(link)

        window.URL.revokeObjectURL(link.href)
      }
    },
    remove() {
      this.handleSelectChange()
    },
    beforeUpload(e, files) {
      if (files.length + this.fileList.length > this.record.options.limit) {
        this.$message.warning(`最大上传数量为${this.record.options.limit}`)
        files.splice(this.record.options.limit - this.fileList.length)
      }
    },
    handleChange(info) {
      this.fileList = info.fileList
      if (info.file.status === 'done') {
        const res = info.file.response
        if (res.code === 0) {
          this.handleSelectChange()
        } else {
          this.fileList.pop()
          this.$message.error(`文件上传失败`)
        }
      } else if (info.file.status === 'error') {
        this.$message.error(`文件上传失败`)
      }
    }
  }
}
</script>