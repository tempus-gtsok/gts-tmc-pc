<!--
       author: I won’t leave my name, for fear of being beaten by someone who takes over
-->
<template>
  <div class="hoteorder" v-loading="loading" v-if="ticketdetails != null && ticketdetails != undefined">
    <div class="hotboxs">
      <el-drawer :visible.sync="drawer" :with-header="false">
        <div class="ditrslist">
          <div class="ditrslists" v-for="(item,index) in drawelist" :key="index">
            <div style="margin-right: 10px;font-size: 15px;">{{ index + 1 }}级审批人:</div>
            <div>
              <el-select v-model="apprvCost[index].id" v-if="item.apprvCostFlowNodePersons" placeholder="请选择">
                <el-option v-for="items in item.apprvCostFlowNodePersons" :key="items.id" :label="items.staffName"
                           :value="items.id">
                </el-option>
              </el-select>
              <el-select v-model="apprvCost[index].id" v-else placeholder="请选择">
                <el-option v-for="items in item.apprvDeptFlowNodePersons" :key="items.id" :label="items.staffName"
                           :value="items.id">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="addpalist" @click="btn_click">选好了</div>
      </el-drawer>
      <div class="hot_lefts" style="display: flex">
        <img src="../../../static/image/left.png">
        <span>机票意向单单号：{{ no }}</span>
        <div class="" v-if="orderStatus === 1">
          <img src="../../../static/image/home/Approval-Pending.png" alt="">
        </div>
        <div class=" " v-if="orderStatus === 2">
          <img src="../../../static/image/home/Canceled.png" alt="">
        </div>
        <div class=" " v-if="orderStatus === 3">
          <img src="../../../static/image/intentionlist/judan.png" alt="">
        </div>
        <div class=" " v-if="orderStatus === 4">
          <img src="../../../static/image/intentionlist/yishenpi.png" alt="">
        </div>
        <div class="" v-if="orderStatus === 5">
          <img src="../../../static/image/intentionlist/yiyuding.png" alt="">
        </div>
      </div>
    </div>
    <div class="titck_List">
      <div class="hotbox">
        <div class="ticketIntent" v-if=" 1 != orderStatus && null != ticketdetails ">
          <div class="ticketIntent_top">
            <div class="ticketIntent_left">
              <div><img src="../../../static/image/sqd_jp.png"/></div>
              <div><img src="../../../static/image/home/go.png"/></div>
              <div class="ticketIntent_departDate">
                {{ ticketdetails.flights[0].departDate.substring(0, 10) }}
              </div>
              <div class="ti_airline">
                {{
                  company(ticketdetails.airline, ticketdetails.flights[0].flightNo)
                }}{{ ticketdetails.flights[0].flightNo }}
              </div>
            </div>
            <div class="ticketIntent_button">
              <span class="ticketIntent_bt_cabin">舱位等级：{{ cabinRating(ticketdetails.flights[0].cabin) }}</span>
              <span class="numprice" v-if="numprice != null">票价：￥{{ numprice }}</span>
            </div>
          </div>

          <div class="titcket_flights">
            <div class="ti_depart">
              <span style="">{{ citys(ticketdetails.flights[0].depart) }}</span>
            </div>
            <div class="ti_flight">
              <div>
                {{ ticketdetails.flights[0].departTime }} - {{ ticketdetails.flights[0].arriveTime }}
              </div>
              <img src="../../../static/image/jiantou.png">
              <div>
                {{ ticketdetails.flights[0].flightNo }}&nbsp;
              </div>
            </div>
            <div class="ti_arrive">
              <span>{{ citys(ticketdetails.flights[0].arrive) }}</span>
            </div>
          </div>
        </div>
        <div v-if="orderStatus == 1 && null != ticketdetails">
          <div class="lefbox">航程信息</div>
          <div class="ti_list">
            <div class="hotbox_city">
              <div class="depart">出发城市：{{ citys(ticketdetails.flights[0].depart) }}</div>
              <div class="arrive">到达城市：{{ citys(ticketdetails.flights[0].arrive) }}</div>
            </div>
            <div>最早出发时间：{{ ticketdetails.flights[0].minDepartDate }}</div>
            <div>最晚出发时间：{{ ticketdetails.flights[0].maxDepartDate }}</div>
            <div>价格范围：{{ ticketdetails.flights[0].minPrice }} ~ {{ ticketdetails.flights[0].maxPrice }}</div>
            <div>乘客人数：成人&nbsp;{{ ticketdetails.peoples[0] }}&nbsp;人，&nbsp;&nbsp;儿童&nbsp;{{ ticketdetails.peoples[1] }}&nbsp;人，&nbsp;&nbsp;婴儿&nbsp;{{
                ticketdetails.peoples[2]
              }}&nbsp;人
            </div>
            <div>舱位等级：{{ ticketdetails.serviceLevelName }}</div>
            <div class="airline">首选航司：{{ company(ticketdetails.airline, ticketdetails.flights[0].flightNo) }}&nbsp;-&nbsp;{{
                ticketdetails.airline
              }}
            </div>
          </div>
        </div>
        <div v-if="orderStatus == 1 && null != ticketdetails">
        <div class="lefbox">联系人信息</div>
        <div class="user">
          <span class="user_name">姓名：{{ ticketdetails.contacts }}</span>
          <span class="user_phone">手机号：{{ ticketdetails.contactPhone }}</span>
        </div>
        </div>
        <div class="lefbox">乘机人信息</div>

        <div class="pa_list" v-show="null != ticketdetails">
          <div class="passenger" v-for="(item,index) in ticketdetails.travelers">
            <span class="passenger_name">姓名：{{ item.name }}</span>
            <span class="passenger_type">乘客类型：成人</span>
            <span class="passenger_cardType">证件类型：{{ catype(item.cardType) }}</span>
            <span class="passenger_cardNo">证件号码：{{ item.cardNo }}</span>
            <span class="passenger_phone">联系电话：{{ item.phone }}</span>
          </div>
        </div>
        <div v-if="orderStatus == 1 && ticketdetails != null" class="remark">备注：{{ ticketdetails.remark }}</div>
        <div v-if="orderStatus != 1 && ticketdetails != null" class="remark">注意：{{ ticketdetails.note }}</div>

        <defray business-type="1" product-type="1" :record-no=recordNos :amount=numprice entryMethod=0
                :pay-status=payStatus intention="1"
                v-if="ticketdetails.travelType == 2 && orderStatus == 5 && payStatus == 1" style="width: 100%"></defray>
        <div v-if=" ticketdetails.travelType == 1 && ticketdetails.travelerNo == null && ticketdetails.status == 4">
          <div>
            <div class="tr_ul">
              <div class="tr_uleft">归属部门</div>
              <div class="tr_rights">
                <el-input v-model="attdepartment" :disabled="true" placeholder="请输入联系人姓名"></el-input>
              </div>
            </div>
            <div class="tr_ul">
              <div class="tr_uleft">成本中心</div>
              <div class="tr_rights">
                <el-cascader style="width: 200px;" ref="cascader" @change="handleChange" :props='bots'
                             :options="treeLists"></el-cascader>
              </div>
            </div>
            <div class="tr_ul" v-if="CostCi == true">
              <div class="tr_uleft">成本审批人</div>
              <div class="tr_rights">
                <div class="tr_dvs" @click="drawers('TravelCostCenlist')">
                          <span v-for="(item,index) in TravelCostCenlist" :key="index"
                                v-if="TravelCostCenlist.length > 0"> <!-- -->
                            {{ item.staffName }}
                          </span>
                </div>
              </div>
            </div>
            <div class="tr_ul" v-if="CostCis == true">
              <div class="tr_uleft">部门审批人</div>
              <div class="tr_rights">
                <div class="tr_dvs" @click="drawers('TravelDepartlist')">
                          <span v-for="(item,index) in TravelDepartlist" :key="index"
                                v-if="TravelDepartlist.length > 0"> <!---->
                            {{ item.staffName }}
                          </span>
                </div>
              </div>
            </div>
          </div>
          <div class="tr_ul">
            <div class="tr_uleft">出行事由</div>
            <div class="tr_rights">
              <el-input v-model="reson" type="textarea" :rows="2" placeholder="请输入出行事由"></el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="boxbtn">
      <div class="nobts" @click="confirm" v-if="orderStatus == 4 ">确认订单</div>
      <div class="nobts" style="background-color: red;border: 1px solid red;" @click="clearsks" v-if="orderStatus == 4">
        取消订单
      </div>
      <div class="retunbts" @click="retuns">返回</div>
    </div>
  </div>
