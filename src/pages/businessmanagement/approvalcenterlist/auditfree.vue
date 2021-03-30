<template>
	<div class="auditfree">
		<div class="boxlist">
			<div class="box_tps">
				<div class="boxtlists">
					<p style="width: 50px;">姓名</p>
					<el-input style="width: 180px;" v-model="usernames" placeholder="免审人姓名"></el-input>
					<div class="btns" @click="searchlist">查找</div>
				</div>
				<div class="addbtns" @click="addaudit">添加免审名单</div>
			</div>
			<div class="talbs">
				<el-table :header-cell-style="{background:'#f6f6f6',color:'#666'}" border=""  v-loading="loading" :data="tablist" tooltip-effect="dark" style="width: 100%">
					<el-table-column label="序号" width="100px">
						<template slot-scope="scope">{{ scope.$index + 1 }}</template>
					</el-table-column>
					<el-table-column label="姓名" width="130px" show-overflow-tooltip>
						<template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
					<el-table-column label="本人手机" show-overflow-tooltip>
						<template slot-scope="scope">{{ scope.row.phone }}</template>
					</el-table-column>
					<el-table-column label="部门" show-overflow-tooltip>
						<template slot-scope="scope">{{ scope.row.deptName }}</template>
					</el-table-column>
					<el-table-column label="职位" show-overflow-tooltip>
						<template slot-scope="scope">{{ scope.row.jobName }}</template>
					</el-table-column>
					<el-table-column label="成本中心" show-overflow-tooltip>
						<template slot-scope="scope">{{ scope.row.costcenterName }}</template>
					</el-table-column>
					<el-table-column label="操作" width="170px">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">移除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="block" v-if="totalPatge > 1">
					<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="10" layout="prev, pager, next, jumper"
					 :total="total">
					</el-pagination>
				</div>
			</div>
		</div>
		<el-dialog :visible.sync="dialogVisible" width="70%">
			<div class="trstp">
				<div class="trslist">
					<div></div>
					<div style="display: flex;align-items: center;">
						<el-input style="width: 180px;" v-model="sekeys" placeholder="姓名/部门"></el-input>
						<div class="btns" @click="seruserlist">搜索</div>
					</div>
				</div>
				<el-table :header-cell-style="{background:'#008CCC',color:'#ffffff'}" border=""  v-loading="loadings" ref="multipleTable" :data="userlists" @selection-change="changeFun" tooltip-effect="dark"
				 style="width: 100%">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column label="姓名">
						<template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
					<el-table-column label="部门" show-overflow-tooltip>
						<template slot-scope="scope">{{ scope.row.deptName }}</template>
					</el-table-column>
					<el-table-column label="电话" show-overflow-tooltip>
						<template slot-scope="scope">{{ scope.row.phone }}</template>
					</el-table-column>
					<el-table-column label="邮箱" show-overflow-tooltip>
						<template slot-scope="scope">{{ scope.row.email }}</template>
					</el-table-column>
				</el-table>
				<div class="block" v-if="totalPatges > 1">
					<el-pagination @current-change="handleCurrentChanges" :current-page.sync="currentPage3s" :page-size="10" layout="prev, pager, next, jumper"
					 :total="totals">
					</el-pagination>
				</div>
			</div>
			<div class="elbtnslist">
				<el-button type="primary" @click="okcloseplase" v-loading="loadBut">确 定</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userlists: [], //所有用户列表
				dialogVisible: false,
				usernames: '', //免审人姓名
				tablist: [],
				sekeys: '',
				totalPatge: 0, //总共多少页
				curPages: 1, //当前第几页
				total: 0, //多少条数据
				currentPage3: 1,
				totalPatges: 0, //总共多少页
				curPagest: 1, //当前第几页
				totals: 0, //多少条数据
				currentPage3s: 1,
				loading: false,
				loadings: false,
				multipleSelection: [], //选中的出行人
				loadBut:false
			}
		},
		mounted() {
			this.searchlist()
		},
		methods: {
			handleDelete(index, row) { //移除免审
				this.loding = true;
				this.$api.business.delNoExamineStaff({
					id: row.id
				}).then((res) => {
					this.loding = false;
					if (res.code == 200) {
						this.$message({
							type: 'success',
							message: '移除成功!'
						});
						this.searchlist(); //更新
					} else {
						this.$message({
							type: 'warning',
							message: res.message
						});
					}
				}).catch((e) => {
					this.loding = false;
					console.log('移除错误:', e)
				})
			},
			async okcloseplase() {
				if (this.loadBut) return
				this.loadBut = true
				let userls = this.multipleSelection; //获取所有选中的出行人
				let ids = [];
				if (userls.length == 0) {
					this.$message({
						message: '请选择需要免审的人员',
						type: 'warning'
					})
					this.loadBut = false
					return
				}
				for (let k in userls) {
					ids.push(userls[k].id)
				}
				this.loadings = true;
				try {
					let res = await this.$api.business.addNoExamineStaff({
						ids: ids.join(',')
					})
					this.loadings = false;
					if (res.code == 200) {
						this.$message({
							message: '添加成功',
							type: 'success'
						})
						this.dialogVisible = false;
						let cont = 500
						let time = setInterval(()=>{
								cont -= 100
								if(cont == 0){
									clearInterval(time);
									this.loadBut = false
								}
						},100)
						this.searchlist();
					} else {
						this.$message({
							message: res.message,
							type: 'warning'
						})
						this.loadBut = false
					}
				} catch (e) {
					this.loadings = false;
					this.loadBut = false
					//TODO handle the exception
				}
			},
			changeFun(val) {
				this.multipleSelection = val;
			},
			addaudit() { //查询出行人
				this.dialogVisible = true;
				this.sekeys = '';
				this.serachuserlist();
			},
			handleCurrentChange(val) { //翻页
				this.curPages = val;
				this.searchlist();
			},
			handleCurrentChanges(val) { //翻页
				this.curPagest = val;
				this.serachuserlist();
			},
			seruserlist() {
				this.curPages = 1;
				this.serachuserlist();
			},
			async serachuserlist() { //获取出行人列表
				this.loadings = true;
				try {
					let res = await this.$api.business.getTravelPassengerByPage({
						pageNum: this.curPagest,
						pageSize: 10,
						key: this.sekeys,
					})
					this.loadings = false;
					if (res.code == 200) {
						this.totals = parseInt(res.data.total); //一共多少条
						this.totalPatges = res.data.total; //总共多少页
						this.userlists = res.data.list;
					} else {
						this.$message({
							message: res.message,
							type: 'warning'
						})
					}
				} catch (e) {
					this.loadings = false;
					//TODO handle the exception
				}
			},
			async searchlist() { //获取免审列表
				this.loading = true;
				try {
					let res = await this.$api.business.getNoExamineStaffByPage({
						pageNum: this.curPages,
						pageSize: 10,
						name: this.usernames
					})
					this.loading = false;
					if (res.code == 200) {
						this.total = parseInt(res.data.total); //一共多少条
						this.totalPatge = res.data.pages; //总共多少页
						this.tablist = res.data.list;
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
			}
		}
	}
</script>

<style scoped lang="less">
	.auditfree {
		width: calc(100% - 40px);
		padding: 40px 20px;
		display: flex;
		align-items: center;
		justify-content: center;

		.trslist {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20px;

			.btns {
				width: 70px;
				height: 35px;
				line-height: 35px;
				margin-left: 10px;
				cursor: pointer;
				text-align: center;
				color: #FFFFFF;
				background-color: #007AFF;
				border-radius: 3px;
			}
      .btns:hover {
        opacity: 0.8;
      }
		}

		.block {
			width: 100%;
			margin-top: 20px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.elbtnslist {
			width: 100%;
			margin-top: 20px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.boxlist {
			width: 100%;

			.box_tps {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.boxtlists {
					display: flex;
					align-items: center;
					font-size: 14px;

					.btns {
						width: 70px;
						height: 35px;
						line-height: 35px;
						margin-left: 10px;
						cursor: pointer;
						text-align: center;
						color: #FFFFFF;
						background-color: #007AFF;
						border-radius: 3px;
					}
          .btns:hover {
            opacity: 0.8;
          }
				}

				.addbtns {
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

			.talbs {
				margin: 30px;
			}
		}
	}
</style>
