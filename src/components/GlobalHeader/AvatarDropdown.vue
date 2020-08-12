<template>
  <a-dropdown v-if="currentUser && currentUser.name" placement="bottomRight">
    <span>
      <!-- 占位符，可以放头像  <a-avatar :size="64" icon="user" /> -->
      <span>{{ currentUser.name }}</span>
    </span>
    <template v-slot:overlay>
      <a-menu :selected-keys="[]">
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout" /> 退出登录 </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
import { Modal } from 'ant-design-vue'

export default {
  name: 'AvatarDropdown',
  props: {
    currentUser: {
      type: Object,
      default: () => null
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleToCenter() {
      // this.$router.push({ path: '/account/center' })
    },
    handleToSettings() {
      // this.$router.push({ path: '/account/settings' })
    },
    handleLogout(e) {
      Modal.confirm({
        title: '退出登录',
        content: '确定退出登录吗？',
        okText: '退出',
        cancelText: '取消',
        onOk: () => {
          return this.$store.dispatch('Logout')
        },
        onCancel() { }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
