//订单请求封装
import http from './http'
//火车飞机订单
const queryOrders = data => {// //订单查询
    return http.Post({
        api: '/tms/api/order/queryOrders',
        data: data
    })
}

//微信支付
const confirmPay = data => {
    return http.Post({
        api: '/tms/api/pay/confirmPay',
        data: data
    })
}
//出行人默认查询
const getPassengerListNoCertificate = data => {
    return http.Post({
        api: '/tms/api/cpsuser/getPassengerListNoCertificate',
        data: data
    })
}
//国内航司查询
const queryAirlineList = data => {
    return http.Post({
        api: '/tms/api/dps/airline/queryAirlineList',
        data: data
    })
}
//酒店订单查询
const searchHotelOrderList = data => {
    return http.Post({
        api: '/tms/api/hotel/order/searchHotelOrderList',
        data: data
    })
}
//飞机改签订单查询
const queryChangeInfo = data => {
    return http.Post({
        api: '/tms/api/internal/change/order/queryChangeInfo',
        data: data
    })
}
//获取支付方式
const getPayWay = data => {
    return http.Get({
        api: '/tms/api/pay/getPayWay',
        data: data
    })
}
//飞机取消订单
const cancelOrder = data => {
    return http.Get({
        api: '/tms/api/dps/order/cancelOrder',
        data: data
    })
}
//飞机退票订单查询
const queryOrderRefundList = data => {
    return http.Get({
        api: '/tms/api/dps/order/refurn/queryOrderRefundList',
        data: data
    })
}
//查询国内退废单详情
const orderRefundDetail = data => {
    return http.Get({
        api: '/tms/api/dps/order/refurn/orderRefundDetail',
        data: data
    })
}
//获取p价
const getPnrPriceInfor = data => {
    return http.Post({
        api: '/tms/api/dps/book/getPnrPriceInfor',
        data: data
    })
}
//保险规则判断
const getTravelPolicy = data => {
    return http.Get({
        api: '/tms/api/basedata/travelPolicy/getTravelPolicy',
        data: data
    })
}
//重复预订规则超规校验
const ruleCheckRepeatBook = data => {
    return http.Post({
        api: '/tms/api/dps/airline/ruleCheckRepeatBook',
        data: data
    })
}
//飞机订单详情
const getOrderDetailByTranNo = data => {
    return http.Get({
        api: '/tms/api/dps/order/getOrderDetailByTranNo',
        data: data
    })
}
//国内飞机退废票申请提交
const orderRefundApplyCommit = data => {
    return http.Post({
        api: '/tms/api/dps/order/refurn/orderRefundApplyCommit',
        data: data
    })
}
//查询国内改签单详情
const openChangeDetail = data => {
    return http.Get({
        api: '/tms/api/internal/change/order/openChangeDetail',
        data: data
    })
}
//国内机票改签取消
const cancelChanges = data => {
    return http.Get({
        api: '/tms/api/internal/change/order/cancelChange',
        data: data
    })
}
//火车退改订单查询
const trainChangeList = data => {
    return http.Post({
        api: 'tms/api/train/trainChangeList',
        data: data
    })
}

//酒店订单详情
const toOrderDetail = data => {
    return http.Get({
        api: 'tms/api/hotel/order/toOrderDetail',
        data: data
    })
}

//酒店取消订单
const cancelHolOrder = data => {
    return http.Post({
        api: '/tms/api/hotel/order/cancelHolOrder',
        data: data
    })
}

//是否需要审核信息
const ruleMainSetting = data => {
    return http.Get({
        api: '/tms/api/cpsuser/ruleMainSetting',
        data: data
    })
}

//改签因公查询no接口
const getStaffByTravelNoAndNames = data => {
    return http.Post({
        api: 'tms/api/apprv/getStaffByTravelNoAndNames',
        data: data
    })
}

//火车酒店退票因公是否都需要审核
const judgeApprv = data => {
    return http.Post({
        api: '/tms/api/apprv/judgeApprv',
        data: data
    })
}

//火车订单详情
const toTrainInfo = data => {
    return http.Get({
        api: '/tms/api/train/toTrainInfo',
        data: data
    })
}

//火车订单详情判断是否能退票和改签
const checkRetundAndChange = data => {
    return http.Get({
        api: '/tms/api/train/checkRetundAndChange',
        data: data
    })
}

//火车订单取消
const cancelSaleOrderExt = data => {
    return http.Put({
        api: '/tms/api/train/cancelSaleOrderExt',
        data: data
    })
}

//火车退票
const applyRefundTrain = data => {
    return http.Post({
        api: '/tms/api/train/applyRefundTrain',
        data: data
    })
}
//火车改签后退票
const applyChangeRefundTrain = data => {
    return http.Post({
        api: '/tms/api/train/applyChangeRefundTrain',
        data: data
    })
}
//火车退票订单详情
const trainChangeInfoBySaleChangeNo = data => {
    return http.Get({
        api: '/tms/api/train/trainChangeInfoBySaleChangeNo',
        data: data
    })
}

//火车退票订单详情
const trainChangeInfo = data => {
    return http.Get({
        api: '/tms/api/train/trainChangeInfo',
        data: data
    })
}

//火车取消改签
const cancelChange = data => {
    return http.Get({
        api: '/tms/api/train/cancelChange',
        data: data
    })
}

//获取酒店我的行程和历史行程
const searchMySelfHotelOrderList = data => {
    return http.Post({
        api: '/tms/api/hotel/order/searchMySelfHotelOrderList',
        data: data
    })
}

//获取火车机票我的行程和历史行程
const queryMyselfOrders = data => {
    return http.Post({
        api: '/tms/api/order/queryMyselfOrders',
        data: data
    })
}

//查询出差申请的非必选模式
const getTravelSwitch = data => {
    return http.Post({
        api: '/tms/api/apprv/getTravelSwitch',
        data: data
    })
}

export default {
    confirmPay,
    queryOrders,
    getPassengerListNoCertificate,
    queryAirlineList,
    searchHotelOrderList,
    queryChangeInfo,
    cancelOrder,
    queryOrderRefundList,
    orderRefundDetail,
    getPnrPriceInfor,
    getTravelPolicy,
    ruleCheckRepeatBook,
    trainChangeList,
    toOrderDetail,
    cancelHolOrder,
    ruleMainSetting,
    getStaffByTravelNoAndNames,
    judgeApprv,
    toTrainInfo,
    checkRetundAndChange,
    cancelSaleOrderExt,
    // trainChangeVerification,
    applyRefundTrain,
    trainChangeInfoBySaleChangeNo,
    applyChangeRefundTrain,
    cancelChange,
    trainChangeInfo,
    getOrderDetailByTranNo,
    orderRefundApplyCommit,
    openChangeDetail,
    cancelChanges,
    searchMySelfHotelOrderList,
    queryMyselfOrders,
    getPayWay,
    getTravelSwitch
}
