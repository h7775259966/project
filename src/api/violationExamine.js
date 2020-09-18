import request from '../utils/request'

// 获取违规检查列表url
export const ExamineTableURL = 'api/violationExamine/list/'
//添加
export function addExamine(data) {
	return request({
		url: `api/violationExamine/add`,
		method: 'post',
		data
	})
}
// 修改
export function editExamine(id, data) {
	return request({
		url: `api/violationExamine/edit/${id}`,
		method: 'put',
		data
	})
}
// 删除
export function deleteExamine(id) {
	return request({
		url: `api/violationExamine/del/${id}`,
		method: 'delete'
	})
}