import store from "@/store/index.js"

export const GetToken = () => {
	return uni.getStorageSync('token');
}

export const GetUsrData = (data) =>{
	const userdata = uni.getStorageSync('userData')
	if(userdata) return JSON.parse(userdata)
	else return {"updatedAt":"1970-01-01 00:00:00","name":"未登录","head_url":"","blurb":"未登录","birthday":"1970-01-01"}
}