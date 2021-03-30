<template>
	<div class="pass_list" v-loading="loading">
		<el-input v-model="passinput" @input="passinputs" class="passinputst" size="medium" placeholder="出行人名称"></el-input>
		<div class="sev_bool" v-if="sev_bool">
			<div class="sev_bools" v-for="(item,index) in searchlists" @click="seoklist(item)" :key="index">
				{{item.userName}}
				<p style="color: #007AFF;font-size: 28upx;">{{item.deptName}}</p>
			</div>
		</div>
		<div class="cklists" v-if="checkuserlist.length > 0">
			<div class="cklistsds">
				选择人员：
			</div>
			<div class="cklistsd" v-for="(item,index) in checkuserlist" :key="index" @click="deleck(item)">
				{{item.userName}}
			</div>
		</div>
		<div class="pass_tops" :style="pass_tops">
			<div class="pass_page">
				<div class="pa_bot">
					<div class="coll_lists">
						<div class="mix-tree-list">
							<div v-for="(item, index) in treeList" :key="index">
								<div
									style="cursor: pointer;"
									class="mix-tree-item"
									:style="[
										{
											paddingLeft: item.rank * 15 + 'px',
											zIndex: item.rank * -1 + 50
										}
									]"
									:class="{
										border: treeParams.border === true,
										show: item.show,
										last: item.lastRank,
										showchild: item.showChild,
										colors: !item.lastRank && item.showChild,
										rtlock: item.id == shetid
									}"
									@click.stop="treeItemTap(item, index)"
								>
									<div v-if="!item.ischecds" class="tsd">
										<div class="iconfont" style="color: #007AFF;font-size: 14px;" v-if="!item.lastRank && item.showChild">&#xe8a0;</div>
										<div class="iconfont" style="font-size: 14px;" v-if="!item.lastRank && !item.showChild">&#xe636;</div>
										<div class="" style="width: 40px;" v-if="item.lastRank"></div>
										{{ item.name }}
										<div class="" v-if="item.userCount > 0">({{ item.userCount }})</div>
									</div>
									<div v-if="item.ischecds" class="tsd">
										<div class="iconfont" :style="{ color: item.checkd ? '#007AFF' : '#f1f1f1' }">{{ item.checkd ? oktl : isoktl }}</div>
										<div style="margin-left: 8px;">{{ item.name }}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="addpalist" @click="btn_click">选好了</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			sev_bool:false,
			searchlists:[],
			pass_tops:{
				width: '100%',
				height: '0px',
			},
			passinput: '',
			loading: false,
			dis: false,
			test: '',
			id_list: [],
			oktl: '\ue611',
			isoktl: '\ue75d',
			shetid: 0,
			treeParams: {
				border: true
			},
			ser_int: '',
			treeList: [],
			checkuserlist:[],

		};
	},
  props:{
    iskok:{
      value: Number,
      default: 0
    }
  },
	mounted() {
		this.pass_tops.height=window.innerHeight-250+'px';
		this.colllist();
	},
	methods: {
		deleck(item){//重复点击删除
			for (let s in this.checkuserlist) {
				if(this.checkuserlist[s].passengerNo == item.passengerNo){
					this.checkuserlist.splice(s,1);    
					break;
				}
			}
			for (let k in this.treeList) {
				if(this.treeList[k].passengerNo == item.passengerNo){
					this.treeList[k].checkd = false;  
					break;
				}
			}
		},
		seoklist(item){//选择搜索框的值
			let that = this;
			let st = true;
			for (let k in that.checkuserlist) {
				if(item.passengerNo == that.checkuserlist[k].passengerNo){
					st = false;
					that.elast("请不重复选择!")
					return
				}
			}
			if(st){
				this.checkuserlist.push(item);
				for (let k in this.treeList) {
					if(this.treeList[k].passengerNo == item.passengerNo){
						this.treeList[k].checkd = true;  
						break;
					}
				}
				this.sev_bool = false;
				this.passinput = "";
			}
		},
		async passinputs() {
			let _this = this;
			let vas = _this.passinput.trim();
			if(vas.length > 0){
				_this.searchlists = [];
				_this.sev_bool = true
				try{
					let res = await _this.$api.home.searchpartments({ name: vas });
					if (res.code == 200) {
						let su = res.data;

						for (let k in su) {
							_this.searchlists.push({
								istrue: 0,
								passengerNo: su[k].passengerNo,
								userName: su[k].name,
								userId: su[k].id,
								deptName: su[k].deptName,
								deptId: su[k].deptId,
								phone: su[k].phone,
							})
						}
						
					} else {
						this.$message({
							message: res.message,
							type: 'warning'
						});
					}
				}catch(e){
					console.log(e);
				}
			} else{
				_this.sev_bool = false
			}
		},
		elast(va) {
			this.dis = true;
			this.test = va;
			setTimeout(() => {
				this.dis = false;
			}, 1000);
		},
		trim(ev) {
			//判断是否有值
			if (ev.trim().length > 0) {
				return true;
			} else {
				return false;
			}
		},
		btn_click() {
			//选择当前的人
			let that = this;
			that.userid_list = [];
      if (this.iskok == 2 && this.checkuserlist.length > 5){
        this.$message({
          message: '最多选择5名乘客!',
          type: 'warning'
        });
        return;
      }
			for (let i = 0; i < that.checkuserlist.length; i++) {
					that.userid_list.push({
						deptName: that.checkuserlist[i].deptName,
						deptId: that.checkuserlist[i].deptId,
						costcenterId:that.checkuserlist[i].costcenterId,
						costcenterName:that.checkuserlist[i].costcenterName,
						phone: that.checkuserlist[i].phone,
						istrue: that.checkuserlist[i].istrue, //是否是临时出行人
						passengerNo: that.checkuserlist[i].passengerNo,
						userName: that.checkuserlist[i].userName,
						userId: that.checkuserlist[i].userId,
            cardNo: that.checkuserlist[i].cardNo,
            cardType: that.checkuserlist[i].cardType
					});
			}
			that.$emit('passlist', that.userid_list);
		},
		async colllist() {
			//查询所有部门
			let _this = this;
			try {
				_this.loading = true;
				_this.$api.home
					.alldepartments()
					.then(res => {
						//查询所有部门
						if (res.code == 200) {
							_this.renderTreeList(res.data);
							_this.$api.home
								.getPassengerLis()
								.then(rest => {
									//查询常用旅客
									if (rest.code == 200) {
										_this.loading = false;
										let dat = rest.data.passList;
										let ds = [
											{
												id: '9999',
												name: '常用旅客',
												parentId: [], // 父级id数组
												rank: 0, // 层级
												ischecds: false, //是否是人
												checkd: false, //是否选中
												show: true // 自身是否显示
											}
										];
										for (let i = 0; i < dat.length; i++) {
											ds.push({
												id: dat[i].id,
												iscd: true, //是否有证件号
                        cardNo: dat[i].certificateList[0].cardNo,
                        cardType:  dat[i].certificateList[0].cardType,
												deptName: dat[i].deptName,
												deptId: dat[i].deptId,
												costcenterId:dat[i].costcenterId,
												costcenterName:dat[i].costcenterName,
												passengerNo: dat[i].passengerNo,
												name: dat[i].name,
												phone: dat[i].phone,
												istrue: 0, //是否是临时出行人
												parentId: ['9999'], // 父级id数组
												rank: 1, // 层级
												ischecds: true, //是否是人
												checkd: false, //是否选中
												show: false // 自身是否显示
											});
										}
										_this.treeList = ds.concat(_this.treeList);
									} else {
										this.$message({
											message: rest.message,
											type: 'warning'
										});
									}
								})
								.catch(e => {
									_this.loading = false;
									console.log('获取数据失败', e);
								});
						} else {
							this.$message({
								message: res.message,
								type: 'warning'
							});
						}
					})
					.catch(e => {
						_this.loading = false;
						console.log('获取数据失败', e);
					});
			} catch (e) {
				_this.loading = false;
				console.log(e);
			}
		},
		async searchlist(id) {
			//查询当前点击部门下的人
			let _this = this;
			_this.lis_id = id;
			let a = _this.id_list.find((value, index, arr) => {
				return value == id;
			});
			if (a == undefined || a == null) {
				_this.id_list.push(id);
				_this.loading = true;
				_this.$api.home
					.searchpartments({ deptId: id })
					.then(res => {
						//查询部门下的员工
						_this.loading = false;
						if (res.code == 200) {
							_this.userlist = res.data;
							if (res.data.length > 0) {
								_this.rmdlist(res.data);
							}
						} else {
							this.$message({
								message: res.message,
								type: 'warning'
							});
						}
					})
					.catch(e => {
						_this.loading = false;
						console.log('获取数据失败', e);
					});
			}
		},
		rmdlist(list) {
			//插入当前部门人员
			let _this = this;
			for (let i = 0; i < _this.treeList.length; i++) {
				if (_this.treeList[i].id == _this.lis_id) {
					for (let k = 0; k < list.length; k++) {
						let parents = [..._this.treeList[i].parentId];
						parents.push(_this.treeList[i].id);
						let si = true;
						if (list[k].certificateList == null || list[k].certificateList == '') {
							//判断有没有证件
							si = false;
						}
						let checks = false;
						for (let p in _this.checkuserlist) {
							if(list[k].passengerNo == _this.checkuserlist[p].passengerNo){
								checks = true;
							}
						}
						_this.treeList.splice(i + k + 1, 0, {
							id: list[k].id,
							iscd: si,
							deptName: list[k].deptName,
							deptId: list[k].deptId,
							costcenterId:list[k].costcenterId,
							costcenterName:list[k].costcenterName,
							passengerNo: list[k].passengerNo,
              cardNo:list[k].certificateList ? (list[k].certificateList.length > 0 ? list[k].certificateList[0].cardNo : '' ) : '',
              cardType:list[k].certificateList ? (list[k].certificateList.length > 0 ? list[k].certificateList[0].cardType : '') : '',
							phone: list[k].phone,
							istrue: 1, //是否是临时出行人
							name: list[k].name,
							parentId: parents, // 父级id数组
							rank: _this.treeList[i].rank + 1, // 层级
							ischecds: true, //是否是人
							checkd: checks, //是否选中
							show: true // 自身是否显示
						});
					}
				}
			}

		},
		// 重新生成数组
		renderTreeList(list = [], rank = 0, parentId = []) {
			//出差旅客
			list.forEach(item => {
				this.treeList.push({
					id: item.id,
					name: item.text,
					userCount: item.a_attr.userCount,
					ischecds: false,
					parentId, // 父级id数组
					rank, // 层级
					showChild: false, //子级是否显示
					show: rank === 0 // 自身是否显示
				});
				if (Array.isArray(item.children) && item.children.length > 0) {
					let parents = [...parentId];
					parents.push(item.id);
					this.renderTreeList(item.children, rank + 1, parents);
				}
			});
		},
		treeItemTap(item, index) {
			//点击展示
			let id = item.id;
			if (!item.ischecds) {
				this.shetid = id;
				if (id != 9999) {
					this.searchlist(id);
				}
				let list = this.treeList;
				item.showChild = !item.showChild;
				list.forEach(childItem => {
					if (item.showChild === false) {
						//隐藏所有子级
						if (!childItem.parentId.includes(id)) {
							//检测是否包含
							return;
						}
						if (childItem.lastRank !== true) {
							childItem.showChild = false;
						}
						childItem.show = false;
					} else {
						if (childItem.parentId[childItem.parentId.length - 1] === id) {
							childItem.show = true;
						}
					}
				});
			} else {
				if (item.iscd == false) {
					this.$message({
						message: '该用户暂无证件信息',
						type: 'warning'
					});
				} else {

					if (this.treeList[index].checkd) {
						this.treeList[index].checkd = false;
						for (let s in this.checkuserlist) {
							if(this.checkuserlist[s].passengerNo == this.treeList[index].passengerNo){
								this.checkuserlist.splice(s,1);    
								break;
							}
						}
					} else {
            if (this.iskok == 2 && this.checkuserlist.length == 5){
              this.$message({
                message: '最多选择5名乘客!',
                type: 'warning'
              });
              return;
            }
						this.treeList[index].checkd = true;
						this.checkuserlist.push({
							istrue: this.treeList[index].istrue,
							costcenterId:this.treeList[index].costcenterId,
							costcenterName:this.treeList[index].costcenterName,
							passengerNo: this.treeList[index].passengerNo,
							userName: this.treeList[index].name,
							userId: this.treeList[index].id,
							deptName: this.treeList[index].deptName,
							deptId: this.treeList[index].deptId,
							phone: this.treeList[index].phone,
              cardNo:this.treeList[index].cardNo,
              cardType:this.treeList[index].cardType
            })
					}
				}
			}
		}
	}
};
</script>

