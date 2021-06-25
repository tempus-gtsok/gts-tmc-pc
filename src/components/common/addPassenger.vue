<!--
title：添加旅客公共组件
@author：LiuJi
@email: 2072527778@qq.com
Comment: 用于机票，火车，酒店因私订单添加旅客  （Used for air tickets, trains, hotels to add passengers for private bookings）
-->
<template>
  <div class="personnel">
    <div class="per_list">
      <div class="perlists">
        <div class="passlist" v-if="passengers.length > 0" >
          <div class="passdv" v-for="(item, index) in passengers" :key="index" >
            <img src="static/image/chengjiren.png" class="img">
              <p>{{ item.userName }}</p><span class="s-color">|</span
                  >  <el-select placeholder="请选择" v-model="item.valFlag" @change="certifChang">
                  <el-option
                    v-for="item in item.certificateList"
                    :key="item.id"
                    :label="item.car"
                    :value="item.id">
                  </el-option>
                </el-select>
            <div class="iconfont passclose" @click="passclose(index)">&#xe61e;</div>
          </div>
        </div>
      </div>
      <div class="per_li">
      <div class="persotop" @click="addrow">
        <div class="iconfont" style="font-size: 18px">&#xe783;</div>
        <div class="per-font">添加旅客</div>
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
import { numberPapers ,catypeEn} from "@/utils/common-filters";
export default {
  name: "addPassenger",
filters: {
   numberPapers,catypeEn
  },

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
      // this.passengers = list;
      this.init(list)
      this.$emit('passage', list);
    },
    init(userli){
      var car = ''
      var val = ''
      var valFlag = ''
      for (let i = 0; i < userli.length; i++) {
        // var pass = userli[i]
        userli[i].cardNo = userli[i].certificateList[0].cardNo
        userli[i].cardType = userli[i].certificateList[0].cardType
        val = catypeEn(userli[i].certificateList[0].cardType)+'  ' + userli[i].certificateList[0].cardNo
        valFlag = catypeEn(userli[i].certificateList[0].cardType)+'  ' + numberPapers(userli[i].certificateList[0].cardNo)
        // valFlag = val
        // this.$set(userli[i],'val',val) // 默认选择第一个证件
        userli[i]["val"] = val
        userli[i]["valFlag"] = valFlag
        for (let k = 0; k < userli[i].certificateList.length; k++) {
            car = catypeEn(userli[i].certificateList[k].cardType)+'  ' + numberPapers(userli[i].certificateList[k].cardNo)
            userli[i].certificateList[k] = {...userli[i].certificateList[k],'car':car}
            this.$set(userli[i].certificateList[k],'car',car)
        }
      }
      this.passengers = userli;
    },
      // 切换证件信息  并且改变数据里面的值
    certifChang(value){
        for (let i = 0; i < this.passengers.length; i++) {
          for (let k = 0; k < this.passengers[i].certificateList.length; k++) {
            if( this.passengers[i].certificateList[k].id == value){
                      this.passengers[i].cardNo = this.passengers[i].certificateList[k].cardNo
                      this.passengers[i].cardType = this.passengers[i].certificateList[k].cardType
            }
          }
      }
      this.$emit('passage', this.passengers);
    },
  }
}
</script>

<style scoped lang="less">
.personnel {
  box-sizing: border-box;
 .per_list{
   display: flex;
 }
  .persotop {
    cursor: pointer;
    display: flex;
    align-items: center;
    text-align: center;
    color: #3c85fd;
    width: 140px;
    height: 38px;
    background: #FFFFFF;
    border: 1px solid #3C85FD;
    border-radius: 3px;
    justify-content: center;
    margin-right: 20px;

    .per-font {
      margin-left: 10px;
      width: 64px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #3C85FD;
      line-height: 38px;

    }
  }

  .per_li{
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;
  }

  .perlists {
    font-size: 16px;
    flex: 1;



    .passlist {
      display: flex;
      flex-direction: column;

      .passdv {
        position: relative;
        line-height: 38px;
        align-items: center;
        border-radius: 2px;
        font-size: 14px;
        color: #666666;
        margin-right: 15px;
        margin-bottom: 10px;
        display: flex;

        img{
          width: 10px;
          height: 12px;
          margin-right: 10px;
        }
        .s-color {
          color: #dcdfe6;
          padding:0 10px ;
        }
        .passclose {
          position: absolute;
          text-align: center;
          line-height: 16px;
          border-radius: 50%;
          background-color: #FFFFFF;
          cursor: pointer;
          font-size: 16px;
          color: #3C85FD;
          top: 12px;
          left: -20px;
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