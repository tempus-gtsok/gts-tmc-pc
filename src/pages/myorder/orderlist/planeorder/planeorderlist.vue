<template>
  <div class="hoteorder" v-loading="loading">
    <div class="hotboxs">
      <img src="../../../../../static/image/left.png" alt="">
      <div class="orderNum">单号：<span>{{ codes }}</span></div>
      <div class="trbtend">
        <div class="statusx">
          <img :src="conpan(orderStatus)" alt="">
        </div>
      </div>

    </div>
    <div class="hotbox">
      <div class="hotbox_list" v-for="(item,index) in orderDetailListy" :key="index">
        <div class="hotbox_list_left">
          <div>
            <div class="sqd_jp"><img src="../../../../../static/image/sqd_jp.png"/></div>
            <div class="go" v-if="index == 0" style="width: 5%;"><img src="../../../../../static/image/home/go.png"/>
            </div>
            <div class="go" v-if="index == 1" style="width: 5%;"><img
                src="../../../../../static/image/home/return.png"/></div>

            <div class="departTime">
              {{ item.voyages[0].departTime.substring(0, 10) }}
            </div>
            <div class="departTime">
              {{ item.voyages[0].departTime.substring(10, 16) }}
            </div>
          </div>
          <div style="display: flex;color: #999999;text-indent: 20px;">
            <div class="hotData"
                 v-if="userslist.tr.orderDetailList.length == '1' && userslist.tr.orderDetailList[0].voyages.length != '2'">
              <span
                  v-if="item.voyages[0].discount!='1'">舱位：{{
                  companys(item.voyages[0].serviceLevel)
                }}{{ item.voyages[0].discount }}折</span>
              <span v-else>舱位：{{ companys(item.voyages[0].serviceLevel) }} 全价</span>
              <span>机建￥{{ item.passengers[0].fareInfos[0].taxFee }} X {{ userlist.length }}</span>
              <span>燃油￥{{ item.passengers[0].fareInfos[0].fuelFee }} X {{ userlist.length }}</span>
              <span
              >票价￥{{ item.passengers[0].fareInfos[0].salePrice - item.passengers[0].fareInfos[0].tips }}
								X {{ userlist.length }}</span>
            </div>
            <div class="hotData"
                 v-if="userslist.tr.orderDetailList.length == '1' && userslist.tr.orderDetailList[0].voyages.length == '2'">
              <span
                  v-if="item.voyages[0].discount!='1'">舱位：{{
                  companys(item.voyages[0].serviceLevel)
                }}{{ item.voyages[0].discount }}折</span>
              <span v-else>舱位：{{ companys(item.voyages[0].serviceLevel) }} 全价</span>
              <span>机建￥{{ item.passengers[0].fareInfos[0].taxFee }} X {{ userlist.length }}</span>
              <span>燃油￥{{ item.passengers[0].fareInfos[0].fuelFee }} X {{ userlist.length }}</span>
              <span
              >票价￥{{ item.passengers[0].fareInfos[index].salePrice - item.passengers[0].fareInfos[index].tips }}
								X {{ userlist.length }}</span>
            </div>
            <div class="hotData" v-if="userslist.tr.orderDetailList.length == '2'">
              <span
                  v-if="item.voyages[0].discount!='1'">舱位：{{
                  companys(item.voyages[0].serviceLevel)
                }}{{ item.voyages[0].discount }}折</span>
              <span v-else>舱位：{{ companys(item.voyages[0].serviceLevel) }} 全价</span>
              <span>机建￥{{ item.passengers[0].fareInfos[0].taxFee }} X {{ userlist.length }}</span>
              <span>燃油￥{{ item.passengers[0].fareInfos[0].fuelFee }} X {{ userlist.length }}</span>
              <span
              >票价￥{{ item.passengers[0].fareInfos[0].salePrice - item.passengers[0].fareInfos[0].tips }}
								X {{ userlist.length }}</span>
            </div>
          </div>
        </div>

        <div class="hotbox_list_right">
          <div class="departTerminal">
            <span style="">{{ citys(item.voyages[0].depart) }}{{ item.voyages[0].departTerminal }}</span>
          </div>
          <div class="airline">
            <div>
              {{ company(item.voyages[0].airline) }}{{ item.voyages[0].flightNo }}
            </div>
            <img src="../../../../../static/image/jiantou.png" alt="">
            <div style="font-size: 14px; color: #333333;">
              {{ item.voyages[0].flightNo }}
            </div>
          </div>
          <div class="departTerminal">
            <span>{{ citys(item.voyages[0].arrive) }}{{ item.voyages[0].arriveTerminal }}</span>
          </div>
        </div>
      </div>
      <div class="airPassenger">
        <div class="airText">乘机人信息</div>
        <div class="airPasseData">
          <div class="airPasseList" v-for="(item,indexs) in userlist" :key="indexs">
            <div>
              <span class="num">{{ indexs + 1 }}</span>
              <span>乘机人姓名：</span>
              <span>{{ item.it.name }}</span>
            </div>
            <div>
              <span>{{ catype(item.it.cardType) }}：</span>
              <span>{{ item.it.cardNo }}</span>
            </div>
            <div>
              <span>手机号：</span>
              <span>{{ item.it.phone }}</span>
            </div>
            <div v-if="item.icke == 1 || item.icke == 3">
              <span>往：</span>
              <span>{{ item.itd.statusname }}</span>
            </div>
            <div v-if="item.icke == 3">
              <span>返： </span>
              <span>{{ item.isd.statusname }}</span>
            </div>
            <div v-if="item.it.fareInfos[0].ticketNo != null">
              <span>票号：</span>
              <span>{{ item.it.fareInfos[0].ticketNo }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hotbox" style="padding-top: 40px;" v-if="splog.length > 0 && typename == 1">
      <div class="lefbox">审批日志</div>
      <div class="soclass">
        <div>顺序</div>
        <div>审批时间</div>
        <div>审批人</div>
        <div>审批结果</div>
        <div>审批方式</div>
        <div>备注信息</div>
      </div>
      <div class="soclass" v-for="(item,index) in splog" :key="index">
        <div>{{ index + 1 }}</div>
        <div><span v-if="item.modifyTime != null">{{ item.modifyTime }}</span></div>
        <div>{{ item.staffName }}</div>
        <div>
          <span v-if="item.status == 0">待审批</span>
          <span v-if="item.status == 1" style="color: #409EFF;">审批通过</span>
          <span v-if="item.status == 3" style="color: red;">审批驳回</span>
        </div>
        <div>
          <span v-if="item.stplis == 1">成本审批</span>
          <span v-if="item.stplis == 2">部门审批</span>
        </div>
        <div>{{ item.remark }}</div>
      </div>
    </div>
    <div class="hotbox orderOperation" v-if="usersnamelist.length > 0">
      <div class="lefbox">订单操作</div>
      <div class="perText" v-if="usersnamelist.length > 0">可操作人员：</div>
      <div class="lecheckd">
        <el-checkbox-group v-model="checkList">
          <div v-for="(item,index) in usersnamelist" :key="index" style="display: flex;flex-direction: column;">
            <el-checkbox :label="item">
              <p class="ordrePerData">
                <span>{{ item.name }}</span>
                <span>{{ catype(item.cardType) }}：{{ item.cardNo }}</span>
                <span>手机号：{{ item.phone }}</span>
              </p>
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
    </div>
    <div class="hotbox orderPay" v-if="userslist.tr != null">
      <div class="lefbox">支付信息</div>
      <div class="payData">
        <div class="tlement">支付方式：{{ settlement(tlement) }}</div>
        <div class="payStatus">
          <span> 订单总额：<p>￥</p><p>{{ amount }}</p> </span>
          <span>支付状态：{{ this.pustatus(this.payStatus) }}</span>
          <div class="hotboxse">
            <div>
              <div class="past">
                <div
                    v-if="userslist.tr.orderDetailList.length == '1' && userslist.tr.orderDetailList[0].voyages.length == '2'">
                  <span>
                    往：基建/燃油：
                    ￥{{
                      userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].taxFee
                    }}/{{ userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].fuelFee }}
                  </span>
                  <span>
                    &nbsp;&nbsp;&nbsp;&nbsp;返：基建/燃油：
                    ￥{{
                      userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].taxFee
                    }}/{{ userslist.tr.orderDetailList[0].passengers[0].fareInfos[1].fuelFee }}
                  </span>
                </div>
                <div v-if="userslist.tr.orderDetailList.length == '2'">
                  <span>
                    往：基建/燃油：
                    ￥{{
                      userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].taxFee
                    }}/{{ userslist.tr.orderDetailList[1].passengers[0].fareInfos[0].fuelFee }}
                  </span>
                  <span>
                    &nbsp;&nbsp;&nbsp;&nbsp;返：基建/燃油：
                    ￥{{
                      userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].taxFee
                    }}/{{ userslist.tr.orderDetailList[1].passengers[0].fareInfos[0].fuelFee }}
                  </span>
                </div>
                <div
                    v-if="userslist.tr.orderDetailList.length == '1' && userslist.tr.orderDetailList[0].voyages.length == '2'">
                  <div>
                    <span>去程：￥{{
                        userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].salePrice - userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].tips
                      }}</span>
                    返程：￥{{
                      userslist.tr.orderDetailList[0].passengers[0].fareInfos[1].salePrice - userslist.tr.orderDetailList[0].passengers[0].fareInfos[1].tips
                    }}
                  </div>
                </div>
                <div v-if="userslist.tr.orderDetailList.length == 2">
                  <div>
                    <span>去程：￥{{
                        userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].salePrice - userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].tips
                      }}</span>
                    返程：￥{{
                      userslist.tr.orderDetailList[1].passengers[0].fareInfos[0].salePrice - userslist.tr.orderDetailList[1].passengers[0].fareInfos[0].tips
                    }}
                  </div>
                </div>
                <div sttle="display:flex">保险：
                  <div
                      v-if="(userslist.tr.orderDetailList.length == '1' || userslist.tr.orderDetailList.length == '2') && insuranceInfos == null">
                    <div>
                      ￥0
                    </div>
                  </div>
                  <div v-if="userslist.tr.orderDetailList.length == '1' && insuranceInfos != null"
                       v-for="(item,index) in insuranceInfos"
                       :key="index">
                    <div>
                      ￥{{ item.pretium }}
                    </div>
                  </div>
                  <div v-if="userslist.tr.orderDetailList.length == '2' && insuranceInfos != null"
                       v-for="(item,index) in insuranceInfos"
                       :key="index">
                    <div>
                      ￥{{ item.pretium }}
                    </div>
                  </div>
                </div>
                <div>
                  <span
                  >往：服务费：￥{{ userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].tips * userlist.length }}</span>
                  <span
                      v-if="userslist.tr.orderDetailList.length == '1' && userslist.tr.orderDetailList[0].voyages.length == '2'">
                    返：服务费：￥{{
                      userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].tips * userlist.length
                    }}</span>
                  <span
                      v-if="userslist.tr.orderDetailList.length == '2'"> 返：服务费：￥{{
                      userslist.tr.orderDetailList[1].passengers[0].fareInfos[0].tips * userlist.length
                    }}</span>
                </div>
                <div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <defray class="wxPay" business-type="1" product-type="4" :record-no=codes :amount=amount :entryMethod=EntryMethod
              :pay-status="payStatus"
              v-if="((payStatus == 2 && orderStatus != 6 && orderStatus != 7) || payStatus == 1 && typename == 2 && orderStatus != 6&& orderStatus != 7)||(typename == 1 && tlement == 1 && orderStatus != 6&& orderStatus != 7)"></defray>
      <div class="boxbtn boxbtn_one" v-for="(item,indexs) in orderDetailListy" :key="indexs"
           v-if="item.stkus && item.mainDetail.orderStatus == '5' && indexs == 0">
        <div class="" style="display: flex;">
          <div class="tkbts" v-if="rotes('tms:dps:refund:list')" @click="updatas(2,item,indexs)">申请退票</div>
          <div class="tkbts" v-if="rotes('tms:dps:change:list')" @click="updatas(1,item,indexs)">申请改签</div>
          <span v-if="indexs == 0" style="color: #007AFF;">
						往
					</span>
        </div>
      </div>
      <div class="boxbtn boxbtn_one" v-for="(item,indexs) in orderDetailListy" :key="indexs"
           v-if="item.stkus && item.mainDetail.orderStatus == '5' && indexs == 1">
        <div class="" style="display: flex;">
          <div class="tkbts" v-if="rotes('tms:dps:refund:list')" @click="updatas(2,item,indexs,2)">申请退票</div>
          <div class="tkbts" v-if="rotes('tms:dps:change:list')" @click="updatas(1,item,indexs,1)">申请改签</div>
          <span v-if="indexs == 1" style="color: #007AFF;">
						返
					</span>
        </div>
      </div>

      <div class="boxbtn" v-if="usersli && userslist.tr.orderDetailList[0].mainDetail.orderStatus == '5'">
        <div class=""
             style="display: flex;">
          <div class="tkbts" v-if="rotes('tms:dps:refund:list')" @click="updataslist(2)">往返申请退票</div>
          <div style="margin-left:10px" class="tkbts" v-if="rotes('tms:dps:change:list')" @click="updataslist(1)">
            往返申请改签
          </div>
        </div>
      </div>
      <div class="boxbtn">
        <div class="nobts" v-if="isclose">
          <div class="disabBott" type="text" v-if="rotes('tms:dps:list:cancel')" @click="dialogFormVisible = true">
            取消订单
          </div>
          <el-dialog title="取消订单" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="请选择" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择">
                  <el-option label="取消订单并取消座位" value="1"></el-option>
                  <el-option label="取消订单并保存座位" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="opclose()">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="retunbts" @click="retuns">返回</div>
      </div>
    </div>
    <div class="information">
      <div class="mask" v-if="companyi_click" @click="companym_clicks">
      </div>
      <div class="popups" v-if="phone_click">
        <div class="cell_phone_number">退票信息</div>
        <div class="cell_phone">选择退票类型：
          <template>
            <el-radio v-model="radio" label="2">退票</el-radio>
          </template>
        </div>
        <div class="cell_phone">是否自愿退票：
          <template>
            <el-radio v-model="radios" label="1">自愿退票</el-radio>
            <el-radio v-model="radios" label="2">非自愿退票</el-radio>
            <el-radio v-model="radios" label="3">异常订单退票</el-radio>
          </template>
        </div>
        <div class="cell_phone">是否取消PNR：
          <template>
            <el-radio v-model="radis" label="0">是</el-radio>
            <el-radio v-model="radis" label="1">否</el-radio>
          </template>
        </div>
        <div class="trstp">
          <div class="tr_ul">
            <div class="tr_uleft">归属部门：</div>
            <div class="tr_rights">
              <el-input v-model="attdepartment" :disabled="true" placeholder="请输入联系人姓名"></el-input>
            </div>
          </div>
          <div class="tr_ul">
            <div class="tr_uleft">成本中心：</div>
            <div class="tr_rights">
              <el-cascader style="width: 200px;" ref="cascader" :show-all-levels="false" @change="handleChange"
                           :props='bots'
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
        <el-drawer :visible.sync="drawer" :with-header="false">
          <div class="ditrslist">
            <div class="ditrslists" v-for="(item,index) in drawelist" :key="index">
              <div style="margin-right: 10px;font-size: 15px;">{{ index + 1 }}级审批人:</div>
              <div>
                <el-select v-model="apprvCost[index].id" placeholder="请选择">
                  <el-option v-for="items in item.apprvCostFlowNodePersons" :key="items.id"
                             :label="items.staffName"
                             :value="items.id">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="addpalist" @click="btn_click">选好了</div>
        </el-drawer>
        <div class="cell_phone">选择废退原因：
          <template>
            <el-select v-model="value" v-if="radios == '1'" placeholder="请选择">
              <el-option v-for="item in optione" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="value" v-if="radios != '1'" placeholder="请选择">
              <el-option v-for="item in optionss" :key="item.values" :label="item.labels" :value="item.values">
              </el-option>
            </el-select>
          </template>
        </div>
        <div class="cell_phone">退票原因：
          <el-input v-model="resons" placeholder="请输入退票原因">
          </el-input>
        </div>
        <div class="cell_phone">备注：
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
          </el-input>
        </div>
        <div class="cell_phone" style="display: flex;">上传附件：
          <div style="width: 80px;height: 80px;margin-left: 30px;">
            <el-upload class="avatar-uploader" :action="action" :show-file-list="false"
                       :accept="'image/*'" :headers="{AuthToken:tokens}" :on-success="handleSuccess"
                       :on-error="handleError"
                       :before-upload="handleBeforeUpload" :on-progress="handleProgress">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <button class="cancel" :disabled="disa" @click="companym_click">申请退票</button>
      </div>
    </div>
  </div>
