<template>
  <a-modal v-bind="editModal" :title="dialogTitle" :visible="show" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel" :width="dialogWidth">
    <template #footer>
      <button-cancel @click="handleCancel" />
      <button-confirm :show="act!==ACTIONS.Detail" :loading="confirmLoading" @click="handleOk" />
    </template>
    <a-skeleton v-show="pageLoading" active />
    <div v-show="!pageLoading">
      <a-form-model ref="form" :rules="rules" :model="form">
        <a-row :gutter="gutter">
          <a-col v-bind="span">
            <a-form-model-item label="律所名称" prop="lawFirmName">
              <a-input v-model="form.lawFirmName" :disabled="disabled" placeholder="请输入" />
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="地址" prop="address">
              <a-input v-model="form.address" :disabled="disabled" placeholder="请输入" />
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="联系人" prop="linkman">
              <a-input v-model="form.linkman" :disabled="disabled" placeholder="请输入" />
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="联系电话" prop="phone">
              <a-input v-model="form.phone" :disabled="disabled" placeholder="请输入" class="response" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="律所简介" prop="lawFirmDesc">
              <a-textarea placeholder="律所简介" :disabled="disabled" v-model="form.lawFirmDesc" :auto-size="{ minRows: 5, maxRows: 15 }" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="展示图片" prop="photographs">
              <img-upload :record="imgRecord" :value="form.photographs" @change="e=>form.photographs=e" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="展示视频" prop="videos">
              <video class="video" v-if="ACTIONS.Detail===act && form.videos[0]" id="video" :src="form.videos[0].url" controls></video>
              <file-upload v-else :record="videoRecord" :value="form.videos" @change="e=>form.videos=e" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="附件" prop="resourceUrl">
              <file-upload :record="fileRecord" :value="form.resourceUrl" @change="e=>form.resourceUrl=e" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
  </a-modal>
</template>

<script>
import dialogEditMixin from '@/mixin/dialogEdit-mixin'
import { ACTIONS } from '@/store/mutation-types'
import { required as validateRequired, max30Str as validateMax30Str } from '@/utils/formValidate'
import ImgUpload from '@/components/KFormDesign/packages/UploadImg'
import FileUpload from '@/components/KFormDesign/packages/UploadFile'

let video = null

export default {
  mixins: [dialogEditMixin],
  props: {
    lawFirmList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    ImgUpload,
    FileUpload
  },
  watch: {
    show(newVal, oldVal) {
      this.$nextTick(() => this.$refs.form.resetFields())

      if (newVal && [ACTIONS.Edit, ACTIONS.Detail].includes(this.act)) {
        this.getDetail()
      }
      if (!video && !newVal) video = document.getElementById('video')
      if (this.form.videos[0]) video.pause()
    }
  },
  computed: {
    imgRecord() {
      return {
        options: {
          limit: 3,
          listType: 'picture-card',
          disabled: this.disabled
        }
      }
    },
    videoRecord() {
      return {
        options: {
          limit: 1,
          disabled: this.disabled
        }
      }
    },
    fileRecord() {
      return {
        options: {
          limit: 1000,
          disabled: this.disabled
        }
      }
    },
    disabled() {
      return this.act === ACTIONS.Detail && this.id !== ''
    }
  },
  data() {
    return {
      ACTIONS,
      form: {
        address: '',
        lammyCompany: '',
        lammyDept: '',
        lawFirmDesc: '',
        lawFirmName: '',
        linkman: '',
        phone: '',
        photographs: [],
        resourceUrl: [],
        videos: []
      },
      rules: {
        lawFirmName: [validateRequired, validateMax30Str],
        address: [validateRequired],
        linkman: [validateRequired, validateMax30Str],
        lawFirmDesc: [validateRequired],
        phone: [validateRequired]
      }
    }
  },
  methods: { }
}
</script>

<style>
.video {
  max-width: 50%;
  border-radius: 5px;
  overflow: hidden;
}
</style>
