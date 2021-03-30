<template>
  <div class="nativelist" v-loading="loading">
    <div class="addbtns" @click="addrule">添加国内用车政策</div>
    <el-table :header-cell-style="{background:'#f6f6f6',color:'#666'}" border="" ref="multipleTable"
              :data="tablelist" tooltip-effect="dark" style="width: 100%;margin-top: 20px;">
      <el-table-column width="100" label="级别名称">
        <template slot-scope="scope">
          {{ scope.row.levelName }}
        </template>
      </el-table-column>
      <el-table-column label="级别" width="100" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.levelCode }}
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
            <div class="trnames">级别名称<span>*</span></div>
            <div class="trrings">
              <el-radio v-for="(item, index) in employeeLevellist" :key="index" v-model="employeeLevel"
                        :label="item.tslId">{{ item.tslName }}
              </el-radio>
            </div>
          </div>
          <div class="trright"></div>
        </div>

        <div class="trstps">
          <div class="trleft">
            <div class="trnames">平台限制<span>*</span></div>
            <div class="trring">
              <el-checkbox-group v-model="carPlatform">
                <el-checkbox v-for="item in carPlatformlist" :key="item.id" :label="item.id">{{
                    item.name
                  }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="trright">
            <div class="trnames">管控规则</div>
            <div class="trring">
              <el-select v-model="carPlatformis" style="width: 150px;" placeholder="请选择"
                         :title="controlrulesName.carPlatformisName">
                <el-option v-for="items in controlrules" :key="items.id" :label="items.name"
                           :value="items.id"></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="trstps">
          <div class="trleft">
            <div class="trnames">车型限制<span>*</span></div>
            <div class="trring">
              <el-checkbox-group v-model="carGroup">
                <el-checkbox v-for="item in carGrouplist" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="trright">
            <div class="trnames">管控规则</div>
            <div class="trring">
              <el-select v-model="carGroupis" style="width: 150px;" placeholder="请选择"
                         :title="controlrulesName.carGroupisName">
                <el-option v-for="items in controlrules" :key="items.id" :label="items.name"
                           :value="items.id"></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="trstps">
          <div class="trleft">
            <div class="trnames">金额限制</div>
            <div class="trring">
              <el-checkbox-group v-model="carpricelis">
                <div class="trvboxs" v-for="(item, index) in carpricelimt" :key="index">
                  <div style="width: 150px;">
                    <el-checkbox :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
                  </div>
                  <div>
                    <el-input style="width: 150px;" maxlength="6" v-model="item.value"></el-input>
                  </div>
                </div>
              </el-checkbox-group>
            </div>
          </div>
          <div class="trright">
            <div class="trnames">管控规则</div>
            <div class="trring">
              <el-select v-model="carPriceis" style="width: 150px;" placeholder="请选择"
                         :title="controlrulesName.carPriceisName">
                <el-option v-for="items in controlrules" :key="items.id" :label="items.name"
                           :value="items.id"></el-option>
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
      carpricelimt: [{
        name: '按每次乘车限制',
        id: '1',
        isok: false,
        value: ''
      }, {
        name: '按每天乘车限制',
        id: '2',
        isok: false,
        value: ''
      }, {
        name: '按每月乘车限制',
        id: '3',
        isok: false,
        value: ''
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
      controlrulesName: [{
        carPlatformisName: '',
        carGroupisName: '',
        carPriceisName: ''
      }],
      carpricelis: [],
      carGroup: [], //车类型值
      carPlatform: [], //车平台值

      carGroupis: 1, //车类型规则
      carPlatformis: 1, //车平台规则
      carPriceis: 1, //次天月规则

      carGrouplist: [], //车类型
      carPlatformlist: [], //车平台
      dialogVisible: false,
      tablelist: [], //查询数据

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
      this.employeeLevel = this.$options.data().employeeLevel;
      this.carpricelimt = this.$options.data().carpricelimt;
      this.carpricelis = this.$options.data().carpricelis;
      this.carGroup = this.$options.data().carGroup;
      this.carPlatform = this.$options.data().carPlatform;
      this.carGroupis = this.$options.data().carGroupis;
      this.carPlatformis = this.$options.data().carPlatformis;
      this.carPriceis = this.$options.data().carPriceis;

      this.natid = '';
      this.dialogVisible = true;
    },
    async handleEdit(index, row) { //修改
      this.loading = true;
      try {
        this.natid = row.id;
        let res = await this.$api.business.getCarRule({
          id: row.id
        })
        if (res.code == 200) {
          let dast = res.data;
          if (dast.platformLimit != null) {
            let platform = [];
            let platforms = dast.platformLimit.split(',');
            for (let k in platforms) {
              platform.push(platforms[k])
            }
            this.carPlatform = platform; //车平台
          }
          this.carPlatformis = dast.platformLimitRule; //车平台规则
          if (dast.carGroupLimit != null) {
            let carGroup = [];
            let carGroups = dast.carGroupLimit.split(',');
            for (let k in carGroups) {
              carGroup.push(carGroups[k])
            }
            this.carGroup = carGroup; //车类型
          }
          this.carGroupis = dast.carGroupLimitRule; //车类型规则
          this.carpricelis = this.$options.data().carpricelis;
          let priceL = [];
          if (dast.priceLimit != null && dast.priceLimit != "") {
            if (dast.priceLimit != "") {
              let priceLs = dast.priceLimit.split(',');
              for (let k in priceLs) {
                priceL.push(priceLs[k])
              }
            }
            this.carpricelis = priceL; //金额限制
          }
          this.carpricelimt = this.$options.data().carpricelimt;
          this.carPriceis = dast.priceLimitRule; //车价格限制规则
          this.carpricelimt[0].value = dast.eachTimePriceLimit == null ? '' : dast.eachTimePriceLimit;
          this.carpricelimt[1].value = dast.eachDayPriceLimit == null ? '' : dast.eachDayPriceLimit;
          this.carpricelimt[2].value = dast.eachMonthPriceLimit == null ? '' : dast.eachMonthPriceLimit;

          this.employeeLevel = parseInt(dast.employeeLevel);
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
    controlrulesMethod() {
      let cont = this.controlrules;
      let contName = this.controlrulesName;
      let carPlatformis = this.carPlatformis;
      let carGroupis = this.carGroupis;
      let carPriceis = this.carPriceis;

      for (let index in cont) {
        if (cont[index].id == carPlatformis) {
          contName.carPlatformisName = cont[index].name;
        }
        if (cont[index].id == carGroupis) {
          contName.carGroupisName = cont[index].name;
        }
        if (cont[index].id == carPriceis) {
          contName.carPriceisName = cont[index].name;
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
        this.$api.business.deleteCarRule({
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
      let datval = this.carpricelimt;
      let eachTimePriceLimit = ""; //每次限制
      let eachDayPriceLimit = ""; //每天限制
      let eachMonthPriceLimit = ""; //每月限制
      let datarr = [];
      if (this.employeeLevel == 31) {
        this.$message({
          message: '请选择级别',
          type: 'warning'
        })
        this.loadBut = false
        return
      }
      let carplat = "";
      if (this.carPlatform.length == 0) { //车平台
        this.$message({
          message: '请选择平台',
          type: 'warning'
        })
        this.loadBut = false
        return
        carplat = ""
      } else {
        carplat = this.carPlatform.join(',')
      }
      let cargrop = "";
      if (this.carGroup.length == 0) { //车类型
        this.$message({
          message: '请选择车类型',
          type: 'warning'
        })
        this.loadBut = false
        return
        cargrop = ""
      } else {
        cargrop = this.carGroup.join(",")
      }
      if (this.carpricelis.length > 0) {
        for (let i = 0; i < this.carpricelis.length; i++) {
          datval[this.carpricelis[i] - 1].isok = true;
        }
        for (let k in datval) {
          if (datval[k].isok) {
            if (datval[k].value == "" || !isnums.test(datval[k].value)) {
              this.$message({
                message: "请输入正确的限制价格！",
                type: 'warning'
              })
              this.loadBut = false
              return
            } else {
              datarr.push(datval[k].id);
              if (datval[k].id == 1) {
                eachTimePriceLimit = datval[k].value;
              } else if (datval[k].id == 2) {
                eachDayPriceLimit = datval[k].value;
              } else {
                eachMonthPriceLimit = datval[k].value;
              }
            }
          }
        }
      }
      if (datarr.length == '') {
        datarr = "";
      } else {
        datarr = datarr.join(',')
      }


      let dat = {
        id: this.natid,
        employeeLevel: this.employeeLevel,
        eachTimePriceLimit: eachTimePriceLimit,
        eachDayPriceLimit: eachDayPriceLimit,
        eachMonthPriceLimit: eachMonthPriceLimit,
        priceLimit: datarr,
        customerNo: 0,
        carGroupLimit: cargrop,
        carGroupLimitRule: this.carGroupis, //车类型规则
        platformLimit: carplat,
        platformLimitRule: this.carPlatformis, //车平台规则
        priceLimitRule: this.carPriceis, //次天月规则

      }
      try {
        let res = await this.$api.business.addOrUpdateCarRule(dat);
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
    },
    async searchtab() {
      //查询国内机票政策
      this.loading = true;
      try {
        let res = await this.$api.business.carRuleList();
        this.loading = false;
        if (res.code == 200) {
          let das = res.data;
          this.tablelist = das.carRules;
          this.employeeLevellist = das.employeeLevel; //级别
          let carGroups = das.carGroup;
          this.carGrouplist = [];
          for (let k in carGroups) {
            this.carGrouplist.push({
              id: k,
              name: carGroups[k]
            })
          }
          let carPlatforms = das.carPlatform;
          this.carPlatformlist = [];
          for (let k in carPlatforms) {
            this.carPlatformlist.push({
              id: k,
              name: carPlatforms[k]
            })
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
      margin-top: 20px;
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

          .el-checkbox-group {
            display: flex;
            flex-wrap: wrap;
          }

          .trvboxs {
            text-align: left;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-right: 17px;
            margin-bottom: 10px;
          }
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
