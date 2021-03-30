import axios from './config/api' // 倒入 api
// 根据请求不同 若存在token则带上token验证登录状态

const Auth = () => {
  let token = JSON.parse(sessionStorage.getItem('userinfo'));
  if (token) {
    let headers = {
      AuthToken: token.token
    }
    return headers
  } else {
    return {}
  }
}

function setObj (method, params) {
  let obj = {
    url: params.api,
    method: method
  }
  let io = 0
  let awy = []
  for (let i = 0; i < awy.length; i++) {
  	if (awy[i] === params.api) {
  		io = 1
  	}
  }
  /**
   * axios的 params是添加到url的请求字符串中的，用于get请求。
   而data是添加到请求体（body）中的， 用于post请求。
   */
  if (method === 'post' || method === 'put') { // post/put的数据放data
    Object.assign(obj, {data: params.data},{responseType: params.responseType})
  } else {
    Object.assign(obj, {params: params.data},{responseType: params.responseType})
  }
  if (params.headers) {
    Object.assign(obj, {headers: params.headers})
  } else {
  	if (io === 1) {
  		Object.assign(obj, {headers: {}})
  	} else {
  		Object.assign(obj, {headers: Auth()})
  	}
  }
  return obj
}

export const Post = (params) => {
  return axios(setObj('post', params))
}

export const Get = params => {
  return axios(setObj('get', params))
}

export const Put = params => {
  return axios(setObj('put', params))
}

export const Delete = params => {
  return axios(setObj('delete', params))
}

// 默认全部倒出
// 根据需要进行
export default {
  Post,
  Put,
  Get,
  Delete
}
