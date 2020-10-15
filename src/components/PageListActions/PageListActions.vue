<template>
  <span v-if="list.length>0">
    <span v-for="(v,k) in list" :key="k">
      <a @click="handleClick(v.code)">{{ v.text }}</a>
      <a-divider v-if="k < list.length-1" type="vertical" />
    </span>
  </span>
</template>

<script>
export default {
  name: 'PageListActions',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    handleClick(code) {
      this.$emit('click', code)
    }
  }
}
</script>

<style>
</style>
