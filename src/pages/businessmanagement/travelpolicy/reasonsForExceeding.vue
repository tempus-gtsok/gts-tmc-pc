<template>
  <div class="domesticHotelPolicy" v-loading="loading">
    <div class="domecitys">
      <div class="domebrt" @click="cityleve(item.id)" :class="lervid == item.id ? 'domebrts' : ''"
           v-for="(item, index) in reasontype" :key="index">{{ item.name }}
      </div>
    </div>
    <div class="dometable">
      <el-table :header-cell-style="{background:'#f6f6f6',color:'#666'}" border="" ref="multipleTable"
                :data="cittablelist" tooltip-effect="dark" style="width: 100%;">
        <el-table-column label="原因代码">
          <template slot-scope="scope">
            {{ scope.row.code }}
          </template>
        </el-table-column>
        <el-table-column label="原因中文描述" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.chineseDesc }}
          </template>
        </el-table-column>
        <el-table-column label="原因英文描述" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-html="scope.row.englishDesc"></div>
          </template>
        </el-table-column>
        <el-table-column width="160px" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="addbtns" @click="addrule">添加违规原因</div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="40%">
      <div class="trstp">
        <div class="trstps">
          <div class="trleft">
            <div class="trnames">原因代码:</div>
            <div class="trrings">
              <el-input type="text" v-model="reatys" maxlength="20" placeholder="限制20字"></el-input>
            </div>
          </div>
        </div>
        <div class="trstps">
          <div class="trleft">
            <div class="trnames">原因中文描述:</div>
            <div class="trrings">
              <el-input type="text" v-model="chineseDesc" maxlength="20" placeholder="限制20字"></el-input>
            </div>
          </div>
        </div>
        <div class="trstps">
          <div class="trleft">
            <div class="trnames">原因英文描述:</div>
            <div class="trrings">
              <el-input type="text" v-model="englishDesc" maxlength="20" placeholder="限制20字"></el-input>
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
let chinais = /^[\u4e00-\u9fa5]+$/;//中文正则
let englishis = /^[A-Za-z]+$/;//英文正则
export default {
  data() {
    return {
      cittablelist: [],
      reatys: '',//原因代码
      chineseDesc: '',//中文原因
      englishDesc: '',//英文原因
      lervid: 0,
      reasontype: [{
        id: 1,
        name: '航班'
      }, {
        id: 3,
        name: '国内火车票'
      }, {
        id: 4,
        name: '国内酒店'
      }, {
        id: 5,
        name: '用车'
      }],

      dialogVisible: false,
      loading: false,
      natid: '', //修改id
			loadBut:false
    };
  },
  mounted() {
    this.reasonls();
  },
  methods: {
    async handleEdit(index, row) {
      this.natid = row.id;
      this.reatys = row.code;
      this.chineseDesc = row.chineseDesc;
      this.englishDesc = row.englishDesc;

      this.dialogVisible = true;
    },
    handleDelete(index, row) {//删除
      this.$confirm('此操作将删除该政策, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loding = true;
        this.$api.business.delRulesReason({
          id: row.id
        }).then((res) => {
          this.loding = false;
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.reasonls();
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
      //新增或者修改
      if (this.reatys == "" || this.chineseDesc == "" || this.englishDesc == "") {
        this.$message({
          message: '所有值不能为空！',
          type: 'warning'
        })
        this.loadBut = false
        return
      }
      if (!chinais.test(this.chineseDesc)) {
        this.$message({
          message: '中文原因只能输入中文！',
          type: 'warning'
        })
        this.loadBut = false
        return
      }
      if (!englishis.test(this.englishDesc)) {
        this.$message({
          message: '英文原因只能输入英文！',
          type: 'warning'
        })
        this.loadBut = false
        return
      }
      try {
        let dat = {
          id: this.natid,
          businessType: this.lervid,
          code: this.reatys,
          chineseDesc: this.chineseDesc,
          englishDesc: this.englishDesc,
        };
        let res = await this.$api.business.addOrUpdateRulesReason(dat);
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
          this.reasonls();
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
    },
    addrule() {
      //点击新增
      this.reatys = this.$options.data().reatys;
      this.chineseDesc = this.$options.data().chineseDesc;
      this.englishDesc = this.$options.data().englishDesc;
      this.natid = '';
      this.dialogVisible = true;
    },
    async reasonls() {
      //规则查询
      this.loading = true;
      try {
        let res = await this.$api.business.rulesReasonList();
        this.loading = false;
        if (res.code == 200) {
          this.citypolist = res.data; //所有规则
          this.employeeLevellist = res.data.employeeLevel;
          if (this.lervid == 0) {
            this.lervid = this.citypolist[0].businessType; //默认显示第一个的列表
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
        if (list[k].businessType == id) {
          su.push(list[k]);
        }
      }
      this.cittablelist = su;
    }
  }
};
</script>

<style scoped lang="less">
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

    .addbtns:hover {
      opacity: 0.8;
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
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .trnames {
          text-align: right;
          margin-right: 5%;
          width: 30%;

          span {
            color: red;
          }
        }

        .trring {
          text-align: center;
          width: 65%;
        }

        .trrings {
          width: 65%;
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
