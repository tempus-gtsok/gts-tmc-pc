<template>
  <div class="main">
    <div class="top" @click="add">
      <div><img  src="../../../../static/image/home/add.png" v-if="rotes('tms:pas:add')"/></div>
      <div><p>常用旅客</p></div>
    </div>
    <div class="message">
      <div class="message_tops">
        <ul>
          <li>姓名</li>
          <li>手机号码</li>
          <li>证件信息</li>
          <li>操作</li>
        </ul>
      </div>
      <div class="message_top" v-for="(item,index) in messagesList" v-if="rotes('tms:pas:list')">
        <ul>
          <li>{{ item.name }}</li>
          <li>{{ item.phone }}</li>
          <li>{{ is_CD(item.certificateList[0].cardType) }}&nbsp;&nbsp;{{ item.certificateList[0].cardNo }}</li>
          <li><span style="margin-right: 20px;" v-if="rotes('tms:pas:update')" @click="cover(item)">编辑</span>
            <span>
				<el-button size="mini" type="danger" v-if="rotes('tms:pas:delete')" @click="handleDelete(item)">删除</el-button>
				<el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
        >
				  <span>确认删除嘛？</span>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="dialogVisible = false">取 消</el-button>
				    <el-button type="primary" style="color: white;padding: 4px;"
                       @click="deletes(item.passengerNo)">确 定</el-button>
				  </span>
				</el-dialog>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="Cover" v-if="covesr">
      <div class="title" v-if="zeng">新增常用旅客</div>
      <div class="title" v-else>修改常用旅客</div>
      <div class="Cover_name">
        <div class="Cover_names">手机号码</div>
        <div class="Cover_nams"><input type="text" v-model="phonenumbe_list" class="input_css" maxlength="11"
                                       placeholder="输入手机号"/>
        </div>
      </div>
      <div class="Cover_name">
        <div class="Cover_names">中文姓</div>
        <div class="Cover_nams"><input type="text" v-model="firstNameZh_list" @blur="namezh_left()" class="input_css"
                                       placeholder="输入中文姓"/></div>
      </div>
      <div class="Cover_name">
        <div class="Cover_names">中文名</div>
        <div class="Cover_nams"><input type="text" v-model="lastNameZh_list" @blur="namezh_right()" class="input_css"
                                       placeholder="输入中文名"/></div>
      </div>
      <div class="Cover_name">
        <div class="Cover_names">英文姓</div>
        <div class="Cover_nams"><input type="text" v-model="englishsurname_lsit" class="input_css" placeholder="输入英文姓"/>
        </div>
      </div>
      <div class="Cover_name">
        <div class="Cover_names">英文名</div>
        <div class="Cover_nams"><input type="text" v-model="engs_list" class="input_css" placeholder="输入英文名"/></div>
      </div>
      <div class="Cover_name" v-for="(item,index) in englishname_list" :key="index">
        <div class="dvsep">
          <el-select v-model="item.val" placeholder="请选择" style="width: 100px;">
            <el-option
                v-for="item in id_list"
                :key="item.code"
                :label="item.name"
                :value="item.code">
            </el-option>
          </el-select>
        </div>
        <div class="Cover_nams"><input type="text" v-model="item.value" class="input_css" placeholder="输入证件号"/></div>
        <div class="frop_right">
          <div class="rig_delt" v-if="index > 0" @click="de_icd(item, index)" style="cursor: pointer;">删除</div>
        </div>
      </div>
      <div class="Cover_aname">
        <div class="Cover_names" style="cursor: pointer;margin-top: 10px;color: #007AFF;" @click="addfast()">添加证件</div>
      </div>
      <div class="Cover_name">
        <div class="Cover_names">性别</div>
        <div class="Cover_nams">
          <template>
            <el-select v-model="gender_list" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </div>
      </div>
      <div class="Cover_name">
        <div class="Cover_names">出生日期</div>
        <div class="Cover_nams">
          <template>
            <div class="block">
              <el-date-picker style="border: 0px;" value-format="yyyy-MM-dd" v-model="dateofbirth_lsit" type="date"
                              placeholder="选择日期">
              </el-date-picker>
            </div>
          </template>
        </div>
      </div>
      <div class="but">
        <div class="but_left" @click="coveradd">取消</div>
        <div class="but_right" @click="save">确定</div>
      </div>
    </div>

    <div class="covers" v-if="covers" @click="">

    </div>
    <no-data class="noData" v-if="messagesList.length === 0 && loding === false"></no-data>
  </div>
