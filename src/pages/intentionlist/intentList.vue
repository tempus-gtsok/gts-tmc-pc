<!--
       author: I won’t leave my name, for fear of being beaten by someone who takes over
-->
<template>
<!-- 我的意向单 -->
  <div class="header_myorder" v-loading="loading">
    <div class="fexibtns">

    </div>
    <div class="navlist">
      <div :style="[
							{
								left: 150 * index + 'px'
							}
						]" v-for="(item, index) in oplist" :key="index" @click="acks(item.io)" class="naops" :class="actinst == item.io ? 'actvs' : ''">{{ item.name }}</div>
    </div>
    <div class="mopsitl">
      <div class="inpuslist">
        <div class="instlist">
          <div v-if="actinst == 1">出行人：</div>
          <div v-if="actinst == 4">入住人：</div>
          <el-autocomplete v-model="travellingpeople" :placeholder="actinst == 4?'入住人':'出行人'" style="width: 150px;" :fetch-suggestions="querySearchAsync" @select="handleSelect">
          </el-autocomplete>
          <el-select v-model="orderStatus" placeholder="订单状态" style="margin:0 10px 0 20px" v-if="actinst == 4">
            <el-option
                v-for="item in hotelOrderStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="aircraftStatus" placeholder="订单状态" style="margin:0 10px 0 20px" v-if="actinst == 1">
            <el-option
                v-for="item in aircraftOrderStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" icon="el-icon-search" @click="selectList">搜索</el-button>
          <el-button type="primary" @click="newRequisition">新建</el-button>
        </div>

      </div>
    </div>
    <div class="boxd">
      <div v-for="(item,index) in hotelDetails" :key="index" class="datalis boxShow" v-if="hotelDetails.length > 0 && actinst == 4">
        <div v-if="actinst == 4" class="trainsl" @click="Details(item)">
          <div class="tartp">
            <div class="tartp_s iconfont">
              <span style="font-size: 26px;color: #1eacf6;text-align: center">&#xe624;</span><div>酒店意向单</div>
            </div>
            <div class="tartp_e">
              <div>{{item.createOrderTime}}</div>
            </div>
          </div>
          <div class="trainslit" v-if="item != null">
            <div class="setlis">
              <img src="static/image/intentionlist/hotel.png" alt="">
            </div>
            <div class="traboot">
              <div class="trbtfit">
                <div>{{item.hotelName}}</div>
                <div>入住时间：{{item.arrivalDate}}</div>
                <div>入住人：{{item.guestNames}}</div>
              </div>
              <div class="trbtend" v-if="item.orderStatus === '0'">
                <img src="../../../static/image/home/Approval-Pending.png" alt="">
              </div>
              <div class="trbtend" v-if="item.orderStatus === '1'">
                <img src="../../../static/image/intentionlist/tongguo.png" alt="">
              </div>
              <div class="trbtend" v-if="item.orderStatus === '2'">
                <img src="../../../static/image/intentionlist/judan.png" alt="">
              </div>
              <div class="trbtend" v-if="item.orderStatus === '3'">
                <img src="../../../static/image/intentionlist/yiqueren.png" alt="">
              </div>
              <div class="trbtend " v-if="item.orderStatus === '4'">
                <img src="../../../static/image/home/Canceled.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-for="(item,index) in aircraftDetails" :key="index" class="datalis boxShow" v-if="aircraftDetails.length > 0 && actinst == 1">
        <div v-if="actinst == 1" class="trainsl" @click="Details(item)">
          <div class="tartp">
            <div class="tartp_s iconfont">
              <span style="font-size: 30px;color: #1eacf6">&#xe609;</span> <div>机票意向单（单程）</div>
            </div>
            <div class="tartp_e">
              <div>{{item.createTime}}</div>
            </div>

          </div>
          <div class="trainslit" v-if="item != null">
            <div class="setlis">
              <div style="width: 50px;height: 40px;display: flex;align-items: center;justify-content: center;">
                <img v-if="item.flights[0].flightNo!=null" :src="'http://file.feiren.com/00/02/' + item.flights[0].flightNo.substring(0 , 2) + '.png'" mode="" style="width: 24px;height: 22px;">
                <img v-else :src="'http://file.feiren.com/00/02/' + item.airline + '.png'" mode="" style="width: 24px;height: 22px;">
              </div>
              <div>
                <span v-if="item.flights[0].flightNo" style="font-size: 14px;font-weight:bolder;">{{companys(item.flights[0].flightNo.substring(0 , 2))}}</span>
              <span v-else style="font-size: 14px;font-weight:bolder;">{{companys(item.airline)}}</span>
              </div>
            </div>
            <div class="traboot">
              <div class="trbtfit">
                <div>{{item.depart | cityName}}&emsp;-&emsp;{{item.arrive | cityName}}</div>
                <div>启程时间：{{item.departDate}}</div>
                <div v-if="item.travelers.length > 0">乘机人：<span v-for="(na,index) in item.travelers" :key="index">{{na.name}}{{index-1?',':''}}</span></div>
              </div>
              <div class="trbtsed">
                <div>{{item.serviceLevelName}}</div>
              </div>
              <div class="trbtend" v-if="item.status === 1">
                <img src="../../../static/image/home/Approval-Pending.png" alt="">
              </div>
              <div class="trbtend " v-if="item.status === 2">
                <img src="../../../static/image/home/Canceled.png" alt="">
              </div>
              <div class="trbtend " v-if="item.status === 3">
                <img src="../../../static/image/intentionlist/judan.png" alt="">
              </div>
              <div class="trbtend " v-if="item.status === 4">
                <img src="../../../static/image/intentionlist/yishenpi.png" alt="">
              </div>
              <div class="trbtend" v-if="item.status === 5">
                <img src="../../../static/image/intentionlist/yiyuding.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
        <no-data v-if="(hotelDetails.length === 0 && actinst === 4) || (aircraftDetails.length === 0 && actinst === 1)" class="noData"></no-data>

    </div>

    <div class="block" v-if="(hotelDetails.length != 0 && actinst === 4) || (aircraftDetails.length != 0 && actinst === 1)">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[5,10, 20, 30, 40]"
          :page-size="rowNum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="text-align: center;margin-top: 10px"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import airports from '../../../static/js/airports.js'
