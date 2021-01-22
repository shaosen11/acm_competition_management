import {request} from "@/network/request";

//创建博客
export function createBlog(Blog) {
    return request({
        url: '/blog/create',
        method: 'post',
        data: {
            userId: Blog.userId,
            name: Blog.name,
            content: Blog.content,
        }
    })
}

//修改博客
export function updateBlog(Blog) {
    return request({
        url: '/blog/update',
        method: 'post',
        data: {
            blogId: Blog.blogId,
            userId: Blog.userId,
            name: Blog.name,
            content: Blog.content,
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
            pageNum: BlogQueryParam.pageNum,
            pageSize: BlogQueryParam.pageSize,
        }
    })
}


//获取博客分页信息
export function getBlogByBlogId(blogId) {
    return request({
        url: '/blog/getById',
        method: 'post',
        data: {
            blogId
        }
    })
}