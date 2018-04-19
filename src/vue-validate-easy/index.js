
import validate from './validate'
import validateAll from './validateAll'
import validatorStore from './validatorStore'
import errTip from './errTip'

import formElements from './formElements'

var vueValidateEasy = {}
vueValidateEasy.install = function (Vue, options) {
  // 批量加载验证方法
  if (options && options.validators) {
    for (name in options.validators) {
      validatorStore.addValidator(name, options.validators[name])
    }
  }

  Vue.directive('validate-easy', {
    inserted(directiveEl, binding, vnode) {
      // 判断v-validate-easy data-scope data-name data-type


      var scope = directiveEl.getAttribute('data-scope')
      var name = directiveEl.getAttribute('data-name')
      var type = directiveEl.getAttribute('data-type')

      // 参数的检测，报错提醒
      if (!scope || !name || !type) {
        console.log('错误元素：', directiveEl)
      }
      if (!scope) throw '使用v-validate-easy指令的元素缺少必要属性data-scope'
      if (!name) throw '使用v-validate-easy指令的元素缺少必要属性data-name'
      if (!type) throw '使用v-validate-easy指令的元素缺少必要属性data-type'

      if (binding.value) {
        if (!(binding.value instanceof Array)) {
          console.log('错误元素：', directiveEl)
          throw '使用v-validate-easy指令的值应是一个数组'
        }

        binding.value.forEach(validator => {
          if (!(validator instanceof Array)) {
            console.log('错误元素：', directiveEl)
            throw '使用v-validate-easy指令值的子元素应是一个数组'
          }
          if (!validator[0]) {
            console.log('错误元素：', directiveEl)
            throw '使用v-validate-easy指令值中验证方法名不能缺失'
          }
        })
      }


      // 当指令元素被从Dom中移除时，这些同时会被销毁，不占用内存
      directiveEl.scope_ = scope
      directiveEl.name_ = name
      directiveEl.type_ = type

      // 无需验证参数，使用该指令只是为了提取值
      directiveEl.binding = binding
      if (!binding.value) return


      // 绑定事件触发验证
      formElements.bindEvent(directiveEl)

    }
  })
  Vue.prototype.V = {}

  Vue.prototype.V.$validateSingle = async function (directiveEl, value) {
    return await validate(directiveEl, value)
  }
  Vue.prototype.V.$validateAll = async function (scope) {
    return await validateAll(scope)
  }
  Vue.prototype.V.$submit = async function (scope, cb) {
    var { canSumit, data, errData } = await validateAll(scope)
    cb && cb(canSumit, data, errData)
  }
  Vue.prototype.V.$reset = function (scope) {
    errTip.resetErrorTip(scope)
    formElements.resetValue(scope)
  },

    Vue.prototype.V.$resetSingle = function (directiveEl) {

      errTip.resetSingleErrorTip(directiveEl)
      formElements.resetSingleValue(directiveEl)
    },
    /**
     * 新增验证方法
     *
     * @param {String|Object} param
     * String类型时，为方法名，此时第二个参数是必须的
     * Object类型时，为批量新增验证方法，此时第二参数不需要传
     * @param {function} validator
     */
    Vue.prototype.V.$addValidateMethod = function (param, validator) {
      if ((typeof param).toLowerCase() == 'object') { // name代表合并一个对象 {a(){},b(){}}
        for (name in param) {
          validatorStore.addValidator(name, param[name])
        }
      } else {
        validatorStore.addValidator(param, validator)
      }
    }

  Vue.prototype.V.$addErrorOption = function (errOptionName, option) { // {show,remove}
    errTip.addErrorOption(errOptionName, option)
  }
}
export default vueValidateEasy