</template>
<script>
import NoData from "@/components/common/noData";
let idcardReg =
    /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/; //身份证正则
let passport = /^[a-zA-Z0-9]{5,17}$/; //护照
let taiwan = /^([0-9]{8}|[0-9]{10})$/; //台胞证
let hongkongcard = /^[a-zA-Z0-9]{6,10}$/; //港澳通行
let hometown = /^[a-zA-Z]\d{8}$|^\d{15}$|^\d{17}(\d|x|X)$/; //回乡证
let ip_test = /^[1][3456789][0-9]{9}$/; //电话号码正则
let name_zh = /^[\u4E00-\u9FA5]{1,5}$/; //中文正则
import area from '../../../../static/js/area.js'
import py from "../../../../static/js/vue-py.js"

export default {
  name: 'Cselect',
  components: {NoData},
  data() {
    return {
      options: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'
      }],
      value: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      value1: '',
      visible: false,
      arr: area.arrAll,
      dialogVisible: false,
      prov: '省份',
      city: '城市',
      district: '区域',
      itid: '',
      cityArr: [],
      districtArr: [],
      selectedOptions: [],
      messagesList: [],
      carlist: [], //证件类型列表
      id_list: [],
      zeng: true,
      recipient: '', //收件人
      phone_number: '', //手机号
      labels: '',
      detailed: '', //详细地址
      postcode: '', //邮编
      phonenumbe_list: '', //电话号码
      firstNameZh_list: '', //中文姓
      lastNameZh_list: '', //中文名
      englishsurname_lsit: '', //英文姓
      engs_list: '', //英文名
      gender_list: '', //性别
      dateofbirth_lsit: '', //出生日期
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
      englishname_list: [{
        t_name: "englishname",
        name: "身份证",
        plahth: "请确保姓名和证件号码与证件一致",
        value: '',
        val: "NI",
        id: "",
        delFlag: ""
      }], //身份证
      passengerId: null,
      covesr: false,
      covers: false,
      loding: false
    }
  },
  mounted() {
    this.getuserlist();
  },
  methods: {
    visib() {
      this.visible = false;
    },
    namezh_left() {
      if (this.englishsurname_lsit == "") {
        if (name_zh.test(this.firstNameZh_list)) {
          this.englishsurname_lsit = py.chineseToPinYin(this.firstNameZh_list)
        }
      }
    },
    namezh_right() {
      if (this.engs_list == "") {
        if (name_zh.test(this.lastNameZh_list)) {
          this.engs_list = py.chineseToPinYin(this.lastNameZh_list)
        }
      }
    },
    is_CD(it) { //返回证件名称
      let _this = this;
      let names = "";
      for (var i = 0; i < _this.carlist.length; i++) {
        if (_this.carlist[i].code == it) {
          names = _this.carlist[i].name
        }
      }
      return names
    },
    cover(item) {
      this.covesr = true;
      this.covers = true;
      this.zeng = false;
      this.isadd == false
      let _this = this;
      let sex = '';
      _this.phonenumbe_list = item.phone; //电话号码
      _this.firstNameZh_list = item.firstNameZh; //中文姓
      _this.lastNameZh_list = item.lastNameZh;//中文名
      _this.englishsurname_lsit = item.firstName; //英文姓
      _this.engs_list = item.lastName;//英文名
      _this.dateofbirth_lsit = item.birthdateStr;//出生日期
      _this.newdata = false;
      _this.passengerId = item.id;//获取旅客id
      if (item.gender == 'M') {
        sex = '男'
      } else {
        sex = '女'
      }
      _this.gender_list = sex;//性别

      this.id_list = this.carlist; //获取证件列表
      this.englishname_list = this.depd_d(item.certificateList, "certi"); //证件照1
    },
    deleta(item) {
      this.itid = item.passengerNo;
      this.dialogVisible = true;
    },
    async handleDelete(item) { //删除
      this.itid = item.passengerNo;
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loding = true;
        this.$api.mymessage.deleteTemporary({
          passengerNo: this.itid
        }).then((res) => {
          this.loding = false;
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
          this.loding = false;
        })
      });
    },
    async deletes(item) {
      let _this = this;
      try {
        const res = await this.$api.mymessage.deleteTemporary({passengerNo: this.itid});
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
        }
      } catch (e) {
        console.log(e)
      }
    },
    async add() {
      this.zeng = true;
      this.covesr = true;
      this.covers = true;
      this.isadd = true;
      this.phonenumbe_list = ''; //电话号码
      this.firstNameZh_list = ''; //中文姓
      this.lastNameZh_list = ''; //中文名
      this.englishsurname_lsit = ''; //英文姓
      this.engs_list = ''; //英文名
      this.passengerId = null;//id
      this.englishname_list = [{
        t_name: "englishname",
        name: "身份证",
        plahth: "请确保姓名和证件号码与证件一致",
        value: '',
        val: "NI",
        id: "",
        delFlag: ""
      }], //身份证
          this.gender_list = ''; //性别
      this.dateofbirth_lsit = ''; //出生日期
      this.id_list = this.carlist; //获取证件列表
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
      let sex = '';
      let phonenumbe = _this.phonenumbe_list; //电话号码
      let firstNameZh = _this.firstNameZh_list; //中文姓
      let lastNameZh = _this.lastNameZh_list; //中文名
      let englishsurname = _this.englishsurname_lsit; //英文姓
      let engs = _this.engs_list; //英文名
      let englishname = _this.englishname_list; //证件照1
      if (_this.gender_list == '男') {
        sex = 'M'
      } else {
        sex = 'F'
      }
      let gender = sex; //性别
      let dateofbirth = _this.dateofbirth_lsit; //出生日期
      if (!ip_test.test(phonenumbe)) {
        _this.$message({
          message: "手机号格式不对!",
          type: 'warning'
        });
      } else if (firstNameZh == "" || lastNameZh == "") {
        _this.$message({
          message: "姓名不能为空!",
          type: 'warning'
        });
      } else if (this.gender_list == "") {
        _this.$message({
          message: "性别不能为空!",
          type: 'warning'
        });
      } else if (dateofbirth == "" || dateofbirth == null) {
        _this.$message({
          message: "出生日期不能为空!",
          type: 'warning'
        });
      } else {
        let cdlist = [];
        for (let i = 0; i < englishname.length; i++) {
          if (englishname[i].value == "") {
            _this.$message({
              message: "证件信息不能为空!",
              type: 'warning'
            });
            return;
          } else {
            if (englishname[i].val == 'NI' && !idcardReg.test(englishname[i].value)) {
              _this.$message({
                message: "身份证格式不正确!",
                type: 'warning'
              });
              return
            } else if (englishname[i].val == 'PP' && !passport.test(englishname[i].value)) {
              _this.$message({
                message: "护照格式不正确!",
                type: 'warning'
              });
              return
            } else if (englishname[i].val == 'TB' && !taiwan.test(englishname[i].value)) {
              _this.$message({
                message: "台胞证格式不正确!",
                type: 'warning'
              });
              return
            } else if (englishname[i].val == 'GA' && !hongkongcard.test(englishname[i].value)) {
              _this.$message({
                message: "港澳通行证格式不正确!",
                type: 'warning'
              });
              return
            } else if (englishname[i].val == 'HX' && !hometown.test(englishname[i].value)) {
              _this.$message({
                message: '回乡证格式不正确!',
                type: 'warning'
              });
              return
            }
            cdlist.push({
              delFlag: 0,
              "cardType": englishname[i].val,
              "cardNo": englishname[i].value
            })
          }
        }
        let stlist = [];
        for (let i = 0; i < cdlist.length; i++) {
          stlist.push(cdlist[i].cardType)
        }
        if ((new Set(stlist)).size != stlist.length) {
          _this.$message({
            message: "不能选择相同的证件!",
            type: 'warning'
          });
        } else {
          let newdata = [];
          if (_this.isadd == false) { //修改
            cdlist = [];
            for (let i = 0; i < englishname.length; i++) {
              cdlist.push({
                delFlag: 0,
                cardType: englishname[i].val,
                cardNo: englishname[i].value,
                id: englishname[i].id
              })
            }
            newdata = cdlist.concat(_this.delete_list)
          } else {
            newdata = cdlist
          }
          let daw = {
            firstNameZh: firstNameZh, //中文姓
            lastNameZh: lastNameZh, //中文名
            phone: phonenumbe, //电话
            firstName: englishsurname, //英文姓
            lastName: engs, //英文名
            certificateList: newdata, //证件
            birthdateStr: dateofbirth, //生日
            gender: gender, //性别
            id: _this.passengerId,
          }
          try {
            let datw = await _this.$api.mymessage.saveTemporary(daw);
            if (datw.code == 200) {
              _this.$message({
                message: datw.message,
                type: 'success'
              });
              setTimeout(() => {
                this.covesr = false;
                this.covers = false;
                this.getuserlist();
              }, 500)
            } else {
              _this.$message({
                message: datw.message,
                type: 'warning'
              });
            }
          } catch (e) {
            console.log(e)
          }
        }
      }
    },
    depd_d(id, name) { //修改页面显示
      let _this = this;
      if (name == "gender") {
        for (var i = 0; i < _this.genderlist.length; i++) {
          if (id == _this.genderlist[i].id) {
            return {
              t_name: "role",
              name: "性别",
              plahth: "请选择性别",
              value: _this.genderlist[i].name,
              val: _this.genderlist[i].id
            }
          }
        }
      } else if (name == "certi") {
        let datas = [];
        for (let k = 0; k < id.length; k++) {
          for (let i = 0; i < _this.id_list.length; i++) {
            if (id[k].cardType == _this.id_list[i].code) {
              datas.push({
                id: id[k].id,
                delFlag: id[k].delFlag,
                t_name: "englishname",
                name: _this.id_list[i].name,
                plahth: "请确保姓名和证件号码与证件一致",
                value: id[k].cardNo,
                val: id[k].cardType
              })
            }
          }
        }
        return datas
      }
    },
    async getuserlist() { //查询所有
      let _this = this;
      try {
        _this.loding = true;
        const res = await this.$api.mymessage.getPassengerList();
        if (res.code == 200) {

          _this.messagesList = res.data.passList;
          _this.carlist = res.data.cardTypeList;
          _this.id_list = _this.carlist; //获取证件列表
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
    addfast() {//新增证件信息
      let _this = this
      let le = _this.englishname_list;//当前证件
      if (le.length >= _this.id_list.length) {
        this.$message({
          message: '证件数量不能超过' + _this.id_list.length + "个",
          type: 'warning'
        })
      } else {
        let su = true;
        for (let i = 0; i < le.length; i++) {
          if (le[i].value == "") {
            this.$message({
              message: "请完善第" + (i + 1) + "个证件信息",
              type: 'warning'
            })
            su = false;
          }
        }
        if (su) {
          _this.englishname_list.push({
            t_name: "englishname",
            name: "身份证",
            plahth: "请确保姓名和证件号码与证件一致",
            value: "", //值
            val: "NI" //对应值
          })
        }
      }
    },
    de_icd(item, index) { //删除当前证件
      let _this = this
      if (_this.isadd == false) {
        let credi = _this.englishname_list[index];
        if (credi.id == null) {
          _this.englishname_list.splice(index, 1);//删除当前证件
        } else {
          _this.englishname_list[index].delFlag = 1;
          _this.delete_list.push({
            id: _this.englishname_list[index].id,
            delFlag: _this.englishname_list[index].delFlag
          })
          _this.englishname_list.splice(index, 1);
        }
      } else {
        _this.englishname_list.splice(index, 1);//删除当前证件
      }
    },
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
    img {
      font-size: 14px;
      margin-top: 10px;
      margin-right: 10px;
      cursor: pointer;
    }

    img:hover {
      opacity: 0.8;
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
      padding: 0px 0px;
      font-size: 14px;
      background: #FFFFFF;
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
    height: calc(100% - 150px);
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #FFFFFF;
    border-radius: 5px;
    padding-bottom: 20px;
    box-shadow: 0px 0px 10px #888888;
    z-index: 994;
    overflow: auto;

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

      .dvsep {
        /deep/ .el-input__inner {
          border: 0px solid #dcdfe6;
        }
      }

      .Cover_names {
        width: 100px;
        text-indent: 15px;
      }

      .Cover_nams {
        .input_css {
          font-size: 16px;
          border: 0px;
          line-height: 50px;
        }

        /deep/ .el-input__inner {
          border: 0px;
          width: 300px;
        }
      }

      .frop_right {
        width: 20%;
        display: flex;
        align-items: center;
        cursor: pointer;
        justify-content: flex-end;

        .rig_delt {
          font-size: 16px;
          color: #409EFF;
          cursor: pointer;
        }
      }

      .select_option {
        border: 0px;
        z-index: 9999 !important;
      }
    }

    .Cover_aname {
      margin: auto;
      width: 440px;
      text-align: right;
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
  .noData{
    min-width: 970px;
  }
}
</style>
