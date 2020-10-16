<template>
  <a-card :bordered="false" :title="title" class="margin-top-lg">
    <template v-if="showExtra" #extra>
      <button-add v-if="extraIsShow(ADD)" @click="handleShowAdd" />
      <button-export v-if="extraIsShow(EXPORT)" :loading="exportLoading" @click="handleExport" />
    </template>
    <a-table v-bind="tableModal" :loading="loading" :columns="columnList" :data-source="list" :pagination="false" :row-key="e => e.id">
      <template #action="item">
        <PageListActions :list="actList" @click="handleClick($event,item)" />
      </template>
    </a-table>
    <Pagination :page-num.sync="pagination.pageNum" :page-size="pagination.pageSize" :total="pagination.pageTotal" @change="handlePageNumChange" @sizeChange="handlePageSizeChange" />
  </a-card>
</template>

<script>
import { pageListMixin } from '@/mixin/pageList-mixin'

export default {
  mixins: [pageListMixin]
}
</script>

<style lang="less" scoped>
/deep/ .ant-btn + .ant-btn {
  margin-left: 8px;
}
</style>
