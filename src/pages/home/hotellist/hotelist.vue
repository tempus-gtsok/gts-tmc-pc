<template>
<!-- 产品预定->酒店列表 -->
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
							<el-date-picker value-format="yyyy-MM-dd" v-model="traitime" type="daterange"
								range-separator="至" :disabled="isblcks == 1" start-placeholder="入店日期"
								end-placeholder="离店日期" :editable="false" :clearable="false" @change="tiemdat"
								:picker-options="pickerOptions"></el-date-picker>
						</div>
					</div>
					<div class="sercitsk">
						<div class="citysleftk">
							<div class="citycomk">
								<div class="citcom_leftk">
									<el-input v-model="hot_cyval"
										@input="inpu" @focus="foinput" @blur="bluscity" class="inputsk" size="medium"
										placeholder="酒店/地铁/机场/火车/商圈"></el-input>
								</div>
							</div>
							<div class="hotvalsk" @mouseover="isctyslts = true" @mouseleave="isctyslts = false"
								v-if="hotcityname" v-loading="loading">
								<div class="sectionk" v-for="(item,index) in stlist" :key="index"
									v-if="stlist.length > 0 && !hot_cyval">
                  <div class="history" v-if="index == 0 && flag && historyList.length > 0">
                  <div class="hisTitle">
                    <span>历史记录</span>
                    <i class="el-icon-delete" @click="deletClick()"></i>
                  </div>
                  <div class="hisData">
                    <span v-for="(item , index) in historyList" :key="index" @click="hisClick(item , index)" v-if="item.city[0].id == hotcltys[0].id">
                      {{item.cityval.name}}
                    </span>
                  </div>
                </div>
									<div class="city-titlek">{{ item.name }}</div>
									<div class="city-listk">
										<div class="city-itemk" v-for="(city, i) in item.list" :key="i"
											@click="onSelect(city , 1)">
											{{ city }}
										</div>
									</div>
								</div>
								<div class="hotsearchsk" v-for="(items,index) in hotsearch"
									@click="onSelect(items , 2)" :key="index"
									v-if="hot_cyval !='' && hotsearch.length > 0">
									<!-- <div v-html="items.label"></div> -->
									<div class="searchsList">
										<img :src="items.imgUrl" alt="">
										<div>
											<div v-if="items.label" v-html="items.label" :title="items.label.replace(/<[^<>]+>/g,'')"></div>
											<span :title="items.address">{{items.address}}</span>
										</div>
									</div>
										<span>{{ items.type | hotStatus}}</span>
								</div>
								<div class="serNoData" v-if="hotsearch.length == 0 && hotcityname && stlist.length == 0">
									暂无数据
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
		<div class="lists" v-if="istype == 1">
			<div class="section" v-loading="loadings">
				<div class="pricedesc">
					<div class="pricedesc-list" v-for="(item,index) in tasktypes" :key="index"
						@click="taskchangs(item , index)" :class="{activeClass:activeIndex == index}">
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
							<div v-for="(items,index) in item.resGr" :key="index">
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

			</div>
			<div class="maps" :class="fitxd?'mapsfiexd':''">
				<div>
					<div id="all-map" :style="{width:'100%',height:'350px'}"></div>
				</div>
			</div>
			<no-data class="noData" v-if="trainlist.length === 0 && loading === false"></no-data>
		</div>
		<div class="mapst" v-if="istype == 2">
			<div id="all-maps" :style="{width:'100%',height:'600px'}"></div>
		</div>
		<div class="block" v-if="totalPatge > 1 && istype == 1">
			<el-pagination @current-change="handleCurrentChange" :current-page.sync="curPages" :page-size="10"
				layout="prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
