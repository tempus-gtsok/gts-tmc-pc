<template>
<!-- 差旅报告-> 火车票 -->
  <div>
    <div class="travelbox">
      <travel_report :tarlist_ids="tarlist_id"></travel_report>
      <div class="tarblist">
        <div class="tar_lid">
          <div class="block">
            <div class="bl_matop">
              <div>
                <span>销售单号：</span>
                <el-input
                  v-model="search.singleNumber"
                  placeholder="请输入销售单号"
                  class="elinput"
                ></el-input>
              </div>
              <div>
                <span class="demonstration">创建日期：</span>
                <el-date-picker
                  v-model="search.scheduledDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </div>
              <div class="Spans_travelerIPhone">
                <span class="Spans_travelerIPhone">出行人：</span>
                <el-input
                  v-model="search.travelerName"
                  placeholder="出行人"
                  class="travelerName"
                ></el-input>
              </div>
              <div class="Spans_travelerIPhone title_top">
                <span class="title_top">订单类型：</span>
                <div class="elinput">
                  <el-select
                    v-model="search.orderType"
                    clearable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in orderType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="Spans_travelerIPhone">
                <span class="Spans_travelerIPhone">出行人电话：</span>
                <el-input
                  v-model="search.travelerIPhone"
                  placeholder="出行人电话"
                  class="travelerInput"
                ></el-input>
              </div>
              <div>
                <span class="Spans">出发地点：</span>
                <citysearchs
                  style="width: 346px;  height: 40px"
                  @changers="listchangs"
                  :ctiys="citylist"
                ></citysearchs>
              </div>
              <div class="Spans_travelerIPhone">
                <span class="Spans">预定人：</span>
                <el-input
                  v-model="search.traveler"
                  placeholder="预定人"
                  class="elinput input_left"
                ></el-input>
              </div>
              <div class="Spans_travelerIPhone title_top">
                <span class="department department_left">预定部门：</span>
                <el-input
                  v-model="search.department"
                  placeholder="预定部门"
                  class="travelerInput department_input"
                ></el-input>
              </div>
            </div>

            <div style="text-align: center">
              <el-button
                type="primary"
                icon="el-icon-search"
                style="margin: 20px 0 10px 0; width: 200px"
                @click="on_search"
                >搜索
              </el-button>
              <el-button
                type="primary"
                style="margin: 20px 0 10px 10px; width: 200px"
                @click="exportReport"
                v-if="rotes('tms:report:button')"
                >导出
              </el-button>
              <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
            </div>
          </div>
        </div>
      </div>
      <div class="boxshow">
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中,请耐心等待"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.6)"
          border
          :data="rows"
          :header-cell-style="{background:'#f6f6f6',color:'#666'}"
          style="width: 100%; height: 100%"
        >
          <el-table-column
            fixed
            prop="customerName"
            label="客户名称"
            width="120"
          >
          </el-table-column>
          <el-table-column prop="recordNo" label="订单号" width="170">
          </el-table-column>
          <el-table-column prop="buyPrice" label="序号" width="170">
          </el-table-column>
          <el-table-column prop="passengerName" label="乘车人" width="120">
          </el-table-column>
          <el-table-column prop="address" label="工作地点" width="160">
          </el-table-column>
          <el-table-column prop="passengerType" label="乘车人类别" width="120">
          </el-table-column>
          <el-table-column prop="deptName" label="部门" width="120">
          </el-table-column>
          <el-table-column prop="staffLevel" label="职级" width="120">
          </el-table-column>
          <el-table-column prop="employeeNo" label="工号" width="160">
          </el-table-column>
          <el-table-column prop="taskType" label="报销科目" width="120">
          </el-table-column>
          <el-table-column prop="createTime" label="出票日期" width="160">
          </el-table-column>
          <el-table-column prop="departureTime" label="乘车日期" width="160">
          </el-table-column>
          <el-table-column prop="travel" label="行程" width="160">
          </el-table-column>
          <el-table-column prop="trainNo" label="车次" width="120">
          </el-table-column>
          <el-table-column prop="travelNo" label="出差单号" width="160">
          </el-table-column>
          <el-table-column prop="costCenterName" label="成本中心" width="120">
          </el-table-column>
          <el-table-column prop="projectCode" label="项目代码" width="120">
          </el-table-column>
          <el-table-column prop="salePrice" label="销售价" width="150">
          </el-table-column>
          <el-table-column prop="serviceFee" label="代理费" width="120">
          </el-table-column>
          <el-table-column prop="premium" label="销售总价" width="120">
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="160">
          </el-table-column>
          <el-table-column prop="seatClass" label="席别" width="120">
          </el-table-column>
          <el-table-column prop="certNo" label="证件号码" width="160">
          </el-table-column>
          <el-table-column prop="oaTravelNo" label="OA出差单号" width="160">
          </el-table-column>
          <div slot="empty" class="noData">
            <img
              src="static/image/reportNoData.png"
              width="120"
              style="margin-top: 20px"
            />
            <p>暂无数据</p>
          </div>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="curPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="rowNum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="text-align: center; margin-top: 10px"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import Travel_report from "./travel_report";
