<template>
  <div class="main">
    <div class="top" @click="add">
      <div><img src="../../../../static/image/home/add.png" v-if="rotes('tms:per:usu:add')"/></div>
      <div><p>常用地址</p></div>
    </div>
    <div class="message">
      <div class="message_tops">
        <ul>
          <li>姓名</li>
          <li>手机号码</li>
          <li>所在地</li>
          <li>详细地址</li>
          <li>操作</li>
        </ul>
      </div>
      <div class="message_top" v-for="(item,index) in messagesList">
        <ul>
          <li>{{ item.name }}</li>
          <li>{{ item.phone }}</li>
          <li>{{ item.province }}</li>
          <li>{{ item.address }}</li>
          <li><span style="margin-right: 20px;" v-if="rotes('tms:per:usu:modify')" @click="cover(item)">编辑</span>
            <span>
							<el-button size="mini" type="danger" v-if="rotes('tms:per:usu:delete')"
                         @click="handleDelete(item)">删除</el-button>
							<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
								<span>确认删除嘛？</span>
								<span slot="footer" class="dialog-footer">
									<el-button @click="dialogVisible = false">取 消</el-button>
									<el-button type="primary" style="color: white;padding: 4px;" @click="deletes(item.id)">确 定</el-button>
								</span>
							</el-dialog>
						</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="Cover" v-if="covesr">
      <div class="title" v-if="zeng">新增常用地址</div>
      <div class="title" v-else>修改常用地址</div>
      <div class="Cover_name">
        <div class="Cover_names">收件人</div>
        <div class="Cover_nams"><input type="text" v-model="recipient" class="input_css" placeholder="输入姓名"/></div>
      </div>
      <div class="Cover_name">
        <div class="Cover_names">手机号</div>
        <div class="Cover_nams"><input type="text" v-model="phone_number" maxlength="11" class="input_css"
                                       placeholder="输入手机号"/></div>
      </div>
      <div class="Cover_name">
        <div class="Cover_names">所在地</div>
        <div class="Cover_nams">
          <div>
            <el-select v-model="prov" style="width:100px;margin-right: 10px;z-index: 9999 !important;border: 0px;">
              <el-option v-for="option in arr" :value="option.name" :key="option.name" popper-class="select_option"
                         style="z-index: 10000 !important;">
                {{ option.name }}
              </el-option>
            </el-select>
            <el-select v-model="city" style="width:100px;margin-right: 10px;">
              <el-option v-for="option in cityArr" :key="option.name" :value="option.name">
                {{ option.name }}
              </el-option>
            </el-select>
            <el-select v-model="district" v-if="district" style="width:100px;">
              <el-option v-for="option in districtArr" :key="option.name" :value="option.name">
                {{ option.name }}
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="Cover_name">
        <div class="Cover_names">详细地址</div>
        <div class="Cover_nams"><input type="text" v-model="detailed" class="input_css" placeholder="输入详细地址"/></div>
      </div>
      <div class="but">
        <div class="but_left" @click="coveradd">取消</div>
        <div class="but_right" @click="save">确定</div>
      </div>
    </div>

    <div class="covers" v-if="covers">

    </div>
    <no-data class="noData" v-if="messagesList.length === 0 && loading === false"></no-data>
  </div>
</template>
<script>
import NoData from "@/components/common/noData";
let ip_test = /^1[3456789]\d{9}$/; //电话号码正则
let name = /^[0-9]*$/; //数值正则
let post = /^\d{6}$/;
import area from '../../../../static/js/area.js'

