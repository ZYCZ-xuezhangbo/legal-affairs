<template>
  <div>
    <a-modal title="案由" :visible="show" @ok="handleOk" @cancel="handleCancel">
      <a-input-search style="margin-bottom: 8px" placeholder="搜索" :loading="searchLoading" @change="onChange" />
      <a-tree :expanded-keys="expandedKeys" blockNode :auto-expand-parent="true" :tree-data="gData" @expand="onExpand" @select="handleSelect">
        <template #title="{ title }">
          <span v-if="title.indexOf(searchValue) > -1">
            {{ title.substr(0, title.indexOf(searchValue)) }}
            <span style="color: #f50">{{ searchValue }}</span>
            {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
          </span>
          <span v-else>{{ title }}</span>
        </template>
      </a-tree>
    </a-modal>
  </div>
</template>

<script>
import { getBrief as httpGetBriefByKeyword } from '@/api/case'

let searchTimer = null
let dataList = []

const getParentKey = (key, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}

const generateList = data => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i]
    const key = node.key
    dataList.push({ key, title: node.title })
    if (node.children) {
      generateList(node.children)
    }
  }
}
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchLoading: false,
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      gData: [],
      id: '',
      title: ''
    }
  },
  methods: {
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onChange(e) {
      const value = e.target.value

      if (searchTimer) clearTimeout(searchTimer)
      if (value === '') return

      searchTimer = setTimeout(() => {
        this.searchLoading = true
        httpGetBriefByKeyword(value).then(res => {
          dataList = []
          this.gData = res.data
          generateList(this.gData)
          const expandedKeys = dataList.map(item => {
            if (item.title.indexOf(value) > -1) return getParentKey(item.key, this.gData)
            return null
          }).filter((item, i, self) => item && self.indexOf(item) === i)

          Object.assign(this, {
            expandedKeys,
            searchValue: value,
            autoExpandParent: true
          })
        }).finally(() => {
          this.searchLoading = false
        })
      }, 800)
    },
    handleOk() {
      this.$emit('choose', { id: this.id, title: this.title })
      this.handleCancel()
    },
    handleCancel() {
      this.$emit('close')
    },
    handleSelect(selectedKeys, e) {
      this.id = selectedKeys[0]
      this.title = e.node.dataRef.title
    }
  },
  mounted() {
  }
}
</script>

<style>
</style>