import citysearchs from "../../components/common/citycomponents_t";
import { formatDate } from "@/utils/common";
export default {
  name: "Trainreport",
  components: { citysearchs, Travel_report },
  data() {
    return {
      cityslist: [], //火车城市
      isbeforehand: [],
      citylist: [],
      tarlist_id: 6,
      rows: [], //火车票报表数据
      curPage: 1, // 当前页
      rowNum: 10, // 每页显示条目个数
      total: 0, // 总条目数
      loading: true,
      fullscreenLoading: false,
      exporttrainreport: [],
      orderType: [
        {
          value: 1,
          label: "正常票",
        },
        {
          value: 2,
          label: "退票",
        },
        {
          value: 3,
          label: "改签",
        },
      ],
      search: {
        singleNumber: "", //销售单号
        scheduledDate: "", //预定日期
        departuedate: "", //出发日期
        traveler: "", //预定人/出行人
        travelerName: "",
        department: "", //预定部门
        travelerIPhone: "", //出行人电话
        orderType: 1, //订单类型
      },
      root: "",
    };
  },
  created() {
    if (this.rotes("tms:report:button")) {
      this.root = 1;
    } else {
      this.root = 0;
    }
    this.pickerOptions();
    this.trainreport();
  },
  mounted() {
    this.tarlist_id = this.$route.query.tarlist_id;
  },
  methods: {
    listchangs(va) {
      //火车
      this.cityslist = va;
    },
    on_search() {
      //搜索
      this.loading = true;
      this.trainreport();
    },
    // formatDate(value) {
    //   //时间转换
    //   if (value != null && value != "") {
    //     let date = new Date(value);
    //     let y = date.getFullYear();
    //     let MM = date.getMonth() + 1;
    //     MM = MM < 10 ? "0" + MM : MM;
    //     let d = date.getDate();
    //     d = d < 10 ? "0" + d : d;
    //     let h = date.getHours();
    //     h = h < 10 ? "0" + h : h;
    //     let m = date.getMinutes();
    //     m = m < 10 ? "0" + m : m;
    //     let s = date.getSeconds();
    //     s = s < 10 ? "0" + s : s;
    //     return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    //   } else {
    //     return value;
    //   }
    // },
    async trainreport() {
      let pageVo = {
        curPage: this.curPage,
        rowNum: this.rowNum,
      };
      let dat = {};
      if (this.cityslist != "" && this.cityslist != null) {
        if (
          this.search.scheduledDate != null &&
          this.search.scheduledDate != "" &&
          this.search.departuedate != null &&
          this.search.departuedate != ""
        ) {
          dat = {
            root: this.root,
            saleOrderNo: this.search.singleNumber,
            beginTime: formatDate(this.search.scheduledDate[0]),
            endTime: formatDate(this.search.scheduledDate[1]),
            beginDepartureTime: formatDate(this.search.departuedate[0]),
            endDepartureTime: formatDate(this.search.departuedate[1]),
            beginSite: this.cityslist[0].name,
            endSite: this.cityslist[1].name,
            applyer: this.search.traveler,
            travelerName: this.search.travelerName,
            travelerDept: this.search.department,
            travelerPhone: this.search.travelerIPhone,
            changeType: this.search.orderType,
          };
        } else if (
          this.search.departuedate != null &&
          this.search.departuedate != ""
        ) {
          dat = {
            root: this.root,
            saleOrderNo: this.search.singleNumber,
            beginDepartureTime: formatDate(this.search.departuedate[0]),
            endDepartureTime: formatDate(this.search.departuedate[1]),
            beginSite: this.cityslist[0].name,
            endSite: this.cityslist[1].name,
            applyer: this.search.traveler,
            travelerName: this.search.travelerName,
            travelerDept: this.search.department,
            travelerPhone: this.search.travelerIPhone,
            changeType: this.search.orderType,
          };
        } else if (
          this.search.scheduledDate != null &&
          this.search.scheduledDate != ""
        ) {
          dat = {
            root: this.root,
            saleOrderNo: this.search.singleNumber,
            beginTime: formatDate(this.search.scheduledDate[0]),
            endTime: formatDate(this.search.scheduledDate[1]),
            beginSite: this.cityslist[0].name,
            endSite: this.cityslist[1].name,
            applyer: this.search.traveler,
            travelerName: this.search.travelerName,
            travelerDept: this.search.department,
            travelerPhone: this.search.travelerIPhone,
            changeType: this.search.orderType,
          };
        } else {
          dat = {
            root: this.root,
            saleOrderNo: this.search.singleNumber,
            beginSite: this.cityslist[0].name,
            endSite: this.cityslist[1].name,
            applyer: this.search.traveler,
            travelerName: this.search.travelerName,
            travelerDept: this.search.department,
            travelerPhone: this.search.travelerIPhone,
            changeType: this.search.orderType,
          };
        }
        /*----------------------------------------------------*/
      } else {
        if (
          this.search.scheduledDate != null &&
          this.search.scheduledDate != "" &&
          this.search.departuedate != null &&
          this.search.departuedate != ""
        ) {
          dat = {
            root: this.root,
            saleOrderNo: this.search.singleNumber,
            beginTime: formatDate(this.search.scheduledDate[0]),
            endTime: formatDate(this.search.scheduledDate[1]),
            beginDepartureTime: formatDate(this.search.departuedate[0]),
            endDepartureTime: formatDate(this.search.departuedate[1]),
            applyer: this.search.traveler,
            travelerName: this.search.travelerName,
            travelerDept: this.search.department,
            travelerPhone: this.search.travelerIPhone,
            changeType: this.search.orderType,
          };
        } else if (
          this.search.scheduledDate != null &&
          this.search.scheduledDate != ""
        ) {
          dat = {
            root: this.root,
            saleOrderNo: this.search.singleNumber,
            beginTime: formatDate(this.search.scheduledDate[0]),
            endTime: formatDate(this.search.scheduledDate[1]),
            applyer: this.search.traveler,
            travelerName: this.search.travelerName,
            travelerDept: this.search.department,
            travelerPhone: this.search.travelerIPhone,
            changeType: this.search.orderType,
          };
        } else if (
          this.search.departuedate != null &&
          this.search.departuedate != ""
        ) {
          dat = {
            root: this.root,
            saleOrderNo: this.search.singleNumber,
            beginDepartureTime: formatDate(this.search.departuedate[0]),
            endDepartureTime: formatDate(this.search.departuedate[1]),
            applyer: this.search.traveler,
            travelerName: this.search.travelerName,
            travelerDept: this.search.department,
            travelerPhone: this.search.travelerIPhone,
            changeType: this.search.orderType,
          };
        } else {
          dat = {
            root: this.root,
            saleOrderNo: this.search.singleNumber,
            applyer: this.search.traveler,
            travelerName: this.search.travelerName,
            travelerDept: this.search.department,
            travelerPhone: this.search.travelerIPhone,
            changeType: this.search.orderType,
          };
        }
      }

      let res = await this.$api.travelreport.getTraList({
        pageVO: pageVo,
        tmsTrainTicketVo: dat,
      });
      if (res.code == 200) {
        this.rows =res.data.rows;
        this.total = res.data.records;
        this.loading = false;
      } else {
        if (res.message != null && res.message !== "") {
          this.$message.error(res.message);
          this.loading = false;
        } else {
          this.$message.error(res.code + "查询失败！");
          this.loading = false;
        }
      }
    },
    handleSizeChange(val) {
      this.rowNum = val;
      this.loading = true;
      this.trainreport();
    },
    handleCurrentChange(val) {
      this.curPage = val;
      this.loading = true;
      this.trainreport();
    },
    pickerOptions() {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24);
      this.search.scheduledDate = [start, end];
    },
    exportReport() {
      const loading = this.$loading({
        lock: true,
        text: "获取下载中！请耐心等待！",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$api.travelreport
        .selectQueryTrainTicketList({
          changeType: this.search.orderType,
        })
        .then((res) => {
          const link = document.createElement("a");
          let blob = new Blob([res], { type: "application/vnd.ms-excel" });
          link.style.display = "none";
          link.href = URL.createObjectURL(blob);
          link.download = "火车报表"; //下载的文件名
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => {
            loading.close();
          });
          this.$message.success("导出报表成功");
        })
        .catch((error) => {
          this.$message.error("网络错误！导出失败,请稍后再试！");
        });
    },
  },
};
</script>

<style scoped lang="less">
/deep/ .el-table__empty-text {
  padding-right: 52%;
  line-height: 40px;
  width: 200px;
  color: #909399;
  margin-left: 0;
}
/deep/ .el-table__empty-block{
  justify-content: flex-start;
}
.elinput {
  width: 160px;
}

.travelerName {
  width: 160px;
}

.travelerInput {
  width: 160px;
  margin-left: 6px;
}



.theSecondColumn {
  display: flex;
  margin-top: 20px;
}


/deep/ ::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

.boxshow {
  margin-top: 10px;
  padding: 20px 60px;
  background-color: #ffffff;
}

.travelbox {
  width: 1180px;
  margin: 0 auto;
  .tarblist {
    height: 300px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;

    .tar_lid {
      margin-top: 20px;
      color: #666;
      max-width: 1500px;
      margin: 0 auto;

      .bl_matop {
        display: flex;
        flex-wrap: wrap;
        padding: 0 20px;
        & > div {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          margin-right: 18px;
        }
        &>.Spans_travelerIPhone{
          &>div{
              width: 136px;
          }
        }
        &>.title_top{
            margin-right: 0;
          }
      }
    }
  }
}
.noData{
	width: 1059px;
}
</style>