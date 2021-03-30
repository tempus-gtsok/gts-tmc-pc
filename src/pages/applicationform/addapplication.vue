<template>
  <div class="applicalist">
    <el-drawer :visible.sync="draweruser" :with-header="false">
      <div class="ditrslist">
        <div class="ditrslists" v-for="(item,index) in drawelist" :key="index">
          <div style="margin-right: 10px;font-size: 15px;">{{ index + 1 }}级审批人:</div>
          <div v-if="iscost == true">
            <el-select v-model="apprvCost[index].id" placeholder="请选择">
              <el-option v-for="items in item.apprvCostFlowNodePersons" :key="items.id" :label="items.staffName"
                         :value="items.id">
              </el-option>
            </el-select>
          </div>
          <div v-if="iscost == false">
            <el-select v-model="apprvCost[index].id" placeholder="请选择">
              <el-option v-for="items in item.apprvDeptFlowNodePersons" :key="items.id" :label="items.staffName"
                         :value="items.id">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="addpalist" @click="btn_click">选好了</div>
    </el-drawer>
    <div class="applists">
      <el-drawer class="drawerd" size="28%" :with-header="false" :visible.sync="drawer" direction="rtl">
        <div class="drawertp">请选择出行旅客</div>
        <div class="drivpass">
          <passage @passlist="passuser"></passage>
        </div>
      </el-drawer>
      <div class="addpiboxs" v-loading="loading">
        <div class="adflex">
          <div class="box_lef"">出差人员</div>
          <div class="boxiput" st>
            <div class="inputsflor" @click="drawer = true">
              <div class="inconts" v-if="busslist.length == 0">请选择出差人员</div>
              <div class="inplis" v-if="busslist.length > 0">{{ buslis(busslist) }}</div>
            </div>
          </div>
          <div class="box_lef">
            申请人员<span class="font_color">(执行申请人的审批流程)</span>
            </div>
          <div class="boxiput" style="border: none">
            <el-select v-model="appli.userId" placeholder="请选择" @change="opcostid" style="width: 100%">
              <el-option
                  v-for="item in applicantlist"
                  :key="item.userId"
                  :label="item.label"
                  :value="item.userId">
              </el-option>
            </el-select>
          </div>
          <div class="box_lef">
            出差时间
          </div>
          <div class="boxiput">
            <div class="inputsflor">
              <el-date-picker value-format="yyyy-MM-dd" class="inputime" v-model="applicattime" type="daterange"
                              @change="applick"
                              range-separator="至" start-placeholder=" " end-placeholder=" " :editable="false"
                              :clearable="false"
                              :picker-options="pickerOptions"></el-date-picker>
              <div class="datsto">
                共{{ oldtime }}天
              </div>
            </div>
          </div>
          <div class="box_lef">
            出差事由
          </div>
          <div class="boxiput">
            <div class="inputsflor">
              <input type="text" v-model="marks" placeholder="请填写出差事由,如:去深圳参加会展">
            </div>
          </div>
          <div class="box_lef">
            详细说明
          </div>
          <div class="boxiput">
            <div class="inputsflor">
              <input type="text" v-model="reson" placeholder="请填写详细说明(选填)">
            </div>
          </div>
          <div class="box_lef">
            出差行程
          </div>
          <div class="applistadd">
            <addcity :datatime="datatimes" :addAppLiCation="1" @addapli="addapli"></addcity>
          </div>
          <div class="applistsd" v-if="appcatlist.length > 0">
            <div class="appuls"  v-for="(item,index) in appcatlist" :key="index">
              <div class="appligt">
                <div class="aplifis">
                  <span class="ap_icname">{{ newicname(item.icname) }}</span>
                  <span class="ap_name">{{ newstaname(item) }}
                    <span v-if="item.icname == 'Planeticket' && item.end != ''">&nbsp;往返</span>
                  </span>
                  <span class="ap_data">{{ newdata(item) }}</span>
                </div>
              </div>
              <div class="applilenft" @click="deleteapp(index)">
                <div class="iconfont" style="font-size: 14px;width: 14px">
                  &#xe666;
                </div>
              </div>
            </div>
          </div>
          <div class="box_lef" style="padding-top: 31px">
            归属部门
          </div>
          <div class="boxiput">

            <div class="inputsflor">
              {{ attdepartment }}
            </div>
          </div>
        <div v-if="CostCi == true">
        <div class="box_lef" >
          成本审批人
        </div>
          <div class="boxiput" >
            <div class="inputsflor" @click="drawers('TravelCostCenlist')">
              <div class="spnlist">
								<span v-for="(item,index) in TravelCostCenlist" :key="index" v-if="TravelCostCenlist.length > 0">
									{{ item.staffName }}
								</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="CostCis == true">
        <div class="box_lef">
          部门审批人
        </div>
          <div class="boxiput" >
            <div class="inputsflor" @click="drawers('TravelDepartlist')">
              <div class="spnlist">
								<span v-for="(item,index) in TravelDepartlist" :key="index" v-if="TravelDepartlist.length > 0">
									{{ item.staffName }}
								</span>
              </div>
            </div>
          </div>
        </div>
        <div class="box_lef">
          预估费用
        </div>
          <div class="boxiput">
            <div class="inputsflor">
              <input type="text" @input="estimatedcosts" placeholder="0" v-model="estimatedcost">
            </div>
          </div>
        <div v-if="travel.one === true">
        <div class="box_lef">
          基金中心
        </div>
          <div class="boxiput" >
            <div class="box_input">
              <input type="text" v-model="fundCenter">
            </div>
          </div>
        </div>
        <div v-if="travel.two === true">
        <div class="box_lef">
          OA出差单号
        </div>
          <div class="boxiput" >
            <div class="box_input">
              <input type="text" v-model="oaSingleNumber">
            </div>
          </div>
        </div>
        <div v-if="travel.three === true">
        <div class="box_lef">
          项目代码(WBS元素)
        </div>
          <div class="boxiput" >
            <div class="box_input">
              <input type="text" placeholder="" v-model="wbs">
            </div>
          </div>
        </div>
          <div class="costslist" v-for="(item,index) in costlist" :key="index">
            <div class="costslis">
              <div class="costleft">
                成本中心
              </div>
              <el-cascader style="width: 150px;" v-model="item.costcenterId" @change="handleChange(index,$event)"
                           class="cascadat" ref="cascader" :disabled="busslist.length == 0"
                           :show-all-levels="false" :props='bots' :options="treeLists"></el-cascader>
            </div>
            <div class="costslis">
              <div class="costleft">
                适用人员
              </div>
              <div class="costright">
                {{ namest(item.username) }}
              </div>
            </div>

            <div class="costsli">
              <div class="coslipc">
                <div class="costleft">
                  成本比例
                </div>
                <div class="costright">
                  <input v-model="item.bn" type="text" @input="bninputs($event,index)" maxlength="3" value=""/>%
                </div>
              </div>
              <div class="coslipc">
                <div class="costleft">
                  &nbsp;&nbsp;&nbsp;&nbsp;成本金额
                </div>
                <div class="costright">
                  <input v-model="item.price" type="text" disabled maxlength="6" value=""/>
                </div>
              </div>
            </div>
          </div>
          <div class="boxiputbtns" @click="add_user">
            提交出差申请
          </div>
        </div>
        <div class="adflex tilst">
          <div class="adtoptitles">
            出差审批流程
          </div>
          <div class="optsbox">
            <div v-for="(item,index) in otlist" :key="index">
              <div class="ottops">
                <div :class="index == 0 ? 'caisins':'caisin'">
                  <div :class="index == 0 ? 'caisinds':'caisind'">
                  </div>
                </div>
                <div class="otnames">
                  {{ item.name }}
                </div>
              </div>
              <div class="oksbox" v-if="index != (otlist.length -1)">
                <div :class="index == 0 ? 'ottbacks':'ottback'">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import passage from '@/components/common/passenger'
