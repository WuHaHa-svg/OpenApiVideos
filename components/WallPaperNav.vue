<template>
	<view class="nav-box" :style="{paddingTop:top}">
		<SystemHeight></SystemHeight>
		<view class="nav">
			<scroll-view class="type-list" :scroll-x="true">
				<view class="type" @tap="change('--')" :class="tag==='--'?'active':'nil'">全部</view>
				<view class="type" @tap="change('animal')" :class="tag==='animal'?'active':'nil'">动物</view>
				<view class="type" @tap="change('beauty')" :class="tag==='beauty'?'active':'nil'">美女</view>
				<view class="type" @tap="change('car')" :class="tag==='car'?'active':'nil'">汽车</view>
				<view class="type" @tap="change('comic')" :class="tag==='comic'?'active':'nil'">滑稽</view>
				<view class="type" @tap="change('food')" :class="tag==='food'?'active':'nil'">美食</view>
				<view class="type" @tap="change('game')" :class="tag==='game'?'active':'nil'">游戏</view>
				<view class="type" @tap="change('movie')" :class="tag==='movie'?'active':'nil'">电影</view>
				<view class="type" @tap="change('person')" :class="tag==='person'?'active':'nil'">人物</view>
				<view class="type" @tap="change('phone')" :class="tag==='phone'?'active':'nil'">竖屏</view>
				<view class="type" @tap="change('secenery')" :class="tag==='secenery'?'active':'nil'">风景</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import SystemHeight from "@/components/SystemHeight.vue"

	export default {
		name: "WallPaperNav",
		components: {
			SystemHeight
		},
		data() {
			return {
				tag:'--'
			};
		},
		computed: {
			top() {
				return this.$store.state.BaseConfig.top + 'px'
			}
		},
		methods: {
			change(name){
				this.tag = name
				this.$emit('getTag',name)
			}
		}
	}
</script>

<style lang="less" scoped>
	.nav-box {
		width: 100%;
		z-index: 9999;
		position: fixed;
		left: 0;
		top: 0;
		backdrop-filter: blur(30px);
		
		.nav {
			width: 100%;
			height: 80rpx;
			
			.type-list{
				width: 100%;
				height: 100%;
				white-space: nowrap;

				.type{
					display: inline-block;
					width: 25%;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					font-weight: bolder;
					color: #FFF;
				}
				// #ifdef MP-WEIXIN
				.type:last-child{
					margin-right: 6em;
				}
				// #endif
				.active{
					text-shadow: -1px -1px aqua,1px 1px red;
				}
			}
			// ::-webkit-scrollbar {
			//   display: none; /* Chrome Safari */
			// }
		}
	}
</style>