<template>
  <div class="header_myorder" v-if="shomlist" v-loading="loading">
    <div class="fexibtns">

    </div>
    <div class="navlist">
      <div :style="[
							{
								left: 150 * index + 'px'
							}
						]" v-for="(item, index) in oplist" :key="index" @click="acks(item.io)" v-if="item.is" class="naops"
           :class="actinst == item.io ? 'actvs' : ''">{{ item.name }}
      </div>
    </div>
    <div class="mopsitl">
      <div class="mptopslist">
        <div class="mpdiv" :class="actives == 1? 'mpdivs' :''" @click="handleSelect(1)">我的行程</div>
        <div class="mpdiv" :class="actives == 2? 'mpdivs' :''" @click="handleSelect(2)">历史行程</div>
      </div>
      <div class="mopins">
        <div class="mos_ol">
          <div class="motext">下单日期</div>
          <el-date-picker style="width: 140px;" value-format="yyyy-MM-dd" :editable="editables"
                          :picker-options="startDatePickerc"
                          v-model="fikdatec" type="date" placeholder="请选择日期" class="datime-style"></el-date-picker>
          <div class="boxtb"></div>
          <el-date-picker style="width: 140px;" value-format="yyyy-MM-dd" :editable="editables"
                          :picker-options="endDatePickerc"
                          v-model="enddatec" type="date" placeholder="不限" class="datime-style"></el-date-picker>
        </div>
        <div class="instlist">
          <div>交易单号：</div>
          <el-input v-model="ordernumber" style="width: 200px;" placeholder="请输入交易单号" class="ininputs">
          </el-input>
        </div>
        <el-select @change="opstlist('orderstatusel')" v-model="orderstatusels" style="width: 110px;" placeholder="订单状态"
                   class="select-style">
          <el-option v-for="item in orderstatuselist" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <div class="mosbtns" @click="search">
          查询
        </div>
      </div>

    </div>
    <div class="boxd" >
      <div v-for="(item,index) in shomlist" :key="index" class="datalis boxShow" v-if="shomlist.length > 0">
        <div v-if="actinst == 'tra' && rotes('tms:rec:train')"  class="trainsl" @click="train(item)">
          <div class="tartp tartpHc">
            <div v-if="item.saleOrder">火车票 交易单号：{{ item.saleOrder.transationOrderNo }}</div>
            <div class="firfour">{{ item.createTime }}</div>
          </div>
          <div class="trainslit">
            <div class="setlis" style="height: 60px;">
              <img style="width: 21px;height: 24px;" src="../../../static/image/home/Small-train.png"/>
              <div>{{ item.trainno }}</div>
            </div>
            <div class="traboot" v-if="item.traPassenger">
              <div class="trbtfit">
                <div>{{ item.fromstation }} - {{ item.tostation }}</div>
                <div>启程时间：{{ item.departureTime }}</div>
                <div >出行人：{{ item.traPassenger.name }}</div>
              </div>
              <div class="trbtsed">
                <div>￥{{ item.buyPrice }}</div>
              </div>
              <div class="trbtend">
                <div class="statusx">
                  <img :src="staname(item.status)" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="actinst == 4 && rotes('tms:rec:hotel')"  class="trainsl" @click="hote(item)">
          <div class="tartp tartpJp">
            <div class="tartp">
              <div>国内酒店 交易单号：{{ item.transationOrderNo }}</div>
              <div class="firfour">{{ item.createOrderTime }}</div>
            </div>
          </div>

          <div class="trainslit" v-if="item.hotelName">
            <div class="setlis">
              <div class="hotImg">
                <img v-if="item.hotelImg != null" :src="item.hotelImg" alt="">
              </div>
            </div>
            <div class="traboot">
              <div class="trbtfit">
                <div>{{ item.hotelName }}</div>
                <div>地址：{{ item.hotelAddress }}&nbsp;入住时间：{{ hotimes(item.arrivalDate) }}</div>
                <div>出行人：{{ item.guestName }}</div>
              </div>
              <div class="trbtsed">
                <div>￥{{ item.totalPrice }}</div>
              </div>
              <div class="trbtend">
                <img :src="staname(item.orderStatus)" alt="">
              </div>
            </div>
          </div>
        </div>
        <div v-if="actinst == 1 && rotes('tms:rec:filght')"  class="trainsl" @click="plane(item)">
          <div>
            <div class="tartp tartpJp" v-if="item.sale">
              <div class="tartp">
                <div>国内机票(单程) 交易单号：{{ item.sale.tradeNo }}</div>
                <div class="firfour">{{ item.createTime }}</div>
              </div>
            </div>

            <div class="trainslit">
              <div class="setlis">
                <div style="width: 50px;height: 22px;display: flex;align-items: center;justify-content: center;">
                  <img :src="item.ims" mode="" style="width: 24px;height: 22px;"></img>
                </div>
                <div><span
                    style="font-size: 14px;font-weight:bolder;#333">{{ company(item.airline) }}{{ item.flightNo }}</span>
                </div>
                <div style="font-size: 14px;">{{ item.flightNo }}</div>
              </div>
              <div class="traboot">
                <div class="trbtfit">
                  <div>{{ item.companys }}-{{ item.flightNo }}</div>
                  <div>启程时间：{{ item.departTime }}</div>
                  <div>出行人：{{ item.factName }}</div>
                </div>
                <div class="trbtsed">
                  <div>￥{{ item.salePrice }}</div>
                </div>
                <div class="trbtend" v-if="item.sale">
                  <div>{{ item.statusName }}({{ item.sale.statusName }})</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block" v-if="shomlist.length > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="10"
                     layout="prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
    <no-data v-if="shomlist.length === 0 && loading === false" class="noData"></no-data>
  </div>
