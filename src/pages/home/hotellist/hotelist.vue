<template>
  <div class="trainlist">
    <div v-if="fitxd" class="listfoters">

    </div>
    <div class="listfoter" :class="fitxd?'listfiexd':''">
      <div class="form-wrap">
        <div class="stis">
          <div class="sercits">
            <div class="citysleft">
              <citysearchh :issera="isblcks == 1" @changers="listchangs" :ctiys="citylist"></citysearchh>
            </div>
          </div>
          <div class="timeits">
            <div class="sies">入住时间</div>
            <div class="timeist">
              <el-date-picker value-format="yyyy-MM-dd" v-model="traitime" type="daterange" range-separator="至"
                              :disabled="isblcks == 1"
                              start-placeholder="入店日期" end-placeholder="离店日期" :editable="false" :clearable="false"
                              @change="tiemdat"
                              :picker-options="pickerOptions"></el-date-picker>
            </div>
          </div>
          <div class="sercitsk">
            <div class="citysleftk">
              <div class="citycomk">
                <div class="citcom_leftk">
                  <el-input :disabled="isblcks == 1 && hot_cyvals !=''" v-model="hot_cyval" @input="inpu"
                            @focus="foinput" @blur="bluscity"
                            class="inputsk" size="medium" placeholder="酒店名/位置"></el-input>
                </div>
              </div>
              <div class="hotvalsk" @mouseover="isctyslts = true" @mouseleave="isctyslts = false" v-if="hotcityname"
                   v-loading="loading">
                <div class="sectionk" v-for="(item,index) in stlist" :key="index"
                     v-if="stlist.length > 0 && hot_cyval ==''">
                  <div class="city-titlek">{{ item.name }}</div>
                  <div class="city-listk">
                    <div class="city-itemk" v-for="(city, i) in item.list" :key="i" @click="onSelect(city)">
                      {{ city }}
                    </div>
                  </div>
                </div>
                <div class="hotsearchsk" v-for="(items,index) in hotsearch" @click="onSelect(items.name)" :key="index"
                     v-if="hot_cyval !='' && hotsearch.length > 0">
                  <div v-html="items.label"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="btselect" @click="seachlist">
            搜索酒店
          </div>
        </div>
      </div>
    </div>
    <div class="classlist">
      <div class="clsslis" v-for="(item,index) in classlists" :key="index">
        <div class="clefts">
          {{ item.name }}
        </div>
        <div class="svbtns" @click="clocks(index)" :class="item.values.length == 0 ? 'okbtns' :''">不限</div>
        <div class="svlists" @click="ckliop(its,index)" :class="its.istrue == true ? 'okbtns' :''"
             v-for="(its,ins) in item.list" :key="ins">
          {{ its.name }}
        </div>
      </div>
    </div>
    <div class="lists">
      <div class="section" v-loading="loadings">
        <div class="pricedesc">
            <div class="pricedesc-list" v-for="(item,index) in tasktypes" :key="index" @click="taskchangs(item , index)" :class="{activeClass:activeIndex == index}">
              {{item.name}}
            </div>
        </div>
        <div class="selist boxShow" v-for="(item, index) in trainlist" @click="othotrlis(item)" :key="index"
             @mouseover="masp(item)">
          <div class="se_img">
            <img :src="item.titleImg" mode=""></img>
          </div>
          <div class="se_seciont">
            <div class="se_title">{{ item.resName }}</div>
            <div class="se_adress">地址:{{ item.address }}</div>
            <div class="resGrades">
              <div class="" v-for="(items,index) in item.resGr" :key="index">
                <div class="iconfont" style="font-size: 17px;color: #FF9600;">
                  &#xe63f;
                </div>
              </div>
            </div>
          </div>
          <div class="se_right">
            <div class="se_price">￥<span>{{ item.minPrice }}</span><span>起</span></div>
            <div class="se_btns">预定</div>
          </div>
        </div>
         <no-data class="noData" v-if="trainlist.length === 0 && loading === false"></no-data>
      </div>
      <div class="maps" :class="fitxd?'mapsfiexd':''">
        <div :style="{width:'100%',height:'250px'}">
          <el-amap vid="amap" :zoom="zoom" :plugin="plugin" class="amap-demo" :center="center">
            <el-amap-marker vid="marker" :position="center">
            </el-amap-marker>
          </el-amap>
        </div>
      </div>
    </div>

    <div class="block" v-if="totalPatge > 1">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="curPages" :page-size="10"
                     layout="prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import citysearchh from '@/components/common/citycomponents_h.vue';
