<template>
<!-- 我的申请单 -->
  <div class="applicalist">
    <div class="applists">
      <div class="addbtns" @click="addappli"
           v-if="types == 'left' && rotes('tms:myi:apply') && (tccrBeforeMiddle == 1 || tccrBeforeMiddle == 0  )">
        新建出差申请单
      </div>
      <div class="seratops">
        <div class="serinputs" style="padding-left: 20px;">
          <el-input v-model="seranames" @input="inpus" style="border: 0;" class="inputs" size="medium"
                    placeholder="出差单号"></el-input>
        </div>
        <div class="setiems">
          <el-select v-model="timetype" style="width: 90px;margin: 0 0 0 10px;" class="inputs" placeholder="请选择">
            <el-option v-for="item in timetypes" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker class="timeputs" value-format="yyyy-MM-dd" v-model="creatime" type="daterange"
                          @change="creachangs"
                          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :editable="false"
                          :clearable="false"></el-date-picker>
        </div>
        <div class="opptims">
          <el-select @change="taskchangs" v-model="tasktype" style="width: 110px;margin: 0 0 0 10px;" class="inputs"
                     placeholder="审批状态">
            <el-option v-for="item in tasktypes" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select @change="taskchangs" v-model="taskpe" style="width: 160px;margin: 0 0 0 10px;" class="inputs"
                     placeholder="申请单类型">
            <el-option style="border: 0;" v-for="item in taskpes" :key="item.value" :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>

    </div>
    <div class="boxlist" v-loading="loading">
      <div class="tablist" v-for="(item,index) in tableData" @click="applists(item)"
           v-if="rotes('tms:myi:det') || rotes('tms:exa:det')" :key="index">
        <div class="tsokbox">
          <div class="tstiles" v-if="item.tmsGssLinklist.length > 0">
            <img :src="trImg(item.tmsGssLinklist[0])"/><span>{{ item.tmsGssLinklist[0].vehicle | newicname }}</span>
            <span v-if="item.taskType != 3">&nbsp;-&nbsp;{{ taskty(item.taskType) }}</span>
            <div class="apply_again" v-if="item.taskType == 1" @click.stop="apply_again(item.id)">再次申请<img src="static/image/home/qiantou.png" class="apply_img"></div>
          </div>
          <div class="statusx" :style="{backgroundImage:backimg(item.status)}">{{ tyname(item.status) }}</div>
          <div class="sta_travel">
            出差单号：{{ item.travelNo }}&nbsp;&nbsp;&nbsp;&nbsp; 创建时间：{{ item.createTime }}
          </div>
        </div>
        <span class="bor-btn"></span>
        <div class="tms_content">        
          <div class="tms_apply">
            出行人：{{ usertchsn(item.tmsGssLink.applyStaffs) }}
          </div>
          <div class="tmslist">
            <div class="tlists" v-if="item.tmsGssLinklist.length > 0 && ints < 3" v-for="(its,ints) in item.tmsGssLinklist"
                :key="ints">
              <div class="tl_right">
                <div class="tl_tops">
                  <div>
                  <el-image src="../../../static/image/home/Outbound.png" class="el_image" v-if="its.vehicle == 1
                  && ints == 0 && item.tmsGssLinklist.length == 2"></el-image>
                    <el-image src="../../../static/image/home/Returntrip.png" class="el_image" v-if="its.vehicle == 1
                  && ints == 1 && item.tmsGssLinklist.length == 2"></el-image>
                    {{ newstaname(its) }}
                  </div>
                </div>
                <div class="tl_bots" >
                  {{ newdata(its) }}
                </div>
              </div>
            </div>
            <span v-if="item.tmsGssLinklist.length > 3">...</span>
          </div>
        </div>
        <div class="tbbott"
             v-if=" item.status == 0 && item.isname != 5 && (item.taskType == 2 || item.taskType == 4) && item.tmsGssLinklist[0].vehicle == 2">
          <div class="timeslist" v-if="item.status == 0 && item.isname == 2">
            火车占座剩余时间:{{ tiemsout(item.createTime) }}
          </div>
          <div class="timeslist" v-if="item.status == 0 && item.isname == 3">
            火车改签占座剩余时间:{{ tiemsout(item.createTime) }}
          </div>
        </div>
      </div>
      <div class="block" v-if="totalPatge > 1">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="5"
                       layout="prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
       <no-data v-if="totalPatge === 0 && loading === false"></no-data>
    </div>
   
  </div>
