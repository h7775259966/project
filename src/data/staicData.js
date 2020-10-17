import moment from 'moment';
//录入管理
export const hospitalTableCols = [
	{
		label: '医院名称',
		prop: 'hospitalName',
		search: true,
		type: 'input',
		edit: true
	},
	{
		label: '医院编号',
		prop: 'hospitalNumber',
		search: true,
		type: 'input',
		edit: true
	},
	{
		label: '所属市',
		prop: 'cityName',
		type: 'input',
		edit: true
	},
	{
		label: '所属区',
		prop: 'zoneName',
		type: 'input',
		edit: true
	},
	{
		label: '医院等级',
		prop: 'grade',
		type: 'input',
		edit: true
	},
	{
		label: '医院体制',
		prop: 'regime',
		type: 'input',
		edit: true,
	},
	{
		label: '医废处置方式',
		prop: 'processingMode',
	
		edit: true,
		type: 'select',
		options: [
			{
				label: '自行处理',
				value: '1'
			},
			{
				label: '集中处理',
				value: '2'
			}
		],
	},
	{
		label: '创建时间',
		prop: 'createDate',
		// formatter: (r, w) => moment(r[w]).format('YYYY-MM-DD HH:mm:ss')
		formatter: function (row, column) {
			var date = row[column.property];
			if (date == undefined) {
				return '';
			}
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},
	},
	{
		label: '科室数:',
		prop: 'officeNumber',
		expand: true,
		type: 'input',
		edit: true
	},
	{
		label: '床位数:',
		prop: 'bedNumber',
		expand: true,
		type: 'input',
		edit: true
	},
	{
		label: '平均医废量/日:',
		prop: 'averageTrash',
		expand: true,
		type: 'input',
		edit: true
	},
	{
		label: '医废第一负责人',
		prop: 'principal',
		type: 'input',
		expand: true,
		edit: true
	},
	
	{
		label: '医院说明',
		prop: 'hospitalContent',
		expand: true,
		type: 'input',
		edit: true
	},
	{
		label: '备注',
		prop: 'remarks',
		expand: true,
		type: 'input',
		edit: true
	},
	{
		label: '图片',
		prop: 'picture',
		expand: true,
		type: 'img',
		edit: true
	},
	{
		label: '医院id',
		prop: 'hospitalId',
		expand: true,
		type: 'input',
		edit: true
	},
	{
		label: '医院服务器地址',
		prop: 'hospitalUrl',
		expand: true,
		type: 'input',
		edit: true
	},
	{
		label: '监督单位服务器名称',
		prop: 'supervisionName',
		expand: true,
		type: 'input',
		edit: true
	},
	{
		label: '监督单位服务器地址',
		prop: 'supervisionUrl',
		expand: true,
		type: 'input',
		edit: true
	},
	{
		label: '操作',
		prop: 'operation'
	}
]
import {allHospital} from '../api/admin';
export const departmentTableCols = [
	{
		label: '部门名称',
		prop: 'departmentName',
		search: true,
		type: 'input',
		edit: true
	},
	{
		label: '部门编号',
		prop: 'number',
		type: 'input',
		edit: true
	},
	{
		label: '所属医院',
		prop: 'hospitalId',
		search: true,
		type: 'select',
		rotate: true,
		rotateFn: allHospital,
		optionValue: 'hospitalId',
		optionLabel: 'hospitalName',
		edit: true
	},
	{
		label: '备注',
		prop: 'remarks',
		type: 'input',
		expand: true,
		edit: true
	},
	{
		label: '创建时间',
		prop: 'createDate',
		// formatter: (r, w) => moment(r[w]).format('YYYY-MM-DD HH:mm:ss')
		formatter: function (row, column) {
			var date = row[column.property];
			if (date == undefined) {
				return '';
			}

			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},
	},
	{
		label: '操作',
		prop: 'operation'
	}
]
export const officeTableCols = [
	{
		label: '科室名称',
		prop: 'officeName',
		search: true,
		type: 'input',
		edit: true
	},
	{
		label: '科室编号',
		prop: 'number',
		type: 'input',
		edit: true
	},
	{
		label: '所属医院',
		prop: 'hospitalId',
		type: 'input',
		edit: true
	},
	{
		label: '所属部门',
		prop: 'departmentId',
		type: 'select',
		edit: true
	},
	{
		label: '备注',
		prop: 'remarks',
		type: 'input',
		expand: true,
		edit: true
	},
	{
		label: '创建时间',
		prop: 'createDate',
		// formatter: (r, w) => moment(r[w]).format('YYYY-MM-DD HH:mm:ss')
		formatter: function (row, column) {
			var date = row[column.property];
			if (date == undefined) {
				return '';
			}

			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},
	},
	{
		label: '操作',
		prop: 'operation'
	}
]
export const nurseTableCols = [
	{
		label: '护士姓名',
		prop: 'nurseName',
		search: true,
		type: 'input',
		edit: true
	},
	{
		label: '护士条形码',
		prop: 'nurseCode',
		search: true,
		type: 'input',
		edit: true
	},
	{
		label: '所属医院',
		prop: 'hospitalId',
		type: 'input',
		edit: true
	},
	{
		label: '所属部门',
		prop: 'departmentName',
		type: 'cascader',
		edit: true
	},
	{
		label: '所属科室',
		prop: 'officeName',
		type: 'cascader',
		edit: true
	},
	{
		label: '备注',
		prop: 'remarks',
		expand: true,
		type: 'input',
		edit: true
	},
	{
		label: '创建时间',
		prop: 'createDate',
		// formatter: (r, w) => moment(r[w]).format('YYYY-MM-DD HH:mm:ss')
		formatter: function (row, column) {
			var date = row[column.property];
			if (date == undefined) {
				return '';
			}

			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},
	},
	{
		label: '操作',
		prop: 'operation'
	}
]
export const collectTableCols = [
	{
		label: '收集人',
		prop: 'collectName',
		search: true,
		type: 'input',
		edit: true
	},
	{
		label: '收集人条形码',
		prop: 'collectCode',
		search: true,
		type: 'input',
		edit: true
	},
	{
		label: '所属医院',
		prop: 'hospitalId',
		type: 'select',
		edit: true
	},

	{
		label: '备注',
		prop: 'remarks',
		expand: true,
		type: 'input',
		edit: true
	},
	{
		label: '创建时间',
		prop: 'createDate',
		// formatter: (r, w) => moment(r[w]).format('YYYY-MM-DD HH:mm:ss')
		formatter: function (row, column) {
			var date = row[column.property];
			if (date == undefined) {
				return '';
			}

			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},
	},
	{
		label: '操作',
		prop: 'operation'
	}
]
export const cityCols = [
	{
		label: '市级单位名称',
		prop: 'cityName',
		search: true,
		type: 'input',
		edit: true
	},
	{
		label: '市级单位编号',
		prop: 'cityNumber',
		search: true,
		type: 'input',
		edit: true
	},
	{
		label: '市级单位负责人',
		prop: 'principal',
		type: 'input',
		edit: true
	},
	{
		label: '经度',
		prop: 'longitude',
		type: 'input',
		edit: true
	},
	{
		label: '纬度',
		prop: 'latitude',
		type: 'input',
		edit: true
	},
	{
		label: '备注',
		prop: 'remarks',
		expand: true,
		type: 'input',
		edit: true
	},
	{
		label: '创建时间',
		prop: 'createDate',
		// formatter: (r, w) => moment(r[w]).format('YYYY-MM-DD HH:mm:ss')
		formatter: function (row, column) {
			var date = row[column.property];
			if (date == undefined) {
				return '';
			}

			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},
	},
	{
		label: '操作',
		prop: 'operation'
	}
]
export const zoneCols = [
	{
		label: '区县级单位名称',
		prop: 'zoneName',
		search: true,
		type: 'input',
		edit: true
	},
	{
		label: '区县级单位编号',
		prop: 'zoneNumber',
		search: true,
		type: 'input',
		edit: true
	},
	{
		label: '所属市',
		prop: 'cityId',
		type: 'input',
		edit: true
	},
	{
		label: '市级单位负责人',
		prop: 'principal',
		type: 'input',
		edit: true
	},
	{
		label: '经度',
		prop: 'longitude',
		type: 'input',
		edit: true
	},
	{
		label: '纬度',
		prop: 'latitude',
		type: 'input',
		edit: true
	},
	{
		label: '备注',
		prop: 'remarks',
		expand: true,
		type: 'input',
		edit: true
	},
	{
		label: '创建时间',
		prop: 'createDate',
		// formatter: (r, w) => moment(r[w]).format('YYYY-MM-DD HH:mm:ss')
		formatter: function (row, column) {
			var date = row[column.property];
			if (date == undefined) {
				return '';
			}

			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},
	},
	{
		label: '操作',
		prop: 'operation'
	}
]

