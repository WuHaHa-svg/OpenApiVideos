import requestApi from './Http.js'
// 此模块通过引入封装的requestApi,实现对Api的统一管理



// 处理请求参数的方法
function makeOptions(url,method,...params){
	let options = {}
	options.url = url
	options.method = method
	options.data = {}
	if(params.length > 0) options.data = params[0]
	return options
}

//RegisterApi
export const RegisterApi = async function(data){
	let url = '/api/register'
	let method = 'POST'
	const options = makeOptions(url,method,data)
	options.isAuth = false
	let res = await requestApi(options)
	return res
}

//VerifyCodeApi
export const VerifyCodeApi = async function(data){
	let url = '/api/sendVerificationCode'
	let method = 'POST'
	const options = makeOptions(url,method,data)
	options.isAuth = false
	let res = await requestApi(options)
	return res
}

//LoginApi
export const LoginApi = async function(data){
	let url = '/api/login'
	let method = 'POST'
	const options = makeOptions(url,method,data)
	options.isAuth = false
	let res = await requestApi(options)
	return res
}

//GetUserApi
export const GetUserApi = async function(){
	let url = '/api/getUserInfo'
	let method = 'GET'
	const options = makeOptions(url,method)
	options.isAuth = true
	let res = await requestApi(options)
	return res
}

//UpdateUserApi
export const UpdateUserApi = async function(data){
	let url = '/api/updateUserInfo'
	let method = 'POST'
	const options = makeOptions(url,method,data)
	options.isAuth = true
	let res = await requestApi(options)
	return res
}

//VideoApi
export const VideoApi = async function(data){
	let url = '/api/getMiniVideo'
	let method = 'GET'
	const options = makeOptions(url,method,data)
	options.isAuth = false
	let res = await requestApi(options)
	return res
}

//WallPaperApi
export const WallPaperApi = async function(data){
	let url = '/api/getImages'
	let method = 'GET'
	const options = makeOptions(url,method,data)
	options.isAuth = false
	let res = await requestApi(options)
	return res
}

//GetBlurer
export const GetBlurApi = async function(){
	let url = '/api/sentences'
	let method = 'GET'
	const options = makeOptions(url,method)
	options.isAuth = false
	let res = await requestApi(options)
	return res
}

//GetAllDynamicApi
export const GetAllDynamicApi = async function(data){
	let url = '/api/getDynamic'
	let method = 'GET'
	const options = makeOptions(url,method,data)
	options.isAuth = false
	let res = await requestApi(options)
	return res
}

//GetMyDynamicApi
export const GetMyDynamicApi = async function(data){
	let url = '/api/getPersonDynamicList'
	let method = 'GET'
	const options = makeOptions(url,method,data)
	options.isAuth = true
	let res = await requestApi(options)
	return res
}

//DelMyDynamicApi
export const DelMyDynamicApi = async function(data){
	let url = '/api/delPersonDynamicList'
	let method = 'POST'
	const options = makeOptions(url,method,data)
	options.isAuth = true
	let res = await requestApi(options)
	return res
}

//UploadZoneApi
export const UploadZoneApi = async function(data){
	let url = '/api/publishDynamic'
	let method = 'POST'
	const options = makeOptions(url,method,data)
	options.isAuth = true
	let res = await requestApi(options)
	return res
}

//PagesManage
export const PagesManage = async function(){
	let url = 'none'
	let method = 'GET'
	const options = makeOptions(url,method)
	options.isAuth = false
	options.isPage = true
	let res = await requestApi(options)
	return res
}