<template>
	<!-- 播放视频用到的暂停按钮组件 -->
	<view class="pause-icon" :animation="animationData">
		<image class="img" src="@/static/pause.png" mode="scaleToFill"></image>
	</view>
</template>

<script>
	export default {
		name: "PauseIcon",
		props:['state'],
		data() {
			return {
				animationData: {},
				animation:""
			};
		},
		created() {
			// 初始化一个动画
			var animation = uni.createAnimation({
				// 动画时间
				duration: 500,
				// 动画速度
				timingFunction: 'linear',
			})
			// 存在return字段中
			this.animation = animation
		},
		watch:{
			// 监听是否展示按钮
			state:{
				immediate:true,
				handler(n,o){
					// console.log(n,o)
					if (!n){
						try{
							this.animation.opacity(1).step(),
							this.animationData = this.animation.export()
						}catch{
							console.log("展示")
						}
					}else{
						try{
							this.animation.opacity(0).step(),
							this.animationData = this.animation.export()
						}catch{
							console.log("隐藏")
						}
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.pause-icon {
		position: fixed;
		top: 50vh;
		left: 50vw;
		transform: translate(-50%, -50%);
		z-index: 9999;
		opacity: 0;
		pointer-events: none;
		
		.img {
			width: 150px;
			height: 150px
		}
	}
</style>