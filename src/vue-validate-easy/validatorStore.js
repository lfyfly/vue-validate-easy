var validatorStore = {
  // 验证方法
  required(val) {
    if (JSON.stringify(val) == "[]" || (!val && val !== 0)) return '必填项不能为空'
  },
  maxLength(val, len) {
    if (val.length > len) return '长度不得超过' + len + '位'
  },
  minLength(val, len) {
    if (val.length < len) return '长度不得小于' + len + '位'
  },
  between(val, min, max) {
    if (val.length < min || val.length > max) return `输入长度必须在${min}位和${max}位之间`
  },
  equalTo(val, selector) { // 可以是目标input元素，或者指令元素
    var targetEl = document.querySelector(selector)
    var tagName = targetEl.tagName.toLocaleLowerCase()
    targetEl = tagName == 'input' ? targetEl : targetEl.querySelector('input')
    if (val != targetEl.value) return '与目标值不一致'
  },
  length(val, len) {
    if (len != val.length) return `长度必须为${len}位`
  },
  email(val) {
    var p = /^([\w\.\-]+)@([\w\.\-]+)\.([\w]{2,4})$/
    if (!p.test(val)) return '邮箱格式不正确'
  },
  number(val) {
    if (!/^\d+$/.test(val)) return '必须为数字'
  }
}

export default {
  getValidator(name) {
    if (!validatorStore[name]) throw `没有名${name}的验证方法`
    return validatorStore[name]
  },
  addValidator(name, validator) {
    validatorStore[name] = validator
  }
}
