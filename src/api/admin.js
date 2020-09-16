
import request from '../utils/request'

//医院
export const hospitalTableURL = 'api/hospital/list/'
// 新增
export function addHospital(data) {
	return request({
		url: `api/hospital/add`,
		method: 'post',
		data
	})
}
// 修改
export function editHospital(id, data) {
	return request({
		url: `api/hospital/edit/${id}`,
		method: 'put',
		data
	})
}
// 删除
export function deleteHospital(id) {
	return request({
		url: `api/hospital/del/${id}`,
		method: 'delete'
	})
}
export function allHospital() {
	return request({
		url: `api/hospital/all`,
		method: 'get'
	})
}

// 部门
export const departmentTableURL = 'api/department/list/'
// 新增
export function addDepartment(data) {
	return request({
		url: `api/department/add`,
		method: 'post',
		data
	})
}
// 修改
export function editDepartment(id, data) {
	return request({
		url: `api/department/edit/${id}`,
		method: 'put',
		data
	})
}
// 删除
export function deleteDepartment(id) {
	return request({
		url: `api/department/del/${id}`,
		method: 'delete'
	})
}
// 所有部门
export function allDepartment() {
	return request({
		url: `api/department/all`,
		method: 'get'
	})
}


//科室
export function Office(query) {
  return request({
    url:'/api/office/all',
    method: 'GET',
    params: query
  })
}
export const officeTableURL = 'api/office/list/'
// 新增
export function addOffice(data) {
	return request({
		url: `api/office/add`,
		method: 'post',
		data
	})
}
// 修改
export function editOffice(id, data) {
	return request({
		url: `api/office/edit/${id}`,
		method: 'put',
		data
	})
}
// 删除
export function deleteOffice(id) {
	return request({
		url: `api/office/del/${id}`,
		method: 'delete'
	})
}

export function allOffice() {
	return request({
		url: `api/office/all`,
		method: 'get'
	})
}

//护士
export const nurseTableURL = 'api/nurse/list/'
// 新增
export function addNurse(data) {
	return request({
		url: `api/nurse/add`,
		method: 'post',
		data
	})
}
// 修改
export function editNurse(id, data) {
	return request({
		url: `api/nurse/edit/${id}`,
		method: 'put',
		data
	})
}
// 删除
export function deleteNurse(id) {
	return request({
		url: `api/nurse/del/${id}`,
		method: 'delete'
	})
}

//收集人
export const collectTableURL = 'api/collect/list/'
// 新增
export function addCollect(data) {
	return request({
		url: `api/collect/add`,
		method: 'post',
		data
	})
}
// 修改
export function editCollect(id, data) {
	return request({
		url: `api/collect/edit/${id}`,
		method: 'put',
		data
	})
}
// 删除
export function deleteCollect(id) {
	return request({
		url: `api/collect/del/${id}`,
		method: 'delete'
	})
}

