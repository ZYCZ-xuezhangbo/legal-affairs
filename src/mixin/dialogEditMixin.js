import { ACTIONS } from '@/store/mutation-types'

export default {
  props: {
    act: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    api: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogWidth: 1000,
      gutter: 48,
      span: {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 6
      },
      pageLoading: false,
      confirmLoading: false,
      API: this.api === '' ? '' : require(`@/api/${this.api}`)
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          if ([ACTIONS.Edit, ACTIONS.Detail, ACTIONS.Rate].includes(this.act)) this.getDetail()
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
    },
    dialogTitle() {
      let title = ''
      if (this.act === ACTIONS.Edit) {
        title = '修改'
      } else if (this.act === ACTIONS.Detail) {
        title = '查看'
      } else if (this.act === ACTIONS.Add) {
        title = '新增'
      }
      return title
    }
  },
  methods: {
    handleOk() {
      this.$refs.form.validate().then(() => {
        this.confirmLoading = true
        let api = null
        if (this.act === ACTIONS.Edit) api = this.API.update
        else if (this.act === ACTIONS.Add) api = this.API.create
        const paramsId = this.act === ACTIONS.Edit ? { id: this.id } : {}

        if (api) {
          api({ ...paramsId, ...this.form }).then(res => {
            this.requestSuccess()
          }).finally(() => {
            this.confirmLoading = false
          })
        }
      }).catch(() => {
        this.$message.warning(this.$t('message.form.validate.fail'))
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
      this.$emit('update:show', false)
      this.pageLoading = false
    },
    requestSuccess() {
      this.$emit('success')
      this.handleCancel()
      this.$refs.form.resetFields()
    }
  }
}
