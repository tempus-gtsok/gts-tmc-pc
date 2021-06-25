<template>
<!-- 企业管理->员工信息 -->
  <div class="employ">
    <div class="empids" v-if="empid == 1" v-loading="lodings">
      <div class="emptops">
        <div>
          <div class="addempts" v-if="rotes('tms:col:add')" @click="empadd('add')">
            新增
          </div>
        </div>
        <div style="display: flex;">
          <div class="addprcibox">
            <el-upload class="avatar-uploader" action="/api/tms/api/cpsuser/importPassenger" :show-file-list="false"
                       accept=".xls,.xlsx"
                       :headers="{AuthToken:tokens}" :on-success="handleSuccesst" :on-error="handleErrort"
                       :before-upload="handleBeforeUploadt"
                       :on-progress="handleProgresst">
              <div class="addempts">
                导入员工
              </div>
            </el-upload>
          </div>
          <div class="addempts" @click="mbadd" style="margin-left: 10px;">
            模板下载
          </div>
        </div>
      </div>
      <el-table :header-cell-style="{background:'#f6f6f6',color:'#666'}" border="" ref="multipleTable"
                :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column width="120" label="姓名">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="手机号码" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column label="证件信息" width="200px" show-overflow-tooltip>
          <template slot-scope="scope" v-if="scope.row.certificateList != null">
            {{ scope.row.certificateList[0].cardType | catypeEn }}:{{ scope.row.certificateList[0].cardNo }}
          </template>
        </el-table-column>
        <el-table-column label="部门" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.deptName }}</template>
        </el-table-column>
        <el-table-column width="130px" label="职级名称">
          <template slot-scope="scope">{{ scope.row.jobName }}</template>
        </el-table-column>
        <el-table-column label="级别名称">
          <template slot-scope="scope">{{ scope.row.staffLevel }}</template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{ staname(scope.row.status) }}</template>
        </el-table-column>
        <el-table-column width="160px" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" v-if="rotes('tms:col:modify')" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" v-if="totalPatge > 1">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="10"
                       layout="prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="addemploy" v-if="empid == 2" v-loading="lodings">
      <div class="pltops">基本信息</div>
      <div class="formadds">
        <div class="folists" v-if="addpassid == -1">
          <div class="dvlef">用户名<p>*</p>
          </div>
          <div class="dvsep">
            <el-input v-model="username" placeholder="请输入用户名"></el-input>
          </div>
        </div>
        <div class="folists">
          <div class="dvlef">用户类型<p>*</p>
          </div>
          <div class="dvsep">
            <el-select v-model="usertypes" placeholder="请选择">
              <el-option v-for="item in usertype" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="folists">
          <div class="dvlef">用户状态</div>
          <div class="dvsep">
            <el-select v-model="userstatus" placeholder="请选择">
              <el-option v-for="item in userstatu" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="folists" v-if="addpassid == -1">
          <div class="dvlef">员工号</div>
          <div class="dvsep">
            <el-input v-model="userno" placeholder="请输入员工号"></el-input>
          </div>
        </div>
      </div>
      <div class="formadds">
        <div class="folists">
          <div class="dvlef">姓<p>*</p>
          </div>
          <div class="dvsep">
            <el-input v-model="zhfirstname" placeholder="请输入中文姓"></el-input>
          </div>
        </div>
        <div class="folists">
          <div class="dvlef">名<p>*</p>
          </div>
          <div class="dvsep">
            <el-input v-model="zhlastname" placeholder="请输入中文名"></el-input>
          </div>
        </div>
        <div class="folists">
          <div class="dvlef">姓(拼音)<p>*</p>
          </div>
          <div class="dvsep">
            <el-input v-model="enfirstname" placeholder="请输入英文姓"></el-input>
          </div>
        </div>
        <div class="folists">
          <div class="dvlef">名(拼音)<p>*</p>
          </div>
          <div class="dvsep">
            <el-input v-model="enlastname" placeholder="请输入英文名"></el-input>
          </div>
        </div>
      </div>
      <div class="formadds">
        <div class="folists">
          <div class="dvlef">性别<p>*</p>
          </div>
          <div class="dvsep">
            <el-select v-model="usergender" placeholder="请选择">
              <el-option v-for="item in usergenders" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="folists">
          <div class="dvlef">生日<p>*</p>
          </div>
          <div class="dvsep">
            <el-date-picker style="width: 100%;" v-model="birthdays" value-format="yyyy-MM-dd" type="date"
                            placeholder="选择生日">
            </el-date-picker>
          </div>
        </div>
        <div class="folists">
          <div class="dvlef">联系电话<p>*</p>
          </div>
          <div class="dvsep">
            <el-input v-model="phone" maxlength="11" placeholder="请输入联系电话"></el-input>
          </div>
        </div>
        <div class="folists">
          <div class="dvlef">电子邮箱</div>
          <div class="dvsep">
            <el-input type="email" v-model="emails" placeholder="请输入电子邮箱 "></el-input>
          </div>
        </div>
      </div>
      <div class="formadds">
        <div class="folists">
          <div class="dvlef">部门<p>*</p>
          </div>
          <div class="dvsep">
            <el-cascader style="width: 100%" ref="cascader" v-model="departmentid" :show-all-levels="false"
                         @change="handleChange"
                         :props='bots' :options="departments"></el-cascader>
          </div>
        </div>
        <div class="folists">
          <div class="dvlef">成本中心<p>*</p>
          </div>
          <div class="dvsep">
            <el-cascader style="width: 100%" ref="carlists" v-model="comitnsid" :show-all-levels="false"
                         @change="handletreeLists"
                         :props='bots' :options="treeLists"></el-cascader>
          </div>
        </div>
        <div class="folists">
          <div class="dvlef">职级名称</div>
          <div class="dvsep">
            <el-select v-model="levlLists" placeholder="请选择">
              <el-option v-for="item in levlList" :key="item.id" :label="item.jobName" :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="folists">
          <div class="dvlef">职级等级</div>
          <div class="dvsep">
            <el-select v-model="tmsStaffLevel" placeholder="请选择">
              <el-option v-for="item in tmsStaffLevelsResp" :key="item.tslId" :label="item.tslLevelCode"
                         :value="item.tslId">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="formadds">
        <div class="folists">
          <div class="dvlef">国籍</div>
          <div class="dvsep">
            <el-select v-model="countryLists" filterable placeholder="请选择">
              <el-option v-for="item in countryList" :key="item.countryCode" :label="item.countryCName"
                         :value="item.countryCode">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="folists">
          <div class="dvlef">职位名称</div>
          <div class="dvsep">
            <el-input v-model="jobtitle" placeholder="请输入职位名称"></el-input>
          </div>
        </div>
        <div class="folists" v-if="userstatus == 1 || userstatus == '使用中'">
          <div class="dvlef">角色<p>*</p>
          </div>
          <div class="dvsep">
            <el-select v-model="roleLists" placeholder="请选择">
              <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="folists">
          <div class="dvlef">昵称</div>
          <div class="dvsep">
            <el-input v-model="nickname" placeholder="请输入昵称"></el-input>
          </div>
        </div>
      </div>
      <div class="ptopslo" v-if="path">
        <div>员工照片</div>
        <div style="width: 80px;height: 80px;margin-left: 30px;">
          <el-upload class="avatar-uploader" :action="path" :show-file-list="false" :accept="'image/*'"
                     :headers="{AuthToken:tokens}" :on-success="handleSuccess" :on-error="handleError"
                     :before-upload="handleBeforeUpload"
                     :on-progress="handleProgress">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>

        <!--
          action: 图片上传的地址
          show-file-list: 是否显示文件上传列表
          accept: 可接受的上传类型，image/*为图片
          headers: 头部信息
          on-success: 上传成功事件
          on-error: 上传失败事件
          before-upload: 上传前处理事件，返回一个值，值为false将阻止上传
          on-progress: 上传中事件
          -->
      </div>
      <div class="pltops" style="margin-top: 20px;">证件信息</div>
      <div class="formadds formadds_zj" v-for="(item,index) in caruserlist">
        <div class="folists">
          <div class="dvlef">证件姓<p>*</p>
          </div>
          <div class="dvsep">
            <el-input v-model="item.carfirstame" placeholder="请输入用户姓"></el-input>
          </div>
        </div>
        <div class="folists">
          <div class="dvlef">证件名<p>*</p>
          </div>
          <div class="dvsep">
            <el-input v-model="item.carlastName" placeholder="请输入用户名"></el-input>
          </div>
        </div>
        <div class="folists">
          <div class="dvlef">证件类型<p>*</p>
          </div>
          <div class="dvsep">
            <el-select v-model="item.cartype" placeholder="请选择">
              <el-option v-for="items in cardTypeList" :key="items.code" :label="items.name" :value="items.code">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="folists">
          <div class="dvlef">证件号码<p>*</p>
          </div>
          <div class="dvsep">
            <el-input v-model="item.carno" placeholder="请输入证件号码"></el-input>
          </div>
        </div>
        <div class="folists">
          <div class="dvlef">有效期<p>*</p>
          </div>
          <div class="dvsep">
            <div class="dvsep">
              <el-date-picker style="width: 83%;" value-format="yyyy-MM-dd" v-model="item.catendtime" type="date"
                              placeholder="选择有效期">
              </el-date-picker>
            </div>
          </div>
          <div class="iconfont closx" style="color: red;" v-if="index != 0" @click="deletecar(index)">
            &#xe620;
          </div>
        </div>
      </div>
      <div class="addcars">
        <span class="iconfont" style="color: #52C41A;cursor: pointer;" @click="addcarslist">&#xe603;</span>
      </div>
      <div class="btnclas">
        <div class="addempts" v-loading="loadBut" @click="useradd" v-if="this.addpassid == -1">
          新增员工
        </div>
        <div class="addempts" v-loading="loadBut" @click="useradd" v-if="this.addpassid != -1">
          修改员工
        </div>
        <el-button plain @click="retuns" class="rsblck">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

let idcardReg =
    /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/; //身份证正则
let passport = /^[a-zA-Z0-9]{5,17}$/; //护照
let taiwan = /^([0-9]{8}|[0-9]{10})$/; //台胞证
let hongkongcard = /^[a-zA-Z0-9]{6,10}$/; //港澳通行
let hometown = /^[a-zA-Z]\d{8}$|^\d{15}$|^\d{17}(\d|x|X)$/; //回乡证
let ip_test = /^[1][3456789][0-9]{9}$/; //电话号码正则
let em_test = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/ //邮箱正则
let name_zh = /^[\u4E00-\u9FA5]{1,5}$/; //中文正则
import { catypeEn } from "@/utils/common-filters";
export default {
		filters:{
			catypeEn
		},
  data() {
    return {
      tokens: JSON.parse(sessionStorage.getItem('userinfo')).token,
      imageUrl: '', //照片路径
      lodings: false,
      bots: { //使用props替换掉本来默认的lable和value 的键值
        value: 'id',
        label: 'text',
        checkStrictly: true //可以选父级
      },
      departments: [], //部门信息
      empid: 1,
      tableData: [], //用户数据
      totalPatge: 0, //总共多少页
      curPages: 1, //当前第几页
      total: 0, //多少条数据
      currentPage3: 1,
      username: '', //用户名
      usertype: [{ //用户类型
        value: 'ADT',
        label: '成人'
      }, {
        value: 'CHD',
        label: '儿童'
      }],
      userstatu: [{ //用户状态
        value: 0,
        label: '禁用'
      }, {
        value: 1,
        label: '使用中',
      }, {
        value: 2,
        label: '待审核'
      }],
      usergenders: [{ //性别
        value: 'M',
        label: '男'
      }, {
        value: 'F',
        label: '女'
      }],
      birthdays: '', //生日
      usergender: '请选择',
      emails: '', //电子邮箱
      phone: '', //联系电话
      userstatus: '使用中', //用户状态
      usertypes: "成人",
      nationality: '', //国籍
      nationalityid: '', //国籍id
      ctysbg: false,
      jobtitle: '', //职位名称
      nickname: '', //昵称
      treeLists: [], //成本中心
      departmentname: '', //部门名称
      departmentid: '', //部门id
      comitnsname: '', //成本中心名称
      comitnsid: '', //成本中心id
      tmsStaffLevel: '', //职位
      userno: '', //员工号
      zhfirstname: '', //中文姓
      zhlastname: '', //中文民
      enfirstname: '', //英文姓
      enlastname: '', //英文民
      cardTypeList: [], //证件信息
      levlList: [], //角色列表
      levlLists: '', //角色等级
      countryList: [], //国籍
      countryLists: '', //所选国籍
      tmsStaffLevelsResp: [], //职位列表
      roleList: [], //角色
      roleLists: '', //角色
      caruserlist: [], //证件信息
      delete_list: [], //储存被删除的值
      addpassid: '-1', //新增传-1  修改传id
      userid: null,
      users_id: null,
      path: null,
			loadBut:false
    }
  },
  mounted() {
    this.path = sessionStorage.getItem('root') + "/tms/api/user/uploadPassengerImage" || '';
    this.searchuser();
  },
  methods: {
    handleSuccesst(response, file, fileList) { //上传文件成功后处理---
      this.uploading.close();
      if (response.code == 200) {
        this.$message({
          message: '新增成功！',
          type: 'success'
        })
        this.searchuser();
      } else {
        this.$message({
          message: res.data,
          type: 'error'
        })
      }
    },
    handleErrort() {
      this.uploading.close();
      this.$message({
        message: '上传失败,请重新上传文件!！',
        type: 'error'
      })
    },
    handleBeforeUploadt(file) {
      let isImage = true;
      if (file.name.includes(".xls") || file.name.includes(".xlsx")) {
        isImage = true;
      } else {
        isImage = false;
      }
      if (!isImage) {
        this.$message.error("上传文件类型错误!");
      }
      return isImage;
    },
    handleProgresst(event, file, fileList) {
      this.uploading = this.$loading({
        lock: true,
        text: '员工导入中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    mbadd() { //模板下载
      axios.get('/static/importPassenger.xls', {
        responseType: 'blob', //重要
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        let fname = '导入员工模板.xls';
        link.href = url;
        link.setAttribute('download', fname);
        document.body.appendChild(link);
        link.click();
      });
    },
    handleSelectedFile(file) {
      let bodys = file.body;
      let headers = file.header;
      let heads = [];
      for (let k in headers) {
        heads.push(headers[k])
      }
      let userList = [];
      for (var i = 0; i < bodys.length; i++) {
        let userDetail = [];
        for (let j in heads) {
          userDetail.push(bodys[i][heads[j]]);
        }
        userList.push(userDetail);
      }
    },
    retuns() { //返回
      this.empid = 1;
      this.searchuser();
    },
    handleSuccess(response, file, fileList) { //上传头像成功后处理---
      this.$message({
        message: '上传成功！',
        type: 'success'
      })
      if (response.code == 200) {
        this.imageUrl = response.data;
      }
    },
    handleError() {
      this.$message({
        message: '上传失败,请重新上传图片!！',
        type: 'error'
      })
    },
    handleBeforeUpload(file) {
      const isImage = file.type.includes("image");
      if (!isImage) {
        this.$message.error("上传文件类型必须是图片!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isImage && isLt2M;
    },
    handleProgress(event, file, fileList) {
      this.loadings = true; //  上传时执行loading事件
    },
    async useradd() {
			if (this.loadBut) return
			this.loadBut = true
      let username = this.username; //用户名 (非空)
      let usertypes = this.usertypes; //用户类型 (非空)
      let userstatus = this.userstatus; //用户状态
      let userno = this.userno; //员工号
      let zhfirstname = this.zhfirstname; //中文姓 (非空)
      let zhlastname = this.zhlastname; //中文名 (非空)
      let enfirstname = this.enfirstname; //英文姓 (非空)
      let enlastname = this.enlastname; //英文名 (非空)
      let usergender = this.usergender; //性别 (非空)
      let birthdays = this.birthdays; //生日 (非空)
      let phone = this.phone; //本人手机号 (非空)
      let email = this.emails; //邮箱
      let levlLists = this.levlLists; //角色等级
      let tmsStaffLevel = this.tmsStaffLevel; //职位
      let countryLists = this.countryLists; //国籍
      let jobtitle = this.jobtitle; //职位名称
      let roleLists = this.roleLists; //角色 (非空)
      let nickname = this.nickname; //昵称
      let imageUrl = this.imageUrl; //头像
      let caruserlist = this.caruserlist; //证件信息 (非空)
      let departmentid = this.departmentid; //部门id (非空)
      let comitnsid = this.comitnsid; //成本id (非空)
      if (username == '') {
        this.$message({
          message: '用户名不能为空!',
          type: 'warning'
        })
        this.loadBut = false
        return
      }
      if (usertypes == '') {
        this.$message({
          message: '用户类型不能为空!',
          type: 'warning'
        })
        this.loadBut = false
        return
      }
      if (zhfirstname == '') {
        this.$message({
          message: '中文姓不能为空!',
          type: 'warning'
        })
        this.loadBut = false
        return
      }
      if (zhlastname == '') {
        this.$message({
          message: '中文名不能为空!',
          type: 'warning'
        })
        this.loadBut = false
        return
      }
      if (enfirstname == '') {
        this.$message({
          message: '英文姓不能为空!',
          type: 'warning'
        })
        this.loadBut = false
        return
      }
      if (enlastname == '') {
        this.$message({
          message: '英文名不能为空!',
          type: 'warning'
        })
        this.loadBut = false
        return
      }
      if (usergender == '请选择') {
        this.$message({
          message: '性别不能为空!',
          type: 'warning'
        })
        this.loadBut = false
        return
      }
      if (birthdays == '') {
        this.$message({
          message: '生日不能为空!',
          type: 'warning'
        })
        this.loadBut = false
        return
      }
      if (phone == '' || !ip_test.test(phone)) {
        this.$message({
          message: '请输入正确的手机号！',
          type: 'warning'
        })
        this.loadBut = false
        return
      }
      if ((userstatus == 1 || userstatus == '使用中') && roleLists == '') {
        this.$message({
          message: '角色不能为空!',
          type: 'warning'
        })
        this.loadBut = false
        return
      }
      if (departmentid == '') {
        this.$message({
          message: '所属部门不能为空!',
          type: 'warning'
        })
        this.loadBut = false
        return
      }
      if (comitnsid == '') {
        this.$message({
          message: '所属成本中心不能为空!',
          type: 'warning'
        })
        this.loadBut = false
        return
      }
      if (email != "" && !em_test.test(email)) {
        this.$message({
          message: '邮箱格式不正确!',
          type: 'warning'
        })
        this.loadBut = false
        return
      }
        if ((userstatus != 1 && userstatus != '使用中')) {
          roleLists = '';//不为使用中则清空角色
        }
        let carlist = [];
        for (let k in caruserlist) {
          if (!caruserlist[k].catendtime ||caruserlist[k].carfirstame == '' || caruserlist[k].carlastName == '' || caruserlist[k].cartype == '' || caruserlist[k].carno == '' || caruserlist[k]
              .catendtime == '') {
            this.$message({
              message: '证件信息不能为空!',
              type: 'warning'
            })
            this.loadBut = false
            return
          }
          if (caruserlist[k].cartype == 'NI' && !idcardReg.test(caruserlist[k].carno)) {
            this.$message({
              message: '身份证格式不正确!',
              type: 'warning'
            })
            this.loadBut = false
            return
          }
          if (caruserlist[k].cartype == 'PP' && !passport.test(caruserlist[k].carno)) {
            this.$message({
              message: '护照格式不正确!',
              type: 'warning'
            })
            this.loadBut = false
            return
          }
          if (caruserlist[k].cartype == 'TB' && !taiwan.test(caruserlist[k].carno)) {
            this.$message({
              message: '台胞证格式不正确!',
              type: 'warning'
            })
            this.loadBut = false
            return
          }
          if (caruserlist[k].cartype == 'GA' && !hongkongcard.test(caruserlist[k].carno)) {
            this.$message({
              message: '港澳通行证格式不正确!',
              type: 'warning'
            })
            this.loadBut = false
            return
          }
          if (caruserlist[k].cartype == 'HX' && !hometown.test(caruserlist[k].carno)) {
            this.$message({
              message: '回乡证格式不正确!',
              type: 'warning'
            })
            this.loadBut = false
            return
          }
          carlist.push({
            delFlag: 0,
            id: '',
            cardType: caruserlist[k].cartype,
            cardNo: caruserlist[k].carno,
            expiredDate: caruserlist[k].catendtime + " 00:00:00",
            firstName: caruserlist[k].carfirstame,
            lastName: caruserlist[k].carlastName,
          })
        
        let stlist = [];
        for (let i = 0; i < carlist.length; i++) {
          stlist.push(carlist[i].cardType)
        }
        if ((new Set(stlist)).size != stlist.length) {
          this.$message({
            message: '不能选择相同的证件!',
            type: 'warning'
          })
          this.loadBut = false
        } else {
          let newdata = [];
          if (this.addpassid != -1) { //修改
            carlist = [];
            for (let i = 0; i < caruserlist.length; i++) {
              carlist.push({
                delFlag: 0,
                id: caruserlist[i].id,
                cardType: caruserlist[i].cartype,
                cardNo: caruserlist[i].carno,
                expiredDate: caruserlist[i].catendtime + " 00:00:00",
                firstName: caruserlist[i].carfirstame,
                lastName: caruserlist[i].carlastName,
              })
            }
            newdata = carlist.concat(this.delete_list)
          } else {
            newdata = carlist
          }
          if (usertypes == '成人') {
            usertypes = 'ADT';
          }
          if (userstatus == '使用中') {
            userstatus = 1;
          }
          this.lodings = true;
          let dat = {
            headImg: imageUrl, //头像
            firstNameZh: zhfirstname, //中文姓
            lastNameZh: zhlastname, //中文名
            phone: phone, //电话
            firstName: enfirstname, //英文姓
            lastName: enlastname, //英文名
            deptId: departmentid, //部门
            birthdateStr: birthdays, //生日
            gender: usergender, //性别
            email: email, //邮箱
            roleId: roleLists, //角色
            staffLevel: tmsStaffLevel, //职位
            certificateList: newdata, //证件
            status: userstatus, //状态
            nickName: nickname, //昵称
            name: username, //名字
            ageType: usertypes, //用户类型
            nationality: countryLists, //国籍
            userId: userno, //员工号
            costcenterId: comitnsid, //成本id
            deptId: departmentid, //部门id
            jobLevel: levlLists, //角色等级
            job: jobtitle, //职位名称
            id: this.userid,
            userId: this.users_id
          }
          try {
            let res = await this.$api.business.savePassengerForCustomer(dat);
            this.lodings = false;
            if (res.code == 200) {
              if (this.addpassid != -1) { //修改
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
              this.empid = 1;
              let cont = 500
              let time = setInterval(()=>{
                  cont -= 100
                  if(cont == 0){
                    clearInterval(time);
                    this.loadBut = false
                  }
              },100)
              this.searchuser();
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
            this.lodings = false;
            //TODO handle the exception
          }
        }
      }
    },
    handleCurrentChange(val) { //翻页
      this.curPages = val;
      this.searchuser();
    },
    deletecar(index) { //删除证件
      let _this = this
      if (_this.addpassid != -1) {
        let credi = _this.caruserlist[index];
        if (credi.id == null) {
          _this.caruserlist.splice(index, 1); //删除当前证件
        } else {
          _this.caruserlist[index].delFlag = 1;
          _this.delete_list.push({
            id: _this.caruserlist[index].id,
            delFlag: _this.caruserlist[index].delFlag
          })
          _this.caruserlist.splice(index, 1);
        }
      } else {
        _this.caruserlist.splice(index, 1); //删除当前证件
      }
    },
    addcarslist() { //增加证件
      if (this.caruserlist.length == 6) {
        this.$message({
          message: '证件不能超过6个!',
          type: 'warning'
        })
        return
      } else {
        this.caruserlist.push({
          carfirstame: '', //证件名称
          carlastName: '', //证件名称
          cartype: '', //证件类型
          carno: '', //证件号码
          id: '',
          catendtime: '' //过期时间
        })
      }
    },
    async empadd(is) { //新增修改
      let _this = this;
      _this.caruserlist = [];
      if (is == 'add') { //新增
        Object.assign(_this.$data, _this.$options.data());
        _this.addpassid == -1
        _this.caruserlist.push({
          carfirstame: '', //证件名称
          carlastName: '', //证件名称
          cartype: '', //证件类型
          carno: '', //证件号码
          id: "",
          catendtime: '' //过期时间
        })
      }
      _this.lodings = true;
      try {
        let rek = await _this.$api.home.getCostCenterList(); //查询成本中心
        if (rek.code == 200) {
          _this.treeLists = rek.data[0].children;
        } else {
          _this.$message({
            message: rek.message,
            type: 'warning'
          })
        }
        let res = await _this.$api.business.getDeptList(); //查询所有部门
        if (res.code == 200) {
          _this.departments = res.data;
        } else {
          _this.$message({
            message: res.message,
            type: 'warning'
          })
        }
        let ret = await _this.$api.business.addPassengerForCustomer({
          id: _this.addpassid
        }); //查询新增修改需要的数据
        _this.lodings = false;
        if (ret.code == 200) {
          _this.cardTypeList = ret.data.cardTypeList; //获取证件信息
          _this.levlList = ret.data.levlList; //获取职级信息
          _this.countryList = ret.data.countryList; //国籍
          _this.roleList = ret.data.roleList; //角色
          _this.tmsStaffLevelsResp = ret.data.tmsStaffLevelsResp; //获取职位信息
          if (_this.addpassid != -1) {
            let useruplist = ret.data.passenger;
            _this.usergender = useruplist.gender != null ? useruplist.gender : ''; //性别
            _this.imageUrl = useruplist.headImg != null ? useruplist.headImg : ''; //头像
            _this.zhfirstname = useruplist.firstNameZh != null ? useruplist.firstNameZh : ''; //中文姓
            _this.zhlastname = useruplist.lastNameZh != null ? useruplist.lastNameZh : ''; //中文名
            _this.phone = useruplist.phone != null ? useruplist.phone : ''; //电话
            _this.enfirstname = useruplist.firstName != null ? useruplist.firstName : ''; //英文姓
            _this.enlastname = useruplist.lastName != null ? useruplist.lastName : ''; //英文名
            _this.departmentid = useruplist.deptId != null ? useruplist.deptId : ''; //部门
            _this.birthdays = useruplist.birthdateStr != null ? useruplist.birthdateStr : ''; //生日
            _this.email = useruplist.email != null ? useruplist.email : ''; //邮箱
            _this.roleLists = useruplist.roleId != null ? useruplist.roleId : ''; //角色
            _this.tmsStaffLevel = useruplist.staffLevel != '' ? parseInt(useruplist.staffLevel) : ''; //职位
            _this.userstatus = useruplist.status != null ? useruplist.status : ''; //状态
            _this.nickname = useruplist.nickName != null ? useruplist.nickName : ''; //昵称
            _this.username = useruplist.name != null ? useruplist.name : ''; //名字
            _this.usertypes = useruplist.ageType != null ? useruplist.ageType : ''; //用户类型
            _this.countryLists = useruplist.nationality != null ? useruplist.nationality : ''; //国籍
            _this.userno = useruplist.userId != null ? useruplist.userId : ''; //员工号
            _this.comitnsid = useruplist.costcenterId != null ? useruplist.costcenterId : ''; //成本id
            _this.departmentid = useruplist.deptId != null ? useruplist.deptId : ''; //部门id
            _this.levlLists = useruplist.jobLevel != null ? useruplist.jobLevel : ''; //角色等级
            _this.jobtitle = useruplist.job != null ? useruplist.job : ''; //职位名称
            _this.users_id = useruplist.userId; //获取用户id
            _this.userid = useruplist.id; //获取旅客id
            if (useruplist.certificateList != null) {
              for (let k in useruplist.certificateList) {
                _this.caruserlist.push({
                  id: useruplist.certificateList[k].id, //证件类型,
                  carfirstame: useruplist.certificateList[k].firstName, //证件名称
                  carlastName: useruplist.certificateList[k].lastName,
                  cartype: useruplist.certificateList[k].cardType, //证件类型
                  carno: useruplist.certificateList[k].cardNo, //证件号码
                  catendtime: useruplist.certificateList[k].expiredDate //过期时间
                })
              }
            }
          }
          _this.empid = 2;
        } else {
          _this.$message({
            message: res.message,
            type: 'warning'
          })
        }

      } catch (e) {
        this.lodings = false;
        console.log('部门查询异常:', e)
        //TODO handle the exception
      }
    },
    handleChange() { //选择当前部门
      let nodesObj = this.$refs['cascader'].getCheckedNodes(); //获取当前节点的信息
      this.departmentname = nodesObj[0].data.text;
      this.departmentid = nodesObj[0].data.id;
    },
    handletreeLists() { //选择当前成本中心
      let nodesObj = this.$refs['carlists'].getCheckedNodes(); //获取当前节点的信息
      this.comitnsname = nodesObj[0].data.text;
      this.comitnsid = nodesObj[0].data.id;
    },
    staname(it) {
      if (it == 1) {
        return '使用中'
      } else if (it == 2) {
        return '待审核'
      } else if (it == 0) {
        return '禁用中'
      }
    },
    // catype(it) { //返回证件类型
    //   if (it == 'NI') {
    //     return '身份证'
    //   } else if (it == 'PP') {
    //     return '护照'
    //   } else if (it == 'TB') {
    //     return '台胞证'
    //   } else if (it == 'GA') {
    //     return '港澳通行证'
    //   } else if (it == 'HX') {
    //     return '回乡证'
    //   } else if (it == 'OS') {
    //     return '其他证件'
    //   }
    // },
    handleEdit(index, row) { //修改
      this.addpassid = row.id;
      this.delete_list = [];
      this.empadd(this.addpassid);
    },
    async handleDelete(index, row) { //删除
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.lodings = true;
        this.$api.business.deleteOrStatus({
          id: row.id,
          valid: 1
        }).then((res) => {
          this.lodings = false;
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
        }).catch((e) => {
          this.lodings = false;
          console.log('同事删除错误:', e)
        })
      });
    },
    async searchuser() { //查询公司所有员工
   
      try {
         this.lodings = true;
        let res = await this.$api.business.getCustomerUserListForPC({
          "pageVO": {
            "curPage": this.curPages,
            "rowNum": 10
          },
          "passenger": {}
        });
        if (res.code == 200) {
          this.total = res.data.records; //一共多少条
          this.totalPatge = res.data.total; //总共多少页
          this.tableData = res.data.rows;
          this.lodings = false;
        } else {
          this.lodings = false;
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      } catch (e) {
        console.log(e)
        this.lodings = false;
        //TODO handle the exception
      }
    }
  }
}
</script>
<style scoped lang="less">
.addempts:hover {
  opacity: 0.8;
}
.employ {
  margin-top: 20px;
  width: calc(100% - 40px);
  padding: 20px;
  background-color: #FFFFFF;

  .empids {
    width: 100%;

    .emptops {
      width: 100%;
      padding: 10px 0;
      display: flex;
      justify-content: space-between;

      .addempts {
        width: 100px;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
        text-align: center;
        line-height: 40px;
        background-color: #007AFF;
        color: #FFFFFF;
      }

      .addprcibox {
        width: 100px;
        height: 40px;
        margin-left: 10px;

        .avatar-uploader .el-upload {
          border: none;
          position: relative;
          overflow: hidden;
        }

        .avatar-uploader .el-upload:hover {
          border-color: #409EFF;
        }

        .avatar-uploader /deep/ .el-upload--text {
          border: none;
          width: 100%;
          height: 100%;
        }
      }

      .addprcibox /deep/ .xlsx-button {
        width: 100px;
        height: 40px;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
        text-align: center;
        background-color: #007AFF;
        color: #FFFFFF;
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

  .addemploy {
    width: 100%;
    overflow-x: auto;

    .pltops {
      font-size: 15px;
      font-weight: 600;
    }

    .ptopslo {
      width: 100%;
      font-size: 12px;
      display: flex;
      align-items: center;

      .avatar-uploader .el-upload {
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 0px;
        height: 0px;
      }

      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }

      .avatar-uploader /deep/ .el-upload--text {
        width: 100%;
        height: 100%;
      }

      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 70px;
        height: 70px;
        line-height: 70px;
        text-align: center;
      }

      .avatar {
        width: 70px;
        height: 70px;
        display: block;
      }
    }

    .formadds {
      margin: 10px 0;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .folists {
        display: flex;
        position: relative;

        .closx {
          position: absolute;
          cursor: pointer;
          right: 3px;
          top: 10px;
        }

        .dvlef {
          font-size: 12px;
          width: 80px;
          display: flex;
          align-items: center;

          p {
            color: red;
            font-size: 16px;
          }
        }

        .dvsep {
          width: 160px;
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
      }
    }
    .formadds_zj{
      &>.folists{
        &>.dvlef{
          width: 55px;
          margin-right: 5px;
        }
      }
    }
    .addcars {
      width: calc(100% - 2px);
      height: 40px;
      line-height: 40px;

      span {
        float: right;
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
        background-color: #007AFF;
        color: #FFFFFF;
      }

      .addempts:hover {
        opacity: 0.8;
      }
      .rsblck {
        width: 100px;
        border-radius: 5px;
        font-size: 14px;
        margin: 0 10px;
      }
    }
  }
}

</style>
