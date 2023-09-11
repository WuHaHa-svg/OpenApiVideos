<template>
	<!-- 确认框组件 -->
	<view class="confirm-box" :animation="animationData" @touchmove.stop.prevent="() => {}">
		<!-- 标题 -->
		<view class="confirm-title">
			{{title}}
		</view>
		<!-- 按钮 -->
		<view class="confirm-btns">
			<view class="confirm-btn" @tap="no">取消</view>
			<view class="confirm-btn" @tap="yes">确定</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Confirm",
		props: ["title", "status"],
		data() {
			return {
				animationData: {},
				animation: ""
			};
		},
		created() {
			// 创建动画
			var animation = uni.createAnimation({
				duration: 100,
				timingFunction: 'linear',
			})
			this.animation = animation
		},
		watch: {
			// 监听是否需要展示改组件
			status: {
				immediate: false,
				handler(nV, oV) {
					if (nV) {
						console.log("显示");
						this.animation.scale(1.2).rotate(5).step(),
						this.animation.scale(0.8).rotate(-5).step(),
						this.animation.scale(1).rotate(0).step(),
						this.animationData = this.animation.export()
					} else {
						console.log("隐藏");

						this.animation.scale(0.8).rotate(-5).step(),
						this.animation.scale(1.2).rotate(5).step(),
						this.animation.scale(0).rotate(0).step(),
						this.animationData = this.animation.export()
					}
				}
			}
		},
		methods: {
			// 绑定两个事件,点击确认和取消时触发对应的事件(调用父组件对应的函数)
			no() {
				this.$emit("Cancl")
			},
			yes() {
				this.$emit("Confm")
			}
		}
	}
</script>

<style lang="less" scoped>
	.confirm-box {
		z-index: 9999;
		position: fixed;
		top: calc(50vh - 95px);
		left: calc(50vw - 138px);
		width: 276px;
		height: 190px;
		backdrop-filter: blur(30px);
		border-radius: 20px;
		border: 1px solid rgba(255, 255, 255, .2);
		// opacity: 0;
		// transform: translateX(-2000px);
		transform: scale(0);	
		.confirm-title {
			box-sizing: border-box;
			border-bottom: 2px solid rgba(255, 255, 255, .2);
			width: 100%;
			height: 130px;
			line-height: 130px;
			font-size: 22px;
			font-weight: bolder;
			text-align: center;
			color: #FFF;
		}

		.confirm-btns {
			display: flex;
			justify-content: space-around;
			height: 60px;
			width: 100%;

			.confirm-btn {
				height: 60px;
				width: 138px;
				line-height: 60px;
				text-align: center;
				box-sizing: border-box;
				background-color: transparent;
				color: #FFF;
				font-weight: bolder;
				font-size: 20px;
			}

			.confirm-btn:first-child {
				border-right: 1px solid rgba(255, 255, 255, .2);
			}

			.confirm-btn:last-child {
				border-left: 1px solid rgba(255, 255, 255, .2);
			}
		}
	}
</style>