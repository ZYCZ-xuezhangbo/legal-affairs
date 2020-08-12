<template>
  <div>
    <a-card>
      <a-row type="flex" align="bottom">
        <a-col v-for="(item,index) in values" :key="index">
          <span class="value">{{ item.value }}</span>
          <span class="suffix">{{ item.suffix }}</span>
        </a-col>
      </a-row>
      <div class="title"> {{ title }} </div>
    </a-card>
  </div>
</template>

<script>
export default {
  props: {
    values: {
      type: Array,
      default() {
        return [{
          value: 0,
          suffix: '件'
        }]
      }
    },
    title: {
      type: String,
      default: 'title'
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  margin-top: 4px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.45);
}
.value {
  font-size: 32px;
  margin-right: 5px;
}
.suffix {
  font-size: 14px;
  margin-right: 8px;
}
</style>
