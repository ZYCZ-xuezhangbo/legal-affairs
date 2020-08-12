import { isIE } from '@/utils/util'

if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
  if (isIE()) console.error('[antd-pro] ERROR: mockjs不支持IE，请不要在production ENV中使用。')

  // 使用同步加载依赖 防止 vuex 中的 GetUserInfo 早于 mock 运行，导致无法 mock 请求返回结果
  console.log('[antd-pro] mock mounting')

  const Mock = require('mockjs2')
  require('./services/login')
  require('./services/user')

  Mock.setup({ timeout: 800 })

  console.log('[antd-pro] mock mounted')
}
