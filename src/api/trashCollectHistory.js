import request from '../utils/request'

// 获取医废收集列表url
export const trashCollectHistoryTableURL = 'api/trashCollectHistory/list/'
//添加
export function addtrashCollectHistory(data) {
	return request({
		url: `api/trashCollectHistory/add`,
		method: 'post',
		data
	})
}
//修改
export function edittrashCollectHistory(id, data) {
	return request({
		url: `api/trashCollectHistory/edit/${id}`,
		method: 'put',
		data
	})
}
//删除
export function deletetrashCollectHistory(id) {
	return request({
		url: `api/trashCollectHistory/del/${id}`,
		method: 'delete'
	})
}
//查询
export function checktrashCollectHistory(id,data) {
	return request({
		url: `api/trashCollectHistory/get/${id}`,
		method: 'get',
		data
	})
}