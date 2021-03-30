//企业管理功能请求封装
import http from './http'

const getCustomerUserListForPC = data => { //查询部门下所有的人
  return http.Post({
    api: '/tms/api/cpsuser/getCustomerUserListForPC',
    data: data
  })
}

const getDeptList = data => { //查询所有部门
  return http.Post({
    api: '/tms/api/cpsuser/getDeptList',
    data: data
  })
}

const addPassengerForCustomer = data => { //查询新增用户需要的数据
  return http.Post({
    api: '/tms/api/user/addPassengerForCustomer',
    data: data
  })
}

const savePassengerForCustomer = data => { //新增修改同事
  return http.Post({
    api: '/tms/api/user/savePassengerForCustomer',
    data: data
  })
}

const deleteOrStatus = data => { //删除同事
  return http.Post({
    api: '/tms/api/user/deleteOrStatus',
    data: data
  })
}

const getRoleList = data => { //查询角色列表
  return http.Post({
    api: '/tms/api/cpsuser/getRoleList',
    data: data
  })
}

const getPermission = data => { //查询当前角色权限
  return http.Get({
    api: '/tms/api/cpsuser/getPermission',
    data: data
  })
}

const addOrUpdateRole = data => { //修改新增当前角色权限
  return http.Post({
    api: '/tms/api/cpsuser/addOrUpdateRole',
    data: data
  })
}
const deleteRole = data => { //删除当前角色
  return http.Post({
    api: '/tms/api/cpsuser/deleteRole',
    data: data
  })
}

const addOrUpdateDept = data => { //新增修改部门
  return http.Post({
    api: '/tms/api/cpsuser/addOrUpdateDept',
    data: data
  })
}
const deleteDept = data => { //删除部门
  return http.Post({
    api: '/tms/api/cpsuser/deleteDept',
    data: data
  })
}

const getStaffLevelList = data => { //查询所有职级
  return http.Post({
    api: '/tms/api/cpsuser/getStaffLevelList',
    data: data
  })
}

const insertOrUpdateLevel = data => { //新增修改职级
  return http.Post({
    api: '/tms/api/cpsuser/insertOrUpdateLevel',
    data: data
  })
}

const deleteLevel = data => { //删除职级
  return http.Post({
    api: '/tms/api/cpsuser/deleteLevel',
    data: data
  })
}

const addOrUpdateCostCenter = data => { //新增修改成本中心
  return http.Post({
    api: '/tms/api/cpsuser/addOrUpdateCostCenter',
    data: data
  })
}

const deleteCostCenter = data => { //删除成本中心
  return http.Post({
    api: '/tms/api/cpsuser/deleteCostCenter',
    data: data
  })
}

const costDetail = data => { //查询当前成本详情
  return http.Get({
    api: '/tms/api/cpsuser/costDetail',
    data: data
  })
}

const deptApprvlist = data => { //查询当前部门审批类型
  return http.Get({
    api: '/tms/api/apprv/deptApprvlist',
    data: data
  })
}
const switchFlowsDeptApprv = data => { //是否启用部门流程
  return http.Post({
    api: '/tms/api/apprv/switchFlowsDeptApprv',
    data: data
  })
}

const insertOrUpdateDeptApprv = data => { //新增修改部门流程
  return http.Post({
    api: '/tms/api/apprv/insertOrUpdateDeptApprv',
    data: data
  })
}

const staffJudgeDeptApprv = data => { //查询该用户在部门适用人员中是否存在
  return http.Get({
    api: '/tms/api/apprv/staffJudgeDeptApprv',
    data: data
  })
}

const deptApprvDetail = data => { //查询部门审批流程详情
  return http.Get({
    api: '/tms/api/apprv/deptApprvDetail',
    data: data
  })
}

const deleteDeptApprv = data => { //删除部门该审批流程
  return http.Delete({
    api: '/tms/api/apprv/deleteDeptApprv',
    data: data
  })
}

const apprvCostFlowList = data => { //查询当前成本中心审批
  return http.Get({
    api: '/tms/api/apprv/apprvCostFlowList',
    data: data
  })
}

const switchFlowsCostApprv = data => { //是否启用成本流程
  return http.Post({
    api: '/tms/api/apprv/switchFlowsCostApprv',
    data: data
  })
}
const getApprvCostDetail = data => { //查询成本中心审批流程详情
  return http.Get({
    api: '/tms/api/apprv/getApprvCostDetail',
    data: data
  })
}

const insertOrUpdateApprvCost = data => { //新增修改成本中心流程
  return http.Post({
    api: '/tms/api/apprv/insertOrUpdateApprvCost',
    data: data
  })
}

const staffJudgeApprvCost = data => { //查询该用户在成本适用人员中是否存在
  return http.Get({
    api: '/tms/api/apprv/staffJudgeApprvCost',
    data: data
  })
}

const deleteApprvCost = data => { //删除成本该审批流程
  return http.Delete({
    api: '/tms/api/apprv/deleteApprvCost',
    data: data
  })
}
const getNoExamineStaffByPage = data => { //获取免审列表
  return http.Get({
    api: '/tms/api/traverRule/getNoExamineStaffByPage',
    data: data
  })
}

const getTravelPassengerByPage = data => { //获取出行人列表
  return http.Get({
    api: '/tms/api/traverRule/getTravelPassengerByPage',
    data: data
  })
}

const addNoExamineStaff = data => { //添加到免审名单
  return http.Get({
    api: '/tms/api/traverRule/addNoExamineStaff',
    data: data
  })
}

