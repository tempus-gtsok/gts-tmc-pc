<template>
  <!-- 产品预定->机票提交订单页面 -->
  <div class="trainadd" v-if="trainslis">
    <el-drawer :visible.sync="drawer" :with-header="false">
      <div class="ditrslist">
        <div class="ditrslists" v-for="(item, index) in drawelist" :key="index">
          <div style="margin-right: 10px; font-size: 15px">
            {{ index + 1 }}级审批人:
          </div>
          <div>
            <el-select
              v-model="apprvCost[index].id"
              v-if="item.apprvCostFlowNodePersons"
              placeholder="请选择"
            >
              <el-option
                v-for="items in item.apprvCostFlowNodePersons"
                :key="items.id"
                :label="items.staffName"
                :value="items.id"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="apprvCost[index].id"
              v-else
              placeholder="请选择"
            >
              <el-option
                v-for="items in item.apprvDeptFlowNodePersons"
                :key="items.id"
                :label="items.staffName"
                :value="items.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="addpalist" @click="btn_click">选好了</div>
    </el-drawer>
    <div class="tresiadd" v-loading="loadingPic">
      <div class="trsleft">
        <div class="trstp">
          <div class="tr_ul">
            <div class="tr_uleft">旅客</div>
            <addPassenger @passage="passage" v-if="isbtd == 2"></addPassenger>
            <!-- <div class="tr_right" v-if="userlists.length > 0 && isbtd == 1">
              <div
                class="tr_rs"
                v-for="(item, index) in userlists"
                :key="index"
              >
                <div class="tr_rtp">{{ item.name }}</div>
                <div class="tr_rbn" v-if="isblcks == 4">
                  {{ item.certType }}&nbsp;{{ item.cardNo | numberPapers }}
                </div>
                <div class="tr_rbn" v-else>
                  {{ item.certificateList[0].cardTypename }}&nbsp;{{
                    item.certificateList[0].cardNo | numberPapers
                  }}
                </div>

                <div class="tr_ul" v-if="value == 1 && civilServiceTicket == 1">
                  <div class="tr_rights">
                    <el-input
                      v-model="item.carval"
                      placeholder="开户银行"
                      @input="onInput(item.carval, index)"
                      @blur.prevent="changeCount()"
                    ></el-input>
                    <div class="absts" v-if="abstid == index">
                      <div
                        v-for="(item_bk, index_bk) in banklists"
                        :key="index_bk"
                        @click="bankss(item.carval, item_bk)"
                      >
                        {{ item_bk }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
            <div class="userbox" v-if="userlists.length > 0 && isbtd == 1">
              <div
                class="tr_rights_user"
                v-for="(itemL, index) in userlists"
                :key="index"
                :class="{tr_rights_chang:isblcks == 4}"
              >
                <div class="tr_rights_uCardNo" v-if="isblcks != 4">
                 <p>{{ itemL.name }}</p><span class="s-color">|</span
                  >  <el-select placeholder="请选择" v-model="itemL.valFlag" @change="certifChang">
                  <el-option
                    v-for="item in itemL.certificateList"
                    :key="item.id"
                    :label="item.car"
                    :value="item.id">
                  </el-option>
                </el-select>
                </div>
                <div class="tr_rights_uCardNo " v-else>
                 <p>{{ itemL.name }}</p><span class="s-color">|</span>
                   {{ itemL.certType }}&nbsp;{{ itemL.certNo | numberPapers }} 
                </div>
              </div>
            </div>
          </div>
          <div class="tr_ul" v-if="civilServiceTicket == 1">
            <div class="tr_uleft">验算类型</div>
            <div>
              <el-select
                v-model="value"
                placeholder="请选择"
                style="width: 200px; z-index: 888"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
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
          <!-- <div class="titleClass" v-if="isblcks == 4">
            温馨提示：改签时需重新购买保险，原票购买的保险需在我的订单详情中手动去退保，退保成功后保费会原路退回
          </div> -->

          <div class="tr_ul insBox" v-if="isblcks != 4">
             <div>
            <div class="tr_uleft">航意险</div>
            <div>
              <el-select
                v-model="profitPriceYi"
                @change="chineseChange($event , 1 , kingList)"
                placeholder="请选择"
                class="tr-select"
              >
                <el-option
                  v-for="p in kingList"
                  :key="p.id"
                  :label="p.name"
                  :value="p.id"
                >
                </el-option>
              </el-select>
              <div
                class="jiage"
                v-if="profitPriceYi == '请选择' || profitPriceYi == null"
              >
                票面价：0元
              </div>
              <div class="jiage" v-else>票面价：{{ profitPriceYis }}元</div>
            </div>
             </div>
            <div class="tr_rights_bor_data"  v-if="insurancesData1 && insurancesData1.amount">
              <div
                class="_bor_data_brief"
              >
                <span>旅程安心</span
                ><span>|</span
                ><span class="amount">保额{{
                  insurancesData1.amount | numPrice
                }}</span>
              </div>
              <div class="_bor_data_clause" @click="dialogClick(insurancesData1)" v-if="insurancesData1 && insurancesData1.brief">
                请阅读<span>《投保须知》</span>
              </div>
            </div>
          </div>
          <div class="tr_ul insBox" v-if="isblcks != 4">
            <div>
            <div class="tr_uleft">航延险</div>
            <div>
              <el-select
                v-model="profitPriceYan"
                @change="chineseChange($event , 2 , kinsList)"
                placeholder="请选择"
                class="tr-select"
              >
                <el-option
                  v-for="item in kinsList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <div
                class="jiage"
                v-if="profitPriceYan == '请选择' || profitPriceYan == null"
              >
                票面价：0元
              </div>
              <div class="jiage" v-else>票面价：{{ profitPriceYans }}元</div>
              </div>
            </div>
            <div class="tr_rights_bor_data" v-if="insurancesData2&&insurancesData2.amount">
              <div
                class="_bor_data_brief"
              >
                <span>旅程安心</span
                ><span>|</span
                ><span class="amount">保额{{
                  insurancesData2.amount | numPrice
                }}</span>
              </div>
              <div class="_bor_data_clause" @click="dialogClick(insurancesData2)" v-if="insurancesData2 && insurancesData2.brief">
                请阅读<span>《投保须知》</span>
              </div>
            </div>
          </div>
          <div class="tr_ul">
            <div class="tr_uleft">联系人</div>
            <div class="tr_rights">
              <el-input
                v-model="lname"
                class="inps"
                placeholder="请输入联系人姓名"
              ></el-input>
              &nbsp;&nbsp;&nbsp;
              <el-input
                v-model="user_ipone"
                class="inps"
                placeholder="请输入联系人电话"
              ></el-input>
            </div>
          </div>
          <!-- <div
            v-if="
              (isblcks == 2 && isarsrl == false && isbtd != 2) ||
              (isblcks == 4 && isarsrl == false && isbtd != 2) ||
              (isblcks == 1 &&
                isarsrl == false &&
                isbtd == 1 &&
                isblckt == true)
            "
          > -->
          <div v-if="isShowChengben">
            <div class="tr_ul">
              <div class="tr_uleft">归属部门</div>
              <div class="tr_rights">
                <el-input
                  v-model="attdepartment"
                  :disabled="true"
                  placeholder="请输入联系人姓名"
                ></el-input>
              </div>
            </div>
            <div class="tr_ul">
              <div class="tr_uleft">成本中心</div>
              <div class="tr_rights">
                <el-cascader
                  style="width: 200px"
                  ref="cascader"
                  :show-all-levels="false"
                  @change="handleChange"
                  :props="bots"
                  :options="treeLists"
                  v-model="selectedOptions3"
                  :disabled="disa"
                ></el-cascader>
              </div>
            </div>
            <div class="tr_ul" v-if="CostCi == true">
              <div class="tr_uleft">成本审批人</div>
              <div class="tr_rights">
                <div class="tr_dvs" @click="drawers('TravelCostCenlist')">
                  <span class="noTest" v-if="TravelCostCenlist.length == 0"
                    >请选择成本审批人</span
                  >
                  <span
                    v-for="(item, index) in TravelCostCenlist"
                    :key="index"
                    v-else
                  >
                    {{ item.staffName }}
                  </span>
                </div>
              </div>
            </div>
            <div class="tr_ul" v-if="CostCis == true">
              <div class="tr_uleft">部门审批人</div>
              <div class="tr_rights">
                <div class="tr_dvs" @click="drawers('TravelDepartlist')">
                  <span
                    v-for="(item, index) in TravelDepartlist"
                    :key="index"
                    v-if="TravelDepartlist.length > 0"
                  >
                    {{ item.staffName }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- <div
            class="tr_ul"
            v-if="(isblcks == 2 || isblcks == 4) && isbtd == 1"
          > -->
          <div class="tr_ul" v-if="isbtd == 1">
            <div class="tr_uleft">出行事由</div>
            <div class="tr_rights">
              <!-- <el-input
                v-model="reson"
                type="textarea"
                :rows="2"
                placeholder="请输入出行事由"
                :disabled="disa"
              ></el-input> -->
              <el-select v-model="resonText" placeholder="请选择" popper-class="selectPopper" :disabled="disa" @change="reasonChang">
								<el-option
								v-for="item in reasonData"
								:key="item.id"
								:label="item.reason"
								:value="item.id">
								</el-option>
							</el-select>
            </div>
          </div>
          <div class="tr_ul" v-if="isblcks == 4">
            <div class="tr_uleft">改签原因</div>
            <div class="tr_rights">
              <el-input
                v-model="user_remark"
                placeholder="请输入改签原因"
              ></el-input>
            </div>
          </div>
          <div class="tr_ul" style="display: flex" v-if="isblcks == 4">
            <div class="tr_uleft">上传附件</div>
            <div class="tr_rights">
              <div style="width: 80px; height: 80px; margin-left: 30px">
                <el-upload
                  class="avatar-uploader"
                  :action="action"
                  :show-file-list="false"
                  :accept="'image/*'"
                  :headers="{ AuthToken: tokens }"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                  :before-upload="handleBeforeUpload"
                  :on-progress="handleProgress"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
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
              <p>
                {{ retime(trainslis.date) }}&emsp;{{ trainslis.week }}&emsp;{{
                  trainslis.data.userlist.departs
                }}
                -
                {{ trainslis.data.userlist.arrives }}
              </p>
            </div>
            <div class="tsbods">
              <div class="tsbodas">
                <div class="tsbodsle">
                  <div>
                    <span
                      class="iconfont"
                      style="margin: 0 10px; color: #f5a623"
                      ><img
                        style="width: 20px; height: 20px"
                        :src="trainslis.data.userlist.ims"
                    /></span>
                  </div>
                  <div>
                    <div style="font-size: 15px">
                      {{ trainslis.hang.name }}{{ trainslis.data.userlist.no }}
                    </div>
                  </div>
                </div>
                <div class="trainsc_s">
                  <div class="trainsc_s_l">
                    <div>
                      <div class="trainsc_s_l_t">
                        {{ trainslis.data.userlist.departTime }}
                      </div>
                    </div>
                  </div>
                  <div class="trainsc_s_s">
                    <div style="font-size: 12px">
                      {{ trainslis.data.userlist.flightTime }}
                    </div>
                  </div>
                  <div class="trainsc_s_l">
                    <div class="trainsc_s_l_t">
                      {{ trainslis.data.userlist.arriveTime }}
                    </div>
                  </div>
                </div>
                <div class="fuel_right" @click="masks">
                  退改规则
                  <div v-if="mouses" class="mouse">123</div>
                </div>
              </div>
              <div class="tsbodas">
                <div class="tsbodsle">
                  <div style="font-size: 13px; color: #3b4f62">
                    {{ levelName(trainslis.datw.level) }} |
                    {{ trainslis.data.userlist.plane
                    }}{{ trainslis.data.userlist.planeSize }}
                  </div>
                </div>
                <div class="trainsc_s">
                  <div class="trainsc_s_l">
                    <div>
                      <div class="trainsc_s_l_t"></div>
                    </div>
                    <div class="trainsc_s_l_b">
                      <div class="trainsc_s_l_b_r">
                        {{ trainslis.data.userlist.departs
                        }}{{ trainslis.data.userlist.departTerminal }}
                      </div>
                    </div>
                  </div>
                  <div class="trainsc_s_bot"></div>
                  <div class="trainsc_s_l">
                    <div class="trainsc_s_l_t"></div>
                    <div class="trainsc_s_l_b">
                      <div class="trainsc_s_l_b_r">
                        {{ trainslis.data.userlist.arrives
                        }}{{ trainslis.data.userlist.arriveTerminal }}
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
              <p>
                {{ retime(nums.date) }}&emsp;{{ nums.week }}&emsp;{{
                  nums.data.userlist.departs
                }}
                - {{ nums.data.userlist.arrives }}
              </p>
            </div>
            <div class="tsbods">
              <div class="tsbodas">
                <div class="tsbodsle">
                  <div>
                    <span
                      class="iconfont"
                      style="margin: 0 10px; color: #f5a623"
                      ><img
                        style="width: 20px; height: 20px"
                        :src="nums.data.userlist.ims"
                    /></span>
                  </div>
                  <div>
                    <div style="font-size: 15px">
                      {{ nums.hang.name }}{{ nums.data.userlist.no }}
                    </div>
                  </div>
                </div>
                <div class="trainsc_s">
                  <div class="trainsc_s_l">
                    <div class="trainsc_s_l_t">
                      {{ nums.data.userlist.departTime }}
                    </div>
                  </div>
                  <div class="trainsc_s_s">
                    <div style="font-size: 12px">
                      {{ nums.data.userlist.flightTime }}
                    </div>
                  </div>
                  <div class="trainsc_s_l">
                    <div class="trainsc_s_l_t">
                      {{ nums.data.userlist.arriveTime }}
                    </div>
                  </div>
                </div>
                <div class="fuel_right" @click="masks">
                  退改规则
                  <div v-if="mouses" class="mouse">123</div>
                </div>
              </div>

              <div class="tsbodas">
                <div class="tsbodsle">
                  <div style="font-size: 13px; color: #3b4f62">
                    {{ levelName(nums.datw.level) }} | {{ nums.data.userlist.plane
                    }}{{ nums.data.userlist.planeSize }}
                  </div>
                </div>
                <div class="trainsc_s">
                  <div class="trainsc_s_l">
                    <div class="trainsc_s_l_b">
                      <div class="trainsc_s_l_b_r">
                        {{ nums.data.userlist.departs
                        }}{{ nums.data.userlist.departTerminal }}
                      </div>
                    </div>
                  </div>
                  <div class="trainsc_s_bot"></div>
                  <div class="trainsc_s_l">
                    <div class="trainsc_s_l_t"></div>
                    <div class="trainsc_s_l_b">
                      <div class="trainsc_s_l_b_r">
                        {{ nums.data.userlist.arrives
                        }}{{ nums.data.userlist.arriveTerminal }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Cover" v-if="covesr">
          <div>
            <p
              style="
                color: dodgerblue;
                font-size: 18px;
                text-align: center;
                line-height: 60px;
              "
            >
              退改签规则
            </p>
            <p style="padding: 30px 20px; font-size: 14px">
              1.退票规定：{{ backrule.refundTicketDes }}
            </p>
            <p style="padding: 30px 20px; font-size: 14px">
              2.改签规定：{{ backrule.changeTicketDes }}
            </p>
            <p style="padding: 30px 20px; font-size: 14px">
              3.签转规定：{{ backrule.signTicketDes }}
            </p>
          </div>
          <div style="text-align: center">
            <el-button type="primary" @click="mask">确定</el-button>
          </div>
        </div>
        <div class="covers" v-if="covers" @click="mask"></div>

       
      </div>
      <div class="trsright">
        <div class="trsrs">
          <div class="trsrs-title">
            <div class="trsrse">
              <div class="iconfont icon">&#xe71b;&nbsp;</div>
              {{ trainslis.data.userlist.no }}
              <span>去程</span>
            </div>
          </div>
          <div class="tslist">
            <div>票价</div>
            <div v-if="isbtd == 1">
              <div v-if="prices != null && prices != 0 && prices != ''">
                <span class="price">￥{{ prices }}</span
                >×{{ userlists.length }}人
              </div>
              <div v-else>
                <span class="price"
                  >￥{{ trainslis.datw.salePrices[0].price }}</span
                >×{{ userlists.length }}人
              </div>
            </div>
            <div v-else>
              <div v-if="prices != null && prices != 0 && prices != ''">
                <span class="price">￥{{ prices }}</span
                >×{{ passengers.length }}人
              </div>
              <div v-else>
                <span class="price"
                  >￥{{ trainslis.datw.salePrices[0].price }}</span
                >×{{ passengers.length }}人
              </div>
            </div>
          </div>
          <div class="tslist">
            <div>基建+燃油</div>
            <div v-if="isbtd == 1">
              <span class="price">{{
                trainslis.data.userlist.taxFee + trainslis.data.userlist.fuelFee
              }}</span
              >×{{ userlists.length }}人
            </div>
            <div v-else>
              <span class="price">{{
                trainslis.data.userlist.taxFee + trainslis.data.userlist.fuelFee
              }}</span
              >×{{ passengers.length }}人
            </div>
          </div>
          <!-- <div class="tslist" v-if="profitPrice != 0 && profitPrice != '请选择' && profitPrice != undefined">
            <div>保险</div>
            <div v-if="isbtd == 1">{{ profitPrices }}×{{ userlists.length }}人</div>
            <div v-else>{{ profitPrices }}×{{ passengers.length }}人</div>
          </div> -->
          <div class="tslist">
            <div>保险</div>
            <div v-if="isbtd == 1">
              {{ profitPriceYis + profitPriceYans }}×{{ userlists.length }}人
            </div>
            <div v-else>{{ profitPriceYis + profitPriceYans }}×{{ passengers.length }}人</div>
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
              {{ nums.data.userlist.no }}
              <span>返程</span>
            </div>
          </div>
          <div class="tslist">
            <div>票价</div>
            <div v-if="isbtd == 1">
              <div v-if="priceas != null && priceas != 0 && priceas != ''">
                <span class="price">￥{{ priceas }}</span
                >×{{ userlists.length }}人
              </div>
              <div v-else>
                <span class="price">￥{{ nums.datw.salePrices[0].price }}</span
                >×{{ userlists.length }}人
              </div>
            </div>
            <div v-else>
              <div v-if="priceas != null && priceas != 0 && priceas != ''">
                <span class="price">￥{{ priceas }}</span
                >×{{ passengers.length }}人
              </div>
              <div v-else>
                <span class="price">￥{{ nums.datw.salePrices[0].price }}</span
                >×{{ passengers.length }}人
              </div>
            </div>
          </div>
          <div class="tslist">
            <div>基建+燃油</div>
            <div v-if="isbtd == 1">
              <span class="price">{{
                nums.data.userlist.taxFee + nums.data.userlist.fuelFee
              }}</span
              >×{{ userlists.length }}人
            </div>
            <div v-else>
              <span class="price">{{
                nums.data.userlist.taxFee + nums.data.userlist.fuelFee
              }}</span
              >×{{ passengers.length }}人
            </div>
          </div>
          <!-- <div class="tslist" v-if="profitPrice != 0 && profitPrice != '请选择' && profitPrice != undefined">
            <div>保险</div>
            <div v-if="isbtd == 1">{{ profitPrices }}×{{ userlists.length }}人</div>
            <div v-else>{{ profitPrices }}×{{ passengers.length }}人</div>
          </div> -->
          <div class="tslist">
            <div>保险</div>
            <div v-if="isbtd == 1">
              {{ profitPriceYis + profitPriceYans }}×{{ userlists.length }}人
            </div>
            <div v-else>{{ profitPriceYis + profitPriceYans }}×{{ passengers.length }}人</div>
          </div>
          <div class="tslist">
            <div>服务费</div>
            <div v-if="isbtd == 1">{{ tips }}×{{ userlists.length }}人</div>
            <div v-else>{{ tips }}×{{ passengers.length }}人</div>
          </div>
        </div>
        <div class="tslists">
          <div>合计</div>
          <div style="color: #ff6600">￥{{ num }}</div>
        </div>
        <div
          class="tsbtn"
          :disabled="kun"
          @click="panduan(1)"
          v-if="isblcks != 4 && rotes('tms:dps:reserve')"
          v-loading="loadingBot"
        >
          提交订单
        </div>
        <div
          class="tsbtn"
          @click="panduan(2)"
          v-if="isblcks == 4 && rotes('tms:dps:change')"
          v-loading="loadingBot"
        >
          申请改签
        </div>
      </div>
    </div>
     <div class="staleve" v-if="staleve" @click="staleve = false">
          <div class="stalist" @click.stop>
            <div class="quan">
              <div class="statop" v-if="respeatBook.length > 0">
                <div class="reds">
                  <div class="ts_text">订单已重复</div>
                </div>
                <div
                  class="setlist"
                  v-for="(item, index) in respeatBook"
                  :key="index"
                >
                  <div class="setbod" v-if="item.name == 9 && !notbooking">
                    <div class="styul">
                      <div class="styli_top">超规且不可预订</div>
                      <div class="stulis">
                        <div class="styli_left">超规人员:</div>
                        <div class="styli_right">
                          {{ item.list }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="setbod" v-if="item.name == 8 && !notbooking">
                    <div class="styul">
                      <div class="styli_top">超规必须选择原因</div>
                      <div class="stulis">
                        <div class="styli_left">超规人员:</div>
                        <div class="styli_right">
                          {{ item.list }}
                        </div>
                      </div>
                    </div>
                    <div class="styul">
                      <div class="stulis">
                        <div class="styli_left">超规原因:</div>
                        <div class="styli_right">
                          <div class="wors">
                            <!-- <picker
                              v-model="pricdesc"
                              :range="rulesReasons"
                              :range-key="'chineseDesc'"
                              @change="chineseChanges($event)"
                            >
                              {{ rulesReasons[chiness.index].chineseDesc }}
                            </picker> -->
                             <el-select v-model="pricdesc" placeholder="请选择"  popper-class="porperReasons">
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
              </div>
            </div>
            <div class="btnsti" v-if="bools">
              <div class="roblck" @click="staleve = false">取消</div>
              <div class="btnok" @click="cits_btn">继续预定</div>
            </div>
          </div>
        </div>
    <el-dialog
      title="投保须知"
      :visible.sync="dialogVisible"
      width="50%"
      center
     >
      <span v-html="insurancesData.brief"></span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import passenger from "@/components/common/passenger";
import citysearch from "@/components/common/citycomponents";
import citysearchs from "@/components/common/citycomponents_t";
import citysearchh from "@/components/common/citycomponents_h";
import addPassenger from "@/components/common/addPassenger";
import { numberPapers , selectedOptions,numPrice,catypeEn} from "@/utils/common-filters";
import reasonApi from "@/utils/reasonApi";
let ip_test = /^[1][3456789][0-9]{9}$/; //电话号码正则
let posPattern = /^[a-zA-Z]+$/;
export default {
filters: {
   numberPapers,selectedOptions,numPrice,catypeEn
  },

  data() {
    return {
      isok: {
        isok: "",
      },
      tokens: "",
      imageUrl: "", //照片路径
      num: 0, //合计
      leng: "",
      passengers: [], //出行人员
      backrule: {},
      nums: {}, //页面对象
      Brokerage: "", //火车单人手续费
      bank_deposit: "", //开户银行
      zhi: "",
      abstid: -1, //当前银行搜索下标
      units: "", //单位名称
      user_remark: "", //改签原因
      reson: "", //出行事由
      drawelist: [], //盒子内容
      drawer: false, //盒子默认关闭
      covesr: false,
      covers: false,
      prices: 0, //票价
      priceas: 0, //回来的票价
      amounto: 0, //基建
      amountt: 0, //燃油
      bots: {
        //使用props替换掉本来默认的lable和value 的键值
        value: "id",
        label: "text",
        checkStrictly: true, //可以选父级
      },
      NameCenter: {
        //当前选择成本中心
        name: "",
        id: 0,
      },
      options: [
        {
          value: "1",
          label: "公务员卡验证",
        },
        {
          value: "2",
          label: "预算单位验证",
        },
      ],
      value: "1",
      civilServiceTicket: "",
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
      insuranceNo: "",
      insuranceNos: "",
      facePrices: 0,
      profitPriceYis: 0,
      profitPriceYans: 0,
      isGift: 0,
      isGifts: 0,
      Default: 0,
      Defaults: 0,
      profitPriceYi: "请选择",
      profitPriceYan: "请选择",
      isGetStaffList: false,
      apprvCost: [],
      kingList: [], //保险
      kinsList: [], //保险
      banklist: [], //银行集合
      banklists: [], //当前搜索银行
      lname: JSON.parse(sessionStorage.getItem("userinfo")).userName, //默认联系人
      attdepartment: JSON.parse(sessionStorage.getItem("userinfo")).deptName, //默认部门
      lipone: "", //默认联系人,
      user_ipone: "",
      isarsrl: false,
      loading: false,
      loadingPic: true,
      staleve: false,
      respeatBook: [],
      notbooking: false,
      pricdesc: "", //高价超规原因
      rulesReasons: [], //超规类型
      bools: false,
      kun: false,
      isone: true,
      isblcks: "",
      butalist: [],
      mouses: false,
      getTravelPolicys: {},
      userlist: [],
      userlists: [], //旅客信息
      vehicleId: "", //事前id
      vehicleIdBack: "", //事前id
      passengerNoslist: [], //改签人passno
      trainslis: null, //上个页面的参数
      // scardns: [],
      // scardnno: [],
      CostCencd: [],
      context: "",
      codes: "", //验舱验价状态
      fasp: 0,
      facePrice: 0,
      returnTicketPrice: 0,
      toReturn: 0,
      isbtd: 0,
      isblckt: false, //二次审核
      action: "",
      msgErr: "",
      loadingBot: false,
      isShowChengben: false, // 是否显示审批信息
      sttos: 1, //事前是否违规再次审批  1为开启二次审批 3为违规再次审批
      ticketChanges: false,
      selectedOptions3: [],
      examineSwitch:'', // 免审总开关
      // metarule:0,
      chiness: {
					index: 0
				},

      chines: {
					index: 0
				},
      disa:false,
      reasonData: [],  // 出差事由
      insurancesData1: {}, // 航意险信息
      insurancesData2: {}, // 航廷险信息
      insurancesData:{},
      dialogVisible:false,
      resonText:'',
      settlePrice:'',
      isTow:false,
    };
  },
  components: {
    addPassenger,
  },
  watch: {
    passengers: {
      handler(newName, oldName) {
        this.leng = this.passengers.length;
        this.userliste();
        // this.amount(this.toReturn);
      },
    },
    deep: true,
  },
  async mounted() {
    let lis = JSON.parse(sessionStorage.getItem("ticketcationadds")); //获取上个页面传入的参数
    if(lis.twos && (lis.ones.data.userlist.airline == lis.twos.data.userlist.airline)){
      this.isTow = true
    }
   this.tokens = JSON.parse(sessionStorage.getItem("userinfo")).token;
   this.reasonData = await reasonApi.reason_api()
    this.action =
      sessionStorage.getItem("root") + "/tms/api/user/uploadPassengerImage";
    let st = lis;
    if(lis.isone == false){
       this.isblckt = lis.ones.isblckt == true || lis.twos.isblckt == true ? true:false
    }else{
      this.isblckt = lis.isblckt;
    }
    this.civilServiceTicket = st.civilServiceTicket;
    let dat = {};
    if (st.isone) {
      //单程
      this.isone = true;
      dat = lis;
    } else {
      //往返
      this.isone = false;
      dat = lis.ones;
      this.nums = lis.twos;
    }
   
    this.dats = dat;
    this.isblcks = dat.data.datw.isblcks; //1事前2事中3超规审核4改签
    this.butalist = dat.data.datw.butalist;
    this.isbtd = dat.data.datw.isbtd; //1应公2应私
    this.trainslis = dat || {};
    var arrS = this.reasonData.find(item=>item.isDefault == 1) || ''
     if(this.isblcks == 4){
       if(  this.butalist[0].reason ==  this.butalist[0].resonid){
         this.reson = ''
         this.resonText = ''
       }else{
          if(this.dats.data.datw.butalist[0].reason){
              this.reson = this.dats.data.datw.butalist[0].reasonid
              this.resonText =this.dats.data.datw.butalist[0].reason
          }else{
              this.reasonChang(arrS.id)
          }
       }
     }else{
      if(this.isbtd == 1 && this.dats.data.datw.butalist[0].reason){
          this.reson = this.dats.data.datw.butalist[0].reasonid
          this.resonText =this.dats.data.datw.butalist[0].reason
      }else{
        if(arrS){
          this.reasonChang(arrS.id)
        }
      }
     }
    //  if(arrS){
    //   if(this.reson && this.reson != this.dats.data.datw.butalist[0].reason){
    //     this.reasonChang(arrS.id)
    //     this.reson = arrS.id
    //      console.log("1111--------")
    //   }else{
    //    if(this.dats.data.datw.butalist[0].reason){
    //       this.reson = this.dats.data.datw.butalist[0].reasonid
    //       this.resonText = this.dats.data.datw.butalist[0].reason
    //    }else{
    //      this.reson = ''
    //      this.resonText = ''
    //    }
    //   }
    //  } 

    this.packlist = dat;
    this.userlist = dat.data.userlist;
    this.date = dat.date;
    this.timelist = dat.data.timelist;
    this.hang = dat.hang;
    //  this.metarule = dat.data.datw.metarule || 0;
     this.isarsrl = dat.isarsrl;  //是否免审
      this.disa = this.isblcks == 1 ? true : false

    if (this.isblcks == 4 && this.isbtd == 1) {
      this.passengerNoslist = dat.data.datw.passengerNos; //改签出行人no
    }
    //改签或者事前  不是免审
        //改签或者事前  不是免审
    if(this.isblckt){
      this.sttos = 3;//1为事前审批 3为超标审批
      this.isShowStatus();//是否显示审批信息
    } else {
    if ((this.isblcks == 4 || this.isblcks == 1) && this.isarsrl == false&& this.isbtd == 1 ) {
      this.getRuleMainSetting(); //获取公司是否需要审核
    } else {
      this.isShowStatus(); //是否显示审批信息
    }
    }
    this.usernams();
    if (this.isbtd == 1 ) {
      this.userliste(); //出行人信息
    }
    this.getstu();
    this.getBrokerage();
    this.selts(); //查询成本中心
    if (this.isblcks != 4) {
      this.baoxian(); //保险
    }
    // 事前需要二次审批及超规时回填成本中心及出差事由
    if (!this.isarsrl && this.isblcks == 1  ) {
      this.NameCenter = {
        name: this.trainslis.data.datw.mokksli.costName,
        id: this.trainslis.data.datw.mokksli.costId,
      };
      // 成本中心二次审批 成本中心参数值回填
      // this.selectedOptions3 = [this.trainslis.data.datw.mokksli.costId];
      if(this.isblckt &&this.isbtd == 1){
        this.appswlist();
      }
    }
    this.getTravelPolicyst(); //保险规则判断
  },
  methods: {
    // 成本中心展示状态
    isShowStatus() {
      /*
        this.isbtd = 1  因公  
        !this.isarsrl 非免审 
        this.isblcks 1事前2事中 3事前违规在次 4改签 
        this.ticketChanges 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
        this.isblckt 事前是否需要二次审批
        this.examineSwitch 免审总开个  1为审批 0 为免审
   */
      // console.log("因公 因私", this.isbtd);
      // console.log("个人免审 ", this.isarsrl);
      // console.log("this.ticketChanges", this.ticketChanges);
      // console.log("1事前2事中 3事前违规在次 4改签", this.isblcks);
      // console.log("违规", this.isblckt);
      // console.log("超规审批", this.metarule);
      // console.log("this.isShowChengben", this.isShowChengben);
      // console.log("this.butalist[0].reason", this.butalist[0].reason);
      // console.log("trainslis",trainslis)
      // if(this.examineSwitch ==)
    // 事前需要二次审批及超规时回填成本中心及出差事由
    if (!this.isarsrl && (this.isblcks == 1)) {
      this.NameCenter = {
        name: this.trainslis.data.datw.mokksli.costName,
        id: this.trainslis.data.datw.mokksli.costId,
      };
      // 成本中心二次审批 成本中心参数值回填
      // this.selectedOptions3 = [this.trainslis.data.datw.mokksli.costId];
      if(this.isblckt && this.isbtd==1){
        this.appswlist();
      }
    }
      if (this.isbtd == 1 && this.isarsrl == false ) {
        if (
          this.isblcks == 2 ||
          (this.isblcks == 4 && (this.ticketChanges || this.isblckt)) ||
          (this.isblcks == 1 ) 
        ) {
          this.isShowChengben = true;
          this.reson =
          (  this.isblckt && (this.isblcks == 1 || this.isblcks == 4 ))
              ? this.dats.data.datw.butalist[0].resonid
              : "";
            if(this.reson && this.reson != this.dats.data.datw.butalist[0].reason){
               this.reasonChang(this.reson)
            } else{
              this.reson = ''
            }
        }
      }
      
    },

    onInput(itm, id) {
      this.abstid = id;
      let va = itm;
      if (va.length > 0) {
        let banks = this.banklist; //当前所有银行
        this.banklists = [];
        for (let i in banks) {
          if (banks[i].indexOf(va) >= 0) {
            this.banklists.push(banks[i]);
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
    handleSuccess(response, file, fileList) {
      //上传头像成功后处理---
      this.$message({
        message: "上传成功！",
        type: "success",
      });
      if (response.code == 200) {
        this.imageUrl = response.data;
      }
    },
    handleError() {
      this.$message({
        message: "上传失败,请重新上传图片!！",
        type: "error",
      });
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

    async usernams() {
      //获取联系人
      try {
        const res = await this.$api.home.getContactInfo();
        if (res.code == 200) {
          this.user_name = res.data.name;
          this.user_ipone = res.data.phone;
        } else {
          this.$message({
            message: res.message,
            type: "warning",
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async baoxian() {
      //保险
      let uses = [];
      uses = {
        civilServiceTicket: "",
      };
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
								if(rea.data.product.insurDomesticList[i].internatOrcivil == 1 || rea.data.product.insurDomesticList[i].internatOrcivil == 3){//1国内机票   3国内/国际
									if (rea.data.product.insurDomesticList[i].insureType == 3) {//1航意险 2航延险 3航意/航延
										kings.push(rea.data.product.insurDomesticList[i]);
										kinga.push(rea.data.product.insurDomesticList[i]);
									} else if(rea.data.product.insurDomesticList[i].insureType == 1){
										kings.push(rea.data.product.insurDomesticList[i]);
									} else if(rea.data.product.insurDomesticList[i].insureType == 2){
										kinga.push(rea.data.product.insurDomesticList[i]);
									}
								}
								
							}
            this.kingList = [{name:'请选择',id:-2},...kings];
            this.kinsList = [{name:'请选择',id:-1},...kinga];
            if (this.kingList.length > 1) {
              //默认选择保险
              for (let i in this.kingList) {
                if (this.kingList[i].isDefault) {
                  this.Default = i;
                  this.profitPriceYi = this.kingList[i].name;
                  this.facePrices = this.kingList[i].facePrice;
                  this.profitPriceYis =
                    this.kingList[i].isGift == 1
                      ? 0
                      : this.kingList[i].profitPrice; //赠险金额为0
                    this.insuranceNo = this.kingList[i].insuranceNo;
                     this.insurancesData1 = this.kingList[i];
                }
              }
            }
            if (this.kinsList.length > 1) {
              //默认选择保险
              for (let i in this.kinsList) {
                if (this.kinsList[i].isDefault) {
                  this.Defaults = i;
                  this.profitPriceYan = this.kinsList[i].name;
                  this.facePrice = this.kinsList[i].facePrice;
                  this.profitPriceYans =
                    this.kinsList[i].isGift == 1
                      ? 0
                      : this.kinsList[i].profitPrice;
                  this.insuranceNos = this.kinsList[i].insuranceNo;
                    this.insurancesData2 = this.kinsList[i];
                }
              }
            }
            // this.tips =
            //   this.getTravelPolicys &&
            //   this.getTravelPolicys.domesticInsuranceTips == 0
            //     ? 0
            //     : this.tips;
            this.commit();
          }
        }
      } catch (e) {
        console.log(e);
        this.loading = false;
      }
    },
    passage(list) {
      this.passengers = list;
      this.leng = this.passengers.length
      this.amount(1) // 因私
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
            type: "warning",
          });
        }
      } catch (e) {
        //TODO handle the exception
        console.log(e);
      }
    },
    chineseChange(id,num , ins) {
      //航意险
      this.Default =num == 1? this.profitPriceYi : this.profitPriceYan;
      var price = 0
      var numberNo = ''
      if (this.Default == 0) {
        this.facePrices = 0;
        this.profitPriceYis = 0;
        this.profitPriceYans = 0;
      } else {
        for (let k in ins) {
          if (ins[k].id == this.Default) {
            numberNo = ins[k].insuranceNo;
            this.isGift = ins[k].isGift;
            if (this.isGift == 1) {
              //1是赠送
              this.facePrices = 0;
              price = 0;
            } else {
              this.facePrices = ins[k].facePrice;
              price = ins[k].profitPrice;
            }
          }
          if (ins[k].facePrice == null) {
            this.facePrices = 0;
          } else if (ins[k].profitPrice == null) {
            price = 0;
          }
        }
      }
       var arr = ins.filter((item) => item.id == id);
        if(num == 1){
          this.profitPriceYis = arr.length > 0 && arr[0].id == -2 ? 0 : price
          this.insuranceNo = arr.length > 0 && arr[0].id == -2 ? '': numberNo
          this.insurancesData1 = arr[0];
        }else if(num == 2){
          this.profitPriceYans = arr.length > 0 &&  arr[0].id == -1 ? 0 :price
          this.insuranceNos =arr.length > 0 &&  arr[0].id == -1 ? 0 : numberNo
            this.insurancesData2 = arr[0];
        }
      var arr = ins.filter((item) => item.id == id);
      this.allIsGift = arr.isGift == 1 ? true : false;
      this.commit();
      // domesticInsuranceTips  1代表买保险收服务费，2代表不收
      // this.tips =
      //   this.getTravelPolicys &&
      //   this.getTravelPolicys.domesticInsuranceTips == 2
      //     ? 0
      //     : this.tips;
    },
    //获取飞机p价
    async getstu() {
      let shared = "";
      if (this.dats.data.userlist.shared == true) {
        shared = "0";
      } else {
        shared = "1";
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
                flightInfoId: this.dats.data.userlist.flightinfoid,
                priceInfoId: this.dats.datw.priceInfoId,
                one_depart: this.dats.data.userlist.depart, //第一段，出发城市
                one_departDate: this.dats.data.userlist.departDate.substring(
                  0,
                  10
                ), //第一段，出发日期
                one_departTime: this.dats.data.userlist.departTime, //第一段，出发时间
                one_arrival: this.dats.data.userlist.arrive, //第一段，到达城市
                one_no: this.dats.data.userlist.no, //第一段，航班号
                one_sharedBZ: shared, //是否共享航班
                one_operatingNo: this.dats.data.userlist.operatingNo, //第一段，实际承运航班号
                one_cabin: this.dats.datw.cabin, //第一段，舱位
                civilServiceTicket: this.civilServiceTicket, //展示公务机票 标识。1：展示；0：不展示
                isSame: "1", //是否为往返组合标识，1：是；2：不是
                one_taxFee: this.dats.data.userlist.taxFee, //第一段，机建
                one_fuelFee: this.dats.data.userlist.fuelFee, //第一段，燃油
                one_fdprice: this.facePrice, //第一段公布运价
                one_arrivalTime: this.dats.data.userlist.arriveTime, //第一段，到达时间arriveTime
              },
            };
          } else {
            usera = {
              special: this.dats.datw.specialType,
              airline: {
                airlineType: 1,
                passengerType: "ADT",
                one_depart: this.dats.data.userlist.depart, //第一段，出发城市
                one_departDate: this.dats.data.userlist.departDate.substring(
                  0,
                  10
                ), //第一段，出发日期
                one_departTime: this.dats.data.userlist.departTime, //第一段，出发时间
                one_arrival: this.dats.data.userlist.arrive, //第一段，到达城市
                one_no: this.dats.data.userlist.no, //第一段，航班号
                one_sharedBZ: shared, //是否共享航班
                one_operatingNo: this.dats.data.userlist.operatingNo, //第一段，实际承运航班号
                one_cabin: this.dats.datw.cabin, //第一段，舱位
                civilServiceTicket: this.civilServiceTicket, //展示公务机票 标识。1：展示；0：不展示
                isSame: "1", //是否为往返组合标识，1：是；2：不是
                one_taxFee: this.dats.data.userlist.taxFee, //第一段，机建
                one_fuelFee: this.dats.data.userlist.fuelFee, //第一段，燃油
                one_fdprice: this.facePrice, //第一段公布运价
                one_arrivalTime: this.dats.data.userlist.arriveTime, //第一段，到达时间arriveTime
              },
            };
          }
        } else {
          if (this.dats.datw.priceSource == 1) {
            usera = {
              special: 4,
              airline: {
                passengerType: "ADT",
                airlineType: 2,
                flightInfoId: this.dats.data.userlist.flightinfoid,
                priceInfoId: this.dats.datw.priceInfoId,
                one_depart: this.dats.data.userlist.depart, //第一段，出发城市
                one_departDate: this.dats.data.userlist.departDate.substring(
                  0,
                  10
                ), //第一段，出发日期
                one_departTime: this.dats.data.userlist.departTime, //第一段，出发时间
                one_arrival: this.dats.data.userlist.arrive, //第一段，到达城市
                one_no: this.dats.data.userlist.no, //第一段，航班号
                one_sharedBZ: shared, //是否共享航班
                one_operatingNo: this.dats.data.userlist.operatingNo, //第一段，实际承运航班号
                one_cabin: this.dats.datw.cabin, //第一段，舱位
                civilServiceTicket: this.civilServiceTicket, //展示公务机票 标识。1：展示；0：不展示
                isSame: this.isTow ? "1": "2", //是否为往返组合标识，1：是；2：不是
                one_taxFee: this.dats.data.userlist.taxFee, //第一段，机建
                one_fuelFee: this.dats.data.userlist.fuelFee, //第一段，燃油
                one_fdprice: this.facePrice, //第一段公布运价
                two_depart: this.nums.data.userlist.depart, //第二段，出发城市
                two_departDate: this.nums.data.userlist.departDate.substring(
                  0,
                  10
                ), //第二段，出发日期
                two_departTime: this.nums.data.userlist.departTime, //第二段，出发时间
                two_arrival: this.nums.data.userlist.arrive, //第二段，到达城市
                two_no: this.nums.data.userlist.no, //第二段，航班号
                two_sharedBZ: shared, //是否共享航班
                two_operatingNo: this.nums.data.userlist.operatingNo, //第二段，实际承运航班号
                two_cabin: this.nums.datw.cabin, //第二段，舱位
                two_taxFee: this.nums.data.userlist.taxFee, //第二段，机建
                two_fuelFee: this.nums.data.userlist.fuelFee, //第二段，燃油
                two_fdprice: this.returnTicketPrice, //第二段公布运价
                one_arrivalTime: this.dats.data.userlist.arriveTime, //第一段，到达时间arriveTime
                two_arrivalTime: this.nums.data.userlist.arriveTime, //第二段，到达时间
              },
            };
          } else {
            usera = {
              special: this.dats.datw.specialType,
              airline: {
                passengerType: "ADT",
                airlineType: 2,
                one_depart: this.dats.data.userlist.depart, //第一段，出发城市
                one_departDate: this.dats.data.userlist.departDate.substring(
                  0,
                  10
                ), //第一段，出发日期
                one_departTime: this.dats.data.userlist.departTime, //第一段，出发时间
                one_arrival: this.dats.data.userlist.arrive, //第一段，到达城市
                one_no: this.dats.data.userlist.no, //第一段，航班号
                one_sharedBZ: shared, //是否共享航班
                one_operatingNo: this.dats.data.userlist.operatingNo, //第一段，实际承运航班号
                one_cabin: this.dats.datw.cabin, //第一段，舱位
                civilServiceTicket: this.civilServiceTicket, //展示公务机票 标识。1：展示；0：不展示
                isSame: this.isTow ? "1": "2", //是否为往返组合标识，1：是；2：不是
                one_taxFee: this.dats.data.userlist.taxFee, //第一段，机建
                one_fuelFee: this.dats.data.userlist.fuelFee, //第一段，燃油
                one_fdprice: this.facePrice, //第一段公布运价
                two_depart: this.nums.data.userlist.depart, //第二段，出发城市
                two_departDate: this.nums.data.userlist.departDate.substring(
                  0,
                  10
                ), //第二段，出发日期
                two_departTime: this.nums.data.userlist.departTime, //第二段，出发时间
                two_arrival: this.nums.data.userlist.arrive, //第二段，到达城市
                two_no: this.nums.data.userlist.no, //第二段，航班号
                two_sharedBZ: shared, //是否共享航班
                two_operatingNo: this.nums.data.userlist.operatingNo, //第二段，实际承运航班号
                two_cabin: this.nums.datw.cabin, //第二段，舱位
                two_taxFee: this.nums.data.userlist.taxFee, //第二段，机建
                two_fuelFee: this.nums.data.userlist.fuelFee, //第二段，燃油
                two_fdprice: this.returnTicketPrice, //第二段公布运价
                one_arrivalTime: this.dats.data.userlist.arriveTime, //第一段，到达时间arriveTime
                two_arrivalTime: this.nums.data.userlist.arriveTime, //第二段，到达时间
              },
            };
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
                flightInfoId: this.dats.data.userlist.flightinfoid,
                priceInfoId: this.dats.datw.priceInfoId,
                one_depart: this.dats.data.userlist.depart, //第一段，出发城市
                one_departDate: this.dats.data.userlist.departDate.substring(
                  0,
                  10
                ), //第一段，出发日期
                one_departTime: this.dats.data.userlist.departTime, //第一段，出发时间
                one_arrival: this.dats.data.userlist.arrive, //第一段，到达城市
                one_no: this.dats.data.userlist.no, //第一段，航班号
                one_sharedBZ: shared, //是否共享航班
                one_operatingNo: this.dats.data.userlist.operatingNo, //第一段，实际承运航班号
                one_cabin: this.dats.datw.cabin, //第一段，舱位
                isSame: "1", //是否为往返组合标识，1：是；2：不是
                one_taxFee: this.dats.data.userlist.taxFee, //第一段，机建
                one_fuelFee: this.dats.data.userlist.fuelFee, //第一段，燃油
                one_fdprice: this.facePrice, //第一段公布运价
                one_arrivalTime: this.dats.data.userlist.arriveTime, //第一段，到达时间arriveTime
              },
            };
          }
          // 美瀛-单段-不展示公务员票
          else if (this.dats.datw.priceSource == 2) {
            usera = {
              special: 5,
              airline: {
                airlineType: 1,
                passengerType: "ADT",
                one_operatingNo: this.dats.data.userlist.operatingNo,
                one_cabin: this.dats.datw.cabin,
                isSame: "1",
                one_taxFee: this.dats.data.userlist.taxFee,
                one_fuelFee: this.dats.data.userlist.fuelFee,
                one_fdprice: this.facePrice,
              },
            };
          } else {
            usera = {
              special: this.dats.datw.specialType,
              airline: {
                airlineType: 1,
                passengerType: "ADT",
                one_depart: this.dats.data.userlist.depart, //第一段，出发城市
                one_departDate: this.dats.data.userlist.departDate.substring(
                  0,
                  10
                ), //第一段，出发日期
                one_departTime: this.dats.data.userlist.departTime, //第一段，出发时间
                one_arrival: this.dats.data.userlist.arrive, //第一段，到达城市
                one_no: this.dats.data.userlist.no, //第一段，航班号
                one_sharedBZ: shared, //是否共享航班
                one_operatingNo: this.dats.data.userlist.operatingNo, //第一段，实际承运航班号
                one_cabin: this.dats.datw.cabin, //第一段，舱位
                isSame: "1", //是否为往返组合标识，1：是；2：不是
                one_taxFee: this.dats.data.userlist.taxFee, //第一段，机建
                one_fuelFee: this.dats.data.userlist.fuelFee, //第一段，燃油
                one_fdprice: this.facePrice, //第一段公布运价
                one_arrivalTime: this.dats.data.userlist.arriveTime, //第一段，到达时间arriveTime
              },
            };
          }
        } else {
          if (this.dats.datw.priceSource == 1) {
            usera = {
              special: 4,
              airline: {
                passengerType: "ADT",
                airlineType: 2,
                flightInfoId: this.dats.data.userlist.flightinfoid,
                priceInfoId: this.dats.datw.priceInfoId,
                one_depart: this.dats.data.userlist.depart, //第一段，出发城市
                one_departDate: this.dats.data.userlist.departDate.substring(
                  0,
                  10
                ), //第一段，出发日期
                one_departTime: this.dats.data.userlist.departTime, //第一段，出发时间
                one_arrival: this.dats.data.userlist.arrive, //第一段，到达城市
                one_no: this.dats.data.userlist.no, //第一段，航班号
                one_sharedBZ: shared, //是否共享航班
                one_operatingNo: this.dats.data.userlist.operatingNo, //第一段，实际承运航班号
                one_cabin: this.dats.datw.cabin, //第一段，舱位
                isSame: this.isTow ? "1": "2", //是否为往返组合标识，1：是；2：不是
                one_taxFee: this.dats.data.userlist.taxFee, //第一段，机建
                one_fuelFee: this.dats.data.userlist.fuelFee, //第一段，燃油
                one_fdprice: this.facePrice, //第一段公布运价
                two_depart: this.nums.data.userlist.depart, //第二段，出发城市
                two_departDate: this.nums.data.userlist.departDate.substring(
                  0,
                  10
                ), //第二段，出发日期
                two_departTime: this.nums.data.userlist.departTime, //第二段，出发时间
                two_arrival: this.nums.data.userlist.arrive, //第二段，到达城市
                two_no: this.nums.data.userlist.no, //第二段，航班号
                two_sharedBZ: shared, //是否共享航班
                two_operatingNo: this.nums.data.userlist.operatingNo, //第二段，实际承运航班号
                two_cabin: this.nums.datw.cabin, //第二段，舱位
                two_taxFee: this.nums.data.userlist.taxFee, //第二段，机建
                two_fuelFee: this.nums.data.userlist.fuelFee, //第二段，燃油
                two_fdprice: this.returnTicketPrice, //第二段公布运价
                one_arrivalTime: this.dats.data.userlist.arriveTime, //第一段，到达时间arriveTime
                two_arrivalTime: this.nums.data.userlist.arriveTime, //第二段，到达时间
              },
            };
          } else {
            usera = {
              special: this.dats.datw.specialType,
              airline: {
                passengerType: "ADT",
                airlineType: 2,
                one_depart: this.dats.data.userlist.depart, //第一段，出发城市
                one_departDate: this.dats.data.userlist.departDate.substring(
                  0,
                  10
                ), //第一段，出发日期
                one_departTime: this.dats.data.userlist.departTime, //第一段，出发时间
                one_arrival: this.dats.data.userlist.arrive, //第一段，到达城市
                one_no: this.dats.data.userlist.no, //第一段，航班号
                one_sharedBZ: shared, //是否共享航班
                one_operatingNo: this.dats.data.userlist.operatingNo, //第一段，实际承运航班号
                one_cabin: this.dats.datw.cabin, //第一段，舱位
                isSame:this.isTow ? "1": "2", //是否为往返组合标识，1：是；2：不是
                one_taxFee: this.dats.data.userlist.taxFee, //第一段，机建
                one_fuelFee: this.dats.data.userlist.fuelFee, //第一段，燃油
                one_fdprice: this.facePrice, //第一段公布运价
                two_depart: this.nums.data.userlist.depart, //第二段，出发城市
                two_departDate: this.nums.data.userlist.departDate.substring(
                  0,
                  10
                ), //第二段，出发日期
                two_departTime: this.nums.data.userlist.departTime, //第二段，出发时间
                two_arrival: this.nums.data.userlist.arrive, //第二段，到达城市
                two_no: this.nums.data.userlist.no, //第二段，航班号
                two_sharedBZ: shared, //是否共享航班
                two_operatingNo: this.nums.data.userlist.operatingNo, //第二段，实际承运航班号
                two_cabin: this.nums.datw.cabin, //第二段，舱位
                two_taxFee: this.nums.data.userlist.taxFee, //第二段，机建
                two_fuelFee: this.nums.data.userlist.fuelFee, //第二段，燃油
                two_fdprice: this.returnTicketPrice, //第二段公布运价
                one_arrivalTime: this.dats.data.userlist.arriveTime, //第一段，到达时间arriveTime
                two_arrivalTime: this.nums.data.userlist.arriveTime, //第二段，到达时间
              },
            };
          }
        }
      }
      this.loadingPic = true;
      try {
        const res = await this.$api.order.getPnrPriceInfor(usera);
        if (res.code == 200) {
          this.codes = res.code;
          this.loadingPic = false;
          this.settlePrice = res.data?res.data[0].settlePrice : ''
          if (this.isone == true) {
            if (res.data != null && res.data.length > 0) {
              let datw = this.trainslis.datw.salePrices[0];
              if (
                this.trainslis.datw.salePrices[0].price ==
                res.data[0].baseFare
              ) {
                 this.prices = res.data[0].salePrice != 0 ? res.data[0].salePrice : this.trainslis.datw.salePrices[0].price
              }else{
                 this.prices = this.trainslis.datw.salePrices[0].price
              }
              if (this.dats.datw.priceSource == 1) {
                //官方票特定读值方式
                // if (
                //   this.trainslis.datw.salePrices[0].parPrice ==
                //   res.data[0].baseFare
                // ) {
                //   this.prices = this.trainslis.datw.salePrices[0].price;
                // } else if (res.data[0].baseFare != 0) {
                //   this.prices =
                //     res.data[0].baseFare -
                //     (res.data[0].baseFare * datw.rebate) / 100 -
                //     datw.cashBack;
                // } else {
                //   this.prices = this.trainslis.datw.salePrices[0].price;
                // }
                this.amount(1);

                this.amounto = res.data[0].taxes!=null ? res.data[0].taxes[0].amount:''; //基建
                this.context = res.data[0].context;
    
              } else {
                //普通票特定读值方式
                // if (
                //   this.trainslis.datw.salePrices[0].parPrice ==
                //   res.data[0].segFareInfos[0].baseFare
                // ) {
                //   this.prices = this.trainslis.datw.salePrices[0].price;
                // } else if (res.data[0].segFareInfos[0].baseFare != 0) {
                //   this.prices =
                //     res.data[0].segFareInfos[0].baseFare -
                //     (res.data[0].segFareInfos[0].baseFare * datw.rebate) / 100 -
                //     datw.cashBack;
                // } else {
                //   this.prices = this.trainslis.datw.salePrices[0].price;
                // }
                this.amount(1);
                this.amounto =res.data[0].taxes!=null ? res.data[0].taxes[0].amount : ''; //基建
                this.context = res.data[0].context;
       
              }
              if (this.dats.datw.priceSource == 1) {
                //官方票特定读值方式
                if (res.data[0].baseFare != 0 && res.data[0].baseFare != null) {
                  this.facePrice = res.data[0].baseFare;
                } else {
                  this.facePrice = this.trainslis.datw.salePrices[0].parPrice;
                }
              } else {
                //普通票读值方式
                if (
                  res.data[0].segFareInfos[0].baseFare != 0 &&
                  res.data[0].segFareInfos[0].baseFare != null
                ) {
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
              if (this.isTow ) {
                 this.prices = res.data[0].segFareInfos[0].baseFare
                 this.priceas = res.data[0].segFareInfos[1].baseFare
              if (
                res.data[0].segFareInfos[0].baseFare != 0 &&
                res.data[0].segFareInfos[0].baseFare != null
              ) {
                _this.facePrice = res.data[0].segFareInfos[0].baseFare;
              } else {
                _this.facePrice = this.trainslis.datw.salePrices[0].parPrice;
              }
              if (
                res.data[0].segFareInfos[1].baseFare != 0 &&
                res.data[0].segFareInfos[1].baseFare != null
              ) {
                _this.returnTicketPrice = res.data[0].segFareInfos[1].baseFare;
              } else {
                _this.returnTicketPrice =
                  _this.nums.datw.salePrices[0].parPrice;
              }
              }else{
                 this.prices = res.data[0].segFareInfos[0].baseFare
                 this.priceas = res.data[1].segFareInfos[0].baseFare
              if (
                res.data[0].segFareInfos[0].baseFare != 0 &&
                res.data[0].segFareInfos[0].baseFare != null
              ) {
                _this.facePrice = res.data[0].segFareInfos[0].baseFare;
              } else {
                _this.facePrice = this.trainslis.datw.salePrices[0].parPrice;
              }
              if (
                res.data[1].segFareInfos[0].baseFare != 0 &&
                res.data[1].segFareInfos[0].baseFare != null
              ) {
                _this.returnTicketPrice = res.data[1].segFareInfos[0].baseFare;
              } else {
                _this.returnTicketPrice =
                  _this.nums.datw.salePrices[0].parPrice;
              }
              }
              if(res.data.length <1){
                 this.prices = this.trainslis.datw.salePrices[0].price
                 this.priceas = this.nums.datw.salePrices[0].price
              }

              _this.amount(2);
              _this.context = res.data[0].context;
               
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
          this.loadingPic = false;
          this.$message({
            message: res.message,
            type: "warning",
          });
        }
      } catch (e) {
        console.log(e);
        this.loadingPic = false;
      }
    },
    //查询当前用户改签是否需要审核 和 事前是否二次过审
    async getRuleMainSetting() {
      this.$api.home
        .ruleMainSetting()
        .then((res) => {
          if (this.isblcks == 1) {
            //判断事前是否需要审批
            let stw = res.data.examineSwitch.split(",");
            if (this.isblckt) {
              //事前违规需要再次审批
              this.sttos = 3; //走事前违规审批流程
            }
            for (let i in stw) {
              /**
               * 3代表事前二次过审
               */
              if (stw[i] == 3) {
                //公司是否开启二次审批
                //如果用户不是免审 就要事前二次过审
                if (!this.isblckt) {
                  this.sttos = 1; //走出差审批流程
                  this.isblckt = true;
                }
              }
            }
            this.isShowStatus();
          }
          if (this.isblcks == 4) {
            //改签
            let stw = res.data.examinePattern.split(",");
            for (let i in stw) {
              /**
               * 9代表改签需要审批
               */
              if (stw[i] == 9) {
                //公司是否开启机票改签审批
                this.ticketChanges = true;
              }
            }
            this.isShowStatus();
          }

          if (this.isblckt == true || this.ticketChanges == true) {
            //如果需要二次审批 或者改签需要审批 默认载入成本中心
            // this.okisd();
            this.handleChange();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    commit() {
      let num = 0;
      // if (this.profitPrice == undefined) {
      //   num = 0;
      // } else {
        num = this.profitPriceYis + this.profitPriceYans;
      // }
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

      // if (tempIsGift && tempIsGifts) {
      // this.allIsGift = true;
      if (this.isbtd == 1) {
        if (this.isblcks == 4) {
          // 改签服务费
          this.tips = this.getTravelPolicys.domesticFlightChange;
        } else {
          let OnlinePublicCabinServiceFee = this.getTravelPolicys
            .dpsOnlinePrivateCabinServiceFee; //因公服务费
          if ("F" == this.dats.datw.level) {
            this.tips = OnlinePublicCabinServiceFee.f;
          } else if ("C" == this.dats.datw.level) {
            this.tips = OnlinePublicCabinServiceFee.c;
          } else {
            this.tips = OnlinePublicCabinServiceFee.y;
          }
          this.tips =
            this.insuranceNo &&
            this.getTravelPolicys.domesticInsuranceTips == 2
              ? 0
              : this.tips;
        }

      } else {
        if (this.isblcks == 4) {
          // 改签服务费
          this.tips = this.getTravelPolicys.domesticFlightChange;
        } else {
          let OnlinePrivateCabinServiceFee = this.getTravelPolicys
            .dpsOnlinePublicCabinServiceFee; //因私服务费
          if ("F" == this.dats.datw.level) {
            this.tips = OnlinePrivateCabinServiceFee.f;
          } else if ("C" == this.dats.datw.level) {
            this.tips = OnlinePrivateCabinServiceFee.c;
          } else {
            this.tips = OnlinePrivateCabinServiceFee.y;
          }
          this.tips =
           this.insuranceNo &&
            this.getTravelPolicys.domesticInsuranceTips == 2
              ? 0
              : this.tips;
        }
      }
      // }
      // else {
      //   if (this.isbtd == 1) {
      //     if (this.isblcks == 4) {
      //       this.tips = this.getTravelPolicys.domesticFlightChange;
      //     } else {
      //       let OnlinePublicCabinServiceFee = this.getTravelPolicys
      //         .dpsOnlinePrivateCabinServiceFee; //因公服务费
      //       if ("F" == this.dats.datw.level) {
      //         this.tips = OnlinePublicCabinServiceFee.f;
      //       } else if ("C" == this.dats.datw.level) {
      //         this.tips = OnlinePublicCabinServiceFee.c;
      //       } else {
      //         this.tips = OnlinePublicCabinServiceFee.y;
      //       }
      //     }
      //   } else {
      //     if (this.isblcks == 4) {
      //       this.tips = this.getTravelPolicys.domesticFlightChange;
      //     } else {
      //       let OnlinePrivateCabinServiceFee = this.getTravelPolicys
      //         .dpsOnlinePublicCabinServiceFee; //因私服务费
      //       if ("F" == this.dats.datw.level) {
      //         this.tips = OnlinePrivateCabinServiceFee.f;
      //       } else if ("C" == this.dats.datw.level) {
      //         this.tips = OnlinePrivateCabinServiceFee.c;
      //       } else {
      //         this.tips = OnlinePrivateCabinServiceFee.y;
      //       }
      //     }
      //   }
      // }
      let nus = 0;
      let nut = 0;
      if (this.isbtd == 1) {
        this.leng = this.dats.data.datw.butalist.length;
      }
      if (this.dats.data.datw.timedates == "") {
        //单程
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
          nus = this.prices + this.userlist.fuelFee + this.userlist.taxFee; //去
        } else {
          nus =
            this.dats.datw.salePrices[0].price +
            this.userlist.fuelFee +
            this.userlist.taxFee; //去
        }
        this.num = parseFloat(nus) + parseFloat(this.fasp) + this.tips;
        this.num = parseFloat(this.num * this.leng).toFixed(2);
      } else {
        if (this.prices != 0 && this.prices != null) {
          nus = this.prices + this.userlist.fuelFee + this.userlist.taxFee; //去
        } else {
          nus =
            this.dats.datw.salePrices[0].price +
            this.userlist.fuelFee +
            this.userlist.taxFee; //去
        }
        if (this.priceas != 0 && this.priceas != null) {
          nut =
            this.priceas +
            this.nums.data.userlist.fuelFee +
            this.nums.data.userlist.taxFee;
        } else {
          nut =
            this.nums.datw.salePrices[0].price +
            this.nums.data.userlist.fuelFee +
            this.nums.data.userlist.taxFee;
        }
        this.num =
          parseFloat(nus) +
          parseFloat(nut) +
          parseFloat(this.fasp * 2) +
          parseFloat(this.tips * 2);
        this.num = parseFloat(this.num * this.leng).toFixed(2);
      }
    },
    async masks() {
      this.covesr = true;
      this.covers = true;
      try {
        let data = {
          airlineCode: this.trainslis.data.userlist.airline, //航司编码
          cabin: this.trainslis.datw.cabin, //舱位
          depDate: this.trainslis.data.userlist.departDate, //起飞时间
          airRoute:
            this.trainslis.data.userlist.depart +
            this.trainslis.data.userlist.arrive, //航线：CANPVG（出发地到达地）
        };
        const ret = await this.$api.home.getRefundChangeRule(data);
        if (ret.code == 200) {
          this.backrule = ret.data;
        } else {
          this.$message({
            message: ret.message,
            type: "warning",
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
    async panduan(i) {
        if(this.resonText){
        var res = ''
        res = this.reasonData.find(item=>item.reason ==  this.resonText)
         this.reson =res? res.id : this.butalist[0].resonid
        }
     //重复预订判断
      this.MentionChange = i; //1是提交2是改签
      let uses = {};
      let usest = {};
      let usert = [];
      let that = this;
      let userlists = that.userlists;
      let isbtd = that.isbtd; //1因公2因私
      let isblcks = that.isblcks; //1事前 2事中
      if(this.dats.datw.priceSource == 1 &&  this.context == null) return  this.$message({  message: "官网验价失败，请联系管理员！", type: "warning",});
      if (isblcks != 4) {
        for (let i = 0; i < userlists.length; i++) {
          //出行人信息
          usert.push({
            // cardNo: that.scardnno[i],
            // cardType: that.scardns[i],
            // cardNo:isbtd == 1 ? userlists[i].cardNo : this.passengers[i].cardNo,
            // cardType:isbtd == 1 ? userlists[i].cardType :this.passengers[i].cardType,
            name: userlists[i].name,
            phone: userlists[i].phone,
            passengerNo: userlists[i].passengerNo,
          });
      if(isbtd == 1){
        usert[i]['cardNo'] = userlists[i].cardNo 
        usert[i]['cardType'] = userlists[i].cardType 
      }else{
        for (let k = 0; k < this.passengers.length; k++) {
          if(userlists[i].id == this.passengers[k].userId){
            usert[i]['cardNo'] = this.passengers[k].cardNo 
            usert[i]['cardType'] = this.passengers[k].cardType 
          }
        }
      }
        }
      } else {
        for (let i = 0; i < userlists.length; i++) {
          //出行人信息
          usert.push({
            cardNo: userlists[i].certNo,
            cardType: that.cardtype(userlists[i].certType),
            name: userlists[i].name,
            phone: userlists[i].phone,
            passengerNo: that.passengerNoslist[i],
          });
        }
      }

      if (that.isone == true && isbtd == 1) {
        uses = {
          depart: that.dats.data.userlist.depart, //第一段，出发城市
          arrive: that.dats.data.userlist.arrive, //第一段，到达城市
          flightNo: that.dats.data.userlist.no, //航班号
          departDate:
            that.dats.data.userlist.departDate.substring(0, 10) +
            " " +
            that.dats.data.userlist.departTime +
            ":00", //第一段，出发日期
          staffIds: usert, //出行人信息
        };
      } else if (that.isone == false && isbtd == 1) {
        uses = {
          depart: that.dats.data.userlist.depart, //第一段，出发城市
          arrive: that.dats.data.userlist.arrive, //第一段，到达城市
          flightNo: that.dats.data.userlist.no, //航班号
          departDate:
            that.dats.data.userlist.departDate.substring(0, 10) +
            " " +
            that.dats.data.userlist.departTime +
            ":00", //第一段，出发日期
          staffIds: usert, //出行人信息
        };
        usest = {
          depart: that.nums.data.userlist.depart, //第二段，出发城市
          arrive: that.nums.data.userlist.arrive, //第二段，到达城市
          flightNo: that.nums.data.userlist.no, //航班号
          departDate:
            that.nums.data.userlist.departDate.substring(0, 10) +
            " " +
            that.dats.data.userlist.departTime +
            ":00", //第二段，出发日期
          staffIds: usert, //出行人信息
        };
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
              if (JSON.stringify(that.repeatBookingLimit) == "{}") {
                //没有违反政策直接跳到预定页面
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
                  if (i == 7) {
                    //不管控
                    that.notbooking = false;
                  }
                  if (i == 8) {
                    //提示重复但不限定
                    that.idstarle = true;
                    that.bools = true;
                    that.respeatBook.push({
                      name: i,
                      list: that.repeatBookingLimit[i],
                    });
                  }
                  if (i == 9) {
                    //提示且不可预订
                    that.bools = false;
                    that.respeatBook.push({
                      name: i,
                      list: that.repeatBookingLimit[i],
                    });
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
              return;
            }
          } else {
            that.loading = false;
            that.elast(ret.message);
          }
          if (that.isone == false) {
            try {
              const ret = await that.$api.order.ruleCheckRepeatBook(usest); //重复预定规则校验
              if (ret.code == 200) {
                if (JSON.stringify(ret.data.limitNativeRule) != "{}") {
                  that.loading = false;
                  that.elast("不能重复预订！");
                  return;
                }
              } else {
                that.loading = false;
                that.elast(ret.message);
              }
            } catch (e) {
              console.log(e);
              that.loading = false;
            }
          }
        } catch (e) {
          console.log(e);
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
      if (out.substring(out.length - 2) != "+1") {
        return times + " " + out + ":00";
      } else {
        let timet = out.substring(0, 5);
        let dats = new Date(new Date(times).getTime() + 24 * 60 * 60 * 1000);
        let year = dats.getFullYear(); //当前年
        let month =
          dats.getMonth() + 1 < 10
            ? "0" + (dats.getMonth() + 1)
            : dats.getMonth() + 1;
        let day = dats.getDate() < 10 ? "0" + dats.getDate() : dats.getDate();
        return year + "-" + month + "-" + day + " " + timet + ":00";
      }
    },
    async updata() {
      if(this.loadingBot) return
      //申请改签
      let that = this;
      let userlists = that.userlists;
      let citysy = that.dats.data.userlist; //当前航班信息 往
      let citysys = {}; //返
      let limitNativeRules = [];
      if (!this.isone) {
        //往返
        citysys = that.nums.data.userlist;
        limitNativeRules = that.nums.limitNativeRule;
      }
      let prods = [];
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
      let msgErr = this.msgErr; //成本中心校验是否通过
      if (this.isShowChengben == true) {
        if (
          NameCenter.id == ""
          //  &&
          // isbtd == 1 &&
          // this.isarsrl == false &&
          // (isblcks == 2 || isblcks == 4)
        ) {
          that.$message({
            message: "请选择成本审批人！",
            type: "warning",
          });
          return;
        }
        if (
          TravelCostCenlist.length == 0 &&
          // (isblcks == 2 || isblcks == 4) &&
          // isbtd == 1 &&
          // this.isarsrl == false &&
          this.CostCi == true
        ) {
          that.$message({
            message: "请选择成本审批人！",
            type: "warning",
          });
          return;
        }
        if (
          // isbtd == 1 &&
          // this.CostCis == false &&
          // this.CostCi == false &&
          // this.isarsrl == false &&
        isbtd == 1 &&  this.isGetStaffList == true
        ) {
          //除了免审 如没有审批流程将无法进行下单
          that.$message({
            message: "该账户未配置审批流程，请联系管理员进行配置！",
            type: "error",
          });
          return;
        }
        if (
          TravelDepartlist.length == 0 &&
          // (isblcks == 2 || isblcks == 4) &&
          // isbtd == 1 &&
          // this.isarsrl == false &&
          this.CostCis == true
        ) {
          that.$message({
            message: "请选择部门审批人！",
            type: "warning",
          });
          return;
        }
      }
      if (isbtd == 1 &&that.reson == "") {
        that.$message({
          message: "请输入出行事由",
          type: "warning",
        });
        return;
      }
        
      if (user_name == "") {
        that.$message({
          message: "请输入联系人！",
          type: "warning",
        });
        return;
      }
      if (user_ipone == "") {
        that.$message({
          message: "请输入联系电话！",
          type: "warning",
        });
        return;
      }
      if (!ip_test.test(user_ipone)) {
        that.$message({
          message: "请输入正确的电话号码!",
          type: "warning",
        });
        return;
      }
      if (user_remark == "") {
        that.$message({
          message: "请输入改签原因！",
          type: "warning",
        });
        return;
      }
      if (msgErr) {
        that.$message({
          message: msgErr,
          type: "warning",
        });
        return;
      }
        // if (this.getTravelPolicys != null && isbtd == 1) {
        //   if (this.getTravelPolicys.domesticInsuranceProduct == 0) {
        //     if (
        //       !this.insuranceNo && !this.insuranceNos
        //     ) {
        //       //&& this.chineas.index == 0 )
        //       that.$message({
        //         message: "请选择一个保险",
        //         type: "warning",
        //       });
        //       return;
        //     }
        //   }
        // }

        if (that.insuranceNo != "") {
          prods.push(that.insuranceNo + "," + that.profitPriceYis);
        }
        if (that.insuranceNos != "") {
          prods.push(that.insuranceNos + "," + that.profitPriceYans);
        }
      let legList = [];
      legList.push({
        flightNo: citysy.no,
        cabin: that.dats.datw.cabin,
        depAirport: citysy.depart,
        arrAirport: citysy.arrive,
        depTime:
          citysy.departDate.substring(0, 10) + " " + citysy.departTime + ":00",
        arrTime: that.timaout(
          citysy.departDate.substring(0, 10),
          citysy.arriveTime
        ),
        depTerminal: citysy.departs,
        arrTerminal: citysy.arrives,
      });

      if (!this.isone) {
        //往返
        legList.push({
          flightNo: citysys.no,
          cabin: that.nums.datw.cabin,
          depAirport: citysys.depart,
          arrAirport: citysys.arrive,
          depTime:
            citysys.departDate.substring(0, 10) +
            " " +
            citysys.departTime +
            ":00",
          arrTime: that.timaout(
          citysys.departDate.substring(0, 10),
          citysys.arriveTime
        ),

          depTerminal: citysys.departs,
          arrTerminal: citysys.arrives,
        });
      }
      for (var i = 0; i < TravelCostCenlist.length; i++) {
        //成本中心审批人
        apprvTaskStaffts.push({
          deptCost: 2,
          nodeId: TravelCostCenlist[i].nodeId,
          personId: TravelCostCenlist[i].personId,
          staffId: TravelCostCenlist[i].staffId,
          staffName: TravelCostCenlist[i].staffName,
        });
      }
      for (var i = 0; i < TravelDepartlist.length; i++) {
        //部门审批人
        apprvTaskStaffts.push({
          deptCost: 1,
          nodeId: TravelDepartlist[i].nodeId,
          personId: TravelDepartlist[i].personId,
          staffId: TravelDepartlist[i].staffId,
          staffName: TravelDepartlist[i].staffName,
        });
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
          // productKeys: prods,// 改签带保险
          // birthdate: userlists[i].birthdate.substring(0, 10),
        });
      }
      let ists = 0;
      let invs = "";
      if (limitNativeRule.length == 0 && this.dats.data.datw.none == "single") {
        ists = 0;
        invs = "";
      } else {
        invs = JSON.stringify({
          information: [limitNativeRule],
        });
        ists = 1;
      }
      if (this.dats.data.datw.none == "returns") {
        let limitNativeRules = that.nums.limitNativeRule;
        if (!limitNativeRules) {
          ists = 0;
          invs = "";
        } else {
          invs = JSON.stringify({
            information: [limitNativeRule, limitNativeRules],
          });
          ists = 1;
        }
      }
      let dat = {};
				let inst = 0;
				if(this.isblckt == true){//是否超规审批 或者事前需要审批
					inst = this.sttos;
				} else {
					inst = isblcks;
				}
      dat = {
        saleNo: that.dats.data.datw.saleOrderNo, //原销售单号
        tradeNo: that.dats.data.datw.tradeNo, //原交易单号
        voluntarily: "1",
        apprvTaskEntity: {
          agree: false, //是否当前人审批
          taskType: inst, //1为事前2为事中，
          beforeMiddle: 2, //1为事前2为事中
          reasonId: this.reson, //理由
          reason:this.resonText,
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
      };
      this.loadingBot = true;
      try {
        const res = await that.$api.home.applySaleChange(dat); //改签

        if (res.code == 200) {
          that.$message({
            message: "申请改签成功",
            type: "success",
          });
          setTimeout(() => {
            this.$router.push({
              path: "/myorder",
              query: {},
            });
          }, 1000);
        } else {
          that.$message({
            message: res.message,
            type: "error",
          });
        }
        this.loadingBot = false;
      } catch (e) {
        console.log(e);
        this.loadingBot = false;
      }
    },
    cardtype(it) {
      if (it == "身份证") {
        return "NI";
      } else if (it == "护照") {
        return "PP";
      } else if (it == "台胞证") {
        return "TB";
      } else if (it == "港澳通行证") {
        return "GA";
      } else if (it == "回乡证") {
        return "HX";
      } else if (it == "其他证件") {
        return "OS";
      }
    },
    level(ie) {
      if (ie == "经济舱") {
        ie = "Y";
      } else if (ie == "商务舱") {
        ie = "C";
      } else if (ie == "头等舱") {
        ie = "F";
      }
      return ie;
    },
    levelName(ie) {
      if (ie == "Y") {
        ie = "经济舱";
      } else if (ie == "C") {
        ie = "商务舱";
      } else if (ie == "F") {
        ie = "头等舱";
      }
      return ie;
    },
    //提交订单
    async okadd() {
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
        let msgErr = this.msgErr; //成本中心校验是否通过
        for (let i = 0; i < userlists.length; i++) {
          //出行人信息
          if (
            userlists[i].carval == "" &&
            this.value == 1 &&
            this.civilServiceTicket == 1
          ) {
            that.$message({
              message: "请填写开户银行",
              type: "warning",
            });
            return;
          }
        }
        if (isbtd == 2 && this.passengers.length == 0) {
          that.$message({
            message: "请选择出行人",
            type: "warning",
          });
          return;
        }
        if (this.isShowChengben == true) {
          //需要审批时走以下判断
          if (NameCenter.id == "") {
            that.$message({
              message: "请选择成本中心",
              type: "warning",
            });
            return;
          }
          if (TravelCostCenlist.length == 0 && this.CostCi == true) {
            that.$message({
              message: "请选择成本审批人",
              type: "warning",
            });
            return;
          }
          if (TravelDepartlist.length == 0 && this.CostCis == true) {
            that.$message({
              message: "请选择部门审批人",
              type: "warning",
            });
            return;
          }
          if (isbtd == 1&&this.isGetStaffList == true) {
            //除了免审 如没有审批流程将无法进行下单
            that.$message({
              message: "该账户未配置审批流程，请联系管理员进行配置！",
              type: "error",
            });
            return;
            // }else if (that.reson == '' && isbtd == 1 && (isblcks == 2 || isblcks == 4)) {
          }
          if ( isbtd == 1 && that.reson == "") {
            that.$message({
              message: "请输入出行事由",
              type: "warning",
            });
            return;
          }
        }
        // if (
        //   that.reson == "" &&
        //   isbtd == 1 &&
        //   (isblcks == 2 || isblcks == 4)
        // ) {
        if (user_name == "") {
          that.$message({
            message: "请输入联系人",
            type: "warning",
          });
          return;
        }
        if (user_ipone == "" || !ip_test.test(user_ipone)) {
          that.$message({
            message: "请输入正确的联系电话",
            type: "warning",
          });
          return;
        }
        if (
          that.units == "" &&
          this.value == 2 &&
          this.civilServiceTicket == 1
        ) {
          that.$message({
            message: "请填写单位名称",
            type: "warning",
          });
          return;
        }
        if (this.getTravelPolicys != null && isbtd == 1) {
          if (this.getTravelPolicys.domesticInsuranceProduct == 0) {
            if (
              !this.insuranceNo && !this.insuranceNos
            ) {
              //&& this.chineas.index == 0 )
              that.$message({
                message: "请选择一个保险",
                type: "warning",
              });
              return;
            }
          }
        }
        if (msgErr) {
          that.$message({
            message: msgErr,
            type: "warning",
          });
          return;
        }
        if (that.allIsGift) {
          that.profitPriceYans = 0;
          that.profitPriceYi = 0;
          // that.profitPrice = 0;
        }
        if (that.insuranceNo != "") {
          prods.push(that.insuranceNo + "," + that.profitPriceYis);
        }
        if (that.insuranceNos != "") {
          prods.push(that.insuranceNos + "," + that.profitPriceYans);
        }
        
        for (let i = 0; i < userlists.length; i++) {
          //  var cardNo = isbtd == 1 ? userlists[i].cardNo : this.passengers[i].cardNo
          // var cardType = isbtd == 1 ? userlists[i].cardType : this.passengers[i].cardType
      if(isbtd == 1){
       var cardNo = userlists[i].cardNo 
       var cardType = userlists[i].cardType 
      }else{
        for (let k = 0; k < this.passengers.length; k++) {
          if(userlists[i].id == this.passengers[k].userId){
            var cardNo = this.passengers[k].cardNo 
           var cardType = this.passengers[k].cardType 
          }
        }
      }
          //出行人信息
          let Select_phone = "";
          if (userlists[i].phone != "") {
            Select_phone = userlists[i].phone;
          } else {
            Select_phone = userlists[i].telePhone;
          }
          let birthdate = "";
          if (userlists[i].birthdate != null) {
            birthdate = userlists[i].birthdate.substring(0, 10);
          } else {
            birthdate = null;
          }
          if (this.civilServiceTicket == 1) {
            usersalist.push({
              passengerType: "ADT",
              // cardNo: that.scardnno[i],
              // certType: that.scardns[i],
            certNo:cardNo,
            certType:cardType,
              gender: userlists[i].gender,
              name: userlists[i].name,
              birthdate: birthdate,
              passengerPhone: Select_phone,
              historyPassenger: "1",
              productKeys: prods,
            });
          } else {
            usersalist.push({
              passengerType: "ADT",
              // cardNo: that.scardnno[i],
              // certType: that.scardns[i],
            certNo:cardNo,
            certType:cardType,
              gender: userlists[i].gender,
              name: userlists[i].name,
              birthdate: birthdate,
              passengerPhone: Select_phone,
              historyPassenger: "1",
              productKeys: prods,
            });
          }
          passengerList.push({
            certificate: [
              {
                // cardNo: that.scardnno[i],
                // cardType: that.scardns[i],
            cardNo:cardNo,
            cardType:cardType,
              },
            ],
            deptId: userlists[i].deptId,
            deptName: userlists[i].deptName,
            costcenterName:
              this.dats.data.datw.butalist.length > 0
                ? this.dats.data.datw.butalist[i].costcenterName
                : this.passengers[i].costcenterName,
            userId: userlists[i].userId,
            name: userlists[i].name,
            phone: Select_phone,
            employeeType: userlists[i].employeeType,
            id: userlists[i].passengerNo,
          });
        }
        let dat = {};
        let shared = "";
        if (that.dats.data.userlist.shared == true) {
          shared = "0";
        } else {
          shared = "1";
        }
        for (var i = 0; i < TravelCostCenlist.length; i++) {
          //成本中心审批人
          apprvTaskStaffts.push({
            deptCost: 2,
            nodeId: TravelCostCenlist[i].nodeId,
            personId: TravelCostCenlist[i].personId,
            staffId: TravelCostCenlist[i].staffId,
            staffName: TravelCostCenlist[i].staffName,
          });
        }
        for (var i = 0; i < TravelDepartlist.length; i++) {
          //部门审批人
          apprvTaskStaffts.push({
            deptCost: 1,
            nodeId: TravelDepartlist[i].nodeId,
            personId: TravelDepartlist[i].personId,
            staffId: TravelDepartlist[i].staffId,
            staffName: TravelDepartlist[i].staffName,
          });
        }
        let invs = "";
        if (this.trainslis.limitNativeRule.length == 0) {
          ists = 0;
          invs = "";
        } else {
          invs = JSON.stringify({
            information: [this.trainslis.limitNativeRule],
          });
          ists = 1;
        }

        if (this.dats.data.datw.none == "returns") {
          let limitNativeRules = that.nums.limitNativeRule;
          if (limitNativeRules.length == 0) {
            ists = 0;
            invs = "";
          } else {
            invs = JSON.stringify({
              information: [limitNativeRule, limitNativeRules],
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
          one_no: that.dats.data.userlist.no, //第一段，航班号
          one_cabin: that.dats.datw.cabin, //第一段，舱位
          one_serviceLevel: that.dats.datw.level, //第一段舱位服务等级
          one_depart: that.dats.data.userlist.depart, //第一段，出发城市
          one_departTerminal:
            that.dats.data.userlist.departTerminal == null
              ? ""
              : that.dats.data.userlist.departTerminal, //第一段，出发机场航站楼
          one_arrival: that.dats.data.userlist.arrive, //第一段，到达城市
          one_arrivalTerminal:
            that.dats.data.userlist.arriveTerminal == null
              ? ""
              : that.dats.data.userlist.arriveTerminal, //第一段，到达机场航站楼
          one_plane: that.dats.data.userlist.plane, //第一段，机型
          one_meals: that.dats.data.userlist.meals, //第一段，餐食
          one_departDate:
            that.dats.data.userlist.departDate.substring(0, 10) +
            " " +
            that.dats.data.userlist.departTime, //第一段，出发日期that.dats.data.userlist.departDate
          one_departTime: that.dats.data.userlist.departTime, //第一段，出发时间
          one_arrivalTime: that.dats.data.userlist.arriveTime, //第一段，到达时间
          one_taxFee: that.dats.data.userlist.taxFee, //第一段，机建
          one_fuelFee: that.dats.data.userlist.fuelFee, //第一段，燃油
          one_discount: parseInt(that.dats.datw.discount * 100)/10, //第一段公布折扣
          one_sharedBZ: shared, //是否共享航班
          one_mileage: that.dats.data.userlist.mileage,
          one_fdprice: that.facePrice,
          one_office: that.dats.data.userlist.officeNo, //第一段office号
          totalSalePrice: JSON.parse(this.num), // 总价
          yPrice: that.dats.data.userlist.yprice, //第一段，Y舱价格
          cPrice: that.dats.data.userlist.cprice, //第一段，C舱价格
          fPrice: that.dats.data.userlist.fprice, //第一段，F舱价格
          ticketPrice: that.facePrice, //票面价
          one_policyPrice: that.prices, //第1段，小数点价
          one_policyId: that.dats.datw.salePrices[0].policyId,
          one_lastRebateId: that.dats.datw.salePrices[0].lastRebateId,
          one_lastRebateProfitId:
            that.dats.datw.salePrices[0].lastRebateProfitId,
          one_profitConfigId: that.dats.datw.salePrices[0].profitConfigId, //第一段，控润配置ID
          one_nMinSalePrice: that.dats.data.userlist.nMinSalePrice,
          one_nMinSalePriceFlight: that.dats.data.userlist.nMinSalePriceFlight,
          one_nMinSalePriceCabin: that.dats.data.userlist.nMinSalePriceCabin,
          one_nMinSalePriceTime: that.dats.data.userlist.nMinSalePriceTime,
          passengerList: usersalist, //个人信息
          tripPassengerList: passengerList,
          travelBusinessType: isbtd, //因公因私
          contactsName: user_name, //联系人
          contactsPhone: user_ipone, //联系电话
        };
        if (this.civilServiceTicket == 1) {
          dat["verifyWay"] = this.value; //验证方式  0：公务员卡 1：预算单位
          dat["unitName"] = this.units; //预算单位名称
        }
        if (this.dats.datw.priceSource == 1) {
          //1是官方 2是美赢 官方需要追加参数
          dat["one_isWebsite"] = 4; //4代表官方票
          dat["one_isOutCode"] = 9; //9-官网
          dat["one_context"] = this.context; //代表官方票
          dat["one_buyPrice"] = this.settlePrice
        }
        if(this.dats.datw.priceSource == 2){ //外采追加参数

          dat["one_buyPrice"] = that.dats.datw.salePrices[0].buyPrice;
          dat["one_priceId"] = that.dats.datw.priceId;
          dat["one_flightId"] = that.dats.data.userlist.flightId;
        }
        if (this.civilServiceTicket != 1 && this.dats.datw.priceSource != 1) {
          let isOutCode = that.dats.datw.priceSource == 2 ? 10 : 0; // 10-美赢  0-自己家
          dat["one_isOutCode"] = isOutCode;
        }
        if (!this.isone) {
          let returnDat = {
            two_serviceLevel: that.nums.datw.level, //第二段舱位服务等级
            two_mileage: that.nums.data.userlist.mileage,
            two_fdprice: that.returnTicketPrice,
            two_no: that.nums.data.userlist.no, //第二段，航班号
            two_cabin: that.nums.datw.cabin, //第二段，舱位
            two_depart: that.nums.data.userlist.depart, //第二段，出发城市
            two_departTerminal:
              that.nums.data.userlist.departTerminal == null
                ? ""
                : that.nums.data.userlist.departTerminal, //第二段，出发机场航站楼
            two_arrival: that.nums.data.userlist.arrive, //第二段，到达城市
            two_arrivalTerminal:
              that.nums.data.userlist.arriveTerminal == null
                ? ""
                : that.nums.data.userlist.arriveTerminal, //第二段，到达机场航站楼
            two_plane: that.nums.data.userlist.plane, //第二段，机型
            two_meals: that.nums.data.userlist.meals, //第二段，餐食
            two_departDate:
              that.nums.data.userlist.departDate.substring(0, 10) +
              " " +
              that.nums.data.userlist.departTime, //第二段，出发日期
            two_departTime: that.nums.data.userlist.departTime, //第二段，出发时间 that.nums.data.userlist.departTime
            two_arrivalTime: that.nums.data.userlist.arriveTime, //第二段，到达时间
            two_taxFee: that.nums.data.userlist.taxFee, //第二段，机建
            two_fuelFee: that.nums.data.userlist.fuelFee, //第二段，燃油
            two_discount: parseInt(that.nums.datw.discount * 100) / 10, //第二段公布折扣
            two_sharedBZ: shared, //是否共享航班
            two_office: that.nums.data.userlist.officeNo, //第二段office号
            yPrice2: that.nums.data.userlist.yprice, //第二段，Y舱价格
            cPrice2: that.nums.data.userlist.cprice, //第二段，C舱价格
            fPrice2: that.nums.data.userlist.fprice, //第二段，F舱价格
            ticketPrice2: that.returnTicketPrice, //第二段，票面价
            two_policyPrice: that.priceas, //第2段，小数点价
            two_policyId: that.nums.datw.salePrices[0].policyId,
            two_lastRebateId: that.nums.datw.salePrices[0].lastRebateId,
            two_lastRebateProfitId:
              that.nums.datw.salePrices[0].lastRebateProfitId,
            two_profitConfigId: that.nums.datw.salePrices[0].profitConfigId, //第二段，控润配置ID
            two_nMinSalePrice: that.nums.data.userlist.nMinSalePrice,
            two_nMinSalePriceFlight:
              that.nums.data.userlist.nMinSalePriceFlight,
            two_nMinSalePriceCabin: that.nums.data.userlist.nMinSalePriceCabin,
            two_nMinSalePriceTime: that.nums.data.userlist.nMinSalePriceTime,
          };
          dat = { ...dat, ...returnDat }; //将返程得值添加到dat里
          dat.airlineType = 2; //2为往返
        }
						let inst = 0; //1事前审批 2事中审批  3超标审批 4改签审批
						if(this.isblckt == true){//是否超规审批 或者事前需要审批
							inst = this.sttos;
						} else {
							inst = isblcks;
						}
        if (
          (isblcks == 2 && isbtd == 1 && this.trainslis.isarsrl == false) ||
          (isblcks == 1 &&
            isbtd == 1 &&
            this.isarsrl == false &&
            this.isblckt == true)
        ) {
         
          // 因公事中
          dat["apprvTask"] = {
            agree: false, //是否当前人审批
            taskType: inst, //1为事前2为事中，
            beforeMiddle: isblcks, //1为事前2为事中
            totalMoney: this.num,
            reasonId: this.reson, //理由
            reason:this.resonText,
            travelNo: this.dats.data.datw.mokksli.travelNo,
            apprvTaskStaffs: apprvTaskStaffts, //审批人信息
            costId: NameCenter.id, //成本中心id
            costName: NameCenter.name, //成本中心名称
            remark: invs, //超规信息
            vehicleId: this.vehicleId, //事前id
             vehicleIdBack: this.butalist[0].vehicleIdBack, //事前id
           
          };
        } else if (isblcks == 1 && isbtd == 1 && this.isarsrl == false) {
          //事前因公 不免审
          dat["apprvTask"] = {
            taskType:isblcks, //1为事前2为事中，
            totalMoney: this.num,
            beforeMiddle: 1, //
            reasonId: this.reson, //理由
            reason:this.resonText,
            costId: NameCenter.id, //成本中心id
            costName: NameCenter.name, //成本中心名称
            travelNo: this.dats.data.datw.mokksli.travelNo,
            vehicleId: this.butalist[0].vehicleId, //事前id
            vehicleIdBack: this.butalist[0].vehicleIdBack, //事前id
             
          };
        } else if (isbtd == 2 || (isbtd == 1 && this.isarsrl == true)) {
          dat["apprvTask"] = {
            taskType: isblcks, //1为事前2为事中，
            beforeMiddle:isblcks, //1为事前2为事中
            travelNo: this.dats.data.datw.mokksli.travelNo,
            vehicleId: isbtd == 1 ? this.butalist[0].vehicleId : "", //事前id
            vehicleIdBack: isbtd == 1 ? this.butalist[0].vehicleIdBack : "", //事前id
            reasonId:isbtd == 1 ? this.reson :'', //理由
            reason:isbtd == 1 ? this.resonText :'',
          };
        }
        this.loadingBot = true;
        try {
          const res = await that.$api.home.bookTicket(dat); //预定订单
          if(res.data.code == -100 || res.code == -100) return  that.$message({
              message: res.data.message ||  res.message,
              type: "error",
            });

          if (res.data.message[0].code == 1) {
            this.kun = true;
            that.$message({
              message: "创建订单成功",
              type: "success",
            });
            this.loading = false;
            if (isbtd == 2) {
              this.$router.push({
                path: "/Orderdefray",
                query: {
                  data: res.data.message[0].tradeNo,
                },
              });
            } else {
              this.$router.push({
                path: "/myorder",
                query: {},
              });
            }
          } else {
            that.$message({
              message: res.data.message[0].message,
              type: "warning",
            });
          }
          this.loadingBot = false;
        } catch (e) {
          console.log(e);
          this.loadingBot = false;
        }
      } else if (this.codes == "unknown") {
        this.$message.error("验舱验价失败，请重新预订");
      } else {
        this.$message.warning(
          "验舱验价中，请等待！如若长时间未响应请联系客服！"
        );
      }
    },
    retime(item) {
      //时间
      if (item == undefined) {
        return;
      } else {
        return item.substring(0, 2) + "月" + item.substring(3, 5) + "日";
      }
    },
    drawers(its) {
      //点击成本或者部门审批人
      if (its == "TravelCostCenlist") {
        //判断是部门还是成本中心
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
            id: "",
          });
        }
      } else {
        for (let i = 0; i < this.Deparapprover.length; i++) {
          this.apprvCost.push({
            id: "",
          });
        }
      }

      this.drawer = true;
    },
    btn_click() {
      //确定部门或者成本审批人
      let that = this;
      for (let k in this.apprvCost) {
        if (that.apprvCost[k].id == "") {
          that.$message({
            message: "请选择" + (parseInt(k) + 1) + "级审批人",
            type: "warning",
          });
          return;
        }
      }
      if (this.iscost == true) {
        //成本审批人信息
        that.TravelCostCenlist = [];
        for (let k in that.drawelist) {
          for (let i in that.drawelist[k].apprvCostFlowNodePersons) {
            for (let j in that.apprvCost) {
              if (
                that.apprvCost[j].id ==
                that.drawelist[k].apprvCostFlowNodePersons[i].id
              ) {
                that.TravelCostCenlist.push({
                  deptCost: 2,
                  personId: that.apprvCost[j].id,
                  nodeId: that.drawelist[k].apprvCostFlowNodePersons[i].nodeId,
                  staffId:
                    that.drawelist[k].apprvCostFlowNodePersons[i].staffId,
                  staffName:
                    that.drawelist[k].apprvCostFlowNodePersons[i].staffName,
                });
              }
            }
          }
        }
      } else {
        //部门审批人信息
        this.TravelDepartlist = [];
        for (let k in that.drawelist) {
          for (let i in that.drawelist[k].apprvDeptFlowNodePersons) {
            for (let j in that.apprvCost) {
              if (
                that.apprvCost[j].id ==
                that.drawelist[k].apprvDeptFlowNodePersons[i].id
              ) {
                that.TravelDepartlist.push({
                  deptCost: 1,
                  personId: that.apprvCost[j].id,
                  nodeId: that.drawelist[k].apprvDeptFlowNodePersons[i].nodeId,
                  staffId:
                    that.drawelist[k].apprvDeptFlowNodePersons[i].staffId,
                  staffName:
                    that.drawelist[k].apprvDeptFlowNodePersons[i].staffName,
                });
              }
            }
          }
        }
      }
      that.drawer = false;
    },
    async getBrokerage() {
      //火车票单人手续费
      try {
        if (this.isone == true) {
          this.onprice =
            this.trainslis.datw.salePrices[0].parPrice * this.userlists.length +
            (this.trainslis.data.userlist.taxFee +
              this.trainslis.data.userlist.fuelFee) *
              this.userlists.length;
        } else {
          this.onprice =
            this.trainslis.datw.salePrices[0].parPrice * this.userlists.length +
            (this.trainslis.data.userlist.taxFee +
              this.trainslis.data.userlist.fuelFee) *
              this.userlists.length +
            (this.nums.datw.salePrices[0].parPrice * this.userlists.length +
              (this.nums.data.userlist.taxFee +
                this.nums.data.userlist.fuelFee) *
                this.userlists.length);
        }
      } catch (e) {
        console.log(e);
      }
    },
    handleChange(value) {
      //选择成本中心
      // let nodesObj = this.$refs["cascader"].getCheckedNodes(); //获取当前节点的信息
      // this.NameCenter.name = nodesObj[0].data.text;
      // this.NameCenter.id = nodesObj[0].data.id;
      if (value) {
        // 点击切换的时候替换选中的值
        this.NameCenter.name = this.treeLists.find(
          (item) => item.id == value[0]
        ).text
        this.NameCenter.id = value[value.length - 1];
        // console.log("NameCenter",this.NameCenter.id)
        // this.appswlist(); //重新获取部门和成本中心审批人
      }

      this.TravelCostCenlist = [];
      this.TravelDepartlist = [];
      this.appswlist(); //重新获取部门和成本中心审批人
    },
    async appswlist() {
      //选获取部门和成本审批人信息
      let that = this;
      let nuarry = [];
      let nus = that.butalist; //出差人的集合
      for (var i = 0; i < nus.length; i++) {
        nuarry.push(nus[i].passengerNo); //获取出行人员id
      }
      that.loading = true;
      let res;
      try {
        res = await that.$api.home.getStaffList({
          costId: that.NameCenter.id,
          passengerNos: nuarry,
          // applyType: 1,
          applyType:
          that.isblckt == true
              ? that.sttos
              : that.isblcks,
        });
        that.loading = false;
        if (res.code == 200) {
          if (res.data.deptStaffs.length == 0) {
            //是否有部门审批人
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
          this.msgErr = "";
          that.isGetStaffList = false
        } else if (res.code == "-100") {
          that.isGetStaffList = true;
          this.msgErr = res.message ? res.message : "系统错误";
        } else {
          this.msgErr = res.message ? res.message : "系统错误";
        }
      } catch (e) {
        console.log(e);
        this.msgErr = "系统错误";
        that.loading = false;
      }
    },
    selts() {
      //查询成本中心
      let _this = this;
      _this.loading = true;
      _this.$api.home
        .getCostCenterList()
        .then((res) => {
          _this.loading = false;
          if (res.code == 200) {
            _this.treeLists = res.data[0].children;
            if (!this.isarsrl && (this.isblcks == 1 )) {
            // 成本中心二次审批 成本中心参数值回填
              this.selectedOptions3 =selectedOptions([this.trainslis.data.datw.mokksli.costId],res.data[0].children)
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
    async userliste() {
      let that = this;
      let st = [];
      this.userlists = [];
      if (this.isblcks == 4) {
        //改签状态下不能修改乘客证件
        for (let i = 0; i < this.butalist.length; i++) {
          this.userlists.push({
            phone: this.butalist[i].phone,
            name: this.butalist[i].name,
            certType: this.butalist[i].certType,
            certNo: this.butalist[i].certNo,
          });
        }
      } else {
        if (this.isbtd == 1) {
          if (
            this.butalist[0].vehicleId != undefined &&
            this.butalist.length != 0
          ) {
            this.vehicleId = this.butalist[0].vehicleId; //事前id
          }
          if (
            this.butalist[0].vehicleIdBack != undefined &&
            this.butalist.length != 0
          ) {
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
        const res = await that.$api.home
          .getPassengerListByNos(st)
          .catch((e) => (that.loading = false));
        if (res.code == 200) {
          that.loading = false;
          that.selts();
          that.carld = res.data.cardTypeList; //证件类型
          let userli = res.data.passList; //用户信息
          for (let i = 0; i < userli.length; i++) {
            userli[i]["carval"] = "";
            if (
              posPattern.test(userli[i].certificateList[0].firstName) &&
              posPattern.test(userli[i].certificateList[0].lastName)
            ) {
              if (
                userli[i].certificateList[0].firstName != null &&
                userli[i].certificateList[0].lastName != null
              ) {
                userli[i].name = userli[i].certificateList[0].firstName;
                "/" + userli[i].certificateList[0].lastName;
              }
            } else {
              userli[i].name =
                userli[i].certificateList[0].firstName +
                userli[i].certificateList[0].lastName;
            }
            // that.scardns[i] = userli[i].certificateList[0].cardType;
            // that.scardnno[i] = userli[i].certificateList[0].cardNo;
          }
          for (let i = 0; i < userli.length; i++) {
            for (let k = 0; k < userli[i].certificateList.length; k++) {
              userli[i].certificateList[k]["cardTypename"] = that.caname(
                userli[i].certificateList[k].cardType
              );
            }
          }
          // that.userlists = userli;
       
          this.init(userli)
         
        } else {
          that.loading = false;
        }
      }
    },
    init(userli){
      var car = ''
      var val = ''
      var valFlag = ''
      for (let i = 0; i < userli.length; i++) {
        // var pass = userli[i]
        userli[i].cardNo = userli[i].certificateList[0].cardNo
        userli[i].cardType = userli[i].certificateList[0].cardType
        val = catypeEn(userli[i].certificateList[0].cardType)+'  ' + userli[i].certificateList[0].cardNo
        valFlag = catypeEn(userli[i].certificateList[0].cardType)+'  ' + numberPapers(userli[i].certificateList[0].cardNo)
        // valFlag = val
        // this.$set(userli[i],'val',val) // 默认选择第一个证件
        userli[i]["val"] = val
        userli[i]["valFlag"] = valFlag
        for (let k = 0; k < userli[i].certificateList.length; k++) {
            car = catypeEn(userli[i].certificateList[k].cardType)+'  ' + numberPapers(userli[i].certificateList[k].cardNo)
            userli[i].certificateList[k] = {...userli[i].certificateList[k],'car':car}
            this.$set(userli[i].certificateList[k],'car',car)
        }
      }
      this.userlists = userli;
    },
      // 切换证件信息  并且改变数据里面的值
    certifChang(value){
        for (let i = 0; i < this.userlists.length; i++) {
          for (let k = 0; k < this.userlists[i].certificateList.length; k++) {
            if( this.userlists[i].certificateList[k].id == value){
                      this.userlists[i].cardNo = this.userlists[i].certificateList[k].cardNo
                      this.userlists[i].cardType = this.userlists[i].certificateList[k].cardType
            }
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
    },
    // 清除保险后，保险价格清0,总计去掉保险价格,保险insCODE字段清空
    // clearVal1() {
    //   this.profitPriceYi = -2
    //   // var that = this
    //     // that.profitPriceYis = 0;
    //     //   that.insuranceNo = ''
    // this.commit()
    // },
    // clearVal2() {
    //   this.profitPriceYan = -1
    //   // console.log("profitPriceYi-----",this.profitPriceYi)
    //   // var that = this
    //   //   that.profitPriceYans = 0;
    //   // that.insuranceNos = ''
    // this.commit()
    //   // this.insCode = ''
    // },
			chineseChanges(e) { //低价政策
				this.chiness.index = e.detail.value;
			},
      cits_btn() { //继续预定
				if (this.idstarle && this.rulesReasons[this.chines.index].chineseDesc == '') {
					this.$message.warning('请选择高价超规原因')
				} else {
					let datlist = {}
					if (this.idstarle) {
						for (let k in this.repeatBookingLimit) { //高价政策
							if (k == 8) {
								this.repeatBookingLimit[k] = {
									usernames: this.repeatBookingLimit[k],
									reasons: this.rulesReasons[this.chines.index].chineseDesc
								}
							}
						}
					}
					Object.assign(this.limitNativeRule, {
						repeatBookingLimit: this.repeatBookingLimit
					})
					
					if (this.MentionChange == 1) {
						this.okadd(); //跳转提交
					} else {
						this.updata(); //跳转改签
					}
				}
			},
      // 保险须知
    dialogClick(data){
      this.insurancesData = data
      this.dialogVisible = true
    },
    // 出差事由
    reasonChang(val){
      this.resonText = this.reasonData.find(item=>item.id == val).reason
      this.reson = this.reasonData.find(item=>item.id == val).id
    },

  },
};
</script>

<style scoped lang="less">
body,
html {
  font-family: MicrosoftYaHei;
}

.trainadd {
  width: 100%;

  .price {
    color: #ff6600;
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
    color: #ffffff;
    background: #007aff;
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
            min-width: 100px;
            text-align: center;
            line-height: 50px;
            font-size: 14px;
          }

          .tr-select {
            width: 300px;
          }

          .jiage {
            line-height: 40px;
            color: #ff6600;
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
              border: 1px solid #dcdfe6;
              color: #606266;
              line-height: 38px;
              display: flex;
              font-size: 14px;

              span {
                margin: 0 3px;
              }
              .noTest {
                color: #e5e5e5;
              }
            }

            input {
              margin-left: 30px;
              text-indent: 30px;
              font-size: 28px;
              border: 1px solid #c0c0c0;
              border-radius: 10px;
            }

            .absts {
              margin-left: 4px;
              position: absolute;
              top: 40px;
              left: ;
              width: 200px;
              background-color: #ffffff;
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
              border-color: #409eff;
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
          .userbox {
            display: flex;
            flex-wrap: wrap;
            width: 700px;
            .tr_rights_user {
              cursor: pointer;
              width: 320px;
              height: 40px;
              background: #ffffff;
              // border: 1px solid #dcdfe6;
              border-radius: 4px;
              font-size: 14px;
              margin-right: 10px;
              margin-bottom: 10px;
              display: flex;
              align-items: center;
              .tr_rights_uName {
                text-align: center;
              }

              .tr_rights_uCardNo {
                // margin: 8px 0 0 12px;
                color: #333333;
                .mixin_displayBox(@jc:flex-start);
                // padding-left:10px ;
                .s-color {
                  color: #dcdfe6;
                  padding:0 10px ;
                }
              }
            }
              .tr_rights_chang{
                width: max-content;
                padding:0 10px;
                background: #f5f7fa;
              }
          }
        }
        .titleClass{
          color:#ff6600 ;
          padding: 0 36px;
          font-size: 14px;
          margin-bottom: 20px;
        }
        .insBox{
          display: flex;
          flex-direction: column;
          &>div{
            display: flex;
            &>div:nth-child(2){
                display: flex;
            }
          }
        .tr_rights_bor_data {
              display: flex;
              margin-left: 101px;
              ._bor_data_brief {
                font-size: 12px;
                color: #666;
                display: flex;
                & > span:nth-child(2) {
                  margin: 0 10px;
                }
                .amount {
                  color: #ff6600;
                }
              }
              ._bor_data_clause {
                font-size: 12px;
                color: #666;
                margin-left: 30px;
                cursor: pointer;
                &>span{
                  color:#409eff ;
                }
              }
            }

        }
      }

      .trsbt {
        margin-top: 10px;
        padding: 10px;
        background: #f9fbfd;

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
            color: #78879d;
            line-height: 30px;
          }

          .trainsc_s {
            width: 60%;
            padding: 0 5%;
            display: flex;
            align-items: center;

            .trainsc_s_l {
              // width: 100px;
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
                // max-width: 100px;
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
              background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAAAGCAYAAABQM8l6AAAAAXNSR0IArs4c6QAAAJ9JREFUOBFjYBgFRIXApfsv067dey+PSzETLolRcdQQYGJg/PmX4cfZy/deuqHKQHijAYktVLCI/Wf+f+T/fwZhBob/2y/fe1H9//9/RmRljFfuvgxGFhhl4w6Bf4z/FjH8Z+ACqWBkZNzM9Z8tVllZ6COYf+nu8/+4tY7K4AsBRgbGO8AQDdZVEr/EePnu8x/4FI/K4Q8BYAb/BlSRDgAVIS7yFUG6BwAAAABJRU5ErkJggg==")
                bottom no-repeat;
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
              color: #0db36f;
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
        background-color: #ffffff;
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
        background-color: #cccccc;
        opacity: 0.6;
        z-index: 9922;
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
          color: #3c85fd;
          font-size: 22px;
        }
      }

      .tslist {
        margin: 0px 18px;
        height: 50px;
        font-size: 15px;
        color: #3b4f62;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #edf0f5;
      }

      .tslists {
        width: calc(100% - 80px);
        margin: 10px 40px;
        height: 50px;
        font-size: 22px;
        color: #3b4f62;
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
        color: #ffffff;
        background: #409eff;
      }
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
        z-index: 2006;
        display: flex;
        align-items: center;
        justify-content: center;

        .stalist {
          width: 100%;
          border-radius: 20px;
          font-size: 35px;
          line-height: 90px;
          background: #f1f1f1;

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
                  border: 2px solid #ffffff;
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
                      font-size: 18px;
                      justify-content: center;
                      .styli_left {
                        // width: 25%;
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                      }

                      .styli_right {
                        // width: 75%;
                        margin-left: 5%;
                          width: 50%;
                         display: flex;
                         align-items: center;
                        .wors {
                        
                          font-size: 30px;
                          height: 50px;

                          // picker {
                          //   border: #007aff solid 1px;
                          // }
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
              background: #ffffff;
              border-bottom-left-radius: 15px;
              cursor: pointer;
            }

            .btnok {
              flex: 1;
              height: 90px;
              border-bottom-right-radius: 15px;
              color: #ffffff;
              background: linear-gradient(to right, #4e92fd 0%, #6e46fe 100%);
              cursor: pointer;
            }
          }
        }
      }
      
</style>
