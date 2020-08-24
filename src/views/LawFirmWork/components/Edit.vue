<template>
  <div>
    <a-modal v-bind="editModal" :title="modalTitle" :visible="show" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel" :width="1000">
      <template #footer>
        <a-button @click="handleCancel">取消</a-button>
        <a-button v-if="act!==ACTIONS.Detail" type="primary" :loading="confirmLoading" @click="handleOk">确定</a-button>
      </template>
      <a-skeleton v-show="pageLoading" active />
      <div v-show="!pageLoading">
        <a-form-model ref="form" :model="form">
          <a-row :gutter="gutter">
            <a-col v-bind="span">
              <a-form-model-item label="律师来源" prop="lawSource">
                <a-select v-model="form.lawSource" :disabled="disabled || isRate" @change="handleLawSourceChange">
                  <a-select-option value="0">
                    库内法律顾问
                  </a-select-option>
                  <a-select-option value="1">
                    库外法律顾问
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="律所名称" prop="lawFirmName">
                <a-select v-show="isKuNei" v-model="form.lawFirmName" :disabled="disabled || isRate" @change="handleLawFirmChange">
                  <a-select-option v-for="(item,index) in lawFirmList" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
                <a-input v-show="!isKuNei" v-model="form.lawFirmName" :disabled="disabled || isRate" placeholder="律所名称" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="律师姓名" prop="lawName">
                <a-select v-show="isKuNei" v-model="form.lawName" :disabled="disabled || isRate" :loading="layerLoading">
                  <a-select-option v-for="(item,index) in layerList" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
                <a-input v-show="!isKuNei" v-model="form.lawName" :disabled="disabled || isRate" placeholder="律师姓名" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="服务类型" prop="serviceType">
                <a-select v-model="form.serviceType" :disabled="disabled || isRate">
                  <a-select-option v-for="(item,index) in dict.LAYERTYPE" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="服务开始时间" prop="serviceTimeStart">
                <a-date-picker v-model="form.serviceTimeStart" :disabled="disabled || isRate" inputReadOnly @change="(e,str)=>form.serviceTimeStart=str" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="服务结束时间" prop="major">
                <a-date-picker v-model="form.serviceTimeEnd" :disabled="disabled || isRate" inputReadOnly @change="(e,str)=>form.serviceTimeEnd=str" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="服务费用（请上传费用凭证）" prop="serviceCharge">
                <a-input-number v-model="form.serviceCharge" :disabled="disabled || isRate" placeholder="请输入" class="response" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="费用说明" prop="chargeDesc">
                <a-textarea placeholder="费用说明" :disabled="disabled || isRate" v-model="form.chargeDesc" :auto-size="{ minRows: 5, maxRows: 10 }" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="服务事项" prop="serviceMatter">
                <a-textarea placeholder="服务事项" :disabled="disabled || isRate" v-model="form.serviceMatter" :auto-size="{ minRows: 5, maxRows: 10 }" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="附件">
                <FileUpload :record="fileRecord" :value="form.resourceUrl" @change="e=>form.resourceUrl=e" />
              </a-form-model-item>
            </a-col>
            <a-col v-if="act===ACTIONS.Rate||act===ACTIONS.Detail" :span="24">
              <a-form-model-item label="评价">
                <a-table :columns="columns" :data-source="form.scoreList" :pagination="false" :rowKey="e=>e.id">
                  <template #desc="item">
                    {{ item.description }}
                    <span class="text-gray padding-left-sm">({{ item.score }}分)</span>
                  </template>
                  <template #score="item">
                    <a-rate :value="item.score" :disabled="act===ACTIONS.Detail" @change="handleRateChange($event,item)" />
                  </template>
                </a-table>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { ACTIONS } from '@/store/mutation-types'
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
    },
    dict: {
      type: Object,
      default() {
        return {
          LAYERTYPE: []
        }
      }
    }
  },
  components: {
    ImgUpload,
    FileUpload
  },
  watch: {
    show(newVal) {
      if (newVal && [ACTIONS.Detail, ACTIONS.Edit, ACTIONS.Rate].includes(this.act)) {
        this.getDetail()
      } else if (newVal && this.act === ACTIONS.Add) {
        this.$nextTick(() => {
          this.form = {}
        })
      }
    }
  },
  data() {
    return {
      ACTIONS,
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
        lawSource: '0',
        resourceUrl: [],
        serviceCharge: 0,
        serviceMatter: '',
        serviceTimeEnd: '',
        serviceTimeStart: '',
        serviceType: '',
        scoreList: []
      },
      layerLoading: false,
      layerList: [], // 律师列表
      pageLoading: false,
      confirmLoading: false,
      columns: [
        {
          title: '描述',
          key: 'title',
          scopedSlots: { customRender: 'desc' }
        },
        {
          title: '评分',
          align: 'right',
          key: 'score',
          scopedSlots: { customRender: 'score' }
        }
      ],
      API: require(`@/api/${this.api}`)
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
          disabled: this.disabled || this.act === ACTIONS.Rate
        }
      }
    },
    modalTitle() {
      let title = ''
      if (this.act === ACTIONS.Edit) {
        title = '修改'
      } else if (this.act === ACTIONS.Detail) {
        title = '查看'
      } else if (this.act === ACTIONS.Add) {
        title = '新增'
      }
      return title
    },
    disabled() {
      return this.act === ACTIONS.Detail && this.id !== ''
    },
    isKuNei() {
      return this.form.lawSource === '0'
    },
    isRate() {
      return this.act === ACTIONS.Rate
    }
  },
  methods: {
    handleOk() {
      this.$refs.form.validate().then(formData => {
        this.confirmLoading = true

        if ([ACTIONS.Edit, ACTIONS.Rate].includes(this.act)) { // 修改/评分
          const isUpdate = this.act === ACTIONS.Edit ? '1' : '0'

          this.API.update({ id: this.id, isUpdate, ...this.form }).then(res => {
            this.requestSuccess()
          }).finally(() => {
            this.confirmLoading = false
          })
        } else if (this.act === ACTIONS.Add) { // 新增
          this.API.create(this.form).then(res => {
            this.requestSuccess()
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
      this.layerLoading = true

      httpGetLayerListByFirmId(code).then(res => {
        this.layerList = res.data
      }).finally(() => {
        this.layerLoading = false
      })
    },
    handleLawFirmChange(code) {
      this.form.lawName = ''
      this.getLayerListByFirmId(code)
    },
    requestSuccess() {
      this.$emit('success')
      this.$emit('close')
      this.$refs.form.resetFields()
    },
    handleLawSourceChange() {
      this.form.lawFirmName = ''
      this.form.lawName = ''
    },
    handleRateChange(e, item) {
      this.form.scoreList[this.form.scoreList.findIndex(v => v.id === item.id)].score = e
    }
  }
}
</script>

<style>
</style>
