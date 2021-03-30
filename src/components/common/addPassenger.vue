<!--
title：添加旅客公共组件
@author：LiuJi
@email: 2072527778@qq.com
Comment: 用于机票，火车，酒店因私订单添加旅客  （Used for air tickets, trains, hotels to add passengers for private bookings）
-->
<template>
  <div class="personnel">
    <div class="persotop" @click="addrow">
      <div class="iconfont" style="font-size: 18px">&#xe783;</div>
      <div class="per-font">添加旅客</div>
    </div>
    <div class="perlists">
      <div class="passlist" v-if="passengers.length > 0">
        <div class="passdv" v-for="(item, index) in passengers" :key="index">
          {{ item.userName }}
          <div class="iconfont passclose" @click="passclose(index)">&#xe61e;</div>
        </div>
      </div>
    </div>
    <el-drawer class="drawerd" size="28%" :with-header="false" :visible.sync="drawe" direction="rtl">
      <div class="drawertp">请选择出行旅客</div>
      <div class="drivpass">
        <passenger @passlist="passuser" :iskok="iskok"></passenger>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import passenger from "./passenger";

export default {
  name: "addPassenger",
  data() {
    return {
      passengers: [], //出行人信息
      drawe: false,
    }
  },
  props: {
    iskok: {
      value: Number,
      default: 0
    }
  },
  components: {
    passenger
  },
  methods: {
    addrow() {
      //查看旅客
      this.drawe = true;
    },
    passclose(index) {
      this.passengers.splice(index, 1);
    },
    passuser(list) {
      this.drawe = false;
      this.passengers = list;
      this.$emit('passage', list);
    },
  }
}
</script>

<style scoped lang="less">
.personnel {
  width: 100%;

  .persotop {
    cursor: pointer;
    margin: 0 0 0 15px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #3c85fd;
    width: 142px;
    height: 38px;
    background: #FFFFFF;
    border: 1px solid #3C85FD;
    border-radius: 3px;
    justify-content: center;

    .per-font{
      margin-left: 10px;
      width: 64px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #3C85FD;
      line-height: 38px;

    }
  }

  .perlists {
    width: 100%;
    font-size: 16px;


    .passlist {
      width: calc(100% - 40px);
      display: flex;
      flex-wrap: wrap;

      .passdv {
        position: relative;
        width: 80px;
        line-height: 25px;
        text-align: center;
        border-radius: 2px;
        border: 1px solid #dcdfe6;
        margin: 10px 0 10px 20px;
        color: #606266;

        .passclose {
          position: absolute;
          text-align: center;
          line-height: 16px;
          border-radius: 50%;
          background-color: #FFFFFF;
          cursor: pointer;
          font-size: 16px;
          color: #3C85FD;
          top: -7px;
          right: -6px;
          width: 16px;
          height: 16px;

        }
      }
    }
  }

  .drawerd {
    width: 100%;

    .drawertp {
      width: 100%;
      height: 10%;
      border-bottom: 1px solid #edf1f6;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .drivpass {
      width: 100%;
      height: 90%;
    }
  }
}
</style>