<template>
	<!-- 首页视频滑动组件 -->
	<view class="video-list">
		<!-- #ifndef APP-PLUS -->
		<view class="swiper-box">
			<swiper class="swiper" :vertical="true" 
			:current="current" :circular="true" 
			@change="change">
				<swiper-item v-for="item,index in videoList" :key="index">
					<!-- 视频播放组件 -->
					<VideoPlayer ref="player" :videoItem="item"></VideoPlayer>
					<!-- 视频信息组件 -->
					<InformationBox :videoItem="item"></InformationBox>
				</swiper-item>
			</swiper>
		</view>
		<!-- #endif -->
		<!-- 不支持APP端 -->
		<!-- #ifdef APP-PLUS -->
		<image src="https://cdn.pixabay.com/photo/2023/06/17/16/22/man-8070372_1280.jpg" mode="scaleToFill"></image>
		<!-- #endif -->
	</view>
</template>

<script>
	import VideoPlayer from "./VideoPlayer.vue"
	import {VideoApi} from "@/utils/server/Api.js"
	import InformationBox from "@/components/InformationBox.vue"
	export default {
		name: "VideoList",
		components: {
			VideoPlayer,
			InformationBox
		},
		data() {
			return {
				videoList: [],		//环形队列
				current:0,
				pageStartY:0,
				pageY:0,
				queueLenth:20,	//环形队列长度
			};
		},
		created() {
			// 提前加载视频数据
			this.getVideo(this.queueLenth)
		},
		methods:{
			async getVideo(size,...params){
				// 如果是首次初始化加载
				if(size === this.queueLenth) {
					let data = {"page": Math.floor(Math.random()*(1800 / size)),size}
					let res = await VideoApi(data)
					this.videoList = res.data.result.list
					// 首次队列加载完毕后,首个视频自动播放
					this.$nextTick(()=> this.$refs.player[0].play())
				}
				else{
					// 滑动过程中加载,滑动一个就替换一个（滑动走的那个视频并没有出队，只是让前面的替换掉一个）
					let data = {"page": Math.floor(Math.random()*1800),size}
					let res = await VideoApi(data)
					let index = params[0]
					this.videoList[index] = res.data.result.list[0]
				}
			},
			change(e){
				this.current = e.detail.current
			}
		},
		watch:{
			current:{
				immediate:false,
				handler(newV,oldV){
					console.log(`${oldV}=>${newV}`)
					// 新视频播放
					this.$refs.player[newV].play()
					// 旧视频暂停
					this.$refs.player[oldV].pause()
					// 采用了环形队列的思想,出队操作就是加载新视频替换掉原数据,维持一个时时刻刻状态都是满队的环形队列(保证用户可以一直滑动视频)
					// 队列长度为20,就保留10个已经看过的视频数据,满足用户向上滑动可以看到自己上一个视频,最多十个
					// 运算结果：第0个视频,加载第10个视频;第1个视频,加载第11个视频;第2个视频,加载第12个视频...
										//第10个视频,加载第0个视频;第11个视频,加载第1个视频;第12个视频,加载第2个视频...
					let loadIndex = (this.queueLenth / 2 + newV) % this.queueLenth
					this.getVideo(1,loadIndex)
					// console.log(`case${newV},加载${loadIndex}`);
					// switch和if不够灵活,用取模运算来代替计算要加载的新数据
					// switch (newV){
					// 	case 0:
					// 		console.log("加载2")
					// 		this.getVideo(1,2)
					// 		break;
					// 	case 1:
					// 		console.log("加载3")
					// 		this.getVideo(1,3)
					// 		break;
					// 	case 2:
					// 		console.log("加载0")
					// 		this.getVideo(1,0)
					// 		break;
					// 	case 3:
					// 		console.log("加载1")
					// 		this.getVideo(1,1)
					// 		break;
					// 	default:
					// 		break;
					// }
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.video-list {
		height: 100%;
		width: 100%;

		.swiper-box {
			height: 100%;
			width: 100%;

			.swiper {
				height: 100%;
				width: 100%;
			}
		}
	}
</style>