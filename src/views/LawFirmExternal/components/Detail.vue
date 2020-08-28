<template>
  <div>
    <a-modal title="查看" :visible="show" @cancel="handleCancel" :width="1000">
      <template #footer>
        <a-button @click="handleCancel">取消</a-button>
      </template>
      <a-skeleton v-if="pageLoading" active />
      <template v-else>
        <a-descriptions :bordered="false">
          <a-descriptions-item label="律所名称">
            {{ data.lawFirmName }}
          </a-descriptions-item>
          <a-descriptions-item label="地址">
            {{ data.address }}
          </a-descriptions-item>
          <a-descriptions-item label="联系人">
            {{ data.linkman }}
          </a-descriptions-item>
          <a-descriptions-item label="联系电话" :span="3">
            {{ data.phone }}
          </a-descriptions-item>
          <a-descriptions-item label="律所简介" :span="3">
            {{ data.lawFirmDesc }}
          </a-descriptions-item>
          <a-descriptions-item label="展示视频" :span="3">
            <video class="my-video" v-for="(item,index) in data.videos" :key="index" controls>
              <source :src="item.url" type="video/mp4">
            </video>
          </a-descriptions-item>
          <a-descriptions-item label="展示图片" :span="3">
            <UploadImg :record="photographsRecord" :value="data.photographs" />
          </a-descriptions-item>
          <a-descriptions-item label="附件" :span="3">
            <UploadFile :record="resourceUrlRecord" :value="data.resourceUrl" />
          </a-descriptions-item>
        </a-descriptions>
      </template>
    </a-modal>
  </div>
</template>

<script>
import UploadImg from '@/components/KFormDesign/packages/UploadImg'
import UploadFile from '@/components/KFormDesign/packages/UploadFile'

export default {
  props: {
    id: {
      type: [String, Number],
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    api: {
      type: String,
      default: ''
    }
  },
  components: {
    UploadImg,
    UploadFile
  },
  watch: {
    show(newVal, oldVal) {
      if (newVal) {
        this.getDetail()
      }
    }
  },
  data() {
    return {
      data: {},
      photographsRecord: {
        options: {
          disabled: true,
          listType: 'picture-card'
        }
      },
      resourceUrlRecord: {
        options: {
          disabled: true
        }
      },
      pageLoading: false,
      API: require(`@/api/${this.api}`)
    }
  },
  methods: {
    getDetail() {
      this.pageLoading = true
      this.API.getById(this.id).then(res => {
        this.data = res.data
      }).finally(() => {
        this.pageLoading = false
      })
    },
    handleCancel() {
      this.data = {}
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.my-video {
  max-width: 100%;
  max-height: 300px;
}
</style>
