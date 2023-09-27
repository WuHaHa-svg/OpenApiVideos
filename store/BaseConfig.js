export default {
	namespaced: true,
	state: {
		top: 0,
		isDark: false,
		activeTag: "chat",
		tags: [
			{
				'name': '推介',
				'tag': 'index',
				'url': '/pages/index/index'
			},
			{
				'name': '列表',
				'tag': 'list',
				'url': '/subpackages/videoList/videoList'
			},
			{
				'name': '全部动态',
				'tag': 'allDimc',
				'url': '/pages/zone/zone'
			},
			{
				'name': '发个动态',
				'tag': 'upDimc',
				'url': '/subpackages/uploadZone/uploadZone'
			},
			{
				'name': '壁纸',
				'tag': 'wallpaper',
				'url': '/pages/wallpaper/wallpaper'
			},
			{
				'name': 'AI-Chat',
				'tag': 'chat',
				'url': '/pages/chat/chat'
			},
			{
				'name': '我的',
				'tag': 'mine',
				'url': '/pages/mine/mine'
			}
		],
		isUpload: false,
		pagesManage: {
			"index":true,
			"allDimc":true,
			"wallpaper":true,
			"chat":true,
			"mine":true
		}
	},
	mutations: {
		setTop(state, value) {
			// console.log(value)
			state.top = value
		},
		darkMode(state, value) {
			state.isDark = value
		},
		changeTag(state, value) {
			state.activeTag = value
		},
		changeUpload(state, value) {
			state.isUpload = value
		},
		pagesDisplay(state, value) {
			state.pagesManage = value
		}
	},
	actions: {},
	getter: {}
}