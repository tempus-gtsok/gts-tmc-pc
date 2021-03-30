<!-- 
@Title : 所有页面无数据共用
@Author: LiuJi
@DATE  : 2021/3/1
@Description: 暂无描述
-->

<template>
  <div class="no-data">
    <div class="demo-image__placeholder">
      <div class="block">
        <el-image :src="src"></el-image>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "noData",
  data() {
    return {
      src: '@/../static/image/noData.png'
    }
  }
}
</script>

<style lang="less" scoped>

.no-data{
  min-width: 1200px;
  position: absolute;
  height: 400px;
 .mixin_displayBox();
}
.block {
   
}
</style>