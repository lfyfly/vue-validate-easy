import validate from './validate'
import formElements from './formElements';

export default async function (scope) {
  var canSumit = true // 是否验证通过
  var data = {}
  var errData = null
  var scopeInputs = document.querySelectorAll(`[data-scope=${scope}]`)
  if (scopeInputs.length == 0) throw `该scope(${scope})对应的表单不存在`

  for (let i = 0; i < scopeInputs.length; i++) {
    var key = scopeInputs[i].name_
    var validationParams = scopeInputs[i].binding.value

    // 只有指令参数的值才会被进行验证，否者只是提取值表单值进行提交
    if(validationParams) {
      var { err, value } = await validate(scopeInputs[i])
    }else{
      // 无需验证，直接取值
      var value = formElements.getValue(scopeInputs[i])
    }
    data[key] = value
    if (err) {
      // 验证通过返回 value
      canSumit = false
      if (!errData) errData = {}
      errData[key] = value
    }
  }
  return { canSumit, data, errData }
}
