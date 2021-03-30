<template>
	<div class="mian" v-if="userlist">
		<div class="mian_top">
			<div class="top_left">
				<p v-if="userlist.sale">订单号：{{userlist.sale.tradeNo}}</p>
			</div>
		</div>
		<div class="mian_middle">
			<div class="trsbt">
			  <div class="trsbord">
			    <p v-if="userlist.departTime">{{yeada(userlist.departTime,1)}}</p>
			    <div class="tsfons">
			      <span class="iconfont">&#xe602;</span>&nbsp;飞往&nbsp;&nbsp;{{userlist.citynamey}}
			    </div>
			    <div class="tsbods">
			      <div class="tsbodas">
			        <div class="tsbodsle">
			          <div>
			            <span class="iconfont" style="margin: 0 10px;color: #F5A623;"><img style=" width: 20px;height: 20px;" :src="userlist.ims" /></span>
			          </div>
			          <div>
			             <div style="font-size: 15px;">{{userlist.companys}}{{userlist.flightNo}}</div>
			          </div>
			        </div>
			        <div class="trainsc_s">
			          <div class="trainsc_s_l">
			            <div class="trainsc_s_l_b">
			              <div class="trainsc_s_l_b_r">{{ userlist.citynames }}</div>
			            </div>
			            <div class="trainsc_s_l_t" v-if="userlist.factDepartTime">{{yeada( userlist.factDepartTime,0) }}</div>
			            <div class="trainsc_s_l_b">
			              <div class="trainsc_s_l_b_r" style="color: #CCCCCC;">{{ userlist.citynames }}{{ userlist.departTerminal }}</div>
			            </div>
			          </div>
			          <div class="trainsc_s_s">
			            <div style="font-size: 12px;" v-if="userlist.factDepartTime">{{busdate(userlist.factDepartTime,userlist.factArriveTime) }}</div>
			          </div>
			          <div class="trainsc_s_l">
			            <div class="trainsc_s_l_b">
			              <div class="trainsc_s_l_b_r">{{ userlist.citynamey }}</div>
			            </div>
			            <div class="trainsc_s_l_t" v-if="userlist.factArriveTime">{{ yeada(userlist.factArriveTime,0) }}</div>
			             <div class="trainsc_s_l_b">
			               <div class="trainsc_s_l_b_r" style="color: #CCCCCC;">{{ userlist.citynamey }}{{ userlist.arriveTerminal }}</div>
			             </div>
			          </div>
			        </div>
			        <div class="tright">
			            <p style="font-size: 15px;">￥</p>
			            <p style="font-size: 30px;color: #EE4747;">{{userlist.salePrice}}</p>
			        </div>
			      </div>
			      <div class="fuel">
			        <div class="fuel_left">
			          基建燃油 ￥<p>{{ userlist.taxFee }}/{{ userlist.fuelFee }}</p>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
		</div>
		<div class="mian_bottom">
			<div class="mian_passenger">乘机人</div>
			<div class="username">
				<ul class="username_left">
					<li>{{userlist.factName}}</li>
					<li>成人票</li>
					<li style=" color: #007AFF;">{{userlist.statusName}}</li>
				</ul>
			</div>
			<div class="username">
				<ul class="username_left">
					<li>{{catype(userlist.cardType)}}</li>
					<li>{{userlist.cardNo}}</li>
				</ul>
			</div>
			<div class="username">
				<ul class="username_left">
					<li>手机号</li>
					<li>{{userlist.phone}}</li>
				</ul>
			</div>
		</div>
		<div class="relation">
			<div class="relation_username">
				<ul class="relation_usernames" v-if="userlist.sale">
					<li style="font-size: 16px;text-indent: 20px;">联系信息</li>
					<li style="text-indent: 20px;" >{{userlist.sale.contacts}}</li>
					<li>{{userlist.sale.contactPhone}}</li>
				</ul>
			</div>
			<div class="boxbtn">
					<div class="retunbts" @click="retuns">返回</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				userlist:{},
				weeks:['一','二','三','四','五','六','日'],
				activeIndex:'',
			};
		},
		mounted() {
			this.userlist = JSON.parse(this.$route.query.data); //获取上个页面传入的参数
			this.activeIndex = JSON.parse(this.$route.query.activeIndex); 
		},
		methods:{
			yeada(item,num){
				if(num == 0){
					return item.substring(11,16)
				} else if(num == 1){
					let week = new Date(item.replace(/-/g, '/')).getDay();
					if(week == 0){
						week = 7
					}
					let ts = item.substring(5,10).split('-');
					return ts[0] + '月' + ts[1] + '日' + ' 周' + this.weeks[week-1]
				}
			},
			busdate(num,num1){//总时长
				let st = Date.parse(new Date(num.replace(/-/g, '/')));
				let st1 = Date.parse(new Date(num1.replace(/-/g, '/')));
				let dat = st1 - st;
				let fs = dat/1000/60 ;//一共多少分钟
				let hours = parseInt(fs/60);//多少小时
				let tims = fs - hours * 60;//于多少分钟
				if(tims > 0){
					return hours + '时' + tims + '分'
				} else {
					return hours + '时'
				}
			},
			catype(it){//返回证件类型
				if(it == 'NI'){
					return '身份证'
				} else if(it == 'PP'){
					return '护照'
				} else if(it == 'TB'){
					return '台胞证'
				} else if(it == 'GA'){
					return '港澳通行证'
				} else if(it == 'HX'){
					return '回乡证'
				} else if(it == 'OS'){
					return '其他证件'
				}
			},
			retuns() {
				this.$router.go(-1); //返回上一页
			},
		}
	}
