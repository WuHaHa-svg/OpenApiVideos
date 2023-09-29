<script>
	export default {
		onLaunch() {
			console.log('App Launch')
			if (uni.getSystemInfoSync().osName === "windows"){
				this.$store.commit('BaseConfig/setTop', 54)
			} else{
				this.$store.commit('BaseConfig/setTop', uni.getSystemInfoSync().safeArea.top)
			}
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