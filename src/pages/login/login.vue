<template>
	<div class="login-wrap">
		<div class="ms-title" v-if="bcname!=null && bcname!=''">{{bcname}}</div>
		<div class="ms-title" v-else>差旅系统</div>
		<div class="ms-login">
			<div class="me-tar" v-if="ts_m == 1">
				<div class="me-tars" v-for="(item,index) in me_list" @click="tarck(item.id)" :class="item.id == tarids? 'is_tar':'is_tars'"
				 :key="index">{{item.name}}</div>
			</div>
			<div class="mts-dv" v-if="ts_m == 1">
				<el-form v-if="tarids == 1" label-width="0px" class="demo-ruleForm">
					<el-input class="inps" v-model="ruleForm.username" placeholder="账号/手机号">
						<i slot="prefix" class="el-input__icon iconfont">&#xe613;</i>
					</el-input>
					<el-input class="inps" type="password" placeholder="密码" @keyup.enter.native="submitForm" v-model="ruleForm.password">
						<i slot="prefix" class="el-input__icon iconfont">&#xe60f;</i>
					</el-input>
					<div class="mts_wm" @click="ts_m = 2">忘记密码</div>
					<div class="login-btn">
						<el-button type="primary" @click="submitForm">登录</el-button>
					</div>
				</el-form>
				<el-form v-if="tarids == 2" label-width="0px" class="demo-ruleForm">
					<el-input class="inps" @input="search($event)" v-model="ruleForms.ipone" placeholder="手机号">
						<i slot="prefix" class="el-input__icon iconfont">&#xe623;</i>
					</el-input>
					<div class="mtsva inps">
						<el-input placeholder="验证码" @keyup.enter.native="submitForms" v-model="ruleForms.verificationCode"></el-input>
						<div class="button" :disabled="isdisab" :class="canClick ? 'disabled': ''" @click="countDown">
							{{content}}
						</div>
					</div>
					<div class="login-btn">
						<el-button type="primary" @click="submitForms">登录</el-button>
					</div>
				</el-form>
			</div>
			<div class="mts-dv" v-if="ts_m == 2">
				<div class="mts_top" @click="ts_m = 1">
					<span class="iconfont">&#xe8a1;</span>
					<div style="width: 100%;text-align: center;">找回密码</div>
				</div>
				<el-form label-width="0px" class="demo-ruleForm">
					<el-input style="margin-bottom: 20px;" @input="search($event)" v-model="ruleForms.ipone" placeholder="手机号"></el-input>
					<div class="mtsva">
						<el-input placeholder="验证码" @keyup.enter.native="vercatcom()" v-model="ruleForms.verificationCode"></el-input>
						<div class="button" :disabled="isdisab" :class="canClick ? 'disabled': ''" @click="countDown">
							{{content}}
						</div>
					</div>

					<div class="login-btn">
						<el-button type="primary" @click="vercatcom()">确定重置密码</el-button>
					</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	let ip_test = /^[1][3456789][0-9]{9}$/; //电话号码正则
	export default {
		data: function() {
			return {
				bcname:"差旅系统",
				isdisab: true,
				content: '获取验证码', // 按钮里显示的内容
				canClick: false, //添加canClick
				ts_m: 1, //是否找回密码界面
				totalTime: 60, //记录具体倒计时时间
				tarids: 1,
				me_list: [{
					name: '账号',
					id: 1
				}, {
					name: '验证码登录',
					id: 2
				}],
				ruleForm: {
					username: '',
					password: ''
				},
				ruleForms: {
					ipone: '',
					verificationCode: ''
				},
			}
		},
		mounted() {
			this.getenvs();
		},
		methods: {
			vercatcom() { //重置密码
				let ips = this.ruleForms.ipone;
				let vess = this.ruleForms.verificationCode;
				if (ips == "" || vess == "") {
					this.$message({
						message: "手机号与验证码不能为空!",
						type: 'warning'
					})
				} else {
					this.$api.Login.findPassword({
						phone: ips,
						verificationCode: vess,
					}).then((res) => {
						if (res.code == 200) {
							this.$message({
								message: "重置成功!",
								type: 'success'
							})
							this.ts_m = 1;
						} else {
							this.$message({
								message: res.message,
								type: 'warning'
							})
						}
					}).catch((e) => {
						console.log(e)
					})
				}
			},
			search(ev) { //监听input里面的手机号的值
				let _this = this;
				let va = ev; //获取搜索框的值
				if (va.length == 11) {
					if (!ip_test.test(va)) {
						this.$message({
							message: "请输入正确的手机号!",
							type: 'warning'
						})
					} else {
						if (_this.content == '获取验证码') {
							_this.isdisab = false;
							_this.canClick = true;
						}
					}
				} else {
					_this.isdisab = true;
					_this.canClick = false;
				}
			},
			countDown() { //获取验证码
				let _this = this
				if (_this.isdisab == true) {
					return
				}
				this.$api.Login.cerificationCode({
					"phone": (_this.ruleForms.ipone).toString()
				}).then((res) => {
					if (res.code == 200) {
						this.$message({
							message: "发送成功!",
							type: 'success'
						})
						_this.canClick = false;
						_this.isdisab = true;
						_this.content = '重新发送(' + _this.totalTime + ')'
						let clock = setInterval(() => {
							_this.totalTime--
							_this.content = '重新发送(' + _this.totalTime + ')'
							if (_this.totalTime < 1) {
								clearInterval(clock)
								_this.content = '短信验证码'
								_this.totalTime = 10
								if (_this.ruleForms.ipone.length == 11 && ip_test.test(_this.ruleForms.ipone)) {
									_this.canClick = true;
									_this.isdisab = false;
								}
							}
						}, 1000)
					} else {
						this.$message({
							message: res.message,
							type: 'warning'
						})
					}
				}).catch((e) => {
					console.log(e)
				})
			},
			tarck(id) {
				this.tarids = id
			},
			// 登录请求
			submitForm() { //账号密码
				let _this = this
				let username = _this.ruleForm.username; //账号
				let password = _this.ruleForm.password; //密码
				if (username == '') {
					_this.$message({
						message: "请输入账号!",
						type: 'warning'
					})
				} else if (password == '') {
					_this.$message({
						message: "请输入密码!",
						type: 'warning'
					})
				} else {
					const loading = _this.$loading({
						lock: true,
						text: '登陆中',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					const obj = {
						account: _this.ruleForm.username,
						password: _this.ruleForm.password
					}
					this.$api.Login.accountlogin(obj).then(res => {
						if (res.code == 200) {
							loading.close();
							sessionStorage.setItem('userinfo', JSON.stringify(res.data))
							this.$router.push('/')
						} else {
							loading.close();
							this.$message({
								message: res.message,
								type: 'warning'
							})
						}
					}).catch(e => {
						loading.close();
						console.log('获取数据失败', e)
					})
				}
			},
			submitForms() { //验证码
				let _this = this
				let ipon = _this.ruleForms.ipone; //电话号码
				let ver = _this.ruleForms.verificationCode; //验证码
				if (ipon == '') {
					_this.$message({
						message: "请输入电话号码!",
						type: 'warning'
					})
				} else if (!ip_test.test(ipon)) {
					_this.$message({
						message: "请输入正确的电话号码!",
						type: 'warning'
					})
				} else if (ver == '') {
					_this.$message({
						message: "请输入验证码!",
						type: 'warning'
					})
				} else {
					const loading = _this.$loading({
						lock: true,
						text: '登陆中',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					try {
						const obj = {
							phone: ipon,
							verificationCode: ver,
							openId: '',
						}
						_this.$api.Login.login(obj).then(res => {
							if (res.code == 200) {
								loading.close();
								sessionStorage.setItem('userinfo', JSON.stringify(res.data))
								this.$router.push('/')
							} else {
                loading.close();
								_this.$message({
									message: res.message,
									type: 'warning'
								})
							}
						})
					} catch (err) {
						console.log('获取数据失败', err)
					}
				}
			},
			async getenvs() { //获取系统环境变量 appId--nginx写入
				let _this = this
				try {
					const rest = await _this.$api.Login.getenv({
					});
					if (rest.code == 200) {
						 this.bcname = rest.data.companyname;
						 document.getElementById("mytitle").innerHTML=this.bcname;
						 sessionStorage.setItem('logoUrl', rest.data.style.logo)
					} else {
						console.log(rest.message)
					}
				} catch (e) {
					console.log(e)
				}

			}
		}
	}
</script>

<style scoped lang="less">
	.login-wrap {
		position: relative;
		background: url(http://file.molintmc.cn/mlimg/logobj.jpg) no-repeat;
		background-size: cover;
		background-position: center 0;
		width: 100%;
		height: 100%;

		.ms-title {
			position: absolute;
			top: 50%;
			width: 100%;
			margin-top: -230px;
			text-align: center;
			font-size: 30px;
			color: #fff;
		}

		.ms-login {
			position: absolute;
			box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.4);
			left: 50%;
			top: 50%;
			width: 380px;
			margin: -150px 0 0 -190px;
			background: #fff;

			.me-tar {
				width: 100%;
				height: 50px;
				color: #abb7c2;
				background: #fafcff;
				display: flex;

				.me-tars {
					cursor: pointer;
					width: 50%;
					height: 50upx;
					line-height: 50px;
					text-align: center;
				}

				.is_tar {
					border-bottom: 2px solid #409EFF;
				}

				.is_tars {
					border-bottom: 2px solid #f2f5fa;
				}
			}

			.mts-dv {
				width: calc(100% - 80px);
				padding: 20px 40px;

				.inps {
					margin-bottom: 20px;
				}

				.mts_top {
					display: flex;
					cursor: pointer;
					line-height: 40px;
					font-size: 16px;
					color: #abb7c2;
					margin-bottom: 20px;
					background: #fafcff;
				}

				.mtsva {
					margin-bottom: 20px;
					display: flex;
					align-items: center;
					width: 100%;

					.button {
						margin-left: 10px;
						width: 45%;
						height: 35px;
						line-height: 35px;
						;
						font-size: 13px;
						color: #409EFF;
						border: 1px solid #409EFF;
						text-align: center;
						border-radius: 5px;
						background-color: #FFFFFF;
					}

					.disabled {
						color: #FFFFFF;
						background: #409EFF;
						border: 1upx solid #409EFF;
						cursor: pointer; // 鼠标变化
					}
				}

				.mts_wm {
					font-size: 12px;
					color: #409EFF;
					line-height: 30px;
					cursor: pointer;
				}
			}
		}

		.login-btn {
			text-align: center;
		}

		.login-btn button {
			width: 100%;
			height: 36px;
		}
	}
</style>
