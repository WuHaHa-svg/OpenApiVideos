<template>
	<!-- 用于播放视频的组件 -->
	<view class="video-player" @tap.stop="changeState">
		<!-- 暂停按钮组件 -->
		<PauseIcon :state="state"></PauseIcon>
		<!-- 视频缓冲（此功能未完善） -->
		<!-- <VideoLoading v-if="load"></VideoLoading> -->
		<video id="myVideo" :muted="false" :loop="true" :autoplay="auto"
		:controls="false" :show-center-play-btn="false" 
		:enable-progress-gesture="false" class="video" 
		:src="videoItem.playurl"></video>
	</view>
</template>

<script>
	import PauseIcon from "@/components/PauseIcon.vue"
	// import VideoLoading from "@/components/VideoLoading.vue"
	export default {
		name: "VideoPlayer",
		// components:{PauseIcon,VideoLoading},
		components:{PauseIcon},
		data() {
			return {
				state:true,
				load:false
			};
		},
		props:['videoItem','auto'],
		created() {
			//仅wxapp，获取video组件上下文
			this.videoContext = uni.createVideoContext('myVideo',this)
		},
		// created() {
		// 	console.log(this.idx)
		// 	if (this.idx === 0){
		// 		this.videoContext.play()
		// 	}
		// },
		methods:{
			// waiting(e){
			// 	console.log("视频缓冲");
			// 	console.log(e);
			// },
			// done(e){
			// 	console.log("加载完成");
			// 	console.log(e);
			// },
			// loading(e){
			// 	console.log("视频加载");
			// 	console.log(e);
			// 	this.load=true
			// },
			// 视频播放用于父组件滑动视频时自动暂停划走视频,自动播放划入视频调用
			play(){
				// console.log("play")
				this.videoContext.play()
				this.state = true
			},
			// 视频暂停用于父组件滑动视频时自动暂停划走视频,自动播放划入视频调用
			pause(){
				// console.log("pause",this.videoContext)
				this.videoContext.pause()
				this.state = false
			},
			// 点击视频 播放/暂停
			changeState(){
				if(this.state) {
					this.pause()
					return
				}
				if(!this.state){
					this.play()
					return 
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.video-player {
		position: relative;
		height: 100%;
		width: 100%;
		.video {
			height: 100%;
			width: 100%;
		}
	}
</style>