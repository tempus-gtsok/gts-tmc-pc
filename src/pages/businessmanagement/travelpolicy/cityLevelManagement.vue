<template>
	<div class="domesticHotelPolicy" v-loading="loading">
		<div class="domecitys">
			<div class="domebrt" @click="cityleve(item.id)" :class="lervid == item.id ? 'domebrts' : ''" v-for="(item, index) in citypolist" :key="index">{{ item.cityLevel }}</div>
		</div>
		<div class="dometable">
			<el-table :header-cell-style="{background:'#f6f6f6',color:'#666'}" border=""  ref="multipleTable" :data="cittablelist" tooltip-effect="dark" style="width: 100%;">
				<el-table-column width="150" label="地区类别" show-overflow-tooltip>
					<template slot-scope="scope">
						{{ scope.row.cityLevel }}
					</template>
				</el-table-column>
				<el-table-column label="包含城市">
					<template slot-scope="scope">
						<div v-html="scope.row.content"></div>
					</template>
				</el-table-column>
				<el-table-column width="160px" label="操作">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="addbtns" @click="addrule">新增地区类别</div>
		</div>
		<el-dialog :visible.sync="dialogVisible" width="60%">
			<div class="folists">
				<div class="dvlef">类别名称</div>
				<div class="dvsep"><el-input v-model="cityLevel" placeholder="请输入类别名称"></el-input></div>
			</div>
			<div class="elbtnslist">
				<el-transfer
					filterable
					:filter-method="filterMethod"
					:titles="['所有城市', '已选城市']"
					filter-placeholder="请输入城市名"
					v-model="lodcitylist"
					:data="citylist"
				></el-transfer>
			</div>
			<div class="elbtnslist">
				<el-button type="primary" v-loading="loadBut" @click="okcloseplase">保 存</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			filterMethod(query, item) {
				return item.label.indexOf(query) > -1;
			},
			lervid: 0,
			citylist: [], //未选城市列表
			citypolist: [],
			lodcitylist: [], //选中的城市
			cittablelist: [],
			dialogVisible: false,
			loading: false,
			cityLevel: '', //类别名称
			natid: '', //修改id
			loadBut:false
		};
	},
	mounted() {
		this.cityleves();
	},
	methods: {
		async handleEdit(index, row) {
			//修改
			this.natid = row.id;
			let posidata = row.content;
			this.cityLevel = row.cityLevel;
			let cityli = [];
			if (row.content.length > 0) {
				cityli = row.content.split(',');
			}
			this.citylist = [];
			if (cityli[0] != "") {
				for (let k in cityli) {
					this.citylist.push({
						label: cityli[k],
						key: cityli[k]
					});
				}
			}
			this.lodcitylist = cityli;
			this.dialogVisible = true;
		},
		handleDelete(index, row) {
			//删除
			this.$confirm('此操作将删除该类别, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.loding = true;
				this.$api.business
					.delTravelCity({
						id: row.id
					})
					.then(res => {
						this.loding = false;
						if (res.code == 200) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.cityleves();
						} else {
							this.$message({
								type: 'warning',
								message: res.message
							});
						}
					})
					.catch(e => {
						this.loding = false;
						console.log('类别删除错误:', e);
					});
			});
		},
		async okcloseplase() {
			if (this.loadBut) return
			this.loadBut = true

			//新增或者修改
			if (this.cityLevel == '') {
				this.$message({
					message: '请输入类别名称',
					type: 'warning'
				});
				this.loadBut = false
			} else if (this.lodcitylist == 0) {
				this.$message({
					message: '请选择城市',
					type: 'warning'
				});
				this.loadBut = false
			} else {
				try {
					let dat = {
						id: this.natid,
						cityLevel: this.cityLevel, //类别名称
						content: this.lodcitylist.join(',')
					};
					let res = await this.$api.business.addOrUpdateTravelCity(dat);
					if (res.code == 200) {
						if (this.natid == '') {
							this.$message({
								message: '新增成功！',
								type: 'success'
							});
						} else {
							this.$message({
								message: '修改成功！',
								type: 'success'
							});
						}
						this.dialogVisible = false;
						let cont = 500
						let time = setInterval(()=>{
								cont -= 100
								if(cont == 0){
									clearInterval(time);
									this.loadBut = false
								}
						},100)
						this.cityleves();
					} else {
						this.$message({
							message: res.message,
							type: 'warning'
						});
						this.loadBut = false
					}
				} catch (e) {
					this.loadBut = false
					//TODO handle the exception
				}
			}
		},
		addrule() {
			//点击新增
			this.natid = '';
			this.cityLevel = '';
			this.lodcitylist = [];
			this.cityleves();
			this.dialogVisible = true;
		},
		async cityleves() {
			//规则查询
			this.loading = true;
			try {
				let res = await this.$api.business.travelCityRule();
				this.loading = false;
				if (res.code == 200) {
					let citys = res.data.unselectedCity.split(','); //未选城市
					this.citylist = [];
					if (citys[0] != "") {
						for (let k in citys) {
							this.citylist.push({
								label: citys[k],
								key: citys[k]
							});
						}
					}
					this.citypolist = res.data.travelCityShow; //所有类别
					this.employeeLevellist = res.data.employeeLevel;
					if (this.lervid == 0) {
						this.lervid = this.citypolist[0].id; //默认显示第一个城市等级的列表
					}
					this.cityspolist(this.lervid, this.citypolist);
				} else {
					this.$message({
						message: res.message,
						type: 'warning'
					});
				}
			} catch (e) {
				this.loading = false;
				//TODO handle the exception
			}
		},
		cityleve(id) {
			this.lervid = id;
			this.cityspolist(this.lervid, this.citypolist);
		},
		cityspolist(id, list) {
			let su = [];
			for (let k in list) {
				if (list[k].id == id) {
					su.push(list[k]);
				}
			}
			this.cittablelist = su;
		}
	}
};
</script>

<style scoped lang="less">
.domesticHotelPolicy {
	margin-top: 30px;
	width: 100%;
	display: flex;
	.domecitys {
		width: 100px;
		.domebrt {
			width: 100px;
			height: 40px;
			text-align: center;
			line-height: 40px;
			font-size: 12px;
			border-radius: 5px;
			cursor: pointer;
		}
		.domebrts {
			background-color: #409eff;
			color: #ffffff;
		}
	}
	.dometable {
		width: calc(100% - 120px);
		margin-left: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		.addbtns {
			margin: 20px 0;
			width: 160px;
			height: 30px;
			background-color: #409eff;
			color: #ffffff;
			font-size: 15px;
			text-align: center;
			line-height: 30px;
			border-radius: 3px;
			cursor: pointer;
		}
    .addbtns:hover {
      opacity: 0.8;
    }
	}
	.trstp {
		padding: 20px;
		width: calc(100% - 40px);
	}
	.folists {
		display: flex;
		align-items: center;
		justify-content: center;
		.dvlef {
			font-size: 12px;
			width: 80px;
			display: flex;
			align-items: center;
		}
		.dvsep {
			width: 160px;
			position: relative;
		}
	}
	.elbtnslist {
		width: 100%;
		margin-top: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
