<template>
  <!-- 产品预定->酒店提交订单页面 -->
  <div class="trainadd">
    <el-drawer :visible.sync="drawer" :with-header="false">
      <div class="ditrslist">
        <div class="ditrslists" v-for="(item, index) in drawelist" :key="index">
          <div style="margin-right: 10px; font-size: 15px">
            {{ index + 1 }}级审批人:
          </div>
          <div>
            <el-select
              v-model="apprvCost[index].id"
              v-if="item.apprvCostFlowNodePersons"
              placeholder="请选择"
            >
              <el-option
                v-for="items in item.apprvCostFlowNodePersons"
                :key="items.id"
                :label="items.staffName"
                :value="items.id"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="apprvCost[index].id"
              v-else
              placeholder="请选择"
            >
              <el-option
                v-for="items in item.apprvDeptFlowNodePersons"
                :key="items.id"
                :label="items.staffName"
                :value="items.id"
              >
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
            <p>{{ retime(trainslis.datatiem) }}</p>
            <div class="tsfons">
              &nbsp;入住&nbsp;&nbsp;{{ trainslis.datalist.resName }}
            </div>
            <div class="tsbods">
              <div class="hot_tsp">
                <div class="ts_lefbos">
                  <div class="tsfotps">
                    <img :src="trainslis.hots.pothos" alt="" />
                  </div>
                  <div class="hotnames">
                    <div>{{ trainslis.datalist.resName }}</div>
                    <div>{{ trainslis.hots.supPriceName }}</div>
                  </div>
                </div>
                <div class="tright">
                  <p style="color: #ff6600">￥</p>
                  <p style="font-size: 30px; color: #ff6600">
                    {{ trainslis.hots.firPrice }}
                  </p>
                </div>
              </div>
              <div class="hot_bsp">
                入离日期：{{ trainslis.datatiem[0] }} 至
                {{ trainslis.datatiem[1] }} 共{{
                  count(trainslis.datatiem[0], trainslis.datatiem[1])
                }}晚
              </div>
              <div class="hot_input" v-if="trainslis.hots.supplierType == 5">
                <span>特殊需求：</span>
                <!-- <input type="text" v-model="orderRemark" placeholder="如：尽量安排大床/无烟房等"> -->
                  <el-input v-model="orderRemark" placeholder="如：尽量安排大床"></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="trstp">
          <div class="tr_ul_user">
            <div class="tr_uleft">入住人</div>
            <addPassenger @passage="passage" v-if="isbtd == 2"></addPassenger>
            <div class="userbox" v-else>
              <div
                class="tr_rights_user"
                v-for="(itemL, index) in passenList"
                :key="index"
              >
                <div class="tr_rights_uCardNo">
                 <p v-if="isbtd == 1">{{ itemL.name }}</p><span class="s-color" v-if="isbtd == 1">|</span
                  >  <el-select placeholder="请选择" v-model="itemL.valFlag" @change="certifChang">
                  <el-option
                    v-for="item in itemL.certificateList"
                    :key="item.id"
                    :label="item.car"
                    :value="item.id">
                  </el-option>
                </el-select>
                </div>
              
              </div>
            </div>
          </div>
          <div class="tr_ul">
            <div class="tr_uleft">房间数量</div>
            <div class="tr_rights">
              <el-select
                style="width: 200px"
                @change="hoslengs"
                v-model="hosleng"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in hoslenglist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="tr_ul">
            <div class="tr_uleft">到店时间</div>
            <div class="tr_rights">
              <el-time-select
                style="width: 100px"
                v-model="statime"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '23:45',
                }"
                placeholder="最早入住时间"
              >
              </el-time-select>
              &nbsp;&nbsp;&nbsp;
              <el-time-select
                style="width: 100px"
                v-model="endtime"
                :picker-options="{
                  start: '12:30',
                  step: '00:15',
                  end: '23:45',
                }"
                placeholder="最晚入住时间"
              >
              </el-time-select>
            </div>
          </div>
          <div class="tr_ul">
            <div class="tr_uleft">联系人</div>
            <div class="tr_rights">
              <el-input
                v-model="lname"
                placeholder="请输入联系人姓名"
              ></el-input>
              &nbsp;&nbsp;&nbsp;
              <el-input
                v-model="lipone"
                placeholder="请输入联系人电话"
              ></el-input>
            </div>
          </div>
          <!-- <div
						v-if="(trainslis.datlist.isblcks == 2 && !trainslis.isarsrl &&
						 trainslis.datlist.isbtd != 2)||
						 (trainslis.datlist.isblcks == 4 &&
						  RuleMas && !trainslis.isarsrl &&
						   trainslis.datlist.isbtd != 2) 
						   ||(trainslis.datlist.isblcks == 1 &&
						    !trainslis.isarsrl && 
							trainslis.datlist.isbtd == 1 &&
							 isblckt == true)"> -->
          <div v-if="isShowChengben">
            <div class="tr_ul">
              <div class="tr_uleft">归属部门</div>
              <div class="tr_rights">
                <el-input
                  v-model="attdepartment"
                  :disabled="true"
                  placeholder=""
                ></el-input>
              </div>
            </div>
            <div class="tr_ul">
              <div class="tr_uleft">成本中心</div>
              <div class="tr_rights">
                <el-cascader
                  style="width: 200px"
                  ref="cascader"
                  :show-all-levels="false"
                  @change="handleChange"
                  :props="bots"
                  :options="treeLists"
                  v-model="selectedOptions3"
                  :disabled="disa"
                ></el-cascader>
              </div>
            </div>
            <div class="tr_ul" v-if="CostCi == true">
              <div class="tr_uleft">成本审批人</div>
              <div class="tr_rights">
                <div class="tr_dvs" @click="drawers('TravelCostCenlist')">
                  <span class="noTest" v-if="TravelCostCenlist.length == 0"
                    >请选择成本审批人</span
                  >
                  <span
                    v-for="(item, index) in TravelCostCenlist"
                    :key="index"
                    v-else
                  >
                    {{ item.staffName }}
                  </span>
                </div>
              </div>
            </div>
            <div class="tr_ul" v-if="CostCis == true">
              <div class="tr_uleft">部门审批人</div>
              <div class="tr_rights">
                <div class="tr_dvs" @click="drawers('TravelDepartlist')">
                  <span
                    v-for="(item, index) in TravelDepartlist"
                    :key="index"
                    v-if="TravelDepartlist.length > 0"
                  >
                    {{ item.staffName }}
                  </span>
                </div>
              </div>
            </div>
          </div>
            <div class="tr_ul" v-if="isbtd == 1">
              <div class="tr_uleft">出行事由</div>
              <div class="tr_rights">
                <!-- <el-input
                  v-model="reson"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入出行事由"
                  :disabled="disa"
                ></el-input> -->
              <el-select v-model="resonText" placeholder="请选择" popper-class="selectPopper" :disabled="disa" @change="reasonChang">
								<el-option
								v-for="item in reasonData"
								:key="item.id"
								:label="item.reason"
								:value="item.id">
								</el-option>
							</el-select>
              </div>
            </div>
        </div>
      </div>
      <div class="trsright">
        <el-tooltip
          class="item"
          effect="dark"
          :content="trainslis.datalist.resName"
          placement="left"
        >
          <p class="trsr_title">{{ trainslis.datalist.resName }}</p>
        </el-tooltip>
        <div
          class="tslist"
          v-for="(item, index) in orderUseDateDetails"
          :key="index"
        >
          <div>{{ item.useDate }}</div>
          <div>￥{{ item.oneDateaAmountPrice }} × {{ hosleng }}间</div>
        </div>
        <div class="tslist">
          <div>服务费</div>
          <div>
            ￥{{ Brokerage }} × {{ hosleng }}间 ×
            {{ count(trainslis.datatiem[0], trainslis.datatiem[1]) }}晚
          </div>
        </div>
        <div class="tslists">
          <div>合计</div>
          <div style="color: #ff6600; font-size: 24px">￥{{ connum }}</div>
        </div>
        <div
          class="tsbtn"
          v-if="rotes('tms:hotel:reserve')"
          @click="okadd"
          v-loading="loadingBot"
        >
          提交订单
        </div>
        <div
          style="
            color: #ff6600;
            font-size: 14px;
            line-height: 26px;
            margin-top: 10px;
          "
        >
          取消规则:{{ bookingNotesos }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import addPassenger from "@/components/common/addPassenger";
import reasonApi from "@/utils/reasonApi";
let ip_test = /^[1][3456789][0-9]{9}$/; //电话号码正则
import { catypeEn ,numberPapers , selectedOptions} from "@/utils/common-filters";
export default {
  filters: {
    catypeEn,selectedOptions
  },
  components: {
    addPassenger,
  },
  data() {
    return {
      resids: 0,
      connum: 0, //总价
      isblcks: '',
      bookingNotesos: "",
      orderUseDateDetails: [],
      supplierNo: 0,
      orderRoomInfos: [], //当前房价信息
      statime: "18:00", //最早入住时间
      endtime: "20:00", //最晚入住时间
      hoslenglist: [], //房间
      hosleng: "", //房间数量
      Brokerage: "", //火车单人手续费
      reson: "", //出行事由
      drawelist: [], //盒子内容
      drawer: false, //盒子默认关闭
      bots: {
        //使用props替换掉本来默认的lable和value 的键值
        value: "id",
        label: "text",
        checkStrictly: true, //可以选父级
      },
      NameCenter: {
        //当前选择成本中心
        name: "",
        id: 0,
      },
      treeLists: [], //成本中心
      TravelDepartlist: [], //部门审批人
      TravelCostCenlist: [], //成本中心审批人
      CostCi: false, //是否有成本审批人
      CostCis: false, //是否有部门审批人
      Deparapprover: [], //部门审批人
      CostCenterlist: [], //成本审批人
      iscost: true, //true为成本中心false为部门
      apprvCost: [],
      lname: "", //默认联系人
      attdepartment: JSON.parse(sessionStorage.getItem("userinfo")).deptName, //默认部门
      lipone: "",
      firPrices: 0,
      loading: false,
      timeli: 0,
      buslist: [],
      userlists: [], //旅客信息
      isblckt: false, //事前是否需要二次审批
      trainslis: JSON.parse(this.$route.query.data), //上个页面的参数
      hotelData: "", // 华住酒店数据
      yaduoroom: "",
      vehicleId: "",
      proDataJson: "", //产品信息
      isbtd: null,
      passenger: null,
      linkManPassengerNo: null,
      msgErr: "",
      loadingBot: false,
      isShowChengben: false, // 是否显示审批信息
      sttos: 1, //事前是否违规再次审批  1为开启二次审批 3为违规再次审批
      RuleMas: false,
      passenList:[],//入住人证件信息
      value:'',
      orderRemark:'',
      selectedOptions3:[],
      disa:false,
      reasonData: [],  // 出差事由
      isGetStaffList: false, //是否无审批流
      resonText:'',
      totalRebateRateProfit:'',
    };
  },
  watch: {
    passenger: {
      handler(newValue, oldValue) {
        this.hoslenglist = [];
        this.buslist = this.passenger;
        for (let i = 0; i < this.passenger.length; i++) {
          this.hoslenglist.push({
            id: i + 1,
            name: i + 1 + "间",
          });
        }
        this.hosleng = this.hoslenglist.length;
        this.prics();
      },
    },
  },
  async mounted() {
    let lis = JSON.parse(this.$route.query.data); //获取上个页面传入的参数
    this.buslist = lis.datlist.butalist;
    this.isbtd = lis.datlist.isbtd;
    let leng = this.buslist.length; //入住人数量
    this.isblckt = this.trainslis.isblckt;
    this.isblcks = this.trainslis.datlist.isblcks
    this.reasonData = await reasonApi.reason_api()
    var arrS = this.reasonData.find(item=>item.isDefault == 1) || ''
      if(this.isbtd == 1 && this.buslist[0].reason){
          this.reson = this.buslist[0].reasonid
          this.resonText =this.buslist[0].reason
      }else{
        if(arrS && this.isbtd == 1){
          this.reasonChang(arrS.id)
        }
      }
                // reasonId: this.reson, //理由
        // this.resonText = arrS.reason

    // this.metarule = this.trainslis.datlist.metarule || 0;
        // console.log("this.metarule--",this.this.metarule)
     this.disa = this.isblcks == 1 ? true : false
    this.hoslenglist = [];
    for (let i = 0; i < leng; i++) {
      this.hoslenglist.push({
        id: i + 1,
        name: i + 1 + "间",
      });
    }
    //改签或者事前  不是免审
			if(this.isblckt){//是否 超标审批
				this.sttos = 3;//1为事前审批 3为超标审批
				this.isShowStatus();//是否显示审批信息
			} else {
    if (this.isblcks  == 1 &&  this.trainslis.isarsrl == false) {
      this.getRuleMainSetting(); //获取公司是否需要审核
    } else {
      this.isShowStatus(); //是否显示审批信息
    }
      }
      //  console.log("this.trainslis.datlist.mokksli.costId--",this.trainslis.datlist.mokksli.costId)
        // 事前需要二次审批及超规时回填成本中心及出差事由

    this.hosleng = this.hoslenglist.length;
    this.timeli = this.count(
      this.trainslis.datatiem[0],
      this.trainslis.datatiem[1]
    );
    this.getBrokerage();
    this.toZHXBooks();
    if(this.isblcks != 4 && this.trainslis.datlist.isbtd == 1 ){
      this.passengerListp()
    }
  },
  methods: {
    // 成本中心展示状态
    isShowStatus() {
      /*
        this.trainslis.datlist.isbtd = 1  因公  
        !this.trainslis.isarsrl 非免审 
        this.isblcks  1事前2事中 3事前违规在次 
        this.RuleMas 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
        this.isblckt 事前是否需要二次审批
    */
      // console.log("因公 因私", this.trainslis.datlist.isbtd );
      // console.log("免审 ", this.trainslis.isarsrl);
      // console.log("this.RuleMas", this.RuleMas);
      // console.log("1事前2事中 3事前违规在次 4改签", this.isblcks);
      // console.log("二次审批", this.isblckt);
         if (this.isblcks == 1) {
            this.NameCenter = {
              name: this.trainslis.datlist.mokksli.costName,
              id: this.trainslis.datlist.mokksli.costId,
            };
    
      // 成本中心二次审批 成本中心参数值回填
      // this.selectedOptions3 = [this.trainslis.datlist.mokksli.costId];
             if(this.isblckt){
                this.appswlist();
             }
            }

      if (
        this.trainslis.datlist.isbtd == 1 &&
        this.trainslis.isarsrl == false
      ) {
        if (
          this.isblcks == 2 || 
          (this.isblcks == 1 )
        ) {
          this.isShowChengben = true;
          this.reson =this.isblcks == 1 ? this.buslist[0].resonid : "";
          if(this.reson ){
              this.reasonChang(this.reson)
          } 
       }
      }
    },
    // 获取证件信息
    async passengerListp(){
      var data = []
      for (let i = 0; i < this.buslist.length; i++) {
          data.push(this.buslist[i].passengerNo)
      }
      const res = await this.$api.home.getPassengerListByNos(data)
      if(res.code != '200') return
      this.passenList = res.data.passList
      // var car = ''
      // var val = ''
      // for (let i = 0; i < this.passenList.length; i++) {
      //   // var pass = this.passenList[i]
      //   this.passenList[i].cardNo = this.passenList[i].certificateList[0].cardNo
      //   this.passenList[i].cardType = this.passenList[i].certificateList[0].cardType
      //   val = catypeEn(this.passenList[i].certificateList[0].cardType)+'  ' + this.passenList[i].certificateList[0].cardNo
      //     this.$set(this.passenList[i],'val',val) // 默认选择第一个证件
      //   for (let k = 0; k < this.passenList[i].certificateList.length; k++) {
      //       console.log(this.passenList[i].certificateList[k])
      //       car = catypeEn(this.passenList[i].certificateList[k].cardType)+'  ' + this.passenList[i].certificateList[k].cardNo
      //       console.log(car)
      //       this.passenList[i].certificateList[k] = {...this.passenList[i].certificateList[k],'car':car}
      //       this.$set(this.passenList[i].certificateList[k],'car',car)
      //   }
      // }
       this.init(this.passenList)
    },
    // 处理数据里面的证件号码和证件类型 方便选择器操作
    init(userli){
      var car = ''
      var val = ''
      var valFlag = ''
      for (let i = 0; i < this.passenList.length; i++) {
        // var pass = this.passenList[i]
        userli[i].cardNo = userli[i].certificateList[0].cardNo
        userli[i].cardType = userli[i].certificateList[0].cardType
        val = catypeEn(userli[i].certificateList[0].cardType)+'  ' + userli[i].certificateList[0].cardNo
        valFlag = catypeEn(userli[i].certificateList[0].cardType)+'  ' + numberPapers(userli[i].certificateList[0].cardNo)
        // valFlag = val
        // this.$set(userli[i],'val',val) // 默认选择第一个证件
        userli[i]["val"] = val
        userli[i]["valFlag"] = valFlag
        for (let k = 0; k < userli[i].certificateList.length; k++) {
            car = catypeEn(userli[i].certificateList[k].cardType)+'  ' + numberPapers(userli[i].certificateList[k].cardNo)
            userli[i].certificateList[k] = {...userli[i].certificateList[k],'car':car}
            this.$set(userli[i].certificateList[k],'car',car)
        }
      }
      this.passenList = userli
    },
    // 切换证件信息  并且改变数据里面的值
    certifChang(value){
        for (let i = 0; i < this.passenList.length; i++) {
          for (let k = 0; k < this.passenList[i].certificateList.length; k++) {
            if( this.passenList[i].certificateList[k].id == value){
                      this.passenList[i].cardNo = this.passenList[i].certificateList[k].cardNo
                      this.passenList[i].cardType = this.passenList[i].certificateList[k].cardType
            }
          }
      }
      this.$forceUpdate()
    },
    getRuleMainSetting() {
      //查询当前用户改签是否需要审核 和 事前是否二次过审
      this.loading = true;
      this.$api.home
        .ruleMainSetting()
        .then((res) => {
          this.loading = false;
          //   if (this.isblcks == 4) {
          //     console.log("改签");
          //     this.RuleMa = res.data.examinePattern; //改签是否需要审核
          //     let stw = this.RuleMa.split(",");
          //     for (let i in stw) {
          //       /**
          //        * 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
          //        */
          //       if (stw[i] == 5) {
          //         this.RuleMas = true;
          //       }
          //     }
          //     this.isShowStatus();
          //   } else
          if (this.isblcks == 1) {
            // 事前
            let stw = res.data.examineSwitch.split(",");
            // this.isblckt = this.trainslis.isblckt; //事前是否需要二次审批
            // this.sttos:事前是否违规再次审批  1为开启二次审批 3为违规再次审批
            if (this.isblckt) {
              this.sttos = 3;
            }
            for (let i in stw) {
              /**
               * 3代表事前二次过审
               */
              if (stw[i] == 3) {
                //如果用户不是免审 就要事前二次过审
                if (!this.isblckt) {
                  this.sttos = 1;
                  this.isblckt = true;
                }
              }
            }
            this.isShowStatus();
            if (this.isblckt == true) {
              //如果需要二次审批 默认载入成本中心
              this.handleChange();
            }
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    hoslengs() {
      this.prics();
    },
    count(ti, ts) {
      let date1 = new Date(ti);
      let date2 = new Date(ts);
      let date =
        (date2.getTime() - date1.getTime()) /
        (1000 * 60 * 60 * 24); /*不用考虑闰年否*/
      return date;
    },
    // 因私选择出行人后带有证件信息的数据
    passage(list) {
      this.passenger = list;
      this.passenList = list
      // this.init()
    },
    async toZHXBooks() {
      //实时查询当前房型价格
      let that = this;
      let dats = that.trainslis;
      let prics = null;
      if (this.isbtd == 1) {
        if (dats.datlist.butalist[0].vehicleId != undefined) {
          this.vehicleId = dats.datlist.butalist[0].vehicleId; //事前id
        }
      }
      that.loading = true;
      that.$api.home
        .getContactInfo()
        .then((rt) => {
          // this.loading = false;
          if (rt.code == 200) {
            this.lname = rt.data.name;
            this.lipone = rt.data.phone;
          }
        })
        .catch((e) => {
          that.loading = false;
          console.log(e);
        });
      if (dats.hots.supplierType == 5) {
        let cw = {
          checkInDate: dats.datatiem[0],
          checkOutDate: dats.datatiem[1],
          holMidId: dats.datlist.hotelCode,
          hotelId: dats.hots.hotelCode,
          proId: dats.hots.proId,
          ratePlanCode: dats.hots.ratePlanCode,
          vendorCode: dats.hots.vendorCode,
        };
        that.loading = true;
        that.$api.home
          .toZHXBook(cw)
          .then((res) => {
            that.loading = false;
            if (res.code == 200) {
              let dat = res.data;
              if (dat.hasOwnProperty("error")) {
                this.hotelError(dat);
              } else {
                let sit = [];
                that.resids = this.trainslis.datalist.resId;
                that.orderRoomInfos = dat.roomPrice; //采购价
                that.bookingNotesos = dat.resBaseInfo.cancelDescription; //取消规则
                prics = dat.userRoom.proSaleInfoDetailsTarget; //销售采购价
                that.supplierNo = dat.resBaseInfo.supplierNo;
                that.firPrices = 0;
                for (let k in prics) {
                  sit.push({
                    useDate: k,
                    amountPrice: prics[k].amountPrice,
                    oneDateaAmountPrice: prics[k].amountPriceSum,
                  });
                  that.firPrices += prics[k].amountPriceSum;
                }
                this.prics();
                this.orderUseDateDetails = sit;
                that.selts();
              }
            }
          })
          .catch((e) => {
            that.loading = false;
            console.log(e);
          });
      } else if (dats.hots.supplierType == 4) {
        let cw = {
          hotelDetailSearchReq: {
            checkinDate: dats.datatiem[0],
            checkoutDate: dats.datatiem[1],
            proId: dats.hots.proId,
            productUniqueId: dats.hots.productUniqueId,
            channelData: dats.hots.channelData,
          },
          holMidId: dats.datlist.hotelCode,
        };
        that.loading = true;
        that.$api.home
          .toELONGBook(cw)
          .then((res) => {
            that.loading = false;
            if (res.code == 200) {
              let dat = res.data;
              if (dat.hasOwnProperty("error")) {
                this.hotelError(dat);
              } else {
                that.resids = dat.hotel.id;
                that.orderRoomInfos = dat.orderRoomInfos; //采购价
                that.bookingNotesos = dat.hotel.description; //取消规则
                prics = dat.room.proSaleInfoDetailsTarget; //销售采购价
                that.supplierNo = dat.hotel.supplierNo;
                that.firPrices = 0;
                this.pricesMethod(prics, 4);
              }
            }
          })
          .catch((e) => {
            that.loading = false;
            console.log(e);
          });
      } else if (dats.hots.supplierType == 6) {
        let cw = {
          roomInfo: {
            checkInDate: dats.datatiem[0],
            checkOutDate: dats.datatiem[1],
            roomId: dats.hots.productUniqueId,
            holMidId: dats.datalist.id,
          },
          hotelCode: dats.hots.hotelCode,
        };
        that.loading = true;
        that.$api.home
          .toYYOUBook(cw)
          .then((res) => {
            that.loading = false;
            if (res.code == 200) {
              let dat = res.data;
              if (dat.hasOwnProperty("error")) {
                this.hotelError(dat);
              } else {
                that.resids = this.trainslis.datalist.resId;
                that.orderRoomInfos = dat.orderRoomInfos; //采购价
                that.bookingNotesos = dat.room.bookingNotes; //取消规则
                prics = dat.room.proSaleInfoDetailsTarget; //销售采购价
                that.supplierNo = dat.hotel.supplierNo;
                that.firPrices = 0;
                this.pricesMethod(prics, 6);
              }
            }
          })
          .catch((e) => {
            that.loading = false;
            console.log(e);
          });
      } else if (dats.hots.supplierType == 7) {
        that.loading = true;
        this.$api.home
          .toHuazhuBook({
            checkInDate: dats.datlist.timedate[0],
            checkOutDate: dats.datlist.timedate[1],
            hotelId: dats.hots.resId,
            guaranteeMode: dats.hots.guaranteeMode,
            roomTypeId: dats.hots.proId,
            rateCode: dats.hots.productUniqueId,
            activityId: dats.hots.activityId,
            rateCodeType: dats.hots.rateCodeType,
          })
          .then((res) => {
            that.loading = false;
            if (res.code == 200) {
              let dat = res.data;
              if (dat.hasOwnProperty("error")) {
                this.hotelError(dat);
              } else {
                that.orderRoomInfos = dat.orderRoomInfos; //采购价
                that.bookingNotesos = dat.room.bookingNotes; //取消规则
                prics = dat.room.proSaleInfoDetailsTarget; //销售采购价
                that.hotelData = dat;
                that.supplierNo = dat.hotel.supplierNo;
                that.firPrices = 0;
                this.pricesMethod(prics, 7);
              }
            }
          })
          .catch((e) => {
            that.loading = false;
            console.log(e);
          });
      } else if (dats.hots.supplierType == 9) {
        let nuarry = [];
        let nus = that.buslist; //出差人的集合
        for (let i = 0; i < nus.length; i++) {
          nuarry.push(nus[i].passengerNo); //获取出行人员id
        }
        let cw = {
          hotelDetailSearchReq: {
            checkinDate: dats.datatiem[0],
            checkoutDate: dats.datatiem[1],
            proId: dats.hots.proId,
            productUniqueId: dats.hots.productUniqueId,
            holMidId: dats.datlist.hotelCode,
            cityName: dats.datlist.city.name,
            supplierType: dats.hots.supplierType,
            travelType: dats.datlist.isbtd,
            hotelCode: dats.hots.resId,
          },
        };
        that.loading = true;
        that.$api.home
          .toYaduoBook(cw)
          .then((res) => {
            that.loading = false;
            if (res.code == 200) {
              let dat = res.data;
              if (dat.hasOwnProperty("error")) {
                this.hotelError(dat);
              } else {
                let sit = [];
                that.resids = dat.hotel.id;
                that.orderRoomInfos = dat.orderRoomInfos; //采购价
                that.bookingNotesos = dat.hotel.description; //取消规则
                prics = dat.room.proSaleInfoDetailsTarget; //销售采购价
                that.yaduoroom = dat.room;
                that.supplierNo = dat.hotel.supplierNo;
                that.firPrices = 0;
                for (let k in prics) {
                  sit.push({
                    useDate: k,
                    amountPrice: prics[k].amountPrice,
                    oneDateaAmountPrice: prics[k].amountPriceSum,
                    breakfastNum: prics[k].breakfastNum,
                  });
                  that.firPrices += prics[k].amountPriceSum;
                }
                this.prics();
                this.orderUseDateDetails = sit;
                that.selts();
              }
            }
          })
          .catch((e) => {
            that.loading = false;
            console.log(e);
          });
      } else if (dats.hots.supplierType == 8 || dats.hots.supplierType == 11) {
        let nuarry = [];
        let nus = that.buslist; //出差人的集合
        for (let i = 0; i < nus.length; i++) {
          nuarry.push(nus[i].passengerNo); //获取出行人员id
        }
        let cw = {
          hotelDetailSearchReq: {
            checkinDate: dats.datatiem[0],
            checkoutDate: dats.datatiem[1],
            proId: dats.hots.proId,
            productUniqueId: dats.hots.productUniqueId,
            holMidId: dats.datlist.hotelCode,
            cityName: dats.datlist.city.name,
            supplierType: dats.hots.supplierType,
            travelType: dats.datlist.isbtd,
            hotelCode: dats.hots.hotelCode,
          },
        };
        if (dats.hots.supplierType == 11) {
          cw.hotelDetailSearchReq["hotelCode"] = dats.hots.resId;
        }
        that.loading = true;

        let res =
          dats.hots.supplierType == 8
            ? await that.$api.home.toJinJiangBook(cw)
            : await that.$api.home.toMeituanBook(cw);

        try {
          that.loading = false;
          if (res.code == 200) {
            let dat = res.data;
            if(dats.hots.supplierType == 11){
              this.totalRebateRateProfit =  res.data.room.totalRebateRateProfit
            }
            if (dat.hasOwnProperty("error")) {
              this.hotelError(dat);
            } else {
              let sit = [];
              that.resids = "";
              that.orderRoomInfos = dat.orderRoomInfos; //采购价
              that.bookingNotesos = dat.hotel.cancelDescription; //取消规则
              prics = dat.room.proSaleInfoDetailsTarget; //销售采购价
              that.proDataJson = dat.room.proDataJson; //产品信息
              that.yaduoroom = dat.room;
              that.linkManPassengerNo = dat.linkManPassengerNo;
              that.supplierNo = dat.hotel.supplierNo;
              that.firPrices = 0;
              for (let k in prics) {
                sit.push({
                  useDate: k,
                  amountPrice: prics[k].amountPrice,
                  oneDateaAmountPrice: prics[k].amountPriceSum,
                  breakfastNum: prics[k].breakfastNum,
                });
                that.firPrices += prics[k].amountPriceSum;
              }
              this.prics();
              this.orderUseDateDetails = sit;
              that.selts();
            }
          }
        } catch (e) {
          that.loading = false;
          console.log(e);
        }
      } else if (dats.hots.supplierType == 10) {
        let cw = {
          homeInnsPriceCheck: {
            checkinDate: dats.datatiem[0],
            checkoutDate: dats.datatiem[1],
            roomTypeId: dats.hots.proId,
            hotelId: dats.hots.hotelCode,
          },
        };
        that.loading = true;
        that.$api.home
          .toHomeInnsBook(cw)
          .then((res) => {
            this.loading = false;
            if (res.code == 200) {
              let dat = res.data;
              if (dat.hasOwnProperty("error")) {
                this.hotelError(dat);
              } else {
                that.resids = dat.hotel.id;
                that.orderRoomInfos = dat.orderRoomInfos; //采购价
                that.bookingNotesos = dat.hotel.description; //取消规则
                prics = dat.room.proSaleInfoDetailsTarget; //销售采购价
                that.supplierNo = dat.hotel.supplierNo;
                that.firPrices = 0;
                this.pricesMethod(prics);
              }
            }
          })
          .catch((e) => {
            that.loading = false;
            console.log(e);
          });
      } else if (dats.hots.supplierType == 12) {
        let cw = {
          hotelDetailSearchReq: {
            checkinDate: dats.datatiem[0],
            checkoutDate: dats.datatiem[1],
            proId: dats.hots.proId,
          },
          holMidId: dats.datlist.hotelCode,
        };
        that.loading = true;
        that.$api.home
          .toOwnBook(cw)
          .then((res) => {
            this.loading = false;
            if (res.code == 200) {
              let dat = res.data;
              if (dat.hasOwnProperty("error")) {
                this.hotelError(dat);
              } else {
                that.resids = dat.hotel.id;
                that.orderRoomInfos = dat.orderRoomInfos; //采购价
                that.bookingNotesos = dat.hotel.description; //取消规则
                prics = dat.room.proSaleInfoDetailsTarget; //销售采购价
                that.supplierNo = dat.hotel.supplierNo;
                that.firPrices = 0;
                this.pricesMethod(prics);
              }
            }
          })
          .catch((e) => {
            that.loading = false;
            console.log(e);
          });
      }
    },
    hotelError(dat) {
      this.$message({
        message: dat.error,
        type: "warning",
      });
      setTimeout(() => {
        this.$router.go(-1); //返回上一层
      }, 1000);
    },
    pricesMethod(prics, num) {
      let sit = [];
      for (let k in prics) {
        if (num == 7) {
          sit.push({
            useDate: k,
            amountPriceSum: prics[k].amountPriceSum,
            amountPrice: prics[k].amountPrice,
            oneDateaAmountPrice: prics[k].distributionSalePrice,
          });
        } else {
          sit.push({
            useDate: k,
            amountPrice: prics[k].amountPrice,
            oneDateaAmountPrice: prics[k].amountPriceSum,
          });
        }

        this.firPrices += prics[k].amountPriceSum;
      }
      this.prics();
      this.orderUseDateDetails = sit;
      this.selts();
    },
    // catypes(it) { //返回证件类型
    //   if ('NI' == it) {
    //     return '身份证'
    //   } else if ('PP' == it) {
    //     return '护照'
    //   } else if ('TB' == it) {
    //     return '台胞证'
    //   } else if ('GA' == it) {
    //     return '港澳通行证'
    //   } else if ('HX' == it) {
    //     return '回乡证'
    //   } else if ('OS' == it) {
    //     return '其他证件'
    //   }
    // },
    async okadd() {
        if(this.resonText){
        var res = ''
        res = this.reasonData.find(item=>item.reason ==  this.resonText)
         this.reson =res? res.id : this.buslist[0].resonid
        }

      //提交订单
      let that = this;
      let userlists = this.buslist;
      let datlist = this.trainslis.datlist;
      let dats = this.trainslis;
      let NameCenter = that.NameCenter; //成本中心
      let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
      let TravelDepartlist = that.TravelDepartlist; //部门审批人
      let apprvTaskStaffts = []; //审核人员
      let user_name = this.lname; //联系人
      let user_ipone = this.lipone; //联系电话
      let isbtd = this.trainslis.datlist.isbtd; //1因公2因私
      let isblcks = this.isblcks; //1事前 2事中
      let msgErr = this.msgErr; //成本中心校验是否通过
      if (userlists.length < 1) {
        that.$message({
          message: "请选择入住人",
          type: "warning",
        });
        return;
      }
      if (this.isShowChengben == true) {
        if (
          NameCenter.id == ""
          //  &&
          // isblcks == 2 &&
          // isbtd == 1 &&
          // that.trainslis.isarsrl == false
        ) {
          that.$message({
            message: "请选择成本中心",
            type: "warning",
          });
          return;
        }
        if (
          TravelCostCenlist.length == 0 &&
          // isbtd == 1 &&
          // that.trainslis.isarsrl == false &&
          this.CostCi == true
        ) {
          that.$message({
            message: "请选择成本审批人",
            type: "warning",
          });
          return;
        }
        if (
          TravelDepartlist.length == 0 &&
          // isbtd == 1 &&
          // that.trainslis.isarsrl == false &&
          this.CostCis == true
        ) {
          that.$message({
            message: "请选择部门审批人",
            type: "warning",
          });
          return;
        }
        if (
         that.isGetStaffList == true
        ) {
          //除了免审 如没有审批流程将无法进行下单
          that.$message({
            message: "该账户未配置审批流程，请联系管理员进行配置！",
            type: "error",
          });
          return;
        }
        // if (that.reson == '' && isbtd == 1 && isblcks == 2) {
        if (that.resonText == "" ) {
          that.$message({
            message: "请输入出行事由",
            type: "warning",
          });
          return;
        }
      }
      if (user_name == "") {
        that.$message({
          message: "请输入联系人",
          type: "warning",
        });
        return;
      }
      if (user_ipone == "" || !ip_test.test(user_ipone)) {
        that.$message({
          message: "请输入正确的联系电话",
          type: "warning",
        });
        return;
      }
      if (msgErr) {
        that.$message({
          message: msgErr,
          type: "warning",
        });
        return;
      }
      let usersalist = [];
      let ists = 0;

      for (let i = 0; i < this.passenList.length; i++) {
        //出行人信息
        usersalist.push({
          cardNo: this.passenList[i].cardNo,
          cardType:this.passenList[i].cardType,
          name: this.passenList[i].name ? this.passenList[i].name : this.passenList[i].userName,
          phone: this.passenList[i].phone,
          deptName: this.passenList[i].deptName,
          costcenterName: isbtd == 1 ?  this.passenList[i].costcenterName : usersalist.costcenterName,// 成本中心名字
          passengerNo: this.passenList[i].passengerNo,
          employeeType: this.passenList[i].employeeType,
        });
      }
      let dat = {};
      let hotelData = this.hotelData;
      let attrtime = this.statime.split(":").join(""); //最早入店时间
      let atendtime = this.endtime.split(":").join(""); //最晚入店时间
      let room = hotelData.room;
      let hotel = hotelData.hotel;
      let invs = "";
      if (JSON.stringify(dats.limit) != "{}") {
        let limist = [];
        for (let k in dats.limit) {
          let sk = {};
          sk["" + k + ""] = dats.limit[k];
          limist.push(sk);
        }
        invs = JSON.stringify({
          information: limist,
        });
        ists = 1;
      } else {
        ists = 0;
        invs = "";
      }

      for (let i = 0; i < TravelCostCenlist.length; i++) {
        //成本中心审批人
        apprvTaskStaffts.push({
          deptCost: 2,
          nodeId: TravelCostCenlist[i].nodeId,
          personId: TravelCostCenlist[i].personId,
          staffId: TravelCostCenlist[i].staffId,
          staffName: TravelCostCenlist[i].staffName,
        });
      }
      for (let i = 0; i < TravelDepartlist.length; i++) {
        //部门审批人
        apprvTaskStaffts.push({
          deptCost: 1,
          nodeId: TravelDepartlist[i].nodeId,
          personId: TravelDepartlist[i].personId,
          staffId: TravelDepartlist[i].staffId,
          staffName: TravelDepartlist[i].staffName,
        });
      }
				let inst = 0;
				if(this.isblckt == true){//是否超规审批 或者事前需要审批
					inst = this.sttos;
				} else {
					inst = isblcks;
				}
      dat = {
        supplierType: this.trainslis.hots.supplierType,
        orderRoomInfos: {
          checkInDate: dats.datatiem[0],
          checkOutDate: dats.datatiem[1],
          orderRoomInfos: this.orderRoomInfos,
        },
       
        orderCreateReq: {
          hotelImg: dats.datalist.imgUrl,
          dbCancelRule: this.bookingNotesos, //取消规则
          bookCount: this.hosleng, //房间数量
          linkManName: user_name, //联系人
          linkManMobile: user_ipone, //联系电话
          proId: dats.hots.proId,
          resId: this.resids,
          zhxResId: dats.hots.hotelCode,
          bedTypeName: dats.hots.bedTypeName, //房间类型
          beforeTotalPrice: this.connum, //房间价格
          checkInDate: dats.datatiem[0] + " 00:00:00",
          checkOutDate: dats.datatiem[1] + " 00:00:00",
          arriveHotelTime: dats.datatiem[0] + " " + this.statime + ":00",
          cityName: dats.datalist.cityName,
          endArriveTime: atendtime, //最晚入住时间
          hotelAddress: dats.datalist.address, //酒店地址
          hotelPhone: dats.datalist.resPhone, //酒店电话
          proName: dats.hots_pk.resProName,
          resName: dats.datalist.resName,
          startArriveTime: attrtime, //最早入住时间
          supplierNo: this.supplierNo,
          isviolation: ists,
          violation: invs,
          orderUseDateDetails: this.orderUseDateDetails,
          productUniqueId: dats.hots.productUniqueId,
          breakfastCount: dats.hots.breakfastCount, //早餐类型
        },
        hotelBookExtendReq: {
          apprvTaskEntity: {
            taskType: inst , //1为事前2为事中，
            beforeMiddle:isblcks,
          },
          passengers: usersalist, //出行人信息
          travelType: isbtd, //因公因私
        },
        roomInfo: {
          bedTypeName: dats.hots.bedTypeName, //房间类型,
          checkInDate: dats.datatiem[0] + " 00:00:00",
          checkOutDate: dats.datatiem[1] + " 00:00:00",
          breakfastCount: dats.hots.breakfastCount, //早餐类型
        },
        hotelSingleAvailRq: {
          amountPrice: dats.hots.firPrice,
          bedTypeName: dats.hots.bedTypeName, //房间类型
          cancelPolicyInfo: "",
          checkInDate: dats.datatiem[0],
          checkOutDate: dats.datatiem[1],
          hotelId: dats.hots.hotelCode,
          proId: dats.hots.proId,
          ratePlanCode: dats.hots.ratePlanCode,
          roomTypeName: "",
          vendorCode: dats.hots.vendorCode,
        },
      };
      if (this.trainslis.hots.supplierType == 5){
          dat.orderCreateReq["orderRemark"] = this.orderRemark
      }    
      if (this.trainslis.hots.supplierType == 7) {
        dat.orderCreateReq["rateCodeType"] = dats.hots.rateCodeType;
        dat["holAddOrder"] = {
          guaranteeMode: room.guaranteeMode,
          adults: dats.datlist.butalist.length,
          childs: 0,
          hotelId: hotel.id,
          roomTypeId: room.proId,
          roomCount: this.hosleng,
          rateCode: room.productUniqueId,
          activityId: room.activityId,
        };
      } else if (
        this.trainslis.hots.supplierType == 9 ||
        this.trainslis.hots.supplierType == 8 ||
        this.trainslis.hots.supplierType == 11
      ) {
        let room = this.yaduoroom;
        dat.orderRoomInfos.checkInDate = dats.datatiem[0];
        dat.orderRoomInfos.checkOutDate = dats.datatiem[1];
        dat.orderCreateReq.arriveHotelTime = dats.datatiem[0] + " " + "23:00:00";
        dat.orderCreateReq["changeRule"] = room.changeRule;
        dat.orderCreateReq["cashScale"] = room.cashScale;
        dat.orderCreateReq["ruleValue"] = room.ruleValue;
        dat.orderCreateReq["cancelPenalty"] = room.cancelPenalty;
        if (
          this.trainslis.hots.supplierType == 8 ||
          this.trainslis.hots.supplierType == 11
        ) {
          dat.orderCreateReq["linkManPassengerNo"] = this.linkManPassengerNo;
          dat.orderCreateReq["proDataJson"] = this.proDataJson; //产品数据
          if (dats.hots.supplierType == 11) {
            dat.orderCreateReq["resId"] = dats.hots.resId;
            dat.orderCreateReq["totalRebateRateProfit"] =this.totalRebateRateProfit
          }
        }else{
           dat.orderCreateReq.arriveHotelTime = this.statime.split(":")[0];
        }
      } else {
        dat.orderCreateReq["channelData"] = dats.hots.channelData;
         
      }
     if( this.trainslis.hots.supplierType != 10 && this.trainslis.hots.supplierType != 5 ) {
         dat.orderCreateReq['resId'] = this.resids
      }
      if (
        isblcks == 2 && isbtd == 1 && that.trainslis.isarsrl == false
      ) {
        //事中因公 不是免审 或者 事前需要二次审批
        dat.hotelBookExtendReq.apprvTaskEntity["remark"] = invs;
        dat.hotelBookExtendReq.apprvTaskEntity[
          "apprvTaskStaffs"
        ] = apprvTaskStaffts; //审批人信息
        dat.hotelBookExtendReq.apprvTaskEntity["costId"] = NameCenter.id; //成本中心id
        dat.hotelBookExtendReq.apprvTaskEntity["costName"] = NameCenter.name; //成本中心名称
      } else if (
        isblcks == 1 &&
        isbtd == 1 &&
        that.trainslis.isarsrl == false
      ) {
        //事前 因公 不是免审 非二次审批
        dat.hotelBookExtendReq.apprvTaskEntity[
          "travelNo"
        ] = this.trainslis.datlist.mokksli.travelNo; //出差单号
        dat.hotelBookExtendReq.apprvTaskEntity["remark"] = invs;
        dat.hotelBookExtendReq.apprvTaskEntity[
          "apprvTaskStaffs"
        ] = apprvTaskStaffts; //审批人信息
        dat.hotelBookExtendReq.apprvTaskEntity["vehicleId"] = this.vehicleId;
        dat.hotelBookExtendReq.apprvTaskEntity["costId"] = NameCenter.id; //成本中心id
        dat.hotelBookExtendReq.apprvTaskEntity["costName"] = NameCenter.name; //成本中心名称
      }else if( isblcks == 1 &&
        isbtd == 1 &&
        that.trainslis.isarsrl == true){
        dat.hotelBookExtendReq.apprvTaskEntity[
          "travelNo"
        ] = this.trainslis.datlist.mokksli.travelNo; //出差单号
        dat.hotelBookExtendReq.apprvTaskEntity["vehicleId"] = this.vehicleId;
        dat.hotelBookExtendReq.apprvTaskEntity["costId"] = NameCenter.id; //成本中心id
        dat.hotelBookExtendReq.apprvTaskEntity["costName"] = NameCenter.name; //成本中心名称
      }
      if(isbtd == 1){
        dat.hotelBookExtendReq.apprvTaskEntity["reasonId"] = this.reson, //理由
        dat.hotelBookExtendReq.apprvTaskEntity["reason"] = this.resonText
      }
      that.loadingBot = true;
      that.$api.home
        .hotelBook(dat)
        .then((rt) => {
          that.loadingBot = false;
          if (rt.code == 200) {
              that.$message({
                message: rt.message?rt.message:'操作成功',
                type: "success",
              });
            if (isbtd == 2) {
              this.$router.push({
                path: "hotersdefray",
                query: {
                  data: rt.data.transationOrderNo,
                },
              });
            } else {
              this.$router.push({
                path: "hoteorderlist",
                query: {
                  data: rt.data.transationOrderNo,
                  EntryMethod: 0,
                },
              });
            }
          } else {
            that.$message.error({
              message: rt.message,
            });
          }
        })
        .catch((e) => {
          that.loadingBot = false;
          console.log(e);
        });
    },
    retime(item) {
      //时间
      return item[0].substring(5, 7) + "月" + item[0].substring(8, 11) + "日";
    },
    drawers(its) {
      //点击成本或者部门审批人
      if (its == "TravelCostCenlist") {
        //判断是部门还是成本中心
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
            id: "",
          });
        }
      } else {
        for (let i = 0; i < this.Deparapprover.length; i++) {
          this.apprvCost.push({
            id: "",
          });
        }
      }
      this.drawer = true;
    },
    btn_click() {
      //确定部门或者成本审批人
      let that = this;
      for (let k in this.apprvCost) {
        if (that.apprvCost[k].id == "") {
          that.$message({
            message: "请选择" + (parseInt(k) + 1) + "级审批人",
            type: "warning",
          });
          return;
        }
      }
      if (this.iscost == true) {
        //成本审批人信息
        that.TravelCostCenlist = [];
        for (let k in that.drawelist) {
          for (let i in that.drawelist[k].apprvCostFlowNodePersons) {
            for (let j in that.apprvCost) {
              if (
                that.apprvCost[j].id ==
                that.drawelist[k].apprvCostFlowNodePersons[i].id
              ) {
                that.TravelCostCenlist.push({
                  deptCost: 2,
                  personId: that.apprvCost[j].id,
                  nodeId: that.drawelist[k].apprvCostFlowNodePersons[i].nodeId,
                  staffId:
                    that.drawelist[k].apprvCostFlowNodePersons[i].staffId,
                  staffName:
                    that.drawelist[k].apprvCostFlowNodePersons[i].staffName,
                });
              }
            }
          }
        }
      } else {
        //部门审批人信息
        this.TravelDepartlist = [];
        for (let k in that.drawelist) {
          for (let i in that.drawelist[k].apprvDeptFlowNodePersons) {
            for (let j in that.apprvCost) {
              if (
                that.apprvCost[j].id ==
                that.drawelist[k].apprvDeptFlowNodePersons[i].id
              ) {
                that.TravelDepartlist.push({
                  deptCost: 1,
                  personId: that.apprvCost[j].id,
                  nodeId: that.drawelist[k].apprvDeptFlowNodePersons[i].nodeId,
                  staffId:
                    that.drawelist[k].apprvDeptFlowNodePersons[i].staffId,
                  staffName:
                    that.drawelist[k].apprvDeptFlowNodePersons[i].staffName,
                });
              }
            }
          }
        }
      }
      that.drawer = false;
    },
    getBrokerage() {
      //酒店手续费
      this.$api.home
        .getHotelBrokerage()
        .then((res) => {
          if (res.code == 200) {
            this.Brokerage = res.data;
            this.prics();
          } else {
            this.$message({
              message: res.message,
              type: "warning",
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handleChange(value) {
      //选择成本中心
      //   let nodesObj = this.$refs["cascader"].getCheckedNodes(); //获取当前节点的信息
      //   this.NameCenter.name = nodesObj[0].data.text;
      //   this.NameCenter.id = nodesObj[0].data.id;
      if (value) {
        // 点击切换的时候替换选中的值
        this.NameCenter.name = this.treeLists.find(
          (item) => item.id == value[0]
        ).text;
        this.NameCenter.id = value[(value.length-1)];

        this.appswlist(); //重新获取部门和成本中心审批人
      }
      this.TravelCostCenlist = [];
      this.TravelDepartlist = [];
      //   this.appswlist(); //重新获取部门和成本中心审批人
    },
    // 审批流
    async appswlist() { 
      //选获取部门和成本审批人信息
      let that = this;
      let nuarry = [];
      let nus = that.buslist; //出差人的集合
      for (let i = 0; i < nus.length; i++) {
        nuarry.push(nus[i].passengerNo); //获取出行人员id
      }
      that.loading = true;
      let res;
      try {
        res = await that.$api.home.getStaffList({
          costId: that.NameCenter.id,
          passengerNos: nuarry,
          applyType:
           that.isblckt == true
              ? that.sttos
              : this.isblcks,
        });
        that.loading = false;
        if (res.code == 200) {
          if (res.data.deptStaffs.length == 0) {
            //是否有部门审批人
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
          this.msgErr = "";
          that.isGetStaffList = false
        } else {
          that.isGetStaffList = true; //是否无审批流
          this.msgErr = res.message ? res.message : "系统错误";
        }
      } catch (e) {
        this.msgErr = "系统错误";
        console.log(e);
        that.loading = false;
      }
    },
    prics() {
      //Brokerage手续费
      //firPrices 几天所有的单间房钱
      //
      //hosleng 几间房
      //timeli天数
      this.connum =
        this.hosleng * this.timeli * this.Brokerage +
        this.firPrices * this.hosleng;
    },
    selts() {
      //查询成本中心
      let _this = this;
      // _this.loading = true;
      _this.$api.home
        .getCostCenterList()
        .then((res) => {
          // _this.loading = false;
          if (res.code == 200) {
            _this.treeLists = res.data[0].children;
            if (this.trainslis.isarsrl == false&&(this.isblcks == 1 )) {
            // 成本中心二次审批 成本中心参数值回填
              this.selectedOptions3 =selectedOptions([this.trainslis.datlist.mokksli.costId],res.data[0].children)
            
            }
          } else {
            _this.$message({
              message: res.message,
              type: "warning",
            });
          }
        })
        .catch((e) => {
          _this.loading = false;
          console.log(e);
        });
    },
    // caname(item) {
    //   //回显证件名字
    //   for (let i = 0; i < this.carld.length; i++) {
    //     if (this.carld[i].code == item) {
    //       return this.carld[i].name;
    //     }
    //   }
    // }
    // 出差事由
    reasonChang(val){
      this.resonText = this.reasonData.find(item=>item.id == val).reason
      this.reson = this.reasonData.find(item=>item.id == val).id
    }
  },
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
    color: #ffffff;
    background: #007aff;
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

        .tr_ul_user {
          display: flex;
          margin: 20px 0;
          .tr_uleft {
            width: 100px;
            text-align: center;
            line-height: 50px;
            color: #666666;
            font-size: 14px;
            float: left;
          }
          .userbox {
            display: flex;
            flex-wrap: wrap;
            width: 700px;
            .tr_rights_user {
              cursor: pointer;
              width: 320px;
              height: 40px;
              background: #ffffff;
              // border: 1px solid #dcdfe6;
              border-radius: 4px;
              font-size: 14px;
              margin-bottom: 10px;
              .tr_rights_uName {
                text-align: center;
              }

              .tr_rights_uCardNo {
                // margin: 8px 0 0 12px;
                color: #333333;
                .mixin_displayBox(@jc:flex-start);
                // padding-left:10px ;
                .s-color {
                  color: #dcdfe6;
                  padding:0 10px ;
                }
              }
            }
            .tr_rights_user:nth-child(2n){
              margin-left: 30px;
            }
          }
        }

        .tr_ul {
          width: 100%;
          margin: 20px 0;
          display: flex;

          .tr_uleft {
            min-width: 100px;
            text-align: center;
            line-height: 42px;
            color: #666666;
            font-size: 14px;
          }

          .tr_right {
            width: calc(100% - 100px);
            overflow: hidden;
            display: flex;
            flex-wrap: wrap;

            .tr_rs {
              cursor: pointer;
              padding: 0 15px;
              color: #333333;
              background-color: #f5f7fa;
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

            .tr_dvs {
              cursor: pointer;
              width: 170px;
              height: 38px;
              padding: 0 15px;
              border-radius: 4px;
              border: 1px solid #dcdfe6;
              color: #606266;
              line-height: 38px;
              display: flex;
              font-size: 14px;

              span {
                margin: 0 3px;
              }
              .noTest {
                color: #e5e5e5;
              }
            }
          }
        }
      }

      .trsbt {
        margin-bottom: 10px;
        width: calc(100% - 20px);
        padding: 10px;
        background: #ffffff;

        .trsbord {
          width: calc(100% - 80px);
          padding: 10px 20px;
          margin: 0 20px;
          border-left: 1px dashed #d2dde7;

          .tsfons {
            margin-top: 10px;
            font-size: 15px;
            color: #78879d;
            line-height: 30px;
          }

          .tsbods {
            width: calc(100% - 30px);
            padding: 15px 15px 0 15px;
            border: 1px solid #d2dde7;
            border-radius: 10px;

            .hot_tsp {
              display: flex;
              align-items: center;
              justify-content: space-between;

              .ts_lefbos {
                display: flex;
                align-items: center;

                .tsfotps {
                  width: 80px;
                  height: 55px;

                  img {
                    width: 100%;
                    height: 100%;
                  }
                }

                .hotnames {
                  margin: 0 10px;
                  font-size: 13px;
                  color: #365062;

                  div:nth-child(1) {
                    font-weight: 600;
                  }
                }
              }

              .tright {
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }

            .hot_bsp {
              width: 100%;
              margin-top: 20px;
              line-height: 50px;
              border-top: 1px dashed #ced7de;
              font-size: 13px;
              color: #007aff;
            }
            /deep/ .hot_input{
              font-size: 13px;
              color: #666;
              padding-bottom: 15px;
               &>.el-input{
                width: 200px;
                &>.el-input__inner{
                  height: 30px;
                  line-height: 30px;
                }
              }
            }
          }
        }
      }
    }

    .trsright {
      width: calc(30% - 70px);
      padding: 0 30px;
      margin-left: 10px;
      background: #ffffff;

      .trsr_title {
        font-size: 18px;
        line-height: 60px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .tslist {
        width: 100%;
        height: 55px;
        font-size: 14px;
        color: #666666;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #edf0f5;
      }

      .tslists {
        width: 100%;
        height: 55px;
        font-size: 20px;
        color: #666666;
        display: flex;
        font-weight: Bold;
        justify-content: space-between;
        align-items: center;
      }

      .tsbtn {
        width: 100%;
        cursor: pointer;
        height: 50px;
        border-radius: 5px;
        text-align: center;
        line-height: 50px;
        color: #ffffff;
        background: #409eff;
      }

      .tsbtn:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
<style lang="less">
.tr_rights_uCardNo{
  &>.el-select{
    flex: 1;
    &>.el-input{
      &>.el-input__inner{
        // border: 0;
        padding-right:25px!important;
        padding-left:10px!important;
      }
      &>.el-input__suffix{
        right: 0!important;
      }
    }
  }
}
</style>