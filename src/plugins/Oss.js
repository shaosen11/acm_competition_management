//首先第一行引入 ali-oss 插件并配置：
const OSS = require('ali-oss');
const client= new OSS({
    accessKeyId: 'your access key',  // 查看你自己的阿里云KEY
    accessKeySecret: 'your access secret', // 查看自己的阿里云KEYSECRET
    bucket: 'your bucket name', // 你的 OSS bucket 名称
    region: 'oss-cn-beijing', // bucket 所在地址，我的是 华北2 北京
    cname:true, // 开启自定义域名上传
    endpoint:"file.xxxx.live" // 自己的域名
});