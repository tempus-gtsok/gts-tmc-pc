<template>
  <!-- 产品预定->火车票列表 -->
  <div class="trainlist">
    <div class="listfoter" :class="fitxd ? 'listfiexd' : ''">
      <div class="form-wrap">
        <div class="stis">
          <div class="sercits">
            <div class="citysleft">
              <citysearchs
                @changers="listchangs"
                :ctiys="citylist"
                :iskes="iscks"
              ></citysearchs>
            </div>
          </div>
          <div class="timeits">
            <div class="sies">去程</div>
            <div class="timeist">
              <el-date-picker
                value-format="yyyy-MM-dd"
                style="width: 100%"
                v-model="traitime"
                :disabled="iscks == 1"
                type="date"
                placeholder=""
                :editable="false"
                :clearable="false"
                @change="tiemdat"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </div>
          </div>
          <div class="timeitsw" @click="higrailclic(higrail)">
            <p
              v-if="higrail"
              class="iconfont"
              style="font-size: 18px; color: #abb7c2"
            >
              &#xe80c;
            </p>
            <p v-else class="iconfont" style="font-size: 18px; color: #409eff">
              &#xe618;
            </p>
            <p>只看高铁/动车</p>
          </div>
          <div class="btselect" @click="seachlist">搜索</div>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="lunsdata" :class="fitxd ? 'lunsfiexd' : ''">
        <div class="lun_left" @click="leftmove">
          <span class="iconfont color">&#xe8a1;</span>
        </div>
        <div class="luns">
          <div
            ref="luns"
            class="lun_list"
            :style="{
              width: 4 * 1120 + 'px',
            }"
          >
            <div
              class="l_list"
              :class="item.dats == datatime ? 'datacheck' : ''"
              v-for="(item, index) in itemlist"
              :key="index"
              @click="datachencks(item.dats)"
            >
              <div>{{ item.data }}</div>
              <div style="margin-left: 3px">{{ item.week }}</div>
            </div>
          </div>
        </div>
        <div class="lun_right" @click="rightmove">
          <span class="iconfont color">&#xe62d;</span>
        </div>
      </div>
      <div class="filters">
        <div
          class="filtlist"
          v-for="(item, index) in classification"
          :key="index"
        >
          <div class="fil-lefts">
            <div style="color: #333333; font-family: MicrosoftYaHei">
              {{ item.name }}：
            </div>
            <div
              style="color: #3c85fd; cursor: pointer; margin-right: 32px"
              @click="deletclass(item)"
            >
              不限
            </div>
          </div>

          <div class="fitlabelBox">
            <div
              class="fitlabel"
              v-for="(itm, ins) in item.list"
              @click="classck(itm, item)"
            >
              <div
                v-if="itm.isture == false"
                class="iconfont"
                style="font-size: 18px; color: #abb7c2"
              >
                &#xe80c;
              </div>
              <div
                v-else
                class="iconfont"
                style="font-size: 18px; color: #409eff"
              >
                &#xe618;
              </div>
              {{ itm.name }}
            </div>
          </div>
        </div>
        <div class="filtlists">
          <div class="fil-lefts">
            <div style="color: #333333; font-family: MicrosoftYaHei">
              车次型号：
            </div>
            <div class="fil_nos">
              <input
                type="text"
                v-on:input="inputFunc"
                placeholder="请输入车次号"
                v-model="traNoso"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="trainuname">
        <div style="width: 96%; margin: 0 2%; display: flex">
          <div style="width: 12%">车次信息</div>
          <div
            style="
              display: flex;
              width: 32.6%;
              justify-content: space-between;
              padding: 0 11%;
            "
          >
            <div>出发站/时间</div>
            <div>运行时间</div>
            <div>到达站/时间</div>
          </div>
          <div style="display: flex; text-align: center; width: 14%">
            <div style="width: 50%; margin-left: 25px">坐席</div>
            <div style="width: 50%; margin-left: 20px">参考价</div>
          </div>
          <div style="width: 12%; text-align: center; margin-left: 10px">
            剩余票量
          </div>
        </div>
      </div>
      <div class="section" v-loading="loading">
        <div class="selist" v-for="(item, index) in trainlist" :key="index">
          <div style="display: flex">
            <div class="trainsc">
              <div class="trainsc_l">
                <div class="trasp">{{ item.trainNo }}</div>

                <div class="trasps" @click="swlist(item)">
                  <p class="tr-p">经停</p>
                </div>
              </div>
              <div class="trainsc_s">
                <div class="trainsc_s_l">
                  <div class="trainsc_s_l_t">{{ item.fromTime }}</div>
                  <div class="trainsc_s_l_b">
                    <div class="trainsc_s_l_b_r">{{ item.fromStation }}</div>
                  </div>
                </div>
                <div class="trainsc_s_s">
                  <div style="font-size: 14px; margin-bottom: 5px">
                    {{ timey(item.runTimeSpan) }}
                  </div>
                </div>
                <div class="trainsc_s_l">
                  <div class="trainsc_s_l_t">{{ item.toTime }}</div>
                  <div class="trainsc_s_l_b">
                    <div class="trainsc_s_l_b_r">{{ item.toStation }}</div>
                  </div>
                </div>
              </div>
              <div class="trainsc_r">
                <div
                  class="seatlist"
                  v-for="(items, indexs) in item.seats"
                  :key="indexs"
                >
                  <div class="seatname">{{ items.seatName }}</div>
                  <div class="seatprice">￥{{ items.price }}</div>
                  <div class="seats" v-if="items.seats > 0">
                    余{{ items.seats }}张
                  </div>
                  <div
                    class="seats"
                    v-else-if="items.seats > 0 && items.seats <= 10"
                  >
                    余<span class="color">{{ items.seats }}张</span>
                  </div>
                  <div class="seats" v-else>{{ items.seats }}</div>
                  <div
                    class="seatst"
                    @click="opckecd(item, items , indexs)"
                    v-if="items.seats === '有' || items.seats > 10"
                  >
                    预定
                  </div>
                  <div
                    class="seatst q_color"
                    @click="opckecd(item, items , indexs)"
                    v-if="items.seats <= 10 && items.seats > 0"
                  >
                    抢票
                  </div>
                  <div class="seatst s_color" v-if="items.seats === '0'">
                    售空
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <no-data
          class="noData"
          v-if="trainlist.length === 0 && loading === false"
        ></no-data>
      </div>

      <el-dialog title="" :visible.sync="showdats" width="30%">
        <el-table
          :header-cell-style="{ background: '#008CCC', color: '#ffffff' }"
          border=""
          :data="trklist"
          height="250"
          border
          style="width: 100%"
        >
          <el-table-column prop="fromStation" align="center" label="经停站">
          </el-table-column>
          <el-table-column prop="departureTime" align="center" label="出发时间">
          </el-table-column>
          <el-table-column align="center" label="停留">
            <template slot-scope="scope">
              <div v-if="scope.row.stayTimeSpan != 0">
                停留{{ scope.row.stayTimeSpan }}分钟
              </div>
              <div v-else>--</div>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <div class="staleve" v-if="staleve" @click="staleve = false">
        <div class="stalist" @click.stop>
          <div class="statop" v-if="nativeTrainl.length > 0">
            <div class="reds">
              <div class="ts_text">座位等级违规</div>
            </div>
            <div
              class="setlist"
              v-for="(item, index) in nativeTrainl"
              :key="index"
            >
              <div class="setbod" v-if="item.name == 4">
                <div class="styul">
                  <div class="styli_top">不可预定</div>
                  <div class="stulis">
                    <div class="styli_left">违规人员:</div>
                    <div class="styli_right">{{ item.list }}</div>
                  </div>
                </div>
              </div>
              <div class="setbod" v-if="item.name == 5 && !notbooking">
                <div class="styul">
                  <div class="styli_top">超规需重新审核</div>
                  <div class="stulis">
                    <div class="styli_left">超规人员:</div>
                    <div class="styli_right">{{ item.list }}</div>
                  </div>
                </div>
              </div>
              <div class="setbod" v-if="item.name == 2 && !notbooking">
                <div class="styul">
                  <!-- <div class="styli_top">违规不必选择原因</div> -->
                  <div class="stulis">
                    <div class="styli_left">违规人员:</div>
                    <div class="styli_right">{{ item.list }}</div>
                  </div>
                </div>
              </div>
              <div class="setbod" v-if="item.name == 3 && !notbooking">
                <div class="styul">
                  <!-- <div class="styli_top">违规必须选择原因</div> -->
                  <div class="stulis">
                    <div class="styli_left">违规人员:</div>
                    <div class="styli_right">{{ item.list }}</div>
                  </div>
                </div>
                <div class="styul">
                  <div class="stulis">
                    <div class="styli_left">违规原因:</div>
                    <div class="styli_right">
                      <el-select v-model="ruliset" placeholder="请选择">
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
            </div>
          </div>
          <div class="btnsti" v-if="!notbooking">
            <div class="roblck" @click="staleve = false">取消</div>
            <div class="btnok" @click="cits_btn">继续预定</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoData from "@/components/common/noData";

