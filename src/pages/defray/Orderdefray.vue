<template>
	<div class="hoteorder" v-loading="loading">
		<div class="hotboxs" v-if="userslist.tr">
      <div class="trbtend">
        <div class="statusx">
          <img :src="conpan(orderStatus)" alt="">
        </div>
      </div>

			<div class="hotboxse">
				<div class="box_list">
					<div class="hot_list">
            <div class="box_codes">单号：{{ codes }}</div>
						<div class="hot_amount">总金额：￥{{ userslist.tr.amount }}</div>
						<div v-if="userslist.tr.orderDetailList.length == '1' && userslist.tr.orderDetailList[0].voyages.length != '2'">
							<div>
								基建/燃油：
								￥{{ userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].taxFee }}/
								￥{{ userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].fuelFee }}
							</div>
              <div>
                票价：￥{{ userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].parPrice }}
              </div>
						</div>
						<div v-if="userslist.tr.orderDetailList.length == '1' && userslist.tr.orderDetailList[0].voyages.length == '2'">
							<span>
								往：基建/燃油：
								￥{{
                  userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].taxFee
                }}/{{ userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].fuelFee }}
							</span>
							<span>
								返：基建/燃油：
								￥{{ userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].taxFee }}/{{ userslist.tr.orderDetailList[0].passengers[0].fareInfos[1].fuelFee }}
							</span>
              <div>
                <span >去程：￥{{ userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].parPrice }}</span>
                <span>返程：￥{{ userslist.tr.orderDetailList[0].passengers[0].fareInfos[1].parPrice }}</span>
              </div>
						</div>
						<div v-if="userslist.tr.orderDetailList.length == '2'">
							<span >
								往：基建/燃油：
								￥{{
                  userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].taxFee
                }}/{{ userslist.tr.orderDetailList[1].passengers[0].fareInfos[0].fuelFee }}
							</span>
							<span>
								返：基建/燃油：
								￥{{ userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].taxFee }}/{{ userslist.tr.orderDetailList[1].passengers[0].fareInfos[0].fuelFee }}
							</span>
              <div>
                <span >去程：￥{{ userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].parPrice }}</span>
                返程：￥{{ userslist.tr.orderDetailList[1].passengers[0].fareInfos[0].parPrice }}
              </div>
						</div>
						<div class="box_orderDetailList">
							<span>保险：</span>
								<span v-if="(userslist.tr.orderDetailList.length == '1' || userslist.tr.orderDetailList.length == '2') && insuranceInfos == null">
									￥0
								</span>
							<span  v-if="(userslist.tr.orderDetailList.length == '1' ||userslist.tr.orderDetailList.length == '2')
							 && insuranceInfos != null" v-for="(item,index) in insuranceInfos" :key="index">
									￥{{ item.pretium }}
							</span>
						</div>
						<div >
							<span >往：服务费：￥{{ userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].tips * userslist.tr.orderDetailList[0].passengers.length }}</span>
							<span v-if="userslist.tr.orderDetailList.length == '1' && userslist.tr.orderDetailList[0].voyages.length == '2'">
								返：服务费：￥{{ userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].tips * userslist.tr.orderDetailList[0].passengers.length }}</span>
							<span v-if="userslist.tr.orderDetailList.length == '2'"> 返：服务费：￥{{ userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].tips *  userslist.tr.orderDetailList[0].passengers.length }}</span>
						</div>
						<div>
						</div>
					</div>
				</div>

			</div>
		</div>
		<div v-if="userslist.tr">
			<defray businessType="1" productType="1" :recordNo=codes :amount=userslist.tr.amount></defray>
		</div>
	</div>
</template>

