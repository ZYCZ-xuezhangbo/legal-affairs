<template>
  <div>
    <a-form-model ref="ruleForm" :model="form">
      <template v-for="(row,rowIndex) in list">
        <a-row v-if="row.type === 'grid'" :key="rowIndex" v-bind="rowModel(row)">
          <a-col v-for="(col,colIndex) in row.columns" :key="colIndex" v-bind="colModel(row,col)">
            <div v-for="(listItem,listIndex) in col.list" :key="listIndex">
              <FormField :form="form" :list-item="listItem"></FormField>
            </div>
          </a-col>
        </a-row>
        <template v-else>
          <FormField :form="form" :list-item="row" :key="rowIndex"></FormField>
        </template>
      </template>
    </a-form-model>
  </div>
</template>

<script>
import FormField from './FormField'

export default {
  components: {
    FormField
  },
  props: {
    makingForm: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      list: this.makingForm.list,
      config: this.makingForm.config,
      form: {}
    }
  },
  methods: {
    rowModel(row) {
      const item = {}
      item.gutter = row.options.gutter
      if (row.options.flex) {
        item.type = 'flex'
        if (row.options.align) item.align = row.options.align
        if (row.options.justify) item.justify = row.options.justify
      }
      return item
    },
    colModel(row, col) {
      const item = {}
      if (row.options.responsive) {
        item.xs = col.xs
        item.sm = col.sm
        item.md = col.md
        item.lg = col.lg
        item.xl = col.xl
      } else {
        item.span = col.span
      }
      return item
    },
    formatData() {
      const json = {}
      for (let i = 0; i < this.list.length; i++) {
        const listItem = this.list[i]
        if (listItem.type === 'grid') {
          const col = this.list[i].columns
          for (let j = 0; j < col.length; j++) {
            const list = col[j].list
            for (let k = 0; k < list.length; k++) {
              const item = list[k]
              json[item.model] = item.options.defaultValue
            }
          }
        } else {
          json[listItem.model] = listItem.options.defaultValue
        }
      }
      this.form = json
    },
    validation() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate().then(() => {
          resolve(this.form)
        }).catch(() => {
          this.$message.warning('表单数据校验未通过')
          reject(new Error(false))
        })
      })
    },
    reset() {
      this.$refs.ruleForm.resetFields()
    },
    handleDateChange(date, filed) {
      this.form[filed] = date
    }
  },
  created() {
    this.formatData()
  }
}
</script>

<style>
</style>
