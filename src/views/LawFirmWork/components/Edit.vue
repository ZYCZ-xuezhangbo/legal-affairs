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
            <a-form-model-item label="公司" prop="lammyCompany">
              <a-select v-model="form.lammyCompany" :disabled="disabled || isRate">
                <a-select-option v-for="(item,index) in dict.COMPANY" :key="index" :value="item.code">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
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
              <template v-if="isKuNei">
                <!-- 如果是库内，下拉框 -->
                <a-select v-model="form.lawName" :disabled="disabled || isRate" :loading="layerLoading" placeholder="律师姓名">
                  <a-select-option v-for="(item,index) in layerList" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </template>
              <template v-else>
                <!-- 如果是库外，输入框 -->
                <a-input v-model="form.lawName" :disabled="disabled || isRate" placeholder="律师名称" />
              </template>
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
            <a-form-model-item label="服务时间" prop="serviceTime">
              <a-range-picker :value="form.serviceTime" :disabled="disabled || isRate" :allow-clear="false" input-read-only @change="handleServiceTimeChange" />
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="服务费用(元)" prop="serviceCharge">
              <template #help> 请上传费用凭证 </template>
              <a-input-number v-model="form.serviceCharge" :disabled="disabled || isRate" :min="0" :precision="2" placeholder="请输入" class="response" />
            </a-form-model-item>
          </a-col>
          <a-col v-if="!isKuNei" v-bind="span">
            <a-form-model-item label="库外律师审批凭证" prop="certificate">
              <FileUpload :record="fileRecord" :value="form.certificate" @change="e=>form.certificate=e" />
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
            <a-form-model-item label="附件" prop="resourceUrl">
              <FileUpload :record="fileRecord" :value="form.resourceUrl" @change="e=>form.resourceUrl=e" />
            </a-form-model-item>
          </a-col>
          <a-col v-if="act===ACTIONS.Rate||act===ACTIONS.Detail" :span="24">
            <a-form-model-item label="评价">
              <a-table :columns="columns" :data-source="form.scoreList" :pagination="false" :rowKey="e=>e.id">
                <template #desc="item">
                  {{ item.description }}
                  <span class="text-gray padding-left-sm">({{ item.score * scoreScale }}分)</span>
                </template>
                <template #score="item">
                  <a-rate :value="item.score" :allowClear="false" :disabled="act===ACTIONS.Detail" @change="handleRateChange($event,item)" />
                </template>
              </a-table>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
  </a-modal>
</template>

<script>
import deepClone from '@/utils/deepClone'
import { ACTIONS } from '@/store/mutation-types'
import dialogEditMixin from '@/mixin/dialogEdit-mixin'
import ImgUpload from '@/components/KFormDesign/packages/UploadImg'
import FileUpload from '@/components/KFormDesign/packages/UploadFile'
import { getLayerByFirmId as httpGetLayerListByFirmId } from '@/api/outsideLawManager'
import { required as validateRequired, money as validateMoney, max20Num } from '@/utils/formValidate'

export default {
  mixins: [dialogEditMixin],
  props: {
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
  data() {
    return {
      ACTIONS,
      scoreScale: 5,
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
        certificate: [],
        serviceCharge: 0,
        serviceMatter: '',
        serviceTime: [],
        serviceTimeEnd: '',
        serviceTimeStart: '',
        serviceType: '',
        scoreList: []
      },
      rules: {
        chargeDesc: [validateRequired],
        fillUnit: [validateRequired],
        informant: [validateRequired],
        lammyCompany: [validateRequired],
        lammyDept: [validateRequired],
        lawFirmName: [validateRequired],
        lawName: [validateRequired],
        lawSource: [validateRequired],
        serviceCharge: [validateRequired, validateMoney, max20Num],
        serviceMatter: [validateRequired],
        serviceTime: [validateRequired],
        serviceType: [validateRequired],
        scoreList: [validateRequired]
      },
      layerLoading: false,
      layerList: [] // 律师列表
    }
  },
  computed: {
    columns() {
      // 每颗星代表5分
      const sum = this.form.scoreList.reduce((total, cur) => total + cur.score, 0) * this.scoreScale
      return [
        {
          title: '描述',
          key: 'title',
          scopedSlots: { customRender: 'desc' }
        },
        {
          title: `当前总分:${sum}`,
          align: 'right',
          key: 'score',
          scopedSlots: { customRender: 'score' }
        }
      ]
    },
    fileRecord() {
      return {
        options: {
          limit: 1000,
          disabled: this.disabled || this.act === ACTIONS.Rate
        }
      }
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
        const form = deepClone(this.form)

        // 分数需要乘5再保存
        const scoreList = form.scoreList.map(v => {
          v.score = v.score * this.scoreScale
          return v
        })
        form.scoreList = scoreList
        if (this.isKuNei) delete form.certificate

        let api = null
        const params = {}
        if ([ACTIONS.Edit, ACTIONS.Rate].includes(this.act)) { // 修改/评分
          api = this.API.update
          params.isUpdate = this.act === ACTIONS.Edit ? '1' : '0'
          params.id = this.id
        } else if (this.act === ACTIONS.Add) { // 新增
          api = this.API.create
        }
        if (api) {
          api({ ...params, ...form }).then(res => {
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
        // 分数需要除5再赋值
        const scoreList = res.data.scoreList.map(v => {
          if (v.score > 0) v.score = v.score / this.scoreScale
          return v
        })
        res.data.scoreList = scoreList
        this.form = res.data
        this.form.serviceTime = [res.data.serviceTimeStart, res.data.serviceTimeEnd]
        this.getLayerListByFirmId(res.data.lawFirmName)
      }).finally(() => {
        this.pageLoading = false
      })
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
    handleLawSourceChange() {
      this.form.lawFirmName = ''
      this.form.lawName = ''
    },
    handleRateChange(e, item) {
      this.form.scoreList[this.form.scoreList.findIndex(v => v.id === item.id)].score = e
    },
    handleServiceTimeChange(e, str) {
      this.form.serviceTime = e
      this.form.serviceTimeStart = str[0]
      this.form.serviceTimeEnd = str[1]
    }
  }
}
</script>

<style>
</style>
