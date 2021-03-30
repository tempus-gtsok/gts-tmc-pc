<template>
  <div class="approvalcen">
    <div class="apptopul">
      <div class="applist" @click="chekcsd(index)" :class="index==insk?'checks':''" v-for="(item,index) in approvlist">
        {{item.text}}
      </div>
    </div>
    <deptvast v-if="insk == 0"></deptvast>
    <costcenter v-if="insk == 1"></costcenter>
    <auditfree v-if="insk == 2"></auditfree>
  </div>
</template>

<script>
  import costcenter from './approvalcenterlist/costcenters.vue'
  import deptvast from './approvalcenterlist/deptvast.vue'
  import auditfree from './approvalcenterlist/auditfree.vue'
  export default{
    data(){
      return{
        insk:0,
        approvlist:[{
          id:0,
          text:'部门流程'
        },{
          id:1,
          text:'成本中心流程'
        },{
          id:2,
          text:'免审名单配置'
        }],
      }
    },
    components:{
      deptvast,
      costcenter,
      auditfree
    },
    mounted() {

    },
    methods:{
      chekcsd(it){
        this.insk = it;
      }
    }
  }
</script>

<style scoped lang="less">
  .approvalcen{
    margin-top: 20px;
    width: 100%;
    padding: 20px 0 0 0;
    background-color: #FFFFFF;
    .apptopul{
      width: calc(100% - 40px);
      padding:  0 20px;
      display: flex;
      .applist{
        width: 120px;
        cursor: pointer;
        text-align: center;
        font-size: 14px;
        line-height: 50px;
        border: 1px solid #e5e5e5;
        border-left: 0;
      }
      .applist:hover {
        background-color: #409eff;
        opacity: 0.9;
        color: #fff;
      }
      div:nth-child(1){
        border-left:1px solid #e5e5e5;
      }
      .checks{
        background-color: #409eff;
        color: #FFFFFF;
      }
    }
  }
</style>
