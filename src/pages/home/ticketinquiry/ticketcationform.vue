<template>
  <div class="main">
    <div class="listfoter" :class="fitxd ? 'listfiexd' : ''">
      <div class="form-wrap">
        <div class="stis">
          <div class="sercits">
            <div class="citysleft">
              <citysearchs :issera="isblcks == 1" @changers="listchangs" :ctiys="citylist"
                           :child-array="zhuan"></citysearchs>
            </div>
          </div>
          <div class="timeits">
            <div class="sies">去程</div>
            <div class="timeist">
              <el-date-picker value-format="yyyy-MM-dd" style="width: 100%;color: #666666;" v-model="timedate"
                              type="date"
                              placeholder="" :disabled="isblcks == 1" :editable="false" :clearable="false"
                              @change="tiemdat" :picker-options="pickerOptions"></el-date-picker>
            </div>
            <div class="sies">回程</div>
            <div class="timeist">
              <el-date-picker value-format="yyyy-MM-dd" style="width: 100%;" v-model="timedates"
                              :disabled="disab || isblcks == 1"
                              type="date" placeholder="" :editable="false" :clearable="false" @change="tiemdat"
                              :picker-options="pickerOptions"></el-date-picker>
            </div>
          </div>
          <div class="btselect" @click="seachlist">
            搜索
          </div>
        </div>
      </div>
    </div>
    <div class="center">    
    <div class="lunsdata" v-if="zhuan != 2" :class="fitxd ? 'lunsfiexd' : ''">
      <div class="lun_left" @click="leftmove"><span class="iconfont color">&#xe8a1;</span></div>
      <div class="luns">
        <div ref="luns" class="lun_list" :style="{
            width: 12 * 1120 + 'px'
          }">
          <div class="l_list" :class="item.dats == timedate ? 'datacheck' : ''" v-for="(item, index) in itemlist"
               :key="index"
               @click="datachencks(item, item.dats)">
            <div>{{ item.data }}</div>
            <div style="margin-left: 3px;">{{ item.week }}</div>
          </div>
        </div>
      </div>
      <div class="lun_right" @click="rightmove"><span class="iconfont color" >&#xe62d;</span></div>
    </div>

    <div class="lunsdata" v-else>
      <div class="lun_left" @click="leftmove"><span class="iconfont color" >&#xe8a1;</span></div>
      <div class="luns">
        <div ref="luns" class="lun_list" :style="{
            width: 12 * 1120 + 'px'
          }">
          <div class="l_list" :class="item.dats == timedates ? 'datacheck' : ''" v-for="(item, index) in itemlist"
               :key="index"
               @click="datachencks(item, item.dats)">
            <div>{{ item.data }}</div>
            <div style="margin-left: 3px;">{{ item.week }}</div>
          </div>
        </div>
      </div>
      <div class="lun_right" @click="rightmove"><span class="iconfont color">&#xe62d;</span></div>
    </div>
    <div class="take">
      <div class="taks_right">
        <div class="bo_d">
          <div class="bo_dst" @click="cheacks">
            <span class="iconfont" v-if="cheack == false">&#xe80c;</span>
            <span class="iconfont icon" v-else>&#xe618;</span>仅看直飞
          </div>
          <div class="bo_dst" @click="shareds(0)">
            <span class="iconfont" v-if="shares == false">&#xe80c;</span>
            <span class="iconfont icon" v-else>&#xe618;</span>隐藏共享航班
          </div>
        </div>
        <div class="al_hr">
          <div class="al_hrt">
            <div class="aiel">
              <div class="aire" @click="tack" :style="airline == true ? {'color':'#3D84FF'} : ''">
                航空公司
                <div class="comboboxs" v-if="airline != false">
                  <div v-for="(item,index) in userchoice" @click="tacks(item,index)"
                       :style="item.id == hangkong ? {'color':'#3D84FF'} : ''">
                    {{ item.text }}
                  </div>
                </div>
              </div>
              <div class="model" @click="tasck" :style="model == true ? {'color':'#3D84FF'} : ''">
                机型
                <div class="combobos" v-if="model != false">
                  <div v-for="(item,index) in userschoice" @click="tackes(item,index)"
                       :style="item.text == xing ? {'color':'#3D84FF'} : ''">
                    {{ item.text }}
                  </div>
                </div>
              </div>
            </div>
            <div v-for="(item,index) in takelist" :key="index" @click="takeck(item,index)"
                 :style="item.cklit == true ? {'color':'#3D84FF'} : ''" class="ta_span">
              <span>{{ item.name }}</span>
              <span :style="item.cklit == true ? {'color':'#3D84FF'} : {'color':'#CCCCCC'}">
						<span v-if="item.isture == true" class="iconfont fitus">&#xe8a2;</span>
						<span v-else class="iconfont fitus">&#xe6b5;</span>
					</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="airlines" v-if="userlists.length == 0" v-loading="loading"></div>
    <div class="airline" v-for="(item, index) in userlists" v-if="userlists.length > 0 && item.isshow == true"
         v-loading="loading"
         :key="index">
      <div class="section">
        <div class="selist boxShow" @click="user(item, index)">
          <div class="trainsc">
            <div class="trass"><img :src="item.ims"/></div>
            <div class="trainsc_l">
              <div class="trasp">{{ company(item.name.airline) }}&nbsp;{{ item.name.no }}</div>
              <div class="trasps">
                <p>{{ item.name.plane }}&nbsp;{{ item.name.planeSize }}</p>
              </div>
            </div>
            <div class="trainsc_s">
              <div class="trainsc_s_l">
                <div class="trainsc_s_l_t">{{ item.name.departTime }}</div>
                <div class="trainsc_s_l_b">
                  <div class="trainsc_s_l_b_l trabrs">始</div>
                  <div class="trainsc_s_l_b_r" v-if="item.name.departTerminal != null">{{
                      item.name.departs
                    }}{{ item.name.departTerminal }}
                  </div>
                  <div class="trainsc_s_l_b_r" v-else>{{ item.name.departs }}</div>
                </div>
              </div>
              <div class="trainsc_s_s" :class="{nonstop:item.name.nonstop == true}">
                <div style="font-size: 12px;color:#999">{{ item.name.flightTime }}</div>
                <div style="color: #007AFF;text-align: center;font-size: 16px;cursor: pointer;"
                     v-if="item.name.nonstop == true"
                     @click="arriva(item)">经停 {{ arrivalAirport }}
                </div>
              </div>
              <div class="trainsc_s_l trainsc_s_r">
                <div class="trainsc_s_l_t">{{ item.name.arriveTime }}</div>
                <div class="trainsc_s_l_b">
                  <div class="trainsc_s_l_b_l trabrd">终</div>
                  <div class="trainsc_s_l_b_r" v-if="item.name.arriveTerminal != null">{{
                      item.name.arrives
                    }}{{ item.name.arriveTerminal }}
                  </div>
                  <div class="trainsc_s_l_b_r" v-else>{{ item.name.arrives }}</div>
                </div>
              </div>
            </div>
            <div class="trainsc_r">
              <div class="seatlist">
                <div class="seatprice"><span>￥</span>{{ item.text.cabins[0].salePrices[0].price }}</div>
                <div class="seatname" v-if="item.text.cabins[0].num == '全价'">{{
                    item.text.cabins[0].level
                  }}{{ item.text.cabins[0].num }}
                </div>
                <div class="seatname" v-else>{{ item.text.cabins[0].level }}{{ item.text.cabins[0].num }}折</div>
                <div class="public" v-if="civilServiceTicket != undefined && civilServiceTicket == 1">公</div>
                <el-tooltip v-if="item.name.shared == true" class="item" style="color: #0BC071;" effect="dark"
                            :content="'承运航班:'+item.name.operatingNo"
                            placement="top">
                  <span style="color:#0BC071;cursor: pointer;font-size: 14px;">共享</span>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
        <div class="side" v-if="shou == index">
          <div class="reserve" v-for="(items, indexs) in particulars" :key="indexs">
            <!-- 预定 -->
            <div class="reserve_left">
              <img src="static/image/home/official.png" class="official"
                   v-if="items.priceSource == 1 && items.priceInfoId != null"><!-- -->
              <img src="static/image/home/outer.png" class="official" v-if="items.priceSource == 2"><!--  -->
              <span class="changetype" v-if="items.changeFare == true">协议价</span> <!--   -->
            </div>
            <div class="reserve_cen">
              <div class="shidisc">{{ companys(items.level, items.cabinName) }}&nbsp;{{ disname(items.discount) }}</div>
            </div>
            <div class="reserve_lefts">
              <div class="spana" @mouseover="ctlist(item,items)" @mouseleave="ctlists()">退改规则</div>
            </div>
            <div class="reserve_right">

              <div class="shidiss"><span>￥</span>{{ items.salePrices[0].price }}</div>
              <div class="but" @click.stop="book(item, items, index)">订票</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <no-data v-if="userlists.length === 0 && loading === false" class="noData"></no-data>
    <div class="rule" v-if="yin">
      <div class="">
        <p style="color: dodgerblue;font-size: 18px;padding: 10px 0 0 10px;">退票规则</p>
        <p style="padding: 40px 0 0 10px;font-size: 14px;"> 1.退票规定：{{ backrule.refundTicketDes }}</p>
        <p style="padding: 50px 0 0 10px;font-size: 14px;">2.改签规定：{{ backrule.changeTicketDes }}</p>
        <p style="padding: 50px 0 0 10px;font-size: 14px;">3.签转规定：{{ backrule.signTicketDes }}</p>
      </div>
    </div>

    <div class="staleve" v-if="staleve" @click="staleve = false">
      <div class="stalist" @click.stop>
        <div class="scloos">
          <div class="statop" v-for="(item, index) in platformlist" :key="index">
            <div class="reds">
              <div class="ts_text">{{ item.name }}</div>
            </div>
            <div class="setlist" v-for="(items, index) in item.list">
              <div class="setbod">
                <div class="styul">
                  <div class="styli_top">{{ items.name }}</div>
                  <div class="stulis">
                    <div class="styli_left">超规人员:</div>
                    <div class="styli_right">{{ items.list }}</div>
                  </div>
                </div>
                <div class="styul" v-if="items.va == 3">
                  <div class="stulis">
                    <div class="styli_left">超规原因:</div>
                    <div class="styli_right">
                      <div class="wors">
                        <el-select v-model="items.reasons" placeholder="请选择">
                          <el-option v-for="item in rulesReasons" :key="item.id" :label="item.chineseDesc"
                                     :value="item.chineseDesc"></el-option>
                        </el-select>
                      </div>
                    </div>
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
import {
  mapState
} from 'vuex';
import citysearchs from '@/components/common/citycomponents.vue';
import airports from '../../../../static/js/airports.js';
import citys from '../../../../static/js/airports.js'
import NoData from "@/components/common/noData";

