const actions = {
  Detail: 'detail',
  Preview: 'preview',
  Edit: 'edit',
  Rate: 'rate',
  Download: 'download',
  Role: 'role',
  Auth: 'auth',
  Delete: 'delete',
  Add: 'add'
}

export const ACCESS_TOKEN = 'Access-Token'
export const SIDEBAR_TYPE = 'sidebar_type'
export const TOGGLE_MOBILE_TYPE = 'is_mobile'
export const TOGGLE_NAV_THEME = 'nav_theme'
export const TOGGLE_LAYOUT = 'layout'
export const TOGGLE_FIXED_HEADER = 'fixed_header'
export const TOGGLE_FIXED_SIDEBAR = 'fixed_sidebar'
export const TOGGLE_CONTENT_WIDTH = 'content_width'
export const TOGGLE_HIDE_HEADER = 'auto_hide_header'
export const TOGGLE_COLOR = 'color'
export const TOGGLE_WEAK = 'weak'
export const TOGGLE_MULTI_TAB = 'multi_tab'
export const APP_LANGUAGE = 'app_language'

/**
 * 响应码
 */
export const RESPONSE_CODE = {
  S0000: 'S0000',
  USER_NOT_LOGIN: 'ACCOUNT_004'
}

/**
 * 列表页的操作项
 */
export const ACTIONS = actions

/**
 * 列表页操作按钮排序
 */
export const ACTIONS_ORDER = valueToArrayFromObject(actions)

/**
 * 案件阶段
 */
export const CASE_STAGE = {
  一审: 'FIRST_INSTANCE', // 一审
  二审: 'SECOND_INSTANCE', // 二审
  执行: 'EXECUTE', // 执行
  再审: 'REVIEW_INSTANCE', // 再审
  仲裁: 'ARBITRATION', // 仲裁
  非诉: 'NOT_LAWSUIT', // 非诉
  终结: 'FINALITY' // 终结
}

export const CONTENT_WIDTH_TYPE = {
  Fluid: 'Fluid',
  Fixed: 'Fixed'
}

export const NAV_THEME = {
  LIGHT: 'light',
  DARK: 'dark'
}

function valueToArrayFromObject(obj) {
  const arr = []
  for (const i in obj) {
    arr.push(obj[i])
  }
  return arr
}
