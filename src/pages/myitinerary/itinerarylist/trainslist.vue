<template>
<!-- 我的行程->火车票->详情页 -->
	<div class="mian">
		<div class="mian_top">
			<div class="hotboxs" v-if="userlist && userlist.saleOrder">
			  <div >订单号：{{userlist.saleOrder.transationOrderNo}}</div>
			  <div class="statusx">{{ userlist.saleOrder.orderStatus | orderStatusId }}</div>
			</div>
		</div>
			<div class="hotbox" style="padding-top: 40px;"  v-if="userlist && userlist.traPassenger">
			  <div class="lefbox">火车票</div>
			  <div>取票号：{{ userlist.ticketNo }}</div>
			  <div>出发站：{{ userlist.fromstation }} &nbsp;&nbsp;&nbsp;到达站：{{userlist.tostation}}</div>
			  <div>车次：{{ userlist.trainno }} &nbsp;&nbsp;&nbsp;出发日期：{{userlist.departureTime}}&nbsp;&nbsp;&nbsp;到达日期：{{userlist.arrivalTime}}</div>
			  <div>出行人：</div>
			  <div>
			    &nbsp;&nbsp;&nbsp;&nbsp;{{userlist.traPassenger.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{userlist.seatNo}}&nbsp;&nbsp;&nbsp;&nbsp;{{userlist.seatclass}}&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #f48f00;">￥{{userlist.salePrice}}</span>&nbsp;&nbsp;&nbsp;&nbsp;{{userlist.traPassenger.certType | catypeNum}}
			    ：{{userlist.traPassenger.certNo | numberPapers}} &nbsp;&nbsp;&nbsp;&nbsp;票号：{{userlist.ticketNo}} &nbsp;&nbsp;&nbsp;&nbsp;<span style=" color: #007AFF;">{{userlist.status | orderStatusId}}</span>
			  </div>
			</div>
		<div class="mian_bottom">
			<div class="boxbtn">
					<div class="retunbts" @click="retuns">返回</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {  orderStatusId , catypeNum,numberPapers } from "@/utils/common-filters";
	export default{
		filters:{
			orderStatusId , catypeNum,numberPapers
		},
		data(){
			return {
				userlist:{},
				weeks:['一','二','三','四','五','六','日'],
			};
		},
		mounted() {
			this.userlist = JSON.parse(this.$route.query.data); //获取上个页面传入的参数
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
			// catype(it){//返回证件类型
			// 	if(it == 1){
			// 		return '身份证'//NI
			// 	} else if(it == 2){
			// 		return '护照'//PP
			// 	} else if(it == 3){
			// 		return '台胞证'//TB
			// 	} else if(it == 4){
			// 		return '港澳通行证'//GA
			// 	}
			// },
			// userstatus(it){//乘客当前状态
			// 	if(it == 2){
			// 		return '占座成功'
			// 	} else if(it == 3){
			// 		return '出票中'
			// 	} else if(it == 4){
			// 		return '已出票111'
			// 	} else if(it == 5){
			// 		return '退票中'
			// 	} else if(it == 6){
			// 		return '改签中'
			// 	} else if(it == 7){
			// 		return '已退票'
			// 	} else if(it == 8){
			// 		return '已废弃'
			// 	} else if(it == 9){
			// 		return '已改签'
			// 	} else if(it == 10){
			// 		return '占座失败'
			// 	} else if(it == 11){
			// 		return '出票失败'
			// 	}
			// },
			// userstatus(ite) {
			//   //订单状态
			//   let arr = [
			//     {
			//       name: '占座中',
			//       id:1
			//     },{
			//       name: '占座成功',
			//       id:2
			//     },{
			//       name: '出票中',
			//       id:3,
			//     },{
			//       name: '已出票222',
			//       id:4
			//     },{
			//       name: '退票中',
			//       id:5
			//     },{
			//       name: '改签中',
			//       id:6
			//     },{
			//       name: '部分退废',
			//       id:7
			//     },{
			//       name: '部分改签',
			//       id:8
			//     },{
			//       name: '已退',
			//       id:9
			//     },{
			//       name: '订单已废弃',
			//       id:10
			//     },{
			//       name: '已改签',
			//       id:11
			//     },{
			//       name: '占座失败',
			//       id:12
			//     },{
			//       name: '出票失败',
			//       id:13
			//     }
			//   ];
			//   for (let i in arr) {
			//     if (arr[i].id == ite) {
			//       return arr[i].name;
			//     }
			//   }
			// },
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
			.top_left p{
				display: flex;
				margin-top: 20px;
				font-size: 14px;
				padding: 10px 0;
			}
			.hotboxs {
			  width: calc(100% - 30px);
			  line-height: 23px;
			  position: relative;
			  margin: 20px 0;
			  padding: 15px;
			  background-color: #ffffff;
			  border-radius: 4px;
			  font-size: 12px;
			  .statusx {
			    position: absolute;
			    right: 20px;
			    top: -1px;
			    width: 114px;
			    height: 50px;
			    background: url(../../../../static/image/order/orderbg.png) no-repeat;
			    background-size: cover;
			    line-height: 30px;
			    font-size: 13px;
			    color: #ffffff;
			    text-align: center;
			  }
			}
		}
		  .hotbox {
			width: calc(100% - 30px);
			line-height: 23px;
			position: relative;
			margin: 20px 0 0;
			padding: 15px;
			background-color: #ffffff;
			border-radius: 4px;
			font-size: 12px;
			.lefbox {
			  position: absolute;
			  left: 0;
			  top: 15px;
			  padding: 0 10px;
			  line-height: 25px;
			  font-weight: 600;
			  font-size: 14px;
			  border-left: 2px solid #409eff;
			}
		  }
		.mian_bottom{
			width: 100%;
			padding:30px 0;
			background: white;
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
