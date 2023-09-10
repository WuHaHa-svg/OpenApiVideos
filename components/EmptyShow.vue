<template>
	<!-- 空白内容组件 -->
	<view class="empty">
		<view class="iconfont icon-queshengye_zanwushuju icon"></view>
		<view class="text">这里暂时没有内容哦！！！</view>
	</view>
</template>

<script>
	export default {
		name:"EmptyShow",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less" scoped>
	.empty{
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-top: 140px;
		height: 200px;
		width: 100%;
		box-sizing: border-box;
		padding: 0 20px;
		border: 1px solid #AAA;
		border-radius: 10px;
		box-shadow: 3px 3px 3px rgba(255, 255, 255, .3);
		text-shadow: 1px 1px red,
								 -1px -1px aqua;
		.icon{
			height: 100px;
			width: 100%;
			text-align: center;
			font-size: 80px;
			color: #FFF;
		}
		.text{
			height: 50px;
			line-height: 50px;
			text-align: center;
			font-size: 20px;
			color: #FFF;
		}
	}

</style>