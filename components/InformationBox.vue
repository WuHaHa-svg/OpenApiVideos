<template>
	<!-- 播放视频用到的视频信息展示组件 -->
	<view class="infor">
		<!-- 头像 -->
		<image class="avatar" :src="videoItem.picuser" mode=""></image>
		<!-- 作者昵称 -->
		<text class="info-text">{{videoItem.alias}}</text>
		<!-- 视频标题 -->
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
		pointer-events: none;
		
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