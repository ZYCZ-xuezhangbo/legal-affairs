<template>
  <div>
    <dialog-rich-text :show.sync="visible" :content="richText"></dialog-rich-text>
    <a-card :loading="loading" :bordered="false" title="普法宣传平台">
      <template #extra>
        <a-radio-group v-model="radioVal">
          <a-radio-button v-for="(item,index) in radios" :key="index" :value="item.key">
            {{ item.name }}
          </a-radio-button>
        </a-radio-group>
      </template>
      <a-table :columns="columns" :data-source="dataSource" :bordered="false" :pagination="false" :row-key="e=>e.id">
        <template #title>
          {{ tableTitle }}
        </template>
        <template #customTitle="item">
          <a @click="handleClick(item.id)">{{ item.title }}</a>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { getById as getWorkTrendInfo } from '@/api/workTrend'
import { getById as getPolicyInfo } from '@/api/policy'
import { getById as getAnnouncementInfo } from '@/api/announcement'
import DialogRichText from '@/components/DialogRichText'

const [WORK, POLICY, NOTICE] = ['1', '2', '3']

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    DialogRichText
  },
  data() {
    return {
      radioVal: WORK,
      radios: [
        {
          key: WORK,
          name: '工作动态'
        },
        {
          key: POLICY,
          name: '国资政策'
        },
        {
          key: NOTICE,
          name: '公告'
        }
      ],
      columns: [
        {
          title: '标题',
          key: 'title',
          scopedSlots: { customRender: 'customTitle' }
        },
        {
          title: '日期',
          dataIndex: 'createTime'
        }
      ],
      visible: false,
      richText: ''
    }
  },
  computed: {
    tableTitle() {
      return this.radios.find(v => v.key === this.radioVal).name
    },
    dataSource() {
      if (this.radioVal === WORK) return this.data.workTrendList
      else if (this.radioVal === POLICY) return this.data.policyList
      else if (this.radioVal === NOTICE) return this.data.noticeList
      else return []
    }
  },
  methods: {
    handleClick(id) {
      this.richText = ''
      this.richTextLoading = true
      this.visible = true
      let api = null

      if (this.radioVal === WORK) {
        api = getWorkTrendInfo
      } else if (this.radioVal === POLICY) {
        api = getPolicyInfo
      } else if (this.radioVal === NOTICE) {
        api = getAnnouncementInfo
      }
      api(id).then(res => {
        this.richText = res.data.others
      }).finally(() => {
        this.richTextLoading = false
      })
    }
  }
}
</script>

<style>
</style>
