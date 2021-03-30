<template>
	<div class="deplist" v-loading="loading">
		<div class="orgleft">
			<el-tree ref="tree" :data="deptis" node-key="id" :props="deptlist" default-expand-all :highlight-current="true"
			 :expand-on-click-node="false" @node-click="handleNodeClick">
				<span slot-scope=" { node, data }">
					<span v-if="data.id==0" class="iconfont">&#xe6b3;</span>
					        <span v-else-if="data.children&&data.children.length>0 && data.id != 0" class="iconfont" >&#xe6aa;</span>
					        <span v-else class="iconfont">&#xe606;</span>
					<span style="margin-left: 10px;">{{ node.label }}</span>
				</span>
			</el-tree>
		</div>
		<div class="orgright">
			<div v-if="orgnames !=''">
				<div class="ornames">
					{{orgnames}}
				</div>
				<div class="ortypelist">
					<div class="ortyli" @click="ortypeed(item)" :class="ortyid == item.id ? 'ortylied':''" v-for="(item,index) in ortypelist"
					 :key="index">
						{{item.name}}
					</div>
				</div>
				<div class="oradios" v-if="organops == 1">
					<div class="ordslist" v-if="!eckid" @click="raclicks(false)">
						<span class="iconfont" style="font-size: 21px;color: #CBCBCE;">&#xe80c;</span>
						<p style="color: #CBCBCE;">未启用该流程，点击启用</p>
					</div>
					<div class="ordslist" @click="raclicks(true)" v-if="eckid">
						<span class="iconfont" style="font-size: 21px;color: #409eff;">&#xe618;</span>
						<p style="color: #409eff;">已启用该流程</p>
					</div>
				</div>
				<div class="tablists" v-if="tablist.length > 0 && organops == 1">
					<el-table :header-cell-style="{background:'#f6f6f6',color:'#666'}" border=""  :data="tablist" tooltip-effect="dark" style="width: 100%">
						<el-table-column label="序号" width="100px">
							<template slot-scope="scope">{{ scope.$index + 1 }}</template>
						</el-table-column>
						<el-table-column label="流程名称" width="130px" show-overflow-tooltip>
							<template slot-scope="scope">{{ scope.row.flowName }}</template>
						</el-table-column>
						<el-table-column label="适用范围" show-overflow-tooltip>
							<template slot-scope="scope">{{ statsname(scope.row.apprvDeptFlowStaffs) }}</template>
						</el-table-column>
						<el-table-column label="操作" width="170px">
							<template slot-scope="scope">
								<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
								<el-button size="mini" v-if="scope.row.apprvDeptFlowStaffs.length > 0" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="addbtns" @click="adddept">添加特殊流程</div>
				</div>
				<div class="orgts_two" v-if="organops == 2">
					<div class="namstr">
						<div style="width: 80px;">
							流程名称：
						</div>
						<div>
							<el-input :disabled="isDefault == 1? true:false" v-model="orgnameti" placeholder="请输入流程名称"></el-input>
						</div>
					</div>
					<div class="namstr">
						<div style="width: 80px;">
							适用范围：
						</div>
						<div class="userlis" v-if="isDefault == 0">
							<div class="useps" @click="delist(index)" v-for="(item,index) in okuserlist" :key="index">
								{{item.staffName}}
								<span class="iconfont iconsde">&#xe620;</span>
							</div>
							<span @click="serachuser" class="iconfont" style="color: #409eff; cursor: pointer;">&#xe603;</span>
						</div>
						<div v-if="isDefault == 1">所有人</div>
					</div>
					<div class="namstr" style="margin-top: 50px;">
						<div style="width: 80px;">
							审批流程：
						</div>
						<div class="userlis">
							<div style="display: flex;align-items: center;height: 30px;" v-for="(item,index) in plohslist" :key="index">
								<div class="useps" @click="addlogs(false,item,index)">{{item.name}}<span @click.stop="delploh(index)" v-if="index != 0"
									 class="iconfont iconsde">&#xe620;</span></div>
								<div>-></div>
							</div>
							<div class="addulistp" @click="addlogs(true)">添加审批节点</div>
						</div>
					</div>
					<div class="btnslist">
						<el-button type="primary" @click="addsplki">保 存</el-button>
						<el-button @click="organops = 1">返 回</el-button>
					</div>
				</div>
			</div>
		</div>
		<el-dialog :visible.sync="dialogVisible" width="70%">
			<div class="trstp">
				<el-table :header-cell-style="{background:'#008CCC',color:'#ffffff'}" border=""  ref="multipleTable" :data="userlists" tooltip-effect="dark" @select="handleSelection" @select-all="handleSelectionall"
				 @selection-change="handleSelectionChange" style="width: 100%">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column label="姓名" width="100px">
						<template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
					<el-table-column label="部门" width="130px" show-overflow-tooltip>
						<template slot-scope="scope">{{ scope.row.deptName }}</template>
					</el-table-column>
					<el-table-column label="电话" show-overflow-tooltip>
						<template slot-scope="scope">{{ scope.row.phone }}</template>
					</el-table-column>
					<el-table-column label="邮箱" show-overflow-tooltip>
						<template slot-scope="scope">{{ scope.row.email }}</template>
					</el-table-column>
				</el-table>
				<div class="block" v-if="totalPatge > 1">
					<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="10" layout="prev, pager, next, jumper"
					 :total="total">
					</el-pagination>
				</div>
			</div>
			<div class="elbtnslist">
				<el-button type="primary" @click="okcloseplase">确 定</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>
			</div>
		</el-dialog>
		<el-dialog :visible.sync="dialogtws" width="70%">
			<div class="trstp">
				<div style="display: flex;align-items: center;justify-content: space-between;">
					<div>
						该节点审批模式：
						<el-radio v-model="radios" label="1">串签</el-radio>
						<el-radio v-model="radios" label="2">自选一</el-radio>
						<el-radio v-model="radios" label="3">并签ONE</el-radio>
						<el-radio v-model="radios" label="4">并签ALL</el-radio>
					</div>
					<el-button type="primary" @click="opuserlist">选择审批人</el-button>
				</div>
				<el-table :header-cell-style="{background:'#008CCC',color:'#ffffff'}" border=""  ref="multipleTable" :data="dialogtwslist" tooltip-effect="dark" style="width: 100%">
					<el-table-column label="序号">
						<template slot-scope="scope">{{ scope.$index + 1 }}</template>
					</el-table-column>
					<el-table-column label="审批人" show-overflow-tooltip>
						<template slot-scope="scope">{{ scope.row.staffName }}</template>
					</el-table-column>
					<el-table-column width="160px" label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="diadelet(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="elbtnslist">
				<el-button type="primary" @click="okdilogs">确 定</el-button>
				<el-button @click="dialogtws = false">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				ops: 0,
				isDefault: 0,
				radios: '1',
				ckuserlist: [], //勾选中的人
				dialogtwslist: [], //选择的审批人
				dialogtws: false,
				plohslist: [],
				dialogVisible: false,
				isaids: 0, //修改流程的id
				isaddlog: false, //新增 或者修改
				isloglist: {}, //修改节点的参数
				multipleSelection: [], //当前选择的人
				userlists: [],
				okuserlist: [], //适用人员列表
				totalPatge: 0, //总共多少页
				curPages: 1, //当前第几页
				total: 0, //多少条数据
				currentPage3: 1,
				orgnameti: '', //流程名称
				organops: 1,
				ortyid: 1,
				eckid: false,
				tablist: [], //审批流程
				isloginx: 0, //当前修改的第几个节点
				ortypelist: [{
					id: 1,
					name: '出差审批流程'
				}, {
					id: 3,
					name: '超标审批流程'
				}, {
					id: 4,
					name: '改签审批流程'
				}, {
					id: 5,
					name: '退票审批流程'
				}],
				ortypeid: 1,
				loading: false,
				deptis: [],
				userlist: {},
				isadd: false,
				orgnames: '', //当前点击部门名称
				deptId: 0, //当前点击的部门id
				deptlist: {
					children: 'children',
					label: 'text'
				}
			}
		},
		mounted() {
			this.searchdept();
		},
		methods: {
			async handleEdit(index, row) { //修改
				try {
					let res = await this.$api.business.deptApprvDetail({
						id: row.id
					});
					if (res.code == 200) {
						this.isaids = row.id;
						this.isadd = false; //修改
						this.isDefault = res.data.isDefault; //1为默认 0为普通
						this.orgnameti = res.data.flowName;
						this.okuserlist = res.data.apprvDeptFlowStaffs;
						let das = res.data.apprvDeptFlowNodes;
						this.plohslist = [{
							name: '开始'
						}]
						for (let k in das) {
							this.plohslist.push({
								name: '节点',
								user: das[k].apprvDeptFlowNodePersons,
								ra: das[k].nodeModel
							})
						}
						this.organops = 2;
					} else {
						this.$message({
							message: res.message,
							type: 'warning'
						})
					}
				} catch (e) {
					console.log(e)
					//TODO handle the exception
				}
			},
			handleDelete(index, row) { //删除当前流程
				this.$confirm('此操作将删除该审批流程, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.loding = true;
					this.$api.business.deleteDeptApprv({
						id: row.id
					}).then((res) => {
						this.loding = false;
						if (res.code == 200) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.searchtype(); //更新
						} else {
							this.$message({
								type: 'warning',
								message: res.message
							});
						}
					}).catch((e) => {
						this.loding = false;
						console.log('流程删除错误:', e)
					})
				});
			},
			async addsplki() { //新增修改当前流程
				let isDefault = this.isDefault;//是否默认流程
				let orgnameti = this.orgnameti; //流程名称
				let okuserlist = this.okuserlist; //适用人员
				let plohslist = this.plohslist; //审批节点
				if (orgnameti == '') {
					this.$message({
						message: '请输入流程名称',
						type: 'warning'
					})
					return
				} else if (okuserlist.length == 0 && isDefault == 0) {
					this.$message({
						message: '请选择适用人员',
						type: 'warning'
					})
					return
				} else if (plohslist.length == 1) {
					this.$message({
						message: '请选择审批节点',
						type: 'warning'
					})
					return
				}
				this.loading = true;
				try {
					let apprvDeptFlowNodes = [];
					for (let k in plohslist) {
						for (let p in plohslist[k].user) {
							plohslist[k].user[p] = {
								staffId: plohslist[k].user[p].staffId,
								staffName: plohslist[k].user[p].staffName,
								seq: plohslist[k].user[p].seq
							}
						}
					}
					for (let i = 0; i < plohslist.length; i++) {
						if (i != 0) {
							apprvDeptFlowNodes.push({
								apprvDeptFlowNodePersons: plohslist[i].user,
								nodeSeq: i,
								nodeModel: plohslist[i].ra
							})
						}
					}
					let datsli = {};
					if (this.isadd) {
						datsli = {
							apprvDeptFlowStaffs: okuserlist,
							apprvDeptFlowNodes: apprvDeptFlowNodes,
							deptId: this.deptId,
							flowName: orgnameti,
							flowType: this.ortyid
						}
					} else {
						datsli = {
							apprvDeptFlowStaffs: okuserlist,
							apprvDeptFlowNodes: apprvDeptFlowNodes,
							deptId: this.deptId,
							flowName: orgnameti,
							flowType: this.ortyid,
							id: this.isaids,
						}
					}
					let res = await this.$api.business.insertOrUpdateDeptApprv(datsli)
					if (res.code == 200) {
						if (this.isadd) {
							this.$message({
								message: "新增流程成功",
								type: 'success'
							})
						} else {
							this.$message({
								message: "修改流程成功",
								type: 'success'
							})
						}
						this.organops = 1;
						this.searchtype(); //更新
					} else {
						this.$message({
							message: res.message,
							type: 'warning'
						})
					}
					this.loading = false;
				} catch (e) {
					this.loading = false;
					//TODO handle the exception
				}
			},
			okdilogs() { //确定当前审批信息
				if (this.dialogtwslist.length > 0) {
					if (this.isaddlog) {
						this.plohslist.push({
							name: '节点',
							user: this.dialogtwslist,
							ra: this.radios
						})
					} else {
						this.plohslist[this.isloginx] = {
							name: '节点',
							user: this.dialogtwslist,
							ra: this.radios
						}
					}
					this.dialogtws = false;
				} else {
					this.$message({
						message: '请选择审批人！',
						type: 'warning'
					})
				}
			},
			diadelet(index, item) { //删除当前审批人
				this.dialogtwslist.splice(index, 1)
			},
			opuserlist() { //选择审批人
				this.searchuserlist();
				this.dialogVisible = true;
				this.ckuserlist = [];
				this.ops = 2;
			},
			addlogs(it, list, index) { //新增节点
				this.dialogtws = true;
				this.dialogtwslist = [];
				this.radios = '1';
				this.isaddlog = it; //true新增 false 修改
				if (!it) {
					this.isloginx = index;
					this.isloglist = list;
					this.radios = list.ra.toString();
					this.dialogtwslist = list.user;
					if (list.user == undefined) {
						this.dialogtwslist = [];
					} else {
						this.dialogtwslist = [...list.user];
					}
				}
			},
			delploh(index) { //删除当前节点
				this.plohslist.splice(index, 1);
			},
			serachuser() { //查询适用人员
				this.searchuserlist();
				this.dialogVisible = true;
				this.ckuserlist = [];
				this.ops = 1;
			},
			async handleSelection(val, row) { //单选
				let that = this;
				let selected = val.length && val.indexOf(row) !== -1;
				if (selected) { // true就是选中，0或者false是取消选中
					if (that.ops == 1) {
						let dat = {};
						if (that.isadd) {
							dat = {
								staffId: row.userId,
								flowType: that.ortyid,
								deptId: that.deptId
							}
						} else {
							dat = {
								staffId: row.userId,
								flowType: that.ortyid,
								deptId: that.deptId,
								id: that.isaids,
							}
						}
						let res = await that.$api.business.staffJudgeDeptApprv(dat);
						if (res.code == 200) {
							if (res.data == true) {
								that.$message({
									message: row.name + '已存在其他审批配置中',
									type: 'warning'
								})
								that.$refs.multipleTable.toggleRowSelection(row, false);
							} else { //把当前用户信息 添加到用户列表中
								that.ckuserlist.push(row)
							}
						}
					} else {
						this.ckuserlist.push(row)
					}
				} else { //去除勾的时候 在用户列表中移除
					let ins = this.ckuserlist.indexOf(row);
					this.ckuserlist.splice(ins, 1);
				}
			},
			handleSelectionall(vals) { //点击全选时触发
				let that = this;
				let sit = true;
				if(that.ops == 0 && that.ckuserlist.length == that.userlists.length){
					sit = false;
					that.ckuserlist = [];
				} else if(that.ops == 1 && that.ckuserlist.length > 0){
					sit = false;
					that.ckuserlist = [];
				}
				if (that.userlists.length > 0) {
					for (let k in that.userlists) {
						if(that.ckuserlist.indexOf(that.userlists[k]) == -1){
							if (that.ops == 1) {
								if(sit == false){
									that.$refs.multipleTable.toggleRowSelection(that.userlists[k], false);
								} else {
									let dat = {};
									if (that.isadd) {
										dat = {
											staffId: that.userlists[k].userId,
											flowType: that.ortyid,
											deptId: that.deptId
										}
									} else {
										dat = {
											staffId: that.userlists[k].userId,
											flowType: that.ortyid,
											deptId: that.deptId,
											id: that.isaids,
										}
									}
									that.$api.business.staffJudgeDeptApprv(dat).then((res) => {
										if (res.code == 200) {
											if (res.data == true) {
												that.$message({
													message: that.userlists[k].name + '已存在其他审批配置中',
													type: 'warning'
												})
												that.$refs.multipleTable.toggleRowSelection(that.userlists[k], false);
											} else { //把当前用户信息 添加到用户列表中
												that.$refs.multipleTable.toggleRowSelection(that.userlists[k], true);
												that.ckuserlist.push(that.userlists[k]);
											}
										}
									}).catch((err) => {
										console.log(err)
									})
								}
							} else { //审批人的时候点击全选
								if(sit == false){
									that.$refs.multipleTable.toggleRowSelection(that.userlists[k], false);
								} else {
									that.$refs.multipleTable.toggleRowSelection(that.userlists[k], true);
									that.ckuserlist.push(that.userlists[k])
								}
							}
						}
					}
				}
				if (that.multipleSelection.length == 0 && that.ops != 1) { //审批人的时候取消全选
					for (let p = that.ckuserlist.length - 1; p >= 0; p--) {
						let fins = that.userlists.find((v) => {
							return v.id == that.ckuserlist[p].id;
						});
						if (fins != undefined) {
							that.ckuserlist.splice(p, 1);
						}
					}
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			adddept() { //新增当前部门 审批流程
				this.organops = 2;
				this.isadd = true; //新增
				this.isDefault = 0;
				this.orgnameti = "";
				this.okuserlist = [];
				this.plohslist = [{
					name: '开始'
				}]
			},
			okcloseplase() { //确定当前适用人员
				if (this.ops == 1) { //适用人员
					for (let p in this.ckuserlist) {
						let fins = this.okuserlist.find((v) => {
							return v.staffId == this.ckuserlist[p].userId;
						});
						if (fins == undefined) {
							this.okuserlist.push({
								staffId: this.ckuserlist[p].userId,
								staffName: this.ckuserlist[p].name
							})
						}
					}
				} else { //审批人员
					for (let p in this.ckuserlist) {
						let fins = this.dialogtwslist.find((v) => {
							return v.staffId == this.ckuserlist[p].userId;
						});
						if (fins == undefined) {
							this.dialogtwslist.push({
								staffId: this.ckuserlist[p].userId,
								staffName: this.ckuserlist[p].name,
								seq: this.dialogtwslist.length + 1
							})
						}
					}
				}
				this.dialogVisible = false;
				this.ckuserlist = [];
			},
			delist(index) { //删除当前适用人员
				this.okuserlist.splice(index, 1)
			},
			async searchuserlist() {
				try {
					let res = await this.$api.business.getCustomerUserListForPC({
						"pageVO": {
							"curPage": this.curPages,
							"rowNum": 10
						},
						"passenger": {}
					});
					if (res.code == 200) {
						this.total = res.data.records; //一共多少条
						this.totalPatge = res.data.total; //总共多少页
						this.userlists = res.data.rows;
						this.$nextTick(() => {
							this.userlists.forEach(row => {
								for (let k in this.ckuserlist) {
									if (this.ckuserlist[k].id == row.id) { //翻页时默认勾选 选择的用户
										this.$refs.multipleTable.toggleRowSelection(row, true);
									}
								}
							})
						})
					} else {
						this.$message({
							message: res.message,
							type: 'warning'
						})
					}
				} catch (e) {
					console.log(e)
					//TODO handle the exception
				}
			},
			handleCurrentChange(val) { //翻页
				this.curPages = val;
				this.searchuserlist();
			},
			async raclicks(it) { //启用会关闭当前部门  审批流程
				let ins = 0;
				if (it) {
					ins = 0;
				} else {
					ins = 1;
				}
				this.loading = true;
				try {
					let res = await this.$api.business.switchFlowsDeptApprv({
						on: ins,
						where: {
							flowType: this.ortyid,
							deptId: this.deptId
						}
					})
					this.loading = false;
					if (res.code == 200) {
						if (ins == 1) {
							this.eckid = true;
						} else {
							this.eckid = false;
						}
						this.searchtype();
					} else {
						this.$message({
							message: res.message,
							type: 'warning'
						})
					}
				} catch (e) {
					this.loading = false;
					//TODO handle the exception
				}
			},
			statsname(data) {
				if (data.length == 0) {
					return '所有人'
				} else {
					let su = []
					for (let k in data) {
						su.push(data[k].staffName);
					}
					return su.join(',')
				}
			},
			ortypeed(item) { //选择审批类型
				this.ortyid = item.id;
				this.searchtype();
			},
			async searchtype() { //查询当前部门审批流程
				this.loading = true;
				try {
					this.organops = 1
					let res = await this.$api.business.deptApprvlist({
						flowType: this.ortyid,
						deptId: this.deptId
					})
					if (res.code == 200) {
						if (res.data.length == 0 || res.data[0].status == 0) {
							this.eckid = false;
							this.tablist = [];
						} else {
							this.eckid = true;
							this.tablist = res.data;
						}
					} else {
						this.$meesage({
							message: res.message,
							type: 'warning'
						})
					}
					this.loading = false;
				} catch (e) {
					this.loading = false;
					//TODO handle the exception
				}
			},
			handleNodeClick(data) {
				if (data.id == 0) {
					this.$message({
						message: '该层不能设置',
						type: 'warning'
					})
					return
				} else {
					this.orgnames = data.text;
					this.deptId = data.id;
					this.searchtype();
				}
			},
			async searchdept() { //查询所有部门
				this.loading = true;
				try {
					if (JSON.stringify(this.userlist) == '{}') {
						let useres = await this.$api.mymessage.username();
						if (useres.code == 200) {
							this.userlist = useres.data
						} else {
							this.$message({
								message: useres.message,
								type: 'warning'
							})
							return
						}
					}
					let res = await this.$api.business.getDeptList();
					this.loading = false;
					if (res.code == 200) {
						this.deptis = [{
							id: 0,
							text: this.userlist.user.customerName,
							children: res.data
						}]
						if(res.data.length > 0){
							this.orgnames = res.data[0].text;
							this.deptId =  res.data[0].id;
							this.searchtype();
						}
						
					}
				} catch (e) {
					console.log(e)
					this.loading = false;
					//TODO handle the exception
				}
			},
		}
	}
