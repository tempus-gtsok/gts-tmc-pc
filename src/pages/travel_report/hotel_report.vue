<template>
<!-- 差旅报告->酒店 -->
  <div>
    <div class="travelbox">
      <travel_report :tarlist_ids="tarlist_id"></travel_report>
      <div class="tarblist">
        <div class="tar_lid">
          <div class="block">
            <div class="conditions">
              <div class="singleNumber">
                <span>销售单号：</span>
                <el-input
                  v-model="search.singleNumber"
                  placeholder="请输入销售单号"
                  class="elinput"
                ></el-input>
              </div>
              <div class="singleNumber">
                <span class="demonstration">入住时间：</span>
                <el-date-picker
                  v-model="search.departuedate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="入住日期"
                  end-placeholder="离店日期"
                >
                </el-date-picker>
              </div>
              <div class="singleNumber">
                <span class="demonstration">酒店名：</span>
                <el-input
                  v-model="search.hotelName"
                  placeholder="请输入完整酒店名"
                  class="elinput"
                ></el-input>
              </div>
               <div class="singleNumber ravelePep">
                <span class="travelerName">出行人：</span>
                <el-input
                  v-model="search.travelerName"
                  placeholder="出行人"
                  class="travelerName"
                ></el-input>
              </div>
            </div>
            <div class="singleNumber theSecondColumn">
             
              <div>
                <span class="department">供应商订单号：</span>
                <el-input
                  v-model="search.supplier"
                  placeholder="供应商订单号"
                  class="elinput"
                ></el-input>
              </div>
            </div>

            <div class="rebtn">
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
          <el-table-column fixed prop="guestName" label="入住人" width="120">
          </el-table-column>
          <el-table-column prop="ageType" label="入住人类别" width="120">
          </el-table-column>
          <el-table-column prop="workPlace" label="工作地点" width="170">
          </el-table-column>
          <el-table-column prop="deptName" label="一级部门" width="160">
          </el-table-column>
          <el-table-column prop="employeeNo" label="工号" width="120">
          </el-table-column>
          <el-table-column prop="jobLevel" label="职级" width="120">
          </el-table-column>
          <el-table-column
            prop="reimbursementAccount"
            label="报销科目"
            width="120"
          >
          </el-table-column>
          <el-table-column prop="expenseItem" label="费用项目" width="120">
          </el-table-column>
          <el-table-column prop="subject" label="科目" width="160">
          </el-table-column>
          <el-table-column prop="paymentDate" label="付款日期" width="160">
          </el-table-column>
          <el-table-column prop="applyDate" label="申请日期 " width="160">
          </el-table-column>
          <el-table-column
            prop="arrivalDateString"
            label="住店日期"
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="departureDateString"
            label="离店日期"
            width="160"
          >
          </el-table-column>
          <el-table-column prop="checkProvince" label="省份" width="120">
          </el-table-column>
          <el-table-column prop="holAddr" label="入住城市" width="120">
          </el-table-column>
          <el-table-column prop="hotelName" label="酒店名称" width="120">
          </el-table-column>
          <el-table-column prop="proName" label="房型" width="150">
          </el-table-column>
          <el-table-column prop="bookPro" label="房间数量" width="120">
          </el-table-column>
          <el-table-column prop="bookNight" label="间夜数" width="120">
          </el-table-column>
          <el-table-column prop="travelNo" label="出差单号" width="175">
          </el-table-column>
          <el-table-column prop="costName" label="成本中心" width="120">
          </el-table-column>
          <el-table-column prop="projectCode" label="项目代码" width="120">
          </el-table-column>
          <el-table-column prop="FundCenter" label="基金中心" width="120">
          </el-table-column>
          <el-table-column prop="eachNightPrice" label="销售单价" width="120">
          </el-table-column>
          <el-table-column prop="exceedStandard" label="超标" width="120">
          </el-table-column>
          <el-table-column prop="roomTotal" label="销售总价" width="120">
          </el-table-column>
          <el-table-column prop="serviceFee" label="手续费" width="160">
          </el-table-column>
          <el-table-column prop="totalPrice" label="合计" width="160">
          </el-table-column>
          <el-table-column prop="remark" label="客户备注" width="160">
          </el-table-column>
          <el-table-column
            prop="sourceName"
            label="酒店来源"
            width="160"
          ></el-table-column>
          <el-table-column prop="oaTravelNo" label="OA出差单号" width="160">
          </el-table-column>
          <el-table-column prop="customerName" label="客户名称" width="120">
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
  name: "hotel_report",
  components: { citysearchs, Travel_report },
  data() {
    return {
      tarlist_id: 5,
      rows: [], //火车票报表数据
      curPage: 1, // 当前页
      rowNum: 10, // 每页显示条目个数
      total: 0, // 总条目数
      loading: true,
      exporttrainreport: [],
      search: {
        singleNumber: "", //销售单号
        departuedate: "", //入住日期
        travelerName: "", //出行人
        hotelName: "", //酒店名
        supplier: "", //供应商订单id
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
    //     return "";
    //   }
    // },
    async trainreport() {
      if (this.search.departuedate != null && this.search.departuedate != "") {
        let res = await this.$api.travelreport.holCusStatementList({
          curPage: this.curPage,
          rowNum: this.rowNum,
          root: this.root,
          dateType: 2,
          saleOrderNo: this.search.singleNumber,
          hotelName: this.search.hotelName,
          startDate: formatDate(this.search.departuedate[0]),
          endDate: formatDate(this.search.departuedate[1]),
          hotelOrderNo: this.search.supplier,
          guestName: this.search.travelerName,
        });
        if (res.code == 200) {
          this.loading = false;
          this.rows = res.data.rows;
          this.total = res.data.records;
        }
      } else {
        let res = await this.$api.travelreport.holCusStatementList({
          curPage: this.curPage,
          rowNum: this.rowNum,
          root: this.root,
          dateType: 2,
          saleOrderNo: this.search.singleNumber,
          hotelName: this.search.hotelName,
          hotelOrderNo: this.search.supplier,
          guestName: this.search.travelerName,
        });
        if (res.code == 200) {
          this.loading = false;
          this.rows = res.data.rows;
          this.total = res.data.records;
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
      this.search.departuedate = [start, end];
    },
    exportReport() {
      const loading = this.$loading({
        lock: true,
        text: "获取下载中！请耐心等待！",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      this.$api.travelreport
        .exportHolCusStatement()
        .then((res) => {
          const link = document.createElement("a");
          let blob = new Blob([res], { type: "application/vnd.ms-excel" });
          link.style.display = "none";
          link.href = URL.createObjectURL(blob);
          link.download = "酒店报表"; //下载的文件名
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
  padding-right: 64%;
  line-height: 40px;
}
.elinput {
  width: 160px;
}

.Spans {
  margin-top: 8px;
  margin-left: 38px;
}

.travelerInput {
  width: 350px;
  margin-left: 6px;
}

.department {
  margin-top: 7px;
  margin-right: 0px;
}

.theSecondColumn {
  display: flex;
  margin-top: 20px;
}

.rebtn {
  text-align: center;
  align-content: center;
  margin: 0 auto;
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
      width: 100%;
      padding: 0 20px;
    }

    .conditions {
      width: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      flex-wrap: wrap;
    }

    .conditions > div > span {
      min-width: 80px;
    }
  }
}
.singleNumber {
  display: flex;
  align-items: center;
  margin-right: 18px;
  &>span{
    min-width: 64px !important;
  }
}
.ravelePep {
  width: 192px;
  margin: 0;
}
.noData{
	width: 1059px;
}
</style>