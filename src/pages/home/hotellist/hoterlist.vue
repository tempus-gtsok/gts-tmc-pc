<template>
  <div class="hotslist" id="info">
    <div class="hotbox" v-if="isget">
      <div class="hotitle">
        <div class="hotls">{{ hotlist.resName }}</div>
        <div class="resGrades">
          <div class="resGrs" v-for="(items, index) in datalist.resGr" :key="index">
            <div class="iconfont" style="font-size: 17px;color: #FF9600;margin-bottom: 10px;">&#xe63f;</div>
          </div>
        </div>
      </div>
      <div class="hotadress"><span class="iconfont" style="color: #3F85FE;font-size: 15px;">&#xe614;</span>
        {{ hotlist.provName }}
        {{ hotlist.sectionName }} {{ hotlist.address }}
      </div>
      <div class="hot_tos" v-if="hot_tos!=undefined && hot_tos.length > 0">
        <div class="hots_ps">
          <div class="hotle_ft" :style="imgs_left" @click="dialogVisible = true" v-if="hot_tos.length > 0">
            <img :src="hot_tos[0].imageUrl" alt=""/>
            <div class="hot_leng">共{{ hot_tos.length }}张</div>
          </div>
          <div class="hotle_rt">
            <div @click="dialogVisible = true" class="hotlimbx" v-for="(item, index) in hot_tos" :key="index"
                 v-if="index < 6">
              <img :src="item.imageUrl" :style="imgs_right" alt=""/>
            </div>
          </div>
        </div>
        <div class="hot_maps" v-if="plugin.length > 0">
          <el-amap vid="amap" :zoom="zoom" :plugin="plugin" class="amap-demo" :center="center">
            <el-amap-marker vid="marker" :position="center"></el-amap-marker>
          </el-amap>
        </div>
      </div>
      <div class="feix_cl" v-if="dialogVisible" @click="dialogVisible = false">
        <div class="feix_list" @click.stop>
          <div class="resls">
            <div></div>
            <div class="ficonfs" @click="dialogVisible = false"><span class="iconfont"
                                                                      style="font-size: 24px;">&#xe620;</span></div>
          </div>
          <div class="fe_tops">
            <div class="fe_list">
              <div class="fe_dv" @click="tosclik(item, index)" :class="tosid == index ? 'fe_dvs' : ''" :key="index"
                   v-for="(item, index) in tos_sus">
                {{ lipoth(item) }}
              </div>
            </div>
          </div>
          <div class="btnimgs">
            <div class="fximg"><img :src="hotck_ptlist[plindex].imageUrl" alt=""/></div>
            <div class="feximgs">
              <div class="fimgsli" :class="plindex == inds ? 'fimgslis' : ''" @click="plindex = inds"
                   v-for="(it, inds) in hotck_ptlist"
                   :key="inds">
                <img :src="it.imageUrl" alt=""/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hot_btns">
      <div class="hbtnle">
        <div class="maoNav">
          <a v-for="(item , index) in maoNav" :key="index" :class="{activeClass:activeIndex == index}" @click="navClick(item , index)">{{item.text}}</a>
        </div>
        <div class="ht_time">
          入住时间
          <div class="timeist">
            <el-date-picker style="width: 100%;" value-format="yyyy-MM-dd" v-model="traitime" type="daterange"
                            range-separator="至" start-placeholder="入店日期" :disabled="isblcks == 1" end-placeholder="离店日期"
                            :editable="false"
                            :clearable="false" @change="tiemdat" :picker-options="pickerOptions"></el-date-picker>
          </div>
          <div style="color: #666666;">
            共{{ timenum }}晚
          </div>
          <div class="btsearch" @click="hotelProList">
            重新搜索
          </div>

        </div>
        <div class="hotfxlist" id="bedType" v-loading="loading">
          <div class="hots_boxs" v-for="(its, ins) in hotelProLists" :key="ins">
            <div class="hot_tps">
              <div class="hot_fotm"><img :src="its.imgUrl" alt=""/></div>
              <div class="hot_name">
                <div style="color: #333333;font-size: 16px;font-weight: 600;">{{ its.resProName }}</div>
                <div v-if="its.resProBaseInfoList.length > 0">{{ its.resProBaseInfoList[0].roomFeature }}</div>
              </div>
            </div>
            <div class="hot_ls">
              <div>产品名称</div>
              <div>床型</div>
              <div>早餐</div>
              <div>首日价</div>
              <div>政策</div>
              <div>预订</div>
            </div>
            <div class="hot_lst" v-for="(items, inds) in its.resProBaseInfoList" :key="inds"
                 :style="inds == 0 ? { border: 0 } : ''">
              <div>{{ items.supPriceName }}</div>
              <div>
                <el-tooltip class="item" effect="dark" :content="items.bedTypeName " placement="right">
                  <p class="now">{{ items.bedTypeName }}</p>
                </el-tooltip>
              </div>
              <div>{{ items.breakfast }}</div>
              <div>￥{{ items.firPrice }}</div>
              <div>
                <div class="cancelables">
                  {{ cancel(items.cancelable) }}
                </div>
              </div>
              <div>
                <div class="hotbtns" @click="hoteadd(its, items)" v-if="items.bookStatus != 0 ">
                  预订
                </div>
                <div class="hotbtns_two" v-if="items.bookStatus === 0 ">
                  售空
                </div>
              </div>
            </div>
          </div>
          <div v-if="hotelProLists.length == 0 && this.codes == 200" class="hotel-noData">
            <img src="static/image/noData.png">
          </div>
        </div>
      </div>
      <div class="hbtnri">
        <p class="fon_we">酒店介绍</p>
        <div>
           <p class="fon_we">酒店电话：</p>
        <p class="fon_fi">{{ hotlist.resPhone }}</p>
        </div>
        <div v-if="hotlistintro!=''" class="fon_fi" v-html="hotlistintro"></div>
        <div v-else class="fon_fi">暂无数据</div>
      </div>
    </div>
    <div class="staleve" v-if="staleve" @click="staleve = false">
      <div class="stalist" @click.stop>
        <div class="scloos">
          <div class="statop" v-for="(item, index) in nativeTrainl" :key="index">
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
                        <el-select v-model="items.reasons" placeholder="请选择" :popper-append-to-body="false">
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
          <div class="btnok" @click="cits_btn">继续预订</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoData from "@/components/common/noData";

