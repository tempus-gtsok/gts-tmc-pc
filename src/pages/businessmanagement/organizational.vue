<template>
  <div class="organizational" v-loading="loading">
    <div class="orgleft">
      <el-tree
          ref="tree"
          :data="deptis"
          node-key="id"
          :props="deptlist"
          :highlight-current="true"
          default-expand-all
          :expand-on-click-node="false"
          @node-click="handleNodeClick">
        <span slot-scope="{node,data}">
        <span v-if="data.id == 0" class="iconfont">&#xe6b3;</span>
        <span v-else-if="data.children&&data.children.length>0 && data.id != 0"
        class="iconfont">&#xe6aa;</span>
        <span v-else class="iconfont">&#xe606;</span>
        <span style="margin-left: 10px;">{{ node.label }}</span>
        </span>
      </el-tree>
    </div>
    <div class="orgright">
      <div class="orgboxtop">
        <div class="addbtns" @click="adddept">添加</div>
      </div>
      <div class="orgtable">
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            :header-cell-style="{background:'#f6f6f6',color:'#666'}" border="">
          <el-table-column
              label="部门编号">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column
              label="名称"
              show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.text }}</template>
          </el-table-column>
          <el-table-column
              label="状态"
              show-overflow-tooltip>
            <template slot-scope="scope">{{ statsname(scope.row.status) }}</template>
          </el-table-column>
          <el-table-column
              label="备注"
              show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.remarks }}</template>
          </el-table-column>
          <el-table-column
              label="操作">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
        :title="deptitle"
        :visible.sync="dialogVisible"
        width="30%">
      <div class="trstp">
        <div class="tr_ul">
          <div class="tr_uleft">部门名称</div>
          <div class="tr_rights">
            <el-input style="width: 200px;" v-model="deptname" placeholder="请输入部门名称"></el-input>
          </div>
        </div>
        <div class="tr_ul">
          <div class="tr_uleft">状态</div>
          <div class="tr_rights">
            <el-select v-model="deptstatus" style="width: 200px;" placeholder="请选择">
              <el-option
                  v-for="items in deptstatuslist"
                  :key="items.id"
                  :label="items.name"
                  :value="items.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="tr_ul">
          <div class="tr_uleft">备注</div>
          <div class="tr_rights">
            <el-input style="width: 200px;" v-model="deptresion" type="textarea" placeholder="请输入备注"></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" v-loading="loadBut" @click="okcloseplase">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deptstatuslist: [{
        id: 1,
        name: '启用'
      }, {
        id: 0,
        name: '禁用'
      }],
      deptresion: '',//备注
      deptstatus: 1,//当前部门状态
      deptname: '',
      deptitle: '',
      dialogVisible: false,
      loading: false,
      deptis: [],
      userlist: {},//用户个人信息
      tableData: [],//当前部门信息
      deptid: 0,//当前点击的部门id
      deptlist: {
        children: 'children',
        label: 'text'
      },
			loadBut:false
    }
  },
  mounted() {
    this.searchdept();
  },
  methods: {
    adddept() {//新增部门
      this.deptids = 0;
      this.deptstatus = 1;
      this.deptresion = "";
      this.deptname = "";
      this.deptitle = "新增部门";
      this.dialogVisible = true;
    },
    async okcloseplase() {
      if (this.loadBut) return
			this.loadBut = true
      let stras = this.deptstatus;//状态
      let deptresion = this.deptresion;//备注
      let deptname = this.deptname;//名称
      if (deptname == '') {
        this.$message({
          message: '请输入部门名称',
          type: 'warning'
        })
        this.loadBut = false
        return
      }
      if (this.deptids == 0) { //为0的时候 为新增
        let res = await this.$api.business.addOrUpdateDept({
          parentId: this.deptid,
          name: deptname,
          status: stras,
          remark: deptresion
        })
        this.dialogVisible = false;
        if (res.code == 200) {
          this.$message({
            message: '新增成功！',
            type: 'success'
          })
        let cont = 500
				let time = setInterval(()=>{
						cont -= 100
						if(cont == 0){
							clearInterval(time);
							this.loadBut = false
						}
				},100)

          this.searchdept();
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
          	this.loadBut = false
        }
      } else {
        let res = await this.$api.business.addOrUpdateDept({
          id: this.deptids,
          parentId: this.deptid,
          name: deptname,
          status: stras,
          remark: deptresion
        })
        this.dialogVisible = false;
        if (res.code == 200) {
          this.$message({
            message: '修改成功！',
            type: 'success'
          })
        let cont = 500
				let time = setInterval(()=>{
						cont -= 100
						if(cont == 0){
							clearInterval(time);
							this.loadBut = false
						}
				},100)

          this.searchdept();
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
          	this.loadBut = false
        }
      }
    },
    // 重新生成数组
    renderTreeList(list = []) {
      list.forEach(item => {
        if (this.deptid == item.id) {
          this.tableData = item.children;
          return
        } else {
          this.renderTreeList(item.children)
        }
      });
    },
    handleEdit(inx, item) { //修改
      this.deptids = item.id;//当前修改的部门id
      this.deptstatus = item.status;
      this.deptresion = item.remarks;
      this.deptname = item.text;
      this.deptitle = "修改部门"
      this.dialogVisible = true;
    },
    statsname(it) {
      if (it == 1) {
        return '启用'
      } else {
        return '禁用'
      }
    },
    async handleDelete(index, row) { //删除
      this.$confirm('此操作将删除该部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loding = true;
        this.$api.business.deleteDept({
          id: row.id
        }).then((res) => {
          this.loding = false;
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.searchdept();
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            });
          }
        }).catch((e) => {
          this.loding = false;
          console.log('部门删除错误:', e)
        })
      });
    },
    async searchdept() {//查询所有部门
      this.loading = true;
      try {
        if (JSON.stringify(this.userlist) == '{}') {
          let useres = await this.$api.mymessage.username();
          if (useres.code == 200) {
            this.userlist = useres.data
          } else {
            this.$message({
              message: useres.message,
              type: 'warning'
            })
            return
          }
        }
        let res = await this.$api.business.getDeptList();
        this.loading = false;
        if (res.code == 200) {
          this.deptis = [{
            id: 0,
            text: this.userlist.user.customerName,
            children: res.data
          }]
        }
        if (this.deptid == 0) {
          this.tableData = res.data;
        } else {
          this.renderTreeList(this.deptis)
        }
      } catch (e) {
        console.log(e)
        this.loading = false;
        //TODO handle the exception
      }
    },
    handleNodeClick(data) {
      this.tableData = data.children;//获取当前点击的子部门
      this.deptid = data.id;
    }
  }
}
</script>

<style scoped lang="less">
.organizational {
  margin-top: 20px;
  width: 100%;
  display: flex;
  min-width: 1100px;
  max-width: 1500px;

  .trstp {
    width: calc(100% - 20px);
    background: #ffffff;
    padding: 0 10px;

    .tr_ul {
      width: 100%;
      margin: 10px 0;
      display: flex;

      .tr_uleft {
        color: #78879d;
        width: 100px;
        text-align: center;
        line-height: 50px;
      }

      .tr_rights {
        width: calc(100% - 100px);
        display: flex;
      }
    }
  }

  .orgleft {
    width: calc(25% - 20px);
    background-color: #FFFFFF;
    display: flex;
    padding: 20px 0 0 20px;
    overflow-x: auto;
    font-size: 13px;
  }

  .orgright {
    width: 72%;
    margin-left: 3%;
    padding-bottom: 20px;
    background-color: #FFFFFF;

    .orgboxtop {
      padding: 20px;

      .addbtns {
        width: 160px;
        height: 30px;
        background-color: #409eff;
        color: #FFFFFF;
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

    .orgtable {
      padding: 0 20px;
    }
  }
}
</style>
