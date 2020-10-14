<template>
  <div>
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-row :gutter="gutter">
        <a-col v-bind="span">
          <a-form-model-item label="我方涉案单位" prop="ourUnits">
            <a-select v-model="form.ourUnits" show-search option-filter-prop="children" :filter-option="handleSearchOurUnits" :disabled="disabled" placeholder="我方涉案单位">
              <a-select-option v-for="(item,index) in dict.ourUnits" :key="index" :value="item.code">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item label="诉讼地位" prop="locusStand">
            <a-select v-model="form.locusStand" :disabled="disabled || (!disabled && !!caseInfo.locusStand)" placeholder="诉讼地位">
              <a-select-option v-for="(item,index) in dict.lawsuit" :key="index" :value="item.code">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item label="案由" prop="brief">
            <a-tree-select v-model="form.brief" style="width: 100%" :disabled="disabled" :searchValue="briefSearchValue" :dropdown-style="{ maxHeight: '45vh', overflow: 'auto' }" tree-data-simple-mode show-search tree-node-filter-prop="label" :tree-data="briefList" tree-default-expand-all placeholder="案由" @search="handleSearchbriefList" @change="handleBriefChange">
              <template #suffixIcon>
                <a-icon v-show="briefLoading" type="loading" />
              </template>
            </a-tree-select>
          </a-form-model-item>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item label="案号" prop="caseNo">
            <a-input v-model="form.caseNo" :disabled="disabled" placeholder="案号" />
          </a-form-model-item>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item label="成诉时间" prop="lawsuitTime">
            <a-date-picker v-model="form.lawsuitTime" :disabled="disabled" :disabled-date="disabledDate" inputReadOnly @change="(e,str)=>form.lawsuitTime=str" class="response" />
          </a-form-model-item>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item label="案件种类" prop="caseType">
            <a-select v-model="form.caseType" :disabled="disabled" placeholder="案件种类">
              <a-select-option v-for="(item,index) in dict.caseType" :key="index" :value="item.code">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item label="案件所处阶段" prop="caseStage">
            <a-select v-model="form.caseStage" :disabled="disabled || (!disabled && !!caseInfo.caseStage)" placeholder="案件所处阶段">
              <a-select-option v-for="(item,index) in dict.caseStage" :key="index" :value="item.code">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item label="重大案件" prop="importantCase">
            <a-select v-model="form.importantCase" :disabled="disabled">
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
            <a-input-number v-model="form.caseAmount" :disabled="disabled" :precision="2" :min="0" class="response" />
          </a-form-model-item>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item :label="courtName" prop="competentCourt">
            <a-input v-model="form.competentCourt" :disabled="disabled" :placeholder="courtName" />
          </a-form-model-item>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item :label="judgeName" prop="trialJudge">
            <a-input v-model="form.trialJudge" :disabled="disabled" :placeholder="judgeName" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <div v-if="isEdit || isAdd">
            <a @click="handleAddCaseUsers">
              <a-icon type="plus-circle" class="margin-right-sm" />
              添加对方当事人
            </a>
          </div>
          <a-row :gutter="gutter" v-for="(item,index) in form.caseUsers" :key="item.key">
            <a-col v-bind="span">
              <a-form-model-item label="对方当事人" :key="item.key" :prop="`caseUsers.${index}.adversary`" :rules="[validateRequired, max30Str]">
                <a-input v-model="item.adversary" :disabled="disabled" placeholder="对方当事人">
                  <template v-if="isEdit || isAdd" #addonAfter>
                    <a-popconfirm title="确定删除该当事人吗？" ok-text="删除" ok-type="danger" cancel-text="取消" @confirm="handleDelCaseUsers(item)">
                      <a class="text-red">删除</a>
                    </a-popconfirm>
                  </template>
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="对方当事人是否国有企业" :key="item.key" :prop="`caseUsers.${index}.stateOwned`" :rules="validateRequired">
                <a-select v-model="item.stateOwned" :disabled="disabled">
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
              <a-form-model-item label="对方当事人是否市管企业" :key="item.key" :prop="`caseUsers.${index}.cityPipe`" :rules="validateRequired">
                <a-select v-model="item.cityPipe" :disabled="disabled">
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
              <a-form-model-item v-if="form.caseUsers[index].cityPipe==='1'" label="是否已进行事前协调" prop="adjust">
                <a-select v-model="item.adjust" :disabled="disabled">
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
                <a-select v-model="form.lawOffice" :disabled="disabled" @change="handleLawOfficeChange">
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
                  <a-select v-model="form.lawOfficeName" :disabled="disabled" placeholder="律所名称" @change="handleLawOfficeNameChange">
                    <a-select-option v-for="(item,index) in dict.lawFirmList" :key="index" :value="item.code">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </template>
                <template v-else>
                  <!-- 如果是库外，输入框 -->
                  <a-input v-model="form.lawOfficeName" :disabled="disabled" placeholder="律所名称" />
                </template>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="律师名称" prop="lawyerName">
                <template v-if="isKuNei">
                  <!-- 如果是库内，下拉框 -->
                  <a-select v-model="form.lawyerName" :disabled="disabled" :loading="lawyerListLoading" placeholder="律师名称">
                    <a-select-option v-for="(item,index) in lawyerList" :key="index" :value="item.code">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </template>
                <template v-else>
                  <!-- 如果是库外，输入框 -->
                  <a-input v-model="form.lawyerName" :disabled="disabled" placeholder="律师名称" />
                </template>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span" v-if="!isKuNei">
              <a-form-model-item label="上传库外律师审批凭证" prop="layerCertificates">
                <UploadFile :value="form.layerCertificates" :record="uploadFileRecord" @change="e=>form.layerCertificates=e" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item label="律师电话" prop="lawyerPhone">
            <a-input v-model="form.lawyerPhone" :disabled="disabled" placeholder="律师电话" />
          </a-form-model-item>
        </a-col>
        <a-col v-bind="span">
          <a-form-model-item label="是否采取风险代理" prop="riskAgency">
            <a-select v-model="form.riskAgency" :disabled="disabled">
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
            <a-input-number v-model="form.entrust" :disabled="disabled" :precision="2" :min="0" class="response" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="代理费说明" prop="commissionDesc">
            <a-textarea v-model="form.commissionDesc" :disabled="disabled" :auto-size="textAreaAutoSize" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="采取保全措施情况" prop="measure">
            <a-textarea v-model="form.measure" :disabled="disabled" :auto-size="textAreaAutoSize" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="财产线索情况" prop="propertyClue">
            <a-textarea v-model="form.propertyClue" :disabled="disabled" :auto-size="textAreaAutoSize" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-row :gutter="gutter">
            <a-col :md="24" :lg="14">
              <a-form-model-item label="案件描述" prop="caseDescription">
                <a-textarea v-model="form.caseDescription" :disabled="disabled" :auto-size="textAreaAutoSize" />
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
            <a-divider dashed />
            <a-col :md="24" :lg="14">
              <a-form-model-item label="案件进展" :prop="`caseProgressList.${index}.content`">
                <a-textarea v-model="item.content" :disabled="disabled" :auto-size="{ minRows: 10, maxRows: 20}" />
              </a-form-model-item>
            </a-col>
            <a-col :md="24" :lg="10">
              <a-form-model-item label="进展时间" :prop="`caseProgressList.${index}.progressTime`">
                <a-date-picker v-model="item.progressTime" :disabled="disabled" inputReadOnly @change="(e,str)=>item.progressTime=str" class="response" />
              </a-form-model-item>
              <a-form-model-item label="进展状态" :prop="`caseProgressList.${index}.progressStatus`">
                <a-select v-model="item.progressStatus" :disabled="disabled" placeholder="进展状态">
                  <a-select-option v-for="(pItem,pIndex) in caseProStatus" :key="pIndex" :value="pItem.value">
                    {{ pItem.value }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item label="进展附件" :prop="`caseProgressList.${index}.resourceUrl`">
                <UploadFile :value="item.resourceUrl" :record="uploadFileRecord" @change="e=>item.resourceUrl=e" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="24" v-if="isEdit || !!form.legalOpinion">
          <a-divider dashed />
          <a-row :gutter="gutter">
            <a-col :md="24" :lg="14">
              <a-form-model-item label="法务意见" prop="legalOpinion">
                <a-textarea v-model="form.legalOpinion" :disabled="disabled" :auto-size="textAreaAutoSize" />
              </a-form-model-item>
            </a-col>
            <a-col :md="24" :lg="10">
              <a-form-model-item label="法务意见附件" prop="legalOpinionFile">
                <UploadFile :value="form.legalOpinionFile" :record="uploadFileRecord" @change="e=>form.legalOpinionFile=e" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-form-model>
    <div v-if="isEdit||isAdd" class="text-center">
      <a-button type="primary" :loading="submitLoading" @click="handleSubmit">提交</a-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { ACTIONS, CASE_STAGE } from '@/store/mutation-types'
import { required as validateRequired, phone as validatePhone, max30Str, max20Num, money as validateMoney } from '@/utils/formValidate'
import { getBrief as httpGetBriefList, getCaseDictionaries as httpGetDict, getBriefLabelById as httpGetBriefNameById } from '@/api/case'
import { getLawFirmName as httpGetLawFirmList, getLayerByFirmId as httpGetLayerListByFirmCode } from '@/api/outsideLawManager'
import UploadFile from '@/components/KFormDesign/packages/UploadFile'

const validatePhoneMoney = [max20Num, validateMoney]
const EDIT = ACTIONS.Edit
const DETAIL = ACTIONS.Detail
const ADD = ACTIONS.Add

export default {
  components: {
    UploadFile
  },
  props: {
    submitLoading: {
      type: Boolean,
      default: false
    },
    act: {
      type: String,
      default: ADD
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
        lawFirmList: [], // 律所列表
        ourUnits: [] // 涉案单位列表
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
        caseNo: [max30Str],
        competentCourt: [max30Str],
        trialJudge: [max30Str],
        lawyerPhone: [validatePhone, max30Str],
        caseAmount: [validateRequired, ...validatePhoneMoney],
        entrust: [...validatePhoneMoney],
        caseDescription: [validateRequired]
      },
      validateRequired,
      max30Str
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
    disabled() {
      return this.act === DETAIL
    },
    isEdit() {
      return this.act === EDIT
    },
    isAdd() {
      return this.act === ADD
    },
    // 律所来源选择的是否为库内
    isKuNei() {
      return this.form.lawOffice === '0'
    },
    courtName() {
      return CASE_STAGE['仲裁'] === this.form.caseStage ? '仲裁委员会' : '审理法院'
    },
    judgeName() {
      return CASE_STAGE['仲裁'] === this.form.caseStage ? '仲裁员' : '主管法官'
    },
    uploadFileRecord() {
      return {
        options: {
          limit: 1000,
          disabled: this.disabled
        }
      }
    }
  },
  methods: {
    disabledDate(current) {
      return current && current > moment().endOf('day')
    },
    /**
    * 涉案单位下拉框模糊查询（本地查询）
    */
    handleSearchOurUnits(input, option) {
      return option.componentOptions.children[0].text.indexOf(input) >= 0
    },
    handleBriefChange(value, label, extra) {
      this.briefSearchValue = label[0]
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
          this.briefList = []

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
      if (index !== -1) this.form.caseUsers.splice(index, 1)
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
        this.dict.ourUnits = res.data.COMPANY
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
