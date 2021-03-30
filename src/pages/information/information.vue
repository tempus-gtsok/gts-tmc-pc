<template>
  <div class="information">
    <div class="infotar">
      <div class="inflist" @click="cekck(item.id)" :class="ids == item.id ? 'inflistcheckd':''" v-for="(item,index) in infolist" :key="index">
        <span class="iconfont" style="font-size: 20px;margin-right: 20px;">{{item.ioc}}</span>{{item.name}}
      </div>
    </div>
    <div class="compons">
      <mymessage v-if="ids == 'my_message'"></mymessage>
      <addsress v-if="ids == 'address' && rotes('tms:person:general')"></addsress>
      <managers v-if="ids == 'management'"></managers>
      <frequent v-if="ids == 'frequenttravellers' && rotes('tms:pas')"></frequent>
      <travel v-if="ids == 'TravelPolicy'"></travel>
      <changepassword v-if="ids == 'changePassword'"></changepassword>
    </div>
  </div>
</template>

<script>
  import mymessage from './infors/my_messages.vue'
  import addsress from './infors/address.vue'
  import managers from './infors/management.vue'
  import frequent from './infors/frequenttravellers.vue'
  import travel from './infors/TravelPolicy.vue'
  import changepassword from "./infors/changepassword.vue";
  export default{
    data(){
      return {
        infolist: [{
          name: "我的信息",
          id: 'my_message',
          ioc: '\ue6d6'
        }, {
          name: "常用旅客",
          id: 'frequenttravellers',
          ioc: '\ue631'
        }, {
          name: "常用地址",
          id: 'address',
          ioc: '\ue649'
        },
          {
            name: "出差政策",
            id: 'TravelPolicy',
            ioc: '\ue635'
          }, {
            name: "修改密码",
            id: 'changePassword',
            ioc: '\ue61c'
          }
        ],
        ids: "my_message",
      }
    },
    components: {
      mymessage,
      addsress,
      managers,
      frequent,
      travel,
      changepassword
    },
    methods: {
      cekck(it) {
        this.ids = it;
      }
    }
  }
</script>

<style scoped lang="less">
  .information{
    width: 1180px;
    margin: 20px auto;
    display: flex;
    .infotar{
      width:150px;
      min-height: 500px;
      padding: 0 25px;
      background: #FFFFFF;
      .inflist{
        color: #758DA3;
        display: flex;
        cursor: pointer;
        border-bottom: 1px solid #EEEEEE;
        align-items: center;
        justify-content: center;
        height: 60px;
      }
      .inflist:hover {
        color: #007aff;
      }
      .inflistcheckd{
        color: #007aff;
      }
    }
    .infotar div:last-child{
      border: 0;
    }
    .compons{
      width: calc(100% - 210px);
      padding-left: 10px;
    }
  }
</style>
