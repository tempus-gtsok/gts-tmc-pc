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
          <div class="boxiput">
            <div class="iconfont icon">
              &#xe8a4;
            </div>
            <div class="box_lef">
              申请类型
            </div>
            <div class="inputsflor">&emsp;
              <el-select v-model="businesstripType" placeholder="请选择" class="select">
                <el-option
                    v-for="item in cause"
                    :key="item.id"
                    :label="item.name"
                    :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="boxiput" v-if="businesstripType === 1">
            <div class="iconfont icon">
              &#xe8a4;
            </div>
            <div class="box_lef">
              出差预定
            </div>
            <div class="inputsflor">&emsp;
              <el-select v-model="bookingType" placeholder="请选择" @change="chans" class="select">
                <el-option
                    v-for="item in Booking"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="vlislit" v-if="popvidshow">
            <div class='popContainer'></div>
            <div class="talist" v-for="(item, index) in stlistlist" :key="index"
                 @click="adduslit(item)">
              <div class="tl_left">
                <div class="tl_tops">
                  <div class="tl_rightl">[酒店]</div>
                  <div class="tl_rights">{{ item.citys.cityName }}</div>
                </div>
                <div class="tl_bots" v-if="item.citys != null">
                  {{ item.citys.inDate.substring(0, 10) }}&emsp;入住&emsp;{{ item.citys.outDate.substring(0, 10) }}&emsp;离店
                </div>
                <div class="tl_botsb">出差事由：{{ item.reson }}</div>
              </div>
              <div class="tl_right">
                <div class="tldv">确定</div>
              </div>
            </div>
          </div>
          <div class="boxiput">
            <div class="iconfont icon">
              &#xe8a4;
            </div>
            <div class="box_lef">
              目的地
            </div>
            <div class="inputsflor">&emsp;
              <citysearchh @changers="listchangh" :ctiys="citylist"
                           :issera="issera" hotelapplication="1"></citysearchh>
            </div>
          </div>
          <div class="boxiput">
            <div class="iconfont icon">
              &#xe8a4;
            </div>
            <div class="box_lef">
              酒店名称
            </div>
            <div class="inputsflor">&emsp;
              <input type="text" v-model="hotelName" placeholder="入住酒店名称"></input>
            </div>
          </div>
          <div class="boxiput">
            <div class="iconfont icon">
              &#xe8a4;
            </div>
            <div class="box_lef">
              入离日期
            </div>
            <div class="inputsflor">&emsp;
              <el-date-picker value-format="yyyy-MM-dd" class="inputime" v-model="applicattime" type="daterange"
                              @change="applick"
                              range-separator="至" start-placeholder=" " end-placeholder=" " :editable="false"
                              :clearable="false"
                              :picker-options="pickerOptions" :disabled="issera"></el-date-picker>
              <div class="datsto">
                共{{ oldtime }}晚
              </div>
            </div>
          </div>
          <div class="boxiput">
            <div class="iconfont icon">
              &#xe8a4;
            </div>
            <div class="box_lef">
              星级要求
            </div>&emsp;
            <el-select v-model="hotelStarsValue" placeholder="请选择" class="select">
              <el-option
                  v-for="item in hotelStars"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
              </el-option>
            </el-select>
          </div>
          <div class="boxiput">
            <div class="iconfont icon">
              &#xe8a4;
            </div>
            <div class="box_lef">
              床型要求
            </div>&emsp;
            <el-select v-model="hotelBedTypeValue" placeholder="请选择" class="select">
              <el-option
                  v-for="item in hotelBedType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
              </el-option>
            </el-select>
          </div>
          <div class="boxiput">
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
          <div class="boxiput">
            <div class="iconfont icon">
              &#xe8a4;
            </div>
            <div class="box_lef">
              入住人
            </div>
            <div class="inputsflor" @click="drawer = true">&emsp;
              <div class="inconts" v-if="busslist.length == 0">请选择入住人员</div>
              <div class="inplis" v-if="busslist.length > 0">{{ buslis(busslist) }}</div>
            </div>
          </div>
          <div class="boxiput">
            <div class="iconfont icon">
              &#xe8a4;
            </div>
            <div class="box_lef">
              房间数
            </div>&emsp;
            <el-input v-model="hotelQuantity" placeholder="1~N" style="width: 50px"
                      onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                      onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"></el-input>
            间
          </div>
          <div class="boxiput " style="min-height: 200px">
            <div class="box_cen">
              备注
            </div>
            <el-input resize="none" type="textarea" :autosize="{ minRows: 1, maxRows: 6}"
                      placeholder="请输入你的需求 如：楼层高点.."
                      v-model="remarks">
            </el-input>
          </div>
          <div class="boxiputbtns" @click="addHotel">
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
import citysearchh from '@/components/common/citycomponents_h.vue';

