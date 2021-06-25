<template>
<!-- 差旅报告-> 综合分析 -->
  <div class="travelbox">
    <travel_report :tarlist_ids=tarlist_id></travel_report>
    <div v-if="rotes('tms:report:button')"  v-loading="loading">
      <div class="tar_setects">
        <div class="tar_lid">消费总量综合分析</div>
        <div class="tat_liop">
          分析纬度：
          <el-select @change="analysis" v-model="analysis_latitudes" style="width: 140px;margin-left: 10px;"
                     placeholder="预定类型"
                     class="select-style">
            <el-option v-for="item in analysis_latitude" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="tat_liop" v-if="analysis_latitudes == 2">
          成本中心：
          <el-cascader style="width: 150px;margin-left: 10px;" v-model="costcenterId"
                       @change="handleChange(index,$event)"
                       ref="cascader" :show-all-levels="false" :props='bots' :options="treeLists"></el-cascader>
        </div>
        <div class="tat_liop" v-if="analysis_latitudes == 1">
          所属部门：
          <el-cascader style="width: 150px;margin-left: 10px;" v-model="deptId" @change="handleChanges(index,$event)"
                       ref="cascader"
                       :show-all-levels="false" :props='bots' :options="deptIdLists"></el-cascader>
        </div>
        <div class="tat_liop">
          查询时间：
          <el-date-picker value-format="yyyy-MM-dd" style="width: 150px;margin-left: 10px;" v-model="statime"
                          type="date"
                          placeholder="出发日期" :editable="false" :clearable="false"></el-date-picker>
        </div>
        <div class="tat_liop">
          时间范围：
          <el-select v-model="time_frames" style="width: 100px;margin-left: 10px;" placeholder="预定类型"
                     class="select-style">
            <el-option v-for="item in time_frame" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="tat_liop">
          <div class="tat_tbns" @click="searchlist">
            查询
          </div>
          <div class="tat_tbns" v-if="vatypes == true" @click="exportExcel">
            导出
          </div>
        </div>
      </div>
      <div class="vatype">
        <el-switch
            style="display: block"
            v-model="vatypes"
            active-text="表格"
            inactive-text="图表">
        </el-switch>
      </div>
      <div class="boxshow">
        <div class="boxlistops">
          <div class="box_flexs" v-for="(item,index) in amountofmoney" :key="index">
            <div style="font-weight: 600;font-size: 14px;">
              {{ item.name }}
            </div>
            <div style="color: #FF4913;font-weight: 600;line-height: 35px;" v-if="index == 1">
              ￥{{ item.value }}
            </div>
            <div v-else style="font-weight: 600;line-height: 35px;">
              {{ item.value }}
            </div>
            <div class="box_fons">
              同比：
              <div class="iconfont" v-if="item.yearonyear > 0">&#xe8a3;</div>
              <div class="iconfont" v-else-if="item.yearonyear == 0"></div>
              <div class="iconfont" v-else>&#xe62e;</div>
              <div>{{ item.yearonyear }}%</div>
            </div>
            <div class="box_fons">
              环比：
              <span class="iconfont" v-if="item.monthonmonth > 0">&#xe8a3;</span>
              <div class="iconfont" v-else-if="item.monthonmonth == 0"></div>
              <span class="iconfont" v-else>&#xe62e;</span>
              <div>{{ item.monthonmonth }}%</div>
            </div>
          </div>
        </div>
        <div v-if="!dataFlag">
          <div class="boxls" v-show="vatypes == false">
            <div class="boxlsox">
              <span class="iconfont boxbig" @click="initChartsts('chart')">&#xe607;</span>
              <div class="chartsty" ref="chart"></div>
            </div>
            <div class="boxlsox">
              <span class="iconfont boxbig" @click="initChartsts('charts')">&#xe607;</span>
              <div class="chartsty" ref="charts"></div>
            </div>
          </div>
          <div class="boxls" v-show="vatypes == false">
            <div class="boxlsox">
              <span class="iconfont boxbig" @click="initChartsts('chart_s')">&#xe607;</span>
              <div class="chartsty" ref="chart_s"></div>
            </div>
            <div class="boxlsox">
              <span class="iconfont boxbig" @click="initChartsts('chart_reason')">&#xe607;</span>
              <div class="chartsty" ref="chart_reason"></div>
            </div>
          </div>
          <div class="tables" v-show="vatypes == true">
            <div class="tabtop">
              差旅费用总量分析
            </div>
            <el-table id="out-tableone" :header-cell-style="{background:'#f6f6f6',color:'#666'}" border=""
                      :data="travelexpenses" :span-method="objectSpanMethod" style="width: 100%;">
              <el-table-column label="项目" align="center">
                <template slot-scope="scope">{{ sename(scope.row.name) }}</template>
              </el-table-column>
              <el-table-column align="center" prop="charges" label="收费项">
              </el-table-column>
              <el-table-column align="center" prop="reimbursement" label="实际报销数量">
              </el-table-column>
              <el-table-column align="center" label="数量占比">
                <template slot-scope="scope">{{ scope.row.proportion }} <span v-if="scope.row.proportion != ''">%</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="实际报销金额">
                <template slot-scope="scope">{{ scope.row.reimbursementprc }}<span
                    v-if="scope.row.reimbursementprc != ''">元</span></template>
              </el-table-column>
              <el-table-column align="center" width="150" label="实际报销金额占比">
                <template slot-scope="scope">{{ scope.row.reimbursementamount }}<span
                    v-if="scope.row.reimbursementamount != ''">%</span></template>
              </el-table-column>
              <el-table-column align="center" label="标准金额">
                <template slot-scope="scope">{{ scope.row.standardamount }}<span
                    v-if="scope.row.standardamount != ''">元</span></template>
              </el-table-column>
              <el-table-column align="center" label="超标总额">
                <template slot-scope="scope">{{ scope.row.totaloverstandard }}<span
                    v-if="scope.row.totaloverstandard != ''">元</span></template>
              </el-table-column>
              <el-table-column align="center" label="超标占比">
                <template slot-scope="scope">{{ scope.row.standard }}<span v-if="scope.row.standard != ''">%</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="tables" v-show="vatypes == true">
            <div class="tabtop">
              实际报销差旅费用分析表
            </div>
            <el-table id="out-tableones" :header-cell-style="{background:'#f6f6f6',color:'#666'}" border=""
                      :data="reimbursements" :span-method="objectSpanMethod" style="width: 100%;">
              <el-table-column label="项目" align="center">
                <template slot-scope="scope">{{ sename(scope.row.name) }}</template>
              </el-table-column>
              <el-table-column align="center" prop="charges" label="收费项">
              </el-table-column>
              <el-table-column align="center" prop="reimbursement" label="实际报销数量">
              </el-table-column>
              <el-table-column align="center" label="同比">
                <template slot-scope="scope">{{ scope.row.rearyear }}<span v-if="scope.row.rearyear != ''">%</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="环比">
                <template slot-scope="scope">{{ scope.row.reonthmonth }}<span v-if="scope.row.reonthmonth != ''">%</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="150" label="实际报销金额">
                <template slot-scope="scope">{{ scope.row.reimbursementamount }}<span
                    v-if="scope.row.reimbursementamount != ''">元</span></template>
              </el-table-column>
              <el-table-column align="center" label="同比">
                <template slot-scope="scope">{{ scope.row.amaryear }}<span v-if="scope.row.amaryear != ''">%</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="环比">
                <template slot-scope="scope">{{ scope.row.amonthmonth }}<span v-if="scope.row.amonthmonth != ''">%</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="no-data" v-else>
                <no-data  class="nodata"></no-data>
        </div>
      </div>
      <div v-show="drawer" class="flobog" @click="drawer = false">
        <div class="eachartbig" @click.stop>
          <div :style="{width: ecwidth ,height: echeight}" ref="chart_big"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import travel_report from "./travel_report";
