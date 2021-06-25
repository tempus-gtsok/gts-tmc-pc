<template>
  <!-- 产品预定->火车票提交订单页面 -->
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
            <div class="tr_list">
              <img src="static/image/sqd_hc.png" />
              <div class="trainlis">
                <span class="sp_time">{{
                  retime(trainslis.datas.datatime)
                }}</span>
								<span>前往{{ trainslis.trainlis.toStation }}</span>
								<span>{{ trainslis.trainlis.trainNo }}</span>
								<span>{{ trainslis.astlis.seatName }}</span>
							</div>
						</div>
						<div class="tsfons"></div>
						<div class="tsbods">
							<div class="trainsc_s">
								<div class="trainsc_s_l">
									<div class="trainsc_s_l_b">
										{{ trainslis.trainlis.fromStation }}
									</div>
									<div class="trainsc_s_l_t">
										{{ trainslis.trainlis.fromTime }}
									</div>
								</div>
								<div class="trainsc_s_s">
									<span class="trainsc_h"></span>
									<div class="times">{{ trainslis.datas.times }}</div>
									<span class="trainsc_h"></span>
								</div>
								<div class="trainsc_s_l">
									<div class="trainsc_s_l_b trainsc_sta">
										{{ trainslis.trainlis.toStation }}
									</div>
									<div class="trainsc_s_l_t">
										{{ trainslis.trainlis.toTime }}
									</div>
								</div>
							</div>
							<div class="tright">
								<p>￥{{ trainslis.astlis.price }}</p>
							</div>
						</div>
            <!-- 是否接受无座 -->
            <div class="without" v-if="(dataList.seatName == '硬座' || dataList.seatName == '二等座') &&  this.trainslis.ranst.isblcks != 4">
              <el-switch
                v-model="value3"
                inactive-color="#ccc"
                inactive-text="接受无座">
              </el-switch>
            </div>
						<!-- 添加选座 -->
						<div v-show="allseat == true && seat != []" class="cseat">
							<div class="seat_a">
								<div class="seat_display">
									<div class="seat_fo">选座：</div>
									<div class="seat_le">
										<div v-for="(item, index) in seat">
											<div v-if="item.name == 'A'">
												窗
												<div class="seat" @click="picks(item)"
													:class="seids(item.id) == item.id ? 'pickseat' : ''">
													{{ item.name }}
												</div>
											</div>
											<div v-if="
                          item.name != 'A' &&
                          item.name != 'D' &&
                          item.name != 'F'
                        "
                      >
                        <div
                          class="seat"
                          @click="picks(item)"
                          :class="seids(item.id) == item.id ? 'pickseat' : ''"
                        >
                          {{ item.name }}
                        </div>
                      </div>
                      <div v-if="item.name == 'D'">
                        过道
                        <div
                          class="seat"
                          @click="picks(item)"
                          :class="seids(item.id) == item.id ? 'pickseat' : ''"
                        >
                          {{ item.name }}
                        </div>
                      </div>
                      <div v-if="item.name == 'F' && seat.length == 3">
                        过道
                        <div
                          class="seat"
                          @click="picks(item)"
                          :class="seids(item.id) == item.id ? 'pickseat' : ''"
                        >
                          {{ item.name }}
                        </div>
                        窗
                      </div>
                      <div v-if="item.name == 'F' && seat.length != 3">
                        <div
                          class="seat"
                          @click="picks(item)"
                          :class="seids(item.id) == item.id ? 'pickseat' : ''"
                        >
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
                  <div class="seat_fo">&emsp;</div>
                  <div class="seat_le">
                    <div v-for="(item, index) in seats">
                      <div v-if="item.name == 'A'">
                        窗
                        <div
                          class="seat"
                          @click="picks(item)"
                          :class="seids(item.id) == item.id ? 'pickseat' : ''"
                          v-if="item.name == 'A'"
                        >
                          {{ item.name }}
                        </div>
                      </div>
                      <div
                        class="seat"
                        @click="picks(item)"
                        :class="seids(item.id) == item.id ? 'pickseat' : ''"
                        v-if="
                          item.name != 'A' &&
                          item.name != 'D' &&
                          item.name != 'F'
                        "
                      >
                        {{ item.name }}
                      </div>
                      <div v-if="item.name == 'D'">
                        过道
                        <div
                          class="seat"
                          @click="picks(item)"
                          :class="seids(item.id) == item.id ? 'pickseat' : ''"
                        >
                          {{ item.name }}
                        </div>
                      </div>
                      <div v-if="item.name == 'F' && seats.length == 3">
                        过道
                        <div
                          class="seat"
                          @click="picks(item)"
                          :class="seids(item.id) == item.id ? 'pickseat' : ''"
                        >
                          {{ item.name }}
                        </div>
                        窗
                      </div>
                      <div v-if="item.name == 'F' && seats.length != 3">
                        <div
                          class="seat"
                          @click="picks(item)"
                          :class="seids(item.id) == item.id ? 'pickseat' : ''"
                        >
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
          <!-- <div class="titleClass" v-if="trainslis.ranst.isblcks == 4">
            温馨提示：改签时需重新购买保险，原票购买的保险需在我的订单详情中手动去退保，退保成功后保费会原路退回
          </div> -->
          <div class="tr_ul tr_ult">
            <div class="tr_uleft">旅客</div>
            <addPassenger
              @passage="passage"
              :iskok="2"
              v-if="isbtd == 2"
            ></addPassenger>
            <div class="tr_right">
              <div
                class="tr_rs"
                v-for="(item, index) in userlists"
                :key="index"
                v-if="isbtd == 1"
                 :class="{tr_rights_chang:trainslis.ranst.isblcks == 4}"
              >
                <!-- <div class="tr_rtp" v-if="trainslis.ranst.isblcks != 4">{{ item.certificateList[0].name }}　</div>
                <div class="tr_rbn" v-if="trainslis.ranst.isblcks != 4">
                  {{ item.certificateList[0].cardTypename }}&nbsp;{{
                    item.certificateList[0].cardNo | numberPapers
                  }}
                </div> -->
                <div class="tr_rights_uCardNo" v-if="trainslis.ranst.isblcks != 4">
                 <p>{{ item.name }}</p><span class="s-color">|</span
                  >  <el-select placeholder="请选择" v-model="item.valFlag" @change="certifChang">
                  <el-option
                    v-for="item in item.certificateList"
                    :key="item.id"
                    :label="item.car"
                    :value="item.id">
                  </el-option>
                </el-select>
                </div>
                <div class="tr_rtp" v-if="trainslis.ranst.isblcks == 4">{{ item.name }}&nbsp;|&nbsp;</div>
                <div class="tr_rbn" v-if="trainslis.ranst.isblcks == 4">
                  {{ item.certType }}&nbsp;{{ item.certNo | numberPapers }}
                </div>
              </div>
            </div>
          </div>
          <div class="tr_ul"  v-if="trainslis.ranst.isblcks != 4">
            <div class="tr_uleft">保险</div>
            <div class="tr_rights bor_data">
              <div class="tr_rights_bor">
                <el-select
                  style="width: 200px"
                  v-model="profitPrice"
                  @change="chineseChange($event)"
                  clearable
                  placeholder="请选择"
                  @clear="clearVal"
                >
                  <el-option
                    v-for="item in insurances"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <div class="tr_insurnce">票面价：{{ insurance }}</div>
              </div>
              <div class="tr_rights_bor_data" v-if="insurancesData.amount" >
                <div
                  class="_bor_data_brief"
                >
                  <span>旅程安心</span
                  ><span>|</span
                  ><span class="amount">保额{{
                    insurancesData.amount | numPrice
                  }}</span>
                </div>
                <div class="_bor_data_clause" @click="dialogVisible = true" v-if="insurancesData && insurancesData.brief">
                 请阅读<span>《投保须知》</span>
                </div>
              </div>
            </div>
          </div>
          <div class="tr_ul" :style="isbtd == 2 ? 'marginBottom: 10px' : ''">
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
              v-if="(trainslis.ranst.isblcks == 2 && !trainslis.isarsrl && trainslis.ranst.isbtd != 2)|| 
              (trainslis.ranst.isblcks == 4 && RuleMas && !trainslis.isarsrl && trainslis.ranst.isbtd != 2) ||
              (trainslis.ranst.isblcks == 1 && !trainslis.isarsrl && trainslis.ranst.isbtd == 1 && isblckt == true)"> -->
          <div v-if="isShowChengben">
            <div class="tr_ul">
              <div class="tr_uleft">归属部门</div>
              <div class="tr_rights">
                <el-input
                  v-model="attdepartment"
                  style="width: 100%"
                  :disabled="true"
                  placeholder="请输入联系人姓名"
                ></el-input>
              </div>
            </div>
            <div class="tr_ul">
              <div class="tr_uleft">成本中心</div>
              <div class="tr_rights">
                <!-- <div v-if="isblckt == true" class="disNone"></div> -->
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
                  <span class="noTest" v-if="TravelCostCenlist.length == 0"
                    >请输入部门审批人</span
                  >
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
        <div class="tslist">
          <div>票价</div>
          <div>￥{{ trainslis.astlis.price }}×{{ userlists.length }}人</div>
        </div>
        <div class="tslist" v-if="this.trainslis.ranst.isblcks != 4">
          <div>保险</div>
          <div>￥{{ insurance }}×{{ userlists.length }}人</div>
        </div>
        <div class="tslist">
          <div>服务费</div>
          <div>￥{{ Brokerage }}×{{ userlists.length }}人</div>
        </div>
        <div class="tslists">
          <div>合计</div>
          <div style="color: #ff6600">￥{{ onprice }}</div>
        </div>
        <div
          class="tsbtn"
          @click="intendedClick"
          v-if="trainslis.ranst.isblcks != 4 && rotes('tms:tra:reserve')"
          v-loading="loadingBot"
        >
          提交订单
        </div>
        <div
          class="tsbtn"
          @click="uprean"
          v-if="trainslis.ranst.isblcks == 4 && rotes('tms:tra:change')"
          v-loading="loadingBot"
        >
          申请改签
        </div>
      </div>
    </div>
    <el-dialog
      title="投保须知"
      :visible.sync="dialogVisible"
      width="50%"
      center
     >
      <span v-html="insurancesData.brief"></span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisibleId"
      width="30%"
     >
      <span>当前证件可能预定不成功，建议使用身份证下单</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleId = false">取 消</el-button>
        <el-button type="primary" @click="okadd">确定下单</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import addPassenger from "@/components/common/addPassenger";
