import App from './App'

import { PagesManage } from "@/utils/server/Api.js"
import { SetUsrData,InitAI } from "@/utils/SetData.js"

import Vue from 'vue'
import './uni.promisify.adaptor'
import store from './store/index'
import '@/static/iconfont/iconfont.css'

Vue.config.productionTip = false

const toast = (title, icon) => {
	uni.showToast({
		title,
		icon,
		duration: 2000
	})
}
Vue.prototype.$toast = toast

//请求页面管理
PagesManage().then(res => {
	console.log("配置文件：", res.data)
	store.commit('BaseConfig/pagesDisplay', res.data.page)
	if (res.data.preLogin) {
		console.log("预登录处理");
		uni.clearStorageSync()
		uni.setStorageSync('isLogin', res.data.preLogin)
		SetUsrData({
			head_url: ""
		})
		let ai_data = {
			"APISecret": res.data.APISecret,
			"APIKey": res.data.APIKey,
			"APPID": res.data.APPID
		}
		InitAI(ai_data)
		uni.reLaunch({
			url: "/pages/chat/chat"
		})
	}
})


App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()