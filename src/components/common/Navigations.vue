<template>
  <div class="home_box" v-if="OperatoriPhone != null && OperatoriPhone != ''">
    <div class="home_tar" :class="$route.path != '/home' ? 'home_tars' : ''">
      <div class="nav" >
        <div style="display: flex; min-width: 1100px">
          <img :src="logoUrl" alt="" v-if="logoUrl != null && logoUrl != ''" />
          <div class="navlist_left" v-else></div>
          <div class="navlists">
            <div
              class="navlistp"
              @mouseover="actv(item)"
              @mouseleave="actvs(item)"
              :class="
                activeIndex == item.id
                  ? 'navlistps'
                  : '' || hovesid == item.id
                  ? 'navhoves'
                  : ''
              "
              @click="handleSelect(item.id)"
              v-for="(item, index) in datalist"
              :key="index"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="username">
          <div class="top">
            <div class="home_he_left">
              欢迎你，{{ username }}&nbsp;&nbsp;&nbsp;
            </div>
            <div class="home_he_right" @click="signou">退出</div>
          </div>
          <div
            class="home_he_left OperatoriPhone"
            v-if="OperatoriPhone != null && OperatoriPhone != ''"
          >
            <span>运营商电话：</span>
            <span>{{ OperatoriPhone }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="setion" v-if="showslist">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
export default {
  data() {
    return {
      OperatoriPhone: "",
      logoUrl: sessionStorage.getItem("logoUrl"),
      showslist: false,
      datalist: [
        {
          name: "产品预定",
          id: 1,
        },
        {
          name: "我的申请单",
          id: 2,
        },
        {
          name: "我的审批",
          id: 3,
        },
        {
          name: "我的意向单",
          id: 9,
        },
        {
          name: "我的订单",
          id: 4,
        },
        {
          name: "我的行程",
          id: 5,
        },
        {
          name: "差旅报告",
          id: 6,
        },
        {
          name: "企业管理",
          id: 7,
        },
        {
          name: "个人中心",
          id: 8,
        },
      ],
      hovesid: 0,
      activeIndex: "1",
      username: "",
    };
  },
  mounted() {
    this.seids();
    this.getenvs();
    for (let k in this.datalist) {
      if (this.datalist[k].id == 2 && this.rotes("tms:myi") == false) {
        this.datalist.splice(k, 1);
      } else if (this.datalist[k].id == 3 && this.rotes("tms:exa") == false) {
        this.datalist.splice(k, 1);
      } else if (this.datalist[k].id == 7 && this.rotes("tms:aut") == false) {
        this.datalist.splice(k, 1);
      } else if (this.datalist[k].id == 8 && this.rotes("tms:per") == false) {
        this.datalist.splice(k, 1);
      }
    }
    if (this.$route.path == "/") {
      this.routs(1);
    }
    let ust = sessionStorage.getItem("menus");
    if (ust != undefined) {
      this.activeIndex = ust.toString();
    }
  },
  methods: {
    actv(item) {
      //移入
      if (this.activeIndex != item.id) {
        this.hovesid = item.id;
      }
    },
    actvs(item) {
      //移出
      if (this.activeIndex != item.id) {
        this.hovesid = 0;
      }
    },
    async getenvs() {
      //获取系统环境变量 appId--nginx写入
      let _this = this;
      try {
        const res = await _this.$api.Login.getenv({});
        if (res.code == 200) {
          this.OperatoriPhone = res.data.tel;
          this.logoUrl = res.data.style.logo;
        } else {
          console.log(res.message);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async seids() {
      let _this = this;
      if (
        sessionStorage.getItem("sessionIds") != null &&
        sessionStorage.getItem("sessionIds") != undefined &&
        sessionStorage.getItem("sessionIds") != ""
      ) {
        let rec = await _this.$api.home.accountlogins({
          sessionId: sessionStorage.getItem("sessionIds"),
        }); //钉钉直接登录
        if (rec.code == 200) {
          sessionStorage.setItem("userinfo", JSON.stringify(rec.data));
          _this.okslogin();
          sessionStorage.removeItem("sessionIds");
        } else {
          _this.$message({
            message: "登录失败,请联系管理员！",
            type: "warning",
          });
          _this.$router.push("/login");
        }
      } else if (
        sessionStorage.getItem("corpid") != null &&
        sessionStorage.getItem("corpid") != undefined &&
        sessionStorage.getItem("corpid") != ""
      ) {
        if (dd.env.platform !== "notInDingTalk") {
          //进行钉钉登录操作
          dd.ready(function () {
            //1.获取免登授权码code
            dd.runtime.permission.requestAuthCode({
              corpId: sessionStorage.getItem("corpid"), //企业id
              onSuccess: function (result) {
                var code = result.code;
                let customerNo = sessionStorage.getItem("customerNo");
                _this.$api.home
                  .noSecret({
                    code: code,
                    customerNo: customerNo,
                  })
                  .then((rec) => {
                    if (rec.code == 200) {
                      sessionStorage.setItem(
                        "userinfo",
                        JSON.stringify(rec.data)
                      );
                      sessionStorage.removeItem("corpid");
                      _this.okslogin();
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              },
              onFail: function (err) {
                console("出错了, " + err);
              },
            });
          });
        } else {
          sessionStorage.removeItem("corpid");
          _this.okslogin();
        }
      } else {
        this.okslogin();
      }
    },
    okslogin() {
      let datas = JSON.parse(sessionStorage.getItem("userinfo")); //检验是否是登录状态
      if (datas.token) {
        this.showslist = true;
        this.username = datas.userName;
      } else {
        this.$router.push("/login");
      }
    },
    signou() {
      //退出
      sessionStorage.clear("userinfo");
      this.$router.push("/login");
    },
    handleSelect(key) {
      sessionStorage.setItem("menus", key);
      this.routs(key);
    },
    routs(it) {
      this.activeIndex = it;
      if (it == 1) {
        this.$router.push("/home");
      } else if (it == 2) {
        //申请单
        this.$router.push({
          path: "/applicationlist",
          query: {
            data: "left",
          },
        });
      } else if (it == 3) {
        //审批单
        this.$router.push({
          path: "/applicationlist",
          query: {
            data: "right",
          },
        });
      } else if (it == 4) {
        this.$router.push("/myorder");
      } else if (it == 8) {
        this.$router.push("/information");
      } else if (it == 7) {
        this.$router.push("/businessmanagement");
      } else if (it == 5) {
        this.$router.push("/myItinerary");
      } else if (it == 6) {
        if (this.rotes("tms:report:button")) {
          this.$router.push("/comprehensive_analysis");
        } else {
          this.$router.push("/domestic_air_ticket?tarlist_id=2");
        }
      } else if (it == 9) {
        this.$router.push("/intentList");
      }
    },
  },
};
</script>

<style scoped lang="less">
.home_box {
  width: 100%;
  background: #f2f6fb;
  padding-bottom: 20px;
	min-width: 1300px;
  .home_tar {
    min-width:100%;
    display: flex;
    justify-content: center;
    width: calc(100% - 10%);
    height: 56px;
    background: url(http://file.molintmc.cn/mlimg/navtops.jpg) no-repeat;
    background-size: cover;
    background-position: center 0;
    line-height: 56px;
	display: flex;
	.nav{
		width: 1510px;
		display: flex;
		justify-content: space-between;
	}
    .navlist_left {
      width: 100px;
    }

    .navlists {
      display: flex;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      flex: 1;
      justify-content: space-between;
      padding-right: 30px;
      max-width: 950px;
      .navlistp {
        border-top: 2px solid rgba(0, 0, 0, 0);
      }

      .navlistps {
        font-weight: 600;
        border-top: 2px solid #ffffff;
        color: #ffffff;
      }

      .navhoves {
        font-weight: 600;
        border-top: 2px solid rgba(0, 0, 0, 0);
        color: #ffffff;
      }
    }
    .username {
      width: 171px;
      line-height: 14px;
      .mixin_displayBox(@fd:column,@jc:center,@ai:flex-start);
      .top {
        width: 100%;
        display: flex;
        margin-bottom: 5px;
        .home_he_left {
          font-size: 12px;
          color: #ffffff;
          cursor: text;
          display: flex;
        }
      }
      .OperatoriPhone {
        color: #fff;
        line-height: 14px;
        & > span {
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
    .home_he_right {
      font-size: 12px;
      color: #ffcf27;
      cursor: pointer;
      line-height: 14px;
    }
    img {
      width: 118px;
      height: 31px;

      margin: 12px 30px 0 0;
    }
  }

  .home_tars {
	background: #3c85fd;
	.nav{
		width: 1280px!important;
	}
  }

  .setion {
    width: 100%;
    background: #f2f6fb;
    min-width: 1200px;
  }
}
</style>
