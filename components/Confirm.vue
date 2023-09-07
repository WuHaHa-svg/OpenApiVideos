<template>
	<view class="confirm-box">
		<view class="confirm-title">
			{{title}}
		</view>
		<view class="confirm-btns">
			<view class="confirm-btn" @tap="no">取消</view>
			<view class="confirm-btn" @tap="yes">确定</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Confirm",
		props:['title'],
		data() {
			return {
			};
		},
		methods:{
			no(){
				this.$emit("Cancl")
			},
			yes(){
				this.$emit("Confm")
			}
		}
		
	}
</script>

<style lang="less" scoped>
	.confirm-box{
		position: fixed;
		top: 50vh;
		left: 50vw;
		width: 276px;
		height: 190px;
		transform: translate(-50%,-50%);
		backdrop-filter: blur(30px);
		border-radius: 20px;
		border: 1px solid rgba(255,255,255,.2);
		.confirm-title{
			box-sizing: border-box;
			border-bottom: 2px solid rgba(255,255,255,.2);
			width: 100%;
			height: 130px;
			line-height: 130px;
			font-size: 22px;
			font-weight: bolder;
			text-align: center;
			color: #FFF;
		}
		.confirm-btns{
			display: flex;
			justify-content: space-around;
			height: 60px;
			width: 100%;
			.confirm-btn{
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
			.confirm-btn:first-child{
				border-right:1px solid rgba(255,255,255,.2);
			}
			.confirm-btn:last-child{
				border-left:1px solid rgba(255,255,255,.2);
			}
		}
	}
</style>