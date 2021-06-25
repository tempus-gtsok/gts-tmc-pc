<template>
	<!-- 酒店支付页面 -->
  <div class="hoteorder" v-loading="loading" v-if="plsitsti.hotelOrder != null && plsitsti.hotelOrder != undefined">
    <div class="hotboxs">
      <div class="hot_lefts" style="width: 60%;">
        <div>单号：{{ codes }}</div>
        <div>出行人：{{ plsitsti.hotelOrder.guestName }}</div>
        <div>
          订单总额：
          <span>￥{{ plsitsti.hotelOrder.totalPrice }}</span>
        </div>
      </div>
      <img :src="orderStatus | hotellUserstatus" alt="">
    </div>
    <defray business-type="1" product-type="4" :record-no=codes :amount=plsitsti.hotelOrder.totalPrice></defray>
  </div>
</template>

<script>
import Defray from "@/components/common/defray";
import { hotellUserstatus } from "@/utils/common-filters";
export default {
  name: "hotersdefray",
  components: {Defray},
    filters:{
			hotellUserstatus
		},

  data(){
    return{
      codes: '', //酒店id
      plsitsti: {}, //酒店详情
      orderStatus: '', //zhx:待处理（115）,处理中（100）,预定成功（101）,下单失败（102）, 取消中（400）,取消成功（401）,审批拒绝（121）
    }
  },
  mounted() {
    this.codes = this.$route.query.data;
  this.searchhoter();
  },
  methods:{
    // userstatus(ite) {
    //   //订单状态
    //   let arr = [{
    //     name: '待审核',
    //     id: 650,
    //     url: '../../../static/image/home/To-audit.png'
    //   },
    //     {
    //       name: '处理中',
    //       id: 100,
    //       url: '../../../static/image/home/processing.png'
    //     },
    //     {
    //       name: '拒单',
    //       id: 600,
    //       url: '../../../static/image/home/From-single.png'
    //     },
    //     {
    //       name: '审批拒绝',
    //       id: 121,
    //       url: '../../../static/image/home/Approval-refused.png'
    //     },
    //     {
    //       name: '占房成功',
    //       id: 122,
    //       url: '../../../static/image/home/Building-successful.png'
    //     },
    //     {
    //       name: '申请中',
    //       id: 117,
    //       url: '../../../static/image/home/processing.png'
    //     },
    //     {
    //       name: '待处理',
    //       id: 115,
    //       url: '../../../static/image/home/Pending.png'
    //     },
    //     {
    //       name: '预定成功',
    //       id: 101,
    //       url: '../../../static/image/home/book-successfully.png'
    //     },
    //     {
    //       name: '下单失败',
    //       id: 102,
    //       url: '../../../static/image/home/Order-failed.png'
    //     },
    //     {
    //       name: '取消中',
    //       id: 400,
    //       url: '../../../static/image/home/Cancelled.png'
    //     },
    //     {
    //       name: '取消成功',
    //       id: 401,
    //       url: '../../../static/image/home/Canceled.png'
    //     }
    //   ];
    //   for (let i in arr) {
    //     if (arr[i].id == ite) {
    //       return arr[i].url;
    //     }
    //   }
    // },
    searchhoter() {
      //查询酒店详情
      let that = this;
      that.loading = true;
      that.$api.order
          .toOrderDetail({
            transactionOrderNo: this.codes
          })
          .then(res => {
            that.loading = false;
            if (res.code == 200) {
              that.plsitsti = res.data;
              that.apprvTaskReason = res.data.apprvTaskReason;
              that.numprice = that.plsitsti.hotelOrder.totalPrice; //总价
              that.payStatus = that.plsitsti.querySaleOrder.payStatus; //支付状态
              that.orderStatus = that.plsitsti.hotelOrder.orderStatus; //酒店状态
              that.saleOrderNo = that.plsitsti.hotelOrder.saleOrderNo; //销售单号
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
    }
  }
}
</script>

<style scoped lang="less">
.hotboxs {
  width: calc(100% - 220px);
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  padding: 0 200px 0 20px;
  background-color: #ffffff;
  border-radius: 4px;
  border: 1px solid #ededed;
.hot_lefts {
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
  width: calc(100% - 320px);
  margin: 0 auto;
}
</style>