//公告录入
export const noticeTableCols = [
	{
		label: '创建时间',
		prop: 'createDate',
		type: 'input',
		formatter: function (row, column) {
			var date = row[column.property];
			if (date == undefined) {
				return '';
			}

			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},
	},
	{
		label: '标题',
		prop: 'headline',
		search: true,
		type: 'input',
		edit: true
	},
	{
		label: '发布人',
		prop: 'issuer',
		search: true,
		type: 'input',
		edit: true
	},
	{
		label: '撰稿人',
		prop: 'writer',
		type: 'input',
		edit: true
	},
	{
		label: '发布机构',
		prop: 'unit',
		type: 'input',
		edit: true
	},
	{
		label: '发布时间',
		prop: 'writeTime',
		// formatter: (r, w) => moment(r[w]).format('YYYY-MM-DD HH:mm:ss')
		formatter: function (row, column) {
			var date = row[column.property];
			if (date == undefined) {
				return '';
			}

			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},
	},
	{
		label: '发布状态',
		prop: 'status',
		edit: true
	},
	{
		label: '操作',
		prop: 'operation'
	}
]

//预警推送
export const warnpushTableCols = [
	{
		label: '推送日期',
		prop: 'pushTime',
		// formatter: (r, w) => moment(r[w]).format('YYYY-MM-DD HH:mm:ss')
		formatter: function (row, column) {
			var date = row[column.property];
			if (date == undefined) {
				return '';
			}

			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},
	},
	{
		label: '预警类型',
		prop: 'warnTypeId',
		type: 'input',
		edit: true
	},
	{
		label: '预警内容',
		prop: 'warnContent',
		type: 'input',
		edit: true
	},
	{
		label: '链接',
		prop: 'pushUrl',
		type: 'input',
		edit: true
	},
	{
		label: '操作',
		prop: 'operation'
	}
]
//违规标准
export const violationStandardTableCols = [
	{
		label: '违规标准名称',
		prop: 'violationStandardName',
		search: true,
		type: 'input',

	},
	{
		label: '处罚方式',
		prop: 'punishmentWay',
		type: 'input',
		edit: true
	},
	{
		label: '行政处罚',
		prop: 'administrativePenalty',
		type: 'input',
		edit: true
	},
	{
		label: '严重等级',
		prop: 'grade',
		type: 'select',
		edit: true,
		options: [
			{
				label: '一级',
				value: '1'
			},
			{
				label: '二级',
				value: '2'
			},
			{
				label: '三级',
				value: '3'
			}
		]
	},
	{
		label: '状态',
		prop: 'status',
		type: 'select',
		edit: true,
		options: [
			{
				label: '启用',
				value: '1'
			},
			{
				label: '禁用',
				value: '2'
			},

		]
	},
	{
		label: '备注',
		prop: 'remark',
		type: 'input',
		edit: true
	},
	{
		label: '操作',
		prop: 'operation'
	}
]
//违规检查
export const violationExamineTableCols = [
	{
		label: '违规单位',
		prop: 'hospitalId',
		search: true,
		type: 'input',
		edit: true
	},
	{
		label: '录入时间',
		prop: 'writeTime',
		edit: true,
		formatter: function (row, column) {
			var date = row[column.property];
			if (date == undefined) {
				return '';
			}

			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},
	},
	{
		label: '处置方式',
		prop: 'way',
		type: 'input',
		edit: true
	},
	{
		label: '违规内容',
		prop: 'content',
		type: 'input',
		edit: true,
	},
	{
		label: '状态',
		prop: 'status',
		edit: true,
	},
	{
		label: '操作',
		prop: 'operation'
	}
]