import NoData from "@/components/common/noData";
export default {
  data() {
    return {
      curPages: 1, //当前第几页
      center: [121.59996, 31.197646],
      classlists: [{
        name: '价格',
        values: [],
        list: [{
          name: '￥150以下',
          istrue: false,
          value: {
            priceFrom: 0,
            priceTo: 150
          }
        }, {
          name: '￥150-300',
          istrue: false,
          value: {
            priceFrom: 150,
            priceTo: 300
          }
        }, {
          name: '￥300-450',
          istrue: false,
          value: {
            priceFrom: 300,
            priceTo: 450
          }
        }, {
          name: '￥450-600',
          istrue: false,
          value: {
            priceFrom: 450,
            priceTo: 600
          }
        }, {
          name: '￥600以上',
          istrue: false,
          value: {
            priceFrom: 600,
            priceTo: 5000000
          }
        }]
      }, {
        name: '星级',
        values: [],
        list: [{
          name: '二星级以下/经济',
          istrue: false,
          value: '34'
        }, {
          name: '三星/舒适',
          istrue: false,
          value: '27,32'
        }, {
          name: '四星/高档',
          istrue: false,
          value: '24,30'
        }, {
          name: '五星/豪华',
          istrue: false,
          value: '23,28'
        }]
      }],
      tasktypes: [
        { //排序类型
          id: 'bookTimes_asc',
          name: '推荐排序'
        }, {
          id: 'minPrice_asc',
          name: '价格从高到低'
        }, {
          id: 'minPrice_desc',
          name: '价格从低到高'
        }, {
          id: 'resGrade_asc',
          name: '酒店星级从高到低'
        }, {
          id: 'resGrade_desc',
          name: '酒店星级从低到高'
        }
      ],
      plugin: [],
      zoom: 16,
      total: 0, //多少条数据
      isctyslts: false,
      isblcks: JSON.parse(this.$route.query.data).isblcks,
      hot_cyval: JSON.parse(this.$route.query.data).cityval, //酒店关键词
      hot_cyvals: '',
      hotsearch: [], //酒店关键词搜索
      hotcltys: JSON.parse(this.$route.query.data).city, //酒店选择城市
      hotcityname: false,
      totalPatge: 0, //总共多少页
      searchHotelType: '',
      stlist: [], //酒店关键词 商圈
      fitxd: false, //头部是否定位
      ruliset: "",
      roteslist: {}, //上个页面的参数
      astlis: {}, //当前酒店信息
      trainlis: {}, //当前酒店信息
      isarsrl: false, //改签因公是否需要审核、
      butalist: [], //出行人
      higrail: true,
      loading: false,
      loadings: false,
      trainlist: [],
      reconaid: 'bookTimes_asc', //推荐排序
      trainlists: [],
      datatime: '', //出发时间
      traitime: JSON.parse(this.$route.query.data).timedate,
      citylist: JSON.parse(this.$route.query.data).city,
      levecllist: [],
      priceFromTo: [], //价格
      pickerOptions: {
        disabledDate: time => {
          return this.dealDisabledDate(time);
        }
      },
      activeIndex:0,
    };
  },
  components: {
    citysearchh,
    NoData
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  mounted() {
    this.hot_cyvals = JSON.parse(this.$route.query.data).cityval;
    window.addEventListener('scroll', this.handleScroll)
    let lis = JSON.parse(this.$route.query.data); //获取上个页面传入的参数
    this.roteslist = lis;
    this.butalist = lis.butalist; //出差旅客
    this.datatime = lis.timedate;
    this.trainlistst();
  },
  methods: {
    taskchangs(item , index) {
      this.activeIndex = index
      this.reconaid = item.id
      this.trainlistst();
    },
    ckliop(its, index) {
      this.curPages = 1;
      if (its.istrue == false) {
        its.istrue = true;
        this.classlists[index].values.push(its.value);
        this.trainlistst();
      } else {
        its.istrue = false;
        for (let k = 0; k < this.classlists[index].values.length; k++) {
          if (this.classlists[index].values[k] == its.value) {
            this.classlists[index].values.splice(k, 1)
          }
        }
        this.trainlistst();
      }
    },
    clocks(index) {
      if (this.classlists[index].values.length != 0) {
        this.classlists[index].values = [];
        let suli = this.classlists[index].list;
        for (let k in suli) {
          suli[k].istrue = false;
        }
        this.curPages = 1;
        this.trainlistst();
      }
    },
    masp(item) {
      this.center = item.resPosition ||  [121.59996, 31.197646];
    },
    handleCurrentChange(val) { //翻页
      this.curPages = val;
      this.trainlistst();
    },
    foinput() { //判断酒店搜索是否有城市
      if (this.hotcltys.length > 0 && this.hot_cyval == '') {
        this.hotcityname = true;
        this.st_right_list();
      }
    },
    bluscity() {
      if (!this.isctyslts) {
        this.hotcityname = false
      }
    },
    onSelect(val) { //选择当前搜索关键词
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
            .getCityNames({
              'cityName': that.hotcltys[0].name,
              keyword: that.hot_cyval
            })
            .then(res => {
              that.loading = false;
              if (res.code == 200) {
                that.hotsearch = res.data;
              } else {
                that.$message({
                  message: res.message,
                  type: 'warning'
                })
              }
            }).catch(e => {
          console.log(e)
          that.loading = false;
        })
      }
    },
    async st_right_list() { //回显酒店信息
      let that = this;
      that.loading = true;
      that.$api.home
          .getCityDetail({
            'cityCode': that.hotcltys[0].name
          })
          .then(res => {
            that.loading = false;
            if (res.code == 200) {
              that.stlist.push({
                name: '行政区',
                id: 1,
                isclk: false, //打开还是关闭
                oken: false, //是否超过6个
                list: res.data.cityArea //值
              })
              that.stlist.push({
                name: '机场车站',
                id: 2,
                isclk: false, //打开还是关闭
                oken: false, //是否超过6个
                list: res.data.cityAirRailWay //值
              })
              that.stlist.push({
                name: '商圈',
                id: 3,
                isclk: false, //打开还是关闭
                oken: false, //是否超过6个
                list: res.data.cityBusinessSectionInfo //值
              })
              that.stlist.push({
                name: '地铁',
                id: 3,
                isclk: false, //打开还是关闭
                oken: false, //是否超过6个
                list: res.data.citySubWay //值
              })
              that.stlist.push({
                name: '品牌',
                id: 3,
                isclk: false, //打开还是关闭
                oken: false, //是否超过6个
                list: that.hotelb(res.data.hotelBrands) //值
              })
            }
          }).catch(e => {
        console.log(e)
        that.loading = false;
      })
    },
    hotelb(item) { //返回商圈的值
      let su = []
      for (var i = 0; i < item.length; i++) {
        su.push(item[i].hotelBrandName)
      }
      return su
    },
    listchangh(va) { //酒店城市
      this.hotcltys = va;
    },
    handleScroll() { //滚动条监听事件
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 60) {
        this.fitxd = true;
      } else {
        this.fitxd = false;
      }
    },
    othotrlis(item) { //跳转预定页面
      this.roteslist.city = this.hotcltys;
      this.roteslist.cityval = this.hot_cyval;
      this.roteslist.timedate = this.traitime;
      this.roteslist['hotelCode'] = item.id;
      this.roteslist['resGr'] = item.resGr;
      this.roteslist['searchHotelType'] = this.searchHotelType;
      this.$router.push({
        path: '/hoterlist',
        query: {
          data: JSON.stringify(this.roteslist)
        }
      });
    },

    seachlist() { //搜索
      this.trainlistst();
    },
    datachencks(it) { //点击时间
      this.traitime = it;
      this.datatime = it;
      this.seachlist();
    },
    tiemdat() {
      //时间选择
      this.datatime = this.traitime;
      this.seachlist();
    },
    listchangs(e) {
      this.hotcltys = e;
      this.seachlist();
    },
    timey(time) {
      //时分
      let dat = parseInt(time / 60);
      let sti = '';
      if (time > dat * 60) {
        sti = time - dat * 60;
        return dat + '时' + sti + '分';
      } else {
        return dat + '时';
      }
    },
    selvlist(it) {
      if (it.length == 0) {
        return ['-1']
      } else {
        let strit = it.join(',');
        return [strit]
      }
    },
    resGrade(item) {
      if (['37', '32', '34'].includes(item)) {
        return 2
      } else if (['26', '31'].includes(item)) {
        return 3
      } else if (['24', '30'].includes(item)) {
        return 4
      } else if (['23', '28'].includes(item)) {
        return 5
      } else {
        return 1
      }
    },
    trainlistst() {
      this.trainlist = [];
      this.priceFromTo = this.classlists[0].values;//价格
      this.levecllist = this.classlists[1].values;//星级
      let obj = {
        cityCode: this.hotcltys[0].name,
        keyword: this.hot_cyval,
        begin: this.traitime[0],
        end: this.traitime[1],
        pageCount: this.curPages,
        rowCount: 10,
        orderBy: [this.reconaid],
        searchCondition: {
          hotelLevelList: this.selvlist(this.levecllist), //星级
          priceFromToList: this.priceFromTo //价格
        }
      }
      this.loadings = true;
      this.$api.home
          .sortHotelList(obj)
          .then(res => {
            this.loadings = false;
            if (res.code == 200) {
              this.searchHotelType = res.data.searchHotelType;
              this.total = res.data.totalCount; //一共多少条
              this.totalPatge = res.data.totalPatge; //总共多少页
              this.trainlist = res.data.responseResult; //默认加载的数据
              this.center  = res.data.responseResult[0].resPosition || [121.59996, 31.197646]
              for (let i in this.trainlist) {
                this.trainlist[i]['resGr'] = this.resGrade(this.trainlist[i].resGrade);
              }
            } else {
              this.$message({
                message: res.message,
                type: 'warning'
              });
            }
          }).catch(e => {
        console.log('获取数据失败', e);
      });
    },
    tim(time) { //补0
      if (time < 10) {
        return '0' + time
      } else {
        return time
      }
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
.trainlist {
  width: 100%;

  .listfoters {
    width: 100%;
    height: 95px;
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
          width: 21%;
          height: 40px;
          .citysleft {
            border-radius: 3px;
            width: 100%;
            &>.citycom{
              line-height: 38px;
            }
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
            width: 14%;
          }

          /deep/ .timeist {
            flex: 1;
             &>.el-input__inner{
              width: 100%;
            } 
          }
        }

        .sercitsk {
          width: 17%;

          .citysleftk {
            border-radius: 3px;
            width: 100%;
            position: relative;

            .citycomk {
              position: relative;
              width: 100%;
              display: flex;
              height: 65px;
              line-height: 65px;
              color: #abb7c2;

              .citcom_leftk {
                width: 100%;
                display: flex;
                .sttextk {
                  width: 70px;
                  font-size: 14px;
                  text-align: center;
                }

                .inputsk /deep/ .el-input__inner {
                  font-size: 16px;
                  height: 40px;
                  line-height: 40px;
                }
              }
            }

            .hotvalsk {
              position: absolute;
              left: 0;
              top: 70px;
              width: 500px;
              max-height: 500px;
              min-height: 300px;
              overflow-y: scroll;
              background: #FFFFFF;
              box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
              z-index: 999;

              .sectionk {
                margin-top: 10px;

                .city-titlek {
                  line-height: 30px;
                  color: #949494;
                  font-size: 14px;
                  text-indent: 15px;
                }

                .letterk {
                  width: 100%;
                  height: 22px;
                  text-indent: 15px;
                  color: #434c51;
                  background-color: #ffffff;
                  font-size: 14px;
                  line-height: 22px;
                }

                .city-listk {
                  display: flex;
                  flex-wrap: wrap;
                  padding: 15px 0 0 14px;

                  .city-itemk {
                    padding: 0 10px;
                    height: 20px;
                    line-height: 20px;
                    color: #000000;
                    font-size: 15px;
                    cursor: pointer;
                  }

                  .city-itemk:hover {
                    color: #007AFF;
                  }
                }
              }

              .hotsearchsk {
                line-height: 25px;
                text-indent: 10px;
                font-size: 14px;
                cursor: pointer;
              }

              .hotsearchsk:hover {
                color: #007AFF;
              }
            }
          }

        }

        .btselect {
           margin-left: 1.25%;
					.mixin_bottonTrue(@width:162px,@height:38px,@bg:#FF9A35,@cl:#fff,@pd:0, @fz:14px)
        }

        .btselect:hover {
          opacity: 0.8;
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

  .lunsfiexd {
    margin-top: 130px;
  }

  .classlist {
    margin: 0 auto;
    width: 1180px;
    padding: 20px 0;
    background-color: #FFFFFF;

    .clsslis {
      font-size: 14px;
      display: flex;
      align-items: center;

      .clefts {
        margin: 6px 20px;
        font-weight: 600;
      }

      .svbtns {
        cursor: pointer;
        .mixin_bottonTrue(@width:max-content,@height:23px,@pd:8px,@fz:14px,@op:1,@time:0,@cl:#666);
      }

      .svlists:hover {
        background-color: #d2d2d2;
        border-color: #d2d2d2;
        color: #fff;
      }

      .svlists {
        cursor: pointer;
        color: #666666;
        line-height: 23px;
        border: 1px solid #fff;
        border-radius: 2px;
        margin: 0 15px;
        padding: 0 8px;
      }

      .okbtns {
        .mixin_bottonTrue(@width:max-content,@height:23px,@pd:8px,@fz:14px,@op:1);
      }

      .okbtns:hover {
        opacity: 0.8;
      }
    }
  }

  .lists {
    position: relative;
    margin: 0 auto;
    width: 1180px;
    display: flex;

    .section {
      width: 950px;
      min-height: 700px;
      background: #f9fafd;
      margin-top: 10px;

      .pricedesc {
        width: 100%;
        margin-bottom: 10px;
        background-color: #FFFFFF;
        padding: 18px 0;
        .mixin_displayBox(@jc:flex-start,);
        .pricedesc-list{
          border-right: 2px solid #DADFE6;
          .mixin_clickNav(@bg:#333,@pd:0 29px,@ba:#fff);
          font-weight: bold;
          &:hover{
            color: #2C81F8;
          }
        }
        .pricedesc-list:last-child{
          border: 0;
        }
        .activeClass{
          color: #2C81F8;
        }
      }
      &>.noData{
        width: 934px;
        min-width: 934px;
      }
      .selist {
        padding: 20px 0 20px 20px;
        height: 180px;
        width: calc(100% - 20px);
        background: #ffffff;
        box-shadow: 0 0 14px 0 rgba(177, 190, 203, 0.2);
        margin-bottom: 15px;
        display: flex;
        cursor: pointer;

        .se_img {
          width: 196px;
          height: 178px;
          background-image: url('/static/image/occupationmap.png');
          background-size: 100%;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .se_seciont {
          width: calc(100% - 381px);
          margin-left: 15px;

          .se_title {
            cursor: pointer;
            line-height: 25px;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
          }

          .resGrades {
            display: flex;
          }

          .se_adress {
            font-size: 14px;
            color: #999999;
            margin: 16px 0 20px 0;
          }
        }

        .se_right {
          width: 185px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          border-left: 1px solid #ededed;
          padding: 46px 0;

          .se_price {
            text-align: center;
            font-size: 20px;
            color: #FF6600;
            line-height: 35px;
            font-weight: bold;
            span {
              font-size: 28px;
              font-weight: bold;
            }
            &>span:last-child{
              color: #666;
              font-size: 12px;
              font-weight: 400;
              margin-left: 3px;
            }
          }

          .se_btns {
            .mixin_bottonTrue(@width:80px,@height:30px,@pd:0,@fz:14px,@bg:#3c85fd,);
          }

          .se_btns:hover {
            opacity: 0.8;
          }
        }
      }
    }

    .maps {
      margin-top: 10px;
      margin-left: 10px;
      width: 240px;
      height: 250px;
    }

    .mapsfiexd {
      margin: 0;
      position: fixed;
      top: 115px;
      right: calc((100% - 1200px) / 2);
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
