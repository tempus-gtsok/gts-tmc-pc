# 							腾邦差旅



## 一、项目简介

​	商旅服务SaaS平台以“云服务”的形式向行业用户提供商旅管理系统。对用户而言，只需开通即可使用，无需硬件投入，从而获得极致的性价比，并随官方技术团队每月一次的版本迭代，无缝、实时地获得商旅服务平台的最新功能。
​    从功能上来说，既包括传统的机票、酒店、火车、用车、保险、MICE等业务模块，又包括企业内部审批、差旅规则定义、成本中心及财务管理等内控模块。
​    此外，腾邦商旅服务平台还提供可选的财务结算ERP、预算管理、经营管理、领导驾驶舱、BI、大数据分析实施等增强型工具。配套腾付通和腾邦保险经纪，为用户提供完整的产业链解决方案。

![输入图片说明](https://images.gitee.com/uploads/images/2021/0330/150627_bf78b8cd_1929307.png "下载.png")



## 二、使用说明

测试账号： yunying001           密码：tempus123

```
# web-pc

> Vue.js "^2.5.2" + elementUI
> node.js (环境)
# 更过详细依赖请查看 package.json 文件

# 更换项目logo
index.html
<link rel="icon" href="项目logo" type="image/x-icon"/>

# pc端 跳转 公众号路径配置 
App.vue -> location = "公众号路径";

## Build Setup

​``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
​```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
```

## 三、目录结构

```
├── READNE.md   					 // help
├── Build
|   ├── build.js 					 // 打包构建文件配置
|	├──	webpack.dev.conf.js  		 // 开发环境构建文件配置
├── config
|	├── dev.env.js 					 // 开发环境配置
|	├── test.env.js					 // 测试环境配置
|	├── prod.env.js 				 // 生产环境配置
├──	src
|	├── api  						 // 请求api
|	|	├── config					 // AXios 封装
|	|	|	├──	config.js			 // 请求域名配置文件
|	├── components					 // 公共组件
|	├── pages					     // 应用组件
|	├── router						 // 路由配置
|	├── static						 // 静态资源目录
├── store 							 // Vuex
```

## 四、关于作者

作者：腾邦国际商业服务集团股份有限公司

QQ 交流群 ：588329775



## 五、更新日志 
   飞机板块新需求：
1: 机票业务，发起出差申请单和查询页面按城市查询
2: 机票和火车票在加订保险时，展示保险说明情况
3：机票业务，发起出差申请单和查询页面按城市查询
4：机票列表接口优化
5：添加机票航延险
6：机票预定页面价格验证逻辑优化
7：机票预定页面证件信息改为下拉选择
8：机票城市机场信息文件更新

   火车板块新需求：
1：火车票时，选座不作为必选，也就是不选座也能下单
2: 预定火车票时，应有提醒客户可能预定不成功，建议使用身份证下单的提示
3：火车预定页面证件信息改为下拉选择
4：火车城市站点文件更新
5：火车订单详情页改签数据优化

   酒店板块新需求：
1：酒店预订页面增加特殊需求填写框，备注事项带入后台订单并传给供应商
2：酒店行政区选择界面，记录并展示搜索历史
3: 酒店名/位置 输入对应关键字，需支持模糊查找
4：酒店预定页面证件信息改为下拉选择

   项目bug修复
1：我的申请单详情页页面展示bug修复
2：切换公司名称数据bug修复
3：火车票改签单一直显示改签中，占座不成功，未修改状态
4：因私火车票扫码支付的价格不正确bug修复
5：酒店价格筛bug修复
6：出差申请单控制出行人的分摊成本中心bug修复
7：机票事中订单-提前预订天数的超规无提示问题修复
8：酒店早餐展示不一致问题修复
9：美团酒店-床型和房间楼层与美团的不符问题修复
10：机票意向单列表只显示一个乘机人问题修复
11：编辑出差事由未展示原数据问题修复
12：审批页面详细说明显示问题修复
13：酒店意向单入住人传参只传了一个问题修复
14：机票意向单确认页面没有乘机人信息问题修复
15：火车订单状态显示bug修复

    其他
1: 常旅客功能优化，及证件信息调整为非必选
2: 差旅系统后端增加出差事由维护模块，前端出差事由改为下拉框选择，选项取值于后台维护的数据
3: 出差申请单已审批，订票时自动带入审批信息
4: 出差审批流程优化
5：我的申请单页面功能优化
6：新建意向单功能优化
7：我的申请单列表新增多个筛选状态
8：时间选择器样式优化
9：证件号码及手机号脱敏处理
10：预定页面添加点击节流
11：部分页面优化


### V1.0.1 版本，2021-6-25

1.飞机火车酒店查询下单

![输入图片说明](https://images.gitee.com/uploads/images/2021/0330/144605_7919e08a_1929307.png "微信图片_20210330144543.png")

2.机票查询预定

![输入图片说明](https://images.gitee.com/uploads/images/2021/0331/095019_306046c4_1929307.png "d51710189cec56b96caa553c178fc9a.png")

3.火车查询预定

![输入图片说明](https://images.gitee.com/uploads/images/2021/0331/094950_351ffe70_1929307.png "b2fc1cf8d0dac0b569903b4a23a7056.png")

4.酒店查询预定

![输入图片说明](https://images.gitee.com/uploads/images/2021/0331/095053_ed82e932_1929307.png "6b8337d5574b8b2285721f04dc5d9ab.png")

5.建立出差申请单

![输入图片说明](https://images.gitee.com/uploads/images/2021/0330/144811_d28eeee1_1929307.png "微信图片_20210330144739.png")

6.申请单，审批单，意向单，订单，行程单等查询

![输入图片说明](https://images.gitee.com/uploads/images/2021/0330/144833_67f8b4e9_1929307.png "微信图片_20210330144743.png")

7.差旅报告展示

![输入图片说明](https://images.gitee.com/uploads/images/2021/0330/144857_fda6c898_1929307.png "微信图片_20210330144753.png")

8.添加企业管理信息

![输入图片说明](https://images.gitee.com/uploads/images/2021/0330/144905_907ad7e3_1929307.png "微信图片_20210330144755.png")

9.个人中心

![输入图片说明](https://images.gitee.com/uploads/images/2021/0330/144913_325ad317_1929307.png "微信图片_20210330144758.png")