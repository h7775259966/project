import request from '../utils/request'

// 获取出库操作列表url
export const replenishTableURL = 'api/replenish/list/'

//添加
export function addreplenish(data) {
	return request({
		url: `api/replenish/add`,
		method: 'post',
		data
	})
}
//修改
export function editreplenish(id, data) {
	return request({
		url: `api/replenish/edit/${id}`,
		method: 'put',
		data
	})
}
//删除
export function deletereplenish(id) {
	return request({
		url: `api/replenish/del/${id}`,
		method: 'delete'
	})
}
//修改审核状态
// export function changeStatus(data) {
// 	return request({
// 		url: `api/replenish/editStatus/${data.id}/${data.status}`,
// 		method: 'put'
// 	})
// }