<script>
	import airports from '../../../static/js/airports.js'
	import Defray from "@/components/common/defray";

	export default {
		components: {
			Defray
		},
		data() {
			return {
				dialogTableVisible: false,
				dialogFormVisible: false,
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				formLabelWidth: '120px',
				value: '',
				values: '',
				maoid: '1',
				disa: false,
				checkList: [], //选中人员
				userlist: [], //出行人信息
				isclose: false,
				drawelist: [],
				apprvCost: [],
				insuranceInfos: [],
				companyi_click: false, //遮盖层
				phone_click: false,
				hang: [],
				address: [], //城市
				dialogVisible: false,
				loading: false,
				splog: [], //审批日志
				codes: '', //飞机票id
				plsitsti: {}, //飞机票详情
				userslist: {}, //飞机票详情
				numprice: '999', //总价
				orderStatus: '', //订单状态
				orderStatuse: '', //订单状态
				payStatus: '', //支付状态
				RuleMas: false, //当前用户是否免审
				sione: true, //改单程还是往返
				shos: false,
				orderDetailListy: [],
				isttype: 0,
				RuleMa: '',
				saleOrderNo: '',
				typename: '',
				isnum: 0,
				usersnamelist: [],
				odllegList: [],
				applylist: {},
			};
		},
		mounted() {
			this.codes = this.$route.query.data; //获取上个页面传入的参数
			this.tokens = JSON.parse(sessionStorage.getItem('userinfo')).token;
			this.searchhoter();
			this.queryAirlineList();
		},
		methods: {


			passlist() {
				let list = this.userslist.tr.orderDetailList[0];
				this.odllegList = []; //当前航班信息
				this.usersnamelist = []; //当前可操作用户
				let voyages = list.voyages;
				for (let i = 0; i < voyages.length; i++) {
					this.odllegList.push({
						flightNo: voyages[i].flightNo,
						cabin: voyages[i].cabin,
						depAirport: voyages[i].depart,
						arrAirport: voyages[i].arrive,
						depTime: this.timels(voyages[i].departTime),
						arrTime: this.timels(voyages[i].arriveTime),
					})
				}
				for (let i = 0; i < this.orderDetailListy[0].passengers.length; i++) { //循环插入所有用户信息
					if (this.orderDetailListy[0].passengers[i].voyages[0].status == 1) {
						this.usersnamelist.push({
							ageType: this.orderDetailListy[0].passengers[i].ageType, //乘客类型
							phone: this.orderDetailListy[0].passengers[i].phone,
							city: [{ //出发城市
								id: this.orderDetailListy[0].passengers[i].voyages[0].depart,
								name: this.citys(this.orderDetailListy[0].passengers[i].voyages[0].depart)
							}, { //到达城市
								id: this.orderDetailListy[0].passengers[i].voyages[0].arrive,
								name: this.citys(this.orderDetailListy[0].passengers[i].voyages[0].arrive)
							}],
							citys: {
								id: this.orderDetailListy[0].passengers[i].voyages[0].arrive,
								name: this.citys(this.orderDetailListy[0].passengers[i].voyages[0].arrive)
							},
							departTime: this.orderDetailListy[0].passengers[i].voyages[0].departTime.substring(0, 10),
							cardNo: this.orderDetailListy[0].passengers[i].cardNo, //证件类型
							cardType: this.orderDetailListy[0].passengers[i].cardType, //证件号码
							passengerId: this.orderDetailListy[0].passengers[i].passengerId,
							name: this.orderDetailListy[0].passengers[i].name,
							istrue: false, //默认为待选状态
							stkus: this.orderDetailList[0].stkus
						})
					} else if (this.orderDetailListy[0].passengers[i].voyages[1] != null && this.orderDetailListy[0].passengers[i].voyages[
							1].status == 1) {
						this.usersnamelist.push({
							ageType: this.orderDetailListy[0].passengers[i].ageType, //乘客类型
							phone: this.orderDetailListy[0].passengers[i].phone,
							city: [{ //出发城市
								id: this.orderDetailListy[0].passengers[i].voyages[1].depart,
								name: this.citys(this.orderDetailListy[0].passengers[i].voyages[1].depart)
							}, { //到达城市
								id: this.orderDetailListy[0].passengers[i].voyages[1].arrive,
								name: this.citys(this.orderDetailListy[0].passengers[i].voyages[1].arrive)
							}],
							citys: {
								id: this.orderDetailListy[0].passengers[i].voyages[1].arrive,
								name: this.citys(this.orderDetailListy[0].passengers[i].voyages[1].arrive)
							},
							departTime: this.orderDetailListy[0].passengers[i].voyages[1].departTime.substring(0, 10),
							cardNo: this.orderDetailListy[0].passengers[i].cardNo, //证件类型
							cardType: this.orderDetailListy[0].passengers[i].cardType, //证件号码
							passengerId: this.orderDetailListy[0].passengers[i].passengerId,
							name: this.orderDetailListy[0].passengers[i].name,
							istrue: false, //默认为待选状态
							stkus: this.orderDetailList[0].stkus
						})
					} else if (this.orderDetailListy[1].passengers[i].voyages[0] != null && this.orderDetailListy[1].passengers[i].voyages[
							0].status == 1) {
						this.usersnamelist.push({
							ageType: this.orderDetailListy[1].passengers[i].ageType, //乘客类型
							phone: this.orderDetailListy[1].passengers[i].phone,
							city: [{ //出发城市
								id: this.orderDetailListy[1].passengers[i].voyages[0].depart,
								name: this.citys(this.orderDetailListy[1].passengers[i].voyages[0].depart)
							}, { //到达城市
								id: this.orderDetailListy[1].passengers[i].voyages[0].arrive,
								name: this.citys(this.orderDetailListy[1].passengers[i].voyages[0].arrive)
							}],
							citys: {
								id: this.orderDetailListy[1].passengers[i].voyages[0].arrive,
								name: this.citys(this.orderDetailListy[1].passengers[i].voyages[0].arrive)
							},
							departTime: this.orderDetailListy[1].passengers[i].voyages[0].departTime.substring(0, 10),
							cardNo: this.orderDetailListy[1].passengers[i].cardNo, //证件类型
							cardType: this.orderDetailListy[1].passengers[i].cardType, //证件号码
							passengerId: this.orderDetailListy[1].passengers[i].passengerId,
							name: this.orderDetailListy[1].passengers[i].name,
							istrue: false, //默认为待选状态
							stkus: this.orderDetailList[0].stkus
						})
					}
				}
			},
			timels(time) {
				if (time.length < 19) {
					return time + ':00'
				} else {
					return time
				}
			},
			retuns() {
				this.$router.go(-1); //返回上一页
			},
			citys(its) { //回显城市
				for (let j = 0; j < this.address.length; j++) { //循环城市
					if (this.address[j].airportCode == its) {
						return this.address[j].cityCName
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
			pustatus(ty) {
				//支付状态
				if (ty == 1) {
					return '待支付';
				} else if (ty == 2) {
					return '支付中';
				} else if (ty == 3) {
					return '已支付';
				} else if (ty == 4) {
					return '为挂帐支付';
				}
			},
			conpan(ie) {
				let arr = [{
						name: '预订中',
						id: 1,
						url: '../../../static/image/home/book.png'
					}, {
						name: '待审核',
						id: 2,
						url: '../../../static/image/home/To-audit.png'
					},
					{
						name: '待提交',
						id: 3,
						url: '../../../static/image/home/To-submit.png'
					},
					{
						name: '出票中',
						id: 4,
						url: '../../../static/image/home/ticket.png'
					},
					{
						name: '已出票',
						id: 5,
						url: '../../../static/image/home/check.png'
					}, {
						name: '已取消',
						id: 6,
						url: '../../../static/image/home/Canceled.png'
					}, {
						name: '已拒单',
						id: 7,
						url: '../../../static/image/home/订单-订单拒绝.png'
					}, {
						name: '待支付',
						id: 8,
						url: '../../../static/image/home/unpaid.png'
					}, {
						name: '待审批',
						id: 9,
						url: '../../../static/image/home/Approval-Pending.png'
					}, {
						name: '已登账',
						id: 10,
						url: '../../../static/image/home/Has-been-booked.png'
					}
				]
				for (let i in arr) {
					if (arr[i].id == ie) {
						return arr[i].url
					}
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
			queryAirlineList() { //获取机场名称
				let _this = this;
				_this.$api.order.queryAirlineList().then((res) => {
					if (res.code == 200) {
						this.hang = res.data.airlineDds;
					} else {
						_this.$message({
							message: res.message,
							type: 'warning'
						})
					}
				}).catch((e) => {
					_this.$message({
						message: e,
						type: 'warning'
					})
					console.log(e)
				})
			},
			searchhoter(tradeNo) { //查询机票详情
				if (tradeNo != null) {
					this.codes = tradeNo
				}
				let that = this;
				that.loading = true;
				that.$api.order
					.getOrderDetailByTranNo({
						tranNo: that.codes
					})
					.then((res) => {
						that.loading = false;
						if (res.code == 200) {
							that.userslist = res.data;
							that.apprvTaskReason = res.data.apprvTaskReason;
							that.accountInfo = res.data.tr.accountInfo; //联系信息
							that.orderDetailList = res.data.tr.orderDetailList; //航班乘客信息
							that.userslist = res.data;
							that.insuranceInfos = that.userslist.tr.orderDetailList[0].passengers[0].insuranceInfos; //获取保险信息
							that.tiltext = '机票订单详情';
							that.timeList = res.data.timeList; //航行时间
							that.address = airports.addressAirportAll; //航空名字
							that.orderStatus = that.userslist.tr.orderDetailList[0].mainDetail.orderStatus; //订单状态 1:预订中(默认); 2:待审核; 3:待提交; 4:出票中; 5:已出票; 6:已取消; 7:已拒单；8:待支付；9:待审批；10:已登账
							if (that.userslist.tr.orderDetailList[1] != undefined) {
								that.orderStatuse = that.userslist.tr.orderDetailList[1].mainDetail.orderStatus; //订单状态 1:预订中(默认); 2:待审核; 3:待提交; 4:出票中; 5:已出票; 6:已取消; 7:已拒单；8:待支付；9:待审批；10:已登账
							}
							that.payStatus = that.userslist.tr.orderDetailList[0].mainDetail.payStatus; //支付状态  1:未支付(默认); 2:部分支付; 3:已支付; 4:部分退款; 5:已退款;6:退款中
							if (that.orderStatus == 3 && that.payStatus == 1) { //待提交，未支付   判断取消
								this.isclose = true
							} else if (that.orderStatus == 9) {
								this.isclose = true
							}
							if (that.orderDetailList.length == 2 || (that.orderDetailList.length == 1 && that.orderDetailList[0].voyages
									.length == 1)) {
								that.isttype = 1;
								for (let i = 0; i < that.orderDetailList.length; i++) {
									let lo = that.orderDetailList[i];
									lo.voyages[0]['ims'] = '../../../static/img/' + lo.voyages[0].airline + '.png';
									that.orderDetailListy.push(lo)
								} //是否两个销售单对应两个航程或者一个销售单对应一个航程
							}
							if (that.orderDetailList.length == 1 && that.orderDetailList[0].voyages.length == 2) {
								that.isttype = 2;
								for (let i = 0; i < 2; i++) {
									let voy = that.orderDetailList[0].voyages[i]
									voy['ims'] = '../../../static/img/' + voy.airline + '.png'
									that.orderDetailListy.push({
										mainDetail: that.orderDetailList[0].mainDetail,
										passengers: that.orderDetailList[0].passengers,
										voyages: [voy]
									})
								} //是否一个销售单对应两个航程
							}
							let usenaslist = that.userslist.tr.orderDetailList[0].passengers; //乘客信息
							if (that.isttype == 1 && that.orderDetailList.length == 2) { //2条销售单往返 1条数据 往返 不能改签往返
								for (let i = 0; i < usenaslist.length; i++) {
									that.userlist.push({
										icke: 3,
										it: that.userslist.tr.orderDetailList[0].passengers[i],
										its: that.userslist.tr.orderDetailList[1].passengers[i],
										itd: that.userslist.tr.orderDetailList[0].passengers[i].voyages[0], //去
										isd: that.userslist.tr.orderDetailList[1].passengers[i].voyages[0], //回
									})
								}
								for (let i = 0; i < that.orderDetailListy.length; i++) {
									that.orderDetailListy[i]['stkus'] = false;
									for (let k = 0; k < that.userlist.length; k++) {
										if (i == 0 && that.userlist[k].itd.status == 1) {
											that.orderDetailListy[i].stkus = true;
										}
										if (i == 1 && that.userlist[k].isd.status == 1) {
											that.orderDetailListy[i].stkus = true;
										}
									}
								}
							} else if (that.isttype == 1 && that.orderDetailList.length == 1) { //1条销售单往返 1条数据 单程
								for (let i = 0; i < usenaslist.length; i++) {
									that.userlist.push({
										icke: 1,
										it: that.userslist.tr.orderDetailList[0].passengers[i],
										itd: that.userslist.tr.orderDetailList[0].passengers[i].voyages[0],
									})
								}
								for (let i = 0; i < that.orderDetailListy.length; i++) {
									that.orderDetailListy[i]['stkus'] = false;
									for (let k = 0; k < that.userlist.length; k++) {
										if (i == 0 && that.userlist[k].itd.status == 1) {
											that.orderDetailListy[i].stkus = true;
										}
									}
								}
							}
							for (let k in that.userlist) {
								if (that.userlist[k].icke == 1) {
									that.userlist[k].itd['statusname'] = that.userstatus(that.userlist[k].itd.status);
								}
								if (that.userlist[k].icke == 3) {
									that.userlist[k].itd['statusname'] = that.userstatus(that.userlist[k].itd.status);
									that.userlist[k].isd['statusname'] = that.userstatus(that.userlist[k].isd.status);
								}
							}
							this.passlist();
							this.ists = false;
							this.isgs = false;
						} else {
							that.$message({
								message: res.message,
								type: 'warning'
							});
						}
					})
					.catch(e => {
						that.loading = false;
						console.log(e);
					});
			},
		}
	};
</script>
<style scoped lang="less">
	.hoteorder {
		width: 1180px;
		margin: 0 auto;
		min-height: 300px;
		.hotboxs {
      width: 1180px;
			height: 178px;
			display: flex;
			margin: 20px 0;
      padding: 19px 0 21px 44px;
			background-color: #ffffff;
			border-radius: 4px;
      box-sizing: border-box;
			font-size: 12px;
			.hotboxse {
				display: flex;

        .box_list{
          padding-left: 35px;

        }
        .hot_list{
          color: #333333;
          font-size: 14px;
          div{
            line-height: 14px;
            margin-bottom: 10px;
          }
          .box_codes{
            font-size: 14px;
          }

          .box_orderDetailList{
            display: flex;
            line-height: 14px;
            align-items: center;
            justify-content: flex-start;
            div{
              line-height: 14px;
            }
          }
        }
				.trbtend {
					flex: 1.5;
					display: flex;
					margin-left: 40px;
					position: relative;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.statusx {
						display: flex;
						align-items: center;
						justify-content: center;

						img {
							width: 73px;
							height: 73px;
						}
					}
				}
			}
		}
	}
</style>