</template>

<script>
import citys from "../../../static/js/airports.js";
import NoData from "@/components/common/noData";
import { cityName,newicname } from "@/utils/common-filters";
export default {
  components: {NoData},
   filters:{
     cityName,newicname
   },
  data() {
    return {
      currentPage3: 1,
      total: 0, //多少条数据
      totalPatge: 0,
      datea: "",
      dates: "",
      tccrBeforeMiddle: 9,
      tableData: [],
      loading: false,
      seranames: "", //出差人,单号条件查询
      creatime: "",
      tasktypes: [
        {
          label: "全部",
          value: 99,
        },
        {
          label: "待审批",
          value: 0,
        },
        {
          label: "审批中",
          value: 1,
        },
        {
          label: "审批通过",
          value: 2,
          },
        {
          label: "驳回",
          value: 3,
        },
        {
          label: "撤回",
          value: 4,
        },
        {
          label: "免审",
          value: 5,
        },
        {
          label: "已取消",
          value: 6,
        },
      ],
      tasktype:99, //状态
      taskpe: 99, //类型
      taskpes: [
        {
          label: "全部",
          value: 99,
        },
        {
          label: "出差审批流程",
          value: 1,
        },
        {
          label: "预定审批流程",
          value: 2,
        },
        {
          label: "违规预定审批流程",
          value: 3,
        },
        {
          label: "改签审批流程",
          value: 4,
        },
        {
          label: "退票审批流程",
          value: 5,
        },
      ],
      timetypes: [
        {
          label: "创建时间",
          value: "1",
        },
      ],
      timetype: "1",
      curPages: 1, //当前第几页
      types: "left", //left为申请单 right为审批单
    };
  },
  watch: {
    //监听路由变化
    $route(to, from) {
      this.types = this.$route.query.data; //获取上个页面传入的参数
      this.seranames = ''
      this.tasktype = 99
      this.creatime = ''
      this.datea = ''
      this.dates = ''
      this.taskpe = 99
      this.search();
    },
  },
  mounted() {
    this.types = this.$route.query.data; //获取上个页面传入的参数
    this.search();
    let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    if (userinfo) {
      this.tccrBeforeMiddle = userinfo.tccrBeforeMiddle;
    }
    
  },
  methods: {
    backimg(i) {
      if (i == 4 || i== 10 ) {
        return "url(../../../static/image/order/orderba.png)";
      } else if (i == 0) {
        return "url(../../../static/image/order/orderbb.png)";
      } else if (i == 3) {
        return "url(../../../static/image/order/orderbc.png)";
      }
      return "url(../../../static/image/order/orderbd.png)";
    },
    newdata(tm) {
      //回显时间
     
      if (tm.vehicle == 3) {
        return (
            tm.inDate.substring(0, 10) +
            "   入住   " +
            tm.outDate.substring(0, 10) +
            "   离店"
        );
      } else if (tm.vehicle == 1) {
        if (tm.deptDates) {
          return (
              tm.deptDate.substring(0, 10) +
              "   往   " +
              tm.deptDates.substring(0, 10) +
              "   返"
          );
        } else {
          return tm.deptDate.substring(0, 10) + "   出发";
        }
      } else if (tm.vehicle == 2) {
        return tm.deptDate?tm.deptDate.substring(0, 10) + "   出发" : '';
      }
    },
    newstaname(tm) {
      //回显城市名称
      if (tm.vehicle == 3) {
        return tm.cityName;
      } else {
        if (tm.deptCityName == null || tm.arrivCityName == null) {
          if (tm.vehicle == 1) {
            return (
                cityName(tm.deptCityCode) +
                "  -  " +
                cityName(tm.arrivCityCode)
            );
          }
        } else {
          return tm.deptCityName + "  -  " + tm.arrivCityName;
        }
      }
    },
    // newicname(tm) {
    //   console.log(tm.vehicle)
    //   //回显类型
    //   if (tm.vehicle == 1) {
    //     return "机票";
    //   } else if (tm.vehicle == 2) {
    //     return "火车";
    //   } else if (tm.vehicle == 5) {
    //     return "用车";
    //   } else {
    //     return "酒店";
    //   }
    // },
    trImg(tm){
      if (tm.vehicle == 1) {
        return "../../../static/image/sqd_jp.png";
      } else if (tm.vehicle == 2) {
        return "../../../static/image/sqd_hc.png";
      } else if (tm.vehicle == 5) {
        return "../../../static/image/sqd_yc.png";
      } else {
        return "../../../static/image/sqd_jd.png";
      }
    },
    // citname(code) {
    //   let datcy = citys.addressAirportAll;
    //   for (let i = 0; i < datcy.length; i++) {
    //     if (datcy[i].airportCode == code) {
    //       return datcy[i].cityCName;
    //     }
    //   }
    // },
    applists(item) {
      //跳转申请单详情页面
      this.$router.push({
        path: "/applicatonforms",
        query: {
          data: item.id,
          type: this.types,
        },
      });
    },
    apply_again(id){ //再次申请
      this.$router.push({
        path: '/addapplication',
        query:{
          id: id
        }
      })
    },
    addappli() {
      //跳转新增申请单页面
      this.$router.push({
        path: "/addapplication",
        query: {
          data: this.types,
        },
      });
    },
    handleCurrentChange(val) {
      //翻页
      this.curPages = val;
      this.search();
    },
    inpus() {
      //名字单号查询
      this.curPages = 1;
      this.search();
    },
    creachangs(num) {
      //修改时间
      this.datea = num[0] + " 00:00:00";
      this.dates = num[1] + " 00:00:00";
      this.curPages = 1;
      this.search();
    },
    taskchangs() {
      //类型状态查询
      this.curPages = 1;
      this.search();
    },
    taskty(it) {
      if (it == 1) {
        return "出差";
      } else if (it == 2) {
        return "预定";
      } else if (it == 4) {
        return "改签";
      } else if (it == 5) {
        return "退票";
      }
    },
    tiemsout(tiems) {
      if (tiems == "") {
        return "";
      }
      if (
          new Date().valueOf() / 1000 >
          new Date(tiems).valueOf() / 1000 + 1800
      ) {
        return "已超时";
      } else {
        let time = parseInt(
            new Date(tiems).valueOf() / 1000 + 1800 - new Date().valueOf() / 1000
        );
        let min = Math.floor(time % 3600);
        let housers =
            Math.floor(time / 3600) == 0
                ? "00"
                : Math.floor(time / 3600) < 10
                ? "0" + Math.floor(time / 3600)
                : Math.floor(time / 3600);
        let mouser =
            Math.floor(min / 60) == 0
                ? "00"
                : Math.floor(min / 60) < 10
                ? "0" + Math.floor(min / 60)
                : Math.floor(min / 60);
        let mistime = time % 60 < 10 ? "0" + (time % 60) : time % 60;
        let its = housers + ":" + mouser + ":" + mistime;
        return its;
      }
    },
    tyname(it) {
      if (it == 0) {
        return "待审批";
      } else if (it == 1) {
        return "审批中";
      } else if (it == 2) {
        return "已通过";
      } else if (it == 3) {
        return "已驳回";
      } else if (it == 4) {
        return "已撤回";
      } else if (it == 5) {
        return "免审";
      } else if (it == 9) {
        return "已过期";
      } else if (it == 6) {
        return "已取消";
      } else if (it == 7) {
        return "已使用";
      } else {
        return it;
      }
    },
    usertchsn(itmes) {
      //出行人
      let liop = [];
      for (let k in itmes) {
        liop.push(itmes[k].userName);
      }
      return liop.join(",");
    },
    async search() {
      this.loading = true;
      try {
        let taskis = "";
        if (this.taskpe == 99) {
          taskis = "";
        } else {
          taskis = this.taskpe;
        }
        let tasktypeis = "";
        if (this.tasktype == 99) {
          tasktypeis = "";
        } else {
          tasktypeis = this.tasktype;
        }
        let dat = {};
        let res = {};
        if (this.types == "left") {
          //申请单
          dat = {
            current: this.curPages,
            size: 5,
            userName: this.seranames,
            taskType: taskis,
            status: tasktypeis,
            start: this.datea != "" ? this.datea : null,
            end: this.dates != "" ? this.dates : null,
          };
          res = await this.$api.applicat.getApplyList(dat);
        } else {
          dat = {
            current: this.curPages,
            size: 5,
            userName: this.seranames,
            taskType: taskis,
            taskLogPersonStatu: tasktypeis,
            start: this.datea != "" ? this.datea : null,
            end: this.dates != "" ? this.dates : null,
          };
          res = await this.$api.applicat.getApprvList(dat);
        }
        this.loading = false;
        if (res.code == 200) {
          let datw = res.data.records;
          this.totalPatge = res.data.pages; //总共多少页
          this.total = res.data.total; //一共多少条
          for (let i in datw) {
            if (datw[i].tmsGssLink.applyVehicles.length > 0) {
              if (datw[i].tmsGssLink.applyVehicles[0].vehicle == 1) {
                //飞机下单
                datw[i]["isname"] = 1; //飞机下单
              } else if (datw[i].tmsGssLink.applyVehicles[0].vehicle == 2) {
                //火车下单
                datw[i]["isname"] = 2; //火车下单
              } else if (datw[i].tmsGssLink.applyVehicles[0].vehicle == 5) {
                //火车下单
                datw[i]["isname"] = 5; //用车下单
              }
            }
            if (datw[i].tmsGssLink.applyHotels.length > 0) {
              datw[i]["isname"] = 3; //酒店下单
            }

            let applivalist = [];
            let appflks = datw[i].tmsGssLink.applyVehicles;
            for (let k = 0; k < appflks.length; k++) {
              if (
                  appflks[k].goBackGroup == null ||
                  appflks[k].goBackGroup == undefined
              ) {
                applivalist.push(appflks[k]);
              } else {
                let nums = 0;
                for (let p in applivalist) {
                  if (
                      applivalist[p].goBackGroup != null &&
                      appflks[k].goBackGroup != undefined
                  ) {
                    if (applivalist[p].goBackGroup == appflks[k].goBackGroup) {
                      nums = 1;
                    }
                  }
                }
                if (nums == 0) {
                  appflks[k].deptDates = appflks[k + 1].deptDate;
                  applivalist.push(appflks[k]);
                }
              }
            }
            for (let m in datw[i].tmsGssLink.applyHotels) {
              datw[i].tmsGssLink.applyHotels[m].vehicle = 3;
            }
            datw[i].tmsGssLinklist = datw[i].tmsGssLink.applyHotels.concat(
                applivalist
            );
          }

          this.tableData = datw;
        } else {
          this.$message({
            message: res.message,
            type: "warning",
          });
        }
      } catch (e) {
        console.log(e);
        this.loading = false;
        //TODO handle the exception
      }
    },
  },
};
</script>

