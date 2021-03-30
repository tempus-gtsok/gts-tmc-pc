<!--
       author: I won’t leave my name, for fear of being beaten by someone who takes over
-->
<template>
  <div class="hoteorder" v-loading="loading" v-if="plsitsti != null && plsitsti != undefined">
    <div class="hotboxs">
      <el-drawer :visible.sync="drawer" :with-header="false">
        <div class="ditrslist">
          <div class="ditrslists" v-for="(item,index) in drawelist" :key="index">
            <div style="margin-right: 10px;font-size: 15px;">{{index+1}}级审批人:</div>
            <div>
              <el-select v-model="apprvCost[index].id" v-if="item.apprvCostFlowNodePersons" placeholder="请选择">
                <el-option v-for="items in item.apprvCostFlowNodePersons" :key="items.id" :label="items.staffName" :value="items.id">
                </el-option>
              </el-select>
              <el-select v-model="apprvCost[index].id" v-else placeholder="请选择">
                <el-option v-for="items in item.apprvDeptFlowNodePersons" :key="items.id" :label="items.staffName" :value="items.id">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="addpalist" @click="btn_click">选好了</div>
      </el-drawer>
      <div class="hot_lefts" style="width: 60%;">
        <div>意向单单号：{{ requireNo }}</div>
      </div>
      <div class="trbtend" v-if="orderStatus === '0'">
        <img src="../../../static/image/home/Approval-Pending.png" alt="">
      </div>
      <div class="trbtend " v-if="orderStatus === '1'">
        <img src="../../../static/image/intentionlist/tongguo.png" alt="">
      </div>
      <div class="trbtend" v-if="orderStatus === '2'">
        <img src="../../../static/image/intentionlist/judan.png" alt="">
      </div>
      <div class="trbtend" v-if="orderStatus === '3'">
        <img src="../../../static/image/intentionlist/yiqueren.png" alt="">
      </div>
      <div class="trbtend " v-if="orderStatus === '4'">
        <img src="../../../static/image/home/Canceled.png" alt="">
      </div>
    </div>
    <div style="padding: 10px;background-color: #FFFFFF;border-radius: 4px;border: 1px solid #ededed;">
      <div class="hotbox" style="line-height: 30px;">
        <div class="lefbox">酒店信息</div>
        <div>酒店名称：{{ plsitsti.hotelName }}</div>
        <div v-if="plsitsti.hotelPhone != null">酒店电话：{{plsitsti.hotelPhone}}</div>
        <div v-if="plsitsti.bedTypeName != null">酒店床型：{{ plsitsti.bedTypeName }}</div>
        <div>房间数量：{{plsitsti.bookCount}}间</div>
        <div>房间类型：{{plsitsti.proName}}</div>
        <div>酒店地址：{{ plsitsti.hotelAddress}}</div>
        <div class="lefbox">入住信息</div>
        <div v-if="plsitsti.arrivalDate != null && plsitsti.departureDate != null">
          入住时间：{{ subtime(plsitsti.arrivalDate) }} 至 {{ subtime(plsitsti.departureDate) }} （共{{
            count(subtime(plsitsti.arrivalDate), subtime(plsitsti.departureDate))
          }}晚) 房间数：{{ plsitsti.bookCount }}间
        </div>
        <div>入住人：{{ plsitsti.guestNames }}</div>
        <div>联系人：{{plsitsti.contactName}}</div>
        <div>联系电话：{{plsitsti.contactNumber}}</div>
        <div>
          <span style="color: #F5A623"> 订单总额：￥{{plsitsti.salePrice }}</span>
        </div>
        <div style="color: red" v-if="orderStatus === '0'">备注：{{plsitsti.remark}}</div>
        <div style="color: red" v-else>审批备注：{{plsitsti.cancelReason}}</div>
        <defray business-type="1" product-type="4" :record-no=recordNos :amount=plsitsti.salePrice entryMethod=0 :pay-status=payStatus intention= 4  v-if="(travelType == 2 && (payStatus == 1 || payStatus == 2))"></defray>
        <div v-if="travelType == 1 && travelNo == null && orderStatus == 1">
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
              <el-cascader style="width: 200px;" ref="cascader" @change="handleChange" :props='bots' :options="treeLists"></el-cascader>
            </div>
          </div>
          <div class="tr_ul" v-if="CostCi == true">
            <div class="tr_uleft">成本审批人</div>
            <div class="tr_rights">
              <div class="tr_dvs" @click="drawers('TravelCostCenlist')">
									<span v-for="(item,index) in TravelCostCenlist" :key="index" v-if="TravelCostCenlist.length > 0"> <!-- -->
										{{item.staffName}}
									</span>
              </div>
            </div>
          </div>
          <div class="tr_ul" v-if="CostCis == true">
            <div class="tr_uleft">部门审批人</div>
            <div class="tr_rights">
              <div class="tr_dvs" @click="drawers('TravelDepartlist')">
									<span v-for="(item,index) in TravelDepartlist" :key="index" v-if="TravelDepartlist.length > 0"> <!---->
										{{item.staffName}}
									</span>
              </div>
            </div>
          </div>
        </div>
        <div class="tr_ul" >
          <div class="tr_uleft">出行事由</div>
          <div class="tr_rights">
            <el-input v-model="reson" type="textarea" :rows="2" placeholder="请输入出行事由"></el-input>
          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="boxbtn">
      <div class="nobts" @click="confirm" v-if="orderStatus === '1' && hotelOrder == null">确认订单</div>
      <div class="nobts" style="background-color: red;border: 1px solid red;" @click="clearsks" v-if="orderStatus === '1'">取消订单</div>
      <div class="retunbts" @click="retuns">返回</div>
    </div>
  </div>
