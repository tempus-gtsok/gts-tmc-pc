module.exports = {
    proxy: {
        '/api': {
			target: 'http://172.16.51.65:9988',//接口域名 韦
            // target: 'http://tmcapitest.gssok.com/',  // 接口域名
            // "target" : "http://tmcapitest.gssok.com/",
            // target: 'http://tmcapitest.gssok.com/',  // 接口域名/
             // target : "http://api.test.gssok.com/tmsapi",
            // target: 'http://api.molintmc.cn/tmsapi',  // 接口域名 莫林生产
            // target: 'http://192.168.1.39:9988',  // 接口域名 庄海秋本地
			// target: 'http://192.168.1.246:9988',  // 接口域名 测试本地
			// target: 'http://172.16.9.203:9988',//接口域名 韦
            secure:false,
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/api': ''   // 因为在 ajax 的 url 中加了前缀 '/api'，而原本的接口是没有这个前缀的,所以需要通过 pathRewrite 来重写地址，将前缀 '/api' 转为 '/'
            }
        }
    }
}
