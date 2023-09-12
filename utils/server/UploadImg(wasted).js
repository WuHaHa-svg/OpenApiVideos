function ChooseImg(count) {
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count,
			crop: {
				width: 200,
				height: 200
			},
			sourceType: ['album'],
			success(res) {
				resolve(res.tempFilePaths)
			}
		})
	})
}

function UploadImg(tempFilePath) {
	let http = "https://api.apiopen.top"
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: "https://api.apiopen.top/api/uploadFile",
			filePath: tempFilePath,
			name: "file",
			header: {
				"Content-Type": "image/png",
				"accept": "application/json"
			},
			success(res) {
				if (JSON.parse(res.data).code !== 200) {
					resolve("上传出错")
					console.log(res);
				} else {
					let imgUrl = http + JSON.parse(res.data).result.name
					resolve(imgUrl)
				}
			}
		})
	})
}

const allDone = async (count=1)=>{
	let resUrl = []
	let tempFilePaths = await ChooseImg(count)
	for (let i = 0; i < tempFilePaths.length; i ++){
		let res = await UploadImg(tempFilePaths[i])
		resUrl.push(res)
	}
	return new Promise((resolve,reject)=>{
		resolve(resUrl)
	})
}

export default allDone