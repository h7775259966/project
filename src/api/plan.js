import request from '../utils/request'

// 获取上报计划

export const PlanTableURL = 'api/plan/list/'

export function addPlan(data) {
	return request({
		url: `api/plan/add`,
		method: 'post',
		data
	})
}

export function deletePlan(id,data) {
	return request({
		url: `api/plan/del/${id}`,
		method: 'delete',
		data
	})
}

export function editPlan(id,data) {
	return request({
		url: `api/plan/edit/${id}`,
		method: 'put',
		data
	})
}

export function getPlan(id,data) {
	return request({
		url: `api/plan/get/${id}`,
		method: 'get',
		data
	})
}