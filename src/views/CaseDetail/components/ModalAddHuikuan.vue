<template>
  <div>
    <Edit :show="showEdit" :info="info" :case-folder-id="caseFolderId" :is-edit="isEdit" @close="showEdit=false" @reload="handleReload" />

    <a-modal title="回款情况" ok-text="提交" :visible="show" @cancel="handleClose">
      <template #footer>
        <a-button @click="handleClose">关闭</a-button>
      </template>
      <a-row class="margin-bottom" type="flex" align="middle" justify="space-between">
        <a-col> 已回款总金额：{{ sumPayment }} </a-col>
        <a-col>
          <a-button type="primary" @click="handleShowAdd">新增</a-button>
        </a-col>
      </a-row>
      <a-table :columns="columns" :data-source="list" size="middle" :pagination="false" :row-key="e=>e.id">
        <template #action="item">
          <a @click="handleShowEdit(item)">修改</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗？" ok-text="删除" ok-type="danger" cancel-text="取消" @confirm="handleDelete(item.id)">
            <a>删除</a>
          </a-popconfirm>
          <a-divider type="vertical" />
          <a>附件</a>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script>
import { delete_ as httpDelete } from '@/api/caseReturned'
import Edit from './ModalAddHuikuanEdit'

export default {
  components: {
    Edit
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default() {
        return []
      }
    },
    sumPayment: {
      type: Number,
      default: 0
    },
    caseFolderId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showEdit: false,
      info: {},
      isEdit: false,
      submitLoading: false,
      columns: [
        {
          title: '回款',
          key: 'returnedMoney',
          dataIndex: 'returnedMoney'
        },
        {
          title: '回款时间',
          key: 'returnedTime',
          dataIndex: 'returnedTime'
        },
        {
          title: '操作',
          align: 'right',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleReload() {
      this.$emit('reload')
    },
    handleShowAdd() {
      this.isEdit = false
      this.showEdit = true
    },
    handleShowEdit(item) {
      this.info = item
      this.isEdit = true
      this.showEdit = true
    },
    handleDelete(id) {
      httpDelete(id).then(() => {
        this.handleReload()
      })
    }
  }
}
</script>

<style scoped>
</style>
