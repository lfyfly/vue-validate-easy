// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// var Promise = require('es6-promise').Promise;

// // To add to window
// if (!window.Promise) {
//     window.Promise = Promise
// }


import Promise from 'promise-polyfill'
// To add to window
if (!window.Promise) {
  window.Promise = Promise
}
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import validators from './my-validators/validators'
import vueValidateEasy from './vue-validate-easy'
Vue.use(vueValidateEasy,{validators})




/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