import addcity from '@/components/common/addAppLiCationCity'

export default {
  data() {
    return {
      estimatedcost: '',//预估费用
      conobj: {},
      userconlists: [], //复制适用人员
      userconlist: [], //适用人员
      costlist: [], //成本分摊
      applicantlist: [], //申请人列表
      appli: {}, //当前选择申请人
      loading: false,
      attdepartment: JSON.parse(sessionStorage.getItem('userinfo')).deptName, //默认部门
      appcatlist: [], //行程
      bots: { //使用props替换掉本来默认的lable和value 的键值
        value: 'id',
        label: 'text',
        checkStrictly: true, //可以选父级
        emitPath: false,
      },
      NameCenter: { //当前选择成本中心
        name: '',
        id: 0
      },
      draweruser: false,
      treeLists: [], //成本中心
      apprvCost: [],
      TravelDepartlist: [], //部门审批人
      TravelCostCenlist: [], //成本中心审批人
      CostCi: false, //是否有成本审批人
      CostCis: false, //是否有部门审批人
      Deparapprover: [], //部门审批人
      CostCenterlist: [], //成本审批人
      iscost: true, //true为成本中心false为部门
      drawelist: [], //盒子内容
      datatimes: [],
      otlist: [{
        name: '发起申请'
      }, {
        name: '审批同意'
      }, {
        name: '预定、机票、酒店'
      }, {
        name: '企业付款'
      }],
      fundCenter: '', //基金中心
      oaSingleNumber: '', //oa出差单号
      wbs: '', //项目代码（WBS元素）
      oldtime: 1,
      userid_list: [], //出差的人员
      marks: '', //出差事由
      reson: '', //详细说明
      busslist: [], //出差人员
      applicattime: [], //出差时间
      drawer: false,
      pickerOptions: {
        disabledDate: time => {
          return this.dealDisabledDate(time);
        },
      },
      travel: {
        one: false,
        two: false,
        three: false
      }
    }
  },
  components: {
    passage,
    addcity
  },
  mounted() {
    let datas = JSON.parse(sessionStorage.getItem('userinfost')); //检验是否是登录状态
    if (datas) {
      if (this.busslist.length == 0) {
        this.busslist = [{
          istrue: 1,
          passengerNo: datas.passengerVo.id, //暂时没有该参数
          userName: datas.user.name,
          userId: datas.user.id,
          deptName: datas.user.deptName,
          deptId: datas.user.deptId,
          phone: datas.user.phone,
          costcenterId: datas.passengerVo.costcenterId,
          costcenterName: datas.passengerVo.costcenterName
        }]
        this.applicantlist = [{
          userId: datas.user.id,
          userName: datas.user.name,
          deptName: datas.user.deptName,
          deptId: datas.user.deptId,
          costcenterId: datas.passengerVo.costcenterId,
          costcenterName: datas.passengerVo.costcenterName,
          label: datas.user.name + '（' + datas.passengerVo.costcenterName + '）'
        }]
        this.appli = this.applicantlist[0];
        this.getTravelSwitch();
        this.ad_cion(this.appli);
        this.costlist = [{
          username: [{
            name: datas.user.name,
            passengerNo: datas.passengerVo.id
          }],
          costcenterName: datas.passengerVo.costcenterName,
          costcenterId: datas.passengerVo.costcenterId,
          bn: 100,
          price: 0, //分摊金额
        }]
      }
    }
    this.applicattime = [this.datond(0), this.datond(1)]; //默认时间
    this.datatimes = this.applicattime;
    this.oldtimsck(); //默认多少天
    this.selts();
  },
  methods: {
    getTravelSwitch() {
      this.$api.order.getTravelSwitch().then(res => {
        if (res.code === "200") {
          let data = res.data;
          let travel = this.travel;
          for (let i in data) {
            if (data[i] === 1) {
              travel.one = true;
            }
            if (data[i] === 2) {
              travel.two = true;
            }
            if (data[i] === 3) {
              travel.three = true;
            }
          }
        }
      });
    },
    newdata(tm) {//回显时间
      if (tm.end == "" && tm.sta != '') {
        return tm.sta + '　出发'
      } else if (tm.end != "" && tm.sta == '') {
        return tm.end + '　返回'
      } else if (tm.end != "" && tm.sta != '' && tm.icname == 'Hotel') {
        return tm.sta + '　入住　' + tm.end + ' 离店'
      } else if (tm.end != "" && tm.sta != "" && tm.icname == 'Planeticket') {
        return tm.sta + '　去程　' + tm.end + '　返程'
      }
    },
    newstaname(tm) {//回显城市名称
      if (tm.icname == 'Hotel') {
        return tm.staname.name + "　" + tm.endname
      }else{
        return tm.staname.name + ' - ' + tm.endname.name
      }
    },
    newicname(tm) {//回显类型
      if (tm == 'Planeticket') {
        return '[机票]'
      } else if (tm == 'Hotel') {
        return '[酒店]'
      } else if (tm == 'Train') {
        return '[火车]'
      }
    },
    estimatedcosts(e) {//输入完预估费用
      let das = parseInt(e.target.value);
      if (das > 0) {
        for (let k in this.costlist) {
          if (this.costlist[k].bn > 0 && this.costlist[k].bn < 101) {
            this.costlist[k].price = parseFloat(das * (this.costlist[k].bn / 100)).toFixed(2);
          }
        }
      } else {
        for (let k in this.costlist) {
          this.costlist[k].price = 0;
        }
      }
    },
    opcostid(te) { //使用当前审批人
      let sut = this.applicantlist;
      for (let k in sut) {
        if (sut[k].userId == te) {
          this.ad_cion(sut[k]);
          break;
        }
      }
    },
    bninputs(e, index) { //修改当前成本比例
      let ast = e.target.value;
      if (ast > 0 && ast < 101) {
        this.costlist[index].price = parseFloat(this.estimatedcost * (ast / 100)).toFixed(2);
      }
    },
    namest(it) {
      var su = [];
      for (let k in it) {
        su.push(it[k].name)
      }
      return su.join(',')
    },
    approval(indexs) {
      let nus = this.Butraveler; //出差人的集合
      if (nus.length == 0) {
        this.elast("请选择出差人员!")
        return
      }
      this.cosindex = indexs;
      this.selts();

    },
    ad_cion(item) {
      this.appli = JSON.parse(JSON.stringify(item));
      this.attdepartment = item.deptName;
      this.TravelCostCenlist = [];
      this.TravelDepartlist = [];
      this.NameCenter.name = item.costcenterName;
      this.NameCenter.id = item.costcenterId;
      this.appswlist();
    },
    async add_user() {
      let that = this;
      let estimatedcost = that.estimatedcost;//预估费用
      let constilist = that.costlist;//成本分摊
      let Butraveler = that.busslist; //出差人员
      let Traveltime = that.applicattime; //出差日期
      let Reasonsfor = that.marks; //出差事由
      let Dedescription = that.reson; //详细说明
      let Businlist = that.appcatlist; //出差行程
      let NameCenter = that.NameCenter; //成本中心
      let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
      let TravelDepartlist = that.TravelDepartlist; //部门审批人
      let fundCenter = that.fundCenter; //基金中心
      let oaSingleNumber = that.oaSingleNumber; //oa出差单号
      let wbs = that.wbs; //项目代码（wbs元素）
      let Hotels = []; //酒店行程
      let Aertrains = []; //飞机火车行程
      let Butravelers = []; //出差人员
      let apprvTaskStaffts = []; //审核人员
      if (Businlist.length == 0) {
        that.$message({
          message: '请选择出差行程',
          type: 'warning'
        })
      }
      for (let i = 0; i < Businlist.length; i++) {
        if (Businlist[i].type == 2 && Butraveler.length > 5) {
          that.$message({
            message: '火车行程只能选择五个人，如需添加更多请分开申请，谢谢！',
            type: 'warning'
          })
          return;
        }
      }
        if (Butraveler.length == 0) {
          that.$message({
            message: '请选择出差人员',
            type: 'warning'
          })
        } else if (Reasonsfor == '') {
          that.$message({
            message: '请输入出差事由',
            type: 'warning'
          })
        } else if (TravelCostCenlist.length == 0 && this.CostCi == true) {
          that.$message({
            message: '请选择审批人员',
            type: 'warning'
          })
        } else if (TravelDepartlist.length == 0 && this.CostCis == true) {
          that.$message({
            message: '请选择部门审批人',
            type: 'warning'
          })
        } else {
          let nums = 0;
          for (let g in constilist) {
            if (constilist[g].costcenterId == "") {
              that.elast("请输入成本中心！");
              return
            } else if (constilist[g].username.length == 0) {
              that.elast("请选择适用人员！");
              return
            } else if (constilist[g].bn == 0 || constilist[g].bn > 100) {
              that.elast("比例的值在1~100 ！");
              return
            }
            nums = this.add(nums, parseFloat(constilist[g].bn).toFixed(1));
          }
          if (nums != 100) {
            uni.showToast({
              title: '比例总和不为100',
              duration: 1000,
              icon: 'none'
            })
            return
          }
          let conlcvlust = [];
          for (let j in constilist) {
            conlcvlust.push({
              costId: constilist[j].costcenterId,
              costPercent: constilist[j].bn,
              passengerNo: constilist[j].username[0].passengerNo
            })
          }
          for (let i = 0; i < TravelCostCenlist.length; i++) { //成本中心审批人
            apprvTaskStaffts.push({
              deptCost: 2,
              nodeId: TravelCostCenlist[i].nodeId,
              personId: TravelCostCenlist[i].personId,
              staffId: TravelCostCenlist[i].staffId,
              staffName: TravelCostCenlist[i].staffName
            })
          }
          for (let i = 0; i < TravelDepartlist.length; i++) { //部门审批人
            apprvTaskStaffts.push({
              deptCost: 1,
              nodeId: TravelDepartlist[i].nodeId,
              personId: TravelDepartlist[i].personId,
              staffId: TravelDepartlist[i].staffId,
              staffName: TravelDepartlist[i].staffName
            })
          }
          for (let i = 0; i < Businlist.length; i++) { //行程
            if (Businlist[i].type == 3) { // 酒店 3
              Hotels.push({
                innerOuter: 1,
                cityCode: Businlist[i].staname.id,
                cityName: Businlist[i].staname.name,
                inDate: Businlist[i].sta + ' 00:00:00',
                outDate: Businlist[i].end + ' 00:00:00',
                remark: Businlist[i].endname
              })
            } else if (Businlist[i].type == 1 || Businlist[i].type == 2) { //飞机1 火车2
              let is = 0;
              let times = ''
              let tike = 1; //去还是回
              if (Businlist[i].end == '') {
                times = Businlist[i].sta + ' 00:00:00';
                tike = 1;
              } else {
                times = Businlist[i].end + ' 00:00:00';
                tike = 2;
              }
              if (Businlist[i].icname == 'Planeticket') {
                is = 1
              } else if (Businlist[i].icname == 'Train') {
                is = 2
              }
              if (Businlist[i].icname == 'Planeticket' && Businlist[i].end == '') {
                tike = 3
              }
              if (Businlist[i].icname == 'Train' || (Businlist[i].icname == 'Planeticket' && Businlist[i].end == '')) {
                Aertrains.push({
                  innerOuter: 1,
                  vehicle: is,
                  deptDate: times,
                  goBack: tike,
                  deptCityCode: Businlist[i].staname.id,
                  deptCityName: Businlist[i].staname.name,
                  arrivCityCode: Businlist[i].endname.id,
                  arrivCityName: Businlist[i].endname.name
                })
              } else {
                Aertrains.push({
                  innerOuter: 1,
                  goBackGroup: i,
                  vehicle: is,
                  deptDate: Businlist[i].sta + ' 00:00:00',
                  goBack: 1,
                  deptCityCode: Businlist[i].staname.id,
                  deptCityName: Businlist[i].staname.name,
                  arrivCityCode: Businlist[i].endname.id,
                  arrivCityName: Businlist[i].endname.name
                })
                Aertrains.push({
                  innerOuter: 1,
                  goBackGroup: i,
                  vehicle: is,
                  deptDate: Businlist[i].end + ' 00:00:00',
                  goBack: 2,
                  deptCityCode: Businlist[i].endname.id,
                  deptCityName: Businlist[i].endname.name,
                  arrivCityCode: Businlist[i].staname.id,
                  arrivCityName: Businlist[i].staname.name
                })
              }
            }
          }
          let butno = [];
          for (let i = 0; i < Butraveler.length; i++) {
            Butravelers.push({
              tempPerson: Butraveler[i].istrue,
              passengerNo: Butraveler[i].passengerNo,
              userName: Butraveler[i].userName,
              userId: Butraveler[i].userId,
              deptName: Butraveler[i].deptName, //部门名称
              deptId: Butraveler[i].deptId, //部门id
              phone: Butraveler[i].phone, //联系电话

            })
            butno.push(Butraveler[i].passengerNo)
          }
          let datw = {
            beforeMiddle: 1,
            taskType: 1,
            applyHotels: Hotels,
            applyVehicles: Aertrains,
            applyStaffs: Butravelers, //出行人
            apprvTasks: [{ //审核单
              wbs: fundCenter,
              oaTravelNo: oaSingleNumber,
              projectCode: wbs,
              applyStaffCostInfo: conlcvlust,
              totalBudget: estimatedcost,//预估费用
              beforeMiddle: 1,
              costId: NameCenter.id, //成本中心id
              costName: NameCenter.name,
              startDate: Traveltime[0] + ' 00:00:00', //出差开始时间
              endDate: Traveltime[1] + ' 00:00:00',
              taskType: 1,
              reason: Reasonsfor, //事由
              status: 0,
              remark: Dedescription, //详细说明
              apprvTaskStaffs: apprvTaskStaffts, //审核人
              passengerNo: butno
            }]
          }
          that.loading = true;
          try {
            let res = await this.$api.applicat.saveApprv(datw);
            that.loading = false;
            if (res.code == 200) {
              that.$message({
                message: res.message,
                type: 'success'
              })
              setTimeout(() => {
                this.$router.go(-1); //返回上一层
              }, 500)
            } else {
              that.loading = false;
              that.$message({
                message: res.message,
                type: 'warning'
              })
            }
            //提交出差申请
          } catch (e) {
            console.log(e)
            that.close()
          }
        }
    },
    addapli(it) { //新增行程
      for (let k in it) {
        this.appcatlist.push(it[k])
      }
    },
    deleteapp(index) {
      this.appcatlist.splice(index, 1)
    },
    add(a, b) { //经纬度的 加减乘除
      var c, d, e;
      try {
        c = a.toString().split(".")[1].length;
      } catch (f) {
        c = 0;
      }
      try {
        d = b.toString().split(".")[1].length;
      } catch (f) {
        d = 0;
      }
      return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) + this.mul(b, e)) / e;
    },
    mul(a, b) { //乘法
      var c = 0,
          d = a.toString(),
          e = b.toString();
      try {
        c += d.split(".")[1].length;
      } catch (f) {
      }
      try {
        c += e.split(".")[1].length;
      } catch (f) {
      }
      return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
    },
    passuser(list) { //选择当前人员
      this.drawer = false;

      let that = this;
      that.userid_list = list;
      that.busslist = that.userid_list;
      that.userconlist = [];
      that.costlist = [];
      let bnsi = parseInt(100 / that.busslist.length);
      for (let k in that.busslist) {
        that.userconlist.push({
          name: that.busslist[k].userName,
          passengerNo: that.busslist[k].passengerNo,
          ist: 0 //0是未选中状态
        })
        that.costlist.push({
          costcenterName: that.busslist[k].costcenterName,
          costcenterId: that.busslist[k].costcenterId,
          bn: bnsi,
          price: 0,
          username: [{
            name: that.busslist[k].userName,
            passengerNo: that.busslist[k].passengerNo
          }],
        })
      }
      if (bnsi * that.busslist.length != 100) {
        let sit = 100 - (that.busslist.length * bnsi); //余数
        for (var i = 0; i < sit; i++) {
          that.costlist[i].bn = bnsi + 1;
        }

      }

      that.TravelCostCenlist = [];
      that.TravelDepartlist = [];
      let datas = JSON.parse(sessionStorage.getItem('userinfost'));
      ;
      that.attdepartment = datas.user.deptName;
      that.applicantlist = [];
      for (let k in that.busslist) {
        if (that.busslist[k].costcenterName != '' && that.busslist[k].costcenterName != null && that.busslist[k].costcenterName !=
            undefined) {
          that.applicantlist.push({
            userName: that.busslist[k].userName,
            userId: that.busslist[k].userId,
            deptName: that.busslist[k].deptName,
            deptId: that.busslist[k].deptId,
            costcenterId: that.busslist[k].costcenterId,
            costcenterName: that.busslist[k].costcenterName,
            label: that.busslist[k].userName + '（' + that.busslist[k].costcenterName + '）'
          })
        }
      }
      let ops = false;

      for (let k in that.applicantlist) {
        if (that.applicantlist[k].userId == datas.user.id) {
          ops = true;
        }
      }
      if (ops == false) {
        that.applicantlist.unshift({
          userName: datas.user.name,
          deptName: datas.user.deptName,
          deptId: datas.user.deptId,
          userId: datas.user.id,
          costcenterId: datas.passengerVo.costcenterId,
          costcenterName: datas.passengerVo.costcenterName,
          label: datas.user.name + '（' + datas.passengerVo.costcenterName + '）'
        })
      }
      that.appli = {
        userId: datas.user.id,
        userName: datas.user.name,
        deptName: datas.user.deptName,
        deptId: datas.user.deptId,
        costcenterId: datas.passengerVo.costcenterId,
        costcenterName: datas.passengerVo.costcenterName
      }
      this.NameCenter.name = datas.passengerVo.costcenterName;
      this.NameCenter.id = datas.passengerVo.costcenterId;
    },
    drawers(its) { //点击成本或者部门审批人
      if (its == 'TravelCostCenlist') { //判断是部门还是成本中心
        this.iscost = true;
        this.drawelist = this.CostCenterlist;
        this.apprvCost = [];
        for (let i = 0; i < this.CostCenterlist.length; i++) {
          this.apprvCost.push({
            id: ''
          })
        }
      } else {
        this.iscost = false;
        this.drawelist = this.Deparapprover;
        this.apprvCost = [];
        for (let i = 0; i < this.Deparapprover.length; i++) {
          this.apprvCost.push({
            id: ''
          })
        }
      }

      this.draweruser = true;
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
      that.draweruser = false;
    },
    handleChange(index, value) { //选择成本中心
      this.setName(this.treeLists, value);
      this.costlist[index].costcenterName = this.conobj.text;
      this.costlist[index].costcenterId = this.conobj.id;
    },
    setName(datas, value) { //遍历树  获取id数组
      for (var i in datas) {
        if (datas[i].id == value) {
          this.conobj = {
            id: datas[i].id,
            text: datas[i].text
          }
          break;
        }
        if (datas[i].children) {
          this.setName(datas[i].children, value);
        }
      }
    },
    async appswlist() { //选获取部门和成本审批人信息
      let that = this;
      let nuarry = [];
      let nus = that.busslist; //出差人的集合
      for (var i = 0; i < nus.length; i++) {
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
    datond(old) {
      let dd = new Date();
      dd.setDate(dd.getDate() + old); //获取AddDayCount天后的日期
      let y = dd.getFullYear();
      let m = dd.getMonth() + 1; //获取当前月份的日期
      let d = dd.getDate();
      return y + "-" + m + "-" + d;
    },
    selts() { //查询成本中心
      let _this = this;
      _this.loading = true;
      _this.$api.home.getCostCenterList().then((res) => {
        _this.loading = false;
        if (res.code == 200) {
          _this.treeLists = res.data;
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
    buslis(list) {
      let li = [];
      for (let k in list) {
        li.push(list[k].userName);
      }
      return li.join(',')
    },
    applick() {
      this.datatimes = this.applicattime;
      this.appcatlist = []; //清空行程
      this.oldtimsck()
    },
    oldtimsck() { //计算多少天
      this.oldtime = this.count(this.applicattime[0], this.applicattime[1]); //多少天
    },
    count(ti, ts) {
      let aDate = ti.split("-")
      let oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])    //转换为12-18-2002格式
      aDate = ts.split("-")
      let oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
      let date = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
      return date + 1;
    },
    dealDisabledDate(time) {
      //禁掉小于当前日期
      var times = Date.now();
      return time.getTime() < times - 8.64e7;
    }
  }
}
</script>
<style scoped lang="less">
.cascadat /deep/ .el-input__inner {
  text-align: right;
  padding: 0;
  color: #333333;
  border: 0;
  background-color: #F6F6F6
}

span.font_color{
  color: red;
  font-size: 12px;
}
.cascadat /deep/ .el-input__suffix {
  display: none;
}

.cascadats /deep/ .el-input__inner {
  padding: 0;
  border: 0;
}

.cascadats /deep/ .el-input__suffix {
  display: none;
}

.box_lef {
  font-size: 14px;
  padding-bottom: 15px;
  color: #333333;
}

.applicalist {
  width: calc(100% - 30%);
  padding: 20px 17%;
  max-width: 1180px;
  min-width: 1180px;

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

  .applists {
    width: calc(100% - 60px);
    padding: 20px 58px;
    background-color: #FFFFFF;


    .drawerd {
      width: 100%;

      .drawertp {
        width: 100%;
        height: 10%;
        border-bottom: 1px solid #edf1f6;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .drivpass {
        width: 100%;
        height: 90%;
      }
    }

    .addpiboxs {
      width: 100%;
      margin-top: 20px;
      display: flex;
      color: #5F5F5F;

      .adflex {
        width: 100%;


        .boxiputbtns {
          margin-top: 20px;
          width: 100%;
          line-height: 40px;
          border-radius: 3px;
          color: #FFFFFF;
          text-align: center;
          background-color: #007AFF;
          cursor: pointer;
        }

        .boxiputbtns:hover {
          opacity: 0.8;
        }


        .boxiput {
          margin-bottom: 28px;
          width: 100%;
          height: 40px;
          border: 1px solid #e4e4e4;
          border-radius: 3px;
          line-height: 40px;
          font-size: 15px;
          display: flex;
          align-items: center;


          .box_input {
            width: calc(100% - 30%);
            height: 40px;
            display: flex;;

            input {
              width: 100%;
              border: 0;
            }
          }


          .inputsflor {
            width: 100%;
            height: 40px;
            display: flex;
            padding: 0 15px;

            .spnlist {
              width: 100%;
              overflow-x: auto;
            }

            cursor: pointer;

            input {
              width: 100%;
              border: 0;
            }

            input::-webkit-input-placeholder {
              /* 修改字体颜色 */
              color: #e5e5e5;
              /* 修改字号，默认继承input */
              font-size: 14px;
            }

            .datsto {
              font-size: 12px;
              text-align: left;
              width: calc(100% - 270px);
              min-width: 39px;
            }

            .inconts {
              color: #e5e5e5;
              font-size: 14px;
            }

            .inputime {
              border: 0;
              width: 100%;
              cursor: pointer;
              padding: 4px 0;
              display: flex;
              align-items: center;
            }

            .inputime /deep/ .el-input__icon {
              display: none;
            }

            .inputime /deep/ .el-range-separator {
              font-size: 12px;
            }
          }
        }

        .costsli {
          display: flex;
          line-height: 40px;
          width: calc(100% - 40px);
          margin: 0 20px;
          border-bottom: 1px solid #F1F1F1;

          .coslipc {
            display: flex;
            width: 50%;

            .costleft {
              color: #333333;
              width: 50%;
              font-size: 14px;
            }

            .costrightpl {
              width: 50%;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              font-size: 13px;
            }

            .costright {
              width: 50%;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              font-size: 13px;

              input {
                width: 60px;
                height: 25px;
                text-align: center;
                margin-right: 4px;
                border: 1px solid #E5E5E5;
                color: #333333;
              }
            }
          }
        }

        .costslist {
          background-color: #F6F6F6;
          border-radius: 4px;
          margin-top: 20px;
          width: 100%;
          border: 1px solid #EEEEEE;

          .costslis {
            display: flex;
            line-height: 40px;
            padding: 0 20px;
            justify-content: space-between;

            .costleft {
              color: #333333;
              width: 40%;
              font-size: 13px;
              display: flex;
              align-items: center;

              span {
                color: red;
                font-size: 16px;
                margin-right: 4px;
              }
            }

            .costrightpl {
              width: 60%;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              font-size: 13px;
              color: #C8C7CC;
            }

            .costright {
              color: #333333;
              width: 60%;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              font-size: 13px;

              input {
                width: 70px;
                height: 25px;
                text-align: center;
                margin-right: 4px;
                background-color: #F1F1F1;
              }
            }
          }
        }

        .applistadd {
          width: 100%;
        }

        .applistsd {
          width: 100%;
          .appuls {
            margin-top: 11px;
            display: flex;
            background-color: #F7FAFF;


            .applilenft {
              padding-right: 20px;
              height: 50px;
              margin: auto 0;
              text-align: center;
              line-height: 50px;
              color: #C3CED5;
              cursor: pointer;
            }

            .appligt {
              margin: auto 0;
              width: 100%;
              .aplifis {
                font-size: 14px;
                display: flex;

                .ap_icname{
                  color: #3C85FD;
                  font-size: 14px;
                  padding: 0 11px 0 20px;
                }
                .ap_name{
                  color: #333333;
                  width: 107px;
                }

                .ap_data{
                  padding-left: 59px;
                  color: #333333;
                }
              }
            }
          }
        }
      }

      .tilst {
        width: calc(50% - 40px);
        padding: 32px 0 0 109px;

        .adtoptitles {
          font-size: 16px;
          color: #3C85FD;
        }

        .optsbox {
          width: calc(100% - 80px);
         margin-top: 22px;

          .ottops {
            display: flex;
            align-items: center;

            .caisin {
              width: 23px;
              height: 23px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #E2E9F7;
              border-radius: 50%;

              .caisind {
                width: 9px;
                height: 9px;
                background: #FFFFFF;
                border-radius: 50%;
              }
            }

            .caisins {
              width: 23px;
              height: 23px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #3C85FD;
              border-radius: 50%;

              .caisinds {
                width: 9px;
                height: 9px;
                background: #FFFFFF;
                border-radius: 50%;
              }
            }

            .otnames {
              text-indent: 19px;
              font-size: 14px;
            }
          }

          .oksbox {
            width: 23px;
            display: flex;
            justify-content: center;
            margin: 2px 0;

            .ottback {
              width: 3px;
              height: 44px;
              background: #E2E9F7
            }

            .ottbacks {
              width: 3px;
              height: 44px;
              background: #E2E9F7;
            }
          }
        }
      }
    }
  }
}
</style>