import XLSX from "xlsx";
import mergeTableRow from '../../../static/js/hbtablie.js'
import Travel_report from "./travel_report";
import NoData from "@/components/common/noData";
export default {
  components: {Travel_report,NoData},
  data() {
    return {
      components: {travel_report},
      vatypes: false,//展示类型
      travelexpenses: [],//实际消费列表
      reimbursements: [],//实际报销列表
      ecwidth: 0,
      echeight: 0,
      drawer: false,
      testpost: '年',
      deptIdLists: [],
      deptId: '', //部门id
      treeLists: [], //成本中心
      bots: { //使用props替换掉本来默认的lable和value 的键值
        value: 'id',
        label: 'text',
        checkStrictly: true, //可以选父级
        emitPath: false,
      },
      costcenterId: '', //成本中心id
      loading: false,
      statime: '', //开始时间
      amountofmoney: [{
        name: '实际报销总量',
        value: 0,
        yearonyear: 0,
        monthonmonth: 0
      }, {
        name: '实际报销总金额',
        value: 0,
        yearonyear: 0,
        monthonmonth: 0
      }, {
        name: '超标单数',
        value: 0,
        yearonyear: 0,
        monthonmonth: 0
      }],
      time_frame: [{
        value: 2,
        label: '月度'
      }, { //时间范围
        value: 3,
        label: '季度'
      }, {
        value: 1,
        label: '年度'
      }],
      time_frames: 1,
      analysis_latitude: [{ //分析纬度
        value: 3,
        label: '企业集团'
      }, {
        value: 1,
        label: '部门'
      }, {
        value: 2,
        label: '成本中心'
      }, {
        value: 4,
        label: '本人'
      }],
      analysis_latitudes: 3,
      tarlist_id: 1,
      details: [],
      compareMap: [],
      reasonMap: [],
      dataFlag:false,
    }
  },
  mounted() {
    if (this.rotes('tms:report:button')) {
      let hes = `${document.documentElement.clientHeight}`;
      this.ecwidth = (parseInt(hes) - 40) + 'px';
      this.echeight = (parseInt(hes) - 40) + 'px';
      let dates = new Date();
      let yells = dates.getFullYear(); //年
      let months = dates.getMonth() + 1 < 10 ? '0' + (dates.getMonth() + 1) : dates.getMonth() + 1; //月
      let sates = dates.getDate() < 10 ? '0' + dates.getDate() : dates.getDate(); //日
      this.statime = yells + '-' + months + '-' + sates;
      this.selts();
      this.searchlist();
    }
  },
  methods: {
    //定义导出Excel表格事件
    exportExcel() {
      if (this.travelexpenses.length == 0) {
        this.$message({
          showClose: true,
          message: '差旅报表总量分析表格数据不能为空!',
          type: 'warning'
        });
        return
      }
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-tableone"));
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
            //Blob 对象表示一个不可变、原始数据的类文件对象。
            //Blob 表示的不一定是JavaScript原生格式的数据。
            //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
            //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
            new Blob([wbout], {type: "application/octet-stream"}),
            //设置导出文件名称
            "差旅报表总量分析.xlsx"
        );
      } catch (e) {
        this.$message({
          showClose: true,
          message: '导出失败,请联系管理员!',
          type: 'error'
        });
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      /* 从表生成工作簿对象 */
      var wbs = XLSX.utils.table_to_book(document.querySelector("#out-tableones"));
      /* 获取二进制字符串作为输出 */
      var wbouts = XLSX.write(wbs, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
            //Blob 对象表示一个不可变、原始数据的类文件对象。
            //Blob 表示的不一定是JavaScript原生格式的数据。
            //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
            //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
            new Blob([wbouts], {type: "application/octet-stream"}),
            //设置导出文件名称
            "实际报销差旅费用分析表.xlsx"
        );
      } catch (e) {
        this.$message({
          showClose: true,
          message: '导出失败,请联系管理员!',
          type: 'error'
        });
        if (typeof console !== "undefined") console.log(e, wbouts);
      }
      this.$message({
        message: '导出成功！',
        type: 'success'
      });
      // return wbout;
    },
    objectSpanMethod({
                       row,
                       column,
                       rowIndex,
                       columnIndex
                     }) {
      if (columnIndex === 0) {
        if (rowIndex < 6) {
          if (rowIndex % 6 === 0) {
            return {
              rowspan: 6,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
      if (rowIndex > 5) {
        if (columnIndex == 0) {
          return [1, 2];
        } else if (columnIndex == 1) {
          return [0, 0];
        }
      }
    },
    initChartsts(its) {
      this.drawer = true;
      if (its == 'chart') {
        this.initCharts(2); //保险费用占比
      } else if (its == 'charts') {
        this.initChartsy(2); //总费用环比
      } else if (its == 'chart_s') {
        this.initCharts_s(2); //月度消费
      } else if (its == 'chart_reason') {
        this.initCharts_reason(2); //超规原因
      }
    },
    analysis(va) { //修改分析纬度
    },
    handleChange(index, value) { //选择成本中心
    },
    handleChanges(index, value) { //选择部门
    },
    selts() { //查询成本中心
      let _this = this;
      _this.$api.home.getCostCenterList().then((res) => {
        if (res.code == 200) {
          _this.treeLists = res.data;
        } else {
          _this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((e) => {
        console.log(e)
      })
      _this.$api.business.getDeptList().then((res) => {
        if (res.code == 200) {
          _this.deptIdLists = res.data;
        } else {
          _this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    async searchlist() {

      let tarlistids = this.$route.query.tarlist_id; //分析类型
      let analysislatitudes = this.analysis_latitudes; //分析纬度
      let timeframes = this.time_frames; //分析范围
      for (let k in this.time_frame) {
        if (this.time_frame[k].value == timeframes) {
          this.testpost = this.time_frame[k].label;
        }
      }
      let statime = this.statime; //开始时间
      let costcenterId = this.costcenterId; //成本中心id
      let deptId = this.deptId; //部门id
      if (statime == "") {
        this.$message({
          message: '请选择查询时间',
          type: 'warning'
        })
        return
      } else if (this.analysis_latitudes == 2 && costcenterId == '') {
        this.$message({
          message: '请选择成本中心',
          type: 'warning'
        })
        return
      } else if (this.analysis_latitudes == 1 && deptId == '') {
        this.$message({
          message: '请选择部门',
          type: 'warning'
        })
        return
      }
      let dat = {};
      if (this.analysis_latitudes == 1) {
        dat = {
          current: this.statime + ' 00:00:00',
          periodType: timeframes,
          scale: analysislatitudes,
          refferId: parseInt(deptId)
        }
      } else if (this.analysis_latitudes == 2) {
        dat = {
          current: this.statime + ' 00:00:00',
          periodType: timeframes,
          scale: analysislatitudes,
          refferId: parseInt(costcenterId)
        }
      } else {
        dat = {
          current: this.statime + ' 00:00:00',
          periodType: timeframes,
          scale: analysislatitudes
        }
      }
      this.loading = true;
      try {
        let res = await this.$api.travelreport.reporttotal(dat);
        this.loading = false;
        if (res.code == 200) {
          let dt = res.data;
          if (res.data == null || res.data.length == 0) {
            this.dataFlag = true
            this.$message({
              message: '数据为空！',
              type: 'warning'
            })
            return
          }
          this.amountofmoney[0].value = dt.quantity; //报销总量
          this.amountofmoney[0].yearonyear = dt.quantityYoyRatio; //报销总量同比
          this.amountofmoney[0].monthonmonth = dt.quantityMomRatio; //报销总量环比
          this.amountofmoney[1].value = dt.totalAmount; //总报销费用
          this.amountofmoney[1].yearonyear = dt.totalAmountYoyRatio; //总报销费用同比
          this.amountofmoney[1].monthonmonth = dt.totalAmountMomRatio; //总报销费用环比
          this.amountofmoney[2].value = dt.violations; //超标单数
          this.amountofmoney[2].yearonyear = dt.violationsYoyRatio; //超标单数用比
          this.amountofmoney[2].monthonmonth = dt.violationsMomRatio; //超标单数环比
          this.details = dt.details;
          this.compareMap = dt.violationAnalyzeReport.compareMap;
          this.reasonMap = dt.violationAnalyzeReport.reasonMap;
          this.initCharts(1); //保险费用占比
          this.initChartsy(1); //总费用环比
          this.initCharts_s(1); //月度消费
          this.initCharts_reason(1); //超规原因
          this.travelexpenses = [];
          this.reimbursements = [];
          for (let k in this.details) {
            if (this.details[k].goodsType == 1) { //国内机票
              let giks = [{
                name: 1,
                charges: '票价',
                reimbursement: this.details[k].airDetail.ticketQuantity,
                proportion: this.details[k].quantityRatio,
                reimbursementprc: this.details[k].airDetail.parPrice,//机票票价
                reimbursementamount: this.details[k].airDetail.parPriceRatio,//票票价占比
                standardamount: '',
                totaloverstandard: '',
                standard: ''
              }, {
                name: 1,
                charges: '机建/燃油/税',
                reimbursement: this.details[k].airDetail.ticketQuantity,
                proportion: this.details[k].quantityRatio,
                reimbursementprc: this.details[k].airDetail.airTaxFee,//税费
                reimbursementamount: this.details[k].airDetail.airTaxFeeRatio,//税费占比
                standardamount: '',
                totaloverstandard: '',
                standard: ''
              }, {
                name: 1,
                charges: '改签/升舱',
                reimbursement: this.details[k].airDetail.changeQuantity,
                proportion: this.details[k].airDetail.changeQuantityRatio,
                reimbursementprc: this.details[k].airDetail.changeFee,//改签费
                reimbursementamount: this.details[k].airDetail.changeFeeRatio,//改签费占比
                standardamount: '',
                totaloverstandard: '',
                standard: ''
              }, {
                name: 1,
                charges: '退票',
                reimbursement: this.details[k].airDetail.refundQuantity,
                proportion: this.details[k].airDetail.refundQuantityRatio,
                reimbursementprc: this.details[k].airDetail.refundFee,//退票费
                reimbursementamount: this.details[k].airDetail.refundFeeRatio,//退票费占比
                standardamount: '',
                totaloverstandard: '',
                standard: ''
              }, {
                name: 1,
                charges: '保险',
                reimbursement: this.details[k].airDetail.insuranceQuantity,
                proportion: this.details[k].airDetail.insuranceQuantityRatio,
                reimbursementprc: this.details[k].airDetail.airInsuranceFee,//机票保险费
                reimbursementamount: this.details[k].airDetail.airInsuranceFeeRatio,//机票保险费占比
                standardamount: '',
                totaloverstandard: '',
                standard: ''
              }, {
                name: 1,
                charges: '小计',
                reimbursement: this.details[k].airDetail.quantitySum,
                proportion: this.details[k].airDetail.quantitySumRatio,
                reimbursementprc: this.details[k].airDetail.airTicketSum,//机票小计
                reimbursementamount: this.details[k].airDetail.airTicketSumRatio,//机票小计占比
                standardamount: this.details[k].standard,
                totaloverstandard: this.details[k].violations,
                standard: this.details[k].violationRatio
              }]
              this.travelexpenses = [...this.travelexpenses, ...giks];
            } else {
              this.travelexpenses.push({
                name: this.details[k].goodsType,//类型
                charges: '',//收费项
                reimbursement: this.details[k].quantity,//实际报销数量
                proportion: this.details[k].quantityRatio,//数量占比
                reimbursementprc: this.details[k].reimbursement,//实际报销金额
                reimbursementamount: this.details[k].reimbursementRatio,//实际报销金额占比
                standardamount: this.details[k].standard,//标准金额
                totaloverstandard: this.details[k].violations,//超标总额
                standard: this.details[k].violationRatio,//超标占比
              })
            }
          }
          for (let k in this.details) {
            if (this.details[k].goodsType == 1) { //国内机票

              let reik = [{
                name: 1,
                charges: '票价',
                reimbursement: this.details[k].airDetail.ticketQuantity,
                rearyear: this.details[k].quantityYoyRatio,
                reonthmonth: this.details[k].quantityMomRatio,
                reimbursementamount: this.details[k].airDetail.parPrice,
                amaryear: this.details[k].airDetail.parPriceYoyRatio,
                amonthmonth: this.details[k].airDetail.parPriceMomRatio,
              }, {
                name: 1,
                charges: '机建/燃油/税',
                reimbursement: this.details[k].airDetail.ticketQuantity,
                rearyear: this.details[k].quantityYoyRatio,
                reonthmonth: this.details[k].quantityMomRatio,
                reimbursementamount: this.details[k].airDetail.airTaxFee,
                amaryear: this.details[k].airDetail.airTaxFeeYoyRatio,
                amonthmonth: this.details[k].airDetail.airTaxFeeMomRatio,
              }, {
                name: 1,
                charges: '改签/升舱',
                reimbursement: this.details[k].airDetail.changeQuantity,
                rearyear: this.details[k].airDetail.changeQuantityYoyRatio,
                reonthmonth: this.details[k].airDetail.changeQuantityMomRatio,
                reimbursementamount: this.details[k].airDetail.changeFee,
                amaryear: this.details[k].airDetail.changeFeeYoyRatio,
                amonthmonth: this.details[k].airDetail.changeFeeMomRatio,
              }, {
                name: 1,
                charges: '退票',
                reimbursement: this.details[k].airDetail.refundQuantity,
                rearyear: this.details[k].airDetail.refundQuantityYoyRatio,
                reonthmonth: this.details[k].airDetail.refundQuantityMomRatio,
                reimbursementamount: this.details[k].airDetail.refundFee,
                amaryear: this.details[k].airDetail.refundFeeYoyRatio,
                amonthmonth: this.details[k].airDetail.refundFeeMomRatio,
              }, {
                name: 1,
                charges: '保险',
                reimbursement: this.details[k].airDetail.insuranceQuantity,
                rearyear: this.details[k].airDetail.insuranceQuantityYoyRatio,
                reonthmonth: this.details[k].airDetail.insuranceQuantityMomRatio,
                reimbursementamount: this.details[k].airDetail.airInsuranceFee,
                amaryear: this.details[k].airDetail.airInsuranceFeeYoyRatio,
                amonthmonth: this.details[k].airDetail.airInsuranceFeeMomRatio,
              }, {
                name: 1,
                charges: '小计',
                reimbursement: this.details[k].quantity,
                rearyear: this.details[k].quantityYoyRatio,
                reonthmonth: this.details[k].quantityMomRatio,
                reimbursementamount: this.details[k].airDetail.airTicketSum,
                amaryear: this.details[k].airDetail.airTicketSumYoyRatio,
                amonthmonth: this.details[k].airDetail.airTicketSumMomRatio,
              }]
              this.reimbursements = [...this.reimbursements, ...reik];
            } else {
              this.reimbursements.push({
                name: this.details[k].goodsType,//类型
                charges: '',//收费项
                reimbursement: this.details[k].quantity,
                rearyear: this.details[k].quantityYoyRatio,
                reonthmonth: this.details[k].quantityMomRatio,
                reimbursementamount: this.details[k].reimbursement,
                amaryear: this.details[k].reimbursementYoyRatio,
                amonthmonth: this.details[k].reimbursementMomRatio,
              })
            }
          }
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      } catch (e) {
        this.loading = false;
        //TODO handle the exception
      }
    },
    sename(va) {
      if (va == 1) {
        return '机票'
      } else if (va == 3) {
        return '保险'
      } else if (va == 4) {
        return '酒店'
      } else if (va == 10) {
        return '火车'
      } else if (va == 13) {
        return '叫车'
      }
    },
    //   renames(na) {
    //   if (na == 3) {
    //     return '保险'
    //   } else if (na == 4) {
    //     return '酒店'
    //   } else if (na == 10) {
    //     return '火车'
    //   } else if (na == 13) {
    //     return '叫车'
    //   } else if (na == 1) {
    //     return '机票'
    //   }
    // },

    compare(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
      }
    },
    initCharts_reason(w) { //超标原因
      let details = this.reasonMap;
      let name = []; //超标原因
      let value = []; //超标次数
      for (let k in details) {
        value.push(details[k]);
        name.push(k);
      }
      let myChart;
      if (w == 1) {
        myChart = this.$echarts.init(this.$refs.chart_reason);
      } else {
        myChart = this.$echarts.init(this.$refs.chart_big);
        myChart.clear();
      }
      // 绘制图表
      myChart.setOption({
        title: {
          text: '超标原因分析',
          left: 'center',
          top: '10'
        },
        grid: {
          x: 80,
          y: 80,
        },
        tooltip: {},
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'category',
          data: name,
          axisLabel: {
            show: true,
            interval: 0, //强制所有标签显示
            align: 'right',
            margin: 0, //标签向右移动 如果yAxis 跟 xAxis换了,这个margin应该调为0才能看见标签显示
            textStyle: {
              color: "#000",
            },
            formatter: function (params) { //标签输出形式 ---请开始你的表演
              var index = 5;
              var newstr = '';
              for (var i = 0; i < params.length; i += index) {
                var tmp = params.substring(i, i + index);
                newstr += tmp + '\n';
              }
              if (newstr.length > 5)
                return newstr.substring(0, 5) + '...';
              else
                return '\n' + newstr;
            },
          },
        },
        series: [{
          name: '超标次数',
          type: 'bar',
          data: value,
          itemStyle: {
            normal: {
              color: '#4495E4'
            }
          }

        }],
        //用formatter回调函数显示单项数据内容
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            var color = params.color; //图例颜色
            var htmlStr = '<div>';
            htmlStr += '原因：' + params.name + '<br/>'; //x轴的名称
            htmlStr +=
                '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' +
                color + ';"></span>';
            htmlStr += params.seriesName + '：' + params.value + '次';
            htmlStr += '</div>';
            return htmlStr;
          }
        }
      });
    },
    initCharts_s(w) {
      let details = this.compareMap;
      let actual = []; //实报金额
      let over = []; //超出金额
      let standard = []; //标准金额
      let senames = [];
      var stnem = ''
      if (this.time_frames == 2) { //判断是不是月份
        stnem = '日'
      } else {
        stnem = '月'
      }
      for (let k in details) {
        actual.push(details[k].actual);
        over.push(details[k].over);
        standard.push(details[k].standard);
        senames.push(k + stnem);
      }
      let myChart;
      if (w == 1) {
        myChart = this.$echarts.init(this.$refs.chart_s);
      } else {
        myChart = this.$echarts.init(this.$refs.chart_big);
        myChart.clear();
      }
      // 绘制图表
      myChart.setOption({
        title: {
          text: this.testpost + '差旅费用曲线图',
          left: 'center',
          top: '10'
        },
        legend: {
          orient: 'horizontal',
          top: '40',
          data: ['实报金额', '标准金额', '超出金额']
        },
        grid: {
          x: 80,
          y: 80,
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: senames
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          name: '实报金额',
          type: 'bar',
          data: actual,
          itemStyle: {
            normal: {
              color: '#4495E4'
            }
          }

        }, {
          name: '超出金额',
          type: 'line',
          data: over,
          itemStyle: {
            normal: {
              color: '#0FCD92'
            }
          }
        }, {
          name: '标准金额',
          type: 'bar',
          data: standard,
          itemStyle: {
            normal: {
              color: '#05B8E4'
            }
          }
        }],
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            var color = params.color; //图例颜色
            var htmlStr = '<div>';
            htmlStr += '时间：' + params.name + '<br/>'; //x轴的名称
            htmlStr +=
                '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' +
                color + ';"></span>';
            htmlStr += params.seriesName + '：' + params.value + '元';
            htmlStr += '</div>';
            return htmlStr;
          }
        }
      });
    },
    initCharts(w) {
      let details = this.details;
      let sutlist = [];
      let senames = [];
      details.sort(this.compare('reimbursementRatio'));
      if (details.length > 0) {
        for (let k in details) {
          sutlist.push({
            name: this.sename(details[k].goodsType),
            value: details[k].reimbursementRatio
          })
          senames.push(this.sename(details[k].goodsType))
        }
      }
      let myChart;
      if (w == 1) {
        myChart = this.$echarts.init(this.$refs.chart);
      } else {
        myChart = this.$echarts.init(this.$refs.chart_big);
        myChart.clear();
      }
      // 绘制图表
      myChart.setOption({
        title: {
          text: '差旅报销费用占比',
          left: 'center',
          top: '10'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top: 'center',
          data: senames
        },
        tooltip: {},
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        },
        series: [{
          top: '20', //距离容器上测的距离
          left: '100',
          type: 'pie',
          radius: '65%',
          data: sutlist,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            normal: {
              color: function (params) {
                //自定义颜色
                var colorList = [
                  '#3D82A4', '#4796BD', '#50A7D2', '#58B6E5', '#8AC5EA'
                ];
                return colorList[params.dataIndex]
              }
            }
          }
        }],
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            var color = params.color; //图例颜色
            var htmlStr = '<div>';
            htmlStr +=
                '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' +
                color + ';"></span>';
            htmlStr += params.name + '：' + params.value + '%';
            htmlStr += '</div>';
            return htmlStr;
          }
        }
      });
    },
    initChartsy(w) {
      let details = this.details;
      let xflist = []; //消费金额
      let tblist = []; //同比
      let hblist = []; //环比
      let senames = [];
      details.sort(this.compare('reimbursement'));
      if (details.length > 0) {
        for (let k in details) {
          xflist.push(details[k].reimbursement);
          tblist.push(details[k].reimbursementYoyRatio);
          hblist.push(details[k].reimbursementMomRatio);
          senames.push(this.sename(details[k].goodsType));
        }
      }
      let myChart;
      if (w == 1) {
        myChart = this.$echarts.init(this.$refs.charts);
      } else {
        myChart = this.$echarts.init(this.$refs.chart_big);
        myChart.clear();
      }
      // 绘制图表
      myChart.setOption({
        title: {
          text: '报销总费用环比',
          left: 'center',
          top: '10'
        },
        legend: {
          orient: 'horizontal',
          top: '40',
          data: ['报销金额', '同比', '环比']
        },
        grid: {
          x: 80,
          y: 80,
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: senames
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          name: '报销金额',
          type: 'bar',
          data: xflist,
          itemStyle: {
            normal: {
              color: '#77A5EA'
            }
          }

        }, {
          name: '同比',
          type: 'bar',
          data: tblist,
          itemStyle: {
            normal: {
              color: '#88CBEC'
            }
          }
        }, {
          name: '环比',
          type: 'bar',
          data: hblist,
          itemStyle: {
            normal: {
              color: '#70D2A5'
            }
          }
        }],
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            var color = params.color; //图例颜色
            var htmlStr = '<div>';
            htmlStr +=
                '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' +
                color + ';"></span>';
            htmlStr += params.name + '：' + params.value + '元';
            htmlStr += '</div>';
            return htmlStr;
          }
        }
      });
    }
  }
}
</script>

