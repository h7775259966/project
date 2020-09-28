import request from '../utils/request'

export const weibarcharts='api/custom/list/'

export function  outweight(data){
    return request({
        url:`api/custom/OutWeight`,
        method:'get',
        data
    })
}