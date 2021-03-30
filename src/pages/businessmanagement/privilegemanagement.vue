<template>
	<div class="employ">
		<div class="empids">
			<div class="emptops"><div class="addempts" v-if="rotes('tms:aut:add')" @click="empadd('add')">新增</div></div>
			<el-table :header-cell-style="{background:'#f6f6f6',color:'#666'}" border=""  ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
				<el-table-column width="120" label="角色ID">
					<template slot-scope="scope">
						{{ scope.row.id }}
					</template>
				</el-table-column>
				<el-table-column label="角色名称" show-overflow-tooltip>
					<template slot-scope="scope">
						{{ scope.row.name }}
					</template>
				</el-table-column>
				<el-table-column label="英文名称" show-overflow-tooltip>
					<template slot-scope="scope">
						{{ scope.row.code }}
					</template>
				</el-table-column>
				<el-table-column label="备注" show-overflow-tooltip>
					<template slot-scope="scope">
						{{ scope.row.remark }}
					</template>
				</el-table-column>
				<el-table-column label="是否默认角色">
					<template slot-scope="scope">
						{{ scope.row.dfFlag }}
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" v-if="rotes('tms:aut:modify')" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-dialog :title="titles" :visible.sync="priveleadd">
				<div class="privepks">
					<div class="privleft">
						<div class="folists">
							<div class="dvlef">角色中文名称:</div>
							<div class="dvsep"><el-input v-model="zname" placeholder="请输入中文名称"></el-input></div>
						</div>
						<div class="folists">
							<div class="dvlef">角色英文名称:</div>
							<div class="dvsep"><el-input v-model="ename" placeholder="请输入英文名称"></el-input></div>
						</div>
						<div class="folists">
							<div class="dvlef">备注</div>
							<div class="dvsep"><el-input v-model="marks" placeholder="请输入备注"></el-input></div>
						</div>
						<div class="folists">
							<div class="dvlef">是否默认角色</div>
							<div class="dvsep">
								<el-radio v-model="radios" label="1">是</el-radio>
								<el-radio v-model="radios" label="0">否</el-radio>
							</div>
						</div>
					</div>
					<div class="privright">
						<el-tree
							ref="tree"
							:data="rolelist"
							show-checkbox
							node-key="id"
							:props="defaultProps"
							:default-checked-keys="checksrls"
							@check-change="handleCheckChange"
						></el-tree>
					</div>
				</div>
				<div class="btnclas">
					<div class="addempts" v-loading="loadBut" element-loading-spinner="el-icon-loading" @click="addrole" v-if="this.seli == -1" >新增角色</div>
					<div class="addempts" v-loading="loadBut" @click="addrole" v-if="this.seli != -1">修改角色</div>
          <el-button plain @click="retuns" class="rsblck">返回</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			titles:"新增角色",
			radios: '0',
			checksrls: [], //默认选中的权限
			updat: {}, //当前点击的角色信息
			checkroles: [],
			zname: '',
			ename: '',
			marks: '',
			priveleadd: false,
			tableData: [],
			seli: -1, //-1为新增 其他为修改
			totalPatge: 0, //总共多少页
			curPages: 1, //当前第几页
			total: 0, //多少条数据
			currentPage3: 1,
			rolelist: [], //所有权限
			seli: -1, //当前角色权限 新增为-1
			defaultProps: {
				children: 'childPermissions',
				label: 'functionName'
			},
			loadBut:false
		};
	},
	mounted() {
		this.searchuser();
	},
	methods: {
		retuns() {
			this.priveleadd = false;
		},
		empadd(isl) {
			this.checksrls = [];
			this.zname = '';
			this.ename = '';
			this.marks = '';
			this.titles = "新增角色";
			this.radios = '0';
			if (isl != 'add') {
				this.seli = isl; //修改
			} else {
				this.seli = -1; //新增
			}
			this.serachlist();
		},

		handleCheckChange() {
			//获取被选中的值
			let res = this.$refs.tree.getCheckedNodes();
			let arr = [];
			res.forEach(item => {
				arr.push(item.id);
			});
			this.checkroles = arr;
		},
		async serachlist() {
			try {
				let res = await this.$api.business.getPermission({ roleId: this.seli });
				if (res.code == 200) {
					this.rolelist = res.data.list; //获取所有权限
					this.checksrls = [];
					if (this.seli != -1) {
						this.zname = this.updat.name;
						this.ename = this.updat.code;
						this.marks = this.updat.remark;
						if (this.updat.dfFlag == '否') {
							this.radios = '0';
						} else {
							this.radios = '1';
						}
						this.checksrls = res.data.rolePermissionIds; //获取已拥有权限
					}
					this.priveleadd = true;
				} else {
					this.$message({
						message: res.message,
						type: 'warning'
					});
				}
			} catch (e) {
				console.log(e);
			}
		},
		async addrole() {
			if (this.loadBut) return
			this.loadBut = true
			//新增 修改
			let zname = this.zname;
			let ename = this.ename;
			let marks = this.marks;
			if (zname == '' || ename == '') {
				this.$message({
					message: '角色名称不能为空！',
					type: 'warning'
				});
				this.loadBut = false
				return;
			}
			let dat = {};
			if (this.seli == -1) {
				dat = {
					id: '',
					name: zname,
					dfFlag: this.radios,
					code: ename,
					remark: marks,
					permissionIds: this.checkroles.join(',')
				};
			} else {
				dat = {
					id: this.seli,
					name: zname,
					dfFlag: this.radios,
					code: ename,
					remark: marks,
					permissionIds: this.checkroles.join(',')
				};
			}
			try {
				let res = await this.$api.business.addOrUpdateRole(dat);
				if (res.code == 200) {
					if (this.seli == -1) {
						this.priveleadd = false
						this.$message({
							message: '新增成功！',
							type: 'success'
						});						
					} else {
						this.priveleadd = false
						this.$message({
							message: '修改成功！',
							type: 'success'
						});
					}					
					this.searchuser();
				} else {
					this.$message({
						message: res.message,
						type: 'warning'
					});
				
				}
				let cont = 500
				let time = setInterval(()=>{
						cont -= 100
						if(cont == 0){
							clearInterval(time);
							this.loadBut = false
						}
				},100)
			} catch (e) {
				console.log(e);
				this.loadBut = false
				//TODO handle the exception
			}
		},
		handleCurrentChange(val) {
			//翻页
			this.curPages = val;
			this.searchuser();
		},
		handleEdit(index, row) {
			//修改
			this.updat = row;
			this.empadd(row.id);
			this.titles = "编辑角色";
		},
		async handleDelete(index, row) {
			//删除
			this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.loding = true;
				this.$api.business
					.deleteRole({
						id: row.id
					})
					.then(res => {
						this.loding = false;
						if (res.code == 200) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.searchuser();
						} else {
							this.$message({
								type: 'warning',
								message: res.message
							});
						}
					})
					.catch(e => {
						this.loding = false;
						console.log('同事删除错误:', e);
					});
			});
		},
		async searchuser() {
			//查询所有角色
			try {
				let res = await this.$api.business.getRoleList({
					pageVO: {
						curPage: this.curPages,
						rowNum: 10
					},
					passenger: {}
				});
				if (res.code == 200) {
					this.tableData = res.data;
				} else {
					this.$message({
						message: res.message,
						type: 'warning'
					});
				}
			} catch (e) {
				console.log(e);
				//TODO handle the exception
			}
		}
	}
};
</script>

