<!-- 对上传文件组件进行封装 -->
<template>
  <div :style="{ width: record.options.width }">

    <a-modal v-model="visible" title="请选择操作" :footer="null">
      <div class="text-center">
        <a-button type="primary" icon="download" :loading="downloadLoading" @click="download">下载</a-button>
        <a-button type="primary" icon="eye" @click="handlePreviewOnModal">预览</a-button>
      </div>
    </a-modal>

    <a-modal v-model="previewVisible" :footer="null" style="height:99vh;">
      <img v-if="perviewType==='img'" alt="" style="width: 100%" :src="previewUrl" />

      <video id="video" v-else-if="perviewType==='video'" alt="" controls style="width: 100%" :src="previewUrl"></video>

      <div v-else-if="perviewType==='pdf'">
        <pdf ref="pdf" :src="previewUrl" :page="pdfPageNum" @progress="pdfLoadedRatio=$event" @num-pages="pdfTotalNum=$event"></pdf>
        <div class="pdf-pagination">
          <div class="padding-bottom-sm">{{ pdfPageNum }} / {{ pdfTotalNum }}</div>
          <a-button-group>
            <a-button type="primary" @click="prePage">
              <a-icon type="left" />
              上一页
            </a-button>
            <a-button type="primary" @click="nextPage" style="margin-left:0;">
              下一页
              <a-icon type="right" />
            </a-button>
          </a-button-group>
        </div>
      </div>
    </a-modal>

    <a-spin :spinning="spinning">
      <a-upload v-if="!record.options.drag" :disabled="record.options.disabled || parentDisabled" name="file" :headers="config.uploadFileHeaders || record.options.headers" :data="config.uploadFileData || optionsData" :action="$uploadFileUrl" :multiple="record.options.multiple" :fileList="fileList" @preview="handlePreview" @change="handleChange" :remove="remove" :beforeUpload="beforeUpload">
        <a-button v-if="fileList.length < record.options.limit" :disabled="record.options.disabled || parentDisabled">
          <a-icon type="upload" /> {{ record.options.placeholder || '上传' }}
        </a-button>
      </a-upload>
      <a-upload-dragger v-else :disabled="record.options.disabled || parentDisabled" name="file" :headers="config.uploadFileHeaders || record.options.headers" :data="config.uploadFileData || optionsData" :action="$uploadFileUrl" :multiple="record.options.multiple" :fileList="fileList" @preview="handlePreview" @change="handleChange" :remove="remove" :beforeUpload="beforeUpload">
        <p class="ant-upload-drag-icon">
          <a-icon type="cloud-upload" />
        </p>
        <p class="ant-upload-text">单击或拖动文件到此区域</p>
      </a-upload-dragger>
    </a-spin>

  </div>
</template>

<script>
import { RESPONSE_CODE } from '@/store/mutation-types'
import pdf from 'vue-pdf'
import { saveAs } from '@/utils/util'
// import { download as httpDownload } from '@/api/download'
const IMG_TYPE = ['jpg', 'png', 'jpeg']
const VIDEO_TYPE = ['mp4', 'rmvb']
const PDF_TYPE = ['pdf']

let video = null
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
  components: {
    pdf
  },
  data() {
    return {
      spinning: false,
      visible: false,
      previewVisible: false,
      downloadFile: undefined,
      previewUrl: '',
      perviewType: '',
      fileList: [],
      downloadLoading: false,
      pdfPageNum: 1,
      pdfTotalNum: 0,
      pdfLoadedRatio: 0
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
    },
    previewVisible(val) {
      if (!val && this.perviewType === 'video') {
        video.pause()
      } else {
        this.$nextTick(() => {
          if (!video) video = document.getElementById('video')
        })
      }
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
      this.downloadFile = file

      const fileName = file.name
      const suffix = fileName.substr(fileName.lastIndexOf('.') + 1)

      let visible = true
      let previewUrl = file.url
      if (IMG_TYPE.includes(suffix)) {
        // 如果是视频、图片
        this.perviewType = 'img'
      } else if (VIDEO_TYPE.includes(suffix)) {
        this.perviewType = 'video'
      } else if (PDF_TYPE.includes(suffix)) {
        this.perviewType = 'pdf'
        previewUrl = 'http://image.cache.timepack.cn/nodejs.pdf'
        // debugger
      } else {
        visible = false
        this.download()
      }
      this.previewUrl = previewUrl
      this.visible = visible
    },
    handlePreviewOnModal() {
      this.previewVisible = true
    },
    download() {
      // 下载文件
      const file = this.downloadFile
      const downloadWay = 'ajax'
      const paramsUrl = encodeURI(file.url)
      const paramsName = encodeURI(file.name)
      const href = `${process.env.VUE_APP_API_BASE_URL}/file/download?url=${paramsUrl}&name=${paramsName}`

      if (downloadWay === 'a') {
        // 使用a标签下载
        const a = document.createElement('a')

        a.href = href
        a.download = file.name
        a.target = '_blank'
        a.click()
      } else if (downloadWay === 'ajax') {
        // 使用ajax获取文件blob，并保持到本地
        this.spinning = true
        this.downloadLoading = true

        this.getBlob(href).then(blob => {
          saveAs(blob, file.name)
        }).catch((e) => {
          this.$notification.error({
            message: '请求出错',
            description: e
          })
        }).finally(() => {
          this.downloadLoading = false
          this.spinning = false
        })
      }
    },
    /**
     * 获取 blob
     * url 目标文件地址
     */
    getBlob(url) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open('GET', url, true)
        xhr.responseType = 'blob'
        xhr.onload = (e) => {
          if (xhr.status === 200 || String(xhr.status).substring(0, 1) === '2') {
            resolve(xhr.response)
          } else {
            reject(new Error(xhr.response))
          }
        }
        xhr.onerror = (e) => {
          reject(new Error(e))
        }
        xhr.send()
      })
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
        if (res.code === RESPONSE_CODE.S0000) {
          this.handleSelectChange()
        } else {
          this.fileList.pop()
          this.$message.error(`文件上传失败`)
        }
      } else if (info.file.status === 'error') {
        this.$message.error(`文件上传失败`)
      }
    },
    // pdf插件，上一页
    prePage() {
      let page = this.pdfPageNum
      page = page > 1 ? page - 1 : this.pdfTotalNum
      this.pdfPageNum = page
    },
    // pdf插件，下一页
    nextPage() {
      let page = this.pdfPageNum
      page = page < this.pdfTotalNum ? page + 1 : 1
      this.pdfPageNum = page
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-upload-list-item-name {
  cursor: pointer;
}
/deep/ .ant-btn + .ant-btn {
  margin-left: 8px;
}
.text-center {
  text-align: center;
}
.pdf-pagination {
  text-align: center;
  padding-top: 8px;
}
</style>
