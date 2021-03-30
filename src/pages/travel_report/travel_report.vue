<template>
  <div class="tarblists">
    <div class="tar_li" @click="tarck(item.id)"
         :class="item.id ==tarlist_id? 'tar_lid' :'' ||item.id == tarlist_ids ? 'tar_lid' :''"
         v-for="(item,index) in tarlist"
         :key="index">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'travel_report',
  data() {
    return {
      tarlist_id: 0,
      tarlist: [{
        name: '综合分析',
        id: 1
      },
        {
          name: '国内机票',
          id: 2
        },
        /*{
          name: '国际机票',
          id: 3
        },
        {
          name: '保险',
          id: 4
        },*/
        {
          name: '酒店',
          id: 5
        }, {
          name: '火车票',
          id: 6
        },
        /* {
           name: '用车',
           id: 7
         }, {
           name: '增值服务',
           id: 8
         }*/
      ],
    }
  },
  mounted() {
    if (this.rotes('tms:report:button') === false){
      let tarlist = this.tarlist;
      this.tarlist = tarlist.splice(1,3)
    }
  },
  props: {
    tarlist_ids: {
      value: Number,
      default: 1
    },
  },
  methods: {
    tarck(id) {
      this.tarlist_id = id;
      if (this.tarlist_id === 1) {
        this.$router.push({
          path: 'comprehensive_analysis',
          query: {
            tarlist_id: id
          }
        })
      } else if (this.tarlist_id === 2) {
        this.$router.push({
          path: 'domestic_air_ticket',
          query: {
            tarlist_id: id
          }
        })
      } else if (this.tarlist_id === 5) {
        this.$router.push({
          path: 'hotel_report',
          query: {
            tarlist_id: id
          }
        })
      } else if (this.tarlist_id === 6) {
        this.$router.push({
          path: 'trainreport',
          query: {
            tarlist_id: id
          }
        })
      }
    },
  }
}
</script>

<style scoped lang="less">
.travelbox {
  width: 90%;
  margin: 0 5%;

  .tarblists {
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
    align-items: center;
    height: 43px;
    background-color: #FFFFFF;
    border-bottom: 1px solid #f2f2f2;
    .tar_li {
      color: #BEBBB5;
      width: 135px;
      text-align: center;
      cursor: pointer;
      font-size: 16px;
      height: 100%;
      line-height: 43px;
       border-bottom: 2px solid #fff;
    }
    .tar_li:hover {
      background: #ddecff;
      color: #3c85fd;
      border-bottom: 2px solid #3c85fd;
    }
    .tar_lid {
      background: #ddecff;
      color: #3c85fd;
      border-bottom: 2px solid #3c85fd;
    }
  }
}
</style>