<style lang="less" scoped>
.pass_list {
	width: 100%;
	height: 100%;
	position: relative;
	background: #f1f1f1;
	padding-bottom: 10%;
	.passinputst{
		width: 100%;
		margin:  10px 0;
	}
	.sev_bool{
		position: fixed;
		right: 0;
		top: 21%;
		width: 28%;
		background: #FFFFFF;
		z-index: 1000;
		height: 100%;
		.sev_bools{
			cursor: pointer;
			width: calc(100% - 20px);
			font-size: 14px;
			height: 35px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 10px;
			border-bottom: 1px solid #C8C7CC;
		}
	}
	.cklists{
		margin-top: 5px;
		padding:  0 15px;
		display: flex;
		flex-wrap: wrap;
		overflow: auto;
		.cklistsds{
			font-size: 14px;
			display: flex;
			align-items: center;
			justify-content: center;
			
		}
		.cklistsd{
			cursor: pointer;
			font-size: 12px;
			padding: 4px 4px;
			background: #FFFFFF;
			border-radius: 4px;
			margin: 5px;
		}
	}
	.pass_tops {
		overflow-y: auto;
		.pass_page {
			width: 100%;
			.pa_bot {
				margin-top: 20px;
				width: 100%;
				background: #ffffff;
				.coll_lists {
					width: 100%;
					height: 100%;
					background: #ffffff;
					.mix-tree-list {
						display: flex;
						flex-direction: column;
						padding-left: 30px;
						.mix-tree-item {
							display: flex;
							align-items: center;
							font-size: 16px;
							color: #333;
							height: 0;
							opacity: 0;
							transition: 0.2s;
							position: relative;
							.tsd {
								display: flex;
								align-items: center;
							}
						}
						.mix-tree-icon {
							width: 14px;
							height: 14px;
							margin-right: 8px;
							opacity: 0.9;
						}
						.mix-tree-item.border {
						}
						.mix-tree-item.show {
							border-bottom: 2px solid #eee;
							height: 40px;
							opacity: 1;
						}
						.mix-tree-item.colors {
							color: #007aff;
						}
						.mix-tree-item.rtlock {
							color: #007aff;
						}
						.mix-tree-item.showchild:before {
							transform: rotate(90deg);
						}
						.mix-tree-item.last:before {
							opacity: 0;
						}
					}
				}
			}
		}
	}
	.addpalist {
		width: 28%;
		height: 10%;
		position: fixed;
		bottom: 0;
		right: 0;
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #ffffff;
		background: #007aff;
	}
}
</style>
