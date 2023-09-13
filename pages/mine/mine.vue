<template>
	<!-- “我的” -->
	<view class="content">
		<!-- 导航栏填充组件 -->
		<SystemHeight></SystemHeight>
		<!-- 登录状态展示内容 -->
		<view class="isLogin" v-if="isLogin">
			<!-- 顶部背景图 -->
			<view class="user-bgc" :style="{paddingTop:top}">
				<text class="blur-text">{{UserData.blurb?UserData.blurb:"这个家伙很懒，什么简介也没有..."}}</text>
			</view>
			<!-- 用户数据 -->
			<view class="user-info">
				<image class="user-img" :src="avatarUrl" mode="aspectFill" @tap="chooseAvatar"></image>
				<view class="edit-user" @tap="ToEditUser">账户资料</view>
				<view class="user-info-text">
					<text class="nick-name">{{UserData.name?UserData.name:"未设置昵称"}}</text>
					<text class="user-id">用户ID：{{UserData.id}}</text>
				</view>
				<view class="my-dynamic-title">我的动态</view>
			</view>
			<!-- 我的动态 -->
			<view class="dynamic-list">
				<DynamicList ref="dynamic" dataType="mine" :pageNum="page"></DynamicList>
			</view>
		</view>
		<!-- 未登录展示内容 -->
		<view class="not-login" v-if="!isLogin">
			<!-- 跳转 登录/注册 的组件 -->
			<UserCard></UserCard>
		</view>
		<!-- 滑动我的动态触发显示返回顶部 -->
		<BackTop :TopBtn="TopBtn"></BackTop>
		<TabBar></TabBar>
		<!-- 应用头像的确认框 -->
		<Confirm :status="isConfrm" title="是否使用此头像？" @Confm="useAvatar" @Cancl="noUse"></Confirm>
	</view>
</template>

<script>
	import SystemHeight from "@/components/SystemHeight.vue"
	import DynamicList from "@/components/DynamicList.vue"
	import UserCard from "@/components/UserCard.vue"
	import TabBar from "@/components/TabBar.vue"
	import BackTop from "@/components/BackTop.vue"
	import Confirm from "@/components/Confirm.vue"
	import {GetUsrData} from "@/utils/GetData.js"
	import {GetImgTempUrls,GetServerImgUrl} from "@/utils/server/UploadImg.js"
	import { UpdateUserApi } from "@/utils/server/Api"
	import { SetUsrData } from "@/utils/SetData"
	
	export default {
		components: {
			SystemHeight,
			DynamicList,
			UserCard,
			BackTop,
			Confirm,
			TabBar
		},
		data() {
			return {
				UserData:{},
				avatarUrl:"",
				page:1,
				TopBtn:false,
				isConfrm:false,
			}
		},
		created() {
			// 获取用户数据
			this.UserData = GetUsrData()
			this.avatarUrl = this.UserData.head_url
		},
		// 监听页面滚动展示返回顶部组件
		onPageScroll(e) {
			if (e.scrollTop >= 600) {
				this.TopBtn = true
			} else {
				this.TopBtn = false
			}
		},
		// 滚动到底部加载新数据
		onReachBottom() {
			this.page += 1
		},
		computed: {
			top() {
				return this.$store.state.BaseConfig.top + 'px'
			},
			isLogin(){
				return uni.getStorageSync('isLogin')
			}
		},
		
		methods: {
			// useAvatar和noUse为confirm组件绑定的事件,分别对应确认和取消
			async useAvatar(){
				if (this.$store.state.BaseConfig.isUpload){
					// 图片上传服务器
					let url = await GetServerImgUrl(this.avatarUrl)
					console.log("服务：",url);
					this.UserData.head_url = url
					this.avatarUrl = this.UserData.head_url
				} else {
					this.UserData.head_url = this.avatarUrl
				}
				// 头像链接同步服务器
				let res = await UpdateUserApi(this.UserData)
				console.log(res);
				if (res.data.code === 200){
					this.$toast("头像设置成功！","success")
					// 头像链接保存本地
					SetUsrData(this.UserData)
				} else{
					this.$toast("头像设置失败","error")
				}
				this.isConfrm = false
				uni.redirectTo({url:"/pages/mine/mine"})
			},
			noUse(){
				this.avatarUrl = this.UserData.head_url
				this.isConfrm = false
			},
			async chooseAvatar(){
				let url = await GetImgTempUrls()
				this.avatarUrl = url[0]
				this.isConfrm = true
			},
			// 点击账户资料
			ToEditUser(){
				uni.redirectTo({url:"/subpackages/editUserData/editUserData"})
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		width: 100%;
		// height: 100%;
		// background-color: rgb(22, 24, 35);
		.user-bgc {
			z-index: 10;
			position: sticky;
			top: 0;
			width: 100%;
			height: 300rpx;
			box-sizing: border-box;
			background: url('https://ts1.cn.mm.bing.net/th/id/R-C.d24c9874ab0f8f645c097f5a932bafa6?rik=ZiYNGH5Fol2SYw&riu=http%3a%2f%2fsc.xiaoxinglai.com%2fzb_users%2fupload%2f2019%2f08%2f201908211566392580143877.jpg&ehk=iu9Hnne8wpgZ%2bsMxxuRlvyD0%2bXVw6Z%2bPpfO7DkwlJQc%3d&risl=&pid=ImgRaw&r=0') no-repeat;
			background-size: cover;
			.blur-text{
				display: block;
				width: 100%;
				height: 100%;
				line-height: 300rpx;
				font-size: 18px;
				font-style: italic;
				font-weight: bolder;
				color: #FFF;
				text-align: center;
				text-decoration: underline;
				backdrop-filter: blur(30px);
				overflow: hidden;
			}
		}

		.user-info {
			z-index: 9999;
			position: sticky;
			top: 150rpx;
			background-color: rgb(22, 24, 35);
			height: 160rpx;
			min-height: 180px;
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			.user-img {
				height: 70px;
				width: 70px;
				background-color: antiquewhite;
				transform: translateY(-30%);
				border-radius: 50%;
				border: 2px solid white;
			}
			.edit-user {
				width: 140px;
				height: 40px;
				margin-top: 20px;
				border-radius: 4px;
				line-height: 40px;
				color: #FFF;
				font-size: 1em;
				text-align: center;
				text-shadow: 1px 1px aqua,
				-1px -1px red;
				border: 1px solid #AAA;
			}
			.user-info-text {
				display: flex;
				justify-content: space-around;
				align-items: baseline;
				width: 100%;
				color: #FFF;
				.nick-name {
					font-size: 25px;
					display: block;
					width: 380rpx;
				}
				.user-id {
					font-size: 14px;
					display: block;
					width: 224rpx;
				}
			}
			.my-dynamic-title{
				height: 45px;
				width: 100vw;
				line-height: 45px;
				padding-left: 10px;
				margin: 5px 0 10px;
				color: #FFF;
				font-size: 20px;
				font-style: italic;
				border-top: 1rpx solid #AAA;
			}
		}

		.dynamic-list{
			margin-top: 10px;
			padding-bottom: 80px;
		}
		.not-login{
			position: fixed;
			top: 25vh;
			left: 0;
			height: 50vh;
			width: 100%;
		}
	}
</style>