import request from '../utils/request'

// 获取上报计划

export const collectTableURL = 'api/collect/list/'

export function addcollect(data) {
	return request({
		url: `api/collect/add`,
		method: 'post',
		data
	})
}

export function deletecollect(id,data) {
	return request({
		url: `api/collect/del/${id}`,
		method: 'delete',
		data
	})
}

export function editcollect(id,data) {
	return request({
		url: `api/collect/edit/${id}`,
		method: 'put',
		data
	})
}

export function getcollect(id,data) {
	return request({
		url: `api/collect/get/${id}`,
		method: 'get',
		data
	})
}