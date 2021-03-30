var root
if (process.env.NODE_ENV === 'development') {
    // 开发环境下的代理地址，解决本地跨域跨域，配置在config目录下的index.js dev.proxyTable中
    root = 'http://api.test.gssok.com'
} else if (process.env.NODE_ENV === 'dev_server') {
    // 测试服环境下的地址
    root = 'http://api.test.gssok.com'
} else if (process.env.NODE_ENV === 'production') {
    // 生产环境，服务器分发
    root = '/dpv' //http://api.feiren.com/tmsapi
} else {
    root = 'http://api.dev.gssok.com'
}
sessionStorage.setItem('root', root);
export default {
    method: 'post',
    baseURL: root,
    // 请求头信息
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    // 参数
    data: {},
    // 设置超时时间
    timeout: 20000,
    // 携带凭证
    withCredentials: false,
    // 返回数据类型
    responseType: 'json'
}
