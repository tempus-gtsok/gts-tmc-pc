<template>
  <div class="hoteorder" v-loading="loading" v-if="plsitsti.orderExt != null && plsitsti.orderExt != undefined">
    <div class="hotboxs">
      <img :src="userstatus(orderStatus)" alt="">
      <div class="hot_lefts">
        <div class="train_so">订单已提交成功，请尽快付款！</div>
        <div class="train_list">
          <div>订单单号：{{ codes }}</div>
          <div>取票号：{{ plsitsti.orderExt.ticketNo }}</div>
          <div class="hotbox">
            <div class="pricenum">
              <div>
                订单总额：
                <span>￥{{ numprice }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <defray business-type="1" product-type="10" :record-no=codes :amount=numprice></defray>
  </div>
</template>

<script>
import Defray from "@/components/common/defray";

export default {
  name: "traindefray",
  components: {Defray},
  data() {
    return {
      codes: this.$route.query.data, //火车票id
      orderStatus: '', //订单状态
      plsitsti: {}, //火车票详情
      numprice: '999', //总价
    }
  },
  mounted() {
    this.searchhoter();
  },
  methods: {
    async searchhoter() {
      //查询火车详情
      let that = this;
      that.loading = true;
      await that.$api.order
          .toTrainInfo({
            trainOrderNo: this.codes
          })
          .then((res) => {
            that.loading = false;
            if (res.code == 200) {
              that.plsitsti = res.data;
              that.apprvTaskReason = res.data.apprvTaskReason;
              let costsp = res.data.costLog; //成本审批
              let depsp = res.data.deptLog; //部门审批
              for (let k in costsp) {
                costsp[k]['stplis'] = 1; //成本
              }
              for (let p in depsp) {
                depsp[p]['stplis'] = 2; //部门
              }
              that.splog = [...costsp, ...depsp];
              if (res.data.orderExt.orderStatus == 1) {
                this.$message({
                  message: "占座中,请注意短信！",
                  type: 'success'
                })
              }
              that.typename = that.plsitsti.tmsotr.typename; //1因公2因私
              that.numprice = that.plsitsti.orderExt.premium; //总价
              that.tlement = that.plsitsti.tmsotr.settlement; //结算方式
              that.orderStatus = that.plsitsti.orderExt.orderStatus; //订单状态
              if (that.orderStatus == 2) {
                this.isclose = true
              } else {
                this.isclose = false;
              }
              that.userlist = that.plsitsti.saleOrderDetailList; //乘客信息
              that.usersli = false;
              for (let i in that.userlist) {
                if (that.userlist[i].status == 4) {
                  that.usersli = true;
                }
              }
              this.usersnamelist = []; //可操作人员信息
              for (let i in this.plsitsti.saleOrderDetailList) {
                if (this.plsitsti.saleOrderDetailList[i].status == 4) {
                  this.usersnamelist.push(this.plsitsti.saleOrderDetailList[i])
                }
              }
              for (let i in this.usersnamelist) {
                this.usersnamelist[i]['istrue'] = false;
              }
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
    userstatus(ite) {
      //订单状态
      let arr = [{
        name: '占座中',
        id: 1,
        url: '../../../static/image/home/In-seat.png'
      }, {
        name: '占座成功',
        id: 2,
        url: '../../../static/image/home/占座成功.png'
      }, {
        name: '出票中',
        id: 3,
        url: '../../../static/image/home/ticket.png'
      }, {
        name: '已出票',
        id: 4,
        url: '../../../static/image/home/check.png'
      }, {
        name: '退票中',
        id: 5,
        url: '../../../static/image/home/Return-ticket.png'
      }, {
        name: '改签中',
        id: 6,
        url: '../../../static/image/home/Change-central.png'
      }, {
        name: '部分退废',
        id: 7,
        url: '../../../static/image/home/Part-retirement.png'
      }, {
        name: '部分改签',
        id: 8,
        url: '../../../static/image/home/Part-change.png'
      }, {
        name: '已退',
        id: 9,
        url: '../../../static/image/home/Order-returned.png'
      }, {
        name: '订单已废弃',
        id: 10,
        url: '../../../static/image/home/Order-abandoned.png'
      }, {
        name: '已改签',
        id: 11,
        url: '../../../static/image/home/Order-changed.png'
      }, {
        name: '占座失败',
        id: 12,
        url: '../../../static/image/home/Of-failure.png'
      }, {
        name: '出票失败',
        id: 13,
        url: '../../../static/image/home/Ticket-failure.png'
      }];
      for (let i in arr) {
        if (arr[i].id == ite) {
          return arr[i].url;
        }
      }
    },
  }
}
</script>

<style scoped lang="less">
.hotboxs {
  height: 178px;
  display: flex;
  margin: 20px 0;
  padding: 19px 0 21px 44px;
  background-color: #ffffff;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid #ededed;

  .train_so {
    margin-top: 16px;
    font-size: 18px;
    line-height: 18px;
    color: #3C85FD;
    font-weight: Bold;
  }

  .train_list{
    color: #333333;
    height: 84px;
    margin-top: 21px;
  }

  .hot_lefts {
    padding-left: 38px;
    line-height: 30px;
    font-size: 14px;
    color: #666666;
  }

  img {
    width: 73px;
    height: 73px;
  }
}

.hoteorder {
  width: 1180px;
  margin: 0 auto;
}
</style>