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
          <el-input v-model="ordernumber" placeholder="请输入订单号" style="width: 200px;">
          </el-input>
        </div>
        <div class="instlist" v-if="actinst == 1">
          <div>出差单号：</div>
          <el-input v-model=" tripNumber" placeholder="请输入出差单号" style="width: 200px;">
          </el-input>
        </div>
        <div class="instlist">
          <div>出行人：</div>
          <el-autocomplete v-model="travellingpeople" placeholder="请输入出行人" style="width: 140px;"
                           :fetch-suggestions="querySearchAsync" @select="handleSelect">
          </el-autocomplete>
        </div>
        <div class="instlist" v-if="actinst == 'tra'">
          <div style="width: 100px;">火车车次号：</div>
          <el-input v-model="trancitysno" placeholder="请输入车次号" style="width: 200px;">
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
      <div class="sits sitsAct">
        <div style="display: flex;">
          <div class="sitstime" v-for="(item , index) in timeChang" :key="index" @click="timesopk(index+1)" :class="{active:activeTimeIndex==index}">{{item}}</div>
        </div>
        <!-- <div v-if="actinst != 1">
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
        </div> -->
        <div class="airTabList">
          <span v-for="(it , index) in airTab" :key="index" @click="airTabClick(it,index)" :class="{activeClass:activeTab == index}" v-if="it.flag">{{it.text}}</span>
        </div>
      </div>
    </div>
    <div class="boxdHead boxdHeadBack">
        <div class="boxdHead_list">
          <span>预定单号</span>
        </div>
        <div class="boxdHead_list">
          <span>下单时间</span>
        </div>
        <div class="boxdHead_list">
          <span>行程</span>
        </div>
        <div class="boxdHead_list">
          <span v-if="actinst == 1">起飞时间</span>
          <span v-if="actinst == 'tra'">发车时间</span>
          <span v-if="actinst == 4">入住时间</span>
        </div>
        <div class="boxdHead_list">
          <span>出行人</span>
        </div>
        <div class="boxdHead_list">
          <span>订单金额</span>
        </div>
        <div class="boxdHead_list">
          <!-- <span>订单状态</span> -->
           <el-select v-model="orderstatusels"
                     placeholder="订单状态"
                     class="select-style"
                     @change="selectChang(orderstatusels,1)"
                     >
            <el-option v-for="item in orderstatuselist" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="boxdHead_list" v-if="actinst == 1 || actinst =='tra'">
          <!-- <span>票面状态</span> -->
           <el-select v-model="airOrderStatusP"
                     placeholder="票面状态"
                     class="select-style"
                     @change="selectChang(airOrderStatusP,2)"
                     >
            <el-option v-for="item in airOrderStatusPiao" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
    </div>
    <div class="boxd">
      <div v-for="(item,indexT) in shomlist" :key="indexT" class="datalis" v-if="shomlist!=undefined&&shomlist.length > 0">
        <!-- 火车票 -->
        <div v-if="actinst == 'tra'" class="trainsl boxdHead" @click="train(item)">
           <div class="boxdHead_list airOrder">
              <!--  预定出票单   预定单号-->
             <span>{{ordertypels == 0 ? item.tr.transationOrderNo :item.saleChange.transationOrderNo}}</span>
           </div>
           <!-- 下单时间 -->
           <div class="boxdHead_list orderTime">
             <span>{{ordertypels == 0 ? item.traSaleOrderExt.createTime : item.createTime}}</span>
           </div>
           <!-- 行程 -->
          <div class="boxdHead_list journey" v-if="ordertypels == 0">
              {{item.traSaleOrderExt.trainName.substring(item.traSaleOrderExt.trainName.indexOf("（") + 1, item.traSaleOrderExt.trainName.indexOf("）"))}}
           </div>
          <div class="boxdHead_list journey" v-else>
            {{ replacesli(item.traSaleOrderExt.trainName)}}
           </div>
           <!-- 发车时间-->
            <div class="boxdHead_list takeOffTime" v-if="ordertypels == 0">
             <span>{{item.traSaleOrderExt.departureTime}} - {{item.traSaleOrderExt.saleOrderDetailList[0].arrivalTime.substring(10, 19) }}</span>
           </div>
            <div class="boxdHead_list takeOffTime" v-else>
             <span>{{item.traSaleChangeDetailList[0].departTime}} - {{item.traSaleChangeDetailList[0].arrivalTime.substring(10, 19)}}</span>
           </div>
            <!-- 出行人 -->
           <div class="boxdHead_list orderPepor" :title="item.traSaleOrderExt.name" v-if=" ordertypels == 0 ">
             <span>{{ item.traSaleOrderExt.name }}</span>
           </div>
           <div class="boxdHead_list orderPepor" :title=" item.traSaleChangeDetailList[0].passenagerName" v-else>
             <span>{{ item.traSaleChangeDetailList[0].passenagerName }}</span>
           </div>
          <!-- 订单金额 -->
           <div class="boxdHead_list orderPrice">
             <span v-if="ordertypels == 0">￥{{item.traSaleOrderExt.premium }}</span>
             <span v-if="ordertypels == 2">￥{{ item.traSaleOrderExt.premium }}</span>
             <span v-if="ordertypels == 1">￥{{ item.refundPrice || 0 }}</span>
           </div>
           <!-- 订单状态 -->
           <div class="boxdHead_list orderSatatus" v-if="ordertypels == 0">
             <span>{{item.traSaleOrderExt.examineStatus }}</span>
           </div>
           <!-- <div class="boxdHead_list orderSatatus" v-if="ordertypels == 1">
             <span>退票单</span>
           </div> -->
           <div class="boxdHead_list orderSatatus" v-if="ordertypels == 2">
             <span>{{ item.changeStatus }}</span>
           </div>
           <!-- 票面状态 -->
           <div class="boxdHead_list airStatus">
              <span>{{item.traSaleOrderExt.orderStatus | orderStatusId }}</span>
           </div> 

        </div>
        <!-- <div v-if="actinst == 'tra' && ordertypels == 0" class="trainsl" @click="train(item)">
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
        </div> -->
        <!-- 酒店 -->
        <div v-if="actinst == 4" class="trainsl boxdHead" @click="hote(item)">
           <div class="boxdHead_list airOrder">
              <!--  预定出票单   预定单号-->
             <span>{{item.tr.transationOrderNo}}</span>
           </div>
           <!-- 下单时间 -->
           <div class="boxdHead_list orderTime">
             <span>{{item.hotelOrder.createOrderTime}}</span>
           </div>
           <!-- 行程 -->
          <div class="boxdHead_list journey">
              {{item.hotelOrder.hotelAddress.split('市')[0] + '市'}}
           </div>
           <!-- 入住时间-->
            <div class="boxdHead_list takeOffTime">
             <span>{{item.hotelOrder.arrivalDate}}</span>
           </div>
            <!-- 出行人 -->
           <div class="boxdHead_list orderPepor" :title="item.hotelOrder.guestName">
             <span>{{ item.hotelOrder.guestName }}</span>
           </div>
          <!-- 订单金额 -->
           <div class="boxdHead_list orderPrice">
             <span>￥{{item.hotelOrder.totalPrice}}</span>
           </div>
           <!-- 订单状态 -->
           <div class="boxdHead_list orderSatatus">
             <span>{{item.hotelOrder.orderStatus}}</span>
           </div>
          <!-- <div class="tartp">
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
                <img :src="item.hotelOrder.orderStatus | hotellUserstatus" alt="">
              </div>
            </div>
          </div> -->
        </div>
        <!-- 机票 -->
        <div v-if="actinst == 1" class="trainsl boxdHead" @click="plane(item)">
          <!-- <div> -->
           <div class="boxdHead_list airOrder">
             <span>{{ordertypels == 0 ? item[0].transationOrderNo :item[0].no}}</span>
             <!--  预定出票单   预定单号-->
            <div v-if="ordertypels == 0 ">   
                <span class="chang" v-if="item[0].itemStatusname">{{ item[0].itemStatusname }}</span>
               <!-- <span>改</span> -->
                <span v-if="item.length == 1 && item[0].departTime.length < 25">（单程）</span>
                <!-- 假往返 -->
                <span v-if="item.length == 2">（往返）</span>   
                 <!-- 真往返 -->
                <span v-if="item.length == 1&&item[0].departTime.length >= 25">（往返）</span>   
             </div>
             <!-- 改签退票单 -->
             <div v-else>
                <span class="chang" v-if="item[0].itemStatusname">{{ item[0].itemStatusname }}</span>
                <span v-if="item[0].items.length == 1">（单程）</span>
                <span v-if="item[0].items.length == 2">（往返）</span>   
             </div>
           </div>
           <!-- 下单时间 -->
           <div class="boxdHead_list orderTime">
             <span>{{ordertypels == 0 ? item[0].items[0].orderingTime : item[0].items[0].createTime}}</span>
           </div>
           <!-- 行程 -->
          <div class="boxdHead_list journey">
             <span v-if="ordertypels == 0">{{ item[0].voyagea | cityName }} - {{ item[0].voyages | cityName }}</span>
             <span v-else>{{ item[0].citynames }} - {{ item[0].citynamey }}</span>
             <div v-if="ordertypels == 0">
               <span>{{ item[0].flightNo }}</span><span v-if="item.length > 1">/{{ item[1].flightNo }}</span>
             </div>
              <div v-if="ordertypels == 2">
              <span>{{item[0].items[0].origFlightNo}}</span>
              <span v-if="item[0].items.length == 2">/{{ item[0].items[1].origFlightNo }}</span>
            </div>
              <div v-if="ordertypels == 1">
              <span>{{item[0].items[0].flightNo}}</span>
              <span v-if="item[0].items.length == 2">/{{ item[0].items[1].flightNo }}</span>
            </div>
           </div>
           <!-- 起飞时间 假往返-->
            <div class="boxdHead_list takeOffTime" v-if="ordertypels == 0 && item[0].departTime.length < 25">
             <span>去程：{{ item[0].departTime }} - {{ item[0].arriveDate }}</span>
             <span v-if="item.length == 2">回程：{{ item[1].departTime }} - {{ item[1].arriveDate }}</span>
           </div>
            <!-- 起飞时间 真往返-->
            <div class="boxdHead_list takeOffTime" v-if="ordertypels == 0&&item.length == 1 && item[0].departTime.length >= 25">
             <span>去程：{{ item[0].departTimes }} - {{ item[0].Times }}</span>
             <span>回程：{{ item[0].arriveDates }} - {{ item[0].Dates }}</span>
           </div>
            <!-- 起飞时间 改 退单往返-->
           <div class="boxdHead_list takeOffTime" v-if="ordertypels != 0">
              <span>去程：{{ item[0].items[0].departTime }}</span> 
              <span v-if="item[0].items.length == 2"> 回程：{{ item[0].items[1].departTime }}</span> 
            </div>   
               <!-- 出行人 -->
            <div class="boxdHead_list orderPepor" :title="item[0].passengers" v-if=" ordertypels == 0 ">
             <span>{{ item[0].passengers }}</span>
           </div>
           <!-- 改 退出行人 -->
            <div class="boxdHead_list orderPepor" :title="item[0].namelist" v-else >
             <span>{{ item[0].namelist }}</span>
           </div>
           <!-- 订单金额 -->
           <div class="boxdHead_list orderPrice">
             <span v-if="ordertypels == 0">￥{{ item[0].dealingTicketTotalPrice }}</span>
             <span v-if="ordertypels == 2">￥{{ item[0].changeFee }}</span>
             <span v-if="ordertypels == 1">￥{{ item[0].refundAmount || 0 }}</span>
           </div>
           <!-- 订单状态 -->
           <div class="boxdHead_list orderSatatus" v-if="activeTab == 0 ||activeTab == 1 ||activeTab == 2">
             <span>{{item[0].taskStatus  |  airReserveStatusName }}</span>
           </div>
           <div class="boxdHead_list orderSatatus" v-if="activeTab == 3">
             <span>{{item[0].taskStatus  |  planeChangType }}</span>
           </div>
           <div class="boxdHead_list orderSatatus" v-if="activeTab == 4">
             <span>{{item[0].taskStatus  |  tuistauststatus }}</span>
           </div>
           <!-- 票面状态 -->
           <div class="boxdHead_list airStatus">
             <span v-if="activeTab == 0 ||activeTab == 1 ||activeTab == 2">{{item[0].orderStatus | airOrderStatusName}}</span>
             <span v-if="activeTab == 3">{{item[0].ticketStatus | changPlanestaustType}}</span>
             <span v-if="activeTab == 4">{{item[0].ticketStatus | tuiPlanesType}}</span>
           </div> 
            <!-- <div class="tartp">
              <div class="tartp_s">
                <div v-if="item.length == 1">国内机票（单程）</div>
                <div v-if="item.length == 2">国内机票（往返）</div>
                 <div class="orderNum">{{ item[0].transationOrderNo }}</div>
              </div>
              <div class="tartp_e">
                <div v-if="enterprise == 1">因公出行</div>
                <div v-if="enterprise == 2">因私出行</div>
                <div style="color: red;">{{ item[0].itemStatusname }}</div> 
                <div>{{ item[0].orderingTime }}</div>
              </div>
            </div> -->
            <!-- <div class="trainslit">
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
            </div> -->
          <!-- </div> -->
          <!-- <div v-else>
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
          </div> -->
        </div>
        <!-- <div v-if="actinst == 1 && (ordertypels == 2 ||ordertypels == 1)" class="trainsl" @click="planes(item)">
          <div>
            <div class="tartp">
              <div>国内机票(单程)</div>
              <div>{{ item.transationOrderNo }}</div>
              <div></div>
              <div v-if="ordertypels == 2">改签时间:{{ item.createTime }}</div>
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
        </div> -->
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
import airports from "../../../static/js/airports.js";
import NoData from "@/components/common/noData";
import { company } from "@/utils/common";
import {
  arrType,
  planeStatus,
  planeRecedeStatus,
  hotellStatusTow,
  hotellUserstatus,
  planeConpan,
  airReserveStatusName,
  cityName,
  planeConpanName,
  airOrderStatusName,
  airOrderStatus,
  airReserveStatus,
  planestaust,
  planeChangType,
  changPlanestaustType,
  changPlanestaust,
  tuistaust,
  tuiPlanestaust,
  tuistauststatus,
  tuiPlanesType,
  orderStatusId,
} from "@/utils/common-filters";
export default {
  components: { NoData },
  filters: {
    arrType,
    planeStatus,
    planeRecedeStatus,
    hotellStatusTow,
    hotellUserstatus,
    planeConpan,
    airReserveStatusName,
    cityName,
    planeConpanName,
    airOrderStatusName,
    airOrderStatus,
    airReserveStatus,
    planestaust,
    planeChangType,
    changPlanestaustType,
    changPlanestaust,
    tuistauststatus,
    tuiPlanesType,
    orderStatusId,
    tuistaust,
    tuiPlanestaust,

  },
  data() {
    return {
      timeChang: ["本月", "本周"],
      activeTimeIndex: -1,
      titleds: "出行日期",
      disablet: false, //是否有状态类型
      disabled: false, //是否禁用成本中心
      hang: [], //飞机航司名称
      hotname: "", //酒店名称
      hotaddress: "", //酒店地址
      predaddress: [], //航空名字
      timeout: null,
      ordernumber: "", //订单号
      tripNumber:'',//出差单号
      travellingpeople: "", //出行人
      trancitysno: "", //火车飞机号
      shomlist: null, //数据
      total: 0, //多少条数据
      currentPage3: 1,
      treeListsst: [],
      loading: false,
      editables: false,
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
      startDatePickerc: this.beginDatec(),
      endDatePickerc: this.processDatec(),
      fikdate: "", //开始时间 出行
      enddate: "", //结束时间
      fikdatec: "", //开始时间 创建
      enddatec: "", //结束时间
      actinst: 1,
      searvalue: "", //搜索的值
      placeholdes: "订单号，城市，乘机人", //默认提示值
      enterprises: [
        {
          //企业支付类型
          label: "不限",
          value: 0,
        },
        {
          label: "因公出行",
          value: 1,
        },
        {
          label: "因私出行",
          value: 2,
        },
      ],
      treeLists: [], //成本中心
      bots: {
        //使用props替换掉本来默认的lable和value 的键值
        value: "id",
        label: "text",
      },
      NameCenter: {
        //当前选择成本中心
        name: "",
        id: "",
      },
      orderstatuselist: [], //订单状态
      orderstatusels: "", //订单状态
      airOrderStatusPiao:[],
      airOrderStatusP:"",//票面状态
      ordertypelist: [], //订单类型
      enterprise: "", //企业支付类型
      ordertypels: "", //订单类型
      oplist: [
        {
          name: "国内机票",
          io: 1,
          // },{
          //   name: '国际机票',
          //   io: 2,
        },
        {
          name: "火车票",
          io: "tra",
        },
        {
          name: "酒店",
          io: 4,
        },
      ],
      activeIndex: "1",
      trainstaP: [
        {
          //火车改签单状态
          name: "待支付",
          id: 1,
        },
        {
          name: "改签中",
          id: 2,
        },
        {
          name: "改签完成",
          id: 3,
        },
        {
          name: "已取消",
          id: 4,
        },
        {
          name: "改签失败",
          id: 5,
        },
        {
          name: "退票中",
          id: 6,
        },
        {
          name: "已退票",
          id: 7,
        },
        {
          name: "部分退票",
          id: 8,
        },
      ],
      // planestaust: [ //国内机票改签订单状态
      //   {
      //     name: "不限",
      //     id: 0,
      //   }, {
      //     name: '改签待审批',
      //     id: 1
      //   }, {
      //     name: '待企业审批',
      //     id: 2
      //   }, {
      //     name: '待支付',
      //     id: 3
      //   }, {
      //     name: '已支付',
      //     id: 4
      //   }, {
      //     name: '改签审批通过',
      //     id: 5
      //   }, {
      //     name: '改签审批拒绝',
      //     id: 6
      //   }, {
      //     name: '免审',
      //     id: 7
      //   }      
      // ],
    // tuistaust:[ ////国内机票退票状态
    //   {
    //     name: "不限",
    //     id: 0,
    //   }, {
    //     name: '退票待审批',
    //     id: 1
    //   }, {
    //     name: '待企业审批',
    //     id: 2
    //   }, {
    //     name: '退票审批通过',
    //     id: 3
    //   }, {
    //     name: '退票审批拒绝',
    //     id: 4
    //   }, {
    //     name: '免审',
    //     id: 5
    //   }, 
    // ],
    // tuiPlanestaust:[ ////国内机票退票票面状态
    //   {
    //     name: "不限",
    //     id: 0,
    //   }, {
    //     name: '已出票',
    //     id: 1
    //   }, {
    //     name: '退票中',
    //     id: 2
    //   }, {
    //     name: '退票失败',
    //     id: 3
    //   }, {
    //     name: '退票成功',
    //     id: 4
    //   }, {
    //     name: '已取消',
    //     id: 5
    //   }, 
    // ],
      retreaeform: [
        {
          //机票火车单类型
          name: "不限",
          id: 0,
        },
        {
          name: "退票单",
          id: 1,
        },
        {
          name: "改签单",
          id: 2,
        },
      ],
      curPages: 1, //当前第几页
      airTab: [
        {
          text: "全部",
          id: 0,
          flag:true,
        },
        {
          text: "预定单",
          id: 1,
          flag:true,
        },
        {
          text: "出票单",
          id: 2,
          flag:true,
        },
        {
          text: "改签单",
          id: 3,
          flag:true,
        },
        {
          text: "退票单",
          id: 4,
          flag:true,
        },
      ],
      activeTab: 0, // airTab点击的下标
      payStatus:'',
      type:'1',
    };
  },
  mounted() {
    
    let actid = sessionStorage.getItem("actinsts");
    if (actid != null && actid != undefined) {
      this.acks(actid);
    } else {
      this.queryOrders(); //订单查询
      this.orderstatuselist = airReserveStatus; //默认展示国内机票状态
      this.airOrderStatusPiao = airOrderStatus; //默认展示国内机票状态
      
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
      if (i == 1) {
        return "../../../static/image/home/unpaid.png";
      } else if (i == 2) {
        return "../../../static/image/home/Change-central.png";
      } else if (i == 3) {
        return "../../../static/image/home/Order-changed.png";
      } else if (i == 4) {
        return "../../../static/image/home/Canceled.png";
      } else if (i == 5) {
        return "../../../static/image/home/Upgrade-failed.png";
      } else if (i == 6) {
        return "../../../static/image/home/Return-ticket.png";
      } else if (i == 7) {
        return "../../../static/image/home/Order-returned.png";
      } else if (i == 8) {
        return "../../../static/image/home/Part-retirement.png";
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
        return "../../../static/image/home/new-application.png";
      } else if (i == 2) {
        return "../../../static/image/home/Canceled.png";
      } else if (i == 3) {
        return "../../../static/image/home/Approval-Pending.png";
      } else if (i == 4) {
        return "../../../static/image/home/Approval-refused.png";
      } else if (i == 5) {
        return "../../../static/image/home/unpaid.png";
      } else if (i == 6) {
        return "../../../static/image/home/To-submit.png";
      } else if (i == 7) {
        return "../../../static/image/home/processing.png";
      } else if (i == 8) {
        return "../../../static/image/home/finished.png";
      } else if (i == 9) {
        return "../../../static/image/home/customer-approval.png";
      } else if (i == 10) {
        return "../../../static/image/home/customer-rejected.png";
      }
    },
    backimgt(i) {
      if (i == 1) {
        return "../../../static/image/home/new-application.png";
      } else if (i == 2) {
        return "../../../static/image/home/Canceled.png";
      } else if (i == 3) {
        return "../../../static/image/home/Approval-Pending.png";
      } else if (i == 4) {
        return "../../../static/image/home/From-single.png";
      } else if (i == 5) {
        return "../../../static/image/home/unpaid.png";
      } else if (i == 6) {
        return "../../../static/image/home/submitted.png";
      } else if (i == 7) {
        return "../../../static/image/home/finished.png";
      } else if (i == 8) {
        return "../../../static/image/home/finished.png";
      } else if (i == 9) {
        return "../../../static/image/home/customer-approval.png";
      } else if (i == 10) {
        return "../../../static/image/home/customer-rejected.png";
      }
    },
    stanames(i) {
      if (i == 1) {
        return "../../../static/image/home/In-seat.png";
      } else if (i == 2) {
        return "../../../static/image/home/unpaid.png";
      } else if (i == 3) {
        return "../../../static/image/home/ticket.png";
      } else if (i == 4) {
        return "../../../static/image/home/check.png";
      } else if (i == 5) {
        return "../../../static/image/home/Return-ticket.png";
      } else if (i == 6) {
        return "../../../static/image/home/Change-central.png";
      } else if (i == 7) {
        return "../../../static/image/home/Part-retirement.png";
      } else if (i == 8) {
        return "../../../static/image/home/Part-change.png";
      } else if (i == 9) {
        return "../../../static/image/home/Order-returned.png";
      } else if (i == 10) {
        return "../../../static/image/home/Order-abandoned.png";
      } else if (i == 11) {
        return "../../../static/image/home/Order-changed.png";
      } else if (i == 12) {
        return "../../../static/image/home/Of-failure.png";
      } else if (i == 13) {
        return "../../../static/image/home/Ticket-failure.png";
      }
    },
    plane(item) {
      if(this.type == '1'){
      var tradeNo = (this.activeTab == 3 || this.activeTab == 4) ? item[0].tradeNo : item[0].transationOrderNo
      //飞机正常单详情
        this.$router.push({
          path: "planeorderlist",
          query: {
            data: tradeNo,
            EntryMethod: 0,
          },
        });
      }else{
        if (this.ordertypels == 1) {
          //退票
          this.$router.push({
            path: "chargebackdetailsl",
            query: {
              data: item[0].no,
              vid: 9,
            },
          });
        } else if (this.ordertypels == 2) {
          //改签票
          this.$router.push({
            path: "planchange",
            query: {
              data: item[0].no,
              vid: 11,
            },
          });
        }
      }
    },
    planes(item) {
      if (this.ordertypels == 1) {
        //退票
        this.$router.push({
          path: "chargebackdetailsl",
          query: {
            data: item[0].no,
            vid: 9,
          },
        });
      } else if (this.ordertypels == 2) {
        //改签票
        this.$router.push({
          path: "planchange",
          query: {
            data: item.no,
            vid: 11,
          },
        });
      }
    },
    hote(item) {
      //酒店订单详情
      this.$router.push({
        path: "hoteorderlist",
        query: {
          data: item.tr.transationOrderNo,
          EntryMethod: 0,
        },
      });
    },
    train(item) {
      //火车票正常单详情
      this.$router.push({
        path: "trainorderlist",
        query: {
          data: item.tr.transationOrderNo,
          EntryMethod: 0,
        },
      });
    },
    trains(item) {
      //火车退改详情
      if (this.ordertypels == 1) {
        //退票
        this.$router.push({
          path: "clorderlist",
          query: {
            data: item.saleChangeNo,
            vid: 9,
          },
        });
      } else if (this.ordertypels == 2) {
        //改签票
        this.$router.push({
          path: "clorderlist",
          query: {
            data: item.outorderNo,
            vid: 11,
          },
        });
      }
    },
    trainChangeList() {
      //火车退改单查询
      let _this = this;
      _this.shomlist = null;
      let sit = _this.actinst;
      let vons = "";
      let vonst = "";
      if (sit == "tra") {
        sit = 10;
        vonst = this.trancitysno;
        vons = "";
      } else if (sit == 1) {
        vons = this.trancitysno;
        vonst = "";
      }
      let arrs = [];
      if (_this.ordertypels == 1) {
        //退
        arrs = [2];
      } else if (_this.ordertypels == 2) {
        //改
        arrs = [3];
      }
      _this.loading = true;
      let dat = {
        pageVO: {
          curPage: _this.curPages, //几页
          rowNum: 5, //一页多少条
        },
        mssOrderRequest: {
          createTypeArray: arrs,
          bookStartDate: _this.fikdatec == "" ? null : _this.fikdatec, //创建时间
          bookEndDate: _this.enddatec == "" ? null : _this.enddatec,
          flyStartDate: _this.fikdate == "" ? null : _this.fikdate, //出行时间
          flyEndDate: _this.enddate == "" ? null : _this.enddate,
          typeName: _this.enterprise,
          trainNo: vonst,
          orderState: _this.orderstatusels, //订单状态
          transationOrderNo: _this.ordernumber, //销售单号
          passenger: _this.travellingpeople, //出行人
          flightNo: _this.trancitysno, //火车单号
        },
      };
      _this.$api.order
        .trainChangeList(dat)
        .then((res) => {
          //查询火车退改签订单
          _this.loading = false;
          if (res.code == 200) {
            _this.shomlist = res.data.pageData.records || [];
            _this.total = res.data.pageData.total;
          } else {
            _this.$message({
              message: res.message,
              type: "warning",
            });
          }
        })
        .catch((e) => {
          _this.loading = false;
          console.log(e);
        });
    },
    queryChangeInfo() {
      //飞机改签订单查询
      let _this = this;
      _this.shomlist = null;
      
      _this.loading = true;
      let dat = {
        pageVO: {
          curPage: _this.curPages, //几页
          rowNum: 5, //一页多少条
        },
        search: {
          minCreateTime:
            _this.fikdatec == "" || _this.fikdatec == null
              ? null
              : _this.fikdatec + " " + "00:00:00", //创建时间
          maxCreateTime:
            _this.enddatec == "" || _this.enddatec == null
              ? null
              : _this.enddatec + " " + "00:00:00",
          minDepartDate:
            _this.fikdate == "" || _this.fikdate == null
              ? null
              : _this.fikdate + " " + "00:00:00", //出行时间
          maxDepartDate:
            _this.enddate == "" || _this.enddate == null
              ? null
              : _this.enddate + " " + "00:00:00",
          typeName: _this.enterprise,
          status: _this.orderstatusels, //订单状态
          tradeNo: _this.ordernumber, //销售单号
          passenger: _this.travellingpeople, //出行人
          flightNo: _this.trancitysno, //机票航班号
        },
      };
      if(this.actinst == 1){
        dat.search['travelNo'] = this.tripNumber
      }
      _this.$api.order
        .queryChangeInfo(dat)
        .then((res) => {
          //查询飞机改签订单
          _this.loading = false;
          if (res.code == 200) {
            _this.shomlist = res.data.rows || [];
            _this.total = res.data.total;
            for (let k in _this.shomlist) {
              //转换城市名
              _this.shomlist[k]["ims"] =
                "http://file.feiren.com/00/02/" +
                _this.shomlist[k].items[0].airline +
                ".png";
              _this.shomlist[k]["namelist"] = _this.username(
                _this.shomlist[k].items
              );
              _this.shomlist[k]["companys"] = company(
                _this.shomlist[k].items[0].airline,
                this.hang
              );
              _this.shomlist[k]["citynames"] = cityName(
                _this.shomlist[k].items[0].origDepart
              );
              _this.shomlist[k]["citynamey"] = cityName(
                _this.shomlist[k].items[0].origArrive
              );
            }
             _this.shomlist.forEach(item => {
               item = [item]
             });
            //  this.$forceUpdate()
            if(_this.shomlist.length > 0){
             for (let i in _this.shomlist){
                _this.shomlist[i] = [_this.shomlist[i]]
              }
            }
          } else {
            _this.$message({
              message: res.message,
              type: "warning",
            });
          }
        })
        .catch((e) => {
          _this.loading = false;
          console.log(e);
        });
    },
    queryOrderRefundList() {
      //飞机退票订单查询
      let _this = this;
      _this.shomlist = null;
      _this.loading = true;
      let dat = {
        curPage: _this.curPages, //几页
        rowNum: 5, //一页多少条
        minApplyDate:
          _this.fikdatec == "" || _this.fikdatec == null
            ? null
            : _this.fikdatec + " " + "00:00:00", //创建时间
        maxApplyDate:
          _this.enddatec == "" || _this.enddatec == null
            ? null
            : _this.enddatec + " " + "00:00:00",
        minDepartDate:
          _this.fikdate == "" || _this.fikdate == null
            ? null
            : _this.fikdate + " " + "00:00:00", //出行时间
        maxDepartDate:
          _this.enddate == "" || _this.enddate == null
            ? null
            : _this.enddate + " " + "00:00:00",
        typeName: _this.enterprise,
        statuses: _this.orderstatusels, //订单状态
        tradeNo: _this.ordernumber, //销售单号
        passager: _this.travellingpeople, //出行人
        flightNo: _this.trancitysno, //机票航班号
      };
      _this.$api.order
        .queryRefundOrders(dat)
        .then((res) => {
          //查询飞机退票订单
          _this.loading = false;
          if (res.code == 200) {
            let dawt = res.data.records;
            _this.total = res.data.total;
            for (let k in dawt) {
              //转换城市名
              dawt[k]["ims"] =
                "http://file.feiren.com/00/02/" +
                dawt[k].items[0].airline +
                ".png";
              dawt[k]["namelist"] = _this.username(dawt[k].items);
              dawt[k]["companys"] = company(
                dawt[k].items[0].airline,
                this.hang
              );
              dawt[k]["citynames"] = cityName(dawt[k].items[0].depart);
              dawt[k]["citynamey"] = cityName(dawt[k].items[0].arrive);
            }
            _this.shomlist = dawt || [];
            if(_this.shomlist.length > 0){
             for (let i in _this.shomlist){
                _this.shomlist[i] = [_this.shomlist[i]]
              }
            }
          } else {
            _this.$message({
              message: res.message,
              type: "warning",
            });
          }
        })
        .catch((e) => {
          _this.loading = false;
          console.log(e);
        });
    },
    username(list) {
      //乘机人
      if (list.length > 0) {
        let sue = [];
        for (let i = 0; i < list.length; i++) {
          sue.push(list[i].name);
        }
        return [...new Set(sue)].join(",");
      } else {
        return "";
      }
    },
    querySearchAsync(queryString, cb) {
      //查询出行人
      let _this = this;
      _this.$api.order
        .getPassengerListNoCertificate({
          name: queryString,
        })
        .then((res) => {
          if (res.code == 200) {
            let namelist = res.data;
            let lists = [];
            if (namelist.length > 0) {
              for (let i in namelist) {
                lists.push({
                  value: namelist[i].name,
                });
                let restaurants = lists;
                let results = queryString
                  ? restaurants.filter(this.createStateFilter(queryString))
                  : restaurants;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                  cb(results);
                }, 3000 * Math.random());
              }
            } else {
              let restaurants = lists;
              let results = queryString
                ? restaurants.filter(this.createStateFilter(queryString))
                : restaurants;

              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                cb(results);
              }, 1000 * Math.random());
            }
          } else {
            _this.$message({
              message: res.message,
              type: "warning",
            });
          }
        })
        .catch((e) => {
          _this.loading = false;
          console.log(e);
        });
    },
    hotimes(time) {
      //酒店时间转换
      return time.substring(0, 10);
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {},
    // cityname(name) { //城市名称
    //   let that = this;
    //   for (let j = 0; j < that.predaddress.length; j++) {
    //     if (name == that.predaddress[j].airportCode) {
    //       return that.predaddress[j].cityCName;
    //     }
    //   }
    // },
    queryAirlineList() {
      //获取机场名称
      let _this = this;
      _this.$api.order
        .queryAirlineList()
        .then((res) => {
          if (res.code == 200) {
            this.hang = res.data.airlineDds;
          } else {
            _this.$message({
              message: res.message,
              type: "warning",
            });
          }
        })
        .catch((e) => {
          _this.$message({
            message: e,
            type: "warning",
          });
          console.log(e);
        });
    },
    queryOrders() {
      //订单查询
      let _this = this;
      _this.shomlist = null;
      _this.loading = true;
      let sit = _this.actinst;
      let vons = "";
      let vonst = "";
      if (sit == "tra") {
        sit = 10;
        vonst = this.trancitysno;
        vons = "";
      } else if (sit == 1) {
        vons = this.trancitysno;
        vonst = "";
      }
      if (sit == 1 || sit == 10) {
        //查询火车机票订单
        let dat = {
          pageVO: {
            curPage: _this.curPages, //几页
            rowNum: 5, //一页多少条
          },
          mssOrderRequest: {
            productType: sit, //10火车 1 飞机
            bookStartDate: _this.fikdatec, //创建时间
            bookEndDate: _this.enddatec,
            flyStartDate: _this.fikdate, //出行时间
            flyEndDate: _this.enddate,
            constcenterId: _this.NameCenter.id, //成本中心id
            typeName: _this.enterprise,
            taskStatus: _this.orderstatusels, //订单状态
            orderState:_this.airOrderStatusP,//票面状体
            transationOrderNo: _this.ordernumber, //销售单号
            passenger: _this.travellingpeople, //出行人
            flightNo: vons, //机票航班号
            trainNo: vonst, //火车车次号
          },
        };
        if(this.activeTab == 1 || this.activeTab == 2){
          dat.mssOrderRequest["payStatus"] = this.payStatus
        }
        if(this.actinst == 1){
          dat.mssOrderRequest['travelNo'] = this.tripNumber
        }        _this.$api.order
          .queryOrders(dat)
          .then((res) => {
            //查询火车飞机正常订单
            _this.loading = false;
            if (res.code == 200) {
              _this.shomlist = res.data.rows || [];
              _this.total = res.data.records;
              if (sit == 1) {
                for (let k in _this.shomlist) {
                  //转换城市名
                  if (_this.shomlist[k][0].voyage.length > 10) {
                    _this.shomlist[k][0]["ims"] =
                      "http://file.feiren.com/00/02/" +
                      _this.shomlist[k][0].airline.split("/")[0] +
                      ".png";
                    let nas = _this.shomlist[k][0].voyage.split("/");
                    let names = nas[0].split("-");
                    _this.shomlist[k][0]["voyagea"] = names[0];
                    _this.shomlist[k][0]["voyages"] = names[1];
                  } else {
                    _this.shomlist[k][0]["ims"] =
                      "http://file.feiren.com/00/02/" +
                      _this.shomlist[k][0].airline +
                      ".png";
                    let names = _this.shomlist[k][0].voyage.split("-");
                    _this.shomlist[k][0]["voyagea"] = names[0];
                    _this.shomlist[k][0]["voyages"] = names[1];
                  }
                  if (_this.shomlist[k][0].itemStatus != null) {
                    if (_this.shomlist[k][0].itemStatus.includes("2,3")) {
                      _this.shomlist[k][0]["itemStatusname"] = "(改,退)";
                    } else if (_this.shomlist[k][0].itemStatus.includes("2")) {
                      _this.shomlist[k][0]["itemStatusname"] = "(改)";
                    } else if (_this.shomlist[k][0].itemStatus.includes("3")) {
                      _this.shomlist[k][0]["itemStatusname"] = "(退)";
                    }
                  }
                  if(_this.shomlist[k][0].departTime.length >= 25){
                   var arr = _this.shomlist[k][0].departTime.split("/")
                   var arr2 = _this.shomlist[k][0].arriveDate.split("/")
                   _this.shomlist[k][0]["departTimes"] = arr[0];
                    _this.shomlist[k][0]["arriveDates"] = arr[1];
                   _this.shomlist[k][0]["Times"] = arr2[0];
                    _this.shomlist[k][0]["Dates"] = arr2[1];
                  }
                }
              }
            } else {
              _this.$message({
                message: res.message,
                type: "warning",
              });
            }
          })
          .catch((e) => {
            _this.loading = false;
            console.log(e);
          });
      } else if (sit == 4) {
        let dat = {
          pageVO: {
            curPage: _this.curPages, //几页
            rowNum: 5, //一页多少条
          },
          hotelOrderVo: {
            createStartTime:
              _this.fikdatec == "" || _this.fikdatec == null
                ? null
                : _this.fikdatec + " " + "00:00:00", //创建时间
            createEndTime:
              _this.enddatec == "" || _this.enddatec == null
                ? null
                : _this.enddatec + " " + "00:00:00",
            arrivalStartDate:
              _this.fikdate == "" || _this.fikdate == null
                ? null
                : _this.fikdate + " " + "00:00:00", //出行时间
            arrivalEndDate:
              _this.enddate == "" || _this.enddate == null
                ? null
                : _this.enddate + " " + "00:00:00",
            constcenterId: _this.NameCenter.id, //成本中心id
            typeName: _this.enterprise,
            orderStatus: _this.orderstatusels, //订单状态
            transactionNo: _this.ordernumber, //销售单号
            guestName: _this.travellingpeople, //出行人
            hotelName: _this.hotname, //酒店名称
            cityName: _this.hotaddress, //酒店地址
          },
        };
        _this.$api.order
          .searchHotelOrderList(dat)
          .then((res) => {
            //查询酒店订单
            _this.loading = false;
            if (res.code == 200) {
              _this.shomlist = res.data.rows || [];
              _this.total = res.data.records;
            } else {
              _this.$message({
                message: res.message,
                type: "warning",
              });
            }
          })
          .catch((e) => {
            _this.loading = false;
            console.log(e);
          });
      }
    },
    companys(ies) {
      let ie = ies.split("/");
      for (let s in this.hang) {
        if (ie[0] == s) {
          return this.hang[s];
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
    search() {
      //点击查询
      if (this.actinst == 1 && this.ordertypels == 2) {
        this.queryChangeInfo(); //飞机改签
      } else if (this.actinst == 1 && this.ordertypels == 1) {
        this.queryOrderRefundList(); //飞机退票
      } else if (
        this.actinst == "tra" &&
        (this.ordertypels == 1 || this.ordertypels == 2)
      ) {
        this.trainChangeList(); //火车退改签
      } else {
        this.queryOrders(); //飞机酒店火车默认查询
      }
    },
    handleCurrentChange(val) {
      //翻页
      this.curPages = val;
      this.search();
    },
    selts() {
      //查询成本中心
      let _this = this;
      _this.loading = true;
      _this.$api.home
        .getCostCenterList()
        .then((res) => {
          //查询成本中心
          if (res.code == 200) {
            _this.treeLists = res.data[0].children;
            _this.treeLists.unshift({
              id: 0,
              text: "不限",
            });
          } else {
            _this.loading = false;
            _this.$message({
              message: res.message,
              type: "warning",
            });
          }
        })
        .catch((e) => {
          _this.loading = false;
          console.log(e);
        });
    },
    // 老版 订单筛选
    // opstlist(va) { 
    //   this.curPages = 1; //几页
    //   this.currentPage3 = 1;
    //   if (va == "handleChange") {
    //     //选择成本中心
    //     if (this.treeListsst[0] == 0) {
    //       this.treeListsst = "";
    //       this.NameCenter.name = "";
    //       this.NameCenter.id = "";
    //     } else {
    //       let nodesObj = this.$refs["cascader"].getCheckedNodes(); //获取当前节点的信息
    //       this.NameCenter.name = nodesObj[0].data.text;
    //       this.NameCenter.id = nodesObj[0].data.id;
    //     }
    //   } else if (va == "enterprisessel") {
    //     //预定类型
    //     if (this.enterprise == 0) {
    //       this.enterprise = "";
    //     }
    //   } else if (va == "orderstatusel") {
    //     //订单类型
    //     if (this.orderstatusels == -2) {
    //       this.orderstatusels = "";
    //     }
    //   } else if (va == "ordertypel") {
    //     //订单状态
    //     this.treeListsst = "";
    //     this.NameCenter.name = "";
    //     this.NameCenter.id = "";
    //     if (this.ordertypels == 0) {
    //       //不限查询默认为空
    //       this.disabled = false;
    //       this.ordertypels = "";
    //       if (this.actinst == 1) {
    //         this.orderstatuselist = this.planestaust; //展示国内机票状态
    //       } else if (this.actinst == "tra") {
    //         this.orderstatuselist = arrType; //展示火车票状态
    //       }
    //       this.queryOrders();
    //     } else {
    //       this.disabled = true;
    //       if (this.ordertypels == 2) {
    //         if (this.actinst == 1) {
    //           //飞机改签票查询
    //           this.orderstatuselist = this.planestaust; //展示国内机票改签单状态
    //         } else if (this.actinst == "tra") {
    //           this.orderstatuselist = this.trainstaP; //展示火车改签单状态
    //         }
    //       } else if (this.ordertypels == 1) {
    //         if (this.actinst == 1) {
    //           //飞机退票查询
    //           this.orderstatuselist = planeRecedeStatus; //展示国内机票改签单状态
    //         }
    //       }
    //     }
    //   }
    //   if (this.ordertypels == 0) {
    //     //不限查询默认为空
    //     this.queryOrders();
    //   } else {
    //     if (this.ordertypels == 2) {
    //       if (this.actinst == 1) {
    //         //飞机改签票查询
    //         this.queryChangeInfo(); //飞机改签订单查询
    //       } else if (this.actinst == "tra") {
    //         //火车改签
    //         this.trainChangeList();
    //       }
    //     } else if (this.ordertypels == 1) {
    //       if (this.actinst == 1) {
    //         //飞机退票查询
    //         this.queryOrderRefundList(); //飞机退票订单查询
    //       } else if (this.actinst == "tra") {
    //         //火车退票
    //         this.orderstatusels = "";
    //         this.orderstatuselist = []; //火车退票订单默认都为 已退状态
    //         this.trainChangeList();
    //       }
    //     }
    //   }
    // },
    acks(it) {
      this.activeTimeIndex = -1;
      this.actinst = it;
      this.activeTab = 0
      sessionStorage.setItem("actinsts", it);
      this.disablet = false;
      if (it == 1 || it == "1") {
        this.titleds = "出行日期";
        this.orderstatuselist = airReserveStatus; //展示国内机票状态
         this.airOrderStatusPiao = airOrderStatus;
      } else if (it == "tra") {
        this.titleds = "出行日期";
        this.orderstatuselist = arrType; //展示火车票状态
      } else if (it == 4 || it == "4") {
        this.titleds = "入住日期";
        this.disablet = true;
        this.orderstatuselist = hotellStatusTow; //展示酒店状态
      }
      this.curPages = 1; //几页
      this.currentPage3 = 1;
      this.fikdatec = ""; //创建时间
      this.enddatec = "";
      this.fikdate = ""; //出行时间
      this.enddate = "";
      this.NameCenter.id = ""; //成本中心id
      this.enterprise = ""; //因公因私
      this.orderstatusels = ""; //订单状态
      this.ordernumber = ""; //销售单号
      this.travellingpeople = ""; //出行人
      this.hotname = ""; //酒店名称
      this.hotaddress = ""; //酒店地址
      this.ordertypels = "";
      if (it == 1 || it == "tra" || it == 4) {
        this.queryOrders();
      }
        this.airTab[3].flag = this.actinst == 4 ? false : true
        this.airTab[4].flag = this.actinst == 4 ? false : true
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
        },
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
        },
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
        },
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
        },
      };
    },
    timesopk(t) {
      this.activeTimeIndex = t - 1;
      this.activeTab = 0 
      this.shomlist = []
      this.ordertypels = 0
      let datw = new Date();
      let moust =
        datw.getMonth() + 1 < 9
          ? "0" + (datw.getMonth() + 1)
          : datw.getMonth() + 1;
      let dats = datw.getDate() < 9 ? "0" + datw.getDate() : datw.getDate();
      if (t == 1) {
        //获取当前一个月之内的数据
        this.fikdate = datw.getFullYear() + "-" + moust + "-" + "01";
        this.enddate = datw.getFullYear() + "-" + moust + "-" + dats;
        this.queryOrders();
      } else {
        //获取当前一个周之内的数据
        let timesStamp = datw.getTime();
        let currenDay = datw.getDay();
        let dates = "";
        dates = new Date(
          timesStamp + 24 * 60 * 60 * 1000 * (0 - ((currenDay + 6) % 7))
        )
          .toLocaleDateString()
          .replace(/\//g, "-");
        this.fikdate = dates;
        this.enddate = datw.getFullYear() + "-" + moust + "-" + dats;
        this.queryOrders();
      }
    },
    // 飞机 tab切换
    airTabClick(it, index) {
      this.activeTab = index;
      this.shomlist = null
      this.ordertypels = "";
      this.payStatus = ""
      this.orderstatusels = ""
      this.airOrderStatusP = ""
      if(this.actinst ==1){
        this.type = '1'
        if(this.activeTab == 1){
          this.orderstatuselist = airReserveStatus.filter(item=>item.type == 'y' || item.type =='yc')
          this.airOrderStatusPiao = airOrderStatus.filter(item=>item.type == 'y')
        }else if(this.activeTab == 2){
          this.orderstatuselist = airReserveStatus.filter(item=>item.type == 'c' || item.type =='yc')
          this.airOrderStatusPiao = airOrderStatus.filter(item=>item.type == 'c')
        }else if(this.activeTab == 3){
          this.orderstatuselist = planestaust
          this.airOrderStatusPiao =changPlanestaust
          this.type = '2'
        }else if(this.activeTab == 4){
          this.orderstatuselist = tuistaust
          this.airOrderStatusPiao = tuiPlanestaust
          this.type = '2'
        }
      }
      if(it.id == 0){
        this.queryOrders()
      }else if(it.id == 1){
        this.payStatus = 1
        this.queryOrders()
      }else if(it.id == 2){
        this.payStatus = 3
        this.queryOrders()
      }else if(it.id == 3){
        this.ordertypels = 2
        if(this.actinst == 'tra'){
          this.trainChangeList()
        }else if(this.actinst == 1){
           this.queryChangeInfo()
        } 
      }else if(it.id == 4){
         this.ordertypels = 1
        if(this.actinst == 'tra'){
          this.trainChangeList()
        }else if(this.actinst == 1){
           this.queryOrderRefundList()
        }
      }
    },
    // 新订单状态筛选
    selectChang(va , num){
      if(num == 1){
         this.orderstatusels =va == -2 ? "" : va
      }else{
        
          this.airOrderStatusP =va == 0 ? "" : va
      }
      if(this.ordertypels == 0 || this.ordertypels == ''){
       
        this.queryOrders()
      }else if(this.ordertypels == 2){
        this.queryChangeInfo()
      }else if(this.ordertypels == 1){
        this.queryOrderRefundList()
      }
    }
  },
};
</script>

