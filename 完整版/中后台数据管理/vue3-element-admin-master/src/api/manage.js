import request from '@/utils/request'


// 获取信息
export const GetManageList = (params) => {
    return request({
        url: '/api/manage/list',
        method: 'get',
        params
    })
}

//删除
export const DeleteManage = (params) => {
    return request({
        url: '/api/manage/delete',
        method: 'get',
        params
    })
}

// // 新增
// export function createManage(data) {
//     return request({
//         url: '/manage/create',
//         method: 'post',
//         data
//     })
// }