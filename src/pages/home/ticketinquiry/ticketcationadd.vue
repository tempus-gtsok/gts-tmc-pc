<template>
  <div class="trainadd" v-if="trainslis">
    <el-drawer :visible.sync="drawer" :with-header="false">
      <div class="ditrslist">
        <div class="ditrslists" v-for="(item,index) in drawelist" :key="index">
          <div style="margin-right: 10px;font-size: 15px;">{{ index + 1 }}级审批人:</div>
          <div>
            <el-select v-model="apprvCost[index].id" v-if="item.apprvCostFlowNodePersons" placeholder="请选择">
              <el-option v-for="items in item.apprvCostFlowNodePersons" :key="items.id" :label="items.staffName"
                         :value="items.id">
              </el-option>
            </el-select>
            <el-select v-model="apprvCost[index].id" v-else placeholder="请选择">
              <el-option v-for="items in item.apprvDeptFlowNodePersons" :key="items.id" :label="items.staffName"
                         :value="items.id">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="addpalist" @click="btn_click">选好了</div>
    </el-drawer>
    <div class="tresiadd" v-loading="loading">
      <div class="trsleft">
        <div class="trstp">
          <div class="tr_ul">
            <div class="tr_uleft">旅客</div>
            <addPassenger @passage="passage" v-if="isbtd == 2"></addPassenger>
            <div class="tr_right" v-if="userlists.length > 0 && isbtd == 1">
              <div class="tr_rs" v-for="(item, index) in userlists" :key="index">
                <div class="tr_rtp">{{ item.name }}</div>
                <div class="tr_rbn" v-if="isblcks == 4">
                  {{ item.certType }}&nbsp;{{ item.certNo }}
                </div>
                <div class="tr_rbn" v-else>{{
                    item.certificateList[0].cardTypename
                  }}&nbsp;{{ item.certificateList[0].cardNo }}
                </div>

                <div class="tr_ul" v-if="value == 1 && civilServiceTicket == 1">
                  <div class="tr_rights">
                    <el-input v-model="item.carval" placeholder="开户银行" @input="onInput(item.carval,index)"
                              @blur.prevent="changeCount()"></el-input>
                    <div class="absts" v-if="abstid == index">
                      <div class="" v-for="(item_bk,index_bk) in banklists" :key="index_bk"
                           @click="bankss(item.carval,item_bk)">
                        {{ item_bk }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tr_ul" v-if="civilServiceTicket == 1">
            <div class="tr_uleft">验算类型</div>
            <div>
              <el-select v-model="value" placeholder="请选择" style="width: 200px;z-index: 888;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="tr_ul" v-if="value == 2 && civilServiceTicket == 1">
            <div class="tr_uleft">单位名称</div>
            <div class="tr_rights">
              <el-input v-model="units" placeholder="单位名称"></el-input>
            </div>
          </div>
          <div class="tr_ul" v-if="isblcks != 4">
            <div class="tr_uleft">航意险</div>
            <div>
              <el-select v-model="profitPrice" @change="chineseChange($event)" placeholder="请选择" class="tr-select">
                <el-option v-for="item in kingList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="jiage" v-if="profitPrice == '请选择' || profitPrice == null">票面价：0元</div>
            <div class="jiage" v-else>票面价：{{ profitPrices }}元</div>
          </div>
          <div class="tr_ul">
            <div class="tr_uleft">联系人</div>
            <div class="tr_rights">
              <el-input v-model="lname" class="inps" placeholder="请输入联系人姓名"></el-input>
              &nbsp;&nbsp;&nbsp;
              <el-input v-model="user_ipone" class="inps" placeholder="请输入联系人电话"></el-input>
            </div>
          </div>
          <div
              v-if="(isblcks == 2 && isarsrl==false && isbtd != 2)||(isblcks == 4&& isarsrl==false && isbtd != 2)||(isblcks == 1&& isarsrl==false && isbtd == 1 && isblckt==true)">
            <div class="tr_ul">
              <div class="tr_uleft">归属部门</div>
              <div class="tr_rights">
                <el-input v-model="attdepartment" :disabled="true" placeholder="请输入联系人姓名"></el-input>
              </div>
            </div>
            <div class="tr_ul">
              <div class="tr_uleft">成本中心</div>
              <div class="tr_rights">
                <el-cascader style="width: 200px;" ref="cascader" @change="handleChange" :props='bots'
                             :options="treeLists"></el-cascader>
              </div>
            </div>
            <div class="tr_ul" v-if="CostCi == true">
              <div class="tr_uleft">成本审批人</div>
              <div class="tr_rights">
                <div class="tr_dvs" @click="drawers('TravelCostCenlist')">
									<span v-for="(item,index) in TravelCostCenlist" :key="index" v-if="TravelCostCenlist.length > 0">
										{{ item.staffName }}
									</span>
                </div>
              </div>
            </div>
            <div class="tr_ul" v-if="CostCis == true">
              <div class="tr_uleft">部门审批人</div>
              <div class="tr_rights">
                <div class="tr_dvs" @click="drawers('TravelDepartlist')">
									<span v-for="(item,index) in TravelDepartlist" :key="index" v-if="TravelDepartlist.length > 0">
										{{ item.staffName }}
									</span>
                </div>
              </div>
            </div>
          </div>

          <div class="tr_ul" v-if="(isblcks == 2 || isblcks == 4) && isbtd == 1">
            <div class="tr_uleft">出行事由</div>
            <div class="tr_rights">
              <el-input v-model="reson" type="textarea" :rows="2" placeholder="请输入出行事由"></el-input>
            </div>
          </div>
          <div class="tr_ul" v-if="isblcks == 4">
            <div class="tr_uleft">改签原因</div>
            <div class="tr_rights">
              <el-input v-model="user_remark" placeholder="请输入改签原因"></el-input>
            </div>
          </div>
          <div class="tr_ul" style="display: flex;" v-if="isblcks == 4">
            <div class="tr_uleft">上传附件</div>
            <div class="tr_rights">
              <div style="width: 80px;height: 80px;margin-left: 30px;">
                <el-upload class="avatar-uploader" :action="action"
                           :show-file-list="false"
                           :accept="'image/*'" :headers="{AuthToken:tokens}" :on-success="handleSuccess"
                           :on-error="handleError"
                           :before-upload="handleBeforeUpload" :on-progress="handleProgress">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
          </div>
        </div>
        <!-- 单程 -->
        <div class="trsbt">
          <div class="trsbord">
            <div class="trsbord-p">
              <p>{{ retime(trainslis.date) }}&emsp;{{ trainslis.week }}&emsp;{{ trainslis.data.userlist.name.departs }}
                -
                {{ trainslis.data.userlist.name.arrives }} </p>
            </div>
            <div class="tsbods">
              <div class="tsbodas">
                <div class="tsbodsle">
                  <div>
                    <span class="iconfont" style="margin: 0 10px;color: #F5A623;"><img
                        style=" width: 20px;height: 20px;" :src="trainslis.data.userlist.ims"/></span>
                  </div>
                  <div>
                    <div style="font-size: 15px;">{{ trainslis.hang.name }}{{ trainslis.data.userlist.name.no }}</div>

                  </div>
                </div>
                <div class="trainsc_s">
                  <div class="trainsc_s_l">
                    <div>
                      <div class="trainsc_s_l_t">{{ trainslis.data.userlist.name.departTime }}</div>
                    </div>
                  </div>
                  <div class="trainsc_s_s">
                    <div style="font-size: 12px;">{{ trainslis.data.userlist.name.flightTime }}</div>
                  </div>
                  <div class="trainsc_s_l">
                    <div class="trainsc_s_l_t">{{ trainslis.data.userlist.name.arriveTime }}</div>
                  </div>
                </div>
                <div class="fuel_right" @click="masks">
                  退改规则
                  <div v-if="mouses" class="mouse">
                    123
                  </div>
                </div>
              </div>
              <div class="tsbodas">
                <div class="tsbodsle">
                  <div style="font-size: 13px;color: #3B4F62;">{{ trainslis.datw.level }} |
                    {{ trainslis.data.userlist.name.plane }}{{ trainslis.data.userlist.name.planeSize }}
                  </div>
                </div>
                <div class="trainsc_s">
                  <div class="trainsc_s_l">
                    <div>
                      <div class="trainsc_s_l_t"></div>
                    </div>
                    <div class="trainsc_s_l_b">
                      <div class="trainsc_s_l_b_r">{{
                          trainslis.data.userlist.name.departs
                        }}{{ trainslis.data.userlist.name.departTerminal }}
                      </div>
                    </div>
                  </div>
                  <div class="trainsc_s_bot"></div>
                  <div class="trainsc_s_l">
                    <div class="trainsc_s_l_t"></div>
                    <div class="trainsc_s_l_b">
                      <div class="trainsc_s_l_b_r">{{
                          trainslis.data.userlist.name.arrives
                        }}{{ trainslis.data.userlist.name.arriveTerminal }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 返程 -->
        <div class="trsbt" v-if="!isone">
          <div class="trsbord">
            <div class="trsbord-p">
              <p>{{ retime(nums.date) }}&emsp;{{ nums.week }}&emsp;{{ nums.data.userlist.name.departs }} -
                {{ nums.data.userlist.name.arrives }}</p>
            </div>
            <div class="tsbods">
              <div class="tsbodas">
                <div class="tsbodsle">
                  <div>
                    <span class="iconfont" style="margin: 0 10px;color: #F5A623;"><img
                        style=" width: 20px;height: 20px;" :src="nums.data.userlist.ims"/></span>
                  </div>
                  <div>
                    <div style="font-size: 15px;">{{ nums.hang.name }}{{ nums.data.userlist.name.no }}</div>
                  </div>
                </div>
                <div class="trainsc_s">
                  <div class="trainsc_s_l">
                    <div class="trainsc_s_l_t">{{ nums.data.userlist.name.departTime }}</div>
                  </div>
                  <div class="trainsc_s_s">
                    <div style="font-size: 12px;">{{ nums.data.userlist.name.flightTime }}</div>
                  </div>
                  <div class="trainsc_s_l">
                    <div class="trainsc_s_l_t">{{ nums.data.userlist.name.arriveTime }}</div>
                  </div>
                </div>
                <div class="fuel_right" @click="masks">
                  退改规则
                  <div v-if="mouses" class="mouse">
                    123
                  </div>
                </div>
              </div>

              <div class="tsbodas">
                <div class="tsbodsle">
                  <div style="font-size: 13px;color: #3B4F62;">{{ nums.datw.level }} |
                    {{ nums.data.userlist.name.plane }}{{ nums.data.userlist.name.planeSize }}
                  </div>
                </div>
                <div class="trainsc_s">
                  <div class="trainsc_s_l">
                    <div class="trainsc_s_l_b">
                      <div class="trainsc_s_l_b_r">{{
                          nums.data.userlist.name.departs
                        }}{{ nums.data.userlist.name.departTerminal }}
                      </div>
                    </div>
                  </div>
                  <div class="trainsc_s_bot">
                  </div>
                  <div class="trainsc_s_l">
                    <div class="trainsc_s_l_t"></div>
                    <div class="trainsc_s_l_b">
                      <div class="trainsc_s_l_b_r">{{
                          nums.data.userlist.name.arrives
                        }}{{ nums.data.userlist.name.arriveTerminal }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Cover" v-if="covesr">
          <div class="">
            <p style="color: dodgerblue;font-size: 18px;text-align: center;line-height: 60px;">退改签规则</p>
            <p style="padding: 30px 20px;font-size: 14px;"> 1.退票规定：{{ backrule.refundTicketDes }}</p>
            <p style="padding: 30px 20px;font-size: 14px;">2.改签规定：{{ backrule.changeTicketDes }}</p>
            <p style="padding: 30px 20px;font-size: 14px;">3.签转规定：{{ backrule.signTicketDes }}</p>

          </div>
          <div style="text-align: center;">
            <el-button type="primary" @click="mask">确定</el-button>
          </div>
        </div>
        <div class="covers" v-if="covers" @click="mask">

        </div>

        <div class="staleve" v-if="staleve" @click="staleve = false">
          <div class="stalist" @click.stop>
            <div class="quan">
              <div class="statop" v-if="respeatBook.length > 0">
                <div class="reds">
                  <div class="ts_text">
                    订单已重复
                  </div>
                </div>
                <div class="setlist" v-for="(item,index) in respeatBook" :key="index">
                  <div class="setbod" v-if="item.name == 9 && !notbooking">
                    <div class="styul">
                      <div class="styli_top">
                        超规且不可预订
                      </div>
                      <div class="stulis">
                        <div class="styli_left">
                          超规人员:
                        </div>
                        <div class="styli_right">
                          {{ item.list }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="setbod" v-if="item.name == 8 && !notbooking">
                    <div class="styul">
                      <div class="styli_top">
                        超规必须选择原因
                      </div>
                      <div class="stulis">
                        <div class="styli_left">
                          超规人员:
                        </div>
                        <div class="styli_right">
                          {{ item.list }}
                        </div>
                      </div>
                    </div>
                    <div class="styul">
                      <div class="stulis">
                        <div class="styli_left">
                          超规原因:
                        </div>
                        <div class="styli_right">
                          <div class="wors">
                            <picker v-model="pricdesc" :range="rulesReasons" :range-key="'chineseDesc'"
                                    @change="chineseChanges($event)">
                              {{ rulesReasons[chiness.index].chineseDesc }}
                            </picker>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="btnsti" v-if="bools">
              <div class="roblck" @click="staleve = false">
                取消
              </div>
              <div class="btnok" @click="cits_btn">
                继续预定
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="trsright">
        <div class="trsrs">
          <div class="trsrs-title">
            <div class="trsrse">
              <div class="iconfont icon">&#xe71b;&nbsp;</div>
              {{ trainslis.data.userlist.name.no }}{{ trainslis.datw.level }}
              <span>去程</span>
            </div>
          </div>
          <div class="tslist">
            <div>票价</div>
            <div v-if="isbtd == 1">
              <div v-if="prices != null && prices != 0 && prices != '' "><span class="price">￥{{
                  prices
                }}</span>×{{ userlists.length }}人
              </div>
              <div v-else><span class="price">￥{{ trainslis.datw.salePrices[0].price }}</span>×{{ userlists.length }}人
              </div>
            </div>
            <div v-else>
              <div v-if="prices != null && prices != 0 && prices != '' "><span class="price">￥{{
                  prices
                }}</span>×{{ passengers.length }}人
              </div>
              <div v-else><span class="price">￥{{ trainslis.datw.salePrices[0].price }}</span>×{{ passengers.length }}人
              </div>
            </div>
          </div>
          <div class="tslist">
            <div>基建+燃油</div>
            <div v-if="isbtd == 1">
              <span class="price">{{
                  trainslis.data.userlist.name.taxFee + trainslis.data.userlist.name.fuelFee
                }}</span>×{{ userlists.length }}人
            </div>
            <div v-else>
              <span class="price">{{
                  trainslis.data.userlist.name.taxFee + trainslis.data.userlist.name.fuelFee
                }}</span>×{{ passengers.length }}人
            </div>
          </div>
          <div class="tslist" v-if="profitPrice != 0 && profitPrice != '请选择' && profitPrice != undefined">
            <div>保险</div>
            <div v-if="isbtd == 1">{{ profitPrices }}×{{ userlists.length }}人</div>
            <div v-else>{{ profitPrices }}×{{ passengers.length }}人</div>
          </div>
          <div class="tslist" v-else>
            <div>保险</div>
            <div v-if="isbtd == 1">0×{{ userlists.length }}人</div>
            <div v-else>0×{{ passengers.length }}人</div>
          </div>
          <div class="tslist">
            <div>服务费</div>
            <div v-if="isbtd == 1">{{ tips }}×{{ userlists.length }}人</div>
            <div v-else>{{ tips }}×{{ passengers.length }}人</div>
          </div>
        </div>
        <div class="trsrs" v-if="!isone">
          <div class="trsrs-title">

            <div class="trsrse">
              <div class="iconfont icon">&#xe71b;&nbsp;</div>
              {{ nums.data.userlist.name.no }}{{ nums.datw.level }}
              <span>返程</span>
            </div>
          </div>
          <div class="tslist">
            <div>票价</div>
            <div v-if="isbtd == 1">
              <div v-if="priceas != null && priceas != 0 && priceas != ''"><span class="price">￥{{
                  priceas
                }}</span>×{{ userlists.length }}人
              </div>
              <div v-else><span class="price">￥{{ nums.datw.salePrices[0].price }}</span>×{{ userlists.length }}人</div>
            </div>
            <div v-else>
              <div v-if="priceas != null && priceas != 0 && priceas != ''"><span class="price">￥{{
                  priceas
                }}</span>×{{ passengers.length }}人
              </div>
              <div v-else><span class="price">￥{{ nums.datw.salePrices[0].price }}</span>×{{ passengers.length }}人</div>
            </div>
          </div>
          <div class="tslist">
            <div>基建+燃油</div>
            <div v-if="isbtd == 1">
              <span class="price">{{
                  nums.data.userlist.name.taxFee + nums.data.userlist.name.fuelFee
                }}</span>×{{ userlists.length }}人
            </div>
            <div v-else>
              <span class="price">{{
                  nums.data.userlist.name.taxFee + nums.data.userlist.name.fuelFee
                }}</span>×{{ passengers.length }}人
            </div>
          </div>
          <div class="tslist" v-if="profitPrice != 0 && profitPrice != '请选择' && profitPrice != undefined">
            <div>保险</div>
            <div v-if="isbtd == 1">{{ profitPrices }}×{{ userlists.length }}人</div>
            <div v-else>{{ profitPrices }}×{{ passengers.length }}人</div>
          </div>
          <div class="tslist" v-else>
            <div>保险</div>
            <div v-if="isbtd == 1">0×{{ userlists.length }}人</div>
            <div v-else>0×{{ passengers.length }}人</div>
          </div>
          <div class="tslist">
            <div>服务费</div>
            <div v-if="isbtd == 1">{{ tips }}×{{ userlists.length }}人</div>
            <div v-else>{{ tips }}×{{ passengers.length }}人</div>
          </div>
        </div>
        <div class="tslists">
          <div>合计</div>
          <div style="color: #FF6600;">￥{{ num }}</div>
        </div>
        <div class="tsbtn" :disabled="kun" @click="panduan(1)" v-if="isblcks != 4 && rotes('tms:dps:reserve')">
          提交订单
        </div>
        <div class="tsbtn" @click="panduan(2)" v-if="isblcks == 4 && rotes('tms:dps:change')">
          申请改签
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import passenger from "@/components/common/passenger";
import citysearch from "@/components/common/citycomponents";
import citysearchs from "@/components/common/citycomponents_t";
import citysearchh from "@/components/common/citycomponents_h";
import addPassenger from "@/components/common/addPassenger";

let ip_test = /^[1][3456789][0-9]{9}$/; //电话号码正则
let posPattern = /^[a-zA-Z]+$/;
export default {
  data() {
    return {
      isok: {
        isok: ''
      },
      tokens: '',
      imageUrl: '', //照片路径
      num: 0, //合计
      leng: '',
      passengers: [], //出行人员
      backrule: {},
      nums: {}, //页面对象
      Brokerage: "", //火车单人手续费
      bank_deposit: '', //开户银行
      zhi: '',
      abstid: -1, //当前银行搜索下标
      units: '', //单位名称
      user_remark: '', //改签原因
      reson: "", //出行事由
      drawelist: [], //盒子内容
      drawer: false, //盒子默认关闭
      covesr: false,
      covers: false,
      prices: 0, //票价
      priceas: 0, //回来的票价
      amounto: 0, //基建
      amountt: 0, //燃油
      bots: { //使用props替换掉本来默认的lable和value 的键值
        value: 'id',
        label: 'text'
      },
      NameCenter: { //当前选择成本中心
        name: '',
        id: 0
      },
      options: [{
        value: '1',
        label: '公务员卡验证'
      }, {
        value: '2',
        label: '预算单位验证'
      }],
      value: '1',
      civilServiceTicket: '',
      tips: 0, //服务费
      allIsGift: false, //是否赠送保险
      treeLists: [], //成本中心
      TravelDepartlist: [], //部门审批人
      TravelCostCenlist: [], //成本中心审批人
      CostCi: false, //是否有成本审批人
      CostCis: false, //是否有部门审批人
      Deparapprover: [], //部门审批人
      CostCenterlist: [], //成本审批人
      iscost: true, //true为成本中心false为部门
      insuranceNo: '',
      insuranceNos: '',
      facePrices: 0,
      profitPrices: 0,
      isGift: 0,
      isGifts: 0,
      Default: 0,
      Defaults: 0,
      profitPrice: '请选择',
      apprvCost: [],
      kingList: [], //保险
      kinsList: [], //保险
      banklist: [], //银行集合
      banklists: [], //当前搜索银行
      lname: JSON.parse(sessionStorage.getItem('userinfo')).userName, //默认联系人
      attdepartment: JSON.parse(sessionStorage.getItem('userinfo')).deptName, //默认部门
      lipone: '', //默认联系人,
      user_ipone: '',
      isarsrl: false,
      loading: false,
      staleve: false,
      respeatBook: [],
      notbooking: false,
      pricdesc: '', //高价超规原因
      rulesReasons: [], //超规类型
      bools: false,
      kun: false,
      isone: true,
      isblcks: '',
      butalist: [],
      mouses: false,
      getTravelPolicys: {},
      userlist: [],
      userlists: [], //旅客信息
      vehicleId: '', //事前id
      vehicleIdBack: '', //事前id
      passengerNoslist: [], //改签人passno
      trainslis: null, //上个页面的参数
      scardns: [],
      scardnno: [],
      CostCencd: [],
      context: '',
      codes: '', //验舱验价状态
      fasp: 0,
      facePrice: 0,
      returnTicketPrice: 0,
      toReturn: 0,
      isbtd: 0,
      isblckt: false, //二次审核
      action: ''
    };
  },
  components: {
    addPassenger
  },
  watch: {
    passengers: {
      handler(newName, oldName) {
        this.leng = this.passengers.length;
        this.userliste();
        this.amount(this.toReturn);
      },
    },
    deep: true
  },
  mounted() {
    let lis = JSON.parse(this.$route.query.data); //获取上个页面传入的参数
    this.tokens = JSON.parse(sessionStorage.getItem('userinfo')).token;
    this.action = sessionStorage.getItem('root')+"/tms/api/user/uploadPassengerImage";
    let st = lis;
    this.isblckt = lis.isblckt;
    this.civilServiceTicket = st.civilServiceTicket;
    let dat = {};
    if (st.isone) { //单程
      this.isone = true;
      dat = lis;
    } else { //往返
      this.isone = false;
      dat = lis.ones;
      this.nums = lis.twos;
    }
    this.butalist = dat.data.datw.butalist;

    this.trainslis = dat || {};
    this.dats = dat;
    this.packlist = dat;
    this.userlist = dat.data.userlist;
    this.date = dat.date;
    this.timelist = dat.data.timelist;
    this.hang = dat.hang;
    this.isarsrl = dat.isarsrl; //是否免审
    this.isblcks = dat.data.datw.isblcks; //1事前2事中
    this.isbtd = dat.data.datw.isbtd; //1应公2应私
    if (this.isblcks == 4 && this.isbtd == 1) {
      this.passengerNoslist = dat.data.datw.passengerNos; //改签出行人no
    }
    this.usernams();
    if (this.isbtd == 1){
    this.userliste(); //出行人信息
    }
    this.getstu();
    this.getBrokerage();
    this.selts(); //查询成本中心
    if (this.isblcks != 4) {
      this.baoxian(); //保险
    }
    this.getTravelPolicyst(); //保险规则判断
  },
  methods: {
    onInput(itm, id) {
      this.abstid = id;
      let va = itm;
      if (va.length > 0) {
        let banks = this.banklist; //当前所有银行
        this.banklists = [];
        for (let i in banks) {
          if (banks[i].indexOf(va) >= 0) {
            this.banklists.push(banks[i])
          }
        }
      }
    },
    mouseEnter() {
      this.mouses = true;
    },
    mouseOut() {
      this.mouses = false;
    },
    changeCount() {
      this.abstid = -1;
    },
    bankss(carval, item_bk) {
      this.userlists[this.abstid].carval = item_bk;
      this.abstid = -1;
    },
    handleSuccess(response, file, fileList) { //上传头像成功后处理---
      this.$message({
        message: '上传成功！',
        type: 'success'
      })
      if (response.code == 200) {
        this.imageUrl = response.data;
      }
    },
    handleError() {
      this.$message({
        message: '上传失败,请重新上传图片!！',
        type: 'error'
      })
    },
    handleBeforeUpload(file) {
      const isImage = file.type.includes("image");
      if (!isImage) {
        this.$message.error("上传文件类型必须是图片!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isImage && isLt2M;
    },
    handleProgress(event, file, fileList) {
      this.loadings = true; //  上传时执行loading事件
    },

    async usernams() { //获取联系人
      try {
        const res = await this.$api.home.getContactInfo();
        if (res.code == 200) {
          this.user_name = res.data.name;
          this.user_ipone = res.data.phone;
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
    async baoxian() { //保险
      let uses = [];
      uses = {
        "civilServiceTicket": ''
      }
      this.loading = true;
      try {
        const rea = await this.$api.home.toBook(uses); //保险
        this.loading = false;
        let kings = [];
        let kinga = [];
        let bank = [];
        this.bank = [];
        this.kingList = [];
        this.kinsList = [];
        if (rea.code == 200) {
          for (let i in rea.data.bankList) {
            bank.push(rea.data.bankList[i].name);
          }
          this.banklist = bank;
          if (rea.data.product.insurDomesticList != null) {
            for (var i = 0; i < rea.data.product.insurDomesticList.length; i++) {
              if (rea.data.product.insurDomesticList[i].insureType == 1) {
                kings.push(rea.data.product.insurDomesticList[i]);
              } else {
                kinga.push(rea.data.product.insurDomesticList[i]);
              }
            }
            kings.unshift({
              name: '请选择'
            }); //航意险

            this.kingList = kings;
            kinga.unshift({
              name: '请选择'
            }); //航延险
            this.kinsList = kinga;

            if (this.kingList.length > 1) { //默认选择保险
              for (let i in this.kingList) {
                if (this.kingList[i].isDefaulConfig == 1) {
                  this.Default = i;
                  this.profitPrice = this.kingList[i].name;
                  this.facePrices = this.kingList[i].facePrice;
                  this.profitPrices = this.kingList[i].profitPrice;
                  this.insuranceNo = this.kingList[i].insuranceNo;
                }
              }
            }
            if (this.kinsList.length > 1) { //默认选择保险
              for (let i in this.kinsList) {
                if (this.kinsList[i].isDefaulConfig == 1) {
                  this.Defaults = i;
                  this.facePrice = this.kinsList[i].facePrice;
                  this.profitPrice = this.kinsList[i].profitPrice;
                  this.insuranceNos = this.kinsList[i].insuranceNo;
                }
              }
            }
            this.commit();
          }
        }
      } catch (e) {
        console.log(e)
        this.loading = false;
      }
    },
    passage(list) {
      this.passengers = list;
    },
    async getTravelPolicyst() {
      try {
        const res = await this.$api.order.getTravelPolicy(); //保险规则判断
        if (res.code == 200) {
          this.getTravelPolicys = res.data;
          this.commit();
        } else {
          that.$message({
            message: res.message,
            type: 'warning'
          });
        }
      } catch (e) {
        //TODO handle the exception
        console.log(e)
      }
    },
    chineseChange(id) { //航意险
      this.Default = this.profitPrice;
      if (this.Default == 0) {
        this.facePrices = 0;
        this.profitPrices = 0;
      } else {
        for (let k in this.kingList) {
          if (this.kingList[k].id == this.Default) {
            this.insuranceNo = this.kingList[k].insuranceNo;
            this.isGift = this.kingList[k].isGift;
            if (this.isGift == 1) { //1是赠送
              this.facePrices = 0;
              this.profitPrices = 0;
            } else {
              this.facePrices = this.kingList[k].facePrice;
              this.profitPrices = this.kingList[k].profitPrice;
            }
          }
          if (this.kingList[k].facePrice == null) {
            this.facePrices = 0;
          } else if (this.kingList[k].profitPrice == null) {
            this.profitPrices = 0;
          }
        }
      }
      this.commit();
    },
    async getstu() { //获取飞机p价
      let shared = '';
      if (this.dats.data.userlist.name.shared == true) {
        shared = "0"
      } else {
        shared = "1"
      }
      let usera = {};
      if (this.civilServiceTicket == 1) {
        if (this.isone == true) {
          if (this.dats.datw.priceSource == 1) {
            usera = {
              special: 4,
              airline: {
                airlineType: 1,
                passengerType: "ADT",
                flightInfoId: this.dats.data.userlist.name.flightinfoid,
                priceInfoId: this.dats.datw.priceInfoId,
                one_depart: this.dats.data.userlist.name.depart, //第一段，出发城市
                one_departDate: (this.dats.data.userlist.name.departDate).substring(0, 10), //第一段，出发日期
                one_departTime: this.dats.data.userlist.name.departTime, //第一段，出发时间
                one_arrival: this.dats.data.userlist.name.arrive, //第一段，到达城市
                one_no: this.dats.data.userlist.name.no, //第一段，航班号
                one_sharedBZ: shared, //是否共享航班
                one_operatingNo: this.dats.data.userlist.name.operatingNo, //第一段，实际承运航班号
                one_cabin: this.dats.datw.cabin, //第一段，舱位
                civilServiceTicket: this.civilServiceTicket, //展示公务机票 标识。1：展示；0：不展示
                isSame: "2", //是否为往返组合标识，1：是；2：不是
                one_taxFee: this.dats.data.userlist.name.taxFee, //第一段，机建
                one_fuelFee: this.dats.data.userlist.name.fuelFee, //第一段，燃油
                one_fdprice: this.facePrice, //第一段公布运价
                one_arrivalTime: this.dats.data.userlist.name.arriveTime, //第一段，到达时间arriveTime
              },
            }
          } else {
            usera = {
              special: this.dats.datw.specialType,
              airline: {
                airlineType: 1,
                passengerType: "ADT",
                one_depart: this.dats.data.userlist.name.depart, //第一段，出发城市
                one_departDate: (this.dats.data.userlist.name.departDate).substring(0, 10), //第一段，出发日期
                one_departTime: this.dats.data.userlist.name.departTime, //第一段，出发时间
                one_arrival: this.dats.data.userlist.name.arrive, //第一段，到达城市
                one_no: this.dats.data.userlist.name.no, //第一段，航班号
                one_sharedBZ: shared, //是否共享航班
                one_operatingNo: this.dats.data.userlist.name.operatingNo, //第一段，实际承运航班号
                one_cabin: this.dats.datw.cabin, //第一段，舱位
                civilServiceTicket: this.civilServiceTicket, //展示公务机票 标识。1：展示；0：不展示
                isSame: "2", //是否为往返组合标识，1：是；2：不是
                one_taxFee: this.dats.data.userlist.name.taxFee, //第一段，机建
                one_fuelFee: this.dats.data.userlist.name.fuelFee, //第一段，燃油
                one_fdprice: this.facePrice, //第一段公布运价
                one_arrivalTime: this.dats.data.userlist.name.arriveTime, //第一段，到达时间arriveTime
              },
            }
          }
        } else {
          if (this.dats.datw.priceSource == 1) {
            usera = {
              special: 4,
              airline: {
                passengerType: "ADT",
                airlineType: 2,
                flightInfoId: this.dats.data.userlist.name.flightinfoid,
                priceInfoId: this.dats.datw.priceInfoId,
                one_depart: this.dats.data.userlist.name.depart, //第一段，出发城市
                one_departDate: (this.dats.data.userlist.name.departDate).substring(0, 10), //第一段，出发日期
                one_departTime: this.dats.data.userlist.name.departTime, //第一段，出发时间
                one_arrival: this.dats.data.userlist.name.arrive, //第一段，到达城市
                one_no: this.dats.data.userlist.name.no, //第一段，航班号
                one_sharedBZ: shared, //是否共享航班
                one_operatingNo: this.dats.data.userlist.name.operatingNo, //第一段，实际承运航班号
                one_cabin: this.dats.datw.cabin, //第一段，舱位
                civilServiceTicket: this.civilServiceTicket, //展示公务机票 标识。1：展示；0：不展示
                isSame: "1", //是否为往返组合标识，1：是；2：不是
                one_taxFee: this.dats.data.userlist.name.taxFee, //第一段，机建
                one_fuelFee: this.dats.data.userlist.name.fuelFee, //第一段，燃油
                one_fdprice: this.facePrice, //第一段公布运价
                two_depart: this.nums.data.userlist.name.depart, //第二段，出发城市
                two_departDate: (this.nums.data.userlist.name.departDate).substring(0, 10), //第二段，出发日期
                two_departTime: this.nums.data.userlist.name.departTime, //第二段，出发时间
                two_arrival: this.nums.data.userlist.name.arrive, //第二段，到达城市
                two_no: this.nums.data.userlist.name.no, //第二段，航班号
                two_sharedBZ: shared, //是否共享航班
                two_operatingNo: this.nums.data.userlist.name.operatingNo, //第二段，实际承运航班号
                two_cabin: this.nums.datw.cabin, //第二段，舱位
                two_taxFee: this.nums.data.userlist.name.taxFee, //第二段，机建
                two_fuelFee: this.nums.data.userlist.name.fuelFee, //第二段，燃油
                two_fdprice: this.returnTicketPrice, //第二段公布运价
                one_arrivalTime: this.dats.data.userlist.name.arriveTime, //第一段，到达时间arriveTime
                two_arrivalTime: this.nums.data.userlist.name.arriveTime, //第二段，到达时间
              },
            }
          } else {
            usera = {
              special: this.dats.datw.specialType,
              airline: {
                passengerType: "ADT",
                airlineType: 2,
                one_depart: this.dats.data.userlist.name.depart, //第一段，出发城市
                one_departDate: (this.dats.data.userlist.name.departDate).substring(0, 10), //第一段，出发日期
                one_departTime: this.dats.data.userlist.name.departTime, //第一段，出发时间
                one_arrival: this.dats.data.userlist.name.arrive, //第一段，到达城市
                one_no: this.dats.data.userlist.name.no, //第一段，航班号
                one_sharedBZ: shared, //是否共享航班
                one_operatingNo: this.dats.data.userlist.name.operatingNo, //第一段，实际承运航班号
                one_cabin: this.dats.datw.cabin, //第一段，舱位
                civilServiceTicket: this.civilServiceTicket, //展示公务机票 标识。1：展示；0：不展示
                isSame: "1", //是否为往返组合标识，1：是；2：不是
                one_taxFee: this.dats.data.userlist.name.taxFee, //第一段，机建
                one_fuelFee: this.dats.data.userlist.name.fuelFee, //第一段，燃油
                one_fdprice: this.facePrice, //第一段公布运价
                two_depart: this.nums.data.userlist.name.depart, //第二段，出发城市
                two_departDate: (this.nums.data.userlist.name.departDate).substring(0, 10), //第二段，出发日期
                two_departTime: this.nums.data.userlist.name.departTime, //第二段，出发时间
                two_arrival: this.nums.data.userlist.name.arrive, //第二段，到达城市
                two_no: this.nums.data.userlist.name.no, //第二段，航班号
                two_sharedBZ: shared, //是否共享航班
                two_operatingNo: this.nums.data.userlist.name.operatingNo, //第二段，实际承运航班号
                two_cabin: this.nums.datw.cabin, //第二段，舱位
                two_taxFee: this.nums.data.userlist.name.taxFee, //第二段，机建
                two_fuelFee: this.nums.data.userlist.name.fuelFee, //第二段，燃油
                two_fdprice: this.returnTicketPrice, //第二段公布运价
                one_arrivalTime: this.dats.data.userlist.name.arriveTime, //第一段，到达时间arriveTime
                two_arrivalTime: this.nums.data.userlist.name.arriveTime, //第二段，到达时间
              },
            }
          }

        }
      } else {
        if (this.isone == true) {
          if (this.dats.datw.priceSource == 1) {
            usera = {
              special: 4,
              airline: {
                airlineType: 1,
                passengerType: "ADT",
                flightInfoId: this.dats.data.userlist.name.flightinfoid,
                priceInfoId: this.dats.datw.priceInfoId,
                one_depart: this.dats.data.userlist.name.depart, //第一段，出发城市
                one_departDate: (this.dats.data.userlist.name.departDate).substring(0, 10), //第一段，出发日期
                one_departTime: this.dats.data.userlist.name.departTime, //第一段，出发时间
                one_arrival: this.dats.data.userlist.name.arrive, //第一段，到达城市
                one_no: this.dats.data.userlist.name.no, //第一段，航班号
                one_sharedBZ: shared, //是否共享航班
                one_operatingNo: this.dats.data.userlist.name.operatingNo, //第一段，实际承运航班号
                one_cabin: this.dats.datw.cabin, //第一段，舱位
                isSame: "2", //是否为往返组合标识，1：是；2：不是
                one_taxFee: this.dats.data.userlist.name.taxFee, //第一段，机建
                one_fuelFee: this.dats.data.userlist.name.fuelFee, //第一段，燃油
                one_fdprice: this.facePrice, //第一段公布运价
                one_arrivalTime: this.dats.data.userlist.name.arriveTime, //第一段，到达时间arriveTime
              },
            }
          }
          // 美瀛-单段-不展示公务员票
          else if (this.dats.datw.priceSource == 2) {
            usera = {
              special: 5,
              airline: {
                airlineType: 1,
                passengerType: "ADT",
                one_operatingNo: this.dats.data.userlist.name.operatingNo,
                one_cabin: this.dats.datw.cabin,
                isSame: "2",
                one_taxFee: this.dats.data.userlist.name.taxFee,
                one_fuelFee: this.dats.data.userlist.name.fuelFee,
                one_fdprice: this.facePrice,
              },
            }
          } else {
            usera = {
              special: this.dats.datw.specialType,
              airline: {
                airlineType: 1,
                passengerType: "ADT",
                one_depart: this.dats.data.userlist.name.depart, //第一段，出发城市
                one_departDate: (this.dats.data.userlist.name.departDate).substring(0, 10), //第一段，出发日期
                one_departTime: this.dats.data.userlist.name.departTime, //第一段，出发时间
                one_arrival: this.dats.data.userlist.name.arrive, //第一段，到达城市
                one_no: this.dats.data.userlist.name.no, //第一段，航班号
                one_sharedBZ: shared, //是否共享航班
                one_operatingNo: this.dats.data.userlist.name.operatingNo, //第一段，实际承运航班号
                one_cabin: this.dats.datw.cabin, //第一段，舱位
                isSame: "2", //是否为往返组合标识，1：是；2：不是
                one_taxFee: this.dats.data.userlist.name.taxFee, //第一段，机建
                one_fuelFee: this.dats.data.userlist.name.fuelFee, //第一段，燃油
                one_fdprice: this.facePrice, //第一段公布运价
                one_arrivalTime: this.dats.data.userlist.name.arriveTime, //第一段，到达时间arriveTime
              },
            }
          }
        } else {
          if (this.dats.datw.priceSource == 1) {
            usera = {
              special: 4,
              airline: {
                passengerType: "ADT",
                airlineType: 2,
                flightInfoId: this.dats.data.userlist.name.flightinfoid,
                priceInfoId: this.dats.datw.priceInfoId,
                one_depart: this.dats.data.userlist.name.depart, //第一段，出发城市
                one_departDate: (this.dats.data.userlist.name.departDate).substring(0, 10), //第一段，出发日期
                one_departTime: this.dats.data.userlist.name.departTime, //第一段，出发时间
                one_arrival: this.dats.data.userlist.name.arrive, //第一段，到达城市
                one_no: this.dats.data.userlist.name.no, //第一段，航班号
                one_sharedBZ: shared, //是否共享航班
                one_operatingNo: this.dats.data.userlist.name.operatingNo, //第一段，实际承运航班号
                one_cabin: this.dats.datw.cabin, //第一段，舱位
                isSame: "1", //是否为往返组合标识，1：是；2：不是
                one_taxFee: this.dats.data.userlist.name.taxFee, //第一段，机建
                one_fuelFee: this.dats.data.userlist.name.fuelFee, //第一段，燃油
                one_fdprice: this.facePrice, //第一段公布运价
                two_depart: this.nums.data.userlist.name.depart, //第二段，出发城市
                two_departDate: (this.nums.data.userlist.name.departDate).substring(0, 10), //第二段，出发日期
                two_departTime: this.nums.data.userlist.name.departTime, //第二段，出发时间
                two_arrival: this.nums.data.userlist.name.arrive, //第二段，到达城市
                two_no: this.nums.data.userlist.name.no, //第二段，航班号
                two_sharedBZ: shared, //是否共享航班
                two_operatingNo: this.nums.data.userlist.name.operatingNo, //第二段，实际承运航班号
                two_cabin: this.nums.datw.cabin, //第二段，舱位
                two_taxFee: this.nums.data.userlist.name.taxFee, //第二段，机建
                two_fuelFee: this.nums.data.userlist.name.fuelFee, //第二段，燃油
                two_fdprice: this.returnTicketPrice, //第二段公布运价
                one_arrivalTime: this.dats.data.userlist.name.arriveTime, //第一段，到达时间arriveTime
                two_arrivalTime: this.nums.data.userlist.name.arriveTime, //第二段，到达时间
              },
            }
          } else {
            usera = {
              special: this.dats.datw.specialType,
              airline: {
                passengerType: "ADT",
                airlineType: 2,
                one_depart: this.dats.data.userlist.name.depart, //第一段，出发城市
                one_departDate: (this.dats.data.userlist.name.departDate).substring(0, 10), //第一段，出发日期
                one_departTime: this.dats.data.userlist.name.departTime, //第一段，出发时间
                one_arrival: this.dats.data.userlist.name.arrive, //第一段，到达城市
                one_no: this.dats.data.userlist.name.no, //第一段，航班号
                one_sharedBZ: shared, //是否共享航班
                one_operatingNo: this.dats.data.userlist.name.operatingNo, //第一段，实际承运航班号
                one_cabin: this.dats.datw.cabin, //第一段，舱位
                isSame: "1", //是否为往返组合标识，1：是；2：不是
                one_taxFee: this.dats.data.userlist.name.taxFee, //第一段，机建
                one_fuelFee: this.dats.data.userlist.name.fuelFee, //第一段，燃油
                one_fdprice: this.facePrice, //第一段公布运价
                two_depart: this.nums.data.userlist.name.depart, //第二段，出发城市
                two_departDate: (this.nums.data.userlist.name.departDate).substring(0, 10), //第二段，出发日期
                two_departTime: this.nums.data.userlist.name.departTime, //第二段，出发时间
                two_arrival: this.nums.data.userlist.name.arrive, //第二段，到达城市
                two_no: this.nums.data.userlist.name.no, //第二段，航班号
                two_sharedBZ: shared, //是否共享航班
                two_operatingNo: this.nums.data.userlist.name.operatingNo, //第二段，实际承运航班号
                two_cabin: this.nums.datw.cabin, //第二段，舱位
                two_taxFee: this.nums.data.userlist.name.taxFee, //第二段，机建
                two_fuelFee: this.nums.data.userlist.name.fuelFee, //第二段，燃油
                two_fdprice: this.returnTicketPrice, //第二段公布运价
                one_arrivalTime: this.dats.data.userlist.name.arriveTime, //第一段，到达时间arriveTime
                two_arrivalTime: this.nums.data.userlist.name.arriveTime, //第二段，到达时间
              },
            }
          }
        }
      }
      this.loading = true;
      try {
        const res = await this.$api.order.getPnrPriceInfor(usera);
        this.loading = false;
        this.codes = res.code;
        if (res.code == 200) {
          if (this.isone == true) {
            if (res.data != null && res.data.length > 0) {
              let datw = this.trainslis.datw.salePrices[0];
              if (this.dats.datw.priceSource == 1) { //官方票特定读值方式
                if (this.trainslis.datw.salePrices[0].parPrice == res.data[0].baseFare) {
                  this.prices = this.trainslis.datw.salePrices[0].price;
                } else if (res.data[0].baseFare != 0) {
                  this.prices = res.data[0].baseFare - res.data[0].baseFare * datw.rebate / 100 - datw.cashBack;
                } else {
                  this.prices = this.trainslis.datw.salePrices[0].price;
                }
                this.amount(1);
                this.amounto = res.data[0].taxes[0].amount; //基建
                this.context = res.data[0].context;
              } else { //普通票特定读值方式
                if (this.trainslis.datw.salePrices[0].parPrice == res.data[0].segFareInfos[0].baseFare) {
                  this.prices = this.trainslis.datw.salePrices[0].price;
                } else if (res.data[0].segFareInfos[0].baseFare != 0) {
                  this.prices = res.data[0].segFareInfos[0].baseFare - res.data[0].segFareInfos[0].baseFare * datw.rebate /
                      100 - datw.cashBack;
                } else {
                  this.prices = this.trainslis.datw.salePrices[0].price;
                }
                this.amount(1);
                this.amounto = res.data[0].taxes[0].amount; //基建
                this.context = res.data[0].context;
              }
              if (this.dats.datw.priceSource == 1) { //官方票特定读值方式
                if (res.data[0].baseFare != 0 && res.data[0].baseFare != null) {
                  this.facePrice = res.data[0].baseFare;
                } else {
                  this.facePrice = this.trainslis.datw.salePrices[0].parPrice;
                }
              } else { //普通票读值方式
                if (res.data[0].segFareInfos[0].baseFare != 0 && res.data[0].segFareInfos[0].baseFare != null) {
                  this.facePrice = res.data[0].segFareInfos[0].baseFare;
                } else {
                  this.facePrice = this.trainslis.datw.salePrices[0].parPrice;
                }
              }
            } else {
              this.prices = this.trainslis.datw.salePrices[0].price;
              this.facePrice = this.trainslis.datw.salePrices[0].parPrice;
              this.amount(1);
            }

          } else {
            let _this = this;
            if (res.data != null && res.data.length > 0) {
              let datw = _this.trainslis.datw.salePrices[0];
              if (datw.parPrice == res.data[0].segFareInfos[0].baseFare) {
                _this.prices = datw.price;
              } else if (res.data[0].segFareInfos[0].baseFare != 0) {
                _this.prices = res.data[0].segFareInfos[0].baseFare - res.data[0].segFareInfos[0].baseFare * datw.rebate /
                    100 - datw.cashBack;
              } else {
                _this.prices = datw.price;
              }
              let nums = _this.nums.datw.salePrices[0];
              if (nums.parPrice == res.data[0].segFareInfos[1].baseFare) {
                _this.priceas = nums.price;
              } else if (res.data[0].segFareInfos[1].baseFare != 0) {
                _this.priceas = res.data[0].segFareInfos[1].baseFare - res.data[0].segFareInfos[1].baseFare * nums.rebate /
                    100 - nums.cashBack; //票价
              } else {
                _this.priceas = nums.price;
              }
              _this.amount(2);
              _this.context = res.data[0].context;
              if (res.data[0].segFareInfos[0].baseFare != 0 && res.data[0].segFareInfos[0].baseFare != null) {
                _this.facePrice = res.data[0].segFareInfos[0].baseFare;
              } else {
                _this.facePrice = this.trainslis.datw.salePrices[0].parPrice;
              }
              if (res.data[0].segFareInfos[1].baseFare != 0 && res.data[0].segFareInfos[1].baseFare != null) {
                _this.returnTicketPrice = res.data[0].segFareInfos[1].baseFare;
              } else {
                _this.returnTicketPrice = _this.nums.datw.salePrices[0].parPrice;
              }
            } else {
              let datw = _this.trainslis.datw.salePrices[0];
              let nums = _this.nums.datw.salePrices[0];
              _this.prices = datw.price;
              _this.priceas = nums.price;
              _this.facePrice = datw.parPrice;
              _this.returnTicketPrice = nums.parPrice;
              _this.amount(2);
            }
          }
        } else {
          this.loading = false;
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      } catch (e) {
        console.log(e)
        this.loading = false;
      }

    },

    commit() {
      let num = 0;
      if (this.profitPrice == undefined) {
        num = 0;
      } else {
        num = this.profitPrices;
      }
      let fas = num; //保险价格

      this.fasp = fas;
      var tempIsGift = false;
      if ((this.Default == undefined || this.Default == 0) && fas == 0) {
        tempIsGift = true;
      } else {
        if (this.isGift == 1) {
          tempIsGift = true;
        } else {
          tempIsGift = false;
        }
      }
      var tempIsGifts = false;
      if (this.Defaults == 0 && fas == 0) {
        tempIsGifts = true;
      } else {
        if (this.isGifts == 1) {
          tempIsGifts = true;
        } else {
          tempIsGifts = false;
        }
      }

      if (tempIsGift && tempIsGifts) {
        this.allIsGift = true;
        if (this.isbtd == 1) {
          let OnlinePublicCabinServiceFee = this.getTravelPolicys.dpsOnlinePublicCabinServiceFee; //因公服务费
          if ('F' == this.dats.datw.level) {
            this.tips = OnlinePublicCabinServiceFee.f;
          } else if ('C' == this.dats.datw.level) {
            this.tips = OnlinePublicCabinServiceFee.c;
          } else {
            this.tips = OnlinePublicCabinServiceFee.y;
          }
        } else {
          let OnlinePrivateCabinServiceFee = this.getTravelPolicys.dpsOnlinePrivateCabinServiceFee; //因私服务费
          if ('F' == this.dats.datw.level) {
            this.tips = OnlinePrivateCabinServiceFee.f;
          } else if ('C' == this.dats.datw.level) {
            this.tips = OnlinePrivateCabinServiceFee.c;
          } else {
            this.tips = OnlinePrivateCabinServiceFee.y;
          }
        }
      } else {
        if (this.isbtd == 1) {

          let OnlinePublicCabinServiceFee = this.getTravelPolicys.dpsOnlinePublicCabinServiceFee; //因公服务费

          if ('F' == this.dats.datw.level) {
            this.tips = OnlinePublicCabinServiceFee.f;
          } else if ('C' == this.dats.datw.level) {
            this.tips = OnlinePublicCabinServiceFee.c;
          } else {
            this.tips = OnlinePublicCabinServiceFee.y;
          }
        } else {
          let OnlinePrivateCabinServiceFee = this.getTravelPolicys.dpsOnlinePrivateCabinServiceFee; //因私服务费
          if ('F' == this.dats.datw.level) {
            this.tips = OnlinePrivateCabinServiceFee.f;
          } else if ('C' == this.dats.datw.level) {
            this.tips = OnlinePrivateCabinServiceFee.c;
          } else {
            this.tips = OnlinePrivateCabinServiceFee.y;
          }
        }
      }
      let nus = 0;
      let nut = 0;
      if (this.isbtd == 1) {
        this.leng = this.dats.data.datw.butalist.length;
      }
      if (this.dats.data.datw.timedates == "") { //单程
        this.toReturn = 1;
        this.amount(1);
      } else {
        this.toReturn = 2;
        this.amount(2);
      }
    },
    amount(bo) {
      let nus = 0;
      let nut = 0;
      if (bo == 1) {
        if (this.prices != 0 && this.prices != null) {
          nus = this.prices + this.userlist.name.fuelFee + this.userlist.name.taxFee; //去
        } else {
          nus = this.dats.datw.salePrices[0].price + this.userlist.name.fuelFee + this.userlist.name.taxFee; //去
        }
        this.num = parseFloat(nus) + parseFloat(this.fasp) + this.tips;
        this.num = parseFloat(this.num * this.leng).toFixed(2)
      } else {
        if (this.prices != 0 && this.prices != null) {
          nus = this.prices + this.userlist.name.fuelFee + this.userlist.name.taxFee; //去
        } else {
          nus = this.dats.datw.salePrices[0].price + this.userlist.name.fuelFee + this.userlist.name.taxFee; //去
        }
        if (this.priceas != 0 && this.priceas != null) {
          nut = this.priceas + this.nums.data.userlist.name.fuelFee + this.nums.data.userlist.name.taxFee;
        } else {
          nut = this.nums.datw.salePrices[0].price + this.nums.data.userlist.name.fuelFee + this.nums.data.userlist.name.taxFee;
        }
        this.num = parseFloat(nus) + parseFloat(nut) + parseFloat(this.fasp * 2) + parseFloat(this.tips * 2);
        this.num = parseFloat(this.num * this.leng).toFixed(2)
      }
    },
    async masks() {
      this.covesr = true;
      this.covers = true;
      try {
        let data = {
          airlineCode: this.trainslis.data.userlist.name.airline, //航司编码
          cabin: this.trainslis.datw.cabin, //舱位
          depDate: this.trainslis.data.userlist.name.departDate, //起飞时间
          airRoute: this.trainslis.data.userlist.name.depart + this.trainslis.data.userlist.name.arrive, //航线：CANPVG（出发地到达地）
        }
        const ret = await this.$api.home.getRefundChangeRule(data);
        if (ret.code == 200) {
          this.backrule = ret.data;
        } else {
          this.$message({
            message: ret.message,
            type: 'warning'
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    mask() {
      this.covesr = false;
      this.covers = false;
    },
    async panduan(i) { //重复预订判断
      this.MentionChange = i; //1是提交2是改签
      let uses = {};
      let usest = {};
      let usert = [];
      let that = this;
      let userlists = that.userlists;
      let isbtd = that.isbtd; //1因公2因私
      let isblcks = that.isblcks; //1事前 2事中

      if (isblcks != 4) {
        for (let i = 0; i < userlists.length; i++) { //出行人信息
          usert.push({
            cardNo: that.scardnno[i],
            cardType: that.scardns[i],
            name: userlists[i].name,
            phone: userlists[i].phone,
            passengerNo: userlists[i].passengerNo
          });
        }
      } else {
        for (let i = 0; i < userlists.length; i++) { //出行人信息
          usert.push({
            cardNo: userlists[i].certNo,
            cardType: that.cardtype(userlists[i].certType),
            name: userlists[i].name,
            phone: userlists[i].phone,
            passengerNo: that.passengerNoslist[i]
          });
        }
      }

      if (that.isone == true && isbtd == 1) {
        uses = {
          depart: that.dats.data.userlist.name.depart, //第一段，出发城市
          arrive: that.dats.data.userlist.name.arrive, //第一段，到达城市
          flightNo: that.dats.data.userlist.name.no, //航班号
          departDate: that.dats.data.userlist.name.departDate.substring(0, 10) + " " + that.dats.data.userlist.name.departTime +
              ':00', //第一段，出发日期
          staffIds: usert //出行人信息
        }
      } else if (that.isone == false && isbtd == 1) {
        uses = {
          depart: that.dats.data.userlist.name.depart, //第一段，出发城市
          arrive: that.dats.data.userlist.name.arrive, //第一段，到达城市
          flightNo: that.dats.data.userlist.name.no, //航班号
          departDate: that.dats.data.userlist.name.departDate.substring(0, 10) + " " + that.dats.data.userlist.name.departTime +
              ':00', //第一段，出发日期
          staffIds: usert //出行人信息
        }
        usest = {
          depart: that.nums.data.userlist.name.depart, //第二段，出发城市
          arrive: that.nums.data.userlist.name.arrive, //第二段，到达城市
          flightNo: that.nums.data.userlist.name.no, //航班号
          departDate: that.nums.data.userlist.name.departDate.substring(0, 10) + " " + that.dats.data.userlist.name.departTime +
              ':00', //第二段，出发日期
          staffIds: usert //出行人信息
        }
      }
      if (isbtd == 1) {
        try {
          const ret = await that.$api.order.ruleCheckRepeatBook(uses); //重复预定规则校验
          if (ret.code == 200) {
            that.rulesReasons = ret.data.rulesReason;
            let datas = ret.data.limitNativeRule;
            if (JSON.stringify(datas) != "{}") {
              that.limitNativeRule = datas;
              that.repeatBookingLimit = datas.repeatBookingLimit; //重复预定规则政策
              if (JSON.stringify(that.repeatBookingLimit) == "{}") { //没有违反政策直接跳到预定页面
                if (that.MentionChange == 1) {
                  that.okadd(); //跳转提交
                } else {
                  that.updata(); //跳转改签
                }
              } else {
                that.respeatBook = [];
                that.bools = true;
                that.notbooking = false;
                for (let i in that.repeatBookingLimit) {
                  if (i == 7) { //不管控
                    that.notbooking = false;
                  }
                  if (i == 8) { //提示重复但不限定
                    that.idstarle = true
                    that.bools = true;
                    that.respeatBook.push({
                      name: i,
                      list: that.repeatBookingLimit[i]
                    })
                  }
                  if (i == 9) { //提示且不可预订
                    that.bools = false;
                    that.respeatBook.push({
                      name: i,
                      list: that.repeatBookingLimit[i]
                    })
                  }
                }
                if (that.respeatBook.length > 0) {
                  that.loading = false;
                  that.staleve = true;
                } else {
                  if (that.MentionChange == 1) {
                    that.okadd(); //跳转提交
                  } else {
                    that.updata(); //跳转改签
                  }
                }
              }
            } else {
              if (this.MentionChange == 1) {
                this.okadd(); //跳转提交
              } else {
                this.updata(); //跳转改签
              }
            }

            if (JSON.stringify(ret.data.limitNativeRule) != "{}") {
              that.loading = false;
              return
            }
          } else {
            that.loading = false;
            that.elast(res.message)
          }
          if (that.isone == false) {
            try {
              const ret = await that.$api.order.ruleCheckRepeatBook(usest); //重复预定规则校验
              if (ret.code == 200) {
                if (JSON.stringify(ret.data.limitNativeRule) != "{}") {
                  that.loading = false;
                  that.elast("不能重复预订！");
                  return
                }
              } else {
                that.loading = false;
                that.elast(res.message)
              }
            } catch (e) {
              console.log(e)
              that.loading = false;
            }
          }
        } catch (e) {
          console.log(e)
          that.loading = false;
        }
      } else {
        if (that.MentionChange == 1) {
          that.okadd(); //跳转提交
        } else {
          that.updata(); //跳转改签
        }
      }
    },
    timaout(times, out) {
      if (out.substring(out.length - 2) != '+1') {
        return times + ' ' + out + ':00'
      } else {
        let timet = out.substring(0, 5);
        let dats = new Date(new Date(times).getTime() + 24 * 60 * 60 * 1000);
        let year = dats.getFullYear(); //当前年
        let month = dats.getMonth() + 1 < 10 ? '0' + (dats.getMonth() + 1) : dats.getMonth() + 1;
        let day = dats.getDate() < 10 ? '0' + dats.getDate() : dats.getDate();
        return year + '-' + month + '-' + day + ' ' + timet + ':00'
      }
    },
    async updata() { //申请改签
      let that = this;
      let userlists = that.userlists;
      let citysy = that.dats.data.userlist.name; //当前航班信息 往
      let citysys = {}; //返
      let limitNativeRules = [];
      if (!this.isone) { //往返
        citysys = that.nums.data.userlist.name;
        limitNativeRules = that.nums.limitNativeRule;
      }
      let NameCenter = that.NameCenter; //成本中心
      let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
      let TravelDepartlist = that.TravelDepartlist; //部门审批人
      let apprvTaskStaffts = []; //审核人员
      let user_name = that.user_name; //联系人
      let user_ipone = that.user_ipone; //联系电话
      let user_remark = that.user_remark; //改签原因
      let isbtd = that.isbtd; //1因公2因私
      let isblcks = that.isblcks; //1事前 2事中
      let limitNativeRule = that.dats.limitNativeRule;

      if (NameCenter.id == '' && isbtd == 1 && this.isarsrl == false && (isblcks == 2 || isblcks == 4)) {
        that.$message({
          message: '请选择成本审批人！',
          type: 'warning'
        });
        return
      } else if (TravelCostCenlist.length == 0 && (isblcks == 2 || isblcks == 4) && isbtd == 1 && this.isarsrl == false &&
          this.CostCi == true) {
        that.$message({
          message: '请选择成本审批人！',
          type: 'warning'
        });
        return
      } else if (TravelDepartlist.length == 0 && (isblcks == 2 || isblcks == 4) && isbtd == 1 && this.isarsrl == false &&
          this.CostCis == true) {
        that.$message({
          message: '请选择部门审批人！',
          type: 'warning'
        });
        return
      } else if (user_name == '') {
        that.$message({
          message: '请输入联系人！',
          type: 'warning'
        });
        return
      } else if (user_ipone == '') {
        that.$message({
          message: '请输入联系电话！',
          type: 'warning'
        });
        return
      } else if (!ip_test.test(user_ipone)) {
        that.$message({
          message: '请输入正确的电话号码!',
          type: 'warning'
        });
        return
      } else if (user_remark == '') {
        that.$message({
          message: '请输入改签原因！',
          type: 'warning'
        });
        return
      }
      let legList = [];
      legList.push({
        flightNo: citysy.no,
        cabin: that.dats.datw.cabin,
        depAirport: citysy.depart,
        arrAirport: citysy.arrive,
        depTime: citysy.departDate.substring(0, 10) + ' ' + citysy.departTime + ':00',
        arrTime: that.timaout(citysy.departDate.substring(0, 10), citysy.arriveTime),
        depTerminal: citysy.departs,
        arrTerminal: citysy.arrives,
      })
      if (!this.isone) { //往返
        legList.push({
          flightNo: citysys.no,
          cabin: that.nums.datw.cabin,
          depAirport: citysys.depart,
          arrAirport: citysys.arrive,
          depTime: citysys.departDate.substring(0, 10) + ' ' + citysys.departTime + ':00',
          arrTime: citysys.departDate.substring(0, 10) + ' ' + citysys.arriveTime + ':00',
          depTerminal: citysys.departs,
          arrTerminal: citysys.arrives,
        })
      }
      for (var i = 0; i < TravelCostCenlist.length; i++) { //成本中心审批人
        apprvTaskStaffts.push({
          deptCost: 2,
          nodeId: TravelCostCenlist[i].nodeId,
          personId: TravelCostCenlist[i].personId,
          staffId: TravelCostCenlist[i].staffId,
          staffName: TravelCostCenlist[i].staffName
        })
      }
      for (var i = 0; i < TravelDepartlist.length; i++) { //部门审批人
        apprvTaskStaffts.push({
          deptCost: 1,
          nodeId: TravelDepartlist[i].nodeId,
          personId: TravelDepartlist[i].personId,
          staffId: TravelDepartlist[i].staffId,
          staffName: TravelDepartlist[i].staffName
        })
      }
      let usasrlist = []; //改签用户列表信息
      for (let i = 0; i < userlists.length; i++) {
        usasrlist.push({
          name: userlists[i].name,
          newName: userlists[i].name,
          cardNo: userlists[i].certNo,
          newCardNo: userlists[i].certNo,
          newCardType: that.cardtype(userlists[i].certType),
          newPhone: userlists[i].phone,
        })
      }
      let ists = 0;
      let invs = "";
      if (limitNativeRule.length == 0 && this.dats.data.datw.none == "single") {
        ists = 0;
        invs = ""
      } else {
        invs = JSON.stringify({
          information: [limitNativeRule]
        });
        ists = 1;
      }
      if (this.dats.data.datw.none == "returns") {
        let limitNativeRules = that.nums.limitNativeRule;
        if (limitNativeRules.length == 0) {
          ists = 0;
          invs = ""
        } else {
          invs = JSON.stringify({
            information: [limitNativeRule, limitNativeRules]
          });
          ists = 1;
        }
      }
      let dat = {};
      dat = {
        saleNo: that.dats.data.datw.saleOrderNo, //原销售单号
        tradeNo: that.dats.data.datw.tradeNo, //原交易单号
        voluntarily: '1',
        apprvTaskEntity: {
          agree: false, //是否当前人审批
          taskType: isblcks, //1为事前2为事中，
          beforeMiddle: isblcks, //1为事前2为事中
          reason: '1111', //理由
          apprvTaskStaffs: apprvTaskStaffts, //审批人信息
          costId: NameCenter.id, //成本中心id
          costName: NameCenter.name, //成本中心名称
          remark: invs, //超规信息
        },
        legList: legList, //改签航班信息
        odllegList: that.dats.data.datw.odllegList, //旧航班信息
        oldPassger: usasrlist, //出行人
        contacts: user_name, //联系人
        contactPhone: user_ipone, //联系电话
        reason: user_remark, //改签原因
        cardFile: that.imageUrl, //改签文件证明
      }
      this.loading = true;
      try {
        const res = await that.$api.home.applySaleChange(dat); //改签
        this.loading = false;
        if (res.code == 200) {
          that.$message({
            message: '申请改签成功',
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push({
              path: '/myorder',
              query: {
              }
            });
          }, 1000)
        } else {
          that.$message({
            message: res.message,
            type: 'success'
          });
        }
      } catch (e) {
        console.log(e)
        this.loading = false;
      }

    },
    cardtype(it) {
      if (it == '身份证') {
        return 'NI'
      } else if (it == '护照') {
        return 'PP'
      } else if (it == '台胞证') {
        return 'TB'
      } else if (it == '港澳通行证') {
        return 'GA'
      } else if (it == '回乡证') {
        return 'HX'
      } else if (it == '其他证件') {
        return 'OS'
      }
    },
    level(ie) {
      if (ie == '经济舱') {
        ie = 'Y'
      } else if (ie == '商务舱') {
        ie = 'C'
      } else if (ie == '头等舱') {
        ie = 'F'
      }
      return ie;
    },
    async okadd() { //提交订单
      if (this.codes == 200) {
        let that = this;
        let userlists = this.userlists;
        let ranst = this.trainslis.trainlis;
        let NameCenter = that.NameCenter; //成本中心
        let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
        let TravelDepartlist = that.TravelDepartlist; //部门审批人
        let apprvTaskStaffts = []; //审核人员
        let user_name = this.lname; //联系人
        let usersalist = [];
        let user_ipone = this.user_ipone; //联系电话
        let isbtd = this.trainslis.data.datw.isbtd; //1因公2因私
        let isblcks = this.trainslis.data.datw.isblcks; //1事前 2事中
        let passengerList = [];
        let ists = 0;
        let prods = [];
        for (let i = 0; i < userlists.length; i++) { //出行人信息
          if (userlists[i].carval == '' && this.value == 1 && this.civilServiceTicket == 1) {
            that.$message({
              message: '请填写开户银行',
              type: 'warning'
            });
            return
          }
        }
        if (isbtd == 2 && this.passengers.length == 0) {
          that.$message({
            message: '请选择出行人',
            type: 'warning'
          });
          return
        }
        if (NameCenter.id == '' && (isblcks == 2 || isblcks == 4) && isbtd == 1 && that.trainslis.isarsrl == false) {
          that.$message({
            message: '请选择成本中心',
            type: 'warning'
          });
          return
        } else if (TravelCostCenlist.length == 0 && (isblcks == 2 || isblcks == 4 || isblcks == 1) && isbtd == 1 && that.trainslis
            .isarsrl == false && this.CostCi == true) {
          that.$message({
            message: '请选择成本审批人',
            type: 'warning'
          });
          return
        } else if (TravelDepartlist.length == 0 && (isblcks == 2 || isblcks == 4) && isbtd == 1 && that.trainslis.isarsrl ==
            false && this.CostCis == true) {
          that.$message({
            message: '请选择部门审批人',
            type: 'warning'
          });
          return
        } else if (that.reson == '' && isbtd == 1 && (isblcks == 2 || isblcks == 4)) {
          that.$message({
            message: '请输入出行事由',
            type: 'warning'
          });
          return
        } else if (user_name == '') {
          that.$message({
            message: '请输入联系人',
            type: 'warning'
          });
          return
        } else if (user_ipone == '' || !ip_test.test(user_ipone)) {
          that.$message({
            message: '请输入正确的联系电话',
            type: 'warning'
          });
          return
        } else if (that.units == '' && this.value == 2 && this.civilServiceTicket == 1) {
          that.$message({
            message: '请填写单位名称',
            type: 'warning'
          });
          return
        }
        if (this.getTravelPolicys != null) {
          if (this.getTravelPolicys.domesticInsuranceProduct == 0) {
            if ((this.profitPrice == '请选择' || this.profitPrice == undefined) && isblcks != 4) { //&& this.chineas.index == 0 )
              that.$message({
                message: '请选择一个保险',
                type: 'warning'
              });
              return
            }
          }
        }
        if (that.allIsGift) {
          that.profitPrices = 0;
          that.profitPrice = 0;
        }
        if (that.insuranceNo != '') {
          prods.push(that.insuranceNo + ',' + that.profitPrices)
        }
        if (that.insuranceNos != '') {
          prods.push(that.insuranceNos + ',' + that.profitPrice)
        }
        for (let i = 0; i < userlists.length; i++) { //出行人信息
          let Select_phone = '';
          if (userlists[i].phone != '') {
            Select_phone = userlists[i].phone;
          } else {
            Select_phone = userlists[i].telePhone;
          }
          let birthdate = "";
          if (userlists[i].birthdate != null) {
            birthdate = userlists[i].birthdate.substring(0, 10);
          } else {
            birthdate = null
          }
          if (this.civilServiceTicket == 1) {
            usersalist.push({
              passengerType: "ADT",
              certNo: that.scardnno[i],
              certType: that.scardns[i],
              gender: userlists[i].gender,
              name: userlists[i].name,
              birthdate: birthdate,
              passengerPhone: Select_phone,
              historyPassenger: "1",
              productKeys: prods,

            })
          } else {
            usersalist.push({
              passengerType: "ADT",
              certNo: that.scardnno[i],
              certType: that.scardns[i],
              gender: userlists[i].gender,
              name: userlists[i].name,
              birthdate: birthdate,
              passengerPhone: Select_phone,
              historyPassenger: "1",
              productKeys: prods
            });
          }
          passengerList.push({
            "certificate": [{
              "cardNo": that.scardnno[i],
              "cardType": that.scardns[i]
            }],
            "deptId": userlists[i].deptId,
            "deptName": userlists[i].deptName,
            "costcenterName": this.dats.data.datw.butalist.length > 0 ? this.dats.data.datw.butalist[i].costcenterName : this
                .passengers[i].costcenterName,
            "userId": userlists[i].userId,
            "name": userlists[i].name,
            "phone": Select_phone,
            "employeeType": userlists[i].employeeType,
            "id": userlists[i].passengerNo

          })
        }
        let dat = {};
        let shared = '';
        if (that.dats.data.userlist.name.shared == true) {
          shared = "0"
        } else {
          shared = "1"
        }
        for (var i = 0; i < TravelCostCenlist.length; i++) { //成本中心审批人
          apprvTaskStaffts.push({
            deptCost: 2,
            nodeId: TravelCostCenlist[i].nodeId,
            personId: TravelCostCenlist[i].personId,
            staffId: TravelCostCenlist[i].staffId,
            staffName: TravelCostCenlist[i].staffName
          })
        }
        for (var i = 0; i < TravelDepartlist.length; i++) { //部门审批人
          apprvTaskStaffts.push({
            deptCost: 1,
            nodeId: TravelDepartlist[i].nodeId,
            personId: TravelDepartlist[i].personId,
            staffId: TravelDepartlist[i].staffId,
            staffName: TravelDepartlist[i].staffName
          })
        }
        let invs = "";
        if (this.trainslis.limitNativeRule.length == 0) {
          ists = 0;
          invs = ""
        } else {
          invs = JSON.stringify({
            information: [this.trainslis.limitNativeRule]
          });
          ists = 1
        }

        if (this.dats.data.datw.none == "returns") {
          let limitNativeRules = that.nums.limitNativeRule;
          if (limitNativeRules.length == 0) {
            ists = 0;
            invs = ""
          } else {
            invs = JSON.stringify({
              information: [limitNativeRule, limitNativeRules]
            });
            ists = 1;
          }
        }
        dat = {
          tips: this.tips,
          one_isviolation: ists, //第一段,是否超规
          one_violation: invs, //超规信息
          airlineType: 1, //航程类型
          needChdCabin: false, //是否需要获取儿童舱位价格，true是，false否。
          one_no: that.dats.data.userlist.name.no, //第一段，航班号
          one_cabin: that.dats.datw.cabin, //第一段，舱位
          one_serviceLevel: that.dats.datw.level, //第一段舱位服务等级
          one_depart: that.dats.data.userlist.name.depart, //第一段，出发城市
          one_departTerminal: that.dats.data.userlist.name.departTerminal == null ? "" : that.dats.data.userlist.name
              .departTerminal, //第一段，出发机场航站楼
          one_arrival: that.dats.data.userlist.name.arrive, //第一段，到达城市
          one_arrivalTerminal: that.dats.data.userlist.name.arriveTerminal == null ? "" : that.dats.data.userlist.name
              .arriveTerminal, //第一段，到达机场航站楼
          one_plane: that.dats.data.userlist.name.plane, //第一段，机型
          one_meals: that.dats.data.userlist.name.meals, //第一段，餐食
          one_departDate: (that.dats.data.userlist.name.departDate).substring(0, 10) + ' ' + (that.dats.data.userlist
              .name
              .departTime), //第一段，出发日期that.dats.data.userlist.name.departDate
          one_departTime: that.dats.data.userlist.name.departTime, //第一段，出发时间
          one_arrivalTime: that.dats.data.userlist.name.arriveTime, //第一段，到达时间
          one_taxFee: that.dats.data.userlist.name.taxFee, //第一段，机建
          one_fuelFee: that.dats.data.userlist.name.fuelFee, //第一段，燃油
          one_discount: that.dats.datw.discount, //第一段公布折扣
          one_sharedBZ: shared, //是否共享航班
          one_mileage: that.dats.data.userlist.name.mileage,
          one_fdprice: that.facePrice,
          one_office: that.dats.data.userlist.name.officeNo, //第一段office号
          yPrice: that.dats.data.userlist.name.yprice, //第一段，Y舱价格
          cPrice: that.dats.data.userlist.name.cprice, //第一段，C舱价格
          fPrice: that.dats.data.userlist.name.fprice, //第一段，F舱价格
          ticketPrice: that.facePrice, //票面价
          one_policyPrice: that.prices, //第1段，小数点价
          one_policyId: that.dats.datw.salePrices[0].policyId,
          one_lastRebateId: that.dats.datw.salePrices[0].lastRebateId,
          one_lastRebateProfitId: that.dats.datw.salePrices[0].lastRebateProfitId,
          one_profitConfigId: that.dats.datw.salePrices[0].profitConfigId, //第一段，控润配置ID
          one_nMinSalePrice: that.dats.data.userlist.text.nMinSalePrice,
          one_nMinSalePriceFlight: that.dats.data.userlist.text.nMinSalePriceFlight,
          one_nMinSalePriceCabin: that.dats.data.userlist.text.nMinSalePriceCabin,
          one_nMinSalePriceTime: that.dats.data.userlist.text.nMinSalePriceTime,
          passengerList: usersalist, //个人信息
          tripPassengerList: passengerList,
          travelBusinessType: isbtd, //因公因私
          contactsName: user_name, //联系人
          contactsPhone: user_ipone, //联系电话
        }

        if (this.civilServiceTicket == 1) {
          dat['verifyWay'] = this.value; //验证方式  0：公务员卡 1：预算单位
          dat['unitName'] = this.units; //预算单位名称
        }
        if (this.dats.datw.priceSource == 1) {//1是官方 2是美赢 官方需要追加参数
          dat['one_isWebsite'] = 4;//4代表官方票
          dat['one_isOutCode'] = 9;  //9-官网
          dat['one_context'] = this.context; //代表官方票
        }

        if (this.civilServiceTicket != 1 && this.dats.datw.priceSource != 1) {
          let isOutCode = that.dats.datw.priceSource == 2 ? 10 : 0;// 10-美赢  0-自己家
          dat['one_isOutCode'] = isOutCode;
        }

        if (!this.isone) {

          let returnDat = {
            two_serviceLevel: that.nums.datw.level, //第二段舱位服务等级
            two_mileage: that.nums.data.userlist.name.mileage,
            two_fdprice: that.returnTicketPrice,
            two_no: that.nums.data.userlist.name.no, //第二段，航班号
            two_cabin: that.nums.datw.cabin, //第二段，舱位
            two_depart: that.nums.data.userlist.name.depart, //第二段，出发城市
            two_departTerminal: that.nums.data.userlist.name.departTerminal == null ? "" : that.nums.data.userlist.name
                .departTerminal, //第二段，出发机场航站楼
            two_arrival: that.nums.data.userlist.name.arrive, //第二段，到达城市
            two_arrivalTerminal: that.nums.data.userlist.name.arriveTerminal == null ? "" : that.nums.data.userlist.name
                .arriveTerminal, //第二段，到达机场航站楼
            two_plane: that.nums.data.userlist.name.plane, //第二段，机型
            two_meals: that.nums.data.userlist.name.meals, //第二段，餐食
            two_departDate: (that.nums.data.userlist.name.departDate).substring(0, 10) + ' ' + (that.nums.data.userlist
                .name.departTime), //第二段，出发日期
            two_departTime: that.nums.data.userlist.name.departTime, //第二段，出发时间 that.nums.data.userlist.name.departTime
            two_arrivalTime: that.nums.data.userlist.name.arriveTime, //第二段，到达时间
            two_taxFee: that.nums.data.userlist.name.taxFee, //第二段，机建
            two_fuelFee: that.nums.data.userlist.name.fuelFee, //第二段，燃油
            two_discount: that.nums.datw.discount, //第二段公布折扣
            two_sharedBZ: shared, //是否共享航班
            two_office: that.nums.data.userlist.name.officeNo, //第二段office号
            yPrice2: that.nums.data.userlist.name.yprice, //第二段，Y舱价格
            cPrice2: that.nums.data.userlist.name.cprice, //第二段，C舱价格
            fPrice2: that.nums.data.userlist.name.fprice, //第二段，F舱价格
            ticketPrice2: that.returnTicketPrice, //第二段，票面价
            two_policyPrice: that.priceas, //第2段，小数点价
            two_policyId: that.nums.datw.salePrices[0].policyId,
            two_lastRebateId: that.nums.datw.salePrices[0].lastRebateId,
            two_lastRebateProfitId: that.nums.datw.salePrices[0].lastRebateProfitId,
            two_profitConfigId: that.nums.datw.salePrices[0].profitConfigId, //第二段，控润配置ID
            two_nMinSalePrice: that.nums.data.userlist.text.nMinSalePrice,
            two_nMinSalePriceFlight: that.nums.data.userlist.text.nMinSalePriceFlight,
            two_nMinSalePriceCabin: that.nums.data.userlist.text.nMinSalePriceCabin,
            two_nMinSalePriceTime: that.nums.data.userlist.text.nMinSalePriceTime,
          }
          dat = {...dat, ...returnDat} //将返程得值添加到dat里
          dat.airlineType = 2;//2为往返
        }

        if ((isblcks == 2 && isbtd == 1 && this.trainslis.isarsrl == false) || (isblcks == 1 && isbtd == 1 && this.isarsrl ==
            false && this.isblckt == true)) { // 因公事中
          dat['apprvTask'] = {
            agree: false, //是否当前人审批
            taskType: isblcks, //1为事前2为事中，
            beforeMiddle: isblcks, //1为事前2为事中
            totalMoney: this.num,
            reason: this.reson, //理由
            travelNo: this.dats.data.datw.mokksli.travelNo,
            apprvTaskStaffs: apprvTaskStaffts, //审批人信息
            costId: NameCenter.id, //成本中心id
            costName: NameCenter.name, //成本中心名称
            remark: invs, //超规信息
            vehicleId: this.vehicleId, //事前id
          }
        } else if (isblcks == 1 && isbtd == 1 && this.isarsrl == false) {//事前因公 不免审
          dat['apprvTask'] = {
            taskType: isblcks, //1为事前2为事中，
            totalMoney: this.num,
            beforeMiddle: isblcks, //1为事前2为事中
            reason: this.reson, //理由
            costId: NameCenter.id, //成本中心id
            costName: NameCenter.name, //成本中心名称
            travelNo: this.dats.data.datw.mokksli.travelNo,
            vehicleId: this.butalist[0].vehicleId, //事前id
            vehicleIdBack: this.butalist[0].vehicleIdBack //事前id
          }
        } else if (isbtd == 2 || (isbtd == 1 && this.isarsrl == true)) {
          dat['apprvTask'] = {
            taskType: isblcks, //1为事前2为事中，
            beforeMiddle: isblcks, //1为事前2为事中
            travelNo: this.dats.data.datw.mokksli.travelNo,
            vehicleId: isbtd == 1 ? this.butalist[0].vehicleId : '', //事前id
            vehicleIdBack: isbtd == 1 ?  this.butalist[0].vehicleIdBack : '' //事前id
          }

        }
        this.loading = true;
        try {
          const res = await that.$api.home.bookTicket(dat); //预定订单
          if (res.code == 200) {
            this.kun = true;
            that.$message({
              message: '创建订单成功',
              type: 'success'
            });
            this.loading = false;
            if (isbtd == 2) {
              this.$router.push({
                path: '/Orderdefray',
                query: {
                  data: res.data.message[0].tradeNo
                }
              });
            } else {
              this.$router.push({
                path: '/myorder',
                query: {
                }
              });
            }

          } else {
            that.$message({
              message: res.message,
              type: 'warning'
            });
          }
          this.loading = false;
        } catch (e) {
          console.log(e);
        }
      } else if (this.code == 'unknown') {
        this.$message.error('验舱验价失败，请重新预订');
      } else {
        this.$message.warning('验舱验价中，请等待！如若长时间未响应请联系客服！');
      }
    },
    retime(item) { //时间
      if (item == undefined) {
        return
      } else {
        return item.substring(0, 2) + '月' + item.substring(3, 5) + '日';
      }
    },
    drawers(its) { //点击成本或者部门审批人
      if (its == 'TravelCostCenlist') { //判断是部门还是成本中心
        this.iscost = true;
        this.drawelist = this.CostCenterlist;
      } else {
        this.iscost = false;
        this.drawelist = this.Deparapprover;
      }
      this.apprvCost = [];
      if (this.iscost == true) {
        for (let i = 0; i < this.CostCenterlist.length; i++) {
          this.apprvCost.push({
            id: ''
          })
        }
      } else {
        for (let i = 0; i < this.Deparapprover.length; i++) {
          this.apprvCost.push({
            id: ''
          })
        }
      }

      this.drawer = true;
    },
    btn_click() { //确定部门或者成本审批人
      let that = this;
      for (let k in this.apprvCost) {
        if (that.apprvCost[k].id == "") {
          that.$message({
            message: "请选择" + (parseInt(k) + 1) + "级审批人",
            type: 'warning'
          });
          return
        }
      }
      if (this.iscost == true) { //成本审批人信息
        that.TravelCostCenlist = [];
        for (let k in that.drawelist) {
          for (let i in that.drawelist[k].apprvCostFlowNodePersons) {
            for (let j in that.apprvCost) {
              if (that.apprvCost[j].id == that.drawelist[k].apprvCostFlowNodePersons[i].id) {
                that.TravelCostCenlist.push({
                  deptCost: 2,
                  personId: that.apprvCost[j].id,
                  nodeId: that.drawelist[k].apprvCostFlowNodePersons[i].nodeId,
                  staffId: that.drawelist[k].apprvCostFlowNodePersons[i].staffId,
                  staffName: that.drawelist[k].apprvCostFlowNodePersons[i].staffName
                })
              }
            }
          }
        }
      } else { //部门审批人信息
        this.TravelDepartlist = [];
        for (let k in that.drawelist) {
          for (let i in that.drawelist[k].apprvDeptFlowNodePersons) {
            for (let j in that.apprvCost) {
              if (that.apprvCost[j].id == that.drawelist[k].apprvDeptFlowNodePersons[i].id) {
                that.TravelDepartlist.push({
                  deptCost: 1,
                  personId: that.apprvCost[j].id,
                  nodeId: that.drawelist[k].apprvDeptFlowNodePersons[i].nodeId,
                  staffId: that.drawelist[k].apprvDeptFlowNodePersons[i].staffId,
                  staffName: that.drawelist[k].apprvDeptFlowNodePersons[i].staffName
                })
              }
            }
          }
        }
      }
      that.drawer = false;
    },
    async getBrokerage() { //火车票单人手续费
      try {
        if (this.isone == true) {
          this.onprice = this.trainslis.datw.salePrices[0].parPrice * this.userlists.length + (this.trainslis.data.userlist
                  .name.taxFee +
              this.trainslis.data.userlist.name.fuelFee) * this.userlists.length;
        } else {
          this.onprice = (this.trainslis.datw.salePrices[0].parPrice * this.userlists.length + (this.trainslis.data.userlist
                  .name.taxFee +
              this.trainslis.data.userlist.name.fuelFee) * this.userlists.length) +
              (this.nums.datw.salePrices[0].parPrice * this.userlists.length + (this.nums.data.userlist.name.taxFee + this.nums
                  .data.userlist.name.fuelFee) * this.userlists.length);
        }
      } catch (e) {
        console.log(e);
      }
    },
    handleChange(value) { //选择成本中心
      let nodesObj = this.$refs['cascader'].getCheckedNodes(); //获取当前节点的信息
      this.NameCenter.name = nodesObj[0].data.text;
      this.NameCenter.id = nodesObj[0].data.id;
      this.TravelCostCenlist = [];
      this.TravelDepartlist = [];
      this.appswlist(); //重新获取部门和成本中心审批人
    },
    async appswlist() { //选获取部门和成本审批人信息
      let that = this;
      let nuarry = [];
      let nus = that.butalist; //出差人的集合
      for (var i = 0; i < nus.length; i++) {
        nuarry.push(nus[i].passengerNo) //获取出行人员id
      }
      that.loading = true;
      let res;
      try {
        res = await that.$api.home.getStaffList({
          costId: that.NameCenter.id,
          passengerNos: nuarry,
          applyType: 1
        });
        that.loading = false;
        if (res.code == 200) {
          if (res.data.deptStaffs.length == 0) { //是否有部门审批人
            that.CostCis = false;
          } else {
            that.CostCis = true;
            that.Deparapprover = res.data.deptStaffs; //部门审批人
          }
          if (res.data.costStaffs.length == 0) {
            that.CostCi = false;
          } else {
            that.CostCi = true;
            that.CostCenterlist = res.data.costStaffs; //成本审批人
          }
        }
      } catch (e) {
        console.log(e)
        that.loading = false;
      }
    },
    selts() { //查询成本中心
      let _this = this;
      _this.loading = true;
      _this.$api.home.getCostCenterList().then((res) => {
        _this.loading = false;
        if (res.code == 200) {
          _this.treeLists = res.data[0].children;
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
    async userliste() {
      let that = this;
      let st = [];
      this.userlists = [];
      if (this.isblcks == 4) { //改签状态下不能修改乘客证件
        for (let i = 0; i < this.butalist.length; i++) {
          this.userlists.push({
            phone: this.butalist[i].phone,
            name: this.butalist[i].name,
            certType: this.butalist[i].certType,
            certNo: this.butalist[i].certNo,
          })
        }
      } else {
        if (this.isbtd == 1) {
          if (this.butalist[0].vehicleId != undefined && this.butalist.length != 0) {
            this.vehicleId = this.butalist[0].vehicleId; //事前id
          }
          if (this.butalist[0].vehicleIdBack != undefined && this.butalist.length != 0) {
            this.vehicleIdBack = this.butalist[0].vehicleIdBack; //事前id
          }
          for (let i = 0; i < that.butalist.length; i++) {
            st.push(that.butalist[i].passengerNo);
          }
        } else {
          for (let i = 0; i < that.passengers.length; i++) {
            st.push(that.passengers[i].passengerNo);
          }
        }
        that.loading = true;
        const res = await that.$api.home.getPassengerListByNos(st)
        that.loading = false;

        if (res.code == 200) {
          that.selts();
          that.carld = res.data.cardTypeList; //证件类型
          let userli = res.data.passList; //用户信息
          for (let i = 0; i < userli.length; i++) {
            userli[i]['carval'] = "";
            if (posPattern.test(userli[i].certificateList[0].firstName) && posPattern.test(userli[i].certificateList[0].lastName)) {
              if (userli[i].certificateList[0].firstName != null && userli[i].certificateList[0].lastName != null) {
                userli[i].name = userli[i].certificateList[0].firstName + '/' + userli[i].certificateList[0].lastName;
              }
            } else {
              userli[i].name = userli[i].certificateList[0].firstName + userli[i].certificateList[0].lastName;
            }
            that.scardns[i] = userli[i].certificateList[0].cardType;
            that.scardnno[i] = userli[i].certificateList[0].cardNo;
          }
          for (let i = 0; i < userli.length; i++) {
            for (let k = 0; k < userli[i].certificateList.length; k++) {
              userli[i].certificateList[k]['cardTypename'] = that.caname(userli[i].certificateList[k].cardType);
            }
          }
          that.userlists = userli;
        }
      }
    },
    caname(item) {
      //回显证件名字
      for (let i = 0; i < this.carld.length; i++) {
        if (this.carld[i].code == item) {
          return this.carld[i].name;
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
body, html {
  font-family: MicrosoftYaHei;
}

.trainadd {
  width: 100%;

  .price {
    color: #FF6600;
  }

  .ditrslist {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .ditrslists {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .addpalist {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    background: #007AFF;
  }

  .tresiadd {
    width: 1180px;
    margin: 10px auto;
    display: flex;

    .trsleft {
      width: 70%;

      .trstp {
        width: calc(100% - 20px);
        padding: 10px;
        background: #ffffff;

        .tr_ul {
          width: 100%;
          display: flex;
          z-index: 999;
          margin: 3px 0 10px;


          .tr_uleft {
            color: #78879d;
            width: 100px;
            text-align: center;
            line-height: 50px;
            font-size: 14px;

          }

          .tr-select {
            width: 300px;
          }

          .jiage {
            line-height: 40px;
            color: #FF6600;
            text-indent: 10px;
          }

          .tr_right {
            display: flex;
            flex-wrap: wrap;

            .tr_rs {
              cursor: pointer;
              padding: 2px 10px;
              line-height: 20px;
              font-size: 14px;
              border: 1px solid #d9e2eb;
              border-radius: 10px;

              .tr_rtp {
                text-align: center;
              }

              .tr_rbn {
                color: #abb7c2;
              }
            }
          }

          .tr_rights {
            width: calc(100% - 100px);
            display: flex;
            position: relative;
            z-index: 999;

            .inps {
              width: 300px;
            }

            .tr_dvs {
              cursor: pointer;
              width: 170px;
              height: 38px;
              padding: 0 15px;
              border-radius: 4px;
              border: 1px solid #DCDFE6;
              color: #606266;
              line-height: 38px;
              display: flex;
              font-size: 14px;

              span {
                margin: 0 3px;
              }
            }

            input {
              margin-left: 30px;
              text-indent: 30px;
              font-size: 28px;
              border: 1px solid #C0C0C0;
              border-radius: 10px;
            }

            .absts {
              margin-left: 4px;
              position: absolute;
              top: 40px;
              left: ;
              width: 200px;
              background-color: #FFFFFF;
              z-index: 9999 !important;
            }

            .avatar-uploader .el-upload {
              border: 1px dashed #d9d9d9;
              border-radius: 6px;
              cursor: pointer;
              position: relative;
              overflow: hidden;
              width: 0px;
              height: 0px;
            }

            .avatar-uploader .el-upload:hover {
              border-color: #409EFF;
            }

            .avatar-uploader /deep/ .el-upload--text {
              width: 100%;
              height: 100%;
            }

            .avatar-uploader-icon {
              font-size: 28px;
              color: #8c939d;
              width: 70px;
              height: 70px;
              line-height: 70px;
              text-align: center;
            }

            .avatar {
              width: 70px;
              height: 70px;
              display: block;
            }
          }
        }
      }

      .trsbt {
        margin-top: 10px;
        padding: 10px;
        background: #F9FBFD;

        .trsbord {
          width: 100%;
          height: 229px;


          .trsbord-p {
            padding: 32px 0 43px 36px;
            height: 17px;
            font-size: 16px;
            color: #333333;
            line-height: 38px;
          }

          .tsfons {
            margin-top: 10px;
            font-size: 15px;
            color: #78879D;
            line-height: 30px;
          }


          .trainsc_s {
            width: 60%;
            padding: 0 5%;
            display: flex;
            align-items: center;

            .trainsc_s_l {
              width: 100px;
              margin-top: 5px;
              padding: 0 10px;

              .trainsc_s_l_t {
                max-width: 100px;
                min-width: 100px;
                text-align: center;
                color: #3b4f62;
                line-height: 25px;
                font-size: 22px;
              }

              .trainsc_s_l_b {
                max-width: 100px;
                display: flex;
                justify-content: center;
                font-size: 14px;
                margin-top: 7px;

                .trainsc_s_l_b_r {
                  color: #3b4f62;
                }
              }
            }

            .trainsc_s_bot {
              width: 100px;
            }

            .trainsc_s_s {
              width: 100px;
              color: #999999;
              font-size: 14px;
              display: flex;
              justify-content: center;
              background-size: 82px 6px;
              padding: 2px 0;
              background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAAAGCAYAAABQM8l6AAAAAXNSR0IArs4c6QAAAJ9JREFUOBFjYBgFRIXApfsv067dey+PSzETLolRcdQQYGJg/PmX4cfZy/deuqHKQHijAYktVLCI/Wf+f+T/fwZhBob/2y/fe1H9//9/RmRljFfuvgxGFhhl4w6Bf4z/FjH8Z+ACqWBkZNzM9Z8tVllZ6COYf+nu8/+4tY7K4AsBRgbGO8AQDdZVEr/EePnu8x/4FI/K4Q8BYAb/BlSRDgAVIS7yFUG6BwAAAABJRU5ErkJggg==') bottom no-repeat;
            }
          }

          .tsbods {
            width: calc(100% - 36px);
            padding: 20px 36px 20px 10px;
            border-radius: 20px;

            .tsbodas {
              display: flex;
              width: 100%;

              .tsbodsle {
                min-width: 200px;
                display: flex;
                text-align: center;
                margin-top: 10px;
                justify-content: center;
              }
            }

            .fuel {
              display: flex;
              padding: 10px 10px;
              justify-content: space-between;

              .fuel_left {
                font-size: 15px;
                display: flex;

                p {
                  color: red;
                  padding-top: 2px;
                }
              }


            }

            .fuel_right {
              padding-right: 180px;
              min-width: 64px;
              color: #0DB36F;
              cursor: pointer;
              font-size: 14px;
              text-align: center;
              line-height: 34px;
            }
          }
        }
      }

      .Cover {
        position: fixed;
        width: 440px;
        min-height: 335px;
        margin: auto;
        left: 0;
        right: 0;
        top: 150px;
        padding: 0 54px 20px;
        background-color: #FFFFFF;
        border-radius: 5px;
        box-shadow: 0px 0px 10px #888888;
        z-index: 9942;
        padding-bottom: 20px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }

      .covers {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #CCCCCC;
        opacity: 0.6;
        z-index: 9922;
      }

      .staleve {
        position: fixed;
        left: 0;
        top: 0;
        width: calc(100% - 68%);
        height: 100%;
        padding: 0 34%;
        background: rgba(0, 0, 0, .3);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;

        .stalist {
          width: 100%;
          border-radius: 20px;
          font-size: 35px;
          line-height: 90px;
          background: #F1F1F1;

          .quan {
            max-height: 400px;
            overflow: scroll;

            .statop {
              padding: 20px;

              .reds {
                width: 100%;
                height: 70px;
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
                font-size: 30px;
                margin: 10px 0;

                .setbod {
                  border: 2px solid #FFFFFF;
                  border-radius: 15px;

                  .styul {
                    width: 100%;
                    margin: 10px 0;

                    .styli_top {
                      width: 100%;
                      color: red;
                      text-align: center;
                      font-size: 30px;
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

                        .wors {
                          width: 80%;
                          font-size: 30px;
                          height: 50px;

                          picker {
                            border: #007AFF solid 1px;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          .btnsti {
            width: 100%;
            height: 90px;
            line-height: 90px;
            text-align: center;
            display: flex;

            .roblck {
              flex: 1;
              height: 90px;
              background: #FFFFFF;
              border-bottom-left-radius: 15px;
            }

            .btnok {
              flex: 1;
              height: 90px;
              border-bottom-right-radius: 15px;
              color: #FFFFFF;
              background: linear-gradient(to right, #4E92FD 0%, #6E46FE 100%);
            }
          }
        }
      }
    }

    .trsright {
      width: calc(30% - 10px);
      margin-left: 10px;
      background: #ffffff;

      .trsrs {

        .trsrs-title {
          display: flex;
          padding: 34px 0 10px;
        }

        .trsrse {
          display: flex;
          color: #333333;
          line-height: 30px;
          margin-left: 18px;
        }

        .icon {
          color: #3C85FD;
          font-size: 22px;
        }
      }

      .tslist {
        margin: 0px 18px;
        height: 50px;
        font-size: 15px;
        color: #3B4F62;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #EDF0F5;
      }

      .tslists {
        width: calc(100% - 80px);
        margin: 10px 40px;
        height: 50px;
        font-size: 22px;
        color: #3B4F62;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .tsbtn {
        width: calc(100% - 80px);
        cursor: pointer;
        margin: 10px 40px;
        height: 50px;
        border-radius: 5px;
        text-align: center;
        line-height: 50px;
        color: #FFFFFF;
        background: #409EFF;
      }
    }
  }
}
</style>
