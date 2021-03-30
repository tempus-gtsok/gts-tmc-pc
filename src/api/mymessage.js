//登录请求封装
import http from './http'
//登录
const username = data => {//获取用户信息
  return http.Post({
    api: '/tms/api/user/getUserInfo',
    data: data
  })
}
const customer_Name = data => {//解除公司绑定
  return http.Post({
    api: '/tms/api/user/QuitCompany',
    data: data
  })
}
const updatePassengerCertificateList = data => {//添加证件
  return http.Post({
    api: '/tms/api/user/updatePassengerCertificateList',
    data: data
  })
}
const newcommonadd = data => {//添加地址
  return http.Post({
    api: '/tms/api/user/addOrUpdateMailAddress',
    data: data
  })
}
const getMailAddressLis = data => {//添加地址
  return http.Get({
    api: '/tms/api/user/getMailAddressList',
    data: data
  })
}
const deleteMailAddres = data => {//删除常用地址
  return http.Post({
    api: '/tms/api/user/deleteMailAddress',
    data: data
  })
}
const getPassengerList = data => {//查询常用旅客
  return http.Post({
    api: '/tms/api/user/getPassengerList',
    data: data
  })
}
const deleteTemporary = data => {//删除常用旅客
  return http.Post({
    api: '/tms/api/user/deleteTemporary',
    data: data
  })
}
const saveTemporary = data => {//新增修改常用旅客
  return http.Post({
    api: '/tms/api/user/saveTemporary',
    data: data
  })
}
export default {
  username,
  customer_Name,
  newcommonadd,
  getMailAddressLis,
  updatePassengerCertificateList,
  deleteMailAddres,
  getPassengerList,
  deleteTemporary,
  saveTemporary
}
