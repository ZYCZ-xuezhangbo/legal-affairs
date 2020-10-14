import { asyncRouterMap, constantRouterMap } from '@/config/router.config'
import deepClone from '@/utils/deepClone'

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission(permissions, route) {
  if (route.path) {
    let flag = false
    for (let i = 0, len = permissions.length; i < len; i++) {
      flag = route.path.trim() === permissions[i].permissionId.trim()
      if (flag) return true
    }
    return false
  }
  return true
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 * --------这个方法应该是不对的------
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

/**
 *
 * @param {Array} routerMap
 * @param {Array} permissions
 */
function filterAsyncRouter(routerMap, permissions) {
  return routerMap.filter(route => {
    if (hasPermission(permissions, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, permissions)
      }
      return true
    }
    return false
  })
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, permissions) {
      return new Promise(resolve => {
        const routers = deepClone(asyncRouterMap) // 深拷贝，切换账号时，需要重新使用初始化的路由文件来筛选
        const accessedRouters = filterAsyncRouter(routers, permissions)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
