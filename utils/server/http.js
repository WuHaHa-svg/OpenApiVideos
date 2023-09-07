//options参数：url、method、data{}、
import {GetToken} from "@/utils/GetData.js"
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

const base_url = "https://api.apiopen.top"

const requestApi = function(options = {}) {
	options.url = base_url + options.url
	options.timeout = 10000
	options.dataType = 'json'
	
	if (options.isAuth) {
		options = addAuth(options)
	}
	
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