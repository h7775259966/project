
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
//获取所有医院
export function allHospital() {
	return request({
		url: `api/hospital/all`,
		method: 'get'
	})
}


// 获取市
export function cityList(id) {
	return request({
		url: `api/city/findByProvinceId/${id}`
	})
}
// 获取区
export function zoneList(id) {
	return request({
		url: `api/zone/findByCityId/${id}`
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
		url: '/api/office/all',
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
//所有科室
export function allOffice() {
	return request({
		url: `api/office/all/`,
		method: 'get'
	})
}

// 根据部门id获取科室
export function getOfficeById(departmentId) {
	return request({
		url: `api/office/findByDepartmentId/${departmentId}`,
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


//市级单位
export const cityURL = 'api/city/list/'
// 新增
export function addCity(data) {
	return request({
		url: `api/city/add`,
		method: 'post',
		data
	})
}
// 修改
export function editCity(id, data) {
	return request({
		url: `api/city/edit/${id}`,
		method: 'put',
		data
	})
}
// 删除
export function deleteCity(id) {
	return request({
		url: `api/city/del/${id}`,
		method: 'delete'
	})
}

//区县级单位
export const zoneURL = 'api/zone/list/'
// 新增
export function addZone(data) {
	return request({
		url: `api/zone/add`,
		method: 'post',
		data
	})
}
// 修改
export function editZone(id, data) {
	return request({
		url: `api/zone/edit/${id}`,
		method: 'put',
		data
	})
}
// 删除
export function deleteZone (id) {
	return request({
		url: `api/zone/del/${id}`,
		method: 'delete'
	})
}
