<template>
	<div class="nativelist" v-loading="loading">
		<div class="addbtns" @click="addrule">添加国内机票政策</div>
		<el-table :header-cell-style="{background:'#f6f6f6',color:'#666'}" border=""  ref="multipleTable" :data="tablelist" tooltip-effect="dark" style="width: 100%;margin-top: 20px;">
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
		<el-dialog :visible.sync="dialogVisible" width="60%">
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
						<div class="trnames">提前预定的天数</div>
						<div class="trring">
							<el-select v-model="reserve" style="width: 140px;" placeholder="请选择">
								<el-option v-for="items in reservelist" :key="items.id" :label="items.name" :value="items.id"></el-option>
							</el-select>
						</div>
					</div>
					<div class="trright">
						<div class="trnames">管控规则</div>
						<div class="trring">
							<el-select v-model="reserveis" style="width: 140px;" placeholder="请选择" :title="controlrulesName.reserveisName">
								<el-option v-for="items in controlrules" :key="items.id" :label="items.name" :value="items.id"></el-option>
							</el-select>
						</div>
					</div>
				</div>
				<div class="trstps">
					<div class="trleft">
						<div class="trnames">低价限制时间</div>
						<div class="trring">
							<el-select v-model="lowLimit" style="width: 140px;" placeholder="请选择">
								<el-option v-for="items in lowLimitlist" :key="items.id" :label="items.name" :value="items.id"></el-option>
							</el-select>
						</div>
					</div>
					<div class="trright">
						<div class="trnames">管控规则</div>
						<div class="trring">
							<el-select v-model="lowLimitis" style="width: 140px;" placeholder="请选择" :title="controlrulesName.lowLimitisName">
								<el-option v-for="items in controlrules" :key="items.id" :label="items.name" :value="items.id"></el-option>
							</el-select>
						</div>
					</div>
				</div>
				<div class="trstps">
					<div class="trleft">
						<div class="trnames">高价限制<span>*</span></div>
						<div class="trring">
							<el-input style="width: 140px;" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="6" v-model="highLimit"
							 placeholder="0"></el-input>
						</div>
					</div>
					<div class="trright">
						<div class="trnames">管控规则</div>
						<div class="trring">
							<el-select v-model="highLimitis" style="width: 140px;" placeholder="请选择" :title="controlrulesName.highLimitisName">
								<el-option v-for="items in controlrules" :key="items.id" :label="items.name" :value="items.id"></el-option>
							</el-select>
						</div>
					</div>
				</div>
				<div class="trstps">
					<div class="trleft">
						<div class="trnames">舱位管控<span>*</span></div>
						<div class="trring">
							<el-checkbox-group v-model="positionLimit">
								<el-checkbox v-for="item in positionLimitlist" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
							</el-checkbox-group>
						</div>
					</div>
					<div class="trright">
						<div class="trnames">管控规则</div>
						<div class="trring">
							<el-select v-model="positionLimitis" style="width: 140px;" placeholder="请选择" :title="controlrulesName.positionLimitisName">
								<el-option v-for="items in controlrules" :key="items.id" :label="items.name" :value="items.id"></el-option>
							</el-select>
						</div>
					</div>
				</div>
				<div class="trstps">
					<div class="trleft">
						<div class="trnames">折扣限制<span>*</span></div>
						<div class="trring">
							<el-input style="width: 140px;" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="6" v-model="discountlimit"
							 placeholder="0"></el-input>
						</div>
					</div>
					<div class="trright">
						<div class="trnames">管控规则</div>
						<div class="trring">
							<el-select v-model="discountlimitis" style="width: 140px;" placeholder="请选择" :title="controlrulesName.discountlimitisName">
								<el-option v-for="items in controlrules" :key="items.id" :label="items.name" :value="items.id"></el-option>
							</el-select>
						</div>
					</div>
				</div>
				<div class="trstps">
					<div class="trleft">
						<div class="trnames">同行人数限制</div>
						<div class="trring">
							<el-select v-model="numberof" style="width: 140px;" placeholder="请选择">
								<el-option v-for="items in numberoflist" :key="items" :label="items" :value="items"></el-option>
							</el-select>
						</div>
					</div>
					<div class="trright">
						<div class="trnames">管控规则</div>
						<div class="trring">
							<el-select v-model="numberofis" style="width: 140px;" placeholder="请选择" :title="controlrulesName.numberofisName">
								<el-option v-for="items in controlrules" :key="items.id" :label="items.name" :value="items.id"></el-option>
							</el-select>
						</div>
					</div>
				</div>
				<div class="trstps">
					<div class="trleft">
						<div class="trnames">限定协议航班</div>
						<div class="trring">
							<el-select v-model="agreementFlightLimit" style="width: 140px;" placeholder="请选择">
								<el-option v-for="items in agreementFlightLimitlist" :key="items.id" :label="items.name" :value="items.id"></el-option>
							</el-select>
						</div>
					</div>
					<div class="trright">
						<div class="trnames">管控规则</div>
						<div class="trring">
							<el-select v-model="agreementFlightLimitis" style="width: 140px;" placeholder="请选择" :title="controlrulesName.agreementFlightLimitisName">
								<el-option v-for="items in controlrules" :key="items.id" :label="items.name" :value="items.id"></el-option>
							</el-select>
						</div>
					</div>
				</div>
				<div class="trstps">
					<div class="trleft">
						<div class="trnames">当天重复预定</div>
						<div class="trring">
							<el-select v-model="repeatBookingLimit" style="width: 140px;" placeholder="请选择">
								<el-option v-for="items in repeatBookingLimitlist" :key="items.id" :label="items.name" :value="items.id"></el-option>
							</el-select>
						</div>
					</div>
					<div class="trright">
						<div class="trnames">管控规则</div>
						<div class="trring">
							<el-select v-model="repeatBookingLimitis" style="width: 140px;" placeholder="请选择" :title="controlrulesName.repeatBookingLimitisName">
								<el-option v-for="items in controlrulevs" :key="items.id" :label="items.name" :value="items.id"></el-option>
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
	let isnums = /^[0-9]+$/;
	export default {
		data() {
			return {
				positionLimitlist: [{
					id: 1,
					name: '豪华头等舱'
				}, {
					id: 2,
					name: '头等舱'
				}, {
					id: 3,
					name: '公务舱'
				}, {
					id: 4,
					name: '经济舱'
				}, {
					id: 5,
					name: '超值经济舱'
				}],
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
        controlrulesName:[{
          reserveisName: '',
          lowLimitisName: '',
          highLimitisName: '',
          positionLimitisName: '',
          discountlimitisName: '',
          numberofisName: '',
          agreementFlightLimitisName: '',
          repeatBookingLimitisName: ''
        }],
				controlrulevs: [{
						id: 7,
						name: '不管控'
					},
					{
						id: 8,
						name: '提示重复但不限定预定'
					},
					{
						id: 9,
						name: '提示且不可预订'
					}
				], //重复预定管控规则
				dialogVisible: false,
				tablelist: [], //查询数据
				repeatBookingLimit: 0, //当天重复预定
				repeatBookingLimitlist: [], //当天重复预定列表数据
				repeatBookingLimitis: 7, //当然重复预定管控
				agreementFlightLimit: 0, //限定协议航班
				agreementFlightLimitlist: [{
					id: 0,
					name: '否'
				}, {
					id: 1,
					name: '是'
				}],
				agreementFlightLimitis: 1, //限定协议航班管控
				numberof: 1, //同行人数限制
				numberoflist: [], //同行人数限制列表数据
				numberofis: 1, //同行人数管控
				positionLimit: [], //舱位限制
				positionLimitis: 1, //舱位管控
				discountlimit: 1, //折扣限制
				discountlimitis: 1, //折扣管控
				highLimit: 0, //高价限制
				highLimitis: 1, //高价管控
				reservelist: [], //提前预定的天数列表
				reserveis: 1, //提前预定管控规则
				reserve: 0, //提前预定的天数
				lowLimitlist: [], //低价限制时间列表
				lowLimit: 0,
				lowLimitis: 1, //低价管控规则
				loading: false,
				employeeLevellist: [], //级别列表
				employeeLevel: 31, //当前选择级别
				natid: '', //修改的id
				loadBut:false
			};
		},
		mounted() {

			this.searchtab();
		},
		methods: {
			addrule() {
				//点击新增政策
				this.repeatBookingLimit = this.$options.data().repeatBookingLimit;
				this.agreementFlightLimit = this.$options.data().agreementFlightLimit;
				this.numberof = this.$options.data().numberof;
				this.positionLimit = this.$options.data().positionLimit;
				this.discountlimit = this.$options.data().discountlimit;
				this.highLimit = this.$options.data().highLimit;
				this.reserve = this.$options.data().reserve;
				this.lowLimit = this.$options.data().lowLimit;
				this.employeeLevel = this.$options.data().employeeLevel;

				this.repeatBookingLimitis = this.$options.data().repeatBookingLimitis;
				this.agreementFlightLimitis = this.$options.data().agreementFlightLimitis;
				this.numberofis = this.$options.data().numberofis;
				this.positionLimitis = this.$options.data().positionLimitis;
				this.discountlimitis = this.$options.data().discountlimitis;
				this.highLimitis = this.$options.data().highLimitis;
				this.reserveis = this.$options.data().reserveis;
				this.lowLimitis = this.$options.data().lowLimitis;

				this.natid = '';
				this.dialogVisible = true;
			},
      controlrulesMethod(){
			  let cont = this.controlrules;
			  let contName = this.controlrulesName;
			  let reserveis = this.reserveis;
			  let lowLimitis = this.lowLimitis;
			  let highLimitis = this.highLimitis;
			  let positionLimitis = this.positionLimitis;
			  let discountlimitis = this.discountlimitis;
			  let numberofis = this.numberofis;
			  let agreementFlightLimitis = this.agreementFlightLimitis;
			  let repeatBookingLimitis = this.repeatBookingLimitis;
			  let controlrulevs = this.controlrulevs;
			  for (let item in cont){

			    if (cont[item].id == reserveis){
			      contName.reserveisName = cont[item].name;
          }
			    if (cont[item].id == lowLimitis){
			      contName.lowLimitisName = cont[item].name;
          }
			    if (cont[item].id == highLimitis){
			      contName.highLimitisName = cont[item].name;
          }
			    if (cont[item].id == positionLimitis){
			      contName.positionLimitisName = cont[item].name;
          }
			    if (cont[item].id == discountlimitis){
			      contName.discountlimitisName = cont[item].name;
          }
			    if (cont[item].id == numberofis){
			      contName.numberofisName = cont[item].name;
          }
			    if (cont[item].id == agreementFlightLimitis){
			      contName.agreementFlightLimitisName = cont[item].name;
          }
        }
			  for (let item in controlrulevs){
			    if (controlrulevs[item].id == repeatBookingLimitis){
			      contName.repeatBookingLimitisName = controlrulevs[item].name;
          }
        }
      },
			async handleEdit(index, row) { //修改
				this.loading = true;
				try {
					this.natid = row.id;
					let res = await this.$api.business.getNativeAirTicketRule({
						id: row.id
					})
					if (res.code == 200) {
						let dast = res.data;
						let posidata = [];
						let posolds = dast.positionLimit.split(',');
						for (let k in posolds) {
							posidata.push(parseInt(posolds[k]))
						}
						this.employeeLevel = parseInt(dast.employeeLevel);
						this.reserve = dast.reserve;
						this.reserveis = dast.reserveRules;
						this.lowLimit = dast.lowLimit;
						this.lowLimitis = dast.lowLimitRules;
						this.highLimit = dast.highLimit;
						this.highLimitis = dast.highLimitRules;
						this.positionLimit = posidata;
						this.positionLimitis = dast.positionLimitRules;
						this.discountlimit = dast.discountLimit / 1000;
						this.discountlimitis = dast.discountLimitRules;
						this.numberof = dast.accompanyingNumberLimit;
						this.numberofis = dast.accompanyingNumberLimitRules;
						this.agreementFlightLimit = dast.agreementFlightLimit;
						this.agreementFlightLimitis = dast.agreementFlightLimitRules;
						this.repeatBookingLimit = dast.repeatBookingLimit;
						this.repeatBookingLimitis = dast.repeatBookingLimitRules;
						this.dialogVisible = true;
					} else {
						this.$message({
							message: res.message,
							type: "warning"
						})
					}
          this.controlrulesMethod();
					this.loading = false;
				} catch (e) {
					this.loading = false;
					//TODO handle the exception
				}
			},
			handleDelete(index, row) { //删除
				this.$confirm('此操作将删除该政策, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.loding = true;
					this.$api.business.delNativeAirTicketRule({
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
				if (this.highLimit == '') {
					this.$message({
						message: '请输入高价限制价格！',
						type: 'warning'
					})
				this.loadBut = false
				} else if (this.positionLimit.length == 0) {
					this.$message({
						message: '请选择舱位！',
						type: 'warning'
					})
				this.loadBut = false
				} else if (this.discountlimit == '') {
					this.$message({
						message: '请输入折扣！',
						type: 'warning'
					})
				this.loadBut = false
				} else if (this.discountlimit > 10 || this.discountlimit < 1) {
					this.$message({
						message: '折扣值为1~10之间！',
						type: 'warning'
					})
				this.loadBut = false
				} else if (!isnums.test(this.highLimit)) {
					this.$message({
						message: '高价限制必须为正整数!',
						type: 'warning',
					})
				this.loadBut = false
				} else {
					let dat = {
						id: this.natid,
						employeeLevel: [this.employeeLevel],
						reserve: this.reserve,
						reserveRules: this.reserveis,
						lowLimit: this.lowLimit,
						lowLimitRules: this.lowLimitis,
						highLimit: this.highLimit,
						highLimitRules: this.highLimitis,
						positionLimit: this.positionLimit,
						positionLimitRules: this.positionLimitis,
						discountLimit: this.discountlimit,
						discountLimitRules: this.discountlimitis,
						accompanyingNumberLimit: this.numberof,
						accompanyingNumberLimitRules: this.numberofis,
						agreementFlightLimit: this.agreementFlightLimit,
						agreementFlightLimitRules: this.agreementFlightLimitis,
						repeatBookingLimit: this.repeatBookingLimit,
						repeatBookingLimitRules: this.repeatBookingLimitis,
					}
					try {
						let res = await this.$api.business.addOrUpdateNativeAirTicketRule(dat);
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
					let res = await this.$api.business.nativeAirTicketRule();
					this.loading = false;
					if (res.code == 200) {
						let das = res.data;
						this.tablelist = das.nativeAirTicketRuleShow;
						this.employeeLevellist = das.employeeLevel; //级别
						this.reservelist = das.reserve; //提前预定的天数
						this.lowLimitlist = das.lowLimit; //低价限制时间
						this.numberoflist = das.accompanyingNumberLimit; //同行人数限制列表
						this.repeatBookingLimitlist = das.repeatBookingLimit; //当天重复预定限制
						for (let k in this.repeatBookingLimitlist) {
							if (this.repeatBookingLimitlist[k] == 0) {
								this.repeatBookingLimitlist[k] = {
									name: '不管控',
									id: this.repeatBookingLimitlist[k]
								};
							} else {
								this.repeatBookingLimitlist[k] = {
									name: this.repeatBookingLimitlist[k],
									id: this.repeatBookingLimitlist[k]
								};
							}
						}
						for (let k in this.reservelist) {
							if (this.reservelist[k] == 0) {
								this.reservelist[k] = {
									name: '不限制',
									id: this.reservelist[k]
								};
							} else if (this.reservelist[k] == 999) {
								this.reservelist[k] = {
									name: '当天预定',
									id: this.reservelist[k]
								};
							} else {
								this.reservelist[k] = {
									name: this.reservelist[k],
									id: this.reservelist[k]
								};
							}
						}
						for (let k in this.lowLimitlist) {
							if (this.lowLimitlist[k] == 0) {
								this.lowLimitlist[k] = {
									name: '不管控',
									id: this.lowLimitlist[k]
								};
							} else {
								this.lowLimitlist[k] = {
									name: this.lowLimitlist[k],
									id: this.lowLimitlist[k]
								};
							}
						}
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
<style lang="less">
.trring .el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  width: 100%;
  overflow : hidden;
  text-overflow : ellipsis;
  white-space : nowrap;
}
.trring .el-input__inner:hover{
  text-overflow: ellipsis;
  white-space: nowrap;

}
</style>
<style scoped lang="less">

	.nativelist {
		margin-top: 30px;
		width: 100%;

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
