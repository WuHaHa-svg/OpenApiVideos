<template>
	<view class="content" :style="{paddingTop:top}">
		<view class="title-box">
			<view class="title">编辑资料</view>
			<view class="time">上次修改：{{UserData.updatedAt}}</view>
		</view>
		<view class="setting-item" @tap="chooseAvatar">
			<view class="input-title">头像</view>
			<image :src="UserData.head_url" class="avatar" mode="scaleToFill"></image>
		</view>
		<view class="setting-item">
			<view class="input-title">昵称：</view>
			<input class="input" type="text" v-model="UserData.name">
		</view>
		<view class="setting-item">
			<view class="input-title">签名：</view>
			<input class="input" type="text" v-model="UserData.blurb" maxlength="15">
			<view class="iconfont icon-ic_chanpin icon" @tap="getBlur"></view>
		</view>
		<view class="setting-item">
			<view class="input-title">生日：</view>
			<input class="input" type="text" v-model="birDay" disabled @tap="changeBirDay">
		</view>
		<view class="setting-item">
			<view class="input-title">存储模式：</view>
			<view class="store-mode">{{storeMode}}</view>
			<switch :checked="isUpload" @change="changeUpload" color="aqua"/>
		</view>
		<view class="opt-btns">
			<button @click="logout" class="opt-btn logout">注销</button>
			<button @click="back" class="opt-btn back">返回</button>
			<button @click="submit" class="opt-btn submit">提交</button>
		</view>
		<view v-if="visible"class="picker-container">
			<picker-view indicator-class="active-box" mask-class="picker-mark"
				class="picker-view" @change="bindChange">
				<view class="btn">
					<button class="button cancel" @click="cancel">取消</button>
					<button class="button" @click="confirm">确定</button>
				</view>
				<picker-view-column>
					<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>

