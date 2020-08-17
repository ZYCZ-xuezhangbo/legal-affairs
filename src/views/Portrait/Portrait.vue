<template>
  <page-header-wrapper>
    <a-card :bordered="false" class="text-center">
      <div class="text-center">
        <div class="title">天津港（集团）有限公司/法律事务部</div>
      </div>
      <a-row :gutter="68" type="flex" justify="center">
        <a-col v-bind="span" class="text-center" v-for="(item,index) in 4" :key="index">
          <a-avatar :size="164" icon="user" />
          <div class="name">name</div>
        </a-col>
      </a-row>
    </a-card>
  </page-header-wrapper>
</template>

<script>
export default {
  data() {
    return {
      span: {
        md: 24,
        lg: 12
      }
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  display: inline-block;
  font-size: 18px;
  border-radius: 50px;
  background-color: #0fa3e9;
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  color: white;
  margin-bottom: 50px;
}
.name {
  margin-top: 8px;
  margin-bottom: 40px;
  font-size: 16px;
  word-wrap: break-word;
}
</style>
