<template>
  <div v-loading="loading" class="my_mes">
    <div class="info_rmation" v-if="userinfos != null && userinfos != undefined">
      <div class="imgs">
        <img src="../../../../static/image/home/personal-center.png"/>
      </div>
      <div class="infoe_rmation">
        <div class="userName">
          <div class="userName_right" style="font-weight: bold; font-size: 14px;color: #333333;">
            {{ userinfos.user.name }}
          </div>
        </div>
        <div class="userName">
          <div class="userName_right">
            手机号码:{{ userinfos.user.phone.replace(/(.{3}).*(.{4})/, "$1******$2") }}
          </div>
          <div class="change_phone" @click="phonei_click">
            <p>更换手机号</p>
          </div>
        </div>
        <div class="userName">
          <div class="userName_right">
            所属公司：{{ userinfos.user.customerName }}
          </div>
          <div class="unbound" @click="company_click">
            <p>解除绑定</p>
          </div>
        </div>
        <div class="certificate">
          <div class="infos_certificate">
            <div class="infos_left">我的证件</div>
            <div class="infos_right" @click="add"><p>编辑</p></div>
          </div>
          <div class="infoes_certificate">
            <div class="userNames">
              <div class="userNames_left">
                中文姓
              </div>
              <div class="userNames_right">
                {{ userinfos.passengerVo.firstNameZh }}
              </div>
            </div>
            <div class="userNames">
              <div class="userNames_left">
                中文名
              </div>
              <div class="userNames_right">
                {{ userinfos.passengerVo.lastNameZh }}
              </div>
            </div>
            <div class="userNames">
              <div class="userNames_left">
                英文姓
              </div>
              <div class="userNames_right">
                {{ userinfos.passengerVo.firstName }}
              </div>
            </div>
            <div class="userNames">
              <div class="userNames_left">
                英文名
              </div>
              <div class="userNames_right">
                {{ userinfos.passengerVo.lastName }}
              </div>
            </div>
            <div class="userNames" v-for="(item, index) in englishname_list" :key="index">
              <div class="userNames_left">
                {{ item.name }}
              </div>
              <div class="userNames_right" >
                {{ item.value | numberPapers }}
              </div>
              <!-- <div class="userNames_right" v-if="item.flag == true">
                    {{ item.value}}
              </div> -->
              <!-- <i class="el-icon-view" @click="changNum(item,index)"></i> -->
            </div>
            <div class="userNames">
              <div class="userNames_left">
                性别
              </div>
              <div class="userNames_right">
                {{ userinfos.user.gender }}
              </div>
            </div>
            <div class="userNames">
              <div class="userNames_left">
                出生日期
              </div>
              <div class="userNames_right">
                {{ userinfos.passengerVo.birthday }}
              </div>
            </div>
          </div>
          <div class="bottom">

          </div>
        </div>
      </div>
    </div>
    <div class="mask" v-if="companyi_click" @click="companym_click">
    </div>
    <div class="popups" v-if="phone_click">
      <div class="cell_phone_number">更换绑定手机</div>
      <div class="cell_phone">您当前的绑定手机号码</div>
      <div class="cell_phones">{{ userinfos.user.phone.replace(/(.{3}).*(.{4})/, "$1******$2") }}</div>
      <button class="dimission" @click="submit">更改绑定手机号</button>
      <button class="cancel" @click="companym_click">取消</button>
    </div>
    <div class="popups" v-if="phones_click">
      <div class="cell_phone_number">更换绑定手机</div>
      <input type="text" v-model="ipone" maxlength="11" @input="search($event)" class="inputs_css"
             placeholder="请输入新手机号码"/>
      <div class="inputs_cs">
        <div><input type="text" v-model="Verification" maxlength="6" class="inputs_cs" placeholder="短信验证码"/></div>
        <div>
          <button :disabled="isdisab" :class="canClick ? 'disabled': ''" @click="countDown">{{ content }}</button>
        </div>
      </div>
      <button class="dimission" @click="login">确定</button>
      <button class="cancel" @click="companym_click">取消</button>
    </div>
    <div class="popups" v-if="companys_click">
      <div class="popups_company">{{ popups_company }}</div>
      <div class="company_name">{{ userinfos.user.customerName }}</div>
      <div class="department">{{ department }}</div>
      <div class="confirm" v-if="dimies">
        <button class="dimission" @click="dimissions">{{ dimission }}</button>
        <button class="cancel" @click="companym_click">取消</button>
      </div>
      <div class="confirm" v-if="dimiss">
        <button class="dimission" @click="to_modify">确定</button>
        <button class="cancel" @click="companym_click">取消</button>
      </div>
    </div>
    <!-- 我的证件 -->
    <div class="info_certificate">
      <div class="infoe_certificate">
      </div>
      <div class="Cover" v-if="covesr">
        <div class="title" v-if="zeng">编辑我的证件</div>
        <div class="Cover_name">
          <div class="Cover_names">中文姓</div>
          <div class="Cover_nams"><input type="text" v-model="firstNameZh" class="input_css" placeholder="输入姓"/></div>
        </div>
        <div class="Cover_name">
          <div class="Cover_names">中文名</div>
          <div class="Cover_nams"><input type="text" v-model="lastNameZh" class="input_css" placeholder="输入名"/></div>
        </div>
        <div class="Cover_name">
          <div class="Cover_names">英文姓</div>
          <div class="Cover_nams"><input type="text" v-model="firstName" class="input_css" placeholder="输入英文姓"/></div>
        </div>
        <div class="Cover_name">
          <div class="Cover_names">英文名</div>
          <div class="Cover_nams"><input type="text" v-model="lastName" class="input_css" placeholder="输入英文名"/></div>
        </div>
        <div class="Cover_nameas" v-for="(item, index) in englishname_list_modify" :key="index">
          <div class="dvsep">
            <el-select v-model="item.val" placeholder="请选择" style="width: 130px;">
              <el-option v-for="item in id_list" :key="item.code" :label="item.name" :value="item.code">
              </el-option>
            </el-select>
          </div>
          <div class="Cover_nams"><input type="text" v-model="item.valueFag"  @focus="idFock(index,item.valueFag)" class="input_css" :placeholder="item.plahth"/>
          </div>
          <div class="frop_right">
            <div class="rig_delt" v-if="index > 0" @click="de_icd(item, index)" style="cursor: pointer;">删除</div>
          </div>
        </div>
        <div class="Cover_aname">
          <div class="Cover_names" style="cursor: pointer;color: #007AFF;margin-top: 10px;" @click="AddList()">添加证件
          </div>
        </div>
        <div class="Cover_name">
          <div class="Cover_names">性别</div>
          <div class="Cover_nams">
            <template>
              <el-select v-model="gender" placeholder="请选择">
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
                <el-date-picker style="border: 0px;" value-format="yyyy-MM-dd" v-model="birthday" type="date"
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
    </div>
    <div class="covers" v-if="covers">

    </div>
  </div>
