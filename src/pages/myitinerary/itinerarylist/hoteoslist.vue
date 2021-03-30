<template>
	<div class="mian" v-if="userlist">
		<div class="mian_top" >
			<div class="top_left">
				<p>订单号：{{userlist.saleOrderNo}}</p>
			</div>
		</div>
			<div class="hotbox" style="padding-top: 40px;">
			  <div class="lefbox">入住信息</div>
			  <div>酒店名称：{{ userlist.hotelName }}</div>
			  <div>酒店电话：{{ userlist.hotelPhone }}</div>
			  <div v-if="userlist.bedTypeName != null">酒店房型：{{ userlist.bedTypeName }}</div>
			  <div v-if="userlist.arrivalDate">
			    入住时间：{{ subtime(userlist.arrivalDate) }} 至 {{ subtime(userlist.departureDate) }} （共{{
			      count(subtime(userlist.arrivalDate), subtime(userlist.departureDate))
			    }}晚) 房间数：{{ userlist.bookCount }}间
			  </div>
			  <div>酒店地址：{{ userlist.hotelAddress }}</div>
			  <div>房间类型：{{ userlist.proName }}</div>
			  <div>入住人：{{ userlist.guestName }}</div>
			  <div>
			    房间单价(均价)：
			    <span style="color: #F48F00;">￥{{ userlist.eachNightPrice }}</span>
			  </div>
			  <div>
			    联系人：
			    <span>{{ userlist.contactName }}</span>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系电话：
				<span>{{ userlist.contactNumber }}</span>
			  </div>
			  <div style="color: red;">取消规则：{{ userlist.dbCancelRule }}</div>
			</div>
			<div class="hotbox" style="padding-top: 40px;">
			  <div class="lefbox">支付信息</div>
			  <div v-if="userlist.saleOrder&&userlist.saleOrder.payStatus">支付状态：{{ pustatus(userlist.saleOrder.payStatus) }}</div>
			</div>
			<div class="hotbox" style="padding-top: 40px;">
			  <div class="lefbox">订单信息</div>
			  <div v-if="userlist.saleOrder&&userlist.saleOrder.payStatus">订单状态：{{ userstatus(userlist.orderStatus) }}</div>
			</div>
		<div class="mian_bottom">
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
			};
		},
		mounted() {
			this.userlist = JSON.parse(this.$route.query.data); //获取上个页面传入的参数
		},
		methods:{
			pustatus(ty){//支付状态
				if(ty == 1){
					return '待支付'
				} else if(ty == 2){
					return '支付中'
				} else if(ty == 3){
					return '已支付'
				} else if(ty == 4){
					return '为挂帐支付'
				}
			},
			userstatus(ite){//订单状态
				let arr = [{
					name: '待审核',
					id:650
				},{
					name: '处理中',
					id:100,
				},{
					name: '拒单',
					id:600,
				},{
					name: '审批拒绝',
					id:121,
				},{
					name: '占房成功',
					id:122,
				},{
					name: '申请',
					id:117,
				},{
					name: '待处理',
					id:115,
				},{
					name: '预定成功',
					id:101,
				},{
					name: '下单失败',
					id:102,
				},{
					name: '取消中',
					id:400
				},{
					name: '取消成功',
					id:401
				}]
				for(let i in arr){
					if(arr[i].id == ite){
						return arr[i].name
					}
				}
			},
			count(ti, ts) {
			  //计算两个日期多少天
			  let date1 = new Date(ti);
			  let date2 = new Date(ts);
			  let date = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24); /*不用考虑闰年否*/
			  return date;
			},
			subtime(tiem) {
			  //返回日期前10位
			  return tiem.substring(0, 10);
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
			.top_left p{
				display: flex;
				margin-top: 20px;
				font-size: 14px;
				padding: 10px 15px;
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
