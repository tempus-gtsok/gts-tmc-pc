import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: { //定义全局变量
      isLoading: false,
      go_there:[],//往返
      goName:0,//往返的值0是去，1是返回
    },
    mutations: {   //方法
      showLoading(state,isLoad) {
        state.isLoading = isLoad
      },
      go_there_add(state, isLoad){
      	state.go_there = isLoad;
      },
      goName_add(state, isLoad){
      	state.goName = isLoad;
      },
		},
    actions:{
      
    }
})
