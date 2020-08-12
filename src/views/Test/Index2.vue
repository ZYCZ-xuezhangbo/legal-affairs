<template>
  <a-tree-select v-model="value" style="width: 100%" treeDataSimpleMode show-search treeNodeFilterProp="label" :tree-data="data" placeholder="Please select" tree-default-expand-all @select="handleSelect"> </a-tree-select>
</template>

<script>
export default {
  data() {
    return {
      value: undefined,
      data: [
        {
          id: 1,
          pId: 0,
          value: '1',
          label: 'test1'
        },
        {
          id: 2,
          pId: 1,
          value: '2',
          label: 'test2'
        },
        {
          id: 3,
          pId: 2,
          value: '3',
          label: 'test3'
        },
        {
          id: 4,
          pId: 1,
          value: '4',
          label: 'test4'
        },
        {
          id: 5,
          pId: 0,
          value: '5',
          label: 'test5'
        }
      ]
    }
  },
  watch: {
    value(value) {
      // console.log(value)
    }
  },
  methods: {
    handleSelect(e) {
      console.log(e)
    }
  },
  mounted() {
    const url = 'user/use1rLogin'
    const whiteList = ['userLogin', 'getLogout']

    const b = whiteList.some(v => url.indexOf(v) > -1)
    console.log(b)
  }
}
</script>
