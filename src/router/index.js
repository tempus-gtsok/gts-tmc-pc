import Vue from 'vue'
import Router from 'vue-router'
// 解决两次访问相同路由地址报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/login',
        component: resolve => require(['@/pages/login/login.vue'], resolve),
        meta: {
            title: '登录'
        }
    },
        {
            path: '/',
            component: resolve => require(['@/components/common/Navigations.vue'], resolve),
            meta: {
                title: '首页',
                requireAuth: true
            },
            children: [
                {
                    path: '/Orderdefray',
                    component: resolve => require(['@/pages/defray/Orderdefray'], resolve),
                    meta: {
                        title: '订单支付',
                        requireAuth: true
                    },
                }, {
                    path: '/home',
                    component: resolve => require(['@/pages/home/home.vue'], resolve),
                    meta: {
                        title: '产品预定',
                        requireAuth: true
                    }
                },

                {
                    path: '/trainlist',
                    name: 'trainlist',
                    component: resolve => require(['@/pages/home/trainlist/trainlist.vue'], resolve),
                    meta: {
                        title: '火车票预定列表',
                        requireAuth: true
                    },
                },
                {
                    path: '/trainadd',
                    name: 'trainadd',
                    component: resolve => require(['@/pages/home/trainlist/trainadd.vue'], resolve),
                    meta: {
                        title: '火车票提交页面',
                        requireAuth: true
                    },
                }, {
                    path: '/traindefray',
                    name: 'traindefray',
                    component: resolve => require(['@/pages/defray/traindefray'], resolve),
                    meta: {
                        title: '火车票支付页面',
                        requireAuth: true
                    }
                },
                {
                    path: '/travel_report',
                    name: 'travel_report',
                    component: resolve => require(['@/pages/travel_report/travel_report.vue'], resolve),
                    meta: {
                        title: '差旅报告',
                        requireAuth: true
                    },
                },
                {
                    path: '/comprehensive_analysis',
                    name: 'comprehensive_analysis',
                    component: resolve => require(['@/pages/travel_report/comprehensive_analysis.vue'], resolve),
                    meta: {
                        title: '综合分析',
                        requireAuth: true
                    }
                },
                {
                    path: '/trainreport',
                    name: 'trainreport',
                    component: resolve => require(['@/pages/travel_report/trainreport.vue'], resolve),
                    meta: {
                        title: '火车票报表',
                        requireAuth: true
                    }
                },
                {
                    path: '/domestic_air_ticket',
                    name: 'domestic_air_ticket',
                    component: resolve => require(['@/pages/travel_report/domestic_air_ticket.vue'], resolve),
                    meta: {
                        title: '国内机票报表',
                        requireAuth: true
                    }
                },
                {
                    path: '/hotel_report',
                    name: 'hotel_report',
                    component: resolve => require(['@/pages/travel_report/hotel_report.vue'], resolve),
                    meta: {
                        title: '酒店报表',
                        requireAuth: true
                    }
                },
                {
                    path: '/information',
                    name: 'information',
                    component: resolve => require(['@/pages/information/information.vue'], resolve),
                    meta: {
                        title: '个人信息',
                        requireAuth: true
                    },
                },
                {
                    path: '/hotelist',
                    name: 'hotelist',
                    component: resolve => require(['@/pages/home/hotellist/hotelist.vue'], resolve),
                    meta: {
                        title: '酒店预定列表',
                        requireAuth: true
                    },
                },
                {
                    path: '/hoterlist',
                    name: 'hoterlist',
                    component: resolve => require(['@/pages/home/hotellist/hoterlist.vue'], resolve),
                    meta: {
                        title: '酒店预定页面',
                        requireAuth: true
                    },
                },
                {
                    path: '/hotersadd',
                    name: 'hotersadd',
                    component: resolve => require(['@/pages/home/hotellist/hotersadd.vue'], resolve),
                    meta: {
                        title: '提交酒店信息',
                        requireAuth: true
                    },
                },
                {
                    path: '/hotersdefray',
                    name: 'hotersdefray',
                    component: resolve => require(['@/pages/defray/hotersdefray'], resolve),
                    meta: {
                        title: '酒店订单支付页面',
                        requireAuth: true
                    }
                },
                {
                    path: '/ticketcationform',
                    component: resolve => require(['@/pages/home/ticketinquiry/ticketcationform.vue'], resolve),
                    meta: {
                        title: '飞机票预定列表',
                        requireAuth: true
                    }
                },
                {
                    path: '/ticketcationadd',
                    component: resolve => require(['@/pages/home/ticketinquiry/ticketcationadd.vue'], resolve),
                    meta: {
                        title: '飞机票提交页面',
                        requireAuth: true
                    }
                },
                {
                    path: '/carservice',
                    component: resolve => require(['@/pages/home/carservice/carservice.vue'], resolve),
                    meta: {
                        title: '用车预定列表',
                        requireAuth: true
                    }
                },
                {
                    path: '/planeorderlist',
                    component: resolve => require(['@/pages/myorder/orderlist/planeorder/planeorderlist'], resolve),
                    meta: {
                        title: '飞机票订单详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/planeorderlist2',
                    component: resolve => require(['@/pages/myorder/orderlist/planeorder/planeorderlist2'], resolve),
                    meta: {
                        title: '飞机票订单详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/chargebackdetailsl',
                    component: resolve => require(['@/pages/myorder/orderlist/planeorder/chargebackdetailsl'], resolve),
                    meta: {
                        title: '飞机票订单退票详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/planchange',
                    component: resolve => require(['@/pages/myorder/orderlist/planeorder/planchange'], resolve),
                    meta: {
                        title: '飞机票订单改签详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/Ticketquery',
                    component: resolve => require(['@/components/common/Ticketquery.vue'], resolve),
                    meta: {
                        title: '我的审批',
                        requireAuth: true
                    }
                },
                {
                    path: '/myorder',
                    component: resolve => require(['@/pages/myorder/myorder'], resolve),
                    meta: {
                        title: '我的订单',
                        requireAuth: true
                    }
                },
                {
                    path: '/myorder2',
                    component: resolve => require(['@/pages/myorder/myorder2'], resolve),
                    meta: {
                        title: '我的订单',
                        requireAuth: true
                    }
                },
                {
                    path: '/hoteorderlist',
                    component: resolve => require(['@/pages/myorder/orderlist/hoteorder/hoteorderlist'], resolve),
                    meta: {
                        title: '酒店订单详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/trainorderlist',
                    component: resolve => require(['@/pages/myorder/orderlist/trainorder/trainorderlist'], resolve),
                    meta: {
                        title: '火车票票订单详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/trainorderlist2',
                    component: resolve => require(['@/pages/myorder/orderlist/trainorder/trainorderlist2'], resolve),
                    meta: {
                        title: '火车票订单详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/clorderlist',
                    component: resolve => require(['@/pages/myorder/orderlist/trainorder/clorderlist'], resolve),
                    meta: {
                        title: '退改单详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/businessmanagement',
                    component: resolve => require(['@/pages/businessmanagement/businessmanagement'], resolve),
                    meta: {
                        title: '企业管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/privilegemanagement',
                    component: resolve => require(['@/pages/businessmanagement/privilegemanagement'], resolve),
                    meta: {
                        title: '角色管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/applicationlist',
                    component: resolve => require(['@/pages/applicationform/applicationlist'], resolve),
                    meta: {
                        title: '申请单列表',
                        requireAuth: true
                    }
                },
                {
                    path: '/addapplication',
                    component: resolve => require(['@/pages/applicationform/addapplication'], resolve),
                    meta: {
                        title: '新建申请单',
                        requireAuth: true
                    }
                },
                {
                    path: '/applicatonforms',
                    component: resolve => require(['@/pages/applicationform/applicatonforms'], resolve),
                    meta: {
                        title: '申请单详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/organizational',
                    component: resolve => require(['@/pages/businessmanagement/organizational'], resolve),
                    meta: {
                        title: '组织架构',
                        requireAuth: true
                    }
                },
                {
                    path: '/ranklist',
                    component: resolve => require(['@/pages/businessmanagement/ranklist'], resolve),
                    meta: {
                        title: '职级管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/costcenter',
                    component: resolve => require(['@/pages/businessmanagement/costcenter'], resolve),
                    meta: {
                        title: '成本中心',
                        requireAuth: true
                    }
                },
                {
                    path: '/travelpolicy',
                    component: resolve => require(['@/pages/businessmanagement/travelpolicy'], resolve),
                    meta: {
                        title: '成本中心',
                        requireAuth: true
                    }
                },
                {
                    path: '/myItinerary',
                    component: resolve => require(['@/pages/myitinerary/myItinerary'], resolve),
                    meta: {
                        title: '我的行程',
                        requireAuth: true
                    }
                }, {
                    path: '/hotelApplication',
                    component: resolve => require(['@/pages/intentionlist/hotelApplication'], resolve),
                    meta: {
                        title: '酒店意向单提交页面',
                        requireAuth: true
                    }
                },
                {
                    path: '/intentList',
                    component: resolve => require(['@/pages/intentionlist/intentList'], resolve),
                    meta: {
                        title: '意向单列表',
                        requireAuth: true
                    }
                }, {
                    path: '/newIntentionList',
                    component: resolve => require(['@/pages/intentionlist/newIntentionList'], resolve),
                    meta: {
                        title: '新建机票意向单',
                        requireAuth: true
                    }
                }, {
                    path: '/hotelDetails',
                    component: resolve => require(['@/pages/intentionlist/hotelDetails'], resolve),
                    meta: {
                        title: '酒店意向单详情',
                        requireAuth: true
                    }
                }, {
                    path: '/ticketIntentForm',
                    component: resolve => require(['@/pages/intentionlist/ticketIntentForm'], resolve),
                    meta: {
                        title: '机票意向单详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/planelist',
                    component: resolve => require(['@/pages/myitinerary/itinerarylist/planelist'], resolve),
                    meta: {
                        title: '飞机票行程详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/trainslist',
                    component: resolve => require(['@/pages/myitinerary/itinerarylist/trainslist'], resolve),
                    meta: {
                        title: '火车票行程详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/hoteoslist',
                    component: resolve => require(['@/pages/myitinerary/itinerarylist/hoteoslist'], resolve),
                    meta: {
                        title: '酒店行程详情',
                        requireAuth: true
                    }
                }
            ]
        },
    ]
})
