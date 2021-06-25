<template>
<!-- 我的订单 -->
  <div class="header_myorder" v-loading="loading">
    <div class="fexibtns">

    </div>
    <div class="navlist" >
      <div :style="[
							{
								left: 150 * index + 'px'
							}
						]" v-for="(item, index) in oplist" :key="index" @click="acks(item.io)" class="naops"
           :class="actinst == item.io ? 'actvs' : ''">{{ item.name }}
      </div>
    </div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
             background-color="#ffffff"
             text-color="#000000" active-text-color="#409EFF">
    </el-menu>
    <div class="mopsitl">
      <div class="mopins">
        <div class="mos_ol">
          <div class="motext" v-if="actinst == 4">入住日期</div>
          <div class="motext" v-else>出行日期</div>
          <el-date-picker style="width: 140px;" value-format="yyyy-MM-dd" :editable="editables"
                          :picker-options="startDatePicker"
                          v-model="fikdate" type="date" placeholder="请选择日期" class="datime-style"></el-date-picker>
          <div class="boxtb"></div>
          <el-date-picker style="width: 140px;" value-format="yyyy-MM-dd" :editable="editables"
                          :picker-options="endDatePicker"
                          v-model="enddate" type="date" placeholder="不限" class="datime-style"></el-date-picker>
        </div>
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
        <div class="mosbtns" @click="search">
          查询
        </div>
      </div>
      <div class="inpuslist">
        <div class="instlist">
          <div>订单号：</div>
          <el-input v-model="ordernumber" placeholder="请输入订单号" style="width: 227px;">
          </el-input>
        </div>
        <div class="instlist">
          <div>出行人：</div>
          <el-autocomplete v-model="travellingpeople" placeholder="请输入出行人" style="width: 224px;"
                           :fetch-suggestions="querySearchAsync" @select="handleSelect">
          </el-autocomplete>
        </div>
        <div class="instlist" v-if="actinst == 'tra'">
          <div style="width: 100px;">火车车次号：</div>
          <el-input v-model="trancitysno" placeholder="请输入车次号" style="width: 224px;">
          </el-input>
        </div>
        <div class="instlist" v-if="actinst == 1">
          <div style="width: 100px;">机票航班号：</div>
          <el-input v-model="trancitysno" placeholder="请输入航班号" style="width: 224px;">
          </el-input>
        </div>
        <div class="instlist" v-if="actinst == 4">
          <div style="width: 80px;">酒店名称：</div>
          <el-input v-model="hotname" placeholder="请输入酒店名称" style="width: 150px;">
          </el-input>
        </div>
        <div class="instlist" v-if="actinst == 4">
          <div style="width: 80px;">酒店地址：</div>
          <el-input v-model="hotaddress" placeholder="请输入酒店地址" style="width: 180px;">
          </el-input>
        </div>
      </div>
    
    </div>
    <div class="sitsCon">
      <div class="sits">
        <div style="display: flex;">
          <div class="sitstime" v-for="(item , index) in timeChang" :key="index" @click="timesopk(index+1)" :class="{active:activeTimeIndex==index}">{{item}}</div>
        </div>
        <div>
          <el-select @change="opstlist('enterprisessel')" v-model="enterprise" style="width: 110px;margin-left: 0px;"
                     placeholder="预定类型" class="select-style">
            <el-option v-for="item in enterprises" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
          <el-cascader :disabled="disabled" class="select-style" placeholder="成本中心订单" style="width: 130px;"
                       ref="cascader"
                       :show-all-levels="false" @change="opstlist('handleChange')" :props='bots' v-model="treeListsst"
                       :options="treeLists"></el-cascader>
          <el-select @change="opstlist('orderstatusel')" v-model="orderstatusels" style="width: 110px;"
                     placeholder="订单状态"
                     class="select-style">
            <el-option v-for="item in orderstatuselist" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select @change="opstlist('ordertypel')" v-if="!disablet" :disabled="disablet" v-model="ordertypels"
                     style="width: 110px;"
                     placeholder="订单类型" class="select-style">
            <el-option v-for="item in ordertypelist" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>

      </div>
      </div>
    <div class="boxd" >
      <div v-for="(item,index) in shomlist" :key="index" class="datalis" v-if="shomlist!=undefined&&shomlist.length > 0">
        <div v-if="actinst == 'tra' && ordertypels == 0" class="trainsl" @click="train(item)">
          <div class="tartp">
            <div class="tartp_s">
              <div>火车票</div>
              <div v-if="item.tr.transationOrderNo != null">{{ item.tr.transationOrderNo }}</div>
            </div>
            <div class="tartp_e" v-if="item.traSaleOrderExt">
              <div v-if="enterprise == 1">因公出行</div>
              <div v-if="enterprise == 2">因私出行</div>
              <div class="orderNum">{{ item.traSaleOrderExt.createTime }}</div>
            </div>
          </div>
          <div class="trainslit">
            <div class="setlis" style="height: 60px;">
              <img style="width: 21px;height: 24px;" src="../../../static/image/home/Small-train.png"/>
              <div>{{ replaces(item.traSaleOrderExt.trainName) }}</div>
            </div>
            <div class="traboot">
              <div class="trbtfit">
                <div>
                  {{
                    item.traSaleOrderExt.trainName.substring(item.traSaleOrderExt.trainName.indexOf("（") + 1, item.traSaleOrderExt.trainName.indexOf("）"))
                  }}
                </div>
                <div>
                  启程时间：{{
                    item.traSaleOrderExt.departureTime
                  }}-{{ item.traSaleOrderExt.saleOrderDetailList[0].arrivalTime.substring(10, 19) }}
                </div>
                <div>出行人：{{ item.traSaleOrderExt.name }}</div>
              </div>
              <div class="trbtsed">
                <div>￥{{ item.traSaleOrderExt.premium}}</div>
              </div>
              <div class="trbtend">
                <div class="statusx">
                  <img :src="stanames(item.traSaleOrderExt.orderStatus)" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="item&&actinst == 'tra' && (ordertypels == 1 || ordertypels == 2)" class="trainsl" @click="trains(item)">
          <div class="tartp">
            <div v-if="ordertypels == 1">火车票(退票)</div>
            <div v-if="ordertypels == 2">火车票(改签票)</div>
            <div v-if="item.saleChange.transationOrderNo != null">{{ item.saleChange.transationOrderNo }}</div>
            <div></div>
            <div v-if="ordertypels == 1">申请退票时间:{{ item.createTime }}</div>
            <div v-if="ordertypels == 2">申请改签时间:{{ item.createTime }}</div>
          </div>
          <div class="trainslit">
            <div class="setlis" style="height: 60px;">
              <img style="width: 21px;height: 24px;" src="../../../static/image/home/Small-train.png"/>
              <div v-if="item.traSaleOrderExt.trainName">{{ replaces(item.traSaleOrderExt.trainName) }}</div>
            </div>
            <div class="traboot">
              <div class="trbtfit" v-if="item.traSaleChangeDetailList">
                <div v-if="item.traSaleOrderExt.trainName">{{ replacesli(item.traSaleOrderExt.trainName) }}</div>
                <div v-if="item.traSaleChangeDetailList[0] && item.traSaleChangeDetailList[0].departTime">{{ item.traSaleChangeDetailList[0].departTime }}</div>
                <div v-if="item.traSaleChangeDetailList[0] && item.traSaleChangeDetailList[0].passenagerName">出行人：{{ item.traSaleChangeDetailList[0].passenagerName }}</div>
              </div>
              <div class="trbtsed">
                <div v-if="ordertypels == 2">原单:￥{{ item.traSaleOrderExt.premium }} <span
                    v-if="item.premium != null && item.premium >= 0 ">退：{{ item.premium }}</span>
                  <span v-if="item.premium != null && item.premium < 0 ">付：{{ item.premium }}</span></div>
                <div v-if="ordertypels == 1">￥{{ item.refundPrice }}</div>
              </div>
              <div class="trbtend">
                <div v-if="ordertypels == 1">
                  <img src="../../../static/image/home/Order-returned.png" alt="">
                </div>
                <div v-if="ordertypels == 2"><img :src="typstrain(item.changeStatus)" alt=""></div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="actinst == 4" class="trainsl" @click="hote(item)">
          <div class="tartp">
            <div class="tartp_s">
              <div>国内酒店</div>
              <div v-if="item.tr.transationOrderNo">{{ item.tr.transationOrderNo }}</div>
            </div>
            <div class="tartp_e">
              <div v-if="item.hotelOrder">{{ item.hotelOrder.createOrderTime }}</div>
            </div>

          </div>
          <div class="trainslit" v-if="item.hotelOrder">
            <div class="setlist">
              <div class="hotImg">
                <img v-if="item.hotelOrder.hotelImg != null" :src="item.hotelOrder.hotelImg" alt="">
              </div>

            </div>
            <div class="traboot">
              <div class="trbtfit jd_trbtfit">
                <div>{{ item.hotelOrder.hotelName }}</div>
                <div>地址：{{ item.hotelOrder.hotelAddress }}&nbsp;入住时间：{{ hotimes(item.hotelOrder.arrivalDate) }}</div>
                <div>出行人：{{ item.hotelOrder.guestName }}</div>
              </div>
              <div class="trbtsed">
                <div>￥{{ item.hotelOrder.totalPrice }}</div>
              </div>
              <div class="trbtend">
                <img :class="{imgT:item.hotelOrder.orderStatus == 411 || item.hotelOrder.orderStatus == 410}" :src="item.hotelOrder.orderStatus | hotellUserstatus" alt="">
              </div>
            </div>
          </div>
        </div>
        <div v-if="actinst == 1 && ordertypels == 0" class="trainsl" @click="plane(item)">
          <div v-if="item[0].departTime.length < 25">
            <div class="tartp">
              <div class="tartp_s">
                <div v-if="item.length == 1">国内机票（单程）</div>
                <div v-if="item.length == 2">国内机票（往返）</div>
                 <div class="orderNum">{{ item[0].transationOrderNo }}</div>
              </div>
              <div class="tartp_e">
                <div v-if="enterprise == 1">因公出行</div>
                <div v-if="enterprise == 2">因私出行</div>
               <!-- 退改字 -->
                <div style="color: red;">{{ item[0].itemStatusname }}</div> 
                <div>{{ item[0].orderingTime }}</div>
              </div>
            </div>
            <div class="trainslit">
              <div class="setlis">
                <div style="width: 50px;height: 22px;display: flex;align-items: center;justify-content: center;">
                  <img :src="item[0].ims" mode="" style="width: 24px;height: 22px;"></img>
                </div>
                <div><span
                    style="font-size: 14px;font-weight:bolder;">{{ companys(item[0].airline) }}{{
                    item[0].flightNo
                  }}</span>
                </div>
                <div v-if="item[1] != undefined" style="font-size: 14px;">
                  {{ item[0].flightNo }}/{{ item[1].flightNo }}
                </div>
                <div v-else style="font-size: 14px;">{{ item[0].flightNo }}</div>
              </div>
              <div class="traboot">
                <div class="trbtfit">
                  <div>{{ item[0].voyagea | cityName }}-{{ item[0].voyages | cityName }}</div>
                  <div class="time"><span>启程时间：{{ item[0].departTime }} - {{ item[0].arriveDate }} </span><span
                      v-if="item.length == 2">返程时间：{{ item[1].departTime }}
											- {{ item[1].arriveDate }} </span></div>
                  <div>出行人：{{ item[0].passengers }}</div>
                </div>
                <div class="trbtsed">
                  <div>￥{{ item[0].dealingTicketTotalPrice }}</div>
                </div>
                <div class="trbtend">
                  <div v-if="item[1] == undefined" class="statusx">
                    <img :src="item[0].orderStatus | planeConpan" alt="">
                  </div>
                  <div v-else class="statusx">
                    <img :src="item[0].orderStatus | planeConpan" alt="">
                    <img :src="item[1].orderStatus | planeConpan" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="tartp">
              <div class="tartp_s">
                <div>国内机票(往返)</div>
              </div>
              <div class="tartp_e">
                <div v-if="enterprise == 1">因公出行</div>
                <div v-if="enterprise == 2">因私出行</div>
                <div>{{ item[0].transationOrderNo }}</div>
                <div></div>
                <div>{{ item[0].orderingTime }}</div>
              </div>
            </div>
            <div class="trainslit">
              <div class="setlis">
                <div style="width: 50px;height: 40px;display: flex;align-items: center;justify-content: center;">
                  <img :src="item[0].ims" mode="" style="width: 24px;height: 22px;"></img>
                </div>
                <div><span
                    style="font-size: 14px;font-weight:bolder;#333">{{
                    companys(item[0].airline)
                  }}{{ (item[0].flightNo.split('/'))[0] }}</span>
                </div>
                <div v-if="item[1] != undefined" style="font-size: 14px;#999">
                  {{ item[0].flightNo }}/{{ item[1].flightNo }}
                </div>
                <div v-else style="font-size: 14px;">{{ item[0].flightNo }}</div>
              </div>
              <div class="traboot">
                <div class="trbtfit">
                  <div>{{ item[0].voyagea | cityName }}-{{ item[0].voyages | cityName }}</div>
                  <div>{{ (item[0].departTime.split('/'))[0] }} - {{ (item[0].arriveDate.split('/'))[0] }}</div>
                  <div>出行人：{{ item[0].passengers }}</div>
                </div>
                <div class="trbtsed">
                  <div>￥{{ item[0].dealingTicketTotalPrice }}</div>
                </div>
                <div class="trbtend">
                  <img class="statusx" :src="item[0].orderStatus | planeConpan" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="actinst == 1 && (ordertypels == 2 ||ordertypels == 1)" class="trainsl" @click="planes(item)">
          <div>
            <div class="tartp">
              <div>国内机票(单程)</div>
              <div>{{ item.transationOrderNo }}</div>
              <div></div>
              <div v-if="ordertypels == 2">改签时间:{{ item.items[0].createTime }}</div>
              <div v-if="ordertypels == 1">退票时间:{{ item.items[0].createTime }}</div>
            </div>
            <div class="trainslit">
              <div class="setlis">
                <div style="width: 50px;height: 22px;display: flex;align-items: center;justify-content: center;">
                  <img :src="item.ims" mode="" style="width: 24px;height: 22px;"></img>
                </div>
                <div><span
                    style="font-size: 14px;font-weight:bolder;#333">{{
                    companys(item.items[0].airline)
                  }}{{ item.items[0].flightNo }}</span>
                </div>
                <div style="font-size: 14px;">{{ item.items[0].flightNo }}</div>
              </div>
              <div class="traboot">
                <div class="trbtfit">
                  <div>{{ item.citynames }}-{{ item.citynamey }}</div>
                  <div>启程时间：{{ item.items[0].departTime }}</div>
                  <div>出行人：{{ item.namelist }}</div>
                </div>
                <div class="trbtsed" v-if="ordertypels == 2">
                  <div class="thst">改签票</div>
                  <div>￥{{ item.changeFee }}</div>
                </div>
                <div class="trbtsed" v-if="ordertypels == 1">
                  <div class="thst">退废票</div>
                  <div v-if="(item.status == 7 ||item.status == 8) &&  item.refundAmount > 0">￥{{ item.refundAmount }}
                  </div>
                  <div v-else>￥0</div>
                </div>
                <div class="trbtend" v-if="ordertypels == 2">
                  <img class="statusx" :src="backimgg(item.status)" alt="">
                </div>
                <div class="trbtend" v-if="ordertypels == 1">
                  <img class="statusx" :src="backimgt(item.status)" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     
      <!-- <no-data v-if="shomlist!=undefined&&shomlist.length > 0&&shomlist.length === 0 && loading === false" class="nodata"></no-data> -->
      <no-data v-if="shomlist&&shomlist.length == 0 && loading === false" class="nodata"></no-data>
    </div>
    <div class="block" v-if="shomlist!=undefined&&shomlist.length > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="5"
                     layout="prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
    
  </div>
