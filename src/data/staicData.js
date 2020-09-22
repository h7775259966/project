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
		label: '医院等级',
		prop: 'grade',
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
		label: '科室数',
		prop: 'officeNumber',
		expand: true,
		type: 'input',
		edit: true
	},
	{
		label: '床位数',
		prop: 'bedNumber',
		expand: true,
		type: 'input',
		edit: true
	},
	{
		label: '平均医废量/日',
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
		label: '医废处置方式',
		prop: 'processingMode',
		expand: true,
		edit: true,
		type: 'select',
		options: [
			{
				label: '自行处理',
				value: '0'
			},
			{
				label: '集中处理',
				value: '1'
			}
		]
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
		label: '操作',
		prop: 'operation'
	}
]

export const departmentTableCols = [
	{
		label: '部门名称',
		prop: 'departmentName',
		search: true,
		type: 'input',
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
		label: '所属部门',
		prop: 'departmentName',
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
		label: '所属部门',
		prop: 'departmentName',
		type: 'select',
		edit: true
	},
	{
		label: '所属科室',
		prop: 'officeName',
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
		prop: 'hospitalName',
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

//公告录入
export const noticeTableCols = [
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

//系统字典
export const dataDictionarys = [
	{
		label: '状态归属',
		prop: 'dictApi',
		type: 'input',
	},
	{
		label: '状态名称',
		prop: 'dictLabel',
		type: 'select',
	},
	{
		label: '状态值',
		prop: 'dictValue',
		type: 'input',
	},
	{
		label: '备注',
		prop: 'remark',
		type: 'input',
	},
	{
		label: '操作',
		prop: 'operation'
	}
]