<style scoped lang="less">
/deep/ .select-style {
  &>.el-input{
    &>.el-input__inner{
      background:#e3efff ;
      color: #333;
      border: 0;
      padding-right: 15px;
      text-align: center;
      border-radius: 0;
    }
    &>.el-input__suffix{
      right: -3px;
    }
      input:-moz-placeholder,
textarea:-moz-placeholder { 
    color: #333!important;
}
 input:-ms-input-placeholder,
textarea:-ms-input-placeholder { 
    color: #333!important;
}
 input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder { 
    color: #333!important ;
}
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
      background-color: #ffffff;
      cursor: pointer;
      border: 1px solid #e4e5e7;
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
      border-bottom: 2px solid #ffffff;
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
        background-color: #ff9a33;
        color: #ffffff;
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
          width: 70px;
        }
      }
    }
  }
  .sitsCon {
    position: relative;
    height: 40px;
    background: #fff;
    margin-top: 11px;
    border: 1px solid #e6e6e6;
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
        color: #ff6957;
      }
      .active {
        color: #ff6957;
      }
    }
    .sitsAct {
      justify-content: flex-start;
      .airTabList {
        display: flex;
        padding-top: 9px;
        & > span {
          cursor: pointer;
          font-size: 14px;
          margin-right: 30px;
          border-bottom: 2px solid #fff;
          padding: 0 5px 9px;
          &:hover {
            color: #3c85fd;
            border-bottom: 2px solid #3c85fd;
          }
        }
        .activeClass {
          color: #3c85fd;
          border-bottom: 2px solid #3c85fd;
        }
      }
    }
  }
  .boxdHeadBack{
    background: #e3efff;
  }
  .boxdHead{
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333;
    height: 40px;
    cursor: pointer;
    &>.boxdHead_list{
      width:110px ;
      text-align: center;
      &>span{
        .mixin_ellipsis();
      }
    }
    &>.boxdHead_list:nth-child(1){
        width: 190px;
    }
    &>.boxdHead_list:nth-child(2){
        width: 160px;
    }
    &>.boxdHead_list:nth-child(3){
        width: 160px;
    }
    &>.boxdHead_list:nth-child(4){
        width: 230px;
    }
    &>.boxdHead_list:nth-child(5){
        width: 100px;
    }
    &>.boxdHead_list:nth-child(6){
        width: 120px;
    }
  }
  .boxd {
    width: 100%;
    margin-top: 0;
    min-height: 400px;
    .datalis {
      margin-bottom: 10px;
      width: 100%;
      border-radius: 2px;
      background-color: #ffffff;
      box-shadow: 0 0 14px 0 rgba(177, 190, 203, 0.2);
      transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;

      .trainsl {
        display: flex;
        align-items: center;
        min-height: 80px;
        &>div{
          display: flex;
          flex-direction: column;
        }
        .airOrder{
            position: relative;
          &>div{
            width: 140px;
            position: absolute;
            bottom: -35px;
            left: 50%;
             transform: translate(-50%, -50%);
            &>.chang{
              color: red;
            }
          }
        }
        .orderPrice{
          color:#FF4400;
          font-weight: bold;
        }
        .journey,.takeOffTime{
          &>span:nth-child(1){
            margin-bottom: 6px;
          }
        }
        // .tartp {
        //   display: flex;
        //   height: 48px;
        //   line-height: 48px;
        //   background: #e3efff;
        //   justify-content: space-between;
        //   border-bottom: 2px solid #f9f9f9;
        //   padding: 0 30px;
        //   .tartp_s {
        //     display: flex;
        //     color: #333;
        //     font-size: 14px;
        //   }

        //   .tartp_e {
        //     display: flex;
        //     color: #999;
        //     font-size: 14px;
        //   }
        //   div:nth-child(3) {
        //   }

        //   div:nth-child(4) {
        //     font-size: 14px;
        //     margin: 0 10px;
        //     color: #b9a6a6;
        //   }
        //   .orderNum {
        //     margin: 0 !important;
        //   }
        // }

        // .trainslit {
        //   width: 100%;
        //   height: 120px;
        //   display: flex;
        //   cursor: pointer;
        //   align-items: center;

        //   .setlist {
        //     width: 17%;
        //     height: 90px;
        //     font-size: 14px;
        //     display: flex;
        //     flex-direction: column;
        //     justify-content: space-between;
        //     align-items: center;

        //     div {
        //       height: 90px;

        //       img {
        //         width: 134px;
        //         height: 90px;
        //       }
        //     }
        //     .hotImg {
        //       width: 134px;
        //       background-color: #ddd;
        //     }
        //   }

        //   .setlis {
        //     width: 15%;
        //     height: 80px;
        //     font-size: 14px;
        //     display: flex;
        //     flex-direction: column;
        //     justify-content: center;
        //     align-items: center;

        //     div {
        //       display: flex;
        //       flex-direction: column;
        //       justify-content: center;
        //       align-items: center;
        //       img {
        //         width: 134px;
        //         height: 90px;
        //       }
        //     }

        //     & > div:nth-child(2) {
        //       margin: 8px 0;
        //     }

        //     p {
        //       font-size: 15px;
        //       line-height: 40px;
        //       color: #999999;
        //     }
        //   }

        //   .traboot {
        //     display: flex;
        //     flex: 1;
        //     color: black;
        //     font-size: 14px;
        //     margin-left: 152px;
        //     .trbtfit {
        //       flex: 3;
        //       height: 80px;
        //       display: flex;
        //       flex-direction: column;
        //       justify-content: space-between;

        //       div:nth-child(1) {
        //         font-weight: 800;
        //         font-size: 18px;
        //         color: black;
        //         display: flex;
        //         align-items: center;

        //         img {
        //           width: 15px;
        //           height: 15px;
        //           margin-right: 5px;
        //         }
        //       }
        //       .time {
        //         .mixin_displayBox(@fd:column,@ai:flex-start);
        //       }
        //     }
        //     .jd_trbtfit {
        //       width: 560px;
        //     }
        //     .trbtsed {
        //       flex: 1.5;
        //       display: flex;
        //       justify-content: center;
        //       align-items: center;
        //       margin-right: 10px;
        //       .thst {
        //         margin: 0 10px;
        //         padding: 0 10px;
        //         line-height: 25px;
        //         background: red;
        //         color: #ffffff;
        //       }

        //       div:last-child {
        //         font-size: 20px;
        //         font-weight: 700;
        //         color: #ff4400;
        //       }
        //     }

        //     .trbtend {
        //       min-width: 73px;
        //       height: 80px;
        //       display: flex;
        //       position: relative;
        //       flex-direction: column;
        //       justify-content: center;
        //       align-items: center;
        //       margin-right: 34px;
        //       .statusx {
        //         display: flex;
        //         align-items: center;
        //         justify-content: center;

        //         img {
        //           width: 73px;
        //           height: 73px;
        //         }
        //         & > img:nth-child(1) {
        //           margin-right: 10px;
        //         }
        //       }
        //     }
        //   }
        // }
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
