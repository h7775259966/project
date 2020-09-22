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
<<<<<<< HEAD
export function delDict(id){
    return request({
        url:`api/dict/del/${id}`,
        method:'delete',
        
=======
export function delDict(id,data){
    return request({
        url:`api/dict/del/${id}`,
        method:'delete'
>>>>>>> 8628a9bac661615080844b63f5aa4834a0644125
    })
}

//修改
export function editDict(id,data){
    return request({
        url:`api/dict/edit/${id}`,
<<<<<<< HEAD
        method:'put',
        data
=======
        method:'put'
>>>>>>> 8628a9bac661615080844b63f5aa4834a0644125
    })
}

// 查询
export function findDict(name){
    return request({
        url:`api/dict/findByDictApi/`,
        method:'get'
    })
}