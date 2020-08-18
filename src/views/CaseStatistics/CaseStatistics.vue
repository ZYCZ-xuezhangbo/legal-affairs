<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-row :gutter="gutter">
        <a-col v-bind="span" class="padding-top-lg">
          <div class="title">案件成诉时间</div>
          <a-row :gutter="gutter" type="flex" align="middle">
            <a-col class="padding-bottom">
              <a-radio-group name="dateType" v-model="form.dateType">
                <a-radio value="1">
                  当月
                </a-radio>
                <a-radio value="2">
                  当年
                </a-radio>
              </a-radio-group>
            </a-col>
            <a-col class="padding-bottom">
              <a-date-picker class="margin-right margin-bottom" v-model="form.startDate" inputReadOnly @change="(e,str) => form.startDate=str" placeholder="开始日期" />
              <span class="margin-right margin-bottom">至</span>
              <a-date-picker class="margin-bottom" v-model="form.endDate" inputReadOnly @change="(e,str) => form.endDate=str" placeholder="结束日期" />
            </a-col>
          </a-row>
        </a-col>
        <a-col v-bind="span" class="padding-top-lg">
          <div class="title">案件金额（万元）</div>
          <a-row :gutter="gutter" type="flex" align="middle">
            <a-col class="padding-bottom">
              <a-radio-group name="moneyType" v-model="form.moneyType">
                <a-radio value="1">
                  小于500万
                </a-radio>
                <a-radio value="2">
                  500万-3000万
                </a-radio>
                <a-radio value="3">
                  大于3000万
                </a-radio>
              </a-radio-group>
            </a-col>
            <a-col class="padding-bottom">
              <a-row type="flex" align="middle">
                <a-col class="margin-bottom margin-right">
                  <a-input class="search-input  " />
                </a-col>
                <a-col class="margin-bottom margin-right">
                  至
                </a-col>
                <a-col class="margin-bottom">
                  <a-input class="search-input" />
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-col>
        <a-col v-bind="span" class="padding-top-lg">
          <div class="title">涉案单位</div>
          <a-row type="flex" align="middle">
            <a-col class="margin-bottom margin-right">
              <a-checkbox-group v-model="form.checkbox" name="checkboxgroup" :options="checkboxList" />
            </a-col>
            <a-col class="margin-bottom">
              <a-select v-model="form.company">
                <a-select-option value="">
                  全部公司
                </a-select-option>
                <a-select-option value="1">
                  公司1
                </a-select-option>
              </a-select>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <div class="padding-top-lg">
        <a-button type="primary">查询</a-button>
      </div>
    </a-card>
    <a-card :bordered="false" class="margin-top-lg">
      <a-row :gutter="gutter">
        <a-col v-bind="span">
          <ChartPie is-ring :data="dataPie" title="各阶段案件数量占比" />
        </a-col>
        <a-col v-bind="span">
          <ChartBar :data="dataBar" is-direction title="案件种类统计" />
        </a-col>
      </a-row>
    </a-card>
    <a-row :gutter="gutter">
      <a-col v-bind="span">
        <a-card :bordered="false" class="margin-top-lg">
          <div class="statistics-title">案件数量合计</div>
          <div class="statistics-num"><a>15</a></div>
          <a-row type="flex" class="margin-top-lg">
            <a-col :flex="1">
              <a-statistic title="本单位" :value="4" />
            </a-col>
            <a-col :flex="1">
              <a-statistic title="占比" :value="26.66" suffix="%" />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col v-bind="span">
        <a-card :bordered="false" class="margin-top-lg">
          <div class="statistics-title">案件金额（万元）</div>
          <div class="statistics-num"><a>23000</a></div>
          <a-row type="flex" class="margin-top-lg">
            <a-col :flex="1">
              <a-statistic title="本单位" :value="4000" />
            </a-col>
            <a-col :flex="1">
              <a-statistic title="占比" :value="17.39" suffix="%" />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <a-card :bordered="false" title="各单位案件" class="margin-top-lg">
      <a-table :columns="columns" :data-source="data" :bordered="false" :pagination="false" :row-key="e=>e.id"> </a-table>
    </a-card>
    <a-card :bordered="false" title="各单位重大案件" class="margin-top-lg">
      <a-table :columns="columns" :data-source="data" :bordered="false" :pagination="false" :row-key="e=>e.id"> </a-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { ChartPie, ChartBar } from '@/components'

export default {
  components: {
    ChartPie,
    ChartBar
  },
  data() {
    return {
      gutter: 12,
      span: {
        md: 24,
        lg: 12
      },
      checkboxList: [
        {
          value: '1',
          label: '原告'
        },
        {
          value: '2',
          label: '被告'
        },
        {
          value: '3',
          label: '第三人'
        }
      ],
      form: {
        dateType: '1',
        startDate: '',
        endDate: '',
        moneyType: '1',
        companyType: '1',
        company: ''
      },
      dataPie: [
        { k: '一审', v: 41 },
        { k: '二审', v: 22 },
        { k: '执行', v: 13 },
        { k: '再审', v: 14 },
        { k: '结案', v: 5 }
      ],
      dataBar: [
        { x: '破产清算', y: 29034 },
        { x: '行政诉讼', y: 131744 },
        { x: '工程纠纷', y: 104970 },
        { x: '生产作业纠纷', y: 23489 },
        { x: '土地使用权纠纷', y: 12822 },
        { x: '贸易纠纷', y: 13803 },
        { x: '其他', y: 14823 }
      ],
      columns: [
        {
          title: '单位',
          dataIndex: 'company'
        },
        {
          title: '数量',
          dataIndex: 'num'
        },
        {
          title: '金额（万元）',
          dataIndex: 'money'
        }
      ],
      data: [
        {
          id: 1,
          company: '股份有限公司1',
          num: 5,
          money: 2000
        },
        {
          id: 2,
          company: '股份有限公司2',
          num: 1,
          money: 123
        }
      ]
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 18px;
  margin-bottom: 10px;
}
.search-input {
  display: initial;
}
.statistics-title {
  font-size: 16px;
}
.statistics-num {
  font-size: 34px;
}
</style>
