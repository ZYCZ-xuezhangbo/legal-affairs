<template>
  <div :class="wrpCls">
    <a-tooltip placement="bottomRight" title="站内信">
      <mail-icon :class="prefixCls" />
    </a-tooltip>
    <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" />
  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
import MailIcon from './Mail'

export default {
  name: 'RightContent',
  components: {
    AvatarDropdown,
    MailIcon
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      visible: false,
      showMenu: true
    }
  },
  computed: {
    wrpCls() {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
      }
    },
    currentUser() {
      return {
        name: this.$store.state.user.info.userName
      }
    }
  }
}
</script>
