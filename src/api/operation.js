import request from '../utils/request'

// 获取出库操作列表url
export const trashOutTableURL = 'api/trashOut/list/'

//删除
export function deletetrashOut(id) {
	return request({
		url: `api/trashOut/del/${id}`,
		method: 'delete'
	})
}
//修改出库状态
export function changeStatus(id,data) {
	return request({
		url: `api/trashOut/editStatus/${id}`,
		method: 'put',
		data
	})
}
// 获取所有车牌号
export function allCar() {
	return request({
		url: `api/trashOutMessage/allcar`,
		method: 'get'
	})
}
// 获取所有转运公司
export function allCompany() {
	return request({
		url: `api/trashOutMessage/allcompany`,
		method: 'get'
	})
}
// 获取所有转运人
export function allName() {
	return request({
		url: `api/trashOutMessage/allname`,
		method: 'get'
	})
}