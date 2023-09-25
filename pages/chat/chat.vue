<template>
	<view class="content" :style="{paddingTop:top}">
		<SystemHeight></SystemHeight>
		聊天页面
		<view class="input-area">
			<input class="input" type="text" :value="text">
			<button class="send" @click="send">发送</button>
		</view>
		<TabBar></TabBar>
	</view>
</template>

<script>
	import SystemHeight from "@/components/SystemHeight.vue"
	import TabBar from "@/components/TabBar.vue"
	import WebsocketUtil from "@/utils/server/WebSocket.js"
	import {XF_AuthorUrl} from "@/utils/server/AuthorUrlGener.js"
	
	export default {
		components:{SystemHeight,TabBar},
		data() {
			return {
				socket:'',
				historyTextList:[],
				text:''
			}
		},
		created() {
		},
		methods: {
			send(){
				this.socket = new WebsocketUtil(this.XF_DATA.url)
				this.historyTextList.push({
					"role": "user",
					"content": this.text
				})
				// 发送消息
				let data = {
					"header": {
						"app_id": this.XF_DATA.APPID,
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
				this.socket.send(JSON.stringify(data));
				
				// 接收消息
				this.socket.getMessage(res=>{
					console.log(res);
				})
			}
		},
		computed: {
			top() {
				return this.$store.state.BaseConfig.top + 'px'
			},
			XF_DATA(){
				return XF_AuthorUrl()
			}
		},
	}
</script>

<style lang="scss" scoped>
	.content{
		color: #FFF;
		.input-area{
			display: flex;
			justify-content: space-evenly;
			position: absolute;
			bottom: 60px;
			width: 100%;
			height: 40px;
			background-color: aqua;
			.input{
				width: 70%;
				height: 100%;
				box-sizing: border-box;
				border: 1px solid #AAA;
				border-radius: 4px;
			}
			.send{
				width: 20%;
			}
		}
	}
</style>
