import request from '../utils/request'

// 获取转运信息列表url
export const trashOutMessageTableURL = 'api/trashOutMessage/list/'

//添加
export function addtrashOutMessage(data) {
	return request({
		url: `api/trashOutMessage/add`,
		method: 'post',
		data
	})
}
//修改
export function edittrashOutMessage(id, data) {
	return request({
		url: `api/trashOutMessage/edit/${id}`,
		method: 'put',
		data
	})
}
//删除
export function deletetrashOutMessage(id) {
	return request({
		url: `api/trashOutMessage/del/${id}`,
		method: 'delete'
	})
}