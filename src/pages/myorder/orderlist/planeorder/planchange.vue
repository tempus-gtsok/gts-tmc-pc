<template>
	<div class="hoteorder">
		<div class="hotboxs">
			<div class="hotboxe">
				<div>订单号：{{dtolist.no}}</div>
				<div>销售单号：{{dtolist.saleNo}}</div>
				<div>改签状态：{{dtolist.statusName}}</div>
				<div>申请时间：{{dtolist.createTime}}</div>
				<div style="color: #FF9000;">改签费用：￥{{dtolist.changeFee}}</div>
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
						<div style="width: 20%;font-size: 14px;font-weight: bolder;color: #333333;">{{item.departTime.substring(0,10)}}</div>
					</div>
				</div>
					
				<div style="width: 50%;display: flex;align-items: center;">
					<div class="" style="font-size: 15px;width: 25%;line-height: 120px;text-align: center;">
						<span style="">{{item.origDeparts}}</span>
					</div>
					<div style="width: 50%;text-align: center;text-align: center;">
						<div style="font-size: 14px; color: #333333;">
							{{item.arriveTimer}}
						</div>
						<div style="border: 1px solid #CCCCCC;margin: 5px 0;">
							
						</div>
						<div style="font-size: 14px; color: #333333;">
							{{item.flightNo}}
						</div>
					</div>
					<div style="width: 25%;font-size: 15px;line-height: 120px;text-align: center;">
						<span>{{item.origArrives}}</span>
					</div>
				</div>
				
			</div>
			<div style="width: 100%;background: #f2f2f2;color: #333333;font-size: 14px;font-weight: bolder;text-indent: 10px;">乘机人信息</div>
			<div v-for="(item,index) in newuserlist" :key="index" style="width: 100%;color: #333333;text-indent: 96px;margin-top: 20px;font-size: 14px;">
				<span style="width: 20%;">{{item.itd.name}}</span>
				<span style="width: 30%;">{{catype(item.itd.origCardType)}}：{{item.itd.cardNo}}</span>
				<span>手机号：{{item.itd.phone}}</span>
				<span>出差事由：{{Reason}}</span>
				<span style=" color: #007AFF;" v-if="item.itd">往:{{item.itd.statusname}}</span>
				<span style=" color: #007AFF;" v-if="item.isd">返:{{item.isd.statusname}}</span>
			</div>
		</div>
		 <div class="hotbox" style="padding-top: 40px;">
			<div class="lefbox">支付信息</div>
			<div style="text-indent: 60px;margin-top: 20px;">支付方式:{{ settlements(settlement) }}
        <span style="margin-left: 40px"> 订单总额：￥{{ dtolist.changeFee }}</span>
      </div>
       <defray business-type="4" product-type="1" :record-no=dtolist.no :amount=dtolist.changeFee entry-method= "0"
               v-if="(typename == 2 && payStatus== 1)||(typename==1 && payStatus == 1 && settlement == 1 &&  (apprvTask.status == 2 || apprvTask.status == 5 ))"></defray>
		</div>
		<div class="hotbox" style="padding-top: 40px;" v-if="usersnamelist.length > 0">
			<div class="lefbox">订单操作</div>
			<div v-if="usersnamelist.length > 0" style="text-indent: 60px;margin-top: 20px;">可操作人员:</div>
			<div class="lecheckd">
				<el-checkbox-group v-model="checkList">
					<div v-for="(item,index) in usersnamelist" :key="index + 1" style="display: flex;flex-direction: column;">
						<el-checkbox :label="item.passengerId">
							<p style="color: #000000;">
								<span style="width: 20%;">{{item.name}}</span>
								<span style="width: 30%;">{{catype(item.cardType)}}：{{item.cardNo}}</span>
								<span>手机号：{{item.phone}}</span>
							</p>
						</el-checkbox>
					</div>
				</el-checkbox-group>
			</div>
			<div class="boxbtn">
				<div class="" v-if="typename == 1 && orderStatus== 3">
					<div class="tkbts">待审核</div>
				</div>
				<div class="" v-if="dtolist.status == 7" >
					<div class="tkbts">运营处理中..</div>
				</div>
			</div>
			<div class="boxbtn">
				<div class="nobts" @click="clearsks()" v-if="dtolist.status == 7 && dtolist.payStatus == 1 ">取消改签</div>
				<div class="retunbts" @click="retuns">返回</div>
			</div>
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
		<div class="information">
			<div class="mask" v-if="companyi_click" @click="companym_clicks">
			</div>
			<div class="popups" v-if="phone_click">
				<div class="cell_phone_number">退票信息</div>
				<div class="cell_phone">选择退票类型：
					<template>
						<el-radio v-model="radio" label="2">退票</el-radio>
					</template>
				</div>
				<div class="cell_phone">是否自愿退票：
					<template>
						<el-radio v-model="radios" label="1">自愿退票</el-radio>
						<el-radio v-model="radios" label="2">非自愿退票</el-radio>
						<el-radio v-model="radios" label="3">异常订单退票</el-radio>
					</template>
				</div>
				<div class="cell_phone">是否取消PNR：
					<template>
						<el-radio v-model="radis" label="0">是</el-radio>
						<el-radio v-model="radis" label="1">否</el-radio>
					</template>
				</div>
				<div class="cell_phone">选择废退原因：
					<template>
						<el-select v-model="value" v-if="radios == '1'" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<el-select v-model="value" v-if="radios != '1'" placeholder="请选择">
							<el-option v-for="item in optionss" :key="item.values" :label="item.labels" :value="item.values">
							</el-option>
						</el-select>
					</template>
				</div>
				<div class="cell_phone">退票原因：
					<el-input v-model="resons" placeholder="请输入退票原因">
					</el-input>
				</div>
				<div class="cell_phone">备注：
					<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
					</el-input>
				</div>
				<div class="cell_phone" style="display: flex;">上传附件：
					<div style="width: 80px;height: 80px;margin-left: 30px;">
						<el-upload class="avatar-uploader" action="/dpe/tms/api/user/uploadPassengerImage" :show-file-list="false"
						 :accept="'image/*'" :headers="{AuthToken:tokens}" :on-success="handleSuccess" :on-error="handleError"
						 :before-upload="handleBeforeUpload" :on-progress="handleProgress">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</div>
				</div>
				<button class="cancel" @click="companym_click">申请退票</button>
			</div>
		</div>
	</div>
