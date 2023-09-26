<script>
	import { PagesManage } from "@/utils/server/Api.js"
	export default {
		onLaunch: async function() {
			console.log('App Launch')
			if (uni.getSystemInfoSync().osName === "windows"){
				this.$store.commit('BaseConfig/setTop', 54)
			} else{
				this.$store.commit('BaseConfig/setTop', uni.getSystemInfoSync().safeArea.top)
			}
			
			let res = await PagesManage()
			console.log("配置文件：",res);
			this.$store.commit('BaseConfig/pagesDisplay',res.data)
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