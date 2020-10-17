import request from '../utils/request'

// 获取医废收集列表url
export const trashCollectTableURL = 'api/trashCollect/collectlist/'
//添加
export function addtrashCollect(data) {
	return request({
		url: `api/trashCollect/add`,
		method: 'post',
		data
	})
}
//修改
export function edittrashCollect(id, data) {
	return request({
		url: `api/trashCollect/edit/${id}`,
		method: 'put',
		data
	})
}
//删除
export function deletetrashCollect(id) {
	return request({
		url: `api/trashCollect/del/${id}`,
		method: 'delete'
	})
}
//查询
export function checktrashCollect(id,data) {
	return request({
		url: `api/trashCollect/get/${id}`,
		method: 'get',
		data
	})
}