//资料上报 
export const planTableCols = [
	{
		label: '计划名称',
		prop: 'planName',
		search: true,
		type: 'input',
		edit: true
	},
	{
		label: '发起时间',
		prop: 'writeTime',
		// formatter: (r, w) => moment(r[w]).format('YYYY-MM-DD HH:mm:ss')
		formatter: function (row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return '';
            }

            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        },
	},
	{
		label: '发布单位',
		prop: 'writeUnit',
		type: 'input',
		edit: true
	},
	{
		label: '上报内容',
		prop: 'content',
		type: 'input',
		edit: true
	},
	{
		label: '完成数',
		prop: 'finishNumber',
		type: 'input',
		edit: true
	},
	{
		label: '未完成数',
		prop: 'unfinishNumber',
		type: 'input',
		edit: true
	},
	{
		label: '状态',
		prop: 'status',
		type: 'input',
		edit: true
	},

	{
		label: '备注',
		prop: 'remark',
		type: 'input',
		edit: true
	},
	{
		label: '操作',
		prop: 'operation'
	}
]
//上报计划
export const InformationReporting=[
	{
		label:'计划名称',
		prop:'planName',
		type:'input',
	},
	{
		label:'发布单位',
		prop:'hospitalName',
		type:'input',
	},
	{
		label: '发起时间',
		prop: 'writeTime',
		// formatter: (r, w) => moment(r[w]).format('YYYY-MM-DD HH:mm:ss')
		formatter: function (row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return '';
            }

            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        },
	},
	{
		label:'上报内容',
		prop:'content',
		type:'input',
	},
	{
		label:'状态',
		prop:'status',
		type:'input',
	},



]
// 资料上报 机构信息
export const OrganizationInformation=[
	    {
	        label: '机构名称',
	        prop: 'hospitalName',
	        type: 'input',
	        edit: true
	    },
	    {
	        label: '医院等级',
	        prop: 'grade',
	        type: 'input',
	        edit: true
	    },
	    {
	        label: '床位数',
	        prop: 'bedNumber',
	        type: 'input',
	        edit: true
	    },
	    {
	        label: '平均医废量/日',
	        prop: 'averageTrash',
	        type: 'input',
	        edit: true
	    },
	    {
	        label: '最近更新时间',
	        prop: 'pushTime',
	        // formatter: (r, w) => moment(r[w]).format('YYYY-MM-DD HH:mm:ss')
	        formatter: function (row, column) {
	            var date = row[column.property];
	            if (date == undefined) {
	                return '';
	            }
	
	            return moment(date).format('YYYY-MM-DD HH:mm:ss');
	        },
	    },
	    {
	        label: '操作',
	        prop: 'operation',
	        type: 'input',
	        edit: true
	    },
]