</script>

<style scoped lang="less">
	.deplist {
		width: 100%;
		margin-top: 20px;
		padding-top: 10px;
		display: flex;
		background-color: #F2F6FB;

		.elbtnslist {
			width: 100%;
			margin-top: 20px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.orgleft {
			width: calc(25% - 20px);
			background-color: #FFFFFF;
			display: flex;
			padding: 20px 0 0 20px;
			border-radius: 6px;
			overflow-x: auto;
			font-size: 13px;
		}

		.orgright {
			width: calc(75% - 30px);
			margin-left: 10px;
			padding: 10px;
			border-radius: 6px;
			background-color: #FFFFFF;

			.ornames {
				text-indent: 20px;
				line-height: 40px;
				font-size: 14px;
				border-bottom: 1px solid #83807B;
			}

			.ortypelist {
				width: 100%;
				height: 50px;
				display: flex;
				align-items: center;

				.ortyli {
					width: 100px;
					text-align: center;
					margin: 0 10px;
					height: 30px;
					line-height: 30px;
					font-size: 14px;
					color: #CBCBCE;
					cursor: pointer;
					border-bottom: 3px solid #CBCBCE;
				}
				.ortyli:hover{
					color: #409eff;
					border-bottom: 3px solid #409eff;
				}
				.ortylied {
					color: #409eff;
					border-bottom: 3px solid #409eff;
				}
			}

			.oradios {
				margin-top: 20px;
				margin-left: 10px;
				cursor: pointer;

				.ordslist {
					display: flex;
					height: 30px;
					align-items: center;
					font-size: 14px;
				}
			}

			.tablists {
				margin: 10px 0 0 10px;

				.addbtns {
					margin-top: 20px;
					width: 160px;
					height: 30px;
					background-color: #409eff;
					color: #FFFFFF;
					font-size: 14px;
					text-align: center;
					line-height: 30px;
					border-radius: 3px;
					cursor: pointer;
				}
        .addbtns:hover {
          opacity: 0.8;
        }
			}

			.orgts_two {
				margin: 20px 0 0 10px;
				font-size: 14px;

				.namstr {
					display: flex;
					margin-bottom: 20px;
					align-items: center;

					.userlis {
						display: flex;
						align-items: center;
						flex-wrap: wrap;

						.addulistp {
							margin-left: 10px;
							padding: 0 12px;
							font-size: 12px;
							cursor: pointer;
							line-height: 30px;
							border-radius: 3px;
							color: #CBCBCE;
							border: 1px solid #CBCBCE;
						}

						.useps {
							padding: 0 8px;
							font-size: 12px;
							cursor: pointer;
							margin: 5px 10px 5px 0;
							line-height: 30px;
							border: 1px solid #E0DEDB;

							.iconsde {
								font-size: 12px;
								color: #9A9791;
								margin-left: 3px;
							}
						}
					}
				}

				.btnslist {
					margin-top: 20px;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}

		.trstp {
			width: calc(100% - 20px);
			background: #ffffff;
			padding: 0 10px;

			.block {
				width: 100%;
				margin-top: 20px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