import NoData from "@/components/common/noData";
import {  cityName } from "@/utils/common-filters";
export default {
  components: {NoData},
  	filters:{
			cityName
		},
  data() {
    return {
      actinst: '',
      travellingpeople: '', //出行人
      oplist: [{
        name: '国内机票',
        io: 1
      },
        {
          name: '酒店',
          io: 4
        }],
      loading: false,  //加载动画
      orderStatus:'', //当前选择酒店意向单订单状态
      page: 1,  // 当前页
      rowNum: 5,  //一页条目数
      hotelDetails: [],  //酒店意向单详情
      total: 0,  //总条目数
      hotelOrderStatus: [ //酒店意向单订单状态
        {
          value: 'u',
          label: '全部'
        },
        {
          value: 0,
          label: '待审批'
        },{
          value: 1,
          label: '通过'
        },{
          value: 2,
          label: '拒绝'
        },{
          value: 3,
          label: '已确认'
        },{
          value: 4,
          label: '已取消'
      }],
      aircraftStatus: '',  //当前选择的机票订单状态
      aircraftOrderStatus: [  //机票意向单订单状态选择数组
        {
          value: 'u',
          label: '全部'
        },{
          value: 1,
          label: '待审批'
        },{
          value: 2,
          label: '取消'
        },{
          value: 3,
          label: '拒单'
        },{
          value: 4,
          label: '已审批'
        },{
          value: 5,
          label: '已预订'
        }
      ],
      aircraftDetails: [], //机票意向单详情
      predaddress: [], //城市
    }
  },
  mounted() {
    if (this.$route.query.id !== undefined && this.$route.query.id == null){
      this.actinst = this.$route.query.id;
    }

    if (this.actinst == ''){
      this.acks(1)
    }
    if (this.$route.query.id !== null && this.$route.query.id !== undefined){
      this.acks(4)
    }
    this.predaddress = airports.addressAirportAll;
    this.queryAirlineList();
  },
  methods: {
    selectList(){
      if (this.actinst == 1){
        if (this.aircraftStatus == 'u'){
          this.aircraftStatus = '';
        }
        this.selectAircraft();
      }else {
        if (this.orderStatus == 'u'){
          this.orderStatus = '';
        }
        this.selectHotel();
      }
    },
    Details(item){ //酒店
      if (this.actinst == 4){ //酒店详情
        this.$router.push({
          path: '/hotelDetails',
          query:{
            requireNo: item.requireNo
          }
        })
      }else if (this.actinst == 1){
        this.$router.push({
          path: '/ticketIntentForm',
          query: {
            no : item.no
          }
        })
      }
    },
    async selectAircraft(){ //机票意向单列表查询
      this.loading = true;
      let that = this;
      let dat = {};
      let res;
      dat = {
          curPage:that.page,//第几页
          rowNum:that.rowNum,//一页多少条
        travelName:this.travellingpeople,
        status:this.aircraftStatus
      }

      res = await this.$api.intentionlist.toSearch(dat);
      if (res.code == 200){
        that.total= res.data.total;
        that.aircraftDetails = res.data.records;
        this.loading = false;
      }
      this.loading = false;
    },
    async selectHotel(){   //酒店意向单列表查询
      this.loading = true;
      let that = this;
      let dat = {};
      let res;
      dat = {
        pageVO:{
          curPage:that.page,//第几页
          rowNum:that.rowNum,//一页多少条
        },
        hotelOrderVo:{
          guestName:this.travellingpeople,
          orderStatus:this.orderStatus
        }
      }

     res = await this.$api.intentionlist.searchHotelRequireList(dat)
      if (res.code == 200){
       that.total= res.data.records;
       that.hotelDetails = res.data.rows;
       this.loading = false;
      }
      this.loading = false;
    },
    newRequisition(){
      if (this.actinst == 4){
        this.$router.push('/hotelApplication')
      }
      if (this.actinst == 1){
        this.$router.push('/newIntentionList')
      }
    },
    querySearchAsync(queryString, cb) { //查询出行人
      let _this = this;
      _this.$api.order.getPassengerListNoCertificate({
        name: queryString
      }).then((res) => {
        if (res.code == 200) {
          let namelist = res.data;
          let lists = []
          if (namelist.length > 0){
            for (let i in namelist) {
              if (res.data.length > 0){
                lists.push({
                  value: namelist[i].name
                })
              }
              let restaurants = lists;
              let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                cb(results);
              }, 1000 * Math.random());
            }
          }else {
            let restaurants = lists;
            let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
              cb(results);
            }, 1000 * Math.random());
          }
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
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
    },
    // cityname(name) { //城市名称
    //   let that = this;
    //   for (let j = 0; j < that.predaddress.length; j++) {
    //     if (name == that.predaddress[j].airportCode) {
    //       return that.predaddress[j].cityCName;
    //     }
    //   }
    // },
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
    companys(ies) {
      let ie = ies.split('/');
      for (let s in this.hang) {
        if (ie[0] == s) {
          return this.hang[s]
        }
      }
    },
    // company(ie) { //飞机航司名称
    //   for (let s in this.hang) {
    //     if (ie == s) {
    //       ie = this.hang[s];
    //       return ie;
    //     }
    //   }
    // },
    handleSizeChange(val) {
      this.rowNum = val;
      this.loading = true;
      if (this.actinst == 4){
        this.selectHotel();
      }else {
        this.selectAircraft();
      }
    },
    handleCurrentChange(val) {
      this.page = val;
      if (this.actinst == 4){
        this.selectHotel();
      }else{
        this.selectAircraft();
      }
    },
    acks(it) {
      this.actinst = it;
      if (it == 4){
        this.travellingpeople = '';
        this.selectHotel();
      }else if (it == 1){
        this.travellingpeople = '';
        this.selectAircraft();
      }
    },
  }
}
</script>