//医废收集
export const trashCollectTableCols = [
	{
		label: '所属科室',
		prop: 'officeName',
		search: true,
		type: 'input',
	},
	{
		label: '条码标识',
		prop: 'code',
		search: true,
		type: 'input',
	},
	{
		label: '收集时间',
		prop: 'collectTime',
		formatter: function (row, column) {
			var date = row[column.property];
			if (date == undefined) {
				return '';
			}
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},
	},
	{
		label: '回收趟次',
		prop: 'collectNumber',
		type: 'input',
	},
	{
		label: '废物类型',
		prop: 'trashType',
		search: true,
		type: 'input',
	},
	{
		label: '物品重量（kg） ',
		prop: 'violationWeight',
		type: 'input',
	},
	{
		label: '医废包数',
		prop: 'packets',
		type: 'input',
	},
	{
		label: '收集方式',
		prop: 'collectMethods',
		type: 'input',
	},
	{
		label: '小车编码',
		prop: 'equipmentId',
		type: 'input',
	},
	
	{
		label: '移交人员',
		prop: 'collectId',
		type: 'input',
	},
]
//医废入库
export const trashPutTableCols = [
	{
		label: '所属科室',
		prop: 'officeName',
		search: true,
		type: 'input',
	},
	{
		label: '条形编码',
		prop: 'code',
		search: true,
		type: 'input',
	},
	
	{
		label: '回收人员',
		prop: 'recycle',
		type: 'input',
	},
	{
		label: '收集时间',
		prop: 'collectTime',
		formatter: function (row, column) {
			var date = row[column.property];
			if (date == undefined) {
				return '';
			}
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},
	},
	{
		label: '回收趟次',
		prop: 'collectNumber',
		type: 'input',
	},
	{
		label: '废物类型 ',
		prop: 'trashType',
		type: 'input',
	},
	{
		label: '转运箱编号',
		prop: 'caseNum',
		type: 'input',
	},
	{
		label: '物品重量',
		prop: 'weight',
		type: 'input',
	},
	{
		label: '物品称重',
		prop: 'weightNumber',
		type: 'input',
	},
	{
		label: '医废包数',
		prop: 'packets',
		type: 'input',
	},
	{
		label: '移交人员',
		prop: 'collectId',
		type: 'input',
	},
	{
		label: '入库时间',
		prop: 'putInTime',
		formatter: function (row, column) {	
			var date = row[column.property];
			if (date == undefined) {
				return '';
			}
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},
	},
	{
		label: '收集方式',
		prop: 'collectMethods',
		type: 'input',
	},
]
//收集历史
export const trashCollectHistoryTableCols = [
	{
		label: '所属科室',
		prop: 'officeId',
		search: true,
		type: 'input',
	},
	{
		label: '条形编码',
		prop: 'code',
		search: true,
		type: 'input',
	},
	
	{
		label: '回收人员',
		prop: 'recycle',
		type: 'input',
	},
	{
		label: '收集时间',
		prop: 'collectTime',
		formatter: function (row, column) {
			var date = row[column.property];
			if (date == undefined) {
				return '';
			}
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},
	},
	{
		label: '回收趟次',
		prop: 'collectNumber',
		type: 'input',
	},
	{
		label: '废物类型 ',
		prop: 'trashId',
		type: 'input',
	},
	{
		label: '转运箱编号',
		prop: 'caseNum',
		type: 'input',
	},
	{
		label: '物品重量',
		prop: 'weight',
		type: 'input',
	},
	{
		label: '物品称重',
		prop: 'weightNumber',
		type: 'input',
	},
	{
		label: '医废包数',
		prop: 'packets',
		type: 'input',
	},
	{
		label: '移交人员',
		prop: 'collectId',
		type: 'input',
	},
	{
		label: '入库时间',
		prop: 'putInTime',
		formatter: function (row, column) {	
			var date = row[column.property];
			if (date == undefined) {
				return '';
			}
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},
	},
	{
		label: '收集方式',
		prop: 'collectMethods',
		type: 'input',
	},
]