<script>
	import {UpdateUserApi,GetBlurApi} from "@/utils/server/Api.js"
	import {GetUsrData} from '@/utils/GetData'
	import {SetUsrData} from '@/utils/SetData.js'
	import {ArryToDate,DateToArry} from "@/utils/DateArry.js"
	import {GetImgTempUrls,GetServerImgUrl} from "@/utils/server/UploadImg.js"
	
	export default {
		data() {
			const years = []
			let date = new Date()
			for (let i = 1970; i <= date.getFullYear(); i++) {
				years.unshift(i)
			}
			const months = []
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			const days = []
			for (let i = 1; i <= 31; i++) {
				days.push(i)
			}
			return {
				value:[],
				years,
				months,
				days,
				visible: false,
				birDay: "",
				UserData: {},
				storeMode:""
			}
		},
		created() {
			this.UserData = GetUsrData()
			this.birDay = this.UserData.birthday
		},
		computed: {
			top() {
				return this.$store.state.BaseConfig.top + 'px'
			},
			isUpload() {
				return this.$store.state.BaseConfig.isUpload
			},
		},
		watch:{
			isUpload:{
				immediate:true,
				handler(newV,oldV){
					if (newV) this.storeMode="存储到云端"
					else this.storeMode="存储到本机"
				}
			}
		},
		methods: {
			changeUpload(e){
				if (e.detail.value) this.$toast("所有图片将存储到服务器，次日清除","none")
				else this.$toast("所有图片将存储在本机缓存，不再上传服务器","none")
				this.$store.commit('BaseConfig/changeUpload', e.detail.value)
			},
			async chooseAvatar(){
				let imgUrl = await GetImgTempUrls()
				console.log("缓存",imgUrl[0])
				if(!imgUrl) {
					this.$toast("未选择图片！","none")
					return
				}
				if (this.isUpload){
					// 传到服务
					let serverImgUrl = await GetServerImgUrl(imgUrl[0])
					console.log("服务",serverImgUrl);
					this.UserData.head_url = serverImgUrl
				} else {
					// 放在缓存
					this.UserData.head_url = imgUrl[0]
				}
			},
			async getBlur(){
				console.log("获取名言")
				let res = await GetBlurApi()
				console.log(res)
				this.UserData.blurb = res.data.result.name
			},
			async submit(){
				this.UserData.birthday = this.birDay
				// console.log("新数据")
				// console.log(this.UserData)
				let res = await UpdateUserApi(this.UserData)
				// console.log(res)
				if(res.data.code !==200){
					this.$toast("信息修改失败！","error")
				} else {
					this.$toast("信息修改成功！","success")
					SetUsrData(this.UserData)
					let timer = setTimeout(()=>{
						clearTimeout(timer)
						uni.reLaunch({url:"/pages/mine/mine"})
					},1500)
				}
			},
			back(){
				uni.reLaunch({url:"/pages/mine/mine"})
			},
			logout(){
				uni.clearStorage()
				uni.reLaunch({url:"/pages/mine/mine"})
			},
			changeBirDay(){
				this.visible = true
			},
			confirm() {
				this.birDay = ArryToDate(this.value)
				this.visible = false
			},
			cancel(){
				this.visible = false
			},
			bindChange(e) {
				this.value = []
				const val = e.detail.value
				this.value.push(this.years[val[0]])
				this.value.push(this.months[val[1]]<10?'0'+this.months[val[1]]:this.months[val[1]])
				this.value.push(this.months[val[2]]<10?'0'+this.months[val[2]]:this.months[val[2]])
				console.log(this.value)
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		color: #FFF;

		.title-box {
			height: 300rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.title {
				width: 100%;
				font-size: 2em;
				text-align: center;
				text-shadow: -1px -1px aqua, 1px 1px red;
			}

			.time {
				width: 100%;
				text-align: center;
				font-size: 12px;
				color: #ccc;
			}
		}

		.setting-item {
			// position: relative;
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			height: 10vh;
			line-height: 10vh;
			font-size: 20px;
			box-sizing: border-box;
			border-bottom: aqua solid 1px;
			padding: 0 10px;

			.avatar {
				height: 70rpx;
				width: 70rpx;
				background-color: antiquewhite;
				border-radius: 50%;
				border: 2px solid #FFF;
				transform: translate(-30%, -10%);
			}

			.input-title {
				max-width: 50%;
				padding-right: 10px;
				text-shadow: -1px -1px aqua, 1px 1px red;
				font-weight: bolder;
			}
			.store-mode{
				flex: 1;
				margin-right: 8px;
				height: 22px;
				line-height: 22px;
				border: 1px solid #CCC;
			}
			.input {
				flex: 1;
				border: 1px solid #CCC;
				color: #CCC;
			}

			.icon{
				margin-left: 8px;
				font-size: 24px;
			}
		}

		.setting-item:nth-child(2n-1) {
			border-bottom: red solid 1px;
		}

		.setting-item:first-child {
			margin-top: 10px;
			border-top: aqua solid 1px;
		}

		.picker-container {
			z-index: 2;
			position: fixed;
			left: 0;
			bottom: 6vh;
			width: 750rpx;
			height: 35vh;
			box-sizing: border-box;
			background-color: rgb(22, 24, 35);
			border: 1px solid rgba(255, 255, 255, .3);
			color: #FFF;
			box-shadow: 0px 2px 10px rgba(255, 255, 255, .3),
			0px -2px 10px rgba(255, 255, 255, .3);
			.picker-view {
				position: fixed;
				left: 0;
				bottom: 6vh;
				width: 750rpx;
				height: 25vh;
				.btn {
					position: fixed;
					bottom: 34vh;
					display: flex;
					justify-content: center;
					width: 100vw;

					.button {
						background-color: aqua;
						height: 5vh;
						width: 40vw;
						color: #FFF;
						line-height: 5vh;
						text-align: center;
						font-weight: bolder;
					}
					.cancel{
						background-color: red;
					}
				}

				.item {
					height: 50px;
					line-height: 50px;
					text-align: center;
					font-weight: bolder;
					font-size: 20px;

				}
			}

			/deep/.active-box {
				height: 50px;
				border-top: 1px solid aqua;
				border-bottom: 1px solid red;
			}

			/deep/.picker-mark {
				display: none;
			}
		}

		.opt-btns{
			position: fixed;
			left: 0;
			bottom: 6vh;
			display: flex;
			justify-content: space-around;
			height: 5vh;
			width: 100%;
			.opt-btn{
				width: 25%;
				background-color: aqua;
				height: 5vh;
				line-height: 5vh;
				text-align: center;
				font-weight: bolder;
			}
			.logout{
				background-color: red;
			}
			.back{
				background-color: #CCC;
			}
		}
	}
</style>