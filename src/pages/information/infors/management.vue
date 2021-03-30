<template>
   <div class="city-box">
      <div style="overflow: hidden">
        <div class="select-l g-f-l">
          <select v-model="selected" v-if="provinceL" class="select-box t-city">
            <option value="" label="">请选择省</option>
            <option v-for="(item,index) in provinceL" :value="item">{{ item.name }}</option>
          </select>
        </div>
        <div class="select-l g-f-l g-ml-5">
          <select v-model="citySelected" v-if="cityL" class="select-box t-city">
            <option value="">请选择市</option>
            <option v-for="(item,index) in cityL" :value="item">{{ item.name }}</option>
          </select>
        </div>
        <div v-show="notice.province">请选择{{ provinceMsg }}</div>
      </div>
    </div>
</template>

<script>
import { province, city, area } from '../../../../static/json/vue-area.js'
export default {
  name: "city",
  data() {
    return {
      selected: '',
      citySelected: '',
      areaSelected: '',
      provinceL: [],
      cityL: [],
      areaL: [],
      selectedData: '',
      citySelectedData: '',
      areaSelectedData: '',
      provinceMsg:'',
      notice:{
        province:false
      }
    }
  },
  mounted() {
    this.provinceL = [...province] /*取出省市数据*/
  },
  watch: {
    selected: function () {
      // 清除区县
      this.citySelected = {}
      this.cityL = city.filter((item) => item.parentId == this.selected.code)
      for (const i in this.cityL) {
        if (this.cityL[i].code == this.citySelectedData && this.cityL[i].parentId == this.selected.code) {
          this.citySelected = this.cityL[i]
          item.name = '请选择'
        }
      }
    },
    citySelected: function () {
      this.areaSelected = {}
      if (this.citySelected){
        this.areaL = area.filter((item) => item.parentId === this.citySelected.code)
      }
      for (const i in this.areaL) {
        if (this.areaL[i].code == this.areaSelectedData && this.areaL[i].parentId == this.citySelected.code) {
          this.areaSelected = this.areaL[i]
        }
      }
    }
  },
  methods: {
    /*从后台获取用户提交的省市区信息*/
    getCity(addr) {
      this.citySelectedData = addr.City
      this.areaSelectedData = addr.County
      for (const i in this.provinceL) {
        if (Number(addr.Province) == this.provinceL[i].code) {
          this.selectedData = this.provinceL[i].name
          this.selected = this.provinceL[i]
        }
      }
    },
    submitCity() {
      /*市默认显示第一个时*/
      /*if (this.province == ''){
        alert("请选择地址")
        return
      }*/
      /*没有默认选择时*/
      if (this.selected == '') {
        this.notice.province = true
        this.provinceMsg = '省'
        return
      }else {
        this.notice.province = false
      }
      if (this.citySelected == undefined) {
        this.notice.province = true
        this.provinceMsg = '市'
        return
      }else {
        this.notice.province = false
      }
      if (this.areaSelected == undefined) {
        this.notice.province = true
        this.provinceMsg = '区县'
        return
      }else {
        this.notice.province = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.g-f-l{
  float: left;
}
.g-ml-5 {
  margin-left: 5px;
}
.city-box{
  width: 100%;
  margin: 0 auto;
  margin-top: 200px;
}
.select-box{
  width: 200px;
  height: 32px;
}
</style>
