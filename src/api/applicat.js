//申请单功能请求封装
import http from './http'

const getApplyList = data => {//我的申请列表
  return http.Post({
    api: '/tms/api/apprv/getApplyList',
    data: data
  })
}

const saveApprv = data => {//提交申请
  return http.Post({
    api: '/tms/api/apprv/saveApprv',
    data: data
  })
}

const detailApply = data => {//申请审批详情
  return http.Get({
    api: '/tms/api/apprv/detailApply',
    data: data
  })
}

const getApprvList = data => {//审批单列表
  return http.Post({
    api: '/tms/api/apprv/getApprvList',
    data: data
  })
}

const getApprvOrderInfo = data => {//审批改签单 行程 查询
  return http.Get({
    api: '/tms/api/apprv/getApprvOrderInfo',
    data: data
  })
}

const cancelTask = data => {//申请单撤回
  return http.Post({
    api: '/tms/api/apprv/cancelTask',
    data: data
  })
}

const apprvTask = data => {//进行审批操作
  return http.Post({
    api: '/tms/api/apprv/apprvTask',
    data: data
  })
}

export default {
  getApplyList,
  saveApprv,
  detailApply,
  getApprvList,
  getApprvOrderInfo,
  cancelTask,
  apprvTask
}
