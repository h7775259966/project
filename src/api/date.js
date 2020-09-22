import request from '../utils/request'

// 状态归属

export const dictListURL='api/dict/list/'

// 添加
export function addDict(data){
    return request({
        url:`api/dict/add`,
        method:'post',
        data
    })
}

//删除
export function delDict(id,data){
    return request({
        url:`api/dict/del/${id}`,
        method:'delete'
    })
}

//修改
export function editDict(id,data){
    return request({
        url:`api/dict/edit/${id}`,
        method:'put'
    })
}

// 查询
export function findDict(name){
    return request({
        url:`api/dict/findByDictApi/`,
        method:'get'
    })
}