<style scoped lang="less">

.travelbox {
  width: 1180px;
  margin: 0 auto;

    /deep/ .el-loading-mask{
    &>.el-loading-spinner{
      top: 20%;
    }
  }
  .tar_setects {
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    padding: 30px 30px 30px 30px;
    background-color: #FFFFFF;
    
    .tar_lid{
      margin: 0 30px 10px 0;
      font-size: 16px;
      color: #3c85fd;
      line-height: 40px;
    }
    .tat_liop {
      margin: 0 30px 10px 0;
      display: flex;
      align-items: center;
      color: #666;
      .tat_tbns {
        width: 80px;
        margin: 0 10px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background-color: #FF9A33;
        color: #FFFFFF;
        font-size: 14px;
        border-radius: 4px;
        cursor: pointer;
      }

      .tat_tbns:hover {
        opacity: 0.8;
      }
    }
    &>div:last-child{
      margin-right: 0;
    }
  }

  .vatype {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    background-color: #FFFFFF;
    padding: 10px 0;
  }

  .boxshow {
    padding: 20px 60px;
    background-color: #FFFFFF;

    .boxlistops {
      width: calc(100% - 80px);
      padding: 10px 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #F8F7F6;

      .box_flexs {
        flex: 1;
        text-align: center;

        .box_fons {
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;

          .iconfont {
            color: #FF030D;
            font-size: 14px;
          }
        }
      }
    }
    .no-data{
      position: relative;
      .nodata{
        min-width: 1060px;
      }
    }
    .boxls {
      width: 100%;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;

      .boxlsox {
        width: 49%;
        background-color: #F8F7F6;
        display: flex;
        padding: 20px 0 20px 0;
        justify-content: center;
        position: relative;

        .boxbig {
          position: absolute;
          cursor: pointer;
          font-size: 30px;
          color: #1782FE;
          top: 30px;
          right: 45px;
          z-index: 99;
        }

        .chartsty {
          width: 500px;
          height: 450px;
          background-color: #FFFFFF;
        }
      }
    }

    .tables {
      margin-top: 20px;

      .tabtop {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-weight: 600;
        font-size: 15px;
        background-color: #3c85fd;
        text-align: center;
        color: #FFFFFF;
      }
    }
  }

  .flobog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;

    .eachartbig {
      border-radius: 10px;
      background-color: #FFFFFF;
    }
  }

}
</style>
