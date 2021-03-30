import axios from './config/api' // 倒入 api
import Login from './Login'
import home from './home'
import mymessage from './mymessage.js'
import order from './order.js'
import business from './business.js'
import intentionlist from "./intentionlist.js";
import applicat from './applicat.js'
import travelreport from './travel_report.js'
// 根据请求不同 若存在token则带上token验证登录状态

const getJsonData = params => {
  let method = '/' + params.method
  return axios({
    url: method + params.api,
    method: 'get'
  })
}

// 默认全部倒出
// 根绝需要进行
export default {
  Login,
  home,
  mymessage,
  order,
  business,
  applicat,
  travelreport,
  intentionlist
}