</template>

<script>
let idcardReg =
    /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/; //身份证正则
let passport = /^[a-zA-Z0-9]{5,17}$/; //护照
let taiwan = /^([0-9]{8}|[0-9]{10})$/; //台胞证
let hongkongcard = /^[a-zA-Z0-9]{6,10}$/; //港澳通行
let hometown = /^[a-zA-Z]\d{8}$|^\d{15}$|^\d{17}(\d|x|X)$/; //回乡证
let name_eng = /^[a-zA-Z\/ ]{2,20}$/;
let ip_test = /^[1][3456789][0-9]{9}$/;//电话号码正则
import { numberPapers} from "@/utils/common-filters";
export default {
		filters:{
		   numberPapers
		},
  data() {
    return {
      loading: false,
      userinfos: null,
      bian: {},
      firstNameZh: '',
      lastNameZh: '',
      firstName: '',
      lastName: '',
      gender: '',
      birthday: '',
      companyi_click: false, //遮盖层
      phone_click: false,
      phones_click: false,
      companys_click: false,
      dimiss: false,
      dimies: true,
      popups_company: '所属公司',
      department: '默认部门',
      dimission: '我已离职，解除绑定',
      zeng: true,
      covesr: false,
      covers: false,
      id_list: [], //证件信息
      op_ids: 0,
      Svalue: '',
      englishname_list: [{
        t_name: "englishname",
        name: "身份证",
        plahth: "请确保姓名和证件号码与证件一致",
        value: "",
        val: "NI",
        id: "",
        delFlag: ""
      }],
      englishname_list_modify: '',
      recipients: '',
      recipient: '', //收件人
      phone_number: '', //手机号
      labels: '',
      detailed: '', //详细地址
      postcode: '', //邮编
      tabBar: [{
        name: '男',
        code: 'M'
      },
        {
          name: '女',
          code: 'F'
        }
      ],
      options: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'
      }],
      value: '',
      value1: '',
      delete_list: [],
      dis: false,
      test: '',
      ipone: "",
      Verification: "",
      isdisab: true,
      content: '获取验证码', // 按钮里显示的内容
      totalTime: 30, //记录具体倒计时时间
      canClick: false, //添加canClick
      op_lo: "获取验证码",
      isTraveler:'',//是否有添加常用旅客的标志
    }
  },
  mounted() {
    this.userlist();
  },
  methods: {
    de_icd(item, index) { //删除当前证件
      let _this = this
      let credi = _this.englishname_list_modify[index];
      if (credi.id == null) {
        _this.englishname_list_modify.splice(index, 1); //删除当前证件
      } else {
        _this.englishname_list_modify[index].delFlag = 1;
        _this.delete_list.push({
          id: _this.englishname_list_modify[index].id,
          delFlag: _this.englishname_list_modify[index].delFlag
        })
        _this.englishname_list_modify.splice(index, 1);
      }
    },
    AddList() {
      let _this = this
      let le = _this.englishname_list_modify; //当前证件
      if (le.length >= 10) {
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
          _this.englishname_list_modify.push({
            t_name: "englishname",
            name: "身份证",
            plahth: "请确保姓名和证件号码与证件一致",
            value: "", //值
            valueFag:"",
            val: "NI" //对应值
          })
        }
      }
    },
    coveradd() {
      this.covesr = false;
      this.covers = false;
      this.recipient = ''; //收件人
      this.phone_number = ''; //手机号
      this.detailed = ''; //详细地址
      this.postcode = ''; //邮编
      this.englishname_list_modify = [];
      let el = this.englishname_list;
      for (let i in el) {
        this.englishname_list_modify.push({
          id: el[i].id,
          delFlag: el[i].delFlag,
          t_name: el[i].t_name,
          name: el[i].name,
          plahth: el[i].plahth,
          valueFag:numberPapers(el[i].value),
          value: el[i].value,
          val: el[i].val
        })
      }
    },
    async userlist() { //获取个人信息
      let _this = this;
      _this.loading = true;
      try {
        let res = await this.$api.mymessage.username();
        _this.loading = false;
        if (res.code == 200) {
          this.userinfos = res.data; //个人信息
          _this.id_list = _this.userinfos.cardTypeList;
          _this.date = _this.userinfos.passengerVo.birthday;
          for (var i = 0; i < _this.tabBar.length; i++) {
            if (_this.tabBar[i].code == _this.userinfos.user.sex) {
              _this.sex = _this.tabBar[i].code;
              _this.mao = _this.tabBar[i].name;
            }
          }
          if (_this.userinfos.passengerVo.certificateList != null) {
            _this.englishname_list = _this.depd_d(_this.userinfos.passengerVo.certificateList); //证件照1
            _this.englishname_list_modify = _this.depd_d(_this.userinfos.passengerVo.certificateList);
          }
          for (let i = 0; i < _this.englishname_list.length; i++) {
            _this.englishname_list[i] = {..._this.englishname_list[i],flag:false}
            
          }
          _this.isTraveler =  _this.userinfos.user.isTraveler;
          this.$emit('isTraveler',this.isTraveler)//向父组件传值
        }
      } catch (e) {
        console.log(e)
        _this.loading = false;
      }

    },
    depd_d(id) {
      let _this = this;
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
              valueFag: numberPapers(id[k].cardNo),
              value: id[k].cardNo,
              val: id[k].cardType
            })
          }
        }
      }
      return datas
    },
    add() {
      this.firstNameZh = this.userinfos.passengerVo.firstNameZh;
      this.lastNameZh = this.userinfos.passengerVo.lastNameZh;
      this.firstName = this.userinfos.passengerVo.firstName;
      this.lastName = this.userinfos.passengerVo.lastName;
      this.gender = this.userinfos.user.gender;
      this.birthday = this.userinfos.passengerVo.birthday;
      this.zeng = true;
      this.covesr = true;
      this.covers = true;
      this.nameId = null; //id
    },
    idFock(index,val){
       // 判断输入传给后台的值是否带星号
      //  console.log("this.id_list[index].value",val)
       if( this.englishname_list_modify[index].valueFag[3] == '*'){
      this.englishname_list_modify[index].value = this.englishname_list_modify[index].valueFag[3] == '*'?this.englishname_list_modify[index].valueFag = '':this.englishname_list_modify[index].valueFag
       }

     
    },

    dimissions() {
      this.dimiss = true;
      this.dimies = false;
    },
    phonei_click() {
      // return
      this.companys_click = false;
      this.phone_click = true;
      this.companyi_click = true;
    },
    company_click() {
      this.phone_click = false;
      this.companyi_click = true;
      this.companys_click = true;
      this.dimies = true;
    },
    companym_click() {
      this.phone_click = false;
      this.phones_click = false;
      this.companyi_click = false;
      this.companys_click = false;
      this.dimiss = false;
      this.dimies = false;
    },
    submit() {
      this.phone_click = false;
      this.phones_click = true;
    },
    async to_modify() {
      let _this = this;
      let comp = _this.userinfos.user.customerName; //公司
      let user = {
        customerName: comp
      }
      _this.loading = true;
      try {
        let res = await _this.$api.mymessage.customer_Name(user);
        _this.loading = false;
        if (res.code == 200) {
          _this.$router.push({
            path: '../../login',
            query: {
              data: JSON.stringify(res)
            }
          });
        } else {
          _this.$message({
            message: res.message,
            type: 'warning'
          });
          _this.loading = false;
        }
      } catch (e) {
        console.log(e)
        _this.loading = false;
      }
    },
    search(ev) { //监听input里面的手机号的值
      let _this = this;
      let va = ev.target.value; //获取搜索框的值
      if (va.length == 11) {
        if (!ip_test.test(va)) {
          _this.$message({
            message: '请输入正确的手机号',
            type: 'warning'
          });
        } else {
          _this.isdisab = false;
          _this.canClick = true;
        }
      } else {
        _this.isdisab = true;
        _this.canClick = false;
      }
    },
    async countDown() {
      let _this = this
      _this.canClick = false;
      _this.isdisab = true;

      _this.content = '重新发送(' + _this.totalTime + ')'
      let clock = setInterval(() => {
        _this.totalTime--
        _this.content = '重新发送(' + _this.totalTime + ')'
        if (_this.totalTime < 1) {
          clearInterval(clock)
          _this.content = '短信验证码'
          _this.totalTime = 30;
          _this.canClick = true;
          _this.isdisab = false;
        }
      }, 1000)
      _this.loading = true;
      try {
        let res = await _this.$api.Login.vess_code({"phone": (_this.ipone).toString()});
        _this.loading = false;
        if (res.code == 200) {
          _this.$message({
            message: '发送成功！',
            type: 'success'
          });
        } else {
          _this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      } catch (e) {
        console.log(e)
        _this.loading = false;
      }
    },
    async login() { //登录
      let _this = this;
      let ipon = _this.ipone;//电话号码
      let ver = _this.Verification;//验证码
      if (ipon == '') {
        _this.$message({
          message: '请输入电话号码!',
          type: 'warning'
        });
      } else if (!ip_test.test(ipon)) {
        _this.$message({
          message: '请输入正确的电话号码!',
          type: 'warning'
        });
      } else if (ver == '') {
        _this.$message({
          message: '请输入验证码!',
          type: 'warning'
        });
      } else {
        let user = {
          phone: ipon,
          verificationCode: ver
        }
        _this.loading = true;
        try {
          let res = await _this.$api.Login.change_phone(user);
          _this.loading = false;
          if (res.code == 200) {
            _this.$store.commit('user_token_Ai', res.data);
            uni.setStorageSync("changePhone", ipon);
            _this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.userlist();
          } else {
            _this.$message({
              message: res.message,
              type: 'warning'
            });
          }
        } catch (e) {
          console.log(e)
          _this.loading = false;
        }
      }
    },
    async save() {
      let _this = this;
      let firstName = _this.firstName; //英文姓
      let lastName = _this.lastName; //英文名
      let firstNameZh = _this.firstNameZh; //中文姓
      let lastNameZh = _this.lastNameZh; //中文名
      let sex = _this.gender //性别
      let date = _this.birthday; //时间
      let englishname = _this.englishname_list_modify; //证件照1
      if (sex == '男') {
        sex = 'M'
      } else {
        sex = 'F'
      }
      if (firstNameZh == '') {
        _this.$message({
          message: '请输入中文姓',
          type: 'warning'
        });
        return;
      }
      if (lastNameZh == '') {
        _this.$message({
          message: '请输入中文名',
          type: 'warning'
        });
        return;
      }
      if (firstName == '') {
        _this.$message({
          message: '请输入英文姓',
          type: 'warning'
        });
        return;
      }
      if (!name_eng.test(firstName)) {
        _this.$message({
          message: '英文名格式错误',
          type: 'warning'
        });
        return;
      }
      if (lastName == '') {
        _this.$message({
          message: '请输入英文名',
          type: 'warning'
        });
        return;
      }
      if (!name_eng.test(lastName)) {
        _this.$message({
          message: '英文名格式错误',
          type: 'warning'
        });
        return;
      }
      if (sex == '选择性别') {
        _this.$message({
          message: '请选择性别',
          type: 'warning'
        });
        return;
      }
      if (date == '选择出生日期') {
        _this.$message({
          message: '请选择出生日期',
          type: 'warning'
        });
        return;
      }
      let cdlist = [];
      for (let i = 0; i < englishname.length; i++) {
        if (englishname[i].val == 'NI') {
          englishname[i].name = '身份证';
        } else if (englishname[i].val == 'PP') {
          englishname[i].name = '护照';
        } else if (englishname[i].val == 'TB') {
          englishname[i].name = '回乡证';
        } else if (englishname[i].val == 'GA') {
          englishname[i].name = '港澳通行证';
        } else if (englishname[i].val == 'HX') {
          englishname[i].name = '台胞证';
        }
        englishname[i].value = englishname[i].valueFag[3] == "*"? englishname[i].value : englishname[i].valueFag

        if (englishname[i].value == "") {
          _this.$message({
            message: '证件信息不能为空',
            type: 'warning'
          });
          return;
        } else {
          if (englishname[i].val == 'NI' && !idcardReg.test(englishname[i].value)) {
            _this.$message({
              message: '身份证格式不正确',
              type: 'warning'
            });
            return
          } else if (englishname[i].val == 'PP' && !passport.test(englishname[i].value)) {
            _this.$message({
              message: '护照格式不正确',
              type: 'warning'
            });
            return
          } else if (englishname[i].val == 'TB' && !taiwan.test(englishname[i].value)) {
            _this.$message({
              message: '台胞证格式不正确',
              type: 'warning'
            });
            return
          } else if (englishname[i].val == 'GA' && !hongkongcard.test(englishname[i].value)) {
            _this.$message({
              message: '港澳通行证格式不正确',
              type: 'warning'
            });
            return
          } else if (englishname[i].val == 'HX' && !hometown.test(englishname[i].value)) {
            _this.$message({
              message: '回乡证格式不正确',
              type: 'warning'
            });
            return
          }
          cdlist.push({
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
          message: '不能选择相同的证件',
          type: 'warning'
        });
      } else {
        let newdata = [];
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
        let user = {
          'firstNameZh': firstNameZh,
          'lastNameZh': lastNameZh,
          "firstName": firstName,
          "lastName": lastName,
          "gender": sex,
          "birthdateStr": date,
          "customerNo": _this.userinfos.passengerVo.customerNo,
          "passengerNo": _this.userinfos.passengerVo.id,
          "certificateList": newdata
        }
        _this.loading = true;
        try {
          const res = await _this.$api.mymessage.updatePassengerCertificateList(user);
          _this.loading = false;
          if (res.code == 200) {
            _this.$message({
              message: '修改成功！',
              type: 'success'
            });
            setTimeout(() => {
              this.userlist();
              this.covesr = false;
              this.covers = false;
            }, 1000)
          } else {
            _this.$message({
              message: res.message,
              type: 'warning'
            });
          }
        } catch (e) {
          console.log(e)
          _this.loading = false;
        }
      }
    },
    changNum(item,index){
      this.englishname_list[index].flag = !this.englishname_list[index].flag
       this.$forceUpdate()
    }
  }
}
</script>

