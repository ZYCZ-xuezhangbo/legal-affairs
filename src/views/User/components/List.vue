<template>
  <a-card :bordered="false" :title="title" class="margin-top-lg">
    <a-table v-bind="tableModal" :loading="loading" :columns="columnList" :data-source="list" :pagination="false" :row-key="e => e.id">
      <template #action="item">
        <span v-if="actList.length>0">
          <span v-for="(v,k) in actList" :key="k">
            <a @click="handleClick(v.code,item)">{{ v.text }}</a>
            <a-divider v-if="k < actList.length-1" type="vertical" />
          </span>
        </span>
      </template>
      <template #roleMsgList="list">
        <a-tag v-for="(item,index) in list" :key="index" class="margin-tb-sm">{{ item }}</a-tag>
      </template>
    </a-table>
    <Pagination :page-num="pagination.pageNum" :page-size="pagination.pageSize" :total="pagination.pageTotal" @change="handlePageNumChange" @sizeChange="handlePageSizeChange" />
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
