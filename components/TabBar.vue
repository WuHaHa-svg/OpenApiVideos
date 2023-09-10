<template>
	<!-- 底部导航栏 -->
	<view class="tab">
		<view 
		 :class="activeTag==='index'?'active': (activeTag==='list'?'active':'nil')" 
		class="tab-box" @tap="goTo('index','/pages/index/index')">
			首页
		</view>
		<view class="tab-box" :class="activeTag === 'allDimc'? 'active':(activeTag==='upDimc'?'active':'nil')" @tap="goTo('allDimc','/pages/zone/zone')">
			动态
		</view>
		<view class="tab-box" :class="activeTag === 'wallpaper'? 'active':'nil'" @tap="goTo('wallpaper','/pages/wallpaper/wallpaper')">
			壁纸
		</view>
		<view class="tab-box" :class="activeTag === 'mine'? 'active':'nil'" @tap="goTo('mine','/pages/mine/mine')">
			我的
		</view>
	</view>
</template>

<script>
	export default {
		name:"TabBar",
		data() {
			return {}
		},
		computed:{
			activeTag(){
				return this.$store.state.BaseConfig.activeTag
			}
		},
		methods:{
			// 点击对应标题跳转对应页面
			goTo(name,url){
				console.log(url)
				// uni.switchTab({url})
				if (this.activeTag == name) return
				uni.reLaunch({url})
				// 修改激活tag
				this.$store.commit('BaseConfig/changeTag',name)
			}
		}
	}
</script>

<style lang="less" scoped>
	.tab{
		height: 60px;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		background-color: rgba(red, green, blue, .5);
		backdrop-filter: blur(30px);
		.tab-box{
			width: 25%;
			height: 100%;
			line-height: 60px;
			text-align: center;
			color: #fff;
			font-weight: bolder;
		}
		.active{
			text-shadow: -1px -1px aqua,1px 1px red;
		}
	}

</style>