<template>
    <div class="trainlist">
        <div class="listfoter" :class="fitxd ? 'listfiexd' : ''">
            <!-- 顶部搜索 -->
            <div class="form-wrap">
                <div class="pageroute">
                    <div class="pageroutes">
                        <span>用车服务</span>
                        <span>接机</span>
                    </div>
                    <div class="estimate">
                        预估：24公里/30分钟
                    </div>
                </div>
                <div class="stis">
                    <div class="seacheach">
                        <el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="起飞日期">
                        </el-date-picker>
                    </div>
                    <div class="seacheach">
                        <el-input  v-model="input" placeholder="航班号"></el-input>
                    </div>
                    <div  class="seacheach">
                        <div class="mybtom">
                            我的航班
                        </div>
                    </div>
                    <div  class="seacheach">
                        <el-input  v-model="input" placeholder="送达地点"></el-input>
                    </div>
                    <div  class="seacheach">
                        <div class="mybtom">
                            我的酒店
                        </div>
                    </div>
                    
                    <div class="seachbtom">
                        搜索
                    </div>
                </div>
            </div>
        </div>

        <div class="filters">
            <div
                class="filtlist"
                v-for="(item, index) in classification"
                :key="index"
                >
                <div class="fil-lefts">
                    <div class="nametitle" >
                      {{ item.name }}：
                    </div>
                    <div class="chooseone"
                    @click="deletclass(item)"
                    >
                    不限
                    </div>
                </div>

                <div class="fitlabelBox">
                    <div
                        class="fitlabel"
                        v-for="(itm, ins) in item.list" :key="ins"
                        @click="classck(itm, item)"
                        >
                        <div
                            v-if="itm.isture == false"
                            class="iconfont"
                            style="font-size: 18px; color: #abb7c2"
                            >
                                &#xe80c;
                        </div>
                        <div
                            v-else
                            class="iconfont"
                            style="font-size: 18px; color: #409eff"
                        >
                            &#xe618;
                        </div>
                        {{ itm.name }}
                    </div>
                </div>
            </div>
        </div>
        <div  class="centers">
            <div class="centercontent" v-for="(it,ind) in 2" :key="ind">
                <div class="imgone">
                    <div class="imgleft">
                        <span class="motorcycletype">经济型</span>
                        <div class="carpicture">
                            <img src="../../../../static/image/usecar/test.png" alt="">
                        </div>
                        <div class="carinfos">
                            <div class="platenumber">
                                起亚
                            </div>
                            <div class="seatsbaggage">
                                <div class="seats">
                                    <img src="../../../../static/image/usecar/zw.png" alt="">
                                    <span>4座</span>

                                </div>
                                <div class="seats">
                                    <img src="../../../../static/image/usecar/xl.png" alt="">
                                    <span>4个</span>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bjrignt">
                        <div class="prices">
                           ￥<span class="pricesnum">159</span> 起
                        </div>
                        <div class="ruslnum">
                            共3个报价
                        </div>
                    </div>
                </div>
                
                <div class="carlist">
                    <div class="carlists" v-for="(item,index) in 4" :key = "index">
                        <div class="listlogo">
                           <div class="logodiv"><img src="../../../../static/image/usecar/sqtest.png" alt=""></div>
                           <span class="logoname"> 曹操出行</span>
                        </div>
                        <div class="listright">
                            <div class="listprice">
                                <span class="ygfont">预估</span> 
                                <span class="numpri">
                                     <span class="sys">￥</span>
                                     550
                                </span>
                            </div>
                            <div class="dcbtm" @click="orderacar">
                                立即订车
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- dialog -->
       <el-dialog :visible.sync="dialogvisible" :width="dialogwidth">
           <div class="dialogs" v-if="status == 1">
               <div class="dialogtitle">
                    <span>正在全力呼叫车辆</span> 
               </div>
               <div class="onecar">
                   <div class="onecarlogo">
                       <div class="imgcar">
                           <img src="../../../../static/image/usecar/sqtest.png" alt="">
                       </div>
                      <div class="logocom">曹操出行</div>
                   </div>
                   <div class="priceyg">
                       <span>预估</span>
                        <span class="pricenumber">￥<span>550</span></span>
                   </div>
               </div>
               <div class="cencelorder">
                   <div class="cencelorder" @click="cencelorder">取消订单</div>
               </div>
           </div>
           <div class="dialogstwo"  v-if="status == 2">
               <div class="orderlist">
                   <div class="imguser">
                       <img src="../../../../static/image/usecar/txtest.png" alt="">
                   </div>
                   <div class="driverinfo">
                       <div class="driverinfos">
                           <div class="drivername">
                               王师傅
                           </div>
                           <div class="scoreuser">
                               <img src="../../../../static/image/usecar/pingfen.png" alt="">
                               总体评分<span>4.8分</span>
                           </div>
                           <div class="ordernum">
                               <img src="../../../../static/image/usecar/dingdan.png" alt="">
                                共接1000单
                           </div>
                       </div>
                       <div class="cartypenum">
                            <div class="cartypenums">
                                粤BAJ0667
                            </div>
                            <span class="spanss">白色</span>
                            <span>日产天籁</span>
                       </div>
                       <div class="imgphone">
                           <img src="../../../../static/image/usecar/phone.png" alt="">
                           <img src="../../../../static/image/usecar/xinxi.png" alt="">
                       </div>
                   </div>
               </div>
               <div class="midellef">
                   <span class="deliver"> </span>
                   <div class="middlefont">
                       <img src="../../../../static/image/usecar/sqtest.png" alt="">
                        <span> 最快接单，将为您提供本次服务</span>
                   </div>
                   <span class="deliver"></span>
               </div>
               <div class="tips">
                   <div class="tipsimg"><img src="../../../../static/image/usecar/tishi.png" alt=""></div>
                   <div class="tipcontent">
                       司机将于4月29日10:30分前到达，请您耐心等待。若您的行动有变动，需在4月29日10:00前取消。
                   </div>
               </div>
               <div class="cencelbtm">
                   <div class="cencelbtms" @click="cencelorder">
                       取消订单
                   </div>
               </div>
           </div>
       </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            //假数据
            fitxd: false, //头部是否定位
            value1: '',
            input:'',
            classification: [
                {
                    name:'起飞日期',
                    list:[
                        { name:'经济型', isture: false,},
                        { name:'经济型', isture: false,},
                        { name:'经济型', isture: false,},
                    ]
                },
                 {
                    name:'车型',
                    list:[
                        { name:'首汽', isture: false,},
                        { name:'神州', isture: false,},
                        { name:'经济型', isture: false,},
                    ]
                },
                 {
                    name:'服务商',
                    list:[
                        { name:'经济型', isture: false,},
                        { name:'经济型', isture: false,},
                        { name:'经济型', isture: false,},
                    ]
                }

            ],
            dialogvisible:false,
            status:2,//1为叫车中 2 为服务中
            dialogwidth:"690px"

        }
    },
    methods:{
         deletclass(item) {
        //删除当前类型
        for (let k in item.list) {
            item.list[k].isture = false;
        }
        for (let p in this.typecon) {
            if (this.typecon[p].name == item.vs) {
            this.typecon[p].value = [];
            }
        }
        },
          classck(item, it) {
            if (item.isture == false) {
                item.isture = true;
            }else{
                 item.isture = false;
            }
        },
        orderacar(){
            this.dialogvisible = true;
            if(this.status == 1){
                this.dialogwidth = "690px"
            }else if(this.status == 2){
                this.dialogwidth = "660px"
            }
        },
        cencelorder(){
            this.dialogvisible = false;
        }
    }
}
</script>
<style lang="less" scoped>
.trainlist{
    width: 100%;
    .listfoter {
        width: 100%;
        background-color: #FFFFFF;
        margin-bottom: 20px;
        font-size: 18px;
        padding: 5px 0;
        box-shadow: 0 0 10px 0 #bebebe;
        .form-wrap{
            width: 1000px;
            margin: 0 auto;
            padding: 15px 0;
            .pageroute{
                font-size: 14px;
                display: flex;
                justify-content: space-between;
                 color: #666666;
                .pageroutes{
                   
                    :nth-child(2){
                        padding-left: 10px;
                        color:#3c85fd;
                    }
                }
            }
            .stis {
                width: 100%;
                background: #ffffff;
                display: flex;
                align-items: center;
                margin-top: 20px;
                .seacheach{
                    margin-right: 10px;
                    font-size: 14px;
                    .mybtom{
                        background-color: #f4f4f4;
                        border:1px solid #dcdfe6;
                        border-radius: 4px;
                        line-height: 40px;
                        color: #333333;
                        width: 80px;
                        text-align: center;
                        cursor: pointer;
                    }
                   
                }
                 .seachbtom{
                    font-size: 14px;
                    width: 162px;
                    line-height: 40px;
                    cursor: pointer;
                    border-radius: 4px;
                    background: #FF9A35;
                    color: #fff;
                    border: 1px solid #FF9A35;
                    text-align: center;
                }

            }
        }
    }
     .filters {
        width: 1000px;
        padding: 10px 20px;
        background-color: #ffffff;
        margin: 10px auto;

        .filtlist {
            width: 100%;
            display: flex;
            // align-items: center;
            font-size: 14px;
            margin: 10px 0;
            line-height: 30px;

            .fil-lefts {
                width: 140px;
                display: flex;
                .nametitle{
                    width: 70px;
                    text-align: right;
                    color: #333333;
                    font-family: MicrosoftYaHei;
                   
                }
               
                .chooseone{
                    color: #3c85fd; 
                    cursor: pointer; 
                    margin-right: 32px;
                }
            }

            .fitlabelBox {
                width: calc(100% - 140px);
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                .fitlabel {
                    display: flex;
                    cursor: pointer;
                    align-items: center;
                    color: #666666;
                    width: 101px;
                }
            }
        }                                    
    }
    .centers{
        margin: 0 auto;
        width: 1000px;
        padding: 0 20px 20px 20px;
        background-color: #FFFFFF;
        .centercontent{
            padding: 0 10px;
            .imgone{
                padding: 30px 0;
                display: flex;
                height: 116px;
                justify-content: space-between;
                align-items: center;
              
               
                .imgleft{
                    display: flex;
                    
                    .motorcycletype{
                        font-size: 16px;
                        font-weight: bold;
                        color: #333333;
                        line-height: 116px;
                        margin-right: 42px;
                        margin-left:12px;
                    }
                    .carpicture{
                        width: 190px;
                        height: 116px;
                        // border:1px solid red;
                        display: flex;
                        align-items: center;
                        &>img{
                            // border: 1px solid blue;
                            max-height:112px;
                            width:100%;
                           
                        }
                    }
                    .carinfos{
                        display: flex;
                        flex-direction: column;
                        margin-left:16px;
                        .platenumber{
                            font-size:22px;
                            color: #333333;
                            margin:12px 0;
                        }
                        .seatsbaggage{
                            display: flex;
                            font-size: 14px;
                            color: #666666;
                            .seats{
                                margin-right: 20px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                &>img{
                                    margin-right:5px;
                                }
                            }
                        }
                    }
                }
                .bjrignt{
                    margin-right: 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .prices{
                        font-size: 14px;
                        color: #ff6600;
                        margin-bottom: 2px;
                        .pricesnum{
                            font-size:26px;
                            font-weight: bold;
                        }

                    }
                    .ruslnum{
                        font-size: 14px;
                        color: #666666;
                    }

                }
                
            }
            .carlist{
                border-top: 1px solid #f3f5f9;
                margin-left: 100px;
                padding-top: 30px ;
                .carlists{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom:30px;
                    .listlogo{
                        display: flex;
                        align-items: center;
                        .logodiv{
                            margin-right:20px;
                            height: 44px;
                            width: 116px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            &>img{
                                max-height: 100%;
                            }
                        }
                        .logoname{
                            font-size: 14px;
                            color: #333333;
                        }
                    }
                    .listright{
                        display: flex;
                        justify-content: space-between;
                        width: 300px;
                        .listprice{
                            .ygfont{
                                font-size:14px;
                                color:#333333;
                            }
                           
                            .numpri{
                                font-size:26px;
                                color:#ff6600;
                                 .sys{
                                    font-size: 16px;
                                
                                }
                            }
                        }
                        .dcbtm{
                            font-size:14px;
                            color:#ffffff;
                            background-color: #3c85fd;
                            border-radius: 3px;
                            font-weight: bold;
                            line-height: 32px;
                            width: 80px;
                            text-align: center;
                        }
                    }
                }
               
            }
        }

    }
   
    /deep/ .el-dialog__wrapper{
       &> .el-dialog{
           &>.el-dialog__header{
                padding: 0;
            }
            &>.el-dialog__body{
                padding: 0;

            }
        }
    }
     .dialogs{
         font-size: 14px;
         color: #333333;
        .dialogtitle{
            height: 146px;
            background: url(../../../../static/image/usecar/backimg.png) no-repeat;
            background-size: cover;
            background-position: center 0;
            font-size: 20px;
            color:#333333;
            font-weight: bold;
            display: flex;
            justify-content: center;
            &>span{
                padding-top: 70px;
            }
       }
       .onecar{
           display: flex;
           align-items: center;
           justify-content: space-between;
           padding:22px 30px;
           .onecarlogo{
               display: flex;
               align-items: center;
               .imgcar{
                   height: 44px;
                   width: 116px;
                   margin-right: 20px;
                   &>img{
                       width: 100%;
                       max-height: 44px;
                   }
               }
              

           }
           .priceyg{
               .pricenumber{
                   color: #ff6600;
                   &>span{
                       font-size: 24px;
                   }
               }
           }

       }
       .cencelorder{
           width: 100%;
           display: flex;
           justify-content: center;
           margin-bottom:20px ;
           .cencelorder{
               width: 162px;
               line-height: 40px;
               background-color: #ff9a33;
               color:#ffffff;
               border-radius: 5px;
           }
       }
        
    }
    .dialogstwo{
        font-size: 14px;
        color: #333333;
        padding-top: 26px;
        .orderlist{
            margin:0 30px;
            // border:1px solid red;
            width: 600px;
            min-height: 150px;
            background: url(../../../../static/image/usecar/beijing.png) no-repeat;
            background-size: cover;
            background-position: center 0;
            display: flex;

            .imguser{
                margin-left:32px;
                width: 64px;
                height: 64px;
                &>img{
                    height: 100%;
                    
                }
            }
            .driverinfo{
                display: flex;
                flex-direction: column;
                margin-left: 16px;
                .driverinfos{
                    display: flex;
                    align-items: center;
                    margin-top:14px;
                    .drivername{
                        font-size: 24px;
                        color: #333333;
                    }
                    .scoreuser{
                        margin-left: 24px;
                        color:#666666;
                        &>span{
                            color:#d34646;
                        }
                    }
                    .ordernum{
                        margin-left:40px;
                        color:#666666;
                    }
                }
                .cartypenum{
                    display: flex;
                    align-items: center;
                    margin:15px 0;
                    font-size: 16px;
                    color: #333333;
                    .cartypenums{
                        color: #666666;
                        line-height: 26px;
                        font-size: 14px;
                        width: 90px;
                        text-align: center;
                        background-color: #f3f3f3;
                        border:1px solid #e6e6e6;
                    }
                    .spanss{
                        margin-left: 20px;
                        margin-right: 10px;

                    }
                }
                .imgphone{
                    &>img{
                        width: 19px;
                        height: 19px;
                        margin-right:15px;
                    }

                }

            }

        }
        .midellef{
            display: flex;
            align-items: center;
            padding: 22px 13px ;
            justify-content: space-around;
            .deliver{
                height: 1px;
                background-color: #dbdbdb;
                width: 102px;
            }
            .middlefont{
                display: flex;
                align-items: center;
                font-size: 14px;
                color:#333333;
                font-weight: bold;
                &>img{
                    width: 116px;
                    height: 44px;
                    margin-right: 14px;
                }
            }
        }
        .tips{
            display: flex;
            background-color: #fff9e9;
            padding: 0 30px;
            margin:0 30px;
            height: 76px;
            align-items: center;
            .tipcontent{
                line-height: 28px;
                font-size: 14px;
                color: #333333;

            }
            .tipsimg{
                height: 100%;
                margin-top:33px;
                margin-right: 8px;
            }
            &>img{
                width: 13px;
                height: 13px;
            }
        }
        .cencelbtm{
            display: flex;
            align-items: center;
            justify-content: center;
            padding:18px 0 26px 0;
            .cencelbtms{
                background-color: #ff9a33;
                color: #ffffff;
                line-height:40px;
                width: 162px;
                font-weight: bold;
                text-align: center;
                border-radius: 5px;
            }
        }

    }

}
</style>