const delNoExamineStaff = data => { //移除免审名单
  return http.Delete({
    api: '/tms/api/traverRule/delNoExamineStaff',
    data: data
  })
}

const nativeAirTicketRule = data => { //国内机票规则列表
  return http.Get({
    api: '/tms/api/traverRule/nativeAirTicketRule',
    data: data
  })
}

const addOrUpdateNativeAirTicketRule = data => { //新增修改国内机票规则
  return http.Post({
    api: '/tms/api/traverRule/addOrUpdateNativeAirTicketRule',
    data: data
  })
}

const delNativeAirTicketRule = data => { //删除国内机票规则
  return http.Delete({
    api: '/tms/api/traverRule/delNativeAirTicketRule',
    data: data
  })
}

const getNativeAirTicketRule = data => { //国内机票规则详情
  return http.Get({
    api: '/tms/api/traverRule/getNativeAirTicketRule',
    data: data
  })
}

const hotelRule = data => { //国内酒店政策列表
  return http.Get({
    api: '/tms/api/traverRule/hotelRule',
    data: data
  })
}

const addOrUpdateHotelRule = data => { //新增修改国内酒店规则
  return http.Post({
    api: '/tms/api/traverRule/addOrUpdateHotelRule',
    data: data
  })
}

const getHotelRule = data => { //国内酒店规则详情
  return http.Get({
    api: '/tms/api/traverRule/getHotelRule',
    data: data
  })
}

const delHotelRule = data => { //删除国内酒店规则
  return http.Delete({
    api: '/tms/api/traverRule/delHotelRule',
    data: data
  })
}

const nativeTrainRule = data => { //国内火车政策列表
  return http.Get({
    api: '/tms/api/traverRule/nativeTrainRule',
    data: data
  })
}

const addOrUpdateNativeTrainRule = data => { //新增修改国内火车规则
  return http.Post({
    api: '/tms/api/traverRule/addOrUpdateNativeTrainRule',
    data: data
  })
}

const getNativeTrainRule = data => { //国内火车规则详情
  return http.Get({
    api: '/tms/api/traverRule/getNativeTrainRule',
    data: data
  })
}

const delNativeTrainRule = data => { //删除国内火车规则
  return http.Delete({
    api: '/tms/api/traverRule/delNativeTrainRule',
    data: data
  })
}

const travelCityRule = data => { //获取城市级别管理列表
  return http.Get({
    api: '/tms/api/traverRule/travelCityRule',
    data: data
  })
}

const addOrUpdateTravelCity = data => { //新增编辑地区类别
  return http.Post({
    api: '/tms/api/traverRule/addOrUpdateTravelCity',
    data: data
  })
}

const delTravelCity = data => { //删除地区类别
  return http.Delete({
    api: '/tms/api/traverRule/delTravelCity',
    data: data
  })
}

const carRuleList = data => { //差旅规则用车列表
  return http.Get({
    api: '/tms/api/traverRule/carRuleList',
    data: data
  })
}

const addOrUpdateCarRule = data => { //新增或修改用车差旅政策
  return http.Post({
    api: '/tms/api/traverRule/addOrUpdateCarRule',
    data: data
  })
}

const getCarRule = data => { //差旅规则用车详情
  return http.Get({
    api: '/tms/api/traverRule/getCarRule',
    data: data
  })
}

const deleteCarRule = data => { //删除用车差旅政策
  return http.Delete({
    api: '/tms/api/traverRule/deleteCarRule',
    data: data
  })
}

const rulesReasonList = data => { //违规原因列表
  return http.Get({
    api: '/tms/api/traverRule/rulesReasonList',
    data: data
  })
}

const addOrUpdateRulesReason = data => { //添加修改违规原因
  return http.Post({
    api: '/tms/api/traverRule/addOrUpdateRulesReason',
    data: data
  })
}


const delRulesReason = data => { //删除违规原因
  return http.Delete({
    api: '/tms/api/traverRule/delRulesReason',
    data: data
  })
}

export default {
  getCustomerUserListForPC,
  getDeptList,
  addPassengerForCustomer,
  savePassengerForCustomer,
  deleteOrStatus,
  getRoleList,
  getPermission,
  addOrUpdateRole,
  deleteRole,
  addOrUpdateDept,
  deleteDept,
  getStaffLevelList,
  insertOrUpdateLevel,
  deleteLevel,
  addOrUpdateCostCenter,
  deleteCostCenter,
  costDetail,
  deptApprvlist,
  switchFlowsDeptApprv,
  insertOrUpdateDeptApprv,
  deptApprvDetail,
  staffJudgeDeptApprv,
  deleteDeptApprv,
  apprvCostFlowList,
  switchFlowsCostApprv,
  getApprvCostDetail,
  insertOrUpdateApprvCost,
  staffJudgeApprvCost,
  deleteApprvCost,
  getNoExamineStaffByPage,
  getTravelPassengerByPage,
  addNoExamineStaff,
  delNoExamineStaff,
  nativeAirTicketRule,
  addOrUpdateNativeAirTicketRule,
  delNativeAirTicketRule,
  getNativeAirTicketRule,
  hotelRule,
  addOrUpdateHotelRule,
  getHotelRule,
  delHotelRule,
  nativeTrainRule,
  addOrUpdateNativeTrainRule,
  getNativeTrainRule,
  delNativeTrainRule,
  travelCityRule,
  addOrUpdateTravelCity,
  delTravelCity,
  carRuleList,
  addOrUpdateCarRule,
  getCarRule,
  deleteCarRule,
  rulesReasonList,
  addOrUpdateRulesReason,
  delRulesReason
}
