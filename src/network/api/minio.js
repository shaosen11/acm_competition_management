import {request} from "../request";

export function deleteImage(shortName) {
    return request({
        url: '/minio/delete',
        method: 'post',
        data: {
            shortName
        }
    })
}