export default {
  data() {
    return {
      takelist: [{
        name: '起飞时间',
        isture: false,
        cklit: false
      }, {
        name: '价格排序',
        isture: false,
        cklit: false
      }],
      airline: false,
      model: false,
      tabBar: [{
        ul: 'Time',
        text: '时间',
        imgnor: '\ue8a5',
        imgNormal: '\ue648'
      },
        {
          ul: 'Topbottom',
          text: '价格',
          imgnor: '\ue8a6',
          imgNormal: '\ue615'
        },
        {
          ul: 'Screen',
          text: '直飞',
          imgnor: '\ue61d',
          imgNormal: '\ue61d'
        }
      ],
      contract: 1,
      loading: false,
      lei: '',
      isarsrl: false, //是否需要审核
      fitxd: false, //头部是否定位
      datatime: '',
      notbooking: false, //违规不能继续
      staleve: false, //是否有违规信息
      itemlist: [], //一个月的时间
      roteslists: {}, //上个页面的参数
      itmesp: 0,
      traitime: '',
      disab: false,
      butalist: [], //出行人
      pookis: false, //是否再次审批
      isblckt: false, //事前是否2次审批
      cheack: false, //是否隐藏共享航班
      shares: false, //是否隐藏共享航班
      fromcity: '', //出发城市
      tocity: '', //到达城市
      address: [], //城市集合
      userlist: [{
        name: '南航CZ3160',
        type: '320大型机',
        date: '15:30',
        depart: '首都T2',
        duration: '3小时35分钟',
        dates: '18:35',
        arrive: '宝安T3',
        price: '￥580',
        shipping: '经济舱'
      },
        {
          name: '北航CZ3160',
          type: '220大型机',
          date: '18:30',
          depart: '首都T2',
          duration: '3小时35分钟',
          dates: '20:35',
          arrive: '宝安T3',
          price: '￥1580',
          shipping: '特价经济舱'
        }
      ],
      userchoice: [],
      userschoice: [],
      zhuan: '1',
      civilServiceTicket: '',
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
      date: '',
      yin: false,
      ting: false, //共享
      isblcks: JSON.parse(this.$route.query.data).isblcks,
      week: '', //周几
      contract_lefts: true,
      arrivalAirport: '', //经停
      contract_rights: false,
      hangkong: '',
      xing: '',
      particulars: [],
      hang: [],
      tickarray: [],
      particularss: [],
      shou: -1,
      timedate: JSON.parse(this.$route.query.data).timedate,
      timedates: JSON.parse(this.$route.query.data).timedates,
      citylist: JSON.parse(this.$route.query.data).city,
      pickerOptions: {
        disabledDate: time => {
          return this.dealDisabledDate(time);
        }
      },
      userlists: [],
    };
  },
  components: {
    NoData,
    citysearchs
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    ...mapState(['go_there', 'goName']) //往返的值0是去，1是返回
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    var dateList = [];
    let startDate = new Date();
    let endDate = new Date();
    endDate.setDate(startDate.getDate() + 90);
    while (endDate.getTime() - startDate.getTime() >= 0) {
      //获取当前日期后一个月的数据
      let year = startDate.getFullYear();
      let month = (startDate.getMonth() + 1).toString().length === 1 ? '0' + (startDate.getMonth() + 1).toString() :
          startDate.getMonth() + 1;
      let day = startDate.getDate().toString().length === 1 ? '0' + startDate.getDate() : startDate.getDate();
      let days = startDate.getDay();
      switch (days) {
        case 1:
          days = '周一';
          break;
        case 2:
          days = '周二';
          break;
        case 3:
          days = '周三';
          break;
        case 4:
          days = '周四';
          break;
        case 5:
          days = '周五';
          break;
        case 6:
          days = '周六';
          break;
        case 0:
          days = '周日';
          break;
      }
      dateList.push({
        data: month + '-' + day,
        week: days,
        dats: year + '-' + month + '-' + day
      });
      startDate.setDate(startDate.getDate() + 1);
    }
    let lis = JSON.parse(this.$route.query.data); //获取上个页面传入的参数
    this.packlist = lis;
    let date = new Date();
    let year = date.getFullYear(); //得到当前年份
    let month = this.editTime(date.getMonth() + 1); //得到当前月份
    let day = this.editTime(date.getDate()); //得到当前几号
    let datte = year + '-' + month + '-' + day;
    let dattes = year + '-' + month + '-' + (day + 1);
    let timedas = lis.timedate.split('-').join('');
    let itmedaa = lis.timedates.split('-').join('');
    let dateas = year.toString() + month.toString() + day.toString();
    if (timedas < dateas && timedas != '') {
      this.timedate = datte; //出发时间
      if (lis.timedates != '') {
        this.timedates = dattes; //到达时间
      }
    } else if (timedas == '' && lis.timedates != '') {
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
    }
    this.lei = '';
    if (this.timedates == '') {
      this.lei = '1';
      this.disab = true;
    } else {
      this.lei = '2';
      this.disab = false;
    }
    this.datenow();
    this.aircraftlistst();
  },
  methods: {
    takeck(item, index) {
      if (item.cklit == false) { //判断是否选中当前
        for (let i = 0; i < this.takelist.length; i++) {
          if (i != index) {
            this.takelist[i].cklit = false;
            this.takelist[i].isture = false;
          }
        }
        item.cklit = true;
      }

      if (item.isture == true) {
        if (index == 0) {
          this.inverted();
        } else if (index == 1) {
          this.inverteds();
        }
        item.isture = false;
      } else {
        if (index == 0) {
          this.sort();
        } else if (index == 1) {
          this.sorts();
        }
        item.isture = true;
      }
    },
    handleScroll() {
      //滚动条监听事件
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 85) {
        this.fitxd = true;
      } else {
        this.fitxd = false;
      }
    },
    tack() {
      if (this.airline == true) {
        this.airline = false;
      } else {
        this.airline = true;
        let si = [{
          img: '\ue620',
          id: 'Unlimitedh',
          text: '不限'
        }];
        for (let i = 0; i < this.userlists.length; i++) {
          si.push({
            img: '\ue620',
            id: this.userlists[i].name.airline,
            text: this.company(this.userlists[i].name.airline)
          })
        }
        let obj = {};
        let peon = si.reduce((cur, next) => {
          obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
          return cur;
        }, []) //设置cur默认类型为数组，并且初始值为空的数组
        this.userchoice = peon
      }
    },
    tasck() {
      if (this.model == true) {
        this.model = false;
      } else {
        this.model = true;
        let sis = [{
          img: '\ue620',
          id: 'Unlimitede',
          text: '不限'
        }];
        for (let i = 0; i < this.userlists.length; i++) {
          sis.push({
            img: '\ue620',
            id: this.userlists[i].name.planeSize,
            text: this.userlists[i].name.planeSize
          })
        }
        let objs = {};
        let peons = sis.reduce((cur, next) => {
          objs[next.id] ? "" : objs[next.id] = true && cur.push(next);
          return cur;
        }, []) //设置cur默认类型为数组，并且初始值为空的数组
        this.userschoice = peons
      }
    },
    tacks(item, index) {
      this.hangkong = item.id;
      this.filters();
    },
    tackes(item, index) {
      this.xing = item.text;
      this.filters();
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
      }
    },
    companys(ie, cabinName) {
      for (let k in this.particulars) {
        if (ie == 'F' && cabinName == null) {
          return '头等舱'
        } else if (ie == 'C' && cabinName === null) {
          return '商务舱'
        } else if (ie == 'Y' && cabinName === null) {
          return '经济舱'
        } else if (ie == 'F' && cabinName != null) {
          return cabinName
        } else if (ie == 'C' && cabinName != null) {
          return cabinName
        } else if (ie == 'Y' && cabinName != null) {
          return cabinName
        } else {
          return cabinName
        }
      }
      return ie;

    },
    sort() {
      let _this = this;
      let pattern = ':';
      for (let k in _this.userlists) {
        _this.userlists[k]['nusm'] = _this.userlists[k].name.departTime.replace(new RegExp(pattern), "");
      }

      this.userlists.sort(this.compare('nusm', true))
    },
    inverted() {
      let _this = this;
      let pattern = ':';
      for (let k in _this.userlists) {
        _this.userlists[k]['nusm'] = _this.userlists[k].name.departTime.replace(new RegExp(pattern), "");
      }
      this.userlists.sort(this.compare('nusm', false))
    },
    sorts() {
      let _this = this;
      for (let j in _this.userlists) {
        _this.userlists[j]['nums'] = _this.userlists[j].text.cabins[0].minParPrice;
        this.userlists.sort(this.compare('nums', true))
      }
    },
    inverteds() {
      let _this = this;
      for (let j in _this.userlists) {
        _this.userlists[j]['nums'] = _this.userlists[j].text.cabins[0].minParPrice;
        this.userlists.sort(this.compare('nums', false))
      }
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
    async transit(item) { //经停
      let red = await this.$api.home.getPlaneStop({
        'flightNo': item.name.no,
        'depDate': item.name.departDate
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
        return
      }
    },
    aircraftlistst() {
      //飞机信息查询
      let user = {};
      this.userlists = [];
      if (this.timedates == '') {
        if (this.civilServiceTicket != undefined) {
          user = {
            aircom: '',
            fromCity: this.fromcity,
            passengerType: 'ADT',
            hcType: '1',
            toCity: this.tocity,
            ishareFlight: 1,
            fromDate: this.timedate,
            transCity: '',
            grade: '',
            civilServiceTicket: this.civilServiceTicket
          };
        } else {
          user = {
            aircom: this.isblcks == 4 ? this.packlist.odllegList[0].flightNo.substring(0, 2) : '',
            fromCity: this.fromcity,
            passengerType: 'ADT',
            hcType: '1',
            toCity: this.tocity,
            ishareFlight: 1,
            fromDate: this.timedate,
            transCity: '',
            grade: ''
          };
        }
      } else if (this.timedates != '') {
        if (this.civilServiceTicket != undefined) {
          user = {
            aircom: '',
            fromCity: this.fromcity,
            passengerType: 'ADT',
            hcType: '2',
            toCity: this.tocity,
            ishareFlight: 1,
            fromDate: this.timedate,
            toDate: this.timedates,
            transCity: '',
            grade: '',
            civilServiceTicket: this.civilServiceTicket
          };
        } else {
          user = {
            aircom: '',
            fromCity: this.fromcity,
            passengerType: 'ADT',
            hcType: '2',
            toCity: this.tocity,
            ishareFlight: 1,
            fromDate: this.timedate,
            toDate: this.timedates,
            transCity: '',
            grade: ''
          };
        }
      }
      this.loading = true;
      this.$api.home
          .searchAirlineAJAX(user)
          .then(res => {
            if (res.code == 200) {
              if (res.data.search.flights == null) {
                this.$message({
                  message: '没有合适的航班信息。',
                  type: 'warning'
                });
                this.loading = false;
                return;
              }
              this.$api.home
                  .queryAirlineList()
                  .then(ret => {
                    if (ret.code == 200) {
                      this.hang = ret.data.airlineDds;
                    } else {
                      this.$message({
                        message: res.message,
                        type: 'warning'
                      });
                    }
                  })
                  .catch(e => {
                    console.log('获取数据失败', e);
                    this.loading = false;
                  });
              this.userslist = res.data.search.flights; //城市时间
              this.usermap = res.data.search.ow_data; //折扣价格舱位
              this.userrw = res.data.search.rw_data; //返回飞机信息
              this.address = airports.addressAirportAll; //航空名字
              if (this.timedates == '') {
                for (let k in this.usermap) {
                  for (let j in this.userslist) {
                    if (j == k) {
                      this.userlists.push({
                        isshow: true,
                        name: this.userslist[j],
                        text: this.usermap[k]
                      }); //获得userlists
                    }
                  }
                }
              } else if (this.timedates != '') {
                if (this.goName == 0) {
                  //往
                  for (let k in this.usermap) {
                    for (let j in this.userslist) {
                      if (j == k) {
                        this.userlists.push({
                          isshow: true,
                          name: this.userslist[j],
                          text: this.usermap[k]
                        });
                      }
                    }
                  }
                } else {
                  //返
                  for (let k in this.userrw) {
                    for (let j in this.userslist) {
                      if (j == k) {
                        this.userlists.push({
                          isshow: true,
                          name: this.userslist[j],
                          text: this.userrw[k]
                        });
                      }
                    }
                  }
                }
              }
              for (let k in this.userlists) {
                this.userlists[k]['ims'] = 'http://wx.feiren.com/static/img/' + this.userlists[k].name.airline + '.png';
                if ((k, this.userlists[k].name.planeSize == 'L')) {
                  this.userlists[k].name.planeSize = '(大)';
                } else if ((k, this.userlists[k].name.planeSize == 'M')) {
                  this.userlists[k].name.planeSize = '(中)';
                } else if ((k, this.userlists[k].name.planeSize == 'S')) {
                  this.userlists[k].name.planeSize = '(小)';
                }
                for (let j = 0; j < this.address.length; j++) {
                  if ((k, this.userlists[k].name.depart == this.address[j].airportCode)) {
                    // k,
                    this.userlists[k].name['departs'] = this.address[j].cityCName;
                  } else if ((k, this.userlists[k].name.arrive == this.address[j].airportCode)) {
                    // k,
                    this.userlists[k].name['arrives'] = this.address[j].cityCName;
                  }
                  if (this.arrivalAirport == this.address[j].airportCode) {
                    this.arrivalAirport = this.address[j].cityCName;
                  }
                }
              }
              for (let k in this.usermap) {
                if ((k, this.usermap[k].cabins[0].discount < '1')) {
                  let num = (k, this.usermap[k].cabins[0].discount * 10);
                  // k, this.usermap[k].cabins[0].discount = num.toFixed(1);
                  k, (this.usermap[k].cabins[0]['num'] = num.toFixed(1));
                } else {
                  let num = '全价';
                  k, (this.usermap[k].cabins[0]['num'] = num);
                }
              }
              for (let k in this.userrw) {
                if ((k, this.userrw[k].cabins[0].discount < '1')) {
                  let num = (k, this.userrw[k].cabins[0].discount * 10);
                  k, (this.userrw[k].cabins[0]['num'] = num.toFixed(1));
                }
              }
              this.loading = false;
              let reg = new RegExp(':');
              this.trainlist = [];
              for (let i = 0; i < this.trainlist.length; i++) {
                this.trainlist[i]['dats'] = this.timedate; //当前日期
                this.trainlist[i]['seats'] = st;
                this.trainlist[i]['fotime'] = this.trainlist[i].fromTime.replace(reg, ''); //开始时间数字
                this.trainlist[i]['totime'] = this.trainlist[i].toTime.replace(reg, ''); //到达时间数字
                let tiems = this.trainlist[i].fromTime.split(':');
                let stime = parseInt(tiems[0]) * 60 + parseInt(tiems[1]) + parseInt(this.trainlist[i].runTimeSpan); //总分钟数
                let a = parseInt(stime / (24 * 60));
                this.trainlist[i]['days'] = a; //总天数
                let totiem = new Date((new Date(this.timedate.replace(/-/g, '-')).getTime() / 1000 + a * 24 * 60 * 60) * 1000);
                let years = totiem.getFullYear(); //当前年
                let months = this.tim(totiem.getMonth() + 1); //当前月份
                let days = this.tim(totiem.getDate()); //当天
                this.trainlist[i]['toTrainDate'] = years + '-' + months + '-' + days; //到达日期
              }
              this.shareds(1);
            } else {
              this.$message({
                message: res.message,
                type: 'warning'
              });
            }
          })
          .catch(e => {
            console.log('获取数据失败', e);
            this.loading = false;
          });
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
            let resion = '';
            for (let k in plallist) {
              for (let p in plallist[k].list) {
                if (plallist[k].list[p].va == 3 && plallist[k].list[p].reasons == '') {
                  this.$message({
                    message: '请选择违规原因',
                    type: 'warning'
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
              reasons: resion
            };
          }
        }
      }
      this.staleve = false;
      this.othotrlis(); //跳转订单页面
    },
    async book(item, items, index) {
      if (this.timedate > this.timedates && this.disab == false) {
        this.$message({
          message: '返程日期不能小于去程日期',
          type: 'warning'
        });
        return;
      }
      this.isblckt = false;
      this.packslist = item;
      this.packslists = items;
      if (this.packlist.isbtd == 2) {
        this.othotrlis(item, items); //跳转订单页面
      } else {
        let level = ''; //舱位等级/** 服务等级, F:头等舱; C:商务舱; Y:经济舱 */
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
          if (i == lister.text.no) {
            minSalePriceCheck.push({
              flightNo: i, //航班号
              departDateTime: flights[i].departDate.substring(0, 10) + ' ' + flights[i].departTime + ':00', //时间
              minSalePrice: lister.text.minSalePrice //最低价
            });
          }
        }
        if (this.packlist.isblcks == 4) {
          arr = this.packlist.userlistnos;
          for (let i = 0; i < arr.length; i++) {
            ast.push({
              passengerNo: arr[i]
            });
          }
        } else {
          let sarr = this.packlist.butalist;
          for (let i = 0; i < sarr.length; i++) {
            arr.push(sarr[i].passengerNo);
            ast.push({
              passengerNo: sarr[i].passengerNo
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
              let stw = this.RuleMa.split(',');
              for (let i in stw) {
                /**
                 * 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
                 */
                if (stw[i] == 9) {
                  const rest = await this.$api.order.judgeApprv({
                    passengerNos: arr
                  }); //判断当前出行人是否都免审
                  if (rest.code == 200) {
                    if (rest.data == true) {
                      //判断是否需要审核 true为不需要审核
                      this.isarsrl = true;
                    }
                  } else {
                    that.$message({
                      message: res.message,
                      type: 'warning'
                    });
                    return;
                  }
                } else {
                  this.isarsrl = false;
                }
              }

            } else {
              that.$message({
                message: res.message,
                type: 'warning'
              });
            }
          } catch (e) {
            console.log(e);
            this.loading = false;
          }
        } else {
          try {
            this.loading = true;
            this.$api.home
                .judgeApprv({
                  passengerNos: arr
                })
                .then(res => {
                  this.loading = false;
                  if (res.code == 200) {
                    if (res.data == true) {
                      //判断是否需要审核 true为不需要审核
                      this.isarsrl = true;
                    }
                  } else {
                    this.$message({
                      message: res.message,
                      type: 'warning'
                    });
                  }
                })
                .catch(e => {
                  console.log(e);
                  this.loading = false;
                });
          } catch (e) {
            console.log(e);
            this.loading = false;
          }
        }
        (user = {
          depart: item.name.depart, //出发点,
          arrive: item.name.arrive, //到达地
          fuelFee: item.name.fuelFee, //本次航班燃油费,
          taxFee: item.name.taxFee, //本次航班基建费,
          minSalePrice: item.text.minSalePrice, //本次航班最低价,
          salePrice: items.salePrices[0].parPrice, //舱位票面价,
          peopleNum: this.packlist.butalist.length, //出行人数（用于校验同行人数规则）,
          departDate: item.name.departDate, //起飞日期,
          departTime: item.name.departTime, //,（用于校验提前预定天数规则）,
          level: level,
          discount: items.discount, //折扣,
          airline: item.name.airline, //航司编码,
          hcType: this.lei, //单程或者往返
          staffIds: ast, //用户编号
          flightNo: item.name.no, //航班号
          minSalePriceCheck: minSalePriceCheck //list对象
        }),
            (uses = {
              civilServiceTicket: 1
            });
        this.loading = true;
        const res = await this.$api.home.ruleCheck(user) //获取是否超规
        this.loading = false;
        if (res.code == 200) {
          if (JSON.stringify(res.data.limitNativeRule) == '{}') {
            //没有违规
            this.othotrlis(item, items); //跳转订单页面
          } else {
            this.rulesReasons = res.data.rulesReason; //违规原因
            this.rulesReasons.unshift({
              chineseDesc: ''
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
                list: this.platname(dal[k])
              });
            }
            for (let p in this.platformlist) {
              for (let k in this.platformlist[p].list) {
                if (this.platformlist[p].list[k].va == 4) {
                  this.notbooking = true;
                }
                if (this.platformlist[p].list[k].va == 5) {
                  this.pookis = true; //是否再次审批
                }
              }
            }
            this.staleve = true;
          }
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      }
    },
    othotrlis() {
      let datae = {
        datw: this.packlist,
        userlist: this.packslist
      };
      let cit = {
        name: this.company(this.packslist.name.airline),
        text: this.packslist.name.airline
      };
      let data = {};
      if (this.civilServiceTicket != undefined) {
        data = {
          isone: true, //是否单程
          data: datae, //上个页面参数
          date: this.date,
          limitNativeRule: this.limitNativeRule,
          hang: cit,
          datw: this.packslists, //当前座位信息
          week: this.week,
          isarsrl: this.isarsrl,
          isblckt: this.isblckt, //事前是否2次审批
          civilServiceTicket: this.civilServiceTicket //是否公务 1是 0 否
        };
      } else {
        data = {
          isone: true, //是否单程
          data: datae, //上个页面参数
          date: this.date,
          limitNativeRule: this.limitNativeRule,
          hang: cit,
          datw: this.packslists, //当前座位信息
          week: this.week,
          isarsrl: this.isarsrl,
          isblckt: this.isblckt //事前是否2次审批
        };
      }
      if (this.timedates == '') {
        this.$router.push({
          path: '/ticketcationadd',
          query: {
            data: JSON.stringify(data)
          }
        });
      } else {
        if (this.goName == 0) {
          let st = this.go_there;
          st = [data];
          this.$store.commit('go_there_add', st);
          this.$store.commit('goName_add', 1);
          this.zhuan = '2';
          this.shou = -1;
          let city = this.citylist;
          this.citylist = [{
            id: city[1].id,
            name: city[1].name
          },
            {
              id: city[0].id,
              name: city[0].name
            }
          ];
          for (let i in this.itemlist) {
            if (this.itemlist[i].dats == this.timedates) {
              this.week = this.itemlist[i].week;
              this.date = this.itemlist[i].data;
            }
          }
          this.aircraftlistst();
        } else {
          let st = this.go_there;
          st.push(data);
          this.$store.commit('go_there_add', st);
          this.$store.commit('goName_add', 0);
          let et = {
            isone: false, //是否单程
            ones: this.go_there[0],
            twos: this.go_there[1]
          };
          this.$router.push({
            path: '/ticketcationadd',
            query: {
              data: JSON.stringify(et)
            }
          });
        }
      }
    },
    platnams(name) {
      if (name == 'highLimit') {
        return '高价限制超规';
      } else if (name == 'starLevelLimit') {
        return '低价限制超规';
      } else if (name == 'agreementFlightLimit') {
        return '限定协议航班限制超规';
      } else if (name == 'reserveLimit') {
        return '提前预定限制超规';
      } else if (name == 'positionLimit') {
        return '仓位限制超规';
      } else if (name == 'discountLimit') {
        return '折扣限制超规';
      } else if (name == 'accNumberLimit') {
        return '同行人数限制超规';
      }
    },
    platname(list) {
      let su = [];
      for (let k in list) {
        if (k == 1) {
          su.push({
            va: k,
            name: '只记录不提示',
            list: list[k]
          });
        } else if (k == 2) {
          su.push({
            va: k,
            name: '超规不必选择原因',
            list: list[k]
          });
        } else if (k == 3) {
          su.push({
            va: k,
            name: '超规必须选择原因',
            list: list[k],
            reasons: ''
          });
        } else if (k == 4) {
          su.push({
            va: k,
            name: '不可预定',
            list: list[k]
          });
        } else if (k == 5) {
          su.push({
            va: k,
            name: '超规需重新审核',
            list: list[k]
          });
        }
      }
      return su;
    },
    leftmove() {
      //左
      if (this.itmesp > 0) {
        this.itmesp -= 1;
      }
      this.$refs.luns.style.transform = 'translate(' + -1120 * this.itmesp + 'px,0)';
    },
    rightmove() {
      //右
      if (this.itmesp < 13) {
        this.itmesp += 1;
      }
      this.$refs.luns.style.transform = 'translate(' + -1120 * this.itmesp + 'px,0)';
    },
    seachlist() {
      //搜索

      this.aircraftlistst();
    },
    datachencks(item, it) {
      //点击时间
      if (this.isblcks == 1) {
        return
      }
      this.timedate = it;
      this.timedate = it;
      this.seachlist();
      this.shareds(1);
    },
    tiemdat() {
      //时间选择
      this.timedate = this.timedate;
      this.datenow();
      this.seachlist();
    },
    datenow() { //移动到当前选择的日期
      let EndTime = new Date(this.timedate);
      let NowTime = new Date();
      let t = EndTime.getTime() - NowTime.getTime();
      let d = Math.floor(t / 1000 / 60 / 60 / 24);
      let integerNumber = parseInt((d + 2) / 8);
      if ((d + 2) / 8 > integerNumber) {
        integerNumber += 1;
      }
      this.itmesp = integerNumber - 1;
      this.$refs.luns.style.transform = 'translate(' + -1112 * this.itmesp + 'px,0)';
    },
    listchangs(e) {
      //城市选择
      this.fromcity = e[0].id;
      this.tocity = e[1].id;
    },
    company(ie) {
      for (let s in this.hang) {
        if (ie == s) {
          ie = this.hang[s];
          return ie;
        }
      }
    },
    cheacks() {
      this.cheack = !this.cheack;
      this.filters();
    },
    shareds(id) {
      if (id == 0) {
        this.shares = !this.shares;
      } else {
        this.shares = true;
      }
      this.filters();
    },
    filters() { //过滤方法
      let datw = this.userlists;
      for (let i in datw) {
        if (this.shares == true) {
          if (this.userlists[i].name.shared == true) {
            this.userlists[i].isshow = false;
            continue
          }
        }
        if (this.cheack == true || this.cheack == false) {
          let sits = false;
          if (datw[i].name.nonstop == false && this.cheack == true) {
            sits = true;
          } else if (this.cheack == false) {
            sits = true;
          }
          if (sits == false) {
            datw[i].isshow = false;
            continue
          }
        }
        if (this.xing != '') {
          let sits = false;
          if (datw[i].name.planeSize == this.xing) {
            sits = true;
          } else if (this.xing == '不限') {
            sits = true;
          }
          if (sits == false) {
            datw[i].isshow = false;
            continue
          }
          datw[i].isshow = true;
        }
        if (this.hangkong != '') {
          let sits = false;
          if (datw[i].name.airline == this.hangkong) {
            sits = true;
          } else if (this.hangkong == 'Unlimitedh') {
            sits = true;
          }
          if (sits == false) {
            datw[i].isshow = false;
            continue
          }
        }
        datw[i].isshow = true;
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
    async ctlist(item, items) {
      this.yin = true;
      try {
        let data = {
          airlineCode: item.name.airline, //航司编码
          cabin: items.cabin, //舱位
          depDate: item.name.departDate, //起飞时间
          airRoute: item.name.depart + item.name.arrive, //航线：CANPVG（出发地到达地）
        }
        const ret = await this.$api.home.getRefundChangeRule(data);
        if (ret.code == 200) {
          this.backrule = ret.data;
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    ctlists() {
      this.yin = false;
    },
    user(item, index) {
      this.contract = 1;
      this.particulars = item.text.cabins;
      this.tickarray = [...this.particulars];
      if (this.shou == index) {
        this.shou = -1;
      } else {
        this.shou = index;
      }
    },
    disname(num) {
      let stnumber = parseFloat(num);
      if (stnumber < 1) {
        let num = this.mul(stnumber, 10);
        num.toFixed(1);
        return num + '折';
      } else {
        return '全价';
      }
    },
    mul(a, b) {
      //乘法
      var c = 0,
          d = a.toString(),
          e = b.toString();
      try {
        c += d.split('.')[1].length;
      } catch (f) {
      }
      try {
        c += e.split('.')[1].length;
      } catch (f) {
      }
      return (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c);
    },
    dealDisabledDate(time) {
      //禁掉小于当前日期
      var times = Date.now();
      return time.getTime() < times - 8.64e7;
    }
  }
};
</script>

<style scoped lang="less">
body, html {
  font-family: MicrosoftYaHei;
}

.main {
  width: 100%;
  height: 100%;
  margin: 0 auto;
 
  &>.center{
    width: 1180px;
     position: relative;
     margin: 0 auto;
    &>.noData{
    top: 30%;
  }
  } 
  
  ul li {
    list-style: none;
  }

  .listfoter {
    width: 100%;
    background-color: #FFFFFF;
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
          width: 40%;

          .citysleft {
            border-radius: 3px;
            width: 100%;
            height: 40px;
          }
        }

        .timeits {
          flex: 1;
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
          .mixin_bottonTrue(@width:162px,@height:40px,@bg:#FF9A35,@cl:#fff,@pd:0,@fz:14px)
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
      color: #3C85FD;
    }

    .lun_left {
      width: 40px;
      height: 76px;
      background: #ffffff;
      text-align: center;
      line-height: 76px;
      cursor: pointer;
      border: 1px solid #F0F0F0;
      &>span{
         color: #ccc;
      }
      &:hover{
        &>span{
          color: #3C85FD;
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
      border: 1px solid #F0F0F0;
      &>span{
         color: #ccc;
      }
       &:hover{
        &>span{
          color: #3C85FD;
        }
      }
    }

    .luns {
      width: 1120px;
      overflow: hidden;
      background: #ffffff;
      margin-top: 1px;

      .lun_list {
        height: 55px;
        display: flex;
        transition: transform 0.35s;

        .l_list {
          width: 139px;
          height: 76px;
          cursor: pointer;
          color: #0b4f62;
          font-size: 15px;
          display: flex;
          justify-content: center;
          line-height: 76px;
          border-top: 3px solid #FFFFFF;
        }

        .datacheck {
          width: 139px;
          height: 76px;
          color: #409eff;
          line-height: 76px;
          background-color: #EDF4FE;
          border-top: 3px solid #409eff;
        }

        .l_list:hover {
          color: #409eff;
        }
      }
    }
  }

  .lunsfiexd {
    margin-top: 130px;
  }

  .take {
    width: 1178px;
    height: 42px;
    line-height: 42px;
    margin: 10px auto 0 auto;
    background: #FAFCFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #F0F0F0;

    .taks_right {
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 14px;
      cursor: pointer;

      .bo_d {
        width: 30%;
        display: flex;

        .bo_dst {
          display: flex;
          cursor: pointer;
          font-size: 12px;
          height: 40px;
          line-height: 40px;
          margin: 0 30px;
          span {
            margin-right: 5px;
            color: #d1d1d1;
          }
          .icon{
            color: #409eff;
          }
        }
      }

      .al_hr {
        display: flex;
        position: relative;
        width: 80%;

        .al_hrt {
          margin-left: 480px;
          display: flex;
          width: 404px;
          text-align: center;
          justify-content: center;

          div {
            margin: 0 auto 0 auto;
          }

          .aiel {
            display: flex;

            .aire {
              min-width: 80px;

              .comboboxs {
                width: 80px;
                color: black;
                background: white;
                position: absolute;
                top: 42px;
                .mixin_boxShow();
                &>div:hover{
                  color:#409eff ;
                }
              }
            }

            .model {
              min-width: 80px;
              text-align: center;
              position: relative;
              margin-left: 20px;
              .combobos {
                width: 80px;
                color: black;
                background: white;
                position: absolute;
                top: 42px;
                .mixin_boxShow();
                &>div:hover{
                  color:#409eff ;
                }
              }
            }
          }
        }
      }


      .fitus {
        font-size: 14px;
      }
    }
  }

  .airlines {
    width: 1180px;
    height: 580px;
    margin: 0 auto 10px auto;
    background: #ffffff;
  }

  .airline {
    width: 1180px;
    margin: auto;
    background: #ffffff;

    .section {
      width: 1180px;
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
            width: 33%;
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
            .trainsc_s_r{
              &>div{
                .mixin_displayBox(@jc:flex-end);
              }
            }

            .trainsc_s_s {
              width: 70%;
              color: #d2dde7;
              text-align: center;
              letter-spacing: 0.16px;
              height: 26px;
               background: url('../../../../static/image/home/arrow.png') bottom no-repeat;
            }
            .nonstop{
              height: 48px;
            }
          }

          .trainsc_r {
            width: 40%;

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
                color: #FF8205;

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
      width: 20%;

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
  .shidisc{
    line-height: 74px;
  }

    .reserve_lefts {
      font-size: 14px;
      cursor: pointer;
      padding-right: 254px;
     height: 74px;
     line-height: 74px;
      .spana {
        color: #3C85FD;
        cursor: pointer;
        margin-right: 14px;
      }
    }

    .reserve_cen {
      display: flex;
      font-size: 14px;

      .shidisc {
        color: #333333;
        width: 170px;
        font-family: MicrosoftYaHei;
        padding-right: 180px;
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
      justify-content: center;
      padding: 0 20px;

      .shidiss {
        color: #FF8205;
        font-size: 24px;
        width: 100px;
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
        background: #3C85FD;
        line-height: 32px;
        border-radius: 4px;
        color: #ffffff;
      }

      .but:hover {
        opacity: 0.8;
      }
    }
   
  }
  .reserve:hover{
    background: #fafbfd;
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
}
</style>