let map, marker, polygon, drawingManager, lngLat, ap;
import citysearchh from "@/components/common/citycomponents_h.vue";
import NoData from "@/components/common/noData";
import { hotStatus } from "@/utils/common-filters";
export default {
  filters: {
    hotStatus,
  },
  data() {
    return {
      istype: 1,
      position: [
        {
          longitude: 114.081545, //经度
          latitude: 22.541023, //纬度
          city: "",
        },
      ],
      lons: "", //经度
      lats: "", //纬都
      curPages: 1, //当前第几页
      center: [31.197646, 121.59996],
      classlists: [
        {
          name: "价格",
          values: [],
          list: [
            {
              name: "￥150以下",
              istrue: false,
              value: {
                priceFrom: 0,
                priceTo: 150,
              },
            },
            {
              name: "￥150-300",
              istrue: false,
              value: {
                priceFrom: 150,
                priceTo: 300,
              },
            },
            {
              name: "￥300-450",
              istrue: false,
              value: {
                priceFrom: 300,
                priceTo: 450,
              },
            },
            {
              name: "￥450-600",
              istrue: false,
              value: {
                priceFrom: 450,
                priceTo: 600,
              },
            },
            {
              name: "￥600以上",
              istrue: false,
              value: {
                priceFrom: 600,
                priceTo: 5000000,
              },
            },
          ],
        },
        {
          name: "星级",
          values: [],
          list: [
            {
              name: "二星级以下/经济",
              istrue: false,
              value: "27",
            },
            {
              name: "三星/舒适",
              istrue: false,
              value: "26",
            },
            {
              name: "四星/高档",
              istrue: false,
              value: "24",
            },
            {
              name: "五星/豪华",
              istrue: false,
              value: "23",
            },
          ],
        },
      ],
      tasktypes: [
        {
          //排序类型
          id: "bookTimes_asc",
          name: "推荐排序",
        },
        {
          id: "minPrice_asc",
          name: "价格从高到低",
        },
        {
          id: "minPrice_desc",
          name: "价格从低到高",
        },
        {
          id: "resGrade_asc",
          name: "酒店星级从高到低",
        },
        {
          id: "resGrade_desc",
          name: "酒店星级从低到高",
        },
      ],
      plugin: [],
      zoom: 16,
      total: 0, //多少条数据
      isctyslts: false,
      isblcks: JSON.parse(this.$route.query.data).isblcks,
      hot_cyval: "", //酒店关键词
      hot_cyvals: "",
      hotsearch: [], //酒店关键词搜索
      hotcltys: JSON.parse(this.$route.query.data).city, //酒店选择城市
      hotcityname: false,
      longitude: "",
      totalPatge: 0, //总共多少页
      searchHotelType: "",
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
      reconaid: "", //推荐排序
      trainlists: [],
      datatime: "", //出发时间
      traitime: JSON.parse(this.$route.query.data).timedate,
      citylist: JSON.parse(this.$route.query.data).city,
      levecllist: [],
      priceFromTo: [], //价格
      pickerOptions: {
        disabledDate: (time) => {
          return this.dealDisabledDate(time);
        },
      },
      activeIndex: 0,
      sectionName: "", // 城区区域搜索参数
      keyWordl: "", // 关键字搜索  酒店名和地表为关键字
      dataType: "",
      hot_cyvalData: {},
      historyList:[],
      flag:true,
      flagHis:'',
    };
  },
  components: {
    citysearchh,
    NoData,
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    var val = JSON.parse(this.$route.query.data).cityval;
    this.flagHis = JSON.parse(this.$route.query.data)
      this.historyList = JSON.parse(localStorage.getItem('history')) || []
    this.init(val);
    window.addEventListener("scroll", this.handleScroll);
    let lis = JSON.parse(this.$route.query.data); //获取上个页面传入的参数
    this.istype = lis.map;
    this.roteslist = lis;
    this.butalist = lis.butalist; //出差旅客
    this.datatime = lis.timedate;
    this.trainlistst();
  },
  methods: {
    init(val) {
      
      this.hot_cyval = typeof val == "string" ? val : val.name;
      this.longitude = typeof val == "string" ? "" : val.location;
      this.sectionName = typeof val == "string" ? val : val.name;
      this.dataType = typeof val == "object" ? val.type || val.status : 0; // 收索词的类型
      if (this.dataType == 9 || val.type == 6 || val.type == 1) {
        this.keyWordl = val.name;
      } else {
        this.keyWordl = "";
      }
    },
    maspt(urid) {
      let taht = this;
      var centers = new qq.maps.LatLng(this.center[0], this.center[1]);
      var map = new qq.maps.Map("all-map", {
        center: centers, // 地图的中心地理坐标
        zoom: 16, // 地地图缩放
      });
      // 创建标记
      var marker = new qq.maps.Marker({
        // 标记的位置
        position: centers,
        map: map,
      });
      // 提示窗
      var info = new qq.maps.InfoWindow({
        map: map,
      });
      // 悬浮标记显示信息
      info.open();
      info.setContent(`<div style="font-size:11px;color: #333333;">${urid.resName}</div>
								<div style="font-size:11px;color: #FF6600;">￥${urid.minPrice}</div>`);
      info.setPosition(centers);
      qq.maps.event.addListener(marker, "click", function () {
        taht.othotrlis(urid);
      });
    },
    maspts(urlist) {
      let taht = this;
      var centers = new qq.maps.LatLng(this.center[0], this.center[1]);
      var map = new qq.maps.Map("all-maps", {
        center: centers, // 地图的中心地理坐标
        zoom: 16, // 地地图缩放
      });
      var info = new qq.maps.InfoWindow({
        map: map,
      });
      // 悬浮标记显示信息

      for (var i = 0; i < urlist.length; i++) {
        // 为标记添加点击事件
        (function (i) {
          var data = urlist[i];
          // 创建标记
          // let anchor1 = new qq.maps.Point(6, 6);
          // let size1 = new qq.maps.Size(24, 24);
          // let origin1 = new qq.maps.Point(0, 0);
          // let icon1 = new qq.maps.MarkerImage('static/image/order/orderbd.png', size1, origin1, anchor1);
          var marker = new qq.maps.Marker({
            position: new qq.maps.LatLng(data.lat, data.lon),
            map: map,
          });
          var marker = new qq.maps.Label({
            position: new qq.maps.LatLng(data.lat, data.lon),
            map: map,
            content: `<div style="cursor: pointer;"><div style="font-size:11px;color: #333333;">${urlist[i].resName}</div>
									<div style="font-size:11px;color: #FF6600;">￥${urlist[i].minPrice}</div></div>`,
          });
          // marker.setIcon(icon1);
          qq.maps.event.addListener(marker, "click", function () {
            taht.othotrlis(urlist[i]);
          });
        })(i);
      }
      // qq.maps.event.addListener(map, "dragend", () => { // 监听鼠标拖拽结束的事件
      // 	taht.lons = map.center.lng;
      // 	taht.lats = map.center.lat;
      // 	console.log(map.center)
      // 	taht.trainlistst()
      // });
    },
    taskchangs(item, index) {
      this.activeIndex = index;
      this.reconaid = item.id;
      this.trainlistst();
    },
    ckliop(its, index) {
      this.curPages = 1;
      if (its.istrue == false) {
        if(index == 0){
        this.classlists[index].list.forEach(ite => {
            ite.istrue = false
          });
          its.istrue = true;
        this.classlists[index].values = [its.value];
        }else{
          its.istrue = true;
        this.classlists[index].values.push(its.value);
        }
        this.trainlistst();
      } else {
        its.istrue = false;
        for (let k = 0; k < this.classlists[index].values.length; k++) {
          if (this.classlists[index].values[k] == its.value) {
            this.classlists[index].values.splice(k, 1);
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
      if (item == undefined && item.lat != undefined) {
        this.center = [31.197646, 121.59996];
      } else {
        if (item.lat == this.center[0] && item.lon == this.center[1]) {
          return;
        }
        this.center = [item.lat, item.lon];
        this.maspt(item);
      }
    },
    handleCurrentChange(val) {
      //翻页
      this.curPages = val;
      this.trainlistst();
    },
    foinput() {
      //判断酒店搜索是否有城市
      if (this.hotcltys.length > 0 && !this.hot_cyval) {
        this.hotcityname = true;
        this.st_right_list();
      } else if (this.hot_cyval) {
        this.inpu();
      }
    },
    bluscity() {
      if (!this.isctyslts) {
        this.hotcityname = false;
      }

      if (typeof this.hot_cyvals == "string") {
        this.hot_cyvals = { name: this.hot_cyvals, status: 9 };
        this.init(this.hot_cyvals);
      }
    },
    onSelect(val, num) {
     
      // this.flagHis
      //选择当前搜索关键词
      if (num == 1) {
        this.hot_cyval = val;
        this.hot_cyvals = { name: val, status: 7 };
        this.hotcityname = false;
      } else {
        this.hot_cyval = typeof val == "string" ? val : val.name;
        this.hot_cyvals = { ...val, status: 8 };
        this.hotcityname = false;
      }
      this.dataType =
        typeof this.hot_cyvals == "object"
          ? this.hot_cyvals.type || this.hot_cyvals.status
          : 0; // 收索词的类型

      // this.hotcityname = false;
      // this.hot_cythis.hot_cyvals =typeof(this.hot_cyvals) == 'string' ? this.hot_cyvals:this.hot_cyvals.name;
      this.longitude =
        typeof this.hot_cyvals == "string" ? "" : this.hot_cyvals.location;
      this.sectionName =
        typeof this.hot_cyvals == "string"
          ? this.hot_cyvals
          : this.hot_cyvals.name;
      this.longitude = this.longitude
        ? this.$utils.qqMapToBMap(this.longitude.lng, this.longitude.lat)
        : {};
      if (
        this.dataType == 9 ||
        this.hot_cyvals.type == 6 ||
        this.hot_cyvals.type == 1
      ) {
        this.keyWordl = this.hot_cyvals.name;
      } else {
        this.keyWordl = "";
      }
    },
    inpu() {
      let that = this;
      if (that.hot_cyval && that.hot_cyval.length > 0) {
        that.hotcityname = true;
        that.loading = true;
        that.hotsearch = [];
        that.$api.home
          .getCityNames({
            cityName: that.hotcltys[0].name,
            keyword: that.hot_cyval,
          })
          .then((res) => {
            that.loading = false;
            if (res.code == 200) {
              that.hotsearch = res.data;
            } else {
              that.$message({
                message: res.message,
                type: "warning",
              });
            }
          })
          .catch((e) => {
            console.log(e);
            that.loading = false;
          });
      } else {
        this.st_right_list();
        // that.hotcityname = false;
      }
      this.hot_cyvals = this.hot_cyval;
    },
    async st_right_list() {
      //回显酒店信息
      let that = this;
      that.stlist = []
      that.loading = true;
      that.$api.home
        .getCityDetail({
          cityCode: that.hotcltys[0].name,
        })
        .then((res) => {
          that.loading = false;
          if (res.code == 200) {
            that.stlist.push({
              name: "行政区",
              id: 1,
              isclk: false, //打开还是关闭
              oken: false, //是否超过6个
              list: res.data.cityArea, //值
            });
            that.stlist.push({
              name: "机场车站",
              id: 2,
              isclk: false, //打开还是关闭
              oken: false, //是否超过6个
              list: res.data.cityAirRailWay, //值
            });
            that.stlist.push({
              name: "商圈",
              id: 3,
              isclk: false, //打开还是关闭
              oken: false, //是否超过6个
              list: res.data.cityBusinessSectionInfo, //值
            });
            that.stlist.push({
              name: "地铁",
              id: 3,
              isclk: false, //打开还是关闭
              oken: false, //是否超过6个
              list: res.data.citySubWay, //值
            });
            that.stlist.push({
              name: "品牌",
              id: 3,
              isclk: false, //打开还是关闭
              oken: false, //是否超过6个
              list: that.hotelb(res.data.hotelBrands), //值
            });
          }
        })
        .catch((e) => {
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
    handleScroll() {
      //滚动条监听事件
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 60) {
        this.fitxd = true;
      } else {
        this.fitxd = false;
      }
    },
    othotrlis(item) {
      //跳转预定页面
      this.roteslist.city = this.hotcltys;
      this.roteslist.cityval = this.hot_cyval;
      this.roteslist.timedate = this.traitime;
      this.roteslist["hotelCode"] = item.id;
      this.roteslist["resGr"] = item.resGr;
      this.roteslist["searchHotelType"] = this.searchHotelType;
      this.$router.push({
        path: "/hoterlist",
        query: {
          data: JSON.stringify(this.roteslist),
        },
      });
    },

    seachlist() {
      //搜索
      this.trainlistst();
    },
    datachencks(it) {
      //点击时间
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
      if(this.hotcltys.length > 0){
       this.flag = this.historyList.find(item => item.city[0].id == this.hotcltys[0].id)
      }
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
    selvlist(it) {
      if (it.length == 0) {
        return ["-1"];
      } else {
        let strit = it.join(",");
        return [strit];
      }
    },
    resGrade(item) {
      if (["37", "32", "34"].includes(item)) {
        return 2;
      } else if (["26", "31"].includes(item)) {
        return 3;
      } else if (["24", "30"].includes(item)) {
        return 4;
      } else if (["23", "28"].includes(item)) {
        return 5;
      } else {
        return 1;
      }
    },
    trainlistst() {
      this.trainlist = [];
      this.priceFromTo = this.classlists[0].values; //价格
      this.levecllist = this.classlists[1].values; //星级
      // let lon_lat = this.$utils.qqMapToBMap(this.lons,this.lats);//腾讯经纬度转高德
      // var sectionName = ''
      // var airRailWay = ''
      // var businessSectionInfo = ''
      // var subWay = ''
      let obj = {
        // lon:this.longitude[0],
        // lat:this.longitude[1],
        cityCode: this.hotcltys[0].name,
        keyword: this.keyWordl,
        begin: this.traitime[0],
        end: this.traitime[1],
        pageCount: this.curPages,
        rowCount: 10,
        orderBy: [this.reconaid],
        searchCondition: {
          hotelLevelList: this.selvlist(this.levecllist), //星级
          priceFromToList: this.priceFromTo, //价格
        },
        // sectionName: this.hot_cyval,
      };
      if (this.longitude && this.longitude.lng) {
        this.longitude = this.longitude
          ? this.$utils.qqMapToBMap(this.longitude.lng, this.longitude.lat)
          : {};
      } else if (this.longitude && this.longitude[0]) {
        this.longitude = this.longitude
          ? this.$utils.qqMapToBMap(this.longitude[0], this.longitude[1])
          : {};
      }
      if (this.dataType == 2 || this.dataType == 7) {
        //行政区
        obj["sectionName"] = this.sectionName;
      } else if (this.dataType == 3) {
        //地铁站
        obj["subWay"] = this.sectionName;
        obj["lat"] = this.longitude[1];
        obj["lon"] = this.longitude[0];
      } else if (this.dataType == 4) {
        //商圈
        obj["businessSectionInfo"] = this.sectionName;
      } else if (this.dataType == 5) {
        //机场/火车站
        obj["airRailWay"] = this.sectionName;
        obj["lat"] = this.longitude[1];
        obj["lon"] = this.longitude[0];
      } else if (this.dataType == 0) {
        //行政区
        obj["sectionName"] = this.sectionName;
      } else if (this.dataType == 6) {
        //地标
        obj["lat"] = this.longitude[1];
        obj["lon"] = this.longitude[0];
      }
      if(this.hot_cyvals == ''){

      }else if(this.hot_cyvals.name == ''){

      }else{
        var data = {
         cityval: this.hot_cyvals,
         city:[this.hotcltys[0]]
        }
          for (let i = 0; i < this.historyList.length; i++) {
          if(i > 8){
               this.historyList.splice(i,1)
            }
          }
          this.historyList.unshift(data)
          var arr2 = {};
          this.historyList = this.historyList.reduce((cur, next) => {
            //去重
            arr2[next.cityval.name]
              ? ""
              : (arr2[next.cityval.name] = true && cur.push(next));
            return cur;
          }, []);
          localStorage.setItem("history",JSON.stringify(this.historyList))
      }

      this.loadings = true;
      this.$api.home
        .sortHotelList(obj)
        .then((res) => {
          this.loadings = false;
          if (res.code == 200) {
            this.searchHotelType = res.data.searchHotelType;
            this.total = res.data.totalCount; //一共多少条
            this.totalPatge = res.data.totalPatge; //总共多少页
            this.trainlist = res.data.responseResult; //默认加载的数据
            if (this.trainlist.length > 0) {
              for (let i in this.trainlist) {
                let lon_lats = this.$utils.bMapToQQMap(
                  this.trainlist[i].resPosition[0],
                  this.trainlist[i].resPosition[1]
                ); //百度地图转腾讯经纬度
                this.trainlist[i].lon = lon_lats[0];
                this.trainlist[i].lat = lon_lats[1];
                this.trainlist[i]["resGr"] = this.resGrade(
                  this.trainlist[i].resGrade
                );
              }
              this.center = [this.trainlist[0].lat, this.trainlist[0].lon];

              if (this.istype == 1) {
                this.maspt(res.data.responseResult[0]);
              } else {
                this.maspts(res.data.responseResult);
              }
            } else {
              // this.$message({
              // 	message: '暂时没有数据',
              // 	type: 'warning'
              // });
            }
          } else {
            this.$message({
              message: res.message,
              type: "warning",
            });
          }
        })
        .catch((e) => {
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
      return time.getTime() < times - 8.64e7;
    },
    hisClick(item , index){
      this.hot_cyval = item.cityval.name
      this.flagHis = item
      this.hotcityname = false
      this.init(this.flagHis.cityval)
    },
  },
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
          width: 21%;
          height: 40px;

          .citysleft {
            border-radius: 3px;
            width: 100%;

            & > .citycom {
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

            & > .el-input__inner {
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
              background: #ffffff;
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
                    color: #007aff;
                  }
                }
              }

              .hotsearchsk {
                // line-height: 25px;
                text-indent: 10px;
                font-size: 14px;
                cursor: pointer;
                .mixin_displayBox(@jc:space-between);
                padding: 5px;
                border-bottom: 1px solid #ccc;
                & > .searchsList {
                  display: flex;
				  align-items: center;
				  max-width: 80%;
                  & > img {
                    width: 20px;
                    height: 20px;
                  }
                          & > div {
                            display: flex;
                            flex-direction: column;
                            & > div {
                              width: 100%;
                              .mixin_ellipsis();
                            }
                            & > span {
                              width: 100%;
                              font-size: 12px;
                              color: #999;
                              .mixin_ellipsis();
                            }
                          }
                }
              }
              .serNoData {
                min-height: 300px;
                .mixin_displayBox();
                color: #666;
              }
              .hotsearchsk:hover {
                color: #007aff;
              }
            }
          }
        }

        .btselect {
          margin-left: 1.25%;
          .mixin_bottonTrue(@width: 162px, @height: 38px, @bg: #FF9A35, @cl: #fff, @pd: 0, @fz: 14px);
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
    background-color: #ffffff;

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
        .mixin_bottonTrue(@width: max-content, @height: 23px, @pd: 8px, @fz: 14px, @op: 1, @time: 0, @cl: #666);
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
        .mixin_bottonTrue(@width: max-content, @height: 23px, @pd: 8px, @fz: 14px, @op: 1);
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
      width: 850px;
      min-height: 700px;
      background: #f9fafd;
      margin-top: 10px;

      .pricedesc {
        width: 100%;
        margin-bottom: 10px;
        background-color: #ffffff;
        padding: 18px 0;
        .mixin_displayBox(@jc: flex-start, );

        .pricedesc-list {
          border-right: 2px solid #dadfe6;
          .mixin_clickNav(@bg: #333, @pd: 0 29px, @ba: #fff);
          font-weight: bold;

          &:hover {
            color: #2c81f8;
          }
        }

        .pricedesc-list:last-child {
          border: 0;
        }

        .activeClass {
          color: #2c81f8;
        }
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
          background-image: url("/static/image/occupationmap.png");
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
            color: #ff6600;
            line-height: 35px;
            font-weight: bold;

            span {
              font-size: 28px;
              font-weight: bold;
            }

            & > span:last-child {
              color: #666;
              font-size: 12px;
              font-weight: 400;
              margin-left: 3px;
            }
          }

          .se_btns {
            .mixin_bottonTrue(@width: 80px, @height: 30px, @pd: 0, @fz: 14px, @bg: #3c85fd, );
          }

          .se_btns:hover {
            opacity: 0.8;
          }
        }
      }
    }

    & > .noData {
      width: 834px;
      min-width: 834px;
      top: 170px;
    }

    .maps {
      margin-top: 10px;
      margin-left: 10px;
      width: 340px;
      height: 350px;
    }

    .mapsfiexd {
      margin: 0;
      position: fixed;
      top: 115px;
      right: calc((100% - 1200px) / 2);
    }
  }

  .mapst {
    position: relative;
    margin: 0 auto;
    width: 1180px;
    height: 600px;
  }

  .block {
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.history{
  width: 100%;
  &>.hisTitle{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #666;
    padding: 0 15px;
    .el-icon-delete{
      padding: 0 10px;
      cursor: pointer;
      &:hover{
        color: #0e7ff1;
      }
    }
  }
  .hisData{
    display: flex;
    flex-wrap: wrap;
    padding: 10px 15px;
    &>span{
      padding: 3px 10px;
      background: #f4f6f8;
      color: #666;
      font-size: 12px;
      margin-right: 10px;
      margin-top: 10px;
      border-radius: 15px;
     cursor: pointer;
    }
    &>span:hover{
        color:#2c81f8 ;
      }
  }
}
</style>
