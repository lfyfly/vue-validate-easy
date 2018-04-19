// validate function
import validatorStore from './validatorStore'
import errTip from './errTip'
import formElements from './formElements'

/**
 * 验证表单值方法
 *
 * @param {any} directiveEl 指令元素
 * @param {String} value 表单元素的值
 *
 * @return {err,value} err true说明验证错误，value为表单的值
 */
export default async function (directiveEl, value) {

  var err, errContent

  value = value ? value : formElements.getValue(directiveEl)


  var key = directiveEl.getAttribute('data-name')
  var validator = directiveEl.binding.value

  if (validator[0][0] != 'required') {
    if (validatorStore.getValidator('required')(value)) {
      return { err: false, value }
    }
  }

  for (var i = 0; i < validator.length; i++) {
    // 参数解析
    var validatorName = validator[i][0] // 当前验证方法
    var secondItem = validator[i][1]
    var args = []
    var errMsg // 当前验证的参数,错误消息
    if (secondItem instanceof Array) {
      args = secondItem
      errMsg = validator[i][2]
    } else {
      errMsg = validator[i][1]
    }
    // 验证失败
    var validateFn = validatorStore.getValidator(validatorName)
    var validateResult = await validateFn(value, ...args)

    if (validateResult) {
      err = true
      errContent = errMsg || errMsg === '' ? errMsg : validateResult
      break
    }

  }

  var errOptionName = directiveEl.getAttribute('data-error-option')
  var errOption = errTip.getErrorOption(errOptionName ? errOptionName : 'default')

  if (!errOption) throw `没有这个名为${errOptionName}错误处理(data-error-option)方法`
  errOption.show(err, directiveEl, errContent)

  return { err, value } // 验证通过返回value值

}
