<template>
	<div class="hoteorder" v-loading="loading" v-if="dtolist.status">
		<div class="hotboxs">
			<div class="hotboxe">
				<div>订单号：{{dtolist.no}}</div>
				<div>销售单号：{{dtolist.saleNo}}</div>
				<div>退废状态：{{rest(dtolist.status)}}</div>
				<div>申请时间：{{dtolist.createTime}}</div>
			</div>
			<div class="hotboxse">
						<img :src="conpan(orderStatus)" alt="">
			</div>
		</div>
		<div class="hotbox" style="padding-top: 40px;">
			<div v-for="(item,index) in orderDetailListy" :key="index" style="width: 100%;border-bottom: 1px solid #f2f2f2;display: flex;align-items: center;">
					<div class="" style="width: 50%;">
						<div style="display: flex;">
							<div v-if="index == 0" style="width: 5%;"><img src="../../../../../static/image/home/go.png"/></div>
							<div v-if="index == 1" style="width: 5%;"><img src="../../../../../static/image/home/return.png"/></div>
							<div style="width: 10%;"><img src="../../../../../static/image/home/Plane.png"/></div>
							<div style="width: 20%;font-size: 14px;font-weight: bolder;color: #333333;">{{item.city.departDate.substring(0,10)}}</div>
						</div>
					</div>
					<div style="width: 50%;display: flex;align-items: center;">
						<div class="" style="font-size: 15px;width: 25%;line-height: 120px;text-align: center;"	>
							<span style="">{{citys(item.city.depart)}}{{item.city.departTerminal}}</span>
						</div>
						<div style="width: 50%;text-align: center;text-align: center;">
							<div style="font-size: 14px; color: #333333;">
								{{busdate(item.city.departDate,item.city.arriveTime)}}
							</div>
							<div style="border: 1px solid #CCCCCC;margin: 5px 0;">
								
							</div>
							<div style="font-size: 14px; color: #333333;">
								{{item.city.flightNo}}
							</div>
						</div>
						<div style="width: 25%;line-height: 120px;text-align: center;">
							<span>{{citys(item.city.arrive)}}{{item.city.arriveTerminal}}</span>
						</div>
					</div>
				</div>
				<div style="width: 100%;background: #f2f2f2;color: #333333;font-size: 14px;font-weight: bolder;text-indent: 10px;">乘机人信息</div>
					<div v-for="(item,index) in newuserlist" :key="index" style="width: 100%;color: #333333;text-indent: 96px;margin-top: 20px;font-size: 14px;">
						<span style="width: 20%;">姓名：{{item.name}}</span>
						<span style="padding: 20px;">出差事由：{{Reason}}</span>
						<span style="padding: 20px;">服务费：{{item.refundTips}} 元</span>
						<span style="padding: 20px;">手续费：{{(item.tips + item.refundFee)}} 元</span>
						<span style="padding: 20px;" v-if="item.refundAmount != null">实际应退：{{item.refundAmount}} 元</span>
						<span style="width: 30%;">{{catype(item.cardType)}}：{{item.cardNo}}</span>
						<span style="padding: 20px; color: #007aff;">{{userstatus(item.status)}}</span>
					</div>
		</div>
		<div class="hotbox" v-if="orderStatus== 3">
			<div class="tobeaudited">
				待审批
			</div>
		</div>
		<div class="hotbox" v-if="dtolist.status == 7">
			<div class="tobeaudited">
				已完成
			</div>
		</div>
	</div>
</template>

