import {request} from "../request";

export function upload(file){
    return request({
        url: '/minio/upload',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: file,
    })
}

export function deleteImage(shortName) {
    return request({
        url: '/minio/delete',
        method: 'post',
        data: {
            shortName
        }
    })
}