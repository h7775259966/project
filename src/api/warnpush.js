import request from '../utils/request'

// 获取预警推送列表url
export const addWarnTableURL = 'api/warnPush/list/'

// 新增
export function addWarn(data) {
	return request({
		url: `api/warnPush/add`,
		method: 'post',
		data
	})
}
// 修改
export function editWarn(id, data) {
	return request({
		url: `api/warnPush/edit/${id}`,
		method: 'put',
		data
	})
}
// 删除
export function deleteWarn(id) {
	return request({
		url: `api/warnPush/del/${id}`,
		method: 'delete'
	})
}
//查询所有预警
export function allWarn() {
	return request({
		url: `api/warnPush/all`,
		method: 'get'
	})
}