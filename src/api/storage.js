import request from '../utils/request'

// 获取医废入库列表url
export const trashPutTableURL = 'api/trashPut/list/'
//添加
export function addtrashPut(data) {
	return request({
		url: `api/trashPut/add`,
		method: 'post',
		data
	})
}
//修改
export function edittrashPut(id, data) {
	return request({
		url: `api/trashPut/edit/${id}`,
		method: 'put',
		data
	})
}
//删除
export function deletetrashPut(id) {
	return request({
		url: `api/trashPut/del/${id}`,
		method: 'delete'
	})
}
//查询
export function checktrashPut(id,data) {
	return request({
		url: `api/trashPut/get/${id}`,
		method: 'get',
		data
	})
}