</script>

<style scoped lang="less">
	.mian{
		width: 1180px;
		margin: 0 auto;
		.mian_top{
			background: white;
			.top_left {
				display: flex;
				margin-top: 20px;
				line-height: 50px;
				font-size: 14px;
				padding: 0 20px;
			}
		}
		.mian_middle{
			.trsbt{
			  margin-top: 10px;
			  width: calc(100%-40px);
			  padding: 10px;
			  background: #FFFFFF;
			  .trsbord{
			    width: calc(80% - 80px);
			    padding: 10px 20px;
			    margin:  0 20px;
			    border-left:1px dashed #D2DDE7 ;
			    .tsfons{
			      margin-top: 10px;
			      font-size: 15px;
			      color: #78879D;
			      line-height: 30px;
			    }
			    .tsbods{
			      width: calc(100% - 20px);
			      padding: 20px 10px;
			      border: 1px solid #D2DDE7;;
			      border-radius: 20px;
			      .tsbodas{
			        display: flex;
			        width: 100%;
			        .tsbodsle{
			          width: 280px;
			          display: flex;
			          text-align: center;
			          margin-top: 10px;
			        }
			        .trainsc_s {
			          width: 50%;
			          padding: 0 5%;
			          display: flex;
			          align-items: center;
			          .trainsc_s_l {
			            width: 40%;
			            margin-top: 5px;
			            .trainsc_s_l_t {
			              font-family: '楷体';
			              text-align: center;
			              color: #3b4f62;
			              line-height: 25px;
			              font-size: 18px;
			            }
			            .trainsc_s_l_b {
			              display: flex;
			              justify-content: center;
			              font-size: 12px;
			              .trainsc_s_l_b_r {
			                color: #3b4f62;
			              }
			            }
			          }
			          .trainsc_s_s {
			            width: 40%;
			            color: #d2dde7;
			            font-size: 14px;
			            display: flex;
			            justify-content: center;
			            background-size: 82px 6px;
			            padding: 2px 0;
			            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAAAGCAYAAABQM8l6AAAAAXNSR0IArs4c6QAAAJ9JREFUOBFjYBgFRIXApfsv067dey+PSzETLolRcdQQYGJg/PmX4cfZy/deuqHKQHijAYktVLCI/Wf+f+T/fwZhBob/2y/fe1H9//9/RmRljFfuvgxGFhhl4w6Bf4z/FjH8Z+ACqWBkZNzM9Z8tVllZ6COYf+nu8/+4tY7K4AsBRgbGO8AQDdZVEr/EePnu8x/4FI/K4Q8BYAb/BlSRDgAVIS7yFUG6BwAAAABJRU5ErkJggg==')
			            bottom no-repeat;
			          }
			        }
			        .tright{
			          display: flex;
			          margin-left: 100px;
			          align-items: center;
			          justify-content: center;
			        }
			      }
			      .fuel{
			        display: flex;
			        padding: 10px 10px;
			        justify-content: space-between;
			        .fuel_left{
			          font-size: 15px;
			          display: flex;
			          p{
			            color: red;
			            padding-top: 2px;
			          }
			        }
			        .fuel_right{
			          color: #0CC071;
			          cursor: pointer;
			        }
			      }
			    }
			  }
			}
		}
		.mian_bottom{
			width: 100%;
			margin-top:10px;
			padding-top: 10px;
			background: white;
			.mian_passenger{
				font-size: 16px;
				text-indent: 20px;
			}
			.username{
				.username_left {
					display: flex;
					margin-top: 15px;
					text-indent: 20px;
				}
				.username_left li{
					display: flex;
					font-size: 14px;
					text-indent: 104px;
					list-style: none;
				}
			}
		}
		.relation{
			width: 100%;
			padding: 20px 0;
			background: white;
			.relation_username{
				
				.relation_usernames{
					list-style: none;
					display: flex;
					height: 20px;
					padding-top: 20px;
					line-height: 20px;
					font-size: 14px;
					text-indent: 104px;
					.relation_usernames li{
					}
				}
			}
			.boxbtn {
				margin-top: 10px;
				width: 100%;
				height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
			
				div {
					padding: 2px 20px;
					border-radius: 4px;
					cursor: pointer;
					margin: 0 10px;
				}
			
				.nobts {
					background-color: #409eff;
					color: #FFFFFF;
					border: 1px solid #409eff;
				}
			
				.tkbts {
					background-color: red;
					color: #FFFFFF;
					border: 1px solid red;
				}
			}
			
			.retunbts {
				margin: auto;
				text-align: center;
				background-color: #FFFFFF;
				width: 68px;
				height: 34px;
				line-height: 34px;
				font-size: 14px;
				padding: 0!important;
				color: #409eff;
				border: 1px solid #409eff;
				border-radius: 3px;
				cursor: pointer;
				
			}
		}
		
	}
</style>
