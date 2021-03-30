<template>
  <div class="trainadd">
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
    <div class="tresiadd" v-loading="loading">
      <div class="trsleft">
        <div class="trsbt">
          <div class="trsbord">
            <p>{{ retime(trainslis.datas.datatime) }}</p>
            <div class="tsfons">
              <span class="iconfont">&#xe669;</span>&nbsp;前往&nbsp;&nbsp;<span
                style="color: #333333;">{{ trainslis.trainlis.toStation }}</span>
            </div>
            <div class="tsbods">
              <div class="tsbodsle">
                <div>
                  <span class="iconfont" style="margin: 0 10px;color: #F5A623;">&#xe65a;</span>
                </div>
                <div>
                  <div style="font-size: 15px;">{{ trainslis.trainlis.trainNo }}</div>
                  <div style="font-size: 13px;color: #3B4F62;">{{ trainslis.astlis.seatName }}</div>
                </div>
              </div>
              <div class="trainsc_s">
                <div class="trainsc_s_l">
                  <div class="trainsc_s_l_b">
                    <div class="trainsc_s_l_b_r">{{ trainslis.trainlis.fromStation }}</div>
                  </div>
                  <div class="trainsc_s_l_t">{{ trainslis.trainlis.fromTime }}</div>
                </div>
                <div class="trainsc_s_s">
                  <div style="font-size: 12px;">{{ trainslis.datas.times }}</div>
                </div>
                <div class="trainsc_s_l">
                  <div class="trainsc_s_l_b">
                    <div class="trainsc_s_l_b_r">{{ trainslis.trainlis.toStation }}</div>
                  </div>
                  <div class="trainsc_s_l_t">{{ trainslis.trainlis.toTime }}</div>
                </div>
              </div>
              <div class="tright">
                <p style="font-size: 16px;">￥</p>
                <p style="font-size: 25px;color: #ff6600;">{{ trainslis.astlis.price }}</p>
              </div>
            </div>
            <!-- 添加选座 -->
            <div v-show="allseat == true && seat != []" class="cseat">
              <div class="seat_a">
                <div class="seat_display">
                  <div class="seat_fo">
                    选座：
                  </div>
                  <div class="seat_le">
                    <div v-for="(item,index) in seat">
                      <div v-if="item.name == 'A'">
                        窗
                        <div class="seat" @click="picks(item)" :class="seids(item.id) == item.id ? 'pickseat' : '' ">
                          {{ item.name }}
                        </div>
                      </div>
                      <div v-if="item.name !='A' && item.name != 'D' && item.name != 'F'">
                        <div class="seat" @click="picks(item)" :class="seids(item.id) == item.id ? 'pickseat' : '' ">
                          {{ item.name }}
                        </div>
                      </div>
                      <div v-if="item.name == 'D'">
                        过道
                        <div class="seat" @click="picks(item)" :class="seids(item.id) == item.id ? 'pickseat' : '' ">
                          {{ item.name }}
                        </div>
                      </div>
                      <div v-if="item.name == 'F' && seat.length == 3">
                        过道
                        <div class="seat" @click="picks(item)" :class="seids(item.id) == item.id ? 'pickseat' : ''">
                          {{ item.name }}
                        </div>
                        窗
                      </div>
                      <div v-if="item.name == 'F'  && seat.length != 3">
                        <div class="seat" @click="picks(item)" :class="seids(item.id) == item.id ? 'pickseat' : ''">
                          {{ item.name }}
                        </div>
                        窗
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="secseat == true && seats != []" class="seat_a">
                <div class="seat_display">
                  <div class="seat_fo">
                    &emsp;
                  </div>
                  <div class="seat_le">
                    <div v-for="(item,index) in seats">
                      <div v-if="item.name == 'A'">
                        窗
                        <div class="seat" @click="picks(item)" :class="seids(item.id) == item.id ? 'pickseat' : '' "
                             v-if="item.name =='A'">
                          {{ item.name }}
                        </div>
                      </div>
                      <div class="seat" @click="picks(item)" :class="seids(item.id) == item.id ? 'pickseat' : '' "
                           v-if="item.name !='A' && item.name != 'D' && item.name != 'F'">
                        {{ item.name }}
                      </div>
                      <div v-if="item.name == 'D'">
                        过道
                        <div class="seat" @click="picks(item)" :class="seids(item.id) == item.id ? 'pickseat' : '' ">
                          {{ item.name }}
                        </div>
                      </div>
                      <div v-if="item.name == 'F' && seats.length == 3">
                        过道
                        <div class="seat" @click="picks(item)" :class="seids(item.id) == item.id ? 'pickseat' : ''">
                          {{ item.name }}
                        </div>
                        窗
                      </div>
                      <div v-if="item.name == 'F'  && seats.length != 3">
                        <div class="seat" @click="picks(item)" :class="seids(item.id) == item.id ? 'pickseat' : ''">
                          {{ item.name }}
                        </div>
                        窗
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="trstp">
          <div class="tr_ul">
            <div class="tr_uleft">旅客</div>
            <addPassenger @passage="passage" :iskok="2" v-if="isbtd == 2"></addPassenger>
            <div class="tr_right">
              <div class="tr_rs" v-for="(item, index) in userlists" :key="index" v-if="isbtd == 1">
                <div class="tr_rtp">{{ item.name }}　</div>
                <div class="tr_rbn" v-if="trainslis.ranst.isblcks != 4">{{ item.certificateList[0].cardTypename }}&nbsp;{{
                    item.certificateList[0].cardNo
                  }}
                </div>
                <div class="tr_rbn" v-if="trainslis.ranst.isblcks == 4">{{ item.certType }}&nbsp;{{ item.certNo }}</div>
              </div>
            </div>
          </div>
          <div class="tr_ul">
            <div class="tr_uleft">保险</div>
            <div class="tr_rights">
              <el-select style="width: 200px;"  v-model="profitPrice" placeholder="请选择">
                <el-option
                    v-for="item in insurances"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
              </el-select>
              <div class="tr_insurnce">票面价：{{insurance}}</div>
            </div>

          </div>
          <div class="tr_ul">
            <div class="tr_uleft">联系人</div>
            <div class="tr_rights">
              <el-input v-model="lname" placeholder="请输入联系人姓名"></el-input>
              &nbsp;&nbsp;&nbsp;
              <el-input v-model="lipone" placeholder="请输入联系人电话"></el-input>
            </div>
          </div>
          <div
              v-if="(trainslis.ranst.isblcks == 2 && !trainslis.isarsrl && trainslis.ranst.isbtd != 2)||(trainslis.ranst.isblcks == 4 && RuleMas && !trainslis.isarsrl && trainslis.ranst.isbtd != 2) ||(trainslis.ranst.isblcks == 1 && !trainslis.isarsrl && trainslis.ranst.isbtd == 1 && isblckt == true)">
            <div class="tr_ul">
              <div class="tr_uleft">归属部门</div>
              <div class="tr_rights">
                <el-input v-model="attdepartment" style="width: 100%;" :disabled="true"
                          placeholder="请输入联系人姓名"></el-input>
              </div>
            </div>
            <div class="tr_ul">
              <div class="tr_uleft">成本中心</div>
              <div class="tr_rights">
                <el-cascader style="width: 200px;" ref="cascader" :show-all-levels="false" @change="handleChange"
                             :props='bots'
                             :options="treeLists"></el-cascader>
              </div>
            </div>
            <div class="tr_ul" v-if="CostCi == true">
              <div class="tr_uleft">成本审批人</div>
              <div class="tr_rights">
                <div class="tr_dvs" @click="drawers('TravelCostCenlist')">
									<span v-for="(item,index) in TravelCostCenlist" :key="index" v-if="TravelCostCenlist.length > 0">
										{{ item.staffName }}
									</span>
                </div>
              </div>
            </div>
            <div class="tr_ul" v-if="CostCis == true">
              <div class="tr_uleft">部门审批人</div>
              <div class="tr_rights">
                <div class="tr_dvs" @click="drawers('TravelDepartlist')">
									<span v-for="(item,index) in TravelDepartlist" :key="index" v-if="TravelDepartlist.length > 0">
										{{ item.staffName }}
									</span>
                </div>
              </div>
            </div>
          </div>
          <div class="tr_ul"
               v-if="trainslis.ranst.isbtd == 1 && (trainslis.ranst.isblcks == 2 ||trainslis.ranst.isblcks == 4)">
            <div class="tr_uleft">出行事由</div>
            <div class="tr_rights">
              <el-input v-model="reson" type="textarea" :rows="2" placeholder="请输入出行事由"></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="trsright">
        <div class="tslist">
          <div>票价</div>
          <div>￥{{ trainslis.astlis.price }}×{{ userlists.length }}人</div>
        </div>
        <div class="tslist">
          <div>保险</div>
          <div>￥{{ insurance }}×{{ userlists.length }}人</div>
        </div>
        <div class="tslist">
          <div>服务费</div>
          <div>￥{{ Brokerage }}×{{ userlists.length }}人</div>
        </div>
        <div class="tslists">
          <div style="font-weight: 600;font-size: 14px;">合计</div>
          <div style="color: #ff6600;">￥{{ onprice }}</div>
        </div>
        <div class="tsbtn" @click="okadd" v-if="trainslis.ranst.isblcks != 4 && rotes('tms:tra:reserve')">
          提交订单
        </div>
        <div class="tsbtn" @click="uprean" v-if="trainslis.ranst.isblcks == 4 && rotes('tms:tra:change')">
          申请改签
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import addPassenger from "@/components/common/addPassenger";

