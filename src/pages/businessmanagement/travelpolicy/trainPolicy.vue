<template>
	<div class="nativelist" v-loading="loading">
		<div class="addbtns" @click="addrule">添加国内火车政策</div>
		<el-table :header-cell-style="{background:'#f6f6f6',color:'#666'}" border="" ref="multipleTable" :data="tablelist"
		 tooltip-effect="dark" style="width: 100%;margin-top: 20px;">
			<el-table-column width="100" label="级别名称">
				<template slot-scope="scope">
					{{ scope.row.tslName }}
				</template>
			</el-table-column>
			<el-table-column label="级别" width="100" show-overflow-tooltip>
				<template slot-scope="scope">
					{{ scope.row.tslLevelCode }}
				</template>
			</el-table-column>
			<el-table-column label="政策内容" show-overflow-tooltip>
				<template slot-scope="scope">
					<div v-html="scope.row.ruleContent"></div>
				</template>
			</el-table-column>
			<el-table-column width="160px" label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :visible.sync="dialogVisible" width="70%">
			<div class="trstp">
				<div class="trstps">
					<div class="trleft">
						<div class="trnames">级别名称</div>
						<div class="trrings">
							<el-radio v-for="(item, index) in employeeLevellist" :key="index" v-model="employeeLevel" :label="item.tslId">{{ item.tslName }}</el-radio>
						</div>
					</div>
					<div class="trright"></div>
				</div>
				<div class="trstps">
					<div class="trleft">
						<div class="trnames">允许预订等级<span>*</span></div>
						<div class="trring">
							<el-checkbox-group v-model="seatLimit">
								<el-checkbox v-for="item in seatLimitlist" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
							</el-checkbox-group>
						</div>
					</div>
					<div class="trright">
						<div class="trnames">管控规则</div>
						<div class="trring">
							<el-select v-model="seatLimitis" style="width: 150px;" placeholder="请选择" :title="seatLimitisName">
								<el-option v-for="items in controlrules" :key="items.id" :label="items.name" :value="items.id"></el-option>
							</el-select>
						</div>
					</div>
				</div>
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
				controlrules: [{
						id: 1,
						name: '只记录不提示'
					},
					{
						id: 2,
						name: '提示超标不必选择原因'
					},
					{
						id: 3,
						name: '提示超标必选原因'
					},
					{
						id: 4,
						name: '不可预订'
					},
					{
						id: 5,
						name: '提示超标再次审批'
					}
				], //普通管控规则
				dialogVisible: false,
				tablelist: [], //查询数据
				loading: false,
				seatLimit: [],
				seatLimitis: 1,
				seatLimitlist: [{
					id: 1,
					name: '商务座'
				}, {
					id: 2,
					name: '特等座'
				}, {
					id: 3,
					name: '一等座'
				}, {
					id: 4,
					name: '二等座'
				}, {
					id: 5,
					name: '动卧'
				}, {
					id: 6,
					name: '高级软卧'
				}, {
					id: 7,
					name: '软卧'
				}, {
					id: 8,
					name: '硬卧'
				}, {
					id: 9,
					name: '软座'
				}, {
					id: 10,
					name: '硬座'
				}, {
					id: 11,
					name: '无座'
				}, ],
				employeeLevellist: [], //级别列表
				employeeLevel: 31, //当前选择级别
				natid: '', //修改的id
		seatLimitisName: '',
			loadBut:false
			};
		},
		mounted() {
			this.searchtab();
		},
		methods: {
			addrule() {
				//点击新增政策
				this.employeeLevel = this.$options.data().employeeLevel;
				this.seatLimitis = this.$options.data().seatLimitis;
				this.seatLimit = this.$options.data().seatLimit;
				this.natid = '';
				this.dialogVisible = true;
			},
			async handleEdit(index, row) { //修改
				this.loading = true;
				try {
					this.natid = row.id;
					let res = await this.$api.business.getNativeTrainRule({
						id: row.id
					})
					if (res.code == 200) {
						let dast = res.data;
						let posidata = [];
						let posolds = dast.seatLimit.split(',');
						for (let k in posolds) {
							posidata.push(parseInt(posolds[k]))
						}
						this.employeeLevel = parseInt(dast.employeeLevel);
						this.seatLimit = posidata;
						this.seatLimitis = dast.seatLimitRules;
						this.dialogVisible = true;
						this.controlrulesMethod();
					} else {
						this.$message({
							message: res.message,
							type: "warning"
						})
					}
					this.loading = false;
				} catch (e) {
					this.loading = false;
					//TODO handle the exception
				}
			},
      controlrulesMethod(){
			  let cont = this.controlrules;
			  let seatLimitis = this.seatLimitis;
			  for (let index in cont){
			    if (cont[index].id == seatLimitis){
			      this.seatLimitisName = cont[index].name;
          }
        }
      },
			handleDelete(index, row) { //删除
				this.$confirm('此操作将删除该政策, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.loding = true;
					this.$api.business.delNativeTrainRule({
						id: row.id
					}).then((res) => {
						this.loding = false;
						if (res.code == 200) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.searchtab();
						} else {
							this.$message({
								type: 'warning',
								message: res.message
							});
						}
					}).catch((e) => {
						this.loding = false;
						console.log('政策删除错误:', e)
					})
				});
			},
			async okcloseplase() {
			if (this.loadBut) return
			this.loadBut = true
				if (this.seatLimit.length == 0) {
					this.$message({
						message: '请选择预定等级！',
						type: 'warning'
					})
					this.loadBut = false
				} else {
					let dat = {
						id: this.natid,
						employeeLevel: [this.employeeLevel],
						seatLimit: this.seatLimit,
						seatLimitRules: this.seatLimitis
					}
					try {
						let res = await this.$api.business.addOrUpdateNativeTrainRule(dat);
						if (res.code == 200) {
							if (this.natid != "") {
								this.$message({
									message: '修改成功！',
									type: 'success'
								})
							} else {
								this.$message({
									message: '新增成功！',
									type: 'success'
								})
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
							this.searchtab();
						} else {
							this.$message({
								message: res.message,
								type: 'warning'
							})
							this.loadBut = false
						}
					} catch (e) {
						console.log(e)
						this.loadBut = false
						//TODO handle the exception
					}
				}
			},
			async searchtab() {
				//查询国内机票政策
				this.loading = true;
				try {
					let res = await this.$api.business.nativeTrainRule();
					this.loading = false;
					if (res.code == 200) {
						let das = res.data;
						this.tablelist = das.ticketRuleShow;
						this.employeeLevellist = das.employeeLevel; //级别
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
			}
		}
	};
</script>

<style scoped lang="less">
	.nativelist {
		margin-top: 30px;
		width: 100%;
		padding-bottom: 20px;

		.addbtns {
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

		.trstp {
			padding: 20px;
			width: calc(100% - 40px);

			.trstps {
				margin-top: 10px;
				width: 100%;
				display: flex;

				.trleft {
					width: 50%;
					display: flex;
					align-items: center;

					.trnames {
						width: 33%;

						span {
							color: red;
						}
					}

					.trring {
						width: 67%;
					}

					.trrings {
						width: 67%;
					}
				}

				.trright {
					width: 50%;
					display: flex;
					align-items: center;
					margin-left: 30px;
					.trnames {
						width: 33%;
					}

					.trring {
						width: 67%;
					}
				}
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
