export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome() {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader(callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () { }
  window.addEventListener('scroll', event => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      let direction = 'up'
      const afterScrollTop = window.pageYOffset
      const delta = afterScrollTop - beforeScrollTop
      if (delta === 0) return false

      direction = delta > 0 ? 'down' : 'up'
      callback(direction)
      beforeScrollTop = afterScrollTop
    }, 50)
  },
    false
  )
}

export function isIE() {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') return
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

// 将同级数据转化为树形结构
export function listToTree(list) {
  const temp = {}
  const tree = {}
  for (const i in list) {
    temp[list[i].id] = list[i]
  }
  for (const i in temp) {
    const pId = temp[i].pId

    if (pId) {
      if (!temp[pId].children) {
        temp[pId].children = {}
      }
      temp[pId].children[temp[i].id] = temp[i]
    } else {
      tree[temp[i].id] = temp[i]
    }
  }
  return tree
}

/**
 * 保存 blob
 * filename 想要保存的文件名称
 */
export function saveAs(blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename)
  } else {
    const link = document.createElement('a')
    const body = document.querySelector('body')
    link.href = window.URL.createObjectURL(blob)
    link.download = filename

    // fix Firefox
    link.style.display = 'none'
    body.appendChild(link)

    link.click()
    body.removeChild(link)

    window.URL.revokeObjectURL(link.href)
  }
}

/**
 * 下载文件
 * @param {string} downloadType
 * @param {string} url
 * @param {string} fileName
 */
export function downloadFile(url, fileName, downloadType = 'ajax') {
  return new Promise((resolve, reject) => {
    if (downloadType === 'a') {
      // 使用a标签下载
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      a.target = '_blank'
      a.click()
      resolve()
    } else if (downloadType === 'ajax') {
      // 使用ajax获取文件blob，并保持到本地
      getBlob(url).then(blob => {
        saveAs(blob, fileName)
        resolve()
      }).catch((e) => {
        reject(new Error(e))
      })
    } else {
      reject(new Error('downloadType error'))
    }
  })
}

/**
 * 获取 blob
 * url 目标文件地址
 */
function getBlob(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onload = (e) => {
      if (xhr.status === 200 || String(xhr.status).substring(0, 1) === '2') {
        resolve(xhr.response)
      } else {
        reject(new Error(xhr.response))
      }
    }
    xhr.onerror = (e) => {
      reject(new Error(e))
    }
    xhr.send()
  })
}
