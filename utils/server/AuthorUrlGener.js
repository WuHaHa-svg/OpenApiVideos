// 生成鉴权URL,方便以后添加多种AI

// 通用鉴权url生成所需工具函数

// import * as base64 from "base-64"
// import * as utf8 from "utf8"
import * as base64 from "@/js_sdk/base-64/base64.js"
import * as utf8 from "@/js_sdk/utf8/utf8.js"
import CryptoJS from "@/js_sdk/crypto-js/crypto-js.js"
import parser from "@/js_sdk/fast-xml-parser/src/parser"
import {GetAIConfig} from "@/utils/GetData.js"

//讯飞-星火认知大模型
export const XF_AuthorUrl = ()=>{
		//APISecrate、APIKey
		let AI_DATA = GetAIConfig()
		var APISecret = AI_DATA.APISecret
		var APIKey = AI_DATA.APIKey
		var APPID = AI_DATA.APPID
		
		// WebSocket链接地址
		var url = "wss://spark-api.xf-yun.com/v2.1/chat"
		var host = "spark-api.xf-yun.com"
		
		// 鉴权参数
		var date = new Date().toGMTString()
		var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2.1/chat HTTP/1.1`
		var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, APISecret)
		var signature = CryptoJS.enc.Base64.stringify(signatureSha)
		var algorithm = "hmac-sha256"
		var apiKeyName = "api_key"
		var headers = "host date request-line"
		
		// 鉴权参数整合
		var authorizationOrigin =`${apiKeyName}="${APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
		var authorization = base64.encode(authorizationOrigin)
		
		// 返回鉴权地址
		url = `${url}?authorization=${authorization}&date=${encodeURI(date)}&host=${host}`
		console.log(url);
		return {
			url,
			APPID
		}
}