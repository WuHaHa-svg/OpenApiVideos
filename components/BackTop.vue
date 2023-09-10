<template>
	<!-- 点击返回顶部 -->
	<view class="iconfont icon-huidaodingbu back-top" :animation="animationData" @tap="toTop"></view> 
</template>

<script>
	export default {
		name: "BackTop",
		props: ['TopBtn'],
		data() {
			return {
				animationData: {},
				animation: ""
			};
		},
		created() {
			// 创建动画信息
			var animation = uni.createAnimation({
				duration: 500,
				timingFunction: 'ease',
			})
			this.animation = animation
		},
		methods: {
			// 触发返回顶部的方法
			toTop() {
				uni.pageScrollTo({
					scrollTop: 0, // 滚动到页面的目标位置  这个是滚动到顶部, 0 
					duration: 500 // 滚动动画的时长
				})
			}
		},
		watch: {
			// 监听是否需要展示BackTop组件
			TopBtn: {
				immediate: false,
				handler(nV, oV) {
					console.log(nV, oV)
					if (nV) {
						this.animation.translateX(0).step(),
						this.animationData = this.animation.export()
					} else {
						this.animation.translateX(100).step(),
						this.animationData = this.animation.export()
					}
				}
			}
		}
	}
</script>

<style scoped>
	.back-top {
		position: fixed;
		right: 40px;
		bottom: 200px;
		border-radius: 50%;
		font-size: 30px;
		color: white;
		backdrop-filter: blur(10px);
		transform: translateX(100px);
		/* opacity: 0.2; */
	}
</style>