import BaseConfig from "./BaseConfig.js"
import UserData from "./UserData.js"
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		BaseConfig,
		UserData
	}
})