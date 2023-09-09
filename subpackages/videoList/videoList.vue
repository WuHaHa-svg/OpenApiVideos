<template>
	<view class="content">
		<IndexNav left="推介" right="列表"></IndexNav>
		<view class="list">
			<view class="video-card" v-for="item,index in list" :key="index">
				<image class="img" :src="item.picurl"
					mode="aspectFit" :lazy-load="true"
					@tap="play(item)"></image>
				<view class="video-info-bot">
					<view class="author-title">
						{{item.alias}}
					</view>
					<image class="avatar" :src="item.picuser" mode="scaleToFill"></image>
				</view>
			</view>
		</view>
		<!-- <VideoPlayer></VideoPlayer> -->
		<view class="play-box" v-if="videoItem" >
			<view class="btn" @tap="closePlay()">
				<span class="iconfont icon-cuowuguanbiquxiao-fangkuang"></span>
			</view>
			<VideoPlayer :videoItem="videoItem" :auto="true"></VideoPlayer>
			<InformationBox :videoItem="videoItem"></InformationBox>
		</view>
		<TabBar></TabBar>
	</view>
</template>

<script>
	import TabBar from "@/components/TabBar.vue"
	import IndexNav from "@/components/IndexNav.vue"
	import VideoPlayer from "@/components/VideoPlayer.vue"
	import InformationBox from "@/components/InformationBox.vue"
	import {VideoApi} from "@/utils/server/Api.js"
	export default {
		data() {
			return {
				currentData:{
					page:1,
					size:14
				},
				list:[],
				videoItem:""
			}
		},
		components: {
			TabBar,
			IndexNav,
			VideoPlayer,
			InformationBox
		},
		onShow() {
			this.getVideo()
		},
		onReachBottom(){
			this.getVideo()
		},
		methods: {
			closePlay(){
				console.log("关闭播放")
				this.videoItem = ""
			},
			play(item){
				console.log(this.videoItem)
				this.videoItem = item
				console.log(this.videoItem)
			},
			async getVideo() {
				console.log("加载前：",this.currentData)
				let res = await VideoApi(this.currentData)
				// console.log("视频",typeof res.data.result.list)
				this.list = [...this.list,...res.data.result.list]
				this.currentData.page += 1
				console.log("加载结果：",this.list)
				console.log("加载后：",this.currentData)
			},
		},
		computed:{
		}
	}
</script>

<style lang="less" scoped>
	.content {
		width: 100%;
		background-color: rgb(22, 24, 35);
		.list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			// align-content: space-around;
			width: 100%;
			padding-top: 120rpx;
			padding-bottom: 80px;
			.video-card{
				// display: flex;
				// flex-direction: column;
				// justify-content: space-around;
				position: relative;
				height: 320rpx;
				width: 42%;
				margin-top: 30rpx;
				padding: 2px;
				border:1px solid #AAA;
				border-radius: 8px;
				overflow: hidden;
				.img{
					position: absolute;
					top: 6px;
					height: 90%;
					width: 90%;
					margin: 0 5%;
				}
				.video-info-bot{
					position: absolute;
					bottom: 8px;
					width: 100%;
					height: 10%;
					backdrop-filter: blur(10px);
					.author-title{
						position: absolute;
						left: 14px;
						bottom: 2px;
						color: #CCC;
						font-size: 10px;
					}
					.avatar{
						position: absolute;
						right: 16px;
						bottom: 2px;
						right: 20px;
						width: 21px;
						height: 21px;
						border-radius: 50%;
					}
				}
			}
			.video-card:nth-child(-n+2) {
				margin-top: 56rpx;
			}
		}
		.play-box{
			position: fixed;
			top: 0;
			left: 0;
			height: 100vh;
			width: 100vw;
			.btn{
				z-index: 9999;
				position: absolute;
				top: 200rpx;
				right: 5vw;
				width: 44px;
				height: 44px;
				line-height: 44px;
				text-align: center;
				text-shadow: -1px -1px aqua,1px 1px red;
				span{
					font-size: 26px;
				}
			}
			// transform: translate(-50%,-50%);
		}
	}
</style>