export default {
  components: {NoData},
  data() {
    return {
      imgs_left: {
        height: '12px'
      },
      imgs_right: {
        width: '10px',
        height: '10px'
      },
      timenum: 0,
      hotlistintro: '',
      nativeTrainl: [], //违规信息
      nativeTrainRules: {},
      notbooking: false, //违规不能继续
      idstarle: false, //违规必须原因
      staleve: false, //是否有违规信息
      rulesReasons: [], //违规原因
      isblckt: false, //是否事前2次审批
      astlis: {}, //当前房型
      isarsrl: false, //用户是否免审
      plindex: 0,
      tosid: 0,
      loading: false,
      dialogVisible: false,
      center: [121.59996, 31.197646],
      plugin: [],
      hots_pk: {},
      tos_sus: [], //照片类型
      zoom: 16,
      isblcks: '',
      isget: false, //判断页面是否有数据
      datalist: {}, //上个页面穿的值
      hotlist: {}, //当前酒店详情
      hot_tos: null, //酒店照片
      hotelProLists: [], //房型
      hotck_ptlist: [], //当前选择查看的图片
      traitime: [],
      channelData: null,
      totalRebateRateProfit: '',
      pickerOptions: {
        //最小时间限制
        disabledDate: time => {
          return this.dealDisabledDate(time);
        }
      },
      codes: 0,
      maoNav:[
        {
          text:'床型',
          url:'#bedType'
        },
        {
          text:'酒店介绍',
          url:'#introduce'
        },
      ],
      activeIndex:-1,
    };
  },
  mounted() {
    let lis = JSON.parse(this.$route.query.data); //获取上个页面传入的参数
    this.isblcks = lis.isblcks || '';
    this.traitime = lis.timedate || '';
    this.datalist = lis;
    this.hotselist();
    this.hotelProList();
    this.timenum = this.count(lis.timedate[0], lis.timedate[1]);
    let bigwidth = parseInt((document.body.clientWidth * 0.8 - 40) * 0.59); //左边大图宽度
    this.imgs_left.height = parseInt(bigwidth * 0.65) + 'px';
    this.imgs_right.width = parseInt(bigwidth * 0.26) + 'px';
    this.imgs_right.height = parseInt(parseInt(bigwidth * 0.34) * 0.62) + 'px';
  },
  methods: {
    navClick(item , index){
      this.activeIndex = index
       let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果
      if(index == 0){
          document.body.scrollTop = document.documentElement.scrollTop = top = 650;
       }else{
         let scr = document.getElementById("info")
           document.body.scrollTop = document.documentElement.scrollTop = top =  scr.scrollHeight;
       }
    },
    escape2Html(str) {
      var arrEntities = {
        lt: '<',
        gt: '>',
        nbsp: ' ',
        amp: '&',
        quot: '"'
      };
      return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (all, t) {
        return arrEntities[t];
      });
    },
    count(ti, ts) {
      let date1 = new Date(ti);
      let date2 = new Date(ts);
      let date = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24); /*不用考虑闰年否*/
      return date
    },
    infotss(it) {
      return this.escape2Html(it).replace(/\<br\>\<br\>/g, '\<br\/\>');
    },
    cits_btn() {
      let plallist = this.nativeTrainl;
      for (let p in this.nativeTrainRules) {
        for (let i in this.nativeTrainRules[p]) {
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
            this.nativeTrainRules[p][i] = {
              usernames: this.nativeTrainRules[p][i],
              reasons: resion
            };
          }
        }
      }
      this.othotrlis();
    },
    othotrlis() {
      let datast = {
        hots: {
          pothos: this.hots_pk.imgUrl,
          supPriceName: this.astlis.supPriceName,
          breakfastCount: this.astlis.breakfastCount,
          roomFeature: this.astlis.roomFeature,
          supplierType: this.astlis.supplierType,
          hotelCode: this.astlis.hotelCode,
          proId: this.astlis.proId,
          ratePlanCode: this.astlis.ratePlanCode,
          vendorCode: this.astlis.vendorCode,
          productUniqueId: this.astlis.productUniqueId,
          bedTypeName: this.astlis.bedTypeName,
          firPrice: this.astlis.firPrice,
          activityId: this.astlis.activityId,
          guaranteeMode: this.astlis.guaranteeMode,
          resId: this.astlis.resId,
          rateCodeType: this.astlis.rateCodeType,
          channelData: this.channelData
        }, //当前房屋信息
        hots_pk: this.hots_pk,
        limit: this.nativeTrainRules, //违规信息
        datlist: this.datalist, //出差人员
        datatiem: this.traitime, //当前的时间
        datalist: {
          hotelImg: this.hotlist.imgUrl,
          resName: this.hotlist.resName,
          resId: this.datalist.hotelCode,
          cityName: this.hotlist.cityName,
          address: this.hotlist.address,
          resPhone: this.hotlist.resPhone
        }, //当前酒店信息
        isarsrl: this.isarsrl, //是否免审
        isblckt: this.isblckt //事前是否2次审批
      };
      if (this.astlis.supplierType == 11){
        datast.hots['totalRebateRateProfit'] = this.totalRebateRateProfit;
      }
      this.$router.push({
        path: '/hotersadd',
        query: {
          data: JSON.stringify(datast)
        }
      });
    },
    hoteadd(item, its) {
        //预订判断是否违规
        this.isblckt = false;
        this.hots_pk = item; //当前酒店信息
        this.astlis = its; //当前房型信息
        this.channelData = its.channelData;
        this.totalRebateRateProfit = its.totalRebateRateProfit;
        if (this.datalist.isbtd == 1 && (this.datalist.isblcks == 2 || this.datalist.isblcks == 1)) {
          //因公并且事中
          let ast = [];
          let arr = [];
          let sarr = this.datalist.butalist; //出差旅客

          for (let i = 0; i < sarr.length; i++) {
            arr.push(sarr[i].passengerNo);
            ast.push({
              passengerNo: sarr[i].passengerNo
            });
          }
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
          let dat = {
            travelCity: this.datalist.city[0].name,
            resGradeId: this.hotlist.resGradeId,
            firPrice: its.firPrice,
            passengerList: ast
          };
          this.loading = true;

          this.$api.home
              .checkHotelRules(dat)
              .then(res => {
                this.loading = false;
                if (res.code == 200) {
                  //1=只记录不提示，2=提示违规不必选择原因，3=提示违规必选原因，4=不可预订
                  if (JSON.stringify(res.data.result) == '{}') {
                    //没有违反政策直接跳到预订页面
                    this.othotrlis(); //跳转订单页面
                  } else {
                    let dal = res.data.result; //违规信息
                    this.nativeTrainRules = dal;
                    this.nativeTrainl = [];
                    this.notbooking = false;
                    this.isblckt = false;
                    for (let k in dal) {
                      this.nativeTrainl.push({
                        index: 0,
                        name: this.platnams(k),
                        names: k,
                        list: this.platname(dal[k])
                      });
                    }
                    for (let p in this.nativeTrainl) {
                      for (let k in this.nativeTrainl[p].list) {
                        if (this.nativeTrainl[p].list[k].va == 4) {
                          this.notbooking = true;
                        }
                        if (this.nativeTrainl[p].list[k].va == 5) {
                          this.isblckt = true; //是否再次审批
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
              })
              .catch(e => {
                console.log(e);
                this.loading = false;
              });
        } else {
          this.othotrlis(); //跳转订单页面
        }
    },
    platnams(name) {
      if (name == 'highLimit') {
        return '酒店高价违规';
      } else if (name == 'starLevelLimit') {
        return '酒店星级违规';
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
            name: '违规不必选择原因',
            list: list[k]
          });
        } else if (k == 3) {
          su.push({
            va: k,
            name: '违规必选原因',
            list: list[k],
            reasons: ''
          });
        } else if (k == 4) {
          su.push({
            va: k,
            name: '不可预订',
            list: list[k]
          });
        } else if (k == 5) {
          su.push({
            va: k,
            name: '违规再次审批',
            list: list[k]
          });
        }
      }
      return su;
    },
    cancel(it) {
      if (it == 'True') {
        return '可以取消';
      } else if (it == 'False') {
        return '不可取消';
      } else {
        return '条件取消';
      }
    },
    dealDisabledDate(time) {
      //禁掉小于当前日期
      var times = Date.now();
      return time.getTime() < times - 8.64e7;
    },
    tiemdat() {
      //时间选择
      this.datalist.timedate = this.traitime;
      this.timenum = this.count(this.traitime[0], this.traitime[1]);
      this.hotelProList();
    },
    hotelProList() {
      //查询当前酒店房型
      this.loading = true;
      this.codes = '';
      this.hotelProLists = [];
      this.$api.home
          .hotelProList({
            checkinDate: this.datalist.timedate[0],
            checkoutDate: this.datalist.timedate[1],
            hotelCode: this.datalist.hotelCode,
            searchHotelType: this.datalist.searchHotelType
          })
          .then(res => {
            if (res.code == 200) {
              this.codes = res.code;
              this.hotelProLists = res.data;
              this.loading = false;
            } else {
              this.loading = false;
              this.$message({
                message: res.message,
                type: 'warning'
              });
            }
          })
          .catch(r => {
            this.loading = false;
            console.log(r);
          });
    },
    tosclik(item, index) {
      this.plindex = 0;
      this.tosid = index;
      this.hotck_ptlist = [];
      for (let k in this.hot_tos) {
        if (this.hot_tos[k].imageLabel == item) {
          this.hotck_ptlist.push(this.hot_tos[k]);
        }
      }
    },
    hotselist() {
      //获取当前酒店详情
      this.$api.home
          .toHotelDetail({
            checkinDate: this.datalist.timedate[0],
            checkoutDate: this.datalist.timedate[1],
            hotelCode: this.datalist.hotelCode
          })
          .then(res => {
            if (res.code == 200) {
              this.isget = true;
              this.hotlist = res.data.hotel; //当前酒店详情
              this.center = res.data.hotel.resGpsLocation;
              this.rulesReasons = res.data.rulesReasons; //违规原因
              this.hotlistintro = this.infotss(res.data.hotel.shortIntro);
            } else {
              this.$message({
                message: res.message,
                type: 'warning'
              });
            }
          })
          .catch(r => {
            console.log(r);
          });
      this.$api.home
          .searchHotelPicture({
            searchHotelType: this.datalist.searchHotelType,
            hotelCode: this.datalist.hotelCode
          })
          .then(res => {
            if (res.code == 200) {
              this.hot_tos = res.data || []; //当前酒店图片
              let tos_su = [];
              for (let k in this.hot_tos) {
                if (tos_su.length > 0) {
                  if (!tos_su.includes(this.hot_tos[k].imageLabel)) {
                    tos_su.push(this.hot_tos[k].imageLabel);
                  }
                } else {
                  tos_su.push(this.hot_tos[k].imageLabel);
                }
              }
              this.tos_sus = tos_su;
              this.tosclik(this.tos_sus[0], 0);
            } else {
              this.$message({
                message: '查询酒店图片异常',
                type: 'warning',
                duration: 1000
              });
            }
          })
          .catch(r => {
            this.loading = false;
            console.log(r);
          });
    },
    lipoth(name) {
      //图片类型
      if (name == 1) {
        return '外观';
      } else if (name == 2) {
        return '大厅';
      } else if (name == 3) {
        return '周边';
      } else if (name == 4) {
        return '房型';
      } else if (name == 5) {
        return '浴室';
      } else if (name == 6) {
        return '餐厅';
      } else if (name == 7) {
        return '会议室';
      } else if (name == 8) {
        return '休闲';
      } else if (name == 9) {
        return '公共区域';
      } else if (name == 10) {
        return '游泳池';
      } else if (name == 11) {
        return '健身房';
      } else if (name == 12) {
        return '酒吧/休息室';
      } else if (name == 13) {
        return '客房设施';
      } else if (name == 14) {
        return '酒店设施';
      } else if (name == 14) {
        return '其他';
      } else {
        return name;
      }
    }
  }
};
</script>

