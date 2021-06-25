// 过滤数据展示 机票 火车 酒店 根据后台返回数据截取
export const namest = (it) => {
  var su = [];
  for (let k in it) {
    su.push(it[k].name);
  }
  return su.join(",");
};
// 地址搜索类型
export const hotStatus = (vm) => {
  if (vm == 1) {
    return "酒店";
  } else if (vm == 2) {
    return "行政区";
  } else if (vm == 3) {
    return "地铁站";
  } else if (vm == 4) {
    return "商圈";
  } else if (vm == 5) {
    return "机场/火车站";
  } else {
    return "地标";
  }
}
// 过滤数据展示 机票 火车 酒店 根据台返回状态展示
export const newicname = (tm) => {
  //回显类型
  if (tm == 1) {
    return "[机票]";
  } else if (tm == 2) {
    return "[火车]";
  } else if (tm == 5) {
    return "[用车]";
  } else {
    return "[酒店]";
  }
};
/* 
    dats 时间小于10的时候补0
    newdata  回显时间 
  */
const dats = (it) => {
  if (it < 10) {
    return "0" + it;
  } else {
    return it;
  }
};
export const newdata = (tm) => {
  let sta = "";
  let stamon = "";
  let stadta = "";
  let end = "";
  let endmon = "";
  let enddta = "";
  if (tm.std != 6) {
    if (tm.std == 4) {
      sta = new Date(tm.deptDate.replace(/-/g, "/")); //出发日期
      stamon = dats(sta.getMonth() + 1);
      stadta = dats(sta.getDate());
      end = new Date(tm.deptDates.replace(/-/g, "/")); //到达日期
      endmon = dats(end.getMonth() + 1);
      enddta = dats(end.getDate());
    } else {
      sta = new Date(tm.deptDate.replace(/-/g, "/")); //出发日期
      stamon = dats(sta.getMonth() + 1);
      stadta = dats(sta.getDate());
    }
  } else {
    sta = new Date(tm.inDate.replace(/-/g, "/")); //出发日期
    stamon = dats(sta.getMonth() + 1);
    stadta = dats(sta.getDate());
    end = new Date(tm.outDate.replace(/-/g, "/")); //到达日期
    endmon = dats(end.getMonth() + 1);
    enddta = dats(end.getDate());
  }
  if (tm.goBack == 3) {
    return stamon + "月" + stadta + "日" + "　出发";
  } else if (tm.std == 4) {
    if (tm.goBack === 2) {
      return (
        endmon +
        "月" +
        enddta +
        "日" +
        "　出发　" +
        stamon +
        "月" +
        stadta +
        "日" +
        " 返回"
      );
    } else if (tm.goBack === 1) {
      return (
        stamon +
        "月" +
        stadta +
        "日" +
        "　出发　" +
        endmon +
        "月" +
        enddta +
        "日" +
        " 返回"
      );
    }
  } else if (tm.std == 6) {
    return (
      stamon +
      "月" +
      stadta +
      "日" +
      "　入住　" +
      endmon +
      "月" +
      enddta +
      "日" +
      " 离店"
    );
  } else if (tm.std == 2) {
    if (tm.goBack === 2) {
      return stamon + "月" + stadta + "日" + "　出发　";
    } else if (tm.goBack === 1) {
      return stamon + "月" + stadta + "日" + "　出发　";
    }
  }
};
// 过滤数据展示 头等舱 商务舱 经济舱 根据台返回状态展示
export const companys = (ie) => {
  if (ie == "F") {
    ie = "头等舱";
  } else if (ie == "C") {
    ie = "商务舱";
  } else if (ie == "Y") {
    ie = "经济舱";
  }else{
    ie = "其他";
  }
  return ie;
};
//根据参数返回证件类型
export const catypeEn = (it) => {
  if (it == "NI") {
    return "身份证";
  } else if (it == "PP") {
    return "护照";
  } else if (it == "TB") {
    return "台胞证";
  } else if (it == "GA") {
    return "港澳通行证";
  } else if (it == "HX") {
    return "回乡证";
  } else if (it == "OS") {
    return "其他证件";
  }
};
//根据参数返回证件类型
export const catypeNum = (it) => {
  if (it == 1) {
    return "身份证"; //NI
  } else if (it == 2) {
    return "护照"; //PP
  } else if (it == 3) {
    return "台胞证"; //TB
  } else if (it == 4) {
    return "港澳通行证"; //GA
  }
};

