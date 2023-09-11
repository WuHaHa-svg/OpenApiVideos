<template>
	<!-- “壁纸” -->
	<view class="content">
		<!-- 顶部导航栏 -->
		<WallPaperNav @getTag="getTag"></WallPaperNav>
		<view class="container">
			<!-- 展示壁纸布局，phone类型对应竖屏壁纸，用不同的类展示不同的效果，y-card：竖屏壁纸布局，x-card：横屏壁纸布局-->
			<view v-for="(item,index) in imgList" :key="index" :class="currentTagName==='phone'?'y-card':'x-card'">
				<!-- <meta name="referrer" content="no-referrer" /> -->
				<image class="img" :src="item.url" :lazy-load="true" mode="aspectFill" @tap="showImg(item.url)"></image>
			</view>
		</view>
		<!-- 	<view v-if="show" class="downLoad">
			下载
		</view> -->
		<BackTop :TopBtn="TopBtn"></BackTop>
		<TabBar></TabBar>
	</view>
</template>

<script>
	import WallPaperNav from "@/components/WallPaperNav.vue"
	import TabBar from "@/components/TabBar.vue"
	import BackTop from "@/components/BackTop.vue"
	import {
		WallPaperApi
	} from "@/utils/server/Api"
	export default {
		components: {
			WallPaperNav,
			TabBar,
			BackTop
		},
		data() {
			return {
				currentTagName: "--",
				page: 1,
				imgList: [],
				show: true,
				TopBtn: false
			}
		},
		onShow() {
			// 展示页面时加载数据
			this.getImgList('show')
		},
		// 监听页面滚动,展示BackTop组件
		onPageScroll(e) {
			if (e.scrollTop >= 600) {
				this.TopBtn = true
			} else {
				this.TopBtn = false
			}
		},
		// 滚动到底部,加载新一页数据
		onReachBottom() {
			this.page += 1
			this.getImgList('bottom')
		},
		computed: {
			top() {
				return this.$store.state.BaseConfig.top + 'px'
			}
		},
		methods: {
			// 切换类别时,需要先把页面滚动到顶部
			toTop() {
				uni.pageScrollTo({
					scrollTop: 0, // 滚动到页面的目标位置  这个是滚动到顶部, 0 
					duration: 300 // 滚动动画的时长
				})
			},
			showImg(url) {
				// let urlList = this.imgList.map((item) => {
				// 	return item.url
				// })
				// console.log(typeof url)
				let urls = [url]
				uni.previewImage({
					current: 0,
					urls
				})
			},
			// 加载图片url数据
			async getImgList(reqType) {
				// 不同的类别
				let type = this.currentTagName === '--' ? '' : this.currentTagName
				let data = {
					type,
					page: this.page,
					size: 18
				}
				console.log("请求数据：", data)
				let res = await WallPaperApi(data)
				// return res.data.result.list
				// 首次加载,直接替换this.imgList
				if (reqType === 'show') {
					this.imgList = res.data.result.list
					return
				}
				// 滑动到底部,this.imgList后面追加
				if (reqType === 'bottom') {
					this.imgList = [...this.imgList, ...res.data.result.list]
					return
				}
				// 切换类别,先滚动页面,再替换this.imgList
				if (reqType === 'change') {
					this.imgList = []
					this.imgList = res.data.result.list
					console.log(this.imgList)

				}
			},
			// 让顶部导航子组件知道目前的tag名
			getTag(tagName) {
				this.currentTagName = tagName
			}
		},
		watch: {
			currentTagName: {
				immediate: false,
				handler(newV, oldV) {
					this.page = 1
					this.getImgList('change')
					this.toTop()
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		width: 100%;
		color: aliceblue;

		.container {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			padding-top: 190rpx;
			padding-bottom: 100px;

			.x-card {
				width: 320rpx;
				height: 175rpx;
				box-sizing: border-box;
				font-size: 30px;
				text-align: center;
				line-height: 175rpx;
				border-radius: 8px;
				border: 1px solid #AAA;
				margin-bottom: 10px;

				.img {
					height: 100%;
					width: 100%;
				}
			}

			.y-card {
				height: 320rpx;
				width: 200rpx;
				box-sizing: border-box;
				font-size: 30px;
				text-align: center;
				line-height: 320rpx;
				border-radius: 8px;
				border: 1px solid #AAA;
				margin-bottom: 10px;

				.img {
					height: 100%;
					width: 100%;
				}
			}
		}

	}
</style>