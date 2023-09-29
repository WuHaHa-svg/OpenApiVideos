<template>
	<!-- 确认框组件 -->
	<view class="confirm-box" :animation="animationData" @touchmove.stop.prevent="() => {}">
		<!-- 标题 -->
		<view class="confirm-title">
			输入APIKEY信息
		</view>
		<view class="input-box">
			<view class="input">
				<view class="config-title">APPID</view>
				<input class="config-input" v-model="AI_DATA.APPID" type="text">
			</view>
			<view class="input">
				<view class="config-title">APIKey</view>
				<input class="config-input" v-model="AI_DATA.APIKey" type="text">
			</view>
			<view class="input">
				<view class="config-title">APISecret</view>
				<input class="config-input" v-model="AI_DATA.APISecret" type="text">
			</view>
		</view>
		<!-- 按钮 -->
		<view class="confirm-btns">
			<view class="confirm-btn" @tap="no">取消</view>
			<view class="confirm-btn" @tap="init">初始化</view>
			<view class="confirm-btn" @tap="yes">确定</view>
		</view>
	</view>
</template>

<script>
	import { SetAI,InitAI } from '@/utils/SetData'
	import { PagesManage } from "@/utils/server/Api.js"
	
	export default {
		name: "AiConfiger",
		props:['status'],
		data() {
			return {
				animationData: {},
				animation: "",
				AI_DATA:{
					APPID:"",
					APIKey:"",
					APISecret:""
				}
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
				let data = this.AI_DATA
				if((data.APIKey === "") || (data.APISecret === "") || (data.APPID === "")) {
					this.$toast("输入不可为空!","error")
					return
				}
				SetAI(data)
				this.$emit("Confm")
			},
			async init(){
				let res = await PagesManage()
				let ai_data = {
					"APISecret": res.data.APISecret,
					"APIKey": res.data.APIKey,
					"APPID": res.data.APPID
				}
				InitAI(ai_data)
				this.$emit("init")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.confirm-box {
		z-index: 9999;
		display: flex;
		flex-direction: column;
		position: fixed;
		top: calc(30vh - 95px);
		left: calc(50vw - 138px);
		width: 276px;
		height: 400px;
		backdrop-filter: blur(30px);
		border-radius: 20px;
		border: 1px solid rgba(255, 255, 255, .2);
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
		.input-box{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			border-bottom: 2px solid rgba(255, 255, 255, .2);
			.input{
				width: 80%;
				.config-input{
					padding-left: 2px;
					border: 2px solid rgba(255, 255, 255, .2);
				}
			}
		}
		.confirm-btns {
			display: flex;
			justify-content: space-around;
			height: 54px;
			width: 100%;

			.confirm-btn {
				height: 54px;
				width: 138px;
				line-height: 54px;
				text-align: center;
				box-sizing: border-box;
				background-color: transparent;
				color: #FFF;
				font-weight: bolder;
				font-size: 20px;
			}

			.confirm-btn:first-child {
				border-right: 2px solid rgba(255, 255, 255, .2);
			}

			.confirm-btn:last-child {
				border-left: 2px solid rgba(255, 255, 255, .2);
			}
		}
	}
</style>