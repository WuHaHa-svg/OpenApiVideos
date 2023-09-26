import store from "@/store/index.js"
// 从本地存储获取数据


export const GetToken = () => {
	return uni.getStorageSync('token');
}

export const GetUsrData = (data) =>{
	const userdata = uni.getStorageSync('userData')
	if(userdata) return JSON.parse(userdata)
	else return {"updatedAt":"1970-01-01 00:00:00","name":"未登录","head_url":"","blurb":"未登录","birthday":"1970-01-01"}
}

export const GetAIConfig = ()=>{
	let data = uni.getStorageSync('AIConfig')
	return JSON.parse(data)
}

export const GetAIMsgs = ()=>{
	let data = uni.getStorageSync('AIMsgs')
	if (data) return JSON.parse(data)
	return []
}