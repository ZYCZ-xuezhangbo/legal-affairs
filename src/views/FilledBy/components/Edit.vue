<template>
  <div>
    <a-modal v-bind="editModal" :title="isEdit?'编辑':'新建'" :visible="show" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel" :width="1000">
      <a-skeleton v-show="pageLoading" active />
      <div v-show="!pageLoading">
        <a-form-model ref="form" :rules="rules" :model="form">
          <a-row :gutter="gutter">
            <a-col v-bind="span">
              <a-form-model-item label="公司" prop="company">
                <a-select v-model="form.company">
                  <a-select-option v-for="(item,index) in dict.COMPANY" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="部门" prop="deptName">
                <a-select v-model="form.deptName">
                  <a-select-option v-for="(item,index) in dict.DEPT" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="用户名" prop="userName">
                <a-select v-model="form.userName">
                  <a-select-option v-for="(item,index) in dict.USERNAME" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="姓名" prop="name">
                <a-input v-model="form.name" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="办公室电话" prop="officePhone">
                <a-input v-model="form.officePhone" />
              </a-form-model-item>
            </a-col>
            <a-col v-bind="span">
              <a-form-model-item label="联系电话" prop="phone">
                <a-input v-model="form.phone" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    id: {
      type: [String, Number],
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    api: {
      type: String,
      default: ''
    },
    dict: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    show(newVal, oldVal) {
      if (newVal && this.isEdit) {
        this.getDetail()
      } else if (newVal && !this.isEdit) {
        this.$nextTick(() => {
          this.$refs.form.resetFields()
        })
      }
    }
  },
  computed: {
    editModal() {
      if (this.confirmLoading) {
        return {
          closable: false,
          keyboard: false,
          maskClosable: false
        }
      }
      return ''
    }
  },
  data() {
    return {
      gutter: 48,
      span: {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 6
      },
      pageLoading: false,
      confirmLoading: false,
      API: require(`@/api/${this.api}`),
      form: {
        company: '',
        deptName: '',
        lammyCompany: '',
        lammyDept: '',
        name: '',
        officePhone: '',
        phone: '',
        userName: ''
      },
      rules: {}
    }
  },
  methods: {
    handleOk() {
      this.$refs.form.validate().then(() => {
        this.confirmLoading = true
        if (this.isEdit) { // 修改
          this.API.update({ id: this.id, ...this.form }).then(res => {
            this.requestSuccess(res.msg)
          }).finally(() => {
            this.confirmLoading = false
          })
        } else { // 新增
          this.API.create(this.form).then(res => {
            this.requestSuccess(res.msg)
          }).finally(() => {
            this.confirmLoading = false
          })
        }
      })
    },
    getDetail() {
      this.pageLoading = true
      this.API.getById(this.id).then(res => {
        this.form = res.data
      }).finally(() => {
        this.pageLoading = false
      })
    },
    handleCancel() {
      this.$emit('close')
      this.pageLoading = false
    },
    requestSuccess(msg) {
      this.$emit('success')
      this.$emit('close')
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style>
</style>