//乘客当前状态
export const userstatus = (it) => {
  if (it == 0) {
    return "已取消";
  } else if (it == 1) {
    return "正常";
  } else if (it == 2) {
    return "改签中";
  } else if (it == 3) {
    return "废退";
  }
};
// 支付方式
export const settlement = (it) => {
  if (it == 1) {
    return "现结";
  } else {
    return "预付月结";
  }
};
//支付状态
export const pustatus = (ty) => {
  if (ty == 1) {
    return "待支付";
  } else if (ty == 2) {
    return "支付中";
  } else if (ty == 3) {
    return "已支付";
  } else if (ty == 4) {
    return "为挂帐支付";
  }
};
// 火车正常票订单状态
export const arrType = [
  {
    //火车正常票订单状态
    name: "不限",
    id: 0,
  },
  {
    name: "占座中",
    id: 1,
    url: "../../../static/image/home/In-seat.png",
  },
  {
    name: "占座成功",
    id: 2,
    url: "../../../static/image/home/占座成功.png",
  },
  {
    name: "出票中",
    id: 3,
    url: "../../../static/image/home/ticket.png",
  },
  {
    name: "已出票",
    id: 4,
    url: "../../../static/image/home/check.png",
  },
  {
    name: "退票中",
    id: 5,
    url: "../../../static/image/home/Return-ticket.png",
  },
  {
    name: "改签中",
    id: 6,
    url: "../../../static/image/home/Change-central.png",
  },
  {
    name: "部分退废",
    id: 7,
    url: "../../../static/image/home/Part-retirement.png",
  },
  {
    name: "部分改签",
    id: 8,
    url: "../../../static/image/home/Part-change.png",
  },
  {
    name: "已退",
    id: 9,
    url: "../../../static/image/home/Order-returned.png",
  },
  {
    name: "订单已废弃",
    id: 10,
    url: "../../../static/image/home/Order-abandoned.png",
  },
  {
    name: "已改签",
    id: 11,
    url: "../../../static/image/home/Order-changed.png",
  },
  {
    name: "占座失败",
    id: 12,
    url: "../../../static/image/home/Of-failure.png",
  },
  {
    name: "出票失败",
    id: 13,
    url: "../../../static/image/home/Ticket-failure.png",
  },
];
//火车正常票订单状态 返回name
export const orderStatusId = (ite) => {
  for (let i in arrType) {
    if (arrType[i].id == ite) {
      // console.log("arrType[i].name",arrType[i].name)
      return arrType[i].name;
    }
  }
};
// 火车正常票订单状态 返回urlrl
export const orderStatusUrl = (ite) => {
  for (let i in arrType) {
    if (arrType[i].id == ite) {
      return arrType[i].url;
    }
  }
};
// 新火车票订单状态
export const tranReserveStatus = [
  {
      name: "无限",
      id: 0,
    },
    {
      name: "待审批",
      id: 1,
    },
    {
      name: "审批拒绝",
      id: 2,
    },
    {
      name: "审批通过",
      id: 3,
    },
    {
      name: "取消订单",
      id: 4,
    },
    {
      name: "免审订单",
      id: 5,
    },
    {
      name: "待支付",
      id: 6,
    },
    {
      name: "支付失败",
      id: 7,
    },
    {
      name: "支付成功",
      id: 8,
    },
    {
      name: "改签审批通过",
      id: 9,
      type:''
    },
    {
      name: "二审通过",
      id: 10,
    },
    {
      name: "二审驳回",
      id: 11,
    },
    {
      name: "二次待审中",
      id: 12,
    },
    {
      name: "改签待审批",
      id: 13,
    },
    {
      name: "改签驳回",
      id: 14,
    },
    {
      name: "撤回改签",
      id: 15,
    },
    {
      name: "改签免审",
      id: 16,
    },
  ];
  export const tranConpanName = (ie) => {
    for (let i in tranReserveStatus) {
      if (tranReserveStatus[i].id == ie) {
        return tranReserveStatus[i].name;
      }
    }
  };
