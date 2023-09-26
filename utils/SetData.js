import store from "@/store/index.js"
// 设置本地存储数据


export const Setnk = (token) => {
	// store.commit('UserData/setToken', token)
	// uni.setStorageSync('token', "Bearer " + token);
	uni.setStorageSync('token',token);
	uni.setStorageSync('isLogin',true);
}

export const SetUsrData = (data) =>{
	if(data.head_url === "") data.head_url = "/static/avatar.png"
	uni.setStorageSync('userData',JSON.stringify(data))
}

export const InitAI = ()=>{
	let data = {
		"APISecret":"MWQwMTRkOTZhYWEzNTkyNjcwM2JiMDU2",
		"APIKey":"f2183557703eff19090af8215ed82cf0",
		"APPID":"dc46af5c"
	}
	uni.setStorageSync('AIConfig',JSON.stringify(data))
}