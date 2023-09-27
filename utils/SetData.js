import store from "@/store/index.js"
import { PagesManage } from "@/utils/server/Api.js"

// 设置本地存储数据


export const Setnk = (token) => {
	// store.commit('UserData/setToken', token)
	// uni.setStorageSync('token', "Bearer " + token);
	uni.setStorageSync('token', token);
	uni.setStorageSync('isLogin', true);
}

export const SetUsrData = (data) => {
	if (data.head_url === "") data.head_url = "/static/avatar.png"
	uni.setStorageSync('userData', JSON.stringify(data))
}

export const InitAI = async (data) => {
	uni.setStorageSync('AIConfig', JSON.stringify(data))
}

export const SetAI = (data) => {
	uni.setStorageSync('AIConfig', JSON.stringify(data))
}

export const SetAIMsgs = (data) => {
	uni.setStorageSync('AIMsgs', JSON.stringify(data))
}