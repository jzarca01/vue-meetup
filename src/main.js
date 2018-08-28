import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style.css'

import moment from "moment"
import VueMomentJS from "vue-momentjs"

import VueAnimateNumber from 'vue-animate-number'

import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';

import config from './config/config.json'

Vue.config.productionTip = false

Vue.use(VueMomentJS, moment)
Vue.use(VueAnimateNumber)
Vue.use(ElementUI)
Vue.use(VueAxios, axios, {
  adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter), { threshold: 2 * 1000 })
})
Vue.use(VueAuthenticate, {
  baseUrl: config.baseUrl,
  providers: {
    meetup: {
      clientId: config.clientId,
      redirectUri: config.redirectUrl,
      scope: ['basic', 'event_management', 'rsvp']
    }
  },
  bindRequestInterceptor: function () {
    this.$http.interceptors.request.use((config) => {
      config.params = {...config.params, provider: "meetup"}
      if (this.isAuthenticated()) {
        config.headers['Authorization'] = [
          this.options.tokenType, this.getToken()
        ].join(' ')
      } else {
        delete config.headers['Authorization']
      }
      return config
    })
  },

  bindResponseInterceptor: function () {
    this.$http.interceptors.response.use((response) => {
      this.setToken(response)
      return response
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
