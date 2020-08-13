<template>
  <a-card :bordered="false" class="title">
    <div class="table-page-search-wrapper">
      <a-form-model ref="searchForm" :model="searchForm" layout="inline">
        <a-row :gutter="gutter">
          <a-col :lg="24" :xl="18">
            <a-row :gutter="gutter">
              <a-col v-bind="searchFormGrid">
                <a-form-model-item label="涉案单位" prop="fieldA">
                  <a-select v-model="searchForm.fieldA">
                    <a-select-option value="jack">
                      Jack
                    </a-select-option>
                    <a-select-option value="lucy">
                      Lucy
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col v-bind="searchFormGrid">
                <a-form-model-item label="案号" prop="fieldB">
                  <a-input v-model="searchForm.fieldB" placeholder="案号" />
                </a-form-model-item>
              </a-col>
              <template v-if="showMore">
                <a-col v-bind="searchFormGrid">
                  <a-form-model-item label="管辖法院" prop="fieldC">
                    <a-input v-model="searchForm.fieldC" placeholder="管辖法院" />
                  </a-form-model-item>
                </a-col>
                <a-col v-bind="searchFormGrid">
                  <a-form-model-item label="案件种类" prop="fieldD">
                    <a-select v-model="searchForm.fieldA">
                      <a-select-option value="jack">
                        Jack
                      </a-select-option>
                      <a-select-option value="lucy">
                        Lucy
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col v-bind="searchFormGrid">
                  <a-form-model-item label="案件阶段" prop="fieldC">
                    <a-input v-model="searchForm.fieldC" placeholder="案件阶段" />
                  </a-form-model-item>
                </a-col>
                <a-col v-bind="searchFormGrid">
                  <a-form-model-item label="进展状态" prop="fieldC">
                    <a-input v-model="searchForm.fieldC" placeholder="进展状态" />
                  </a-form-model-item>
                </a-col>
                <a-col v-bind="searchFormGrid">
                  <a-form-model-item label="对方当事人" prop="fieldC">
                    <a-input v-model="searchForm.fieldC" placeholder="对方当事人" />
                  </a-form-model-item>
                </a-col>
                <a-col v-bind="searchFormGrid">
                  <a-form-model-item label="重大案件" prop="fieldC">
                    <a-input v-model="searchForm.fieldC" placeholder="重大案件" />
                  </a-form-model-item>
                </a-col>
                <a-col v-bind="searchFormGrid">
                  <a-form-model-item label="成诉时间" prop="fieldC">
                    <a-date-picker placeholder="开始时间" class="response" />
                  </a-form-model-item>
                </a-col>
                <a-col v-bind="searchFormGrid">
                  <a-form-model-item label="成诉时间" prop="fieldC">
                    <a-date-picker placeholder="结束时间" class="response" />
                  </a-form-model-item>
                </a-col>
                <a-col v-bind="searchFormGrid">
                  <a-form-model-item label="涉案金额" prop="fieldC">
                    <a-input-number class="response" :min="0" placeholder="最小金额" />
                  </a-form-model-item>
                </a-col>
                <a-col v-bind="searchFormGrid">
                  <a-form-model-item label="涉案金额" prop="fieldC">
                    <a-input-number class="response" placeholder="最大金额" />
                  </a-form-model-item>
                </a-col>
              </template>
            </a-row>
          </a-col>
          <a-col :lg="24" :xl="6">
            <a-button type="primary"> 搜索 </a-button>
            <a-button class="margin-lr" @click="resetForm"> 重置 </a-button>
            <a @click="showMore=!showMore">
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
  data() {
    return {
      showMore: false,
      gutter: 48,
      searchFormGrid: {
        xs: 24,
        sm: 24,
        md: 12,
        lg: 12,
        xl: 8
      },
      searchForm: {
        fieldA: '',
        fieldB: '',
        fieldC: '',
        fieldD: ''
      }
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  methods: {
    resetForm() {
      this.$refs.searchForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.flex {
  display: flex;
}
.response {
  width: 100%;
}
</style>
