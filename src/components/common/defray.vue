<!--
       author: I won’t leave my name, for fear of being beaten by someone who takes over
-->
<template>
  <div class="hotbox">
    <div>
      <span v-if="entryMethod == 1">支付方式：在线支付</span>
    </div>
    <div class="payes">
      <div v-for="(item) of classList" :key="item.id" @click="changeList(item.id)" :class="{changeBorder:item.id==a}"
           class="s_type">
        <img :src="item.coverImg" v-if="entryMethod == 1"/>
        <img :src="item.coverImg" v-if="entryMethod == 0"/>
      </div>
    </div>
    <div>
      <div class="boxbtn" v-if="entryMethod == 1">
        <div class="box_defray" @click="defray" v-loading.fullscreen.lock="fullscreenLoading">
          支付
        </div>
        <div class="box_retuns" @click="retuns">
          <span>返回</span>
        </div>
      </div>
      <div class="boxbtn" style="margin-bottom: 20px;" v-if="entryMethod == 0">
        <div class="box_defray" @click="defrayPrompt" v-loading.fullscreen.lock="fullscreenLoading">支付</div>
        <div class="box_retuns" @click="retuns">
          <span>返回</span>
        </div>
      </div>
      <el-dialog width="30%" :title="payment" @close="closeCode" :visible.sync="innerVisible" append-to-body
                 style="text-align: center;position: absolute">
        <div class="paycode">
          <!-- 放置二维码的容器,需要给一个ref -->
          <div id="qrcode" ref="qrcode"></div>
        </div>
        <div style="margin-top: 20px">
          <el-button type="warning" @click="Paid">已支付</el-button>
          <el-button type="warning" @click="innerVisible=false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";

