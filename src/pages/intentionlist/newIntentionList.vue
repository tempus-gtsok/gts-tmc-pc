<template>
  <div class="applicalist" style="margin-left: 17%">
    <div class="applists">
      <div class="aptops">
        <div class="apfirst" @click="routens">
          我的意向单列表
        </div>
        <div class="iconfont" style="margin-left: 5px;font-size: 14px;">
          &#xe636;
        </div>
        <div>
          意向单申请
        </div>
      </div>
      <el-drawer class="drawerd" size="28%" :with-header="false" :visible.sync="drawer" direction="rtl">
        <div class="drawertp">请选择出行旅客</div>
        <div class="drivpass">
          <passage @passlist="passuser"></passage>
        </div>
      </el-drawer>
      <div class="addpiboxs" v-loading="loading">
        <div class="adflex">
          <div class="boxinput">
            <div class="iconfont icon">
              &#xe8a4;
            </div>
            <div class="box_lef">
              申请类型
            </div>
            <div class="inputsflor">&emsp;
              <el-select v-model="businesstripType" placeholder="请选择" class="select">
                <el-option v-for="item in cause" :key="item.id" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="boxinput" v-if="businesstripType === 1">
            <div class="iconfont icon">
              &#xe8a4;
            </div>
            <div class="box_lef">
              出差预定
            </div>
            <div class="inputsflor">&emsp;
              <el-select v-model="bookingType" placeholder="请选择" @change="chans" class="select">
                <el-option v-for="item in Booking" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="vlislit" v-if="popvidshow">
            <div class='popContainer' v-if="popvidshow"></div>
            <div class="talist" v-for="(item, index) in stlistlist" :key="index" @click="adduslit(item)">
              <div class="tl_left">
                <div class="tl_tops">
                  <div class="tl_rightl">[机票]</div>
                  <div class="tl_rights">{{ item.citys.deptCityName }} - {{ item.citys.arrivCityName }}</div>
                </div>
                <div class="tl_bots" v-if="item.citys != null">
                  出发日期：{{ item.citys.deptDate.substring(0, 10) }}
                </div>
                <div class="tl_botsb">出差事由：{{ item.reson }}</div>
              </div>
              <div class="tl_right">
                <div class="tldv">确定</div>
              </div>
            </div>
          </div>
          <div class="boxinput">
            <div class="iconfont icon">
              &#xe8a4;
            </div>
            <div class="box_lef">
              目的地
            </div>
            <div class="inputsflor">&emsp;
              <citysearch @changers="listchangh" :ctiys="citylist" :issera="issera" :intentionlist="1"></citysearch>
            </div>
          </div>
          <div class="boxinput">
            <div class="iconfont icon">
              &#xe8a4;
            </div>
            <div>
              最早出发时间：
            </div>
            <div class="datainput">
              <el-date-picker v-model="earliest" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" prefix-icon=" "
                              placeholder="选择日期时间" :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </div>
          <div class="boxinput">
            <div class="iconfont icon">
              &#xe8a4;
            </div>
            <div>
              最晚出发时间：
            </div>
            <div class="datainput">
              <el-date-picker v-model="latest" type="datetime" prefix-icon=" " value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="选择日期时间"
                              :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </div>
          <div class="boxinput">
            <div class="iconfont icon">
              &#xe8a4;
            </div>
            <div class="box_lef">
              舱位等级
            </div>&emsp;
            <el-select v-model="cabinValue" placeholder="请选择舱位" class="select">
              <el-option v-for="item in cabin" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="boxinput">
            <div class="iconfont icon">
              &#xe8a4;
            </div>
            <div class="box_lef">
              首选航司
            </div>&emsp;
            <el-select v-model="airlinesValue" placeholder="请选择" v-if="airlines != null" class="select">
              <el-option v-for="item in airlines" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="boxinput">
            <div class="iconfont icon">
              &#xe8a4;
            </div>
            <div class="box_lef">
              价格范围
            </div>&emsp;
            <el-input v-model="price.sta" placeholder="1" style="width: 70px"
                      onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                      onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"></el-input>
            ~&emsp;&emsp;
            <el-input v-model="price.end" placeholder="N" style="width: 70px" @blur="judgment"
                      onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                      onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"></el-input>
          </div>
          <div class="boxinput">
            <div class="iconfont icon">
              &#xe8a4;
            </div>
            <div class="box_lef">
              出行人
            </div>
            <div class="inputsflor" @click="drawer = true">&emsp;
              <div class="inconts" v-if="busslist.length == 0">请选择出行人</div>
              <div class="inplis" v-if="busslist.length > 0">{{ buslis(busslist) }}</div>
            </div>
          </div>
          <div class="boxinput">
            <div class="iconfont icon">
              &#xe8a4;
            </div>
            <div class="box_lef">
              乘客人数
            </div>&emsp;
            <span>成人<el-input class="el_input" v-model="passenger.adult" oninput="value=value.replace(/[^\d]/g,'')"
                              placeholder="0" maxlength="3"></el-input>
							人</span>
            <span class="boxinput_span">小孩<el-input class="el_input" v-model="passenger.child"
                                                    oninput="value=value.replace(/[^\d]/g,'')"
                                                    placeholder="0" maxlength="3"></el-input>
							人</span>
            <span class="boxinput_span">婴儿<el-input class="el_input" v-model="passenger.baby"
                                                    oninput="value=value.replace(/[^\d]/g,'')"
                                                    placeholder="0" maxlength="3"></el-input>
							人</span>
          </div>
          <div class="boxinput">
            <div class="iconfont icon">
              &#xe8a4;
            </div>
            <div class="box_lef">
              联系人
            </div>&emsp;
            <el-input v-model="contactPersonName" placeholder="请填写联系人姓名" maxlength="20"></el-input>
          </div>
          <div class="boxinput">
            <div class="iconfont icon">
              &#xe8a4;
            </div>
            <div class="box_left_iphone">
              联系人电话
            </div>
            <el-input v-model="contactPersonIphone" placeholder="请填写联系人电话" maxlength="11"></el-input>
          </div>
          <div class="boxinput " style="min-height: 200px">
            <div class="box_cen">
              备注
            </div>
            <el-input resize="none" type="textarea" :autosize="{ minRows: 1, maxRows: 6}"
                      placeholder="请输入你的需求 如：指定航班CA1836.."
                      v-model="remarks">
            </el-input>
          </div>
          <div class="boxinputbtns" @click="addIntentionList">
            提交申请
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import passage from '@/components/common/passenger'
import addcity from '@/components/common/applicataddcity'
import citysearch from '@/components/common/citycomponents.vue';