//信息维护
export const maintenanceTableCols = [
	{
		label: '信息类型',
		prop: 'type',
		type: 'input',
	},
	{
		label: '信息内容',
		prop: 'content',
		type: 'input',
	},
	{
		label: '备注',
		prop: 'remarks',
		type: 'input',
	},
	{
		label: '操作',
		prop: 'operation'
	}
]
//出库操作
export const trashOutTableCols = [
	{
		label: '收集时间',
		prop: 'collectTime',
		formatter: function (row, column) {
			var date = row[column.property];
			if (date == undefined) {
				return '';
			}
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},
	},
	{
		label: '出库状态',
		prop: 'status',
		search: true,
		type: 'input',
	},
	{
		label: '收集重量（kg）',
		prop: 'collectWeight',
		type: 'input',
	},
	{
		label: '已入库重量（kg）',
		prop: 'putWeight',
		type: 'input',
	},
	
	{
		label: '出库重量（kg）',
		prop: 'outWeight',
		type: 'input',
	},
	{
		label: '可出库明细',
		prop: 'outDetail',
		type: 'input',
	},
	{
		label: '操作',
		prop: 'operation'
	}
]
//出库记录
export const trashOuthistoryTableCols = [
	{
		label: '出库时间',
		prop: 'outTime',
		formatter: function (row, column) {
			var date = row[column.property];
			if (date == undefined) {
				return '';
			}
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},
	},
	{
		label: '出库人',
		prop: 'outName',
		type: 'input',
	},
	{
		label: '出库重量(kg)',
		prop: 'outWeight',
		type: 'input',
	},
	{
		label: '转运公司',
		prop: 'company',
		type: 'input',
	},
	{
		label: '车牌号',
		prop: 'car',
		type: 'input',
	},
	{
		label: '转运人',
		prop: 'name',
		type: 'input',
	},
	{
		label: '出库明细',
		prop: 'outDetail',
		type: 'input'
	}
]