<script>
	import airports from '../../../../../static/js/airports.js'
	export default {
		data() {
			return {
				newuserlist: [], //乘客信息
				Reason: '出差事由', //出差事由
				dtolist: {}, //改签单详情
				orderDetailListy: [],
				costs: false,
				blac_show: false,
				shos: false,
				orderStatus: '', //订单状态
				userlist: [], //乘客列表
				stlist: [{
					name: '新申请',
					id: 1
				}, {
					name: ':已取消',
					id: 2
				}, {
					name: '待审批',
					id: 3
				}, {
					name: '已拒绝',
					id: 4
				}, {
					name: '待提交',
					id: 5
				}, {
					name: '已提交',
					id: 6
				}, {
					name: '已完成',
					id: 7
				}, {
					name: '待客户审核',
					id: 8
				}, {
					name: '已驳回',
					id: 9
				}],
				vid: 0,
				codes: 0,
				dis: false,
				test: '',
				hang: [],
				weeks: ['一', '二', '三', '四', '五', '六', '日'],
				isclsks: false, //是否从列表点进详情
				accountInfo: {}, //联系信息
				orderDetailList: [], //飞机票详情信息
				ist: 0
			};
		},
		mounted() {
			this.codes = this.$route.query.data; //获取上个页面传入的参数
			this.vid = this.$route.query.vid; //获取上个页面传入的参数
			this.address = airports.addressAirportAll; //航空名字		审批通过待支付
			this.searchhoter();
		},
		methods: {
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
			userstatus(it) { //乘客当前状态
				if (it == 0) {
					return '已取消'
				} else if (it == 1) {
					return '正常'
				} else if (it == 2) {
					return '改签'
				} else if (it == 3) {
					return '废退'
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
			citys(its) { //回显城市
				for (let j = 0; j < this.address.length; j++) { //循环城市
					if (this.address[j].airportCode == its) {
						return this.address[j].cityCName
					}
				}
			},
			rest(ite) {
				let arr = this.stlist;
				for (let i in arr) {
					if (arr[i].id == ite) {
						return arr[i].name
					}
				}
			},
			conpan(ie) {
				let arr = [{
							name: '新申请',
							id: 1,
							url:'../../../static/image/home/new-application.png'
						}, {
							name: ':已取消',
							id: 2,
							url:'../../../static/image/home/Canceled.png'
						}, {
							name: '待审批',
							id: 3,
							url:'../../../static/image/home/Approval-Pending.png'
						}, {
							name: '已拒绝',
							id: 4,
							url:'../../../static/image/home/Approval-refused.png'
						}, {
							name: '待提交',
							id: 5,
							url:'../../../static/image/home/check.png'
						}, {
							name: '已提交',
							id: 6,
							url:'../../../static/image/home/submitted.png'
						}, {
							name: '已完成',
							id: 7,
							url:'../../../static/image/home/订单-已完成.png'
						}, {
							name: '待客户审核',
							id: 8,
							url:'../../../static/image/home/待客户审核.png'
						}, {
							name: '已驳回',
							id: 9,
							url:'../../../static/image/home/been-rejected.png'
						}]
				for (let i in arr) {
					if (arr[i].id == ie) {
						return arr[i].url
					}
				}
			},
			async searchhoter() {
				//查询飞机详情
				let that = this;
				that.loading = true;
				try {
					let res = "";
					let ret = {};
					res = await that.$api.order.orderRefundDetail({
						no: this.codes
					});
					ret = await that.$api.order.queryAirlineList(); //获取航空公司名称
					that.loading = false;
					if (res.code == 200) {
						that.Reason = res.data.saleRefund.reason; //出差事由
						that.dtolist = res.data.saleRefund; //改签单信息
						that.hang = ret.data.airlineDds; //航空公司名
						that.orderStatus = res.data.saleRefund.status; //退费单状态

						let forshowlist = res.data.needShowSaleRefundItemList; //城市乘客信息
						let citylists = res.data.sale.voyages;
						let obj = {};
						forshowlist = forshowlist.reduce(function(item, next) { //数据对象去重
							obj[next.cardNo] ? '' : obj[next.cardNo] = true && item.push(next);
							return item;
						}, []);
						that.newuserlist = forshowlist
						let frocitylist = [];
						if (res.data.needShowGoFlightInfo == 1) {
							frocitylist.push({
								name: '往',
								city: citylists[0]
							})
						}
						if (res.data.needShowBackFlightInfo == 1) {
							frocitylist.push({
								name: '返',
								city: citylists[1]
							})
						}
						for (let k in frocitylist) {
							frocitylist[k]['ims'] = 'http://file.feiren.com/00/02/' + frocitylist[k].city.airline + '.png' //航空公司图标
						}

						that.orderDetailListy = frocitylist;
					} else {
						that.$message({
							message: res.message,
							type: 'warning'
						});
					}
				} catch (e) {
					console.log(e)
					//TODO handle the exception
				}
			}
		}
	};
</script>

<style scoped lang="less">
	.hoteorder {
		width: calc(100% - 320px);
		margin: 0 auto;

		.hotboxs {
			width: calc(100% - 30px);
			height: 120px;
			display: flex;
			align-items: center;
			margin: 20px 0;
			padding: 15px;
			background-color: #ffffff;
			border-radius: 4px;
			font-size: 12px;

			.hotboxe {
				width: 50%;
			}
			.hotboxse {
				img {
					width: 73px;
					height: 73px;
				}
			}
		}

		.hotbox {
			width: calc(100% - 30px);
			line-height: 23px;
			position: relative;
			margin: 20px 0;
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

			.lecheckd {
				display: flex;
				align-items: center;
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

				.retunbts {
					background-color: #FFFFFF;
					color: #409eff;
					border: 1px solid #409eff;
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

			.soclass {
				display: flex;
				text-align: center;
				line-height: 25px;

				div:nth-child(1) {
					flex: 1;
				}

				div:nth-child(2) {
					flex: 2;
				}

				div:nth-child(3) {
					flex: 1;
				}

				div:nth-child(4) {
					flex: 1;
				}

				div:nth-child(5) {
					flex: 1;
				}

				div:nth-child(6) {
					flex: 3;
				}
			}

			.pricenum {
				display: flex;

				div {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;

					span {
						color: #f48f00;
						font-size: 20px;
					}
				}
			}

			.statusx {
				position: absolute;
				right: 20px;
				top: -1px;
				width: 114px;
				height: 50px;
				background: url(../../../../../static/image/order/orderbg.png) no-repeat;
				background-size: cover;
				line-height: 30px;
				font-size: 13px;
				color: #ffffff;
				text-align: center;
			}
			.tobeaudited{
				width: 100%;
				height: 20px;
				color: #999;
				text-align: center;
				font-size: 18px;
			}
		}

		.trstp {
			width: calc(100% - 20px);
			background: #ffffff;
			padding: 10px;

			.tr_ul {
				width: 100%;
				margin: 10px 0;
				display: flex;

				.tr_uleft {
					color: #78879d;
					width: 100px;
					text-align: center;
					line-height: 50px;
				}

				.tr_right {
					width: calc(100% - 100px);
					overflow: hidden;
					display: flex;
					flex-wrap: wrap;

					.tr_rs {
						cursor: pointer;
						margin: 10px;
						padding: 2px 10px;
						line-height: 20px;
						font-size: 14px;
						border: 1px solid #d9e2eb;
						border-radius: 40px;

						.tr_rtp {
							text-align: center;
						}

						.tr_rbn {
							color: #abb7c2;
						}
					}
				}

				.tr_rights {
					width: calc(100%-100px);
					display: flex;

					.tr_dvs {
						cursor: pointer;
						width: 170px;
						height: 38px;
						padding: 0 15px;
						border-radius: 4px;
						border: 1px solid #DCDFE6;
						color: #606266;
						line-height: 38px;
						display: flex;
						font-size: 14px;

						span {
							margin: 0 3px;
						}
					}
				}
			}
		}

		.ditrslist {
			width: 100%;
			height: 90%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.ditrslists {
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.addpalist {
			width: 100%;
			height: 10%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFFFFF;
			background: #007AFF;
		}
	}
</style>
