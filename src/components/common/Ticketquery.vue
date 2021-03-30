<template>
  <div class="mian">
     <div class="airline" v-for="(item,index) in userlist">
       <ul style="float: left;line-height: 120px;text-indent: 15px;">
         <li>图标</li>
       </ul>
       <ul style="float: left;padding-top: 38px;text-indent: 10px;">
         <li>{{item.name}}</li>
         <li>{{item.type}}</li>
       </ul>
       <ul style="float: left;padding-top: 38px;margin-left: 20%;">
         <li style="font-size: 30px;">{{item.date}}</li>
         <li style="float: right;">{{item.depart}}</li>
       </ul>
       <ul style="float: left;padding-top: 38px;margin-left: 50px;">
         <li style="font-size: 25px;">---------</li>
         <li style="float: right;">{{item.duration}}</li>
       </ul>
       <ul style="float: left;padding-top: 38px;margin-left: 50px;">
         <li style="font-size: 30px;">{{item.dates}}</li>
         <li style="float: left;">{{item.arrive}}</li>
       </ul>
       <ul style="float: right;width: 100px;padding-top: 28px;margin-right: 50px;">
         <li style="float: right;font-size: 30px;color: red;">{{item.price}}</li>
         <li style="float: right;font-size: 10px;color: #CCCCCC;">{{item.shipping}}</li>
       </ul>
       <ul style="float: right;padding-top: 38px;margin-right: 20px;">
         <li style="font-size: 20px;color: #00FF00;border: 1px solid #00FF00;">低价</li>
       </ul>
     </div>
 </div>
</template>

<script>
  export default{
    data(){
     return{
         userlist:[{
           name:'南航CZ3160',
           type:'320大型机',
           date:'15:30',
           depart:'首都T2',
           duration:'3小时35分钟',
           dates:'18:35',
           arrive:'宝安T3',
           price:'￥580',
           shipping:'经济舱'
         }]
       }
     },
    methods:{

    }
  }
</script>

<style scoped lang="less">
  .mian{
    height: 600px;
    ul li{
      list-style: none;
    }
    .airline{
      width: 90%;
      height: 120px;
      background: white;
      margin-left: 5%;
      margin-right: 5%;
    }
  }
</style>
