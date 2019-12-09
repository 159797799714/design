import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import '@/assets/style/common.scss'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Vue.prototype.$store = store
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

