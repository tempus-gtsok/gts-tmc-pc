<template>
<!-- 我的订单->酒店->详情页 -->
	<div class="hoteorder" v-loading="loading" v-if="plsitsti.hotelOrder != null && plsitsti.hotelOrder != undefined">
		<div class="hotboxs">
			<img src="../../../../../static/image/left.png" alt="">
			<div class="hot_lefts">
				<div>预订单号：{{ codes }}</div>
				<div v-if="headtravelNo">出差单号：{{ headtravelNo }}</div>

				<div>出行人：{{ plsitsti.hotelOrder.guestName }}</div>
			</div>
			<img :src="orderStatus | hotellUserstatus" alt="">
		</div>
		<div style="padding: 11px;background-color: #FFFFFF;border-radius: 4px;">
			<div class="hotbox hotData" style="line-height: 30px;">
				<div class="lefbox">入住信息</div>
				<div class="hot_data">
				<div>
					<span>入住酒店：</span>
					<span>{{ plsitsti.hotelOrder.hotelName }}</span>
				</div>
				<div>
					<span>酒店地址：</span>
					<span>{{ plsitsti.hotelOrder.hotelAddress }}</span>
				</div>
				<div v-if="plsitsti.hotelOrder.proName != null">
					<span>入住房型：</span>
					<span>{{ plsitsti.hotelOrder.proName }}</span>
				</div>
				<div>
					<span>入住时间：</span>
					<span>
					{{ subtime(plsitsti.hotelOrder.arrivalDate) }} 至 {{ subtime(plsitsti.hotelOrder.departureDate) }} （共{{
			  count(subtime(plsitsti.hotelOrder.arrivalDate), subtime(plsitsti.hotelOrder.departureDate))
			}}晚) 房间数：{{ plsitsti.hotelOrder.bookCount }}间</span>
				</div>
				<div>
					<span>订单号：</span>
					<span>{{ codes }}</span>
				</div>
				<div>
					<span>入住人：</span>
					<span>{{ plsitsti.hotelOrder.guestName }}</span>
				</div>
				<div>
					<span>房间单价(均价)：</span>
					<span style="color: #F48F00;">￥{{ plsitsti.hotelOrder.eachNightPrice }}</span>
				</div>
				<div v-if="plsitsti.hotelOrder.serviceFee">
					<span>服务费：</span>
					<span style="color: #F48F00;">￥{{ plsitsti.hotelOrder.serviceFee }}</span>
				</div>
				<div v-if="plsitsti.hotelOrder.specialRequirements">
                    <span>特殊需求：</span>
                    <span>{{ plsitsti.hotelOrder.specialRequirements }}</span>
				</div>
				<div style="color: red;">
					<span>取消规则：</span>
					<span>{{ dbCancelRules }}</span>
				</div>
				</div>
			</div>
			
			<div class="hotbox" v-if="splog.length > 0 && typename == 1">
				<div class="lefbox">审批日志</div>
				<div class="soclass">
					<div>顺序</div>
					<div>审批时间</div>
					<div>审批人</div>
					<div>审批结果</div>
					<div>审批方式</div>
					<div>备注信息</div>
				</div>
				<div class="soclass" v-for="(item,index) in splog" :key="index">
					<div>{{index + 1}}</div>
					<div><span v-if="item.modifyTime != null">{{item.modifyTime}}</span></div>
					<div>{{item.staffName}}</div>
					<div>
						<span v-if="item.status == 0">待审批</span>
						<span v-if="item.status == 1" style="color: #409EFF;">审批通过</span>
						<span v-if="item.status == 3" style="color: red;">审批驳回</span>
					</div>
					<div>
						<span v-if="item.stplis == 1">成本审批</span>
						<span v-if="item.stplis == 2">部门审批</span>
					</div>
					<div>{{item.remark}}</div>
				</div>
			</div>
			<div class="hotbox orderPay">
				<div class="lefbox">支付信息</div>
				<div class="payData">
				<div class="tlement">支付方式：{{ plsitsti.transationorderExtend.settlement | settlement }}
					<div class="payStatus">		
					<span style="margin-left: 40px"> 订单总额：<p>￥</p><p>{{ plsitsti.hotelOrder.totalPrice }}</p></span>
					<span style="margin-left: 40px">支付状态：{{this.payStatus | pustatus}}</span>
				</div>
				</div>
			</div>
			<defray class="wxPay"  business-type="1" product-type="4" :record-no=codes :amount=plsitsti.hotelOrder.totalPrice :entryMethod=EntryMethod
				 :pay-status="payStatus" v-if="(payStatus == 2 || payStatus == 1 && typename == 2) || (typename == 1 && tlement == 1)"></defray>

			</div>
		</div>
		
		<div class="boxbtn">
			<div class="nobts" v-if="clears && rotes('tms:hotel:list:cancel')" @click="clearsks">取消订单</div>
			<div class="tkbts" v-if="clearst && rotes('tms:hotel:refund:list')" @click="pkclearsks">申请退房</div>
			<div class="retunbts" @click="retuns">返回</div>
		</div>
		<el-dialog title="退房需要审批" :visible.sync="dialogVisible" width="30%">
			<div class="trstp">
				<div class="tr_ul">
					<div class="tr_uleft">成本中心</div>
					<div class="tr_rights">
						<el-cascader style="width: 200px;" ref="cascader" :show-all-levels="false" @change="handleChange" :props='bots'
						 :options="treeLists"></el-cascader>
					</div>
				</div>
				<div class="tr_ul" v-if="CostCi == true">
					<div class="tr_uleft">成本审批人</div>
					<div class="tr_rights">
						<div class="tr_dvs" @click="drawers('TravelCostCenlist')">
							<span v-for="(item,index) in TravelCostCenlist" :key="index" v-if="TravelCostCenlist.length > 0">
								{{item.staffName}}
							</span>
						</div>
					</div>
				</div>
				<div class="tr_ul" v-if="CostCis == true">
					<div class="tr_uleft">部门审批人</div>
					<div class="tr_rights">
						<div class="tr_dvs" @click="drawers('TravelDepartlist')">
							<span v-for="(item,index) in TravelDepartlist" :key="index" v-if="TravelDepartlist.length > 0">
								{{item.staffName}}
							</span>
						</div>
					</div>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="okcloseplase">确 定</el-button>
			</span>
		</el-dialog>
		<el-drawer :visible.sync="drawer" :with-header="false">
			<div class="ditrslist">
				<div class="ditrslists" v-for="(item,index) in drawelist" :key="index">
					<div style="margin-right: 10px;font-size: 15px;">{{index+1}}级审批人:</div>
					<div>
						<el-select v-model="apprvCost[index].id" placeholder="请选择">
							<el-option v-for="items in item.apprvCostFlowNodePersons" :key="items.id" :label="items.staffName" :value="items.id">
							</el-option>
						</el-select>
					</div>
				</div>
			</div>
			<div class="addpalist" @click="btn_click">选好了</div>
		</el-drawer>
	</div>
