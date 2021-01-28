import Vue from 'vue'
import App from './App.vue'
import LikeHeader from './components/LikeHeader.vue'

Vue.component('LikeHeader', LikeHeader)
Vue.config.productionTip = false
new Vue({
  render: createElement => createElement(App)
}).$mount('#app')

