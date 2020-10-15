<template>
  <a-card :bordered="false" :title="title" class="margin-top-lg">
    <a-table :columns="columns" :data-source="list" :loading="loading" :bordered="false" :pagination="false" :row-key="e=>e.companyName" />
  </a-card>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
