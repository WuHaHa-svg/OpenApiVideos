<template>
	<view class="content" :style="{paddingTop:top}">
		<SystemHeight></SystemHeight>
		聊天页面
		<view class="input-area">
			<input class="input" type="text">
			<button class="send">发送</button>
		</view>
		<TabBar></TabBar>
	</view>
</template>

<script>
	import SystemHeight from "@/components/SystemHeight.vue"
	import TabBar from "@/components/TabBar.vue"
	
	export default {
		components:{SystemHeight,TabBar},
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		computed: {
			top() {
				return this.$store.state.BaseConfig.top + 'px'
			},
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
