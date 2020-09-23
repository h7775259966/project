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

            
        };
    }
};
</script>