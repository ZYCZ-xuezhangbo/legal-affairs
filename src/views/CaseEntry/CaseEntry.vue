<template>
  <page-header-wrapper>
    <template #content>
      <a-row type="flex">
        <a-col class="margin-bottom">
          <a-button type="primary" class="margin-right-lg" @click="dialog.caseRelationShow=true">选择关联案件</a-button>
        </a-col>
        <a-col :flex="1">
          <template v-if="relationCase">
            <span class="margin-right-lg margin-bottom" style="display:inline-block">
              我方涉案单位：{{ relationCase.ourUnits }}，诉讼地位：{{ relationCase.locusStand }}，案号：{{ relationCase.caseNo }}
            </span>
            <a class="text-red margin-bottom" style="display:inline-block" @click="relationCase=null">
              取消关联 <a-icon type="close-circle"></a-icon>
            </a>
          </template>
        </a-col>
      </a-row>
    </template>

    <CaseRelation :show="dialog.caseRelationShow" :lawsuit="lawsuit" @choose="handleCaseRelationChoose" @close="dialog.caseRelationShow=false" />

    <a-card :bordered="false">
      <a-form-model ref="form" :model="form" :rules="rules">
        <a-row :gutter="gutter">
          <a-col v-bind="span">
            <a-form-model-item label="我方涉案单位" prop="ourUnits">
              <a-select v-model="form.ourUnits" show-search option-filter-prop="children" :filter-option="handleSearchOurUnits" placeholder="我方涉案单位">
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
              <a-select v-model="form.locusStand" placeholder="诉讼地位">
                <a-select-option v-for="(item,index) in lawsuit" :key="index" :value="item.code">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="案由" prop="brief">
              <a-tree-select v-model="form.brief" style="width: 100%" :show-checked-strategy="SHOW_ALL" :searchValue="briefSearchValue" :dropdown-style="{ maxHeight: '45vh', overflow: 'auto' }" treeDataSimpleMode show-search treeNodeFilterProp="label" :tree-data="briefList" tree-default-expand-all placeholder="案由" @search="handleSearchbriefList">
                <template #suffixIcon>
                  <a-icon v-show="briefLoading" type="loading" />
                </template>
              </a-tree-select>
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="案号" prop="caseNo">
              <a-input v-model="form.caseNo" placeholder="案号" />
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="成诉时间" prop="lawsuitTime">
              <a-date-picker v-model="form.lawsuitTime" inputReadOnly @change="(e,str)=>form.lawsuitTime=str" class="response" />
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="案件种类" prop="caseType">
              <a-select v-model="form.caseType" placeholder="案件种类">
                <a-select-option v-for="(item,index) in caseType" :key="index" :value="item.code">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="案件所处阶段" prop="caseStage">
              <a-select v-model="form.caseStage" placeholder="案件所处阶段">
                <a-select-option v-for="(item,index) in caseStage" :key="index" :value="item.code">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="重大案件" prop="importantCase">
              <a-select v-model="form.importantCase">
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
              <a-input-number v-model="form.caseAmount" :precision="2" :min="0" class="response" />
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="管辖法院" prop="competentCourt">
              <a-input v-model="form.competentCourt" placeholder="管辖法院" />
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="主管法官" prop="trialJudge">
              <a-input v-model="form.trialJudge" placeholder="主管法官" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <div>
              <a @click="handleAddCaseUsers">
                <a-icon type="plus-circle" class="margin-right-sm" />
                添加对方当事人
              </a>
            </div>
            <a-row :gutter="gutter" v-for="(item,index) in form.caseUsers" :key="item.key">
              <a-col v-bind="span">
                <a-form-model-item label="对方当事人" :key="item.key" :prop="`caseUsers.${index}.adversary`" :rules="{
                  required: true,
                  message: '必填项',
                  trigger: 'blur'
                }">
                  <a-input-search v-model="item.adversary" @search="handleDelCaseUsers(item)" placeholder="对方当事人姓名">
                    <template #enterButton>
                      <a-button> <span class="text-red">删除</span> </a-button>
                    </template>
                  </a-input-search>
                </a-form-model-item>
              </a-col>
              <a-col v-bind="span">
                <a-form-model-item label="对方当事人是否国有企业" :key="item.key" :prop="`caseUsers.${index}.stateOwned`" :rules="{
                  required: true,
                  message: '必填项',
                  trigger: ['blur','change']
                }">
                  <a-select v-model="item.stateOwned">
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
                  <a-select v-model="item.cityPipe">
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
                  <a-select v-model="item.adjust">
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
                  <a-select v-model="form.lawOffice" @change="handleLawOfficeChange">
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
                  <template v-if="form.lawOffice==='0'">
                    <!-- 如果是库内，下拉框 -->
                    <a-select v-model="form.lawOfficeName" placeholder="律所名称" @change="handleLawOfficeNameChange">
                      <a-select-option v-for="(item,index) in lawFirmList" :key="index" :value="item.code">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </template>
                  <template v-else>
                    <!-- 如果是库外，输入框 -->
                    <a-input v-model="form.lawOfficeName" placeholder="律所名称" />
                  </template>
                </a-form-model-item>
              </a-col>
              <a-col v-bind="span">
                <a-form-model-item label="律师名称" prop="lawyerName">
                  <template v-if="form.lawOffice==='0'">
                    <!-- 如果是库内，下拉框 -->
                    <a-select v-model="form.lawyerName" :loading="lawyerListLoading" placeholder="律师名称">
                      <a-select-option v-for="(item,index) in lawyerList" :key="index" :value="item.code">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </template>
                  <template v-else>
                    <!-- 如果是库外，输入框 -->
                    <a-input v-model="form.lawyerName" placeholder="律师名称" />
                  </template>
                </a-form-model-item>
              </a-col>
              <a-col v-bind="span" v-if="form.lawOffice==='1'">
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
              <a-input v-model="form.lawyerPhone" placeholder="律师电话" />
            </a-form-model-item>
          </a-col>
          <a-col v-bind="span">
            <a-form-model-item label="是否采取风险代理" prop="riskAgency">
              <a-select v-model="form.riskAgency">
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
              <a-input-number v-model="form.entrust" :precision="2" :min="0" class="response" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="代理费说明" prop="commissionDesc">
              <a-textarea v-model="form.commissionDesc" :auto-size="textAreaAutoSize" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="采取保全措施情况" prop="measure">
              <a-textarea v-model="form.measure" :auto-size="textAreaAutoSize" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="财产线索情况" prop="propertyClue">
              <a-textarea v-model="form.propertyClue" :auto-size="textAreaAutoSize" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="案件描述" prop="caseDescription">
              <a-textarea v-model="form.caseDescription" :auto-size="textAreaAutoSize" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="案件相关附件" prop="caseAccessory">
              <UploadFile :value="form.caseAccessory" :record="uploadFileRecord" @change="e=>form.caseAccessory=e" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
      <div class="text-center">
        <a-button type="primary" :loading="submitLoading" @click="handleSubmit">提交</a-button>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getCaseDictionaries as httpGetDict, getBrief as httpGetBriefList, create as httpCreate } from '@/api/case'
