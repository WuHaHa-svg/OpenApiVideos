<template>
	<!-- “动态” -->
	<view class="content">
		<!-- 顶部导航栏 -->
		<IndexNav left="全部动态" right="发个动态"></IndexNav>
		<!-- 动态列表 -->
		<view class="dimc-list">
			<DynamicList dataType="all" :pageNum="page"></DynamicList>
		</view>
		<!-- 返回顶部 -->
		<BackTop :TopBtn="TopBtn"></BackTop>
		<!-- 底部导航栏 -->
		<TabBar></TabBar>
	</view>
</template>

<script>
	import IndexNav from "@/components/IndexNav.vue"
	import DynamicList from "@/components/DynamicList.vue"
	import TabBar from "@/components/TabBar.vue"
	import BackTop from "@/components/BackTop.vue"
	
	export default {
		components: {
			IndexNav,
			DynamicList,
			BackTop,
			TabBar
		},
		data() {
			return {
				TopBtn: false,
				page:1
			}
		},
		// 是否展示BackTop
		onPageScroll(e) {
			if (e.scrollTop >= 600) {
				this.TopBtn = true
			} else {
				this.TopBtn = false
			}
		},
		// 页面到底部,加载新一页数据
		onReachBottom() {
			this.page += 1
		}
	}
</script>

<style lang="less" scoped>
	.content{
		// height: 100%;
		width: 100%;
		.dimc-list{
			box-sizing: border-box;
			// height: 100%;
			width: 100%;
			background-color: rgb(22, 24, 35);
			padding-top: 190rpx;
			padding-bottom: 80px;
		}
	}

</style>