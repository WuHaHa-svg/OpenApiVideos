<template>
	<!-- 顶部导航栏 -->
	<view class="index-nav" :style="{paddingTop:top}">
		<!-- 系统状态栏区域填充组件 -->
		<SystemHeight></SystemHeight>
		<!-- 左边标题 -->
		<view class="text" :class="activeTag === leftTag? 'active':'nil'" @tap="goTo(left)">
			{{left}}
		</view>
		<!-- 分割线 -->
		<view class="middle-line">
			|
		</view>
		<!-- 右边标题 -->
		<view class="text" :class="activeTag === rightTag? 'active':'nil'" @tap="goTo(right)">
			{{right}}
		</view>
	</view>
</template>

<script>
	import SystemHeight from "./SystemHeight.vue"
	export default {
		name:"IndexNav",
		data() {
			return {
			};
		},
		props:['left','right'],
		components:{SystemHeight},
		computed:{
			top(){
				return this.$store.state.BaseConfig.top + 'px'
			},
			// 标题tag名
			leftTag(){
				let tag = this.$store.state.BaseConfig.tags.filter(item =>{
					if (item.name === this.left) return true
				})[0].tag
				return tag
			},
			// 标题tag名
			rightTag(){
				let tag = this.$store.state.BaseConfig.tags.filter(item =>{
					if (item.name === this.right) return true
				})[0].tag
				return tag
			},
			// 激活的标题tag
			activeTag(){
				return this.$store.state.BaseConfig.activeTag
			}
		},
		methods:{
			// 点击标题跳转相应页面
			goTo(target){
				let path = this.$store.state.BaseConfig.tags.filter(item =>{
					if (item.name === target) return true
				})[0]
				console.log(path)
				if (this.activeTag == path.tag) return
				uni.redirectTo({url:path.url})
				// 切换激活标题tag
				this.$store.commit('BaseConfig/changeTag',path.tag)
			}
		}
	}
</script>

<style lang="less" scoped>
	.index-nav{
		z-index: 9999;
		position: fixed;
		left: 0;
		display: flex;
		justify-content: center;
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		backdrop-filter: blur(30px);

		.text{
			font-weight: bolder;
			color: #FFF;
		}
		.active{
			text-shadow: -1px -1px aqua,1px 1px red;
		}
		.middle-line{
			font-size: 24px;
			margin: 0 8px;
			color: #FFF;
			line-height: 70rpx;
		}
	}
</style>