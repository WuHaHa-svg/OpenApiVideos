<template>
	<view class="nav-bgc" :style="{height:top}"></view>
</template>

<script>
	export default {
		name:"SystemHeight",
		data() {
			return {};
		},
		computed:{
			top(){
				return this.$store.state.BaseConfig.top + 'px'
			}
		}
	}
</script>

<style lang="less" scoped>
		.nav-bgc{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 9998;
			backdrop-filter: blur(30px);
		}
</style>