export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(v) {
          return v.getTime() < new Date().getTime() - 86400000;
        }
      },
      issera: false, //是否使用出差预定
      stlistlist: [], //出差单
      conobj: {},
      earliest: '',
      latest: '',
      userconlists: [], //复制适用人员
      userconlist: [], //适用人员
      applicantlist: [], //申请人列表
      appli: {}, //当前选择申请人
      loading: false,
      appcatlist: [], //行程
      bots: { //使用props替换掉本来默认的lable和value 的键值
        value: 'id',
        label: 'text',
        checkStrictly: true, //可以选父级
        emitPath: false,
      },
      draweruser: false,
      apprvCost: [],
      drawelist: [], //盒子内容
      datatimes: [],
      contactPersonName: '', //联系人姓名
      contactPersonIphone: '',
      passenger: {
        adult: 0,
        child: 0,
        baby: 0,
      },
      remarks: '', //备注
      price: { //价格
        end: '',
        sta: ''
      },
      cabin: [{ //舱位等级
        label: '头等舱',
        value: 'F'
      }, {
        label: '商务舱',
        value: 'C'
      }, {
        label: '经济舱',
        value: 'Y'
      }],
      cabinValue: '', //选择的舱位等级
      userid_list: [], //出差的人员
      busslist: [], //出差人员
      drawer: false,
      cause: [{
        name: '因公',
        value: 1,
        id: 1
      }, {
        name: '因私',
        value: 2,
        id: 2
      }],
      Booking: [{ //是否使用出差预订
        label: '否',
        id: 0
      }, {
        label: '是',
        id: 1
      }],
      passengerTicket: '', //目的地城市
      bookingType: '', //当前选择的出差预订
      popvidshow: false,
      dialogVisible: false,
      passengers: [], //出行人员
      mokksli: '',
      citylist: [],
      businesstripType: '', //因公 or 因私
      airlines: null,
      airlinesValue: ''
    }

  },
  components: {
    passage,
    addcity,
    citysearch
  },
  mounted() {
    let datas = JSON.parse(sessionStorage.getItem('userinfost')); //检验是否是登录状态
    if (datas) {
      if (this.busslist.length == 0) {
        this.busslist = [{
          istrue: 1,
          passengerNo: datas.passengerVo.id,
          cardType: datas.passengerVo.certificateList[0].cardType,
          cardNo: datas.passengerVo.certificateList[0].cardNo,
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
        this.$api.order.queryAirlineList().then(res => {
          if (res.code == 200) {
            this.airlines = [];
            let data = res.data.airlineDds;
            for (let i in data) {
              this.airlines.push({
                value: i,
                label: data[i]
              })
            }
          }
        })
      }
    }
    this.routs();
  },
  methods: {
    addIntentionList() {
      let businesstripType = this.businesstripType; //因公or因私
      let bookingType = this.bookingType; //出差预订
      let passengerTicket = this.passengerTicket; //目的地
      let earliest = this.earliest; //最早出发时间
      let latest = this.latest; //最晚出发时间
      let cabinValue = this.cabinValue; //舱位等级
      let airlinesValue = this.airlinesValue; //首选航司
      let sta = this.price.sta; //最低价
      let end = this.price.end; //最高价
      let busslist = this.busslist; //出行人
      let passenger = this.passenger; //乘客人数
      let contactPersonName = this.contactPersonName; // 联系人
      let contactPersonIphone = this.contactPersonIphone; // 联系人电话
      let remarks = this.remarks; //备注

      let flights = [];
      flights.push({
        depart: passengerTicket[0].id,
        arrive: passengerTicket[1].id,
        minDepartDate: earliest,
        maxDepartDate: latest,
        minPrice: sta,
        maxPrice: end,
        departDate: earliest
      })
      let peoples = [passenger.adult,
        passenger.child,
        passenger.baby
      ];

      if (businesstripType == '') {
        this.$message.warning('请选择申请类型!');
        return;
      }
      if (bookingType === '' && businesstripType === 1) {
        this.$message.warning('请选择出差类型!')
        return;
      }
      if (end === '' || sta === '') {
        this.$message.warning('请填写价格范围！');
        return;
      }
      if (passengerTicket.length < 2 || passengerTicket[1].name == "" && passengerTicket[1].id == "") {
        this.$message.warning('请选择目的地!');
        return;
      }
      if (earliest === '') {
        this.$message.warning('请选择最早出发时间!');
        return;
      }
      if (latest === '') {
        this.$message.warning('请选择最晚出发时间!');
        return;
      }
      if (airlinesValue === '') {
        this.$message.warning('请选择航司！');
        return;
      }
      if (cabinValue === '') {
        this.$message.warning('请选择舱位等级!');
        return;
      }
      if (busslist.length === 0) {
        this.$message.warning('请选择出行人!');
        return;
      }
      if (contactPersonName === '') {
        this.$message.warning('请填写联系人姓名!');
        return;
      }
      if (contactPersonIphone === '') {
        this.$message.warning('请填写联系人电话！');
        return;
      }
      let dat = {};
      if (bookingType == 0) {
        let data = [];
        for (let i in busslist) {
          data.push({
            name: busslist[i].userName,
            cardNo: busslist[i].cardNo,
            cardType: busslist[i].cardType,
            phone: busslist[i].phone
          })
          dat = {
            travelType: businesstripType,
            flights: flights,
            serviceLevel: cabinValue,
            airline: airlinesValue,
            peoples: peoples,
            travelers: data,
            contacts: contactPersonName,
            contactPhone: contactPersonIphone,
            remark: remarks
          }
        }
      } else {
        dat = {
          travelType: businesstripType,
          flights: flights,
          serviceLevel: cabinValue,
          airline: airlinesValue,
          peoples: peoples,
          travelerNo: this.passengers[0].travelNo,
          contacts: contactPersonName,
          contactPhone: contactPersonIphone,
          remark: remarks
        }
      }
      this.$api.intentionlist.addRequire(dat).then(res => {
        if (res.code == 200) {
          this.$message.success('提交成功,工作人员会及时联系你');
          this.$router.push({
            path: '/intentList'
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    judgment() { //价格范围失去焦点时触发
      let end = this.price.end;
      let sta = this.price.sta;
      if (end < sta) {
        let x = this.price.end;
        this.price.end = this.price.sta;
        this.price.sta = x;
      }
    },
    listchangh(va) {
      //机票城市
      this.passengerTicket = va;
    },
    async routs() { //出差预订信息
      try {
        this.stlistlist = [];
        let res = await this.$api.home.getAgreeApprvTask({
          type: 1
        });
        if (res.code == 200) {
          let dat = res.data;
          for (let i in dat) {
            for (let k in dat[i].tmsGssLink.applyStaffs) {
              let datd = dat[i].tmsGssLink.applyVehicles[k];
              this.stlistlist.push({
                id: dat[i].tmsGssLink.applyVehicles[k].id,
                reson: dat[i].reason, //出差事由
                citys: datd, //出差信息
                nams: dat[i].tmsGssLink.applyStaffs, //出差人
                sit: {
                  deptName: dat[i].deptName, //部门名称
                  costcenterName: dat[i].costName,
                  deptId: dat[i].deptId, //部门id
                  costId: dat[i].costId, //成本中心id
                  costName: dat[i].costName, //成本中心名称
                  travelNo: dat[i].travelNo //出差单号
                }
              });
            }
          }
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
        this.stlistlist.sort(function (a, b) {
          return a.ctime < b.ctime ? 1 : -1
        }); //从大到小排序
      } catch (e) {
        console.log(e)
        //TODO handle the exception
      }
    },

    adduslit(item) {

      //选择当前出差单
      let vehicleIds = 0;
      this.citylist = [{
        id: item.citys.deptCityCode,
        name: item.citys.deptCityName
      }, {
        id: item.citys.arrivCityCode,
        name: item.citys.arrivCityName
      }];
      this.popvidshow = false;
      let userlis = [];
      for (var i = 0; i < item.nams.length; i++) {
        //出差人员

        userlis.push({
          travelNo: item.sit.travelNo,
          phone: item.nams[i].phone,
          istrue: item.nams[i].tempPerson,
          passengerNo: item.nams[i].passengerNo,
          userName: item.nams[i].userName,
          userId: item.nams[i].id,
          vehicleId: item.id, //事前出差单id
          vehicleIdBack: vehicleIds //事前往返 返回id
        });
      }

      this.issera = true;
      this.passengers = userlis;
      this.mokksli = item.sit;
    },
    chans() {
      if (this.bookingType == 0) {
        this.popvidshow = false;
        this.issera = false;
      } else if (this.bookingType == 1) {

        if (this.stlistlist.length === 0) {
          this.$message.warning('没有合适的出差申请！')
          this.popvidshow = false;
          this.bookingType = 0;
        } else {
          this.popvidshow = true;
        }
      }
    },
    namest(it) {
      var su = [];
      for (let k in it) {
        su.push(it[k].name)
      }
      return su.join(',')
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
    datond(old) {
      let dd = new Date();
      dd.setDate(dd.getDate() + old); //获取AddDayCount天后的日期
      let y = dd.getFullYear();
      let m = dd.getMonth() + 1; //获取当前月份的日期
      let d = dd.getDate();
      return y + "-" + m + "-" + d;
    },
    buslis(list) {
      let li = [];
      for (let k in list) {
        li.push(list[k].userName);
      }
      this.passenger.adult = list.length;
      return li.join(',')
    },
    applick() {
      this.appcatlist = []; //清空行程
    },
    count(ti, ts) {
      let date1 = new Date(ti);
      let date2 = new Date(ts);
      let date = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24); /*不用考虑闰年否*/
      return date
    },
    routens() { //返回列表页面
      this.$router.go(-1); //返回上一层
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
.select {
  width: 100%;
}

/deep/ .el-textarea__inner {
  display: block;
  resize: vertical;
  padding: 5px 15px;
  line-height: 1.5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  font-size: inherit;
  color: #606266;
  background-color: #fff;
  background-image: none;
  border: none;
  border-radius: 4px;
  -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
}

/deep/ .el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px 0 0;
  -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  width: 100%;
}

.applicalist {
  width: calc(100% - 30%);
  padding: 50px 15%;
  margin: 0 auto;

  .ditrslist {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  div.popContainer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 200;
  }

  //遮罩层  但是会遮住内容  现无法解决  已搁置

  .vlislit {
    position: absolute;
    left: 700px;
    top: 400px;
    width: 270px;
    padding: 0 10px;
    max-height: 300px;
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    background-color: #ffffff;
    z-index: 2801;
    cursor: pointer;
    overflow: auto;

    .talist {
      position: fixed;
      width: 250px;
      border: 1px solid #898989;
      padding: 10px 0;
      border-radius: 6px;
      display: flex;
      z-index: 300;
      background: #FFFFFF;

      .tl_left {
        height: 60px;
        width: 78%;
        margin-left: 2%;

        .tl_tops {
          display: flex;
          width: 100%;
          height: 25px;
          font-size: 12px;
          line-height: 25px;
          color: #333333;

          .tl_rightl {
            width: 20%;
          }

          .tl_rights {
            width: 80%;
            margin-left: 5px;
            overflow: hidden;
            text-overflow: ellipsis; //文本溢出显示省略号
            white-space: nowrap; //文本不会换行
          }
        }

        .tl_bots {
          width: 100%;
          height: 20px;
          font-size: 12px;
          line-height: 15px;
        }

        .tl_botsb {
          width: 100%;
          height: 20px;
          font-size: 12px;
          line-height: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .tl_right {
        margin-right: 20px;
        width: 20%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;

        .tldv {
          width: 50px;
          height: 25px;
          line-height: 25px;
          text-align: center;
          font-size: 12px;
          color: #e5e5e5;
          background: #007aff;
          border-radius: 30px;
        }
      }
    }
  }

  .applists {
    width: 500px;
    padding: 10px 30px;
    background-color: #ffffff;

    .aptops {
      width: 100%;
      height: 30px;
      display: flex;
      align-items: center;
      color: #A0A0A0;

      .apfirst {
        color: #000000;
        cursor: pointer;
      }
    }

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
      width: 200%;
      margin-top: 20px;
      display: flex;
      color: #5F5F5F;

      .adflex {
        width: 50%;

        .boxinputbtns {
          margin-top: 20px;
          width: 100%;
          line-height: 42px;
          border-radius: 3px;
          color: #FFFFFF;
          text-align: center;
          background-color: #007AFF;
          cursor: pointer;
        }

        .icon {
          font-size: 20px;
          color: red;
        }

        .boxinput {
          margin-top: 20px;
          width: 100%;
          height: 42px;
          border: 1px solid #e4e4e4;
          border-radius: 3px;
          line-height: 42px;
          font-size: 15px;
          display: flex;
          align-items: center;

          .box_cen{
            min-width: 80px;
            text-align: center;
          }

          .box_left_iphone {
            width: 120px;
          }

          .boxinput_span {
            padding-left: 30px;
          }

          .el_input {
            width: 40px;
            padding-left: 10px;
            text-align: center;
          }

          .box_lef {
            width: 80px;
            text-align: left;
          }

          .datainput {
            width: calc(100% - 130px);
            height: 42px;
            display: flex;
            cursor: pointer;
          }

          .inputsflor {
            width: 100%;
            height: 42px;
            display: flex;
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
            }

            .inconts {
              color: #e5e5e5;
              font-size: 14px;
            }

            .inputime {
              border: 0;
              width: 200px;
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
              }
            }
          }
        }
      }
    }
  }
}
</style>
