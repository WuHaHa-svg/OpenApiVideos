//options参数：url、method、data{}、
import {GetToken} from "@/utils/GetData.js"

// 此模块将uni.request封装,并添加相应的方法处理 请求头/响应头（如果有必要）

// 添加认证的请求头处理方法
function addAuth(options) {
	var auth = ""
	try {
		auth = GetToken()
	} catch (e) {
		auth = "undefined"
	}
	console.log("添加认证",auth)
	options.header = {
		"accept": "application/json",
		"token" : auth
	}
	return options
}

// 定义base_url
const base_url = "https://api.apiopen.top"

// 封装请求
const requestApi = function(options = {}) {
	options.url = base_url + options.url
	options.timeout = 10000
	options.dataType = 'json'
	//请求头预处理
	if (options.isAuth) {
		options = addAuth(options)
	}
	// 页面管理Api预处理
	if (options.isPage) {
		options.url = "https://gitee.com/WuHaHa-svg/open-api-videos/raw/MarkDownImgs/config.json"
	}
	//请求Promise化
	return new Promise((resolve,reject)=>{
		uni.request({
			url:options.url,
			method:options.method,
			data:options.data,
			dataType:options.dataType,
			header:options.header,
			success(res) {
				resolve(res)
			},
			fail(res){
				resolve(res)
			}
		})
	})
}

export default requestApi