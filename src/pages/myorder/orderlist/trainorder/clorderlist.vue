<template>
	<div class="hoteorder" v-loading="loading" v-if="plsitsti.orderExt != null && plsitsti.orderExt != undefined">
		<div class="hotboxs">
			<div class="hot_lefts" style="width: 60%;">
				<div>订单单号：{{ codes }}</div>
				<div>取票号：{{ plsitsti.orderExt.ticketNo }}</div>
			</div>
			<img :src="userstatus(orderStatus)" alt="">
		</div>
		<div style="padding: 10px;background-color: #FFFFFF;border-radius: 4px;border: 1px solid #ededed;">
			<div class="trainsts">
				<div style="display: flex;align-items: center;">
					<div>
						<img src="../../../../../static/image/order/order_tar.png" alt="">
						<div style="text-align: center;">{{ plsitsti.orderExt.traSaleChangeDetailList[0].changeTrainNo }}</div>
					</div>
					<div style="margin-left: 30px;">
						{{plsitsti.orderExt.traSaleChangeDetailList[0].departTime}}
					</div>
				</div>
				<div style="display: flex;align-items: center;font-weight: 600;">
					<div>{{ plsitsti.orderExt.traSaleChangeDetailList[0].changeFromStation}} </div>
					<div style="width: 200px;height: 2px;background-color: #ededed;margin: 0 10px;"></div>
					<div>{{plsitsti.orderExt.traSaleChangeDetailList[0].changeToStation}}</div>
				</div>
			</div>
			<div class="hotbox">
				<div class="lefbox">出行人</div>
				<div v-for="(item,index) in userlist" :key="index">
				&nbsp;&nbsp;&nbsp;&nbsp;{{item.passenagerName}}&nbsp;&nbsp;&nbsp;&nbsp;<span v-if="item.seatclass != null">{{item.seatclass}}&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color: #f48f00;">￥{{item.changeOrderPrice}}</span>&nbsp;&nbsp;&nbsp;&nbsp;{{catype(item.saleOrderDetailList,item.saleOrderDetailNo)}}
				：{{catypeno(item.saleOrderDetailList,item.saleOrderDetailNo)}} &nbsp;&nbsp;&nbsp;&nbsp;<span v-if="item.ticketNo != null">票号：{{item.ticketNo}} &nbsp;&nbsp;&nbsp;&nbsp;</span><span style=" color: #007AFF;">{{userstatust(item.changeStatus)}}</span>
				      
				</div>
            
			</div>
			<div class="hotbox">
				<div class="lefbox">支付信息</div>
				<div style="padding-left: 30px;">支付方式：{{ settlement(tlement) }}</div>
			</div>
			<div class="hotbox">
				<div class="lefbox">订单金额</div>
				<div class="pricenum">
					<div v-if="vid == 11">
						改签费用：
						<span>￥{{numprice}}</span>
					</div>
					<div v-if="vid == 9">
						退款金额：
						<span>￥{{numprice}}</span>
					</div>
				</div>
			</div>
			<div class="hotbox" v-if="usersnamelist.length > 0">
				<div class="lefbox">订单操作</div>
				<div v-if="usersnamelist.length > 0">可操作人员:</div>
				<div class="lecheckd">
					<el-checkbox-group v-model="checkList">
						<div v-for="(item,index) in usersnamelist" :key="index" style="display: flex;flex-direction: column;">
							<el-checkbox :label="item.id">
								<p style="color: #000000;">
									{{item.passenagerName}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.changeTrainNo}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.changeSeatClass}}&nbsp;&nbsp;&nbsp;&nbsp;<span
									 style="color: #f48f00;">￥{{item.changeOrderPrice}}</span>
								</p>
							</el-checkbox>
						</div>
					</el-checkbox-group>
				</div>
				
			</div>
		</div>
		<div class="boxbtn">
			<div class="nobts" v-if="isclose" @click="clearsks">取消改签</div>
			<div class="tkbts" v-if="usersli && ists" @click="updatas(2)">申请退票</div>
			<div class="retunbts" @click="retuns">返回</div>
		</div>
		<el-dialog title="退票需要审批" :visible.sync="dialogVisible" width="30%">
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
				<div class="tr_ul">
					<div class="tr_uleft">退票原因</div>
					<div class="tr_rights">
						<div>
							<el-input width="250px" v-model="resons" placeholder="请输入退票原因"></el-input>
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
	export default {
		data() {
			return {
				vid: 0, //改签还是退票  9为退票 11 为退票
				resons: '', //退票原因
				checkList: [], //选中人员
				userlist: [], //出行人信息
				isclose: false,
				usersli: false, //是否可以退票和改签
				ists: false, //是否能退票
				isgs: false, //是否能改签
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
				codes: '', //火车票id
				plsitsti: {}, //火车票详情
				numprice: '999', //总价
				apprvTaskStatu: '', //因公审核状态0待审核 1审核中2审核通过
				orderStatus: '', //订单状态
				apprvTaskReason: '出差事由', //出差事由
				tlement: 0, //1为现结2为月结
				RuleMas: false, //当前用户是否免审
				RuleMa: '',
				saleOrderNo: '',
				typename: '',
				isnum: 0,
				usersnamelist: [],
				applylist: {},
				stlist: [{
					name: '新申请',
					id: 1,
					url:'../../../../static/image/home/new-application.png'
				}, {
					name: '改签中',
					id: 2,
					url:'../../../../static/image/home/Change-central.png'
				}, {
					name: '改签完成',
					id: 3,
					url:'../../../../static/image/home/finished.png'
				}, {
					name: '已取消',
					id: 4,
					url:'../../../../static/image/home/Canceled.png'
				}, {
					name: '改签失败',
					id: 5,
					url:'../../../../static/image/home/Upgrade-failed.png'
				}, {
					name: '退票中',
					id: 6,
					url:'../../../../static/image/home/Return-ticket.png'
				}, {
					name: '已退票',
					id: 7,
					url:'../../../../static/image/home/Order-returned.png'
				}, {
					name: '部分退票',
					id: 8,
					url:'../../../../static/image/home/Part-retirement.png'
				}],
			};
		},
		mounted() {
			this.codes = this.$route.query.data; //获取上个页面传入的参数
			this.vid = this.$route.query.vid; //获取上个页面传入的参数
			this.searchhoter();
			this.getRuleMainSetting();
		},
		methods: {
			catypeno(item, no) {
				let sus = {};
				for (let i in item) {
					if (item[i].saleOrderDetailNo == no) {
						sus = item[i];
					}
				}
				return sus.traPassenger.certNo;
			},
			updatas(num) { //申请改签或退票
				if (this.checkList.length == 0) {
					this.$message({
						message: '请选择一个出差人员',
						type: 'warning'
					})
					return
				}
				this.isnum = num;
				this.checks()
			},
			getStaffByTravelNoAndName(name) {
				return new Promise((resolve, reject) => {
					this.$api.order.getStaffByTravelNoAndNames({
						travelNo: this.plsitsti.tmsotr.travelNo,
						names: name
					}).then((res) => {
						let dat = res.data; //获取改签人信息
						let users = [];
						for (let i in dat) {
							users.push(dat[i].passengerNo)
						}
						resolve(users)
					}).catch((err) => {
						reject(err)
					})

				})
			},
			catypes(it){//返回证件类型
				if(it == 1){
					return '身份证'//NI
				} else if(it == 2){
					return '护照'//PP
				} else if(it == 3){
					return '台胞证'//TB
				} else if(it == 4){
					return '港澳通行证'//GA
				}
			},
			async checks() {
				let uslist = this.checkList; //选中的人
				let isnum = this.isnum;
				let userlist = [];
				let names = [];
				let passengerNos = [];
				for (let k in uslist) {
					for (let i in this.usersnamelist) {
						userlist.push({
							certNo: this.usersnamelist[i].saleOrderDetailList[i].traPassenger.certNo,//证件号码
							certType: this.catypes(this.usersnamelist[i].saleOrderDetailList[i].traPassenger.certType),//证件类型
							name:this.usersnamelist[i].saleOrderDetailList[i].traPassenger.name,//名字
						});
						for(let k in this.usersnamelist[0].saleOrderDetailList){
							if(this.usersnamelist[0].saleOrderDetailList[k].traPassenger.name ==this.usersnamelist[i].passenagerName ){
								names.push(this.usersnamelist[0].saleOrderDetailList[k].traPassenger.name);
								passengerNos.push(this.usersnamelist[i].passenagerTicketNo)
							}
						}
					}
				}
				let nu = this.plsitsti.tmsotr.typename; //因公因私
				let userlistnos = [];
				if (nu == 1) { //因公需要从接口中获取用户passengerNo
					let sers = await this.getStaffByTravelNoAndName(names);
					userlistnos = sers
				}
				this.shos = false;
				//退票
				if (nu == 2) { //判断是否因私或者因公    因私不需要审核
					let dat = {
						saleChangeNo: this.plsitsti.orderExt.saleChangeNo,
						passengerNo: passengerNos.join(','),
						apprvTaskEntity: {
							agree: false,
							examinePattern: '0'
						}
					}
					this.loading = true;
					this.$api.order.applyChangeRefundTrain(dat).then((res) => {
						this.loading = false;
						if (res.code == 200) {
							this.$message({
								message: '提交申请退票成功！',
								type: 'success'
							})
							setTimeout(() => {
								this.searchhoter();
							}, 1000)
						} else {
							this.$message({
								message: res.message,
								type: 'warning'
							})
						}
					}).catch((err) => {
						console.log(err)
					})
				} else if (nu == 1 && !this.RuleMas) { //因公但是不需要审核
					let dat = {
						saleChangeNo: this.plsitsti.orderExt.saleChangeNo,
						passengerNo: passengerNos.join(','),
						apprvTaskEntity: {
							agree: false,
							examinePattern: this.RuleMa
						}
					}
					this.loading = true;
					this.$api.order.applyChangeRefundTrain(dat).then((res) => {
						this.loading = false;
						if (res.code == 200) {
							this.$message({
								message: '提交申请退票成功！',
								type: 'success'
							})
							setTimeout(() => {
								this.searchhoter();
							}, 1000)
						} else {
							this.$message({
								message: res.message,
								type: 'warning'
							})
						}
					}).catch((err) => {
						console.log(err)
					})
				} else {
					this.loading = true;
					this.$api.order.judgeApprv({
						passengerNos: userlistnos //判断当前出行人是否都免审
					}).then((res) => {
						if (res.code == 200) {
							if (res.data == false) { //判断是否需要审核
								this.loading = false;
								this.applylist = {
									passengerNo: passengerNos.join(','),
									saleOrderNo: this.plsitsti.orderExt.saleChangeNo,
								}
								this.selts();
							} else {
								let dat = {
									saleOrderNo: this.plsitsti.orderExt.saleChangeNo,
									passengerNo: passengerNos.join(','),
									apprvTaskEntity: {
										agree: false,
										examinePattern: '0'
									}
								}
								this.$api.order.applyChangeRefundTrain(dat).then((res) => {
									this.loading = false;
									if (res.code == 200) {
										this.$message({
											message: '提交申请退票成功！',
											type: 'success'
										})
										setTimeout(() => {
											this.searchhoter();
										}, 1000)
									} else {
										this.$message({
											message: res.message,
											type: 'warning'
										})
									}
								}).catch((err) => {
									console.log(err)
								})
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
				}
			},
			userstatust(it) { //乘客当前状态
				if (it == 0) {
					return '退票中'
				} else if (it == 1) {
					return '退票完成'
				} else if (it == 2) {
					return '已取消'
				} else if (it == 3) {
					return '已出票'
				} else if (it == 4) {
					return '改签单新申请'
				}
			},
			userstatus(it) { //乘客当前状态
				if (this.vid == 9) {
					return '../../../../static/image/home/Order-returned.png'
				}
				let arr = this.stlist;
				for (let i in arr) {
					if (arr[i].id == it) {
						return arr[i].url
					}
				}
			},
			catype(item, no) { //返回证件类型.
				let sus = {};
				for (let i in item) {
					if (item[i].saleOrderDetailNo == no) {
						sus = item[i];
					}
				}
				let it = sus.traPassenger.certType;
				if (it == 1) {
					return '身份证' //NI
				} else if (it == 2) {
					return '护照' //PP
				} else if (it == 3) {
					return '台胞证' //TB
				} else if (it == 4) {
					return '港澳通行证' //GA
				}
			},
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
				let resons = that.resons; //退票原因
				if (NameCenter.id == '') {
					this.$message({
						message: '请选择成本中心！',
						type: 'warning'
					})
					return
				} else if (TravelCostCenlist.length == 0 && this.CostCi == true) {
					this.$message({
						message: '请选择成本审批人！',
						type: 'warning'
					})
					return
				} else if (TravelDepartlist.length == 0 && this.CostCis == true) {
					this.$message({
						message: '请选择部门审批人！',
						type: 'warning'
					})
					return
				} else if (resons == '') {
					this.$message({
						message: '请输入退票原因！',
						type: 'warning'
					})
					return
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
					saleChangeNo: this.applylist.saleOrderNo,
					passengerNo: this.applylist.passengerNo,
					apprvTaskEntity: {
						agree: false,
						apprvTaskStaffs: apprvTaskStaffts,
						taskType: 5, //1为事前2为事中，4为改签 5为退票
						beforeMiddle: 5, //1为事前2为事中 4为改签 5为退票
						costId: NameCenter.id, //成本中心id
						costName: NameCenter.name, //成本中心名称
						reason: resons,
						examinePattern: this.RuleMa
					}
				}
				this.dialogVisible = false;
				this.loading = true;
				this.$api.order.applyChangeRefundTrain(dat).then((res) => {
					this.loading = false;
					if (res.code == 200) {
						this.$message({
							message: '申请退票成功!',
							type: 'success'
						})
						setTimeout(() => {
							this.searchhoter();
						}, 2000)
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
			opclose() {
				this.loading = true;
				let no = this.plsitsti.orderExt.saleChangeNo;
				this.$api.order.cancelChange({
					saleChangeNo: no
				}).then((res) => {
					this.loading = false;
					if (res.code == 200) {
						this.$message({
							message: '取消成功！',
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
					_this.loading = false;
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
					}
				} catch (e) {
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
			settlement(it) {
				if (it == 1) {
					return '现结';
				} else {
					return '预付月结';
				}
			},
			async getRuleMainSetting() { //查询当前用户退房是否需要审核
				this.$api.order.ruleMainSetting().then((res) => {
					if (res.code == 200) {
						this.RuleMa = res.data.examinePattern;
						let stw = this.RuleMa.split(',');
						for (let i in stw) {
							/**
							 * 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
							 */
							if (stw[i] == 6) {
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
			async searchhoter() {
				//查询火车详情
				let that = this;
				that.loading = true;
				try {
					let res = "";;
					if (this.vid == 11) {
						res = await that.$api.order.trainChangeInfo({
							outOrderNo: this.codes
						});
					} else if (this.vid == 9) {
						res = await that.$api.order.trainChangeInfoBySaleChangeNo({
							saleChangeNo: this.codes
						});
					}
					that.loading = false;
					if (res.code == 200) {
						that.plsitsti = res.data;
						that.apprvTaskReason = res.data.apprvTask.reason; //出差事由
						that.typename = that.plsitsti.tmsotr.typename; //1因公2因私
						that.numprice = that.plsitsti.orderExt.saleChange.planAmount; //改签费用;//总价
						that.tlement = that.plsitsti.tmsotr.settlement; //结算方式
						that.orderStatus = that.plsitsti.orderExt.changeStatus; //订单状态
						if (that.orderStatus == 2 || that.orderStatus == 1) {
							this.isclose = true
						}
						that.userlist = that.plsitsti.orderExt.traSaleChangeDetailList; //乘客信息
						that.usersli = false;
						for (let i in that.userlist) {
							if (that.userlist[i].changeStatus == 3) {
								that.usersli = true;
							}
						}
						if (that.typename == 1) { //因公状态下 判断是审核通过  或者免审 才显示退票
							if (that.plsitsti.apprvTask.status == 2 || that.plsitsti.apprvTask.status == 5) {
								that.userslis = true;
							} else {
								that.userslis = false;
							}
						}
						this.usersnamelist = [];
						let sulist = that.plsitsti.orderExt.traSaleChangeDetailList;//乘客信息
						for (let i in sulist) {
							if(sulist[i].changeStatus == 3){
								this.usersnamelist.push(sulist[i])
							}
						}
						for (let i in this.usersnamelist) {
							this.usersnamelist[i]['istrue'] = false;
						}
						if (this.vid == 11) {
							this.ists = false;
							that.$api.order.checkRetundAndChange({
								departureTime: that.plsitsti.orderExt.traSaleChangeDetailList[0].departTime
							}).then((rest) => {
								if (rest.code == 200) {
									if (rest.data.trainRefund == 1) {
										this.ists = true; //能退票
									}
								}
							}).catch((err) => {
								console.log(err)
							})
						}
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
			width: calc(100% - 220px);
			height: 100px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 20px 0;
			padding: 0 200px 0 20px;
			background-color: #ffffff;
			border-radius: 4px;
			border: 1px solid #ededed;

			.hot_lefts {
				line-height: 30px;
				font-size: 14px;
				color: #666666;
			}

			img {
				width: 73px;
				height: 73px;
			}
		}
		.boxbtn {
			margin-top: 10px;
			width: 100%;
			line-height: 30px;
			font-size: 14px;
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
		.trainsts {
			padding: 10px 160px 10px 80px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14px;
			color: #333333;
		}
		.hotbox {
			width: calc(100% - 30px);
			position: relative;
			font-size: 14px;
			padding: 0 15px;
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

			.lecheckd {
				display: flex;
				align-items: center;
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
