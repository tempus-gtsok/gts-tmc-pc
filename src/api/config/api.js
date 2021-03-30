import axios from 'axios' // 注意先安装哦
import config from './config.js' // 倒入默认配置
import qs from 'qs' // 序列化请求数据，视服务端的要求
import Vue from 'vue'
import rootVueObj from '../../main.js'
import { Message } from 'element-ui';

export default function $axios (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: {"Content-Type":"application/json"}
      // withCredentials: true
    })
    // request 拦截器
    instance.interceptors.request.use(
      config => {
        // Tip: 1
        // 请求开始的时候可以结合 vuex 开启全屏的 loading 动画
        // Tip: 2
        // 带上 token , 可以结合 vuex 或者重 localStorage
        // if (store.getters.token) {
        //   config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
        // } else {
        //   // 重定向到登录页面
        // }
        // Tip: 3
        // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (config.method.toLocaleLowerCase() === 'post' || config.method.toLocaleLowerCase() === 'put' || config.method.toLocaleLowerCase() === 'delete') {
          // config.data = qs.stringify(config.data)
        }
        return config
      },
      error => {
        // 请求错误时做些事(接口错误、超时等)
        // Tip: 4
        // 关闭loadding

        // 1.判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案')
          // return service.request(originalRequest);//例如再重复请求一次
        }
        // 2.需要重定向到错误页面
        const errorInfo = error.response
        if (errorInfo) {
          // error =errorInfo.data//页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
          const errorStatus = errorInfo.status // 404 403 500 ... 等
          this.$router.push({
            path: `/error/${errorStatus}`
          })
        }
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data === undefined) {
          data = response.request.responseText
        } else {
          data = response.data
        }
           //根据返回的code值来做不同的处理（和后端约定）
        switch (data.code) {
           case "401":
							rootVueObj.$router.push('/login')
           case "404":
             	Message.error('请求地址出错！')
             	rootVueObj.$router.push('/404')
           case "500":
              rootVueObj.$router.push('/login')
            	break
					 case "504":
              break
           default:
         }
        return data
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
          case 400:
         	Message.error('参数错误!')
            break
          case 401:
          	Message.error('未授权，请登录！')
            break
          case 403:
          	Message.error('拒绝访问！')
            break
          case 404:
          	Message.error('请求地址错误！')
            break
          case 408:
          	Message.error('请求超时！')
            break
          case 500:
          	Message.error('服务器内部错误！')
            break
          case 501:
         		Message.error('服务未实现！')
            break
          case 502:
        		Message.error('请求错误！')
            break
          case 503:
          	Message.error('服务不可用！')
            break
          case 504:
          	Message.error('网关超时,请检查网络！')
            break
          case 505:
          	Message.error('请检查http版本！')
            break
          default:
          	Message.error(err.response.status + '服务器错误！')
          }
        }
        console.error(err)
        // 此处我使用的是 element UI 的提示组件
        // Message.error(`ERROR: ${err}`);
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    )
    // 请求处理
    instance(options)
      .then((res) => {
        if ((typeof res === 'string') && res.constructor === String) {
          resolve(JSON.parse(res))
        } else {
          resolve(res)
        }
        return false
      })
      .catch((error) => {
        reject(error)
      })
  })
}
