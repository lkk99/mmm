import request from '@/utils/request'

export function fetchList(query) {
    return request({
        url: '/api/cashflow/lists',
        method: 'get',
        params: query
    })
}

export function fetchListById(id) {
    return request({
        url: `/api/cashflow/list`,
        method: 'get',
        params: id
    })
}

export function updateCash(data) {
    return request({
        url: `/api/cashflow/update`,
        method: 'post',
        data: data
    })
} 

export function deleteCash(query) {
    return request({
        url: `/api/cashflow/delete`,
        method: 'get',
        params: query
    })
}

export function createCash(data) {
    return request({
        url: `/api/cashflow/create`,
        method: 'post',
        data: data
    })
}