// 新火车票票面状态
export const tranTuiStatus = [
    {
        name: "无限",
        id: 0,
      },
      {
        name: "占位中",
        id: 1,
      },
      {
        name: "占座成功",
        id: 2,
      },
      {
        name: "待出票",
        id: 3,
      },
      {
        name: "已出票",
        id: 4,
      },
      {
        name: "退票中",
        id: 5,
      },
      {
        name: "改签中",
        id: 6,
      },
      {
        name: "部分退废",
        id: 7,
      },
      {
        name: "部分改签",
        id: 8,
      },
      {
        name: "已退",
        id: 9,
      },
      {
        name: "已废",
        id: 10,
      },
      {
        name: "已改签",
        id: 11,
      },
      {
        name: "占座失败",
        id: 12,
      },
      {
        name: "出票失败",
        id: 13,
      },
      {
        name: "已退票已退款",
        id: 19,
      },
    ];
    export const tranTuiType = (ie) => {
      for (let i in tranTuiStatus) {
        if (tranTuiStatus[i].id == ie) {
          return tranTuiStatus[i].name;
        }
      }
    };
    
      


// 国内机票订单状态
export const planeStatus = [
  {
    name: "不限",
    id: 0,
  },
  {
    name: "预订中",
    id: 1,
    url: "../../../static/image/home/book.png",
  },
  {
    name: "待审核",
    id: 2,
    url: "../../../static/image/home/To-audit.png",
  },
  {
    name: "待提交",
    id: 3,
    url: "../../../static/image/home/To-submit.png",
  },
  {
    name: "出票中",
    id: 4,
    url: "../../../static/image/home/ticket.png",
  },
  {
    name: "已出票",
    id: 5,
    url: "../../../static/image/home/check.png",
  },
  {
    name: "已取消",
    id: 6,
    url: "../../../static/image/home/Canceled.png",
  },
  {
    name: "已拒单",
    id: 7,
    url: "../../../static/image/home/From-single.png",
  },
  {
    name: "待支付",
    id: 8,
    url: "../../../static/image/home/unpaid.png",
  },
  {
    name: "待审批",
    id: 9,
    url: "../../../static/image/home/Approval-Pending.png",
  },
  {
    name: "已登账",
    id: 10,
    url: "../../../static/image/home/Has-been-booked.png",
  },
];
export const planeConpan = (ie) => {
  for (let i in planeStatus) {
    if (planeStatus[i].id == ie) {
      return planeStatus[i].url;
    }
  }
};
export const planeConpanName = (ie) => {
  for (let i in planeStatus) {
    if (planeStatus[i].id == ie) {
      return planeStatus[i].name;
    }
  }
};
// 国内机票退票状态
export const planeRecedeStatus = [
  {
    name: "不限",
    id: 0,
  },
  {
    name: "新申请",
    id: 1,
    url: "../../../static/image/home/new-application.png",
  },
  {
    name: "已取消",
    id: 2,
    url: "../../../static/image/home/Canceled.png",
  },
  {
    name: "待审批",
    id: 3,
    url: "../../../static/image/home/Approval-Pending.png",
  },
  {
    name: "已拒绝",
    id: 4,
    url: "../../../static/image/home/Approval-refused.png",
  },
  {
    name: "待提交",
    id: 5,
    url: "../../../static/image/home/check.png",
  },
  {
    name: "已提交",
    id: 6,
    url: "../../../static/image/home/submitted.png",
  },
  {
    name: "已完成",
    id: 7,
    url: "../../../static/image/home/订单-已完成.png",
  },
  {
    name: "待客户审核",
    id: 8,
    url: "../../../static/image/home/待客户审核.png",
  },
  {
    name: "已驳回",
    id: 9,
    url: "../../../static/image/home/been-rejected.png",
  },
];

