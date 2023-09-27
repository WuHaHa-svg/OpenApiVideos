<script>
	import { PagesManage } from "@/utils/server/Api.js"
	import { SetUsrData,InitAI } from "@/utils/SetData.js"
	export default {
		onLaunch() {
			console.log('App Launch')
			if (uni.getSystemInfoSync().osName === "windows"){
				this.$store.commit('BaseConfig/setTop', 54)
			} else{
				this.$store.commit('BaseConfig/setTop', uni.getSystemInfoSync().safeArea.top)
			}
			
			//请求页面管理
			PagesManage().then(res=>{
				// console.log("配置文件：",res.data.page)
				// console.log("配置文件：",res.data.preLogin)
				this.$store.commit('BaseConfig/pagesDisplay',res.data.page)
				if(res.data.preLogin){
					console.log("预登录处理");
					SetUsrData({head_url:""})
					InitAI()
					uni.setStorageSync('isLogin',res.data.preLogin)
				}
			})
			
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
		height: 100%;
		width: 100%;
		background-color: rgb(22, 24, 35);
	}
</style>