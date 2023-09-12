<template>
	<view class="video-load">
		缓冲。。。
	</view>
</template>

<script>
	export default {
		name: "VideoLoading",
		props: ['state'],
		data() {
			return {
				animationData: {},
				animation: ""
			};
		},
		created() {
			var animation = uni.createAnimation({
				duration: 500,
				timingFunction: 'linear',
			})
			this.animation = animation
		},
		watch: {
			// 监听是否展示按钮
			state: {
				immediate: true,
				handler(n, o) {
					if (!n) {
						// this.animation.opacity(1).step(),
						// 	this.animationData = this.animation.export()
					} else {
						// this.animation.opacity(0).step(),
						// 	this.animationData = this.animation.export()
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.video-load {
		position: absolute;
		top: calc(50% - 70px);
		left: calc(50% - 70px);
		width: 140px;
		height: 140px;
		background-color: aqua;
		z-index: 9999;
		pointer-events: none;
		opacity: 0.3;
	}
</style>