<style scoped lang="less">
p:hover {
  color: #ff7362;
}

.my_mes {
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 998;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
  }

  .popups {
    width: 300px;
    height: 300px;
    position: fixed;
    padding: 2%;
    top: 35%;
    left: 40%;
    z-index: 999;
    background: #FFFFFF;
    border-radius: 10px;
    box-shadow: 1px 1px 10px #888888;

    .input_cs {
      width: 100px;
    }

    .popups_company {
      text-align: center;
      margin-top: 20px;
      color: #bac6d1;
    }

    .department {
      text-align: center;
      margin-top: 15px;
      color: #acb8c3;
    }

    .company_name {
      text-align: center;
      font-size: 15px;
      margin-top: 15px;
      color: #3b4f62;
    }

    .cell_phone_number {
      text-align: center;
      font-size: 20px;
      margin-top: 25px;
      color: #3b4f62;
    }

    .cell_phone {
      text-align: center;
      font-size: 15px;
      margin-top: 15px;
      color: #3b4f62;
    }

    .cell_phones {
      text-align: center;
      font-size: 25px;
      margin-top: 15px;
      color: #3b4f62;
      font-weight: bold;
    }

    .dimission {
      width: 300px;
      margin-top: 40px;
      padding: 10px;
      font-size: 20px;
      color: #FFFFFF;
      border: 0;
      border-radius: 5px;
      background: #007aff;
      cursor: pointer;
    }

    .cancel {
      width: 300px;
      margin-top: 20px;
      padding: 10px;
      font-size: 20px;
      color: #007aff;
      background: #FFFFFF;
      border-radius: 5px;
      border: 1px solid #007aff;
      cursor: pointer;
    }

    .confirm {
      background: #FFFFFF;

    }

    .inputs_css {
      width: 300px;
      height: 40px;
      border: 1px solid #999;
      border-radius: 3px;
    }

    .inputs_cs {
      display: flex;
      margin-top: 10px;

      input {
        width: 175px;
        height: 40px;
        border: 1px solid #999;
        border-right: 0px;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      }

      button {
        margin-top: 10px;
        color: white;
        background: #CCCCCC;
        width: 125px;
        height: 42px;
        border: 0px solid;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        cursor: pointer;
      }

      .disabled {
        color: #007AFF;
        border: 1 upx solid #007AFF;
      }
    }

  }

  .my_metp {
    width: 100%;
    background: #FFFFFF;
    color: #3B4F62;
    text-indent: 30px;
    line-height: 60px;
  }

  .info_rmation {
    width: 100%;
    background: #FFFFFF;
    color: #3B4F62;
    display: flex;
    text-indent: 20px;

    .imgs {
      margin-top: 36px;
      margin-left: 20px;
    }

    .infos_rmation {
      margin: 0 20px;
      line-height: 50px;
      color: #758DA3;
    }

    .infoe_rmation {
      margin: 50px 36px;

      .userName {
        width: 100%;
        line-height: 30px;
        display: flex;

        .userName_left {
          color: #ABB7C2;
          font-size: 15px;
          width: 100px;
        }

        .userName_right {
        }


        .change_phone {
          color: #007aff;
          cursor: pointer;
        }

        .unbound {
          color: #007aff;
          cursor: pointer;
        }
      }

      .certificate {
        margin-left: 20px;
        margin-top: 18px;
        width: 75%;
        border: 1px solid #e9eeff;
        border-radius: 10px;

        .infos_certificate {
          display: flex;
          line-height: 50px;
          color: #758DA3;

          .infos_left {
            font-size: 14px;
            font-weight: bolder;
            color: #333333;
          }

          .infos_right {
            font-size: 14px;
            color: #3c85fd;
            cursor: pointer;
          }
        }

        .infoes_certificate {
          display: flex;
          flex-wrap: wrap;

          .userNames {
            width: 50%;
            line-height: 35px;
            display: flex;
            align-items: center;
            .userNames_left {
              width: 32%;
              color: #ABB7C2;
              font-size: 15px;
            }

            .userNames_right {
              // width: 40%;
              margin-right: 10px;
            }
            .el-icon-view{
              text-indent: 0;
              color: #007aff;
              cursor: pointer;
            }
          }
        }

        .bottom {
          width: 100%;
          height: 40px;
          border-radius: 10px;
          background-image: url(../../../../static/image/home/settings.png);
        }
      }
    }
  }

  .info_certificate {
    width: 100%;
    margin-top: 20px;
    background: #FFFFFF;
    color: #3B4F62;

    .infos_certificate {
      display: flex;
      justify-content: space-between;
      margin: 0 40px;
      line-height: 50px;
      color: #758DA3;

      .infos_left {
      }

      .infos_right {
        color: #007aff;
        cursor: pointer;
      }
    }

    .infoe_certificate {
      margin: 0 40px;
      text-indent: 20px;
      border-top: 1px solid #EEEEEE;

      .userNames {
        line-height: 50px;
        display: flex;

        .userNames_left {
          color: #ABB7C2;
          font-size: 15px;
          width: 100px;
        }

        .userNames_right {
          padding: 0 10px;
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
      box-shadow: 0px 0px 10px #888888;
      z-index: 994;
      padding-bottom: 20px;
      overflow: auto;

      .title {
        width: 100%;
        text-align: center;
        font-size: 18px;
        margin-top: 40px;
      }

      .Cover_aname {
        margin: auto;
        width: 440px;
        text-align: right;
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
          width: 130px;
          text-indent: 15px;
        }

        .frop_right {
          width: 10%;
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

        .select_option {
          border: 0px;
          z-index: 9999 !important;
        }
      }

      .Cover_nameas {
        margin: auto;
        margin-top: 20px;
        width: 440px;
        height: 60px;
        line-height: 60px;
        border: 1px solid #D0D7DE;
        display: flex;
        position: relative;

        .dvsep {
          /deep/ .el-input__inner {
            border: 0px solid #dcdfe6;
          }

          position: relative;

          .citynames {
            position: absolute;
            width: calc(100% - 40px);
            padding: 0 20px;
            max-height: 280px;
            line-height: 30px;
            overflow-x: auto;
            top: 40px;
            left: 0;
            background: #F1F1F1;
            z-index: 20;

            .ciylist {
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 14px;
              cursor: pointer;

              .ctname {
                width: 80%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              .ctid {
                width: 20%;
                text-align: right;
                color: #007AFF;
              }
            }
          }
        }

        .Cover_names {
          width: 130px;
          text-indent: 15px;
        }

        .frop_right {
          width: 10%;
          display: flex;
          align-items: center;
          justify-content: flex-end;

          .rig_delt {
            font-size: 16px;
            color: #409EFF;
          }
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

        .select_option {
          border: 0px;
          z-index: 9999 !important;
        }

        .select {
          width: 300px;
          text-align: center;
          background: white;
          border: 1px solid #CCCCCC;
          position: absolute;
          top: 60px;
          z-index: 999;
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

input {
  outline: none;
  width: 240px;
}
</style>
<style lang="less">
 .block{
      &>.el-input{
      width: 100%;
    }
  }
</style>
