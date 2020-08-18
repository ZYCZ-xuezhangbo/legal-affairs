<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form-model ref="searchForm" :model="searchForm" layout="inline">
        <a-row :gutter="gutter">
          <a-col :lg="24" :xl="18">
            <a-row :gutter="gutter">
              <a-col v-bind="span">
                <a-form-model-item label="涉案单位" prop="ourUnits">
                  <a-select v-model="searchForm.ourUnits" show-search allow-clear option-filter-prop="children" :filter-option="handleSearchOurUnits" placeholder="涉案单位">
                    <a-select-option v-for="(item,index) in dicData.ourUnits" :key="index" :value="item.code">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col v-bind="span">
                <a-form-model-item label="案号" prop="caseNo">
                  <a-input v-model="searchForm.caseNo" placeholder="案号" />
                </a-form-model-item>
              </a-col>
              <template v-if="showMore">
                <a-col v-bind="span">
                  <a-form-model-item label="管辖法院" prop="competentCourt">
                    <a-input v-model="searchForm.competentCourt" placeholder="管辖法院" />
                  </a-form-model-item>
                </a-col>
                <a-col v-bind="span">
                  <a-form-model-item label="案件种类" prop="caseType">
                    <a-select v-model="searchForm.caseType" allow-clear placeholder="案件种类">
                      <a-select-option v-for="(item,index) in dicData.caseTypeList" :key="index" :value="item.code">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col v-bind="span">
                  <a-form-model-item label="案件阶段" prop="caseStage">
                    <a-select v-model="searchForm.caseStage" allow-clear placeholder="案件阶段">
                      <a-select-option v-for="(item,index) in dicData.caseStageList" :key="index" :value="item.code">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col v-bind="span">
                  <a-form-model-item label="进展状态" prop="progressStatus">
                    <a-input v-model="searchForm.progressStatus" placeholder="进展状态" />
                  </a-form-model-item>
                </a-col>
                <a-col v-bind="span">
                  <a-form-model-item label="对方当事人" prop="caseUser">
                    <a-input v-model="searchForm.caseUser" placeholder="对方当事人" />
                  </a-form-model-item>
                </a-col>
                <a-col v-bind="span">
                  <a-form-model-item label="重大案件" prop="importantCase">
                    <a-select v-model="searchForm.importantCase">
                      <a-select-option value="">
                        不限
                      </a-select-option>
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
                  <a-form-model-item label="成诉时间" prop="startTime">
                    <a-date-picker v-model="searchForm.startTime" inputReadOnly placeholder="开始时间" @change="(e,str)=>searchForm.startTime=str" class="response" />
                  </a-form-model-item>
                </a-col>
                <a-col v-bind="span">
                  <a-form-model-item label="成诉时间" prop="endTime">
                    <a-date-picker v-model="searchForm.endTime" inputReadOnly placeholder="结束时间" @change="(e,str)=>searchForm.endTime=str" class="response" />
                  </a-form-model-item>
                </a-col>
                <a-col v-bind="span">
                  <a-form-model-item label="涉案金额" prop="caseAmountStart">
                    <a-input-number v-model="searchForm.caseAmountStart" class="response" :min="0" placeholder="最小金额" />
                  </a-form-model-item>
                </a-col>
                <a-col v-bind="span">
                  <a-form-model-item label="涉案金额" prop="caseAmountEnd">
                    <a-input-number v-model="searchForm.caseAmountEnd" class="response" placeholder="最大金额" />
                  </a-form-model-item>
                </a-col>
              </template>
            </a-row>
          </a-col>
          <a-col :lg="24" :xl="6">
            <a-button type="primary" @click="handleSearch"> 搜索 </a-button>
            <a-button class="margin-lr" @click="resetForm"> 重置 </a-button>
            <a @click="handleToggleShowMore">
              {{ showMore ? '收起' : '展开' }}
              <a-icon :type="showMore ? 'up' : 'down'" />
            </a>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'CaseListSearch',
  props: {
    ourUnits: {
      type: Array,
      default() {
        return []
      }
    },
    dicData: {
      type: Object,
      default() {
        return {
          ourUnits: [],
          caseTypeList: [],
          caseStageList: []
        }
      }
    }
  },
  data() {
    return {
      showMore: false,
      gutter: 48,
      span: {
        xs: 24,
        sm: 24,
        md: 12,
        lg: 12,
        xl: 8
      },
      searchForm: {
        caseAmountEnd: '', // 涉案金额（万元）结束
        caseAmountStart: '', // 涉案金额（万元）初始
        caseNo: '', // 案件号
        caseStage: undefined, // 案件所处阶段
        caseType: undefined, // 案件种类
        caseUser: '', // 对方当事人
        competentCourt: '', // 管辖法院
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        importantCase: '', // 重大案件（0：否，1：是）
        ourUnits: undefined, // 我方涉案单位
        progressStatus: ''// 进展状态
      }
    }
  },
  methods: {
    resetForm() {
      this.$refs.searchForm.resetFields()
    },
    handleSearch() {
      let searchData = null
      if (this.showMore) {
        searchData = this.searchForm
      } else {
        searchData = {
          ourUnits: this.searchForm.ourUnits,
          caseNo: this.searchForm.caseNo
        }
      }
      this.$emit('search', searchData)
    },
    handleToggleShowMore() {
      this.showMore = !this.showMore
    },
    /**
    * 涉案单位下拉框模糊查询（本地查询）
    */
    handleSearchOurUnits(input, option) {
      return option.componentOptions.children[0].text.indexOf(input) >= 0
    }
  }
}
</script>

<style lang="less" scoped>
.flex {
  display: flex;
}
.response {
  width: 100%;
}
</style>