<style scoped lang="less">
.applicalist {
  width: 1180px;
  padding: 20px 0;
  margin: auto;

  .applists {
    width: calc(100% - 40px);
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 4px;

    .addbtns {
      width: 140px;
      height: 44px;
      background-color: #007aff;
      color: #ffffff;
      font-size: 14px;
      text-align: center;
      line-height: 44px;
      border-radius: 4px;
      cursor: pointer;
    }

    .addbtns:hover {
      opacity: 0.8;
    }

    .seratops {
      display: flex;
      width: 100%;
      margin: 20px 0;

      .serinputs {
        display: flex;
        align-items: center;
        width: 30%;
        border: 1px solid #cccccc;

        .inputs /deep/ .el-input__inner {
          border: 0;
          padding: 0;
          font-size: 14px;
        }
      }

      .setiems {
        display: flex;
        align-items: center;
        width: 40%;
        margin: 0 2%;
        border: 1px solid #cccccc;

        .inputs /deep/ .el-input__inner {
          border: 0;
          padding: 0;
          font-size: 14px;
        }

        .timeputs {
          display: flex;
          border: 0;
          font-size: 14px;
        }
      }

      .opptims {
        width: 26%;
        display: flex;
        align-items: center;

        .inputs /deep/ .el-input__inner {
          border: 1px solid #cccccc;
          border-radius: 0;
          font-size: 14px;
        }
      }
    }
  }

  .boxlist {
    min-height: 400px;
    .tablist {
      width: calc(100% - 40px);
      padding: 0 21px;
      line-height: 50px;
      border: 1px solid #cccccc;
      margin-top: 10px;
      background-color: #ffffff;
      border-radius: 4px;
      cursor: pointer;
      position: relative;
      transition: 0.5s;
      //   /*过渡时间*/
      -webkit-transition: 0.5s;
      box-shadow: 0 0 14px 0 rgba(177, 190, 203, 0.2);
      .bor-btn{
        border-bottom: 1px dashed #ccc;
        position: absolute;
        width: 100%;
        left: 0;
      }
      .tsokbox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 13px;

        .tstiles {
          position: absolute;
          left: 0;
          top: 15px;
          padding: 0 18px;
          line-height: 20px;
          font-weight: 600;
          font-size: 14px;
          color: #333;
          .mixin_displayBox();
          img{
            margin:0 10px 0 0
          }
          .apply_again{
            border: 1px solid #c4def6;
            border-radius: 16px;
            color: #3c85fd;
            font-size: 14px;
            width: 90px;
            line-height: 22px;
            margin-left: 20px;
            text-align: center;
            align-items: center;

            .apply_img{
              margin-left: 8px;
              margin-right: 0 !important;
            }
          }

          .apply_again:hover {
            opacity: 0.8;
          }
        }

        .statusx {
          position: absolute;
          right: 6px;
          top: -1px;
          width: 150px;
          height: 55px;
          background-repeat: no-repeat;
          background-size: 100%;
          line-height: 35px;
          font-size: 14px;
          color: #ffffff;
          text-align: center;
        }
        
        .sta_travel{
          font-weight: 600;
          text-align: right;
          width: 86%;
          color: #666666;
          font-size: 12px;
        }
      }
      .tms_content{
        .mixin_displayBox(@ai:flex-start,@fd:column,);
        padding: 26px 0 26px  37px;
        .tms_apply{
          line-height: 14px;
          font-size: 14px;
          margin-bottom: 24px;
          color: #333;
        }
        
        .tmslist {
          flex-wrap: wrap;
          line-height: 14px !important;

          span{
            font-weight: bold;
          }
          .tlists {
            margin: 0 38px 5px 0;

            .tl_right {
              line-height: 14px;
              font-size: 14px;
              display: flex;
              color: #333;
              .tl_tops {
                &>div{
                  margin-right: 19px;
                  .mixin_displayBox();
                }
                .el_image{
                  margin-right: 7px;
                }
              }
            }
          }
        }
      }
      .asli {
        line-height: 20px;
      }
      .tbbott {
        width: 100%;
        border-top: 1px dashed #a0a0a0;
        line-height: 30px;
        .timeslist {
          font-size: 12px;
          color: red;
          padding-left: 30px;
        }
      }
    }

    .tablist:hover {

      box-shadow: 0 0 12px 0 #409eff;
    }

    .tablist:after {
      /*之后添加，此处为边框*/
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      transform: scaleY(2.5);
      /*Y轴放大2.5倍*/
      opacity: 0;
      /*透明度*/
      transition: 0.7s;
    }

    .tablist:hover:after {
      /*悬停时，边框显示*/
      transform: scaleY(1.5);
      /*放大到1.5倍*/
      opacity: 1;
    }

    .tablist:hover {
      border: 1px solid #409eff;
    }

    .block {
      width: 100%;
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
