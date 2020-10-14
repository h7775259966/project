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