<template>
  <a-card :bordered="false">
    <a-row :gutter="gutter">
      <a-col v-bind="span" class="padding-top-lg">
        <div class="title">案件成诉时间</div>
        <a-radio-group name="dateType" v-model="condition.dateType">
          <a-radio v-for="(item,index) in timeRadio" :key="index" :value="item.value">
            {{ item.name }}
          </a-radio>
        </a-radio-group>
        <div :class="timeDisabled?'hide':''" class="margin-top">
          <a-date-picker class="margin-right margin-bottom" v-model="condition.startTime" inputReadOnly @change="(e,str) => condition.startTime=str" placeholder="开始日期" />
          <span class="margin-right margin-bottom">至</span>
          <a-date-picker class="margin-bottom" v-model="condition.endTime" inputReadOnly @change="(e,str) => condition.endTime=str" placeholder="结束日期" />
        </div>
      </a-col>
      <a-col v-bind="span" class="padding-top-lg">
        <div class="title">案件金额（万元）</div>
        <a-radio-group name="amountType" v-model="condition.amountType">
          <a-radio v-for="(item,index) in moneyRadio" :key="index" :value="item.value">
            {{ item.name }}
          </a-radio>
        </a-radio-group>
        <div :class="amountDisabled?'hide':''" class="margin-top">
          <a-row type="flex" align="middle">
            <a-col class="margin-bottom margin-right">
              <a-input-number v-model="condition.caseAmountStart" placeholder="最小金额" class="money-input" />
            </a-col>
            <a-col class="margin-bottom margin-right">
              至
            </a-col>
            <a-col class="margin-bottom">
              <a-input-number v-model="condition.caseAmountEnd" placeholder="最大金额" class="money-input" />
            </a-col>
          </a-row>
        </div>
      </a-col>
      <a-col v-bind="span" class="padding-top-lg">
        <div class="title">涉案单位</div>
        <a-row type="flex" align="middle">
          <a-col class="margin-bottom margin-right">
            <a-checkbox-group v-model="condition.locusStand" name="checkboxgroup" :options="dict.locusStand" />
          </a-col>
          <a-col class="margin-bottom">
            <a-select v-model="condition.company">
              <a-select-option value="">
                全部公司
              </a-select-option>
              <a-select-option v-for="(item,index) in dict.company" :key="index" :value="item.code">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <div class="padding-top-lg">
      <button-search @click="handleClick" />
    </div>
  </a-card>
</template>

<script>
const timeRadio = [
  {
    value: 0,
    name: '当月'
  },
  {
    value: 1,
    name: '当年'
  },
  {
    value: 2,
    name: '自定义'
  }
]
const moneyRadio = [
  {
    value: 0,
    name: '小于500万'
  },
  {
    value: 1,
    name: '500万-3000万'
  },
  {
    value: 2,
    name: '大于3000万'
  },
  {
    value: 3,
    name: '自定义'
  }
]

export default {
  props: {
    grid: {
      type: Object,
      default() {
        return {
          gutter: 0,
          span: {}
        }
      }
    },
    dict: {
      type: Object,
      default() {
        return {
          locusStand: []
        }
      }
    },
    condition: {
      type: Object,
      default() {
        return {
          locusStand: []
        }
      }
    }
  },
  data() {
    return {
      timeRadio,
      moneyRadio
    }
  },
  computed: {
    gutter() {
      return this.grid.gutter
    },
    span() {
      return this.grid.span
    },
    timeDisabled() {
      return this.condition.dateType !== 2
    },
    amountDisabled() {
      return this.condition.amountType !== 3
    }
  },
  methods: {
    handleClick() {
      this.$emit('search')
    }
  }
}
</script>

<style scoped lang="less">
.title {
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.6);
}
.search-input {
  display: initial;
}
.money-input {
  width: 100%;
}
.hide {
  visibility: hidden;
}
@media screen and(max-width: 575px) {
  .hide {
    display: none;
  }
}
</style>