</template>

<script>
import airports from '../../../../../static/js/airports.js'
import Defray from "@/components/common/defray";

export default {
  components: {
    Defray
  },
  data() {
    return {
      tokens: '',
      imageUrl: '', //照片路径
      optione: [{
        value: '选项1',
        label: '客人自愿按照客规'
      }, {
        value: '选项2',
        label: '起飞前退20%'
      }, {
        value: '选项3',
        label: '航班取消，办理全退'
      }, {
        value: '选项4',
        label: '其他'
      }],
      optionss: [{
        values: '选项1',
        labels: '生病证明不扣'
      }, {
        values: '选项2',
        labels: '其他'
      }],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      value: '',
      values: '',
      maoid: '1',
      radio: '2',
      radios: '1',
      radis: '0',
      textarea: '',
      disa: false,
      resons: '', //退票原因
      checkList: [], //选中人员
      userlist: [], //出行人信息
      isclose: false,
      usersli: false, //是否可以退票和改签
      ists: false, //是否能退票
      isgs: false, //是否能改签
      drawelist: [],
      apprvCost: [],
      insuranceInfos: [],
      companyi_click: false, //遮盖层
      phone_click: false,
      drawer: false,
      bots: { //使用props替换掉本来默认的lable和value 的键值
        value: 'id',
        label: 'text'
      },
      NameCenter: { //当前选择成本中心
        name: '',
        id: ''
      },
      treeLists: [], //成本中心
      hang: [],
      TravelDepartlist: [], //部门审批人
      TravelCostCenlist: [], //成本中心审批人
      CostCi: false, //是否有成本审批人
      CostCis: false, //是否有部门审批人
      Deparapprover: [], //部门审批人
      CostCenterlist: [], //成本审批人
      iscost: true, //true为成本中心false为部门
      address: [], //城市
      dialogVisible: false,
      loading: false,
      splog: [], //审批日志
      codes: '', //飞机票id
      plsitsti: {}, //飞机票详情
      userslist: {}, //飞机票详情
      amount: '999', //总价
      apprvTaskStatu: '', //因公审核状态0待审核 1审核中2审核通过
      attdepartment: JSON.parse(sessionStorage.getItem('userinfo')).deptName, //默认部门
      orderStatus: '', //订单状态
      orderStatuse: '', //订单状态
      payStatus: '',
      apprvTaskReason: '出差事由', //出差事由
      tlement: 0, //1为现结2为月结
      RuleMas: false, //当前用户是否免审
      sione: true, //改单程还是往返
      shos: false,
      orderDetailListy: [],
      isttype: 0,
      RuleMa: '',
      saleOrderNo: '',
      typename: '',
      isnum: 0,
      usersnamelist: [],
      odllegList: [],
      applylist: {},
      EntryMethod: '',
      ticketNo: '', //票号
      action: ''
    };
  },
  mounted() {
    this.EntryMethod = this.$route.query.EntryMethod;
    this.codes = this.$route.query.data; //获取上个页面传入的参数
    this.tokens = JSON.parse(sessionStorage.getItem('userinfo')).token;
    this.action = sessionStorage.getItem('root') + "/tms/api/user/uploadPassengerImage";
    this.searchhoter();
    this.queryAirlineList();
  },
  methods: {
    /*---------------------*/
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
    passlist() {
      let list = this.userslist.tr.orderDetailList[0];
      this.odllegList = []; //当前航班信息
      this.usersnamelist = []; //当前可操作用户
      let voyages = list.voyages;
      for (let i = 0; i < voyages.length; i++) {
        this.odllegList.push({
          flightNo: voyages[i].flightNo,
          cabin: voyages[i].cabin,
          depAirport: voyages[i].depart,
          arrAirport: voyages[i].arrive,
          depTime: this.timels(voyages[i].departTime),
          arrTime: this.timels(voyages[i].arriveTime),
        })
      }
      for (let i = 0; i < this.orderDetailListy[0].passengers.length; i++) { //循环插入所有用户信息
        if (this.orderDetailListy[0].passengers[i].voyages[0].status == 1) {
          this.usersnamelist.push({
            ageType: this.orderDetailListy[0].passengers[i].ageType, //乘客类型
            phone: this.orderDetailListy[0].passengers[i].phone,
            city: [{ //出发城市
              id: this.orderDetailListy[0].passengers[i].voyages[0].depart,
              name: this.citys(this.orderDetailListy[0].passengers[i].voyages[0].depart)
            }, { //到达城市
              id: this.orderDetailListy[0].passengers[i].voyages[0].arrive,
              name: this.citys(this.orderDetailListy[0].passengers[i].voyages[0].arrive)
            }],
            citys: {
              id: this.orderDetailListy[0].passengers[i].voyages[0].arrive,
              name: this.citys(this.orderDetailListy[0].passengers[i].voyages[0].arrive)
            },
            departTime: this.orderDetailListy[0].passengers[i].voyages[0].departTime.substring(0, 10),
            cardNo: this.orderDetailListy[0].passengers[i].cardNo, //证件类型
            cardType: this.orderDetailListy[0].passengers[i].cardType, //证件号码
            passengerId: this.orderDetailListy[0].passengers[i].passengerId,
            name: this.orderDetailListy[0].passengers[i].name,
            istrue: false, //默认为待选状态
            stkus: this.orderDetailList[0].stkus
          })
        } else if (this.orderDetailListy[0].passengers[i].voyages[1] != null && this.orderDetailListy[0].passengers[i].voyages[
            1].status == 1) {
          this.usersnamelist.push({
            ageType: this.orderDetailListy[0].passengers[i].ageType, //乘客类型
            phone: this.orderDetailListy[0].passengers[i].phone,
            city: [{ //出发城市
              id: this.orderDetailListy[0].passengers[i].voyages[1].depart,
              name: this.citys(this.orderDetailListy[0].passengers[i].voyages[1].depart)
            }, { //到达城市
              id: this.orderDetailListy[0].passengers[i].voyages[1].arrive,
              name: this.citys(this.orderDetailListy[0].passengers[i].voyages[1].arrive)
            }],
            citys: {
              id: this.orderDetailListy[0].passengers[i].voyages[1].arrive,
              name: this.citys(this.orderDetailListy[0].passengers[i].voyages[1].arrive)
            },
            departTime: this.orderDetailListy[0].passengers[i].voyages[1].departTime.substring(0, 10),
            cardNo: this.orderDetailListy[0].passengers[i].cardNo, //证件类型
            cardType: this.orderDetailListy[0].passengers[i].cardType, //证件号码
            passengerId: this.orderDetailListy[0].passengers[i].passengerId,
            name: this.orderDetailListy[0].passengers[i].name,
            istrue: false, //默认为待选状态
            stkus: this.orderDetailList[0].stkus
          })
        } else if (this.orderDetailListy.length > 1) {
          if (this.orderDetailListy[1].passengers[i].voyages != null && this.orderDetailListy[1].passengers[i].voyages[
              0].status == 1) {
            this.usersnamelist.push({
              ageType: this.orderDetailListy[1].passengers[i].ageType, //乘客类型
              phone: this.orderDetailListy[1].passengers[i].phone,
              city: [{ //出发城市
                id: this.orderDetailListy[1].passengers[i].voyages[0].depart,
                name: this.citys(this.orderDetailListy[1].passengers[i].voyages[0].depart)
              }, { //到达城市
                id: this.orderDetailListy[1].passengers[i].voyages[0].arrive,
                name: this.citys(this.orderDetailListy[1].passengers[i].voyages[0].arrive)
              }],
              citys: {
                id: this.orderDetailListy[1].passengers[i].voyages[0].arrive,
                name: this.citys(this.orderDetailListy[1].passengers[i].voyages[0].arrive)
              },
              departTime: this.orderDetailListy[1].passengers[i].voyages[0].departTime.substring(0, 10),
              cardNo: this.orderDetailListy[1].passengers[i].cardNo, //证件类型
              cardType: this.orderDetailListy[1].passengers[i].cardType, //证件号码
              passengerId: this.orderDetailListy[1].passengers[i].passengerId,
              name: this.orderDetailListy[1].passengers[i].name,
              istrue: false, //默认为待选状态
              stkus: this.orderDetailList[0].stkus
            })
          }
        }
      }
    },
    updataslist(num) { //往返改签或者退票
      if (this.checkList.length == 0) {
        this.$message({
          message: '请选择一个出差人员',
          type: 'warning'
        })
        return
      }
      this.sione = false;
      let list = this.userslist.tr.orderDetailList[0];
      this.saleOrderNo = list.mainDetail.saleOrderNo;
      this.odllegList = []; //当前航班信息
      this.usersnamelist = []; //当前可操作用户
      let voyages = list.voyages;
      for (let i = 0; i < voyages.length; i++) {
        this.odllegList.push({
          flightNo: voyages[i].flightNo,
          cabin: voyages[i].cabin,
          depAirport: voyages[i].depart,
          arrAirport: voyages[i].arrive,
          depTime: this.timels(voyages[i].departTime),
          arrTime: this.timels(voyages[i].arriveTime),
        })
      }
      for (let i = 0; i < list.passengers.length; i++) { //循环插入所有用户信息
        if (list.passengers[i].voyages[0].status == 1 && list.passengers[i].voyages[1].status == 1) {
          this.usersnamelist.push({
            ageType: list.passengers[i].ageType, //乘客类型
            phone: list.passengers[i].phone,
            city: [{ //出发城市
              id: list.passengers[i].voyages[0].depart,
              name: this.citys(list.passengers[i].voyages[0].depart)
            }, { //到达城市
              id: list.passengers[i].voyages[0].arrive,
              name: this.citys(list.passengers[i].voyages[0].arrive)
            }],
            citys: {
              id: list.passengers[i].voyages[0].arrive,
              name: this.citys(list.passengers[i].voyages[0].arrive)
            },
            departTime: list.passengers[i].voyages[0].departTime.substring(0, 10),
            departTimes: list.passengers[i].voyages[1].departTime.substring(0, 10),
            cardNo: list.passengers[i].cardNo,
            cardType: list.passengers[i].cardType,
            passengerId: list.passengers[i].passengerId,
            name: list.passengers[i].name,
            istrue: false, //默认为待选状态
          })
        }
      }
      this.shos = true;
      this.isnum = num;
      if (num == 2) {
        this.tuipiao = 3;
      }
      this.ic_ok();
    },
    updatas(num, item, index, ins) { //申请改签或退票
      if (this.checkList.length == 0) {
        this.$message({
          message: '请选择一个出差人员',
          type: 'warning'
        })
        return
      }
      this.sione = true;
      this.saleOrderNo = item.mainDetail.saleOrderNo;
      this.isnum = num;
      let list = this.userslist.tr.orderDetailList[0];
      this.odllegList = []; //当前航班信息
      this.usersnamelist = []; //当前可操作用户
      let voyages = list.voyages;
      if (this.isttype == 1) {
        if (index == 0) {
          this.tuipiao = 1;
        } else {
          this.tuipiao = 2;
        }
        for (let i = 0; i < voyages.length; i++) {
          this.odllegList.push({
            flightNo: voyages[i].flightNo,
            cabin: voyages[i].cabin,
            depAirport: voyages[i].depart,
            arrAirport: voyages[i].arrive,
            depTime: this.timels(voyages[i].departTime),
            arrTime: this.timels(voyages[i].arriveTime),
          })
        }
        for (let i = 0; i < item.passengers.length; i++) { //循环插入所有用户信息
          if (item.passengers[i].voyages[0].status == 1) {
            this.usersnamelist.push({
              ageType: item.passengers[i].ageType, //乘客类型
              phone: item.passengers[i].phone,
              city: [{ //出发城市
                id: item.passengers[i].voyages[0].depart,
                name: this.citys(item.passengers[i].voyages[0].depart)
              }, { //到达城市
                id: item.passengers[i].voyages[0].arrive,
                name: this.citys(item.passengers[i].voyages[0].arrive)
              }],
              citys: {
                id: item.passengers[i].voyages[0].arrive,
                name: this.citys(item.passengers[i].voyages[0].arrive)
              },
              departTime: item.passengers[i].voyages[0].departTime.substring(0, 10),
              cardNo: item.passengers[i].cardNo, //证件类型
              cardType: item.passengers[i].cardType, //证件号码
              passengerId: item.passengers[i].passengerId,
              name: item.passengers[i].name,
              istrue: false, //默认为待选状态
            })
          }
        }
      } else {
        if (index == 0) {
          this.tuipiao = 1;
        } else {
          this.tuipiao = 2;
        }
        this.odllegList.push({
          flightNo: item.voyages[0].flightNo,
          cabin: item.voyages[0].cabin,
          depAirport: item.voyages[0].depart,
          arrAirport: item.voyages[0].arrive,
          depTime: this.timels(item.voyages[0].departTime),
          arrTime: this.timels(item.voyages[0].arriveTime),
        })
        for (let i = 0; i < item.passengers.length; i++) { //循环插入所有用户信息
          if (item.passengers[i].voyages[index].status == 1) {
            this.usersnamelist.push({
              ageType: item.passengers[i].ageType,
              phone: item.passengers[i].phone,
              city: [{ //出发城市
                id: item.passengers[i].voyages[index].depart,
                name: this.citys(item.passengers[i].voyages[index].depart)
              }, { //到达城市
                id: item.passengers[i].voyages[index].arrive,
                name: this.citys(item.passengers[i].voyages[index].arrive)
              }],
              citys: {
                id: item.passengers[i].voyages[index].arrive,
                name: this.citys(item.passengers[i].voyages[index].arrive),
              },
              departTime: item.passengers[i].voyages[index].departTime.substring(0, 10),
              cardNo: item.passengers[i].cardNo,
              cardType: item.passengers[i].cardType,
              passengerId: item.passengers[i].passengerId,
              name: item.passengers[i].name,
              istrue: false, //默认为待选状态
            })
          }
        }
      }
      this.shos = true;
      this.ic_ok(ins);
    },
    phonei_click() {
      this.phone_click = true;
      this.companyi_click = true;
      this.selts();
    },
    companym_click() {
      this.companyi_click = false;
      this.dimiss = false;
      this.updapp();
    },
    companym_clicks() {
      this.phone_click = false;
      this.companyi_click = false;
      this.dimiss = false;
    },
    timels(time) {
      if (time.length < 19) {
        return time + ':00'
      } else {
        return time
      }
    },
    getStaffByTravelNoAndName(name) {
      return new Promise((resolve, reject) => {
        this.$api.order.getStaffByTravelNoAndNames({
          travelNo: this.plsitsti.tmsotr.travelNo,
          names: name
        }).then((res) => {
          let dat = res.data; //获取改签人信息
          let users = [];
          for (let i in dat) {
            users.push(dat[i].passengerNo)
          }
          resolve(users)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    async ic_ok(ins) { //确定当前
      let inss = ins;
      let isnum = this.isnum; //改签还是退票
      let userlist = [];
      let names = [];
      let passengerNos = [];
      let city = "";
      let citys = "";
      let detime = "";
      let detimes = "";
      let uslist = this.checkList; //选中的人
      for (let k in uslist) {
        for (let i in this.usersnamelist) {
          if (this.usersnamelist[i].passengerId == uslist[k].passengerId) {
            city = this.usersnamelist[i].city;
            citys = this.usersnamelist[i].citys;
            detime = this.usersnamelist[i].departTime;
            if (this.sione) { //单程
              detimes = ''
            } else { //往返
              detimes = this.usersnamelist[i].departTimes;
            }
            userlist.push({
              phone: this.usersnamelist[i].phone,
              certNo: this.usersnamelist[i].cardNo, //证件号码
              ageType: this.usersnamelist[i].ageType, //乘客类型		ADT成人
              certType: this.catype(this.usersnamelist[i].cardType), //证件类型
              name: this.usersnamelist[i].name, //名字
            });
            passengerNos.push(this.usersnamelist[i].passengerId)
            names.push(this.usersnamelist[i].name)
          } else if (inss == 1 && uslist[k].name == this.usersnamelist[i].name) {
            city = this.usersnamelist[i].city;
            citys = this.usersnamelist[i].citys;
            detime = this.usersnamelist[i].departTime;
            if (this.sione) { //单程
              detimes = ''
            } else { //往返
              detimes = this.usersnamelist[i].departTimes;
            }
            userlist.push({
              phone: this.usersnamelist[i].phone,
              certNo: this.usersnamelist[i].cardNo, //证件号码
              ageType: this.usersnamelist[i].ageType, //乘客类型		ADT成人
              certType: this.catype(this.usersnamelist[i].cardType), //证件类型
              name: this.usersnamelist[i].name, //名字
            });
            passengerNos.push(this.usersnamelist[i].passengerId)
            names.push(this.usersnamelist[i].name)
          }
        }
      }
      let nu = this.userslist.trExtend.typename; //因公因私
      let userlistnos = [];
      if (nu == 1) { //因公需要从接口中获取用户passengerNo
        let res = await this.$api.order.getStaffByTravelNoAndNames({
          travelNo: this.userslist.trExtend.travelNo,
          names: names
        })
        let dat = res.data; //获取改签人信息
        for (let i in dat) {
          userlistnos.push(dat[i].passengerNo)
        }
      }
      let res = await this.$api.order.ruleMainSetting()
      if (res.code == 200) {
        this.RuleMa = res.data.examinePattern;
        let stw = this.RuleMa.split(',');
        for (let i in stw) {
          /**
           * 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
           */
          if (stw[i] == 10) {
            this.$api.order.judgeApprv({
              passengerNos: userlistnos //判断当前出行人是否都免审
            }).then((res) => {
              if (res.code == 200) {
                this.loading = false;
                if (res.data == true) { //判断是否需要审核
                  this.RuleMas = true;
                } else {
                  this.RuleMas = false;
                }
              } else {
                this.loading = false;
              }
            }).catch((err) => {
              this.loading = false;
              console.log(err)
            })
          } else {
            this.RuleMas = true;
          }
        }
      } else {
        this.loading = false;
        this.$message({
          message: res.message,
          type: 'warning'
        })
      }
      this.shos = false; //单程
      if (isnum == 1) { //改签
        let none = ''; //往返
        if (this.sione) { //单程
          none = 'single'
        } else { //往返
          none = 'returns'
        }

        let dat = {
          tradeNo: this.userslist.tr.transationOrderNo, //交易单号
          none: none,
          type: "Planeticket",
          passengerNos: passengerNos, //用户编号
          userlistnos: userlistnos, //用户信息
          saleOrderNo: this.saleOrderNo, //航班出差单号
          odllegList: this.odllegList, //当前航班信息
          city: city, //去的城市
          citys: citys, //来的城市
          timedate: detime, //时间
          timedates: detimes, //返回时间
          butalist: userlist, //出行人员
          isblcks: 4, //4改签
          isbtd: nu, //1因公2因私
        }

        this.$router.push({
          path: '/ticketcationform',
          query: {
            data: JSON.stringify(dat)
          }
        });
      } else { //退票
        let none = ''; //往返
        if (this.sione) { //单程
          none = 'single'
        } else { //往返
          none = 'returns'
        }
        if (nu == 2) { //判断是否因私或者因公    因私不需要审核
          let dat = {
            transactionOrderNo: this.userslist.tr.transationOrderNo,
            saleOrderNo: this.userslist.tr.orderDetailList[0].mainDetail.saleOrderNo,
            userslist: this.userslist,
            userlist: userlist,
            none: none,
            tuipiao: this.tuipiao,
            RuleMas: this.RuleMas
          }
          sessionStorage.setItem("predetermine_data", JSON.stringify(dat));
          this.phonei_click(dat);
        } else if (nu == 1 && this.RuleMas == true) { //因公但是不需要审核
          let dat = {
            transactionOrderNo: this.userslist.tr.transationOrderNo,
            saleOrderNo: this.userslist.tr.orderDetailList[0].mainDetail.saleOrderNo,
            userslist: this.userslist,
            userlist: userlist,
            none: none,
            tuipiao: this.tuipiao,
            RuleMas: this.RuleMas
          }
          sessionStorage.setItem("predetermine_data", JSON.stringify(dat));
          this.phonei_click(dat);
        } else {
          this.$api.order.ruleMainSetting().then((res) => {
            if (res.code == 200) {
              this.RuleMa = res.data.examinePattern;
              let stw = this.RuleMa.split(',');
              for (let i in stw) {
                /**
                 * 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
                 */
                if (stw[i] == 10) {
                  this.$api.order.judgeApprv({
                    passengerNos: userlistnos //判断当前出行人是否都免审
                  }).then((res) => {
                    this.loading = false;
                    if (res.code == 200) {
                      if (res.data == false) { //判断是否需要审核
                        let dat = {
                          transactionOrderNo: this.userslist.tr.transationOrderNo,
                          saleOrderNo: this.userslist.tr.orderDetailList[0].mainDetail.saleOrderNo,
                          passengerNo: passengerNos,
                          linkType: '1',
                          userlist: userlist
                        }
                        sessionStorage.setItem("predetermine_data", JSON.stringify(dat));
                        this.phonei_click(dat);
                      } else {
                        let dat = {
                          transactionOrderNo: this.userslist.tr.transationOrderNo,
                          saleOrderNo: this.userslist.tr.orderDetailList[0].mainDetail.saleOrderNo,
                          linkType: '1',
                          passengerNo: passengerNos,
                          ruleMas: this.RuleMas
                        }
                        sessionStorage.setItem("predetermine_data", JSON.stringify(dat));
                        this.phonei_click(dat);
                      }
                    } else {
                      this.$message({
                        message: res.message,
                        type: 'warning'
                      })
                    }
                  }).catch((err) => {
                    console.log(err)
                  })
                }
                this.RuleMas = true;
              }
            } else {
              this.loading = false;
              this.$message({
                message: res.message,
                type: 'warning'
              })
            }
          }).catch((err) => {
            this.loading = false;
            console.log(err)
          })
        }
      }
    },
    catype(it) { //返回证件类型
      if (it == 'NI') {
        return '身份证'
      } else if (it == 'PP') {
        return '护照'
      } else if (it == 'TB') {
        return '台胞证'
      } else if (it == 'GA') {
        return '港澳通行证'
      } else if (it == 'HX') {
        return '回乡证'
      } else if (it == 'OS') {
        return '其他证件'
      }
    },
    company(ie) {
      for (let s in this.hang) {
        if (ie == s) {
          ie = this.hang[s];
          return ie;
        }
      }
    },
    companys(ie) {
      if (ie == 'F') {
        ie = '头等舱'
      } else if (ie == 'C') {
        ie = '商务舱'
      } else if (ie == 'Y') {
        ie = '经济舱'
      }
      return ie;
    },
    retuns() {
      this.$router.go(-1); //返回上一页
    },
    clearsks() { //取消订单
      this.$confirm('将取消订单，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.opclose(); //取消订单
      });
    },
    okcloseplase() {
      let that = this;
      let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
      let TravelDepartlist = that.TravelDepartlist; //部门审批人
      let NameCenter = that.NameCenter; //成本中心
      let resons = that.resons; //退票原因
      if (NameCenter.id == '') {
        this.$message({
          message: '请选择成本中心！',
          type: 'warning'
        })
        return
      } else if (TravelCostCenlist.length == 0 && this.CostCi == true) {
        this.$message({
          message: '请选择成本审批人！',
          type: 'warning'
        })
        return
      } else if (TravelDepartlist.length == 0 && this.CostCis == true) {
        this.$message({
          message: '请选择部门审批人！',
          type: 'warning'
        })
        return
      } else if (resons == '') {
        this.$message({
          message: '请输入退票原因！',
          type: 'warning'
        })
        return
      }
      let apprvTaskStaffts = []; //审核人员
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
      let dat = {
        saleOrderNo: this.applylist.saleOrderNo,
        passengerNo: this.applylist.passengerNo,
        apprvTaskEntity: {
          agree: false,
          apprvTaskStaffs: apprvTaskStaffts,
          taskType: 5, //1为事前2为事中，4为改签 5为退票
          beforeMiddle: 5, //1为事前2为事中 4为改签 5为退票
          costId: NameCenter.id, //成本中心id
          costName: NameCenter.name, //成本中心名称
          reason: resons,
          examinePattern: this.RuleMa
        }
      }
      this.dialogVisible = false;
      this.loading = true;
      this.$api.order.applyRefundTrain(dat).then((res) => {
        this.loading = false;
        if (res.code == 200) {
          this.$message({
            message: '申请退票成功!',
            type: 'success'
          })
          setTimeout(() => {
            this.$router.go(-1); //返回上一页
          }, 2000)
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((error) => {
        this.loading = false;
        console.log(error)
      })
    },
    opclose() {
      this.loading = true;
      this.dialogFormVisible = false;
      let isx = this.form.region;
      if (isx == '') {
        this.$message({
          message: '请选择！',
          type: 'success'
        });
        this.dialogFormVisible = true;
        return;
      }
      let no = this.userslist.tr.transationOrderNo;
      this.$api.order.cancelOrder({
        transationOrderNo: no,
        type: 1,
        isXePnr: isx,
        reason: '后台手动取消订单'
      }).then((res) => {
        this.loading = false;
        if (res.code == 200) {
          this.$message({
            message: '取消成功！',
            type: 'success'
          })
          setTimeout(() => {
            this.$router.go(-1); //返回上一页
          }, 2000)
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((error) => {
        this.loading = false;
        console.log(error)
      })
    },
    selts() { //查询成本中心
      let _this = this;
      _this.$api.home.getCostCenterList().then((res) => {
        if (res.code == 200) {
          _this.dialogVisible = true;
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
    handleChange(value) { //选择成本中心
      let nodesObj = this.$refs['cascader'].getCheckedNodes(); //获取当前节点的信息
      this.NameCenter.name = nodesObj[0].data.text;
      this.NameCenter.id = nodesObj[0].data.id;
      this.TravelCostCenlist = [];
      this.TravelDepartlist = [];
      this.appswlist(); //重新获取部门和成本中心审批人
    },
    citys(its) { //回显城市
      for (let j = 0; j < this.address.length; j++) { //循环城市
        if (this.address[j].airportCode == its) {
          return this.address[j].cityCName
        }
      }
    },
    async appswlist() { //选获取部门和成本审批人信息
      let that = this;
      let res;
      try {
        res = await that.$api.home.getStaffList({
          costId: that.NameCenter.id,
          applyType: 5
        });
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
      }
    },
    drawers(its) { //点击成本或者部门审批人
      if (its == 'TravelCostCenlist') { //判断是部门还是成本中心
        this.iscost = true;
        this.drawelist = this.CostCenterlist;
      } else {
        this.iscost = false;
        this.drawelist = this.Deparapprover.apprvDeptFlowNodePersons;
      }
      this.apprvCost = [];
      for (let i = 0; i < this.CostCenterlist.length; i++) {
        this.apprvCost.push({
          id: ''
        })
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
    count(ti, ts) {
      //计算两个日期多少天
      let date1 = new Date(ti);
      let date2 = new Date(ts);
      let date = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24); /*不用考虑闰年否*/
      return date;
    },
    subtime(tiem) {
      //返回日期前10位
      return tiem.substring(0, 10);
    },
    settlement(it) {
      if (it == 1) {
        return '现结';
      } else {
        return '预付月结';
      }
    },
    async getRuleMainSetting() { //查询当前用户退房是否需要审核
      this.$api.order.ruleMainSetting().then((res) => {
        if (res.code == 200) {
          this.RuleMa = res.data.examinePattern;
          let stw = this.RuleMa.split(',');
          for (let i in stw) {
            /**
             * 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
             */
            if (stw[i] == 6) {
              this.RuleMas = true;
            }
          }
        } else {
          this.loading = false;
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        this.loading = false;
        console.log(err)
      })
    },
    pustatus(ty) {
      //支付状态
      if (ty == 1) {
        return '待支付';
      } else if (ty == 2) {
        return '支付中';
      } else if (ty == 3) {
        return '已支付';
      } else if (ty == 4) {
        return '为挂帐支付';
      }
    },
    conpan(ie) {
      let arr = [{
        name: '预订中',
        id: 1,
        url: '../../../static/image/home/book.png'
      }, {
        name: '待审核',
        id: 2,
        url: '../../../static/image/home/To-audit.png'
      },
        {
          name: '待提交',
          id: 3,
          url: '../../../static/image/home/To-submit.png'
        },
        {
          name: '出票中',
          id: 4,
          url: '../../../static/image/home/ticket.png'
        },
        {
          name: '已出票',
          id: 5,
          url: '../../../static/image/home/check.png'
        }, {
          name: '已取消',
          id: 6,
          url: '../../../static/image/home/Canceled.png'
        }, {
          name: '已拒单',
          id: 7,
          url: '../../../static/image/home/From-single.png'
        }, {
          name: '待支付',
          id: 8,
          url: '../../../static/image/home/unpaid.png'
        }, {
          name: '待审批',
          id: 9,
          url: '../../../static/image/home/Approval-Pending.png'
        }, {
          name: '已登账',
          id: 10,
          url: '../../../static/image/home/Has-been-booked.png'
        }
      ]
      for (let i in arr) {
        if (arr[i].id == ie) {
          return arr[i].url
        }
      }
    },
    userstatus(it) { //乘客当前状态
      if (it == 0) {
        return '已取消'
      } else if (it == 1) {
        return '正常'
      } else if (it == 2) {
        return '改签'
      } else if (it == 3) {
        return '废退'
      }
    },
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
    searchhoter(tradeNo) { //查询机票详情
      if (tradeNo != null) {
        this.codes = tradeNo
      }
      let that = this;
      that.loading = true;
      that.$api.order
          .getOrderDetailByTranNo({
            tranNo: that.codes
          })
          .then((res) => {
            that.loading = false;
            if (res.code == 200) {
              that.userslist = res.data;
              that.apprvTaskReason = res.data.apprvTaskReason;
              this.amount = res.data.tr.amount;
              this.ticketNo = res.data.tr.orderDetailList[0].passengers[0].fareInfos[0].ticketNo;
              that.accountInfo = res.data.tr.accountInfo; //联系信息
              that.orderDetailList = res.data.tr.orderDetailList; //航班乘客信息
              that.userslist = res.data;
              that.insuranceInfos = that.userslist.tr.orderDetailList[0].passengers[0].insuranceInfos; //获取保险信息
              that.tiltext = '机票订单详情';
              that.timeList = res.data.timeList; //航行时间
              that.address = airports.addressAirportAll; //航空名字
              that.tlement = that.userslist.trExtend.settlement; //结算方式
              that.typename = that.userslist.trExtend.typename; //1因公2因私
              if (that.userslist.tr.actualInfoSearchVO != null) {
                that.apprvTaskStatu = that.userslist.tr.actualInfoSearchVO.actualAmountRecordList[0].auditStatus; //审核状态
              }
              that.orderStatus = that.userslist.tr.orderDetailList[0].mainDetail.orderStatus; //订单状态 1:预订中(默认); 2:待审核; 3:待提交; 4:出票中; 5:已出票; 6:已取消; 7:已拒单；8:待支付；9:待审批；10:已登账
              if (that.userslist.tr.orderDetailList[1] != undefined) {
                that.orderStatuse = that.userslist.tr.orderDetailList[1].mainDetail.orderStatus; //订单状态 1:预订中(默认); 2:待审核; 3:待提交; 4:出票中; 5:已出票; 6:已取消; 7:已拒单；8:待支付；9:待审批；10:已登账
              }
              that.payStatus = that.userslist.tr.orderDetailList[0].mainDetail.payStatus; //支付状态  1:未支付(默认); 2:部分支付; 3:已支付; 4:部分退款; 5:已退款;6:退款中
              if (that.orderStatus == 3 && that.payStatus == 1) { //待提交，未支付   判断取消
                this.isclose = true
              } else if (that.orderStatus == 9) {
                this.isclose = true
              }
              if (that.orderDetailList.length == 2 || (that.orderDetailList.length == 1 && that.orderDetailList[0].voyages
                  .length == 1)) {
                that.isttype = 1;
                for (let i = 0; i < that.orderDetailList.length; i++) {
                  let lo = that.orderDetailList[i];
                  lo.voyages[0]['ims'] = '../../../static/img/' + lo.voyages[0].airline + '.png';
                  that.orderDetailListy.push(lo)
                } //是否两个销售单对应两个航程或者一个销售单对应一个航程
              }
              if (that.orderDetailList.length == 1 && that.orderDetailList[0].voyages.length == 2) {
                that.isttype = 2;
                for (let i = 0; i < 2; i++) {
                  let voy = that.orderDetailList[0].voyages[i]
                  voy['ims'] = '../../../static/img/' + voy.airline + '.png'
                  that.orderDetailListy.push({
                    mainDetail: that.orderDetailList[0].mainDetail,
                    passengers: that.orderDetailList[0].passengers,
                    voyages: [voy]
                  })
                } //是否一个销售单对应两个航程
              }
              let usenaslist = that.userslist.tr.orderDetailList[0].passengers; //乘客信息
              if (that.isttype == 1 && that.orderDetailList.length == 2) { //2条销售单往返 1条数据 往返 不能改签往返
                for (let i = 0; i < usenaslist.length; i++) {
                  that.userlist.push({
                    icke: 3,
                    it: that.userslist.tr.orderDetailList[0].passengers[i],
                    its: that.userslist.tr.orderDetailList[1].passengers[i],
                    itd: that.userslist.tr.orderDetailList[0].passengers[i].voyages[0], //去
                    isd: that.userslist.tr.orderDetailList[1].passengers[i].voyages[0], //回
                  })
                }
                for (let i = 0; i < that.orderDetailListy.length; i++) {
                  that.orderDetailListy[i]['stkus'] = false;
                  for (let k = 0; k < that.userlist.length; k++) {
                    if (i == 0 && that.userlist[k].itd.status == 1) {
                      that.orderDetailListy[i].stkus = true;
                    }
                    if (i == 1 && that.userlist[k].isd.status == 1) {
                      that.orderDetailListy[i].stkus = true;
                    }
                  }
                }
              } else if (that.isttype == 1 && that.orderDetailList.length == 1) { //1条销售单往返 1条数据 单程
                for (let i = 0; i < usenaslist.length; i++) {
                  that.userlist.push({
                    icke: 1,
                    it: that.userslist.tr.orderDetailList[0].passengers[i],
                    itd: that.userslist.tr.orderDetailList[0].passengers[i].voyages[0],
                  })
                }
                for (let i = 0; i < that.orderDetailListy.length; i++) {
                  that.orderDetailListy[i]['stkus'] = false;
                  for (let k = 0; k < that.userlist.length; k++) {
                    if (i == 0 && that.userlist[k].itd.status == 1) {
                      that.orderDetailListy[i].stkus = true;
                    }
                  }
                }
              } else if (that.isttype == 2 && that.orderDetailList.length == 1) { //1条销售单 2条数据 往返 能改签往返
                let num = 0;
                for (let i = 0; i < usenaslist.length; i++) {
                  that.userlist.push({
                    icke: 3,
                    it: that.userslist.tr.orderDetailList[0].passengers[i],
                    itd: that.userslist.tr.orderDetailList[0].passengers[i].voyages[0], //去
                    isd: that.userslist.tr.orderDetailList[0].passengers[i].voyages[1], //回
                  })
                }
                for (let i = 0; i < that.orderDetailListy.length; i++) { //判断两个行程是否有人能改签或者退票
                  that.orderDetailListy[i]['stkus'] = false;
                  for (let k = 0; k < that.userlist.length; k++) {
                    if (i == 0 && that.userlist[k].itd.status == 1) {
                      that.orderDetailListy[i].stkus = true;
                    }
                    if (i == 1 && that.userlist[k].isd.status == 1) {
                      that.orderDetailListy[i].stkus = true;
                    }
                  }
                  if (that.orderDetailListy[i].stkus == true) {
                    num++;
                  }
                }
                if (num == 2) {
                  that.usersli = true;
                }
              }
              for (let k in that.userlist) {
                if (that.userlist[k].icke == 1) {
                  that.userlist[k].itd['statusname'] = that.userstatus(that.userlist[k].itd.status);
                }
                if (that.userlist[k].icke == 3) {
                  that.userlist[k].itd['statusname'] = that.userstatus(that.userlist[k].itd.status);
                  that.userlist[k].isd['statusname'] = that.userstatus(that.userlist[k].isd.status);
                }
              }
              this.passlist();
              this.ists = false;
              this.isgs = false;
            } else {
              that.$message({
                message: res.message,
                type: 'warning'
              });
            }
          })
          .catch(e => {
            that.loading = false;
            console.log(e);
          });
    },
    catypes(it) { //返回证件类型
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
    async updapp() { //确定
      let that = this;
      let orderDetailList = that.orderDetailList; //所有信息
      let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
      let TravelDepartlist = that.TravelDepartlist; //部门审批人
      let NameCenter = that.NameCenter; //成本中心
      let resons = that.resons; //原因
      let uslist = this.checkList; //选中的人
      if (this.tesh == '') {
        this.$message({
          message: '请填写备注！',
          type: 'warning'
        })
        return
      } else if (NameCenter.id == '' && this.RuleMas == false) {
        this.$message({
          message: '请选择成本中心！',
          type: 'warning'
        })
        this.companyi_click = true;
        return
      } else if (TravelCostCenlist.length == 0 && this.CostCi == true) {
        this.$message({
          message: '请选择成本审批人！',
          type: 'warning'
        })
        this.companyi_click = true;
        return
      } else if (TravelDepartlist.length == 0 && this.CostCis == true) {
        this.$message({
          message: '请选择部门审批人！',
          type: 'warning'
        })
        this.companyi_click = true;
        return
      } else if (resons == '') {
        this.$message({
          message: '请输入退票原因！',
          type: 'warning'
        })
        this.companyi_click = true;
        return
      }
      let apprvTaskStaffts = []; //审核人员
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
      if (that.tuipiao == 1) { //选择了去的航班没选择回来的	1是去2是回			因私 免审没有审核信息
        let userlist = that.userlist;
        let saleNo = orderDetailList[0].mainDetail.saleOrderNo; //销售单号
        let tradeNo = that.userslist.tr.transationOrderNo; //旧出差单号
        let voluntaryType = that.radios; //是否自愿，1自愿，2不自愿
        let refundType = that.radio; //退废类型1废票，2退票
        let reason = that.resons; //退废原因
        let isXepnr = that.radis; //是否取消PNR，0是，1否
        let filePath = that.imageUrl; //图片上传路径
        let refundRemark = that.textarea; //说明解释
        let passengersList = [];
        for (let k in uslist) {
          for (let i in this.usersnamelist) {
            if (this.usersnamelist[i].passengerId == uslist[k].passengerId) {
              passengersList.push({
                "name": userlist[i].it.name,
                "ageType": userlist[i].it.ageType,
                "cardType": userlist[i].it.cardType,
                "cardNo": userlist[i].it.cardNo
              })
            }
          }
        }
        let dats = {
          "saleNo": saleNo,
          "tradeNo": tradeNo,
          "voluntaryType": voluntaryType,
          "refundType": refundType,
          "reason": refundType,
          "isXepnr": isXepnr,
          "filePath": filePath,
          "refundRemark": refundRemark,
          "apprvTask": {
            "agree": false,
            "apprvTaskStaffs": apprvTaskStaffts,
            beforeMiddle: 5, //1为事前2为事中 4为改签 5为退票
            costId: NameCenter.id, //成本中心id
            costName: NameCenter.name, //成本中心名称
            reason: resons,
            taskType: 5 //1为事前2为事中，4为改签 5为退票
          },
          "flights": [{
            "departDate": orderDetailList[0].voyages[0].departTime,
            "depart": orderDetailList[0].voyages[0].depart,
            "arrive": orderDetailList[0].voyages[0].arrive,
            "flightNo": orderDetailList[0].voyages[0].flightNo,
            "cabin": orderDetailList[0].voyages[0].cabin,
            "sequence": orderDetailList[0].voyages[0].sequence,
            "arriveTime": orderDetailList[0].voyages[0].arriveTime,
            "departTerminal": orderDetailList[0].voyages[0].departTerminal,
            "arriveTerminal": orderDetailList[0].voyages[0].arriveTerminal,
            "plane": orderDetailList[0].voyages[0].flightModel
          }],
          "passengersList": passengersList,
          "contacts": {
            "name": that.userslist.tr.accountInfo.contact,
            "phone": that.userslist.tr.accountInfo.phone,
            "email": ""
          }
        }
        this.loading = true;
        try {
          let res = await that.$api.order.orderRefundApplyCommit(dats);
          this.phone_click = false;
          this.disa = true;
          if (res.code == 200) {
            that.$message({
              message: '提交申请退票成功！',
              type: 'success'
            });
            this.loading = false;
            setTimeout(() => {
              this.$router.go(-1); //返回上一页
            }, 1000)
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

      } else if (that.tuipiao == 2 && orderDetailList.length == 1) { //选择了回来的航班没选择去的
        let userlist = that.userlist;
        let saleNo = orderDetailList[0].mainDetail.saleOrderNo; //销售单号
        let tradeNo = that.userslist.tr.transationOrderNo; //旧出差单号
        let voluntaryType = that.radios; //是否自愿，1自愿，2不自愿
        let refundType = that.radio; //退废类型1废票，2退票
        let reason = that.resons; //退废原因
        let isXepnr = that.radis; //是否取消PNR，0是，1否
        let filePath = that.imageUrl; //图片上传路径
        let refundRemark = that.textarea; //说明解释
        let passengersList = [];
        for (let k in uslist) {
          for (let i in this.usersnamelist) {
            if (this.usersnamelist[i].passengerId == uslist[k].passengerId) {
              passengersList.push({
                "name": userlist[i].it.name,
                "ageType": userlist[i].it.ageType,
                "cardType": userlist[i].it.cardType,
                "cardNo": userlist[i].it.cardNo
              })
            }
          }
        }
        let dats = {
          "saleNo": saleNo,
          "tradeNo": tradeNo,
          "voluntaryType": voluntaryType,
          "refundType": refundType,
          "reason": refundType,
          "isXepnr": isXepnr,
          "filePath": filePath,
          "refundRemark": refundRemark,
          "apprvTask": {
            "agree": false,
            "apprvTaskStaffs": apprvTaskStaffts,
            beforeMiddle: 5, //1为事前2为事中 4为改签 5为退票
            costId: NameCenter.id, //成本中心id
            costName: NameCenter.name, //成本中心名称
            reason: resons,
            taskType: 5 //1为事前2为事中，4为改签 5为退票
          },
          "flights": [{
            "departDate": orderDetailList[0].voyages[1].departTime,
            "depart": orderDetailList[0].voyages[1].depart,
            "arrive": orderDetailList[0].voyages[1].arrive,
            "flightNo": orderDetailList[0].voyages[1].flightNo,
            "cabin": orderDetailList[0].voyages[1].cabin,
            "sequence": orderDetailList[0].voyages[1].sequence,
            "arriveTime": orderDetailList[0].voyages[1].arriveTime,
            "departTerminal": orderDetailList[0].voyages[1].departTerminal,
            "arriveTerminal": orderDetailList[0].voyages[1].arriveTerminal,
            "plane": orderDetailList[0].voyages[1].flightModel
          }],
          "passengersList": passengersList,
          "contacts": {
            "name": that.userslist.tr.accountInfo.contact,
            "phone": that.userslist.tr.accountInfo.phone,
            "email": ""
          }
        }
        this.loading = true;
        try {
          let res = await that.$api.order.orderRefundApplyCommit(dats);
          this.loading = false;
          this.disa = true;
          if (res.code == 200) {
            that.$message({
              message: '提交申请退票成功！',
              type: 'success'
            });
            this.loading = false;
            setTimeout(() => {
              this.$router.go(-1); //返回上一页
            }, 1000)
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
      } else if (that.tuipiao == 2 && orderDetailList.length == 2) { //选择了回来的航班没选择去的
        let userlist = that.userlist;
        let saleNo = orderDetailList[1].mainDetail.saleOrderNo; //销售单号
        let tradeNo = that.userslist.tr.transationOrderNo; //旧出差单号
        let voluntaryType = that.radios; //是否自愿，1自愿，2不自愿
        let refundType = that.radio; //退废类型1废票，2退票
        let reason = that.resons; //退废原因
        let isXepnr = that.radis; //是否取消PNR，0是，1否
        let filePath = that.imageUrl; //图片上传路径
        let refundRemark = that.textarea; //说明解释
        let passengersList = [];
        for (let k in uslist) {
          for (let i in this.usersnamelist) {
            if (this.usersnamelist[i].passengerId == uslist[k].passengerId) {
              passengersList.push({
                "name": userlist[i].it.name,
                "ageType": userlist[i].it.ageType,
                "cardType": userlist[i].it.cardType,
                "cardNo": userlist[i].it.cardNo
              })
            }
          }
        }
        let dats = {
          "saleNo": saleNo,
          "tradeNo": tradeNo,
          "voluntaryType": voluntaryType,
          "refundType": refundType,
          "reason": refundType,
          "isXepnr": isXepnr,
          "filePath": filePath,
          "refundRemark": refundRemark,
          "apprvTask": {
            "agree": false,
            "apprvTaskStaffs": apprvTaskStaffts,
            beforeMiddle: 5, //1为事前2为事中 4为改签 5为退票
            costId: NameCenter.id, //成本中心id
            costName: NameCenter.name, //成本中心名称
            reason: resons,
            taskType: 5 //1为事前2为事中，4为改签 5为退票
          },
          "flights": [{
            "departDate": orderDetailList[1].voyages[0].departTime,
            "depart": orderDetailList[1].voyages[0].depart,
            "arrive": orderDetailList[1].voyages[0].arrive,
            "flightNo": orderDetailList[1].voyages[0].flightNo,
            "cabin": orderDetailList[1].voyages[0].cabin,
            "sequence": orderDetailList[1].voyages[0].sequence,
            "arriveTime": orderDetailList[1].voyages[0].arriveTime,
            "departTerminal": orderDetailList[1].voyages[0].departTerminal,
            "arriveTerminal": orderDetailList[1].voyages[0].arriveTerminal,
            "plane": orderDetailList[1].voyages[0].flightModel
          }],
          "passengersList": passengersList,
          "contacts": {
            "name": that.userslist.tr.accountInfo.contact,
            "phone": that.userslist.tr.accountInfo.phone,
            "email": ""
          }
        }
        this.loading = true;
        try {
          let res = await that.$api.order.orderRefundApplyCommit(dats);
          this.loading = false;
          this.disa = true;
          if (res.code == 200) {
            that.$message({
              message: '提交申请退票成功！',
              type: 'success'
            });
            this.loading = false;
            setTimeout(() => {
              this.$router.go(-1); //返回上一页
            }, 1000)
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
      } else if (that.tuipiao == 3 && orderDetailList.length == 1) { //选择了回来的航班和去的航班
        let userlist = that.userlist;
        let saleNo = orderDetailList[0].mainDetail.saleOrderNo; //销售单号
        let tradeNo = that.userslist.tr.transationOrderNo; //旧出差单号
        let voluntaryType = that.radios; //是否自愿，1自愿，2不自愿
        let refundType = that.radio; //退废类型1废票，2退票
        let reason = that.resons; //退废原因
        let isXepnr = that.radis; //是否取消PNR，0是，1否
        let filePath = that.imageUrl; //图片上传路径
        let refundRemark = that.textarea; //说明解释
        let passengersList = [];
        for (let k in uslist) {
          for (let i in this.usersnamelist) {
            if (this.usersnamelist[i].passengerId == uslist[k].passengerId) {
              passengersList.push({
                "name": userlist[i].it.name,
                "ageType": userlist[i].it.ageType,
                "cardType": userlist[i].it.cardType,
                "cardNo": userlist[i].it.cardNo
              })
            }
          }
        }
        let dats = {
          "saleNo": saleNo,
          "tradeNo": tradeNo,
          "voluntaryType": voluntaryType,
          "refundType": refundType,
          "reason": refundType,
          "isXepnr": isXepnr,
          "filePath": filePath,
          "refundRemark": refundRemark,
          "apprvTask": {
            "agree": false,
            "apprvTaskStaffs": apprvTaskStaffts,
            beforeMiddle: 5, //1为事前2为事中 4为改签 5为退票
            costId: NameCenter.id, //成本中心id
            costName: NameCenter.name, //成本中心名称
            reason: resons,
            taskType: 5 //1为事前2为事中，4为改签 5为退票
          },
          "flights": [{
            "departDate": orderDetailList[0].voyages[0].departTime,
            "depart": orderDetailList[0].voyages[0].depart,
            "arrive": orderDetailList[0].voyages[0].arrive,
            "flightNo": orderDetailList[0].voyages[0].flightNo,
            "cabin": orderDetailList[0].voyages[0].cabin,
            "sequence": orderDetailList[0].voyages[0].sequence,
            "arriveTime": orderDetailList[0].voyages[0].arriveTime,
            "departTerminal": orderDetailList[0].voyages[0].departTerminal,
            "arriveTerminal": orderDetailList[0].voyages[0].arriveTerminal,
            "plane": orderDetailList[0].voyages[0].flightModel
          }, {
            "departDate": orderDetailList[0].voyages[1].departTime,
            "depart": orderDetailList[0].voyages[1].depart,
            "arrive": orderDetailList[0].voyages[1].arrive,
            "flightNo": orderDetailList[0].voyages[1].flightNo,
            "cabin": orderDetailList[0].voyages[1].cabin,
            "sequence": orderDetailList[0].voyages[1].sequence,
            "arriveTime": orderDetailList[0].voyages[1].arriveTime,
            "departTerminal": orderDetailList[0].voyages[1].departTerminal,
            "arriveTerminal": orderDetailList[0].voyages[1].arriveTerminal,
            "plane": orderDetailList[0].voyages[1].flightModel
          }],
          "passengersList": passengersList,
          "contacts": {
            "name": that.userslist.tr.accountInfo.contact,
            "phone": that.userslist.tr.accountInfo.phone,
            "email": ""
          }
        }
        this.loading = true;
        try {
          let res = await that.$api.order.orderRefundApplyCommit(dats);
          this.loading = false;
          this.disa = true;
          if (res.code == 200) {
            that.$message({
              message: '提交申请退票成功！',
              type: 'success'
            });
            this.loading = false;
            setTimeout(() => {
              this.$router.go(-1); //返回上一页
            }, 1000)
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
      }
    },
  }
};
</script>

<style scoped lang="less">
.hoteorder {
  width: 1180px;
  margin: 0 auto;

  .trstp {
    width: calc(100% - 20px);
    background: #ffffff;
    padding: 10px;

    .tr_ul {
      width: 100%;
      margin: 10px 0;
      display: flex;

      .tr_uleft {
        color: #78879d;
        width: 100px;
        font-size: 15px;
        color: #3b4f62;
        text-align: center;
        line-height: 50px;
      }

      .tr_right {
        width: calc(100% - 100px);
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .tr_rs {
          cursor: pointer;
          margin: 10px;
          padding: 2px 10px;
          line-height: 20px;
          font-size: 14px;
          border: 1px solid #d9e2eb;
          border-radius: 40px;

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
      }
    }
  }

  .information {
    width: 100%;
    background: red;

    .mask {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 998;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.5);
    }

    .popups {
      width: 500px;
      height: 680px;
      position: fixed;
      padding: 2%;
      top: 35%;
      left: 50%;
      margin-left: -250px;
      margin-top: -250px;
      z-index: 999;
      background: #FFFFFF;
      border-radius: 10px;
      box-shadow: 1px 1px 10px #888888;

      .popups_company {
        text-align: center;
        margin-top: 20px;
        color: #bac6d1;
      }

      .department {
        text-align: center;
        margin-top: 15px;
        color: #acb8c3;
      }

      .company_name {
        text-align: center;
        font-size: 15px;
        margin-top: 15px;
        color: #3b4f62;
      }

      .cell_phone_number {
        text-align: center;
        font-size: 20px;
        margin-top: 20px;
        color: #3b4f62;
      }

      .cell_phone {
        font-size: 15px;
        margin-top: 15px;
        color: #3b4f62;

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

      .cell_phones {
        text-align: center;
        font-size: 25px;
        margin-top: 15px;
        color: #3b4f62;
        font-weight: bold;
      }

      .dimission {
        width: 300px;
        margin-top: 50px;
        padding: 10px;
        font-size: 20px;
        color: #FFFFFF;
        border: 0;
        border-radius: 5px;
        background: #0CC071;
        cursor: pointer;
      }

      .cancel {
        width: 300px;
        margin-top: 20px;
        margin-left: 100px;
        padding: 10px;
        font-size: 20px;
        color: #409EFF;
        background: #FFFFFF;
        border-radius: 5px;
        border: 1px solid #409EFF;
        cursor: pointer;
      }

      .confirm {
        position: absolute;
        top: 150px;
        left: 13px;
        z-index: 9999;
        padding-left: 25px;
        background: #FFFFFF;

      }
    }
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

  .hotboxs {
    height: 114px;
    display: flex;
    align-items: center;
    margin: 20px 0;
    background-color: #ffffff;
    border-radius: 4px;
    font-size: 12px;

    .orderNum {
      margin-left: 35px;
      margin-right: 139px;
      font-size: 14px;
      color: #666;

      & > span {
        color: #333;
      }
    }

    .hotboxse {
      display: flex;

      .trbtend {
        flex: 1.5;
        display: flex;
        margin-left: 40px;
        position: relative;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .statusx {
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 73px;
            height: 73px;
          }
        }
      }
    }
  }

  .hotbox {
    line-height: 23px;
    position: relative;
    background-color: #ffffff;
    font-size: 12px;

    .hotbox_list {
      display: flex;
      padding: 40px 63px 30px;
      border-bottom: 1px solid #F2F2F2;

      .hotbox_list_left {
        width: 50%;

        div {
          .mixin_displayBox(@jc:flex-start);

          .go {
            margin: 0 6px 0 19px;
          }

          .departTime {
            font-size: 14px;
            font-weight: bolder;
            color: #333333;
            line-height: 14px;
            margin-right: 10px;
          }

          .hotData {
            display: inline;
            padding-left: 52px;
            margin-top: 15px;
          }
        }
      }

      .hotbox_list_right {
        padding-left: 69px;
        flex: 1;
        display: flex;
        align-items: center;

        .departTerminal {
          font-size: 15px;
          text-align: center;
        }

        .airline {
          text-align: center;
          text-align: center;
          margin: 0 17px;
          color: #333;

          img {
            width: 164px;
          }
        }

        .departTerminal {
          font-weight: bold;
        }
      }
    }

    .airPassenger {
      padding: 0 11px;
      color: #333333;
      font-size: 14px;
      font-weight: bolder;

      .airText {
        background: #f2f2f2;
        padding-left: 15px;
        line-height: 34px;
      }

      .airPasseData {
        display: flex;
        flex-wrap: wrap;
        font-size: 14px;
        padding-left: 66px;

        .airPasseList {
          width: 50%;
          .mixin_displayBox(@fd:column,@ai:flex-start);
          padding: 26px 0 16px;

          div {
            color: #666;
            font-size: 14px;
            font-weight: 400;
            display: flex;
            margin-left: 44px;
            margin-bottom: 10px;

            & > span:nth-child(1) {
              width: 84px;
              text-align: right;
            }

            & > span:nth-child(2) {
              color: #333;
            }
          }

          div:nth-child(1) {
            display: flex;
            align-items: center;
            margin-left: 0;

            & > span {
              color: #666;
            }

            .num {
              display: block;
              width: 28px;
              height: 28px;
              border-radius: 50%;
              text-align: center;
              line-height: 28px;
              background: #ECEAEA;
              color: #fff;
              margin-right: 16px;
            }

            & > span:nth-child(2) {
              width: 84px;
              text-align: right;
            }

            & > span:nth-child(3) {
              color: #333;
            }
          }
        }
      }
    }

    .lefbox {
      width: calc(100% - 20px);
      background: #f2f2f2;
      font-size: 14px;
      margin: 0 10px;
      padding: 5px 0;
      text-indent: 10px;
      line-height: 25px;
      font-weight: 600;
      font-size: 14px;
    }

    .lecheckd {
      display: flex;
      padding-bottom: 28px;
      align-items: center;
    }

    .boxbtn {
      margin-top: 20px;
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;

      div {
        text-align: center;
        padding: 2px 20px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;

      }

      .nobts {
        padding-left: 0;

        div {
          color: #409eff;
        }

      }

      .tkbts {
        background-color: red;
        color: #FFFFFF;
        border: 1px solid red;
      }
    }

    .boxbtn_one {
      & > div {
        & > :nth-child(2) {
          margin: 0 10px;
        }
      }
    }

    .retunbts {
      text-align: center;
      background-color: #FFFFFF;
      width: 68px;
      height: 34px;
      line-height: 34px;
      font-size: 14px;
      padding: 0!important;
      color: #409eff;
      border: 1px solid #409eff;
      border-radius: 3px;
      cursor: pointer;
      margin-left: 20px;
      justify-content: center;
    }

    .soclass {
      display: flex;
      text-align: center;
      line-height: 25px;

      div:nth-child(1) {
        flex: 1;
      }

      div:nth-child(2) {
        flex: 2;
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
        flex: 3;
      }
    }

    .soclass:nth-child(2) {
      margin-top: 28px;
    }

    .soclass:last-child {
      margin-bottom: 28px;
      border-bottom: 1px solid #f9e6d0;
    }

    .pricenum {
      display: flex;

      div {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          color: #f48f00;
          font-size: 20px;
        }
      }
    }

    .statusx {
      position: absolute;
      right: 20px;
      top: -1px;
      width: 114px;
      height: 50px;
      background: url(../../../../../static/image/order/orderbg.png) no-repeat;
      background-size: cover;
      line-height: 30px;
      font-size: 13px;
      color: #ffffff;
      text-align: center;
    }
  }

  .orderOperation {
    color: #333;

    & > div {
      padding-left: 66px;
    }

    .perText {
      padding-top: 28px;
    }

    .ordrePerData {
      span:nth-child(1) {
        display: inline-block;
        width: 60px;
      }

      span:nth-child(2) {
        margin: 0 20px;
      }
    }
  }

  .orderPay {
    color: #333;
    padding-bottom: 53px;

    & > div {
      padding-left: 66px;
    }

    .payData {
      margin-top: 28px;
      .mixin_displayBox(@fd:column,@ai:flex-start);

      .tlement {
        margin-bottom: 20px;
      }

      .payStatus {
        width: 972px;
        height: 110px;
        background: #F7F8FB;
        .mixin_displayBox(@fd:column,@ai:flex-start);
        padding-left: 25px;

        & > span {
          display: flex;
          align-items: center;
          color: #666;
          margin-bottom: 10px;

          & > p:nth-child(1) {
            font-size: 12px;
            color: #333;
          }

          & > p:nth-child(2) {
            font-size: 30px;
            color: #FF6600;
          }
        }

        .hotboxse {
          width: 100%;

          & > div {
            & > .past {
              display: flex;
              flex-wrap: wrap;

              & > div {
                display: flex;
                margin-right: 20px;

                & > div {
                  margin-right: 5px;

                  & > span:nth-child(1) {
                    margin-right: 10px;
                  }
                }
              }
            }
          }
        }
      }
    }

    .boxbtn {
      padding: 0;
    }

    .wxPay {
      padding: 0;
      width: 100%;
    }
  }
}

.disabBott {
  border: 1px solid #409eff;
}
</style>
