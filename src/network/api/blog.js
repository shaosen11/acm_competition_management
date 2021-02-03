import {request} from "@/network/request";

//创建博客
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
            showFlag: blog.showFlag
        }
    })
}

//获取博客分页信息
export function listBlogPage(BlogQueryParam) {
    return request({
        url: '/blog/listByPage',
        method: 'post',
        data: {
            userId: BlogQueryParam.userId,
            name: BlogQueryParam.name,
            status: BlogQueryParam.status,
            showFlag: BlogQueryParam.showFlag,
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
export function getContentById(blog) {
    return request({
        url: '/blog/getContentById',
        method: 'post',
        data: {
            blogId: blog.blogId,
            userId: blog.userId
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