</template>

<script>
	import Defray from "@/components/common/defray";
	import { settlement , pustatus,hotellUserstatus } from "@/utils/common-filters";
	export default {
		components: {
			Defray
		},
		filters:{
			settlement,pustatus,hotellUserstatus
		},
		data() {
			return {
				headtravelNo:'',//头部出差单号
				drawelist: [],
				apprvCost: [],
				drawer: false,
				bots: { //使用props替换掉本来默认的lable和value 的键值
					value: 'id',
					label: 'text'
				},
				NameCenter: { //当前选择成本中心
					name: '',
					id: 0
				},
				treeLists: [], //成本中心
				TravelDepartlist: [], //部门审批人
				TravelCostCenlist: [], //成本中心审批人
				CostCi: false, //是否有成本审批人
				CostCis: false, //是否有部门审批人
				Deparapprover: [], //部门审批人
				CostCenterlist: [], //成本审批人
				iscost: true, //true为成本中心false为部门
				dialogVisible: false,
				loading: false,
				clears: false, //未支付前是否可以取消
				clearst: false, //占房后是否可以取消
				splog: [], //审批日志
				codes: '', //酒店id
				plsitsti: {}, //酒店详情
				numprice: '999', //总价
				apprvStatus: '', //审批状态：0-待审批，1-审批中 2-通过，3-驳回，4-撤回, 5-免审， 9-无效 10表示没有审批单
				payStatus: '', //支付状态 1 为待支付 2 支付中 3 为已支付，4 为挂帐支付
				orderStatus: '', //zhx:待处理（115）,处理中（100）,预定成功（101）,下单失败（102）, 取消中（400）,取消成功（401）,审批拒绝（121）
				apprvTaskReason: '出差事由', //出差事由
				tlement: 0, //1为现结2为月结
				RuleMas: false, //当前用户是否免审
				RuleMa: '',
				saleOrderNo: '',
				dbCancelRules: '', //取消规则
				typename: '',
				EntryMethod: '',
				msgErr:'',
			};
		},
		mounted() {
			this.EntryMethod = this.$route.query.EntryMethod;
			this.codes = this.$route.query.data; //获取上个页面传入的参数
			this.searchhoter();
			this.getRuleMainSetting();
		},
		methods: {
			retuns() {
				this.$router.go(-1); //返回上一页
			},
			clearsks() { //取消订单
				this.$confirm('将取消订单，是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.opclose(); //取消订单
				});
			},
			okcloseplase() {
				let that = this;
				let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
				let TravelDepartlist = that.TravelDepartlist; //部门审批人
				let NameCenter = that.NameCenter; //成本中心
				let msgErr = this.msgErr; //成本中心校验是否通过
				if (NameCenter.id == '') {
					this.$message({
						message: '请选择成本中心！',
						type: 'warning'
					})
					return
				}
				if (TravelCostCenlist.length == 0 && this.CostCi == true) {
					this.$message({
						message: '请选择成本审批人！',
						type: 'warning'
					})
					return
				}
				if (TravelDepartlist.length == 0 && this.CostCis == true) {
					this.$message({
						message: '请选择部门审批人！',
						type: 'warning'
					})
					return
				}
				if(msgErr){
					that.$message({
					message: msgErr,
					type: 'warning'
					});
					return;
				}

				let apprvTaskStaffts = []; //审核人员
				for (var i = 0; i < TravelCostCenlist.length; i++) { //成本中心审批人
					apprvTaskStaffts.push({
						deptCost: 2,
						nodeId: TravelCostCenlist[i].nodeId,
						personId: TravelCostCenlist[i].personId,
						staffId: TravelCostCenlist[i].staffId,
						staffName: TravelCostCenlist[i].staffName
					})

				}
				for (var i = 0; i < TravelDepartlist.length; i++) { //部门审批人
					apprvTaskStaffts.push({
						deptCost: 1,
						nodeId: TravelDepartlist[i].nodeId,
						personId: TravelDepartlist[i].personId,
						staffId: TravelDepartlist[i].staffId,
						staffName: TravelDepartlist[i].staffName
					})
				}
				let dat = {
					saleOrderNo: this.saleOrderNo,
					apprvTask: {
						apprvTaskStaffs: apprvTaskStaffts,
						taskType: 5, //1为事前2为事中，4为改签 5为退票
						beforeMiddle: 2, //1为事前2为事中 4为改签 5为退票
						costId: NameCenter.id, //成本中心id
						costName: NameCenter.name, //成本中心名称
					}
				}
				this.dialogVisible = false;
				this.loading = true;
				this.$api.order.cancelHolOrder(dat).then((res) => {
					this.loading = false;
					if (res.code == 200) {
						this.$message({
							message: '提交申请成功',
							type: 'success'
						})
						this.searchhoter();
					} else {
						this.$message({
							message: res.message,
							type: 'warning'
						})
					}
				}).catch((error) => {
					this.loading = false;
					console.log(error)
				})
			},
			pkclearsks() {
				let that = this;
				let st = this.plsitsti;
				let typename = this.typename; //1因公2因私
				let tlement = this.tlement; //结算方式1日结2月结
				if (typename == 2 && tlement == 1) { //因私日结取消
					this.clearsks();//取消订单
				} else if (typename == 1 && tlement == 2) { //因公月结
					this.loading = true;
					if (!this.RuleMas) { //当前用户是否免审
						this.loading = false;
						this.clearsks();
					} else {
						let userlistnos = [];
						let userlis = this.plsitsti.hotelOrder.guestName.split('，');
						this.$api.order.getStaffByTravelNoAndNames({
							travelNo: this.plsitsti.transationorderExtend.travelNo,
							names: userlis
						}).then((res) => {
							if (res.code == 200) {
								let dat = res.data; //获取用户信息
								for (let i in dat) {
									userlistnos.push(dat[i].passengerNo)
								}
								this.$api.order.judgeApprv({
									passengerNos: userlistnos
								}).then((res) => {
									if (res.code == 200) {
										this.loading = false;
										if (res.data == false) { //判断是否需要审核
											this.selts();
										} else {
											this.clearsks();
										}
									} else {
										this.$message.error(res.message)
									}
									this.loading = false;
								}).catch((err) => {
									this.loading = false;
									console.log(err)
								})
							} else {
								this.loading = false;
								this.$message({
									message: res.message,
									type: 'warning'
								})
							}
						}).catch((err) => {
							this.loading = false;
							console.log(err)
						})
					}
				}
			},
			opclose() {
				this.loading = true;
				this.$api.order.cancelHolOrder({
					saleOrderNo: this.saleOrderNo
				}).then((res) => {
					this.loading = false;
					if (res.code == 200) {
						this.$message({
							message: res.message,
							type: 'success'
						})
						this.searchhoter();
					} else {
						this.$message({
							message: res.message,
							type: 'warning'
						})
					}
				}).catch((error) => {
					this.loading = false;
					console.log(error)
				})
			},
			selts() { //查询成本中心
				let _this = this;
				_this.$api.home.getCostCenterList().then((res) => {
					if (res.code == 200) {
						_this.dialogVisible = true;
						_this.treeLists = res.data[0].children;
					} else {
						_this.$message({
							message: res.message,
							type: 'warning'
						})
					}
				}).catch((e) => {
					console.log(e)
				})
			},
			handleChange(value) { //选择成本中心
				let nodesObj = this.$refs['cascader'].getCheckedNodes(); //获取当前节点的信息
				this.NameCenter.name = nodesObj[0].data.text;
				this.NameCenter.id = nodesObj[0].data.id;
				this.TravelCostCenlist = [];
				this.TravelDepartlist = [];
				this.appswlist(); //重新获取部门和成本中心审批人
			},
			async appswlist() { //选获取部门和成本审批人信息
				let that = this;
				let res;
				try {
					res = await that.$api.home.getStaffList({
						costId: that.NameCenter.id,
						applyType: 5
					});
					if (res.code == 200) {
						if (res.data.deptStaffs.length == 0) { //是否有部门审批人
							that.CostCis = false;
						} else {
							that.CostCis = true;
							that.Deparapprover = res.data.deptStaffs; //部门审批人
						}
						if (res.data.costStaffs.length == 0) {
							that.CostCi = false;
						} else {
							that.CostCi = true;
							that.CostCenterlist = res.data.costStaffs; //成本审批人
						}
						this.msgErr = ''
					}else{
						this.msgErr =res.message?res.message:'系统错误'
					}
				} catch (e) {
					this.msgErr =res.message?res.message:'系统错误'
					console.log(e)
				}
			},
			drawers(its) { //点击成本或者部门审批人
				if (its == 'TravelCostCenlist') { //判断是部门还是成本中心
					this.iscost = true;
					this.drawelist = this.CostCenterlist;
				} else {
					this.iscost = false;
					this.drawelist = this.Deparapprover.apprvDeptFlowNodePersons;
				}
				this.apprvCost = [];
				for (let i = 0; i < this.CostCenterlist.length; i++) {
					this.apprvCost.push({
						id: ''
					})
				}
				this.drawer = true;
			},
			btn_click() { //确定部门或者成本审批人
				let that = this;
				for (let k in this.apprvCost) {
					if (that.apprvCost[k].id == "") {
						that.$message({
							message: "请选择" + (parseInt(k) + 1) + "级审批人",
							type: 'warning'
						});
						return
					}
				}
				if (this.iscost == true) { //成本审批人信息
					that.TravelCostCenlist = [];
					for (let k in that.drawelist) {
						for (let i in that.drawelist[k].apprvCostFlowNodePersons) {
							for (let j in that.apprvCost) {
								if (that.apprvCost[j].id == that.drawelist[k].apprvCostFlowNodePersons[i].id) {
									that.TravelCostCenlist.push({
										deptCost: 2,
										personId: that.apprvCost[j].id,
										nodeId: that.drawelist[k].apprvCostFlowNodePersons[i].nodeId,
										staffId: that.drawelist[k].apprvCostFlowNodePersons[i].staffId,
										staffName: that.drawelist[k].apprvCostFlowNodePersons[i].staffName
									})
								}
							}
						}
					}
				} else { //部门审批人信息
					this.TravelDepartlist = [];
					for (let k in that.drawelist) {
						for (let i in that.drawelist[k].apprvDeptFlowNodePersons) {
							for (let j in that.apprvCost) {
								if (that.apprvCost[j].id == that.drawelist[k].apprvDeptFlowNodePersons[i].id) {
									that.TravelDepartlist.push({
										deptCost: 1,
										personId: that.apprvCost[j].id,
										nodeId: that.drawelist[k].apprvDeptFlowNodePersons[i].nodeId,
										staffId: that.drawelist[k].apprvDeptFlowNodePersons[i].staffId,
										staffName: that.drawelist[k].apprvDeptFlowNodePersons[i].staffName
									})
								}
							}
						}
					}
				}
				that.drawer = false;
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
			// settlement(it) {
			// 	if (it == 1) {
			// 		return '现结';
			// 	} else {
			// 		return '预付月结';
			// 	}
			// },
			async getRuleMainSetting() { //查询当前用户退房是否需要审核
				this.$api.order.ruleMainSetting().then((res) => {
					if (res.code == 200) {
						this.RuleMa = res.data.examinePattern;
						let stw = this.RuleMa.split(',');
						for (let i in stw) {
							/**
							 * 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
							 */
							if (stw[i] == 7) {
								this.RuleMas = true;
							}
						}
					} else {
						this.loading = false;
						this.$message({
							message: res.message,
							type: 'warning'
						})
					}
				}).catch((err) => {
					this.loading = false;
					console.log(err)
				})
			},
			// pustatus(ty) {
			// 	//支付状态
			// 	if (ty == 1) {
			// 		return '待支付';
			// 	} else if (ty == 2) {
			// 		return '支付中';
			// 	} else if (ty == 3) {
			// 		return '已支付';
			// 	} else if (ty == 4) {
			// 		return '为挂帐支付';
			// 	}
			// },
			// userstatus(ite) {
			// 	//订单状态
			// 	let arr = [{
			// 			name: '待审核',
			// 			id: 650,
			// 			url: '../../../static/image/home/To-audit.png'
			// 		},
			// 		{
			// 			name: '处理中',
			// 			id: 100,
			// 			url: '../../../static/image/home/processing.png'
			// 		},
			// 		{
			// 			name: '拒单',
			// 			id: 600,
			// 			url: '../../../static/image/home/From-single.png'
			// 		},
			// 		{
			// 			name: '审批拒绝',
			// 			id: 121,
			// 			url: '../../../static/image/home/Approval-refused.png'
			// 		},
			// 		{
			// 			name: '占房成功',
			// 			id: 122,
			// 			url: '../../../static/image/home/Building-successful.png'
			// 		},
			// 		{
			// 			name: '申请中',
			// 			id: 117,
			// 			url: '../../../static/image/home/processing.png'
			// 		},
			// 		{
			// 			name: '待处理',
			// 			id: 115,
			// 			url: '../../../static/image/home/Pending.png'
			// 		},
			// 		{
			// 			name: '预定成功',
			// 			id: 101,
			// 			url: '../../../static/image/home/book-successfully.png'
			// 		},
			// 		{
			// 			name: '下单失败',
			// 			id: 102,
			// 			url: '../../../static/image/home/Order-failed.png'
			// 		},
			// 		{
			// 			name: '取消中',
			// 			id: 400,
			// 			url: '../../../static/image/home/Cancelled.png'
			// 		},
			// 		{
			// 			name: '取消成功',
			// 			id: 401,
			// 			url: '../../../static/image/home/Canceled.png'
			// 		}
			// 	];
			// 	for (let i in arr) {
			// 		if (arr[i].id == ite) {
			// 			return arr[i].url;
			// 		}
			// 	}
			// },
			// catype(it) {
			// 	//返回证件类型
			// 	if (it == 1) {
			// 		return '身份证'; //NI
			// 	} else if (it == 2) {
			// 		return '护照'; //PP
			// 	} else if (it == 3) {
			// 		return '台胞证'; //TB
			// 	} else if (it == 4) {
			// 		return '港澳通行证'; //GA
			// 	}
			// },
			searchhoter() {
				//查询酒店详情
				let that = this;
				that.loading = true;
				that.$api.order
					.toOrderDetail({
						transactionOrderNo: that.codes
					})
					.then(res => {
						that.loading = false;
						if (res.code == 200) {
							that.plsitsti = res.data;
							that.headtravelNo = res.data.transationorderExtend.travelNo
							that.apprvTaskReason = res.data.apprvTaskReason;
							let costsp = res.data.costApprvTask; //成本审批
							let depsp = res.data.deptApprvTask; //部门审批
							for (let k in costsp) {
								costsp[k]['stplis'] = 1; //成本
							}
							for (let p in depsp) {
								depsp[p]['stplis'] = 2; //部门
							}
							that.splog = [...costsp, ...depsp];
							that.numprice = that.plsitsti.hotelOrder.totalPrice; //总价
							that.payStatus = that.plsitsti.querySaleOrder.payStatus; //支付状态
							that.orderStatus = that.plsitsti.hotelOrder.orderStatus; //酒店状态
							that.saleOrderNo = that.plsitsti.hotelOrder.saleOrderNo; //销售单号
							that.apprvStatus = that.plsitsti.apprvStatus; //审核状态
							that.tlement = that.plsitsti.transationorderExtend.settlement; //结算方式1日结2月结
							that.typename = that.plsitsti.transationorderExtend.typename; //1因公2因私
							that.dbCancelRules = that.plsitsti.hotelOrder.dbCancelRule; //取消规则
							let istus = that.plsitsti.hotelOrder.cancelable; //是否可以取消是否可以取消(True（可以取消）/False（不能取消）/Limit（条件取消）)
							that.clears = false;
							that.clearst = false;
							if ((that.typename == 1 || that.typename == 2) && (that.payStatus == 1 || that.payStatus == 2) && that.orderStatus ==
								650) {
								that.clears = true; //可以取消
							} else if (
								(that.typename == 1 && (that.payStatus == 3 || that.payStatus == 4) && that.orderStatus == 101 && istus !=
									'false') ||
								(that.typename == 2 && that.payStatus == 3 && that.orderStatus == 101 && istus != 'false')
							) {
								that.clearst = true; //可以退房
							}
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
			}
		}
	};
</script>

<style scoped lang="less">
	.hoteorder {
		width: 1180px;
		margin: 0 auto;

		.boxbtn {
			padding: 10px 0 40px;
			width: 100%;
			font-size: 14px;
			line-height: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #fff;
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

		.hotboxs {
			width: 1178px;
			height: 114px;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			margin: 20px 0;
			background-color: #ffffff;
			border-radius: 4px;
			border: 1px solid #ededed;
			
			.hot_lefts {
				line-height: 30px;
				font-size: 14px;
				color: #666666;
				.mixin_displayBox(@fd:column,@ai:flex-start);
				margin: 0 139px 0 36px;

			}

			&>:last-child {
				width: 73px;
				height: 73px;
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

		.hotbox {
			width: 100%;
			position: relative;
			font-size: 14px;
			background-color: #ffffff;
			border-radius: 4px;
			line-height: 45px;

			.lefbox {
				background-color: #F2F2F2;
				width: 100%;
				text-indent: 10px;
				line-height: 34px;
				font-weight: 600;
				font-size: 14px;
				color: #333333;
			}



			.soclass {
				display: flex;
				text-align: center;
				line-height: 32px;
				border: 1px solid #f9e6d0;
				border-bottom: 0;
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
			.soclass:nth-child(2){
				margin-top: 28px;
			}
			.soclass:last-child{
				margin-bottom: 28px;
				border-bottom: 1px solid #f9e6d0;
			}
			.pricenum {
				display: flex;

				div {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;

					span {
						color: #ff6600;
						font-size: 14px;
					}
				}
			}
		}
		.hotData{
			.hot_data{
				padding: 28px 60px 28px;
				&>div{
					color: #666;
					&>span:nth-child(2){
						color: #333;
					}
				}
				&>div:last-child{
					&>span:nth-child(2){
						color: red;
					}
				}
			}
		}
		.orderPay{
			  .payData{
		margin-top: 10px;
		 padding-left: 60px;
        .mixin_displayBox(@fd:column,@ai:flex-start);
        .tlement{
          margin-bottom: 20px;
        }
        .payStatus{
          width: 972px;
          height: 110px;
          background: #F7F8FB;
          .mixin_displayBox(@fd:column,@ai:flex-start);
          padding-left:25px ;
          &>span{
            display: flex;
            align-items: center;
            color: #666;
            margin-bottom: 10px;
            &>p:nth-child(1){
              font-size: 12px;
              color: #333;
            }
            &>p:nth-child(2){
              font-size: 30px;
              color: #FF6600;
            }
          }
        
        }
	  }
	  .wxPay{
        padding: 0;
        width: 100%;
      }
		}
	}
</style>
