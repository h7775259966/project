import request from '../utils/request'

// 获取新增公告列表url
export const addNoticeTableURL = 'api/notice/search/'

export function addNotice(data) {
	return request({
		url: `api/notice/add`,
		method: 'post',
		data
	})
}

export function editNotice(id, data) {
	return request({
		url: `api/notice/edit/${id}`,
		method: 'put',
		data
	})
}

export function deleteNotice(id) {
	return request({
		url: `api/notice/del/${id}`,
		method: 'delete'
	})
}