export default {
  data() {
    return {
      issera: false, //是否使用出差预定
      stlistlist: [], //出差单
      conobj: {},
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
      remarks: '', //备注
      hotelStars: [{
        label: '二星级/经济',
        value: 1
      }, {
        label: '三星级/舒适',
        value: 2
      }, {
        label: '四星级/高档',
        value: 3
      }, {
        label: '五星级及以上/豪华',
        value: 4
      }], //酒店星级选择
      hotelStarsValue: '', //当前选择的星级
      hotelName: '', //酒店名称
      hotelQuantity: '',
      price: {
        end: '',
        sta: ''
      },
      hotelBedType: [
        {
          label: '大床',
          value: 1
        },
        {
          label: '双床',
          value: 2,
        }, {
          label: '不限',
          value: 3
        }
      ],
      hotelBedTypeValue: '', //当前选择的床型
      oldtime: 1,
      userid_list: [], //出差的人员
      busslist: [], //出差人员
      applicattime: [], //出差时间
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
      Booking: [{
        label: '否',
        id: 0
      }, {
        label: '是',
        id: 1
      }],
      hotcltys: '', //目的地城市
      bookingType: '',  //当前选择的出差预订
      popvidshow: false,
      dialogVisible: false,
      passengers: [], //出行人员
      mokksli: '',
      citylist: [],
      isbeforehand: [], //是否使用出差预定
      businesstripType: '', //因公 or 因私
      pickerOptions: {
        disabledDate: time => {
          return this.dealDisabledDate(time);
        },
      }
    }
  },
  components: {
    passage,
    addcity,
    citysearchh
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
      }
    }
    this.routs();
    this.applicattime = [this.datond(0), this.datond(1)]; //默认时间
    this.datatimes = this.applicattime;
    this.oldtimsck(); //默认多少天
  },
  methods: {
    judgment() { //价格范围失去焦点时触发
      let end = this.price.end;
      let sta = this.price.sta;
      if (end < sta) {
        let x = this.price.end;
        this.price.end = this.price.sta;
        this.price.sta = x;
      }
    },
    async addHotel() { //提交
      let businesstripType = this.businesstripType; //申请类型
      let bookingType = this.bookingType; //出差预订
      let hotcltys = this.hotcltys; //入住城市
      let hotelName = this.hotelName;  // 酒店名称
      let applicattime = this.applicattime; //入离日期
      let hotelStarsValue = this.hotelStarsValue; //星级
      let hotelBedTypeValue = this.hotelBedTypeValue; //床型
      let priceSta = this.price.sta;  //起始价格
      let priceEnd = this.price.end;  //终止价格
      let busslist = this.busslist;  //入住人员
      let hotelQuantity = this.hotelQuantity; //酒店房间数量
      let remarks = this.remarks;  //备注
      if (businesstripType === '' || businesstripType == null) {
        this.$message.warning('请选择申请类型！');
        return;
      }

      if ((bookingType === '' || bookingType == null) && businesstripType === 1) {
        this.$message.warning('请选择出差预订！')
        return;
      }
      if (hotcltys === '' || hotcltys == null) {
        this.$message.warning('请选择入住城市');
        return;
      }
      if (hotelName === '' || hotelName == null) {
        this.$message.warning('请输出酒店名称');
        return;
      }

      if (hotelStarsValue === '' || hotelStarsValue == null) {
        this.$message.warning('请选择您想要入住酒店的星级');
        return;
      }

      if (hotelBedTypeValue === '' || hotelBedTypeValue == null) {
        this.$message.warning('请选择您对床位的要求');
        return;
      }

      if (priceSta === '' || priceSta == null || priceEnd === '' || priceEnd == null) {
        this.$message.warning('请输入您对酒店预期的价格');
        return;
      }

      if (hotelQuantity === '' || hotelQuantity == null) {
        this.$message.warning('请输入您需要的房间数量');
        return;
      }
      let travelers = [{
        name: busslist[0].userName,
        cardNo: busslist[0].cardNo,
        cardType: busslist[0].cardType,
        passengerNo: busslist[0].passengerNo,
        employeeType: 1,
        phone: busslist[0].phone,
        costcenterName: busslist[0].costcenterName,
        deptName: busslist[0].deptName
      }];
      let dat = {}
      if (businesstripType === 1 && bookingType === 1) {
        dat = {
          arrivalDate: applicattime[0],
          departureDate: applicattime[1],
          bookCount: hotelQuantity,
          city: hotcltys[0].name,
          hotelLevel: hotelStarsValue,
          lowestPrice: priceSta,
          highestPrice: priceEnd,
          hotelName: hotelName,
          bedTypeName: hotelBedTypeValue,
          travelType: businesstripType,
          travelNo: this.stlistlist[0].citys.travelNo,
          remark: remarks,
        }
      } else {
        dat = {
          arrivalDate: applicattime[0],
          departureDate: applicattime[1],
          bookCount: hotelQuantity,
          city: hotcltys[0].name,
          hotelLevel: hotelStarsValue,
          lowestPrice: priceSta,
          highestPrice: priceEnd,
          hotelName: hotelName,
          bedTypeName: hotelBedTypeValue,
          travelType: businesstripType,
          remark: remarks,
          travelers: JSON.stringify(travelers)
        }
      }
      let res = await this.$api.intentionlist.submitHolRequire(dat);
      if (res.code == 200) {
        this.$message.success(res.message);
        this.$router.push({
          path: '/intentList',
          query: {
            id: 4
          }
        })

      }
    },
    listchangh(va) {
      //酒店城市
      this.hotcltys = va;
    },
    async routs() {
      try {
        this.stlistlist = [];
        let res = await this.$api.home.getAgreeApprvTask({
          type: 3
        });
        if (res.code == 200) {
          this.appartasklist = res.data.concat(this.appartasklist);
          let dat = res.data;
          for (let i in dat) {
            for (let k in dat[i].tmsGssLink.applyHotels) {
              let datd = dat[i].tmsGssLink.applyHotels[k];
              datd.std = 6; //酒店
              this.stlistlist.push({
                id: dat[i].tmsGssLink.applyHotels[k].id,
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
      this.applicattime = [item.citys.inDate.substring(0, 10), item.citys.outDate.substring(0, 10)];
      this.citylist = [{
        id: item.citys.cityCode,
        name: item.citys.cityName
      }];
      this.hot_cyval = item.citys.remark;
      this.hot_cyvals = item.citys.remark;

      this.isbeforehand = [1];
      this.popvidshow = false;
      let userlis = [];
      for (var i = 0; i < item.nams.length; i++) {
        //出差人员
        userlis.push({
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
      this.oldtimsck();
    },
    chans() {
      if (this.bookingType == 0) {
        this.popvidshow = false;
        this.issera = false;
      } else if (this.bookingType == 1) {
        this.popvidshow = true;
        if (this.stlistlist.length === 0) {
          this.popvidshow = false;
          this.$message.warning('没有合适的出差申请！')
          this.bookingType = 0;
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

.cascadat /deep/ .el-input__inner {
  text-align: right;
  padding: 0;
  border: 0;
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

.applicalist {
  width: calc(100% - 30%);
  padding: 5px 15%;
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
      width: 300px;
      border-top: 1px solid #e5e5e5;
      padding: 10px 0;
      background: #FFFFFF;
      display: flex;
      z-index: 300;

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

        .boxiputbtns {
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

        .boxiput {
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
          .box_lef {
            width: 80px;
            text-align: left;
          }

          .inputsflor {
            width: calc(100% - 130px);
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