</template>

<script>
	import airports from '../../../../../static/js/airports.js'
  import Defray from "@/components/common/defray";
	export default {
    components: {Defray},
    data() {
			return {
				tokens: '',
				imageUrl: '', //照片路径
				options: [{
					value: '选项1',
					label: '客人自愿按照客规'
				}, {
					value: '选项2',
					label: '起飞前退20%'
				}, {
					value: '选项3',
					label: '航班取消，办理全退'
				}, {
					value: '选项4',
					label: '其他'
				}],
				optionss: [{
					values: '选项1',
					labels: '生病证明不扣'
				}, {
					values: '选项2',
					labels: '其他'
				}],
				value: '',
				values: '',
				tiltext:'飞机票详情',
				radio: '2',
				radios: '1',
				radis: '0',
				textarea: '',
				newuserlist: [],//乘客信息
				resons: '', //退票原因
				checkList: [], //选中人员
				userlist: [], //出行人信息
				isclose: false,
				usersli: false, //是否可以退票和改签
				ists: false, //是否能退票
				isgs: false, //是否能改签
				drawelist: [],
				apprvCost: [],
				insuranceInfos: [],
				companyi_click: false, //遮盖层
				phone_click: false,
				drawer: false,
				dtolist: {},//改签单详情
				traExtend: {},
				hang: [],
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
				address: [], //城市
				dialogVisible: false,
				loading: false,
				splog: [], //审批日志
				codes: '', //飞机票id
				plsitsti: {}, //飞机票详情
				userslist: {}, //飞机票详情
				numprice: '999', //总价
				apprvTask:{},
				apprvTaskStatu: '', //因公审核状态0待审核 1审核中2审核通过
				orderStatus: '', //订单状态
				payStatus: 0,//支付状态1:未支付(默认); 2:部分支付; 3:已支付; 4:部分退款; 5:已退款
				apprvTaskReason: '出差事由', //出差事由
				Reason:'',//出差事由
				RuleMas: false, //当前用户是否免审
				sione: true, //改单程还是往返
				shos: false,
				orderDetailListy: [],
				orderDetailList:[],
				weeks:['一','二','三','四','五','六','日'],
				isttype: 0,
				RuleMa: '',
				saleOrderNo: '',
				typename: '',
				settlement: 0,//1为日结 2为月结
				isnum: 0,
				usersnamelist: [],
				odllegList: [],
				applylist: {},
				ltes:0,
			};
		},
		mounted() {
			this.codes = this.$route.query.data; //获取上个页面传入的参数
			this.slet();
			this.address = airports.addressAirportAll; //航空名字
			this.getRuleMainSetting();
		},
		handleSuccess(response, file, fileList) { //上传头像成功后处理---
			this.$message({
				message: '上传成功！',
				type: 'success'
			})
			if (response.code == 200) {
				this.imageUrl = response.data;
			}
		},
		handleError() {
			this.$message({
				message: '上传失败,请重新上传图片!！',
				type: 'error'
			})
		},
		handleProgress(event, file, fileList) {
			this.loadings = true; //  上传时执行loading事件
		},
		handleBeforeUpload(file) {
			const isImage = file.type.includes("image");
			if (!isImage) {
				this.$message.error("上传文件类型必须是图片!");
			}
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isLt2M) {
				this.$message.error("上传图片大小不能超过 2MB!");
			}
			return isImage && isLt2M;
		},
		methods: {
			passlist() {
				this.sione = false;
				let list = this.orderDetailListy[0];
				this.odllegList = [];//当前航班信息
				this.usersnamelist = [];//当前可操作用户
				let userli = this.newuserlist;//当前用户列表
				let voyages = list.voyages;
				for (let i = 0; i < voyages.length; i++) {
					this.odllegList.push({
						flightNo:voyages[i].flightNo,
						cabin:voyages[i].cabin,
						depAirport: voyages[i].depart,
						arrAirport:voyages[i].arrive,
						depTime: this.timels(voyages[i].departTime),
						arrTime: this.timels(voyages[i].arriveTime),
					})
				}
				for (let i = 0; i < userli.length; i++) {
					if(userli[i].itd.status == 1){
						this.usersnamelist.push({
							phone:userli[i].itd.phone,
							city: {
								id:userli[i].itd.origDepart,
								name: this.citys(userli[i].itd.origDepart)
							}, 
							citys: {
								id:userli[i].itd.origArrive,
								name: this.citys(userli[i].itd.origArrive)
							}, 
							departTime:  userli[i].itd.departTime.substring(0,10),
							cardNo: userli[i].itd.origCardNo,
							cardType: userli[i].itd.origCardType,
							name: userli[i].itd.name,
							istrue: false,//默认为待选状态
						})
					}
				}
			},
			async payment(){//公众号微信支付
				let that = this;
				that.open();
				try{
					let res = await order.confirmPay({
						businessType: "1",
						categoryCode: "1000",
						productType: "1",
						differenceType: "n",
						recordNo: that.codes,
						amount: that.dtolist.changeFee,
						payWayCode: "1000023"
					})
					that.close();
					if(res.code == 200){
						let da = JSON.parse(res.data);
						// #ifdef  H5 || MP-WEIXIN
						let ua = window.navigator.userAgent.toLowerCase();
						if (ua.match(/micromessenger/i) == 'micromessenger') {
							that.$wechat.readys(da,function(callback) {
								if(callback == '200'){
									that.slet('wx');
								} else {
									uni.showModal({
										content: '支付失败',
										showCancel: false
									});
								}
							})
						} else {
							uni.showModal({
								content: '请在微信浏览器中打开',
								showCancel: false
							});
						}
						// #endif
					} else {
						uni.showModal({
							content: res,
							showCancel: false
						});
					}
				}catch(e){
					console.log(e)
					that.close();
				}
			},
			updataslist(num) { //往返改签或者退票
				if (this.checkList.length == 0) {
					this.$message({
						message: '请选择一个出差人员',
						type: 'warning'
					})
					return
				}
				this.sione = false;
				let list = this.orderDetailListy[0];
				this.saleOrderNo = list.mainDetail.saleOrderNo;
				this.odllegList = [];//当前航班信息
				this.usersnamelist = [];//当前可操作用户
				let voyages = list.voyages;
				for (let i = 0; i < voyages.length; i++) {
					this.odllegList.push({
						flightNo:voyages[i].flightNo,
						cabin:voyages[i].cabin,
						depAirport: voyages[i].depart,
						arrAirport:voyages[i].arrive,
						depTime: this.timels(voyages[i].departTime),
						arrTime: this.timels(voyages[i].arriveTime),
					})
				}
				for (let i = 0; i < list.passengers.length; i++) { //循环插入所有用户信息
					if(list.passengers[i].voyages[0].status == 1 && list.passengers[i].voyages[1].status == 1){
						this.usersnamelist.push({
							phone:list.passengers[i].phone,
							city: {
								id:list.passengers[i].voyages[0].depart,
								name: this.citys(list.passengers[i].voyages[0].depart)
							}, 
							citys: {
								id:list.passengers[i].voyages[0].arrive,
								name: this.citys(list.passengers[i].voyages[0].arrive)
							}, 
							departTime: list.passengers[i].voyages[0].departTime.substring(0,10),
							departTimes: list.passengers[i].voyages[1].departTime.substring(0,10),
							cardNo: list.passengers[i].cardNo,
							cardType: list.passengers[i].cardType,
							passengerId: list.passengers[i].passengerId,
							name: list.passengers[i].name,
							istrue: false,//默认为待选状态
						})
					}
				}
				this.shos = true;
				this.isnum = num;
				if (num == 2) {
					this.tuipiao = 3;
				}
				this.ic_ok();
			},
			updatas(num, item, index) { //申请改签或退票
				if (this.checkList.length == 0) {
					this.$message({
						message: '请选择一个出差人员',
						type: 'warning'
					})
					return
				}
				this.sione = true;
				this.odllegList = []; //当前航班信息
				this.odllegList.push({
					flightNo:item.flightNo,
					cabin:item.cabin,
					depAirport:item.origDepart,
					arrAirport:item.origArrive,
					depTime: this.timels(item.departTime),
					arrTime: this.timels(item.arriveTime),
				})
				this.isnum = num;
				this.usersnamelist = []; //可操作用户列表
				let userli = this.newuserlist;//当前用户列表
				if(index == 0){
					this.tuipiao = 1;
					for (let i = 0; i < userli.length; i++) {
						if(userli[i].itd.status == 1){
							this.usersnamelist.push({
								phone:userli[i].itd.phone,
								city: {
									id:userli[i].itd.origDepart,
									name: this.citys(userli[i].itd.origDepart)
								}, 
								citys: {
									id:userli[i].itd.origArrive,
									name: this.citys(userli[i].itd.origArrive)
								}, 
								departTime:  userli[i].itd.departTime.substring(0,10),
								cardNo: userli[i].itd.origCardNo,
								cardType: userli[i].itd.origCardType,
								name: userli[i].itd.name,
								istrue: false,//默认为待选状态
							})
						}
					}
				} else if(index == 1){
					this.tuipiao = 2;
					for (let i = 0; i < userli.length; i++) {
						if(userli[i].isd.status == 1){
							this.usersnamelist.push({
								city: {
									id:userli[i].isd.origDepart,
									name: this.citys(userli[i].isd.origDepart)
								}, 
								citys: {
									id:userli[i].isd.origArrive,
									name: this.citys(userli[i].isd.origArrive)
								}, 
								departTime:  userli[i].isd.departTime.substring(0,10),
								cardNo: userli[i].isd.origCardNo,
								cardType: userli[i].isd.origCardType,
								name: userli[i].isd.name,
								istrue: false,//默认为待选状态
							})
						}
					}
				}
				this.shos = true;
				this.ic_ok();
			},
			timels(time){
				if(time.length < 19){
					return time + ':00'
				} else {
					return time
				}
			},
			yeada(item,num){
				if(num == 0){
					return item.substring(11,16)
				} else if(num == 1){
					let week = new Date(item.replace(/-/g, '/')).getDay();
					if(week == 0){
						week = 7
					}
					let ts = item.substring(5,10).split('-');
					return ts[0] + '月' + ts[1] + '日' + ' 周' + this.weeks[week - 1]
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
			company(ie) {
				for (let s in this.hang) {
					if (ie == s) {
						ie = this.hang[s];
						return ie;
					}
				}
			},
			citys(its){//回显城市
				for (let j = 0; j < this.address.length; j++) {  //循环城市
					if(this.address[j].airportCode == its){
						return this.address[j].cityCName
					}
				}
			},
			phonei_click() {
				this.phone_click = true;
				this.companyi_click = true;
			},
			companym_click() {
				this.phone_click = false;
				this.companyi_click = false;
				this.dimiss = false;
				this.updapp();
			},
			companym_clicks() {
				this.phone_click = false;
				this.companyi_click = false;
				this.dimiss = false;
			},
			timels(time) {
				if (time.length < 19) {
					return time + ':00'
				} else {
					return time
				}
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
			conpan(i) {
				if(i == 1){
					return '../../../static/image/home/订单-新申请.png'
				}else if(i == 2){
					return '../../../static/image/home/Canceled.png'
				} else if(i == 3){
					return '../../../static/image/home/Approval-Pending.png'
				} else if(i == 4){
					return '../../../static/image/home/Approval-refused.png'
				} else if(i == 5){
					return '../../../static/image/home/unpaid.png'
				} else if(i == 6){
					return '../../../static/image/home/订单-待提交.png'
				} else if(i == 7){
					return '../../../static/image/home/processing.png'
				} else if(i == 8){
					return '../../../static/image/home/finished.png'
				} else if(i == 9){
					return '../../../static/image/home/订单-客户审批.png'
				} else if(i == 10){
					return '../../../static/image/home/customer-rejected.png'
				}
			},
			async ic_ok() { //确定当前
				let isnum = this.isnum; //改签还是退票
				let userlist = [];
				let names = [];
				let passengerNos = [];
				let city = "";
				let citys = "";
				let detime = "";
				let detimes = "";
				for (let i in this.usersnamelist) {
					if(this.usersnamelist[i].istrue){
						city = this.usersnamelist[i].city;
						citys = this.usersnamelist[i].citys;
						detime = this.usersnamelist[i].departTime;
						userlist.push({
							phone:this.usersnamelist[i].phone,
							certNo: this.usersnamelist[i].cardNo,//证件号码
							certType: this.catype(this.usersnamelist[i].cardType),//证件类型
							name:this.usersnamelist[i].name,//名字
						});
						names.push(this.usersnamelist[i].name)
					}
				}
				let nu = this.typename;//因公因私
				let userlistnos = [];
				if (nu == 1) { //因公需要从接口中获取用户passengerNo
					let res = await this.$api.order.getStaffByTravelNoAndNames({
						travelNo: this.traExtend.travelNo,
						names: names
					})
					let dat = res.data;//获取改签人信息
					for (let i in dat) {
						userlistnos.push(dat[i].passengerNo)
					}
				}
				let res = await this.$api.order.ruleMainSetting()
				if (res.code == 200) {
					this.RuleMa = res.data.examinePattern;
					let stw = this.RuleMa.split(',');
					for (let i in stw) {
						/**
						 * 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
						 */
						if (stw[i] == 10) {
							this.$api.order.judgeApprv({
								passengerNos: userlistnos //判断当前出行人是否都免审
							}).then((res) => {
								if (res.data.code == 200) {
									this.loading = false;
									if (res.data.data == true) { //判断是否需要审核
										this.RuleMas = true;
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
						this.RuleMas = true;
					}
				} else {
					this.loading = false;
					this.$message({
						message: res.message,
						type: 'warning'
					})
				}
				this.shos = false; //单程
				if (isnum == 1) { //改签
					let none = ''; //往返
					if (this.sione) { //单程
						none = 'single'
					} else { //往返
						none = 'returns'
					}

					let dat = {
						tradeNo: this.traExtend.transationOrderNo,//交易单号
						none:"single",
						type:"Planeticket",
						userlistnos: userlistnos,//用户信息
						saleOrderNo: this.dtolist.saleNo,//航班出差单号
						odllegList: this.odllegList,//当前航班信息
						city: city,//去的城市
						citys: citys,//来的城市
						timedate:detime,//时间
						butalist: userlist,//出行人员
						isblcks: 4,//4改签
						isbtd: nu,//1因公2因私
					}
					this.$router.push({
						path: '/ticketcationform',
						query: {
							data: JSON.stringify(dat)
						}
					});
				} else { //退票
				}
			},
			catype(it) { //返回证件类型
				if (it == 'NI') {
					return '身份证'
				} else if (it == 'PP') {
					return '护照'
				} else if (it == 'TB') {
					return '台胞证'
				} else if (it == 'GA') {
					return '港澳通行证'
				} else if (it == 'HX') {
					return '回乡证'
				} else if (it == 'OS') {
					return '其他证件'
				}
			},
			companys(ie) {
				if (ie == 'F') {
					ie = '头等舱'
				} else if (ie == 'C') {
					ie = '商务舱'
				} else if (ie == 'Y') {
					ie = '经济舱'
				}
				return ie;
			},
			clearsks(){//取消改签
			  this.$confirm('将取消订单，是否继续?', '提示', {
			    confirmButtonText: '确定',
			    cancelButtonText: '取消',
			    type: 'warning'
			  }).then(() => {
			    this.opclose();//取消订单
			  });
			},
			retuns() {
				this.$router.go(-1); //返回上一页
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
				let no = this.dtolist.no;
				this.$api.order.cancelChanges({
					saleChangeNo:no
				}).then((res) => {
					this.loading = false;
					if (res.code == 200) {
						this.$message({
							message: '取消成功！',
							type: 'success'
						})
						this.slet();
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
			citys(its) { //回显城市
				for (let j = 0; j < this.address.length; j++) { //循环城市
					if (this.address[j].airportCode == its) {
						return this.address[j].cityCName
					}
				}
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
			settlements(it) {
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
							that.insuranceInfos = that.userslist.tr.orderDetailList[0].passengers[0].insuranceInfos; //获取保险信息
							that.tiltext = '机票订单详情';
							that.timeList = res.data.timeList; //航行时间
							that.address = airports.addressAirportAll; //航空名字
              that.settlement = res.data.traExtend.settlement;
							if (that.userslist.tr.actualInfoSearchVO != null) {
								that.apprvTaskStatu = that.userslist.tr.actualInfoSearchVO.actualAmountRecordList[0].auditStatus; //审核状态
							}
							that.orderStatus = that.userslist.tr.orderDetailList[0].mainDetail.orderStatus; //订单状态 1:预订中(默认); 2:待审核; 3:待提交; 4:出票中; 5:已出票; 6:已取消; 7:已拒单；8:待支付；9:待审批；10:已登账
              that.typename = res.data.traExtend.typename;//1因公2因私
              that.payStatus = res.data.dto.payStatus;//支付状态  1:未支付(默认); 2:部分支付; 3:已支付; 4:部分退款; 5:已退款;6:退款中
              that.apprvTask = res.data.apprvTask;
							if (that.orderStatus == 2) {
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
							} else if (that.isttype == 2 && that.orderDetailList.length == 1) { //1条销售单 2条数据 往返 能改签往返
								let num = 0;
								for (let i = 0; i < usenaslist.length; i++) {
									that.userlist.push({
										icke: 3,
										it: that.userslist.tr.orderDetailList[0].passengers[i],
										itd: that.userslist.tr.orderDetailList[0].passengers[i].voyages[0], //去
										isd: that.userslist.tr.orderDetailList[0].passengers[i].voyages[1], //回
									})
								}
								for (let i = 0; i < that.orderDetailListy.length; i++) { //判断两个行程是否有人能改签或者退票
									that.orderDetailListy[i]['stkus'] = false;
									for (let k = 0; k < that.userlist.length; k++) {
										if (i == 0 && that.userlist[k].itd.status == 1) {
											that.orderDetailListy[i].stkus = true;
										}
										if (i == 1 && that.userlist[k].isd.status == 1) {
											that.orderDetailListy[i].stkus = true;
										}
									}
									if (that.orderDetailListy[i].stkus == true) {
										num++;
									}
								}
								if (num == 2) {
									that.usersli = true;
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
			catypes(it) { //返回证件类型
				if (it == '身份证') {
					return 'NI'
				} else if (it == '护照') {
					return 'PP'
				} else if (it == '台胞证') {
					return 'TB'
				} else if (it == '港澳通行证') {
					return 'GA'
				} else if (it == '回乡证') {
					return 'HX'
				} else if (it == '其他证件') {
					return 'OS'
				}
			},
			async updapp() { //确定
				let that = this;
				let orderDetailList = that.orderDetailList; //所有信息
				// let isbtd = that.datalist.ranst.isbtd;//1因公2因私
				let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
				let TravelDepartlist = that.TravelDepartlist; //部门审批人
				let NameCenter = that.NameCenter; //成本中心
				let resons = that.resons; //原因

				if (this.tesh == '') {
					this.$message({
						message: '请填写备注！',
						type: 'warning'
					})
					return
				} else if (NameCenter.id == '' && this.RuleMas == false) {
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
				if (that.tuipiao == 1) { //选择了去的航班没选择回来的	1是去2是回			因私 免审没有审核信息
					let userlist = that.userlist;
					let saleNo = orderDetailList[0].mainDetail.saleOrderNo; //销售单号
					let tradeNo = that.userslist.tr.transationOrderNo; //旧出差单号
					let voluntaryType = that.radios; //是否自愿，1自愿，2不自愿
					let refundType = that.radio; //退废类型1废票，2退票
					let reason = that.resons; //退废原因
					let isXepnr = that.radis; //是否取消PNR，0是，1否
					let filePath = that.imageUrl; //图片上传路径
					let refundRemark = that.textarea; //说明解释
					let passengersList = [];
					for (let i = 0; i < userlist.length; i++) {
						passengersList.push({
							"name": userlist[i].it.name,
							"ageType": userlist[i].it.ageType,
							"cardType": userlist[i].it.cardType,
							"cardNo": userlist[i].it.cardNo
						})
					}
					let dats = {
						"saleNo": saleNo,
						"tradeNo": tradeNo,
						"voluntaryType": voluntaryType,
						"refundType": refundType,
						"reason": refundType,
						"isXepnr": isXepnr,
						"filePath": filePath,
						"refundRemark": refundRemark,
						"apprvTask": {
							"agree": false,
							"apprvTaskStaffs": apprvTaskStaffts,
							beforeMiddle: 5, //1为事前2为事中 4为改签 5为退票
							costId: NameCenter.id, //成本中心id
							costName: NameCenter.name, //成本中心名称
							reason: resons,
							taskType: 5 //1为事前2为事中，4为改签 5为退票
						},
						"flights": [{
							"departDate": orderDetailList[0].voyages[0].departTime,
							"depart": orderDetailList[0].voyages[0].depart,
							"arrive": orderDetailList[0].voyages[0].arrive,
							"flightNo": orderDetailList[0].voyages[0].flightNo,
							"cabin": orderDetailList[0].voyages[0].cabin,
							"sequence": orderDetailList[0].voyages[0].sequence,
							"arriveTime": orderDetailList[0].voyages[0].arriveTime,
							"departTerminal": orderDetailList[0].voyages[0].departTerminal,
							"arriveTerminal": orderDetailList[0].voyages[0].arriveTerminal,
							"plane": orderDetailList[0].voyages[0].flightModel
						}],
						"passengersList": passengersList,
						"contacts": {
							"name": that.userslist.tr.accountInfo.contact,
							"phone": that.userslist.tr.accountInfo.phone,
							"email": ""
						}
					}
					this.loading = true;
					try {
						let res = await that.$api.order.orderRefundApplyCommit(dats);
						this.loading = false;
						if (res.code == 200) {
							that.$message({
								message: '提交申请退票成功！',
								type: 'success'
							});
							setTimeout(() => {
								this.searchhoter();
							}, 1000)
						} else {
							that.$message({
								message: res.message,
								type: 'warning'
							});
						}
					} catch (e) {
						console.log(e);
						this.loading = false;
					}

				} else if (that.tuipiao == 2 && orderDetailList.length == 1) { //选择了回来的航班没选择去的
					let userlist = that.userlist;
					let saleNo = orderDetailList[0].mainDetail.saleOrderNo; //销售单号
					let tradeNo = that.userslist.tr.transationOrderNo; //旧出差单号
					let voluntaryType = that.radios; //是否自愿，1自愿，2不自愿
					let refundType = that.radio; //退废类型1废票，2退票
					let reason = that.resons; //退废原因
					let isXepnr = that.radis; //是否取消PNR，0是，1否
					let filePath = that.imageUrl; //图片上传路径
					let refundRemark = that.textarea; //说明解释
					let passengersList = [];
					for (let i = 0; i < userlist.length; i++) {
						passengersList.push({
							"name": userlist[i].it.name,
							"ageType": userlist[i].it.ageType,
							"cardType": userlist[i].it.cardType,
							"cardNo": userlist[i].it.cardNo
						})
					}
					let dats = {
						"saleNo": saleNo,
						"tradeNo": tradeNo,
						"voluntaryType": voluntaryType,
						"refundType": refundType,
						"reason": refundType,
						"isXepnr": isXepnr,
						"filePath": filePath,
						"refundRemark": refundRemark,
						"apprvTask": {
							"agree": false,
							"apprvTaskStaffs": apprvTaskStaffts,
							beforeMiddle: 5, //1为事前2为事中 4为改签 5为退票
							costId: NameCenter.id, //成本中心id
							costName: NameCenter.name, //成本中心名称
							reason: resons,
							taskType: 5 //1为事前2为事中，4为改签 5为退票
						},
						"flights": [{
							"departDate": orderDetailList[0].voyages[1].departTime,
							"depart": orderDetailList[0].voyages[1].depart,
							"arrive": orderDetailList[0].voyages[1].arrive,
							"flightNo": orderDetailList[0].voyages[1].flightNo,
							"cabin": orderDetailList[0].voyages[1].cabin,
							"sequence": orderDetailList[0].voyages[1].sequence,
							"arriveTime": orderDetailList[0].voyages[1].arriveTime,
							"departTerminal": orderDetailList[0].voyages[1].departTerminal,
							"arriveTerminal": orderDetailList[0].voyages[1].arriveTerminal,
							"plane": orderDetailList[0].voyages[1].flightModel
						}],
						"passengersList": passengersList,
						"contacts": {
							"name": that.userslist.tr.accountInfo.contact,
							"phone": that.userslist.tr.accountInfo.phone,
							"email": ""
						}
					}
					this.loading = true;
					try {
						let res = await that.$api.order.orderRefundApplyCommit(dats);
						this.loading = false;
						if (res.code == 200) {
							that.$message({
								message: '提交申请退票成功！',
								type: 'success'
							});
							setTimeout(() => {
								this.searchhoter();
							}, 1000)
						} else {
							that.$message({
								message: res.message,
								type: 'warning'
							});
						}
					} catch (e) {
						console.log(e);
						this.loading = false;
					}
				} else if (that.tuipiao == 2 && orderDetailList.length == 2) { //选择了回来的航班没选择去的
					let userlist = that.userlist;
					let saleNo = orderDetailList[1].mainDetail.saleOrderNo; //销售单号
					let tradeNo = that.userslist.tr.transationOrderNo; //旧出差单号
					let voluntaryType = that.radios; //是否自愿，1自愿，2不自愿
					let refundType = that.radio; //退废类型1废票，2退票
					let reason = that.resons; //退废原因
					let isXepnr = that.radis; //是否取消PNR，0是，1否
					let filePath = that.imageUrl; //图片上传路径
					let refundRemark = that.textarea; //说明解释
					let passengersList = [];
					for (let i = 0; i < userlist.length; i++) {
						passengersList.push({
							"name": userlist[i].it.name,
							"ageType": userlist[i].it.ageType,
							"cardType": userlist[i].it.cardType,
							"cardNo": userlist[i].it.cardNo
						})
					}
					let dats = {
						"saleNo": saleNo,
						"tradeNo": tradeNo,
						"voluntaryType": voluntaryType,
						"refundType": refundType,
						"reason": refundType,
						"isXepnr": isXepnr,
						"filePath": filePath,
						"refundRemark": refundRemark,
						"apprvTask": {
							"agree": false,
							"apprvTaskStaffs": apprvTaskStaffts,
							beforeMiddle: 5, //1为事前2为事中 4为改签 5为退票
							costId: NameCenter.id, //成本中心id
							costName: NameCenter.name, //成本中心名称
							reason: resons,
							taskType: 5 //1为事前2为事中，4为改签 5为退票
						},
						"flights": [{
							"departDate": orderDetailList[1].voyages[0].departTime,
							"depart": orderDetailList[1].voyages[0].depart,
							"arrive": orderDetailList[1].voyages[0].arrive,
							"flightNo": orderDetailList[1].voyages[0].flightNo,
							"cabin": orderDetailList[1].voyages[0].cabin,
							"sequence": orderDetailList[1].voyages[0].sequence,
							"arriveTime": orderDetailList[1].voyages[0].arriveTime,
							"departTerminal": orderDetailList[1].voyages[0].departTerminal,
							"arriveTerminal": orderDetailList[1].voyages[0].arriveTerminal,
							"plane": orderDetailList[1].voyages[0].flightModel
						}],
						"passengersList": passengersList,
						"contacts": {
							"name": that.userslist.tr.accountInfo.contact,
							"phone": that.userslist.tr.accountInfo.phone,
							"email": ""
						}
					}
					this.loading = true;
					try {
						let res = await that.$api.order.orderRefundApplyCommit(dats);
						this.loading = false;
						if (res.code == 200) {
							that.$message({
								message: '提交申请退票成功！',
								type: 'success'
							});
							setTimeout(() => {
								this.searchhoter();
							}, 1000)
						} else {
							that.$message({
								message: res.message,
								type: 'warning'
							});
						}
					} catch (e) {
						console.log(e);
						this.loading = false;
					}
				} else if (that.tuipiao == 3 && orderDetailList.length == 1) { //选择了回来的航班和去的航班
					let userlist = that.userlist;
					let saleNo = orderDetailList[0].mainDetail.saleOrderNo; //销售单号
					let tradeNo = that.userslist.tr.transationOrderNo; //旧出差单号
					let voluntaryType = that.radios; //是否自愿，1自愿，2不自愿
					let refundType = that.radio; //退废类型1废票，2退票
					let reason = that.resons; //退废原因
					let isXepnr = that.radis; //是否取消PNR，0是，1否
					let filePath = that.imageUrl; //图片上传路径
					let refundRemark = that.textarea; //说明解释
					let passengersList = [];
					for (let i = 0; i < userlist.length; i++) {
						passengersList.push({
							"name": userlist[i].it.name,
							"ageType": userlist[i].it.ageType,
							"cardType": userlist[i].it.cardType,
							"cardNo": userlist[i].it.cardNo
						})
					}
					let dats = {
						"saleNo": saleNo,
						"tradeNo": tradeNo,
						"voluntaryType": voluntaryType,
						"refundType": refundType,
						"reason": refundType,
						"isXepnr": isXepnr,
						"filePath": filePath,
						"refundRemark": refundRemark,
						"apprvTask": {
							"agree": false,
							"apprvTaskStaffs": apprvTaskStaffts,
							beforeMiddle: 5, //1为事前2为事中 4为改签 5为退票
							costId: NameCenter.id, //成本中心id
							costName: NameCenter.name, //成本中心名称
							reason: resons,
							taskType: 5 //1为事前2为事中，4为改签 5为退票
						},
						"flights": [{
							"departDate": orderDetailList[0].voyages[0].departTime,
							"depart": orderDetailList[0].voyages[0].depart,
							"arrive": orderDetailList[0].voyages[0].arrive,
							"flightNo": orderDetailList[0].voyages[0].flightNo,
							"cabin": orderDetailList[0].voyages[0].cabin,
							"sequence": orderDetailList[0].voyages[0].sequence,
							"arriveTime": orderDetailList[0].voyages[0].arriveTime,
							"departTerminal": orderDetailList[0].voyages[0].departTerminal,
							"arriveTerminal": orderDetailList[0].voyages[0].arriveTerminal,
							"plane": orderDetailList[0].voyages[0].flightModel
						}, {
							"departDate": orderDetailList[0].voyages[1].departTime,
							"depart": orderDetailList[0].voyages[1].depart,
							"arrive": orderDetailList[0].voyages[1].arrive,
							"flightNo": orderDetailList[0].voyages[1].flightNo,
							"cabin": orderDetailList[0].voyages[1].cabin,
							"sequence": orderDetailList[0].voyages[1].sequence,
							"arriveTime": orderDetailList[0].voyages[1].arriveTime,
							"departTerminal": orderDetailList[0].voyages[1].departTerminal,
							"arriveTerminal": orderDetailList[0].voyages[1].arriveTerminal,
							"plane": orderDetailList[0].voyages[1].flightModel
						}],
						"passengersList": passengersList,
						"contacts": {
							"name": that.userslist.tr.accountInfo.contact,
							"phone": that.userslist.tr.accountInfo.phone,
							"email": ""
						}
					}
					this.loading = true;
					try {
						let res = await that.$api.order.orderRefundApplyCommit(dats);
						this.loading = false;
						if (res.code == 200) {
							that.$message({
								message: '提交申请退票成功！',
								type: 'success'
							});
							setTimeout(() => {
								this.searchhoter();
							}, 1000)
						} else {
							that.$message({
								message: res.message,
								type: 'warning'
							});
						}
					} catch (e) {
						console.log(e);
						this.loading = false;
					}
				}
			},
			rest(ite){
				let arr = this.stlist;
				for(let i in arr){
					if(arr[i].id == ite){
						return arr[i].name
					}
				}
			},
			async slet(va){
				let that = this;
				if(that.ltes == 0){
					that.loading = true;
				}
				try{
					let rea = await that.$api.order.openChangeDetail({saleChangeNo: this.codes});//查询当前航班信息
					that.loading = false;
					if(rea.code == 200){
						if (va == 'wx' && rea.data.dto.payStatus == 1){
							that.ltes = 1;
							that.loading = true;
							that.tiltext = '支付中...';
							setTimeout(()=>{
								that.slet('wx')
							},1000)
						} else {
							that.ltes == 0;
							let ret = await that.$api.order.queryAirlineList();//获取航空公司名称
							that.loading = false;
							that.tiltext = '改签单详情';
							if(rea.data.apprvTask != undefined){
								that.Reason = rea.data.apprvTask.reason; //出差事由
							}
							that.dtolist = rea.data.dto;//改签单信息
							that.hang = ret.data.airlineDds; //航空公司名
							that.traExtend = rea.data.traExtend;
							that.typename = rea.data.traExtend.typename;//1因公2因私
							that.settlement = rea.data.traExtend.settlement;//1为日结 2为月结
							that.orderStatus = rea.data.dto.status;
							that.payStatus = rea.data.dto.payStatus;//支付状态  1:未支付(默认); 2:部分支付; 3:已支付; 4:部分退款; 5:已退款;6:退款中
							that.apprvTask = rea.data.apprvTask;
							let serlist = rea.data.forShowPassengerInfo;//乘客信息
							let stalist = rea.data.saleItemMap;//乘客状态
							for (let i = 0; i < serlist.length; i++) {
								serlist[i].status = stalist[serlist[i].saleItemId].status;
								serlist[i]['phone'] = stalist[serlist[i].saleItemId].phone
							}
								
							that.dtolist['statusname'] = that.rest(that.dtolist.status);
							let userlists =  serlist;
							let newuserlist = [];
							let forshowlist = rea.data.forShowTicketInfo;//城市信息
							this.newuserlist = [];
							if(forshowlist.length == 1){ //单程
								for (let i = 0; i < userlists.length; i++) {
									
									this.newuserlist.push({
										itd: userlists[i],//去
									})
									this.newuserlist[i].itd['statusname'] = that.userstatus(that.newuserlist[i].itd.status);
								}
								
							} else {//往返
								let sit = (userlists.length) / 2;//获取乘客人数
								for (let i = 0; i < sit; i++) {
									this.newuserlist.push({
										itd: userlists[i],//去
										isd: userlists[i + sit],//返
									})
									this.newuserlist[i].itd['statusname'] = that.userstatus(that.newuserlist[i].itd.status);
									this.newuserlist[i].isd['statusname'] = that.userstatus(that.newuserlist[i].isd.status);
								}
							}
							for (let k in forshowlist) {
								forshowlist[k]['statuss'] = this.yeada(forshowlist[k].departTime,1);
								forshowlist[k]['departTimes'] = this.yeada(forshowlist[k].departTime,1);
								forshowlist[k]['airlines'] = this.company(forshowlist[k].airline);
								forshowlist[k]['departTimer'] = this.yeada(forshowlist[k].departTime,0);
								forshowlist[k]['arriveTimes'] = this.yeada(forshowlist[k].arriveTime,0);
								forshowlist[k]['origDeparts'] = this.citys(forshowlist[k].origDepart);
								forshowlist[k]['arriveTimer'] = this.busdate(forshowlist[k].departTime,forshowlist[k].arriveTime);
								forshowlist[k]['origArrives'] = this.citys(forshowlist[k].origArrive);
								forshowlist[k]['ims'] = 'http://file.feiren.com/00/02/' + forshowlist[k].airline + '.png'  //航空公司图标
							}
							if(forshowlist.length == 1){ //判断单程里是否有用户能改签或者退票
								forshowlist[0]['stkus'] = false;
								for (let i = 0; i < userlists.length; i++) {
									if(userlists[i].status == 1){
										forshowlist[0].stkus = true;
									}
								}
							} else {
								let num = 0;
								for (let i = 0; i < 2; i++) { //判断往返里是否有用户能改签或者退票
									forshowlist[i].stkus = false;
									for (let k = 0; k < this.newuserlist.length; k++) {
										if(i == 0 && this.newuserlist[k].itd.status == 1){
											forshowlist[i].stkus = true;
										}
										if(i == 1 && this.newuserlist[k].isd.status == 1){
											forshowlist[i].stkus = true;
										}
									}
									if(forshowlist[i].stkus == true){
										num++;
									}
								}
								if(num == 2){
									that.usersli = true;
								}
							}
							that.orderDetailListy = forshowlist;
							this.passlist();
							that.loading = false;
						}
					} else {
						that.loading = false;
						that.elast(rea.massage);
					}
				}catch(e){
					console.log(e)
					that.loading = false;
				}
			}
		}
	};
</script>

<style scoped lang="less">
	.hoteorder {
		width: calc(100% - 320px);
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

		.information {
			width: 100%;
			background: red;

			.mask {
				position: fixed;
				top: 0;
				left: 0;
				z-index: 998;
				width: 100%;
				height: 100%;
				background: rgba(255, 255, 255, 0.5);
			}

			.popups {
				width: 500px;
				height: 550px;
				position: fixed;
				padding: 2%;
				top: 50%;
				left: 50%;
				margin-left: -250px;
				margin-top: -250px;
				z-index: 999;
				background: #FFFFFF;
				border-radius: 10px;
				box-shadow: 1px 1px 10px #888888;

				.popups_company {
					text-align: center;
					margin-top: 20px;
					color: #bac6d1;
				}

				.department {
					text-align: center;
					margin-top: 15px;
					color: #acb8c3;
				}

				.company_name {
					text-align: center;
					font-size: 15px;
					margin-top: 15px;
					color: #3b4f62;
				}

				.cell_phone_number {
					text-align: center;
					font-size: 20px;
					margin-top: 35px;
					color: #3b4f62;
				}

				.cell_phone {
					font-size: 15px;
					margin-top: 15px;
					color: #3b4f62;

					.avatar-uploader .el-upload {
						border: 1px dashed #d9d9d9;
						border-radius: 6px;
						cursor: pointer;
						position: relative;
						overflow: hidden;
						width: 0px;
						height: 0px;
					}

					.avatar-uploader .el-upload:hover {
						border-color: #409EFF;
					}

					.avatar-uploader /deep/.el-upload--text {
						width: 100%;
						height: 100%;
					}

					.avatar-uploader-icon {
						font-size: 28px;
						color: #8c939d;
						width: 70px;
						height: 70px;
						line-height: 70px;
						text-align: center;
					}

					.avatar {
						width: 70px;
						height: 70px;
						display: block;
					}
				}

				.cell_phones {
					text-align: center;
					font-size: 25px;
					margin-top: 15px;
					color: #3b4f62;
					font-weight: bold;
				}

				.dimission {
					width: 300px;
					margin-top: 50px;
					padding: 10px;
					font-size: 20px;
					color: #FFFFFF;
					border: 0;
					border-radius: 5px;
					background: #0CC071;
					cursor: pointer;
				}

				.cancel {
					width: 300px;
					margin-top: 20px;
					margin-left: 100px;
					padding: 10px;
					font-size: 20px;
					color: #409EFF;
					background: #FFFFFF;
					border-radius: 5px;
					border: 1px solid #409EFF;
					cursor: pointer;
				}

				.confirm {
					position: absolute;
					top: 150px;
					left: 13px;
					z-index: 9999;
					padding-left: 25px;
					background: #FFFFFF;

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
			padding: 15px;
			background-color: #ffffff;
			font-size: 12px;

			.lefbox {
				position: absolute;
				left: 0;
				top: 15px;
				width: calc(100% - 20px);
				background: #f2f2f2;
				font-size: 14px;
				margin: 0 10px;
				padding: 5px 0;
				text-indent: 10px;
				line-height: 25px;
				font-weight: 600;
				font-size: 14px;
			}

			.lecheckd {
				display: flex;
				padding-left: 60px;
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
				width: 40px;
				color: #409eff;
				border: 1px solid #409eff;
				border-radius: 3px;
				cursor: pointer;
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
	}
</style>
