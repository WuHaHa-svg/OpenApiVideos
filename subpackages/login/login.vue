<template>
	<!-- 登录 -->
	<view class="content">
		<SystemHeight></SystemHeight>
		<view class="login-container">
			<view class="login-title">
				<text>Login</text>
				<text>登陆你的账号...</text>
			</view>
			<view class="input-box">
				<input @focus="inpt(0)" @blur="blurInpt(0)" class="input" v-model="formData.account" :placeholder="mailTip"
					placeholder-style="font-size: 14px" />
				<input @focus="inpt(1)" @blur="blurInpt(1)" class="input" type="password" v-model="formData.password"
					:placeholder="pwdTip" placeholder-style="font-size: 14px" />
			</view>
			<view class="btns">
				<button class="btn" @click="login">登录</button>
				<button class="btn" @click="reset">重置</button>
			</view>
		</view>
		<view class="iconfont icon-cuowuguanbiquxiao-fangkuang quit" @tap="backToMine()"></view>
	</view>
</template>

<script>
	import SystemHeight from "@/components/SystemHeight.vue"
	import {checkStr} from "@/js_sdk/mineking-tool/tool.js"
	import {LoginApi,GetUserApi} from "@/utils/server/Api.js"
	import {Setnk,SetUsrData} from "@/utils/SetData.js"
	export default {
		components: {
			SystemHeight
		},
		data() {
			return {
				formData: {
					account: "",
					password: ""
				},
				mailTip: "请输入邮箱",
				pwdTip: "请输入密码",
			}
		},
		methods: {
			backToMine(){
				uni.reLaunch({url:"/pages/mine/mine"})
			},
			// 登录
			async login() {
				let accFlag = checkStr(this.formData.account, "email")
				let pwdFlag = checkStr(this.formData.password, "pwd")
				if (!accFlag || !pwdFlag) {
					this.$toast("密码格式非法!", "error")
					return
				}
				console.log("Login!!!")
				const data = {
					"account": this.formData.account,
					"password": this.formData.password
				}
				let res = await LoginApi(data)
				console.log(res)
				// 登陆不成功
				if (res.data.code !== 200) {
					this.$toast("请检查账户密码！", "error")
					return
				}
				// 设置token
				try {
					Setnk(res.data.result.token)
				// 	this.$toast("登录成功！", "success")
				} catch (e) {
					console.log(e, "登录token设置失败！")
					return
				}
				// console.log(this.$store.state.UserData.token)
				// 获取用户数据
				let user = await GetUserApi()
				console.log("用户数据：",user)
				// 设置用户数据
				try{
					let userData = {
						...user.data.result,
						id:res.data.result.id,
						level:res.data.result.level
					}
					console.log(userData)
					SetUsrData(userData)
				}catch(e){
					console("用户信息设置失败！")
					return
				}
				this.backToMine()
			},
			reset() {
				this.formData.account = ""
				this.formData.password = ""
			},
			// 输入库聚焦提示
			inpt(num) {
				if (num === 0) {
					this.mailTip = "请注意邮箱格式!"
					return
				}
				if (num === 1) {
					this.pwdTip = "字母开头、6~18位、仅包含字母数字下划线！"
					return
				}
			},
			// 输入库失焦提示
			blurInpt(num) {
				if (num === 0) {
					this.mailTip = "请输入邮箱"
					if (!checkStr(this.formData.account, 'email') && this.formData.account) {
						this.formData.account = ""
						this.$toast("邮箱格式非法！", "error")
					}
					return
				}
				if (num === 1) {
					this.pwdTip = "请输入密码"
					if (!checkStr(this.formData.password, 'pwd') && this.formData.password) {
						this.formData.password = ""
						this.$toast("密码格式非法！", "error")
					}
					return
				}
			}
		},
		
	}
</script>

<style lang="less" scoped>
	.content {
		height: 100%;
		width: 100%;
	}

	.login-container {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		position: relative;
		top: 25vh;
		left: 10vw;
		box-sizing: border-box;
		width: 80vw;
		height: 50vh;
		padding: 0 20px;
		border: 1px solid rgba(255, 255, 255, .3);
		border-radius: 10px;
		box-shadow: 3px 3px 60px rgba(255, 255, 255, .3),
							-3px -3px 60px rgba(255, 255, 255, .3);
		.login-title{
			height: 10vh;
			text{
				display: block;
				color: #FFF;
				text-shadow: -1px -1px aqua,1px 1px red;
			}
			text:nth-child(1){
				font-size: 40px;
				margin-bottom: 4px;
			}
			text:nth-child(2){
				font-size: 1em;
				font-style: italic;
			}
		}
		.input-box{
			height: 20vh;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.input{
				height: 25%;
				color: #FFF;
				text-align: center;
				border-bottom: 1px solid aqua;
			}
			.input:nth-child(2){
				border-bottom: 1px solid red;
			}
		}
		.btns{
			display: flex;
			justify-content: space-around;
			height: 5vh;
			.btn {
				line-height: 5vh;
				width: 40%;
				color: #FFF;
				font-weight: bolder;
				font-size: 18px;
			}
			.btn:first-child {
				background-color: rgba(0, 250, 240, .8);
			}
			.btn:last-child {
				background-color: rgba(254, 44, 85, .8);
			}
		}
	}
	.quit{
		position: fixed;
		bottom: 10vh;
		left: 50vw;
		transform: translateX(-50%);
		font-size: 40px;
		color: #FFF;
		text-shadow: -1px -1px aqua,1px 1px red;
	}
</style>