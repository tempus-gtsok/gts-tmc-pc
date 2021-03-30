<template>
  <div class="home_box">
    <div class="homt_img">
      <div class="home_dv">
        <div class="home_tst" v-loading="loading2">
          <div class="home_tars">
            <div class="hom_topslit">
              <div v-for="(item,index) in datlist" class="hom_list"
                   :class="activeIndex == item.id?'hom_listok':''" @click="handleSelect(item.id)"
                   :key="index">
                <img :src="item.img" v-if="activeIndex != item.id" alt="">
                <img :src="item.ims" v-if="activeIndex == item.id" alt="">
                <p>{{ item.name }}</p>
              </div>
            </div>
            <div class="homts_btns" :class="activeIndex != 1 ? 'homts_btnsd':''">
              <div class="homt_vls" :class="appartasklist.length > 0 ? '' : 'homt_vlst'">
                <el-checkbox-group v-model="isbeforehand" @change="chans">
                  <el-checkbox :disabled="appartasklist.length == 0" :key="isbeforehands.id"
                               :label="isbeforehands.id">
                    <span style="font-size: 16px;">{{ isbeforehands.name }}</span>
                  </el-checkbox>
                </el-checkbox-group>
                <div class="appartasklist" @click="popvidshowis" v-if="appartasklist.length > 0">{{
                    stlistlist.length
                  }}个可用
                </div>
                <div class="fiexds" v-if="popvidshow" @click="popvidshow = false"></div>
                <div class="vlislit" v-if="popvidshow">
                  <div class="popContainer"></div>
                  <div class="talist" v-for="(item, index) in stlistlist" :key="index" @click="adduslit(item)">
                    <div class="tl_left">
                      <div class="tl_tops">
                        <div class="tl_rightl">{{ newicname(item.citys.vehicle) }}</div>
                        <div class="tl_rights">{{ newstaname(item.citys) }}</div>
                      </div>
                      <div class="tl_bots">{{ newdata(item.citys) }}</div>
                      <div class="tl_botsb">出差事由：{{ item.reson }}</div>
                    </div>
                    <div class="tl_right">
                      <div class="tldv">确定</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="shipping_space" style="margin-left: 15px;">
                <div class="shipping_choex" v-if="extendOne == 1 && iskok == 1">
                  <el-checkbox v-model="checked" label="公务机票" border></el-checkbox>
                </div>
              </div>
              <div v-if="iskok == 1" class="srltop">
                <!-- 飞机 -->
                <div class="sercits">
                  <div class="citysleft">
                    <citysearch @changers="listchang" :ctiys="citylist"
                                :issera="isbeforehand.length > 0"></citysearch>
                  </div>
                </div>
                <div class="sertys">
                  <div class="inputsbox">
                    <div class="block">
                      <el-date-picker
                          value-format="yyyy-MM-dd"
                          style="width: 100%;"
                          :disabled="isbeforehand.length > 0"
                          v-model="values"
                          class="inputst"
                          type="date"
                          placeholder="去程日期"
                          :editable="false"
                          :clearable="false"
                          :picker-options="pickerOptions"
                      ></el-date-picker>
                    </div>
                    <div class="thans">
                      <div></div>
                    </div>
                    <div class="block">
                      <el-date-picker
                          value-format="yyyy-MM-dd"
                          style="width: 100%;"
                          :disabled="isbeforehand.length > 0"
                          v-model="valuer"
                          type="date"
                          class="inputst"
                          placeholder="返程日期"
                          :editable="false"
                          :clearable="true"
                          :picker-options="pickerOptions"
                      ></el-date-picker>
                    </div>
                  </div>
                  <div class="dipgright">
                    <div class="blockops">
                      <el-select class="selck" v-model="optionstrain" placeholder="请选择"
                                 :disabled="isbeforehand.length > 0">
                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                                   :value="item.value"></el-option>
                      </el-select>
                    </div>
                    <el-button type="primary" @click="selects" v-if="rotes('tms:dps:query')"
                               style="width: 48%;margin-left: 10px;">搜索
                    </el-button>
                  </div>
                </div>

              </div>
              <div v-if="iskok == 2" class="srltop">
                <!-- 火车 -->
                <div class="sercits">
                  <div class="citysleft">
                    <citysearchs @changers="listchangs" :ctiys="citylist"
                                 :issera="isbeforehand.length > 0"></citysearchs>
                  </div>
                </div>
                <div class="sertys">
                  <div class="inputsbox">
                    <div class="block">
                      <el-date-picker
                          value-format="yyyy-MM-dd"
                          style="width: 100%;"
                          class="inputst"
                          :disabled="isbeforehand.length > 0"
                          v-model="traitime"
                          type="date"
                          placeholder="出发日期"
                          :editable="false"
                          :clearable="false"
                          :picker-options="pickerOptions"
                      ></el-date-picker>
                    </div>
                  </div>
                  <div class="dipgright">
                    <div class="blockops">
                      <el-select class="selck" v-model="optionstrain" placeholder="请选择"
                                 :disabled="isbeforehand.length > 0">
                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                                   :value="item.value"></el-option>
                      </el-select>
                    </div>
                    <el-button type="primary" style="width: 48%;margin-left: 10px;" v-if="rotes('tms:tra:query')"
                               @click="selects">搜索
                    </el-button>
                  </div>

                </div>
              </div>
              <div v-if="iskok == 3" class="srltop">
                <div class="sercits">
                  <div class="cityslefts">
                    <citysearchh @changers="listchangh" :ctiys="citylist"
                                 :issera="isbeforehand.length > 0"></citysearchh>
                  </div>
                  <div class="cityslefts"
                       style="margin-left: 10px;border: 1px solid #edf0f5;padding: 0 14px;border-radius: 4px;">
                    <div class="citycom citycom-JD">
                      <div class="citcom_left">
                        <el-input
                            :disabled="hot_cyvals != '' && isbeforehand.length > 0"
                            v-model="hot_cyval"
                            @input="inpu"
                            @focus="foinput"
                            @blur="bluscity"
                            style="border: 0;"
                            class="inputs"
                            size="medium"
                            placeholder="酒店名/位置"
                        ></el-input>
                      </div>
                    </div>
                    <div class="hotvals" @mouseover="isctyslts = true"
                         @mouseleave="isctyslts = false" v-if="hotcityname" v-loading="loading">
                      <div class="section" v-for="(item, index) in stlist" :key="index"
                           v-if="stlist.length > 0 && hot_cyval == ''">
                        <div class="city-title">{{ item.name }}</div>
                        <div class="city-list">
                          <div class="city-item" v-for="(city, i) in item.list" :key="i"
                               @click="onSelect(city)">{{ city }}
                          </div>
                        </div>
                      </div>
                      <div
                          class="hotsearchs"
                          v-for="(items, index) in hotsearch"
                          @click="onSelect(items.name)"
                          :key="index"
                          v-if="hot_cyval != '' && hotsearch.length > 0"
                      >
                        <div v-html="items.label"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="sertys">
                  <div class="inputsbox">
                    <div class="blocks">
                      <el-date-picker
                          value-format="yyyy-MM-dd"
                          v-model="hoteltime"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="入店日期"
                          :disabled="isbeforehand.length > 0"
                          end-placeholder="离店日期"
                          class="inputime"
                          :editable="false"
                          :clearable="false"
                          :picker-options="pickerOptions"
                      ></el-date-picker>
                    </div>
                  </div>
                  <div class="dipgright">
                    <div class="blockops">
                      <el-select class="selck" v-model="optionstrain" placeholder="请选择"
                                 :disabled="isbeforehand.length > 0">
                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                                   :value="item.value"></el-option>
                      </el-select>
                    </div>
                    <el-button type="primary" @click="selects" v-if="rotes('tms:hotel:list')"
                               style="width: 48%;margin-left: 10px;">搜索
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="personnel">
            <div class="persotop" @click="addrow" v-if="optionstrain == 1">
              <div class="iconfont">&#xe603;</div>
              <div style="margin-left: 10px; width: 200px;"><p>添加旅客</p></div>
            </div>
            <div class="perlists">
              <div class="nopassage" v-if="passengers.length == 0">
                <img src="../../../static/image/home/nopassage.png" alt="">
              </div>
              <div class="passlist" v-if="passengers.length > 0">
                <div class="passdv" v-for="(item, index) in passengers" :key="index">
                  {{ item.userName }}
                  <div class="iconfont passclose" @click="passclose(index)">&#xe620;</div>
                </div>
              </div>
            </div>
            <el-drawer class="drawerd" size="28%" :with-header="false" :visible.sync="drawer"
                       direction="rtl">
              <div class="drawertp">请选择出行旅客</div>
              <div class="drivpass">
                <passage @passlist="passuser" :iskok="iskok == 2 ? 2 : 0 "></passage>
              </div>
            </el-drawer>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {
  mapState
} from 'vuex';
import passage from '@/components/common/passenger.vue';
import citysearch from '@/components/common/citycomponents.vue';
import citysearchs from '@/components/common/citycomponents_t.vue';
import citysearchh from '@/components/common/citycomponents_h.vue';

