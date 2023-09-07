<template>
	<view class="infor">
		<image class="avatar" :src="videoItem.picuser" mode=""></image>
		<text class="info-text">{{videoItem.alias}}</text>
		<text class="info-text-1">{{videoItem.title}}</text>
	</view>
</template>

<script>
	export default {
		name:"InformationBox",
		props:['videoItem'],
		data() {
			return {
			};
		},
	}
</script>

<style lang="less" scoped>
	.infor{
		z-index: 9999;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		position: fixed;
		left: 4vw;
		bottom: 100px;
		width: 60vw;
		height: 180px;
		// background-color: rgb(255, 255, 255);
		// backdrop-filter: blur(80px);
		color: #FFF;
		.avatar{
			width: 50px;
			height: 50px;
			border-radius: 50%;
			border: 2px solid #FFF;
		}
		.infor-text{
			display: block;
			width: 100%;
			font-size: 18px
		}
		.info-text-1{
			font-size: 14px
		}
	}
</style>