<template>
  <a-card :bordered="false" class="margin-bottom-lg">
    <a-row :gutter="48">
      <a-col :sm="24" :md="12">
        <div class="padding-bottom-lg">
          <a-radio-group v-model="form.dateType">
            <a-radio-button value="1">
              登记日期
            </a-radio-button>
            <a-radio-button value="2" v-if="tab==='3'">
              评价日期
            </a-radio-button>
          </a-radio-group>
        </div>
        <a-row :gutter="48" type="flex" align="middle">
          <a-col :md="24" :lg="6" class="padding-bottom">
            <a-radio-group v-model="form.dateType1">
              <a-radio value="1">
                当月
              </a-radio>
              <a-radio value="2">
                当年
              </a-radio>
            </a-radio-group>
          </a-col>
          <a-col :md="24" :lg="18" class="padding-bottom">
            <a-row type="flex" align="middle">
              <a-col class="padding-bottom">
                <a-date-picker v-model="form.startDate" inputReadOnly @change="handleStartDateChange" />
              </a-col>
              <a-col class="padding-lr padding-bottom" >至</a-col>
              <a-col class="padding-bottom">
                <a-date-picker v-model="form.endDate" inputReadOnly @change="handleEndDateChange" />
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-col>
      <a-col :sm="24" :md="12">
        <template v-if="tab==='1'">
          <div class="title"> 律师事务所 </div>
          <a-input v-model="form.officeName" />
        </template>
        <template v-else-if="tab!=='1'">
          <div class="title"> 集团内涉案企业 </div>
          <a-row :gutter="48" type="flex" align="middle">
            <a-col class="padding-bottom">
              <a-checkbox-group v-model="form.checkbox" name="checkboxgroup" :options="checkboxList" />
            </a-col>
            <a-col class="padding-bottom">
              <a-input v-model="form.companyName" placeholder="公司模糊查询" style="width:100%" />
            </a-col>
          </a-row>
        </template>
      </a-col>
    </a-row>
    <a-button type="primary">查询</a-button>
  </a-card>
</template>

<script>
export default {
  props: {
    tab: {
      type: [Number, String],
      default: '1'
    }
  },
  data() {
    return {
      checkboxList: [
        {
          value: '1',
          label: '本单位'
        },
        {
          value: '2',
          label: '下属单位'
        }
      ],
      form: {
        dateType: '1',
        dateType1: '1',
        startDate: '',
        endDate: '',
        officeName: '',
        checkbox: [],
        companyName: ''
      }
    }
  },
  methods: {
    handleStartDateChange(e, str) {
      this.form.startDate = str
    },
    handleEndDateChange(e, str) {
      this.form.endDate = str
    }
  }
}
</script>

<style>
.title {
  font-size: 16px;
  height: 48px;
  line-height: 48px;
  padding-bottom: 16px;
}
</style>