</template>

<script>
import airports from '../../../static/js/airports.js';
import Defray from "@/components/common/defray";

export default {
  components: {Defray},
  data() {
    return {
      drawelist: [],
      apprvCost: null,
      drawer: false,
      bots: { //使用props替换掉本来默认的lable和value 的键值
        value: 'id',
        label: 'text'
      },
      NameCenter: { //当前选择成本中心
        name: '',
        id: 0
      },
      no: '', //意向单单号
      treeLists: [], //成本中心
      TravelDepartlist: [], //部门审批人
      TravelCostCenlist: [], //成本中心审批人
      CostCi: false, //是否有成本审批人
      CostCis: false, //是否有部门审批人
      Deparapprover: [], //部门审批人
      CostCenterlist: [], //成本审批人
      iscost: true, //true为成本中心false为部门
      loading: false,
      attdepartment: JSON.parse(sessionStorage.getItem('userinfo')).deptName, //默认部门
      numprice: null, //总价
      payStatus: '', //支付状态 1 为待支付 2 支付中 3 为已支付，4 为挂帐支付
      orderStatus: '', //订单状态
      EntryMethod: 0,
      reson: '',  //出差事由
      travelType: '', //因公 or 因私
      travelNo: '', //销售单号
      apprvTaskStaffs: [], //用于存放成本和部门审批人的参数
      recordNos: '',//销售单号
      plsitsti: '',
      ticketdetails: null,
      hang: '',//航班名称

    };
  },
  mounted() {

    this.no = this.$route.query.no; //获取上个页面传入的参数
    this.getDetail();
    this.selts(); //查询成本中心
  },
  methods: {
    async confirm() {
      this.loading = true;
      let dat = [];
      if (this.ticketdetails.travelerNo != null || this.ticketdetails.travelType == 2) {
        dat = {
          requireNo: this.no,
          flights: this.ticketdetails.flights,
          travelerList: this.ticketdetails.travelers,
          name: this.ticketdetails.contacts,
          phone: this.ticketdetails.contactPhone,
        }
      } else if (this.ticketdetails.travelerNo == null && this.ticketdetails.travelType == 1) {
        if (this.reson == null || this.reson == '') {
          this.$message.warning('请输入出差事由！');
          this.loading = false;
          return;
        }
        if (this.NameCenter.name == '' && this.NameCenter.id === 0 || this.NameCenter.name == null && this.NameCenter.id == null) {
          this.$message.warning('请选择成本中心！');
          this.loading = false;
          return;
        }

        if (this.CostCi) {
          if (this.TravelCostCenlist == null || this.TravelCostCenlist.length == 0) {
            this.$message.warning('请选择成本审批人！');
            this.loading = false;
            return;
          }
        }
        if (this.CostCis) {
          if (this.TravelDepartlist == null || this.TravelDepartlist.length == 0) {
            this.$message.warning('请选择部门审批人！');
            this.loading = false;
            return;
          }
        }
        let apprvTaskStaffs = {
          costId: this.NameCenter.id,
          costName: this.NameCenter.name,
          reason: this.reson,
          apprvTaskStaffs: [{
            staffId: this.TravelCostCenlist[0].staffId,
            staffName: this.TravelCostCenlist[0].staffName,
            deptCost: this.TravelCostCenlist[0].deptCost
          }]
        }
        dat = {
          requireNo: this.no,
          flights: this.ticketdetails.flights,
          travelerList: this.ticketdetails.travelers,
          name: this.ticketdetails.contacts,
          phone: this.ticketdetails.contactPhone,
          apprvTaskEntity: apprvTaskStaffs, //成本中心
        }
      }
      this.$api.intentionlist.requireBooking(dat).then(res => {
        if (res.code == 200) {
          this.payStatus = res.data.payStatus;//支付状态
          this.getDetail()
        } else {
          this.$message.error('确认意向单失败')
        }
        this.loading = false;
      })
    },
    company(ie, no) {
      if (null == ie || "" == ie && null != no) {
        let airline = no.substring(0, 2);
        for (let s in this.hang) {
          if (airline == s) {
            airline = this.hang[s];
            return airline;
          }
        }
      } else {
        for (let s in this.hang) {
          if (ie == s) {
            ie = this.hang[s];
            return ie;
          }
        }
      }

    },
    cabinRating(cabin) {
      if ('Y' == cabin) {
        return '经济舱';
      } else if ('F' == cabin) {
        return '头等舱';
      } else if ('C' == cabin) {
        return '商务舱';
      }
    },
    getDetail() {
      let that = this;
      this.$api.order.queryAirlineList().then(res => {
        if (res.code == 200) {
          that.hang = res.data.airlineDds; //航空公司名
        }
      });
      this.$api.intentionlist.getDetail({no: this.no}).then(res => {
        if (res.code == "200") {
          that.ticketdetails = res.data;
          that.travelNo = res.data.no;
          that.orderStatus = res.data.status;
          that.travelType = res.data.travelType;
          that.recordNos = res.data.tradeNo; //销售单号
          that.numprice = res.data.amountPrice;  //订单金额
          that.payStatus = res.data.payStatus;//支付状态
          that.address = airports.addressAirportAll; //航空名字
        }
      })
    },
    catype(it) {//返回证件类型
      if ('NI' == it) {
        return '身份证'//NI
      } else if ('PP' == it) {
        return '护照'//PP
      } else if ('TB' == it) {
        return '台胞证'//TB
      } else if ('GA' == it) {
        return '港澳通行证'//GA
      }
    },
    retuns() {
      this.$router.go(-1); //返回上一页
    },
    citys(its) { //回显城市
      for (let j = 0; j < this.address.length; j++) { //循环城市
        if (this.address[j].airportCode == its) {
          return this.address[j].cityCName
        }
      }
    },
    clearsks() { //取消订单
      this.$confirm('将取消订单，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.opclose(); //取消订单
      });
    },
    opclose() {
      this.loading = true;
      this.$api.intentionlist.cancel({
        no: this.no
      }).then((res) => {
        this.loading = false;
        if (res.code == 200) {
          this.$message({
            message: '取消成功！',
            type: 'success'
          })
          this.getDetail();
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((error) => {
        this.loading = false;
        console.log(error)
      })
    },
    selts() { //查询成本中心
      let _this = this;
      _this.$api.home.getCostCenterList().then((res) => {
        if (res.code == 200) {
          _this.treeLists = res.data[0].children;
        } else {
          _this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((e) => {
        _this.loading = false;
        console.log(e)
      })
    },
    handleChange(value) { //选择成本中心
      let nodesObj = this.$refs['cascader'].getCheckedNodes(); //获取当前节点的信息
      this.NameCenter.name = nodesObj[0].data.text;
      this.NameCenter.id = nodesObj[0].data.id;
      this.TravelCostCenlist = [];
      this.TravelDepartlist = [];
      this.appswlist(); //重新获取部门和成本中心审批人
    },
    async appswlist() { //选获取部门和成本审批人信息
      let that = this;
      let nuarry = [];
      let travelers = that.ticketdetails.travelers
      let nus = travelers; //出差人的集合
      for (let i = 0; i < nus.length; i++) {
        nuarry.push(nus[i].passengerNo) //获取出行人员id
      }
      that.loading = true;
      let res;
      try {
        res = await that.$api.home.getStaffList({
          costId: that.NameCenter.id,
          passengerNos: nuarry,
          applyType: 1
        });
        that.loading = false;
        if (res.code == 200) {
          if (res.data.deptStaffs.length == 0) { //是否有部门审批人
            that.CostCis = false;
          } else {
            that.CostCis = true;
            that.Deparapprover = res.data.deptStaffs; //部门审批人
          }
          if (res.data.costStaffs.length == 0) {
            that.CostCi = false;
          } else {
            that.CostCi = true;
            that.CostCenterlist = res.data.costStaffs; //成本审批人
          }
        }
      } catch (e) {
        console.log(e)
        that.loading = false;
      }
    },
    drawers(its) { //点击成本或者部门审批人
      if (its == 'TravelCostCenlist') { //判断是部门还是成本中心
        this.iscost = true;
        this.drawelist = this.CostCenterlist;
      } else {
        this.iscost = false;
        this.drawelist = this.Deparapprover;
      }
      this.apprvCost = [];
      if (this.iscost == true) {
        for (let i = 0; i < this.CostCenterlist.length; i++) {
          this.apprvCost.push({
            id: ''
          })
        }
      } else {
        for (let i = 0; i < this.Deparapprover.length; i++) {
          this.apprvCost.push({
            id: ''
          })
        }
      }
      this.drawer = true;
    },
    btn_click() { //确定部门或者成本审批人
      let that = this;
      for (let k in this.apprvCost) {
        if (that.apprvCost[k].id == "") {
          that.$message({
            message: "请选择" + (parseInt(k) + 1) + "级审批人",
            type: 'warning'
          });
          return
        }
      }
      if (this.iscost == true) { //成本审批人信息
        that.TravelCostCenlist = [];
        for (let k in that.drawelist) {
          for (let i in that.drawelist[k].apprvCostFlowNodePersons) {
            for (let j in that.apprvCost) {
              if (that.apprvCost[j].id == that.drawelist[k].apprvCostFlowNodePersons[i].id) {
                that.TravelCostCenlist.push({
                  deptCost: 2,
                  personId: that.apprvCost[j].id,
                  nodeId: that.drawelist[k].apprvCostFlowNodePersons[i].nodeId,
                  staffId: that.drawelist[k].apprvCostFlowNodePersons[i].staffId,
                  staffName: that.drawelist[k].apprvCostFlowNodePersons[i].staffName
                })
              }
            }
          }
        }
      } else { //部门审批人信息
        this.TravelDepartlist = [];
        for (let k in that.drawelist) {
          for (let i in that.drawelist[k].apprvDeptFlowNodePersons) {
            for (let j in that.apprvCost) {
              if (that.apprvCost[j].id == that.drawelist[k].apprvDeptFlowNodePersons[i].id) {
                that.TravelDepartlist.push({
                  deptCost: 1,
                  personId: that.apprvCost[j].id,
                  nodeId: that.drawelist[k].apprvDeptFlowNodePersons[i].nodeId,
                  staffId: that.drawelist[k].apprvDeptFlowNodePersons[i].staffId,
                  staffName: that.drawelist[k].apprvDeptFlowNodePersons[i].staffName
                })
              }
            }
          }
        }
      }
      that.drawer = false;
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
  }
};
</script>

<style scoped lang="less">
.hotbox_city {
  width: 100%;
  display: flex;
  line-height: 40px;
  margin-top: 10px;

  .depart {
    width: 50%;
  }

  .arrive {
    width: 50%;
  }
}

.user {
  width: 100%;
  display: flex;
  justify-content: center;
  line-height: 80px;

  .user_name {
    text-align: center;
    width: 50%;
  }

  .user_phone {
    width: 50%;
  }
}


.remark {
  color: red;
  padding-left: 44px;
}

.passenger {
  width: 100%;
  line-height: 50px;

  .passenger_name {
    width: 20%;
    margin: 0 20px 0 20px;
  }

  .passenger_type {
    width: 20%;
    margin: 0 20px 0 20px;
  }

  .passenger_cardType {
    width: 20%;
    margin: 0 20px 0 20px;
  }

  .passenger_cardNo {
    width: 20%;
    margin: 0 20px 0 20px;
  }

  .passenger_phone {
    width: 20%;
    margin: 0 20px 0 20px;
  }
}

.airline {
  margin-bottom: 15px;
}

.ticketIntent {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 22px 0 38px 30px;
  box-sizing: border-box;

  .ticketIntent_top {
    width: 50%;

    .ticketIntent_left {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      & > div:nth-child(1) {
      }

      & > div:nth-child(2) {
        margin-left: 21px;
        margin-right: 6px;
      }

      .ti_airline {
        font-size: 14px;
        font-weight: bold;
      }
    }

    .ticketIntent_departDate {
      width: 20%;
      font-size: 14px;
      font-weight: bolder;
      color: #333333;
    }

    .ticketIntent_button {
      text-indent: 20px;
      margin-left: 52px;
      margin-top: 24px;

      .ticketIntent_bt_cabin {
        color: #999999;
      }

      .numprice {
        margin-left: 10px;
        color: rgb(11, 192, 113)
      }
    }
  }

  .titcket_flights {
    display: flex;
    padding-right: 192px;
    align-items: center;

    .ti_depart {
      font-size: 15px;
      line-height: 16px;
      margin-right: 17px;
      text-align: center;
    }

    .ti_flight {
      width: 163px;
      text-align: center;

      & > div {
        font-size: 14px;
        color: #333333;
        line-height: 14px;
      }

      & > img {
        width: 163px;
        line-height: 10px;
      }
    }

    .ti_arrive {
      margin-left: 8px;
      line-height: 16px;
      text-align: center;
    }
  }
}

.tr_ul {
  width: 100%;
  margin: 10px 0;
  display: flex;

  .tr_uleft {
    color: #78879d;
    width: 80px;
    line-height: 40px;
  }

  .tr_right {
    width: calc(100% - 100px);
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;

    .tr_rs {
      cursor: pointer;
      margin: 10px;
      padding: 2px 10px;
      line-height: 20px;
      font-size: 14px;
      border: 1px solid #d9e2eb;
      border-radius: 40px;

      .tr_rtp {
        text-align: center;
      }

      .tr_rbn {
        color: #abb7c2;
      }
    }
  }

  .tr_rights {
    width: calc(100% - 100px);
    display: flex;

    .tr_dvs {
      cursor: pointer;
      width: 170px;
      height: 38px;
      padding: 0 15px;
      border-radius: 4px;
      border: 1px solid #DCDFE6;
      color: #606266;
      line-height: 38px;
      display: flex;
      font-size: 14px;

      span {
        margin: 0 3px;
      }
    }
  }
}

.hoteorder {
  width: 1180px;
  margin: 0 auto;

  .boxbtn {
    padding: 10px 0;
    background-color: #FFFFFF;
    border: 1px solid #ededed;
    border-top: none;
    font-size: 14px;
    line-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;


    div {
      padding: 2px 20px;
      border-radius: 4px;
      cursor: pointer;
      margin: 0 10px;
    }

    .retunbts {
      background-color: #FFFFFF;
      color: #409eff;
      border: 1px solid #409eff;
    }

    .nobts {
      background-color: #409eff;
      color: #FFFFFF;
      border: 1px solid #409eff;
    }

    .tkbts {
      background-color: red;
      color: #FFFFFF;
      border: 1px solid red;
    }
  }

  .hotboxs {
    height: 114px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 35px auto 9px auto;
    background-color: #ffffff;
    border-radius: 4px;
    border: 1px solid #ededed;

    .hot_lefts {
      font-size: 14px;
      color: #666666;
      height: 100%;
      justify-content: flex-start;
      align-items: center;

      & > img {
        height: 114px;
        width: 31px;
      }

      & > span {
        margin-left: 114px;
        margin-right: 139px;
      }
    }

    img {
      width: 73px;
      height: 73px;
    }
  }


  .ditrslist {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .ditrslists {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .addpalist {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    background: #007AFF;
  }

  .titck_List {
    padding: 10px;
    background-color: #FFFFFF;

    -moz-border-radius-topleft: 4px;
    -moz-border-radius-topright: 4px;
    border: 1px solid #ededed;
    border-bottom: none;

    .hotbox {
      font-size: 14px;
      background-color: #ffffff;
      border-radius: 4px;
      padding: 15px;
      box-sizing: border-box;

      .lefbox {
        background-color: #e4f1fe;
        width: 100%;
        text-indent: 10px;
        line-height: 34px;
        font-weight: 600;
        font-size: 14px;
        color: #333333;
      }
      .pa_list{
        padding-left: 26px;
      }
      .ti_list{
        padding-left: 44px;
      }


      .soclass {
        display: flex;
        text-align: center;
        line-height: 25px;

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
      }

      .pricenum {
        display: flex;

        div {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;

          span {
            color: #ff6600;
            font-size: 14px;
          }
        }
      }
    }
  }

}
</style>