</template>

<script>
import airports from '../../../static/js/airports.js'
import NoData from "@/components/common/noData";

export default {
  components: {NoData},
  data() {
    return {
      disablet: false, //是否有状态类型
      disabled: false, //是否禁用成本中心
      hang: [], //飞机航司名称
      hotname: '', //酒店名称
      hotaddress: '', //酒店地址
      predaddress: [], //航空名字
      timeout: null,
      ordernumber: '', //订单号
      travellingpeople: '', //出行人
      trancitysno: '', //火车飞机号
      shomlist: null, //数据
      total: 0, //多少条数据
      currentPage3: 1,
      treeListsst: [],
      loading: false,
      editables: false,
      startDatePickerc: this.beginDatec(),
      endDatePickerc: this.processDatec(),
      fikdatec: '', //开始时间 创建
      enddatec: '', //结束时间
      actinst: 1,
      searvalue: '', //搜索的值
      bots: { //使用props替换掉本来默认的lable和value 的键值
        value: 'id',
        label: 'text'
      },
      orderstatuselist: [], //订单状态
      orderstatusels: '', //订单状态
      oplist: [{
        name: '机票',
        io: 1,
        is: 'tms:rec:filght'
      }, {
        name: '火车',
        io: 'tra',
        is: 'tms:rec:train'
      }, {
        name: '酒店',
        io: 4,
        is: 'tms:rec:hotel'
      }],
      activeIndex: '1',
      actives: '1',
      trainstaus: [{ //火车正常票订单状态
        name: '不限',
        id: 0
      }, {
        name: '占座中',
        id: 1,
        url: '../../../static/image/home/In-seat.png'
      }, {
        name: '待支付',
        id: 2,
        url: '../../../static/image/home/unpaid.png'
      }, {
        name: '出票中',
        id: 3,
        url: '../../../static/image/home/ticket.png'
      }, {
        name: '已出票',
        id: 4,
        url: '../../../static/image/home/check.png'
      }, {
        name: '退票中',
        id: 5,
        url: '../../../static/image/home/Return-ticket.png'
      }, {
        name: '改签中',
        id: 6,
        url: '../../../static/image/home/Change-central.png'
      }, {
        name: '部分退废',
        id: 7,
        url: '../../../static/image/home/Part-retirement.png'
      }, {
        name: '部分改签',
        id: 8,
        url: '../../../static/image/home/Part-change.png'
      }, {
        name: '已退',
        id: 9,
        url: '../../../static/image/home/Order-returned.png'
      }, {
        name: '订单已废弃',
        id: 10,
        url: '../../../static/image/home/Order-abandoned.png'
      }, {
        name: '已改签',
        id: 11,
        url: '../../../static/image/home/Order-changed.png'
      }, {
        name: '占座失败',
        id: 12,
        url: '../../../static/image/home/Of-failure.png'
      }, {
        name: '出票失败',
        id: 13,
        url: '../../../static/image/home/Ticket-failure.png'
      }],
      hotelstaus: [{ //酒店订单状态
        name: '不限',
        id: 0
      }, {
        name: '待审核',
        id: 650,
        url: '../../../static/image/home/To-audit.png'
      }, {
        name: '处理中',
        id: 100,
        url: '../../../static/image/home/processing.png'
      }, {
        name: '待处理',
        id: 115,
        url: '../../../static/image/home/Pending.png'
      }, {
        name: '预定成功',
        id: 101,
        url: '../../../static/image/home/book-successfully.png'
      }, {
        name: '下单失败',
        id: 102,
        url: '../../../static/image/home/Order-failed.png'
      }, {
        name: '取消中',
        id: 400,
        url: '../../../static/image/home/Cancelled.png'
      }, {
        name: '取消成功',
        id: 401,
        url: '../../../static/image/home/Canceled.png'
      }, {
        name: '审批拒绝',
        id: 121,
        url: '../../../static/image/home/Approval-refused.png'
      }, {
        name: '占房成功',
        id: 122,
        url: '../../../static/image/home/Building-successful.png'
      }],
      planestaus: [{ //国内机票订单状态
        name: '不限',
        id: 0,
        url: '../../../static/image/home/订单-占房成功.png'
      }, {
        name: '正常',
        id: 1,
        url: '../../../static/image/home/订单-占房成功.png'
      }, {
        name: '改签',
        id: 2,
        url: '../../../static/image/home/订单-占房成功.png'
      },
        {
          name: '废退',
          id: 3,
          url: '../../../static/image/home/订单-占房成功.png'
        }
      ],
      datas: '',
      curPages: 1, //当前第几页
      page: 1, //当前第几页
    };
  },
  mounted() {
    this.datast();
    this.queryAirlineList(); //飞机国内航司查询

    let actid = sessionStorage.getItem('actinsts');
    if (actid != null && actid != undefined) {
      this.acks(actid)
    } else {
      this.queryOrders(); //订单查询
      this.orderstatuselist = this.planestaus; //默认展示国内机票状态
    }
    this.predaddress = airports.addressAirportAll;
    this.ordertypelist = this.retreaeform;
  },
  methods: {
    datast() {
      let date = new Date();

      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();

      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      //这样写显示时间在1~9会挤占空间；所以要在1~9的数字前补零;
      if (month + 1 < 10) {
        month = '0' + (month + 1);
      }
      if (day < 10) {
        day = '0' + day;
      }
      if (hour < 10) {
        hour = '0' + hour;
      }
      if (minute < 10) {
        minute = '0' + minute;
      }
      if (second < 10) {
        second = '0' + second;
      }
      this.datas = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    },
    plane(item) { //飞机正常单详情
      this.$router.push({
        path: '/planelist',
        query: {
          data: JSON.stringify(item),
          activeIndex: JSON.stringify(this.activeIndex)
        }
      });
    },
    hote(item) { //酒店订单详情
      this.$router.push({
        path: '/hoteoslist',
        query: {
          data: JSON.stringify(item)
        }
      });
    },
    train(item) { //火车票正常单详情
      this.$router.push({
        path: '/trainslist',
        query: {
          data: JSON.stringify(item)
        }
      });
    },
    hotimes(time) { //酒店时间转换
      return time.substring(0, 10)
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    cityname(name) { //城市名称
      let that = this;
      for (let j = 0; j < that.predaddress.length; j++) {
        if (name == that.predaddress[j].airportCode) {
          return that.predaddress[j].cityCName;
        }
      }
    },
    queryAirlineList() { //获取机场名称
      let _this = this;
      _this.$api.order.queryAirlineList().then((res) => {
        if (res.code == 200) {
          this.hang = res.data.airlineDds;
        } else {
          _this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((e) => {
        _this.$message({
          message: e,
          type: 'warning'
        })
        console.log(e)
      })
    },
    async queryOrders() { //查询
      let that = this;
      let dat = {};
      let res;
      let sow = "";
      if (that.actinst == 'tra') {
        sow = 10
      } else {
        sow = that.actinst
      }
      try {
        if (that.actives == 1) { //我的行程
          this.loading = true;
          if (that.actinst == 'tra' || that.actinst == 1) {
            dat = {
              pageVO: {
                curPage: that.page, //第几页
                rowNum: 10, //一页多少条
              },
              mssOrderRequest: {
                productType: sow,
                flyStartDate: this.datas,
                bookStartDate: this.fikdatec == '' ? null : this.fikdatec,
                bookEndDate: this.enddatec == '' ? null : this.enddatec,
                transationOrderNo: this.ordernumber == '' ? null : this.ordernumber,
                orderStatus: this.orderstatusels == '' ? null : this.orderstatusels
              }
            }
            res = await this.$api.order.queryMyselfOrders(dat); //火车飞机
            this.loading = false;
            if (res.code == 200) {
              // that.page++; //得到数据之后page+1
              that.total = res.data.records; //总共多少页
              that.shomlist = res.data.rows || [];
              if (that.actinst == 1) {
                for (let k in that.shomlist) {
                  //转换城市名
                  that.shomlist[k]['ims'] = 'http://file.feiren.com/00/02/' + that.shomlist[k].airline + '.png';
                  that.shomlist[k]['companys'] = that.company(that.shomlist[k].airline);
                  that.shomlist[k]['citynames'] = that.cityname(that.shomlist[k].depart);
                  that.shomlist[k]['citynamey'] = that.cityname(that.shomlist[k].arrive);
                }
              }
            } else {
            }
          } else {
            this.loading = true;
            dat = {
              pageVO: {
                curPage: that.page, //第几页
                rowNum: 10, //一页多少条
              },
              hotelOrderVo: {
                arrivalStartDate: this.datas,
                createStartTime: this.fikdatec == '' || this.fikdatec == null ? null : this.fikdatec + " 00:00:00",
                createEndTime: this.enddatec == '' || this.enddatec == null ? null : this.enddatec + " 00:00:00",
                transactionNo: this.ordernumber == '' ? null : this.ordernumber,
                orderStatus: this.orderstatusels == '' ? null : this.orderstatusels
              }
            }
            res = await this.$api.order.searchMySelfHotelOrderList(dat); //酒店
            this.loading = false;
            if (res.code == 200) {
              // that.page++; //得到数据之后page+1
              that.total = res.data.records; //总共多少页
              that.shomlist = res.data.rows;
            } else {
            }
          }
        } else { //历史行程
          if ((that.actinst == 'tra' && this.rotes('tms:rec:train') )|| (that.actinst == 1 && this.rotes('tms:rec:filght'))) {
            this.loading = true;
            dat = {
              pageVO: {
                curPage: that.page, //第几页
                rowNum: 10, //一页多少条
              },
              mssOrderRequest: {
                productType: sow,
                flyEndDate: this.datas,
                bookStartDate: this.fikdatec == '' ? null : this.fikdatec,
                bookEndDate: this.enddatec == '' ? null : this.enddatec,
                transationOrderNo: this.ordernumber == '' ? null : this.ordernumber,
                orderStatus: this.orderstatusels == '' ? null : this.orderstatusels
              }
            }
            res = await this.$api.order.queryMyselfOrders(dat); //火车飞机
            this.loading = false;
            if (res.code == 200) {
              // that.page++; //得到数据之后page+1
              that.total = res.data.records; //总共多少页
              that.shomlist = res.data.rows;
              if (that.actinst == 1) {
                for (let k in that.shomlist) { //转换城市名
                  that.shomlist[k]['ims'] = 'http://file.feiren.com/00/02/' + that.shomlist[k].airline + '.png';
                  that.shomlist[k]['companys'] = that.company(that.shomlist[k].airline);
                  that.shomlist[k]['citynames'] = that.cityname(that.shomlist[k].depart);
                  that.shomlist[k]['citynamey'] = that.cityname(that.shomlist[k].arrive);
                }
              }
            }
          } else if (that.actinst == 4 && this.rotes('tms:rec:hotel')){
            this.loading = true;
            dat = {
              pageVO: {
                curPage: that.page, //第几页
                rowNum: 10, //一页多少条
              },
              hotelOrderVo: {
                arrivalEndDate: this.datas,
                createStartTime: this.fikdatec == '' || this.fikdatec == null ? null : this.fikdatec + ' 00:00:00',
                createEndTime: this.enddatec == '' || this.enddatec == null ? null : this.enddatec + ' 00:00:00',
                transactionNo: this.ordernumber == '' ? null : this.ordernumber,
                orderStatus: this.orderstatusels == '' ? null : this.orderstatusels
              }
            }
            res = await this.$api.order.searchMySelfHotelOrderList(dat); //酒店
            this.loading = false;
            if (res.code == 200) {
              // that.page++; //得到数据之后page+1
              that.total = res.data.records; //总共多少页
              that.shomlist = res.data.rows;
            } else {
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    company(ie) { //飞机航司名称
      for (let s in this.hang) {
        if (ie == s) {
          ie = this.hang[s];
          return ie;
        }
      }
    },
    search() { //点击查询
      this.queryOrders(); //订单查询
    },
    handleCurrentChange(val) { //翻页total
      this.page = val;
      this.search();
    },
    handleSelect(key, keyPath) {
      if(this.activeIndex == key) return
      this.activeIndex = key;
      this.actives = key;
      this.ordernumber = ''
      this.queryOrders(); //订单查询
    },
    opstlist(va) {
      this.page = 1; //几页
      this.currentPage3 = 1;
      if (va == 'ordertypel') { //订单状态
        this.treeListsst = '';
        this.disabled = false;
        this.ordertypels = ''
        if (this.actinst == 1) {
          this.orderstatuselist = this.planestaust; //展示国内机票状态
        } else if (this.actinst == 'tra') {
          this.orderstatuselist = this.trainstaus; //展示火车票状态
        }
        this.queryOrders()
      }
    },
    acks(it) {
      this.actinst = it;
      sessionStorage.setItem('actinsts', it)
      this.disablet = false;
      if (it == 1 || it == '1') {
        this.orderstatuselist = this.planestaus; //展示国内机票状态
      } else if (it == 'tra') {
        this.orderstatuselist = this.trainstaus; //展示火车票状态
      } else if (it == 4 || it == '4') {
        this.disablet = true;
        this.orderstatuselist = this.hotelstaus; //展示酒店状态
      }
      this.page = 1; //几页
      this.currentPage3 = 1;
      this.fikdatec = ''; //创建时间
      this.enddatec = '';
      this.fikdate = ''; //出行时间
      this.enddate = '';
      this.orderstatusels = ''; //订单状态
      this.ordernumber = ''; //销售单号
      this.ordertypels = '';
      if (it == 1 || it == 'tra' || it == 4) {
        this.queryOrders();
      }
    },
    staname(id) {
      let vat = this.orderstatuselist;
      for (let i in vat) {
        if (id == vat[i].id) {
          return vat[i].url
        }
      }
    },
    beginDatec() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.enddatec) {
            //如果结束时间不为空，则小于结束时间
            return new Date(self.enddatec).getTime() < time.getTime();
          } else {
          }
        }
      };
    },
    processDatec() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.fikdatec) {
            //如果开始时间不为空，则结束时间大于开始时间
            return new Date(self.fikdatec).getTime() > time.getTime();
          } else {
          }
        }
      };
    },
  }
};
</script>

<style scoped lang="less">
/deep/ .select-style {
  margin-right: 20px;
  .el-input__inner {
    border: 0;
  }
}

/deep/ .datime-style {
  .el-input__inner {
    border: 0;
  }
}



.header_myorder {
  width: 1180px;
  padding: 5px 0;
  margin: 0 auto;
  position: relative;
  .noData{
    top: 30%;
  }
  .fexibtns {
    position: absolute;
    top: 65px;
    left: 0%;
    width: 100%;
    height: 2px;
    z-index: 80;
    background-color: #3c85fd;

  }

  .navlist {
    display: flex;
    color: #a6b7c2;
    height: 50px;
    position: absolute;
    position: relative;
    left: 0;
    bottom: -17px;

    .naops {
      z-index: 70;
      top: 0;
      padding: 0 40px;
      height: 42px;
      margin-right: 30px;
      text-align: center;
      line-height: 50px;
      font-size: 18px;
      background-color: #FFFFFF;
      cursor: pointer;
      border: 1px solid #E4E5E7;
      border-bottom: 2px solid #3c85fd;
    }

    .naops:hover {
      color: #3c85fd;
    }

    .actvs {
      z-index: 90;
      height: 41px;
      color: #3c85fd;
      border: 2px solid #3c85fd;
      border-bottom: 2px solid #FFFFFF;
    }
  }

  .mopsitl {
    margin-top: 10px;
    position: relative;
    padding: 30px;
    width: calc(100% - 60px);
    background: #ffffff;

    .mptopslist {
      display: flex;
      margin-bottom: 20px;
      cursor: pointer;
      color: #666666;

      .mpdiv {
        padding: 0 50px;
        font-size: 16px;
        text-align: center;
        border: 1px solid #DBDBDB;
        line-height: 40px;
      }
      .mpdiv:hover {
        
        background-color: #ddecff;
      }

      .mpdivs {
        background-color: #3c85fd;
        color: #FFFFFF;
        &:hover {
        background-color: #3c85fd;
         color: #FFFFFF;
      }
      }
    }

    .mopins {
      display: flex;
      align-items: center;

      .instlist {
        display: flex;
        margin-right: 20px;
        font-size: 14px;

        /deep/ .ininputs {
          .el-input__inner {
            height: 50px;
          }
        }

        div {
          line-height: 50px;
          width: 70px;
        }
      }

      .mos_ol {
        margin-right: 30px;
        width: 40%;
        height: 50px;
        border: 1px solid #d0d0d0;
        border-radius: 3px;
        line-height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;

        .motext {
          font-size: 14px;
        }

        .boxtb {
          width: 20px;
          height: 1px;
          background-color: #d0d0d0;
        }

      }

      .mosbtns {
        width: calc(20% - 60px);
        height: 50px;
        background-color: #FF9A33;
        color: #FFFFFF;
        font-size: 18px;
        text-align: center;
        line-height: 50px;
        border-radius: 3px;
        cursor: pointer;
      }

      .mosbtns:hover {
        opacity: 0.8;
      }
    }

    .sits {
      margin-top: 20px;
      height: 50px;
      display: flex;
      align-items: center;

      .sitstime {
        cursor: pointer;
        font-size: 14px;
        margin-right: 30px;
      }

      .sitstime:hover {
        color: #FF6957;
      }
    }
  }

  .boxd {
    width: 100%;
    min-height: 550px;
    margin-top: 20px;

    .datalis {
      margin-bottom: 20px;
      width: 100%;
      border-radius: 2px;
      background-color: #FFFFFF;
      box-shadow: 0 0 14px 0 rgba(177, 190, 203, 0.2);

      .trainsl {
        .tartp {
          width: 1120px;
          display: flex;
          font-size: 14px;
          justify-content: space-between;
          height: 50px;
          background-color: #E3EFFF;
          align-items: center;
          .firfour {
            color: #969B9E;
          }
         
        }
        .tartpJp,.tartpHc{
            padding: 0 30px;
          }
        .trainslit {
          width: 100%;
          height: 120px;
          display: flex;
          cursor: pointer;
          align-items: center;

          .setlis {
            width: 17%;
            height: 90px;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            div {
              height: 90px;
             
            }
             .hotImg{
               width: 134px;
              background-color: #ddd;
            }
             &>div:nth-child(2){
              margin: 8px 0;
            }
            img {
              width: 134px;
              height: 90px;
            }

            p {
              font-size: 15px;
              line-height: 40px;
              color: #999999;
            }
          }

          .traboot {
            display: flex;
            flex: 1;
            color: black;
            font-size: 14px;
            margin-left: 152px;
            .trbtfit {
              flex: 3;
              height: 80px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              div:nth-child(1) {
                font-weight: 800;
                font-size: 18px;
                color: black;
                display: flex;
                align-items: center;

                img {
                  width: 15px;
                  height: 15px;
                  margin-right: 5px;
                }
              }
            }

            .trbtsed {
              flex: 1.5;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 10px;
              .thst {
                margin: 0 10px;
                padding: 0 10px;
                line-height: 25px;
                background: red;
                color: #FFFFFF;
              }

              div:last-child {
                font-size: 20px;
                font-weight: 700;
                color: #FF4400;
              }
            }

            .trbtend {
              min-width: 73px;
              height: 80px;
              display: flex;
              position: relative;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin-right: 34px;
              .statusx {
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                  width: 73px;
                  height: 73px;
                }
              }
            }
          }
        }
      }
    }
  }

  .block {
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /deep/ .el-loading-mask{
    &>.el-loading-spinner{
      top: 20%;
    }
  }
}
</style>
