<template>
	<!-- 注册 -->
	<view class="content">
		<SystemHeight></SystemHeight>
		<view class="login-container">
			<view class="login-title">
				<text>Register</text>
				<text>注册你的账号...</text>
			</view>
			<!-- 输入区域 -->
			<view class="input-box">
				<input @focus="inpt(0)" @blur="blurInpt(0)" class="input" v-model="formData.account" :placeholder="mailTip"
					placeholder-style="font-size: 14px" />
				<input @focus="inpt(1)" @blur="blurInpt(1)" class="input" type="password" v-model="formData.password"
					:placeholder="pwdTip" placeholder-style="font-size: 14px" />
				<input type="password" @blur="blurInpt(2)"class="input" 
					v-model="formData.passwordConfirm" placeholder="确认密码" placeholder-style="font-size: 14px"/>
				<view class="code">
					<text>邮箱验证码</text>
					<uv-code-input 
					v-model="formData.verifyCode" 
					space="0" color="#FFF" :disabledDot="true"
					size="25"
					@finish="register"></uv-code-input>
				</view>
			</view>
			<!-- 按钮 -->
			<view class="btns">
				<button class="btn" @click="getVerify">验证码</button>
				<button class="btn" @click="reset">重置</button>
			</view>
		</view>
		<view class="iconfont icon-cuowuguanbiquxiao-fangkuang quit" @tap="backToMine"></view>
	</view>
</template>

<script>
	import SystemHeight from "@/components/SystemHeight.vue"
	import {checkStr} from "@/js_sdk/mineking-tool/tool.js"
	import {RegisterApi,VerifyCodeApi} from "@/utils/server/Api.js"
	export default {
		components: {
			SystemHeight
		},
		data() {
			return {
				formData: {
					account: "",
					password: "",
					passwordConfirm:"",
					verifyCode:""
				},
				mailTip: "请输入邮箱",
				pwdTip: "请输入密码",
			}
		},
		methods: {
			backToMine(){
				uni.reLaunch({url:"/pages/mine/mine"})
			},
			async getVerify(){
				// 获取验证码请求之前检测数据
				let accFlag = checkStr(this.formData.account,"email")
				let pwdFlag = checkStr(this.formData.password,"pwd")
				let conPwd = checkStr(this.formData.passwordConfirm,"pwd")
				if(!accFlag || !pwdFlag || !conPwd){
					this.$toast("请检查数据!","error")
					return
				}
				// this.$toast("验证码发送成功！","success")
				const data = {"mail":this.formData.account}
				let res = await VerifyCodeApi(data)
				if(res.data.code === 200){
					this.$toast("验证码发送成功！","success")
				}else{
					this.$toast("验证码发送失败！","error")
				}
			},
			// 注册
			async register(){
				console.log("触发注册")
				const data = {
					"account":this.formData.account,
					"password":this.formData.password,
					"code":this.formData.verifyCode
					}
					console.log(data)
				let res = await RegisterApi(data)
				console.log(res)
				if(res.data.code !== 200) {
					this.$toast(res.data.message,"none")
					return
				}
				this.$toast("账户注册成功！","success")
				try{
					Setnk(res.data.result.token)
				}catch(e){
					console.log(e,"token设置失败！")
				}

				console.log(this.$store.state.UserData.token)
			},
			reset(){
				this.formData.account = ""
				this.formData.password = ""
				this.formData.passwordConfirm = ""
				this.formData.verifyCode = ""
			},
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
			blurInpt(num){
				if (num === 0) {
					this.mailTip = "请输入邮箱"
					if(!checkStr(this.formData.account,'email') && this.formData.account){
						this.formData.account = ""
						this.$toast("邮箱格式非法！","error")
					}
					return
				}
				if (num === 1) {
					this.pwdTip = "请输入密码"
					if(!checkStr(this.formData.password,'pwd') && this.formData.password){
						this.formData.password = ""
						this.$toast("密码格式非法！","error")
					}
					return
				}
				if (num === 2) {
					if(!(this.formData.password === this.formData.passwordConfirm)){
						this.formData.passwordConfirm = ""
						this.$toast("两次密码输入不一致！","none")
					}
					return
				}
			}
		}
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
				border-bottom: 1px solid red;
			}
			.input:nth-child(1){
				border-bottom: 1px solid aqua;
			}
			.code{
				margin-top: 8px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				text{
					display: block;
					color: rgb(130, 130, 130);
					font-size: 14px
				}
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