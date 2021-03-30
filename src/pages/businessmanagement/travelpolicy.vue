<template>
  <div class="travelpolicy">
    <div class="trablels">
      <div class="trablis" @click="ids = item.id" :class="ids ==item.id?'eckd':''" v-for="(item,index) in travelist">
        {{ item.name }}
      </div>
    </div>
    <nativeAirTicketRule v-if="ids == 1"></nativeAirTicketRule>
    <domesticHotelPolicy v-if="ids == 3"></domesticHotelPolicy>
    <trainPolicy v-if="ids == 4"></trainPolicy>
    <cityLevelManagement v-if="ids == 5"></cityLevelManagement>
    <carUsePolicy v-if="ids == 6"></carUsePolicy>
    <reasonsForExceeding v-if="ids == 7"></reasonsForExceeding>
  </div>
</template>

<script>
import reasonsForExceeding from './travelpolicy/reasonsForExceeding'//超标原因管理
import carUsePolicy from './travelpolicy/carUsePolicy'//用车政策
import cityLevelManagement from './travelpolicy/cityLevelManagement'//城市级别管理
import trainPolicy from './travelpolicy/trainPolicy'//国内火车
import domesticHotelPolicy from './travelpolicy/domesticHotelPolicy'//国内酒店
import nativeAirTicketRule from './travelpolicy/nativeAirTicketRule.vue'//国内机票
export default {
  data() {
    return {
      ids: 1,
      travelist: [{
        id: 1,
        name: '国内机票政策'
      },
      //  {
      //   id: 2,
      //   name: '国际机票政策'
      // }, 
      {
        id: 3,
        name: '国内酒店政策'
      }, {
        id: 4,
        name: '国内火车票政策'
      }, {
        id: 5,
        name: '城市级别管理'
      }, {
        id: 6,
        name: '用车政策'
      }, {
        id: 7,
        name: '超标原因管理'
      }]
    }
  },
  components: {
    nativeAirTicketRule,
    domesticHotelPolicy,
    trainPolicy,
    cityLevelManagement,
    carUsePolicy,
    reasonsForExceeding
  },
  mounted() {

  },
  methods: {}
}
</script>

<style scoped lang="less">
.travelpolicy {
  margin-top: 20px;
  width: calc(100% - 40px);
  padding: 20px 20px 20px 20px;
  background-color: #FFFFFF;

  .trablels {
    width: 100%;
    display: flex;
    height: 25px;
    align-items: center;

    .trablis {
      cursor: pointer;
      line-height: 25px;
      padding: 0 8px;
      border-bottom: 2px solid #FFFFFF;
      font-size: 14px;
    }

    .trablis:hover {
      color: #409eff;
      border-bottom: 2px solid #409eff;
    }

    .eckd {
      color: #409eff;
      border-bottom: 2px solid #409eff;
    }
  }
}
</style>
