import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress'
import '@/components/NProgress/nprogress.less'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'

NProgress.configure({ showSpinner: true })

const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist
const loginRoutePath = '/user/login'
const defaultRoutePath = '/analysis'

router.beforeEach((to, from, next) => {
  NProgress.start()
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(` ${domTitle}`))

  if (storage.get(ACCESS_TOKEN)) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      if (store.getters.permissions.length === 0) {
        store.dispatch('GetUserInfo').then(permissions => {
          store.dispatch('GenerateRoutes', permissions).then(() => {
            router.addRoutes(store.getters.addRouters)
            // 请求带有 redirect 重定向时，登录自动重定向到该地址
            const redirect = decodeURIComponent(from.query.redirect || to.path)

            if (to.path === redirect) {
              // 设置replace:true，这样导航就不会留下历史记录
              next({ ...to, replace: true })
            } else {
              next({ path: redirect })
            }
          })
        }).catch((res) => {
          console.error(res)
          // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
          store.dispatch('Logout').then(() => {
            // next({ path: loginRoutePath, query: { redirect: to.fullPath } })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
