<template>
  <!-- 产品预定->飞机票列表页 -->
  <div class="main">
    <div class="listfoter">
      <div class="form-wrap">
        <div class="stis">
          <div class="sercits">
            <div class="citysleft">
              <citysearchs
                :issera="isblcks == 1"
                @changers="listchangs"
                :ctiys="citylist"
                :child-array="zhuan"
              ></citysearchs>
            </div>
          </div>
          <div class="timeits">
            <div class="sies">去程</div>
            <div class="timeist">
              <el-date-picker
                value-format="yyyy-MM-dd"
                style="width: 100%; color: #666666"
                v-model="timedate"
                type="date"
                placeholder=""
                :disabled="isblcks == 1"
                :editable="false"
                :clearable="false"
                @change="tiemdat"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </div>
            <div class="sies">回程</div>
            <div class="timeist">
              <el-date-picker
                value-format="yyyy-MM-dd"
                style="width: 100%"
                v-model="timedates"
                :disabled="disab || isblcks == 1"
                type="date"
                placeholder=""
                :editable="false"
                :clearable="false"
                @change="tiemdats"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </div>
          </div>
          <div class="btselect" @click="seachlist">搜索</div>
        </div>
      </div>
    </div>
    <div class="boxlist">
      <div class="box_left">
        <div class="fixs" :class="fitxd ? 'fliedes' : ''">
          <div class="bo_tops">
            <div>筛选(共{{ datalistlen }}条航班数据)</div>
            <div class="btclose" @click="btclose">清除全部</div>
          </div>
          <div
            class="bo_dv"
            v-for="(item, index) in options"
            :key="index"
            v-show="item.value.length > 0"
            @mouseover="item.isture = true"
            @mouseleave="item.isture = false"
          >
            <div class="bo_lis">
              <div>{{ item.name }}</div>
              <div style="padding-right: 10px; color: #999999">
                <span class="iconfont">&#xe62d;</span>
              </div>
            </div>
            <div class="bo_lisk" v-for="(ims, imx) in item.val" :key="imx">
              <div>
                {{ ims.name
                }}<span
                  @click="delesval(imx, index)"
                  class="iconfont"
                  style="margin-left: 10px"
                  >&#xe666;</span
                >
              </div>
            </div>
            <div class="bo_abouset" v-if="item.isture">
              <div
                class="ab_lis"
                v-for="(its, ins) in item.value"
                :key="ins"
                @click="akclist(its, index)"
              >
                <div class="af_vls">
                  <span class="iconfont" v-if="its.ts == false">&#xe80c;</span>
                  <span class="iconfont" v-else>&#xe618;</span>
                  <div>{{ its.name }}</div>
                </div>
                <div class="prices" v-if="its.price &&its.price != 0">
                  ￥{{ its.price }}
                </div>
              </div>
            </div>
          </div>
          <div class="bo_dst" @click="shareds">
            <span class="iconfont" v-if="shares == false">&#xe80c;</span>
            <span class="iconfont" v-else>&#xe618;</span>隐藏共享航班
          </div>
        </div>
      </div>
      <div class="box_right">
        <div class="bislost" :class="fitxd ? 'lunsfiexd' : ''">
          <div class="bs_ledts" v-if="fitxd"></div>
          <div class="bs_rdes">
            <div class="lunsdata" v-if="zhuan != 2">
              <div class="lun_left" @click="leftmove">
                <span class="iconfont">&#xe8a1;</span>
              </div>
              <div class="luns">
                <div
                  ref="luns"
                  class="lun_list"
                  :style="{
                    width: 12 * 920 + 'px',
                  }"
                >
                  <div
                    class="l_list"
                    :class="item.dats == timedate ? 'datacheck' : ''"
                    v-for="(item, index) in itemlist"
                    :key="index"
                    @click="datachencks(item, item.dats)"
                  >
                    <div>{{ item.data }}</div>
                    <div style="margin-left: 3px">{{ item.week }}</div>
                  </div>
                </div>
              </div>
              <div class="lun_right" @click="rightmove">
                <span class="iconfont">&#xe62d;</span>
              </div>
            </div>

            <div class="lunsdata" v-else>
              <div class="lun_left" @click="leftmove">
                <span class="iconfont">&#xe8a1;</span>
              </div>
              <div class="luns">
                <div
                  ref="luns"
                  class="lun_list"
                  :style="{
                    width: 12 * 920 + 'px',
                  }"
                >
                  <div
                    class="l_list"
                    :class="item.dats == timedates ? 'datacheck' : ''"
                    v-for="(item, index) in itemlist"
                    :key="index"
                    @click="datachencks(item, item.dats)"
                  >
                    <div>{{ item.data }}</div>
                    <div style="margin-left: 3px">{{ item.week }}</div>
                  </div>
                </div>
              </div>
              <div class="lun_right" @click="rightmove">
                <span class="iconfont">&#xe62d;</span>
              </div>
            </div>
            <div class="take">
              <div></div>
              <div class="taks_right">
                <div
                  v-for="(item, index) in takelist"
                  :key="index"
                  @click="takeck(item, index)"
                  :style="
                    item.cklit == true
                      ? { color: '#3D84FF', width: item.widths }
                      : { width: item.widths }
                  "
                >
                  {{ item.name }}
                  <span
                    v-if="index != 0"
                    :style="
                      item.cklit == true
                        ? { color: '#3D84FF' }
                        : { color: '#CCCCCC' }
                    "
                  >
                    <span v-if="item.isture == true" class="iconfont fitus"
                      >&#xe8a2;</span
                    >
                    <span v-else class="iconfont fitus">&#xe6b5;</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="airlines"
          v-loading="loading"
          :class="{ airlinesNO: !loading }"
        ></div>
        <!-- <div class="airline" v-for="(item, index) in userslist"
					v-if="userslist.length > 0 && item.isshow == true" v-loading="loading" :key="index"> -->
        <div
          class="airline"
          v-for="(item, index) in userslist"
          v-if="userslist.length > 0"
          :key="index"
          v-loading="item.loadingList"
        >
          <div class="section">
            <div class="selist boxShow" @click="user(item, index)">
              <div class="trainsc">
                <div class="trass"><img :src="item.ims" /></div>
                <div class="trainsc_l">
                  <div class="trasp">
                    {{ company(item.airline) }}&nbsp;{{ item.no }}
                  </div>
                  <div class="trasps">
                    <p>{{ item.plane }}&nbsp;{{ item.planeSize }}</p>
                  </div>
                </div>
                <div class="trainsc_s">
                  <div class="trainsc_s_l">
                    <div class="trainsc_s_l_t">{{ item.departTime }}</div>
                    <div class="trainsc_s_l_b">
                      <div class="trainsc_s_l_b_l trabrs">始</div>
                      <div class="trainsc_s_l_b_r" v-if="item.departTerminal">
                        {{ item.departs }}{{ item.departTerminal }}
                      </div>
                      <div class="trainsc_s_l_b_r" v-else>
                        {{ item.departs }}
                      </div>
                    </div>
                  </div>
                  <div
                    class="trainsc_s_s"
                    :class="{ nonstop: item.nonstop == true }"
                  >
                    <div style="font-size: 12px; color: #999">
                      {{ item.flightTime }}
                    </div>
                    <div
                      style="
                        color: #007aff;
                        text-align: center;
                        font-size: 16px;
                        cursor: pointer;
                      "
                      v-if="item.nonstop == true"
                      @click="arriva(item)"
                    >
                      经停
                      {{ arrivalAirport }}
                    </div>
                  </div>
                  <div class="trainsc_s_l trainsc_s_r">
                    <div class="trainsc_s_l_t">{{ item.arriveTime }}</div>
                    <div class="trainsc_s_l_b">
                      <div class="trainsc_s_l_b_l trabrd">终</div>
                      <div class="trainsc_s_l_b_r" v-if="item.arriveTerminal">
                        {{ item.arrives }}{{ item.arriveTerminal }}
                      </div>
                      <div class="trainsc_s_l_b_r" v-else>
                        {{ item.arrives }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="trainsc_r">
                  <div class="seatlist">
                    <div class="seatprice">
                      <span>￥</span>{{ item.minPrice }}
                    </div>
                    <div class="seatname" v-if="item.minDiscount != 10">
                      {{ item.minPriceCabinCode }}{{ item.minDiscount }}折
                    </div>
                    <div class="seatname" v-else>
                      <span style="color: red">全价</span>
                    </div>
                    <div
                      class="public"
                      v-if="
                        civilServiceTicket != undefined &&
                        civilServiceTicket == 1
                      "
                    >
                      公
                    </div>
                    <el-tooltip
                      v-if="item.shared == true"
                      class="item"
                      style="color: #0bc071"
                      effect="dark"
                      :content="'承运航班:' + item.operatingNo"
                      placement="top"
                    >
                      <span
                        style="color: #0bc071; cursor: pointer; font-size: 14px"
                        >共享</span
                      >
                    </el-tooltip>
                  </div>
                </div>
              </div>
            </div>

            <div class="side" v-if="shou == index">
              <div
                class="reserve"
                v-for="(items, indexs) in particulars"
                :key="indexs"
              >
                <!-- 预定 -->
                <div class="reserve_left">
                  <img
                    src="static/image/home/official.png"
                    class="official"
                    v-if="items.priceSource == 1 && items.priceInfoId != null"
                  /><!-- -->
                  <img
                    src="static/image/home/outer.png"
                    class="official"
                    v-if="items.priceSource == 2"
                  />
                  <!--  -->
                  <span class="changetype" v-if="items.changeFare == true"
                    >协议价</span
                  >
                  <!--   -->
                </div>
                <div class="reserve_cen">
                  <div class="shidisc">
                    {{ companys(items.level, items.cabinName) }}&nbsp;{{
                      disname(items.discount)
                    }}
                  </div>
                </div>
                <div class="reserve_lefts">
                  <div
                    class="spana"
                    @mouseover="ctlist(item, items)"
                    @mouseleave="ctlists()"
                  >
                    退改规则
                  </div>
                </div>
                <div class="reserve_right">
                  <div class="shidiss">
                    <span>￥</span>{{ items.salePrices[0].price }}
                  </div>
                  <div class="but" @click.stop="book(item, items, index)">
                    订票
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <no-data
          v-if="userslist.length === 0 && loading === false"
          class="noData"
        ></no-data>
        <div class="rule" v-if="yin">
          <div>
            <p
              style="color: dodgerblue; font-size: 18px; padding: 10px 0 0 10px"
            >
              退票规则
            </p>
            <p style="padding: 40px 0 0 10px; font-size: 14px">
              1.退票规定：{{ backrule.refundTicketDes }}
            </p>
            <p style="padding: 50px 0 0 10px; font-size: 14px">
              2.改签规定：{{ backrule.changeTicketDes }}
            </p>
            <p style="padding: 50px 0 0 10px; font-size: 14px">
              3.签转规定：{{ backrule.signTicketDes }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="staleve" v-if="staleve" @click="staleve = false">
      <div class="stalist" @click.stop>
        <div class="scloos">
          <div
            class="statop"
            v-for="(item, index) in platformlist"
            :key="index"
            v-if="
              (notbooking && item.list[0].va == 4) ||
              (!notbooking && item.list[0].va != 4)
            "
          >
            <div class="reds">
              <div class="ts_text">{{ item.name }}</div>
            </div>
            <div class="setlist" v-for="(items, index) in item.list">
              <div class="setbod">
                <div class="styul">
                  <div class="styli_top" v-if="items.va == 4 || items.va == 5">
                    {{ items.name }}
                  </div>
                  <div class="stulis">
                    <div class="styli_left">超规人员:</div>
                    <div class="styli_rights">{{ items.list }}</div>
                  </div>
                </div>
                <div class="styul" v-if="items.va == 3">
                  <div class="stulis">
                    <div class="styli_left">超规原因:</div>
                    <div class="styli_right">
                      <div class="wors">
                        <el-select v-model="items.reasons" placeholder="请选择">
                          <el-option
                            v-for="item in rulesReasons"
                            :key="item.id"
                            :label="item.chineseDesc"
                            :value="item.chineseDesc"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div class="styul" v-if="items.va == 5">
									<div class="stulis">
										<div class="styli_left">超规原因:</div>
										<div class="styli_right">
											<div class="wors">
												<input
													style="border: #CACACA 1px solid;width: 215px;height: 35px;border-radius: 5px;"
													v-model="shenPi" />
											</div>
										</div>
									</div>
								</div> -->
              </div>
            </div>
          </div>
        </div>

        <div class="btnsti" v-if="!notbooking">
          <div class="roblck" @click="staleve = false">取消</div>
          <div class="btnok" @click="cits_btn">继续预定</div>
        </div>
      </div>
    </div>
    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      class="reloadPage"
    >
      <span>页面停留太久，数据可能有变化，请刷新页面</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import citysearchs from "@/components/common/citycomponents.vue";
import airports from "../../../../static/js/airports.js";
// import citys from '../../../../static/js/airports.js'
import NoData from "@/components/common/noData";

export default {
  data() {
    return {
      fitxd: false, //头部是否定位
      datalistlen: 0, //最终条数
      shares: false, //是否隐藏共享航班
      shenPi: "",
      options: [
        {
          name: "直飞/经停",
          id: 1,
          value: [],
          isture: false,
          val: [],
        },
        {
          name: "起飞时段",
          id: 2,
          value: [],
          isture: false,
          val: [],
        },
        {
          name: "航空公司",
          id: 3,
          value: [],
          isture: false,
          val: [],
        },
        {
          name: "计划机型",
          id: 4,
          value: [],
          isture: false,
          val: [],
        },
        {
          name: "舱位类型",
          id: 5,
          value: [
            {
              name: "经济舱",
              id: 1,
              ts: false,
              price: 0,
            },
            {
              name: "商务舱/头等舱",
              id: 2,
              ts: false,
              price: 0,
            },
          ],
          isture: false,
          val: [],
        },
        {
          name: "出发机场",
          id: 6,
          value: [],
          isture: false,
          val: [],
        },
        {
          name: "到达机场",
          id: 7,
          value: [],
          isture: false,
          val: [],
        },
      ],
      takelist: [
        {
          name: "航班信息",
          isture: false,
          cklit: false,
          widths: "15%",
        },
        {
          name: "起飞时间",
          isture: false,
          cklit: false,
          widths: "35%",
        },
        {
          name: "到达时间",
          isture: false,
          cklit: false,
          widths: "40%",
        },
        {
          name: "价格排序",
          isture: false,
          cklit: false,
          widths: "10%",
        },
      ],
      contracts: [
        {
          name: "经济舱",
          id: 1,
        },
        {
          name: "头等/商务舱",
          id: 2,
        },
      ],
      tabBar: [
        {
          ul: "Time",
          text: "时间",
          imgnor: "\ue8a5",
          imgNormal: "\ue648",
        },
        {
          ul: "Topbottom",
          text: "价格",
          imgnor: "\ue8a6",
          imgNormal: "\ue615",
        },
        {
          ul: "Screen",
          text: "直飞",
          imgnor: "\ue61d",
          imgNormal: "\ue61d",
        },
      ],
      contract: 1,
      loading: false,
      lei: "",
      isarsrl: false, //是否需要审核
      datatime: "",
      notbooking: false, //违规不能继续
      staleve: false, //是否有违规信息
      itemlist: [], //一个月的时间
      roteslists: {}, //上个页面的参数
      itmesp: 0,
      traitime: "",
      disab: false,
      bagAllow: false, //行李额
      bagAllows: 0, //行李额
      citylist: [],
      butalist: [], //出行人
      pookis: false, //是否再次审批
      isblckt: false, //事前是否2次审批
      fromcity: "", //出发城市
      tocity: "", //到达城市
      timedate: "", //出发时间
      timedates: "", //回来时间
      airline: "",
      address: [], //城市集合
      userlist: [
        {
          name: "南航CZ3160",
          type: "320大型机",
          date: "15:30",
          depart: "首都T2",
          duration: "3小时35分钟",
          dates: "18:35",
          arrive: "宝安T3",
          price: "￥580",
          shipping: "经济舱",
        },
        {
          name: "北航CZ3160",
          type: "220大型机",
          date: "18:30",
          depart: "首都T2",
          duration: "3小时35分钟",
          dates: "20:35",
          arrive: "宝安T3",
          price: "￥1580",
          shipping: "特价经济舱",
        },
      ],
      zhuan: "1",
      civilServiceTicket: "",
      trainlist: [],
      backrule: {}, //退改签规则
      packslist: {}, //当前页面的值
      packslists: {}, //当前页面的值2
      platformlist: [], //处理过的违规信息
      packlist: {}, //上个页面的值
      userdlist: [], //全部飞机信息
      limitNativeRule: [],
      userslist: [],
      usermap: [],
      userrw: [],
      date: "",
      yin: false,
      ting: false, //共享
      isblcks: JSON.parse(this.$route.query.data).isblcks,
      week: "", //周几
      contract_lefts: true,
      arrivalAirport: "", //经停
      contract_rights: false,
      particulars: [],
      hang: [],
      tickarray: [],
      particularss: [],
      shou: -1,
      timedate: JSON.parse(this.$route.query.data).timedate,
      timedates: JSON.parse(this.$route.query.data).timedates,
      citylist: JSON.parse(this.$route.query.data).city,
      pickerOptions: {
        disabledDate: (time) => {
          return this.dealDisabledDate(time);
        },
      },
      datalist: [],
      copylist: [], //复制数据
      searchNo: "", //查询航班列表时返回的查询编号
      dialogVisible: false,
      backCity: "", // 返程城市
      goCity: "", // 去程城市
      backTime: "", //返程时间
      goTime: "", //去程时间
      loadingList: false, //仓位加载
      type:'',
    };
  },
  components: {
    citysearchs,
    NoData,
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    ...mapState(["go_there", "goName"]), //往返的值0是去，1是返回
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    var dateList = [];
    let startDate = new Date();
    let endDate = new Date();
    endDate.setDate(startDate.getDate() + 90);
    while (endDate.getTime() - startDate.getTime() >= 0) {
      //获取当前日期后一个月的数据
      let year = startDate.getFullYear();
      let month =
        (startDate.getMonth() + 1).toString().length === 1
          ? "0" + (startDate.getMonth() + 1).toString()
          : startDate.getMonth() + 1;
      let day =
        startDate.getDate().toString().length === 1
          ? "0" + startDate.getDate()
          : startDate.getDate();
      let days = startDate.getDay();
      switch (days) {
        case 1:
          days = "周一";
          break;
        case 2:
          days = "周二";
          break;
        case 3:
          days = "周三";
          break;
        case 4:
          days = "周四";
          break;
        case 5:
          days = "周五";
          break;
        case 6:
          days = "周六";
          break;
        case 0:
          days = "周日";
          break;
      }
      dateList.push({
        data: month + "-" + day,
        week: days,
        dats: year + "-" + month + "-" + day,
      });
      startDate.setDate(startDate.getDate() + 1);
    }
    let lis = JSON.parse(this.$route.query.data); //获取上个页面传入的参数
    this.packlist = lis;
    this.airline = lis.airline; //航司
    this.type = lis.type
    let date = new Date();
    let year = date.getFullYear(); //得到当前年份
    let month = this.editTime(date.getMonth() + 1); //得到当前月份
    let day = this.editTime(date.getDate()); //得到当前几号
    let datte = year + "-" + month + "-" + day;
    let dattes = year + "-" + month + "-" + (day + 1);
    let timedas = lis.timedate.split("-").join("");
    let itmedaa = lis.timedates.split("-").join("");
    let dateas = year.toString() + month.toString() + day.toString();
    if (timedas < dateas && timedas != "") {
      this.timedate = datte; //出发时间
      if (lis.timedates != "") {
        this.timedates = dattes; //到达时间
      }
    } else if (timedas == "" && lis.timedates != "") {
      if (itmedaa < dateas) {
        this.timedates = datte; //出发时间
      }
    } else {
      this.timedate = lis.timedate; //出发时间
      this.timedates = lis.timedates; //到达时间
    
    }
    this.itemlist = dateList; //渲染日期
    // let lis = this.$route.query; //获取上个页面传入的参数
    this.butalist = lis.butalist; //出差旅客
    this.fromcity = lis.city[0].id; //出发城市
    this.tocity = lis.city[1].id; //到达城市
    this.civilServiceTicket = lis.civilServiceTicket; //是否公务 1是 0不是
    for (let i in this.itemlist) {
      if (this.itemlist[i].dats == this.timedate) {
        this.week = this.itemlist[i].week;
        this.date = this.itemlist[i].data;
      }
      // else if(this.itemlist[i].dats == this.timedates){
      //   this.week = this.itemlist[i].week;
      //   this.date = this.itemlist[i].data;
      // }
    }
    this.lei = "";
    if (this.timedates == "") {
      this.lei = "1";
      this.disab = true;
    } else {
      this.lei = "2";
      this.disab = false;
    }
    if(lis.type == 1){ // 订单详情入口进入飞机列表
      this.backTime = this.timedate
      this.fromcity = lis.city[0].id
      this.tocity = lis.city[1].id
      // this.datenow(this.backTime)
      this.timedates = ''
      // this.timedate = lis.timedate
      this.citylist = [lis.city[0],lis.city[1]] // 返程单进入列表
      this.disab = true
    }else if(lis.type == 2){ // 去程单进入列表
         this.timedates = ''
         this.disab = true
    }
    this.datenow();
    this.aircraftlistst();
  },
  methods: {
   async aircraftlistst() {
      if (this.loading) return;
      this.userslist = [];
      //飞机信息查询
      // newdata = cdlist.concat(_this.delete_list)
      this.shou = -1;
      for (let k in this.takelist) {
        this.takelist[k].isture = false;
        this.takelist[k].cklit = false;
      }
      let user = {};
      this.datalist = [];
      if (this.timedates == "") {
        if (this.civilServiceTicket != undefined) {
          user = {
            aircom: "",
            fromCity: this.fromcity,
            passengerType: "ADT",
            hcType: "1",
            toCity: this.tocity,
            ishareFlight: 1,
            fromDate: this.timedate,
            transCity: "",
            grade: "",
            civilServiceTicket: this.civilServiceTicket,
          };
        } else {
          user = {
            aircom: this.isblcks == 4 ? this.airline : "",
            fromCity: this.fromcity ,
            passengerType: "ADT",
            hcType: "1",
            toCity:  this.tocity ,
            ishareFlight: 1,
            fromDate: this.timedate ,
            toDate:  this.timedates ,
            transCity: "",
            grade: "",
          };
        }
      } else if (this.timedates != "") {
       
        if (this.civilServiceTicket != undefined) {
          user = {
            aircom: "",
            fromCity: this.goName != 1 ? this.fromcity : this.backCity,
            passengerType: "ADT",
            hcType: "2",
            toCity: this.goName != 1 ? this.tocity : this.goCity,
            ishareFlight: 1,
            fromDate: this.goName != 1 ? this.timedate : this.backTime,
            toDate: this.goName != 1 ? this.timedates : "",
            transCity: "",
            grade: "",
            civilServiceTicket: this.civilServiceTicket,
          };
        } else {
    //            console.log("this.goName",this.goName)
    // console.log("this.fromcity",this.fromcity)
    // console.log("this.backCity",this.backCity)
    // console.log("this.tocity",this.tocity)
    // console.log("this.goCity",this.goCity)
    // console.log("this.timedate",this.timedate)
    // console.log("this.airline",this.airline)
          user = {
            aircom: this.isblcks == 4 ? this.airline : "",
            fromCity: this.goName != 1 ? this.fromcity : this.backCity,
            passengerType: "ADT",
            hcType: "2",
            toCity: this.goName != 1 ? this.tocity : this.goCity,
            ishareFlight: 1,
            fromDate: this.goName != 1 ? this.timedate : this.backTime,
            toDate: this.goName != 1 ? this.timedates : "",
            transCity: "",
            grade: "",
          };
        }
      }
      this.loading = true;
      let res = await this.$api.home.searchAirlineAJAX(user);
      if (res.code == 200) {
        if (res.data.flights == null) {
          this.$message({
            message: "没有合适的航班信息。",
            type: "warning",
          });
          this.loading = false;
          return;
        }
        let ret = await this.$api.home.queryAirlineList();
        if (ret.code == 200) {
          this.hang = ret.data.airlineDds;
        } else {
          this.$message({
            message: ret.message,
            type: "warning",
          });
        }
        this.userslist = res.data.flights; //城市时间
        this.searchNo = res.data.searchNo;
        // this.usermap = res.data.ow_data; //折扣价格舱位
        // this.userrw = res.data.rw_data; //返回飞机信息
        this.address = airports.addressAirportAll; //航空名字
        // for (let k in this.usermap) {
        // 	for (let j in this.usermap[k].cabins) {
        // 		if (this.usermap[k].cabins[j].level == 'F') {
        // 			this.usermap[k].cabins[j]['levels'] = '头等舱';
        // 		} else if (this.usermap[k].cabins[j].level == 'C') {
        // 			this.usermap[k].cabins[j]['levels'] = '商务舱';
        // 		} else if (this.usermap[k].cabins[j].level == 'Y') {
        // 			this.usermap[k].cabins[j]['levels'] = '经济舱';
        // 		}
        // 		if (this.usermap[k].cabins[j].discount < '1') {
        // 			let num = this.usermap[k].cabins[j].discount * 10;
        // 			this.usermap[k].cabins[j]['num'] = num.toFixed(1);
        // 		} else {
        // 			let num = '全价';
        // 			this.usermap[k].cabins[j]['num'] = num;
        // 		}
        // 	}
        // }
        // for (let k in this.userrw) {
        // 	for (let j in this.userrw[k].cabins) {
        // 		if (this.userrw[k].cabins[j].level == 'F') {
        // 			this.userrw[k].cabins[j]['levels'] = '头等舱';
        // 		} else if (this.userrw[k].cabins[j].level == 'C') {
        // 			this.userrw[k].cabins[j]['levels'] = '商务舱';
        // 		} else if (this.userrw[k].cabins[j].level == 'Y') {
        // 			this.userrw[k].cabins[j]['levels'] = '经济舱';
        // 		}
        // 		if (this.userrw[k].cabins[j].discount < '1') {
        // 			let num = this.userrw[k].cabins[j].discount * 10;
        // 			this.userrw[k].cabins[j]['num'] = num.toFixed(1);
        // 		} else {
        // 			let num = '全价';
        // 			this.userrw[k].cabins[j]['num'] = num;
        // 		}
        // 	}
        // }
        // if (this.timedates == '') {
        // 	for (let k in this.usermap) {
        // 		for (let j in this.userslist) {
        // 			if (j == k) {

        // 				if (this.isblcks == 4) {
        // 					// console.log("this.airline",this.airline)
        // 					// console.log("this.userslist[j].airline", this.userslist[j].airline)
        // 					if (this.fromcity == this.userslist[j].depart && this.tocity == this.userslist[
        // 							j].arrive) { // && this.airline == this.userslist[j].airline
        // 						this.datalist.push({
        // 							name: this.userslist[j],
        // 							text: this.usermap[k]
        // 						}); //获得datalist
        // 					}
        // 					// console.log("8",this.datalist)
        // 				} else {
        // 					// console.log("this.userslist----",this.userslist)
        // 					this.datalist.push({
        // 						isshow: true,
        // 						name: this.userslist[j],
        // 						text: this.usermap[k]
        // 					}); //获得datalist

        // 				}

        // 			}
        // 		}
        // 	}

        // } else if (this.timedates != '') {
        // 	if (this.goName == 0) {
        // 		//往
        // 		for (let k in this.usermap) {
        // 			for (let j in this.userslist) {
        // 				if (this.isblcks == 4) {
        // 					if (this.fromcity == this.userslist[j].depart && this.tocity == this.userslist[
        // 							j].arrive && this.airline == this.userslist[j].airline) {
        // 						this.datalist.push({
        // 							name: this.userslist[j],
        // 							text: this.usermap[k]
        // 						}); //获得datalist
        // 					}
        // 				} else {
        // 					// console.log("this.timedates---",this.timedates)
        // 					if (j == k) {
        // 						this.datalist.push({
        // 							isshow: true,
        // 							name: this.userslist[j],
        // 							text: this.usermap[k]
        // 						});
        // 					}
        // 				}
        // 			}
        // 		}
        // 		// console.log("9",this.datalist)
        // 	} else {
        // 		//返
        // 		for (let k in this.userrw) {
        // 			for (let j in this.userslist) {
        // 				if (this.isblcks == 4) {
        // 					if (this.fromcity == this.userslist[j].depart && this.tocity == this.userslist[
        // 							j].arrive && this.airline == this.userslist[j].airline) {
        // 						this.datalist.push({
        // 							name: this.userslist[j],
        // 							text: this.userrw[k]
        // 						}); //获得datalist
        // 					}
        // 				} else {
        // 					if (j == k) {
        // 						this.datalist.push({
        // 							isshow: true,
        // 							name: this.userslist[j],
        // 							text: this.userrw[k]
        // 						});
        // 					}
        // 				}
        // 			}
        // 		}
        // 	}
        // 	// console.log("10",this.datalist)
        // }
        // for (let i = 0; i < this.datalist.length; i++) {
        // 	for (let k = 0; k < this.datalist[i].text.cabins.length; k++) {
        // 		if (this.datalist[i].text.cabins[k].changeFare == true) {
        // 			this.datalist[i].text['fare'] = true;
        // 		} else {
        // 			this.datalist[i].text['fare'] = false;
        // 		}
        // 	}
        // }
        // console.log("11",this.datalist)
        let direct_flight = []; //直飞/经停
        let airline_company = []; //航空公司
        let planned_model = []; //计划机型
        let apr_time = []; //起飞时间
        let directs = "";
        let airline = "";
        let planned = "";
        let aprs = "";
        let aip_plan_go = []
        let aipPlanGo = ""
        let aip_plan_back = []
        let aipPlanBack = ""
        this.sorts();
        for (let k in this.userslist) {
          // 处理航班logo
          this.userslist[k]["ims"] =
            "http://file.feiren.com/00/02/" +
            this.userslist[k].airline +
            ".png"; //http://wx.molintmc.com/static/img/

          // 将转换航空名字：始 终 机场名称
          for (let j = 0; j < this.address.length; j++) {
            if ((k, this.userslist[k].depart == this.address[j].airportCode)) {
              // k,
              this.userslist[k]["departs"] = this.address[j].airportCName;
            } else if (
              (k, this.userslist[k].arrive == this.address[j].airportCode)
            ) {
              // k,
              this.userslist[k]["arrives"] = this.address[j].airportCName;
            }
            if (this.arrivalAirport == this.address[j].airportCode) {
              this.arrivalAirport = this.address[j].airportCName;
            }
          }

      // 出发机场 aip_plan_go aipPlanGo  departs
        if (aipPlanGo.indexOf(this.userslist[k].departs) == -1) {
            aipPlanGo += this.userslist[k].departs;
            aip_plan_go.push(
              {
                 id:this.userslist[k].departs,
                name:this.userslist[k].departs,
                ts: false,
              }
            )
        }
        // 到达机场 aip_plan_back aipPlanBack arrives
        if (aipPlanBack.indexOf(this.userslist[k].arrives) == -1) {
            aipPlanBack += this.userslist[k].arrives;
            aip_plan_back.push(
              {
                id:this.userslist[k].arrives,
                name:this.userslist[k].arrives,
                ts: false,
              }
            )
        }
          // 直飞/经停
          if (directs.indexOf(this.userslist[k].nonstop) == -1) {
            directs += this.userslist[k].nonstop;
            if (!this.userslist[k].nonstop) {
              direct_flight.push({
                name: "直飞",
                id: "1",
                ts: false,
                price: this.userslist[k].minPrice,
              });
            } else {
              direct_flight.push({
                name: "经停",
                id: "2",
                ts: false,
                price: this.userslist[k].minPrice,
              });
            }
          }
          // 起飞时段
          var pltime = parseInt(this.userslist[k].departTime.replace(":", ""));
          if (pltime > 600 && pltime < 1200) {
            if (aprs.indexOf("上午") == -1) {
              aprs += "上午";
              apr_time.push({
                name: "上午(6-12点)",
                id: [600, 1200],
                ts: false,
                price: this.userslist[k].minPrice,
              });
            }
          } else if (pltime > 1200 && pltime < 1800) {
            if (aprs.indexOf("中午") == -1) {
              aprs += "中午";
              apr_time.push({
                name: "中午(12-18点)",
                id: [1200, 1800],
                ts: false,
                price: this.userslist[k].minPrice,
              });
            }
          } else if (pltime > 1800 && pltime < 2400) {
            if (aprs.indexOf("下午") == -1) {
              aprs += "下午";
              apr_time.push({
                name: "下午(18-24点)",
                id: [1800, 2400],
                ts: false,
                price: this.userslist[k].minPrice,
              });
            }
          }
          // 航空公司
          if (airline.indexOf(this.userslist[k].airline) == -1) {
            airline += this.userslist[k].airline + ",";
            airline_company.push({
              id: this.userslist[k].airline,
              price: this.userslist[k].minPrice,
            });
          }
          // 机型
          if ((k, this.userslist[k].planeSize == "L")) {
            this.userslist[k].planeSize = "大";
          } else if ((k, this.userslist[k].planeSize == "M")) {
            this.userslist[k].planeSize = "中";
          } else if ((k, this.userslist[k].planeSize == "S")) {
            this.userslist[k].planeSize = "小";
          }
          if (
            this.userslist[k].planeSize != "" &&
            this.userslist[k].planeSize != null
          ) {
            if (planned.indexOf(this.userslist[k].planeSize) == -1) {
              //机型
              planned += this.userslist[k].planeSize;
              planned_model.push({
                name: this.userslist[k].planeSize,
                id: this.userslist[k].planeSize,
                ts: false,
                price: this.userslist[k].minPrice,
              });
            }
          }
        }
        this.options[0].value = direct_flight; //经停条件
        for (let k in airline_company) {
          //航空公司条件
          airline_company[k] = {
            name: this.company(airline_company[k].id),
            id: airline_company[k].id,
            ts: false,
            price: airline_company[k].price,
          };
        }
  
        this.options[2].value = airline_company;
        this.options[1].value = apr_time; //出发时间
        this.options[3].value = planned_model; //机型
        this.options[5].value = aip_plan_go; //出发机场
        this.options[6].value = aip_plan_back; //到达机场
       
        for (let k in this.options) {
          for (let j in this.options[k].val) {
            for (let p in this.options[k].value) {
              if (this.options[k].value[p].id == this.options[k].val[j].id) {
                this.options[k].value[p].ts = true;
                break;
              }
            }
          }
        }
        this.copylist = JSON.parse(JSON.stringify(this.userslist));
        // console.log("this.copylist ",this.copylist )
        this.filters(); //过滤方法
        this.loading = false;
        // 条件筛选
        //   for (let k in this.datalist) {
        // // 直飞/经停
        //   //   if (directs.indexOf(this.datalist[k].name.nonstop) == -1) {
        //   //     directs += this.datalist[k].name.nonstop;
        //   //     if (!this.datalist[k].name.nonstop) {
        //   //       direct_flight.push({
        //   //         name: "直飞",
        //   //         id: "1",
        //   //         ts: false,
        //   //         price: this.datalist[k].text.cabins[0].minParPrice,
        //   //       });
        //   //     } else {
        //   //       direct_flight.push({
        //   //         name: "经停",
        //   //         id: "2",
        //   //         ts: false,
        //   //         price: this.datalist[k].text.cabins[0].minParPrice,
        //   //       });
        //   //     }
        //   //   }
        //   //   var pltime = parseInt(
        //   //     this.datalist[k].name.departTime.replace(":", "")
        //   //   );
        //   //   if (pltime > 600 && pltime < 1200) {
        //   //     if (aprs.indexOf("上午") == -1) {
        //   //       aprs += "上午";
        //   //       apr_time.push({
        //   //         name: "上午(6-12点)",
        //   //         id: [600, 1200],
        //   //         ts: false,
        //   //         price: this.datalist[k].text.cabins[0].minParPrice,
        //   //       });
        //   //     }
        //   //   } else if (pltime > 1200 && pltime < 1800) {
        //   //     if (aprs.indexOf("中午") == -1) {
        //   //       aprs += "中午";
        //   //       apr_time.push({
        //   //         name: "中午(12-18点)",
        //   //         id: [1200, 1800],
        //   //         ts: false,
        //   //         price: this.datalist[k].text.cabins[0].minParPrice,
        //   //       });
        //   //     }
        //   //   } else if (pltime > 1800 && pltime < 2400) {
        //   //     if (aprs.indexOf("下午") == -1) {
        //   //       aprs += "下午";
        //   //       apr_time.push({
        //   //         name: "下午(18-24点)",
        //   //         id: [1800, 2400],
        //   //         ts: false,
        //   //         price: this.datalist[k].text.cabins[0].minParPrice,
        //   //       });
        //   //     }
        //   //   }
        //   //   if (airline.indexOf(this.datalist[k].name.airline) == -1) {
        //   //     //航空公司
        //   //     airline += this.datalist[k].name.airline + ",";
        //   //     airline_company.push({
        //   //       id: this.datalist[k].name.airline,
        //   //       price: this.datalist[k].text.cabins[0].minParPrice,
        //   //     });
        //   //   }

        //     this.datalist[k]["ims"] =
        //       "http://file.feiren.com/00/02/" +
        //       this.datalist[k].name.airline +
        //       ".png"; //http://wx.molintmc.com/static/img/
        //   //   if ((k, this.datalist[k].name.planeSize == "L")) {
        //   //     this.datalist[k].name.planeSize = "大";
        //   //   } else if ((k, this.datalist[k].name.planeSize == "M")) {
        //   //     this.datalist[k].name.planeSize = "中";
        //   //   } else if ((k, this.datalist[k].name.planeSize == "S")) {
        //   //     this.datalist[k].name.planeSize = "小";
        //   //   }
        //   //   if (
        //   //     this.datalist[k].name.planeSize != "" &&
        //   //     this.datalist[k].name.planeSize != null
        //   //   ) {
        //   //     if (planned.indexOf(this.datalist[k].name.planeSize) == -1) {
        //   //       //机型
        //   //       planned += this.datalist[k].name.planeSize;
        //   //       planned_model.push({
        //   //         name: this.datalist[k].name.planeSize,
        //   //         id: this.datalist[k].name.planeSize,
        //   //         ts: false,
        //   //         price: this.datalist[k].text.cabins[0].minParPrice,
        //   //       });
        //   //     }
        //   //   }

        //     for (let j = 0; j < this.address.length; j++) {
        //       if (
        //         (k, this.datalist[k].name.depart == this.address[j].airportCode)
        //       ) {
        //         // k,
        //         this.datalist[k].name["departs"] = this.address[j].airportCName;
        //       } else if (
        //         (k, this.datalist[k].name.arrive == this.address[j].airportCode)
        //       ) {
        //         // k,
        //         this.datalist[k].name["arrives"] = this.address[j].airportCName;
        //       }
        //       if (this.arrivalAirport == this.address[j].airportCode) {
        //         this.arrivalAirport = this.address[j].airportCName;
        //       }
        //     }
        //   }
        //   // console.log("12",this.datalist)
        //   this.options[0].value = direct_flight; //经停条件
        //   for (let k in airline_company) {
        //     //航空公司条件
        //     airline_company[k] = {
        //       name: this.company(airline_company[k].id),
        //       id: airline_company[k].id,
        //       ts: false,
        //       price: airline_company[k].price,
        //     };
        //   }
        //   this.options[2].value = airline_company;
        //   this.options[1].value = apr_time; //出发时间
        //   this.options[3].value = planned_model; //机型

        //   for (let k in this.options) {
        //     for (let j in this.options[k].val) {
        //       for (let p in this.options[k].value) {
        //         if (this.options[k].value[p].id == this.options[k].val[j].id) {
        //           this.options[k].value[p].ts = true;
        //           break;
        //         }
        //       }
        //     }
        //   }

        // this.copylist = JSON.parse(JSON.stringify(this.datalist));
        // this.filters(); //过滤方法
        // this.loading = false;
      } else {
         this.loading = false;
        this.$message({
          message: res.message,
          type: "warning",
        });
      }
    },    handleScroll() {
      //滚动条监听事件
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 125) {
        this.fitxd = true;
      } else {
        this.fitxd = false;
      }
    },
    shareds() {
      //是否过滤共享
      this.shares = !this.shares;
      this.filters();
    },
    companys(ie, cabinName) {
      for (let k in this.particulars) {
        if (ie == "F" && cabinName == null) {
          return "头等舱";
        } else if (ie == "C" && cabinName === null) {
          return "商务舱";
        } else if (ie == "Y" && cabinName === null) {
          return "经济舱";
        } else if (ie == "F" && cabinName != null) {
          return cabinName;
        } else if (ie == "C" && cabinName != null) {
          return cabinName;
        } else if (ie == "Y" && cabinName != null) {
          return cabinName;
        } else {
          return cabinName;
        }
      }
      return ie;
    },
    btclose() {
      //清除全部
      for (let k in this.datalist) {
        this.datalist[k].isshow = true;
      }
      for (let k in this.options) {
        for (let j in this.options[k].value) {
          this.options[k].value[j].ts = false;
        }
        this.options[k].val = [];
      }
      this.shares = false;
      this.contracts = [
        {
          name: "经济舱",
          id: 1,
        },
        {
          name: "头等/商务舱",
          id: 2,
        },
      ];
      this.filters();
    },
    filters() {
      //过滤方法
      let datalis = JSON.parse(JSON.stringify(this.copylist)); //操作复制值

      let stopovers = this.options[0].val; //经停直飞
      let departuretime = this.options[1].val; //起飞时间
      let airlinecompany = this.options[2].val; //航空公司
      let plannedmodel = this.options[3].val; //计划机型
      let cabins = this.options[4].val; //舱位类型
      let aipGo  = this.options[5].val; //舱位类型
      let aipBack  = this.options[6].val; //舱位类型
      let nums = 0;
      if (cabins.length > 0 && cabins.length != 2) {
        // this.shou = -1;
        if (cabins[0].id == 1) {
          //经济舱 删除商务舱
          this.contracts = [
            {
              name: "经济舱",
              id: 1,
            },
          ];
        } else {
          this.contracts = [
            {
              name: "头等/商务舱",
              id: 2,
            },
          ];
        }
      } else {
        this.contracts = [
          {
            name: "经济舱",
            id: 1,
          },
          {
            name: "头等/商务舱",
            id: 2,
          },
        ];
      }

      this.contract = this.contracts[0].id;
      for (let k = datalis.length - 1; k >= 0; k--) {
        if (cabins.length > 0 && cabins.length != 2) {
          if (cabins[0].id == 1) {
            //经济舱 删除商务舱
            for (let j = datalis[k].length - 1; j >= 0; j--) {
              if (datalis[k].level == "F" || datalis[k].level == "C") {
                datalis[k].splice(j, 1);
              }
            }
          } else {
            for (let j = datalis[k].length - 1; j >= 0; j--) {
              if (datalis[k].level == "Y") {
                datalis[k].splice(j, 1);
              }
            }
          }
          if (datalis[k].length == 0) {
            datalis.splice(k, 1);
            continue;
          }
        }
        //出发机场
        if(aipGo.length > 0){
          let sits = false;
          for (let i = 0; i < aipGo.length; i++) {
            if (aipGo[i].id == datalis[k].departs) {
              sits = true;
            }
          }
          if (sits == false) {
            datalis.splice(k, 1);
            continue;
          }
        }
        //到达机场
        if(aipBack.length > 0){
          let sits = false;
          for (let i = 0; i < aipBack.length; i++) {
            if (aipBack[i].id == datalis[k].arrives) {
              sits = true;
            }
          }
          if (sits == false) {
            datalis.splice(k, 1);
            continue;
          }
        }
        if (stopovers.length > 0) {
          //直飞/经停
          let sits = false;
          for (let s in stopovers) {
            if (stopovers[s].id == 1 && datalis[k].nonstop == false) {
              sits = true;
            } else if (stopovers[s].id == 2 && datalis[k].nonstop == true) {
              sits = true;
            }
          }
          if (sits == false) {
            datalis.splice(k, 1);
            continue;
          }
        }
        if (departuretime.length > 0) {
          //起飞时间
          let sits = false;
          for (let s in departuretime) {
            var pltime = parseInt(datalis[k].departTime.replace(":", ""));
            if (
              pltime > departuretime[s].id[0] &&
              pltime < departuretime[s].id[1]
            ) {
              sits = true;
            }
          }
          if (sits == false) {
            datalis.splice(k, 1);
            continue;
          }
        }
        if (airlinecompany.length > 0) {
          //航空公司
          let sits = false;
          for (let s in airlinecompany) {
            if (airlinecompany[s].id == datalis[k].airline) {
              sits = true;
            }
          }
          if (sits == false) {
            datalis.splice(k, 1);
            continue;
          }
        }
        if (plannedmodel.length > 0) {
          //计划机型
          let sits = false;
          for (let s in plannedmodel) {
            if (plannedmodel[s].id == datalis[k].planeSize) {
              sits = true;
            }
          }
          if (sits == false) {
            datalis.splice(k, 1);
            continue;
          }
        }
        if (this.shares == true) {
          if (datalis[k].shared == true) {
            datalis.splice(k, 1);
            continue;
          }
        }
        datalis[k].isshow = true;
        nums++;
      }
      this.userslist = datalis;
      for (let i = 0; i < this.userslist.length; i++) {
        this.userslist[i].minDiscount =
          parseInt(this.userslist[i].minDiscount * 100) / 10;
        this.$set(this.userslist[i], "loadingList", false);
      }
      this.datalistlen = nums;
    },
    delesval(index, ins) {
      //删除当前条件
      let sto = this.options[ins].value;
      for (let k in sto) {
        if (sto[k].id == this.options[ins].val[index].id) {
          sto[k].ts = false;
        }
      }
      this.options[ins].isture = false;
      this.options[ins].val.splice(index, 1);
      this.filters();
    },
    akclist(item, index) {
      //选择当前条件
      if (item.ts == false) {
        item.ts = true;
        this.options[index].val.push(item);
      } else {
        item.ts = false;
        for (let k in this.options[index].val) {
          if (this.options[index].val[k].id == item.id) {
            this.options[index].val.splice(k, 1);
          }
        }
      }
      this.filters();
    },
    takeck(item, index) {
      if (index == 0) {
        return;
      }
      if (item.cklit == false) {
        //判断是否选中当前
        for (let i = 0; i < this.takelist.length; i++) {
          if (i != index) {
            this.takelist[i].cklit = false;
            this.takelist[i].isture = false;
          }
        }
        item.cklit = true;
      }

      if (item.isture == true) {
        if (index == 1) {
          this.inverted();
        } else if (index == 3) {
          this.inverteds();
        } else if (index == 2) {
          this.invertedt();
        }
        item.isture = false;
      } else {
        if (index == 1) {
          this.sort();
        } else if (index == 3) {
          this.sorts();
        } else if (index == 2) {
          this.sortt();
        }
        item.isture = true;
      }
    },
    compare(property, desc) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        if (desc == true) {
          // 升序排列
          return value1 - value2;
        } else {
          // 降序排列
          return value2 - value1;
        }
      };
    },
    sort() {
      let _this = this;
      let pattern = ":";
      for (let k in _this.userslist) {
        _this.userslist[k]["nusm"] = _this.userslist[k].departTime.replace(
          new RegExp(pattern),
          ""
        );
      }

      this.userslist.sort(this.compare("nusm", true));
    },
    inverted() {
      let _this = this;
      let pattern = ":";
      for (let k in _this.userslist) {
        _this.userslist[k]["nusm"] = _this.userslist[k].departTime.replace(
          new RegExp(pattern),
          ""
        );
      }
      this.userslist.sort(this.compare("nusm", false));
    },
    sorts() {
      let _this = this;
      for (let j in _this.userslist) {
        _this.userslist[j]["nums"] = _this.userslist[j].minPrice;
      }
      this.userslist.sort(this.compare("nums", true));
    },
    inverteds() {
      let _this = this;
      for (let j in _this.userslist) {
        _this.userslist[j]["nums"] = _this.userslist[j].minPrice;
      }
      this.userslist.sort(this.compare("nums", false));
    },
    sortt() {
      let _this = this;
      let pattern = ":";
      for (let k in _this.userslist) {
        let arrtime = _this.userslist[k].arriveTime;
        if (arrtime.length > 5) {
          _this.userslist[k]["nusm"] =
            parseInt(arrtime.substring(0, 4).replace(new RegExp(pattern), "")) +
            2400;
        } else {
          _this.userslist[k]["nusm"] = arrtime.replace(new RegExp(pattern), "");
        }
      }
      this.userslist.sort(this.compare("nusm", true));
    },
    invertedt() {
      let _this = this;
      let pattern = ":";
      for (let k in _this.userslist) {
        let arrtime = _this.userslist[k].arriveTime;
        if (arrtime.length > 5) {
          _this.userslist[k]["nusm"] =
            parseInt(arrtime.substring(0, 4).replace(new RegExp(pattern), "")) +
            2400;
        } else {
          _this.userslist[k]["nusm"] = arrtime.replace(new RegExp(pattern), "");
        }
      }
      this.userslist.sort(this.compare("nusm", false));
    },
    chineseChange(e, index) {
      //选择高等级超规原因
      this.platformlist[index].index = e.detail.value;
    },
    editTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },
    arriva(item) {
      this.transit(item);
    },
    async transit(item) {
      //经停
      let red = await this.$api.home.getPlaneStop({
        flightNo: item.no,
        depDate: item.departDate,
      }); //查询经停航班
      if (red.code == 200) {
        this.address = airports.addressAirportAll; //航空名字
        if (red.data.flightLegBriefs != null) {
          this.arrivalAirport = red.data.flightLegBriefs[0].arrivalAirport;
        }
        for (let j = 0; j < this.address.length; j++) {
          if (this.arrivalAirport == this.address[j].airportCode) {
            this.arrivalAirport = this.address[j].cityCName;
          }
        }
      } else {
        this.elast(red.message);
        return;
      }
    },
    //弹窗关闭后强制刷新页面
    handleClose() {
      location.reload();
    },
 
    dangqian() {
      // event.stopPropagation();
    },
    cits_btn() {
      //继续预定
      let plallist = this.platformlist;
      for (let p in this.limitNativeRule) {
        for (let i in this.limitNativeRule[p]) {
          if (i == 3) {
            let resion = "";
            for (let k in plallist) {
              for (let p in plallist[k].list) {
                if (
                  plallist[k].list[p].va == 3 &&
                  plallist[k].list[p].reasons == ""
                ) {
                  this.$message({
                    message: "请选择违规原因",
                    type: "warning",
                  });
                  return;
                }
                if ((plallist[k].names = p && plallist[k].list[p].va == 3)) {
                  resion = plallist[k].list[p].reasons;
                }
              }
            }
            this.limitNativeRule[p][i] = {
              usernames: this.limitNativeRule[p][i],
              reasons: resion,
            };
          }
          // else if (i == 5) {
          // 	let ks = 0;
          // 	for (let k in plallist) {
          // 		for (let p in plallist[k].list) {
          // 			if (plallist[k].list[p].va == 5 && this.shenPi == '') {
          // 				this.$message({
          // 					message: '请填写违规原因',
          // 					type: 'warning'
          // 				});
          // 				return
          // 			}
          // 			if (plallist[k].names = p && plallist[k].list[p].va == 5) {
          // 				ks = plallist[k].index;
          // 			}
          // 		}
          // 	}
          // 	this.limitNativeRule[p][i] = {
          // 		usernames: this.limitNativeRule[p][i],
          // 		reasons: this.shenPi
          // 	}
          // }
        }
      }
      this.staleve = false;
      this.othotrlis(); //跳转订单页面
    },
    async book(item, items, index) {
      if (this.timedate > this.timedates && this.disab == false && this.timedates) {
        this.$message({
          message: "返程日期不能小于去程日期",
          type: "warning",
        });
        return;
      }
      this.isblckt = false;
      this.packslist = item;
      console.log("this.packslist -666666666",this.packslist )
      this.packslists = items;
      if (this.packlist.isbtd == 2) {
        this.othotrlis(item, items); //跳转订单页面
      } else {
        let level = ""; //舱位等级/** 服务等级, F:头等舱; C:商务舱; Y:经济舱 */
        level = items.level; //舱位等级/** 服务等级, F:头等舱; C:商务舱; Y:经济舱 */
        //10月29号  修改舱位显示时候注解掉的
        /*if (level == '头等舱') {
					  level = 'F';
					} else if (level == '商务舱') {
					  level = 'C';
					} else if (level == '经济舱') {
					  level = 'Y';
					}*/
        let user = {};
        let minSalePriceCheck = [];
        let uses = [];
        let arr = [];
        let ast = [];
        let lister = [];
        let flights = [];
        let userrw = [];
        flights = this.userslist;
        lister = item;
        userrw = this.userrw;
        for (let i in flights) {
          if (i == lister.no) {
            minSalePriceCheck.push({
              flightNo: i, //航班号
              departDateTime:
                flights[i].departDate.substring(0, 10) +
                " " +
                flights[i].departTime +
                ":00", //时间
              minSalePrice: lister.minSalePrice, //最低价
            });
          }
        }
        if (this.packlist.isblcks == 4) {
          arr = this.packlist.userlistnos;
          for (let i = 0; i < arr.length; i++) {
            ast.push({
              passengerNo: arr[i],
            });
          }
        } else {
          let sarr = this.packlist.butalist;
          for (let i = 0; i < sarr.length; i++) {
            arr.push(sarr[i].passengerNo);
            ast.push({
              passengerNo: sarr[i].passengerNo,
            });
          }
        }
        //查询当前用户改签是否需要审核
        if (this.packlist.isblcks == 4) {
          try {
            this.loading = true;
            const res = await this.$api.order.ruleMainSetting();
            this.loading = false;
            if (res.code == 200) {
              this.RuleMa = res.data.examinePattern;
              let stw = this.RuleMa.split(",");
            var a =  stw.filter(item =>{
               return item == 9
              })
              // for (let i in stw) {
                /**
                 * 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
                 */
                if (a == 9) {
                  const rest = await this.$api.order.judgeApprv({
                    passengerNos: arr,
                  }); //判断当前出行人是否都免审
                  if (rest.code == 200) {
                    if (rest.data == true) {
                      //判断是否需要审核 true为不需要审核
                      this.isarsrl = true;
                    }
                  } else {
                    that.$message({
                      message: res.message,
                      type: "warning",
                    });
                    return;
                  }
                } else {
                  this.isarsrl = false;
                }
              // }
              // 1111
            } else {
              that.$message({
                message: res.message,
                type: "warning",
              });
            }
          } catch (e) {
            // console.log(e);
            this.loading = false;
          }
        } else {
          try {
            this.loading = true;
            this.$api.home
              .judgeApprv({
                passengerNos: arr,
              })
              .then((res) => {
                this.loading = false;
                if (res.code == 200) {
                  if (res.data == true) {
                    //判断是否需要审核 true为不需要审核
                    this.isarsrl = true;
                  }
                } else {
                  this.$message({
                    message: res.message,
                    type: "warning",
                  });
                }
              })
              .catch((e) => {
                // console.log(e);
                this.loading = false;
              });
          } catch (e) {
            // console.log(e);
            this.loading = false;
          }
        }
        (user = {
          depart: item.depart, //出发点,
          arrive: item.arrive, //到达地
          fuelFee: item.fuelFee, //本次航班燃油费,
          taxFee: item.taxFee, //本次航班基建费,
          minSalePrice: item.minSalePrice, //本次航班最低价,
          salePrice: items.salePrices[0].price, //舱位票面价,
          peopleNum: this.packlist.butalist.length, //出行人数（用于校验同行人数规则）,
          departDate: item.departDate, //起飞日期,
          departTime: item.departTime, //,（用于校验提前预定天数规则）,
          level: level,
          discount: items.discount*10, //折扣,
          airline: item.airline, //航司编码,
          hcType: this.lei, //单程或者往返
          staffIds: ast, //用户编号
          flightNo: item.no, //航班号
          minSalePriceCheck: minSalePriceCheck, //list对象
        }),
          (uses = {
            civilServiceTicket: 1,
          });
        this.loading = true;
        const res = await this.$api.home.ruleCheck(user); //获取是否超规
        this.loading = false;
        if (res.code == 200) {
          if (JSON.stringify(res.data.limitNativeRule) == "{}") {
            //没有违规
            this.othotrlis(item, items); //跳转订单页面
          } else {
            this.rulesReasons = res.data.rulesReason; //违规原因
            this.rulesReasons.unshift({
              chineseDesc: "",
            });
            let dal = res.data.limitNativeRule; //违规信息
            this.limitNativeRule = dal;
            this.platformlist = [];
            this.notbooking = false;
            this.pookis = false;
            for (let k in dal) {
              this.platformlist.push({
                index: 0,
                name: this.platnams(k),
                names: k,
                list: this.platname(dal[k]),
              });
            }
            for (let p in this.platformlist) {
              for (let k in this.platformlist[p].list) {
                if (this.platformlist[p].list[k].va == 4) {
                  this.notbooking = true;
                }
                if (this.platformlist[p].list[k].va == 5) {
                  this.pookis = true; //是否再次审批
                    this.isblckt = true; //是否再次审批
                }
              }
            }
            this.staleve = true;
          }
        } else {
          this.$message({
            message: res.message,
            type: "warning",
          });
        }
      }
    },
    othotrlis() {
      let datae = {
        datw: this.packlist,
        userlist: this.packslist,
      };
      let cit = {
        name: this.company(this.packslist.airline),
        text: this.packslist.airline,
      };
      let data = {};
      if (this.civilServiceTicket != undefined) {
        data = {
          isone: true, //是否单程
          data: datae, //上个页面参数
          date: this.timedate.substring(5, 10),
          limitNativeRule: this.limitNativeRule,
          hang: cit,
          datw: this.packslists, //当前座位信息
          week: this.week,
          isarsrl: this.isarsrl,
          isblckt: this.isblckt, //事前是否2次审批
          civilServiceTicket: this.civilServiceTicket, //是否公务 1是 0 否
        };
      
      } else {
        data = {
          isone: true, //是否单程
          data: datae, //上个页面参数
          date: this.goName == 0 || (this.goName == 1 && this.timedates == '') ? this.timedate.substring(5, 10) : this.timedates.substring(5, 10),
          limitNativeRule: this.limitNativeRule,
          hang: cit,
          datw: this.packslists, //当前座位信息
          week: this.week,
          isarsrl: this.isarsrl,
          isblckt: this.isblckt, //事前是否2次审批
        };
        
      }
      // if(this.timedate.length > 5){
      //   data['date'] = this.timedate.length > 5 ? this.timedate.substring(5, 10):this.timedate
      // }
      if (this.timedates == "") {
        sessionStorage.setItem("ticketcationadds", JSON.stringify(data));
        this.$router.push({
          path: "/ticketcationadd",
        });
      } else {
        if (this.goName == 0) {
          let st = this.go_there;
          st = [data];
          this.$store.commit("go_there_add", st);
          this.$store.commit("goName_add", 1);
          this.zhuan = "2";
          this.shou = -1;
          let city = this.citylist;
          this.citylist = [
            {
              id: city[1].id,
              name: city[1].name,
            },
            {
              id: city[0].id,
              name: city[0].name,
            },
          ];
          for (let i in this.itemlist) {
            if (this.itemlist[i].dats == this.timedates) {
              this.week = this.itemlist[i].week;
              this.date = this.itemlist[i].data;
            }
          }
          // 往返单子 更换往返地址
          // var go = this.fromcity
          // var back = this.tocity
          // var goTime = this.timedate
          // var backTime = this.timedates
          //  this.fromcity = back
          //  this.tocity = go
          //  this.timedate = backTime
          //  this.timedates = goTime
          this.backCity = this.tocity;
          this.goCity = this.fromcity;
          this.backTime = this.timedates;
          // this.goTime = this.timedate
          this.aircraftlistst();
        } else {
          let st = this.go_there;
          st.push(data);
          this.$store.commit("go_there_add", st);
          this.$store.commit("goName_add", 0);
          let et = {
            isone: false, //是否单程
            ones: this.go_there[0],
            twos: this.go_there[1],
          };
        
          sessionStorage.setItem("ticketcationadds", JSON.stringify(et));
          this.$router.push({
            path: "/ticketcationadd",
          });
        }
      }
    },
    platnams(name) {
      if (name == "highLimit") {
        return "高价限制超规";
      } else if (name == "lowLimit") {
        return "2小时低价限制";
      } else if (name == "starLevelLimit") {
        return "低价限制超规";
      } else if (name == "agreementFlightLimit") {
        return "限定协议航班限制超规";
      } else if (name == "reserveLimit") {
        return "提前预定限制超规";
      } else if (name == "positionLimit") {
        return "仓位限制超规";
      } else if (name == "discountLimit") {
        return "折扣限制超规";
      } else if (name == "accNumberLimit") {
        return "同行人数限制超规";
      }
    },
    platname(list) {
      let su = [];
      for (let k in list) {
        if (k == 1) {
          su.push({
            va: k,
            name: "只记录不提示",
            list: list[k],
          });
        } else if (k == 2) {
          su.push({
            va: k,
            name: "超规不必选择原因",
            list: list[k],
          });
        } else if (k == 3) {
          su.push({
            va: k,
            name: "超规必须选择原因",
            list: list[k],
            reasons: "",
          });
        } else if (k == 4) {
          su.push({
            va: k,
            name: "不可预定",
            list: list[k],
          });
        } else if (k == 5) {
          su.push({
            va: k,
            name: "超规需重新审核",
            list: list[k],
          });
          // this.packlist["metarule"] = this.packlist.examineSwitch == 1 ? 3 :  0 
        }
      }
      return su;
    },
    leftmove() {
      //左
      if (this.itmesp > 0) {
        this.itmesp -= 1;
      }
      this.$refs.luns.style.transform =
        "translate(" + -912 * this.itmesp + "px,0)";
    },
    rightmove() {
      //右
      if (this.itmesp < 13) {
        this.itmesp += 1;
      }
      this.$refs.luns.style.transform =
        "translate(" + -912 * this.itmesp + "px,0)";
    },
    seachlist() {
      //搜索
      if (this.timedate > this.timedates && this.disab == false) {
        this.$message({
          message: "返程日期不能小于去程日期",
          type: "warning",
        });
        return;
      }

      this.aircraftlistst();
    },
    datachencks(item, it) {
      //点击时间
      if (this.isblcks == 1) {
        return;
      }     
      if(this.timedates != '' && this.goName == 1){
        this.timedates = it;
        this.backTime = it
      }else{
         this.timedate = it;
      }
      this.seachlist();
    },
    tiemdat(val) {
      //时间选择
      this.timedate = val;
      this.packlist.timedate = val;
      for (let i in this.itemlist) {
        if (this.itemlist[i].dats == this.timedate) {
          this.week = this.itemlist[i].week;
          this.date = this.itemlist[i].data;
        }
        // else if(this.itemlist[i].dats == this.timedates){
        //   this.week = this.itemlist[i].week;
        //   this.date = this.itemlist[i].data;
        // }
      }

      this.datenow();
      // this.seachlist();
    },
    tiemdats(val) {
      //时间选择
      this.timedates = val;
      this.packlist.timedates = val;
      this.backTime = this.goName == 1 ? val : this.backTime; // 选择回程时 更换回程日期重新赋值
      this.datenow();
      // this.seachlist();
    },
    datenow(time) {
      //移动到当前选择的日期
      let EndTime = new Date(this.timedate);
      let NowTime = new Date();
      let t = EndTime.getTime() - NowTime.getTime();
      let d = Math.floor(t / 1000 / 60 / 60 / 24);
      let integerNumber = parseInt((d + 2) / 8);
      if ((d + 2) / 8 > integerNumber) {
        integerNumber += 1;
      }
      this.itmesp = integerNumber - 1;
      this.$refs.luns.style.transform =
        "translate(" + -912 * this.itmesp + "px,0)";
    },
    listchangs(e) {
      //城市选择
      this.fromcity = e[0].id;
      this.tocity = e[1].id;

      // this.seachlist();
    },
    company(ie) {
      for (let s in this.hang) {
        if (ie == s) {
          ie = this.hang[s];
          return ie;
        }
      }
    },
    //共享
    tings(item, index) {
      event.stopPropagation();
      if (this.ting == false) {
        this.ting = true;
      } else {
        this.ting = false;
      }
    },
    async ctlist(item, items, inde) {
    
      this.yin = true;
      if (inde != undefined) {
        this.bagAllow = true;
        this.bagAllows = item.bagAllow;
      } else {
        this.bagAllow = false;
        try {
          let data = {
            airlineCode: item.airline, //航司编码
            cabin: items.cabin, //舱位
            depDate: item.departDate, //起飞时间
            airRoute: item.depart + item.arrive, //航线：CANPVG（出发地到达地）
          };
          const ret = await this.$api.home.getRefundChangeRule(data);
          if (ret.code == 200) {
            this.backrule = ret.data;
          } else {
            this.$message({
              message: res.message,
              type: "warning",
            });
          }
        } catch (e) {
          // console.log(e);
        }
      }
    },
    ctlists() {
      this.yin = false;
    },
    async user(item, index) {
      var data = {
        flightNo: item.no,
        searchNo: this.searchNo,
      };
      if (this.shou == index) {
        this.shou = -1;
      } else {
        this.shou = index;
        if (item.loadingList) return;
        item.loadingList = true;
        const res = await this.$api.home.fetchCabins(data);
        if (res.code == 101) {
          this.dialogVisible = true;
          item.loadingList = false;
          return;
        }
        if (res.code != 200) {
          item.loadingList = false;
          this.$message.error(res.message);
          return;
        }
        //   this.contract = this.contracts[0].id;
        this.particulars = res.data; // 航班舱位列表
        item.loadingList = false;
      }
    },
    disname(num) {
      let stnumber = parseFloat(num);
      if (stnumber < 1) {
        let num = this.mul(stnumber, 10);
        num.toFixed(1);
        return num + "折";
      } else {
        return "全价";
      }
    },
    mul(a, b) {
      //乘法
      var c = 0,
        d = a.toString(),
        e = b.toString();
      try {
        c += d.split(".")[1].length;
      } catch (f) {}
      try {
        c += e.split(".")[1].length;
      } catch (f) {}
      return (
        (Number(d.replace(".", "")) * Number(e.replace(".", ""))) /
        Math.pow(10, c)
      );
    },
    dealDisabledDate(time) {
      //禁掉小于当前日期
      var times = Date.now();
      return time.getTime() < times - 8.64e7;
    },
  },
};
</script>