<style scoped lang="less">
/deep/ .select-style {
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
  margin: 0 auto;
  padding: 5px 0;
  position: relative;
 
  .fexibtns{
    position: absolute;
    top: 65px;
    width: 100%;
    height: 2px;
    z-index: 80;
    background-color: #3c85fd;
  }
  .navlist {
    display: flex;
    color: #a6b7c2;
    height: 50px;
    position: relative;
    left: 0;
    bottom: -17px;

    .naops {
      min-width: 136px;
      z-index: 70;
      top: 0;
      height:42px;
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
      height:41px;
      color: #3c85fd;
      border: 2px solid #3c85fd;
      border-bottom: 2px solid #FFFFFF;
    }
  }

  .mopsitl {
    margin-top: 10px;
    padding: 30px 30px 10px 30px;
    width: calc(100% - 60px);
    background: #ffffff;

    .mopins {
      display: flex;

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
        background-color: #409eff;
        color: #FFFFFF;
        font-size: 18px;
        text-align: center;
        line-height: 50px;
        border-radius: 3px;
        cursor: pointer;
      }
    }

    .inpuslist {
      display: flex;
      width: 100%;
      margin-bottom: 20px;

      .instlist {
        display: flex;
        margin-left: 27%;
        font-size: 14px;
        div {
          line-height: 40px;
        }
      }
    }

    .sits {
      margin-top: 20px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;

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
    margin-top: 20px;
    min-height: 400px;
    .datalis {
      margin-bottom: 20px;
      width: 100%;
      border-radius: 2px;
      background-color: #FFFFFF;
      box-shadow: 0 0 14px 0 rgba(177, 190, 203, 0.2);

      .trainsl {
        .tartp {
          display: flex;
          height: 48px;
          line-height: 48px;
          background: #e3efff;
          justify-content: space-between;
          border-bottom: 2px solid #F9F9F9;
          padding: 0 30px;
          .tartp_s {
            display: flex;
            color: #333;
            font-size: 14px;
            &>span{
              margin-right: 10px;
            }
          }

          .tartp_e {
            display: flex;
            color: #999;
            font-size: 14px;
          }
          div:nth-child(4) {
            font-size: 14px;
            margin: 0 10px;
            color: #B9A6A6;
          }
        }

        .trainslit {
          width: 100%;
          height: 120px;
          display: flex;
          cursor: pointer;
          align-items: center;

          .setlis {
            width: 17%;
            height: 65px;
            font-size: 10px;
            display: flex;
            align-items: center;
			justify-content: center;

            img {
              width: 50px;
              height: 50px;
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

              .thst {
                margin: 0 10px;
                padding: 0 10px;
                line-height: 25px;
                background: red;
                color: #FFFFFF;
              }

              div:last-child {
                font-size: 16px;
                color: #1eacf6;
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

    .datalis:hover {

      box-shadow: 0 0 12px 0 #409eff;
    }
  }

  .block {
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