let ip_test = /^[1][3456789][0-9]{9}$/; //电话号码正则
export default {
  data() {
    return {
      RuleMas: false,
      onprice: 0, //合计
      Brokerage: "", //火车单人手续费
      reson: "", //出行事由
      drawelist: [], //盒子内容
      drawer: false, //盒子默认关闭
      bots: { //使用props替换掉本来默认的lable和value 的键值
        value: 'id',
        label: 'text',
        checkStrictly: true //可以选父级
      },
      NameCenter: { //当前选择成本中心
        name: '',
        id: 0
      },
      passengers: [], //出行人员
      drawe: false,
      treeLists: [], //成本中心
      TravelDepartlist: [], //部门审批人
      TravelCostCenlist: [], //成本中心审批人
      CostCi: false, //是否有成本审批人
      CostCis: false, //是否有部门审批人
      Deparapprover: [], //部门审批人
      CostCenterlist: [], //成本审批人
      iscost: true, //true为成本中心false为部门
      apprvCost: [],
      lname: '', //默认联系人
      attdepartment: JSON.parse(sessionStorage.getItem('userinfo')).deptName, //默认部门
      lipone: '',
      loading: false,
      buslist: [],
      userlists: [], //旅客信息
      isblckt: false, //事前是否需要二次审批
      trainslis: JSON.parse(this.$route.query.data), //上个页面的参数
      allseat: false,
      secseat: false,//第二排座位
      isbtd: '',
      pick: [],
      picklist: [],
      seat: [],
      seats: [],
      insurances: null,
      profitPrice: null,
      insurance: 0,
      insCode: ''
    };
  },
  components: {
    addPassenger
  },
  watch: {
    passengers: {
      handler(newName, oldName) {
        this.pick = [];
        this.picklist = [];
        if (this.passengers.length > 0) {
          this.userlist();
        } else {
          this.allseat = false;
          this.seat = [];
          this.seats = [];
        }
        this.getBrokerage();
      },
    },
    profitPrice: {
      handler(newName, oldName) {
        let insurances = this.insurances;
        let profitPrice = this.profitPrice;
        for (let i = 0; i< insurances.length; i++){
          if (insurances[i].id == profitPrice){
            if (insurances[i].isGift != 1){
              this.insurance = insurances[i].buyPrice;
            }
            this.insCode = insurances[i].insuranceNo;
          }
        }
        if (this.isbtd == 1) {
          this.onprice = (this.trainslis.astlis.price) * (this.buslist.length) + (this.Brokerage) * (this.buslist.length)+ (this.insurance * this.buslist.length);
        } else {
          this.onprice = (this.trainslis.astlis.price * this.passengers.length) + (this.Brokerage * this.passengers.length) + (this.insurance * this.passengers.length) ;
        }
      },
    },
    deep: true
  },
  mounted() {
    let lis = JSON.parse(this.$route.query.data); //获取上个页面传入的参数
    this.buslist = lis.ranst.butalist;
    this.isbtd = lis.ranst.isbtd;
    if (this.isbtd !== '2') {
      this.userlist();
    }
    this.getBrokerage();
  },
  methods: {
    //座位显示
    showseat() {
      let userlists = this.userlists;
      let userlen = userlists != null ? userlists.length : null;
      let sst = this.trainslis.trainlis.trainNo.substring(0, 1);
      let slv = this.trainslis.astlis.seatName;
      if (userlen > 1) {
        this.secseat = true;
      } else if (userlen == 1) {
        this.secseat = false;
      }
      if (sst == 'G' || sst == 'C' || sst == 'D' && userlen != null) {
        this.allseat = true;
        if (slv == '二等座') {
          if (this.secseat) {
            this.seat.push({
              id: '1',
              value: '1A',
              name: 'A'
            }, {
              id: '2',
              value: '1B',
              name: 'B'
            }, {
              id: '3',
              value: '1C',
              name: 'C'
            }, {
              id: '4',
              value: '1D',
              name: 'D'
            }, {
              id: '5',
              value: '1F',
              name: 'F'
            })

            this.seats.push({
              id: '6',
              value: '2A',
              name: 'A'
            }, {
              id: '7',
              value: '2B',
              name: 'B'
            }, {
              id: '8',
              value: '2C',
              name: 'C'
            }, {
              id: '9',
              value: '2D',
              name: 'D'
            }, {
              id: '10',
              value: '2F',
              name: 'F'
            })
          } else {
            this.seat.push({
              id: '1',
              value: '1A',
              name: 'A'
            }, {
              id: '2',
              value: '1B',
              name: 'B'
            }, {
              id: '3',
              value: '1C',
              name: 'C'
            }, {
              id: '4',
              value: '1D',
              name: 'D'
            }, {
              id: '5',
              value: '1F',
              name: 'F'
            })

          }
        } else if (slv == '一等座') {
          if (this.secseat) {
            this.seat.push({
              id: '1',
              value: '1A',
              name: 'A'
            }, {
              id: '2',
              value: '1C',
              name: 'C'
            }, {
              id: '3',
              value: '1D',
              name: 'D'
            }, {
              id: '4',
              value: '1F',
              name: 'F'
            })
            this.seats.push({
              id: '5',
              value: '2A',
              name: 'A'
            }, {
              id: '6',
              value: '2C',
              name: 'C'
            }, {
              id: '7',
              value: '2D',
              name: 'D'
            }, {
              id: '8',
              value: '2F',
              name: 'F'
            })
          } else {
            this.seat.push({
              id: '1',
              value: '1A',
              name: 'A'
            }, {
              id: '2',
              value: '1C',
              name: 'C'
            }, {
              id: '3',
              value: '1D',
              name: 'D'
            }, {
              id: '4',
              value: '1F',
              name: 'F'
            })
          }
        } else if (slv == '商务座') {
          if (this.secseat) {
            this.seat.push({
              id: '1',
              value: '1A',
              name: 'A'
            }, {
              id: '2',
              value: '1C',
              name: 'C'
            }, {
              id: '3',
              value: '1F',
              name: 'F'
            },)
            this.seats.push({
              id: '4',
              value: '2A',
              name: 'A'
            }, {
              id: '5',
              value: '2C',
              name: 'C'
            }, {
              side: 'side',
              id: '6',
              value: '2F',
              name: 'F'
            })
          } else {
            this.seat.push({
              id: '1',
              value: '1A',
              name: 'A'
            }, {
              id: '2',
              value: '1C',
              name: 'C'
            }, {
              id: '3',
              value: '1F',
              name: 'F'
            },)
          }
        } else {
          this.allseat = false;
        }
      }
    },
    passage(list) {
      this.passengers = list;
    },
    seids(id) {
      for (let i = 0; i < this.pick.length; i++) {
        if (id == this.pick[i].id) {
          return id;
        }
      }
    },

    //选座
    picks(item) {
      let _this = this;
      let boolean = false;
      let index = '';
      if (_this.pick.length > 0) {
        for (let i = 0; i < _this.pick.length; i++) {
          if (item.id == _this.pick[i].id) {
            boolean = true;
            index = i;
          }
        }
        if (boolean) {
          this.pick.splice(index, 1)
          this.picklist.splice(index, 1)
          return
        } else {
          if (_this.pick.length == this.userlists.length) {
            if (this.userlists.length == 1) {
              _this.pick = [];
              _this.picklist = [];
              _this.pick.push({
                id: item.id
              })
              _this.picklist.push({
                item
              })
            } else {
              this.$message({
                message: '只能选择' + this.userlists.length + '张座位',
                type: 'warning'
              })
            }
          } else {
            _this.pick.push({
              id: item.id
            })
            _this.picklist.push({
              item
            })
            return
          }
        }
      } else {
        this.pick.push({
          id: item.id
        })
        this.picklist.push({
          item
        })
      }
    },


    async uprean() { //申请改签
      let that = this;
      let userlists = this.userlists;
      let ranst = that.trainslis.trainlis;
      let NameCenter = that.NameCenter; //成本中心
      let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
      let TravelDepartlist = that.TravelDepartlist; //部门审批人
      let apprvTaskStaffts = []; //审核人员
      let user_name = this.lname; //联系人
      let user_ipone = this.lipone; //联系电话
      let isbtd = that.trainslis.ranst.isbtd; //1因公2因私
      let isblcks = that.trainslis.ranst.isblcks; //1事前 2事中
      let ists = 0;
      let invs = "";
      if (JSON.stringify(that.trainslis.nativeTrainRules) == '{}') {
        ists = 0;
        invs = "";
      } else {
        invs = JSON.stringify({
          information: [{
            'nativeTrainRules': that.trainslis.nativeTrainRules
          }]
        });
        ists = 1;
      }
      if (NameCenter.id == '' && isbtd == 1 && that.trainslis.isarsrl == false) {
        this.$message({
          message: '请选择成本中心！',
          type: 'warning'
        })
        return
      } else if (TravelCostCenlist.length == 0 && isbtd == 1 && that.trainslis.isarsrl == false && this.CostCi == true) {
        this.$message({
          message: '请选择成本审批人！',
          type: 'warning'
        })
        return
      } else if (TravelDepartlist.length == 0 && isbtd == 1 && that.trainslis.isarsrl == false && this.CostCis == true) {
        this.$message({
          message: '请选择部门审批人！',
          type: 'warning'
        })
        return
      } else if (that.reson == '' && isbtd == 1 && isblcks == 4) {
        this.$message({
          message: '请输入出行事由！',
          type: 'warning'
        })
        return
      } else if (user_name == '') {
        this.$message({
          message: '请输入联系人！',
          type: 'warning'
        })
        return
      } else if (user_ipone == '' || !ip_test.test(user_ipone)) {
        this.$message({
          message: '请输入正确的联系电话！',
          type: 'warning'
        })
        return
      }
      for (var i = 0; i < TravelCostCenlist.length; i++) { //成本中心审批人
        apprvTaskStaffts.push({
          deptCost: 2,
          nodeId: TravelCostCenlist[i].nodeId,
          personId: TravelCostCenlist[i].personId,
          staffId: TravelCostCenlist[i].staffId,
          staffName: TravelCostCenlist[i].staffName
        })
      }
      for (var i = 0; i < TravelDepartlist.length; i++) { //部门审批人
        apprvTaskStaffts.push({
          deptCost: 1,
          nodeId: TravelDepartlist[i].nodeId,
          personId: TravelDepartlist[i].personId,
          staffId: TravelDepartlist[i].staffId,
          staffName: TravelDepartlist[i].staffName
        })
      }
      let dat = {};
      if (that.RuleMas == true && that.trainslis.isarsrl == false && isbtd == 1) { //是否免审
        dat = {
          trainBook: {
            queryKey: that.trainslis.ranst.queryKey, //火车编码
            seatName: that.trainslis.astlis.seatName,
            trainNo: ranst.trainNo,
            fromStation: ranst.fromStation,
            fromStationCode: ranst.fromStationCode,
            fromTime: ranst.fromTime, //出发时间
            toStation: ranst.toStation,
            trainDate: ranst.dats, //出发日期
            toStationCode: ranst.toStationCode,
            toTime: ranst.toTime, //到达时间
            insPrice: that.insurance,
            insCode: that.insCode,
            toTrainDate: ranst.toTrainDate, //到达日期
            isviolation: ists, //0没超规 1超规
            illegal: invs, //超规信息
            price: that.trainslis.astlis.purchasePrice,
            apprvTasks: {
              agree: false,
              taskType: 4, //1为事前2为事中，4为改签
              beforeMiddle: 2, //1为事前2为事中
              reason: that.reson, //理由
              apprvTaskStaffs: apprvTaskStaffts, //审批人信息
              costId: NameCenter.id, //成本中心id
              costName: NameCenter.name, //成本中心名称
              examinePattern: that.RuleMa
            }
          },
          saleOrderNo: that.trainslis.ranst.saleOrderNo,
          passengerNos: that.trainslis.ranst.passengerNos.join(';')
        }
      } else {
        dat = {
          trainBook: {
            isviolation: ists, //0没超规 1超规
            illegal: invs, //超规信息
            queryKey: that.trainslis.ranst.queryKey, //火车编码
            seatName: that.trainslis.astlis.seatName,
            trainNo: ranst.trainNo,
            fromStation: ranst.fromStation,
            fromStationCode: ranst.fromStationCode,
            fromTime: ranst.fromTime,
            toStation: ranst.toStation,
            insPrice: that.insurance,
            insCode: that.insCode,
            trainDate: ranst.dats, //出发日期
            toTime: ranst.toTime, //到达时间
            toTrainDate: ranst.toTrainDate, //到达日期
            toStationCode: ranst.toStationCode,
            price: that.trainslis.astlis.purchasePrice,
            apprvTasks: {
              agree: false,
              taskType: 4, //1为事前2为事中，4为改签
              beforeMiddle: 2, //1为事前2为事中
              reason: that.reson, //理由
              examinePattern: that.RuleMa
            }
          },
          saleOrderNo: that.trainslis.ranst.saleOrderNo,
          passengerNos: that.trainslis.ranst.passengerNos.join(';')
        }
      }
      this.loading = true;
      try {
        const res = await this.$api.home.applyChangeTrain(dat);
        this.loading = false;
        if (res.code == '200') {
          if (res.data.msgCode == '100') {
            this.$message({
              message: '申请改签成功!',
              type: 'success'
            })
            this.$router.push({
              path: 'myorder'
            });
          } else {
            this.$message({
              message: res.message,
              type: 'warning'
            })
          }
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      } catch (e) {
        console.log(e);
        this.loading = false;
      }
      this.loading = false;
    },

    async okadd() { //提交订单
      let that = this;
      let picklist = this.picklist;//选座
      let sst = this.trainslis.trainlis.trainNo.substring(0, 1);
      let slv = this.trainslis.astlis.seatName;
      let userlists = this.userlists;
      let ranst = this.trainslis.trainlis;
      let NameCenter = that.NameCenter; //成本中心
      let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
      let TravelDepartlist = that.TravelDepartlist; //部门审批人
      let apprvTaskStaffts = []; //审核人员
      let user_name = this.lname; //联系人
      let user_ipone = this.lipone; //联系电话
      let isbtd = this.trainslis.ranst.isbtd; //1因公2因私
      let isblcks = this.trainslis.ranst.isblcks; //1事前 2事中

      if ((sst == 'G' || sst == 'C' || (sst == 'D' && slv != '动卧')) && slv != '无座') {
        if (picklist.length < this.userlists.length) {
          that.$message({
            message: '请选座',
            type: 'warning'
          });
          return
        }
      } else if (NameCenter.id == '' && isblcks == 2 && isbtd == 1 && that.trainslis.isarsrl == false) {
        that.$message({
          message: '请选择成本中心',
          type: 'warning'
        });
        return
      } else if (TravelCostCenlist.length == 0 && isbtd == 1 && that.trainslis.isarsrl == false && this.CostCi == true) {
        that.$message({
          message: '请选择成本审批人',
          type: 'warning'
        });
        return
      } else if (TravelDepartlist.length == 0 && isbtd == 1 && that.trainslis.isarsrl == false && this.CostCis == true) {
        that.$message({
          message: '请选择部门审批人',
          type: 'warning'
        });
        return
      } else if (that.reson == '' && isbtd == 1 && isblcks == 2) {
        that.$message({
          message: '请输入出行事由',
          type: 'warning'
        });
        return
      } else if (user_name == '') {
        that.$message({
          message: '请输入联系人',
          type: 'warning'
        });
        return
      } else if (user_ipone == '' || !ip_test.test(user_ipone)) {
        that.$message({
          message: '请输入正确的联系电话',
          type: 'warning'
        });
        return
      }
      if (isbtd == 2 && this.passengers.length == 0) {
        that.$message.warning('请选择乘车人！');
        return;
      }

      //座位排序
      let seatNos = [];
      for (let i = 0; i < this.picklist.length; i++) {
        seatNos.push(
            this.picklist[i].item.value
        )
      }
      seatNos.sort()
      let seatNo = '';
      let len = seatNos.length;
      for (let i = 0; i < len; i++) {
        seatNo += seatNos[i];
      }
      let usersalist = [];
      let insurances = this.insurances;
      let profitPrice = this.profitPrice;
      let ists = 0;
      for (let i = 0; i < userlists.length; i++) { //出行人信息
        usersalist.push({
          cardNo: userlists[i].certificateList[0].cardNo,
          cardType: userlists[i].certificateList[0].cardType,
          gender: userlists[i].gender,
          name: userlists[i].name,
          passengerBirth: userlists[i].birthdate,
          phone: userlists[i].phone,
          deptName: userlists[i].deptName,
          costcenterName: isbtd == 1 ? this.trainslis.ranst.butalist[i].costcenterName : this.passengers[i].costcenterName,
          passengerNo: userlists[i].passengerNo,
          employeeType: userlists[i].employeeType,
          passengerType: 1,
        })
      }
      let dat = {};
      if (isblcks == 2 && isbtd == 1 && this.trainslis.isarsrl == false) {
        for (var i = 0; i < TravelCostCenlist.length; i++) { //成本中心审批人
          apprvTaskStaffts.push({
            deptCost: 2,
            nodeId: TravelCostCenlist[i].nodeId,
            personId: TravelCostCenlist[i].personId,
            staffId: TravelCostCenlist[i].staffId,
            staffName: TravelCostCenlist[i].staffName
          })
        }
        for (var i = 0; i < TravelDepartlist.length; i++) { //部门审批人
          apprvTaskStaffts.push({
            deptCost: 1,
            nodeId: TravelDepartlist[i].nodeId,
            personId: TravelDepartlist[i].personId,
            staffId: TravelDepartlist[i].staffId,
            staffName: TravelDepartlist[i].staffName
          })
        }
        let invs = "";
        if (JSON.stringify(this.trainslis.nativeTrainRules) == '{}') {
          ists = 0;
          invs = ""
        } else {
          invs = JSON.stringify({
            information: [{
              'nativeTrainRules': this.trainslis.nativeTrainRules
            }]
          });
          ists = 1
        }
        dat = {
          apprvTasks: {
            remark: invs,
            taskType: isblcks, //1为事前2为事中，
            beforeMiddle: isblcks, //1为事前2为事中
            reason: that.reson, //理由
            apprvTaskStaffs: apprvTaskStaffts, //审批人信息
            costId: NameCenter.id, //成本中心id
            costName: NameCenter.name, //成本中心名称
          },
          insPrice: that.insurance,
          insCode: that.insCode,
          trainPassengerList: usersalist, //出行人信息
          person: user_name, //联系人
          cellphone: user_ipone, //联系电话
          email: '', //邮箱
          fromStation: ranst.fromStation,
          fromStationCode: ranst.fromStationCode,
          fromTime: ranst.fromTime,
          price: that.trainslis.astlis.purchasePrice,
          runTimeSpan: ranst.runTimeSpan,
          seatName: that.trainslis.astlis.seatName,
          toStation: ranst.toStation,
          toStationCode: ranst.toStationCode,
          toTime: ranst.toTime,
          toTrainDate: ranst.toTrainDate, //达到日期
          trainClass: ranst.trainClass,
          trainNo: ranst.trainNo,
          trainDate: that.trainslis.datas.datatime, //出发日期
          travelTypeorth: isbtd, //因公1 因私2
          queryKey: that.trainslis.datas.queryKey, //火车编码
          isviolation: ists, //0没违规 1违规
          illegal: invs, //违规信息
          seatNo: seatNo,//座位
        }
      } else if (isblcks == 1 && isbtd == 1 && this.trainslis.isarsrl == false) {
        dat = {
          apprvTasks: {
            taskType: isblcks, //1为事前2为事中，
            beforeMiddle: isblcks, //1为事前2为事中
            costId: NameCenter.id, //成本中心id
            costName: NameCenter.name, //成本中心名称
            travelNo: this.trainslis.ranst.mokksli.travelNo, //出差单号
            vehicleId: this.buslist[0].vehicleId,
          },
          insPrice: that.insurance,
          insCode: that.insCode,
          trainPassengerList: usersalist, //出行人信息
          person: user_name, //联系人
          cellphone: user_ipone, //联系电话
          email: '', //邮箱
          fromStation: ranst.fromStation,
          fromStationCode: ranst.fromStationCode,
          fromTime: ranst.fromTime,
          price: that.trainslis.astlis.purchasePrice,
          runTimeSpan: ranst.runTimeSpan,
          seatName: that.trainslis.astlis.seatName,
          toStation: ranst.toStation,
          toStationCode: ranst.toStationCode,
          toTime: ranst.toTime,
          toTrainDate: ranst.toTrainDate, //达到日期
          trainClass: ranst.trainClass,
          trainNo: ranst.trainNo,
          trainDate: that.trainslis.datas.datatime, //出发日期
          travelTypeorth: isbtd, //因公1 因私2
          queryKey: that.trainslis.datas.queryKey, //火车编码
          isviolation: 0, //0没违规 1违规
          illegal: '', //违规信息
          seatNo: seatNo,//座位
        }
      } else if (isbtd == 2 || (isbtd == 1 && that.trainslis.isarsrl == true)) {
        dat = {
          apprvTasks: {
            taskType: isblcks, //1为事前2为事中，
            beforeMiddle: isblcks, //1为事前2为事中
          },
          insPrice: that.insurance,
          insCode: that.insCode,
          trainPassengerList: usersalist, //出行人信息
          person: user_name, //联系人
          cellphone: user_ipone, //联系电话
          email: '', //邮箱
          fromStation: ranst.fromStation,
          fromStationCode: ranst.fromStationCode,
          fromTime: ranst.fromTime,
          price: that.trainslis.astlis.purchasePrice,
          runTimeSpan: ranst.runTimeSpan,
          seatName: that.trainslis.astlis.seatName,
          toStation: ranst.toStation,
          toStationCode: ranst.toStationCode,
          toTime: ranst.toTime,
          toTrainDate: ranst.toTrainDate, //达到日期
          trainClass: ranst.trainClass,
          trainNo: ranst.trainNo,
          trainDate: that.trainslis.datas.datatime, //出发日期
          travelTypeorth: isbtd, //因公1 因私2
          queryKey: that.trainslis.datas.queryKey, //火车编码
          isviolation: 0, //0没违规 1违规
          illegal: '', //违规信息
          seatNo: seatNo,//座位
        }
      }
      this.loading = true;
      try {
        const res = await that.$api.home.bookTrain(dat); //预定订单
        this.loading = false;
        if (res.code == 200) {
          that.$message({
            message: '创建订单成功',

            type: 'success'
          });
          if (isbtd == 2) {
            this.$router.push({
              path: 'traindefray',
              query: {
                data: res.data
              }
            })
          } else {
            this.$router.push({
              path: 'trainorderlist',
              query: {
                data: res.data
              }
            });
          }
        } else {
          that.$message({
            message: res.message,
            type: 'warning'
          });
        }
      } catch (e) {
        this.loading = false;
        console.log(e);
      }
    },
    getRuleMainSetting() { //查询当前用户改签是否需要审核 和 事前是否二次过审
      this.loading = true;
      this.$api.home.ruleMainSetting().then((res) => {
        this.loading = false;
        if (this.trainslis.ranst.isblcks == 4) {
          this.RuleMa = res.data.examinePattern; //改签是否需要审核
          let stw = this.RuleMa.split(',');
          for (let i in stw) {
            /**
             * 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
             */
            if (stw[i] == 5) {
              this.RuleMas = true;
            }
          }
        } else if (this.trainslis.ranst.isblcks == 1) {
          let stw = res.data.examineSwitch.split(',');
          this.isblckt = this.trainslis.isblckt; //事前是否需要二次审批
          for (let i in stw) {
            /**
             * 3代表事前二次过审
             */
            if (stw[i] == 3) {
              //如果用户不是免审 就要事前二次过审
              this.isblckt = true;
            }
          }
          if (this.isblckt == true) { //如果需要二次审批 默认载入成本中心
            this.handleChange();
          }
        }
      }).catch((err) => {
        this.loading = false;
        console.log(err)
      })
    },
    retime(item) { //时间
      return item.substring(5, 7) + '月' + item.substring(8, 11) + '日';
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
    async getBrokerage() { //火车票单人手续费
      this.$api.home.getContactInfo().then((rt) => {
        if (rt.code == 200) {
          this.lname = rt.data.name;
          this.lipone = rt.data.phone;
        }
      }).catch((e) => {
        console.log(e)
      })
      try {
        const res = await this.$api.home.getBrokerage();
        if (res.code == 200) {
          this.Brokerage = res.data.brokage;
          this.insurances = res.data.insurances;
          for (let i = 0; i< this.insurances; i++){
            if (this.insurances[i].isDefaulConfig == 1){
              this.profitPrice = this.insurances[i].profitPrice;
            }
          }
          if (this.isbtd == 1) {
            this.onprice = (this.trainslis.astlis.price) * (this.buslist.length) + (this.Brokerage) * (this.buslist.length)+ (this.insurance * this.buslist.length);
          } else {
            this.onprice = (this.trainslis.astlis.price * this.passengers.length) + (this.Brokerage * this.passengers.length) + (this.insurance * this.passengers.length) ;
          }
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      } catch (e) {
        console.log(e);
      }
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
      if (that.trainslis.ranst.isblcks == 4) {
        nuarry = that.trainslis.ranst.userlistnos;
      } else {
        let nus = that.buslist; //出差人的集合
        for (var i = 0; i < nus.length; i++) {
          nuarry.push(nus[i].passengerNo) //获取出行人员id
        }
      }
      that.loading = true;
      let res;
      try {
        if (that.trainslis.ranst.isblcks == 4) {
          res = await that.$api.home.getStaffList({
            costId: that.NameCenter.id,
            passengerNos: nuarry,
            applyType: 4
          });
        } else {
          res = await that.$api.home.getStaffList({
            costId: that.NameCenter.id,
            passengerNos: nuarry,
            applyType: 1
          });
        }
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
    selts() { //查询成本中心
      let _this = this;
      _this.loading = true;
      _this.$api.home.getCostCenterList().then((res) => {
        _this.loading = false;
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
    userlist() {
      let that = this;
      let st = [];
      let isbtd = this.isbtd;
      that.userlists = [];
      that.selts();
      if (this.trainslis.ranst.isblcks == 4) { //改签状态下不能修改乘客证件
        for (let i = 0; i < this.trainslis.ranst.butalist.length; i++) {
          this.userlists.push({
            name: this.trainslis.ranst.butalist[i].name,
            certType: this.trainslis.ranst.butalist[i].certType,
            certNo: this.trainslis.ranst.butalist[i].certNo,
          })
        }
        this.getRuleMainSetting();
      } else {
        if (isbtd == 1) {
          for (let i = 0; i < that.buslist.length; i++) {
            st.push(that.buslist[i].passengerNo);
          }
        } else {
          for (let i = 0; i < that.passengers.length; i++) {
            st.push(that.passengers[i].passengerNo);
          }
        }

        that.loading = true;
        that.$api.home
            .getPassengerListByNos(st)
            .then(res => {
              that.loading = false;
              if (res.code == 200) {
                that.carld = res.data.cardTypeList; //证件类型
                that.userlists = res.data.passList; //用户信息
                if (res.data.passList != null) {
                  for (let i = 0; i < that.userlists.length; i++) {
                    for (let k = 0; k < that.userlists[i].certificateList.length; k++) {
                      that.userlists[i].certificateList[k]['cardTypename'] = that.caname(that.userlists[i].certificateList[k].cardType);
                    }
                  }
                  this.seats = [];
                  this.seat = [];
                  this.showseat();//显示选座
                }
              }
            })
            .catch(e => {
              console.log(e);
            });
      }
    },
    caname(item) {
      //回显证件名字
      for (let i = 0; i < this.carld.length; i++) {
        if (this.carld[i].code == item) {
          return this.carld[i].name;
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.trainadd {
  width: 100%;

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

  .tresiadd {
    width: 1180px;
    margin: 10px auto;
    display: flex;

    .trsleft {
      width: 70%;

      .trstp {
        width: calc(100% - 20px);
        background: #ffffff;
        padding: 10px;

        .tr_ul {
          width: 100%;
          margin: 20px 0;
          display: flex;

          .tr_uleft {
            width: 100px;
            text-align: center;
            line-height: 50px;
            color: #666666;
            font-size: 14px;
          }


          .tr_right {
            overflow: hidden;
            display: flex;
            flex-wrap: wrap;

            .tr_rs {
              cursor: pointer;
              padding: 0 15px;
              color: #333333;
              background-color: #F5F7Fa;
              line-height: 44px;
              display: flex;
              font-size: 14px;
              border: 1px solid #d9e2eb;

              .tr_rtp {
                text-align: center;
              }

              .tr_rbn {
              }
            }
          }

          .tr_rights {
            width: calc(100% - 100px);
            display: flex;
            box-sizing: border-box;

            .tr_insurnce{
              align-items: center;
              margin:  7px 0 auto 10px;
              color: #FF6600;
              box-sizing: border-box;
              height: 40px;
              max-height: 40px;
            }
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
      }

      .trsbt {
        margin-bottom: 10px;
        width: calc(100% - 20px);
        padding: 10px;
        background: #FFFFFF;

        .trsbord {
          width: calc(100% - 80px);
          padding: 10px 20px;
          margin: 0 20px;
          border-left: 1px dashed #D2DDE7;

          .tsfons {
            margin-top: 10px;
            font-size: 15px;
            color: #999999;
            line-height: 30px;
          }

          .tsbods {
            width: calc(100% - 20px);
            padding: 20px 10px;
            border: 1px solid #D2DDE7;
            border-radius: 10px;
            display: flex;

            .tsbodsle {
              width: 15%;
              display: flex;
            }

            .trainsc_s {
              width: 40%;
              padding: 0 15%;
              display: flex;
              align-items: center;

              .trainsc_s_l {
                width: 30%;

                .trainsc_s_l_t {
                  font-family: '楷体';
                  color: #3b4f62;
                  line-height: 25px;
                  font-size: 18px;
                }

                .trainsc_s_l_b {
                  display: flex;
                  font-size: 12px;

                  .trainsc_s_l_b_r {
                    color: #3b4f62;
                  }
                }
              }

              .trainsc_s_s {
                width: 40%;
                color: #d2dde7;
                font-size: 14px;
                display: flex;
                justify-content: center;
                letter-spacing: 0.16px;
                margin: 0 15px;
                background-size: 82px 6px;
                padding: 8px 0;
                background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAAAGCAYAAABQM8l6AAAAAXNSR0IArs4c6QAAAJ9JREFUOBFjYBgFRIXApfsv067dey+PSzETLolRcdQQYGJg/PmX4cfZy/deuqHKQHijAYktVLCI/Wf+f+T/fwZhBob/2y/fe1H9//9/RmRljFfuvgxGFhhl4w6Bf4z/FjH8Z+ACqWBkZNzM9Z8tVllZ6COYf+nu8/+4tY7K4AsBRgbGO8AQDdZVEr/EePnu8x/4FI/K4Q8BYAb/BlSRDgAVIS7yFUG6BwAAAABJRU5ErkJggg==') bottom no-repeat;
              }
            }

            .tright {
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }

          .cseat {
            width: 100%;
            margin-top: 10px;
            margin-right: 100px;

            .seat_a {
              flex-wrap: wrap;
              height: 80px;
              line-height: 80px;
              font-size: 15px;
              background: #FFFFFF;
              margin-bottom: 20px;

              .seat_display {
                display: flex;
              }

              .seat_fo {
                width: 10%;
                text-align: center;
                color: #333333;
              }

              .seat_le {
                width: calc(100% - 20px);
                display: flex;
                display: -webkit-flex;
                height: 80px;
                overflow: scroll;
                align-items: center;
                flex-wrap: wrap;

                .seat {
                  display: inline-block;
                  color: #666;
                  cursor: pointer;
                  background-image: url(http://img20.360buyimg.com/uba/jfs/t7282/74/1658256725/1195/7e270fe2/599e6afbN59d51b35.png);
                  background-repeat: no-repeat;
                  background-size: 50px;
                  background-position: center; //图片居中
                  width: 75px;
                  text-align: center;
                  line-height: 60px;
                  margin: 2px;
                }

                .pickseat {
                  display: inline-block;
                  color: #666;
                  cursor: pointer;
                  background-image: url(http://img30.360buyimg.com/uba/jfs/t7588/281/1633648098/1268/b1d85178/599e6bbcNfb1b597a.png);
                  background-repeat: no-repeat;
                  background-size: 50px;
                  background-position: center; //图片居中
                  width: 75px;
                  text-align: center;
                  line-height: 60px;
                  margin: 2px;
                }
              }

            }
          }


          /* 滚动条、滑块 */

          ::-webkit-scrollbar-thumb {
            background-color: #FFFFFF;
          }

          ::-webkit-scrollbar-track {
            background-color: #FFFFFF;
          }
        }
      }
    }

    .trsright {
      width: calc(30% - 10px);
      margin-left: 10px;
      background: #ffffff;

      .trs_ticket {
        background: #CCE7FF;

        .trs_time {
          padding: 23px 0 0 20px;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #333333;
        }

        .trs_fromStation {
          margin-top: 36px;
          display: flex;
          padding: 0 20px;
          justify-content: space-between;
        }

        .trs_station_time {
          margin: 16px 20px 0 20px;
        }
      }

      .tslist {
        width: calc(100% - 80px);
        margin: 20px 40px;
        height: 50px;
        font-size: 15px;
        color: #3B4F62;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #EDF0F5;
      }

      .tslists {
        width: calc(100% - 80px);
        margin: 10px 40px;
        height: 50px;
        font-size: 22px;
        color: #3B4F62;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .tsbtn {
        width: calc(100% - 80px);
        cursor: pointer;
        margin: 10px 40px;
        height: 50px;
        border-radius: 5px;
        text-align: center;
        line-height: 50px;
        color: #FFFFFF;
        background: #409EFF;
      }
    }
  }
}


</style>
