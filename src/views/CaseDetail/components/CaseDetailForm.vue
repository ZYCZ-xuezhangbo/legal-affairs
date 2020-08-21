<template>
  <div>
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-row :gutter="gutter">
        <a-col v-bind="span">
          <a-form-model-item label="我方涉案单位" prop="ourUnits">
            <a-select v-model="form.ourUnits" show-search option-filter-prop="children" :filter-option="handleSearchOurUnits" :disabled="!isEdit" placeholder="我方涉案单位">
              <a-select-option value="1">
                单位1
              </a-select-option>
              <a-select-option value="2">
                单位2
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item label="诉讼地位" prop="locusStand">
            <a-select v-model="form.locusStand" :disabled="!isEdit || (isEdit && !!caseInfo.locusStand)" placeholder="诉讼地位">
              <a-select-option v-for="(item,index) in dict.lawsuit" :key="index" :value="item.code">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item label="案由" prop="brief">
            <a-tree-select v-model="form.brief" style="width: 100%" :disabled="!isEdit" :searchValue="briefSearchValue" :dropdown-style="{ maxHeight: '45vh', overflow: 'auto' }" treeDataSimpleMode show-search treeNodeFilterProp="label" :tree-data="briefList" tree-default-expand-all placeholder="案由" @search="handleSearchbriefList">
              <template #suffixIcon>
                <a-icon v-show="briefLoading" type="loading" />
              </template>
            </a-tree-select>
          </a-form-model-item>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item label="案号" prop="caseNo">
            <a-input v-model="form.caseNo" :disabled="!isEdit" placeholder="案号" />
          </a-form-model-item>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item label="成诉时间" prop="lawsuitTime">
            <a-date-picker v-model="form.lawsuitTime" :disabled="!isEdit" inputReadOnly @change="(e,str)=>form.lawsuitTime=str" class="response" />
          </a-form-model-item>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item label="案件种类" prop="caseType">
            <a-select v-model="form.caseType" :disabled="!isEdit" placeholder="案件种类">
              <a-select-option v-for="(item,index) in dict.caseType" :key="index" :value="item.code">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item label="案件所处阶段" prop="caseStage">
            <a-select v-model="form.caseStage" :disabled="!isEdit || (isEdit && !!caseInfo.caseStage)" placeholder="案件所处阶段">
              <a-select-option v-for="(item,index) in dict.caseStage" :key="index" :value="item.code">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item label="重大案件" prop="importantCase">
            <a-select v-model="form.importantCase" :disabled="!isEdit">
              <a-select-option value="1">
                是
              </a-select-option>
              <a-select-option value="0">
                否
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item label="涉案金额（万元）" prop="caseAmount">
            <a-input-number v-model="form.caseAmount" :disabled="!isEdit" :precision="2" :min="0" class="response" />
          </a-form-model-item>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item label="管辖法院" prop="competentCourt">
            <a-input v-model="form.competentCourt" :disabled="!isEdit" placeholder="管辖法院" />
          </a-form-model-item>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item label="主管法官" prop="trialJudge">
            <a-input v-model="form.trialJudge" :disabled="!isEdit" placeholder="主管法官" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <div v-if="isEdit">
            <a @click="handleAddCaseUsers">
              <a-icon type="plus-circle" class="margin-right-sm" />
              添加对方当事人
            </a>
          </div>
          <a-row :gutter="gutter" v-for="(item,index) in form.caseUsers" :key="item.key">
            <a-col v-bind="span">
              <a-form-model-item label="对方当事人" :key="item.key" :prop="`caseUsers.${index}.adversary`" :rules="[{
                required: true,
                message: '必填项',
                trigger: 'blur'
              },{
                validator: validateChineseFn,
                trigger: 'blur'
              }]">
                <a-input v-model="item.adversary" :disabled="!isEdit" placeholder="对方当事人姓名">
                  <template v-if="isEdit" #addonAfter>
                    <a-popconfirm title="确定删除该当事人吗？" ok-text="删除" ok-type="danger" cancel-text="取消" @confirm="handleDelCaseUsers(item)">
                      <a class="text-red">删除</a>
                    </a-popconfirm>
                  </template>
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="对方当事人是否国有企业" :key="item.key" :prop="`caseUsers.${index}.stateOwned`" :rules="{
                required: true,
                message: '必填项',
                trigger: ['blur','change']
              }">
                <a-select v-model="item.stateOwned" :disabled="!isEdit">
                  <a-select-option value="1">
                    是
                  </a-select-option>
                  <a-select-option value="0">
                    否
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="对方当事人是否市管企业" :key="item.key" :prop="`caseUsers.${index}.cityPipe`" :rules="{
                required: true,
                message: '必填项',
                trigger: ['blur','change']
              }">
                <a-select v-model="item.cityPipe" :disabled="!isEdit">
                  <a-select-option value="1">
                    是
                  </a-select-option>
                  <a-select-option value="0">
                    否
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="是否已进行事前协调" prop="adjust">
                <a-select v-model="item.adjust" :disabled="!isEdit">
                  <a-select-option value="1">
                    是
                  </a-select-option>
                  <a-select-option value="0">
                    否
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="24">
          <a-row :gutter="gutter">
            <a-col v-bind="span">
              <a-form-model-item label="律所来源" prop="lawOffice">
                <a-select v-model="form.lawOffice" :disabled="!isEdit" @change="handleLawOfficeChange">
                  <a-select-option value="0">
                    外聘法律顾问备选库
                  </a-select-option>
                  <a-select-option value="1">
                    库外律师（请上传库外律师审批凭证）
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="律所名称" prop="lawOfficeName">
                <template v-if="isKuNei">
                  <!-- 如果是库内，下拉框 -->
                  <a-select v-model="form.lawOfficeName" :disabled="!isEdit" placeholder="律所名称" @change="handleLawOfficeNameChange">
                    <a-select-option v-for="(item,index) in dict.lawFirmList" :key="index" :value="item.code">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </template>
                <template v-else>
                  <!-- 如果是库外，输入框 -->
                  <a-input v-model="form.lawOfficeName" :disabled="!isEdit" placeholder="律所名称" />
                </template>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="律师名称" prop="lawyerName">
                <template v-if="isKuNei">
                  <!-- 如果是库内，下拉框 -->
                  <a-select v-model="form.lawyerName" :disabled="!isEdit" :loading="lawyerListLoading" placeholder="律师名称">
                    <a-select-option v-for="(item,index) in lawyerList" :key="index" :value="item.code">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </template>
                <template v-else>
                  <!-- 如果是库外，输入框 -->
                  <a-input v-model="form.lawyerName" :disabled="!isEdit" placeholder="律师名称" />
                </template>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span" v-if="!isKuNei">
              <a-form-model-item label="上传库外律师审批凭证" prop="layerCertificates" :rules="{
                required: form.lawOffice==='1',
                message: '必填项',
                trigger: ['blur','change']
              }">
                <UploadFile :value="form.layerCertificates" :record="uploadFileRecord" @change="e=>form.layerCertificates=e" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item label="律师电话" prop="lawyerPhone">
            <a-input v-model="form.lawyerPhone" :disabled="!isEdit" placeholder="律师电话" />
          </a-form-model-item>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item label="是否采取风险代理" prop="riskAgency">
            <a-select v-model="form.riskAgency" :disabled="!isEdit">
              <a-select-option value="1">
                是
              </a-select-option>
              <a-select-option value="0">
                否
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item label="委托代理费（元）" prop="entrust">
            <a-input-number v-model="form.entrust" :disabled="!isEdit" :precision="2" :min="0" class="response" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="代理费说明" prop="commissionDesc">
            <a-textarea v-model="form.commissionDesc" :disabled="!isEdit" :auto-size="textAreaAutoSize" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="采取保全措施情况" prop="measure">
            <a-textarea v-model="form.measure" :disabled="!isEdit" :auto-size="textAreaAutoSize" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="财产线索情况" prop="propertyClue">
            <a-textarea v-model="form.propertyClue" :disabled="!isEdit" :auto-size="textAreaAutoSize" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-row :gutter="gutter">
            <a-col :md="24" :lg="14">
              <a-form-model-item label="案件描述" prop="caseDescription">
                <a-textarea v-model="form.caseDescription" :disabled="!isEdit" :auto-size="textAreaAutoSize" />
              </a-form-model-item>
            </a-col>
            <a-col :md="24" :lg="10">
              <a-form-model-item label="案件描述附件" prop="caseAccessory">
                <UploadFile :value="form.caseAccessory" :record="uploadFileRecord" @change="e=>form.caseAccessory=e" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col v-if="form.caseProgressList && form.caseProgressList.length>0" :span="24">
          <a-row :gutter="gutter" v-for="(item,index) in form.caseProgressList" :key="index">
            <a-col :md="24" :lg="14">
              <a-form-model-item label="案件进展" :prop="`caseProgressList.${index}.content`">
                <a-textarea v-model="item.content" :disabled="!isEdit" :auto-size="{ minRows: 10, maxRows: 20}" />
              </a-form-model-item>
            </a-col>
            <a-col :md="24" :lg="10">
              <a-form-model-item label="进展时间" :prop="`caseProgressList.${index}.progressTime`">
                <a-date-picker v-model="item.progressTime" inputReadOnly @change="(e,str)=>form.progressTime=str" class="response" />
              </a-form-model-item>
              <a-form-model-item label="进展状态" :prop="`caseProgressList.${index}.progressStatus`">
                <a-select v-model="item.progressStatus" placeholder="进展状态">
                  <a-select-option v-for="(pItem,pIndex) in caseProStatus" :key="pIndex" :value="pItem.code">
                    {{ pItem.value }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item label="案件描述附件" :prop="`caseProgressList.${index}.resourceUrl`">
                <UploadFile :value="item.resourceUrl" :record="uploadFileRecord" @change="e=>form.resourceUrl=e" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-form-model>
    <div v-if="isEdit" class="text-center">
      <a-button type="primary" :loading="submitLoading" @click="handleSubmit">提交</a-button>
    </div>
  </div>
</template>

<script>
import { getBrief as httpGetBriefList, getCaseDictionaries as httpGetDict, getBriefLabelById as httpGetBriefNameById } from '@/api/case'
import { getLawFirmName as httpGetLawFirmList, getLayerByFirmId as httpGetLayerListByFirmCode } from '@/api/outsideLawManager'
import test from '@/utils/test'
import UploadFile from '@/components/KFormDesign/packages/UploadFile'

const validateLawyerPhoneFn = (rule, value, callback) => {
  if (value === '') {
    callback()
  } else {
    if (test.mobile(value)) callback()
    else callback(new Error('手机号格式不正确'))
  }
}

const validateChineseFn = (rule, value, callback) => {
  if (test.chinese(value)) callback()
  else callback(new Error('必须中文'))
}

const validateRequired = { required: true, message: '必填项', trigger: ['change', 'blur'] }
const validatePhone = { validator: validateLawyerPhoneFn, trigger: 'blur' }

export default {
  components: {
    UploadFile
  },
  props: {
    submitLoading: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: true
    },
    caseInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    caseProStatus: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      gutter: 48,
      span: {
        sm: 24,
        md: 12,
        lg: 8,
        xl: 6
      },
      textAreaAutoSize: {
        minRows: 5,
        maxRows: 15
      },
      dict: {
        caseType: [], // 案件类型
        caseStage: [], // 案件所处阶段
        lawsuit: [], // 诉讼地位
        lawFirmList: [] // 律所列表
      },
      briefTimer: null,
      briefLoading: false, // 案由搜索loading
      briefSearchValue: '', // 案由的搜索框值
      briefList: [], // 案由列表
      lawyerList: [], // 律师名称
      lawyerListLoading: false,
      progressStatus: [], // 进展状态列表
      form: {
        brief: undefined, // 案由
        caseAccessory: [],
        caseAmount: 0, // 涉案金额
        caseDescription: '', // 案件描述
        caseNo: '',
        caseStage: undefined, // 案件所处阶段
        caseType: undefined, // 案件种类
        caseUsers: [{ // 对方当事人
          key: new Date().getTime(),
          adjust: '0',
          adversary: '',
          cityPipe: '0',
          stateOwned: '0'
        }],
        commissionDesc: '',
        competentCourt: '',
        entrust: 0,
        importantCase: '1', // 重大案件
        lammyCompany: '',
        lammyDept: '',
        lawOffice: '0', // 律所来源
        lawOfficeName: undefined, // 律所名称
        lawsuitTime: '', // 成诉时间
        lawyerName: undefined, // 律师名称
        lawyerPhone: '', // 律师电话
        layerCertificates: [],
        locusStand: undefined, // 诉讼地位
        measure: '',
        ourUnits: undefined, // 我方涉案单位
        propertyClue: '',
        riskAgency: '1',
        trialJudge: ''
      },
      rules: {
        ourUnits: [validateRequired],
        locusStand: [validateRequired],
        brief: [validateRequired],
        lawsuitTime: [validateRequired],
        caseType: [validateRequired],
        caseStage: [validateRequired],
        importantCase: [validateRequired],
        caseAmount: [validateRequired],
        lawOfficeName: [validateRequired],
        lawyerName: [
          validateRequired,
          {
            validator: (rule, value, callback) => {
              if (this.isKuNei) { // 库内
                callback()
              } else {
                if (test.chinese(value)) callback()
                else callback(new Error('必须中文'))
              }
            },
            trigger: 'blur'
          }
        ],
        lawyerPhone: [validatePhone],
        caseDescription: [validateRequired]
      },
      validateChineseFn
    }
  },
  watch: {
    caseInfo(val) {
      this.form = val

      if (val !== null && val !== {}) {
        // 案由下拉框，根据id查询name，再根据name模糊查询list
        this.briefLoading = true
        httpGetBriefNameById(this.form.brief).then(res => {
          this.briefLoading = false
          this.handleSearchbriefList(res.data)
        })
      }
    }
  },
  computed: {
    // 律所来源选择的是否为库内
    isKuNei() {
      return this.form.lawOffice === '0'
    },
    uploadFileRecord() {
      return {
        options: {
          downloadWay: 'a',
          limit: 1000,
          fileName: 'file',
          action: this.$uploadFileUrl,
          disabled: !this.isEdit
        }
      }
    }
  },
  methods: {
    /**
    * 涉案单位下拉框模糊查询（本地查询）
    */
    handleSearchOurUnits(input, option) {
      return option.componentOptions.children[0].text.indexOf(input) >= 0
    },
    /**
     * 搜索案由列表
     */
    handleSearchbriefList(keyword) {
      this.briefSearchValue = keyword

      if (keyword !== '') {
        if (this.briefTimer) clearTimeout(this.briefTimer)
        this.briefTimer = setTimeout(() => {
          this.briefLoading = true
          httpGetBriefList(keyword).then(res => {
            const list = res.data.map(v => {
              v.pId = v.pid
              return v
            })
            this.briefList = list
          }).finally(() => {
            this.briefLoading = false
          })
        }, 800)
      }
    },
    /**
     * 添加一条当事人输入框
     */
    handleAddCaseUsers() {
      this.form.caseUsers.push({
        key: new Date().getTime(),
        adjust: '0',
        adversary: '',
        cityPipe: '0',
        stateOwned: '0'
      })
    },
    /**
   * 删除一条当事人输入框
   */
    handleDelCaseUsers(item) {
      if (this.form.caseUsers.length <= 1) {
        this.$warning({
          title: '不可删除',
          content: '“对方当事人”至少填写一项'
        })
        return
      }
      const index = this.form.caseUsers.indexOf(item)
      if (index !== -1) {
        this.form.caseUsers.splice(index, 1)
      }
    },
    handleLawOfficeChange() {
      this.form.lawOfficeName = this.form.lawyerName = ''
      this.form.layerCertificates = []
    },
    handleLawOfficeNameChange(code) {
      this.form.lawyerName = ''
      this.lawyerListLoading = true
      httpGetLayerListByFirmCode(code).then(res => {
        this.lawyerList = res.data
      }).finally(() => {
        this.lawyerListLoading = false
      })
    },
    /**
    * 获取当前页的字典
    */
    getDict() {
      httpGetDict().then(res => {
        this.dict.caseType = res.data.CASETYPE
        this.dict.caseStage = res.data.STAGE
        this.dict.lawsuit = res.data.LAWSUIT
      })
      httpGetLawFirmList().then(res => {
        this.dict.lawFirmList = res.data
      })
    },
    handleSubmit() {
      this.$refs.form.validate().then(() => {
        this.$emit('submit', this.form)
      }).catch((e) => {
        this.$message.warning(this.$t('message.form.validate.fail'))
      })
    }
  },
  mounted() {
    this.getDict()
  }
}
</script>

<style lang="less" scoped>
</style>
