<template>
  <div>
    <div class="travelbox">
      <travel_report :tarlist_ids="tarlist_id"></travel_report>
      <div class="tarblist" style="height: 300px">
        <div class="tar_lid">
          <div class="block">
            <div class="orderName">
              <div class="singleNumber">
                <span>交易单号：</span>
                <el-input
                  v-model="search.singleNumber"
                  placeholder="请输入交易单号"
                  class="elinput"
                ></el-input>
              </div>
              <div class="daterange">
                <span class="demonstration">预定日期：</span>
                <el-date-picker
                  v-model="search.scheduledDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </div>
              <div class="daterange demonstration" >
                <span class="demonstration">出发日期：</span>
                <el-date-picker
                  v-model="search.departuedate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </div>
              <div>
                <span class="demonstration">出行人：</span>
                <el-input
                  v-model="search.traveler"
                  placeholder="出行人"
                  class="elinput"
                ></el-input>
              </div>
              <div>
                <span class="department">预定部门：</span>
                <el-input
                  v-model="search.department"
                  placeholder="预定部门"
                  class="elinput"
                  style="margin-left: 1.5px"
                ></el-input>
              </div>
              <div>
                <span class="Spans">出发地点：</span>
                <citysearch
                  style="
                    width: 350px;
                    margin-left: 6px;
                    height: 40px;
                    min-width: 100px;
                  "
                  @changers="listchang"
                  :ctiys="citylist"
                ></citysearch>
              </div>
              <div class="order">
                <span class="Spans">订单类型：&nbsp;</span>
                <div class="orderType">
                  <el-select
                    v-model="search.orderType"
                    clearable
                    placeholder="请选择"
                    class="SpanType"
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
              <div>
                <span class="SpanIp">出行人电话：</span>
                <el-input
                  v-model="search.travelerIPhone"
                  placeholder="出行人电话"
                  maxlength="11"
                  class="travelerInput"
                ></el-input>
              </div>
              <div>
                <span class="travelerName">预订人：</span>
                <el-input
                  v-model="search.travelerName"
                  placeholder="预订人"
                  class="travelerName"
                ></el-input>
              </div>
              <div>
                <span class="flightNumber">航班号：</span>
                <el-input
                  v-model="search.flightNumber"
                  placeholder="航班号"
                  class="flightNumber_input"
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
          :header-cell-style="{background:'#f6f6f6',color:'#666'}"
          :data="rows"
          style="width: 100%; height: 100%"
        >
          <el-table-column fixed prop="clientName" label="客户名称" width="120">
          </el-table-column>
          <el-table-column prop="ticketNo" label="票号" width="170">
          </el-table-column>
          <el-table-column prop="sequence" label="序号" width="160">
          </el-table-column>
          <el-table-column prop="passengerName" label="乘机人" width="120">
          </el-table-column>
          <el-table-column prop="enName" label="英文名" width="120">
          </el-table-column>
          <el-table-column prop="ageType" label="乘机人类别" width="120">
          </el-table-column>
          <el-table-column prop="workplace" label="工作" width="160">
          </el-table-column>
          <el-table-column prop="humanRelations" label="人事关系" width="120">
          </el-table-column>
          <el-table-column prop="primarySector" label="一级部门" width="120">
          </el-table-column>
          <el-table-column prop="jobLevel" label="职级" width="120">
          </el-table-column>
          <el-table-column prop="employeeNo" label="工号" width="120">
          </el-table-column>
          <el-table-column prop="subjects" label="报销科目" width="120">
          </el-table-column>
          <el-table-column prop="ticketTime" label="出票日期" width="170">
          </el-table-column>
          <el-table-column prop="applicationDate" label="申请日期" width="170">
          </el-table-column>
          <el-table-column prop="numberDays" label="提前预定天数" width="120">
          </el-table-column>
          <el-table-column prop="fiyTime" label="起飞日期" width="160">
          </el-table-column>
          <el-table-column prop="fiyDate" label="起飞时间" width="120">
          </el-table-column>
          <el-table-column prop="goodsType" label="国际/国内" width="150">
          </el-table-column>
          <el-table-column prop="voyage" label="航程" width="120">
          </el-table-column>
          <el-table-column prop="flightNo" label="航班" width="120">
          </el-table-column>
          <el-table-column prop="travelNo" label="出差单号" width="160">
          </el-table-column>
          <el-table-column
            prop="cpsCostCenterName"
            label="成本中心"
            width="160"
          >
          </el-table-column>
          <el-table-column prop="projectCode" label="项目代码" width="120">
          </el-table-column>
          <el-table-column prop="content" label="行程单金额" width="120">
          </el-table-column>
          <el-table-column prop="insuranceAmount" label="保险金额" width="120">
          </el-table-column>
          <el-table-column prop="tips" label="服务费" width="120">
          </el-table-column>
          <el-table-column prop="sum" label="总金额" width="120">
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="120">
          </el-table-column>
          <el-table-column prop="cabin" label="是否商务舱" width="120">
          </el-table-column>
          <el-table-column
            prop="ticketChangesAndRefunds"
            label="退改签"
            width="120"
          >
          </el-table-column>
          <el-table-column prop="factTicketNo" label="原票号" width="120">
          </el-table-column>
          <el-table-column prop="oaTravelNo" label="OA出差单号" width="120">
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
import citysearch from "@/components/common/citycomponents.vue";
export default {
  name: "domestic_air_ticket",
  components: {
    citysearch,
    Travel_report,
  },
  data() {
    return {
      cityslists: [], //飞机城市
      isbeforehand: [],
      citylist: [],
      tarlist_id: 2,
      rows: [], //机票报表数据
      curPage: 1, // 当前页
      rowNum: 10, // 每页显示条目个数
      total: 0, // 总条目数
      loading: true,
      exporttrainreport: [],
      orderType: [
        {
          value: 1,
          label: "出票",
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
        traveler: "", //出行人
        travelerName: "", //预定人
        department: "", //预定部门
        travelerIPhone: "", //出行人电话
        orderType: "", //订单类型
        flightNumber: "", //航班号
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
    listchang(va) {
      //飞机
      this.cityslists = va;
    },
    on_search() {
      //搜索
      this.loading = true;
      this.trainreport();
    },
    formatDate(value) {
      //时间转换
      if (value != null && value != "") {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? "0" + MM : MM;
        let d = date.getDate();
        d = d < 10 ? "0" + d : d;
        let h = date.getHours();
        h = h < 10 ? "0" + h : h;
        let m = date.getMinutes();
        m = m < 10 ? "0" + m : m;
        let s = date.getSeconds();
        s = s < 10 ? "0" + s : s;
        return y + "-" + MM + "-" + d;
      } else {
        return value;
      }
    },
    async trainreport() {
      //查询国内机票报表详情
      if (this.cityslists != "" && this.cityslists != null) {
        if (
          this.search.departuedate != null &&
          this.search.departuedate != "" &&
          this.search.scheduledDate != null &&
          this.search.scheduledDate != ""
        ) {
          let res = await this.$api.travelreport.getPage({
            pageVO: {
              curPage: this.curPage,
              rowNum: this.rowNum,
            },
            airTicketVO: {
              root: this.root,
              saleNo: this.search.singleNumber,
              appointmentTime: this.formatDate(this.search.scheduledDate[0]),
              overTime: this.formatDate(this.search.scheduledDate[1]),
              beginTime: this.formatDate(this.search.departuedate[0]),
              endTime: this.formatDate(this.search.departuedate[1]),
              departName: this.cityslists[0].name,
              arriveName: this.cityslists[1].name,
              pName: this.search.travelerName,
              createName: this.search.traveler,
              department: this.search.department,
              phone: this.search.travelerIPhone,
              orderType: this.search.orderType,
              flightNo: this.search.flightNumber,
            },
          });
          if (res.code == 200) {
            this.rows = res.data.rows;
            this.total = res.data.records;
            this.loading = false;
          } else {
            if (res.message != null && res.message !== "" && res.code !== 200) {
              this.$message.error(res.message);
            } else {
              this.$message.error(res.code + "查询失败！");
            }
          }
        } else if (
          this.search.scheduledDate != null &&
          this.search.scheduledDate != ""
        ) {
          let res = await this.$api.travelreport.getPage({
            pageVO: {
              curPage: this.curPage,
              rowNum: this.rowNum,
            },
            airTicketVO: {
              root: this.root,
              saleNo: this.search.singleNumber,
              appointmentTime: this.formatDate(this.search.scheduledDate[0]),
              overTime: this.formatDate(this.search.scheduledDate[1]),
              departName: this.cityslists[0].name,
              arriveName: this.cityslists[1].name,
              pName: this.search.traveler,
              createName: this.search.travelerName,
              department: this.search.department,
              phone: this.search.travelerIPhone,
              orderType: this.search.orderType,
              flightNo: this.search.flightNumber,
            },
          });
          if (res.code == 200) {
            this.rows = res.data.rows;
            this.total = res.data.records;
            this.loading = false;
          } else {
            if (res.message != null && res.message !== "" && res.code !== 200) {
              this.$message.error(res.message);
            } else {
              this.$message.error(res.code + "查询失败！");
            }
          }
        } else if (
          this.search.departuedate != null &&
          this.search.departuedate != ""
        ) {
          let res = await this.$api.travelreport.getPage({
            pageVO: {
              curPage: this.curPage,
              rowNum: this.rowNum,
            },
            airTicketVO: {
              root: this.root,
              saleNo: this.search.singleNumber,
              beginTime: this.formatDate(this.search.departuedate[0]),
              endTime: this.formatDate(this.search.departuedate[1]),
              pName: this.search.traveler,
              departName: this.cityslists[0].name,
              arriveName: this.cityslists[1].name,
              createName: this.search.travelerName,
              department: this.search.department,
              phone: this.search.travelerIPhone,
              orderType: this.search.orderType,
              flightNo: this.search.flightNumber,
            },
          });
          if (res.code == 200) {
            this.rows = res.data.rows;
            this.total = res.data.records;
            this.loading = false;
          } else {
            if (res.message != null && res.message !== "" && res.code !== 200) {
              this.$message.error(res.message);
            } else {
              this.$message.error(res.code + "查询失败！");
            }
          }
        } else if (
          this.search.scheduledDate == null ||
          (this.search.scheduledDate == "" &&
            this.search.departuedate == null) ||
          this.search.departuedate == ""
        ) {
          let res = await this.$api.travelreport.getPage({
            pageVO: {
              curPage: this.curPage,
              rowNum: this.rowNum,
            },
            airTicketVO: {
              root: this.root,
              saleNo: this.search.singleNumber,
              pName: this.search.traveler,
              departName: this.cityslists[0].name,
              arriveName: this.cityslists[1].name,
              createName: this.search.travelerName,
              department: this.search.department,
              phone: this.search.travelerIPhone,
              orderType: this.search.orderType,
              flightNo: this.search.flightNumber,
            },
          });
          if (res.code == 200) {
            this.rows = res.data.rows;
            this.total = res.data.records;
            this.loading = false;
          } else {
            if (res.message != null && res.message !== "" && res.code !== 200) {
              this.$message.error(res.message);
            } else {
              this.$message.error(res.code + "查询失败！");
            }
          }
        }
      } else {

        if (
          this.search.scheduledDate != null &&
          this.search.scheduledDate != "" &&
          this.search.departuedate != null &&
          this.search.departuedate != ""
        ) {
          let res = await this.$api.travelreport.getPage({
            pageVO: {
              curPage: this.curPage,
              rowNum: this.rowNum,
            },
            airTicketVO: {
              root: this.root,
              saleNo: this.search.singleNumber,
              appointmentTime: this.formatDate(this.search.scheduledDate[0]),
              overTime: this.formatDate(this.search.scheduledDate[1]),
              beginTime: this.formatDate(this.search.departuedate[0]),
              endTime: this.formatDate(this.search.departuedate[1]),
              pName: this.search.traveler,
              createName: this.search.travelerName,
              department: this.search.department,
              phone: this.search.travelerIPhone,
              orderType: this.search.orderType,
              flightNo: this.search.flightNumber,
            },
          });
          if (res.code == 200) {
            this.rows = res.data.rows;
            this.total = res.data.records;
            this.loading = false;
          } else {
            if (res.message != null && res.message !== "" && res.code !== 200) {
              this.$message.error(res.message);
            } else {
              this.$message.error(res.code + "查询失败！");
            }
          }
        } else if (
          this.search.scheduledDate != null &&
          this.search.scheduledDate != ""
        ) {
          let res = await this.$api.travelreport.getPage({
            pageVO: {
              curPage: this.curPage,
              rowNum: this.rowNum,
            },
            airTicketVO: {
              root: this.root,
              saleNo: this.search.singleNumber,
              appointmentTime: this.formatDate(this.search.scheduledDate[0]),
              overTime: this.formatDate(this.search.scheduledDate[1]),
              pName: this.search.traveler,
              createName: this.search.travelerName,
              department: this.search.department,
              phone: this.search.travelerIPhone,
              orderType: this.search.orderType,
              flightNo: this.search.flightNumber,
            },
          });
          if (res.code == 200) {
            this.rows = res.data.rows;
            this.total = res.data.records;
            this.loading = false;
          } else {
            if (res.message != null && res.message !== "" && res.code !== 200) {
              this.$message.error(res.message);
            } else {
              this.$message.error(res.code + "查询失败！");
            }
          }
        } else if (
          this.search.departuedate != null &&
          this.search.departuedate != ""
        ) {
          let res = await this.$api.travelreport.getPage({
            pageVO: {
              curPage: this.curPage,
              rowNum: this.rowNum,
            },
            airTicketVO: {
              root: this.root,
              saleNo: this.search.singleNumber,
              beginTime: this.formatDate(this.search.departuedate[0]),
              endTime: this.formatDate(this.search.departuedate[1]),
              pName: this.search.traveler,
              createName: this.search.travelerName,
              department: this.search.department,
              phone: this.search.travelerIPhone,
              orderType: this.search.orderType,
              flightNo: this.search.flightNumber,
            },
          });
          if (res.code == 200) {
            this.rows = res.data.rows;
            this.total = res.data.records;
            this.loading = false;
          } else {
            if (res.message != null && res.message !== "" && res.code !== 200) {
              this.$message.error(res.message);
            } else {
              this.$message.error(res.code + "查询失败！");
            }
          }
        } else if (
          this.search.scheduledDate == null ||
          (this.search.scheduledDate == "" &&
            this.search.departuedate == null) ||
          this.search.departuedate == ""
        ) {
          let res = await this.$api.travelreport.getPage({
            pageVO: {
              curPage: this.curPage,
              rowNum: this.rowNum,
            },
            airTicketVO: {
              root: this.root,
              saleNo: this.search.singleNumber,
              pName: this.search.traveler,
              createName: this.search.travelerName,
              department: this.search.department,
              phone: this.search.travelerIPhone,
              orderType: this.search.orderType,
              flightNo: this.search.flightNumber,
            },
          });
          if (res.code == 200) {
            this.rows = res.data.rows;
            this.total = res.data.records;
            this.loading = false;
          } else {
            if (res.message != null && res.message !== "" && res.code !== 200) {
              this.$message.error(res.message);
            } else {
              this.$message.error(res.code + "查询失败！");
            }
          }
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
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
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
        .QueryDownloadReport({
          root: 1,
        })
        .then((res) => {
          const link = document.createElement("a");
          let blob = new Blob([res], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          link.style.display = "none";
          link.href = URL.createObjectURL(blob);
          link.download = "国内机票报表"; //下载的文件名
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => {
            loading.close();
          });
          this.$message.success("导出报表成功");
        })
        .catch((error) => {
          this.$message.error("网络错误！导出失败，请稍后再试！");
        });
    },
  },
};
</script>

<style scoped lang="less">
/deep/ .el-table__empty-text {
  padding-right: 62%;
  line-height: 40px;
}

.flightNumber_input {
  width: 150px;
}


.el-input {
  flex: 1;
}

.select {
  width: 173px;
}

.travelerInput {
  width: 150px;
  margin-left: 6px;
}


.theSecondColumn {
  display: flex;
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
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;

    .tar_lid {
      margin-top: 20px;
      color: #666;
      width: 100%;
      max-width: 1513px;
      margin: 0 auto;
    }
  }
}
.block {
  padding: 30px 19px 20px;
}
.orderName {
  display: flex;
  flex-wrap: wrap;
  & > div {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    margin-right: 18px;
    & > span {
      min-width: 80px;
    }
    & > :nth-child(2) {
      width: auto;
      flex: 1;
    }
    .el-input {
      width: 135px;
    }
  }
}
.singleNumber{
	  width: 288px !important;
}
.orderType {
  width: 135px !important;
}
.order {
  margin-right: 0 !important;
  .orderType {
    width: 135px !important;
  }
}
.daterange {
  & > div {
    width: 329px !important;
  }
}
.demonstration{
	margin-right: 0 !important;
}
.noData{
	width: 1059px;
}
</style>
