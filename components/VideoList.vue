<template>
	<view class="video-list">
		<!-- #ifndef APP-PLUS -->
		<view class="swiper-box">
			<swiper class="swiper" :vertical="true" 
			:current="current" :circular="true" 
			@change="change">
				<swiper-item v-for="item,index in videoList" :key="index">
					<VideoPlayer ref="player" :videoItem="item" :idx="index"></VideoPlayer>
					<InformationBox :videoItem="item"></InformationBox>
				</swiper-item>
			</swiper>
		</view>
		<!-- #endif -->
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
				videoList: [],
				current:0,
				pageStartY:0,
				pageY:0
			};
		},
		created() {
			this.getVideo(4)
		},
		methods:{
			async getVideo(size,...params){
				let data = {"page": Math.floor(Math.random()*300),size}
				let res = await VideoApi(data)
				if(size === 4) this.videoList = res.data.result.list
				else{
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
					this.$refs.player[newV].play()
					this.$refs.player[oldV].pause()
					switch (newV){
						case 0:
							console.log("加载2")
							this.getVideo(1,2)
							break;
						case 1:
							console.log("加载3")
							this.getVideo(1,3)
							break;
						case 2:
							console.log("加载0")
							this.getVideo(1,0)
							break;
						case 3:
							console.log("加载1")
							this.getVideo(1,1)
							break;
						default:
							break;
					}
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