</template>

<script>
import Defray from "@/components/common/defray";
export default {
  components: {Defray},
  data() {
    return {
      drawelist: [],
      apprvCost: [],
      drawer: false,
      bots: { //使用props替换掉本来默认的lable和value 的键值
        value: 'id',
        label: 'text'
      },
      NameCenter: { //当前选择成本中心
        name: '',
        id: 0
      },
      hotelOrder: '',
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
      requireNo: '', //酒店意向单单号
      plsitsti: {}, //酒店意向单详情
      numprice: '999', //总价
      payStatus: '', //支付状态 1 为待支付 2 支付中 3 为已支付，4 为挂帐支付
      orderStatus: '', //订单状态
      EntryMethod : 0,
      reson: '',  //出差事由
      travelType: '', //因公 or 因私
      travelNo : '', //销售单号
      apprvTaskStaffs: [], //用于存放成本和部门审批人的参数
      recordNos: '' //销售单号
    };
  },
  mounted() {

    this.requireNo = this.$route.query.requireNo; //获取上个页面传入的参数
    this.selts(); //查询成本中心
    this.searchhoter();
  },
  methods: {
    async confirm(){  //确认意向单
      this.loading = true;
      let dat = [];
      if (this.travelNo != null || this.travelType == 2){
        dat={
          requireNo: this.requireNo
        }
      }else if (this.travelNo == null && this.travelType == 1){
        if(this.reson == null || this.reson == ''){
          this.$message.warning('请输入出行事由！');
          this.loading = false;
          return;
        }
        if (this.NameCenter.name == '' && this.NameCenter.id === 0 || this.NameCenter.name == null && this.NameCenter.id == null){
          this.$message.warning('请选择成本中心！');
          this.loading = false;
          return;
        }

        if (this.CostCi){
          if (this.TravelCostCenlist == null || this.TravelCostCenlist.length == 0){
            this.$message.warning('请选择成本审批人！');
            this.loading = false;
            return;
          }
        }
        if (this.CostCis){
          if(this.TravelDepartlist == null || this.TravelDepartlist.length == 0){
            this.$message.warning('请选择部门审批人！');
            this.loading = false;
            return;
          }
        }
        if (this.CostCi && this.CostCis){
          this.apprvTaskStaffs.push({ //添加成本审批人和部门审批人参数
            deptCost:this.TravelCostCenlist[0].deptCost,
            nodeId:this.TravelCostCenlist[0].nodeId,
            personId:this.TravelCostCenlist[0].personId,
            staffId:this.TravelCostCenlist[0].staffId,
            staffName:this.TravelCostCenlist[0].staffName,
          },{
            deptCost:this.TravelDepartlist[0].deptCost,
            nodeId:this.TravelDepartlist[0].nodeId,
            personId:this.TravelDepartlist[0].personId,
            staffId:this.TravelDepartlist[0].staffId,
            staffName:this.TravelDepartlist[0].staffName,
          })
        }else if (this.CostCi){
          this.apprvTaskStaffs.push({
            deptCost:this.TravelCostCenlist[0].deptCost,
            nodeId:this.TravelCostCenlist[0].nodeId,
            personId:this.TravelCostCenlist[0].personId,
            staffId:this.TravelCostCenlist[0].staffId,
            staffName:this.TravelCostCenlist[0].staffName,
          })
        }else if (this.CostCis){
          this.apprvTaskStaffs.push({
            deptCost:this.TravelDepartlist[0].deptCost,
            nodeId:this.TravelDepartlist[0].nodeId,
            personId:this.TravelDepartlist[0].personId,
            staffId:this.TravelDepartlist[0].staffId,
            staffName:this.TravelDepartlist[0].staffName,
          })
        }
        dat={
          requireNo: this.requireNo,
          apprvTaskEntity:{
            apprvTaskStaffs:this.apprvTaskStaffs,
            costId:this.NameCenter.id,
            costName:this.NameCenter.name,
            beforeMiddle: 2,
            reason: this.reson,
            taskType: 2
          }
        }
      }
      let res = await this.$api.intentionlist.confirmOrder(dat);
      if (res.code == 200 ){
        this.loading= false;
        this.$message.success('确认成功');
        this.searchhoter();
      }else {
        this.$message.error(res.message);
      }
    },
    retuns() {
  
       //返回上一页
      this.$router.go(-1);
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
      this.$api.intentionlist.cancelHolRequire({
        requireNo: this.requireNo
      }).then((res) => {
        this.loading = false;
        if (res.code == 200) {
          this.$message({
            message: '取消成功！',
            type: 'success'
          })
          this.searchhoter();
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
      let travelers = JSON.parse(that.plsitsti.travelers)
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
    searchhoter() {
      //查询酒店详情
      let that = this;
      that.loading = true;
      that.$api.intentionlist
          .toOrderDetail({
            requireNo: that.requireNo
          })
          .then(res => {
            that.loading = false;
            if (res.code == 200) {
              that.plsitsti = res.data.holRequire;
              that.orderStatus = res.data.holRequire.orderStatus;
              that.travelType = res.data.holRequire.travelType;
              that.travelNo = res.data.holRequire.travelNo;
              that.hotelOrder = res.data.hotelOrder;
              that.payStatus = res.data.saleOrder.payStatus;
              that.recordNos= res.data.saleOrder.transationOrderNo;
            } else {
              that.$message({
                message: res.message,
                type: 'warning'
              });
            }
          })
          .catch(e => {
            that.loading = false;
            console.log(e);
          });
    }
  }
};
</script>

<style scoped lang="less">

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
    margin-top: 10px;
    width: 100%;
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
    width: calc(100% - 220px);
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
    padding: 0 200px 0 20px;
    background-color: #ffffff;
    border-radius: 4px;
    border: 1px solid #ededed;
    .hot_lefts {
      line-height: 30px;
      font-size: 14px;
      color: #666666;
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

  .hotbox {
    width: calc(100% - 30px);
    position: relative;
    font-size: 14px;
    padding: 0 15px;
    background-color: #ffffff;
    border-radius: 4px;
    line-height: 45px;

    .lefbox {
      background-color: #e4f1fe;
      width: 100%;
      text-indent: 10px;
      line-height: 34px;
      font-weight: 600;
      font-size: 14px;
      color: #333333;
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
</style>
