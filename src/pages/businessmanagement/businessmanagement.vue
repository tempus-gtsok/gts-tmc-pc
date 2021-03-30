<template>
  <div class="header_myorder">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#fff"
        text-color="#666"
        active-text-color="#3c85fd"
    >
      <el-menu-item index="1" v-if="rotes('tms:col')">员工信息</el-menu-item>
      <el-menu-item index="2">角色管理</el-menu-item>
      <el-menu-item index="3">组织架构</el-menu-item>
      <el-menu-item index="4">职级管理</el-menu-item>
      <el-menu-item index="5">成本中心</el-menu-item>
      <el-menu-item index="6">审批中心</el-menu-item>
      <el-menu-item index="7">出差政策</el-menu-item>
    </el-menu>
    <employ v-if="acticid==1 && rotes('tms:col:list')"></employ>
    <privileg v-if="acticid==2 && rotes('tms:aut:list')"></privileg>
    <organizational v-if="acticid==3"></organizational>
    <ranklist v-if="acticid==4"></ranklist>
    <costcenter v-if="acticid==5"></costcenter>
    <approval v-if="acticid==6"></approval>
    <travelpolicy v-if="acticid==7"></travelpolicy>
  </div>
</template>

<script>
import approval from './approvalcenter'
import employ from './employeelist'
import privileg from './privilegemanagement'
import organizational from './organizational'
import ranklist from './ranklist'
import costcenter from './costcenter'
import travelpolicy from './travelpolicy'

export default {
  data() {
    return {
      activeIndex: '1',
      acticid: 1,
    }
  },
  components: {
    employ,
    privileg,
    organizational,
    ranklist,
    costcenter,
    approval,
    travelpolicy
  },
  mounted() {

  },
  methods: {
    handleSelect(key, keyPath) {
      this.acticid = key;
    },
  }
}
</script>

<style scoped lang="less">
.header_myorder {
  width:1180px;
  margin: 20px auto 0;

  .el-menu-demo .el-menu-item {
    font-size: 16px;
    &:hover{
      background-color: #ddecff!important;
      color: #3c85fd!important;
      border-bottom-color: #3c85fd!important;
    }
  }
   .el-menu-demo .is-active{
     background-color: #ddecff!important;
   }
}
</style>
