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