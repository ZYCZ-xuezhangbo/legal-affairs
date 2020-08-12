<template>
  <div>
    <a-modal v-bind="editModal" :title="isEdit?'编辑':'新建'" :visible="show" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel" :width="1000">
      <a-form-model ref="form" :model="form">
        <a-row :gutter="gutter">
          <a-col v-bind="span">
            <a-form-model-item label="头像" prop="portrait">
              <ImgUpload :record="record" @change="handleChange" />
              <!-- <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" list-type="picture-card" :file-list="form.portrait" @change="handlePortraitChange" @preview="handlePreview">
                <div v-if="form.portrait.length <= 1">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">上传</div>
                </div>
              </a-upload>
              <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible=false">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal> -->
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import ImgUpload from '@/components/KFormDesign/packages/UploadImg'

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
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
    ImgUpload
  },
  watch: {
    show(newVal, oldVal) {
      if (newVal && this.isEdit) {
        this.getDetail()
      } else if (newVal && !this.isEdit) {
        this.$nextTick(() => {
          console.log('// TODO reset data')
        })
      }
    }
  },
  computed: {
    editModal() {
      if (this.confirmLoading) {
        return {
          closable: false,
          keyboard: false,
          maskClosable: false
        }
      }
      return ''
    }
  },
  data() {
    return {
      gutter: 48,
      span: {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 6
      },
      record: {
        key: new Date().getTime(),
        label: '上传',
        model: 'upload',
        options: {
          action: 'http://cdn.kcz66.com/upload-img.txt',
          fileName: 'image',
          limit: 1,
          listType: 'picture-card',
          multiple: false,
          placeholder: '上传',
          width: '100%'
        }
      },
      previewVisible: false,
      previewImage: [],
      form: {
        portrait: []
      },
      confirmLoading: false,
      API: require(`@/api/${this.api}`)
    }
  },
  methods: {
    handleOk() {
      this.$refs.form.getData().then(formData => {
        this.confirmLoading = true
        if (this.isEdit) { // 修改
          this.API.update({ id: this.id, ...formData }).then(res => {
            this.requestSuccess(res.msg)
          }).finally(() => {
            this.confirmLoading = false
          })
        } else { // 新增
          this.API.create(formData).then(res => {
            this.requestSuccess(res.msg)
          }).finally(() => {
            this.confirmLoading = false
          })
        }
      })
    },
    getDetail() {
      const pageLoading = this.$message.loading(this.$t('messageLoadingText'), 0)
      this.API.getById(this.id).then(res => {
        // this.$refs.form.setData(res.data).catch(e => console.log(e))
      }).finally(() => {
        setTimeout(pageLoading, 0)
      })
    },
    handleCancel() {
      this.$emit('close')
      this.pageLoading = false
    },
    requestSuccess(msg) {
      this.$message.success(msg)
      this.$emit('success')
      this.$emit('close')
      // this.$refs.form.reset()
    },
    handleChange(e) {
      console.log(e)
    }
  }
}
</script>

<style>
</style>
