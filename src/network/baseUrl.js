let baseUrl= "";   //这里是一个默认的url，可以没有
switch (process.env.NODE_ENV) {
    case 'development':
        baseUrl = "http://localhost:8080/"  //开发环境url
        break
    case 'prod':   // 注意这里的名字要和步骤二中设置的环境名字对应起来
        baseUrl = "http://47.115.59.65:7777/"  //测试环境中的url
        break
}

export default baseUrl;