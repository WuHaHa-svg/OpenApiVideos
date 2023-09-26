<template>
	<!-- 底部导航栏 -->
	<view class="tab">
		<view v-if="pagesManage.index" class="tab-box" :class="activeTag==='index'?'active': (activeTag==='list'?'active':'nil')" 
			@tap="goTo('index')">
			首页
		</view>
		<view v-if="pagesManage.allDimc" class="tab-box" :class="activeTag === 'allDimc'? 'active':(activeTag==='upDimc'?'active':'nil')" 
			@tap="goTo('allDimc')">
			动态
		</view>
		<view v-if="pagesManage.wallpaper" class="tab-box" :class="activeTag === 'wallpaper'? 'active':'nil'" 
			@tap="goTo('wallpaper')">
			壁纸
		</view>
		<view v-if="pagesManage.chat" class="tab-box" :class="activeTag === 'chat'? 'active':'nil'" 
			@tap="goTo('chat')">
			AI-Chat
		</view>
		<view v-if="pagesManage.mine" class="tab-box" :class="activeTag === 'mine'? 'active':'nil'" 
			@tap="goTo('mine')">
			我的
		</view>
	</view>
</template>

<script>
	export default {
		name:"TabBar",
		data() {
			return {
			}
		},

		computed:{
			activeTag(){
				return this.$store.state.BaseConfig.activeTag
			},
			pagesManage(){
				return this.$store.state.BaseConfig.pagesManage
			}
		},
		methods:{
			// 点击对应标题跳转对应页面
			goTo(name){
				// 本页面到本页面,不触发跳转
				if (this.activeTag == name) return
				//获取页面路由
				let url = this.$store.state.BaseConfig.tags.filter(item=>item.tag === name)[0].url
				console.log(url);
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