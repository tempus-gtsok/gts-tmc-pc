<template>
  <div id="app" style="background: #f2f6fb">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      la_id: "",
      nowurl: "",
    };
  },
  created() {
    // other ...
    this.linktab();
  },
  methods: {
    // pc端 跳转 公众号路径配置
    linktab() {
      let goUrl = this.isMobile();
      if (goUrl === 1) {
        //移动端地址
        // location = "";
        if (process.env.NODE_ENV === 'development') {
            // 开发环境下的代理地址
            location = 'http://wx.dev.gssok.com/#/'
        } else if (process.env.NODE_ENV === 'dev_server') {
            // 测试服环境下的地址
            location = 'http://wx.test.gssok.com/#/'
        } else if (process.env.NODE_ENV === 'production') {
            // 生产环境，服务器分发
            location = 'http://wx.feiren.com/#/' 
        } else {
            location = 'http://wx.test.gssok.com/#/'
        }

      }
    },
    // 使用设备判断
    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      let goUrl = flag ? 1 : 0;
      return goUrl;
    },
  },
};
</script>

<style>
/* body::-webkit-scrollbar {
      display: none;
  } */

@import "../static/fonts/iconfont.css";
@import "../static/css/main.css";


.el-table--border,
.el-table--group {
  border-color: #e8e8e8;
}

.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid #e8e8e8;
}

.el-table--border th,
.el-table--border th.gutter:last-of-type {
  border-bottom: 1px solid #e8e8e8;
}

.el-table--border td,
.el-table--border th {
  border-right: 1px solid #e8e8e8;
}
.el-table td,
.el-table th {
  text-align: center;
}
input {
  outline: none;
}
::-webkit-scrollbar {
  width: 5px;
  height: 1px;
}
::-webkit-scrollbar-thumb {
  /* 滑块部分 */
  border-radius: 3px;
  background-color: #aaa;
}
::-webkit-scrollbar-track {
  /* 轨道部分 */
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 5px;
}
</style>