<style scoped lang="less">
.employ {
	margin-top: 20px;
	width: calc(100% - 40px);
	padding: 20px;
	background-color: #ffffff;
	.empids {
		width: 100%;
		.privepks {
			width: calc(100% - 40px);
			padding: 20px;
			height: 400px;
			overflow-x: auto;
			display: flex;
			.privleft {
				flex: 1;
				.folists {
					display: flex;
					position: relative;
					margin-bottom: 20px;
					.closx {
						position: absolute;
						cursor: pointer;
						right: -20px;
						top: 10px;
					}
					.dvlef {
						font-size: 12px;
						width: 100px;
						display: flex;
						align-items: center;
						p {
							color: red;
							font-size: 16px;
						}
					}
					.dvsep {
						width: 180px;
						display: flex;
						justify-content: center;
					}
				}
			}
			.privright {
				flex: 1;
			}
		}
		.btnclas {
			display: flex;
			align-items: center;
			justify-content: center;
			.addempts {
				width: 100px;
				border-radius: 5px;
				font-size: 14px;
				cursor: pointer;
				text-align: center;
				line-height: 40px;
				background-color: #007aff;
				color: #ffffff;
			}

      .addempts:hover {
        opacity: 0.8;
      }

			.rsblck {
				width: 100px;
				font-size: 14px;
				margin: 0 10px;
			}
		}
		.emptops {
			width: 100%;
			padding: 10px 0;
			.addempts {
				width: 100px;
				border-radius: 5px;
				font-size: 14px;
				cursor: pointer;
				text-align: center;
				line-height: 40px;
				background-color: #007aff;
				color: #ffffff;
			}
      .addempts:hover {
        opacity:0.8;
      }
		}
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
