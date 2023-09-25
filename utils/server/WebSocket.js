// 建立WebSocket链接


//引入讯飞大模型的鉴权url
// import {XF_AuthorUrl} from "@/utils/server/AuthorUrlGener.js"

class WebsocketUtil {
	constructor(url) {
		this.url = url //地址
		this.data = null
		try {
			return this.connectSocketInit()
		} catch (e) {
			console.log('catch');
		}
	}

	// 进入这个页面的时候创建websocket连接【整个页面随时使用】
	connectSocketInit() {
		this.socketTask = uni.connectSocket({
			url: this.url,
			success:()=>{
				console.log("正准备建立websocket中...");
				// 返回实例
				return this.socketTask
			},
		});
		this.socketTask.onOpen((res) => {
			console.log("WebSocket连接正常！");
			// 注：只有连接正常打开中 ，才能正常收到消息
			this.socketTask.onMessage((res) => {
				console.log(res.data)
			});
		})
		
		// 监听连接失败，这里代码我注释掉的原因是因为如果服务器关闭后，和下面的onclose方法一起发起重连操作，这样会导致重复连接
		this.socketTask.onError((res) => {
			console.log('WebSocket连接打开失败，请检查！');
			uni.showToast({
				title:"请配置APIKEY!",
				icon:"error",
				duration:2000
			})
		});
		
		
	}
	
	//发送消息
	send(value){
		// 注：只有连接正常打开中 ，才能正常成功发送消息
		this.socketTask.send({
			data: value,
			success() {
				console.log("消息发送成功");
			},
		});
	}

	//外部获取消息
	getMessage(callback) {
		this.socketTask.onMessage((res) => {
			return callback(res)
		})
	}
	//关闭链接
	close(){
		// 这里仅是事件监听【如果socket关闭了会执行】
		this.socketTask.onClose(() => {
			console.log("已经被关闭了")
		})
	}
}

export default WebsocketUtil




// export const XF_WS_Task = async () => {
// 	let url = await XF_AuthorUrl();
// 	return uni.connectSocket({
// 		url,
// 		method: 'GET',
// 		success(res,a,b){
// 			console.log(res,a,b);
// 		},
// 		fail(err){
// 			console.log(err,"连接失败！",url);
// 		}
// 	})
	
// }