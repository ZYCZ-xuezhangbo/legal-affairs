<template>
  <div>
    <a-descriptions>
      <a-descriptions-item label="发布公司">
        {{ releaseCompany }}
      </a-descriptions-item>
      <a-descriptions-item label="发布人">
        {{ releasePerson }}
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
export default {
  computed: {
    releaseCompany() {
      return '发布公司名称'
    },
    releasePerson() {
      return '发布人姓名'
    }
  }
}
</script>

<style>
</style>
