import { UserLayout, BasicLayout } from '@/layouts'
import {
  anJian as anJianSvg,
  home as homeSvg,
  faWu as staffSvg,
  lvSuo as lvSuoSvg,
  huiQian as huiQianSvg,
  notice as noticeSvg,
  settings as settingsSvg
} from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'Index',
    component: BasicLayout,
    meta: { title: '主页' },
    redirect: '/analysis',
    children: [
      {
        path: '/analysis',
        name: 'Analysis',
        component: () => import('@/views/Home/Home'),
        meta: { title: '主页', icon: homeSvg, keepAlive: false, permission: [] }
      },
      // {
      //   path: '/formDesign',
      //   name: 'FormDesign',
      //   component: () => import('@/views/FormDesign/FormDesign'),
      //   meta: { title: '表单设计器', icon: designerSvg, keepAlive: false, permission: [] }
      // },
      {
        path: '/case',
        redirect: '/case/caseList',
        component: RouteView,
        meta: { title: '案件管理', keepAlive: true, icon: anJianSvg, permission: [] },
        children: [
          {
            path: '/case/caseList',
            name: 'CaseList',
            component: () => import('@/views/CaseList/CaseList'),
            meta: { title: '案件列表', hidden: false, keepAlive: true, permission: [] }
          },
          {
            path: '/case/caseDetail',
            name: 'CaseDetail',
            hidden: true,
            component: () => import('@/views/CaseDetail/CaseDetail'),
            meta: { title: '案件详情', hidden: true, permission: [] }
          },
          {
            path: '/case/caseEntry',
            name: 'CaseEntry',
            component: () => import('@/views/CaseEntry/CaseEntry'),
            meta: { title: '案件录入', keepAlive: false, permission: [] }
          },
          {
            path: '/case/caseStatistics',
            name: 'CaseStatistics',
            component: () => import('@/views/CaseStatistics/CaseStatistics'),
            meta: { title: '案件统计', keepAlive: false, permission: [] }
          },
          {
            path: '/case/caseCollect',
            name: 'CaseCollect',
            component: () => import('@/views/CaseCollect/CaseCollect'),
            meta: { title: '案件汇总表', keepAlive: false, permission: [] }
          }
        ]
      },
      {
        path: '/staff',
        name: 'Staff',
        redirect: '/staff/filledBy',
        component: RouteView,
        meta: { title: '内部法务人员', icon: staffSvg, keepAlive: false, permission: [] },
        children: [
          {
            path: '/staff/filledBy',
            name: 'FilledBy',
            component: () => import('@/views/FilledBy/FilledBy'),
            meta: { title: '填报人', hidden: false, keepAlive: false, permission: [] }
          },
          {
            path: '/staff/lawDept',
            name: 'LawDept',
            component: () => import('@/views/LawDept/LawDept'),
            meta: { title: '法律部门', keepAlive: false, permission: [] }
          },
          {
            path: '/staff/lawAdviser',
            name: 'LawAdviser',
            component: () => import('@/views/LawAdviser/LawAdviser'),
            meta: { title: '法律总顾问', keepAlive: false, permission: [] }
          },
          {
            path: '/staff/lawStaff',
            name: 'LawStaff',
            component: () => import('@/views/LawStaff/LawStaff'),
            meta: { title: '法务人员', keepAlive: false, permission: [] }
          },
          {
            path: '/propaganda/legalSystem',
            name: 'LegalSystem',
            component: () => import('@/views/LegalSystem/LegalSystem'),
            meta: { title: '法律制度', keepAlive: false, permission: [] }
          },
          {
            path: '/staff/Portrait',
            name: 'Portrait',
            component: () => import('@/views/Portrait/Portrait'),
            meta: { title: '法务画像', keepAlive: false, permission: [] }
          }
        ]
      },
      {
        path: '/lawFirm',
        name: 'LawFirm',
        redirect: '/lawFirm/work',
        component: RouteView,
        meta: { title: '外部律所律师管理', icon: lvSuoSvg, keepAlive: false, permission: [] },
        children: [
          {
            path: '/lawFirm/work',
            name: 'Work',
            component: () => import('@/views/LawFirmWork/LawFirmWork'),
            meta: { title: '律所服务', keepAlive: false, permission: [] }
          },
          {
            path: '/lawFirm/externalLawFirm',
            name: 'ExternalLawFirm',
            component: () => import('@/views/LawFirmExternal/LawFirmExternal'),
            meta: { title: '外部律所管理', keepAlive: false, permission: [] }
          },
          {
            path: '/lawFirm/externalLawyer',
            name: 'ExternalLawyer',
            component: () => import('@/views/LawyerExternal/LawyerExternal'),
            meta: { title: '外部律师管理', keepAlive: false, permission: [] }
          },
          {
            path: '/lawFirm/LawyerStatistics',
            name: 'lawyerStatistics',
            component: () => import('@/views/LawyerStatistics/LawyerStatistics'),
            meta: { title: '律所律师统计', keepAlive: false, permission: [] }
          }
        ]
      },
      {
        path: '/countersign',
        name: 'Countersign',
        redirect: '/countersign/countersign',
        component: RouteView,
        meta: { title: '一般事项会签管理', icon: huiQianSvg, keepAlive: false, permission: [] },
        children: [
          {
            path: '/countersign/countersign',
            name: 'CountersignList',
            component: () => import('@/views/Countersign/Countersign'),
            meta: { title: '一般事项会签', keepAlive: false, permission: [] }
          }
        ]
      },
      {
        path: '/propaganda',
        name: 'Propaganda',
        redirect: '/propaganda/workDynamic',
        component: RouteView,
        meta: { title: '普法宣传平台', icon: noticeSvg, keepAlive: false, permission: [] },
        children: [
          {
            path: '/propaganda/workDynamic',
            name: 'WorkDynamic',
            component: () => import('@/views/WorkDynamic/WorkDynamic'),
            meta: { title: '工作动态', keepAlive: false, permission: [] }
          },
          {
            path: '/propaganda/gzPolicy',
            name: 'GzPolicy',
            component: () => import('@/views/GzPolicy/GzPolicy'),
            meta: { title: '国资政策', keepAlive: false, permission: [] }
          },
          {
            path: '/propaganda/dataDownload',
            name: 'DataDownload',
            component: () => import('@/views/DataDownload/DataDownload'),
            meta: { title: '资料下载', keepAlive: false, permission: [] }
          },
          {
            path: '/propaganda/notice',
            name: 'Notice',
            component: () => import('@/views/Notice/Notice'),
            meta: { title: '公告', keepAlive: false, permission: [] }
          }
        ]
      },
      {
        path: '/settings',
        name: 'Settings',
        redirect: '/settings/user',
        component: RouteView,
        meta: { title: '系统管理', icon: settingsSvg, keepAlive: false, permission: [] },
        children: [
          {
            path: '/settings/user',
            name: 'User',
            component: () => import('@/views/User/User'),
            meta: { title: '用户列表', keepAlive: false, permission: [] }
          },
          {
            path: '/settings/role',
            name: 'Role',
            component: () => import('@/views/Role/Role'),
            meta: { title: '角色列表', keepAlive: false, permission: [] }
          },
          {
            path: '/settings/auth',
            name: 'Auth',
            component: () => import('@/views/Auth/Auth'),
            meta: { title: '权限列表', keepAlive: false, permission: [] }
          },
          {
            path: '/settings/dictList',
            name: 'DictList',
            component: () => import('@/views/DictList/DictList'),
            meta: { title: '字典列表', keepAlive: false, permission: [] }
          }
        ]
      },
      {
        path: '/500',
        name: 'Exception500',
        hidden: true,
        component: () => import('@/views/Exception/500')
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: '/user/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/Login/Login')
      }
    ]
  },
  {
    path: '/',
    component: BasicLayout,
    hidden: true,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import(/* webpackChunkName: "user" */ '@/views/Welcome/Welcome')
      },
      {
        path: '/403',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/Exception/403')
      },
      {
        path: '/404',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/Exception/404')
      }
    ]
  }
]
