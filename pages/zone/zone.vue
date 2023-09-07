<template>
	<view class="content">
		<IndexNav left="全部动态" right="发个动态"></IndexNav>
		<view class="dimc-list">
			<DynamicList dataType="all" :pageNum="page"></DynamicList>
		</view>
		<BackTop :TopBtn="TopBtn"></BackTop>
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
		onPageScroll(e) {
			if (e.scrollTop >= 600) {
				this.TopBtn = true
			} else {
				this.TopBtn = false
			}
		},
		onReachBottom() {
			this.page += 1
		},
		methods: {

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