export default {
  name: "defray",
  data() {
    return {
      payment: '微信支付',
      innerVisible: null,
      a: true,
      classList: [{
        id: 1000023,
        coverImg: require('../../../static/image/defray/微信支付 .png')
      },
      ],
      recordNos: 0,
      amounts: 0,
      show: false,
      fullscreenLoading: false
    }
  },
  props: {
    businessType: {
      value: Number,
      default: 0
    },
    productType: {
      value: Number,
      default: 0
    },
    recordNo: {
      value: Number,
      default: 0
    },
    amount: {
      value: Number,
      default: 0
    },
    entryMethod: {
      value: Number,
      default: 1
    },
    intention: {
      value: Number,
      default: 0
    },
    payStatus: {
      value: Number,
      default: 0
    },
  },
  mounted() {
    this.getPayWays();
  },
  watch: {
    recordNo(item) {
      this.recordNos = item;
    },
    amount(item) {
      this.amounts = item;
    }
  },
  methods: {
    async getPayWays() { //获取支付方式
      const res = await this.$api.order.getPayWay();
      if (res.code == 200) {
        this.payWayCode = res.data[0].payWayCode;
        this.categoryCode = res.data.categoryCode;
        this.categoryName = res.data[0].categoryName;
        this.name = res.data.name;
        this.sort = res.data.sort;
        this.imageDataUrl = res.data.imageDataUrl;
      }
    },
    Paid() {
      if (this.intention == 4) {
        this.$router.push({
          path: '/intentList',
          query: {
            id: 4
          }
        })
      } else if (this.intention == 1) {
        this.$router.push({
          path: '/intentList'
        })
      } else {
        this.$router.push({
          path: '/myorder'
        })
      }

    },
    defrayPrompt() { //
      if (this.payStatus === 2) {
        this.$confirm('订单支付中，如已支付，请勿重复支付，以免造成损失', '提示', {
          confirmButtonText: '支付',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.defray(); //支付订单
        });
      } else {
        this.defray();
      }
    },
    async defray() { //支付
      if (this.a === 1000023) {
        this.fullscreenLoading = true;
        try {
          let res = await this.$api.order.confirmPay({
            businessType: this.businessType,
            categoryCode: "1000",
            productType: this.productType,
            differenceType: "n",
            recordNo: this.recordNo,
            amount: this.amount,
            payWayCode: "1000023",
            tradeTyep: "NATIVE"
          });
          if (res.code === 200) {
            this.innerVisible = true
            // 二维码内容,一般是由后台返回的跳转链接,这里是写死的一个链接
            this.qrcode = res.data
            // 使用$nextTick确保数据渲染
            this.$nextTick(() => {
              this.crateQrcode()
            })
            setTimeout(() => {
              this.fullscreenLoading = false;
            });
          } else {
            this.$message.error(res.data);
            setTimeout(() => {
              this.fullscreenLoading = false;
            });
          }
        } catch (e) {
          console.log(e)
          setTimeout(() => {
            this.fullscreenLoading = false;
          });
        }

      } else if (this.a === 1000001) {
        try {
          let res = await this.$api.order.confirmPay({
            businessType: "1",
            categoryCode: "1000",
            productType: "1",
            differenceType: "n",
            recordNo: this.codes,
            amount: this.userslist.tr.amount,
            payWayCode: "1000001"
          });
        } catch (e) {
          console.log(e)
        }
      } else {
        this.$message('请选择支付方式！');
      }
    },
    // 生成二维码
    crateQrcode() {
      this.qr = new QRCode('qrcode', {
        width: 150,
        height: 150, // 高度
        text: this.qrcode // 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      })
    },
    // 关闭弹框,清除已经生成的二维码
    closeCode() {
      this.$refs.qrcode.innerHTML = ''
    },
    retuns() {
      this.$router.push({
        path: '/myorder'
      }); //返回到我的订单
    },
    changeList(id) {
      if (this.a == id) {
        this.a = !this.a;
      } else {
        this.a = id;
      }
    }
  }
}
</script>

<style scoped lang="less">
.hotbox {
  width: 1180px;
  line-height: 23px;
  box-sizing: border-box;
  padding-top: 40px;
  padding-bottom: 49px;
  background-color: #ffffff;
  div:first-child {
    color: #333333;
    font-size: 14px;
    justify-content: center;
    align-items: center;
    text-align: center
  }


  .lefbox {
    position: absolute;
    left: 0;
    top: 15px;
    width: calc(100% - 20px);
    background: #f2f2f2;
    font-size: 14px;
    margin: 0 10px;
    padding: 5px 0;
    text-indent: 10px;
    line-height: 25px;
    font-weight: 600;
  }

  .lecheckd {
    display: flex;
    padding-left: 60px;
    align-items: center;
  }

  .boxbtn {
    margin-top: 33px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .box_defray {
      width: 68px;
      height: 34px;
      background: #3C85FD;
      border-radius: 2px;
      display: flex;
      margin-right: 7px;
      color: #FFFFFF;
      font-size: 14px;
    }

    .box_defray:hover {
      cursor: pointer;
      opacity: 0.8;
    }

    .box_retuns {
      width: 66px;
      height: 32px;
      background: rgba(60, 133, 253, 0);
      border: 1px solid #3C85FD;
      border-radius: 2px;
      font-size: 14px;
      color: #3C85FD;;
      display: flex;
      align-items: center;
      justify-content: center;

      & > span {
        text-align: center;
      }
    }
  }

  .box_retuns:hover {
    opacity: 0.8;
    cursor: pointer;
  }
}

.paycode {
  text-align: center;

  #qrcode {
    display: inline-block !important;
  }
}

.payes {
  width: 100%;
  margin-top: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .s_type {
    width: 138px;
    height: 54px;
    border: 1px solid #ECECEC;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 112px;
      height: 40px;
    }
  }

  .changeBorder {
    width: 138px;
    height: 54px;
    cursor: pointer;
    border: 1px solid #ffa488;
  }
}


.circle {
  width: 100%;
}

.circle-ul {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 0px;
  margin: 14px 0 0 533px;
}

.circle-li {
  margin-right: 5px;
  list-style: none;
}

.topic-shade {
  display: none;
}


</style>
