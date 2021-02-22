//模拟评论数据
const comment = {
    status: "成功",
    code: 200,
    data: [
        {
            id: 'comment0001', //主键id
            time: '2018-07-05 08:30',  //评论时间
            ownerId: 'talents100020', //文章的id
            fromUserId: 'errhefe232213',  //评论者id
            fromUserName: '犀利的评论家',   //评论者昵称
            fromUserIcon: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg', //评论者头像
            likeNum: 3, //点赞人数
            comment: '非常靠谱的程序员',  //评论内容
            reply: [  //回复，或子评论
                {
                    id: '34523244545',  //主键id
                    commentId: 'comment0001',  //父评论id，即父亲的id
                    fromUserId: 'observer223432',  //评论者id
                    fromUserName: '夕阳红',  //评论者昵称
                    fromUserIcon: 'https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg', //评论者头像
                    toId: 'errhefe232213',  //被评论者id
                    toName: '犀利的评论家',  //被评论者昵称
                    toAvatar: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg',  //被评论者头像
                    comment: '赞同，很靠谱，水平很高',  //评论内容
                    time: '2018-07-05 08:35'   //评论时间
                },
                {
                    id: '34523244545',
                    commentId: 'comment0001',
                    fromUserId: 'observer567422',
                    fromUserName: '清晨一缕阳光',
                    fromUserIcon: 'http://imgsrc.baidu.com/imgad/pic/item/c2fdfc039245d688fcba1b80aec27d1ed21b245d.jpg',
                    toUserId: 'observer223432',
                    toUserName: '夕阳红',
                    toUserIcon: 'https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg',
                    comment: '大神一个！',
                    time: '2018-07-05 08:50'
                }
            ]
        },
        {
            id: 'comment0002',
            time: '2018-07-05 08:30',
            ownerId: 'talents100020',
            fromUserId: 'errhefe232213',
            fromUserName: '毒蛇郭德纲',
            fromUserIcon: 'http://ww1.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2q2p8pj30v90uzmzz.jpg',
            likeNum: 0,
            comment: '从没见过这么优秀的人',
            reply: []
        }
    ]
};

export {comment}
