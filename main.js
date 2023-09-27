import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import store from './store/index'
import '@/static/iconfont/iconfont.css'

Vue.config.productionTip = false

const toast = (title,icon)=>{
	uni.showToast({
		title,
		icon,
		duration:2000
	})
}

Vue.prototype.$toast = toast


App.mpType = 'app'
const app = new Vue({
  ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif