import request from '../utils/request'

// 获取新增公告列表url
export const trashOutTableURL = 'api/trashOut/search/'

export function gettrashOutList() {
	return request({
		url: `api/trashOut/search/1/1000`,
		method: 'get',
	})
}
//添加
export function addtrashOut(data) {
	return request({
		url: `api/trashOut/add`,
		method: 'post',
		data
	})
}
//修改
export function edittrashOut(id, data) {
	return request({
		url: `api/trashOut/edit/${id}`,
		method: 'put',
		data
	})
}
//删除
export function deletetrashOut(id) {
	return request({
		url: `api/trashOut/del/${id}`,
		method: 'delete'
	})
}
