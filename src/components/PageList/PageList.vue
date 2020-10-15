<template>
  <a-card :bordered="false" :title="title" class="margin-top-lg">
    <template v-if="showExtra" #extra>
      <button-add v-if="extraIsShow(ADD)" @click="handleShowAdd" />
      <button-export v-if="extraIsShow(EXPORT)" :loading="exportLoading" @click="handleExport" />
    </template>
    <a-table v-bind="tableModal" :loading="loading" :columns="columnList" :data-source="list" :pagination="false" :row-key="e => e.id">
      <template #action="item">
        <span v-if="actList.length>0">
          <span v-for="(v,k) in actList" :key="k">
            <a @click="handleClick(v.code,item)">{{ v.text }}</a>
            <a-divider v-if="k < actList.length-1" type="vertical" />
          </span>
        </span>
      </template>
    </a-table>
    <Pagination :page-num.sync="pagination.pageNum" :page-size="pagination.pageSize" :total="pagination.pageTotal" @change="handlePageNumChange" @sizeChange="handlePageSizeChange" />
  </a-card>
</template>

<script>
import pageListMixin from '@/mixin/pageList-mixin'

export default {
  mixins: [pageListMixin]
}
</script>

<style lang="less" scoped>
/deep/ .ant-btn + .ant-btn {
  margin-left: 8px;
}
</style>
