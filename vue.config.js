module.exports={
    //基本路径
    publicPath: "./",
    // 构建时的输出目录
    outputDir: "dist",
    // 放置静态资源的目录
    assetsDir: "static",
    //html输出路径
    indexPath: "index.html",
    //文件名哈希
    filenameHashing: true,
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    }
}