<template>
  <div>
    <k-form-design title="表单设计器" :toolbars="toolbars" :fields="fields" :show-head="false" showToolbarsText />
  </div>
</template>

<script>
export default {
  data() {
    return {
      toolbars: [
        'preview',
        'importJson',
        'exportJson',
        'exportCode',
        'reset',
        'close'
      ],
      fields: [
        'input',
        'textarea',
        'number',
        'select',
        'checkbox',
        'radio',
        'date',
        'time',
        'rate',
        'uploadFile',
        'uploadImg',
        'editor',
        'switch',
        'alert',
        'text',
        'divider',
        'card',
        'grid'
      ]
    }
  }
}
</script>

<style>
</style>
