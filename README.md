# 							腾邦差旅



## 一、项目简介

​	商旅服务SaaS平台以“云服务”的形式向行业用户提供商旅管理系统。对用户而言，只需开通即可使用，无需硬件投入，从而获得极致的性价比，并随官方技术团队每月一次的版本迭代，无缝、实时地获得商旅服务平台的最新功能。
​    从功能上来说，既包括传统的机票、酒店、火车、用车、保险、MICE等业务模块，又包括企业内部审批、差旅规则定义、成本中心及财务管理等内控模块。
​    此外，腾邦商旅服务平台还提供可选的财务结算ERP、预算管理、经营管理、领导驾驶舱、BI、大数据分析实施等增强型工具。配套腾付通和腾邦保险经纪，为用户提供完整的产业链解决方案。

![image-20210326105052245](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210326105052245.png)


## 二、使用说明

测试账号： yunying001           密码：888888

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
cnpm install

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

作者：腾邦国际商业服务集团有限公司

联系方式：QQ:15998251



## 五、更新日志

### V1.0.0 版本，yyyy-mm-dd

1. 新功能：飞机火车酒店查询下单
![首页](https://user-images.githubusercontent.com/43610618/112942919-63f93b80-9163-11eb-9e0d-63376ec50d2d.jpg)
2. 新功能：建立出差申请单
![出差申请](https://user-images.githubusercontent.com/43610618/112943598-4678a180-9164-11eb-86f8-d7bff92b07f1.jpg)
3. 新功能：申请单，审批单，意向单，订单，行程单等查询
![我的审批单](https://user-images.githubusercontent.com/43610618/112943682-5f815280-9164-11eb-9bcd-0aafee94fb76.jpg)
4. 新功能：差旅报告展示
![差旅报告](https://user-images.githubusercontent.com/43610618/112943844-9bb4b300-9164-11eb-89dd-bb4a95c97f92.jpg)
5. 新功能：添加企业管理信息
![企业管理](https://user-images.githubusercontent.com/43610618/112943952-c0a92600-9164-11eb-883a-9d96c8e4fa8d.jpg)
6. 新功能：个人中心
![个人中心](https://user-images.githubusercontent.com/43610618/112944067-e59d9900-9164-11eb-82d1-2f993d87f74c.jpg)