import reasonApi from "@/utils/reasonApi";
import { numberPapers,numPrice, selectedOptions , catypeEn } from "@/utils/common-filters";
let ip_test = /^[1][3456789][0-9]{9}$/; //电话号码正则
export default {
  filters: {
    numberPapers,numPrice,
    selectedOptions,catypeEn 
  },
		data() {
			return {
				RuleMas: false,
				onprice: 0, //合计
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
				lname: "", //默认联系人
				attdepartment: JSON.parse(sessionStorage.getItem("userinfo")).deptName, //默认部门
				lipone: "",
				loading: false,
				buslist: [],
				userlists: [], //旅客信息
				isblckt: false, //事前是否需要二次审批
				sttos: 1, //事前是否违规再次审批  1为开启二次审批 3为违规再次审批
				trainslis: JSON.parse(this.$route.query.data), //上个页面的参数
				allseat: false,
				secseat: false, //第二排座位
				isbtd: "",
				pick: [],
				picklist: [],
				seat: [],
				seats: [],
				insurances: null,
				profitPrice: null,
				insurance: 0,
				insCode: "",
				loadingBot: false,
				isShowChengben: false, // 是否显示审批信息
				selectedOptions3: [],
				isGetStaffList: false, //是否无审批流
				allIsGift: false,
        getTravelPolicys: {}, // 保险判断规则
        ArrayList:[],
        disa:false,
        value3:false,
        dataList:{},
        insurancesData: {}, // 保险信息
        dialogVisible:false,//投保须知弹窗
        reasonData: [],  // 出差事由
        resonText:'',
        dialogVisibleId:false,
			};
		},
		components: {
			addPassenger,
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
			// profitPrice: {
			//   handler(newName, oldName) {
			//     let insurances = this.insurances;
			//     let profitPrice = this.profitPrice;
			//     for (let i = 0; i< insurances.length; i++){
			//       if (insurances[i].id == profitPrice){
			//         if (insurances[i].isGift != 1){
			//           this.insurance = insurances[i].buyPrice;
			//         }
			//         this.insCode = insurances[i].insuranceNo;
			//       }
			//     }
			//     if (this.isbtd == 1) {
			//       this.onprice = (this.trainslis.astlis.price) * (this.buslist.length) + (this.Brokerage) * (this.buslist.length)+ (this.insurance * this.buslist.length);
			//     } else {
			//       this.onprice = (this.trainslis.astlis.price * this.passengers.length) + (this.Brokerage * this.passengers.length) + (this.insurance * this.passengers.length) ;
			//     }
			//   },
			// },
			deep: true,
		},
		created() {},
		async mounted() {
			let lis = JSON.parse(this.$route.query.data); //获取上个页面传入的参数
      this.dataList = lis.astlis
      this.value3 = this.dataList.seatName == '无座' ? true : false
			this.buslist = lis.ranst.butalist;
      this.isbtd = lis.ranst.isbtd;
      this.isblckt = this.trainslis.isblckt
      this.reasonData = await reasonApi.reason_api()
      var arrS = this.reasonData.find(item=>item.isDefault == 1) 
      // console.log("arrS--------",reson)
      // this.reasonChang(this.reson)
      //  this.metarule = this.trainslis.metarule || 0; //是违规审批 3
    this.disa = this.trainslis.ranst.isblcks == 1 ? true : false;
    if (this.isbtd !== "2") {
      this.userlist();
    }
    // 事前需要二次审批时回填成本中心及出差事由
    if (this.isblckt) {
      this.sttos = 3; //1为事前审批 3为超标审批
      this.isShowStatus(); //是否显示审批信息
    } else {
      if (
        (this.trainslis.ranst.isblcks == 1 ||
          this.trainslis.ranst.isblcks == 4) &&
        this.trainslis.isarsrl == false&& this.isbtd == 1 
      ) {
        this.getRuleMainSetting();
      } else {
        this.isShowStatus();
      }
    }
    if (this.trainslis.ranst.isblcks == 1 ) {
      this.NameCenter = {
        name: this.trainslis.ranst.mokksli.costName,
        id: this.trainslis.ranst.mokksli.costId,
      };

      // 成本中心二次审批 成本中心参数值回填
      // this.selectedOptions3 = [this.trainslis.ranst.mokksli.costId];
      if(this.isblckt){
        this.appswlist();
      }
    }
    this.getBrokerage();
    this.getTravelPolicyst(); //保险规则判断
    if(this.trainslis.ranst.isblcks == 4){
       if(  this.buslist[0].reason ==  this.buslist[0].resonid){
         this.reson = ''
         this.resonText = ''
       }else{
          if(this.buslist[0].reason){
              this.reson = this.buslist[0].reasonid
              this.resonText =this.buslist[0].reason
          }else{
            this.reasonChang(arrS.id)
            }
        }
     }else{
      if(this.isbtd == 1 && this.buslist[0].reason){
          this.reson = this.buslist[0].reasonid
          this.resonText =this.buslist[0].reason
      }else{
        if(arrS){
          this.reasonChang(arrS.id)
        }
      }
     }

  },
  methods: {
    // 成本中心展示状态
    isShowStatus() {
      /*
        this.trainslis.ranst.isbtd = 1  因公  
        !this.trainslis.isarsrl 非免审 
        this.trainslis.ranst.isblcks 1事前2事中 3事前违规在次 4改签 
        this.RuleMas 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
        this.isblckt 事前是否需要二次审批
   */
      // console.log("1事前2事中 3事前违规在次 4改签", this.trainslis.ranst.isblcks);
      // console.log("事前是否需要二次审批", this.isblckt);
      // console.log("火车票改签需要审批",this.RuleMas)
      // console.log("因公因私",this.trainslis.ranst.isbtd)
      // console.log("免审111",this.trainslis.isarsrl)
      // console.log("免审总开关",this.metarule)
      // console.log("this.isShowChengben",this.isShowChengben)
      // console.log("this.butalist[0].reason",this.butalist[0].reason)
			if (this.trainslis.ranst.isblcks == 1 ) {
				this.NameCenter = {
					name: this.trainslis.ranst.mokksli.costName,
					id: this.trainslis.ranst.mokksli.costId,
        };
      
				// 成本中心二次审批 成本中心参数值回填
				// this.selectedOptions3 = [this.trainslis.ranst.mokksli.costId];
      if(this.isblckt){
        this.appswlist();
      }
			}
      if (this.trainslis.ranst.isbtd == 1 && this.trainslis.isarsrl == false) {
        if (
          this.trainslis.ranst.isblcks == 2 ||
          (this.trainslis.ranst.isblcks == 4 &&
            (this.RuleMas || this.isblckt)) ||
          (this.trainslis.ranst.isblcks == 1) || this.isbtd == 1
        ) {
          this.isShowChengben = true;
          this.reson =
            this.isblckt && this.trainslis.ranst.isblcks == 1
              ? this.buslist[0].resonid
              : "";
            if(this.reson && this.reson != this.buslist[0].resonid){
             
               this.reasonChang(this.reson)
            } else{
              this.reson = ''
            }
        }
      }
    },
    async getTravelPolicyst() {
      try {
        const res = await this.$api.order.getTravelPolicy(); //保险规则判断
        if (res.code == 200) {
          this.getTravelPolicys = res.data;
        } else {
          that.$message({
            message: res.message,
            type: "warning",
          });
        }
      } catch (e) {
        //TODO handle the exception
        console.log(e);
      }
    },
    // 切换保险
    chineseChange(id) {
      if(!id) return
      var arr = this.insurances.filter((item) => item.id == id);
      this.insCode = arr[0].insuranceNo;
      this.insurancesData = arr[0];
      // domesticInsuranceTips  1代表买保险收服务费，0代表不收
      // this.Brokerage = this.getTravelPolicys && this.getTravelPolicys.domesticInsuranceTips == 0 ? 0 : this.Brokerage
      // 展示默认保险
      if (arr != undefined && arr.length > 0) {
        this.allIsGift = arr[0].isGift == 1 ? true : false;
        this.insurance = arr[0].isGift == 1 ? 0 : arr[0].buyPrice;
      }
      if (this.isbtd == 1) {
        this.onprice =
          this.trainslis.astlis.price * this.buslist.length +
          this.Brokerage * this.buslist.length +
          this.insurance * this.buslist.length;
      } else {
        this.onprice =
          this.trainslis.astlis.price * this.passengers.length +
          this.Brokerage * this.passengers.length +
          this.insurance * this.passengers.length;
      }
    },
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
      if (sst == "G" || sst == "C" || (sst == "D" && userlen != null)) {
        this.allseat = true;
        if (slv == "二等座") {
          if (this.secseat) {
            this.seat.push(
              {
                id: "1",
                value: "1A",
                name: "A",
              },
              {
                id: "2",
                value: "1B",
                name: "B",
              },
              {
                id: "3",
                value: "1C",
                name: "C",
              },
              {
                id: "4",
                value: "1D",
                name: "D",
              },
              {
                id: "5",
                value: "1F",
                name: "F",
              }
            );

            this.seats.push(
              {
                id: "6",
                value: "2A",
                name: "A",
              },
              {
                id: "7",
                value: "2B",
                name: "B",
              },
              {
                id: "8",
                value: "2C",
                name: "C",
              },
              {
                id: "9",
                value: "2D",
                name: "D",
              },
              {
                id: "10",
                value: "2F",
                name: "F",
              }
            );
          } else {
            this.seat.push(
              {
                id: "1",
                value: "1A",
                name: "A",
              },
              {
                id: "2",
                value: "1B",
                name: "B",
              },
              {
                id: "3",
                value: "1C",
                name: "C",
              },
              {
                id: "4",
                value: "1D",
                name: "D",
              },
              {
                id: "5",
                value: "1F",
                name: "F",
              }
            );
          }
        } else if (slv == "一等座") {
          if (this.secseat) {
            this.seat.push(
              {
                id: "1",
                value: "1A",
                name: "A",
              },
              {
                id: "2",
                value: "1C",
                name: "C",
              },
              {
                id: "3",
                value: "1D",
                name: "D",
              },
              {
                id: "4",
                value: "1F",
                name: "F",
              }
            );
            this.seats.push(
              {
                id: "5",
                value: "2A",
                name: "A",
              },
              {
                id: "6",
                value: "2C",
                name: "C",
              },
              {
                id: "7",
                value: "2D",
                name: "D",
              },
              {
                id: "8",
                value: "2F",
                name: "F",
              }
            );
          } else {
            this.seat.push(
              {
                id: "1",
                value: "1A",
                name: "A",
              },
              {
                id: "2",
                value: "1C",
                name: "C",
              },
              {
                id: "3",
                value: "1D",
                name: "D",
              },
              {
                id: "4",
                value: "1F",
                name: "F",
              }
            );
          }
        } else if (slv == "商务座") {
          if (this.secseat) {
            this.seat.push(
              {
                id: "1",
                value: "1A",
                name: "A",
              },
              {
                id: "2",
                value: "1C",
                name: "C",
              },
              {
                id: "3",
                value: "1F",
                name: "F",
              }
            );
            this.seats.push(
              {
                id: "4",
                value: "2A",
                name: "A",
              },
              {
                id: "5",
                value: "2C",
                name: "C",
              },
              {
                side: "side",
                id: "6",
                value: "2F",
                name: "F",
              }
            );
          } else {
            this.seat.push(
              {
                id: "1",
                value: "1A",
                name: "A",
              },
              {
                id: "2",
                value: "1C",
                name: "C",
              },
              {
                id: "3",
                value: "1F",
                name: "F",
              }
            );
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
      let index = "";
      if (_this.pick.length > 0) {
        for (let i = 0; i < _this.pick.length; i++) {
          if (item.id == _this.pick[i].id) {
            boolean = true;
            index = i;
          }
        }
        if (boolean) {
          this.pick.splice(index, 1);
          this.picklist.splice(index, 1);
          return;
        } else {
          if (_this.pick.length == this.userlists.length) {
            if (this.userlists.length == 1) {
              _this.pick = [];
              _this.picklist = [];
              _this.pick.push({
                id: item.id,
              });
              _this.picklist.push({
                item,
              });
            } else {
              this.$message({
                message: "只能选择" + this.userlists.length + "张座位",
                type: "warning",
              });
            }
          } else {
            _this.pick.push({
              id: item.id,
            });
            _this.picklist.push({
              item,
            });
            return;
          }
        }
      } else {
        this.pick.push({
          id: item.id,
        });
        this.picklist.push({
          item,
        });
      }
    },

    async uprean() {
      if(this.resonText){
        this.reson = this.reasonData.find(item=>item.reason ==  this.resonText).id
      }
      if (this.loadingBot) return;
      //申请改签
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
      let msgErr = this.msgErr; //成本中心校验是否通过
      if (JSON.stringify(that.trainslis.nativeTrainRules) == "{}") {
        ists = 0;
        invs = "";
      } else {
        invs = JSON.stringify({
          information: [
            {
              nativeTrainRules: that.trainslis.nativeTrainRules,
            },
          ],
        });
        ists = 1;
      }
      // if (NameCenter.id == '' && isbtd == 1 && that.trainslis.isarsrl == false) {
      //   this.$message({
      //     message: '请选择成本中心！',
      //     type: 'warning'
      //   })
      //   return
      // }
      // if (TravelCostCenlist.length == 0 && isbtd == 1 && that.trainslis.isarsrl == false && this.CostCi == true) {
      //   this.$message({
      //     message: '请选择成本审批人！',
      //     type: 'warning'
      //   })
      //   return
      // }
      // if (TravelDepartlist.length == 0 && isbtd == 1 && that.trainslis.isarsrl == false && this.CostCis == true) {
      //   this.$message({
      //     message: '请选择部门审批人！',
      //     type: 'warning'
      //   })
      //   return
      // }
      if (this.isShowChengben == true) {
        if (
          NameCenter.id == ""
          // &&
          // !this.trainslis.isarsrl &&
          // this.isShowChengben
        ) {
          that.$message({
            message: "请选择成本中心",
            type: "warning",
          });
          return;
        }
        if (
          TravelCostCenlist.length == 0 &&
          this.CostCi == true
          //  &&
          // !this.trainslis.isarsrl
        ) {
          that.$message({
            message: "请选择成本审批人",
            type: "warning",
          });
          return;
        }
        if (
          TravelDepartlist.length == 0 &&
          this.CostCis == true
          //  &&
          // !this.trainslis.isarsrl
        ) {
          that.$message({
            message: "请选择部门审批人",
            type: "warning",
          });
          return;
        }
        if (that.isGetStaffList == true) {
          //除了免审 其他必须有审批流程
          that.$message({
            message: "未配置审批流程，请联系管理员设置！",
            type: "warning",
          });
          return;
        }
      }
        if (
        that.isbtd==1 && that.reson == "" 
          //  &&
          // that.trainslis.ranst.isbtd == 1 &&
          // this.isblckt
        ) {
          this.$message({
            message: "请输入出行事由！",
            type: "warning",
          });
          return;
        }
      if (user_name == "") {
        this.$message({
          message: "请输入联系人！",
          type: "warning",
        });
        return;
      }
      if (user_ipone == "" || !ip_test.test(user_ipone)) {
        this.$message({
          message: "请输入正确的联系电话！",
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

      for (var i = 0; i < TravelCostCenlist.length; i++) {
        //成本中心审批人
        apprvTaskStaffts.push({
          deptCost: 2,
          nodeId: TravelCostCenlist[i].nodeId,
          personId: TravelCostCenlist[i].personId,
          staffId: TravelCostCenlist[i].staffId,
          staffName: TravelCostCenlist[i].staffName,
        });
      }
      for (var i = 0; i < TravelDepartlist.length; i++) {
        //部门审批人
        apprvTaskStaffts.push({
          deptCost: 1,
          nodeId: TravelDepartlist[i].nodeId,
          personId: TravelDepartlist[i].personId,
          staffId: TravelDepartlist[i].staffId,
          staffName: TravelDepartlist[i].staffName,
        });
      }
      let dat = {};
      let inst = "";
      if (this.isblckt == true) {
        //是否超规审批 或者事前需要审批
        inst = this.sttos;
      } else {
        inst = isblcks;
      }
      if (
        that.RuleMas == true &&
        that.trainslis.isarsrl == false &&
        isbtd == 1
      ) {
        //是否免审
        dat = {
          trainBook: {
            travelTypeorth: isbtd, //因公1 因私2
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
              taskType: inst, //1为事前2为事中，4为改签
              beforeMiddle: 2, //1为事前2为事中
              reasonId: this.reson, //理由
              reason:this.resonText,
              apprvTaskStaffs: apprvTaskStaffts, //审批人信息
              costId: NameCenter.id, //成本中心id
              costName: NameCenter.name, //成本中心名称
              examinePattern: that.RuleMa,
            },
          },
          saleOrderNo: that.trainslis.ranst.saleOrderNo,
          passengerNos: that.trainslis.ranst.passengerNos.join(";"),
        };
      } else {
        dat = {
          trainBook: {
            travelTypeorth: isbtd, //因公1 因私2
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
              reasonId: this.reson, //理由
              reason:this.resonText,
              examinePattern: that.RuleMa,
            },
          },
          saleOrderNo: that.trainslis.ranst.saleOrderNo,
          passengerNos: that.trainslis.ranst.passengerNos.join(";"),
        };
      }
      this.loadingBot = true;
      try {
        const res = await this.$api.home.applyChangeTrain(dat);
        if (res.code == "200") {
          if (res.data.msgCode == "100") {
            this.$message({
              message: "申请改签成功!",
              type: "success",
            });
            this.$router.push({
              path: "myorder",
            });
          } else {
            this.$message({
              message: res.message,
              type: "warning",
            });
          }
        } else {
          this.$message({
            message: res.message,
            type: "warning",
          });
        }
        this.loadingBot = false;
      } catch (e) {
        console.log(e);
        this.loadingBot = false;
      }
      this.loading = false;
    },
    // 判断用户证件是否是身份证
    intendedClick(){
        var flag =  this.userlists.find(item => item.cardType != 'NI')
        if(flag){
          this.dialogVisibleId = true
        }else{
          this.okadd()
        }
    },
    //提交订单
    async okadd() {
      this.dialogVisibleId = false
      if(this.resonText){
        var res = ''
        res = this.reasonData.find(item=>item.reason ==  this.resonText)
         this.reson =res? res.id : this.buslist[0].resonid
      }
      if (this.loadingBot) return;
      let that = this;
      let picklist = this.picklist; //选座
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
      let msgErr = this.msgErr; //成本中心校验是否通过
      // if (
      //   (sst == "G" || sst == "C" || (sst == "D" && slv != "动卧")) &&
      //   slv != "无座"
      // ) {
      //   if (picklist.length < this.userlists.length) {
      //     that.$message({
      //       message: "请选座",
      //       type: "warning",
      //     });
      //     return;
      //   }
      // }
      // if (NameCenter.id == '' && isblcks == 2 && isbtd == 1 && that.trainslis.isarsrl == false) {
      //   that.$message({
      //     message: '请选择成本中心',
      //     type: 'warning'
      //   });
      //   return
      // }
      // if (TravelCostCenlist.length == 0 && isbtd == 1 && that.trainslis.isarsrl == false && this.CostCi == true) {
      //   that.$message({
      //     message: '请选择成本审批人',
      //     type: 'warning'
      //   });
      //   return
      // }
      // if (TravelDepartlist.length == 0 && isbtd == 1 && that.trainslis.isarsrl == false && this.CostCis == true) {
      //   that.$message({
      //     message: '请选择部门审批人',
      //     type: 'warning'
      //   });
      //   return
      // }
      if (this.isShowChengben == true) {
        //需要审批时走以下判断
        //有审批信息
        if (NameCenter.id == "") {
          that.$message({
            message: "请选择成本中心",
            type: "warning",
          });
          return;
        }
        if (TravelCostCenlist.length == 0 && this.CostCi == true) {
          that.$message({
            message: "请选择成本审批人",
            type: "warning",
          });
          return;
        }
        if (TravelDepartlist.length == 0 && this.CostCis == true) {
          that.$message({
            message: "请选择部门审批人",
            type: "warning",
          });
          return;
        }
        if (that.isGetStaffList == true) {
          //除了免审 其他必须有审批流程
          that.$message({
            message: "未配置审批流程，请联系管理员设置！",
            type: "warning",
          });
          return;
        }
        // if (that.reson == '' && that.trainslis.ranst.isbtd == 1) {
      }
        if (
         that.isbtd==1 && that.reson == ""
          //  &&
          // this.trainslis.ranst.isbtd == 1 &&
          // this.isblckt
        ) {
          that.$message({
            message: "请输入出行事由",
            type: "warning",
          });
          return;
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
      if (isbtd == 2 && this.passengers.length == 0) {
        that.$message.warning("请选择乘车人！");
        return;
      }
      if (msgErr) {
        that.$message({
          message: msgErr,
          type: "warning",
        });
        return;
      }
      let getTravelPolicys = that.getTravelPolicys; //保险规则判断是否要选择保险
      if (getTravelPolicys != null && isbtd == 1) {
        if (getTravelPolicys.trainInsuranceProduct == 1) {
          //1必选，0非必选
          if (this.insCode == "" && isblcks != 4) {
            that.$message({
              message: "请选择一个保险",
              type: "warning",
            });
            return;
          }
        }
      }
      //座位排序
      let seatNos = [];
      for (let i = 0; i < this.picklist.length; i++) {
        seatNos.push(this.picklist[i].item.value);
      }
      seatNos.sort();
      let seatNo = "";
      let len = seatNos.length;
      for (let i = 0; i < len; i++) {
        seatNo += seatNos[i];
      }
      let usersalist = [];
      let insurances = this.insurances;
      let profitPrice = this.profitPrice;
          

      let ists = 0;
      for (let i = 0; i < userlists.length; i++) {
        if(!userlists[i].certificateList[0].cardNo){
            that.$message({
              message: "请添加证件",
              type: "warning",
            });
            return;
        }
        //出行人信息
        usersalist.push({
          // cardNo:isbtd == 1 ?  userlists[i].cardNo : this.passengers[i].cardNo ,
          // cardType: isbtd == 1 ? userlists[i].cardType : this.passengers[i].cardType ,
          gender: userlists[i].gender,
          name: userlists[i].name,
          passengerBirth: userlists[i].birthdate,
          phone: userlists[i].phone,
          deptName: userlists[i].deptName,
          costcenterName:
            isbtd == 1
              ? this.trainslis.ranst.butalist[i].costcenterName
              : this.passengers[i].costcenterName,
          passengerNo: userlists[i].passengerNo,
          employeeType: userlists[i].employeeType,
          passengerType: 1,
        });
      if(isbtd == 1){
        usersalist[i]['cardNo'] = userlists[i].cardNo 
        usersalist[i]['cardType'] = userlists[i].cardType 
      }else{
        for (let k = 0; k < this.passengers.length; k++) {
          if(userlists[i].id == this.passengers[k].userId){
            usersalist[i]['cardNo'] = this.passengers[k].cardNo 
            usersalist[i]['cardType'] = this.passengers[k].cardType 
          }
        }
      }
      }
      let dat = {};
      if (
        (isblcks == 2 && isbtd == 1 && this.trainslis.isarsrl == false) ||
        (isblcks == 1 &&
          isbtd == 1 &&
          this.trainslis.isarsrl == false &&
          this.isblckt == true) ||
        isblcks == 3
      ) {
        for (var i = 0; i < TravelCostCenlist.length; i++) {
          //成本中心审批人
          apprvTaskStaffts.push({
            deptCost: 2,
            nodeId: TravelCostCenlist[i].nodeId,
            personId: TravelCostCenlist[i].personId,
            staffId: TravelCostCenlist[i].staffId,
            staffName: TravelCostCenlist[i].staffName,
          });
        }
        for (var i = 0; i < TravelDepartlist.length; i++) {
          //部门审批人
          apprvTaskStaffts.push({
            deptCost: 1,
            nodeId: TravelDepartlist[i].nodeId,
            personId: TravelDepartlist[i].personId,
            staffId: TravelDepartlist[i].staffId,
            staffName: TravelDepartlist[i].staffName,
          });
        }
        let invs = "";
        if (JSON.stringify(this.trainslis.nativeTrainRules) == "{}") {
          ists = 0;
          invs = "";
        } else {
          invs = JSON.stringify({
            information: [
              {
                nativeTrainRules: this.trainslis.nativeTrainRules,
              },
            ],
          });
          ists = 1;
        }
        let inst = 0; //1事前审批 2事中审批  3超标审批 4改签审批
        if (this.isblckt == true) {
          //是否超规审批 或者事前需要审批
          inst = this.sttos;
        } else {
          inst = isblcks;
        }

					dat = {
						apprvTasks: {
							remark: invs,
							taskType : inst, //1事前2事中3违规4改签5退票，
							beforeMiddle: isblcks, //1事前2事中
              reasonId: this.reson, //理由
              reason:this.resonText,
							apprvTaskStaffs: apprvTaskStaffts, //审批人信息
							costId: NameCenter.id, //成本中心id
							costName: NameCenter.name, //成本中心名称
							travelNo: this.trainslis.ranst.isblcks == 1 ?
								this.trainslis.ranst.mokksli.travelNo :
								"", //出差单号
						},
						insPrice: that.insurance,
						insCode: that.insCode,
						trainPassengerList: usersalist, //出行人信息
						person: user_name, //联系人
						cellphone: user_ipone, //联系电话
						email: "", //邮箱
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
						seatNo: seatNo, //座位
					};
				} else if (
					isblcks == 1 && // 事前
					isbtd == 1 // 因公
					&&
					(this.trainslis.isarsrl == true || this.isblckt == false) // 免审
				) {
					dat = {
						apprvTasks: {
							taskType: isblcks, //1为事前2为事中，
							beforeMiddle: 1, //1为事前2为事中
							costId: this.trainslis.ranst.mokksli.costId, //成本中心id
							costName: this.trainslis.ranst.mokksli.costName, //成本中心名称
							travelNo: this.trainslis.ranst.mokksli.travelNo, //出差单号
							vehicleId: this.buslist[0].vehicleId,
              reasonId: this.reson, //理由
              reason:this.resonText,
						},
						insPrice: that.insurance,
						insCode: that.insCode,
						trainPassengerList: usersalist, //出行人信息
						person: user_name, //联系人
						cellphone: user_ipone, //联系电话
						email: "", //邮箱
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
						illegal: "", //违规信息
						seatNo: seatNo, //座位
					};
				} else if (isbtd == 2 || (isbtd == 1 && that.trainslis.isarsrl == true)) {
					dat = {
						apprvTasks: {
							taskType: isblcks, //1为事前2为事中，
							beforeMiddle: 2, //1为事前2为事中
						},
						insPrice: that.insurance,
						insCode: that.insCode,
						trainPassengerList: usersalist, //出行人信息
						person: user_name, //联系人
						cellphone: user_ipone, //联系电话
						email: "", //邮箱
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
						illegal: "", //违规信息
						seatNo: seatNo, //座位
					};
          if(isbtd == 1){
            dat.apprvTasks["reasonId"] =this.reson // 理由id
            dat.apprvTasks["reason"] =this.resonText // 理由
          }
				}
        dat["sfjswz"] = this.value3 == true ? '0' : '1',// 判断是否接受无座
        dat["zxbs"] = this.dataList.seatType, // 座位类型
				this.loadingBot = true;
				try {
					const res = await that.$api.home.bookTrain(dat); //预定订单

        if (res.code == 200) {
           
          that.$message({
            message: "创建订单成功",

            type: "success",
          });
          if (isbtd == 2) {
            this.$router.push({
              path: "traindefray",
              query: {
                data: res.data,
              },
            });
          } else {
            this.$router.push({
              path: "trainorderlist",
              query: {
                data: res.data,
              },
            });
          }
        } else {
          that.$message({
            message: res.message,
            type: "warning",
          });
        }
        this.loadingBot = false;
      } catch (e) {
        this.loadingBot = false;
        console.log(e);
      }
    },
    getRuleMainSetting() {
      //查询当前用户改签是否需要审核 和 事前是否二次过审
      this.loading = true;
      this.$api.home
        .ruleMainSetting()
        .then((res) => {
          this.loading = false;
          if (this.trainslis.ranst.isblcks == 4) {
            this.RuleMa = res.data.examinePattern; //改签是否需要审核
            let stw = this.RuleMa.split(",");
            for (let i in stw) {
              /**
               * 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
               */
              if (stw[i] == 5) {
                this.RuleMas = true;
              }
            }
            this.isShowStatus();
          } else if (this.trainslis.ranst.isblcks == 1) {
            // 事前
            let stw = res.data.examineSwitch.split(",");
            this.isblckt = this.trainslis.isblckt; //事前是否需要二次审批
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
    retime(item) {
      //时间
      return item.substring(5, 7) + "月" + item.substring(8, 11) + "日";
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
    async getBrokerage() {
      //火车票单人手续费
      this.$api.home
        .getContactInfo()
        .then((rt) => {
          if (rt.code == 200) {
            this.lname = rt.data.name;
            this.lipone = rt.data.phone;
          }
        })
        .catch((e) => {
          console.log(e);
        });
      try {
        const res = await this.$api.home.getBrokerage();
        if (res.code == 200) {
          this.Brokerage =
            this.trainslis.ranst.isblcks == 4
              ? res.data.ticketChange
              : res.data.trainBooking;
          this.insurances = res.data.insurances;
          for (let k = 0; k < this.insurances.length; k++) {
            // 赠险判断 保险价格为0
            if (this.insurances[k].isDefault) {
              this.profitPrice = this.insurances[k].name;
              this.insCode =
                this.trainslis.ranst.isblcks == 4
                  ? ""
                  : this.insurances[k].insuranceNo;
              this.insurance =
                this.trainslis.ranst.isblcks == 4
                  ? 0
                  : this.insurances[k].profitPrice;
                  this.insurancesData = this.insurances[k]
            }
          }
          if (this.isbtd == 1) {
            this.onprice =
              this.trainslis.astlis.price * this.buslist.length +
              this.Brokerage * this.buslist.length +
              this.insurance * this.buslist.length;
          } else {
            this.onprice =
              this.trainslis.astlis.price * this.passengers.length +
              this.Brokerage * this.passengers.length +
              this.insurance * this.passengers.length;
          }
        } else {
          this.$message({
            message: res.message,
            type: "warning",
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    handleChange(value) {
      //选择成本中心

      // let nodesObj = this.$refs['cascader'].getCheckedNodes(); //获取当前节点的信息
      if (value) {
        // 点击切换的时候替换选中的值
        this.NameCenter.name = this.treeLists.find(
          (item) => item.id == value[0]
        ).text;
        this.NameCenter.id = value[value.length - 1];
        this.appswlist(); //重新获取部门和成本中心审批人
      }
      this.TravelCostCenlist = [];
      this.TravelDepartlist = [];
    },
    async appswlist() {
      //选获取部门和成本审批人信息
      let that = this;
      let nuarry = [];
      if (that.trainslis.ranst.isblcks == 4) {
        nuarry = that.trainslis.ranst.userlistnos;
      } else {
        let nus = that.buslist; //出差人的集合
        for (var i = 0; i < nus.length; i++) {
          nuarry.push(nus[i].passengerNo); //获取出行人员id
        }
      }
      // that.loading = true;
      let res;
      if (!this.trainslis.isarsrl) {
        try {
          // if (that.trainslis.ranst.isblcks == 4) {
          res = await that.$api.home.getStaffList({
            costId: that.NameCenter.id,
            passengerNos: nuarry,
            applyType:
              that.isblckt == true ? that.sttos : that.trainslis.ranst.isblcks,
          });
          // }
          //  else {
          //   res = await that.$api.home.getStaffList({
          //     costId: that.NameCenter.id,
          //     passengerNos: nuarry,
          //     applyType: 1
          //   });
          // }
          // that.loading = false;
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
            that.isGetStaffList = false;
          } else {
            that.isGetStaffList = true; //是否无审批流
            this.msgErr = res.message ? res.message : "系统错误";
          }
        } catch (e) {
          console.log(e);
          this.msgErr = "系统错误";
          // that.loading = false;
        }
      }
    },
    // dep(node , id){
    //    console.log("222222222",id)
    //       // console.log("node---------",node)
    //     for (let k = 0; k < node.length; k++) {
    //         if(node[k].id == id) {
    //           console.log("node[k]---------",node[k])
    //           return
    //           }
    //       if(node[k].children != null && node[k].children.length > 0){

    //          for (let i = 0; i < node[k].children.length; i++) {
    //           var val = this.dep(node[k], id)

    //           console.log("1111111111111111111111111" , node[k].children[i])
    //         if(val) {
    //           console.log("val----",val)
    //           return
    //         }
    //       }
    //       }

    //     }
    // },
    // dep(id,list = [], num = 0, ids = []) { //成本中心
    // 	list.forEach(item => {
    // 		this.ArrayList.push({
    // 			id: item.id,
    // 			name: item.text,
    // 			ids, // 父级id数组
    // 			num, // 层级
    // 		});
    // 		if (item.children != null && item.children.length > 0) {
    // 			let idArr = [...ids];
    // 			idArr.push(item.id);
    // 			this.dep(id,item.children, num + 1, idArr);
    // 		} else{
    // 			this.ArrayList[this.ArrayList.length-1].lastRank = true;
    // 		}
    // 	});
    //   // 回填成本中心
    //   for (let i = 0; i < this.ArrayList.length; i++) {
    //       if(this.ArrayList[i].id ==id[0]){
    //         console.log(this.ArrayList[i])
    //         this.selectedOptions3 = [...this.ArrayList[i].ids,this.ArrayList[i].id]
    //       }
    //   }
    // },
    selts() {
      //查询成本中心
      let _this = this;
      _this.loading = true;
      _this.$api.home
        .getCostCenterList()
        .then((res) => {
          _this.loading = false;
          if (res.code == 200) {
            _this.treeLists = res.data[0].children;
            if (this.trainslis.ranst.isblcks == 1) {
              // 成本中心二次审批 成本中心参数值回填
              this.selectedOptions3 = selectedOptions(
                [this.trainslis.ranst.mokksli.costId],
                res.data[0].children
              );
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
    userlist() {
      let that = this;
      let st = [];
      let isbtd = this.isbtd;
      that.userlists = [];
      that.selts();
      if (this.trainslis.ranst.isblcks == 4) {
        //改签状态下不能修改乘客证件
        for (let i = 0; i < this.trainslis.ranst.butalist.length; i++) {
          this.userlists.push({
            name: this.trainslis.ranst.butalist[i].name,
            certType: this.trainslis.ranst.butalist[i].certType,
            certNo: this.trainslis.ranst.butalist[i].certNo,
          });
        }
        // this.getRuleMainSetting();
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
          .then((res) => {
            that.loading = false;
            if (res.code == 200) {
              that.carld = res.data.cardTypeList; //证件类型
              that.userlists = res.data.passList; //用户信息
              if (res.data.passList != null) {
                for (let i = 0; i < that.userlists.length; i++) {
                  for (
                    let k = 0;
                    k < that.userlists[i].certificateList.length;
                    k++
                  ) {
                    that.userlists[i].certificateList[k][
                      "cardTypename"
                    ] = that.caname(
                      that.userlists[i].certificateList[k].cardType
                    );
                    if(that.userlists[i].certificateList[k].firstName && that.userlists[i].certificateList[k].lastName){
                      that.userlists[i].certificateList[k]['name'] = that.userlists[i].certificateList[k].firstName + that.userlists[i].certificateList[k].lastName
                    }else{
                       that.userlists[i].certificateList[k]['name'] =that.userlists[i].name
                    }
                  }
                }    
                  this.init(that.userlists)
                this.seats = [];
                this.seat = [];
                this.showseat(); //显示选座
              }
              

            }
          })
          .catch((e) => {
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
    },
    // 清除保险后，保险价格清0,总计去掉保险价格,保险insCODE字段清空
    clearVal() {
      this.insurance = 0;
      if (this.isbtd == 1) {
        this.onprice =
          this.trainslis.astlis.price * this.buslist.length +
          this.Brokerage * this.buslist.length;
      } else {
        this.onprice =
          this.trainslis.astlis.price * this.passengers.length +
          this.Brokerage * this.passengers.length;
      }

      this.insCode = "";
      this.insurancesData = {};
    },
    // 出差事由
    reasonChang(val){
      this.resonText = this.reasonData.find(item=>item.id == val).reason
      this.reson = this.reasonData.find(item=>item.id == val).id
   },
    init(userli){
      var car = ''
      var val = ''
      var valFlag = ''
      for (let i = 0; i < userli.length; i++) {
        // var pass = userli[i]
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
      this.userlists = userli;
    },
      // 切换证件信息  并且改变数据里面的值
    certifChang(value){
        for (let i = 0; i < this.userlists.length; i++) {
          for (let k = 0; k < this.userlists[i].certificateList.length; k++) {
            if( this.userlists[i].certificateList[k].id == value){
                      this.userlists[i].cardNo = this.userlists[i].certificateList[k].cardNo
                      this.userlists[i].cardType = this.userlists[i].certificateList[k].cardType
            }
          }
      }
      this.$forceUpdate()
    },

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
    .ditrslists:nth-child(1) {
      margin-bottom: 10px;
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
      width: 763px;
      box-sizing: border-box;
      .trstp {
        background: #ffffff;
        padding: 10px;
        box-sizing: border-box;
        min-height: 211px;
        .titleClass{
          color:#ff6600 ;
          padding: 0 36px;
        }
        .tr_ult {
          margin-top: 10px;
        }

        .tr_ul {
          width: 100%;
          box-sizing: border-box;
          line-height: 40px;
          margin-bottom: 20px;
          display: flex;

          .tr_uleft {
            min-width: 100px;
            text-align: center;
            line-height: 40px;
            font-weight: bold;
            color: #333333;
            font-size: 14px;
          }

          .tr_right {
            overflow: hidden;
            display: flex;
            flex-wrap: wrap;

            .tr_rs {
              cursor: pointer;
              padding: 0 30px 0 0;
              color: #333333;
              line-height: 44px;
              display: flex;
              font-size: 14px;

              .tr_rtp {
                text-align: center;
              }

              .tr_rights_uCardNo {
                display: flex;
                .s-color {
                  color: #dcdfe6;
                  padding:0 10px ;
                }
              }
            }
            .tr_rights_chang{
                width: max-content;
                padding: 0 10px;
                background: #f5f7fa;
            }
          }

          .tr_rights {
            width: calc(100% - 100px);
            display: flex;
            box-sizing: border-box;
            position: relative;
            .tr_rights_bor {
              display: flex;
              box-sizing: border-box;
              position: relative;
            }
            .tr_rights_bor_data {
              display: flex;
              ._bor_data_brief {
                font-size: 12px;
                color: #666;
                display: flex;
                & > span:nth-child(2) {
                  margin: 0 10px;
                }
                .amount {
                  color: #ff6600;
                }
              }
              ._bor_data_clause {
                font-size: 12px;
                color: #666;
                margin-left: 30px;
                cursor: pointer;
                &>span{
                  color:#409eff ;
                }
              }
            }
            .tr_insurnce {
              align-items: center;
              color: #ff6600;
              margin-left: 10px;
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
            // .disNone {
            //   width: 200px;
            //   height: 40px;
            //   position: absolute;
            //   z-index: 1;
            //   left: 0;
            //   top: 0;
            //   background: rgba(0, 0, 0, 0.03);
            // }
          }
          .bor_data {
            display: flex;
            flex-direction: column;
          }
        }
      }

      .trsbt {
        box-sizing: border-box;
        margin-bottom: 10px;
        padding: 20px 28px 26px 28px;
        background: #ffffff;

        .trsbord {
          .tr_list {
            color: #333333;
            line-height: 18px;
            align-items: center;
            font-size: 14px;
            display: flex;
            .trainlis {
              width: 260px;
              margin-left: 18px;
              span:nth-child(2) {
                margin-left: 10px;
              }
              span:nth-child(3) {
                margin-left: 15px;
              }
            }
          }
          .tsfons {
            margin-top: 10px;
            font-size: 15px;
            color: #999999;
            line-height: 30px;
          }

          .tsbods {
            width: 708px;
            box-sizing: border-box;
            background: #eef5ff;
            align-items: center;
            box-sizing: border-box;
            height: 105px;
            display: flex;

            .trainsc_s {
              padding-left: 81px;
              padding-right: 134px;
              display: flex;
              align-items: center;

              .trainsc_s_l {
                color: #333333;

                .trainsc_s_l_t {
                  margin-top: 16px;
                  line-height: 22px;
                  font-size: 22px;
                  font-weight: Bold;
                }
                .trainsc_sta {
                  text-align: right;
                }

                .trainsc_s_l_b {
                  line-height: 16px;
                  font-size: 16px;
                }
              }

              .trainsc_s_s {
                width: 163px;
                color: #d2dde7;
                align-items: center;
                margin-left: 43px;
                margin-right: 39px;
                font-size: 14px;
                display: flex;

                .times {
                  margin: 0 10px;
                  color: #666666;
                  font-size: 14px;
                }

                .trainsc_h {
                  width: 40px;
                  height: 1px;
                  background: #bad0e9;
                }
              }
            }

            .tright {
              display: flex;
              align-items: center;
              justify-content: center;

              p {
                font-size: 24px;
                color: #ff6600;
              }
            }
          }
          .without{
            margin: 20px 0 0 10px;
          }
          .cseat {
            width: 100%;
            margin: 10px 0 47px 0;

            .seat_a {
              flex-wrap: wrap;
              height: 80px;
              line-height: 80px;
              font-size: 15px;
              background: #ffffff;

              .seat_display {
                display: flex;
              }

              .seat_fo {
                width: 10%;
                text-align: center;
                color: #333333;
              }

              .seat_le {
                display: flex;
                display: -webkit-flex;
                height: 80px;
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
                  background-image: url("../../../../static/image/zuowei.png");
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
            background-color: #ffffff;
          }

          ::-webkit-scrollbar-track {
            background-color: #ffffff;
          }
        }
      }
    }

    .trsright {
      width: calc(30% - 10px);
      height: 397px;
      margin-left: 10px;
      background: #ffffff;

      .trs_ticket {
        background: #cce7ff;

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
        color: #333333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #edf0f5;
      }

      .tslists {
        width: calc(100% - 80px);
        margin: 10px 40px;
        height: 50px;
        font-size: 22px;
        color: #333333;
        display: flex;
        justify-content: space-between;
        align-items: center;

        div:nth-child(1) {
          font-weight: 600;
          font-size: 20px;
        }
        div:nth-child(2) {
          font-weight: bold;
          font-size: 24px;
        }
      }

      .tsbtn {
        width: calc(100% - 80px);
        cursor: pointer;
        margin: 10px 40px;
        height: 50px;
        border-radius: 5px;
        text-align: center;
        line-height: 50px;
        color: #ffffff;
        background: #3c85fd;
      }
    }
  }
}
</style>