export const planeRecedeConpan = (ie) => {
  for (let i in planeRecedeStatus) {
    if (planeRecedeStatus[i].id == ie) {
      return planeRecedeStatus[i].url;
    }
  }
};


 // 新版本国内机票订单状态
 export const airReserveStatus = [
  {
    name:"不限",
    id:-2,
  },
  {
    name:"免审状态",
    id:-1,
  },
{
    name: "待审批",
    id: 0,
    type:'y', // 预订单
  },
  {
    name: "审批中",
    id: 1,
  },
  {
    name: "审批通过",
    id: 2,
    type:'yc',
  },
  {
    name: "审批拒绝",
    id: 3,
    type:'y',
  },
  {
    name: "撤回",
    id: 4,
  },
  {
    name: "已取消",
    id: 5,
  },
  {
    name: "已失效",
    id: 6,
  },
  {
    name: "二次待审批",
    id: 7,
    type:'y',
  },
  {
    name: "二次审批中",
    id: 8,
  },
  {
    name: "二次审批通过",
    id: 9,
    type:'y',
  },
  {
    name: "二次审批拒绝",
    id: 10,
    type:'y',
  },
  {
    name: "待支付",
    id: 11,
    type:'y',
  },
  {
    name: "已支付",
    id: 12,
    type:'y',
  },
  {
    name: "未知状态",
    id: 13,
  },
];
export const airReserveStatusName = (ie) => {
  for (let i in airReserveStatus) {
    if (airReserveStatus[i].id == ie) {
      return airReserveStatus[i].name;
    }
  }
};
 // 国内机票票面状态
 export const airOrderStatus = [
  {
    name: "无限",
    id: 0,
  },
  {
    name: "已占座",
    id: 1,
    type:'y',
  },
  {
    name: "出票中",
    id: 4,
    type:'c'
  },
  {
    name: "已出票",
    id: 5,
    type:'c'
  },
  {
    name: "已取消",
    id: 6,
    type:'y',
  },
  {
    name: "已拒单",
    id: 7,
  }
];
export const airOrderStatusName = (ie) => {
  for (let i in airOrderStatus) {
    if (airOrderStatus[i].id == ie) {
      return airOrderStatus[i].name;
    }
  }
};
 //  国内机票改签订单状态
 export const planestaust = [
  {
    name: "不限",
    id: 0,
  }, {
    name: '改签待审批',
    id: 1
  }, {
    name: '待企业审批',
    id: 2
  }, {
    name: '待支付',
    id: 3
  }, {
    name: '已支付',
    id: 4
  }, {
    name: '改签审批通过',
    id: 5
  }, {
    name: '改签审批拒绝',
    id: 6
  }, {
    name: '免审',
    id: 7
  }
];
export const planeChangType = (ie) => {

  for (let i in planestaust) {
    if (planestaust[i].id == ie) {
      return planestaust[i].name;
    }
  }
};
//国内机票改签票面状态
export const changPlanestaust = [ 
  {
    name: "不限",
    id: 0,
  }, {
    name: '占座中',
    id: 1
  }, {
    name: '改签中',
    id: 2
  }, {
    name: '改签失败',
    id: 3
  }, {
    name: '改签成功',
    id: 4
  }, {
    name: '取消改签',
    id: 5
  }, 
]
export const changPlanestaustType = (ie) => {
  for (let i in changPlanestaust) {
    if (changPlanestaust[i].id == ie) {
      return changPlanestaust[i].name;
    }
  }
};export const tuistaust =[ ////国内机票退票状态
  {
    name: "不限",
    id: 0,
  }, {
    name: '退票待审批',
    id: 1
  }, {
    name: '待企业审批',
    id: 2
  }, {
    name: '退票审批通过',
    id: 3
  }, {
    name: '退票审批拒绝',
    id: 4
  }, {
    name: '免审',
    id: 5
  }, 
]
export const tuistauststatus = (ie) => {

  for (let i in tuistaust) {
    if (tuistaust[i].id == ie) {
      return tuistaust[i].name;
    }
  }
};
export const tuiPlanestaust=[ ////国内机票退票票面状态
  {
    name: "不限",
    id: 0,
  }, {
    name: '已出票',
    id: 1
  }, {
    name: '退票中',
    id: 2
  }, {
    name: '退票失败',
    id: 3
  }, {
    name: '退票成功',
    id: 4
  }, {
    name: '已取消',
    id: 5
  }, 
]
export const tuiPlanesType = (ie) => {

  for (let i in tuiPlanestaust) {
    if (tuiPlanestaust[i].id == ie) {
      return tuiPlanestaust[i].name;
    }
  }
};


