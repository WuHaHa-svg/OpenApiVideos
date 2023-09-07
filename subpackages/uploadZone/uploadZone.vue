<template>
	<view class="content">
		<IndexNav left="全部动态" right="发个动态"></IndexNav>
		<view class="dimc-list">
			<view class="dynamic-title">
				抒写心情：
			</view>
			<textarea class="text-area" v-model="text" :maxlength="-1"></textarea>
			<view class="dynamic-title">
				添加图片：
			</view>
			<view class="add-pic">
				<view class="add">
					<image class="pic" src="/static/addPic.png" mode="aspectFill" @tap="addPic()"></image>
				</view>
				<view class="add" v-for="(item,index) in addList" :key="index">
					<image class="pic" :src="item" mode="aspectFill" :lazy-load="true" @longpress="longPres(index)"></image>
				</view>
			</view>

		</view>
		<view class="send-btn">
			<button @click="sendDynamic">发送</button>
		</view>
		<Confirm title="确认删除此图片吗？" @Confm="delPic" @Cancl="noDel" v-if="isConfrm"></Confirm>
		<TabBar></TabBar>
	</view>
</template>

<script>
	import IndexNav from "@/components/IndexNav.vue"
	import Confirm from "@/components/Confirm.vue"
	import TabBar from "@/components/TabBar.vue"
	import allDone from "@/utils/server/UploadImg"
	import { UploadZoneApi } from "@/utils/server/Api"
	export default {
		components: {
			IndexNav,
			Confirm,
			TabBar
		},
		data() {
			return {
				text: "",
				addList: [],
				delINdex:-1,
				isConfrm:false
			}
		},
		methods: {
			async sendDynamic() {
				console.log("发送");
				let data = {text:this.text,images:this.addList}
				let res = await UploadZoneApi(data)
				console.log(res);
				if(res.data.code === 200){
					uni.redirectTo({url:"/pages/zone/zone"})
					this.$toast("发送成功！","success")
				}
			},
			async addPic() {
				console.log("添加图片");
				let list = await allDone(9)
				this.addList = [...this.addList,...list]
			},
			longPres(index){
				this.delINdex = index
				this.isConfrm = true
			},
			delPic(){
				console.log("删除");
				this.addList.splice(this.delINdex,1)
				this.isConfrm = false
			},
			noDel(){
				console.log("取消");
				this.delINdex = -1
				this.isConfrm = false
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		width: 100%;
		padding-bottom: 80px;

		.dimc-list {
			box-sizing: border-box;
			width: 100%;
			padding: 0 20px;
			padding-top: 190rpx;
			color: #FFF;
			.dynamic-title{
				height: 30px;
				line-height: 30px;
				margin-bottom: 10px;
				color: #FFF;
				font-size: 20px;
				font-style: italic;
				font-weight: bolder;
			}
			.text-area {
				box-sizing: border-box;
				height: 30vh;
				width: 100%;
				margin-bottom: 10px;
				padding: 5px 10px;
				border: 1px solid #AAA;
				border-radius: 10px;
				box-shadow: 3px 3px 6px rgba(255, 255, 255, .2);
			}

			.add-pic {
				display: grid;
				grid-template-columns: 1fr 1fr 1fr;
				box-sizing: border-box;
				min-height: 80px;
				width: 100%;
				margin-bottom: 10px;
				border-top: 1px solid rgba(255, 255, 255, .3);
				border-bottom: 1px solid rgba(255, 255, 255, .3);

				.add {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 90px;
					width: 100%;

					.pic {
						width: 80px;
						height: 80px;
					}
				}
			}

			@media screen and (min-width: 720px) and (max-width: 1280px) {
				.add-pic {
					grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
				}
			}


		}

		.send-btn {
			height: 34px;
			width: 100%;
			padding: 0 20px;
			box-sizing: border-box;

			button {
				line-height: 34px;
				height: 34px;
				text-align: center;
				font-weight: bolder;
				font-size: 18px;
				background-color: aqua;
			}
		}
	}
</style>