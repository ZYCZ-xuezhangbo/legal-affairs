import Mock from 'mockjs2'
import { builder } from '../util'

const info = (options) => {
  const userInfo = {
    'userInfo': {
      'userName': '管理员',
      'phone': null,
      'email': null
    },
    'userMenu': [
      {
        'id': 11,
        'name': '首页',
        'permission': '/analysis',
        'type': 'PAGE'
      },
      {
        'id': 22,
        'name': '案件管理',
        'permission': '/case',
        'type': 'PAGE'
      },
      {
        'id': 23,
        'name': '案件管理',
        'permission': '/case/caseList',
        'type': 'PAGE'
      }
    ],
    'userRole': [
      {
        'id': 1111,
        'roleName': 'ADMIN',
        'roleMsg': '管理员'
      }
    ]
  }
  return builder(userInfo, '成功', 'M0000', 200)
}

const logout = () => {
  return builder({}, '注销成功')
}

Mock.mock(/\/user\/getMyUserInfo/, 'get', info)
Mock.mock(/\/user\/getLogout/, 'get', logout)
