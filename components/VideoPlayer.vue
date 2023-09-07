<template>

	<view class="video-player" @tap="changeState">
		<PauseIcon :state="state"></PauseIcon>
		<video id="myVideo" :muted="false" :loop="true" 
		:autoplay="idx===0?true:false" :controls="false" 
		:show-center-play-btn="false" :enable-progress-gesture="false"
		class="video" :src="videoItem.playurl"></video>
	</view>
</template>

<script>
	import PauseIcon from "@/components/PauseIcon.vue"
	export default {
		name: "VideoPlayer",
		components:{PauseIcon},
		data() {
			return {
				state:true
			};
		},
		props:['videoItem','idx'],
		onReady() {
			//仅wxapp
			this.videoContext = uni.createVideoContext('myVideo',this)
		},
		// created() {
		// 	console.log(this.idx)
		// 	if (this.idx === 0){
		// 		this.videoContext.play()
		// 	}
		// },
		methods:{
			changeState(){
				if (this.state) {
					this.videoContext.pause()
					this.state = false
					return
				}
				
				if(!this.state){
					this.videoContext.play()
					this.state = true
					return 
				}
			},
			play(){
				// console.log("play",this.videoContext)
				this.videoContext.play()
				this.state = true
			},
			pause(){
				// console.log("pause",this.videoContext)
				this.videoContext.pause()
				this.state = false
			}
		}
	}
</script>

<style lang="less" scoped>
	.video-player {
		height: 100%;
		width: 100%;
		.video {
			height: 100%;
			width: 100%;
		}
	}
</style>