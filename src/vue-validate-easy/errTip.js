
var errOptions = {
  default: {
    insertAfter(newElement, targetElement) {
      var parent = targetElement.parentNode;
      // 如果最后的节点是目标元素，则直接添加
      if (parent.lastChild == targetElement) {
        parent.appendChild(newElement)
      } else {
        // 如果不是，则插入在目标元素的下一个兄弟节点 的前面
        parent.insertBefore(newElement, targetElement.nextSibling)
      }
    },
    show(err, el, errContent) {

      if (err) {
        // 如果有的 .succ__ 话，就清除
        el.className = el.className.replace(' succ__', '')

        // 如果有的 .err__ 话，不重复添加
        if (el.className.indexOf('err__') == -1) {
          el.className = el.className + ' err__'
        }
        // 如果用户预先写了.err_msg元素 或者 已经在元素的子元素尾部添加了.err__msg元素，那么久不在添加新的元素
        var errMsgEl = el.querySelector('.err__msg')
        if (errMsgEl) {
          errMsgEl.textContent = errContent
        } else {
          // 首次创建错误元素
          var errMsgEl = document.createElement('span')
          errMsgEl.className = 'err__msg'
          errMsgEl.textContent = errContent
          el.appendChild(errMsgEl)
        }

      } else { // 验证成功
        var errMsgEl = el.querySelector('.err__msg')
        if(errMsgEl) errMsgEl.textContent =''
        if (el.className.indexOf('succ__') == -1) { // 防止重复添加
          el.className = el.className + ' succ__'
        }
      }
    },
    reset(el) {
        el.className = el.className.replace(' err__', '')
        el.className = el.className.replace(' succ__', '')
        var errMsgEl = el.querySelector('.err__msg')
        if(errMsgEl) errMsgEl.textContent =''
    }
  }
}

export default {
  getErrorOption(errOptionName) {
    return errOptions[errOptionName ? errOptionName : 'default']
  },
  resetErrorTip(scope) {
    var formEles = document.querySelectorAll(`[data-scope=${scope}]`)
    for (var i = 0; i < formEles.length; i++) {
      var el = formEles[i]
      this.resetSingleErrorTip(el)
    }
  },
  resetSingleErrorTip(el) {

    var errOptionName = el.getAttribute('data-error-option')
    var errOption = errOptions[errOptionName ? errOptionName : 'default']
    if (!errOption) throw `没有这个名为${errOptionName}错误处理方法`

    errOption.reset && errOption.reset(el)
  },

  /**
  * 新增错误处理方法
  *
  * @param {any} errOptionName
  * @param {any} option {show(){}, reset(){}}
  */
  addErrorOption(errOptionName, option) { // 通过传入参数指定，哪种错误类型
    errOptions[errOptionName] = option
  },
}
