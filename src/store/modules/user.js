import storage from 'store'
import { getInfo, logout } from '@/api/user'
import { login } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const user = {
  state: {
    token: '',
    info: {},
    roles: [],
    permissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    // 登录
    Login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        login({ username, password }).then(res => {
          if (res.data && res.data.token) {
            storage.set(ACCESS_TOKEN, res.data.token, 7 * 24 * 60 * 60 * 1000) // 7天
            commit('SET_TOKEN', res.data.token)
            resolve()
          } else {
            reject(new Error('[api] token不存在'))
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        // 跟权限无关的基础路由，默认加载
        const basicsRoute = [
          { permissionId: '/', permissionName: 'root' },
          { permissionId: '/case/caseDetail', permissionName: 'case detail' },
          { permissionId: '/case/caseDetail/:id/:fId', permissionName: 'case detail' },
          { permissionId: '/500', permissionName: 'page 500' },
          { permissionId: '*', permissionName: 'page not found' }
        ]
        if (process.env.NODE_ENV === 'development') basicsRoute.push({ permissionId: '/test', permissionName: 'Test' })
        commit('SET_PERMISSIONS', basicsRoute)

        getInfo().then(response => {
          const result = response.data
          // 根据permission权限动态生成路由
          if (result.userMenu && result.userMenu.length > 0) {
            let permissions = result.userMenu.map(v => ({ permissionId: v.permission, permissionName: v.name }))

            permissions = [...basicsRoute, ...permissions]
            commit('SET_PERMISSIONS', permissions)
            resolve(permissions)
          } else {
            reject(new Error('getUserInfo: userMenu必须是一个不为空的数组 !'))
          }

          commit('SET_ROLES', result.userRole)
          commit('SET_INFO', result.userInfo)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    Logout({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_PERMISSIONS', [])
        storage.remove(ACCESS_TOKEN)
        resolve()
      })
    },
    LogoutByApi({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then((res) => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_PERMISSIONS', [])
          storage.remove(ACCESS_TOKEN)
        })
      })
    }
  }
}

export default user
