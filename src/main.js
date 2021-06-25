// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import './utils/flexible'
import 'babel-polyfill'
import Vue from 'vue'
// import App from './App'
import router from './router'
import echarts from 'echarts'
import defray from "./components/common/defray";
import travel_report from "./pages/travel_report/travel_report";
import JsonExcel from 'vue-json-excel'
Vue.prototype.$echarts = echarts;
import ElementUI from 'element-ui'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.rotes = function(er){
	let list = JSON.parse(sessionStorage.getItem('userinfo')).permissionList;
	list = list.join();
	if(list.indexOf(er) != -1){
		return true;
	}
	return false;
}
import api from './api/config/index'
import store from '../store/index.js'
import vueXlsxTable from 'vue-xlsx-table'
import resetMessage from './utils/resetMessage';
import utils from './utils/utils.js'
Vue.component('downloadExcel', JsonExcel)
Vue.use(travel_report)
Vue.use(defray)
Vue.use(vueXlsxTable)
Vue.prototype.$store = store
require('es6-promise').polyfill();
require('es6-promise/auto');
Vue.use(ElementUI)
Vue.use(api)
Vue.prototype.$ele = ElementUI
Vue.config.productionTip = false
Vue.prototype.$message = resetMessage;
Vue.prototype.$utils = utils;
// 设置浏览器标题
Vue.directive('title', {
    inserted: function (el, binding) {
        document.title = el.dataset.title
    }
})


router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);
    // chrome
    document.body.scrollTop = 0
    // firefox
    document.documentElement.scrollTop = 0
    // safari
    window.pageYOffset = 0
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title
	}
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        let username = JSON.parse(sessionStorage.getItem('userinfo'));
        let appslit = {};
        if (to.path == '/home') {
            let sits = window.location.hash.split('?');
            if (sits.length > 1) {
                let str = sits[1];
                if (str.indexOf('&') >= 0) {
                    let scv = str.split('&');
                    for (var i = 0; i < scv.length; i++) {
                        var scvs = scv[i].split('=');
                        appslit[scvs[0]] = scvs[1];
                    }
                    let rs = {};
                    if (appslit.sessionId != null && appslit.sessionId != undefined) {
                        sessionStorage.setItem('sessionIds', appslit.sessionId);
                    }
                    if (appslit.appId != null && appslit.appId != undefined) {
                        sessionStorage.setItem('appIds', appslit.appId);
                    }
                    if (appslit.corpid != null && appslit.corpid != undefined) {
                        sessionStorage.setItem('corpid', appslit.corpid);
                    }
                    if (appslit.customerNo != null && appslit.customerNo != undefined) {
                        sessionStorage.setItem('customerNo', appslit.customerNo);
                    }
                    next();
                    return
                } else {
                    if (str.substring(0, 5) == 'appId') {
                        sessionStorage.setItem('appIds', str.substr(6));
                    } else if (str.substring(0, 9) == 'sessionId') {
                        sessionStorage.setItem('sessionIds', str.substr(10));
                    } else if (str.substring(0, 6) == 'corpid') {
                        sessionStorage.setItem('corpid', str.substr(7));
                    }
                    next();
                    return
                }
            }
        }
        if (username != null && username != '' && username != undefined) { // 判断是否登录
            next();
        } else {
            next({
                path: '/login'
            })
        }
    } else {
        next();
    }
})
/* eslint-disable no-new */
const rootVueObj = new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
})

export default rootVueObj;
