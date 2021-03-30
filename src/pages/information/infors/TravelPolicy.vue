<template>
  <div class="mian" v-if="stis">
    <div class="Travel_policy">
      出差政策
    </div>
    <div class="general">
      <div class="general_top">通用政策</div>
      <div class="general_bottom" v-if="policyInconsistency != null">
        <ul class="general_policies">
          <li style="width: 170px;">外部客户差旅政策：</li>
		  <li style="color: #333333;">{{policyInconsistency}}</li>
        </ul>
      </div>
	  <div class="general_bottom" v-if="noTravelPolicy != null">
	    <ul class="general_policies">
	      <li style="width: 170px;">无差旅政策预定：</li>
	  	  <li style="color: #333333;">{{noTravelPolicy}}</li>
	    </ul>
	  </div>	
	  <div class="general_bottom" v-if="externalCustomer != null">
	    <ul class="general_policies">
	      <li style="width: 170px;">出行人差旅政策不一致：</li>
	  	  <li style="color: #333333;">{{externalCustomer}}</li>
	    </ul>
	  </div>
	  <div class="general_bottom" v-if="nativeTicketViolation != null">
	    <ul class="general_policies">
	      <li style="width: 170px;">国内机票超规仓位：</li>
	  	  <li style="color: #333333;">{{nativeTicketViolation}}</li>
	    </ul>
	  </div>
	  <div class="general_bottom" v-if="internationalTicketViolation != null">
	    <ul class="general_policies">
	      <li style="width: 170px;">国际机票超规仓位：</li>
	  	  <li style="color: #333333;">{{internationalTicketViolation}}</li>
	    </ul>
	  </div>
	  <div class="general_bottom" v-if="hotelViolation != null">
	    <ul class="general_policies">
	      <li style="width: 170px;">酒店超规房型：</li>
   		  <li style="color: #333333;">{{hotelViolation}}</li>
	    </ul>
	  </div>
	  <div class="general_bottom" v-if="trainViolation != null">
	    <ul class="general_policies">
	      <li style="width: 170px;">火车票超规坐席：</li>
	  	  <li style="color: #333333;">{{trainViolation}}</li>
	    </ul>
	  </div>
	  <div class="general_bottom" v-if="hotelGuarantee != null">
	    <ul class="general_policies">
	      <li style="width: 170px;">酒店担保：</li>
	  	  <li style="color: #333333;">{{hotelGuarantee}}</li>
	    </ul>
	  </div>
    </div>
	<div class="general" v-if="nativeAirTicketRule != null">
	  <div class="general_top">机票政策</div>
	  <div class="general_bottom" v-if="nativeAirTicketRule.reserve != null">
	    <ul class="general_policies">
	      <li style="width: 170px;">提前预定天数：</li>
		  <li style="color: #333333;">{{nativeAirTicketRule.reserve}}</li>
	    </ul>
	  </div>
	  <div class="general_bottom" v-if="nativeAirTicketRule.lowLimit != null">
	    <ul class="general_policies">
	      <li style="width: 170px;">低价限制时间：</li>
	  	  <li style="color: #333333;">{{nativeAirTicketRule.lowLimit}}</li>
	    </ul>
	  </div>	
	  <div class="general_bottom" v-if="nativeAirTicketRule.highLimit != null">
	    <ul class="general_policies">
	      <li style="width: 170px;">高价限制：</li>
	  	  <li style="color: #333333;">{{nativeAirTicketRule.highLimit}}</li>
	    </ul>
	  </div>
	  <div class="general_bottom" v-if="nativeAirTicketRule.positionLimit != null">
	    <ul class="general_policies">
	      <li style="width: 170px;">舱位限制：</li>
	  	  <li style="color: #333333;">{{ position(nativeAirTicketRule.positionLimit)}}</li>
	    </ul>
	  </div>
	  <div class="general_bottom" v-if="nativeAirTicketRule.discountLimit != null">
	    <ul class="general_policies">
	      <li style="width: 170px;">折扣限制：</li>
	  	  <li style="color: #333333;">{{nativeAirTicketRule.discountLimit}}</li>
	    </ul>
	  </div>
	  <div class="general_bottom" v-if="nativeAirTicketRule.accompanyingNumberLimit != null">
	    <ul class="general_policies">
	      <li style="width: 170px;">同行人数限制：</li>
		  <li style="color: #333333;">{{nativeAirTicketRule.accompanyingNumberLimit}}</li>
	    </ul>
	  </div>
	  <div class="general_bottom" v-if="nativeAirTicketRule.agreementFlightLimit != null">
	    <ul class="general_policies">
	      <li style="width: 170px;">限定协议航班：</li>
	  	  <li style="color: #333333;">{{use(nativeAirTicketRule.agreementFlightLimit)}}</li>
	    </ul>
	  </div>
	  <div class="general_bottom" v-if="repeatBookingLimit != null">
	    <ul class="general_policies">
	      <li style="width: 170px;">当天重复预定限制：</li>
	  	  <li style="color: #333333;">{{repeatBookingLimit}}</li>
	    </ul>
	  </div>
	</div>
	<div class="general" v-if="nativeTrainRule != null">
	  <div class="general_top">火车政策</div>
	  <div class="general_bottom" v-if="nativeTrainRule.seatLimit != null">
	    <ul class="general_policies">
	      <li style="width: 170px;">坐席限制：</li>
		  <li style="color: #333333;">{{ grade(nativeTrainRule.seatLimit)}}</li>
	    </ul>
	  </div>
	</div>
	<div class="general" v-if="hotelRule != null">
	  <div class="general_top">酒店政策</div>
	  <div class="general_bottom" v-if="hotelRule.starLevelLimit != null">
	    <ul class="general_policies">
	      <li style="width: 170px;">星级限制：</li>
		  <li style="color: #333333;">{{ star_level(hotelRule.starLevelLimit)}}</li>
	    </ul>
	  </div>
	  <div class="general_bottom" v-if="hotelRule.contractHotelLimit != null">
	    <ul class="general_policies">
	      <li style="width: 170px;">限定协议酒店：</li>
	  		  <li style="color: #333333;">{{agreement(hotelRule.contractHotelLimit)}}</li>
	    </ul>
	  </div>
	  <div class="general_bottom" v-if="hotelRule.highLimit != null">
	    <ul class="general_policies">
	      <li style="width: 170px;">高价限制：</li>
	  		  <li style="color: #333333;">{{hotelRule.highLimit}}</li>
	    </ul>
	  </div>
	</div>
  </div>