export default {
  data() {
    return {
      datlist: [{
        id: 1,
        name: '机票',
        img: "../../../static/image/home/fat.png",
        ims: "../../../static/image/home/fatis.png"
      }, {
        id: 2,
        name: '火车',
        img: "../../../static/image/home/car.png",
        ims: "../../../static/image/home/caris.png"
      }, {
        id: 3,
        name: '酒店',
        img: "../../../static/image/home/hotel.png",
        ims: "../../../static/image/home/hotelis.png"
      }],
      stlistlist: [], //出差单
      popvidshow: false,
      appartasklist: [], //出差单
      issbeforehand: '',
      isbeforehand: [], //是否使用出差预定
      isbeforehands: {
        id: 1,
        name: '使用出差预定'
      },
      tccrBeforeMiddle: 9,
      isctyslts: false,
      checked: true,
      extendOne: '', //政府采购
      hotsearch: [], //酒店关键词搜索
      hotcityname: false,
      hot_cyval: '', //酒店关键词
      stlist: [], //酒店关键词 商圈
      hotcltys: [], //酒店选择城市
      citylist: [],
      cityslist: [], //火车城市
      cityslists: [], //飞机城市
      frequentravellers: [], //常用旅客
      drawer: false,
      passengers: [], //出行人员
      optionstrain: '1', //因公因私
      isblcks: 2, //是否出差预定
      activeIndex: '1',
      bt_sbol: true,
      options: [
        {
          value: '1',
          label: '因公'
        },
        {
          value: '2',
          label: '因私'
        }
      ],
      iskok: 1,
      hot_cyvals: '',
      loading: false, //加载...
      traitime: '', //火车日期
      hoteltime: '', //酒店日期
      values: '', //飞机去程日期
      valuer: '', //飞机回程日期
      mokksli: {}, //事前订单参数
      pickerOptions: {
        disabledDate: time => {
          return this.dealDisabledDate(time);
        }
      },
      startDatePickerc: this.beginDatec(),
      endDatePickerc: this.processDatec(),
      fikdatec: '', //开始时间 创建
      enddatec: '', //结束时间
      loading2:false,
    };
  },
  components: {
    citysearch,
    citysearchs,
    citysearchh,
    passage
  },
  computed: {
    ...mapState(['go_there', 'goName']) //往返的值0是去，1是返回
  },
  watch: {
    optionstrain: {
      handler(newoptionstrain, oldoptionstrain) {
        if (newoptionstrain == 2) {
          this.passengers = [];
        }
      }
    }
  },
  mounted() {
    this.seeidlogin();//sessionId登录
  },
  methods: {
    async seeidlogin() {
      this.routs(this.iskok);
      this.bts_b();
      this.userinfos();
      const userinfo = JSON.parse(sessionStorage.getItem('userinfo')); //关于token的用法
      if (userinfo) {
        this.tccrBeforeMiddle = userinfo.tccrBeforeMiddle;
      }
    },
    async userinfos() {
      try {
        let res = await this.$api.mymessage.username();
        if (res.code == 200) {
          sessionStorage.setItem('userinfost', JSON.stringify(res.data));
        } else {
          this.$message({
            message: '获取个人信息失败',
            type: 'warning'
          });
        }
      } catch (e) {
        //TODO handle the exception
      }

    },
    passclose(index) {
      if (this.isbeforehand.length > 0) {
        this.$message({
          message: '事前不能修改出行人员！',
          type: 'warning'
        });
        return;
      }
      this.passengers.splice(index, 1);
    },
    bt_s() {
      if (this.bt_sbol) {
        this.bt_sbol = false;
      } else {
        this.bt_sbol = true;
      }
    },
    adduslit(item) {
      //选择当前出差单
      let vehicleIds = 0;
      if (this.iskok == 1) {
        if (item.citys.deptDates) {
          this.valuer = item.citys.deptDates.substring(0, 10); //出行开始时间
          vehicleIds = item.ids;
        } else {
          this.valuer = "";
        }
        this.values = item.citys.deptDate.substring(0, 10); //出行开始时间
        this.citylist = [{
          id: item.citys.deptCityCode,
          name: item.citys.deptCityName
        }, {
          id: item.citys.arrivCityCode,
          name: item.citys.arrivCityName
        }];
      } else if (this.iskok == 2) {
        this.traitime = item.citys.deptDate.substring(0, 10); //出行开始时间
        this.citylist = [{
          id: item.citys.deptCityCode,
          name: item.citys.deptCityName
        }, {
          id: item.citys.arrivCityCode,
          name: item.citys.arrivCityName
        }];
      } else if (this.iskok == 3) {
        this.hoteltime = [item.citys.inDate.substring(0, 10), item.citys.outDate.substring(0, 10)];
        this.citylist = [{
          id: item.citys.cityCode,
          name: item.citys.cityName
        }];
        this.hot_cyval = item.citys.remark;
        this.hot_cyvals = item.citys.remark;
      }
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
      this.passengers = userlis;
      this.mokksli = item.sit;
    },
    chans() {
      if (this.isbeforehand.length != 0) {
        this.popvidshow = true;
      }
    },
    popvidshowis() {
      this.popvidshow = true;
    },
    selects() {
      if (this.hoteltime.length == 0 && this.iskok == 3) {
        this.$message({
          message: '请选择入住日期',
          type: 'warning'
        });
        return;
      }
      if (this.hoteltime != null && this.iskok == 3) {
        if (this.hoteltime[0].substring(0, 4) == this.hoteltime[1].substring(0, 4)) {
          if (this.hoteltime[0].substring(5, 7) == this.hoteltime[1].substring(5, 7)) {
            if (this.hoteltime[0].substring(8, 10) == this.hoteltime[1].substring(8, 10)) {
              return this.$message.warning('入住日期必须早于离店日期！');
            }
          }
        }
      }
      let that = this;
      this.$store.commit('goName_add', 0);
      let isbtd = that.optionstrain; //因公还是因私 1为因公
      let isblcks = that.isblcks; //是否出差预定 1为是
      if (this.isbeforehand.length > 0) {
        isblcks = 1;
      } else {
        isblcks = 2;
      }
      let le = that.cityslist; //城市
      let les = that.cityslists; //飞机城市
      let hotcity = that.hotcltys[0]; //酒店城市
      let hot_cyval = that.hot_cyval; //酒店关键字
      let hoteltime = that.hoteltime; //酒店入住时间
      let firdata = that.traitime; //出发日期
      let values = that.values; //飞机往日期
      let valuer = that.valuer; //飞机返日期
      let passengers = that.passengers; //出行人
      let st = this.tccrBeforeMiddle; //用户是事前还是事中
      let xin = '1';


      if (st == 1 && isblcks == 2 && isbtd == 1) {
        that.$message({
          message: '请使用出差预定',
          type: 'warning'
        });
        return;
      }
      if (passengers.length == 0 && (isbtd == 1)) {
        that.$message({
          message: '请选择出行人',
          type: 'warning'
        });
        return;
      }
      if (that.iskok == 1) {
        //飞机
        if (les.length == 0) {
          that.$message({
            message: '请选择出发城市',
            type: 'warning'
          });
          return;
        } else if (les[1].name == '') {
          that.$message({
            message: '请选择到达城市',
            type: 'warning'
          });
          return;
        } else if (les[0].name == les[1].name) {
          that.$message({
            message: '出发城市和到达城市不能相同',
            type: 'warning'
          });
          return;
        }
        if (values == '') {
          that.$message({
            message: '请选择去程日期',
            type: 'warning'
          });
          return;
        } else if (valuer != '' && valuer != null && values > valuer) {
          that.$message({
            message: '返程日期不能小于去程日期',
            type: 'warning'
          });
          return;
        }
       //去程
        let data = {};
        if (this.extendOne == 1 && this.checked == true) {
          data = {
            city: les, //城市
            timedate: values, //去的时间
            timedates: valuer == null ? "" : valuer, //回的时间
            butalist: passengers, //出行人
            isblcks: isblcks, //1事前2事中
            mokksli: this.mokksli,
            isbtd: isbtd, //1因公2因私
            civilServiceTicket: '1',//是否选中
            xin: '1'
          };
        } else if (this.extendOne == 1 && this.checked == false) {
          data = {
            city: les, //城市
            timedate: values, //去的时间
            mokksli: this.mokksli,
            timedates: valuer == null ? "" : valuer, //回的时间
            butalist: passengers, //出行人
            isblcks: isblcks, //1事前2事中
            isbtd: isbtd, //1因公2因私
            civilServiceTicket: '0',//是否选中
            xin: '1'
          };
        } else if (this.extendOne == 0) {
          data = {
            city: les, //城市
            mokksli: this.mokksli,
            timedate: values, //去的时间
            timedates: valuer == null ? "" : valuer, //回的时间
            butalist: passengers, //出行人
            isblcks: isblcks, //1事前2事中
            isbtd: isbtd,//1因公2因私
            xin: '1'
          };
        }
        that.$router.push({
          path: '/ticketcationform',
          query: {
            data: JSON.stringify(data)
          }
        });
      } else if (that.iskok == 2) {
        //火车
        if (le.length == 0) {
          that.$message({
            message: '请选择出发城市',
            type: 'warning'
          });
          return;
        } else if (le[1].name == '') {
          that.$message({
            message: '请选择到达城市',
            type: 'warning'
          });
          return;
        }
        if (firdata == '') {
          that.$message({
            message: '请选择出发日期',
            type: 'warning'
          });
          return;
        }
        let data = {
          city: le, //城市
          mokksli: this.mokksli,
          timedate: firdata, //时间
          butalist: passengers, //出行人
          isblcks: isblcks, //1事前2事中
          isbtd: isbtd //1因公2因私
        };
        that.$router.push({
          path: '/trainlist',
          query: {
            data: JSON.stringify(data)
          }
        });
      } else if (that.iskok == 3) {
        let data = {
          mokksli: this.mokksli,
          city: [hotcity], //城市
          cityval: hot_cyval, //酒店关键字
          timedate: hoteltime, //时间
          butalist: passengers, //出行人
          isblcks: isblcks, //1事前2事中
          isbtd: isbtd //1因公2因私
        };
        that.$router.push({
          path: '/hotelist',
          query: {
            data: JSON.stringify(data)
          }
        });
      }
    },
    mao() {
      console.log(this.checked);
    },
    addrow() {
      //查看旅客
      if (this.isbeforehand.length > 0) {
        this.$message({
          message: '事前不能修改出行人员！',
          type: 'warning'
        });
        return;
      }
      this.drawer = true;
    },
    foinput() {
      //判断酒店搜索是否有城市
      if (this.hotcltys.length > 0 && this.hot_cyval == '' && this.hotcltys != '') {
        this.hotcityname = true;
        this.st_right_list();
      } else if (this.hot_cyval != '') {
        this.inpu();
      }
    },
    bluscity() {
      if (!this.isctyslts) {
        this.hotcityname = false;
      }
    },
    onSelect(val) {
      //选择当前搜索关键词
      this.hot_cyval = val;
      this.hotcityname = false;
    },
    inpu() {
      let that = this;
      if (that.hot_cyval.length > 0) {
        that.hotcityname = true;
        that.loading = true;
        that.hotsearch = [];
        that.$api.home
            .getCityNames({cityName: that.hotcltys[0].name, keyword: that.hot_cyval})
            .then(res => {
              that.loading = false;
              if (res.code == 200) {
                that.hotsearch = res.data;
              } else {
                that.$message({
                  message: res.message,
                  type: 'warning'
                });
              }
            })
            .catch(e => {
              console.log(e);
              that.loading = false;
            });
      }
    },
    async bts_b() {
      let that = this;
      that.loading = true;
      that.$api.home
          .getCompCustomerInfo()
          .then(res => {
            that.loading = false;
            if (res.code == 200) {
              that.extendOne = res.data.extendOne;
            }
          })
          .catch(e => {
            console.log(e);
            that.loading = false;
          });
    },
    async st_right_list() {
      //回显酒店信息
      let that = this;
      that.loading = true;
      that.$api.home
          .getCityDetail({cityCode: that.hotcltys[0].name})
          .then(res => {
            that.stlist = [];
            that.loading = false;
            if (res.code == 200) {
              that.stlist.push({
                name: '行政区',
                id: 1,
                isclk: false, //打开还是关闭
                oken: false, //是否超过6个
                list: res.data.cityArea //值
              });
              that.stlist.push({
                name: '机场车站',
                id: 2,
                isclk: false, //打开还是关闭
                oken: false, //是否超过6个
                list: res.data.cityAirRailWay //值
              });
              that.stlist.push({
                name: '商圈',
                id: 3,
                isclk: false, //打开还是关闭
                oken: false, //是否超过6个
                list: res.data.cityBusinessSectionInfo //值
              });
              that.stlist.push({
                name: '地铁',
                id: 3,
                isclk: false, //打开还是关闭
                oken: false, //是否超过6个
                list: res.data.citySubWay //值
              });
              that.stlist.push({
                name: '品牌',
                id: 3,
                isclk: false, //打开还是关闭
                oken: false, //是否超过6个
                list: that.hotelb(res.data.hotelBrands) //值
              });
            }
          })
          .catch(e => {
            console.log(e);
            that.loading = false;
          });
    },
    hotelb(item) {
      //返回商圈的值
      let su = [];
      for (var i = 0; i < item.length; i++) {
        su.push(item[i].hotelBrandName);
      }
      return su;
    },
    listchangh(va) {
      //酒店城市
      this.hotcltys = va;
    },
    passuser(list) {
      this.drawer = false;
      this.passengers = list;
    },
    listchang(va) {
      //飞机
      this.cityslists = va;
    },
    listchangs(va) {
      //火车
      this.cityslist = va;
    },
    handleSelect(key) {
      this.passengers = [];
      this.isbeforehand = [];
      this.activeIndex = key;
      this.appartasklist = [];
      this.iskok = key;
      this.routs(key);
      let city = this.cityslist;
      this.cityslist = city;

    },
    dealDisabledDate(time) {
      //禁掉小于当前日期
      var times = Date.now();
      return time.getTime() < times - 8.64e7;
    },
    newstaname(tm) {
      //回显城市名称
      if (tm.vehicle == 1 || tm.vehicle == 2) {
        return tm.deptCityName + '-' + tm.arrivCityName;
      } else {
        return tm.cityName + '　' + tm.remark;
      }
    },
    newicname(tm) {
      //回显类型
      if (tm == 1) {
        return '[机票]';
      } else if (tm == 2) {
        return '[火车]';
      } else {
        return '[酒店]';
      }
    },
    newdata(tm) {
      //回显时间
      let sta = '';
      let stamon = '';
      let stadta = '';
      let end = '';
      let endmon = '';
      let enddta = '';
      if (tm.std != 6) {
        if (tm.std == 4) {
          sta = new Date(tm.deptDate.replace(/-/g, '/')); //出发日期
          stamon = this.dats(sta.getMonth() + 1);
          stadta = this.dats(sta.getDate());
          end = new Date(tm.deptDates.replace(/-/g, '/')); //到达日期
          endmon = this.dats(end.getMonth() + 1);
          enddta = this.dats(end.getDate());
        } else {
          sta = new Date(tm.deptDate.replace(/-/g, '/')); //出发日期
          stamon = this.dats(sta.getMonth() + 1);
          stadta = this.dats(sta.getDate());
        }
      } else {
        sta = new Date(tm.inDate.replace(/-/g, '/')); //出发日期
        stamon = this.dats(sta.getMonth() + 1);
        stadta = this.dats(sta.getDate());
        end = new Date(tm.outDate.replace(/-/g, '/')); //到达日期
        endmon = this.dats(end.getMonth() + 1);
        enddta = this.dats(end.getDate());
      }
      if (tm.goBack == 3) {
        return stamon + '月' + stadta + '日' + '　出发';
      } else if (tm.std == 4) {
        if (tm.goBack === 2) {
          return endmon + '月' + enddta + '日' + '　出发　' + stamon + '月' + stadta + '日' + ' 返回';
        } else if (tm.goBack === 1) {
          return stamon + '月' + stadta + '日' + '　出发　' + endmon + '月' + enddta + '日' + ' 返回';
        }
      } else if (tm.std == 6) {
        return stamon + '月' + stadta + '日' + '　入住　' + endmon + '月' + enddta + '日' + ' 离店';
      } else if (tm.std == 2) {
        if (tm.goBack === 2) {
          return stamon + '月' + stadta + '日' + '　出发　'
        } else if (tm.goBack === 1) {
          return stamon + '月' + stadta + '日' + '　出发　'
        }
      }
    },
    dats(it) {
      if (it < 10) {
        return '0' + it;
      } else {
        return it;
      }
    },
    async routs(it) {
      this.loading2 = true
      try {
        this.stlistlist = [];
        let retilot = {};
        if (it == 1) {
          retilot = await this.$api.home.getAgreeApprvTask({ //1机票单程 2火车 3酒店  4机票往返
            type: 4
          });
          if (retilot.code == 200) {
            this.appartasklist = retilot.data;
            let datS = retilot.data;
            for (let i in datS) {
              let applivalist = [];
              let appflks = datS[i].tmsGssLink.applyVehicles;
              for (let k = 0; k < appflks.length; k++) {
                appflks[k].std = 4;
                let nums = 0;

                for (let p in applivalist) {
                  if (appflks[k].goBackGroup != null && appflks[k].goBackGroup != undefined) {
                    if (applivalist[p].citys.goBackGroup == appflks[k].goBackGroup) {
                      nums = 1;
                    }
                  }
                }
                if (nums == 0) {
                  appflks[k].deptDates = appflks[k + 1].deptDate;
                  applivalist.push({
                    id: appflks[k].id,
                    ids: appflks[k + 1].id,
                    reson: datS[i].reason,
                    citys: appflks[k],//出差信息
                    nams: datS[i].tmsGssLink.applyStaffs,//出差人
                    sit: {
                      deptName: datS[i].deptName,//部门名称
                      costcenterName: datS[i].costName,
                      deptId: datS[i].deptId,//部门id
                      costId: datS[i].costId,//成本中心id
                      costName: datS[i].costName,//成本中心名称
                      travelNo: datS[i].travelNo,//出差单号
                    }
                  })
                }
              }
              this.stlistlist = this.stlistlist.concat(applivalist);
              
            }

          }
        }
        let res = await this.$api.home.getAgreeApprvTask({
          type: it
        });
        if (res.code == 200) {
          this.appartasklist = res.data.concat(this.appartasklist);
          let dat = res.data;
          let num = this.iskok;
          for (let i in dat) {
            if (num == 3) {
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
            } else {
              for (let k in dat[i].tmsGssLink.applyVehicles) {
                let datd = dat[i].tmsGssLink.applyVehicles[k];
                datd.std = num; //火车
                this.stlistlist.push({
                  ctime: new Date(datd.createTime).getTime(),
                  id: dat[i].tmsGssLink.applyVehicles[k].id,
                  reson: dat[i].reason,
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
          }
           this.loading2 = false
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
    beginDatec() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.valuer) {
            //如果结束时间不为空，则小于结束时间
            return new Date(self.valuer).getTime() < time.getTime();
          } else {
          }
        }
      };
    },
    processDatec() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.values) {
            //如果开始时间不为空，则结束时间大于开始时间
            return new Date(self.values).getTime() > time.getTime();
          } else {
          }
        }
      };
    },
  }
};
</script>

