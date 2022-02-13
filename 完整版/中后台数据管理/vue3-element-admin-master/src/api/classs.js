import request from '@/utils/request'

export function getfetchList(query) {
    return request({
        url: '/api/flowers/lists',
        method: 'get',
        params: query
    })
}

export function getfetchListById(id) {
    return request({
        url: `/api/cashflow/list`,
        method: 'get',
        params: id
    })
}

export function getupdateCash(data) {
    return request({
        url: `/api/cashflow/update`,
        method: 'post',
        data: data
    })
} 

export function getdeleteCash(query) {
    return request({
        url: `/api/cashflow/delete`,
        method: 'get',
        params: query
    })
}

export function getcreateCash(data) {
    return request({
        url: `/api/cashflow/create`,
        method: 'post',
        data: data
    })
}