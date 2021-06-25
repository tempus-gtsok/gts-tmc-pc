//首页功能请求封装
import http from './http'
const noSecret = data => { //钉钉免登
	return http.Get({
		api: '/tms/api/ding/login/noSecret',
		data: data
	})
}
const currentUserEnterprise = data => { //公司信息列表
	return http.Post({
		api: '/tms/api/user/currentUserEnterprise',
		data: data
	})
}
const changeEnterprise = data => { //修改当前员工所属公司
	return http.Post({
		api: '/tms/api/user/changeEnterprise',
		data: data
	})
}
const getAgreeApprvTask = data => { //出差预定
	return http.Get({
		api: '/tms/api/apprv/getAgreeApprvTask',
		data: data
	})
}

const accountlogins = data => { //id免登
	return http.Get({
		api: '/third/api/user/accountlogin',
		data: data
	})
}


const getPassengerLis = data => { //查询常用旅客
	return http.Post({
		api: '/tms/api/user/getPassengerList',
		data: data
	})
}
const alldepartments = data => { //查询所有部门
	return http.Post({
		api: '/tms/api/cpsuser/getDeptAndUserCount',
		data: data
	})
}
const searchpartments = data => { //查询部门下所有的人
	return http.Post({
		api: '/tms/api/cpsuser/getDeptAndUserList',
		data: data
	})
}

const searchTrains = data => { //火车搜索
	return http.Post({
		api: '/tms/api/train/searchTrains',
		data: data
	})
}
const trainWs = data => { //火车经停站
	return http.Post({
		api: '/tms/api/train/trainWs',
		data: data
	})
}
const searchAirlineAJAX = data => { //飞机搜索
	return http.Post({
		api: '/tms/api/dps/airline/searchAirline',
		data: data
	})
}
const fetchCabins = data => { //查询航班舱位列表
	return http.Get({
		api: '/tms/api/dps/airline/fetchCabins',
		data: data
	})
}
const queryAirlineList = data => { //飞机搜索
	return http.Post({
		api: '/tms/api/dps/airline/queryAirlineList',
		data: data
	})
}
const getRefundChangeRule = data => { //飞机退改规则
	return http.Post({
		api: '/tms/api/dps/airline/getRefundChangeRule',
		data: data
	})
}
const bookTicket = data => { //飞机下单
	return http.Post({
		api: '/tms/api/dps/book/bookTicket',
		data: data
	})
}
const getPlaneStop = data => { //查询经停航班
	return http.Get({
		api: '/tms/api/dps/airline/getPlaneStop',
		data: data
	})
}
const ruleCheck = data => { //机票校验
	return http.Post({
		api: '/tms/api/dps/airline/ruleCheck',
		data: data
	})
}
const getContactInfo = data => { //获取下单联系人
	return http.Get({
		api: '/tms/api/user/getContactInfo',
		data: data
	})
}
const getCompCustomerInfo = data => { //公务机票查询
	return http.Get({
		api: '/tms/api/cpsuser/getCompCustomerInfo',
		data: data
	})
}
const toBook = data => { //保险
	return http.Get({
		api: '/tms/api/dps/book/toBook',
		data: data
	})
} 
const insuranceOrderCancel = data => { // 火车退保
	return http.Post({
		api: '/tms/api/insurance/order/insuranceOrderCancel',
		data: data
	})
} 
const airInsOrderCancel = data => { // 机票退保
	return http.Post({
		api: '/tms/api/insurance/order/InsOrderCancel',
		data: data
	})
} 
const applySaleChange = data => { //飞机改签提交申请
	return http.Post({
		api: '/tms/api/internal/change/order/applySaleChange',
		data: data
	})
}
const ruleMainSetting = data => { //是否需要审核信息
	return http.Get({
		api: '/tms/api/cpsuser/ruleMainSetting',
		data: data
	})
}
const judgeApprv = data => { //火车因公是否需要审核
	return http.Post({
		api: '/tms/api/apprv/judgeApprv',
		data: data
	})
}

const checkTrainRule = data => { //火车火车规则检验
	return http.Post({
		api: '/tms/api/train/checkTrainRule',
		data: data
	})
}

const getPassengerListByNos = data => { //火车火车规则检验
	return http.Post({
		api: '/tms/api/user/getPassengerListByNos',
		data: data
	})
}

const getCostCenterList = data => { //查询成本中心
	return http.Post({
		api: '/tms/api/cpsuser/getCostCenterList',
		data: data
	})
}

const getStaffList = data => { //获取审批人
	return http.Post({
		api: '/tms/api/apprv/getStaffList',
		data: data
	})
}

const getBrokerage = data => { //火车票单人手续费
	return http.Get({
		api: '/tms/api/train/getBrokerage',
		data: data
	})
}

