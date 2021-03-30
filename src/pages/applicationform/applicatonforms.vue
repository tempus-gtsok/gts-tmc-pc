<template>
  <div>
    <div class="hoteorder" v-loading="loading" v-if="plsitsti.apprvTask != null && plsitsti.apprvTask != undefined">
      <div class="hotbox">
        <div class="aptops">
          <div class="apfirst" @click="routens" v-if="types == 'left'">我的申请单列表</div>
          <div class="apfirst" @click="routens" v-if="types == 'right'">我的审批单列表</div>
          &nbsp;&nbsp;→&nbsp;&nbsp;
          <div v-if="types == 'left'">申请单详情</div>
          <div v-if="types == 'right'">申批单详情</div>
        </div>
      </div>
      <div class="hotbox">
        <div class="lefbox">出差信息</div>
        <div class="bot_userList">
          <div>
            <span v-if="taskType != 4 && taskType != 5" class="bot_SpanLi">出差事由：</span>
            <span v-if="taskType == 4" class="bot_SpanLi">改签事由：</span>
            <span v-if="taskType == 5" class="bot_SpanLi">退票事由：</span>
            <span class="teright">{{ userreason }}</span>
          </div>
          <div>
            <span class="bot_SpanLi">出&nbsp;&nbsp;行&nbsp;人：</span>
            <span class="teright">{{ userN(userName) }}</span>
          </div>
          <div>
            <span class="bot_SpanLi">所属部门：</span>
            <span class="teright">{{ talattribution }}</span>
          </div>
          <div>
            <span class="bot_SpanLi">成本中心：</span>
            <span class="teright">{{ costattribution }}</span>
          </div>
          <div v-if="(taskType == 2 || taskType == 4 || taskType == 5) && price !=null && price > 0">
            <span v-if="taskType == 4">改签费用：</span>
            <span v-if="taskType == 5">应退金额：</span>
            <span class="bot_SpanLi" v-if="taskType != 5 && taskType != 4">费&emsp;&emsp;用：</span>
            <span class="prcies">￥{{ price }}</span>
          </div>
          <div v-if="or_type == 1 && or_tasktype == 4">
            <span >改签费用：</span>
            <span class="prcies">￥{{plane_tw.changeFee}}</span>
          </div>
          <div v-if="taskType == 1 && totalBudget > 0 && totalBudget != null ">
            <span class="bot_SpanLi">预估费用：</span>
            <span class="prcies">￥{{ totalBudget }}</span>
          </div>
          <div v-if="taskType == 5 && refundOtherFee > 0">
            <span>手&nbsp;&nbsp;续&nbsp;费：</span>
            <span class="prcies">￥{{ refundOtherFee }}</span>
          </div>
          <div v-if="traveldetails != null && traveldetails != ''">
            <span class="bot_SpanLi">详细说明：</span>
            <span @click="opclist" class="teright" style="color: red;cursor: pointer;"
                  v-if="taskType == 2 || taskType == 4 || taskType == 5">{{ detaail(trafals) }}</span>
            <span v-else class="teright">{{ traveldetails }}</span>
          </div>
        </div>
      </div>
      <div class="hotbox" v-if="or_type == 1 && or_tasktype == 2">
        <div class="lefbox">机票</div>
        <div class="bot_plane" v-for="(item, index) in plane_tw.orderDetailList" :key="index">
          <div class="bot_Terminal">
            <span class="bot_vo">出发：{{ citysname(item.voyages[0].depart) }}{{
                item.voyages[0].departTerminal
              }}</span>
            <span class="bot_vo">到达：{{ citysname(item.voyages[0].arrive) }}{{
                item.voyages[0].arriveTerminal
              }}</span>
            <span class="bot_vo">日期：{{ item.voyages[0].departTime }}</span>
            <span class="bot_flighNo">航班：{{ item.voyages[0].flightNo }}</span>
          </div>
          <div class="hb_span" v-if="index === 0 && nlowPriceFlight !== '' && nlowPrice !== '' && nlowPriceTime !== ''">
            <span>两小时最低航班/价格/时间：{{ nlowPriceFlight }}/￥{{ nlowPrice }}/{{ nlowPriceTime }}</span>
          </div>
          <div class="hb_span"
               v-if="index === 1 && twoNLowPriceFlight !== '' && twoNLowPrice !== '' && twoNLowPriceTime !== ''">
            <span>两小时最低航班/价格/时间：{{ twoNLowPriceFlight }}/￥{{ twoNLowPrice }}/{{ twoNLowPriceTime }}</span>
          </div>
          <div class="bot_can">
            <span class="bot_vo">舱位：公务舱{{ item.voyages[0].discount }}折</span>
            <span class="bot_vo">机建￥{{ item.passengers[0].fareInfos[0].taxFee }} X {{ userlist.length }}</span>
            <span>票价￥{{ item.voyages[0].adtCabinPrice }} X {{ userlist.length }}</span>
          </div>
        </div>
        <div class="b_uesr">乘机人：</div>
        <div>
          <div class="b_list" v-for="(item,index) in userlist" :key="index">
            <img src="../../../static/image/chengjiren.png">
            <div class="b_userlist">
              <span>{{ item.name }}</span>
              <span>{{ catypes(item.cardType) }}：{{ item.cardNo }}</span>
              <span>手机号：{{ item.phone }}</span>
            </div>
          </div>
        </div>
        <div v-if="plane_tw != null && plane_tw != ''">
          <div class="bot_amount" v-if="plane_tw.orderDetailList.length == 1 ">
            金额合计：基建￥{{
              (plane_tw.orderDetailList[0].passengers[0].fareInfos[0].taxFee + plane_tw.orderDetailList[0].passengers[0].fareInfos[0].fuelFee) * userlist.length
            }}
            +
            票价￥{{ plane_tw.orderDetailList[0].voyages[0].adtCabinPrice * userlist.length }}
            + 保险￥{{ totalPremium }} = ￥{{
              plane_tw.orderDetailList[0].passengers[0].fareInfos[0].taxFee * userlist.length + plane_tw.orderDetailList[0].voyages[0].adtCabinPrice * userlist.length + totalPremium
            }}
          </div>
          <div class="bot_amount" v-if="plane_tw.orderDetailList.length == 2">
            金额合计：基建￥{{
              (plane_tw.orderDetailList[0].passengers[0].fareInfos[0].taxFee +
                  plane_tw.orderDetailList[0].passengers[0].fareInfos[0].fuelFee) * userlist.length +
              (plane_tw.orderDetailList[1].passengers[0].fareInfos[0].taxFee +
                  plane_tw.orderDetailList[0].passengers[0].fareInfos[0].fuelFee) * userlist.length
            }}
            + 票价￥{{
              plane_tw.orderDetailList[0].voyages[0].adtCabinPrice * userlist.length + plane_tw.orderDetailList[1].voyages[0].adtCabinPrice * userlist.length
            }}
            + 保险￥{{ totalPremium }}
            = ￥{{
              (plane_tw.orderDetailList[0].passengers[0].fareInfos[0].taxFee +
                  plane_tw.orderDetailList[1].passengers[0].fareInfos[0].fuelFee) * userlist.length +
              (plane_tw.orderDetailList[1].passengers[0].fareInfos[0].taxFee +
                  plane_tw.orderDetailList[1].passengers[0].fareInfos[0].fuelFee) * userlist.length +
              plane_tw.orderDetailList[0].voyages[0].adtCabinPrice * userlist.length +
              plane_tw.orderDetailList[1].voyages[0].adtCabinPrice * userlist.length + totalPremium
            }}
          </div>
        </div>
      </div>
      <div class="hotbox" v-if="or_type == 1 && or_tasktype == 4">
        <div class="lefbox">机票(改签)</div>
        <div class="bot_plane" v-for="(item, index) in plmesagelist" :key="index">
          <div class="bot_Terminal">
            <span class="bot_vo">出发：{{ citysname(item.deptCityCode) }}</span>
            <span class="bot_vo">到达：{{ citysname(item.arrivCityCode) }}</span>
            <span class="bot_vo">日期：{{ item.deptDate }}</span>
            <span class="bot_flighNo">航班：{{ item.flightNo }}</span>
          </div>
        </div>
        <div class="b_uesr">乘机人：</div>
        <div>
          <div class="b_list" :class="index == plane_tw.items.length - 1 ? 'b_list b_list_bottom' : 'b_list'" v-for="(item,index) in plane_tw.items" :key="index">
            <img src="../../../static/image/chengjiren.png">
            <div class="b_userlist">
              <span>{{ item.name }}</span>
              <span>证件号：{{ item.cardNo }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="hotbox" v-if="or_type == 1 && or_tasktype == 5">
        <div class="lefbox">机票(退票)</div>
        <div class="bot_plane" v-for="(item, index) in plmesagelist" :key="index" style="width: 100%;">
          <div class="bot_Terminal">
            <span class="bot_vo">出发：{{ citysname(item.deptCityCode) }}</span>
            <span class="bot_vo">到达：{{ citysname(item.arrivCityCode) }}</span>
            <span class="bot_vo">日期：{{ item.deptDate }}</span>
            <span class="bot_flighNo">航班：{{ item.flightNo }}</span>
          </div>
        </div>
        <div class="b_uesr">乘机人：</div>
        <div>
          <div class="b_list" v-for="(item,index) in plane_tw.items" :key="index">
            <img src="../../../static/image/chengjiren.png">
            <div class="b_userlist">
              <span>{{ item.name }}</span>
              <span>证件号：{{ item.cardNo }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="hotbox" v-if="or_type == 2 && or_tasktype == 2 && train_tw != null">
        <div class="lefbox"><span>火车预定</span></div>
        <div class="bot_userList hot_trainList" v-if="train_tw.saleOrderDetailList&&train_tw.saleOrderDetailList[0]">
          <div class="hot_sale">
            <img src="../../../static/image/sqd_hc.png" alt="">
            <span class="hot_form">
            {{ train_tw.saleOrderDetailList[0].fromstation }}&nbsp;-&nbsp;
            {{ train_tw.saleOrderDetailList[0].tostation }}
            &emsp;{{ train_tw.saleOrderDetailList[0].trainno }}
            </span>
          </div>
          <div class="hot_Time">{{ train_tw.saleOrderDetailList[0].departureTime }}</div>
          <div class="hot_user">出行人：<span>{{ userN(userName) }}</span></div>
        </div>
      </div>
      <div class="hotbox" v-if="or_type == 2 && (or_tasktype == 4 || or_tasktype == 5) && train_tw != null">
        <div class="lefbox">
          火车
          <span v-if="or_tasktype == 4">改签</span>
          <span v-else>退票</span>
        </div>
        <div class="bot_userList hot_trainList" v-if="train_tw.traSaleChangeDetailList">
          <div class="hot_sale">
            <img src="../../../static/image/sqd_hc.png" alt="">
              <span class="hot_form">
                {{ train_tw.traSaleChangeDetailList[0].changeFromStation }}&nbsp;-&nbsp;
                {{ train_tw.traSaleChangeDetailList[0].changeToStation }}
                &nbsp;{{ train_tw.traSaleChangeDetailList[0].changeTrainNo }}
              </span>

          </div>
          <div class="hot_Time" v-if="train_tw.traSaleChangeDetailList[0].passenagerTicketNo != null">
            {{ train_tw.traSaleChangeDetailList[0].departTime }}
          </div>
          <div class="hot_TicketNo">
            票号：{{ train_tw.traSaleChangeDetailList[0].passenagerTicketNo }}
          </div>
          <div class="hot_user user_N">退改人员：<span>{{ userN(userName) }}</span></div>
        </div>
      </div>
      <div class="hotbox"
           v-if="or_type == 101 && (or_tasktype == 2 || or_tasktype == 4 || or_tasktype == 5) && hotel_tw != null">
        <div class="lefbox">
          酒店
          <span v-if="or_tasktype == 2">预定</span>
          <span v-else>退房</span>
        </div>
        <div class="bot_hotelList">
          <div class="bot_hotelTitle">
            <img src="../../../static/image/order/order_hotel.png" alt="">
            <div class="bot_hotelName">{{ hotel_tw.hotelName }}</div>
          </div>
          <div class="bot_hotelPo">
            <div><span>地址：</span>{{ hotel_tw.hotelAddress }}</div>
            <div v-if="hotel_tw.bedTypeName != null"><span>房型：</span><span>{{ hotel_tw.bedTypeName }}</span>
            </div>
            <div >
              <span>时间：</span>
              <span v-if="hotel_tw.arrivalDate">{{ subtime(hotel_tw.arrivalDate) }} 至 {{ subtime(hotel_tw.departureDate) }}
                （共{{ count(subtime(hotel_tw.arrivalDate), subtime(hotel_tw.departureDate)) }}晚)
								{{ hotel_tw.bookCount }}间
              </span>
            </div>
            <div>
              <span>订单号：</span>
              <span>{{ codes }}</span>
            </div>
            <div>
              <span>入住人：</span>
              <span>{{ hotel_tw.guestName }}
              </span>
            </div>
            <div class="bot_hotelAmount">
              <div>
                <span>房间单价(均价)：</span>
                <span class="bot_eachNightPrice">￥{{ hotel_tw.eachNightPrice }}</span>
              </div>
              <div>
                <span>服务费：</span>
                <span>￥{{ hotel_tw.serviceFee }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hotbox" v-if="taskType == 1">
        <div class="lefbox">出差行程</div>
        <div class="bot_plane bot_plane_btom">
          <div class="bot_Terminal bot_Terminal_tas" v-for="(item, index) in taslist" :key="index">
            <span class="bot_vo">{{typename(item.vehicle)}}</span>
            <span class="bot_vo bot_vo_w ">{{cityname(item)}}</span>
            <span class="bot_vo bot_vm">{{newdata(item)}}</span>
          </div>
        </div>
      </div>
      <div class="hotbox" v-if="splog.length > 0">
        <div class="lefbox">审批日志</div>
        <div class="soclass soclass_title">
          <div>顺序</div>
          <div>审批时间</div>
          <div>审批人</div>
          <div>审批结果</div>
          <div>审批方式</div>
          <div>备注信息</div>
        </div>
        <div class="soclass " :style="index == splog.length-1 ? 'borderBottom:1px solid #f9e6d0' : ''"
             v-for="(item, index) in splog" :key="index">
          <div class="solist">{{ index + 1 }}</div>
          <div class="solist">
            <span v-if="item.modifyTime != null">{{ item.modifyTime }}</span>
          </div>
          <div class="solist">{{ item.staffName }}</div>
          <div class="solist">
            <span v-if="item.status == 0">待审批</span>
            <span v-if="item.status == 1" style="color: #409EFF;">审批通过</span>
            <span v-if="item.status == 3" style="color: red;">审批驳回</span>
          </div>
          <div class="solist">
            <span v-if="item.stplis == 1">成本审批</span>
            <span v-if="item.stplis == 2">部门审批</span>
          </div>
          <div>{{ item.remark }}</div>
        </div>
      </div>
      <div class="staleve" v-if="staleve" @click="staleve = false">
        <div class="stalist" @click.stop>
          <div class="scloos">
            <div class="statop" v-for="(item, index1) in remsk" :key="index1">
              <div class="reds">
                <div class="ts_text">{{ item.list[0].nametype }}</div>
              </div>
              <div class="setlist" v-for="(items, index) in item.list">
                <div class="setbod">
                  <div class="styul">
                    <div class="styli_top">{{ isname(items.is) }}</div>
                    <div class="stulis">
                      <div class="styli_left">超规人员:</div>
                      <div class="styli_right">{{ items.name }}</div>
                    </div>
                  </div>
                  <div class="styul" v-if="items.is == 3 || items.is == 8">
                    <div class="stulis">
                      <div class="styli_left">超规原因:</div>
                      <div class="styli_right">{{ items.seratis }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="boxbtn">
        <div class="tkbts" v-if="types == 'left' && (status == 0 || status == 1) && rotes('tms:myi:withdraw')"
             @click="clearsks">撤回
        </div>
        <div class="nobts" v-if="types == 'right' && stk && rotes('tms:exa:adopt')" @click="pkclearsks(1)">通过</div>
        <div class="tkbts" v-if="types == 'right' && stk && rotes('tms:exa:reject')" @click="pkclearsks(3)">驳回</div>
        <div class="retunbts" @click="routens">返回</div>
      </div>
    </div>

  </div>
</template>

<script>
import citys from '../../../static/js/airports.js';

export default {
  data() {
    return {
      totalBudget: 0, //预估费用
      refundOtherFee: 0, //手续费
      plmesagelist: [], //飞机行程
      stk: false, //是否需要审核了
      staleve: false, //是否显示违规信息
      loading: false,
      trafals: false, //是否有超规信息
      traveldetails: '', //出差详情
      splog: [], //审批日志
      codes: '', //申请单id
      plsitsti: {}, //申请单详情
      createTimes: '', //申请日期
      userName: [], //出差人员
      userdata: [], //出差时间
      userreason: '', //理由
      price: '', //总费用
      talattribution: '', //部门名称
      costattribution: '', //成本中心名称
      taskType: '', //审批单类型
      taslist: [], //行程
      status: '',
      types: 'left',
      remsk: [], //违规信息
      or_type: 0, //类型
      or_tasktype: 0, //状态
      train_tw: {}, //事中火车单
      hotel_tw: {}, //酒店订单
      plane_tw: '', //飞机订单
      address: [],
      userlist: [],
      car_tw: {}, //用车订单
      nlowPrice: '', //往程 最低价
      nlowPriceFlight: '', // 往程  最低价航班
      nlowPriceTime: '', // 往程 航班出发时间
      twoNLowPrice: '', // 返程  最低价
      twoNLowPriceFlight: '', // 返程 最低价航班
      twoNLowPriceTime: '', // 返程 航班出发时间
      totalPremium: '' //保险价格
    };
  },
  mounted() {
    this.codes = this.$route.query.data; //获取上个页面传入的参数
    this.types = this.$route.query.type; //left 为申请单详情  right 为审批单详情
    this.searchhoter();
  },
  methods: {
    opclist() {
      this.staleve = true;
    },
    citysname(its) { //回显城市
      for (let j = 0; j < this.address.length; j++) { //循环城市
        if (this.address[j].airportCode == its) {
          return this.address[j].cityCName
        }
      }
    },
    async getApprvOrderInfos(dat, type, tasktype) {
      //type 1机票 2火车 5用车 101酒店
      //tasktype 审批单类型 1事前 2事中 4改签 5退票
      this.or_tasktype = tasktype;
      this.or_type = type;
      this.loading = true;
      try {
        let res = await this.$api.applicat.getApprvOrderInfo(dat);
        this.loading = false;
        if (res.code == 200) {
          if (type == 2) {
            this.train_tw = res.data;
          } else if (type == 101) {
            this.hotel_tw = res.data;
          } else if (type == 1) {
            this.address = citys.addressAirportAll; //航空名字
            this.plane_tw = res.data;
            this.userlist = res.data.orderDetailList[0].passengers;
          }
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      } catch (e) {
        this.loading = false;
        //TODO handle the exception
      }
    },
    pkclearsks(it) {
      //审批
      let tile = '';
      if (it == 1) {
        tile = '通过';
      } else {
        tile = '驳回';
      }
      this.$prompt('请输入' + tile + '意见', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
          .then(({
                   value
                 }) => {
            if (value == null) {
              value = '';
            }
            this.task(value, it);
          })
          .catch(() => {
          });
    },
    async task(val, it) {
      this.loading = true;
      try {
        let dats = {
          taskId: this.codes,
          status: it,
          remark: val
        };
        let res = await this.$api.applicat.apprvTask(dats);
        this.loading = false;
        if (res.code == 200) {
          this.$message({
            message: '审批成功',
            type: 'success'
          });
          this.searchhoter();
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      } catch (e) {
        this.loading = false;
        console.log(e);
        //TODO handle the exception
      }
    },
    typename(tm) {
      //回显类型
      if (tm == 1) {
        return '[机票]';
      } else if (tm == 2) {
        return '[火车]';
      } else if (tm == 5) {
        return '[用车]';
      } else {
        return '[酒店]';
      }
    },
    userstatus(ite) {
      //订单状态
      let arr = [{
        name: '占座中',
        id: 1
      },
        {
          name: '占座成功',
          id: 2
        },
        {
          name: '出票中',
          id: 3
        },
        {
          name: '已出票',
          id: 4
        },
        {
          name: '退票中',
          id: 5
        },
        {
          name: '改签中',
          id: 6
        },
        {
          name: '部分退废',
          id: 7
        },
        {
          name: '部分改签',
          id: 8
        },
        {
          name: '已退',
          id: 9
        },
        {
          name: '订单已废弃',
          id: 10
        },
        {
          name: '已改签',
          id: 11
        },
        {
          name: '占座失败',
          id: 12
        },
        {
          name: '出票失败',
          id: 13
        }
      ];
      for (let i in arr) {
        if (arr[i].id == ite) {
          return arr[i].name;
        }
      }
    },
    isname(is) {
      if (is == 1) {
        return '只记录';
      } else if (is == 2) {
        return '记录并提示';
      } else if (is == 3) {
        return '记录并选择原因';
      } else if (is == 7) {
        return '不管控';
      } else if (is == 8) {
        return '记录并选择原因';
      } else if (is == 5) {
        return '记录并重新审核';
      }
    },
    detaail(item) {
      if (item) {
        return '违反差旅规则，点击查看';
      } else {
        if (
            this.traveldetails != null &&
            this.traveldetails != '' &&
            this.traveldetails != '{}' &&
            this.traveldetails != '{"information":[{}]}' &&
            this.traveldetails != '{"information":[]}'
        ) {
          return this.traveldetails;
        } else {
          return '';
        }
      }
    },
    cityname(tm) {
      //回显城市名称
      if (tm.vehicle == 1) {
        let deptname = this.citname(tm.deptCityCode);
        let arrivname = this.citname(tm.arrivCityCode);
        return deptname + ' - ' + arrivname
      } else if (tm.vehicle == 2) {
        return tm.deptCityName + ' - ' + tm.arrivCityName
      } else if (tm.vehicle == 5) {
        return tm.deptCityName + ' - ' + tm.arrivCityName
      } else {
        return tm.cityName + "　" + tm.remark
      }
    },
    userN(usr) {
      let us = [];
      for (let k in usr) {
        us.push(usr[k].userName);
      }
      return us.join(',');
    },
    citname(code) {
      let datcy = citys.addressAirportAll;
      for (let i = 0; i < datcy.length; i++) {
        if (datcy[i].airportCode == code) {
          return datcy[i].cityCName;
        }
      }
    },
    async searchhoter() {
      let that = this;
      that.loading = true;
      try {
        let res = await that.$api.applicat.detailApply({
          id: that.codes
        });
        that.loading = false;
        if (res.code == 200) {
          let datw = res.data;
          that.plsitsti = datw;
          that.createTimes = datw.apprvTask.createTime; //申请日期
          that.userName = datw.tmsGssLink.applyStaffs; //出差人员
          that.userdata = [datw.apprvTask.startDate, datw.apprvTask.endDate]; //出差时间
          that.userreason = datw.apprvTask.reason; //理由
          that.price = parseInt(datw.apprvTask.totalMoney);
          that.stk = datw.isAgree;
          that.totalPremium = datw.insOrders.length > 0 ? datw.insOrders[0].totalPremium : 0;
          that.refundOtherFee = datw.apprvTask.refundOtherFee; //手续费
          that.talattribution = datw.apprvTask.deptName; //部门名称
          that.costattribution = datw.apprvTask.costName; //成本中心名称
          that.taskType = datw.apprvTask.taskType; //审批单类型 1事前 2事中 4改签 5退票
          that.totalBudget = datw.apprvTask.totalBudget; // 预估费用
          if (datw.tmsDpsSaleExtra.length !== 0) {
            that.nlowPrice = datw.tmsDpsSaleExtra[0].nlowPrice;
            that.nlowPriceFlight = datw.tmsDpsSaleExtra[0].nlowPriceFlight;
            that.nlowPriceTime = datw.tmsDpsSaleExtra[0].nlowPriceTime;
            that.twoNLowPrice = datw.tmsDpsSaleExtra[0].twoNLowPrice;
            that.twoNLowPriceFlight = datw.tmsDpsSaleExtra[0].twoNLowPriceFlight;
            that.twoNLowPriceTime = datw.tmsDpsSaleExtra[0].twoNLowPriceTime;
          }
          let applivalist = [];
          let appflks = datw.tmsGssLink.applyVehicles;
          for (let k = 0; k < appflks.length; k++) {
            if (appflks[k].goBackGroup == null || appflks[k].goBackGroup == undefined) {
              applivalist.push(appflks[k])
            } else {
              let nums = 0;
              for (let p in applivalist) {
                if (applivalist[p].goBackGroup != null && appflks[k].goBackGroup != undefined) {
                  if (applivalist[p].goBackGroup == appflks[k].goBackGroup) {
                    nums = 1;
                  }
                }
              }
              if (nums == 0) {
                appflks[k].deptDates = appflks[k + 1].deptDate;
                applivalist.push(appflks[k])
              }
            }
          }
          that.taslist = datw.tmsGssLink.applyHotels.concat(applivalist);
          that.status = datw.apprvTask.status;
          that.splog = datw.apprvTask.apprvTaskLogPersons; //审批日志
          that.traveldetails = datw.apprvTask.remark; //超规原因
          let is = that.taskType;
          let item = that.traveldetails;
          if (this.taskType != 1) {
            let ordtyp = 0;
            if (datw.tmsGssLink.applyVehicles.length > 0) {
              ordtyp = this.taslist[0].vehicle; //1机票 2火车 5用车 101酒店
            } else {
              ordtyp = 101;
            }
            if (ordtyp == 1) {
              this.plmesagelist = datw.tmsGssLink.applyVehicles; //飞机行程
            }
            let orddat = {
              orderType: ordtyp,
              taskType: this.taskType,
              travelNo: this.taslist[0].travelNo, //出差单号
              orderNo: this.taslist[0].orderId, // 订单单号
              tradeNo: this.taslist[0].tradeNo //销售单号
            };
            this.getApprvOrderInfos(orddat, ordtyp, this.taskType);
          }
          if (item != null && item != '' && item != '{}' && item != '{"information":[{}]}' && item != '{"information":[]}') {
            let sts = {};
            let st = JSON.parse(item).information;
            let list = st[0];
            this.remsk = [];
            if (is == 2 || is == 4 || is == 5) {
              //判断预定或者改签 才有超规信息
              for (let k in list) {
                sts[k] = {
                  list: []
                };
                for (let p in list[k]) {
                  let names = '';
                  if (k == 'highLimit') {
                    names = '高价超规';
                  } else if (k == 'lowLimit') {
                    names = '低价政策';
                  } else if (k == 'agreementFlightLimit') {
                    names = '限定协议航班政策';
                  } else if (k == 'reserveLimit') {
                    names = '提前预定规则政策';
                  } else if (k == 'positionLimit') {
                    names = '仓位限制规则政策';
                  } else if (k == 'discountLimit') {
                    names = '折扣限制规则政策';
                  } else if (k == 'accNumberLimit') {
                    names = '同行人数限制规则政策';
                  } else if (k == 'nativeTrainRules') {
                    names = '座位等级超规';
                  } else if (k == 'starLevelLimit') {
                    names = '星级超规';
                  } else if (k == 'repeatBookingLimit') {
                    names = '重复预定超规';
                  } else if (k == 'platformLimit') {
                    names = '平台限制超规';
                  } else if (k == 'carGroupLimit') {
                    names = '车型限制超规';
                  } else if (k == 'eachTimePriceLimit') {
                    names = '金额每次限制超规';
                  } else if (k == 'eachDayPriceLimit') {
                    names = '金额每天限制超规';
                  } else if (k == 'eachMonthPriceLimit') {
                    names = '金额每月限制超规';
                  }
                  if (p == 2) {
                    sts[k].list.push({
                      is: 2,
                      name: list[k][p],
                      nametype: names,
                      type: k
                    });
                  }
                  if (p == 3) {
                    sts[k].list.push({
                      is: 3,
                      name: list[k][p].usernames,
                      nametype: names,
                      type: k,
                      seratis: list[k][p].reasons
                    });
                  }
                  if (p == 1) {
                    sts[k].list.push({
                      is: 1,
                      name: list[k][p],
                      nametype: names,
                      type: k
                    });
                  }
                  if (p == 5) {
                    sts[k].list.push({
                      is: 5,
                      name: list[k][p],
                      nametype: names,
                      type: k
                    });
                  }
                  if (p == 7) {
                    sts[k].list.push({
                      is: 7,
                      name: list[k][p],
                      nametype: names,
                      type: k
                    });
                  }
                  if (p == 8) {
                    sts[k].list.push({
                      is: 8,
                      name: list[k][p].usernames,
                      nametype: names,
                      type: k,
                      seratis: list[k][p].reasons
                    });
                  }
                }
              }
              this.remsk = sts;
              that.trafals = true;
            } else {
              that.trafals = false;
            }
          } else {
            that.trafals = false;
          }
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      } catch (e) {
        this.loading = false;
        //TODO handle the exception
      }
    },
    newdata(tm) {
      //回显时间
      if (tm.vehicle == 5) {
        return tm.createTime
      } else {
        let sta = '';
        let stamon = '';
        let stadta = '';
        let end = '';
        let endmon = '';
        let enddta = '';
        if (tm.deptDate) {
          if (tm.deptDates) {
            end = new Date(tm.deptDates.replace(/-/g, '/')); //出发日期
            endmon = this.dats(end.getMonth() + 1);
            enddta = this.dats(end.getDate());
          }
          sta = new Date(tm.deptDate.replace(/-/g, '/')); //出发日期
          stamon = this.dats(sta.getMonth() + 1);
          stadta = this.dats(sta.getDate());
        } else {
          sta = new Date(tm.inDate.replace(/-/g, '/')); //出发日期
          stamon = this.dats(sta.getMonth() + 1);
          stadta = this.dats(sta.getDate());
          end = new Date(tm.outDate.replace(/-/g, '/')); //出发日期
          endmon = this.dats(end.getMonth() + 1);
          enddta = this.dats(end.getDate());
          return stamon + '月' + stadta + '日' + '　入住　' + endmon + '月' + enddta + '日' + ' 离店'
        }
        if (tm.deptDates) {
          return stamon + '月' + stadta + '日' + '　出发　' + endmon + '月' + enddta + '日' + ' 返回'
        } else {
          return stamon + '月' + stadta + '日' + '  出发'
        }
      }
    },
    dats(it) {
      if (it < 10) {
        return '0' + it;
      } else {
        return it;
      }
    },
    routens() {
      //返回列表页面
      this.$router.go(-1); //返回上一层
    },
    clearsks() {
      //取消订单
      this.$confirm('将撤回申请单，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.opclose(); //撤回申请单
      });
    },
    opclose() {
      this.loading = true;
      this.$api.applicat
          .cancelTask({
            id: this.codes
          })
          .then(res => {
            this.loading = false;
            if (res.code == 200) {
              this.$message({
                message: '取消成功！',
                type: 'success'
              });
              this.searchhoter();
            } else {
              this.$message({
                message: res.message,
                type: 'warning'
              });
            }
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
          });
    },
    count(ti, ts) {
      //计算两个日期多少天
      let date1 = new Date(ti);
      let date2 = new Date(ts);
      let date = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24); /*不用考虑闰年否*/
      return date;
    },
    subtime(tiem) {
      //返回日期前10位
      return tiem.substring(0, 10);
    },
    settlement(it) {
      if (it == 1) {
        return '现结';
      } else {
        return '预付月结';
      }
    },
    catype(it) {
      //返回证件类型
      if (it == 1) {
        return '身份证'; //NI
      } else if (it == 2) {
        return '护照'; //PP
      } else if (it == 3) {
        return '台胞证'; //TB
      } else if (it == 4) {
        return '港澳通行证'; //GA
      }
    },
    catypes(it) { //返回证件类型
      if (it == 'NI') {
        return '身份证'
      } else if (it == 'PP') {
        return '护照'
      } else if (it == 'TB') {
        return '台胞证'
      } else if (it == 'GA') {
        return '港澳通行证'
      } else if (it == 'HX') {
        return '回乡证'
      } else if (it == 'OS') {
        return '其他证件'
      }
    },
  }
};
</script>

<style scoped lang="less">

.hoteorder {
  width: 1158px;
  margin: 20px auto;
  background-color: #FFFFFF;
  padding: 0 10px;
  border: 1px solid #E6E6E6;
  border-radius: 4px;

  .staleve {
    position: fixed;
    left: 0;
    top: 0;
    width: calc(100% - 68%);
    height: 100%;
    padding: 0 34%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;

    .stalist {
      width: 100%;
      border-radius: 18px;

      font-size: 16px;
      line-height: 90px;
      background: #f1f1f1;

      .scloos {
        max-height: 500px;
        overflow: auto;

        .statop {
          padding: 10px 10px 0 10px;

          .reds {
            width: 100%;
            height: 60px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            color: red;

            .ts_text {
              padding: 0 20px;
              line-height: 50px;
              border-radius: 50px;
              border: 2px solid red;
            }
          }

          .setlist {
            line-height: 30px;
            font-size: 16px;
            margin: 10px 0;

            .setbod {
              border: 2px solid #ffffff;
              border-radius: 15px;

              .styul {
                width: 100%;
                margin: 10px 0;

                .styli_top {
                  width: 100%;
                  color: red;
                  text-align: center;
                  font-size: 16px;
                  line-height: 45px;
                }

                .stulis {
                  display: flex;

                  .styli_left {
                    width: 25%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                  }

                  .styli_right {
                    width: 75%;
                    margin-left: 5%;
                  }
                }
              }
            }
          }
        }
      }
    }
  }


  .hotbox {
    width: calc(100% - 30px);
    background-color: #ffffff;
    font-size: 14px;
    color: #666666;

    .bot_amount {
      width: 500px;
      line-height: 14px;
      padding-top: 27px;
      padding-bottom: 24px;
      padding-left: 58px;
    }

    .bot_hotelList {
      padding: 26px 0 27px 20px;

      .bot_hotelTitle {
        display: flex;
        align-items: center;
        margin-bottom: 12px;

        .bot_hotelName {
          font-size: 16px;
          font-family: MicrosoftYaHei-Bold;
          font-weight: Bold;
          color: #333333;
          padding-left: 32px;
        }
      }

      .bot_hotelPo {
        padding-left: 80px;
        color: #333333;

        & > div > span:first-child {
          color: #666666;
        }

        & > div {
          margin-bottom: 12px;
        }
      }

      .bot_hotelAmount {
        display: flex;

        & > div > span:first-child {
          color: #666666;
        }

        & > div > span:nth-child(2) {
          color: #F48F00;
        }

        .bot_eachNightPrice {
          margin-right: 20px;
        }
      }

    }

    .aptops {
      width: 100%;
      display: flex;
      align-items: center;
      color: #333333;
      line-height: 14px;
      padding: 38px 0 22px 20px;

      .apfirst {
        color: #3c85fd;
        cursor: pointer;
      }
    }

    .teright {
      color: #333333;
    }

    .prcies {
      color: #ff6600;
    }

    .lefbox {
      background-color: #F2F2F2;
      width: 100%;
      line-height: 34px;
      font-weight: 600;
      font-size: 14px;
      padding-left: 21px;
      color: #333333;
    }

    .b_uesr {
      padding-top: 18px;
      padding-left: 58px;
    }

    .b_list {
      padding-left: 58px;
      display: flex;

      & > img {
        width: 10px;
        height: 12px;
        padding-top: 18px;
      }

      .b_userlist {
        display: flex;
        width: 416px;
        padding-left: 13px;
        padding-top: 18px;
        line-height: 14px;
        justify-content: space-between;
      }
    }


    .b_list_bottom{
      padding-bottom: 24px !important;
    }

    .bot_plane_btom {
      margin-bottom: 21px;
    }

    .bot_plane {
      width: 1118px;
      background: #F9F9F9;
      margin-top: 14px;
      margin-left: 20px;
      padding-bottom: 23px;

      .bot_vo {
        width: 204px
      }
      .bot_vo_w{
        width: 50%;
      }
      .bot_flighNo {
        justify-content: flex-end;
        width: 150px;
        align-items: flex-end;
        text-align: right
      }

      .bot_Terminal {
        align-items: center;
        display: flex;
        padding: 20px 0 0 43px;
        width: 770px;
        font-size: 14px;
        line-height: 14px;
      }

      .bot_Terminal_tas {
        padding-top: 23px;
        padding-left: 26px;
        line-height: 18px;

        & > img {
          width: 18px;
          height: 18px;
        }

        .bot_vm {
          width: 100%;
        }
      }

      .bot_can {
        width: 600px;
        display: flex;
        font-size: 14px;
        line-height: 14px;
        padding: 24px 0 0 43px;

      }
    }

    .bot_userList {
      padding: 26px 0 27px 20px;

      span.bot_SpanLi {
        width: 70px;
        text-align: right;
        align-items: flex-end;
      }

      & > div {
        margin-bottom: 12px;
        display: flex;
      }

      div:last-child {
        margin-bottom: 0;
      }

      .hot_sale {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .hot_form {
          padding-left: 19px;
          line-height: 16px;
          font-size: 16px;
          font-family: MicrosoftYaHei-Bold;
          font-weight: Bold;
          color: #333;
        }

        img {
          width: 30px;
        }
      }

      .hot_Time {
        margin: 14px 0 0 48px;
        color: #666666;
        line-height: 14px;
      }
      .user_N{
        margin-top: 10px !important;
      }

      .hot_TicketNo{
        margin-bottom: 0;
        margin-top: 22px;
        margin-left: 48px;
      }

      .hot_user {
        margin: 32px 0 0 48px;

        & > span {
          color: #333333;
        }
      }
    }

    .hot_trainList {
      padding-top: 30px;
      padding-bottom: 50px;
    }

    .hb_span {
      color: red;
      width: 349px;
      line-height: 14px;
      padding: 17px 0 0 43px;
    }

    .soclass_title {
      margin-top: 16px;
    }

    .soclass {
      color: #333333;
      display: flex;
      margin-left: 20px;
      text-align: center;
      line-height: 32px;
      border: 1px solid #f9e6d0;
      border-bottom: 0;

      div:nth-child(1) {
        flex: 1;
      }

      div:nth-child(2) {
        flex: 2;
      }

      div:nth-child(3) {
        flex: 1;
      }

      div:nth-child(4) {
        flex: 1;
      }

      div:nth-child(5) {
        flex: 1;
      }

      div:nth-child(6) {
        flex: 3;
      }

      .solist {
        border-right: 1px solid #f9e6d0;
        background-color: #fdf8f2;
        color: #333333;
      }
    }

    .pricenum {
      display: flex;

      div {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          color: #f48f00;
          font-size: 20px;
        }
      }
    }
  }
}

.boxbtn {
  width: 100%;
  height: 40px;
  display: flex;
  padding: 51px 0 38px 0;
  align-items: center;
  justify-content: center;

  div {
    width: 88px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    margin: 0 10px;
  }

  .retunbts {
    background-color: #ffffff;
    color: #3C85FD;
    border: 1px solid #3C85FD;
    border-radius: 2px;
  }
  
   .tkbts:hover {
    opacity: 0.8;
  }

  .nobts {
    background-color: #3c85fd;
    color: #ffffff;
    border: 1px solid #3c85fd;
  }

  .tkbts {
    background-color: #d55e5e;
    color: #ffffff;
    border: 1px solid #d55e5e;
    border-radius: 2px;
  }
}
</style>
