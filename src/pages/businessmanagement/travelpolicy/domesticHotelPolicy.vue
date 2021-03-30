<template>
  <div class="domesticHotelPolicy" v-loading="loading">
    <div class="domecitys">
      <div class="domebrt" @click="cityleve(item.id)" :class="lervid == item.id ? 'domebrts' : ''" v-for="(item, index) in levlelist" :key="index">{{ item.cityLevel }}</div>
    </div>
    <div class="dometable">
      <el-table :header-cell-style="{background:'#f6f6f6',color:'#666'}" border=""  ref="multipleTable" :data="cittablelist" tooltip-effect="dark" style="width: 100%;">
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
      <div class="addbtns" @click="addrule">添加国内酒店政策</div>
    </div>
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
            <div class="trnames">
              允许预定星级
              <span>*</span>
            </div>
            <div class="trring">
              <el-checkbox-group v-model="starLevelLimit">
                <el-checkbox v-for="item in starLevelLimitlist" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="trright">
            <div class="trnames">管控规则</div>
            <div class="trring">
              <el-select v-model="starLevelLimitis" style="width: 150px;" placeholder="请选择" :title="controlrulesName.starLevelLimitisName">
                <el-option v-for="items in controlrules" :key="items.id" :label="items.name" :value="items.id"></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="trstps">
          <div class="trleft">
            <div class="trnames">
              高价限制
              <span>*</span>
            </div>
            <div class="trring"><el-input style="width: 150px;" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="6" v-model="highLimit" placeholder="0"></el-input></div>
          </div>
          <div class="trright">
            <div class="trnames">管控规则</div>
            <div class="trring">
              <el-select v-model="highLimitis" style="width: 150px;" placeholder="请选择" :title="controlrulesName.highLimitisName">
                <el-option v-for="items in controlrules" :key="items.id" :label="items.name" :value="items.id"></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="trstps">
          <div class="trleft">
            <div class="trnames">限定协议酒店</div>
            <div class="trring">
              <el-select v-model="contractHotelLimit" style="width: 150px;" placeholder="请选择" >
                <el-option v-for="items in contractHotelLimitlist" :key="items.id" :label="items.name" :value="items.id"></el-option>
              </el-select>
            </div>
          </div>
          <div class="trright">
            <div class="trnames">管控规则</div>
            <div class="trring">
              <el-select v-model="contractHotelLimitis" style="width: 150px;" placeholder="请选择" :title="controlrulesName.contractHotelLimitisName">
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
      highLimit: 0, //高价限制
      highLimitis: 1, //高价管控
      contractHotelLimit: 0,
      contractHotelLimitlist: [
        {
          id: 0,
          name: '否'
        },
        {
          id: 1,
          name: '是'
        }
      ],
      contractHotelLimitis: 1, //限定协议规则
      starLevelLimitlist: [
        {
          id: 2,
          name: '二星及以下'
        },
        {
          id: 3,
          name: '三星'
        },
        {
          id: 4,
          name: '四星'
        },
        {
          id: 5,
          name: '五星及以上'
        }
      ],
      starLevelLimitis: 1, //星级管控规则
      starLevelLimit: [], //星级
      lervid: 0,
      levlelist: [], //城市等级列表
      citypolist: [],
      cittablelist: [],
      employeeLevellist: [], //级别列表
      employeeLevel: 31, //当前选择级别
      controlrules: [
        {
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
        starLevelLimitisName: '',
        contractHotelLimitisName: '',
        highLimitisName: '',
      }],
      dialogVisible: false,
      loading: false,
      natid: '', //修改id
			loadBut:false
    };
  },
  mounted() {
    this.hotelRule();
  },
  methods: {
    async handleEdit(index, row) {
      this.loading = true;
      try {
        this.natid = row.id;
        let res = await this.$api.business.getHotelRule({
          id: row.id
        });
        if (res.code == 200) {
          let dast = res.data;
          let posidata = [];
          let posolds = dast.starLevelLimit.split(',');
          for (let k in posolds) {
            posidata.push(parseInt(posolds[k]))
          }
          this.employeeLevel = parseInt(dast.employeeLevel);
          this.starLevelLimit = posidata;
          this.starLevelLimitis = dast.lowLimitRules;
          this.contractHotelLimit = dast.contractHotelLimit;
          this.contractHotelLimitis = dast.contractHotelLimitRules;
          this.highLimit = dast.highLimit;
          this.highLimitis = dast.highLimitRules;
          this.dialogVisible = true;
          this.controlrulesMethod();
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
        this.loading = false;
      } catch (e) {
        this.loading = false;
        //TODO handle the exception
      }
    },
    controlrulesMethod(){
      let cont = this.controlrules;
      let contName = this.controlrulesName;
      let starLevelLimitis = this.starLevelLimitis;
      let contractHotelLimitis = this.contractHotelLimitis;
      let highLimitis = this.highLimitis;
      for (let item in cont){
        if (cont[item].id == starLevelLimitis){
          contName.starLevelLimitisName = cont[item].name;
        }
        if (cont[item].id == contractHotelLimitis){
          contName.contractHotelLimitisName = cont[item].name;
        }
        if (cont[item].id == highLimitis){
          contName.highLimitisName = cont[item].name;
        }
      }
    },
    handleDelete(index,row){//删除
      this.$confirm('此操作将删除该政策, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loding = true;
        this.$api.business.delHotelRule({
          id:row.id
        }).then((res)=>{
          this.loding = false;
          if(res.code == 200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.hotelRule();
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            });
          }
        }).catch((e)=>{
          this.loding = false;
          console.log('政策删除错误:',e)
        })
      });
    },
    async okcloseplase() {
			if (this.loadBut) return
			this.loadBut = true
      //新增或者修改
      if (this.starLevelLimit.length == 0) {
        this.$message({
          message: '请选择星级限制',
          type: 'warning'
        });
        this.loadBut = false
      } else if (this.highLimit <= 0) {
        this.$message({
          message: '请选择正确的正整数',
          type: 'warning'
        });
        this.loadBut = false
      } else {
        try {
          let dat = {
            id: this.natid,
            cityLevel: this.lervid,
            employeeLevel: this.employeeLevel,
            starLevelLimit: this.starLevelLimit.join(','),
            lowLimitRules: this.starLevelLimitis,
            contractHotelLimit: this.contractHotelLimit,
            contractHotelLimitRules: this.contractHotelLimitis,
            highLimit: this.highLimit,
            highLimitRules: this.highLimitis
          };
          let res = await this.$api.business.addOrUpdateHotelRule(dat);
          if (res.code == 200) {
            if (this.natid == '') {
              this.$message({
                message: '新增成功！',
                type: 'success'
              });
            } else {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
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
            this.hotelRule();
          } else {
            this.$message({
              message: res.message,
              type: 'warning'
            });
            this.loadBut = false
          }
        } catch (e) {
          this.loadBut = false
          //TODO handle the exception
        }
      }
    },
    addrule() {
      //点击新增
      this.employeeLevel = this.$options.data().employeeLevel;
      this.starLevelLimit = this.$options.data().starLevelLimit;
      this.contractHotelLimit = this.$options.data().contractHotelLimit;
      this.highLimit = this.$options.data().highLimit;

      this.starLevelLimitis = this.$options.data().starLevelLimitis;
      this.contractHotelLimitis = this.$options.data().contractHotelLimitis;
      this.highLimitis = this.$options.data().highLimitis;
      this.natid = '';
      this.dialogVisible = true;
    },
    async hotelRule() {
      //规则查询
      this.loading = true;
      try {
        let res = await this.$api.business.hotelRule();
        this.loading = false;
        if (res.code == 200) {
          this.levlelist = res.data.travelCities; //城市等级列表
          this.citypolist = res.data.hotelRuleShow; //所有规则
          this.employeeLevellist = res.data.employeeLevel;
          if (this.lervid == 0) {
            this.lervid = this.levlelist[0].id; //默认显示第一个城市等级的列表
          }
          this.cityspolist(this.lervid, this.citypolist);
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
    },
    cityleve(id) {
      this.lervid = id;
      this.cityspolist(this.lervid, this.citypolist);
    },
    cityspolist(id, list) {
      let su = [];
      for (let k in list) {
        if (list[k].cityLevel == id) {
          su.push(list[k]);
        }
      }
      this.cittablelist = su;
    }
  }
};
</script>

<style scoped lang="less">

.addbtns:hover {
  opacity: 0.8;
}
.domesticHotelPolicy {
  margin-top: 30px;
  width: 100%;
  display: flex;
  .domecitys {
    width: 100px;
    .domebrt {
      width: 100px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 12px;
      border-radius: 5px;
      cursor: pointer;
    }
    .domebrts {
      background-color: #409eff;
      color: #ffffff;
    }
  }
  .dometable {
    width: calc(100% - 120px);
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .addbtns {
      margin: 20px 0;
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