//设备管理
export const equipmentTableCols = [
	{
		label: '所属医疗机构',
		prop: 'hospitalId',
		type: 'input',
		edit: true
	},
	{
		label: '设备名称',
		prop: 'equipmentName',
		search: true,
		type: 'input',
		edit: true
	},
	{
		label: '设备编号',
		prop: 'equipmentNum',
		search: true,
		type: 'input',
		edit: true
	},
	{
		label: '设备生产商',
		prop: 'equipmentFirm',
		type: 'input',
		edit: true
	},
	
	{
		label: 'SIM卡号',
		prop: 'equipmentSIM',
		type: 'input',
		edit: true
	},
	{
		label: '备注',
		prop: 'remarks',
		type: 'input',
		edit: true
	},
	{
		label: '设备状态',
		prop: 'status',
		type: 'input',
	},
	{
		label:'操作',
		prop:'operation',
	}
]

//医废补录
export const replenishTableCols = [
	{
		label: '补录时间',
		prop: 'replenishTime',
		formatter: function (row, column) {
			var date = row[column.property];
			if (date == undefined) {
				return '';
			}
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},
	},
	{
		label: '收集时间',
		prop: 'collectTime',
		formatter: function (row, column) {
			var date = row[column.property];
			if (date == undefined) {
				return '';
			}
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},
	},
	{
		label: '科室名称',
		prop: 'officeId',
		type: 'input',
		edit: true
	},
	
	{
		label: '护士名称',
		prop: 'nurseId',
		search: true,
		type: 'input',
		edit: true
	},
	{
		label: '收集人',
		prop: 'collectId',
		type: 'input',
		edit: true
	},
	
	{
		label: '医废类型',
		prop: 'trashId',
		type: 'input',
		edit: true
	},
	{
		label: '医废重量',
		prop: 'replenishWeight',
		type: 'input',
	},
	{
		label: '医废数量',
		prop: 'replenishNumber',
		type: 'input',
	},
	{
		label: '备注',
		prop: 'remarks',
		type: 'input',
		edit: true
	},
	{
		label:'操作',
		prop:'operation',
	},
]

// 数据字典
export const dataDictionarys=[
	{
		label:'状态归属',
		prop:'dictApi',
		search: true,
		type: 'input',
	},
	{
		label:'状态名称',
		prop:'dictLabel',
		type: 'select',
	},
	{
		label:'状态值',
		prop:'dictValue',
		type: 'input',
	},
	{
		label:'备注',
		prop:'remarks',
		type: 'input',
	},
	{
		label:'操作',
		prop:'operation',
	}
]

// 车辆定位 收集人
export const CarCollector=[
	{
		label:'收集人',
		prop:'collectName',
		type:'input',
	},
	{
		label:'收集人条形码',
		prop:'collectCode',
		type:'input',
	},
	{
		label:'医院名称',
		prop:'hospitalName',
		type:'input',
	},
	{
		label:'医院编号',
		prop:'hospitalId',
		type:'input',
	},
	{
		label:'配置人',
		prop:'status',
		type:'input',
	},
	{
		label: '配置时间',
		prop: 'createDate',
		// formatter: (r, w) => moment(r[w]).format('YYYY-MM-DD HH:mm:ss')
		formatter: function (row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return '';
            }

            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        },
	},

	{
		label:'操作',
		prop:'operation',
		type:'input',
	},
]