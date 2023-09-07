<template>
	<view class="content">
		<WallPaperNav @getTag="getTag"></WallPaperNav>
		<view class="container">
			<view v-for="(item,index) in imgList" :key="index" :class="currentTagName==='phone'?'y-card':'x-card'">
				<meta name="referrer" content="no-referrer" />
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
			this.getImgList('show')
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
			this.getImgList('bottom')
		},
		computed: {
			top() {
				return this.$store.state.BaseConfig.top + 'px'
			}
		},
		methods: {
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
			async getImgList(reqType) {
				let type = this.currentTagName === '--' ? '' : this.currentTagName
				let data = {
					type,
					page: this.page,
					size: 18
				}
				console.log("请求数据：", data)
				let res = await WallPaperApi(data)
				// return res.data.result.list
				if (reqType === 'show') {
					this.imgList = res.data.result.list
					return
				}
				if (reqType === 'bottom') {
					this.imgList = [...this.imgList, ...res.data.result.list]
					return
				}
				if (reqType === 'change') {
					this.imgList = []
					this.imgList = res.data.result.list
					console.log(this.imgList)

				}
			},
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