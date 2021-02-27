import {request} from "@/network/request";

//发布博客
export function releaseBlog(blog) {
    return request({
        url: '/blog/release',
        method: 'post',
        data: {
            blogId: blog.blogId,
            userId: blog.userId,
            name: blog.name,
            content: blog.content,
            markdown: blog.markdown,
        }
    })
}

//保存为草稿
export function saveBlog(blog) {
    return request({
        url: '/blog/save',
        method: 'post',
        data: {
            blogId: blog.blogId,
            userId: blog.userId,
            name: blog.name,
            content: blog.content,
            markdown: blog.markdown,
        }
    })
}

//修改博客
export function updateBlog(blog) {
    return request({
        url: '/blog/update',
        method: 'post',
        data: {
            blogId: blog.blogId,
            name: blog.name,
            content: blog.content,
            markdown: blog.markdown,
            status: blog.status,
            garbageFlag: blog.garbageFlag,
            showFlag: blog.showFlag,
            adminShowFlag: blog.adminShowFlag
        }
    })
}

//删除博客
export function deleteBlog(blogId) {
    return request({
        url: '/blog/delete',
        method: 'post',
        data: {
            blogId,
        }
    })
}

//获取博客分页信息
export function listBlogPage(BlogQueryParam) {
    return request({
        url: '/blog/listByPage',
        method: 'post',
        data: {
            blogId: BlogQueryParam.blogId,
            name: BlogQueryParam.name,
            userId: BlogQueryParam.userId,
            userName: BlogQueryParam.userName,
            status: BlogQueryParam.status,
            showFlag: BlogQueryParam.showFlag,
            adminShowFlag: BlogQueryParam.adminShowFlag,
            garbageFlag: BlogQueryParam.garbageFlag,
            startTime: BlogQueryParam.startTime,
            endTime: BlogQueryParam.endTime,
            pageNum: BlogQueryParam.pageNum,
            pageSize: BlogQueryParam.pageSize,
        }
    })
}

//获取博客数据
export function getStatisticsByBlogId(blogId) {
    return request({
        url: '/blog/getStatisticsByBlogId',
        method: 'post',
        data: {
            blogId
        }
    })
}

//获取博客内容
export function getContentByBlogId(blogId) {
    return request({
        url: '/blog/getContentByBlogId',
        method: 'post',
        data: {
            blogId,
        }
    })
}


//点赞/取消博客
export function click(blogUserClick) {
    return request({
        url: '/blogUserClick/click',
        method: 'post',
        data: {
            blogId: blogUserClick.blogId,
            userId: blogUserClick.userId
        }
    })
}

//查询点赞
export function getClickByBlogIdAndUserId(blogUserClick) {
    return request({
        url: '/blogUserClick/getByBlogIdAndUserId',
        method: 'post',
        data: {
            blogId: blogUserClick.blogId,
            userId: blogUserClick.userId
        }
    })
}

//插入浏览记录
export function insertBlogUserView(blogUserView) {
    return request({
        url: '/blogUserView/insert',
        method: 'post',
        data: {
            blogId: blogUserView.blogId,
            userId: blogUserView.userId
        }
    })
}

//获取热门博客
export function listBlogHot() {
    return request({
        url: '/blogHot/list',
        method: 'get',
    })
}

//根据用户Id获取热门博客
export function getHotBlogByUserId(userId) {
    return request({
        url: '/blog/getHotBlogByUserId',
        method: 'post',
        data: {
            userId
        }
    })
}

//添加评论
export function insertBlogComment(blogComment) {
    return request({
        url: '/blogComment/insert',
        method: 'post',
        data: {
            parentId: blogComment.parentId,
            blogId: blogComment.blogId,
            fromUserId: blogComment.fromUserId,
            toUserId: blogComment.toUserId,
            comment: blogComment.comment,
        }
    })
}

//获取blogId
export function getBlogCommentByBlogId(blogId) {
    return request({
        url: '/blogComment/getByBlogId',
        method: 'post',
        data: {
            blogId
        }
    })
}
