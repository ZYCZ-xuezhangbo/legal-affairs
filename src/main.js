import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import VueI18n from 'vue-i18n'
import locales from '@/locales/index'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { Icon } from 'ant-design-vue'
// 表单设计器
import KFormDesign from './components/KFormDesign/packages'
import './components/KFormDesign/styles/form-design.less'
// import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission'
import './utils/filter'
import './global.less'

// 自定义字体文件
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1957392_fuhqlam5lqk.js'
})

const uploadFileUrl = `${process.env.VUE_APP_API_BASE_URL}/file/upload`

// 表单设计器配置
KFormDesign.setConfig({
  uploadFile: uploadFileUrl, // 上传文件地址
  uploadImage: uploadFileUrl // 上传图片地址
})
Vue.prototype.$uploadFileUrl = uploadFileUrl

Vue.config.productionTip = false

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
Vue.use(VueI18n)
Vue.use(KFormDesign)
Vue.component('pro-layout', ProLayout)
Vue.component('page-header-wrapper', PageHeaderWrapper)
Vue.component('icon-font', IconFont)

const i18n = new VueI18n({
  silentTranslationWarn: true,
  messages: locales.messages,
  locale: 'CN',
  fallbackLocale: 'US'
})

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