import { getLawFirmName as httpGetLawFirmList, getLayerByFirmId as httpGetLayerListByFirmCode } from '@/api/outsideLawManager'
import { TreeSelect } from 'ant-design-vue'
import UploadFile from '@/components/KFormDesign/packages/UploadFile'
import CaseRelation from './components/CaseRelation'

const SHOW_ALL = TreeSelect.SHOW_ALL

export default {
  components: {
    UploadFile,
    CaseRelation
  },
  data() {
    const validateLawyerPhone = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else {
        if (!(/^1[3456789]\d{9}$/.test(value))) {
          callback(new Error('手机号输入有误'))
        } else {
          callback()
        }
      }
    }
    return {
      gutter: 48,
      span: {
        sm: 24,
        md: 12,
        lg: 8,
        xl: 6
      },
      submitLoading: false,
      dialog: {
        caseRelationShow: false
      },
      textAreaAutoSize: {
        minRows: 5,
        maxRows: 15
      },
      relationCase: null, // 关联案件详情
      SHOW_ALL,
      briefTimer: null,
      briefLoading: false, // 案由搜索loading
      briefSearchValue: '', // 案由的搜索框值
      briefList: [], // 案由列表
      caseType: [], // 案件种类
      caseStage: [], // 案件所处阶段
      lawsuit: [], // 诉讼地位
      lawFirmList: [], // 律所列表
      lawyerList: [], // 律师名称
      lawyerListLoading: false,
      uploadFileRecord: {
        options: {
          downloadWay: 'a',
          limit: 1000,
          fileName: 'file',
          action: this.$uploadFileUrl
        }
      },
      form: {
        brief: undefined, // 案由
        caseAccessory: [],
        caseAmount: 0, // 涉案金额
        caseDescription: '', // 案件描述
        caseFolderId: '',
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
        ourUnits: [
          { required: true, message: '必填项', trigger: ['change', 'blur'] }
        ],
        locusStand: [
          { required: true, message: '必填项', trigger: ['change', 'blur'] }
        ],
        brief: [
          { required: true, message: '必填项', trigger: ['change', 'blur'] }
        ],
        lawsuitTime: [
          { required: true, message: '必填项', trigger: ['change', 'blur'] }
        ],
        caseType: [
          { required: true, message: '必填项', trigger: ['change', 'blur'] }
        ],
        caseStage: [
          { required: true, message: '必填项', trigger: ['change', 'blur'] }
        ],
        importantCase: [
          { required: true, message: '必填项', trigger: ['change', 'blur'] }
        ],
        caseAmount: [
          { required: true, message: '必填项', trigger: 'blur' }
        ],
        lawOfficeName: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] }
        ],
        lawyerName: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] }
        ],
        lawyerPhone: [
          { validator: validateLawyerPhone, trigger: 'blur' }
        ],
        caseDescription: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] }
        ]
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
        }, 1000)
      }
    },
    /**
     * 获取当前页的字典
     */
    getDict() {
      httpGetDict().then(res => {
        this.caseType = res.data.CASETYPE
        this.caseStage = res.data.STAGE
        this.lawsuit = res.data.LAWSUIT
      })
      httpGetLawFirmList().then(res => {
        this.lawFirmList = res.data
      })
    },
    /**
     * 提交
     */
    handleSubmit() {
      const caseFolderId = (this.relationCase && this.relationCase.caseFolderId) || ''

      this.$refs.form.validate().then(() => {
        this.submitLoading = true
        httpCreate({ caseFolderId, ...this.form }).then(res => {
          this.$notification.success({
            message: '案件录入成功',
            description: ''
          })
          this.$router.push('/case/caseList')
        }).finally(() => {
          this.submitLoading = false
        })
      }).catch((e) => {
        this.$message.warning(this.$t('message.form.validate.fail'))
      })
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
     * 选中一条关联案件
     */
    handleCaseRelationChoose(item) {
      this.dialog.caseRelationShow = false
      this.relationCase = item
    }
  },
  mounted() {
    this.getDict()
  }
}
</script>

<style lang="less" scoped>
</style>
