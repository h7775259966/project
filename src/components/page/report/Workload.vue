<template>
    <vxe-grid
        ref="xGrid"
        v-bind="gridOptions"
        border
        resizable
        export-config
        import-config
        keep-source
        height="500"
        :form-config="tableForm"
        :proxy-config="tableProxy"
        :columns="tableColumn"
        :toolbar="tableToolbar"
        :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
    ></vxe-grid>
</template>

<script>
export default {
    data() {
        return {
            tableProxy: {
                props: {
                    result: 'result',
                    total: 'page.total'
                },
                ajax: {
                    // // page 对象： { pageSize, currentPage }
                    // query: ({ page }) => XEAjax.get(`/api/user/page/list/${page.pageSize}/${page.currentPage}`),
                    // // body 对象： { removeRecords }
                    // delete: ({ body }) => XEAjax.post('/api/user/save', body),
                    // // body 对象： { insertRecords, updateRecords, removeRecords, pendingRecords }
                    // save: ({ body }) => XEAjax.post('/api/user/save', body)
                }
            },
            tableForm: {
                items: [
                    { field: 'name', title: '收集人:', itemRender: { name: 'input', attrs: { placeholder: '请输入收集人' } } },
                    { itemRender: { name: '$button', props: { content: '查询', type: 'submit', status: 'primary' } } },
                    { itemRender: { name: '$button', props: { content: '重置', type: 'reset' } } }
                ]
            },
            tableToolbar: {
                buttons: [
                    { code: 'insert_actived', name: '新增', status: 'primary', icon: 'vxe-icon--plus' },
                    { code: 'mark_cancel', name: '删除', status: 'primary', icon: 'el-icon-delete' },
                    { code: 'save', name: '保存', status: 'success', icon: 'el-icon-check' }
                ],
                perfect: true,
                refresh: {
                    icon: 'vxe-icon--refresh',
                    iconLoading: 'vxe-icon--refresh roll'
                },
                import: {
                    icon: 'vxe-icon--upload'
                },
                export: {
                    icon: 'vxe-icon--download'
                },
                print: {
                    icon: 'vxe-icon--print'
                },
                zoom: {
                    iconIn: 'el-icon-full-screen',
                    iconOut: 'el-icon-close'
                },
                custom: {
                    icon: 'vxe-icon--menu'
                }
            },
            tableColumn: [
                { type: 'checkbox', width: 50 },
                { type: 'seq', width: 60 },
                { field: 'name', title: 'Name', editRender: { name: 'input' } },
                { field: 'nickname', title: 'Nickname', editRender: { name: 'input' } },
                { field: 'role', title: 'Role', editRender: { name: 'input' } },
                { field: 'describe', title: 'Describe', showOverflow: true, editRender: { name: 'input' } }
            ]

            // gridOptions: {
            //     border: true, //是否带有边框
            //     resizable: true, //所有的列是否允许拖动列宽调整大小
            //     showHeaderOverflow: true, //设置表头所有内容过长时显示为省略号
            //     showOverflow: true, //设置所有内容过长时显示为省略号（如果是固定列建议设置该值，提升渲染速度）
            //     highlightHoverRow: true, //鼠标移到行是否要高亮显示
            //     keepSource: true, //保持原始值的状态，被某些功能所依赖，比如编辑状态、还原数据等（开启后影响性能，具体取决于数据量）
            //     id: 'full_edit_1',
            //     height: 600,
            //     rowId: 'id',
            //     customConfig: {
            //         //自定义列配置项
            //         storage: true, //是否启用 localStorage 本地保存，会将列操作状态保留在本地（需要有 id）
            //         checkMethod: this.checkColumnMethod //自定义列是否允许列选中的方法，该方法 Function({ column }) 的返回值用来决定这一列的 checkbox 是否可以选中
            //     },
            //     printConfig: {   //打印配置项
            //       columns: [
            //         { field: 'name' },
            //         { field: 'email' },
            //         { field: 'nickname' },
            //         { field: 'age' },
            //         { field: 'amount' }
            //       ]
            //     },
            //     sortConfig: {     //排序配置项
            //       trigger: 'cell'     //触发方式    default（点击按钮触发）, cell（点击表头触发）
            //     },
            //     filterConfig: {    //筛选配置项
            //       remote: true    //所有列是否使用服务端筛选，如果设置为 true 则不会对数据进行处理
            //     },
            //     formConfig: {     //表单配置项
            //       titleWidth: 100,      //所有项的标题宽度
            //       titleAlign: 'right',    //所有项的标题对齐方式
            //       items: [

            //       ]
            //     },
            //     toolbar: {  //工具栏配置
            //       buttons: [
            //         { code: 'insert_actived', name: '新增', icon: 'fa fa-plus' },
            //         { code: 'delete', name: '直接删除', icon: 'fa fa-trash-o' },
            //         { code: 'mark_cancel', name: '删除/取消', icon: 'fa fa-trash-o' },
            //         { code: 'save', name: '保存', icon: 'fa fa-save', status: 'success' }
            //       ],
            //     },
            //     refresh: true,  //刷新
            //     import: true,   //导入
            //     export: true,   //导出
            //     print: true,    //打印
            //     zoom: true,     //当最大化或还原操作被手动点击时会后触发该事件
            //     custom: true    //如果与工具栏关联，在自定义列按钮被手动点击后会触发该事件
            // },
            // columns: [
            //       { type: 'checkbox', title: 'ID', width: 120 },
            //       { field: 'name', title: 'Name', remoteSort: true, editRender: { name: 'input' } },
            //       {
            //         field: 'role',
            //         title: 'Role',
            //         remoteSort: true,
            //         filters: [
            //           { label: '前端开发', value: '前端' },
            //           { label: '后端开发', value: '后端' },
            //           { label: '测试', value: '测试' },
            //           { label: '程序员鼓励师', value: '程序员鼓励师' }
            //         ],
            //         filterMultiple: false,
            //         editRender: { name: 'input' }
            //     },
            //     { field: 'email', title: 'Email', width: 160, editRender: { name: 'input' } },
            //       { field: 'nickname', title: 'Nickname', editRender: { name: 'input' } },
            //       { field: 'sex', title: 'Sex', editRender: { name: '$select', options: [] } },
            //       { field: 'age', title: 'Age', visible: false, remoteSort: true, editRender: { name: '$input', props: { type: 'number', min: 1, max: 120 } } },
            //       { field: 'amount', title: 'Amount', formatter: this.formatAmount, editRender: { name: '$input', props: { type: 'float', digits: 2 } } },
            //       { field: 'updateDate', title: 'Update Date', width: 160, visible: false, remoteSort: true, formatter: this.formatDate },
            //       { field: 'createDate', title: 'Create Date', width: 160, visible: false, remoteSort: true, formatter: this.formatDate }
            // ],
            // importConfig: {
            //     remote: true,
            //     importMethod: this.importMethod,
            //     types: ['xlsx'],
            //     modes: ['insert']
            // },
            // exportConfig: {
            //     remote: true,
            //     exportMethod: this.exportMethod,
            //     types: ['xlsx'],
            //     modes: ['current', 'selected', 'all']
            // },
            // checkboxConfig: {
            //     labelField: 'id',
            //     reserve: true,
            //     highlight: true,
            //     range: true
            // },
            // editRules: {
            //     name: [
            //         { required: true, message: 'app.body.valid.rName' },
            //         { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
            //     ],
            //     email: [
            //         { required: true, message: '邮件必须填写' }
            //     ],
            //     role: [
            //         { required: true, message: '角色必须填写' }
            //     ]
            // },
            // editConfig: {
            //     trigger: 'click',
            //     mode: 'row',
            //     showStatus: true
            // },

            // methods: {
            //     async findSexList () {
            //         const sexList = await XEAjax.get('/api/conf/sex/list')
            //         // 异步更新下拉选项
            //         this.sexList = sexList
            //         const xGrid = this.$refs.xGrid
            //         if (xGrid) {
            //             const sexColumn = xGrid.getColumnByField('sex')
            //             sexColumn.editRender.options = sexList
            //             const sexItem = xGrid.getFormItems(4)
            //             sexItem.itemRender.options = sexList
            //         }
            //     },
            // },

            // importMethod ({ file }) {
            //   const formBody = new FormData()
            //   formBody.append('file', file)
            //   return XEAjax.post('https://api.xuliangzhan.com:10443/api/pub/import', formBody).then(data => {
            //     this.$XModal.message({ message: `成功导入 ${data.result.insertRows} 条记录！`, status: 'success' })
            //     // 导入完成，刷新表格
            //     this.$refs.xGrid.commitProxy('query')
            //   }).catch(() => {
            //     this.$XModal.message({ message: '导入失败，请检查数据是否正确！', status: 'error' })
            //   })
            // },
            // exportMethod ({ options }) {
            //   const proxyInfo = this.$refs.xGrid.getProxyInfo()
            //   // 传给服务端的参数
            //   const body = {
            //         filename: options.filename,
            //         sheetName: options.sheetName,
            //         isHeader: options.isHeader,
            //         original: options.original,
            //         mode: options.mode,
            //         pager: proxyInfo.pager,
            //         ids: options.mode === 'selected' ? options.data.map(item => item.id) : [],
            //         fields: options.columns.map(column => {
            //         return {
            //             field: column.property,
            //             title: column.title
            //         }
            //         })
            //     }
            // }
        };
    }
};
</script>