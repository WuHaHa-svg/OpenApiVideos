<template>
	<!-- 动态列表组件，用于展示全部动态和我的动态 -->
	<view class="scroll" scroll-y="true">
		<!-- 内容是否为空，不为空则循环遍历动态数据，展示动态卡片 -->
		<view v-if="!isEmpty" class="dimc-card" v-for="(item,index) in dynamicList" :key="index">
			<!-- 动态卡片的头部布局 -->
			<view class="dynamic-head">
				<!-- 头像 -->
				<image class="avatar" :src="item.userInfo.head_url" mode="aspectFill"></image>
				<!-- 用户数据 -->
				<view class="user-info">
					<view class="user-name">
						{{item.userInfo.name?item.userInfo.name:'用户未设置昵称'}}
					</view>
					<view class="user-blurb">
						{{item.userInfo.name?item.userInfo.blurb:'这个家伙很懒，没有留下签名'}}
					</view>
					<!-- 如果展示的是我的动态，就显示删除按钮 -->
					<view v-if="dataType === 'mine'" class="iconfont icon-shanchu del" @tap="delTap(index)"></view>
				</view>
			</view>
			<!-- 动态卡片的文本布局 -->
			<view class="text-area">
				{{item.text}}
			</view>
			<!-- 动态卡片的图片布局，如果没有图片，此布局不展示 -->
			<view v-if="item.images.length>0" class="banner-area">
				<!-- 如果又多张图片，就用swiper -->
				<swiper v-if="item.images.length>1" class="swiper" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000"
					:circular="true">
					<swiper-item class="swiper-item" v-for="(sitem,sindex) in item.images" :key="sindex">
						<image class="swiper-img"
							:src="sitem.url" :lazy-load="true"
							mode="aspectFill"></image>
					</swiper-item>
				</swiper>
				<!-- 如果只有一张一图片，就只展示图片 -->
				<view class="no-swiper" v-if="item.images.length === 1">
					<image class="img"
						:src="item.images[0].url" :lazy-load="true"
						mode="aspectFill"></image>
				</view>
			</view>
			<!-- 动态卡片的底部布局 -->
			<view class="dynamic-foot">
				<view class="send-title">
					发送时间
				</view>
				<view class="time">
					{{item.updatedAt}}
				</view>
			</view>
		</view>
		<!-- 空内容组件 -->
		<EmptyShow v-if="isEmpty"></EmptyShow>
		<!-- 删除动态的确认框确认框 -->
		<Confirm title="确认删除此动态吗？" @Confm="delDynamic" @Cancl="noDel" :status="isConfrm"></Confirm>
	</view>

</template>

<script>
	import EmptyShow from "@/components/EmptyShow.vue"
	import Confirm from "@/components/Confirm.vue"
	
	import {
		GetAllDynamicApi,
		GetMyDynamicApi,
		DelMyDynamicApi
	} from "@/utils/server/Api.js"
	export default {
		name: "DynamicList",
		props: ['dataType', 'pageNum'],
		components:{EmptyShow,Confirm},
		data() {
			return {
				dynamicList: [],
				isEmpty:false,
				isConfrm:false,
				delIndex:-1
			};
		},
		// 用watch的immediate:true代替掉
		// created() {
		// 	console.log(this.dataType);
		// 	if(this.dataType === "all") {
		// 		this.GetAllDynamic()
		// 		return
		// 	}
		// 	if(this.dataType === "mine") {
		// 		this.GetMyDynamic()
		// 		return
		// 	}
		// },
		methods:{
			// 点击删除动态按钮
			delTap(index){
				this.delIndex = index
				this.isConfrm = true		//展示确认框
			},
			// noDel和delDynamic是confirm组件绑定的两个事件,分别为取消和确认时调用
			noDel(){
				console.log("取消");
				this.delINdex = -1
				this.isConfrm = false		//取消展示确认框
			},
			async delDynamic(){
				let data = {id:this.dynamicList[this.delIndex].id}
				let res = await DelMyDynamicApi(data)
				console.log(res);
				if(res.data.code === 200){
					this.dynamicList.splice(this.delIndex,1)
					if(this.dynamicList.length === 0) this.isEmpty = true
				}
				this.isConfrm = false		//取消展示确认框
			},
			// 获取全部动态
			async GetAllDynamic(){
				console.log("全部");
				let data = {page: this.pageNum,size: 12}
				let res = await GetAllDynamicApi(data)
				console.log(res);
				if(res.data.result.total === 0){
					this.isEmpty = true
					return
				}
				this.dynamicList = [...this.dynamicList,...res.data.result.list]
			},
			// 获取我的动态
			async GetMyDynamic(){
				console.log("我的");
				let data = {page: this.pageNum,size: 12}
				let res = await GetMyDynamicApi(data)
				console.log(res);
				if(res.data.result.total === 0){
					this.isEmpty = true
					return
				}
				this.dynamicList = [...this.dynamicList,...res.data.result.list]
			}
		},
		watch:{
			// 父组件滑倒底部时候,pageNum+1,触发新一页的数据加载
			pageNum:{
				immediate:true,
				handler(newV,oldV){
					console.log(newV);
					if((this.dataType === "all") && (!this.isEmpty)) {
						this.GetAllDynamic()
						return
					}
					if((this.dataType === "mine") && (!this.isEmpty)) {
						this.GetMyDynamic()
						return
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.scroll {
		padding: 0 10px;

		.dimc-card {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			min-height: 10vh;
			margin-bottom: 8px;
			color: #FFF;
			background-color: black;
			border-radius: 8px;
			border: #aaa solid 1px;
			box-shadow: 5px 5px 10px rgba(0, 0, 0, .3);

			.dynamic-head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 60px;
				width: 100%;
				box-sizing: border-box;
				padding: 0 10px;
				margin-bottom: 10px;
				border-bottom: 1px solid #AAA;

				.avatar {
					height: 40px;
					width: 40px;
					background-color: antiquewhite;
					border-radius: 50%;
					border: 2px solid white;
				}

				.user-info {
					flex: 1;
					position: relative;
					padding-left: 10px;

					.user-name {
						font-size: 16px;
						font-weight: bolder;
					}

					.user-blurb {
						margin-top: 8px;
						font-size: 12px;
						color: #AAA;
						font-style: italic;
					}
					.del{
						position: absolute;
						right: 0;
						top: 50%;
						width: 40px;
						height: 40px;
						line-height: 40px;
						font-size: 28px;
						text-align: center;
						transform: translateY(-50%);
						color: red;
					}
				}
			}

			.text-area {
				width: 90%;
			}

			.banner-area {
				height: 340rpx;
				width: 100%;

				.swiper {
					width: 100%;
					height: 100%;

					.swiper-item {
						width: 100%;
						height: 100%;
						box-sizing: border-box;
						padding: 10px 16px 0 16px;

						.swiper-img {
							width: 100%;
							height: 100%;
							border-radius: 10px;
						}
					}
				}

				.no-swiper {
					width: 100%;
					height: 100%;
					box-sizing: border-box;
					padding: 10px 16px;

					.img {
						width: 100%;
						height: 100%;
						border-radius: 10px;
					}
				}
			}

			.dynamic-foot {
				height: 40px;
				width: 100%;
				margin-top: 10px;
				border-top: 1px solid #AAA;

				.send-title {
					float: left;
					padding-left: 10px;
					line-height: 40px;
					font-size: 14px;
					color: #AAA;
				}

				.time {
					float: right;
					padding-right: 10px;
					line-height: 40px;
					font-size: 14px;
					font-style: italic;
					color: #AAA;
				}
			}
		}
	}
</style>