//登录请求封装
import http from './http'
//登录
const accountlogin = data => { //账号密码登录
	return http.Post({
		api: '/tms/api/user/phonePwdLogin',
		data: data
	})
}

const login = data => { //手机号登录
	return http.Post({
		api: '/tms/api/user/login',
		data: data
	})
}
const changePassword = data => {
	return http.Post({
		api: '/tms/api/user/changePassword',
		data: data
	})
}

const findPassword = data => { //重置密码
	return http.Post({
		api: '/tms/api/user/findPassword',
		data: data
	})
}

const cerificationCode = data => { //获取验证码
	return http.Get({
		api: '/tms/api/user/cerificationCode',
		data: data
	})
}
const getTraverPolicy = data => { //政策
	return http.Post({
		api: '/tms/api/user/getTraverPolicy',
		data: data
	})
}
const vess_code = data => { //获取验证码
	return http.Get({
		api: '/tms/api/user/cerificationCode',
		data: data
	})
}
const change_phone = data => { //修改手机号
	return http.Post({
		api: '/tms/api/user/changePhone',
		data: data
	})
}

const getenv = data => { //获取环境变量成功
	return http.Get({
		api: '/tms/api/env/getEnvForPC',
		data: data
	})
}


export default {
	getenv,
	accountlogin,
	login,
	cerificationCode,
	findPassword,
	getTraverPolicy,
	vess_code,
	change_phone,
	changePassword
}
