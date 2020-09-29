import request from '../utils/request'

// 获取设备列表url
export const equipmentTableURL = 'api/equipment/list/'

// 新增
export function addequipment(data) {
	return request({
		url: `api/equipment/add`,
		method: 'post',
		data
	})
}
// 修改
export function editequipment(id, data) {
	return request({
		url: `api/equipment/edit/${id}`,
		method: 'put',
		data
	})
}
// 删除
export function deleteequipment(id) {
	return request({
		url: `api/equipment/del/${id}`,
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
