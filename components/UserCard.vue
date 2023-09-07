<template>
	<view class="user-box">
		<view class="title">
			<!-- <image class="login-pic" src="../static/notLogin.png" mode="aspectFit"></image> -->
			<span class="iconfont icon-mobile-500 login-pic"></span>
			<text class="login-tip">您还未登录!!!</text>
		</view>
		<view class="btn-box">
			<button class="btn" @click="goTo('login')">登录</button>
			<button class="btn" @click="goTo('register')">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "UserCard",
		data() {
			return {};
		},
		methods: {
			goTo(target) {
				if (target === 'login') {
					uni.navigateTo({
						url: '/subpackages/login/login'
					})
					return
				}
				if (target === 'register') {
					uni.navigateTo({
						url: '/subpackages/register/register'
					})
					return
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.user-box {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 80%;
		height: 50%;
		margin: 0 auto;
		border: 2px solid #FFF;
		border-radius: 10px;

		.title {
			display: flex;
			flex-direction: column;
			height: 15vh;
			line-height: 10vh;
			width: 100%;

			.login-pic {
				display: block;
				flex: 1;
				color: #FFF;
				text-align: center;
				font-size: 170rpx;
				text-shadow: -1px -1px aqua,1px 1px red;
			}

			.login-tip {
				display: block;
				height: 30px;
				line-height: 30px;
				font-size: 16px;
				font-style: italic;
				font-weight: bolder;
				text-align: center;
				text-shadow: -1px -1px aqua, 1px 1px red;
				color: #CCC;
			}
		}

		.btn-box {
			display: flex;
			justify-content: space-around;

			.btn {
				height: 5vh;
				line-height: 5vh;
				width: 40%;
				color: #FFF;
				font-weight: bolder;
			}

			.btn:first-child {
				background-color: rgba(0, 250, 240, .8);
			}

			.btn:last-child {
				background-color: rgba(254, 44, 85, .8);
			}
		}
	}
</style>