export default {
  name: 'Cselect',
  components: {NoData},
  data() {
    return {
      visible: false,
      arr: area.arrAll,
      prov: '省份',
      city: '城市',
      district: '区域',
      itid: '',
      cityArr: [],
      districtArr: [],
      selectedOptions: [],
      messagesList: [],
      dialogVisible: false,
      zeng: true,
      recipient: '', //收件人
      phone_number: '', //手机号
      labels: '',
      detailed: '', //详细地址
      postcode: '', //邮编
      nameId: null,
      userlist: [{
        name: '龙宗毅',
        phone: '13974097614',
        adders: '深圳市',
        detailsadd: '龙岗',
        postcode: '414100',
        handle: '操作'
      }, {
        name: '毛毅',
        phone: '13168806023',
        adders: '深圳市',
        detailsadd: '龙华',
        postcode: '414100',
        handle: '操作'
      }],
      covesr: false,
      covers: false,
      loading: false
    }
  },
  mounted() {
    this.getuserlist();
  },
  methods: {
    updateCity: function () {
      for (var i in this.arr) {
        var obj = this.arr[i];
        if (obj.name) {
          if (obj.name + '省' == this.prov || obj.name == this.prov) {
            this.cityArr = obj.sub;
            break;
          }
        }
      }
      this.city = this.cityArr[1].name;
    },
    updateDistrict: function () {
      for (var i in this.cityArr) {
        var obj = this.cityArr[i];
        if (obj.name == this.city) {
          this.districtArr = obj.sub;
          break;
        }
      }
      if (this.districtArr && this.districtArr.length > 0 && this.districtArr[1].name) {
        this.district = this.districtArr[1].name;
      } else {
        this.district = '';
      }
    },
    beforeMount() {
      this.updateCity();
      this.updateDistrict();
    },
    visib() {
      this.visible = true;
    },
    cover(item) {
      this.covesr = true;
      this.covers = true;
      this.zeng = false;
      this.recipient = item.name; //收件人
      this.phone_number = item.phone; //手机号
      this.prov = item.province;
      this.detailed = item.address; //详细地址
      this.nameId = item.id; //详细地址
    },
    deleta(item) {
      this.itid = item.id;
      this.dialogVisible = true;
    },
    async handleDelete(item) { //删除
      this.itid = item.id;
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.mymessage.deleteMailAddres({
          id: this.itid
        }).then((res) => {
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getuserlist();
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            });
          }
        }).catch((e) => {
        })
      });
    },
    async deletes(item) {
      let _this = this;
      try {
        const res = await this.$api.mymessage.deleteMailAddres({
          id: this.itid
        });
        if (res.code == 200) {
          this.$message({
            message: "删除成功！",
            type: 'success'
          })
          this.dialogVisible = false;
          this.getuserlist();
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
          this.dialogVisible = false;
        }
      } catch (e) {
        console.log(e)
      }
    },
    add() {
      this.zeng = true;
      this.covesr = true;
      this.covers = true;
      this.prov = '省份';
      this.nameId = null; //id
      this.recipient = ''; //收件人
      this.phone_number = ''; //手机号
      this.detailed = ''; //详细地址
      this.postcode = ''; //邮编
    },
    coveradd() {
      this.covesr = false;
      this.covers = false;
      this.recipient = ''; //收件人
      this.phone_number = ''; //手机号
      this.detailed = ''; //详细地址
      this.postcode = ''; //邮编
    },
    async save() {
      let _this = this;
      let recipientss = _this.recipient; //收件人
      let phone_numbers = _this.phone_number; //手机号
      let province = _this.prov; //所在地
      let city = _this.city; //地区
      let detaileds = _this.detailed; //详细地址
      let postcodes = _this.postcode; //邮编
      let nameIds = _this.nameId; //id
      if (recipientss == '') {
        _this.$message({
          message: '请输入收件人',
          type: 'warning'
        });
        return
      } else if (phone_numbers == '') {
        _this.$message({
          message: '请输入手机号',
          type: 'warning'
        });
        return
      } else if (!ip_test.test(phone_numbers)) {
        _this.$message({
          message: '请填写正确的11位手机号码',
          type: 'warning'
        });
        return
      } else if (province == '省份') {
        _this.$message({
          message: '请选择您所在地区',
          type: 'warning'
        });
        return
      } else if (detaileds == '') {
        _this.$message({
          message: '请输入详细地址',
          type: 'warning'
        });
        return
      }
      else {
        let user = {
          "name": recipientss,
          "phone": phone_numbers,
          "province": province,
          "city": city,
          "address": detaileds,
          "id": nameIds,
          "customerNo": postcodes
        }
        this.$api.mymessage
            .newcommonadd(user)
            .then(res => {
              if (res.code == 200) {
                this.covesr = false;
                this.covers = false;
                if (nameIds == null) {
                  this.$message({
                    message: '新增成功',
                    type: 'success'
                  })
                } else {
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  })
                }

                this.getuserlist();
              } else {
                this.$message({
                  message: res.message,
                  type: 'warning'
                })
              }
            }).catch(e => {
          console.log(e)
        })
      }
    },
    async getuserlist() { //查询所有地址
      let _this = this;
      try {
        _this.loding = true;
        const res = await this.$api.mymessage.getMailAddressLis();
        if (res.code == 200) {
          _this.messagesList = res.data;
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
        _this.loding = false;
      } catch (e) {
        console.log(e)
      }
    },
  },
  watch: {
    prov: function () {
      this.updateCity();
      this.updateDistrict();
    },
    city: function () {
      this.updateDistrict();
    }
  },
}
</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
  position: relative;
  background: #FFFFFF;
  .top {
    width: calc(100% - 40px);
    line-height: 30px;
    display: flex;
    margin: 0 20px;
    font-size: 14px;
    align-items: center;
    cursor: pointer;

    img {
      font-size: 14px;
      margin-top: 10px;
      margin-right: 10px;
      cursor: pointer;
    }

    img:hover {
      opacity: 0.9;
    }

    p:hover {
      cursor: pointer;
      color: #ff7362;
    }
  }


  .message {
    .el-button {
      border: 0px;
      color: #409EFF;
      background: #FFFFFF;
      font-size: 14px;
      padding: 0px 0px;
    }

    .message_tops ul {
      list-style: none;
      display: flex;
      color: #ABB7C2;
      font-size: 14px;
      line-height: 30px;
      color: #333;
      margin: 0 20px;
      background: #eff6fc;
      justify-content: space-around;
      border: 1px solid #dce9f2;
    }

    .message_top ul {
      margin: 0 20px;
      list-style: none;
      display: flex;
      color: #ABB7C2;
      font-size: 14px;
      line-height: 30px;
      justify-content: space-around;
      border-right: 1px solid #daeaf6;
      border-bottom: 1px solid #daeaf6;
    }

    .message_top ul li {
      width: 100%;
      color: #333;
      text-align: center;
      border-left: 1px solid #daeaf6;
    }

    .message_top span {
      color: #409EFF;
      cursor: pointer;
    }

    .message_top span:hover {
      color: #FF7362;
      cursor: pointer;
    }

    .new_address {
      align-items: right;
      display: flex;
      margin-top: 10px;
      justify-content: flex-end;
      margin-right: 60px;
      cursor: pointer;

      span {
        width: 100px;
        line-height: 40px;
        text-align: center;
        display: flex;
        justify-content: center;
        color: white;
        background: #409EFF;
      }
    }
  }

  .Cover {
    position: fixed;
    width: 550px;
    height: 600px;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #FFFFFF;
    border-radius: 5px;
    box-shadow: 0px 0px 10px #888888;
    z-index: 994;

    .title {
      width: 100%;
      text-align: center;
      font-size: 18px;
      margin-top: 40px;
    }

    .Cover_name {
      margin: auto;
      margin-top: 20px;
      width: 440px;
      height: 60px;
      line-height: 60px;
      border: 1px solid #D0D7DE;
      display: flex;

      .Cover_names {
        width: 100px;
        text-indent: 15px;
      }

      .Cover_nams {
        width: calc(100% - 100px);

        .input_css {
          width: 100%;
          font-size: 16px;
          border: 0px;
          line-height: 50px;
        }
      }

      .select_option {
        border: 0px;
        z-index: 9999 !important;
      }
    }

    .but {
      padding-top: 30px;
      margin: auto;
      width: 440px;
      display: flex;
      justify-content: space-between;

      .but_left {
        width: 180px;
        line-height: 54px;
        text-align: center;
        border-radius: 5px;
        color: white;
        background: #D0D7DE;
        cursor: pointer;
      }

      .but_right {
        width: 180px;
        line-height: 54px;
        text-align: center;
        border-radius: 5px;
        color: white;
        background: #409EFF;
        cursor: pointer;
      }
    }
  }

  .covers {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #FFFFFF;
    opacity: 0.6;
    z-index: 992;
  }
}
.noData{
  min-width: 970px!important;
}
</style>
