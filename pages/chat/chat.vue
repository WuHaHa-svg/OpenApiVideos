<template>
	<view class="content" :style="{paddingTop:top}">
		<SystemHeight></SystemHeight>
		<view class="AI-title" :style="{top:top}">AI聊天</view>
		<view v-if="isLogin" class="login-box">
			<view v-for="item in historyTextList" :key="item.id">
				<view v-if="item.role === 'user'" class="msg">
					<image class="avatar" :src="avatarUrl" mode="aspectFill" :style="{marginLeft:'8px'}"></image>
					<!-- <view class="msg-content">{{item.content}}</view> -->
					<zero-markdown-view class="msg-content" themeColor="#007AFF" :markdown="item.content"></zero-markdown-view>
				</view>
				<view v-if="item.role === 'assistant'" class="msg" :style="{flexDirection:'row'}">
					<image class="avatar" src="/static/AI.png" mode="aspectFill" :style="{marginRight:'8px'}"></image>
					<!-- <view class="msg-content">{{item.content}}</view> -->
					<zero-markdown-view class="msg-content" themeColor="#007AFF" :markdown="item.content"></zero-markdown-view>
				</view>
			</view>
			<view class="input-area">
				<textarea class="input" :show-confirm-bar="false" v-model="text" placeholder="请开始提问吧!"></textarea>
				<view class="send" @click="send">发送</view>
			</view>
		</view>
		<view v-if="!isLogin" class="not-login">
			<UserCard></UserCard>
		</view>
		<TabBar></TabBar>
	</view>
</template>

<script>
	import SystemHeight from "@/components/SystemHeight.vue"
	import TabBar from "@/components/TabBar.vue"
	import UserCard from "@/components/UserCard.vue"
	import { XF_AuthorUrl } from "@/utils/server/AuthorUrlGener.js"
	import { GetAIMsgs, GetUsrData } from "@/utils/GetData"
	import { uniqueId } from "@/js_sdk/mineking-tool/tool.js"
	import { SetAIMsgs } from "@/utils/SetData.js"
	export default {
		components: {
			SystemHeight,
			UserCard,
			TabBar
		},
		data() {
			return {
				socketTask: '',
				historyTextList: [],
				text: '',
				tempRes: ''
			}
		},
		created() {
			this.historyTextList = GetAIMsgs()
		},
		mounted() {
			this.toBottom()
		},
		beforeDestroy() {
			SetAIMsgs(this.historyTextList)
		},
		watch:{
			"historyTextList":{
				handler(nV){
					if(nV.length === 18){
						nV.shift()
					}
					// SetAIMsgs(nV)
				}
			}
		},
		methods: {
			toBottom(){
				this.$nextTick(()=>{
					let timer = setTimeout(()=>{
						clearTimeout(timer)
						uni.pageScrollTo({
							scrollTop:9999,
							duration:300
						})
					},300)
				})
			},
			send() {
				if (this.text === "") {
					this.$toast("输入不可为空!","none")
					return
				}
				this.socketTask = uni.connectSocket({
					url: this.XF_DATA.url,
					method: 'GET',
					success(res) {
						console.log(res, "ws成功连接...")
					}
				})
				this.socketTask.onError((err) => {
					console.log("连接失败：", err);
					// this.$toast("APIKEY已失效!", "error")
					this.historyTextList.push({
						"role": "user",
						"content": this.text,
						"id":uniqueId()
					})
					this.toBottom()
					this.text = ""
				})

				this.socketTask.onOpen((res) => {
					this.historyTextList.push({
						"role": "user",
						"content": this.text,
						"id":uniqueId()
					})
					this.toBottom()
					this.text = ""
					let params = {
						"header": {
							"app_id": this.XF_DATA.APPID
						},
						"parameter": {
							"chat": {
								"domain": "generalv2",
								"temperature": 0.5,
								"max_tokens": 1024
							}
						},
						"payload": {
							"message": {
								"text": this.historyTextList
							}
						}
					}
					console.log("请求的params：" + JSON.stringify(params))
					console.log("请求的信息列表：", this.historyTextList)
					this.socketTask.send({data: JSON.stringify(params)})
				})

				// 接受到消息时
				this.socketTask.onMessage((res) => {
						let obj = JSON.parse(res.data)
						if (obj.header.code !== 0) {
							console.log(`${obj.header.code}:${obj.message}`)
							this.$toast(obj.message, "none")
							this.socketTask.close()
							this.tempRes = ""
						}
						if (obj.header.status === 0){
							this.historyTextList.push({
								"role": "assistant",
								"content": "",
								"id":uniqueId()
							})
							let dataArray = obj.payload.choices.text
							for (let i = 0; i < dataArray.length; i++) {
								this.historyTextList.at(-1).content += dataArray[i].content
							}
						}
						if(obj.header.status === 1) {
							let dataArray = obj.payload.choices.text
							for (let i = 0; i < dataArray.length; i++) {
								this.historyTextList.at(-1).content += dataArray[i].content
							}
						}
						if (obj.header.status === 2) {
							let dataArray = obj.payload.choices.text
							for (let i = 0; i < dataArray.length; i++) {
								this.historyTextList.at(-1).content += dataArray[i].content
							}
							this.toBottom()
							this.socketTask.close()
							this.tempRes = ""
							console.log("@",this.historyTextList);
						}
				})
		}
	},
	computed: {
		// 登陆状态
		isLogin(){
			console.log("计算登录");
			return uni.getStorageSync('isLogin')
		},
		top() {
			return this.$store.state.BaseConfig.top + 'px'
		},
		XF_DATA() {
			console.log("计算ai");
			let data = XF_AuthorUrl()
			console.log(data);
			return XF_AuthorUrl()
		},
		avatarUrl(){
			let data = GetUsrData().head_url
			if(data) return data
			return "/static/avatar.png" 
		}
		
	},
	}
</script>

<style lang="scss" scoped>
	.content {
		box-sizing: border-box;
		width: 100%;
		color: #FFF;
		padding-bottom: 120px;
		
		.AI-title{
			z-index: 9999;
			position: sticky;
			height: 60px;
			width: 100vw;
			line-height: 60px;
			text-align: center;
			font-weight: bolder;
			text-shadow: -1px -1px aqua,1px 1px red;
			backdrop-filter: blur(30px);
		}
		.not-login{
			position: fixed;
			top: 25vh;
			left: 0;
			height: 50vh;
			width: 100%;
		}
		.login-box{
			box-sizing: border-box;
			padding: 0px 20px;
			.msg{
				display: flex;
				flex-direction: row-reverse;
				max-width: 100%;
				margin-bottom: 28px;
				.avatar{
					width: 3em;
					height: 3em;
					border-radius: 50%;
					vertical-align: middle;
				}
				.msg-content{
					box-sizing: border-box;
					padding: 6px 12px;
					max-width: 60%;
					border: 1px solid #AAA;
					border-radius: 4px;
					line-height: 30px;
					overflow: hidden;
				}
			}

			.input-area {
				display: flex;
				justify-content: space-around;
				align-items: center;
				position: fixed;
				left: 0;
				bottom: 60px;
				width: 100%;
				height: 60px;
				backdrop-filter: blur(30px);
				
				.input {
					width: 70%;
					height: 44px;
					box-sizing: border-box;
					border: 1px solid #AAA;
					border-radius: 4px;
					padding: 0 4px;
				}

				.send {
					width: 20%;
					height: 44px;
					border-radius: 4px;
					line-height: 44px;
					text-align: center;
					border: 1px solid #AAA;	
				}
			}
		}
	}
</style>