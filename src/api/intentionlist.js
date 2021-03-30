//订单请求封装
import http from './http'
/* author: I won’t leave my name, for fear of being beaten by someone who takes over */

const submitHolRequire = data => {//酒店意向单提交
    return http.Post({
        api: '/tms/api/require/submitHolRequire',
        data: data
    })
}

const searchHotelRequireList = data => {//酒店意向单列表查询
    return http.Post({
        api: '/tms/api/require/searchHotelRequireList',
        data: data
    })
}

const toSearch = data => {//机票意向单列表查询
    return http.Get({
        api: '/tms/api/dps/require/toSearch',
        data: data
    })
}

const toOrderDetail = data => {//机票意向单列表查询
    return http.Get({
        api: '/tms/api/require/toOrderDetail',
        data: data
    })
}

const cancelHolRequire = data => {//酒店意向单取消
    return http.Get({
        api: '/tms/api/require/cancelHolRequire',
        data: data
    })
}

const confirmOrder = data => {//酒店意向单取消
    return http.Post({
        api: '/tms/api/require/confirmOrder',
        data: data
    })
}

const addRequire = data => {//机票意向单提交
    return http.Post({
        api: '/tms/api/dps/require/addRequire',
        data: data
    })
}

const getDetail = data => {//机票意向单详情
    return http.Get({
        api: '/tms/api/dps/require/getDetail',
        data: data
    })
}

const requireBooking = data => {//机票意向单确认
    return http.Post({
        api: '/tms/api/dps/require/requireBooking',
        data: data
    })
}

const cancel = data => {//机票意向单取消
    return http.Get({
        api: '/tms/api/dps/require/cancel',
        data: data
    })
}


export default {
    submitHolRequire,
    searchHotelRequireList,
    toSearch,
    toOrderDetail,
    cancelHolRequire,
    confirmOrder,
    addRequire,
    getDetail,
    requireBooking,
    cancel
}
