<template>
	<div class="ranklist" v-loading="loading">
		<div class="tablist">
			<div class="addbtns" @click="adddept">新增职级</div>
			<el-table :header-cell-style="{background:'#f6f6f6',color:'#666'}" border=""  ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
				<el-table-column label="职级名称">
					<template slot-scope="scope">{{ scope.row.tslName }}</template>
				</el-table-column>
				<el-table-column label="职级" show-overflow-tooltip>
					<template slot-scope="scope">{{ scope.row.tslLevelCode }}</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog :title="ranktitle" :visible.sync="dialogVisible" width="30%">
			<div class="trstp">
				<div class="tr_ul">
					<div class="tr_uleft">级别名称</div>
					<div class="tr_rights">
						<el-input style="width: 200px;" v-model="rnaktname" placeholder="请输入级别名称"></el-input>
					</div>
				</div>
				<div class="tr_ul">
					<div class="tr_uleft">级别</div>
					<div class="tr_rights">
						<el-select v-model="rankstatus" style="width: 200px;" placeholder="请选择">
							<el-option v-for="items in rankstatuslist" :key="items.id" :label="items.name" :value="items.id">
							</el-option>
						</el-select>
					</div>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" v-loading="loadBut" @click="okcloseplase">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				rankids: 0,
				rankstatuslist: [],
				rangklistold: [], //复制数据
				rnaktname: '',
				rankstatus: '',
				ranktitle: '',
				loading: false,
				tableData: [],
				dialogVisible: false,
				rnakslisted: [{
					id: 1,
					name: '一级'
				}, {
					id: 2,
					name: '二级'
				}, {
					id: 3,
					name: '三级'
				}, {
					id: 4,
					name: '四级'
				}, {
					id: 5,
					name: '五级'
				}, {
					id: 6,
					name: '六级'
				}, {
					id: 7,
					name: '七级'
				}, {
					id: 8,
					name: '八级'
				}, {
					id: 9,
					name: '九级'
				}],
				loadBut:false
			}
		},
		mounted() {
			this.getStaffLevelLists(); //查询所有职级
		},
		methods: {
			adddept() { //新增
				this.rankids = 0;
				this.rankstatuslist = JSON.parse(JSON.stringify(this.rangklistold));
				this.dialogVisible = true,
				this.ranktitle = "新增级别"
				this.rnaktname = "";
				this.rankstatus = this.rankstatuslist[0].id;
			},
			async handleDelete(index, row) { //删除
				this.$confirm('此操作将删除该职级, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.loding = true;
					this.$api.business.deleteLevel({
						tslId: row.tslId
					}).then((res) => {
						this.loding = false;
						if (res.code == 200) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.getStaffLevelLists();
						} else {
							this.$message({
								type: 'warning',
								message: res.message
							});
						}
					}).catch((e) => {
						this.loding = false;
						console.log('部门删除错误:', e)
					})
				});
			},
			handleEdit(index, item) { //修改
				this.rankids = item.tslId;
				this.rankstatuslist = JSON.parse(JSON.stringify(this.rangklistold));
				this.dialogVisible = true,
					this.ranktitle = "修改级别"
				this.rnaktname = item.tslName;
				this.rankstatus = item.tslLevel;
				let su = {
					name: item.tslLevelCode,
					id: item.tslLevel
				}
				this.rankstatuslist.push(su);
				this.rankstatuslist.sort((a, b) => {
					return a.id - b.id
				}) //升序
			},
			async okcloseplase() {
				if (this.loadBut) return
				this.loadBut = true
				let tslName = this.rnaktname; //职级名称
				if (tslName == '') {
					this.$message({
						message: '请输入职级名称',
						type: 'warning'
					})
					this.loadBut = false
					return
				}
				let codes = "";
				for (let k in this.rankstatuslist) {
					if (this.rankstatus == this.rankstatuslist[k].id) {
						codes = this.rankstatuslist[k].name;
						break;
					}
				}
				this.loading = true;
				try {
					if (this.rankids == 0) { //新增
						let res = await this.$api.business.insertOrUpdateLevel({
							tslName: tslName,
							tslLevel: this.rankstatus,
							tslLevelCode: codes
						})
						this.loading = false;
						if (res.code == 200) {
							this.dialogVisible = false,
								this.$message({
									message: '新增成功',
									type: 'success'
								})
							let cont = 500
							let time = setInterval(()=>{
									cont -= 100
									if(cont == 0){
										clearInterval(time);
										this.loadBut = false
									}
							},100)

							this.getStaffLevelLists();
						} else {
							this.$message({
								message: res.message,
								type: 'warning'
							})
							this.loadBut = false
						}
					} else {
						let res = await this.$api.business.insertOrUpdateLevel({
							tslId: this.rankids,
							tslName: tslName,
							tslLevel: this.rankstatus,
							tslLevelCode: codes
						})
						this.loading = false;
						if (res.code == 200) {
							this.dialogVisible = false,
								this.$message({
									message: '修改成功',
									type: 'success'
								})
							let cont = 500
							let time = setInterval(()=>{
									cont -= 100
									if(cont == 0){
										clearInterval(time);
										this.loadBut = false
									}
							},100)
							this.getStaffLevelLists();
						} else {
							this.$message({
								message: res.message,
								type: 'warning'
							})
							this.loadBut = false
						}
					}
				} catch (e) {
					this.loading = false;
					//TODO handle the exception
				}

			},
			async getStaffLevelLists() {
				this.loading = true;
				try {
					let res = await this.$api.business.getStaffLevelList();
					this.loading = false;
					if (res.code == 200) {
						this.tableData = res.data;
						let stislist = JSON.parse(JSON.stringify(this.rnakslisted));
						for (let k in this.tableData) {
							for (let p in stislist) {
								if (this.tableData[k].tslLevel == stislist[p].id) {
									stislist.splice(p, 1);
									break;
								}
							}
						}
						this.rangklistold = stislist;
					} else {
						this.$message({
							$message: res.message,
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
	.ranklist {
		margin-top: 20px;
		width: calc(100% - 40px);
		padding: 20px;
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;

		.trstp {
			width: calc(100% - 20px);
			background: #ffffff;
			padding: 0 10px;

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

				.tr_rights {
					width: calc(100%-100px);
					display: flex;
				}
			}
		}

		.tablist {
			width: 60%;

			.addbtns {
				width: 160px;
				height: 30px;
				background-color: #409eff;
				color: #FFFFFF;
				font-size: 15px;
				text-align: center;
				line-height: 30px;
				border-radius: 3px;
				cursor: pointer;
				margin-bottom: 20px;
			}
      .addbtns:hover {
        opacity: 0.8;
      }
		}

	}
</style>