var date1 = new Date();
var date2 = new Date(date1);
date2.setDate(date1.getDate() + 29);
let settime = new Date(
  date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate()
).getTime();
import citysearchs from "@/components/common/citycomponents_t.vue";

export default {
  data() {
    return {
      traNoso: "", //车次型号
      trklist: [], //经停站
      showdats: false,
      classification: [],
      classifications: [
        {
          name: "出发时段",
          vs: "cfsd",
          list: [
            {
              name: "0点-6点",
              isture: false,
              value: [0, 1, 2, 3, 4, 5, 6],
            },
            {
              name: "6点-12点",
              isture: false,
              value: [6, 7, 8, 9, 10, 11, 12],
            },
            {
              name: "12点-18点",
              isture: false,
              value: [12, 13, 14, 15, 16, 17, 18],
            },
            {
              name: "18点-24点",
              isture: false,
              value: [18, 19, 20, 21, 22, 23, 24],
            },
          ],
        },
        {
          name: "到达时段",
          vs: "ddsd",
          list: [
            {
              name: "0点-6点",
              isture: false,
              value: [0, 1, 2, 3, 4, 5, 6],
            },
            {
              name: "6点-12点",
              isture: false,
              value: [6, 7, 8, 9, 10, 11, 12],
            },
            {
              name: "12点-18点",
              isture: false,
              value: [12, 13, 14, 15, 16, 17, 18],
            },
            {
              name: "18点-24点",
              isture: false,
              value: [18, 19, 20, 21, 22, 23, 24],
            },
          ],
        },
      ],
      iscalo: "", //车型
      enddats: settime, //30天后的日期时间戳
      fitxd: false, //头部是否定位
      ruliset: "",
      roteslist: {}, //上个页面的参数
      astlis: {}, //当前座位信息
      trainlis: {}, //当前车信息
      isarsrl: false, //改签因公是否需要审核
      rulesReasons: [], //违规原因
      nativeTrainl: [], //违规信息
      notbooking: false, //违规不能继续
      idstarle: false, //违规必须原因
      staleve: false, //是否有违规信息
      butalist: [], //出行人
      higrail: true,
      itemlist: [],
      itmesp: 0,
      trts: [], //出发站点
      trto: [], //到达站点
      queryKey: "",
      loading: false,
      trainlist: [],
      trainlists: [],
      iscks: JSON.parse(this.$route.query.data).isblcks,
      fromcity: "", //出发城市
      tocity: "", //到达城市
      datatime: "", //出发时间
      isblckt: false, //事前是否2次审批
      traitime: JSON.parse(this.$route.query.data).timedate,
      citylist: JSON.parse(this.$route.query.data).city,
      pickerOptions: {
        disabledDate: (time) => {
          return this.dealDisabledDate(time);
        },
      },
      typecon: [], //筛选条件 车类型
    };
  },
  components: {
    NoData,
    citysearchs,
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {},
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    var dateList = [];
    let startDate = new Date();
    let endDate = new Date();
    endDate.setDate(startDate.getDate() + 30);
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
    this.itemlist = dateList; //渲染日期
    let lis = JSON.parse(this.$route.query.data); //获取上个页面传入的参数
    this.roteslist = lis;
    this.butalist = lis.butalist; //出差旅客
    this.fromcity = lis.city[0].name; //出发城市
    this.tocity = lis.city[1].name; //到达城市
    this.datatime = lis.timedate;
    this.datenow();
    this.trainlistst();
  },
  methods: {
    inputFunc() {
      for (let k in this.typecon) {
        if (this.typecon[k].name == "traiNos") {
          this.typecon[k].value = this.traNoso;
        }
      }
      this.selclass();
    },
    async swlist(item) {
      //获取当前经停站
      this.showdats = !this.showdats;
      let dat = this.traitime.split("-");
      let tis = dat[0] + dat[1] + dat[2];
      try {
        const res = await this.$api.home.trainWs({
          trainNo: item.trainNo,
          trainDate: tis,
        });
        if (res.code == 200) {
          this.trklist = res.data.stations;
        }
      } catch (e) {
        console.log(e);
      }
    },
    deletclass(item) {
      //删除当前类型
      for (let k in item.list) {
        item.list[k].isture = false;
      }
      for (let p in this.typecon) {
        if (this.typecon[p].name == item.vs) {
          this.typecon[p].value = [];
        }
      }
      this.selclass();
    },
    selclass() {
      let a = this.trainlists; //当天全部数据
      let c = [];
      let fotct = [];
      let torct = [];
      let zws = [];
      let cts = [];
      let cfsd = []; //出发时段
      let ddsd = []; //到达时段
      let traNod = []; //车型号
      let traNosos = ""; //车次号
      let b = this.typecon; //条件
      for (var i = 0; i < this.typecon.length; i++) {
        if (this.typecon[i].name == "cts") {
          cts = this.typecon[i].value; //车类型
        } else if (this.typecon[i].name == "toct") {
          torct = this.typecon[i].value; //出发车站
        } else if (this.typecon[i].name == "fotct") {
          fotct = this.typecon[i].value; //到达类型
        } else if (this.typecon[i].name == "zw") {
          zws = this.typecon[i].value; //座位类型
        } else if (this.typecon[i].name == "cfsd") {
          cfsd = this.typecon[i].value; //出发时段
        } else if (this.typecon[i].name == "ddsd") {
          ddsd = this.typecon[i].value; //到达时段类型
        } else if (this.typecon[i].name == "traiNos") {
          traNosos = this.typecon[i].value; //车次型号
        }
      }
      if (
        cts.length == 0 &&
        fotct.length == 0 &&
        torct.length == 0 &&
        zws.length == 0 &&
        cfsd.length == 0 &&
        ddsd.length == 0 &&
        traNod.length == 0 &&
        traNosos.length == 0
      ) {
        this.trainlist = this.trainlists;
        return;
      }
      for (var i = 0; i < a.length; i++) {
        let si = true;
        if (cts.length > 0) {
          for (var k = 0; k < cts.length; k++) {
            if (cts[k].indexOf(a[i].trainClass) == -1) {
              si = false;
            } else {
              si = true;
              break;
            }
          }
        }
        if (fotct.length > 0) {
          if (fotct.indexOf(a[i].toStation) == -1) {
            si = false;
          }
        }
        if (torct.length > 0) {
          if (torct.indexOf(a[i].fromStation) == -1) {
            si = false;
          }
        }
        if (traNod.length > 0) {
          if (traNod.indexOf(a[i].trainNo) == -1) {
            si = false;
          }
        }
        if (zws.length > 0) {
          let numst = 0;
          for (let j in a[i].seats) {
            for (let k in zws) {
              if (zws[k] == a[i].seats[j].seatName) {
                numst++;
                break;
              }
            }
          }
          if (numst != zws.length) {
            si = false;
          }
        }
        if (cfsd.length > 0) {
          let fotime = parseInt(a[i].fromTime.substring(0, 2)); //出发时间
          let cfslo = [];
          for (let k in cfsd) {
            for (let j in cfsd[k]) {
              cfslo.push(cfsd[k][j]);
            }
          }
          if (cfslo.indexOf(fotime) == -1) {
            si = false;
          }
        }

        if (ddsd.length > 0) {
          let tstime = parseInt(a[i].toTime.substring(0, 2)); //出发时间
          let cfslo = [];
          for (let k in ddsd) {
            for (let j in ddsd[k]) {
              cfslo.push(ddsd[k][j]);
            }
          }
          if (cfslo.indexOf(tstime) == -1) {
            si = false;
          }
        }
        if (traNosos.length > 0) {
          if (a[i].trainNo.indexOf(traNosos.toUpperCase()) == -1) {
            si = false;
          }
        }

        if (si) {
          c.push(a[i]);
        }
      }
      this.trainlist = c;
    },
    classck(item, it) {
      if (item.isture == false) {
        item.isture = true;
        for (let k in this.typecon) {
          if (this.typecon[k].value == "") {
            this.typecon[k].value = [];
          }
          if (it.vs == "zw") {
            if (this.typecon[k].name == "zw") {
              this.typecon[k].value.push(item.name);
            }
          }
          if (it.vs == "toct") {
            if (this.typecon[k].name == "toct") {
              this.typecon[k].value.push(item.name);
            }
          }
          if (it.vs == "fotct") {
            if (this.typecon[k].name == "fotct") {
              this.typecon[k].value.push(item.name);
            }
          }
          if (it.vs == "cfsd") {
            if (this.typecon[k].name == "cfsd") {
              this.typecon[k].value.push(item.value);
            }
          }
          if (it.vs == "ddsd") {
            if (this.typecon[k].name == "ddsd") {
              this.typecon[k].value.push(item.value);
            }
          }
        }
        this.selclass();
      } else {
        item.isture = false;
        for (let k in this.typecon) {
          if (it.vs == "zw") {
            if ((this.typecon[k].name == "zw")) {
              for (let u = 0; u <= this.typecon[k].value.length; u++) {
                if (this.typecon[k].value[u] == item.name) {
                  this.typecon[k].value.splice(u, 1);
                }
              }
            }
          }
          if (it.vs == "toct") {
            if ((this.typecon[k].name == "toct")) {
              for (let u = 0; u <= this.typecon[k].value.length; u++) {
                if (this.typecon[k].value[u] == item.name) {
                  this.typecon[k].value.splice(u, 1);
                }
              }
            }
          }
          if (it.vs == "fotct") {
            if ((this.typecon[k].name == "fotct")) {
              for (let u = 0; u <= this.typecon[k].value.length; u++) {
                if (this.typecon[k].value[u] == item.name) {
                  this.typecon[k].value.splice(u, 1);
                }
              }
            }
          }
          if (it.vs == "cfsd") {
            if ((this.typecon[k].name == "cfsd")) {
              for (let u = 0; u <= this.typecon[k].value.length; u++) {
                if (this.typecon[k].value[u] == item.value) {
                  this.typecon[k].value.splice(u, 1);
                }

              }
            }
          }
          if (it.vs == "ddsd") {
            if ((this.typecon[k].name == "ddsd")) {
            
              for (let u = 0; u <= this.typecon[k].value.length; u++) {
                if (this.typecon[k].value[u] == item.value) {
                  this.typecon[k].value.splice(u, 1);
                }
              }
            }
          }
        }
        this.selclass();
      }
    },
    handleScroll() {
      //滚动条监听事件
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 85) {
        this.fitxd = true;
      } else {
        this.fitxd = false;
      }
    },
    cits_btn() {
      //违规继续预订
      if (this.ruliset == "" && this.idstarle == true) {
        this.$message({
          message: "请选择违规原因",
          type: "warning",
        });
        return;
      }
      if (this.idstarle) {
        for (let k in this.nativeTrainRules) {
          if (k == 3) {
            this.nativeTrainRules[k] = {
              usernames: this.nativeTrainRules[k],
              reasons: this.ruliset,
            };
          }
        }
      }
      this.othotrlis(); //跳转订单页面
    },
    othotrlis() {
      let data = {
        datas: {
          datatime: this.datatime, //时间
          times: this.timey(this.trainlis.runTimeSpan),
          queryKey: this.queryKey,
        },
        ranst: this.roteslist, //上个页面的参数
        nativeTrainRules: this.nativeTrainRules, //当前违规信息
        astlis: this.astlis, //当前座位信息
        trainlis: this.trainlis, //当前车信息
        isblckt: this.isblckt, //事前是否2次审批
        isarsrl: this.isarsrl, //因公是否需要审核
        examineSwitch:this.roteslist.examineSwitch
      };
      this.$router.push({
        path: "/trainadd",
        query: {
          data: JSON.stringify(data),
        },
      });
    },
    opckecd(item, items , indexs) {
      //点击当前座位进行违规判断或者进行预订
      if(items.seatName == '无座'){
        if(('GDC'.indexOf(item.trainClass) == -1)){
          items.seatType = '1'
        }else{
          items.seatType = 'O'
        }
      }
      this.isblckt = false;
      this.astlis = items; //当前座位信息
      this.trainlis = item; //当前火车信息
      if (this.roteslist.isbtd == 2) {
        //因私
        this.othotrlis(); //跳转订单页面
      } else if (this.roteslist.isbtd == 1) {
        //因公
        let ast = [];
        let arr = [];
        if (this.roteslist.isblcks == 4) {
          //改签
          arr = this.roteslist.userlistnos;
          for (let i = 0; i < arr.length; i++) {
            ast.push({
              passengerNo: arr[i],
            });
          }
        } else {
          let sarr = this.butalist;

          for (let i = 0; i < sarr.length; i++) {
            arr.push(sarr[i].passengerNo);
            ast.push({
              passengerNo: sarr[i].passengerNo,
            });
          }
        }
        this.loading = true;
        this.$api.home
          .judgeApprv({
            passengerNos: arr,
          })
          .then((res) => {
            this.loading = false;
            if (res.code == 200) {
              //判断是否需要审核 true为不需要审核
              this.isarsrl = res.data == true ? true : false;
              let dat = {
                seatLimit: items.seatName,
                passengerList: ast,
              };
              this.loading = true;
              this.$api.home
                .checkTrainRule(dat)
                .then((res) => {
                  this.loading = false;
                  if (res.code == 200) {
                    //1=只记录不提示，2=提示违规不必选择原因，3=提示违规必选原因，4=不可预定
                    if (res.data.nativeTrainRules != undefined) {
                      this.nativeTrainRules = res.data.nativeTrainRules;
                    }
                    this.rulesReasons = res.data.rulesReason; //原因
                    if (JSON.stringify(this.nativeTrainRules) == "{}") {
                      //没有违反政策直接跳到预定页面
                      this.othotrlis(); //跳转订单页面
                    } else {
                      this.nativeTrainl = [];
                      for (let i in this.nativeTrainRules) {
                        if (i == 4) {
                          this.notbooking = true;
                        }
                        if (i == 3) {
                          this.idstarle = true;
                        }
                        if (i != 1 && i != 5) {
                          this.nativeTrainl.push({
                            name: i,
                            list: this.nativeTrainRules[i],
                          });
                        }
                        if (i == 5) {
                          this.isblckt = true;
                          // this.roteslist["metarule"] = this.roteslist.examineSwitch == 1 ? 3 :  0 
                          this.nativeTrainl.push({
                            name: i,
                            list: this.nativeTrainRules[i],
                          });
                        }
                      }
                      if (this.nativeTrainl.length > 0) {
                        this.staleve = true;
                      } else {
                        this.othotrlis(); //跳转订单页面
                      }
                    }
                  } else {
                    this.$message({
                      message: res.message,
                      type: "warning",
                    });
                  }
                })
                .catch((e) => {
                  console.log(e);
                  this.loading = false;
                });
            } else {
              this.$message({
                message: res.message,
                type: "warning",
              });
            }
          })
          .catch((e) => {
            console.log(e);
            this.loading = false;
          });
      }
    },
    higrailclic(it) {
      if (it) {
        this.higrail = false;
      } else {
        this.higrail = true;
      }
      let its = 0;
      for (let k in this.typecon) {
        if (
          this.typecon[k].name == "cts" &&
          this.typecon[k].value.length == 0
        ) {
          this.typecon[k].value = ["GDC"];
        } else if (
          this.typecon[k].name == "cts" &&
          this.typecon[k].value.length != 0
        ) {
          this.typecon[k].value = [];
          its = 1;
        }
      }
      if (its == 0) {
        this.typecon.push({
          name: "cts",
          value: ["GDC"],
        });
      }
      this.selclass();
    },
    leftmove() {
      //左
      if (this.iscks == 1) {
        return;
      }
      if (this.itmesp > 0) {
        this.itmesp -= 1;
      }
      this.$refs.luns.style.transform =
        "translate(" + -1112 * this.itmesp + "px,0)";
    },
    rightmove() {
      //右
      if (this.iscks == 1) {
        return;
      }
      if (this.itmesp < 5) {
        this.itmesp += 1;
      }
      this.$refs.luns.style.transform =
        "translate(" + -1112 * this.itmesp + "px,0)";
    },
    seachlist() {
      //搜索
      this.trainlistst();
    },
    datachencks(it) {
      //点击时间
      if (this.iscks == 1) {
        return;
      }
      this.traitime = it;
      this.datatime = it;
      this.seachlist();
    },
    tiemdat() {
      //时间选择
      this.datatime = this.traitime;
      this.datenow();
      this.seachlist();
    },
    datenow() {
      //移动到当前选择的日期
      let EndTime = new Date(this.datatime);
      let NowTime = new Date();
      let t = EndTime.getTime() - NowTime.getTime();
      let d = Math.floor(t / 1000 / 60 / 60 / 24);
      let integerNumber = parseInt((d + 2) / 8);
      if ((d + 2) / 8 > integerNumber) {
        integerNumber += 1;
      }
      this.itmesp = integerNumber - 1;
      this.$refs.luns.style.transform =
        "translate(" + -1112 * this.itmesp + "px,0)";
    },
    listchangs(e) {
      //城市选择
      this.fromcity = e[0].name;
      this.tocity = e[1].name;
      this.seachlist();
    },
    timey(time) {
      //时分
      let dat = parseInt(time / 60);
      let sti = "";
      if (time > dat * 60) {
        sti = time - dat * 60;
        return dat + "时" + sti + "分";
      } else {
        return dat + "时";
      }
    },
    trainlistst() {
      this.trainlist = [];
      let obj = {
        from: this.fromcity,
        to: this.tocity,
        isChange: 0, //改签传1
        date: this.datatime,
      };
      this.loading = true;
      for (let k in this.classification) {
        for (let j in this.classification[k].list) {
          this.classification[k].list[j].isture = false;
        }
      }
      this.$api.home
        .searchTrains(obj)
        .then((res) => {
          if (res.code == 200) {
            this.loading = false;
            if (res.data.trains.length == 0) {
              this.$message({
                message: "暂无车辆信息",
                type: "warning",
              });
              return;
            }
            this.queryKey = res.data.queryKey;
            this.trainlist = res.data.trains; //火车信息
            this.classification = JSON.parse(
              JSON.stringify(this.classifications)
            ); //初始化
            let trs = res.data.froms;
            this.trts = [];
            this.trto = [];
            for (let i = 0; i < trs.length; i++) {
              //出发站
              this.trts.push({
                name: trs[i].station,
                isture: false,
                value: trs[i].station,
              });
            }

            let trts = res.data.tos;
            for (let i = 0; i < trts.length; i++) {
              //到达站
              this.trto.push({
                name: trts[i].station,
                isture: false,
                value: trts[i].station,
              });
            }
            this.classification.push({
              name: "出发车站",
              vs: "toct",
              list: this.trts,
            });
            this.classification.push({
              name: "到达车站",
              vs: "fotct",
              list: this.trto,
            });
            let trastr = "";
            let zwstr = "";
            let zwlist = []; //座位等级
            let reg = new RegExp(":");
            for (let i = 0; i < this.trainlist.length; i++) {
              //判断是否有座位

              let st = [];
              if (this.trainlist[i].tickets.noseat != null) {
                //无座
                if (zwstr.indexOf("noseat") == -1) {
                  //判断是否存在
                  zwlist.push({
                    value: "noseat",
                    name: "无座",
                    isture: false,
                  });
                  zwstr = zwstr + ",noseat";
                }
                st.push(this.trainlist[i].tickets.noseat);
              }
              if (this.trainlist[i].tickets.hardseat != null) {
                //硬座
                if (zwstr.indexOf("hardseat") == -1) {
                  //判断是否存在
                  zwlist.push({
                    value: "hardseat",
                    name: this.trainlist[i].tickets.hardseat.seatName,
                    isture: false,
                  });
                  zwstr = zwstr + ",hardseat";
                }
                st.push(this.trainlist[i].tickets.hardseat);
              }
              if (this.trainlist[i].tickets.hardsleepermid != null) {
                //硬卧中铺
                if (zwstr.indexOf("hardsleepermid") == -1) {
                  //判断是否存在
                  zwlist.push({
                    value: "hardsleepermid",
                    name: this.trainlist[i].tickets.hardsleepermid.seatName,
                    isture: false,
                  });
                  zwstr = zwstr + ",hardsleepermid";
                }
                st.push(this.trainlist[i].tickets.hardsleepermid);
              }
              if (this.trainlist[i].tickets.softsleeperdown != null) {
                if (zwstr.indexOf("softsleeperdown") == -1) {
                  //判断是否存在
                  zwlist.push({
                    value: "softsleeperdown",
                    name: this.trainlist[i].tickets.softsleeperdown.seatName,
                    isture: false,
                  });
                  zwstr = zwstr + ",softsleeperdown";
                }
                st.push(this.trainlist[i].tickets.softsleeperdown);
              }
              if (this.trainlist[i].tickets.softseat != null) {
                //软座
                if (zwstr.indexOf("softseat") == -1) {
                  //判断是否存在
                  zwlist.push({
                    value: "softseat",
                    name: this.trainlist[i].tickets.softseat.seatName,
                    isture: false,
                  });
                  zwstr = zwstr + ",softseat";
                }
                st.push(this.trainlist[i].tickets.softseat);
              } else if (this.trainlist[i].tickets.secondseat != null) {
                //二等坐
                if (zwstr.indexOf("secondseat") == -1) {
                  //判断是否存在
                  zwlist.push({
                    value: "secondseat",
                    name: this.trainlist[i].tickets.secondseat.seatName,
                    isture: false,
                  });
                  zwstr = zwstr + ",secondseat";
                }
                st.push(this.trainlist[i].tickets.secondseat);
              }

              if (this.trainlist[i].tickets.firstseat != null) {
                //一等坐
                if (zwstr.indexOf("firstseat") == -1) {
                  //判断是否存在
                  zwlist.push({
                    value: "firstseat",
                    name: this.trainlist[i].tickets.firstseat.seatName,
                    isture: false,
                  });
                  zwstr = zwstr + ",firstseat";
                }
                st.push(this.trainlist[i].tickets.firstseat);
              }

              if (this.trainlist[i].tickets.hardsleeperup != null) {
                //硬卧上铺
                if (zwstr.indexOf("hardsleeperup") == -1) {
                  //判断是否存在
                  zwlist.push({
                    value: "hardsleeperup",
                    name: this.trainlist[i].tickets.hardsleeperup.seatName,
                    isture: false,
                  });
                  zwstr = zwstr + ",hardsleeperup";
                }
                st.push(this.trainlist[i].tickets.hardsleeperup);
              }
              if (this.trainlist[i].tickets.hardsleeperdown != null) {
                //硬卧下铺
                if (zwstr.indexOf("hardsleeperdown") == -1) {
                  //判断是否存在
                  zwlist.push({
                    value: "hardsleeperdown",
                    name: this.trainlist[i].tickets.hardsleeperdown.seatName,
                    isture: false,
                  });
                  zwstr = zwstr + ",hardsleeperdown";
                }
                st.push(this.trainlist[i].tickets.hardsleeperdown);
              }
              if (this.trainlist[i].tickets.softsleeperup != null) {
                //软卧上铺
                if (zwstr.indexOf("softsleeperup") == -1) {
                  //判断是否存在
                  zwlist.push({
                    value: "softsleeperup",
                    name: this.trainlist[i].tickets.softsleeperup.seatName,
                    isture: false,
                  });
                  zwstr = zwstr + ",softsleeperup";
                }
                st.push(this.trainlist[i].tickets.softsleeperup);
              }
              if (this.trainlist[i].tickets.businessseat != null) {
                //商务坐
                if (zwstr.indexOf("businessseat") == -1) {
                  //判断是否存在
                  zwlist.push({
                    value: "businessseat",
                    name: this.trainlist[i].tickets.businessseat.seatName,
                    isture: false,
                  });
                  zwstr = zwstr + ",businessseat";
                }
                st.push(this.trainlist[i].tickets.businessseat);
              }
              this.trainlist[i]["dats"] = this.datatime; //当前日期
              this.trainlist[i]["seats"] = st;
              this.trainlist[i]["fotime"] = this.trainlist[i].fromTime.replace(
                reg,
                ""
              ); //开始时间数字
              this.trainlist[i]["totime"] = this.trainlist[i].toTime.replace(
                reg,
                ""
              ); //到达时间数字
              let tiems = this.trainlist[i].fromTime.split(":");
              let stime =
                parseInt(tiems[0]) * 60 +
                parseInt(tiems[1]) +
                parseInt(this.trainlist[i].runTimeSpan); //总分钟数
              let a = parseInt(stime / (24 * 60));
              this.trainlist[i]["days"] = a; //总天数
              let totiem = new Date(
                (new Date(this.datatime.replace(/-/g, "-")).getTime() / 1000 +
                  a * 24 * 60 * 60) *
                  1000
              );
              let years = totiem.getFullYear(); //当前年
              let months = this.tim(totiem.getMonth() + 1); //当前月份
              let days = this.tim(totiem.getDate()); //当天
              this.trainlist[i]["toTrainDate"] =
                years + "-" + months + "-" + days; //到达日期
            }
            this.classification.unshift({
              name: "坐　　席",
              vs: "zw",
              list: zwlist,
            });
            this.trainlists = JSON.parse(JSON.stringify(this.trainlist));

            this.typecon = [
              {
                name: "zw",
                value: [],
              },
              {
                name: "cfsd",
                value: [],
              },
              {
                name: "ddsd",
                value: [],
              },
              {
                name: "toct",
                value: [],
              },
              {
                name: "fotct",
                value: [],
              },
              {
                name: "traiNos",
                value: "",
              },
            ];
            if (this.iscalo == "GDC") {
              this.typecon.push({
                name: "cts",
                value: ["GDC"],
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
        .catch((e) => {
          this.loading = false;
          console.log("获取数据失败", e);
        });
    },
    tim(time) {
      //补0
      if (time < 10) {
        return "0" + time;
      } else {
        return time;
      }
    },
    dealDisabledDate(time) {
      //禁掉小于当前日期
      var times = Date.now();
      if (time.getTime() < times - 8.64e7 || time.getTime() > this.enddats) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.trainlist {
  width: 100%;

  & > .center {
    width: 1180px;
    position: relative;
    margin: 0 auto;
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
      padding: 10px 0;

      .stis {
        width: 100%;
        background: #ffffff;
        display: flex;
        align-items: center;

        .sercits {
          flex: 1;

          .citysleft {
            border-radius: 3px;
            width: 100%;
            height: 40px;
          }
        }

        .timeits {
          width: 265px;
          height: 65px;
          display: flex;
          align-items: center;
          padding: 0 15px;
          font-size: 14px;

          .sies {
            color: #b4bccc;
            width: 30%;
          }

          .timeist {
            width: 80%;
          }
        }

        .timeitsw {
          width: 146px;
          cursor: pointer;
          height: 65px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3b4f62;
          font-size: 14px;
          margin-right: 10px;
        }

        .btselect {
          .mixin_bottonTrue(@width: 162px, @height: 40px, @bg: #FF9A35, @cl: #FF9A35, @pd: 0, @fz: 14px);
        }
      }
    }
  }

  .listfiexd {
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
  }

  .lunsdata {
    width: 1180px;
    height: 76px;
    margin: 0 auto;
    display: flex;

    .color {
      color: #cccccc;
    }

    .lun_left {
      width: 40px;
      height: 76px;
      background: #ffffff;
      text-align: center;
      line-height: 76px;
      cursor: pointer;

      &:hover {
        & > span {
          color: #3c85fd;
        }
      }
    }

    .lun_right {
      width: 40px;
      height: 76px;
      background: #ffffff;
      text-align: center;
      line-height: 76px;
      cursor: pointer;

      &:hover {
        & > span {
          color: #3c85fd;
        }
      }
    }

    .luns {
      border-left: 1px solid #f0f0f0;
      border-right: 1px solid #f0f0f0;
      width: 1120px;
      overflow: hidden;
      background: #ffffff;

      .lun_list {
        height: 76px;
        display: flex;
        transition: transform 0.35s;

        .l_list {
          width: 139px;
          height: 76x;
          cursor: pointer;
          color: #0b4f62;
          font-size: 15px;
          display: flex;
          justify-content: center;
          line-height: 76px;
          border-top: 3px solid #ffffff;
        }

        .datacheck {
          width: 139px;
          height: 76px;
          color: #007aff;
          line-height: 76px;
          background-color: #eef4ff;
          border-top: 3px solid #3c85fd;
        }

        .l_list:hover {
          color: #007aff;
        }
      }
    }
  }

  .filters {
    width: 1140px;
    padding: 10px 20px;
    background-color: #ffffff;
    margin: 10px auto;

    .filtlist {
      width: 100%;
      display: flex;
      // align-items: center;
      font-size: 14px;
      margin: 10px 0;
      line-height: 30px;

      .fil-lefts {
        width: 140px;
        display: flex;
      }

      .fitlabelBox {
        width: calc(100% - 140px);
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        .fitlabel {
          display: flex;
          cursor: pointer;
          align-items: center;
          color: #666666;
          width: 101px;
        }
      }
    }
    .filtlists {
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 14px;
      margin: 10px 0;
      line-height: 30px;
      .fil-lefts {
        // width: 140px;
        display: flex;
        align-items: center;
        .fil_nos {
          width: 170px;
          padding: 0 5px;
          height: 30px;
          border: 1px solid #cccccc;
          border-radius: 4px;
          input {
            width: 150px;
            height: 28px;
            border: 0;
          }
        }
      }
    }
  }

  .lunsfiexd {
    margin-top: 130px;
  }

  .trainuname {
    width: 1180px;
    background-color: #fafcff;
    font-size: 12px;
    color: #666666;
    margin: 0 auto;
    line-height: 40px;
    display: flex;
    border: 1px solid #f0f0f0;
  }

  .section {
    width: 1180px;
    min-height: 450px;
    margin: 0 auto;
    background: #f9fafd;

    .selist {
      width: 100%;
      background: #ffffff;
      border: 1px solid #f0f0f0;

      & > div {
        padding: 30px 0;

        .trainsc {
          width: 96%;
          padding: 0 2%;
          display: flex;

          .trainsc_l {
            width: 15%;

            .trasp {
              color: #3b4f62;
              font-weight: Bold;
              font-size: 16px;
              font-family: MicrosoftYaHei-Bold;
            }

            .trasps {
              color: #999999;
              font-size: 14px;
              cursor: pointer;
              display: flex;

              .tr-p {
                border-bottom: 1px dashed #999999;
              }
            }
          }

          .trainsc_s {
            width: 45%;
            padding: 0 10%;
            display: flex;

            .trainsc_s_l {
              width: 20%;
              text-align: center;

              .trainsc_s_l_t {
                font-family: MicrosoftYaHei-Bold;
                color: #333;
                line-height: 35px;
                font-size: 20px;
                font-weight: bold;
              }

              .trainsc_s_l_b {
                display: flex;
                font-size: 12px;
                justify-content: center;

                .trainsc_s_l_b_l {
                  width: 16px;
                  height: 16px;
                  text-align: center;
                  line-height: 16px;
                  border-radius: 2px;
                  margin: 0 6px 0 4px;
                }

                .trainsc_s_l_b_r {
                  color: #999999;
                  font-family: MicrosoftYaHei;
                  font-size: 14px;
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

            .trainsc_s_s {
              width: 50%;
              margin-bottom: auto;
              color: #d2dde7;
              display: flex;
              justify-content: center;
              letter-spacing: 0.16px;
              padding: 0 10px 10px;
              background: url("../../../../static/image/home/arrow.png") bottom
                no-repeat;
              background-size: 146px 10px;

              & > div {
                color: #666;
              }
            }
          }

          .trainsc_r {
            width: 40%;

            .seatlist {
              width: 100%;
              display: flex;
              text-align: center;
              line-height: 24px;
              align-items: center;

              .seatname {
                width: 20%;
                font-size: 14px;
                color: #333;
              }

              .seatprice {
                width: 20%;
                font-size: 16px;
                color: #ff6600;
              }

              .seats {
                width: 40%;
                font-size: 14px;
                color: #3b4f62;

                .color {
                  color: #ff9a33;
                }
              }

              .seatst {
                width: 20%;
                height: 24px;
                cursor: pointer;
                font-size: 14px;
                color: #ffffff;
                background: #3c85fd;
                border-radius: 4px;
                margin: 3px 0;
              }

              .q_color {
                background: #ff9a33;
              }

              .s_color {
                background: #c7cdda;
              }

              .seatst:hover {
                opacity: 0.8;
              }

              .seatstb {
                width: 20%;
                height: 24px;
                font-size: 14px;
                color: #ffffff;
                background: #ff9a33;
                border-radius: 3px;
                margin: 3px 0;
              }
            }
          }
        }
      }

      & > div:hover {
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
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;

    .stalist {
      width: 100%;
      border-radius: 18px;
      min-height: 300px;
      font-size: 16px;
      line-height: 90px;
      background: #f1f1f1;
      position: relative;
      .statop {
        padding: 20px;

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
          line-height: 50px;
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

                .styli_left {
                  width: 25%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-end;
                }

                .styli_right {
                  width: 75%;
                  margin-left: 5%;
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
        position: absolute;
        bottom: 0;
        left: 0;
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
}
</style>
