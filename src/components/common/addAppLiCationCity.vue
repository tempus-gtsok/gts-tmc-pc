<!-- 
@Title : 用于出差申请中
@Author: LiuJi
@DATE  : 2021/3/18
@Description: 
-->

<template>
  <div class="cadcity">
    <div class="oktype">
      <div class="oklis" :class="ckidolds == index ? 'checkds' : ''" @click="ckids(index)" v-for="(item, index) in oktypes">{{ item.name }}</div>
    </div>
    <div class="citycom">
      <div class="citcom_left">
        <el-input v-if="ckidolds == 2" :disabled="citylefts" v-model="cityleft.name" @input="inpu('left')" @focus="foinput('left')" @blur="blurinput('left')" class="inputs" size="medium" placeholder="入住城市"></el-input>
        
        <el-input v-else :disabled="citylefts" v-model="cityleft.name" @input="inpu('left')" @focus="foinput('left')" @blur="blurinput('left')" class="inputs" size="medium" placeholder="出发城市"></el-input>
      </div>
      <div class="citcom_left" v-show="ckidolds == 0 || ckidolds == 1">
        <el-input :disabled="cityrights" v-model="cityright.name" @input="inpu('right')" @focus="foinput('right')" @blur="blurinput('right')"
                  style="border: 0;" class="inputst" size="medium" placeholder="到达城市"></el-input>
      </div>
      <div class="citysleft" v-show="ckidolds == 2">
        <!-- <div class="citycoms">
          <div class="citcom_left">
            <el-input v-model="hot_cyval" @input="inpus" @focus="foinputs" @blur="bluscitys" class="inputst"
                      size="medium" placeholder="酒店名/位置"></el-input>
          </div>
        </div> -->
        <div class="hotvals" @mouseover="isctyslts = true" @mouseleave="isctyslts = false" v-if="hotcityname" v-loading="loading">
          <div class="section" v-for="(item, index) in stlist" :key="index" v-if="stlist.length > 0 && hot_cyval == ''">
            <div class="city-title" v-if="item.name && item.list.length > 0">{{ item.name }}</div>
            <div class="city-list" v-if="item.list.length > 0">
              <div class="city-item" v-for="(city, i) in item.list" :key="i" @click="onSelect(city)">{{ city }}</div>
            </div>
          </div>
          <div class="hotsearchs" v-for="(items, index) in hotsearch" @click="onSelect(items.name)" :key="index" v-if="hot_cyval != '' && hotsearch.length > 0">
            <div>{{ items.name }}</div>
          </div>
        </div>
      </div>
      <div @mouseover="isctyslt = true" @mouseleave="isctyslt = false" :class="[opencity ? 'openleft' : 'openright', 'openst']"
           v-if="mostcity">
        <div class="open_tar">
          <div class="opne_lis" @mouseover="selectStyle(item)" :class="citcheck == item.id ? 'opne_liskd' : ''" v-for="(item, index) in citylist"
               :key="index">{{ item.name }}</div>
        </div>
        <div class="cihotsy" v-if="citcheck == 'rot'">
          <div class="cihots" @click="okcitys(item)" v-for="(item, index) in hotCitys" :key="index">{{ item.name }}</div>
        </div>
        <div class="cist" v-if="citcheck != 'rot'">
          <div class="cihots" v-for="(item, index) in stCitys" :key="index">
            <div class="scttab">{{ item.letter }}</div>
            <div class="monstlist">
              <div class="clstname" @click="okcitys(items)" v-for="(items, indexs) in item.list" :key="indexs">{{ items.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div @mouseover="isctyslts = true" @mouseleave="isctyslts = false" :class="[opencity ? 'searchsleft' : 'searchsright', 'searchs']"
           v-if="mostcitys">
        <div class="searlist" v-for="(item, index) in searlist" @click="searck(item)" :key="index">{{ item.name }}</div>
      </div>
      <div class="caitime">
        <div class="citsltimes" v-show="ckidolds == 0 || ckidolds == 1">
          <div class="ctimesdv">
            <el-date-picker class="inputime" value-format="yyyy-MM-dd" v-model="fikdate" type="date" placeholder="去程日期"
                            :editable="false" :picker-options="startDatePicker" :default-value="applicattime[0]"></el-date-picker>
          </div>
          <div class="ctimesdv">
            <el-date-picker value-format="yyyy-MM-dd" class="inputime iright" v-model="enddate" type="date" placeholder="返程日期"
                            :editable="false" :picker-options="endDatePicker" :default-value="applicattime[1]"></el-date-picker>
            <div class="iconfont closetimes" @click="enddate = ''" v-if="enddate != ''">
              &#xe620;
            </div>
          </div>
        </div>
        <div class="citsltimesk" v-show="ckidolds == 2">
          <div class="ctimesdvs">
            <el-date-picker value-format="yyyy-MM-dd" v-model="hoteltime" @change="hottimeadd" class="inputime" type="daterange"
                            range-separator="至" start-placeholder="入店(入住)日期" end-placeholder="离店(离开)日期" :editable="false" :clearable="false"
                            :picker-options="pickerOptions" size="144" align="center" :default-value="applicattime[0]"></el-date-picker>
          </div>
        </div>
      </div>

      <div class="cattns">
        <div class="btnadd" @click="addapll">
          添加行程
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import citys from '../../../static/js/train.js';
import tkcitys from '../../../static/js/airports.js';
export default {
  props: {
    datatime: {
      type: Array
    },
    applicattime:{
      type: Array
    }
  },
  data() {
    return {
      // 选择日期对应出差日期
      pickerOptions: this.hoteltimeend(),
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
      fikdate: '', //去程日期
      enddate: '', //返程日期
      oktypes: [{
        name: '机票'
      },
        {
          name: '火车'
        },
        {
          name: '酒店'
        }
      ],
      hotsearch: [], //酒店关键词搜索
      hotcityname: false,
      hot_cyval: '', //酒店关键词
      stlist: [], //酒店关键词 商圈
      hotcltys: [], //酒店选择城市
      loading: false,
      oldcitylist: [],
      ckidolds: 0, //默认选择机票
      cityrights: false,
      citylefts: false,
      searlist: [], //搜索机场值
      isctyslt: false,
      isctyslts: false,
      cityleft: {
        name: '',
        id: ''
      }, //左边输入框的值
      cityright: {
        name: '',
        id: ''
      }, //右边输入框的值
      opencity: true, //左边还是右边
      mostcity: false, //是否显示机场列表
      mostcitys: false, //是否显示搜索值
      citcheck: 'rot',
      hotCitys: [], //热门机场
      stCitys: [], //所有机场
      timesck: [],
      hoteltime: [],
      citylist: [{
        name: '热门',
        id: 'rot',
        su: []
      },
        {
          name: 'ABCD',
          id: 'ABCD',
          su: ['A', 'B', 'C', 'D']
        },
        {
          name: 'EFGH',
          id: 'EFGH',
          su: ['E', 'F', 'G', 'H']
        },
        {
          name: 'JKLM',
          id: 'JKLM',
          su: ['J', 'K', 'L', 'M']
        },
        {
          name: 'NPQR',
          id: 'NPQR',
          su: ['N', 'P', 'Q', 'R']
        },
        {
          name: 'STWX',
          id: 'STWX',
          su: ['S', 'T', 'W', 'X']
        },
        {
          name: 'YZ',
          id: 'YZ',
          su: ['Y', 'Z']
        }
      ]
    };
  },
  watch: {
    datatime(itme) {
      this.mrths(itme);
    }
  },
  mounted() {
    this.timesck = this.datatime;
    this.fikdate = this.applicattime[0]
  },
  methods: {
    addapll() { //添加行程
      let su = [];
      if (this.ckidolds == 0) { //机票
        let cityleft = this.cityleft; //出发城市
        let cityright = this.cityright; //到达城市
        let fikdate = this.fikdate; //去程时间
        let enddate = this.enddate; //返程时间
        if (cityleft.name == '' || cityright.name == '') {
          this.$message({
            message: '城市不能为空',
            type: 'warning'
          })
          return
        } else if (fikdate == '') {
          this.$message({
            message: '去程时间不能为空',
            type: 'warning'
          })
          return
        }

        let ad = {
          type:1,
          icname: 'Planeticket', //类型
          staname: cityleft, //出发城市
          endname: cityright, //到达城市
          sta: fikdate, //出发时间
          end: '', //返回时间
          adtime:[fikdate]
        };
        if (enddate) {
          if(new Date(fikdate).getTime() > new Date(enddate).getTime()){
            this.$message({
              message: '出发时间不能大于返回时间',
              type: 'warning'
            })
            return
          }
          ad.end = enddate; //返回时间
          ad.adtime = [fikdate,enddate] 
        }
        su.push(ad);
      } else if (this.ckidolds == 1) { //火车
        let cityleft = this.cityleft; //出发城市
        let cityright = this.cityright; //到达城市
        let fikdate = this.fikdate; //去程时间
        let enddate = this.enddate; //返程时间
        if (cityleft.name == '' || cityright.name == '') {
          this.$message({
            message: '城市不能为空',
            type: 'warning'
          })
          return
        } else if (fikdate == '') {
          this.$message({
            message: '去程时间不能为空',
            type: 'warning'
          })
          return
        }

        su.push({
          type:2,
          icname: 'Train', //类型
          staname: cityleft, //出发城市
          endname: cityright, //到达城市
          sta: fikdate, //出发时间
          end: '' //返回时间
        });
        if (enddate) {
          su.push({
            type:2,
            icname: 'Train', //类型
            staname: cityright, //出发城市
            endname: cityleft, //到达城市
            sta: '', //出发时间
            end: enddate //返回时间
          });
        }
      } else if (this.ckidolds == 2) { //酒店
        let cityleft = this.cityleft; //出发城市
        let hot_cyval = this.hot_cyval; //位置
        let hoteltime = this.hoteltime; //时间
        if (cityleft.name == '') {
          this.$message({
            message: '城市不能为空',
            type: 'warning'
          })
          return
        } else if (hoteltime.length == 0) {
          this.$message({
            message: '请填写入住时间',
            type: 'warning'
          })
          return
        }
        su.push({
          type:3,
          icname: 'Hotel', //类型
          staname: cityleft, //出发城市
          endname: hot_cyval, //到达地址
          sta: hoteltime[0], //出发时间
          end: hoteltime[1], //返回时间
          adtime:hoteltime
        });
      }
      this.$emit('addapli', su);
      this.cityleft = {
        name: '',
        id: ''
      }; //出发城市
      this.cityright = {
        name: '',
        id: ''
      }; //到达城市
      this.fikdate = ''; //去程时间
      this.enddate = ''; //返程时间
      this.hot_cyval = '';
      this.hoteltime = [];
    },
    mrths(it) {
      this.enddate = '';
      this.fikdate = '';
      this.timesck = it;
    },
    hottimeadd() { //酒店出差日期能为同一天
      if (this.hoteltime[0] == this.hoteltime[1]) {
        this.$message({
          message: '入住日期不能和离店日期相同',
          type: 'warning'
        })
        this.hoteltime = [];
      }
    },
    hoteltimeend() { //酒店开始结束时间
      const self = this;
      return {
        disabledDate(time) {
          if (new Date(self.timesck[1]).getTime() + 24 * 60 * 60 * 1000 < time.getTime() || time.getTime() < new Date(self.timesck[
              0]).getTime() - 86399000) {
            return true
          } else {
            return false
          }
        }
      };
    },
    beginDate() { //开始时间
      const self = this;
      return {
        disabledDate(time) {
          if (self.enddate) {
            //如果结束时间不为空，则小于结束时间
            if (new Date(self.enddate).getTime() + 1 < time.getTime() || time.getTime() < new Date(self.timesck[0]).getTime() -
                1000) {
              return true
            } else {
              return false
            }
          } else {
            if (new Date(self.timesck[1]).getTime() + 1 < time.getTime() || time.getTime() < new Date(self.timesck[0]).getTime() -
                86399000) {
              return true
            } else {
              return false
            }
          }
        }
      };
    },
    processDate() { //结束时间
      const self = this;
      return {
        disabledDate(time) {
          if (self.fikdate) {
            if (new Date(self.fikdate).getTime() - 24 * 60 * 60 * 1000 >= time.getTime() || time.getTime() > new Date(self.timesck[
                1]).getTime()) {
              return true
            } else {
              return false
            }
          } else {
            if (new Date(self.timesck[1]).getTime() < time.getTime() || time.getTime() < new Date(self.timesck[0]).getTime() -
                86399000) {
              return true
            } else {
              return false
            }
          }
        }
      };
    },
    onSelect(val) {
      //选择当前搜索关键词
      this.hot_cyval = val;
      this.hotcityname = false;
    },
    foinputs() {
      //判断酒店搜索是否有城市
      if (this.cityleft.name != '' && this.hot_cyval == '') {
        this.hotcityname = true;
        this.st_right_list();
      }
    },
    bluscitys() {
      if (!this.isctyslts) {
        this.hotcityname = false;
      }
    },
    inpus() {
      let that = this;
      if (that.hot_cyval.length > 0) {
        that.hotcityname = true;
        that.loading = true;
        that.hotsearch = [];
        that.$api.home
            .getCityNames({
              cityName: that.cityleft.name,
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
                });
              }
            })
            .catch(e => {
              that.loading = false;
            });
      }
    },
    async st_right_list() {
      //回显酒店信息
      let that = this;
      that.loading = true;
      that.$api.home
          .getCityDetail({
            cityCode: that.cityleft.name
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
    ckids(index) {
      //选择当前类型出差
      if (index == this.ckidolds) {
        return;
      }
      this.oldcitylist = [];
      this.ckidolds = index;
      this.cityleft = {
        name: '',
        id: ''
      };
      this.cityright = {
        name: '',
        id: ''
      };
    },
    exchange() {
      let va = this.cityleft;
      this.cityleft = this.cityright;
      this.cityright = va;
      this.$emit('changers', [this.cityleft, this.cityright]);
    },
    foinput(vi) {
      //输入框获取焦点
      if (vi == 'left') {
        this.opencity = true;
      } else {
        this.opencity = false;
      }
      this.isctyslt = false;
      this.isctyslts = false;
      this.selectStyle(this.citylist[0]); //默认显示热点机场
      this.mostcity = true;
    },
    okcitys(tiem) {
      //点击当前机场
      if (this.opencity) {
        this.cityleft = tiem;
      } else {
        this.cityright = tiem;
      }
      this.mostcity = false;
      this.$emit('changers', [this.cityleft, this.cityright]);
    },
    blurinput(it) {
      //输入框失去焦点
      if (!this.isctyslt) {
        this.mostcity = false;
      }
      if (!this.isctyslts) {
        if (this.mostcitys) {

          if (it == 'left') {
            if (this.oldcitylist.length > 0) {
              this.cityleft = {
                name: this.oldcitylist[0].name,
                id: this.oldcitylist[0].id,
              }
            } else {
              this.cityleft = {
                name: '',
                id: '',
              }
            }
          } else if (it == 'right') {
            if (this.oldcitylist.length > 0) {
              this.cityright = {
                name: this.oldcitylist[0].name,
                id: this.oldcitylist[0].id,
              }
            } else {
              this.cityright = {
                name: '',
                id: '',
              }
            }
          }

          this.mostcitys = false;
        }
      }
    },
    async inpu(it) {
      //输入框值发生变化
      this.mostcity = false;
      let va = '';
      if (it == 'left') {
        if (this.cityleft.name.length > 0) {
          this.mostcitys = true;
          va = this.cityleft.name;
        } else {
          this.mostcitys = false;
          return;
        }
      } else {
        if (this.cityright.name.length > 0) {
          this.mostcitys = true;
          va = this.cityright.name;
        } else {
          this.mostcitys = false;
          return;
        }
      }
      let address = [];
      if (this.ckidolds == 1 ) {//酒店和火车
        address = citys.addressTrainAll; //所有车站
        this.searlist = [];
        for (let i in address) {
          if (address[i].name.indexOf(va) != -1) {
            this.searlist.push({
              id: address[i].code,
              name: address[i].name
            });
          }
        }
      } else if (this.ckidolds == 0) {//机票
        address = tkcitys.addressAirportAll; //所有机场
        this.searlist = [];
        for (let i in address) {
          if(address[i].airportCName.indexOf(va) != -1 || address[i].airportCode.indexOf(va) != -1 || address[i].cityCName.indexOf(va) != -1 || address[i].cityFirstSpell.indexOf(va) != -1 || address[i].citySpell.indexOf(va) != -1 ){
            this.searlist.push({
              id: address[i].airportCode,
              name: address[i].airportCName,
            })
          }
        }
      }else if(this.ckidolds == 2){
        const res = await this.$api.home.getCityName({cityName:this.cityleft.name})
        this.searlist = res.data
      }
      if (this.searlist.length > 0) {
        this.oldcitylist = [];
        this.oldcitylist.push(this.searlist[0])
      }
    },
    searck(itm) {
      //选择当前输入框值
      if (this.opencity) {
        this.cityleft = itm;
      } else {
        this.cityright = itm;
      }
      this.mostcitys = false;
    },
    // 鼠标移入显示对应城市
    selectStyle(item) {
      this.cityslist(item);
      this.citcheck = item.id;
    },
    // 展示对应城市
    cityslist(its) {
      //弹出层选择城市
      if (its.id == 'rot') {
        this.hotCitys = [];
        let hot = [];
        if (this.ckidolds == 1 || this.ckidolds == 2) {
          hot = citys.addressTrainHot; //热门城市
          for (let i = 0; i < hot.length; i++) {
            this.hotCitys.push({
              name: hot[i].name,
              id: hot[i].code
            });
          }
        } else if (this.ckidolds == 0) {
          hot = tkcitys.addressAirportHot; //热门城市
          for (let i = 0; i < hot.length; i++) {
            this.hotCitys.push({
              name: hot[i].cityCName,
              id: hot[i].airportCode
            })
          }
        }
      } else {
        let address = [];
        if (this.ckidolds == 1 || this.ckidolds == 2) {
          address = citys.addressTrainAll; //所有车站
        } else if (this.ckidolds == 0) {
          address = tkcitys.addressAirportAll; //所有机场
        }
        let ct = [];
        for (let k in its.su) {
          ct.push({
            letter: its.su[k],
            list: []
          });
        }
        if (this.ckidolds == 1 || this.ckidolds == 2) {
          for (let i = 0; i < address.length; i++) {
            let pys = address[i].code.substring(0, 1).toUpperCase(); //获取改城市的首字母
            for (var k = 0; k < ct.length; k++) {
              if (pys == ct[k].letter) {
                ct[k].list.push({
                  name: address[i].name,
                  id: address[i].code
                });
              }
            }
          }
        } else if (this.ckidolds == 0) {
          for (let i = 0; i < address.length; i++) {
            let sts = address[i].cityCName; //获取城市名称
            let pys = address[i].cityEName.substring(0, 1); //获取改城市的首字母
            for (var k = 0; k < ct.length; k++) {
              if (pys == ct[k].letter) {
                ct[k].list.push({
                  name: sts,
                  id: address[i].airportCode
                });
              }
            }
          }
        }

        this.stCitys = ct;
      }
    }
  }
};
</script>

<style scoped lang="less">
.cadcity {
  width: 100%;
  border: 1px solid #C8D9FB;
  border-radius: 4px 4px 0px 0px;
  border-top: 0;
  background: #E9F1FF;

  .oktype {
    width: 100%;
    height: 50px;
    background-color: #f6f9fb;
    display: flex;

    .oklis {
      flex: 1;
      text-align: center;
      line-height: 50px;
      font-size: 16px;
      cursor: pointer;
      background: #E9F1FF;
      border-bottom: 2px solid #C7D6F0;
    }

    .checkds {
      border-bottom: 2px solid #409EFF;
      color: #409EFF;
    }
  }

  .caitime {
    width: 100%;
    display: flex;
    align-items: center;
    height: 60px;
    border-bottom: 1px solid #e4e4e4;

    .citsltimesk {
      width: 100%;

      .ctimesdvs {
        width: 100%;

        .inputime {
          cursor: pointer;
          width: 100%;
          height: 44px;
          margin-left: 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .inputime /deep/ .el-input__icon {
          display: none;
        }

        .inputime /deep/ .el-range-input {
          width: 119px;
          font-size: 14px;
          margin-left: 4px;
        }

        .inputime /deep/ .el-range-separator {
          display: none;
        }
      }
    }

    .citsltimes {
      width: 100%;
      margin-left: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .ctimesdv {
        width: calc(50% - 4px);
        position: relative;

        .closetimes {
          position: absolute;
          top: 0px;
          right: 5px;
          cursor: pointer;
          font-size: 14px;
          color: #A7B8C3;
          z-index: 999999;
        }

        .inputime {
          width: 100%;
        }

        

        .inputime /deep/ .el-input__inner {
          width: 134px;
          height: 44px;
          cursor: pointer;
          display: flex;
          align-items: center;
          font-size: 14px;
        }

        .inputime /deep/.el-input__icon {
          display: none;
    
        }
       

        .iright /deep/ .el-input__inner {
          text-align: center;
        }
      }
    }
  }

  .citycom {
    position: relative;
    width: calc(100% - 80px);
    display: flex;
    justify-content: space-between;
    height: 60px;
    line-height: 60px;
    color: #abb7c2;
    border-bottom: 1px solid #e4e4e4;

    .citcom_left {
      display: flex;
      .inputs/deep/.el-input__inner {
        text-align: center;
        padding: 0;
        font-size: 14px;
        width: 134px;
        height: 44px;
        margin: 0 0 0 13px;
      }

      .inputst /deep/ .el-input__inner {
        text-align: center;
        padding: 0;
        font-size: 14px;
        width: 134px;
        height: 44px;
        margin-left: 4px;
      }
    }

    .citysleft {
      width: 40%;
      position: relative;
      margin: auto;
      .citycoms {
        position: relative;
        text-align: center;
        width: 100%;
        display: flex;
        height: 44px;
        line-height: 44px;
        color: #abb7c2;

        .citcom_left {
          width: 100%;
          display: flex;

          .inputs/deep/.el-input__inner {
            text-align: right;
            padding: 0;
            font-size: 14px;
          }
        }
      }

      .hotvals {
        position: absolute;
        left: 0;
        top: 70px;
        width: 500px;
        z-index: 899;
        max-height: 500px;
        min-height: 300px;
        overflow-y: scroll;
        scrollbar-width: none;
        /* firefox */
        -ms-overflow-style: none;
        /* IE 10+ */
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

    .citzt {
      width: 20%;
      height: 65px;
      text-align: center;
    }

    .openleft {
      left: 15px;
    }

    .openright {
      left: 15px;
    }

    .openst {
      position: absolute;
      padding: 10px 25px;
      z-index: 899;
      background: #ffffff;
      top: 60px;
      box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);

      .open_tar {
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        color: #000000;

        .opne_lis {
          width: 80px;
          text-align: center;
          border-bottom: 1px solid #abb7c2;
        }

        .opne_liskd {
          color: #409eff;
          border-bottom: 1px solid #409eff;
        }
      }

      .cihotsy {
        display: flex;
        flex-wrap: wrap;
        color: #000000;
        font-size: 14px;

        .cihots {
          height: 50px;
          line-height: 50px;
          padding: 0 15px;
          cursor: pointer;
        }

        .cihots:hover {
          color: red;
        }
      }

      .cist {
        font-size: 14px;
        color: #000000;

        .cihots {
          padding-top: 10px;

          .scttab {
            text-indent: 15px;
            height: 30px;
            line-height: 30px;
          }

          .monstlist {
            display: flex;
            flex-wrap: wrap;

            .clstname {
              height: 30px;
              line-height: 30px;
              padding: 0 15px;
              cursor: pointer;
            }

            .clstname:hover {
              color: red;
            }
          }
        }
      }
    }

    .searchs {
      color: #000000;
      position: absolute;
      z-index: 899;
      background: #ffffff;
      top: 70px;
      width: 400px;
      box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
      border-radius: 3px;

      .searlist {
        padding: 0 25px;
        cursor: pointer;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        border-radius: 3px;
      }

      .searlist:hover {
        background: #f9fafd;
      }
    }

    .searchsleft {
      left: 0%;
    }

    .searchsright {
      left: 25%;
    }
  }

  .cattns {
    width: 100%;
    margin-left: 14px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    .btnadd {
      width: 90px;
      cursor: pointer;
      line-height: 44px;
      text-align: center;
      border-radius: 3px;
      background-color: #409EFF;
      font-size: 12px;
      color: #FFFFFF;
    }
    .btnadd:hover {
      opacity: 0.8;
    }
  }
}
</style>
