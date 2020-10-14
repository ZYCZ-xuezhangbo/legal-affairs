import test from './test'

const required = { required: true, message: '必填项', trigger: ['change', 'blur'] }

const max30Str = { max: 30, message: '最大长度30位', trigger: ['change', 'blur'] }

const requiredOfArray = {
  type: 'array',
  required: true,
  message: '至少选择一项',
  trigger: 'change'
}

const max20Num = {
  validator: (rule, value, callback) => {
    if (test.rangeLength(String(value), [0, 20])) callback()
    else callback(new Error('最大长度20位'))
  },
  trigger: 'blur'
}
const min0Num = {
  validator: (rule, value, callback) => {
    if (value > 0) callback()
    else callback(new Error('必须大于0'))
  },
  trigger: 'blur'
}

const phone = {
  validator: (rule, value, callback) => {
    if (!value || value === '') {
      callback()
    } else {
      if (test.mobile(value)) callback()
      else callback(new Error('手机号格式不正确'))
    }
  },
  trigger: 'blur'
}

const landlineOrPhone = {
  validator: (rule, value, callback) => {
    if (!value || value === '') {
      callback()
    } else {
      if (test.mobile(value) || test.landline(value)) callback()
      else callback(new Error('联系电话格式不正确'))
    }
  },
  trigger: 'blur'
}

const money = {
  validator: (rule, value, callback) => {
    if (!value || value === '' || value === 0 || test.amount(value)) callback()
    else callback(new Error('金额格式错误'))
  },
  trigger: 'blur'
}

const chinese = {
  validator: (rule, value, callback) => {
    if (!value || value === '' || test.chinese(value)) callback()
    else callback(new Error('必须中文'))
  },
  trigger: 'blur'
}

export {
  requiredOfArray,
  required,
  max30Str,
  max20Num,
  min0Num,
  phone,
  money,
  chinese,
  landlineOrPhone
}