// 酒店订单状态
export const hotellStatus = [
  {
    name: "待审核",
    id: 650,
    url: "../../../static/image/home/To-audit.png",
  },
  {
    name: "处理中",
    id: 100,
    url: "../../../static/image/home/processing.png",
  },
  {
    name: "拒单",
    id: 600,
    url: "../../../static/image/home/From-single.png",
  },
  {
    name: "审批拒绝",
    id: 121,
    url: "../../../static/image/home/Approval-refused.png",
  },
  {
    name: "占房成功",
    id: 122,
    url: "../../../static/image/home/Building-successful.png",
  },
  {
    name: "申请中",
    id: 117,
    url: "../../../static/image/home/processing.png",
  },
  {
    name: "待处理",
    id: 115,
    url: "../../../static/image/home/Pending.png",
  },
  {
    name: "预定成功",
    id: 101,
    url: "../../../static/image/home/book-successfully.png",
  },
  {
    name: "下单失败",
    id: 102,
    url: "../../../static/image/home/Order-failed.png",
  },
  {
    name: "取消中",
    id: 400,
    url: "../../../static/image/home/Cancelled.png",
  },
  {
    name: "取消成功",
    id: 401,
    url: "../../../static/image/home/Canceled.png",
  },
  {
    name: "退款中",
    id: 411,
    url: "../../../static/image/home/tuikuan.jpg",
  },
  {
    name: "退款成功",
    id: 410,
    url: "../../../static/image/home/tuikuancg.png",
  },
];
export const hotellUserstatus = (ie) => {
  for (let i in hotellStatus) {
    if (hotellStatus[i].id == ie) {
      return hotellStatus[i].url;
    }
  }
};
export const hotellUserName = (ie) => {
  for (let i in hotellStatus) {
    if (hotellStatus[i].id == ie) {
      return hotellStatus[i].name;
    }
  }
};
// 酒店订单状态
export const hotellStatusTow = [
  {
    name: "不限",
    id: 0,
  },
  {
    name: "待审核",
    id: 650,
    url: "../../../static/image/home/To-audit.png",
  },
  {
    name: "处理中",
    id: 100,
    url: "../../../static/image/home/processing.png",
  },
  {
    name: "待处理",
    id: 115,
    url: "../../../static/image/home/Pending.png",
  },
  {
    name: "预定成功",
    id: 101,
    url: "../../../static/image/home/book-successfully.png",
  },
  {
    name: "下单失败",
    id: 102,
    url: "../../../static/image/home/Order-failed.png",
  },
  {
    name: "取消中",
    id: 400,
    url: "../../../static/image/home/Cancelled.png",
  },
  {
    name: "取消成功",
    id: 401,
    url: "../../../static/image/home/Canceled.png",
  },
  {
    name: "审批拒绝",
    id: 121,
    url: "../../../static/image/home/Approval-refused.png",
  },
  {
    name: "占房成功",
    id: 122,
    url: "../../../static/image/home/Building-successful.png",
  },
];
// 回显城市
import airports from "../../static/js/airports.js";
let airportAll = airports.addressAirportAll
export const cityName = (its) => {
  for (let j = 0; j < airportAll.length; j++) {
    //循环城市
    if (airportAll[j].airportCode == its) {
      return airportAll[j].cityCName;
    }
  }
};
export const numberPapers  = (i) =>{
  if (i.length >= 18) {
      return i.replace(/(.{4}).*(.{4})/, "$1******$2")
  }else{
    return i.replace(/(.{2}).*(.{2})/, "$1******$2")
  }
}
 var ArrayList = [];
export const selectedOptions = (id,list = [], num = 0, ids = []) =>{ //成本中心
  list.forEach(item => {
  ArrayList.push({
      id: item.id,
      name: item.text,
      ids, // 父级id数组
      num, // 层级
    });
    if (item.children != null && item.children.length > 0) {
      let idArr = [...ids];
      idArr.push(item.id);
      selectedOptions(id,item.children, num + 1, idArr);
    } else{
    ArrayList[ArrayList.length-1].lastRank = true;
    }
  });
    // 回填成本中心
    for (let i = 0; i < ArrayList.length; i++) {
      if(ArrayList[i].id ==id[0]){
        return [...ArrayList[i].ids,ArrayList[i].id]
      }
    }
}
export const insOrdersType = [
  {
    name:'未投保',
    id:1,
  },
  {
    name:'已投保',
    id:2,
  },
  {
    name:'已取消',
    id:3,
  },
  {
    name:'投保异常',
    id:4,
  },
  {
    name:'已退保',
    id:5,
  },
  {
    name:'部分退保',
    id:6,
  },
  {
    name:'部分投保',
    id:7,
  },
  {
    name:'退款中',
    id:8,
  },
  {
    name:'部分退款',
    id:9,
  },
  {
    name:'已退款',
    id:10,
  },
  {
    name:'退款异常', 
    id:11,
  },
  {
    name:'退款待审核', 
    id:12,
  },
  {
    name:'登帐', 
    id:13,
  },
]
export const insOrdersStatus = (ie) => {
  for (let i in insOrdersType) {
    if (insOrdersType[i].id == ie) {
      return insOrdersType[i].name;
    }
  }
};
export const numPrice = num => `${num}`.length >= 6 ? `${(num/10000).toFixed(2)}万` : num