<style scoped lang="less">
img {
  cursor: pointer;
}

.hotslist {
  width: 1160px;
  margin: 0 auto;

  .hotbox {
    width: calc(100% - 36px);
    margin: 20px 0;
    padding: 20px 16px 20px 20px;
    background-color: #ffffff;
    border-radius: 4px;

    .hotitle {
      display: flex;
      line-height: 30px;

      .hotls {
        font-size: 20px;
        margin-right: 10px;
        font-weight: bold;
        font-family: MicrosoftYaHei-Bold;
      }

      .resGrades {
        display: flex;
        height: 30px;

      }
    }

    .hotadress {
      display: flex;
      align-items: center;
      margin: 6px 0 10px 0;
      font-size: 14px;
      color: #666666;
    }

    .hot_tos {
      width: 100%;
      display: flex;

      .hots_ps {
        width: 100%;
        display: flex;
        padding: 4px 0;

        .hotle_ft {
          width: 60.2%;
          margin-right: 16px;
          overflow: hidden;
          position: relative;
          background-color: #CCCCCC;
          height: 442px!important;
          .hot_leng {
            position: absolute;
            cursor: pointer;
            text-align: right;
            width: calc(100% - 20px);
            padding-right: 20px;
            line-height: 44px;
            font-size: 14px;
            bottom: 0px;
            right: 0px;
            background-color: rgba(0, 0, 0, 0.5);
            color: #ffffff;
          }

          img {
            width: 100%;
            height: 100%;
          }
        }

        .hotle_rt {
          width: calc(43% - 10px);
          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;

          .hotlimbx {
             width: 48.9%!important;
            background-image: url('/static/image/occupationmap.png');
            background-size: 100%;
            margin-right: 10px;
            margin-bottom: 10px;
            height: 141px;
            &>img{
              width: 100%!important;
              height: 100%!important;
            }
          }
          &>.hotlimbx:nth-child(2n){
            margin: 0;
          }
          &>.hotlimbx:nth-child(5){
            margin-bottom: 0;
          }
        } 
      }

    }

    .feix_cl {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 4000;
      background-color: rgba(0, 0, 0, 0.5);
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .feix_list {
        border-radius: 5px;
        background-color: #ffffff;
        padding: 20px;

        .resls {
          width: 100%;
          display: flex;
          justify-content: space-between;

          .ficonfs {
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #d1dbe5;
            cursor: pointer;
          }

          .ficonfs:hover {
            transform: rotate(30deg);
          }
        }

        .fe_tops {
          width: 100%;
          display: flex;
          justify-content: center;
          border-bottom: 2px solid #d1dbe5;

          .fe_list {
            display: flex;

            .fe_dv {
              color: #d1dbe5;
              padding: 0px 20px;
              line-height: 40px;
              font-size: 14px;
              border-bottom: 4px solid #ffffff;
              cursor: pointer;
            }

            .fe_dvs {
              color: #007aff;
              border-bottom: 4px solid #007aff;
            }
          }
        }

        .btnimgs {
          display: flex;
          margin-top: 20px;

          .fximg {
            width: 550px;
            height: 410px;
            margin: 5px;
            background-color: #CCCCCC;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .feximgs {
            width: 360px;
            height: 420px;
            overflow-y: scroll;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;

            .fimgsli {
              width: 100px;
              height: 70px;
              margin: 5px;
              background-image: url('/static/image/occupationmap.png');
              background-size: 100%;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .fimgslis {
              border: 1px solid #007aff;
            }
          }
        }
      }
    }
  }

  .hot_btns {
    width: 100%;
    .mixin_displayBox(@fd:column);

    .hbtnle {
      width: 1160px;
      border-radius: 4px;
      background: #fff;
      .maoNav{
        display: flex;
        width: 100%;
        background: #fff;
        border-bottom: 1px solid #EFEFEF;
        &>a{
          width: 136px;
          height: 46px;
          text-align: center;
          line-height: 46px;
          cursor: pointer;
          color: #333;
          font-size: 16px;
        }
        &>.activeClass{
          background: #3C85FD;
          color: #fff;
        }
      }
      .ht_time {
        display: flex;
        color: #CCCCCC;
        font-size: 14px;
        align-items: center;
        width: calc(100% - 40px);
        padding: 20px;
        background-color: #ffffff;

        .timeist {
          width: 60%;
          margin: 0 20px;
        }

        .btsearch {
          width: 90px;
          line-height: 32px;
          color: #FFFFFF;
          text-align: center;
          font-weight: 600;
          margin-left: 30px;
          background-color: #ff7f00;
          border-radius: 3px;
          cursor: pointer;
        }

        .btsearch:hover {
          opacity: 0.8;
        }
      }

      .hotfxlist {
        width: 100%;
        min-height: 500px;

        .hotel-noData {
          font-size: 30px;
          color: red;
          margin-top: 20%;
          text-align: center
        }

        .hots_boxs {
          width: calc(100% - 40px);
          padding: 20px;
          background-color: #ffffff;
          margin-top: 10px;

          .hot_tps {
            display: flex;

            .hot_fotm {
              width: 144px;
              height: 94px;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .hot_name {
              color: #666666;
              text-indent: 14px;
              line-height: 40px;
              font-size: 14px;
            }
          }

          .hot_ls {
            margin-top: 20px;
            display: flex;
            background: #f3f5f9;
            font-size: 14px;
            line-height: 50px;
            color: #333333;
            font-weight: 600;
            text-align: left;
            padding:0 48px;
            div:nth-child(1) {
              width: 300px;
            }

            div:nth-child(2) {
              flex: 1;
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
              width: 80px;
            }
          }

          .hot_lst {
            display: flex;
            font-size: 14px;
            line-height: 60px;
            color: #333333;
            border-top: 1px dashed #CCCCCC;
            text-align: left;
            padding:0 48px;
            .now {
              width: 160px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            div:nth-child(1) {
              border: 0;
              width: 300px;
            }

            div:nth-child(2) {
              flex: 1;
            }

            div:nth-child(3) {

              flex: 1;
            }

            div:nth-child(4) {
              flex: 1;
              color: #ff6600;
              font-size: 16px;

            }

            div:nth-child(5) {
              flex: 1;
              .mixin_displayBox(@jc:flex-start);
              .cancelables {
                width: 72px;
                height: 30px;
                color: #428aff;
                border-radius: 4px;
                border: 1px solid #adcdff;
                line-height: 30px;
                text-align: center;
              }
            }

            div:nth-child(6) {
              width: 80px;
              .mixin_displayBox(@jc:flex-start);
              .hotbtns {
                cursor: pointer;
                width: 80px;
                height: 30px;
                color: #FFFFFF;
                background-color: #3c85fd;
                line-height: 30px;
                border-radius: 3px;
                text-align: center;
              }

              .hotbtns:hover {
                opacity: 0.8;
              }

              .hotbtns_two {
                cursor: pointer;
                text-indent: 0;
                width: 80px;
                height: 30px;
                margin: 15px auto;
                color: #FFFFFF;
                background-color: #a7a4a4;
                line-height: 30px;
                border-radius: 3px;
              }
            }
          }
        }
      }
    }

    .hbtnri {
      margin-top: 10px;
      width: 1120px;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 4px;

      .fon_we {
        line-height: 20px;
        color: #000000;
        font-size: 20px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
      }
      &>div{
        .mixin_displayBox(@jc:flex-start);
        margin: 22px 0;
        &>.fon_we{
          font-size: 14px;
        }
        &>p{
          line-height: 14px;
        }
      }
      .fon_fi {
        line-height: 26px;
        font-size: 14px;
        color: #666;
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
    z-index: 5000;
    display: flex;
    align-items: center;
    justify-content: center;

    .stalist {
      width: 100%;
      border-radius: 18px;

      font-size: 16px;
      line-height: 90px;
      background: #f1f1f1;

      .scloos {
        max-height: 500px;
        overflow: auto;
        z-index: 5000;

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
