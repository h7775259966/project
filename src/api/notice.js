import request from '../utils/request'

// 获取新增公告列表url
export const addNoticeTableURL = 'api/notice/list/'

export function getNoticeList() {
	return request({
		url: `api/notice/list/1/1000`,
		method: 'get',
	})
}
//添加
export function addNotice(data) {
	return request({
		url: `api/notice/add`,
		method: 'post',
		data
	})
}
//修改
export function editNotice(id, data) {
	return request({
		url: `api/notice/edit/${id}`,
		method: 'put',
		data
	})
}
//删除
export function deleteNotice(id) {
	return request({
		url: `api/notice/del/${id}`,
		method: 'delete'
	})
}
//修改发布状态
export function changeStatus(data) {
	return request({
		url: `api/notice/editStatus/${data.id}/${data.status}`,
		method: 'put'
	})
}