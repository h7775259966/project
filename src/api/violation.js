import request from '../utils/request'

// 获取违规标准列表url
export const violationTableURL = 'api/violationStandard/list/'
//添加
export function addviolation(data) {
	return request({
		url: `api/violationStandard/add`,
		method: 'post',
		data
	})
}
// 修改
export function editviolation(id, data) {
	return request({
		url: `api/violationStandard/edit/${id}`,
		method: 'put',
		data
	})
}
// 删除
export function deleteviolation(id) {
	return request({
		url: `api/violationStandard/del/${id}`,
		method: 'delete'
	})
}