const bookTrain = data => { //火车预定下单
	return http.Post({
		api: '/tms/api/train/bookTrain',
		data: data
	})
}

const getCityDetail = data => { //酒店商圈搜索
	return http.Get({
		api: '/tms/api/city/getCityDetail',
		data: data
	})
}

const getCityNames = data => { //酒店名称查询
	return http.Get({
		api: '/tms/api/hotel/getCityNames',
		data: data
	})
}

const sortHotelList = data => { //酒店查询
	return http.Post({
		api: '/tms/api/hotel/sortHotelList',
		data: data
	})
}

const toHotelDetail = data => { //酒店详情
	return http.Post({
		api: '/tms/api/hotel/toHotelDetail',
		data: data
	})
}

const hotelProList = data => { //房型查询
	return http.Post({
		api: '/tms/api/hotel/hotelProList',
		data: data
	})
}

const searchHotelPicture = data => { //酒店图片
	return http.Post({
		api: '/tms/api/hotel/searchHotelPicture',
		data: data
	})
}

const checkHotelRules = data => { //预定酒店判断差旅规则
	return http.Post({
		api: '/tms/api/hotel/checkHotelRules',
		data: data
	})
}

const toZHXBook = data => { //酒店价格校验 中航信
	return http.Post({
		api: '/tms/api/hotel/toZHXBook',
		data: data
	})
}

const toELONGBook = data => { //酒店价格校验 艺龙
	return http.Post({
		api: '/tms/api/hotel/toELONGBook',
		data: data
	})
}

const toYYOUBook = data => { //酒店价格校验 云龙
	return http.Post({
		api: '/tms/api/hotel/toYYOUBook',
		data: data
	})
}

const toHuazhuBook = data => { //酒店价格校验 华住
	return http.Post({
		api: '/tms/api/hotel/toHuazhuBook',
		data: data
	})
}

const toOwnBook = data => { //酒店价格校验
	return http.Post({
		api: '/tms/api/hotel/toOwnBook',
		data: data
	})
}

const toHomeInnsBook = data => { //如家酒店价格校验
	return http.Post({
		api: '/tms/api/hotel/toHomeInnsBook',
		data: data
	})
}

const toYaduoBook = data => { //酒店价格校验 雅朵
	return http.Post({
		api: '/tms/api/hotel/toYaduoBook',
		data: data
	})
}

const toJinJiangBook = data => { //酒店价格校验 景江
	return http.Post({
		api: '/tms/api/hotel/toJinJiangBook',
		data: data
	})
}

const toMeituanBook = data => { //酒店价格校验 美团
	return http.Post({
		api: '/tms/api/hotel/toMeituanBook',
		data: data
	})
}

const getHotelBrokerage = data => { //酒店单人手续费
	return http.Get({
		api: '/tms/api/hotel/getHotelBrokerage',
		data: data
	})
}

const hotelBook = data => { //酒店下单
	return http.Post({
		api: '/tms/api/hotel/hotelBook',
		data: data
	})
}

// const ruleMainSetting = data => {//是否需要审核信息
//   return http.Get({
//     api: '/tms/api/cpsuser/ruleMainSetting',
//     data: data
//   })
// }

const applyChangeTrain = data => { //当前火车改签
	return http.Post({
		api: '/tms/api/train/applyChangeTrain',
		data: data
	})
}

const getCityName = data => { //获取城市名
	return http.Get({
		api: '/tms/api/hotel/search/getCityName',
		data: data
	})
}
const reasonList = data => { // 出差事由
	return http.Get({
		api: '/tms/api/traverRule/reasonList',
		data: data
	})
}

export default {
	toJinJiangBook,
	toHomeInnsBook,
	noSecret,
	currentUserEnterprise,
	changeEnterprise,
	trainWs,
	accountlogins,
	getAgreeApprvTask,
	getPassengerLis,
	alldepartments,
	searchpartments,
	searchTrains,
	searchAirlineAJAX,
	fetchCabins,
	queryAirlineList,
	getRefundChangeRule,
	bookTicket,
	getPlaneStop,
	ruleCheck,
	getContactInfo,
	judgeApprv,
	checkTrainRule,
	getPassengerListByNos,
	getCostCenterList,
	getStaffList,
	getBrokerage,
	bookTrain,
	getCityDetail,
	getCityNames,
	sortHotelList,
	getCompCustomerInfo,
	toBook,
	applySaleChange,
	ruleMainSetting,
	toHotelDetail,
	hotelProList,
	searchHotelPicture,
	checkHotelRules,
	toZHXBook,
	toELONGBook,
	toYYOUBook,
	getHotelBrokerage,
	hotelBook,
	applyChangeTrain,
	toHuazhuBook,
	toYaduoBook,
	toOwnBook,
	toMeituanBook,
	getCityName,
	reasonList,
	insuranceOrderCancel,
	airInsOrderCancel,
}
