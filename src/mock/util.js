const responseBody = {
  status: 0,
  code: '',
  msg: '',
  ctime: 0,
  requestID: null,
  data: null
}

export const builder = (data, message, code = 'M0000', status = 200, headers = {}) => {
  responseBody.data = data
  if (message !== undefined && message !== null) {
    responseBody.msg = `[mock] ${message}`
  }
  if (code !== undefined && code !== '') {
    responseBody.code = code
    responseBody.status = status
    responseBody._status = status
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = headers
  }
  responseBody.ctime = new Date().getTime()
  return responseBody
}

export const getQueryParameters = (options) => {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') + '"}')
}

export const getBody = (options) => {
  return options.body && JSON.parse(options.body)
}
