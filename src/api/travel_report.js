//报表请求封装
import http from './http'
const reporttotal = data => {//综合分析报表费用数据
  return http.Post({
    api: '/tms/api/report/summary/total',
    data: data
  })
}

const getTraList = data => {//火车报表数据
  return http.Post({
    api: '/tms/api/tra/tmsGetTraList',
    data: data
  })
}

const selectQueryTrainTicketList = data => {//火车票导出Excel报表
  return http.Post({
    api: '/tms/api/tra/tmsSelectQueryTrainTicketList',
    data: data,
    responseType: 'blob'
  })
}



const getPage = data => {//国内机票报表数据
  return http.Post({
    api: '/tms/api/report/getPage',
    data: data
  })
}

const QueryDownloadReport = data => {//国内机票导出Excel报表
  return http.Get({
    api: '/tms/api/report/QueryDownloadReport',
    data: data,
    responseType: 'blob'
  })
}

const holCusStatementList = data => { //酒店报表数据
  return http.Get({
    api: '/tms/api/hotel/order/holCusStatementList',
    data: data
  })
}

const exportHolCusStatement = data => { //酒店报表导出Excel表格
  return http.Get({
    api: '/tms/api/hotel/order/exportHolCusStatement',
    data: data,
    responseType: 'blob'
  })
}
export default {
  holCusStatementList,
  exportHolCusStatement,
  reporttotal,
  getTraList,
  selectQueryTrainTicketList,
  QueryDownloadReport,
  getPage
}