<style scoped lang="less">
.home_box {
  width: 100%;

  .homt_img {
    width: 100%;
    height: 586px;
    background: url(http://file.molintmc.cn/mlimg/navbotns.jpg) no-repeat;
    background-size: cover;
    background-position: center 0;
    position: relative;
    min-width: 1320px;

    .home_dv {
      position: absolute;
      width: calc(100% - 20%);
      left: 0;
      top: 50px;
      padding: 0 10%;

      .home_tst {
        width: 100%;
        box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.1);

        .home_tars {
          width: 100%;

          .hom_topslit {
            width: 100%;
            height: 88px;
            background-color: rgba(0, 0, 0, .3);
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
            line-height: 88px;
            font-size: 22px;
            display: flex;
            color: #FFFFFF;

            .hom_list {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 284px;
              height: 88px;
              color: #CCCCCC;
              cursor: pointer;

              img {
                margin-right: 20px;
              }
            }

            .hom_listok {
              color: #333333;
              background-color: #FFFFFF;
              border-top-left-radius: 6px;
              border-top-right-radius: 6px;
            }
          }

          .homts_btns {
            width: calc(100% - 56px);
            padding: 48px 28px;
            border-top-right-radius: 6px;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            background-color: #FFFFFF;

            .homt_vls {
              display: flex;
              width: 195px;
              padding: 10px 15px;
              position: relative;

              .vlislit {
                position: absolute;
                left: 190px;
                top: 10px;
                width: 270px;
                padding: 0 10px;
                max-height: 300px;
                box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.1);
                border-radius: 3px;
                background-color: #ffffff;
                z-index: 10001;
                cursor: pointer;
                overflow: auto;

                div.popContainer {
                  position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background: rgba(0, 0, 0, 0.3);
                  z-index: 10002;
                }

                //遮罩层  但是会遮住内容  现无法解决  已搁置

                .talist {
                  position: relative;
                  width: 100%;
                  border: 1px solid #555555;
                  background: #FFFFFF;
                  border-radius: 6px;
                  padding: 10px 0;
                  margin-bottom: 10px;
                  display: flex;
                  z-index: 10003;

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

              .appartasklist {
                font-size: 12px;
                border: 1px solid #007aff;
                border-radius: 3px;
                color: #007aff;
                padding: 0 5px;
                line-height: 20px;
                margin-left: 10px;
                cursor: pointer;
              }

              .fiexds {
                position: fixed;
                z-index: 999;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0);
              }
            }

            .homt_vlst {
              width: 140px;
            }

            .srltop {
              display: flex;
              margin: 40px 0 0 0;
              align-items: center;

              .sercits {
                flex: 2;
                display: flex;

                .cityslefts {
                  width: calc(50% - 5px);
                  position: relative;

                  .citycom {
                    position: relative;
                    width: 100%;
                    display: flex;
                    height: 65px;
                    line-height: 65px;
                    color: #abb7c2;

                    .citcom_left {
                      width: 100%;
                      display: flex;

                      .sttext {
                        width: 70px;
                        font-size: 14px;
                        text-align: center;
                      }

                      .inputs /deep/ .el-input__inner {
                        border: 0;
                        padding: 0;
                        font-size: 16px;
                      }
                    }
                  }

                  .citycom-JD {
                    height: 63px;
                    line-height: 63px;
                  }

                  .hotvals {
                    position: absolute;
                    left: 0;
                    top: 70px;
                    width: 500px;
                    max-height: 500px;
                    min-height: 300px;
                    overflow-y: scroll;
                    scrollbar-width: none; /* firefox */
                    -ms-overflow-style: none; /* IE 10+ */
                    background: #ffffff;
                    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);

                    .section {
                      margin-top: 10px;

                      .city-title {
                        line-height: 30px;
                        color: #949494;
                        font-size: 14px;
                        text-indent: 15px;
                      }

                      .letter {
                        width: 100%;
                        height: 22px;
                        text-indent: 15px;
                        color: #434c51;
                        background-color: #ffffff;
                        font-size: 14px;
                        line-height: 22px;
                      }

                      .city-list {
                        display: flex;
                        flex-wrap: wrap;
                        padding: 15px 0 0 14px;

                        .city-item {
                          padding: 0 10px;
                          height: 20px;
                          line-height: 20px;
                          color: #000000;
                          font-size: 15px;
                          cursor: pointer;
                        }

                        .city-item:hover {
                          color: #007aff;
                        }
                      }
                    }

                    .hotsearchs {
                      line-height: 25px;
                      text-indent: 10px;
                      font-size: 14px;
                      cursor: pointer;
                    }

                    .hotsearchs:hover {
                      color: #007aff;
                    }
                  }
                }

                .citysleft {
                  width: 100%;
                  position: relative;

                  .citycom {
                    position: relative;
                    width: 100%;
                    display: flex;
                    height: 65px;
                    line-height: 65px;
                    color: #abb7c2;

                    .citcom_left {
                      width: 100%;
                      display: flex;

                      .sttext {
                        width: 70px;
                        font-size: 14px;
                        text-align: center;
                      }

                      .inputs /deep/ .el-input__inner {
                        border: 0;
                        padding: 0;
                        font-size: 20px;
                      }
                    }
                  }

                }
              }

              .sertys {
                flex: 3;
                margin-left: 10px;
                display: flex;

                .inputsbox {
                  width: 50%;
                  height: 62px;
                  border: 1px solid #edf0f5;
                  border-radius: 4px;
                  display: flex;
                  align-items: center;

                  .block {
                    width: clac(35% -10px);
                    margin-left: 10px;

                    .inputst /deep/ .el-input__inner {
                      border: 0;
                      padding: 0;
                      font-size: 16px;
                    }

                    .inputst /deep/ .el-icon-date {
                      display: none;
                    }

                  }

                  .thans {
                    width: 25%;

                    div {
                      width: 10px;
                      height: 2px;
                      background-color: #CCCCCC;
                    }

                  }

                  .blocks {
                    width: calc(100% - 20px);
                    padding: 0 10px;

                    .inputime {
                      border: 0;
                      cursor: pointer;
                      width: 100%;
                      padding: 4px 0;
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                    }

                    .inputime /deep/ .el-input__icon {
                      display: none;
                    }

                    .inputime /deep/ .el-range-input {
                      font-size: 16px;
                    }
                  }
                }

                .dipgright {
                  display: flex;
                  width: 50%;
                  height: 62px;

                  .blockop {
                    margin-left: 10px;
                  }

                  .blockops {
                    width: 48%;
                    margin-left: 10px;

                    .selck /deep/ .el-input__inner {
                      height: 62px;
                      border: 1px solid #edf0f5;
                      border-radius: 4px;
                    }
                  }
                }
              }
            }
          }

          .homts_btnsd {
            border-top-left-radius: 6px;
          }
        }

        .personnel {
          width: 100%;
          margin: 20px 0;
          height: 40px;
          padding: 40px 0 0 0;
          border-radius: 6px;
          background-color: #FFFFFF;
          min-height: 360px;
          box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.1);

          .persotop {
            cursor: pointer;
            margin: 0 0 0 40px;
            height: 30px;
            line-height: 30px;
            display: flex;
            align-items: center;
            color: #409EFF;
            width: 100px;
            p:hover {
              color: #0e7ff1;
            }
          }

          .perlists {
            width: 100%;
            min-height: 344px;
            font-size: 16px;

            .nopassage {
              width: 100%;
              height: 344px;
              display: flex;
              align-items: center;
              justify-content: center;

              img {
                width: 173px;
                height: 193px;
              }
            }

            .passlist {
              width: calc(100% - 40px);
              display: flex;
              flex-wrap: wrap;
              padding: 20px;

              .passdv {
                position: relative;
                width: 130px;
                line-height: 36px;
                text-align: center;
                color: #333;
                background-color: #f4f4f4;
                border-radius: 2px;
                margin: 20px;
                border: 1px solid #e8e8e8;

                .passclose {
                  position: absolute;
                  width: 14px;
                  height: 14px;
                  text-align: center;
                  line-height: 14px;
                  border-radius: 50%;
                  background-color: #FFFFFF;
                  color: #409EFF;
                  cursor: pointer;
                  font-size: 14px;
                  top: -7px;
                  right: -6px;
                }
              }
            }
          }

          .shipping_space {
            width: calc(100% - 28%);
            text-align: right;
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
        }
      }
    }
  }
}
</style>
