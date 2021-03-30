<template>
	<div class="frame">
		<div class="frames">
			<div class="frame_form">
				<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="原密码" prop="oldPass">
						<el-input class="frame_input" type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="pass">
						<el-input class="frame_input" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="checkPass">
						<el-input class="frame_input" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
						<el-button @click="resetForm('ruleForm')">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
		
	</div>
</template>

<script>
	let passwort = /[0-9a-zA-Z]+/;
	export default {
		name: "changepassword",
		data() {
			const validateOldPass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入原密码'));
				} else {
					if (this.ruleForm.oldPass !== '') {
						callback();
					}
				}
			};
			const validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			const validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					oldPass: '',
					pass: '',
					checkPass: '',
				},
				rules: {
					oldPass: [{
						validator: validateOldPass,
						trigger: 'blur'
					}],
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let oldPass = this.ruleForm.oldPass;
						let pass = this.ruleForm.pass;
						if (pass.length < 6) {
							this.$message.error("密码长度不能小于6");
							return;
						} else if (!passwort.test(pass)) {
							this.$message.error("密码只能为数字和字母");
							return;
						}
						let user = {
							newPassword: pass,
							oldPassword: oldPass,
						}
						this.$api.Login.changePassword(user).then(res => {
							if (res.code == 200) {
								this.$message.success('修改成功,请重新登录!');
								setTimeout(() => {
									this.$router.push({
										path: '/login'
									})
								}, 2000);
							} else {
								this.$message.error(res.message);
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style scoped lang="less">
	.frame {
		background: #FFFFFF;
		height: 100%;
		.frames{
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			.frame_form {
				margin-left: -70px;
				.frame_input {
					width: 200px;
				}
			}
		}
		
	}
</style>
