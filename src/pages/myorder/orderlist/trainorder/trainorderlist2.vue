<template>
  <!-- 我的订单->火车票->详情页 -->
  <div
    class="trainorderlist"
    v-if="plsitsti.orderExt != null && plsitsti.orderExt != undefined"
  >
    <div class="trainorderboxs">
      <div class="trainorder_left">
        <img src="../../../../../static/image/left.png" alt="" />
        <div class="trainorder_order">
          <div>预订单号：{{ codes }}</div>
          <div v-if="headtravelNo">出差单号：{{ headtravelNo }}</div>
        </div>
        <img :src="orderStatus | orderStatusUrl" alt="" />
      </div>
      <div class="trainorder_right">
        下单时间：{{ plsitsti.orderExt.createTime }}
      </div>
    </div>
    <div class="trainorderContent">
      <div class="con_tran_box">
        <div class="con_tran">
          <div>
            <img src="../../../../../static/image/sqd_hc.png" alt="" />
          </div>
          <div>
            {{ plsitsti.saleOrderDetailList[0].departureTime }}
          </div>
        </div>
        <div class="con_city">
          <div>{{ plsitsti.saleOrderDetailList[0].fromstation }}</div>
          <div>
            <div class="order_time">
              {{ plsitsti.saleOrderDetailList[0].trainno }}
            </div>
          </div>
          <div>{{ plsitsti.saleOrderDetailList[0].tostation }}</div>
        </div>
      </div>
      <!-- 出行人 -->
      <div>
        <div class="orderDataTitle">出行人</div>
        <!-- 出行人列表 -->
        <div class="orderList">
          <div class="orderListBox">
            <div class="orderList_title" @click="allCheck(1, userlist)">
              <span>乘车人</span>
              <span>坐席</span>
              <span>证件</span>
              <span>出票号</span>
              <span>票面价格</span>
              <span>服务费</span>
              <span>保险</span>
              <span>保单号</span>
              <span>保单状态</span>
              <span>小计</span>
              <span>状态</span>
              <div class="allCheck">
                <div :class="{ flagTrue: flagAll }">
                  <i class="el-icon-check"></i>
                </div>
              </div>
            </div>
            <div
              class="orderList_title orderList_data"
              v-for="(item, index) in userlist"
              :key="index"
              @click="radioClick(item, index, 1, userlist)"
            >
              <span>
                <!-- 乘车人 -->
                <p :title="item.traPassenger.name">
                  {{ item.traPassenger.name }}
                </p>
                <p v-if="item.traPassenger.passengerType == 1">成人票</p>
                <p v-else-if="item.traPassenger.passengerType == 2">儿童票</p>
                <p v-else>婴儿票</p>
              </span>
              <!-- 坐席 -->
              <span :title="item.seatNo + ' ' + item.seatclass"
                >{{ item.seatNo }} {{ item.seatclass }}</span
              >
              <!-- 证件 -->
              <span :title="item.traPassenger.certNo"
                >{{ item.traPassenger.certType | catypeNum }}：{{
                  item.traPassenger.certNo
                }}</span
              >
              <!-- 出票号 -->
              <span :title="plsitsti.orderExt.ticketNo">{{
                plsitsti.orderExt.ticketNo
              }}</span>
              <!-- 票面价格 -->
              <span :title="item.salePrice">{{ item.salePrice }}元</span>
              <!-- 服务费 -->
              <span
                >{{
                  plsitsti.orderExt.saleOrderDetailList[0].serviceFee
                }}元</span
              >
              <!-- 保险 -->
              <span v-if="plsitsti.insOrders.length > 0">
                <p>{{ plsitsti.insOrders[0].insurance.name }}</p>
                <p>{{ plsitsti.insOrders[0].salePrice }}元</p>
                <!-- 保险价格字段 insSalePrice -->
              </span>
              <span v-else>/</span>
              <!-- 保单号 -->
              <span
                v-if="
                  plsitsti.insOrders.length > 0 &&
                  plsitsti.insOrders[0].saleOrderDetailList[index].policyNo
                "
                :title="
                  plsitsti.insOrders[0].saleOrderDetailList[index].policyNo
                "
                >{{
                  plsitsti.insOrders[0].saleOrderDetailList[index].policyNo
                }}</span
              >
              <span v-else>/</span>
              <!-- 保单状态 -->
              <span v-if="plsitsti.insOrders.length > 0">{{
                plsitsti.insOrders[0].saleOrderDetailList[index].status
                  | insOrdersStatus
              }}</span>
              <span v-else>/</span>
              <!-- 小计 -->
              <span
                v-if="plsitsti.insOrders.length > 0 &&
                  plsitsti.insOrders[0].saleOrderDetailList[index].status == 2
                "
                >{{
                  item.salePrice +
                  plsitsti.orderExt.saleOrderDetailList[0].serviceFee +
                  plsitsti.insOrders[0].salePrice
                }}元</span
              >
              <span v-else
                >{{
                  item.salePrice +
                  plsitsti.orderExt.saleOrderDetailList[0].serviceFee
                }}元</span
              >
              <span>
                <!-- <p>待支付</p>-->
                <p style="color: #00ac1c">{{ item.status | orderStatusId }}</p>
              </span>
              <div class="allCheck oneCheck">
                <div :class="{ flagTrue: item.flag }">
                  <i class="el-icon-check"></i>
                </div>
              </div>
              <!-- <div class="allCheck oneCheck" v-else>
                <div class="flagChang">
                  <i class="el-icon-check"></i>
                </div>
              </div> -->
            </div>
          </div>

          <div class="bottomS">
            <p
              v-if="plsitsti.insOrders.length > 0 && baoFlag"
              @click="updatas(4)"
            >
              退保
            </p>
            <p
              v-if="usersli && ists && rotes('tms:tra:refund:list')"
              @click="updatas(2)"
            >
              退票
            </p>
            <p
              v-if="usersli && isgs && rotes('tms:tra:change:list')"
              @click="updatas(1)"
            >
              改签
            </p>
          </div>
        </div>
        <!-- 改签信息 -->
        <div
          class="orderChang"
          v-if="
            plsitsti.traSaleChangeExtList!= undefined && plsitsti.traSaleChangeExtList.length > 0 &&
            plsitsti.traSaleChangeExtList[0].traSaleChangeDetailList.length > 0
          "
        >
          <span>改签成功</span>
          <div
            class="con_tran_box"
            v-for="(item, index) in plsitsti.traSaleChangeExtList"
            :key="index"
          >
            <div class="con_tran">
              <div>
                <img src="../../../../../static/image/sqd_hc.png" alt="" />
              </div>
              <div>
                {{ item.traSaleChangeDetailList[0].departTime }}
              </div>
            </div>
            <div class="con_city">
              <div>{{ item.traSaleChangeDetailList[0].changeFromStation }}</div>
              <div>
                <div class="order_time">
                  {{ item.traSaleChangeDetailList[0].changeTrainNo }}
                </div>
              </div>
              <div>{{ item.traSaleChangeDetailList[0].changeToStation }}</div>
            </div>
          </div>
          <div class="orderList">
            <div class="orderListBox">
              <div
                class="orderList_title"
                @click="allCheck(2, plsitsti.traSaleChangeExtList)"
              >
                <span>乘车人</span>
                <span>坐席</span>
                <span>证件</span>
                <span>出票号</span>
                <span>票面价格</span>
                <span>服务费</span>
                <span>保险</span>
                <span>保单号</span>
                <span>保单状态</span>
                <span>小计</span>
                <span>状态</span>
                <div class="allCheck">
                  <div :class="{ flagTrue: gqFlag }">
                    <i class="el-icon-check"></i>
                  </div>
                </div>
              </div>
              <div
                class="orderList_title orderList_data"
                v-for="(itemChang, index) in plsitsti.traSaleChangeExtList
                  "
                :key="index"
                @click="
                  radioClick(itemChang, index, 2, plsitsti.traSaleChangeExtList)
                "
              >
                <span>
                  <p :title="itemChang.traSaleChangeDetailList[0].passenagerName">
                    {{ itemChang.traSaleChangeDetailList[0].passenagerName }}
                  </p>
                  <p v-if="itemChang.traSaleChangeDetailList[0].passengerType == 1">成人票</p>
                  <p v-else-if="itemChang.traSaleChangeDetailList[0].passengerType == 2">儿童票</p>
                  <p v-else>婴儿票</p>
                </span>
                <span
                  >{{ itemChang.traSaleChangeDetailList[0].changeSeatClass }}
                  {{ itemChang.traSaleChangeDetailList[0].changeSeatType }}
                </span>
                <span :title="itemChang.traSaleChangeDetailList[0].certNo"
                  >{{ itemChang.traSaleChangeDetailList[0].certType | catypeNum }}：{{
                    itemChang.traSaleChangeDetailList[0].certNo
                  }}</span
                >
                <span :title="plsitsti.orderExt.ticketNo">{{
                  plsitsti.orderExt.ticketNo
                }}</span>
                <span :title="itemChang.traSaleChangeDetailList[0].changeOrderPrice"
                  >{{ itemChang.traSaleChangeDetailList[0].changeOrderPrice }}元</span
                >
                <span>{{ itemChang.traSaleChangeDetailList[0].serviceFee }}元</span>
                <span>
                  <p>{{ itemChang.insOrders.insurance.name }}</p>
                  <p>{{ itemChang.insOrders.salePrice }}</p>
                </span>
                <span
                  v-if="
                    itemChang.insOrders &&
                    itemChang.insOrders.saleOrderDetailList[0].policyNo
                  "
                  :title="itemChang.insOrders.saleOrderDetailList[0].policyNo"
                  >{{
                    itemChang.insOrders.saleOrderDetailList[0].policyNo
                  }}</span
                >
                <span v-else>/</span>
                <span v-if="itemChang.insOrders">{{
                  itemChang.insOrders.saleOrderDetailList[0].status
                    | insOrdersStatus
                }}</span>
                <span v-else>/</span>
                <span>{{
                  itemChang.traSaleChangeDetailList[0].changeOrderPrice + itemChang.traSaleChangeDetailList[0].serviceFee
                }}</span>
                <!-- <span v-if=" plsitsti.insOrders.length>0">{{ item.salePrice + plsitsti.orderExt.saleOrderDetailList[0].serviceFee +  plsitsti.insOrders[0].salePrice}}元</span> -->
                <!-- <span v-else>{{ item.salePrice + plsitsti.orderExt.saleOrderDetailList[0].serviceFee }}元</span> -->
                <span>
                  <!-- <p>待支付</p>-->
                  <p style="color: #00ac1c">
                    {{ itemChang.traSaleChangeDetailList[0].status | orderStatusId }}
                  </p>
                </span>
                <div class="allCheck oneCheck">
                  <div :class="{ flagTrue: itemChang.flag }">
                    <i class="el-icon-check"></i>
                  </div>
                </div>
              </div>
            </div>

            <div class="bottomS">
              <p>退保</p>
              <p
                v-if="usersli && ists && rotes('tms:tra:refund:list')"
                @click="updatas(3)"
              >
                退票
              </p>
              <!-- <p>改签</p> -->
            </div>
          </div>
        </div>
      </div>
      <!-- 审批日志 有审批 且 因公 才显示日志-->
      <div v-if="splog.length > 0 && typename == 1">
        <div class="orderDataTitle">审批日志</div>
        <div class="orderExamine">
          <div class="orderExamine_title">
            <span>顺序</span>
            <span>审批时间</span>
            <span>审批人</span>
            <span>审批结果</span>
            <span>审批方式</span>
            <span>备注信息</span>
          </div>
          <div
            class="orderExamine_title orderExamine_list"
            v-for="(item, index) in splog"
            :key="index"
          >
            <span>{{ index + 1 }}</span>
            <span v-if="item.modifyTime != null">{{ item.modifyTime }}</span>
            <span>{{ item.staffName }}</span>
            <span v-if="item.status == 0">待审批</span>
            <span v-else-if="item.status == 1" style="color: #409eff"
              >审批通过</span
            >
            <span v-else style="color: red">审批驳回</span>
            <span v-if="item.stplis == 1">成本审批</span>
            <span v-if="item.stplis == 2">部门审批</span>
            <span>{{ item.remark }}</span>
          </div>
        </div>
      </div>
      <!-- 支付信息 -->
      <div>
        <div class="orderDataTitle">支付信息</div>
        <div class="payData">
          <div class="tlement">
            支付方式：{{ tlement | settlement }}
            <div class="payStatus">
              <span v-if="plsitsti.traSaleChangeExtList.length < 1">
                订单总额： ￥
                <p>{{ numprice }}元</p></span
              >
              <span v-else>
                订单金额：原订单
                <p>{{ numprice }}元</p>
                ，改签后订单
                <p>{{ numprice }}元</p></span
              >
              <span>支付状态：{{ this.payStatus | pustatus }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 支付按钮 无支付按钮状态 ： 占座中-->
      <defray
        class="payBot"
        business-type="1"
        product-type="10"
        :record-no="codes"
        :amount="numprice"
        :entryMethod="EntryMethod"
        :pay-status="payStatus"
        v-if="
          orderStatus == '2' &&
          (((payStatus == 2 || payStatus == 1) && typename == 2) ||
            (typename == 1 && tlement == 1))
        "
      ></defray>
      <div class="goback" v-else>
        <span
          class="cancelOrder"
          v-if="isclose && rotes('tms:tra:list:cancel')"
          @click.stop="clearsks"
          >取消订单</span
        >
        <span class="gobackBot" @click="retuns">返回</span>
      </div>
    </div>
    <el-dialog title="退票需要审批" :visible.sync="dialogVisible" width="30%">
      <div class="trstp">
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
            ></el-cascader>
          </div>
        </div>
        <div class="tr_ul" v-if="CostCi == true">
          <div class="tr_uleft">成本审批人</div>
          <div class="tr_rights">
            <div class="tr_dvs" @click="drawers('TravelCostCenlist')">
              <span
                v-for="(item, index) in TravelCostCenlist"
                :key="index"
                v-if="TravelCostCenlist.length > 0"
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
        <div class="tr_ul">
          <div class="tr_uleft">退票原因</div>
          <div class="tr_rights">
            <div>
              <el-input
                width="250px"
                v-model="resons"
                placeholder="请输入退票原因"
              ></el-input>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="okcloseplase">确 定</el-button>
      </span>
    </el-dialog>
    <el-drawer :visible.sync="drawer" :with-header="false">
      <div class="ditrslist">
        <div class="ditrslists" v-for="(item, index) in drawelist" :key="index">
          <div style="margin-right: 10px; font-size: 15px">
            {{ index + 1 }}级审批人:
          </div>
          <div>
            <el-select v-model="apprvCost[index].id" placeholder="请选择">
              <el-option
                v-for="items in item.apprvCostFlowNodePersons"
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
    <el-dialog
      :title="title"
      :visible.sync="dialogVisibleBotton"
      width="30%"
      center
    >
      <div
        class="orderListDIO"
        v-for="(item, index) in checkList"
        :key="index"
        :class="{ order_list: item.status != 4 }"
      >
        <div v-if="isnum == 4">
          <span
            style="color: red"
            v-if="item.insOrders.status != 2"
            class="el-icon-close"
          ></span>
          <span
            style="color: rgb(0, 172, 28)"
            v-else
            class="el-icon-check"
          ></span>
          <span>{{ plsitsti.insOrders[0].insurance.name }}</span>
          <span>{{ item.insOrders.status | insOrdersStatus }}</span>
        </div>
        <div v-else>
          <span
            style="color: red"
            v-if="item.status != 4"
            class="el-icon-close"
          ></span>
          <span
            style="color: rgb(0, 172, 28)"
            v-else
            class="el-icon-check"
          ></span>
          <span>{{ item.traPassenger.name }}</span>
          <span>{{ item.status | orderStatusId }}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleBotton = false">取 消</el-button>
        <el-button type="primary" @click="checks()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Defray from "@/components/common/defray";
import {
  settlement,
  pustatus,
  orderStatusId,
  orderStatusUrl,
  catypeNum,
  insOrdersStatus,
} from "@/utils/common-filters";
export default {
  components: { Defray },
  filters: {
    settlement,
    pustatus,
    orderStatusId,
    orderStatusUrl,
    catypeNum,
    insOrdersStatus,
  },
  data() {
    return {
      headtravelNo: "", //头部出差单号
      resons: "", //退票原因
      checkList: [], //选中人员
      userlist: [], //出行人信息
      isclose: false,
      usersli: false, //是否可以退票和改签
      ists: false, //是否能退票
      isgs: false, //是否能改签
      drawelist: [],
      apprvCost: [],
      drawer: false,
      bots: {
        //使用props替换掉本来默认的lable和value 的键值
        value: "id",
        label: "text",
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
      dialogVisible: false,
      loading: false,
      splog: [], //审批日志
      codes: "", //火车票id
      plsitsti: {}, //火车票详情
      numprice: "999", //总价
      apprvTaskStatu: "", //因公审核状态0待审核 1审核中2审核通过
      orderStatus: "", //订单状态
      payStatus: "", //支付状态 1 为待支付 2 支付中 3 为已支付，4 为挂帐支付
      apprvTaskReason: "出差事由", //出差事由
      tlement: 0, //1为现结2为月结
      RuleMas: false, //当前用户是否免审
      RuleMa: "",
      saleOrderNo: "",
      typename: "", // 因公因私
      isnum: 0,
      usersnamelist: [],
      applylist: {},
      EntryMethod: "",
      msgErr: "",
      flagAll: false,
      gqFlag: false, //改签单全选
      baoFlag: false,
      dialogVisibleBotton: false,
      title:'',
    };
  },
  mounted() {
    this.EntryMethod = this.$route.query.EntryMethod;
    this.codes = this.$route.query.data; //获取上个页面传入的参数
    this.searchhoter();
    this.getRuleMainSetting();
  },
  methods: {
    updatas(num) {
     
      this.title = num == 1?'改签': num ==4?'退保':'退票'
      if (num == 3) {  //申请改签或退票
        // 改签退票
        this.checkList = this.plsitsti.traSaleChangeExtList.filter(
          (k) => k.flag
        );
      } else if (num == 4) { // 
        this.checkList = this.userlist.filter((k) => k.flag);
      } else {
        this.checkList = this.userlist.filter((k) => k.flag);
      }
      if (this.checkList.length == 0) {
        this.$message({
          message: "请选择一个出差人员",
          type: "warning",
        });
        return;
      }
      this.isnum = num;
      this.dialogVisibleBotton = true;
    },
    getStaffByTravelNoAndName(name) {
      return new Promise((resolve, reject) => {
        this.$api.order
          .getStaffByTravelNoAndNames({
            travelNo: this.plsitsti.tmsotr.travelNo,
            names: name,
          })
          .then((res) => {
            let dat = res.data; //获取改签人信息
            let users = [];
            for (let i in dat) {
              users.push(dat[i].passengerNo);
            }
            resolve(users);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async checks() {
      // this.checkList = this.userlist.filter((k) => !k.flagChang);
      let uslist = this.checkList.filter((k) => !k.flagChang); //选中的人
      let isnum = this.isnum;
      let userlist = [];
      let names = [];
      let passengerNos = [];
      // console.log("usersnamelist",this.usersnamelist)
       // 重新拼接订单信息
      for (let k in uslist) {
        // for (let i in this.usersnamelist) {
        //   if (this.usersnamelist[i].traPassenger.id == uslist[k]) {
        userlist.push({
          certNo: uslist[k].traPassenger
            ? uslist[k].traPassenger.certNo
            : uslist[k].traSaleChangeDetailList[0].certNo, //证件号码
          certType: uslist[k].traPassenger
            ? catypeNum(uslist[k].traPassenger.certType)
            : catypeNum(uslist[k].traSaleChangeDetailList[0].certType), //证件类型
          name: uslist[k].traPassenger
            ? uslist[k].traPassenger.name
            : uslist[k].traSaleChangeDetailList[0].name, //名字
        });
        passengerNos.push(
          uslist[k].traPassenger
            ? uslist[k].traPassenger.passengerNo
            : uslist[k].traSaleChangeDetailList[0].passengerNo
        );
        names.push(
          uslist[k].traPassenger
            ? uslist[k].traPassenger.name
            : uslist[k].traSaleChangeDetailList[0].name
        );
        // }
        // }
      }
      let nu = this.plsitsti.tmsotr.typename; //因公因私
      let userlistnos = [];
      if (nu == 1) {
        //因公需要从接口中获取用户passengerNo
        let sers = await this.getStaffByTravelNoAndName(names);
        userlistnos = sers;
      }
      this.shos = false;
      if (isnum == 1) {
        //改签
        let dat = {
          passengerNos: passengerNos,
          userlistnos: userlistnos,
          travelNo: this.plsitsti.tmsotr.travelNo,
          saleOrderNo: this.plsitsti.orderExt.saleOrderNo,
          nos: this.plsitsti.tmsotr.transationOrderNo
            ? this.plsitsti.tmsotr.transationOrderNo
            : "",
          city: [
            {
              id: this.plsitsti.saleOrderDetailList[0].fromStationCode,
              name: this.plsitsti.saleOrderDetailList[0].fromstation,
            },
            {
              id: this.plsitsti.saleOrderDetailList[0].toStationCode,
              name: this.plsitsti.saleOrderDetailList[0].tostation,
            },
          ],
          timedate: this.plsitsti.saleOrderDetailList[0].departureTime.substring(
            0,
            10
          ),
          butalist: userlist, //出行人员
          sit: false, //是否只搜高铁
          isblcks: 4, //4改签
          isbtd: nu, //1因公2因私
          costId: this.plsitsti.apprvTaskEntityList[0].costId, // 成本中心id
          costName: this.plsitsti.apprvTaskEntityList[0].costName, // 成本中心id
        };
        this.$router.push({
          path: "/trainlist",
          query: {
            data: JSON.stringify(dat),
          },
        });
      } else if (isnum == 4) {
        let back = {
          saleOrderN:'',//保险销售单号
          quitReason:'' // 退保原因
        };
        this.$api.home
          .insuranceOrderCancel(back)
          .then((res) => {
            if (res.code != 200) return this.$message.error(res.message);
          })
          .catch((err) => {
            this.loading = false;
          });
      } else {
        if (nu == 2) {
          //判断是否因私或者因公    因私不需要审核
          let dat = {
            saleOrderNo: this.plsitsti.orderExt.saleOrderNo,
            passengerNo: passengerNos.join(","),
            apprvTaskEntity: {
              agree: false,
              examinePattern: "0",
            },
          };
          this.loading = true;
          this.$api.order
            .applyRefundTrain(dat)
            .then((res) => {
              this.loading = false;
              if (res.code == 200) {
                this.$message({
                  message: "提交申请退票成功！",
                  type: "success",
                });
                setTimeout(() => {
                  this.searchhoter();
                }, 1000);
              } else {
                this.$message({
                  message: res.message,
                  type: "warning",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (nu == 1 && !this.RuleMas) {
          //因公但是不需要审核
          let dat = {
            saleOrderNo: this.plsitsti.orderExt.saleOrderNo,
            passengerNo: passengerNos.join(","),
            apprvTaskEntity: {
              agree: false,
              examinePattern: this.RuleMa,
            },
          };
          this.loading = true;
          this.$api.order
            .applyRefundTrain(dat)
            .then((res) => {
              this.loading = false;
              if (res.code == 200) {
                this.$message({
                  message: "提交申请退票成功！",
                  type: "success",
                });
                // setTimeout(() => {
                this.searchhoter();
                // }, 1000);
              } else {
                this.$message({
                  message: res.message,
                  type: "warning",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.loading = true;
          this.$api.order
            .judgeApprv({
              passengerNos: userlistnos, //判断当前出行人是否都免审
            })
            .then((res) => {
              if (res.code == 200) {
                if (res.data == false) {
                  //判断是否需要审核
                  this.loading = false;
                  this.applylist = {
                    passengerNo: passengerNos.join(","),
                    saleOrderNo: this.plsitsti.orderExt.saleOrderNo,
                  };
                  this.selts();
                } else {
                  let dat = {
                    saleOrderNo: this.plsitsti.orderExt.saleOrderNo,
                    passengerNo: passengerNos.join(","),
                    apprvTaskEntity: {
                      agree: false,
                      examinePattern: "0",
                    },
                  };
                  this.$api.order
                    .applyRefundTrain(dat)
                    .then((res) => {
                      this.loading = false;
                      if (res.code == 200) {
                        this.$message({
                          message: "提交申请退票成功！",
                          type: "success",
                        });
                        setTimeout(() => {
                          this.searchhoter();
                        }, 1000);
                      } else {
                        this.$message({
                          message: res.message,
                          type: "warning",
                        });
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              } else {
                this.loading = false;
                this.$message({
                  message: res.message,
                  type: "warning",
                });
              }
            })
            .catch((err) => {
              this.loading = false;
              console.log(err);
            });
        }
      }
    },
    userstatuas(it) {
      //乘客当前状态
      if (it == 2) {
        return "占座成功";
      } else if (it == 3) {
        return "出票中";
      } else if (it == 4) {
        return "已出票";
      } else if (it == 5) {
        return "退票中";
      } else if (it == 6) {
        return "改签中";
      } else if (it == 7) {
        return "已退票";
      } else if (it == 8) {
        return "已废弃";
      } else if (it == 9) {
        return "已改签";
      } else if (it == 10) {
        return "占座失败";
      } else if (it == 11) {
        return "出票失败";
      }
    },
    retuns() {
      this.$router.push({
        path: "/myorder",
      }); //返回上一页
    },
    clearsks() {
      //取消订单
      this.$confirm("将取消订单，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.opclose(); //取消订单
      });
    },
    okcloseplase() {
      let that = this;
      let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
      let TravelDepartlist = that.TravelDepartlist; //部门审批人
      let NameCenter = that.NameCenter; //成本中心
      let resons = that.resons; //退票原因
      let msgErr = this.msgErr; //成本中心校验是否通过
      if (NameCenter.id == "") {
        this.$message({
          message: "请选择成本中心！",
          type: "warning",
        });
        return;
      }
      if (TravelCostCenlist.length == 0 && this.CostCi == true) {
        this.$message({
          message: "请选择成本审批人！",
          type: "warning",
        });
        return;
      }
      if (TravelDepartlist.length == 0 && this.CostCis == true) {
        this.$message({
          message: "请选择部门审批人！",
          type: "warning",
        });
        return;
      }
      if (resons == "") {
        this.$message({
          message: "请输入退票原因！",
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

      let apprvTaskStaffts = []; //审核人员
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
      let dat = {
        saleOrderNo: this.applylist.saleOrderNo,
        passengerNo: this.applylist.passengerNo,
        apprvTaskEntity: {
          agree: false,
          apprvTaskStaffs: apprvTaskStaffts,
          taskType: 5, //1为事前2为事中，4为改签 5为退票
          beforeMiddle: 5, //1为事前2为事中 4为改签 5为退票
          costId: NameCenter.id, //成本中心id
          costName: NameCenter.name, //成本中心名称
          reason: resons,
          examinePattern: this.RuleMa,
        },
      };
      this.dialogVisible = false;
      this.loading = true;
      this.$api.order
        .applyRefundTrain(dat)
        .then((res) => {
          this.loading = false;
          if (res.code == 200) {
            this.$message({
              message: "申请退票成功!",
              type: "success",
            });
            setTimeout(() => {
              this.searchhoter();
            }, 1000);
          } else {
            this.$message({
              message: res.message,
              type: "warning",
            });
          }
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    opclose() {
      this.loading = true;
      let no = this.plsitsti.orderExt.saleOrderNo;
      this.$api.order
        .cancelSaleOrderExt({
          saleOrderNo: no,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "取消成功！",
              type: "success",
            });
            setTimeout(() => {
              this.loading = false;
              this.searchhoter();
            }, 1000);
          } else {
            this.loading = false;
            this.$message({
              message: res.message,
              type: "warning",
            });
          }
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    selts() {
      //查询成本中心
      let _this = this;
      _this.$api.home
        .getCostCenterList()
        .then((res) => {
          if (res.code == 200) {
            _this.dialogVisible = true;
            _this.treeLists = res.data[0].children;
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
    handleChange(value) {
      //选择成本中心
      let nodesObj = this.$refs["cascader"].getCheckedNodes(); //获取当前节点的信息
      this.NameCenter.name = nodesObj[0].data.text;
      this.NameCenter.id = nodesObj[0].data.id;
      this.TravelCostCenlist = [];
      this.TravelDepartlist = [];
      this.appswlist(); //重新获取部门和成本中心审批人
    },
    async appswlist() {
      //选获取部门和成本审批人信息
      let that = this;
      let res;
      try {
        res = await that.$api.home.getStaffList({
          costId: that.NameCenter.id,
          applyType: 5,
        });
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
        } else {
          this.msgErr = res.message ? res.message : "系统错误";
        }
      } catch (e) {
        this.msgErr = res.message ? res.message : "系统错误";
        console.log(e);
      }
    },
    drawers(its) {
      //点击成本或者部门审批人
      if (its == "TravelCostCenlist") {
        //判断是部门还是成本中心
        this.iscost = true;
        this.drawelist = this.CostCenterlist;
      } else {
        this.iscost = false;
        this.drawelist = this.Deparapprover.apprvDeptFlowNodePersons;
      }
      this.apprvCost = [];
      for (let i = 0; i < this.CostCenterlist.length; i++) {
        this.apprvCost.push({
          id: "",
        });
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
    count(ti, ts) {
      //计算两个日期多少天
      let date1 = new Date(ti);
      let date2 = new Date(ts);
      let date =
        (date2.getTime() - date1.getTime()) /
        (1000 * 60 * 60 * 24); /*不用考虑闰年否*/
      return date;
    },
    subtime(tiem) {
      //返回日期前10位
      return tiem.substring(0, 10);
    },
    async getRuleMainSetting() {
      //查询当前用户退房是否需要审核
      this.$api.order
        .ruleMainSetting()
        .then((res) => {
          if (res.code == 200) {
            this.RuleMa = res.data.examinePattern;
            let stw = this.RuleMa.split(",");
            for (let i in stw) {
              /**
               * 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
               */
              if (stw[i] == 6) {
                this.RuleMas = true;
              }
            }
          } else {
            this.loading = false;
            this.$message({
              message: res.message,
              type: "warning",
            });
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    searchhoter() {
      //查询火车详情
      let that = this;
      that.loading = true;
      that.$api.order
        .toTrainInfo({
          trainOrderNo: that.codes,
        })
        .then((res) => {
          that.loading = false;
          if (res.code == 200) {
            that.plsitsti = res.data;
            if (that.plsitsti.traSaleChangeExtList.length > 0) {
              // 根据原单和改签的的唯一标识saleOrderDetailNo 获取改签乘车人信息
              for (
                let i = 0;
                i < that.plsitsti.traSaleChangeExtList.length;
                i++
              ) {
                // console.log(
                //   "num--",
                //   that.plsitsti.traSaleChangeExtList[i]
                //     .traSaleChangeDetailList[0]
                // );
                for (
                  let k = 0;
                  k < that.plsitsti.saleOrderDetailList.length;
                  k++
                ) {
                    if (
                      that.plsitsti.traSaleChangeExtList[i]
                        .traSaleChangeDetailList[0].saleOrderDetailNo ==
                      that.plsitsti.saleOrderDetailList[k].saleOrderDetailNo
                    ) {
                      that.plsitsti.traSaleChangeExtList[i].traSaleChangeDetailList[
                       0 
                      ]["certNo"] =
                        that.plsitsti.saleOrderDetailList[
                          k
                        ].traPassenger.certNo;
                      that.plsitsti.traSaleChangeExtList[i].traSaleChangeDetailList[
                       0 
                      ]["certType"] =
                        that.plsitsti.saleOrderDetailList[
                          k
                        ].traPassenger.certType;
                      that.plsitsti.traSaleChangeExtList[i].traSaleChangeDetailList[
                       0 
                      ]["passengerType"] =
                        that.plsitsti.saleOrderDetailList[
                          k
                        ].traPassenger.passengerType;

                      that.plsitsti.traSaleChangeExtList[i].traSaleChangeDetailList[
                       0 
                      ]["name"] =
                        that.plsitsti.saleOrderDetailList[k].traPassenger.name;

                      that.plsitsti.traSaleChangeExtList[i].traSaleChangeDetailList[
                       0 
                      ]["passengerNo"] =
                        that.plsitsti.saleOrderDetailList[
                          k
                        ].traPassenger.passengerNo;
                    }
                  }
                
              }
            }
            // 改签单找到对应的该前后的保险
            if (that.plsitsti.traSaleChangeExtList.length > 0) {
            
                for (let h = 0; h < that.plsitsti.traSaleChangeExtList.length; h++) {
                  var arr =
                      that.plsitsti.traSaleChangeExtList[h].traSaleChangeDetailList[0];
                       for (let i = 0; i < that.plsitsti.insOrders.length; i++) {
                // for (let k = 0; k < arr.length; k++) {
                  if (
                    arr.saleChangeNo ==
                    that.plsitsti.insOrders[i].orderNumber
                  ) {
                    that.plsitsti.traSaleChangeExtList[h] = {
                      ...that.plsitsti.traSaleChangeExtList[h],
                      insOrders: that.plsitsti.insOrders[i],
                    };
                  }
                // }
              }
                  }
             
            }

            that.$forceUpdate();
            that.headtravelNo = res.data.tmsotr.travelNo; //头部出差单号
            that.apprvTaskReason = res.data.apprvTaskReason;
            let costsp = res.data.costLog; //成本审批
            let depsp = res.data.deptLog; //部门审批
            for (let k in costsp) {
              costsp[k]["stplis"] = 1; //成本
            }
            for (let p in depsp) {
              depsp[p]["stplis"] = 2; //部门
            }
            that.splog = [...costsp, ...depsp];
            if (res.data.orderExt.orderStatus == 1) {
              this.$message({
                message: "占座中,请注意短信！",
                type: "success",
              });
            }
            that.typename = that.plsitsti.tmsotr.typename; //1因公2因私
            that.numprice = that.plsitsti.orderExt.premium; //总价
            that.tlement = that.plsitsti.tmsotr.settlement; //结算方式
            that.apprvTaskStatu = that.plsitsti.apprvTaskStatu; //审核状态
            that.orderStatus = that.plsitsti.orderExt.orderStatus; //订单状态
            that.payStatus = that.plsitsti.orderExt.saleOrder.payStatus; //支付状态

            if (that.orderStatus == 2) {
              this.isclose = true;
            } else {
              this.isclose = false;
            }
            that.userlist = that.plsitsti.saleOrderDetailList; //乘客信息
            that.usersli = false;

            for (let i in that.userlist) {
              if (that.userlist[i].status == 4) {
                that.usersli = true;
              }
              // 根据保险与乘车电话信息将保险信息放到子订单中
              for (
                let p = 0;
                p < that.plsitsti.insOrders[0].saleOrderDetailList.length;
                p++
              ) {
                if (
                  that.userlist[i].traPassenger.phone ==
                  that.plsitsti.insOrders[0].saleOrderDetailList[p].insuredPhone
                ) {
                  that.userlist[i] = {
                    ...that.userlist[i],
                    insOrders:
                      that.plsitsti.insOrders[0].saleOrderDetailList[p],
                  };
                }
              }
              that.$set(that.userlist[i], "flag", false);
              if (that.userlist[i].status != 4) {
                that.$set(that.userlist[i], "flagChang", true); // 不是已出票状态的不选
              }
            }
            //  that.plsitsti.insOrders[0].saleOrderDetailList[1].status = 2
            // for (let k = 0; k <  plsitsti.insOrders[0].saleOrderDetailList.length; k++) {
            var arr = [];
            that.baoFlag = that.plsitsti.insOrders[0].saleOrderDetailList.some(
              (y) => {
                // 点击所有的单选
                return y.status == 2;
              }
            );
            // that.baoFlag = arr.length> 0 ? true : false
            // }
            // this.usersnamelist = []; //可操作人员信息
            // for (let i in this.plsitsti.saleOrderDetailList) {
            //   if (this.plsitsti.saleOrderDetailList[i].status == 4) {
            //     this.usersnamelist.push(this.plsitsti.saleOrderDetailList[i]);
            //   }
            // }
            // for (let i in this.usersnamelist) {
            //   this.usersnamelist[i]["istrue"] = false;
            // }
            this.ists = false;
            this.isgs = false;
            that.$api.order
              .checkRetundAndChange({
                departureTime: res.data.orderExt.departureTime,
              })
              .then((rest) => {
                if (rest.code == 200) {
                  if (rest.data.trainRefund == 1) {
                    this.ists = true; //能退票
                  }
                  if (rest.data.trainChange == 1) {
                    this.isgs = true; //能改签
                  }
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            that.$message({
              message: res.message,
              type: "warning",
            });
          }
        })
        .catch((e) => {
          that.loading = false;
          console.log(e);
        });
    },
    // 多选
    allCheck(num, arr) {
      var that = this;

      for (let i = 0; i < arr.length; i++) {
        // if (!arr[i].flagChang) {
        //   // 过滤不是出票状态的
        arr[i].flag =num == 1? that.flagAll == false ? true : false : that.gqFlag == false ? true : false  ;
        // }
      }
      if (num == 1) {
        that.flagAll = !that.flagAll;
        that.userlist = arr;
      } else {
        that.gqFlag = !that.gqFlag;
        that.plsitsti.traSaleChangeExtList = arr;
      }
      that.$forceUpdate();
    },
    // 单选
    radioClick(item, index, num, arr) {
      var that = this;
      // if (num == 1 && item.flagChang) return;
      // that.$set(arr[index], "flag", !arr[index].flag);
      // var userl = arr.filter((k) => !k.flagChang); // 过滤不是出票状态的
      arr[index].flag = !arr[index].flag
      if (num == 1) {
        // that.userlist =
        that.flagAll = arr.every((y) => {
          // 点击所有的单选
          return y.flag == true;
        });
      } else {
        that.gqFlag = arr.every((y) => {
          // 点击所有的单选
          return y.flag == true;
        });
      }
      this.$forceUpdate()
    },
  },
};
</script>
<style lang="less" scoped>
.trainorderlist {
  width: 1178px;
  margin: 0 auto;
  .trainorderboxs {
    height: 114px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 4px;
    border: 1px solid #ededed;
    background: #fff;
    margin-top: 20px;

    .trainorder_left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .trainorder_order {
        line-height: 30px;
        font-size: 14px;
        color: #666666;
        .mixin_displayBox(@fd:column,@ai:flex-start);
        margin: 0 139px 0 36px;
      }
      & > :last-child {
        width: 73px;
        height: 73px;
      }
    }
    .trainorder_right {
      font-size: 14px;
      color: #666;
      text-align: center;
      padding: 30px 30px 0 0;
    }
  }
  .trainorderContent {
    padding-bottom: 20px;
    background: #fff;
    margin-top: 20px;

    & > div {
      .orderDataTitle {
        margin: 0 10px;
        padding: 5px 0 5px 10px;
        background: #f4f6f8;
        font-size: 14px;
        font-weight: bold;
      }
      .orderList {
        margin: 20px 34px;
        .orderListBox {
          position: relative;
          border: 1px solid #ededed;
          border-bottom: none;
          .orderList_title {
            display: flex;
            border-bottom: 1px solid #ededed;
            & > span {
              font-size: 14px;
              color: #666;
              text-align: center;
              height: 30px;
              line-height: 30px;
              border-right: 1px solid #fff;

              .mixin_ellipsis();
            }
            & > span:nth-child(1) {
              width: 105px;
            }
            & > span:nth-child(2) {
              width: 150px;
            }
            & > span:nth-child(3) {
              width: 200px;
            }
            & > span:nth-child(4) {
              width: 100px;
            }
            & > span:nth-child(5) {
              width: 60px;
            }
            & > span:nth-child(6) {
              width: 50px;
            }
            & > span:nth-child(7) {
              width: 120px;
            }
            & > span:nth-child(8) {
              width: 90px;
            }
            & > span:nth-child(9) {
              width: 75px;
            }
            & > span:nth-child(10) {
              width: 70px;
            }
            & > span:nth-child(11) {
              flex: 1;
              border-right: 0;
              display: flex;
              justify-content: space-around;
              align-items: center;
            }
          }
          .orderList_data {
            position: relative;
            & > span {
              height: 50px;
              line-height: 50px;
              border-right: 1px solid #ededed;
            }
            & > span:nth-child(1),
            & > span:nth-child(7) {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              & > p {
                line-height: 14px;
                color: #333;
                font-weight: bold;
                max-width: 60px;
                .mixin_ellipsis();
              }
              & > p:nth-child(2) {
                margin-top: 5px;
                color: #666;
                font-size: 12px;
              }
            }
            & > span:nth-child(1) {
              & > p {
                margin-left: 20px;
              }
            }
            & > span:nth-child(7) {
              & > p {
                max-width: 120px;
              }
            }
            .allCheck {
              left: 9px;
              top: 17px;
            }
          }
        }
        .bottomS {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          & > p {
            border: 1px solid #3175f6;
            font-size: 14px;
            padding: 0 27px;
            height: 30px;
            line-height: 30px;
            color: #3175f6;
            border-radius: 2px;
            background: rgba(86, 110, 136, 0.1);
            cursor: pointer;
            margin-right: 10px;
          }
          & > p:last-child {
            margin-right: 0;
          }
          & > p:hover {
            background: #fff;
          }
        }
      }
      .orderChang {
        & > span {
          font-size: 16px;
          color: #00ac1c;
          padding-left: 74px;
        }
      }
      .orderExamine {
        margin: 20px 34px;
        border: 1px solid #f9e6d0;
        border-bottom: 0;
        .orderExamine_title {
          display: flex;
          border-bottom: 1px solid #f9e6d0;
          & > span {
            font-size: 14px;
            color: #666;
            height: 32px;
            line-height: 32px;
            flex: 1;
            text-align: center;
          }
          & > span:nth-child(2) {
            flex: 1.5;
          }
        }
        .orderExamine_list {
          & > span {
            border-right: 1px solid #f9e6d0;
            background: rgba(224, 198, 93, 0.1);
          }
          & > span:last-child {
            border-right: 0;
          }
        }
      }
      .payData {
        margin: 20px 80px;
        font-size: 14px;
        color: #333;
        .payStatus {
          & > span {
            display: flex;
            margin-top: 10px;
            & > p {
              color: #ff6600;
            }
          }
        }
      }
    }
    & > .goback {
      .mixin_displayBox();
      & > .cancelOrder {
        .mixin_bottonTrue(@width:70px,@fz:14px);
        border-radius: 2px;
      }
      & > .gobackBot {
        .mixin_bottonFalse(@fz:14px);
        margin-left: 10px;
      }
    }
  }
}
.con_tran_box {
  display: flex;
  align-items: center;
  height: 101px;
  .con_tran {
    padding-left: 74px;
    display: flex;
    font-size: 14px;
    color: #333;
    & > div:nth-child(1) {
      display: flex;
    }
    & > div:nth-child(2) {
      margin: 0 50px 0 30px;
    }
  }
  .con_city {
    display: flex;
    font-size: 14px;
    color: #333;
    & > div:nth-child(2) {
      width: 164px;
      margin: 0 20px;
      background: url("../../../../../static/image/jiantou.png") no-repeat
        center;
      position: relative;
      & > .order_time {
        width: 164px;
        position: absolute;
        top: -12px;
        color: #666;
        text-align: center;
      }
    }
  }
}

.allCheck {
  display: flex;
  position: absolute;
  left: 9px;
  top: 8px;
  cursor: pointer;

  & > div {
    width: 14px;
    height: 14px;
    border-radius: 2px;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 14px;

    & > .el-icon-check {
      font-size: 12px;
      line-height: 14px;
      opacity: 0;
      transition: 0.5s;
      -webkit-transition: 0.5s;
      -moz-transition: 0.5s;
      -ms-transition: 0.5s;
      -o-transition: 0.5s;
    }
  }
  & > .flagTrue {
    border: 1px solid #409eff;
    & > .el-icon-check {
      opacity: 1;
      color: #409eff;
    }
  }
  & > .flagChang {
    background: #ddd;
  }
}
.orderList_title:hover {
  cursor: pointer;
  .allCheck {
    & > div {
      border-color: #409eff;
      & > .el-icon-check {
        opacity: 1;
        color: #409eff;
      }
    }
    & > .flagChang {
      border-color: #ddd;
      & > .el-icon-check {
        opacity: 0;
        color: #ddd;
      }
    }
  }
}
.trstp {
  width: calc(100% - 20px);
  background: #ffffff;
  padding: 10px;

  .tr_ul {
    width: 100%;
    margin: 10px 0;
    display: flex;

    .tr_uleft {
      color: #78879d;
      width: 100px;
      text-align: center;
      line-height: 50px;
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
      width: calc(100%-100px);
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
      }
    }
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
  color: #ffffff;
  background: #007aff;
}
.orderListDIO {
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    & > span:nth-child(2) {
      width: 100px;
      margin-left: 20px;
    }
    // & > span:last-child {
    //   // color: rgb(0, 172, 28);
    // }
  }
}
</style>