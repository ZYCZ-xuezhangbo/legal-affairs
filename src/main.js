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

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1957392_fuhqlam5lqk.js'
})

const uploadFileUrl = 'http://cdn.kcz66.com/uploadFile.txt'
const uploadImageUrl = 'http://cdn.kcz66.com/upload-img.txt'

// 表单设计器配置
KFormDesign.setConfig({
  uploadFile: uploadFileUrl, // 上传文件地址
  uploadImage: uploadImageUrl // 上传图片地址
})

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

Vue.prototype.$uploadFileUrl = process.env.NODE_ENV === 'production' ? '' : 'http://cdn.kcz66.com/uploadFile.txt'
Vue.prototype.$uploadImageUrl = process.env.NODE_ENV === 'production' ? '' : 'http://cdn.kcz66.com/upload-img.txt'

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
