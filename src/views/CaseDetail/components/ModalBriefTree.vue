<template>
  <div>
    <a-modal title="案由" :visible="show" @ok="handleOk" @cancel="handleCancel">
      <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="onChange" />
      <a-tree :expanded-keys="expandedKeys" blockNode :auto-expand-parent="true" :tree-data="gData" @expand="onExpand">
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
import { list as mockList } from '@/mock/temp'

const dataList = []

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

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      gData: mockList
    }
  },
  methods: {
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onChange(e) {
      const value = e.target.value
      const expandedKeys = dataList.map(item => {
        if (item.title.indexOf(value) > -1) return getParentKey(item.key, this.gData)
        return null
      }).filter((item, i, self) => item && self.indexOf(item) === i)

      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      })
    },
    handleOk() {
      console.log('ok')
    },
    handleCancel() {
      this.$emit('close')
    }
  },
  mounted() {
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
    console.log(dataList)
    generateList(this.gData)
  }
}
</script>

<style>
</style>
