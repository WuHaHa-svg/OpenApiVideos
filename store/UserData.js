export default {
	namespaced:true,
	state:{
		token:"",
		isLogin:false
	},
	mutations:{
		setToken(state,value){
			// console.log(value)
			state.token = "Bearer " + value
		},
		loginState(state,value){
			state.isLogin = value
		}
	},
	actions:{},
	getter:{}
}