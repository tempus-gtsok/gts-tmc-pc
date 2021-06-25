<template>
<!-- 我的订单->火车票->详情页 -->
	<div class="hoteorder" v-loading="loading" v-if="plsitsti.orderExt != null && plsitsti.orderExt != undefined">
		<div class="hotboxs">
			<img src="../../../../../static/image/left.png" alt="">
			<div class="hot_lefts">				 
				<div>预订单号：{{ codes }}</div>
				<div  v-if="headtravelNo">出差单号：{{ headtravelNo }}</div>
				<div v-if="plsitsti.orderExt.ticketNo">取票号：{{ plsitsti.orderExt.ticketNo }}</div>
			</div>
			<img :src="orderStatus | orderStatusUrl" alt="">
		</div>
		<div style="padding: 10px;background-color: #FFFFFF;border-radius: 4px;">
			<div class="trainsts">
				<div style="display: flex;align-items: center;">
					<div>
						<img src="../../../../../static/image/order/order_tar.png" alt="">
						<div style="text-align: center;">{{ plsitsti.saleOrderDetailList[0].trainno }}</div>
					</div>
					<div style="margin-left: 30px;">
						{{plsitsti.saleOrderDetailList[0].departureTime}}
					</div>
				</div>
				<div style="display: flex;align-items: center;font-weight: 600;">
					<div>{{ plsitsti.saleOrderDetailList[0].fromstation }} </div>
					<div style="width: 200px;height: 2px;background-color: #ededed;margin: 0 10px;"></div>
					<div>{{plsitsti.saleOrderDetailList[0].tostation}}</div>
				</div>
			</div>
			<div class="hotbox tripPep">
				<div class="lefbox">出行人</div>
				<div class="airPasseData">
				<div class="airPasseList" v-for="(item,index) in userlist" :key="index">
					<div>
						 <span class="num">{{index+1}}</span>
						<span>乘车人姓名：</span>
						<span>{{item.traPassenger.name}}</span>
					</div>
					<div>
						<span>坐席：</span>
						<span>{{item.seatNo}} {{item.seatclass}}</span>
					</div>
					<div>
						<span>{{item.traPassenger.certType | catypeNum}}：</span>
						<span>{{item.traPassenger.certNo | numberPapers}}</span>
					</div>
					<div v-if="item.ticketNo">
						<span>票号：</span>
						<span>{{item.ticketNo}}</span>
					</div>
					<!-- <div v-if="item.ticketNo">
						<span>保险：</span>
						<span>{{item.ticketNo}}</span>
					</div>
					<div v-if="item.ticketNo">
						<span>保单号：</span>
						<span>{{item.ticketNo}}</span>
					</div>
					<div v-if="item.ticketNo">
						<span>保单状态：</span>
						<span>{{item.ticketNo}}</span>
					</div>
					<div v-if="item.ticketNo">
						<span>服务费：</span>
						<span>{{item.ticketNo}}</span>
					</div>
					<div v-if="item.ticketNo">
						<span>小计：</span>
						<span>{{item.ticketNo}}</span>
					</div> -->
					<div>
						<span style=" color: #007AFF;">{{userstatuas(item.status)}}</span>
					</div>
				</div>
				</div>
			</div>
		
			<div class="hotbox" v-if="splog.length > 0 && typename == 1">
				<div class="lefbox">审批日志</div>
				<div class="examine">
					<div class="soclass">
						<div>顺序</div>
						<div>审批时间</div>
						<div>审批人</div>
						<div>审批结果</div>
						<div>审批方式</div>
						<div>备注信息</div>
					</div>
					<div class="soclass" style="border-bottom: 1px solid #f9e6d0;" v-for="(item,index) in splog" :key="index">
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
			</div>
			<div class="hotbox orderOperation" v-if="usersnamelist.length > 0">
				<div class="lefbox">订单操作</div>
				<div  class="perText" >可操作人员:</div>
				<div class="lecheckd">
					<el-checkbox-group v-model="checkList">
						<div v-for="(item,index) in usersnamelist" :key="index" style="display: flex;flex-direction: column;">
							<el-checkbox :label="item.traPassenger.id">
								<p class="ordrePerData">
									<span>{{item.traPassenger.name}}</span>
									<span>{{item.seatNo}}</span>
									<span>{{item.seatclass}}</span>
									<span>{{item.traPassenger.certType | catypeNum}}：{{item.traPassenger.certNo | numberPapers}} </span>
									<span>票号：{{item.ticketNo}} </span>
									<span style=" color: #007AFF;">{{userstatuas(item.status)}}</span>	
								</p>
							</el-checkbox>
						</div>
					</el-checkbox-group>
				</div>
			</div >
				<div class="hotbox orderPay">
				<div class="lefbox">支付信息</div>
				<div class="payData">
					<div class="tlement">支付方式：{{ tlement | settlement }}
						<div class="payStatus">						
							<span style="margin-left: 40px"> 订单总额：<p>￥</p><p>{{ numprice }}</p></span>
							<span style="margin-left: 40px">支付状态：{{this.payStatus | pustatus}}</span>
						</div>
					</div>
				</div>
				<defray class="payBot" business-type="1" product-type="10" :record-no=codes :amount=numprice :entryMethod=EntryMethod :pay-status="payStatus"
                v-if="orderStatus == '2' && (((payStatus == 2 || payStatus == 1) && typename == 2) || (typename == 1 && tlement == 1))" ></defray>
			</div>
		</div>
		<div class="boxbtn bottom">
			<div class="nobts" v-if="isclose && rotes('tms:tra:list:cancel')" @click="clearsks">取消订单</div>
			<div class="tkbts" v-if="usersli && ists && rotes('tms:tra:refund:list')" @click="updatas(2)">申请退票</div>
			<div class="tkbts" v-if="usersli && isgs && rotes('tms:tra:change:list')" @click="updatas(1)">申请改签</div>
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
	import Defray from "@/components/common/defray";
	import { settlement , pustatus , orderStatusId , orderStatusUrl,catypeNum,numberPapers} from "@/utils/common-filters";
  export default {
	components: {Defray},
	filters:{
		settlement,pustatus,orderStatusId,orderStatusUrl,catypeNum,numberPapers
	},
    data() {
			return {
				headtravelNo:'',//头部出差单号
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
				splog: [], //审批日志
				codes: '', //火车票id
				plsitsti: {}, //火车票详情
				numprice: '999', //总价
				apprvTaskStatu: '', //因公审核状态0待审核 1审核中2审核通过
				orderStatus: '', //订单状态
        		payStatus: '', //支付状态 1 为待支付 2 支付中 3 为已支付，4 为挂帐支付
				apprvTaskReason: '出差事由', //出差事由
				tlement: 0, //1为现结2为月结
				RuleMas: false, //当前用户是否免审
				RuleMa: '',
				saleOrderNo: '',
				typename: '', // 因公因私
				isnum: 0,
				usersnamelist: [],
				applylist: {},
				EntryMethod : '',
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
			
			updatas(num) { //申请改签或退票
				if (this.checkList.length == 0) {
					this.$message({
						message: '请选择一个出差人员',
						type: 'warning'
					})
					return
				}
				this.isnum = num;
				this.checks();
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
			async checks() {
				let uslist = this.checkList; //选中的人
				let isnum = this.isnum;
				let userlist = [];
				let names = [];
				let passengerNos = [];
				let sta = []
				for (let k in uslist) {
					for (let i in this.usersnamelist) {
						if (this.usersnamelist[i].traPassenger.id == uslist[k]) {
							userlist.push({
								certNo: this.usersnamelist[i].traPassenger.certNo, //证件号码
								certType: catypeNum(this.usersnamelist[i].traPassenger.certType), //证件类型
								name: this.usersnamelist[i].traPassenger.name, //名字
								reason:this.plsitsti.apprvTaskEntityList[0].reason,
								reasonId:this.plsitsti.apprvTaskEntityList[0].reasonId
							});
							passengerNos.push(this.usersnamelist[i].traPassenger.passengerNo)
							names.push(this.usersnamelist[i].traPassenger.name)
							sta.push(this.usersnamelist[i].status)
						}
					}
				}
				if(isnum == 1){
				var flag = sta.find(item => {
					if(item == 9 || item != 4) return true
				})
				}
				if(flag) return this.$message.error("一张车票只可以办理一次改签")
				let nu = this.plsitsti.tmsotr.typename; //因公因私
				let userlistnos = [];
				if (nu == 1) { //因公需要从接口中获取用户passengerNo
					let sers = await this.getStaffByTravelNoAndName(names);
					userlistnos = sers
				}
				this.shos = false;
				if (isnum == 1) { //改签
					let dat = {
						passengerNos: passengerNos,
						userlistnos: userlistnos,
						travelNo: this.plsitsti.tmsotr.travelNo,
						saleOrderNo: this.plsitsti.orderExt.saleOrderNo,
						nos: this.plsitsti.tmsotr.transationOrderNo?this.plsitsti.tmsotr.transationOrderNo:'',
						city: [{
							id: this.plsitsti.saleOrderDetailList[0].fromStationCode,
							name: this.plsitsti.saleOrderDetailList[0].fromstation
						}, {
							id: this.plsitsti.saleOrderDetailList[0].toStationCode,
							name: this.plsitsti.saleOrderDetailList[0].tostation
						}],
						timedate: this.plsitsti.saleOrderDetailList[0].departureTime.substring(0, 10),
						butalist: userlist, //出行人员
						sit: false, //是否只搜高铁
						isblcks: 4, //4改签
						isbtd: nu, //1因公2因私
					}
					this.$router.push({
						path: '/trainlist',
						query: {
							data: JSON.stringify(dat)
						}
					});
				} else { //退票
					if (nu == 2) { //判断是否因私或者因公    因私不需要审核
						let dat = {
							saleOrderNo: this.plsitsti.orderExt.saleOrderNo,
							passengerNo: passengerNos.join(','),
							apprvTaskEntity: {
								agree: false,
								examinePattern: '0'
							}
						}
						this.loading = true;
						this.$api.order.applyRefundTrain(dat).then((res) => {
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
							saleOrderNo: this.plsitsti.orderExt.saleOrderNo,
							passengerNo: passengerNos.join(','),
							apprvTaskEntity: {
								agree: false,
								examinePattern: this.RuleMa
							}
						}
						this.loading = true;
						this.$api.order.applyRefundTrain(dat).then((res) => {
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
										saleOrderNo: this.plsitsti.orderExt.saleOrderNo,
									}
									this.selts();
								} else {
									let dat = {
										saleOrderNo: this.plsitsti.orderExt.saleOrderNo,
										passengerNo: passengerNos.join(','),
										apprvTaskEntity: {
											agree: false,
											examinePattern: '0'
										}
									}
									this.$api.order.applyRefundTrain(dat).then((res) => {
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
				}
			},
			userstatuas(it) { //乘客当前状态
				if (it == 2) {
					return '占座成功'
				} else if (it == 3) {
					return '出票中'
				} else if (it == 4) {
					return '已出票'
				} else if (it == 5) {
					return '退票中'
				} else if (it == 6) {
					return '改签中'
				} else if (it == 7) {
					return '已退票'
				} else if (it == 8) {
					return '已废弃'
				} else if (it == 9) {
					return '已改签'
				} else if (it == 10) {
					return '占座失败'
				} else if (it == 11) {
					return '出票失败'
				}
			},
			retuns() {
				this.$router.push({
          path:'/myorder'
        }); //返回上一页
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
				if (resons == '') {
					this.$message({
						message: '请输入退票原因！',
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
					saleOrderNo: this.applylist.saleOrderNo,
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
				this.$api.order.applyRefundTrain(dat).then((res) => {
					this.loading = false;
					if (res.code == 200) {
						this.$message({
							message: '申请退票成功!',
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
				}).catch((error) => {
					this.loading = false;
					console.log(error)
				})
			},
			opclose() {
				this.loading = true;
				let no = this.plsitsti.orderExt.saleOrderNo;
				this.$api.order.cancelSaleOrderExt({
					saleOrderNo: no
				}).then((res) => {
					if (res.code == 200) {
						this.$message({
							message: '取消成功！',
							type: 'success'
						})
						setTimeout(()=>{
							this.loading = false;
							this.searchhoter();
						},1000)
					} else {
						this.loading = false;
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
			// 		name: '占座中',
			// 		id: 1,
			// 		url: '../../../static/image/home/In-seat.png'
			// 	}, {
			// 		name: '占座成功',
			// 		id: 2,
			// 		url: '../../../static/image/home/占座成功.png'
			// 	}, {
			// 		name: '出票中',
			// 		id: 3,
			// 		url: '../../../static/image/home/ticket.png'
			// 	}, {
			// 		name: '已出票',
			// 		id: 4,
			// 		url: '../../../static/image/home/check.png'
			// 	}, {
			// 		name: '退票中',
			// 		id: 5,
			// 		url: '../../../static/image/home/Return-ticket.png'
			// 	}, {
			// 		name: '改签中',
			// 		id: 6,
			// 		url: '../../../static/image/home/Change-central.png'
			// 	}, {
			// 		name: '部分退废',
			// 		id: 7,
			// 		url: '../../../static/image/home/Part-retirement.png'
			// 	}, {
			// 		name: '部分改签',
			// 		id: 8,
			// 		url: '../../../static/image/home/Part-change.png'
			// 	}, {
			// 		name: '已退',
			// 		id: 9,
			// 		url: '../../../static/image/home/Order-returned.png'
			// 	}, {
			// 		name: '订单已废弃',
			// 		id: 10,
			// 		url: '../../../static/image/home/Order-abandoned.png'
			// 	}, {
			// 		name: '已改签',
			// 		id: 11,
			// 		url: '../../../static/image/home/Order-changed.png'
			// 	}, {
			// 		name: '占座失败',
			// 		id: 12,
			// 		url: '../../../static/image/home/Of-failure.png'
			// 	}, {
			// 		name: '出票失败',
			// 		id: 13,
			// 		url: '../../../static/image/home/Ticket-failure.png'
			// 	}];
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
				//查询火车详情
				let that = this;
				that.loading = true;
				that.$api.order
					.toTrainInfo({
						trainOrderNo: that.codes
					})
					.then((res) => {
						that.loading = false;
						if (res.code == 200) {
							that.plsitsti = res.data;
							that.headtravelNo = res.data.tmsotr.travelNo;//头部出差单号
							that.apprvTaskReason = res.data.apprvTaskReason;
							let costsp = res.data.costLog; //成本审批
							let depsp = res.data.deptLog; //部门审批
							for (let k in costsp) {
								costsp[k]['stplis'] = 1; //成本
							}
							for (let p in depsp) {
								depsp[p]['stplis'] = 2; //部门
							}
							that.splog = [...costsp, ...depsp];
							if (res.data.orderExt.orderStatus == 1) {
								this.$message({
									message: "占座中,请注意短信！",
									type: 'success'
								})
							}
							that.typename = that.plsitsti.tmsotr.typename; //1因公2因私
							that.numprice = that.plsitsti.orderExt.premium ; //总价
							that.tlement = that.plsitsti.tmsotr.settlement; //结算方式
							that.apprvTaskStatu = that.plsitsti.apprvTaskStatu; //审核状态
							that.orderStatus = that.plsitsti.orderExt.orderStatus; //订单状态
             	 			that.payStatus = that.plsitsti.orderExt.saleOrder.payStatus; //支付状态


							if (that.orderStatus == 2) {
								this.isclose = true
							} else {
								this.isclose = false;
							}
							that.userlist = that.plsitsti.saleOrderDetailList; //乘客信息
							that.usersli = false;
							for (let i in that.userlist) {
								if (that.userlist[i].status == 4 || that.userlist[i].status == 9) {
									that.usersli = true;
								}
							}
							this.usersnamelist = []; //可操作人员信息
							for (let i in this.plsitsti.saleOrderDetailList) {
								if (this.plsitsti.saleOrderDetailList[i].status == 4 || this.plsitsti.saleOrderDetailList[i].status == 9) {
									this.usersnamelist.push(this.plsitsti.saleOrderDetailList[i])
								}
							}
							for (let i in this.usersnamelist) {
								this.usersnamelist[i]['istrue'] = false;
							}
							this.ists = false;
							this.isgs = false;
							that.$api.order.checkRetundAndChange({
								departureTime: res.data.orderExt.departureTime
							}).then((rest) => {
								if (rest.code == 200) {
									if (rest.data.trainRefund == 1) {
										this.ists = true; //能退票
									}
									if (rest.data.trainChange == 1) {
										this.isgs = true; //能改签
									}
								}
							}).catch((err) => {
								console.log(err)
							})

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

		.trainsts {
			padding: 10px 160px 10px 80px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14px;
			color: #333333;
		}
		.boxbtn {
			margin-top: 10px;
			width: 100%;
			font-size: 14px;
			line-height: 30px;
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
		.hotbox {
			width: calc(100% - 30px);
			position: relative;
			font-size: 14px;
			padding:0 15px;
			background-color: #ffffff;
			border-radius: 4px;
			line-height: 45px;
			.examine{
				padding: 28px 66px 28px;
			}
			.lefbox {
				background-color: #F2F2F2;
				width: 100%;
				text-indent: 10px;
				line-height: 34px;
				font-weight: 600;
				font-size: 14px;
				color: #333333;
				padding: 0;
			}

			.lecheckd {
				display: flex;
				align-items: center;
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
		.tripPep{
			.airPasseData{
				display: flex;
				flex-wrap: wrap;
				padding-left: 66px;
				.airPasseList{	 
				width: 50%;
				.mixin_displayBox(@fd:column,@ai:flex-start);
				padding :26px 0 16px;
				div{
					color: #666;
					font-size: 14px;
					font-weight: 400;
					display: flex;
					margin-left: 44px;
					margin-bottom: 10px;
					&>span:nth-child(1){
					width: 84px;
					text-align: right;
					}
					&>span:nth-child(2){
					color: #333;
					}
				}
				div:nth-child(1){
					display: flex;
					align-items: center;
					margin-left: 0;
					&>span{
					color: #666;
					}
				
					.num{
					display: block;
					width: 28px;
					height: 28px;
					border-radius: 50%;
					text-align: center;
					line-height: 28px;
					background: #ECEAEA;
					color: #fff;
					margin-right: 16px;
					}
					&>span:nth-child(2){
					width: 84px;
					text-align: right;
					}
					&>span:nth-child(3){
					color: #333;
					}
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
			.payBot{
				width: 100%;
			}
		}
		.orderOperation{
			padding-bottom: 22px;
			color: #333;
			&>div{
			padding-left: 60px;
			}
			.perText{
			padding-top: 20px;
			line-height: 20px;
			}
			.lecheckd{
			  line-height: 28px;
			}
			.ordrePerData{
			span:nth-child(1){
				display: inline-block;
				width: 60px;
			}
			span:nth-child(2){
				margin: 0 20px;
			}
			}
		}
		.bottom{
			background: #fff;
			margin: 0;
			padding: 10px 0 40px;
		}
	}
</style>
