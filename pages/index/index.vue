<template>
	<view class="content">
		<!-- 顶部导航栏 -->
		<IndexNav left="推介" right="列表"></IndexNav>
		<!-- swiper视频列表 -->
		<VideoList ref="VideoList"></VideoList>
		<!-- 底部导航栏 -->
		<TabBar></TabBar>
	</view>
</template>

<script>
	import TabBar from "@/components/TabBar.vue"
	import IndexNav from "@/components/IndexNav.vue"
	import VideoList from "@/components/VideoList.vue"
	export default {
		data() {
			return {
			}
		},
		created() {
			console.log("艘页");
		},
		components:{TabBar,IndexNav,VideoList},
	}
</script>

<style lang="less" scoped>
	.content {
		height: 100%;
		width: 100%;
		.swiper-box{
			height: 100%;
			width: 100%;
			.swiper{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