</template>

<script>
import airports from '../../../static/js/airports.js'
import NoData from "@/components/common/noData";
import { company } from "@/utils/common";
import { arrType , planeStatus,planeRecedeStatus,hotellStatusTow,hotellUserstatus,planeConpan,cityName } from "@/utils/common-filters";
export default {
  components: {NoData},
		filters:{
			arrType,planeStatus,planeRecedeStatus,hotellStatusTow,hotellUserstatus,planeConpan,cityName
		},
  data() {
    return {
      timeChang:["本月","本周"],
      activeTimeIndex:-1,
      titleds: "出行日期",
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
      shomlist:null, //数据
      total: 0, //多少条数据
      currentPage3: 1,
      treeListsst: [],
      loading: false,
      editables: false,
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
      startDatePickerc: this.beginDatec(),
      endDatePickerc: this.processDatec(),
      fikdate: '', //开始时间 出行
      enddate: '', //结束时间
      fikdatec: '', //开始时间 创建
      enddatec: '', //结束时间
      actinst: 1,
      searvalue: '', //搜索的值
      placeholdes: '订单号，城市，乘机人', //默认提示值
      enterprises: [{ //企业支付类型
        label: '不限',
        value: 0
      }, {
        label: '因公出行',
        value: 1
      }, {
        label: '因私出行',
        value: 2
      }],
      treeLists: [], //成本中心
      bots: { //使用props替换掉本来默认的lable和value 的键值
        value: 'id',
        label: 'text'
      },
      NameCenter: { //当前选择成本中心
        name: '',
        id: ''
      },
      orderstatuselist: [], //订单状态
      orderstatusels: '', //订单状态
      ordertypelist: [], //订单类型
      enterprise: '', //企业支付类型
      ordertypels: '', //订单类型
      oplist: [{
        name: '国内机票',
        io: 1
        // },{
        //   name: '国际机票',
        //   io: 2,
      }, {
        name: '火车票',
        io: 'tra'
      }, {
        name: '酒店',
        io: 4
      }],
      activeIndex: '1',
      // trainstaus: [{ //火车正常票订单状态
      //   name: '不限',
      //   id: 0
      // }, {
      //   name: '占座中',
      //   id: 1
      // }, {
      //   name: '待支付',
      //   id: 2
      // }, {
      //   name: '出票中',
      //   id: 3
      // }, {
      //   name: '已出票',
      //   id: 4
      // }, {
      //   name: '退票中',
      //   id: 5
      // }, {
      //   name: '改签中',
      //   id: 6
      // }, {
      //   name: '部分退废',
      //   id: 7
      // }, {
      //   name: '部分改签',
      //   id: 8
      // }, {
      //   name: '已退',
      //   id: 9
      // }, {
      //   name: '订单已废弃',
      //   id: 10
      // }, {
      //   name: '已改签',
      //   id: 11
      // }, {
      //   name: '占座失败',
      //   id: 12
      // }, {
      //   name: '出票失败',
      //   id: 13
      // }],
      trainstaP: [{ //火车改签单状态
        name: '待支付',
        id: 1
      }, {
        name: '改签中',
        id: 2
      },
        {
          name: '改签完成',
          id: 3
        },
        {
          name: '已取消',
          id: 4
        },
        {
          name: '改签失败',
          id: 5
        },
        {
          name: '退票中',
          id: 6
        },
        {
          name: '已退票',
          id: 7
        },
        {
          name: '部分退票',
          id: 8
        }
      ],
      // hotelstaus: [{ //酒店订单状态
      //   name: '不限',
      //   id: 0
      // }, {
      //   name: '待审核',
      //   id: 650
      // }, {
      //   name: '处理中',
      //   id: 100,
      // }, {
      //   name: '待处理',
      //   id: 115,
      // }, {
      //   name: '预定成功',
      //   id: 101,
      // }, {
      //   name: '下单失败',
      //   id: 102,
      // }, {
      //   name: '取消中',
      //   id: 400
      // }, {
      //   name: '取消成功',
      //   id: 401
      // }, {
      //   name: '审批拒绝',
      //   id: 121
      // }, {
      //   name: '占房成功',
      //   id: 122,
      // }],
      // planestaus: [{ //国内机票订单状态
      //   name: '不限',
      //   id: 0
      // }, {
      //   name: '预订中',
      //   id: 1
      // }, {
      //   name: '待审核',
      //   id: 2
      // },
      //   {
      //     name: '待提交',
      //     id: 3
      //   },
      //   {
      //     name: '出票中',
      //     id: 4
      //   },
      //   {
      //     name: '已出票',
      //     id: 5
      //   }, {
      //     name: '已取消',
      //     id: 6
      //   }, {
      //     name: '已拒单',
      //     id: 7
      //   }, {
      //     name: '待支付',
      //     id: 8
      //   }, {
      //     name: '待审批',
      //     id: 9
      //   }, {
      //     name: '已登账',
      //     id: 10
      //   }
      // ],
      planestaust: [{ //国内机票改签订单状态
        name: '不限',
        id: 0
      }, {
        name: '新申请',
        id: 1
      }, {
        name: '已取消',
        id: 2
      }, {
        name: '待审批',
        id: 3
      }, {
        name: '已拒绝',
        id: 4
      }, {
        name: '审批通过待支付',
        id: 5
      }, {
        name: '待提交',
        id: 6
      }, {
        name: '处理中',
        id: 7
      }, {
        name: '已完成',
        id: 8
      }, {
        name: '客户审批',
        id: 9
      }, {
        name: '客户驳回',
        id: 10
      }],
      // planestaustp: [{ //国内机票退票状态
      //   name: '不限',
      //   id: 0
      // }, {
      //   name: '新申请',
      //   id: 1
      // }, {
      //   name: '已取消',
      //   id: 2
      // }, {
      //   name: '待审批',
      //   id: 3
      // }, {
      //   name: '已拒绝',
      //   id: 4
      // }, {
      //   name: '待提交',
      //   id: 5
      // }, {
      //   name: '已提交',
      //   id: 6
      // }, {
      //   name: '已完成',
      //   id: 7
      // }, {
      //   name: '待客户审核',
      //   id: 8
      // }, {
      //   name: '已驳回',
      //   id: 9
      // }],
      retreaeform: [{ //机票火车单类型
        name: '不限',
        id: 0
      }, {
        name: '退票单',
        id: 1
      }, {
        name: '改签单',
        id: 2
      }],
      curPages: 1, //当前第几页
    };
  },
  mounted() {
    let actid = sessionStorage.getItem('actinsts');
    if (actid != null && actid != undefined) {
      this.acks(actid)
    } else {
      this.queryOrders(); //订单查询
      this.orderstatuselist = planeStatus //默认展示国内机票状态
    }
    this.queryAirlineList(); //飞机国内航司查询
    this.predaddress = airports.addressAirportAll;
    this.ordertypelist = this.retreaeform;
    this.selts(); //查询成本中心
  },
  methods: {
    replaces(res) {
      let ti = res.substring(0, res.indexOf("（"));
      return ti;
    },
    replacesli(re) {
      let ti = re.substring(re.indexOf("（") + 1, re.indexOf("）"));
      return ti;
    },
    typstrain(i) {
      console.log(i)
      if (i == 1) {
        return '../../../static/image/home/unpaid.png'
      } else if (i == 2) {
        return '../../../static/image/home/Change-central.png'
      } else if (i == 3) {
        return '../../../static/image/home/Order-changed.png'
      } else if (i == 4) {
        return '../../../static/image/home/Canceled.png'
      } else if (i == 5) {
        return '../../../static/image/home/Upgrade-failed.png'
      } else if (i == 6) {
        return '../../../static/image/home/Return-ticket.png'
      } else if (i == 7) {
        return '../../../static/image/home/Order-returned.png'
      } else if (i == 8) {
        return '../../../static/image/home/Part-retirement.png'
      }
    },
    // backimg(i) {
    //   if (i == 1) {
    //     return '../../../static/image/home/book.png'
    //   } else if (i == 9) {
    //     return '../../../static/image/home/Approval-Pending.png'
    //   } else if (i == 10) {
    //     return '../../../static/image/home/Has-been-booked.png'
    //   } else if (i == 8) {
    //     return '../../../static/image/home/unpaid.png'
    //   } else if (i == 6) {
    //     return '../../../static/image/home/Canceled.png'
    //   } else if (i == 7) {
    //     return '../../../static/image/home/From-single.png'
    //   } else if (i == 4) {
    //     return '../../../static/image/home/ticket.png'
    //   } else if (i == 5) {
    //     return '../../../static/image/home/check.png'
    //   } else if (i == 2) {
    //     return '../../../static/image/home/To-audit.png'
    //   } else if (i == 3) {
    //     return '../../../static/image/home/To-submit.png'
    //   }
    // },
    backimgg(i) {
      if (i == 1) {
        return '../../../static/image/home/new-application.png'
      } else if (i == 2) {
        return '../../../static/image/home/Canceled.png'
      } else if (i == 3) {
        return '../../../static/image/home/Approval-Pending.png'
      } else if (i == 4) {
        return '../../../static/image/home/Approval-refused.png'
      } else if (i == 5) {
        return '../../../static/image/home/unpaid.png'
      } else if (i == 6) {
        return '../../../static/image/home/To-submit.png'
      } else if (i == 7) {
        return '../../../static/image/home/processing.png'
      } else if (i == 8) {
        return '../../../static/image/home/finished.png'
      } else if (i == 9) {
        return '../../../static/image/home/customer-approval.png'
      } else if (i == 10) {
        return '../../../static/image/home/customer-rejected.png'
      }
    },
    backimgt(i) {
      if (i == 1) {
        return '../../../static/image/home/new-application.png'
      } else if (i == 2) {
        return '../../../static/image/home/Canceled.png'
      } else if (i == 3) {
        return '../../../static/image/home/Approval-Pending.png'
      } else if (i == 4) {
        return '../../../static/image/home/From-single.png'
      } else if (i == 5) {
        return '../../../static/image/home/unpaid.png'
      } else if (i == 6) {
        return '../../../static/image/home/submitted.png'
      } else if (i == 7) {
        return '../../../static/image/home/finished.png'
      } else if (i == 8) {
        return '../../../static/image/home/finished.png'
      } else if (i == 9) {
        return '../../../static/image/home/customer-approval.png'
      } else if (i == 10) {
        return '../../../static/image/home/customer-rejected.png'
      }
    },
    stanames(i) {
      if (i == 1) {
        return '../../../static/image/home/In-seat.png'
      } else if (i == 2) {
        return '../../../static/image/home/unpaid.png'
      } else if (i == 3) {
        return '../../../static/image/home/ticket.png'
      } else if (i == 4) {
        return '../../../static/image/home/check.png'
      } else if (i == 5) {
        return '../../../static/image/home/Return-ticket.png'
      } else if (i == 6) {
        return '../../../static/image/home/Change-central.png'
      } else if (i == 7) {
        return '../../../static/image/home/Part-retirement.png'
      } else if (i == 8) {
        return '../../../static/image/home/Part-change.png'
      } else if (i == 9) {
        return '../../../static/image/home/Order-returned.png'
      } else if (i == 10) {
        return '../../../static/image/home/Order-abandoned.png'
      } else if (i == 11) {
        return '../../../static/image/home/Order-changed.png'
      } else if (i == 12) {
        return '../../../static/image/home/Of-failure.png'
      } else if (i == 13) {
        return '../../../static/image/home/Ticket-failure.png'
      }
    },
    plane(item) { //飞机正常单详情
      this.$router.push({
        path: 'planeorderlist',
        query: {
          data: item[0].transationOrderNo,
          EntryMethod: 0
        }
      });
    },
    planes(item) {
      if (this.ordertypels == 1) { //退票
        this.$router.push({
          path: 'chargebackdetailsl',
          query: {
            data: item.no,
            vid: 9

          }
        });
      } else if (this.ordertypels == 2) { //改签票
        this.$router.push({
          path: 'planchange',
          query: {
            data: item.no,
            vid: 11
          }
        });
      }
    },
    hote(item) { //酒店订单详情
      this.$router.push({
        path: 'hoteorderlist',
        query: {
          data: item.tr.transationOrderNo,
          EntryMethod: 0
        }
      });
    },
    train(item) { //火车票正常单详情
      this.$router.push({
        path: 'trainorderlist',
        query: {
          data: item.tr.transationOrderNo,
          EntryMethod: 0
        }
      });
    },
    trains(item) { //火车退改详情
      if (this.ordertypels == 1) { //退票
        this.$router.push({
          path: 'clorderlist',
          query: {
            data: item.saleChangeNo,
            vid: 9
          }
        });
      } else if (this.ordertypels == 2) { //改签票
        this.$router.push({
          path: 'clorderlist',
          query: {
            data: item.outorderNo,
            vid: 11
          }
        });
      }
    },
    trainChangeList() { //火车退改单查询
      let _this = this;
      _this.shomlist =null;
      let sit = _this.actinst;
      let vons = '';
      let vonst = '';
      if (sit == 'tra') {
        sit = 10;
        vonst = this.trancitysno;
        vons = '';
      } else if (sit == 1) {
        vons = this.trancitysno;
        vonst = '';
      }
      let arrs = [];
      if (_this.ordertypels == 1) { //退
        arrs = [2]
      } else if (_this.ordertypels == 2) { //改
        arrs = [3]
      }
      _this.loading = true;
      let dat = {
        pageVO: {
          curPage: _this.curPages, //几页
          rowNum: 5 //一页多少条
        },
        mssOrderRequest: {
          createTypeArray: arrs,
          bookStartDate: _this.fikdatec == '' ? null : _this.fikdatec, //创建时间
          bookEndDate: _this.enddatec == '' ? null : _this.enddatec,
          flyStartDate: _this.fikdate == '' ? null : _this.fikdate, //出行时间
          flyEndDate: _this.enddate == '' ? null : _this.enddate,
          typeName: _this.enterprise,
          trainNo: vonst,
          orderState: _this.orderstatusels, //订单状态
          transationOrderNo: _this.ordernumber, //销售单号
          passenger: _this.travellingpeople, //出行人
          flightNo: _this.trancitysno, //火车单号
        }
      }
      _this.$api.order.trainChangeList(dat).then((res) => { //查询火车退改签订单
        _this.loading = false;
        if (res.code == 200) {
          _this.shomlist = res.data.pageData.records || [];
          _this.total = res.data.pageData.total;
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
    queryChangeInfo() { //飞机改签订单查询
      let _this = this;
      _this.shomlist =null;
      _this.loading = true;
      let dat = {
        pageVO: {
          curPage: _this.curPages, //几页
          rowNum: 5 //一页多少条
        },
        search: {
          minCreateTime: _this.fikdatec == '' || _this.fikdatec == null ? null : _this.fikdatec + ' ' + '00:00:00', //创建时间
          maxCreateTime: _this.enddatec == '' || _this.enddatec == null ? null : _this.enddatec + ' ' + '00:00:00',
          minDepartDate: _this.fikdate == '' || _this.fikdate == null ? null : _this.fikdate + ' ' + '00:00:00', //出行时间
          maxDepartDate: _this.enddate == '' || _this.enddate == null ? null : _this.enddate + ' ' + '00:00:00',
          typeName: _this.enterprise,
          status: _this.orderstatusels, //订单状态
          tradeNo: _this.ordernumber, //销售单号
          passenger: _this.travellingpeople, //出行人
          flightNo: _this.trancitysno, //机票航班号
        }
      }
      _this.$api.order.queryChangeInfo(dat).then((res) => { //查询飞机改签订单
        _this.loading = false;
        if (res.code == 200) {
          _this.shomlist = res.data.rows || [];
          _this.total = res.data.total;
          for (let k in _this.shomlist) { //转换城市名
            _this.shomlist[k]['ims'] = 'http://file.feiren.com/00/02/' + _this.shomlist[k].items[0].airline + '.png'
            _this.shomlist[k]['namelist'] = _this.username(_this.shomlist[k].items);
            _this.shomlist[k]['companys'] = company(_this.shomlist[k].items[0].airline , this.hang);
            _this.shomlist[k]['citynames'] = cityName(_this.shomlist[k].items[0].origDepart);
            _this.shomlist[k]['citynamey'] = cityName(_this.shomlist[k].items[0].origArrive);
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
    queryOrderRefundList() { //飞机退票订单查询
      let _this = this;
      _this.shomlist = null;
      _this.loading = true;
      let dat = {
        curPage: _this.curPages, //几页
        rowNum: 5, //一页多少条
        minApplyDate: _this.fikdatec == '' || _this.fikdatec == null ? null : _this.fikdatec + ' ' + '00:00:00', //创建时间
        maxApplyDate: _this.enddatec == '' || _this.enddatec == null ? null : _this.enddatec + ' ' + '00:00:00',
        minDepartDate: _this.fikdate == '' || _this.fikdate == null ? null : _this.fikdate + ' ' + '00:00:00', //出行时间
        maxDepartDate: _this.enddate == '' || _this.enddate == null ? null : _this.enddate + ' ' + '00:00:00',
        typeName: _this.enterprise,
        statuses: _this.orderstatusels, //订单状态
        tradeNo: _this.ordernumber, //销售单号
        passager: _this.travellingpeople, //出行人
        flightNo: _this.trancitysno //机票航班号
      }
      _this.$api.order.queryOrderRefundList(dat).then((res) => { //查询飞机退票订单
        _this.loading = false;
        if (res.code == 200) {
          let dawt = res.data.pageData.records;
          _this.total = res.data.pageData.total;
          for (let k in dawt) { //转换城市名
            dawt[k]['ims'] = 'http://file.feiren.com/00/02/' + dawt[k].items[0].airline + '.png'
            dawt[k]['namelist'] = _this.username(dawt[k].items);
            dawt[k]['companys'] = company(dawt[k].items[0].airline , this.hang);
            dawt[k]['citynames'] = cityName(dawt[k].items[0].depart);
            dawt[k]['citynamey'] = cityName(dawt[k].items[0].arrive);
          }
          _this.shomlist = dawt || [];
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
    username(list) { //乘机人
      if (list.length > 0) {
        let sue = [];
        for (let i = 0; i < list.length; i++) {
          sue.push(list[i].name)
        }
        return [...new Set(sue)].join(',')
      } else {
        return ""
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
              lists.push({
                value: namelist[i].name
              })
              let restaurants = lists;
              let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                cb(results);
              }, 3000 * Math.random());
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
    hotimes(time) { //酒店时间转换
      return time.substring(0, 10)
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
    queryOrders() { //订单查询
      let _this = this;
      _this.shomlist = null
      _this.loading = true;
      let sit = _this.actinst;
      let vons = '';
      let vonst = '';
      if (sit == 'tra') {
        sit = 10;
        vonst = this.trancitysno;
        vons = '';
      } else if (sit == 1) {
        vons = this.trancitysno;
        vonst = '';
      }
      if (sit == 1 || sit == 10) { //查询火车机票订单
        let dat = {
          pageVO: {
            curPage: _this.curPages, //几页
            rowNum: 5 //一页多少条
          },
          mssOrderRequest: {
            productType: sit, //10火车 1 飞机
            bookStartDate: _this.fikdatec, //创建时间
            bookEndDate: _this.enddatec,
            flyStartDate: _this.fikdate, //出行时间
            flyEndDate: _this.enddate,
            constcenterId: _this.NameCenter.id, //成本中心id
            typeName: _this.enterprise,
            orderState: _this.orderstatusels, //订单状态
            transationOrderNo: _this.ordernumber, //销售单号
            passenger: _this.travellingpeople, //出行人
            flightNo: vons, //机票航班号
            trainNo: vonst //火车车次号
          }
        }
        _this.$api.order.queryOrders(dat).then((res) => { //查询火车飞机正常订单
          _this.loading = false;
          if (res.code == 200) {
            _this.shomlist = res.data.rows || [];
            _this.total = res.data.records;
            if (sit == 1) {
              for (let k in _this.shomlist) { //转换城市名
                if (_this.shomlist[k][0].voyage.length > 10) {
                  _this.shomlist[k][0]['ims'] = 'http://file.feiren.com/00/02/' + (_this.shomlist[k][0].airline.split('/'))[
                      0] + '.png'
                  let nas = _this.shomlist[k][0].voyage.split('/');
                  let names = nas[0].split('-');
                  _this.shomlist[k][0]['voyagea'] = names[0]
                  _this.shomlist[k][0]['voyages'] = names[1]
                } else {
                  _this.shomlist[k][0]['ims'] = 'http://file.feiren.com/00/02/' + _this.shomlist[k][0].airline + '.png'
                  let names = _this.shomlist[k][0].voyage.split('-');
                  _this.shomlist[k][0]['voyagea'] = names[0]
                  _this.shomlist[k][0]['voyages'] = names[1]
                }
                if (_this.shomlist[k][0].itemStatus != null) {
                  if (_this.shomlist[k][0].itemStatus.includes('2,3')) {
                    _this.shomlist[k][0]['itemStatusname'] = '(改,退)';
                  } else if (_this.shomlist[k][0].itemStatus.includes('2')) {
                    _this.shomlist[k][0]['itemStatusname'] = '(改)';
                  } else if (_this.shomlist[k][0].itemStatus.includes('3')) {
                    _this.shomlist[k][0]['itemStatusname'] = '(退)';
                  }
                }
              }
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
      } else if (sit == 4) {
        let dat = {
          pageVO: {
            curPage: _this.curPages, //几页
            rowNum: 5 //一页多少条
          },
          hotelOrderVo: {
            createStartTime: _this.fikdatec == '' || _this.fikdatec == null ? null : _this.fikdatec + ' ' + '00:00:00', //创建时间
            createEndTime: _this.enddatec == '' || _this.enddatec == null ? null : _this.enddatec + ' ' + '00:00:00',
            arrivalStartDate: _this.fikdate == '' || _this.fikdate == null ? null : _this.fikdate + ' ' + '00:00:00', //出行时间
            arrivalEndDate: _this.enddate == '' || _this.enddate == null ? null : _this.enddate + ' ' + '00:00:00',
            constcenterId: _this.NameCenter.id, //成本中心id
            typeName: _this.enterprise,
            orderStatus: _this.orderstatusels, //订单状态
            transactionNo: _this.ordernumber, //销售单号
            guestName: _this.travellingpeople, //出行人
            hotelName: _this.hotname, //酒店名称
            cityName: _this.hotaddress, //酒店地址
          }
        }
        _this.$api.order.searchHotelOrderList(dat).then((res) => { //查询酒店订单
          _this.loading = false;
          if (res.code == 200) {
            _this.shomlist = res.data.rows ||[];
            _this.total = res.data.records;
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
      }
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
    search() { //点击查询
      if (this.actinst == 1 && this.ordertypels == 2) {
        this.queryChangeInfo(); //飞机改签
      } else if (this.actinst == 1 && this.ordertypels == 1) {
        this.queryOrderRefundList(); //飞机退票
      } else if (this.actinst == 'tra' && (this.ordertypels == 1 || this.ordertypels == 2)) {
        this.trainChangeList(); //火车退改签
      } else {
        this.queryOrders(); //飞机酒店火车默认查询
      }
    },
    handleCurrentChange(val) { //翻页
      this.curPages = val;
      this.search();
    },
    selts() { //查询成本中心
      let _this = this;
      _this.loading = true;
      _this.$api.home.getCostCenterList().then((res) => { //查询成本中心
        if (res.code == 200) {
          _this.treeLists = res.data[0].children;
          _this.treeLists.unshift({
            id: 0,
            text: '不限'
          })
        } else {
          _this.loading = false;
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
    opstlist(va) {
      this.curPages = 1; //几页
      this.currentPage3 = 1;
      if (va == 'handleChange') { //选择成本中心
        if (this.treeListsst[0] == 0) {
          this.treeListsst = '';
          this.NameCenter.name = "";
          this.NameCenter.id = "";
        } else {
          let nodesObj = this.$refs['cascader'].getCheckedNodes(); //获取当前节点的信息
          this.NameCenter.name = nodesObj[0].data.text;
          this.NameCenter.id = nodesObj[0].data.id;
        }
      } else if (va == 'enterprisessel') { //预定类型
        if (this.enterprise == 0) {
          this.enterprise = ''
        }
      } else if (va == 'orderstatusel') { //订单类型
        if (this.orderstatusels == 0) {
          this.orderstatusels = ''
        }
      } else if (va == 'ordertypel') { //订单状态
        this.treeListsst = '';
        this.NameCenter.name = "";
        this.NameCenter.id = "";
        if (this.ordertypels == 0) { //不限查询默认为空
          this.disabled = false;
          this.ordertypels = ''
          if (this.actinst == 1) {
            this.orderstatuselist = this.planestaust; //展示国内机票状态
          } else if (this.actinst == 'tra') {
            this.orderstatuselist = arrType; //展示火车票状态
          }
          this.queryOrders()
        } else {
          this.disabled = true;
          if (this.ordertypels == 2) {
            if (this.actinst == 1) { //飞机改签票查询
              this.orderstatuselist = this.planestaust; //展示国内机票改签单状态
            } else if (this.actinst == 'tra') {
              this.orderstatuselist = this.trainstaP; //展示火车改签单状态
            }
          } else if (this.ordertypels == 1) {
            if (this.actinst == 1) { //飞机退票查询
              this.orderstatuselist = planeRecedeStatus; //展示国内机票改签单状态
            }
          }
        }
      }
      if (this.ordertypels == 0) { //不限查询默认为空
        this.queryOrders()
      } else {
        if (this.ordertypels == 2) {
          if (this.actinst == 1) { //飞机改签票查询
            this.queryChangeInfo(); //飞机改签订单查询
          } else if (this.actinst == 'tra') { //火车改签
            this.trainChangeList();
          }
        } else if (this.ordertypels == 1) {
          if (this.actinst == 1) { //飞机退票查询
            this.queryOrderRefundList(); //飞机退票订单查询
          } else if (this.actinst == 'tra') { //火车退票
            this.orderstatusels = '';
            this.orderstatuselist = []; //火车退票订单默认都为 已退状态
            this.trainChangeList();
          }
        }
      }
    },
    acks(it) {
      this.activeTimeIndex = -1
      this.actinst = it;
      sessionStorage.setItem('actinsts', it)
      this.disablet = false;
      if (it == 1 || it == '1') {
        this.titleds = "出行日期";
        this.orderstatuselist = planeStatus //展示国内机票状态
      } else if (it == 'tra') {
        this.titleds = "出行日期";
        this.orderstatuselist = arrType; //展示火车票状态
      } else if (it == 4 || it == '4') {
        this.titleds = "入住日期";
        this.disablet = true;
        this.orderstatuselist = hotellStatusTow; //展示酒店状态
      }
      this.curPages = 1; //几页
      this.currentPage3 = 1;
      this.fikdatec = ''; //创建时间
      this.enddatec = '';
      this.fikdate = ''; //出行时间
      this.enddate = '';
      this.NameCenter.id = ''; //成本中心id
      this.enterprise = ''; //因公因私
      this.orderstatusels = ''; //订单状态
      this.ordernumber = ''; //销售单号
      this.travellingpeople = ''; //出行人
      this.hotname = ''; //酒店名称
      this.hotaddress = ''; //酒店地址
      this.ordertypels = '';
      if (it == 1 || it == 'tra' || it == 4) {
        this.queryOrders();
      }
    },
    // hotelstatusimg(st) {
    //   if (st == 650) {
    //     return '../../../static/image/home/To-audit.png'
    //   } else if (st == 100) {
    //     return '../../../static/image/home/processing.png'
    //   } else if (st == 115) {
    //     return '../../../static/image/home/Pending.png'
    //   } else if (st == 101) {
    //     return '../../../static/image/home/book-successfully.png'
    //   } else if (st == 102) {
    //     return '../../../static/image/home/Order-failed.png'
    //   } else if (st == 400) {
    //     return '../../../static/image/home/Cancelled.png'
    //   } else if (st == 401) {
    //     return '../../../static/image/home/Canceled.png'
    //   } else if (st == 121) {
    //     return '../../../static/image/home/Approval-refused.png'
    //   } else if (st == 122) {
    //     return '../../../static/image/home/Building-successful.png'
    //   }
    // },
    beginDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.enddate) {
            //如果结束时间不为空，则小于结束时间
            return new Date(self.enddate).getTime() < time.getTime();
          } else {
          }
        }
      };
    },
    processDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.fikdate) {
            //如果开始时间不为空，则结束时间大于开始时间
            return new Date(self.fikdate).getTime() > time.getTime();
          } else {
          }
        }
      };
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
    timesopk(t) {
      this.activeTimeIndex = t-1
      let datw = new Date();
      let moust = datw.getMonth() + 1 < 9 ? '0' + (datw.getMonth() + 1) : datw.getMonth() + 1;
      let dats = datw.getDate() < 9 ? '0' + datw.getDate() : datw.getDate();
      if (t == 1) { //获取当前一个月之内的数据
        this.fikdate = datw.getFullYear() + '-' + moust + '-' + '01';
        this.enddate = datw.getFullYear() + '-' + moust + '-' + dats;
        this.queryOrders();
      } else { //获取当前一个周之内的数据
        let timesStamp = datw.getTime();
        let currenDay = datw.getDay();
        let dates = '';
        dates = new Date(timesStamp + 24 * 60 * 60 * 1000 * (0 - (currenDay + 6) % 7)).toLocaleDateString().replace(/\//g,
            '-')
        this.fikdate = dates
        this.enddate = datw.getFullYear() + '-' + moust + '-' + dats;
        this.queryOrders();
      }
    }
  }
};
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

/deep/ .el-menu.el-menu--horizontal {
  border-bottom: none;
}

.header_myorder {
  width: 1180px;
  margin: 0 auto;
  padding: 5px 10px 10px;
  position: relative;

  .fexibtns {
    position: absolute;
    top: 65px;
    left: 10px;
    width: 1180px;
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
      z-index: 70;
      top: 0;
      min-width: 136px;
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
    margin-top: 12px;
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
        background-color: #FF9A33;
        color: #FFFFFF;
        font-size: 14px;
        text-align: center;
        line-height: 50px;
        border-radius: 3px;
        cursor: pointer;
      }

      .mosbtns:hover {
        opacity: 0.8;
      }
    }

    .inpuslist {
      display: flex;
      width: 100%;
      margin-top: 20px;

      .instlist {
        display: flex;
        margin-right: 20px;
        font-size: 14px;

        div {
          line-height: 40px;
          width: 60px;
        }
      }
    }

   
  }
  .sitsCon{
    position: relative;
     height: 40px;
    background: #fff;
    margin-top: 11px;
     border: 1px solid #E6E6E6;
    .sits {
      width: 1130px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px 0 30px;
      position: absolute;
      top: 0;
      left: 0;
      .sitstime {
        cursor: pointer;
        font-size: 14px;
        margin-right: 30px;
      }

      .sitstime:hover {
        color: #FF6957;
      }
      .active{
         color: #FF6957;
      }
    }
     }
  .boxd {
    width: 100%;
    margin-top: 0;
    min-height: 400px;
    .datalis {
      margin-bottom: 20px;
      width: 100%;
      border-radius: 2px;
      background-color: #FFFFFF;
      box-shadow: 0 0 14px 0 rgba(177, 190, 203, 0.2);
      transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;

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
          }

          .tartp_e {
            display: flex;
            color: #999;
            font-size: 14px;
           
          }
          div:nth-child(3) {
          }

          div:nth-child(4) {
            font-size: 14px;
            margin: 0 10px;
            color: #B9A6A6;
          }
          .orderNum{
              margin: 0!important;
            }
        }

        .trainslit {
          width: 100%;
          height: 120px;
          display: flex;
          cursor: pointer;
          align-items: center;

          .setlist {
            width: 17%;
            height: 90px;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            div {
              height: 90px;

              img {
                width: 134px;
                height: 90px;
              }
            }
            .hotImg{
                width: 134px;
              background-color: #ddd;
            }
          }

          .setlis {
            width: 15%;
            height: 80px;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            div {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              img {
                width: 134px;
                height: 90px;
              }
              
            }
            
            &>div:nth-child(2){
              margin: 8px 0;
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
              .time{
                .mixin_displayBox(@fd:column,@ai:flex-start);
              }
            }
            .jd_trbtfit{
              width: 560px;
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
              &>.imgT{
                  width: 90px;
                  margin-right: -11px;
                  // height: 73px;
              }
              .statusx {
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                  width: 73px;
                  height: 73px;
                }
                &>img:nth-child(1){
                  margin-right: 10px;
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