</template>

<script>
	
  export default{
    data(){
      return {
        userlist:[{
          user:'外部客户差旅政策:',
          name:'按照每一位出行人政策控制'
        },{
          user:'外部客户差旅政策1:',
          name:'按照每一位出行人政策控制'
        },{
          user:'无差旅政策预定:不管控',
          name:'不管控'
        },{
          user:'出行人差旅政策不一致:',
          name:'预定人差旅政策'
        }],
		externalCustomerMap: {
			"0": "不管控",
			"1": "预定人差旅政策"
		},
		noTravelPolicyMap: {
			"0": "不管控",
			"1": "不允许预定"
		},
		policyInconsistencyMap: {
			"0": "自选一位出行人政策控制",
			"1": "按照每一位出行人政策控制"
		},
		generalRuleMap: {
			"0": "隐藏",
			"1": "显示",
			"2": "不提供"
		},
		policyInconsistency: '',
		noTravelPolicy: '',
		externalCustomer: '',
		nativeTicketViolation: '',
		internationalTicketViolation: '',
		hotelViolation: '',
		trainViolation: '',
		hotelGuarantee: '',             //以上是通用政策
		reserve:'',
		lowLimit:'',
		highLimit:'',
		positionLimit:'',
		discountLimit:'',
		accompanyingNumberLimit:'',
		repeatBookingLimit:'',
		nativeAirTicketRule:{},
		nativeTrainRule:{},
		hotelRule:{},
		stis:false,
      }
    },
	mounted(){
		this.cond();
	},
	methods:{
		use(is){
			if(is == 0){
				return "否";
			}else{
				return "是";
			} 
		},
		position(pon){
			if(pon == '' || pon == undefined || pon == null){
				return
			}
			let le = [];
			var location = pon.split(",");
			for (var i = 0; i < location.length; i++) {
				if(location[i] == 1){
					le.push("豪华头等舱");
				} else if(location[i] == 2){
					le.push("头等舱");
				} else if(location[i] == 3){
					le.push("公务舱");
				} else if(location[i] == 4){
					le.push("经济舱");
				} else if(location[i] == 5){
					le.push("超值经济舱");
				}
			}
			return le.join(",");
		},
		grade(gra){
			let le = [];
			var location = gra.split(",");
			for (var i = 0; i < location.length; i++) {
				if(location[i] == 1){
					le.push("商务座");
				} else if(location[i] == 2){
					le.push("特等座");
				} else if(location[i] == 3){
					le.push("一等座");
				} else if(location[i] == 4){
					le.push("二等座");
				} else if(location[i] == 5){
					le.push("动卧");
				} else if(location[i] == 6){
					le.push("高级软卧");
				} else if(location[i] == 7){
					le.push("软卧");
				} else if(location[i] == 8){
					le.push("硬卧");
				} else if(location[i] == 9){
					le.push("软座");
				} else if(location[i] == 10){
					le.push("硬座");
				} else if(location[i] == 11){
					le.push("无座");
				}
			}
			return le.join(",");
		},
		star_level(sta){
				let le = [];
				var location = sta.split(",");
				for (var i = 0; i < location.length; i++) {
					if(location[i] == 2){
						le.push("二星及以下");
					} else if(location[i] == 3){
						le.push("三星");
					} else if(location[i] == 4){
						le.push("四星");
					} else if(location[i] == 5){
						le.push("五星及以上");
				}
			}
			return le.join(",");
		},
		agreement(agr){
			if(agr == 0){
				return "否";
			}else{
				return "是";
			}
		},
		async cond() {
			this.loading = true;
			try{
				let userpolicy = await this.$api.Login.getTraverPolicy();
				this.loading = false;
				this.nativeAirTicketRule = userpolicy.data.nativeAirTicketRule;
				this.nativeTrainRule = userpolicy.data.nativeTrainRule;
				this.hotelRule = userpolicy.data.hotelRule[0];
				 let generalRule = userpolicy.data.generalRule;
				this.externalCustomer = this.externalCustomerMap[generalRule.externalCustomer];
				this.noTravelPolicy = this.noTravelPolicyMap[generalRule.noTravelPolicy];
				this.policyInconsistency = this.policyInconsistencyMap[generalRule.policyInconsistency];
				this.nativeTicketViolation = this.generalRuleMap[generalRule.nativeTicketViolation];
				this.internationalTicketViolation = this.generalRuleMap[generalRule.internationalTicketViolation];
				this.hotelViolation = this.generalRuleMap[generalRule.hotelViolation];
				this.trainViolation = this.generalRuleMap[generalRule.trainViolation];
				this.hotelGuarantee = this.generalRuleMap[generalRule.hotelGuarantee];
				if(this.nativeAirTicketRule != null){
					if(this.nativeAirTicketRule.repeatBookingLimit==0){
						this.repeatBookingLimit = "不管控";
					}else{
						this.repeatBookingLimit=this.nativeAirTicketRule.repeatBookingLimit;
					}
				}
				this.stis = true
			}catch(e){
				console.log(e)
				this.loading = false;
			}
		},
	}
  }
</script>

<style scoped lang="less">
  .mian{
    width: 100%;
	height: 100%;
	&>div{
		padding-bottom: 10px;
	}
    .Travel_policy{
      width: 100%;
      line-height: 50px;
      font-size: 16px;
      text-indent: 20px;
      color: #97A8BE;
      background: white;
    }
    .general{
      width: 100%;
      margin-top: 10px;
      text-indent: 10px;
      background: white;

      .general_top{
        width:calc(100% - 20px);
        font-size: 16px;
        line-height: 40px;
        margin: 0 10px;
        color: #97A8BE;
        border-bottom: 1px solid #CCCCCC;
      }
	  .general_bottom{
		  width:calc(100% - 20px);
		  display: flex;
		  margin: 0 10px;
		  border-bottom: 1px solid #CCCCCC;
		  .general_policies{
		  	list-style: none;
			color: darkgrey;
			margin: 0 10px;
			font-size: 14px;
			line-height: 40px;
			display: flex;
		  }
	  }
    }
  }
</style>
