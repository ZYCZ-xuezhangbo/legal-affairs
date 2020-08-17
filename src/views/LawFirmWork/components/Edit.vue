<template>
  <div>
    <a-modal v-bind="editModal" :title="modalTitle" :visible="show" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel" :width="1000">
      <a-skeleton v-show="pageLoading" active />
      <div v-show="!pageLoading">
        <a-form-model ref="form" :model="form">
          <a-row :gutter="gutter">
            <a-col v-bind="span">
              <a-form-model-item label="律师来源" prop="lawSource">
                <a-select v-model="form.lawSource" :disabled="disabled">
                  <a-select-option value="0">
                    库内
                  </a-select-option>
                  <a-select-option value="1">
                    库外
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="律所名称" prop="lawFirmName">
                <a-select v-model="form.lawFirmName" :disabled="disabled" @change="handleLawFirmChange">
                  <a-select-option v-for="(item,index) in lawFirmList" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="律师姓名" prop="lawName">
                <a-select v-model="form.lawName" :disabled="disabled" :loading="layerLoading">
                  <a-select-option v-for="(item,index) in layerList" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="服务类型" prop="serviceType">
                <a-input v-model="form.serviceType" :disabled="disabled" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="服务开始时间" prop="serviceTimeStart">
                <a-date-picker v-model="form.serviceTimeStart" :disabled="disabled" inputReadOnly @change="(e,str)=>form.serviceTimeStart=str" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="服务结束时间" prop="major">
                <a-date-picker v-model="form.serviceTimeEnd" :disabled="disabled" inputReadOnly @change="(e,str)=>form.serviceTimeEnd=str" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="服务费用（请上传费用凭证）" prop="serviceCharge">
                <a-input-number v-model="form.serviceCharge" :disabled="disabled" placeholder="请输入" class="response" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="费用说明" prop="chargeDesc">
                <a-textarea placeholder="费用说明" :disabled="disabled" v-model="form.chargeDesc" :auto-size="{ minRows: 5, maxRows: 10 }" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="服务事项" prop="serviceMatter">
                <a-textarea placeholder="服务事项" :disabled="disabled" v-model="form.serviceMatter" :auto-size="{ minRows: 5, maxRows: 10 }" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="附件">
                <FileUpload :record="fileRecord" :value="form.resourceUrl" @change="e=>form.resourceUrl=e" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { getLayerByFirmId as httpGetLayerListByFirmId } from '@/api/outsideLawManager'
import ImgUpload from '@/components/KFormDesign/packages/UploadImg'
import FileUpload from '@/components/KFormDesign/packages/UploadFile'

export default {
  props: {
    act: {
      type: String,
      default: ''
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
    },
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
      if (newVal && ['edit', 'detail'].includes(this.act)) {
        this.getDetail()
      } else if (newVal && this.act === 'add') {
        this.$nextTick(() => {
          this.form = {}
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
    },
    fileRecord() {
      return {
        options: {
          defaultValue: [],
          downloadWay: 'a',
          width: '100%',
          limit: 1000,
          fileName: 'file',
          action: this.$uploadFileUrl,
          disabled: this.disabled
        }
      }
    },
    modalTitle() {
      let title = ''
      if (this.act === 'edit') {
        title = '修改'
      } else if (this.act === 'detail') {
        title = '查看'
      } else if (this.act === 'add') {
        title = '新增'
      }
      return title
    },
    disabled() {
      return this.act === 'detail' && this.id !== ''
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
      form: {
        chargeDesc: '',
        fillUnit: '',
        informant: '',
        lammyCompany: '',
        lammyDept: '',
        lawFirmName: '',
        lawName: '',
        lawSource: '',
        resourceUrl: [],
        serviceCharge: 0,
        serviceMatter: '',
        serviceTimeEnd: '',
        serviceTimeStart: '',
        serviceType: ''
      },
      layerLoading: false,
      layerList: [], // 律师列表
      pageLoading: false,
      confirmLoading: false,
      API: require(`@/api/${this.api}`)
    }
  },
  methods: {
    handleOk() {
      this.$refs.form.validate().then(formData => {
        this.confirmLoading = true
        if (this.act === 'edit') { // 修改
          this.API.update({ id: this.id, ...this.form }).then(res => {
            this.requestSuccess(res.msg)
          }).finally(() => {
            this.confirmLoading = false
          })
        } else { // 新增
          this.API.create(this.form).then(res => {
            this.requestSuccess(res.msg)
          }).finally(() => {
            this.confirmLoading = false
          })
        }
      })
    },
    getDetail() {
      this.pageLoading = true
      this.API.getById(this.id).then(res => {
        this.form = res.data
        this.getLayerListByFirmId(res.data.lawFirmName)
      }).finally(() => {
        this.pageLoading = false
      })
    },
    handleCancel() {
      this.$emit('close')
      this.pageLoading = false
    },
    getLayerListByFirmId(code) {
      httpGetLayerListByFirmId(code).then(res => {
        this.layerList = res.data
      }).finally(() => {
        this.layerLoading = false
      })
    },
    handleLawFirmChange(code) {
      this.layerLoading = true
      this.form.lawName = ''
      this.getLayerListByFirmId(code)
    },
    requestSuccess(msg) {
      this.$message.success(msg)
      this.$emit('success')
      this.$emit('close')
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style>
</style>