<style scoped lang="less">
.main {
  height: 100%;

  ul li {
    list-style: none;
  }

  .listfoter {
    width: 100%;
    background-color: #ffffff;
    margin-bottom: 10px;
    font-size: 18px;
    padding: 5px 0;
    box-shadow: 0 0 10px 0 #bebebe;

    .form-wrap {
      width: 1180px;
      margin: 0 auto;
      padding: 10px;

      .stis {
        width: 100%;
        background: #ffffff;
        display: flex;
        align-items: center;

        .sercits {
          width: 40%;

          .citysleft {
            border-radius: 3px;
            width: 100%;
            height: 40px;
          }
        }

        .timeits {
          width: calc(40% - 1px);
          height: 65px;
          display: flex;
          align-items: center;
          padding: 0 15px;
          font-size: 14px;

          .sies {
            color: #b4bccc;
            width: 30%;
            text-align: center;
          }

          .timeist {
            width: 80%;
          }
        }

        .timeitsw {
          width: calc(20% - 1px);
          cursor: pointer;
          height: 65px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3b4f62;
          font-size: 14px;
        }

        .btselect {
          font-size: 16px;
          width: 20%;
          height: 40px;
          cursor: pointer;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #ff9a35;
        }
      }
    }
  }

  .boxlist {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    .box_left {
      width: 190px;

      .fixs {
        width: 190px;

        .bo_tops {
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          color: #363636;

          .btclose {
            cursor: pointer;
            padding: 3px 4px;
            background-color: #ffffff;
            border: 1px solid #d4d4d4;
          }

          .btclose:hover {
            background-color: #fbfbfb;
          }
        }

        .bo_dv {
          position: relative;
          background-color: #ffffff;
          cursor: pointer;

          .bo_lis {
            display: flex;
            justify-content: space-between;
            width: 190px;
            font-size: 12px;
            text-indent: 15px;
            color: #363636;
            height: 40px;
            line-height: 40px;
            border: 1px solid #eeeeee;
            border-bottom: 0;
          }

          .bo_lisk {
            cursor: default;
            display: flex;
            align-items: center;
            width: 190px;
            font-size: 10px;
            text-indent: 15px;
            color: #989898;
            height: 40px;
            line-height: 40px;
            background-color: #f9f9f9;

            span {
              cursor: pointer;
              font-size: 10px;
              color: #989898;
            }

            span:hover {
              color: #409eff;
            }
          }

          .bo_abouset {
            position: absolute;
            right: -162px;
            top: 0;
            width: 160px;
            line-height: 40px;
            font-size: 12px;
            border: 1px solid #eeeeee;
            border-left: 0;
            background-color: #ffffff;
            z-index: 99999;

            .ab_lis {
              display: flex;
              align-items: center;
              justify-content: space-between;

              .af_vls {
                display: flex;
                align-items: center;

                span {
                  color: #409eff;
                  margin: 0 5px 0 15px;
                }
              }

              .prices {
                color: #ff7362;
                padding-right: 10px;
              }
            }

            .ab_lis:hover {
              background-color: #f1faff;
            }
          }
        }

        .bo_dst {
          display: flex;
          cursor: pointer;
          text-indent: 15px;
          font-size: 12px;
          width: 190px;
          height: 40px;
          line-height: 40px;
          margin-top: 10px;
          border: 1px solid #eeeeee;
          background-color: #ffffff;

          span {
            margin-right: 5px;
            color: #409eff;
          }
        }
      }

      .fliedes {
        position: fixed;
        top: 100px;
        z-index: 998;
      }
    }

    .box_right {
      width: 1000px;
      position: relative;
      .bislost {
        width: 1000px;
        display: flex;

        .bs_ledts {
          width: 190px;
          height: 80px;
          background-color: #ffffff;
          margin-right: 10px;
        }

        .bs_rdes {
          width: 1000px;

          .lunsdata {
            width: 1000px;
            height: 40px;
            display: flex;

            .lun_left {
              width: 40px;
              height: 40px;
              background: #ffffff;
              text-align: center;
              line-height: 40px;
              cursor: pointer;
            }

            .lun_right {
              width: 40px;
              height: 40px;
              background: #ffffff;
              text-align: center;
              line-height: 40px;
              cursor: pointer;
            }

            .luns {
              margin: 0 4px;
              width: 920px;
              overflow: hidden;
              background: #ffffff;
              box-shadow: 0 0 14px 0 rgba(177, 190, 203, 0.2);

              .lun_list {
                height: 40px;
                display: flex;
                transition: transform 0.35s;

                .l_list {
                  width: 114px;
                  height: 37px;
                  cursor: pointer;
                  color: #0b4f62;
                  font-size: 15px;
                  display: flex;
                  justify-content: center;
                  line-height: 34px;
                  border-top: 3px solid #ffffff;
                }

                .datacheck {
                  width: 114px;
                  height: 37px;
                  color: #409eff;
                  line-height: 40px;
                  background-color: #edf4fe;
                  border-top: 3px solid #409eff;
                }

                .l_list:hover {
                  color: #409eff;
                }
              }
            }
          }

          .take {
            width: 1000px;
            height: 30px;
            line-height: 30px;
            margin: 10px 0;
            background: #fafcff;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .taks_right {
              width: 100%;
              display: flex;
              align-items: center;
              font-size: 12px;
              cursor: pointer;
              color: #363636;

              div {
                text-align: center;
              }

              .fitus {
                font-size: 12px;
              }
            }
          }
        }
      }

      .lunsfiexd {
        position: fixed;
        padding-top: 10px;
        width: 100%;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        background-color: #f2f6fa;
        box-shadow: 0 3px 10px rgba(153, 153, 153, 0.5);
      }

      .airlines {
        width: 1000px;
        height: 600px;
        margin: 0 auto 10px auto;
        // background: #ffffff;
        position: absolute;
        z-index: 1;
      }
      .airlinesNO {
        display: none;
      }
      .airline {
        width: 1000px;
        margin: auto;
        background: #ffffff;

        .section {
          width: 1000px;
          margin: 0 auto;
          background: #f9fafd;
          margin-bottom: 10px;

          .selist {
            width: 100%;
            height: 108px;
            background: #ffffff;
            box-shadow: 0 0 14px 0 rgba(177, 190, 203, 0.2);
            cursor: pointer;
            .mixin_displayBox();

            .trainsc {
              width: 96%;
              padding: 0 2%;
              display: flex;
              align-items: center;

              .trass {
                width: 4%;

                img {
                  width: 30px;
                  height: 30px;
                }
              }

              .trainsc_l {
                width: 15%;

                .trasp {
                  color: #333333;
                  font-weight: 400;
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                }

                .trasps {
                  color: #999999;
                  font-size: 14px;
                }
              }

              .trainsc_s {
                width: 53%;
                padding: 0 5%;
                display: flex;
                align-items: center;

                .trainsc_s_l {
                  width: 45%;

                  .trainsc_s_l_t {
                    font-family: MicrosoftYaHei-Bold;
                    color: #333333;
                    line-height: 20px;
                    font-size: 20px;
                    font-weight: Bold;
                    margin-bottom: 10px;
                  }

                  .trainsc_s_l_b {
                    display: flex;
                    font-size: 12px;

                    .trainsc_s_l_b_l {
                      width: 16px;
                      height: 16px;
                      text-align: center;
                      line-height: 16px;
                      border-radius: 2px;
                      margin: 0 6px 0 4px;
                    }

                    .trainsc_s_l_b_r {
                      text-align: center;
                      font-size: 12px;
                      color: #999999;
                    }

                    .trabrs {
                      color: #409eff;
                      border: 1px solid #409eff;
                    }

                    .trabrd {
                      color: #ff7362;
                      border: 1px solid #ff7362;
                    }
                  }
                }

                .trainsc_s_r {
                  & > div {
                    .mixin_displayBox(@jc: flex-end);
                  }
                }

                .trainsc_s_s {
                  width: 70%;
                  color: #d2dde7;
                  text-align: center;
                  letter-spacing: 0.16px;
                  height: 26px;
                  background: url("../../../../static/image/home/arrow.png")
                    bottom no-repeat;
                }

                .nonstop {
                  height: 48px;
                }
              }

              .trainsc_r {
                width: 20%;

                .seatlist {
                  text-align: right;
                  padding-left: 60%;

                  .seatname {
                    width: 100%;
                    font-size: 12px;
                    color: #999;
                  }

                  .public {
                    color: #3c85fd;
                  }

                  .seatprice {
                    width: 100%;
                    font-size: 28px;
                    color: #ff8205;

                    span {
                      font-size: 6px;
                      color: #333333;
                    }
                  }

                  .seats {
                    width: 40%;
                    font-size: 14px;
                    color: #8a8dab;
                  }

                  .seatst {
                    width: 20%;
                    height: 28px;
                    cursor: pointer;
                    font-size: 14px;
                    color: #ffffff;
                    background: #3c85fd;
                    border-radius: 3px;
                  }

                  .seatstb {
                    width: 20%;
                    height: 28px;
                    font-size: 14px;
                    color: #ffffff;
                    background: #d0d7de;
                    border-radius: 3px;
                  }
                }
              }
            }
          }

          .selist:hover {
            border-radius: 2px;
            box-shadow: 0 0 12px 0 #3c85fd;
          }
        }

        .side {
          width: 100%;
          border-top: 1px solid #eeeeee;

          .middle {
            .contract {
              width: 100%;
              display: flex;
              line-height: 50px;
              background: #ffffff;
              cursor: pointer;

              .contract_left {
                width: 10%;
                text-align: center;
                color: #b2b7c5;
                font-size: 15px;
              }

              .contract_lefta {
                color: #3c85fd !important;
                line-height: 50px;
                border-bottom: 2px solid #3c85fd;
              }
            }
          }
        }
      }

      .rule {
        width: 350px;
        height: 400px;
        position: fixed;
        top: calc(50% - 60px);
        left: calc(70% - 760px);
        background: white;
        border-radius: 5px;
        .mixin_boxShow();
      }

      .reserve {
        width: 100%;
        display: flex;
        line-height: 70px;
        text-indent: 20px;
        background: #ffffff;
        border-bottom: 1px solid #eeeeee;
        justify-content: space-between;

        .reserve_left {
          display: flex;
          width: 10%;

          .changetype {
            color: #0a5dde;
            line-height: 74px;
          }

          .official {
            height: 25px;
            padding: 22px 20px 0 20px;
            text-align: center;
            justify-content: center;
          }
        }

        .shidisc {
          line-height: 74px;
        }

        .reserve_lefts {
          font-size: 14px;
          cursor: pointer;
          width: 20%;
          height: 74px;
          line-height: 74px;
          .spana {
            color: #3c85fd;
            cursor: pointer;
            margin-right: 14px;
          }
        }

        .reserve_cen {
          display: flex;
          font-size: 14px;
          width: 30%;
          .shidisc {
            color: #333333;
            font-family: MicrosoftYaHei;
          }

          .spans {
            padding-left: 40px;
            padding-right: 40px;
            color: #3c85fd;
            cursor: pointer;
          }
        }

        .reserve_right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 30%;
          padding: 0 20px;

          .shidiss {
            color: #ff8205;
            font-size: 24px;
            text-align: right;

            span {
              font-size: 14px;
            }
          }

          .but {
            width: 80px;
            height: 32px;
            margin-left: 30px;
            cursor: pointer;
            text-indent: 0px;
            text-align: center;
            background: #3c85fd;
            line-height: 32px;
            border-radius: 4px;
            color: #ffffff;
          }

          .but:hover {
            opacity: 0.8;
          }
        }
      }

      .reserve:hover {
        background: #fafbfd;
      }
    }
  }

  .staleve {
    position: fixed;
    left: 0;
    top: 0;
    width: calc(100% - 68%);
    height: 100%;
    padding: 0 34%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;

    .stalist {
      width: 100%;
      border-radius: 18px;
      min-height: 250px;

      font-size: 16px;
      line-height: 90px;
      background: #f1f1f1;

      .scloos {
        max-height: 500px;
        overflow: auto;
        min-height: 190px;
        .statop {
          padding: 10px 10px 0 10px;

          .reds {
            width: 100%;
            height: 60px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            color: red;

            .ts_text {
              padding: 0 20px;
              line-height: 50px;
              border-radius: 50px;
              border: 2px solid red;
            }
          }

          .setlist {
            line-height: 30px;
            font-size: 16px;
            margin: 10px 0;

            .setbod {
              border: 2px solid #ffffff;
              border-radius: 15px;

              .styul {
                width: 100%;
                margin: 10px 0;

                .styli_top {
                  width: 100%;
                  color: red;
                  text-align: center;
                  font-size: 16px;
                  line-height: 45px;
                }

                .stulis {
                  display: flex;
                  justify-content: center;
                  .styli_rights {
                    // width: 100%;
                    color: red;
                    // text-align: center;
                    // margin-left: 5%;
                  }

                  .styli_left {
                    // width: 25%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                  }

                  .styli_right {
                    // width: 75%;
                    margin-left: 5%;
                  }
                }
              }
            }
          }
        }
      }

      .btnsti {
        width: 100%;
        height: 60px;
        cursor: pointer;
        line-height: 60px;
        text-align: center;
        display: flex;

        .roblck {
          flex: 1;
          height: 60px;
          background: #ffffff;
          border-bottom-left-radius: 15px;
        }

        .btnok {
          flex: 1;
          height: 60px;
          border-bottom-right-radius: 15px;
          color: #ffffff;
          background: linear-gradient(to right, #4e92fd 0%, #6e46fe 100%);
        }
      }
    }
  }
  .noData {
    top: 170px;
    min-width: 1000px;
  }
}
</style>
<style lang="less">
.reloadPage {
  & > .el-dialog {
    & > div,
    & > .el-dialog__header {
      text-align: center;
    }
  }
}
</style>
