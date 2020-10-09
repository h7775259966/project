<template>
    <div>
        <header>
            <span>请选择医废监测点：</span>
            <el-cascader :options="options" clearable></el-cascader>
            <el-button type="primary" style="margin-left: 22%" @click="add">新增</el-button>
        </header>
        <e-table ref="collectTable" :dataOrigin="dataOrigin" :tableCols="tableColList" :showOperation="true" new-search>
            <!-- <template #operationArea>
                <el-button type="primary" @click="add">添加</el-button>
            </template> -->
            <template #expand="scope">
                <el-form label-position="left" class="demo-table-expand">
                    <el-form-item :label="item.label" v-for="item in expendList" :key="item.prop">
                        <span>{{ scope.rowData[item.prop] }}</span>
                    </el-form-item>
                </el-form>
            </template>

            <template #operation="scope">
                <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.rowData)">编辑</el-button>
                <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.rowData)">删除</el-button>
            </template>
        </e-table>
        <!-- 编辑框 -->
        <el-dialog :title="isAdd ? '新增' : '编辑'" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="auto">
                <el-form-item prop="collectName" label="收集人" :rules="[{ required: true, message: '请输入收集人名称', trigger: 'blur' }]">
                    <el-input v-model="form.collectName"></el-input>
                </el-form-item>
                <el-form-item prop="hospitalName" label="医院名称"> <el-input v-model="form.hospitalName"></el-input> </el-form-item>
                <!-- <el-form-item prop="content" label="配置人"> <el-input v-model="form.content"></el-input>          </el-form-item> -->
                <el-form-item prop="createDate" label="配置时间" :rules="[{ required: true, message: '请输入配置时间', trigger: 'blur' }]">
                    <el-date-picker v-model="form.createDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
                <!-- <el-form-item prop="remark" label="备注">
                    <el-input type="textarea" :rows="5" v-model="form.remark"></el-input>     
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import moment from 'moment';
import { collectTableURL, addcollect, deletecollect, editcollect, getcollect } from '@/api/carcoller';
import ETable from '@/components/common/NosearchTable';
import { CarCollector } from '@/data/staicData';

export default {
    components: {
        ETable
    },
    props: {
        kind: {
            type: String,
            default: 'edit'
        }
    },
    data() {
        return {
            moment,
            tableData: [],
            editVisible: false,
            form: {},
            dataOrigin: {
                url: collectTableURL
            },
            isAdd: true,
            customSearchList: [{}],
            options: [
                {
                    value: 'zhinan',
                    label: '指南',
                    children: [
                        {
                            value: 'shejiyuanze',
                            label: '设计原则',
                            children: [
                                {
                                    value: 'yizhi',
                                    label: '一致'
                                },
                                {
                                    value: 'fankui',
                                    label: '反馈'
                                },
                                {
                                    value: 'xiaolv',
                                    label: '效率'
                                },
                                {
                                    value: 'kekong',
                                    label: '可控'
                                }
                            ]
                        },
                        {
                            value: 'daohang',
                            label: '导航',
                            children: [
                                {
                                    value: 'cexiangdaohang',
                                    label: '侧向导航'
                                },
                                {
                                    value: 'dingbudaohang',
                                    label: '顶部导航'
                                }
                            ]
                        }
                    ]
                },
                {
                    value: 'zujian',
                    label: '组件',
                    children: [
                        {
                            value: 'basic',
                            label: 'Basic',
                            children: [
                                {
                                    value: 'layout',
                                    label: 'Layout 布局'
                                },
                                {
                                    value: 'color',
                                    label: 'Color 色彩'
                                },
                                {
                                    value: 'typography',
                                    label: 'Typography 字体'
                                },
                                {
                                    value: 'icon',
                                    label: 'Icon 图标'
                                },
                                {
                                    value: 'button',
                                    label: 'Button 按钮'
                                }
                            ]
                        },
                        {
                            value: 'form',
                            label: 'Form',
                            children: [
                                {
                                    value: 'radio',
                                    label: 'Radio 单选框'
                                },
                                {
                                    value: 'checkbox',
                                    label: 'Checkbox 多选框'
                                },
                                {
                                    value: 'input',
                                    label: 'Input 输入框'
                                },
                                {
                                    value: 'input-number',
                                    label: 'InputNumber 计数器'
                                },
                                {
                                    value: 'select',
                                    label: 'Select 选择器'
                                },
                                {
                                    value: 'cascader',
                                    label: 'Cascader 级联选择器'
                                },
                                {
                                    value: 'switch',
                                    label: 'Switch 开关'
                                },
                                {
                                    value: 'slider',
                                    label: 'Slider 滑块'
                                },
                                {
                                    value: 'time-picker',
                                    label: 'TimePicker 时间选择器'
                                },
                                {
                                    value: 'date-picker',
                                    label: 'DatePicker 日期选择器'
                                },
                                {
                                    value: 'datetime-picker',
                                    label: 'DateTimePicker 日期时间选择器'
                                },
                                {
                                    value: 'upload',
                                    label: 'Upload 上传'
                                },
                                {
                                    value: 'rate',
                                    label: 'Rate 评分'
                                },
                                {
                                    value: 'form',
                                    label: 'Form 表单'
                                }
                            ]
                        },
                        {
                            value: 'data',
                            label: 'Data',
                            children: [
                                {
                                    value: 'table',
                                    label: 'Table 表格'
                                },
                                {
                                    value: 'tag',
                                    label: 'Tag 标签'
                                },
                                {
                                    value: 'progress',
                                    label: 'Progress 进度条'
                                },
                                {
                                    value: 'tree',
                                    label: 'Tree 树形控件'
                                },
                                {
                                    value: 'pagination',
                                    label: 'Pagination 分页'
                                },
                                {
                                    value: 'badge',
                                    label: 'Badge 标记'
                                }
                            ]
                        },
                        {
                            value: 'notice',
                            label: 'Notice',
                            children: [
                                {
                                    value: 'alert',
                                    label: 'Alert 警告'
                                },
                                {
                                    value: 'loading',
                                    label: 'Loading 加载'
                                },
                                {
                                    value: 'message',
                                    label: 'Message 消息提示'
                                },
                                {
                                    value: 'message-box',
                                    label: 'MessageBox 弹框'
                                },
                                {
                                    value: 'notification',
                                    label: 'Notification 通知'
                                }
                            ]
                        },
                        {
                            value: 'navigation',
                            label: 'Navigation',
                            children: [
                                {
                                    value: 'menu',
                                    label: 'NavMenu 导航菜单'
                                },
                                {
                                    value: 'tabs',
                                    label: 'Tabs 标签页'
                                },
                                {
                                    value: 'breadcrumb',
                                    label: 'Breadcrumb 面包屑'
                                },
                                {
                                    value: 'dropdown',
                                    label: 'Dropdown 下拉菜单'
                                },
                                {
                                    value: 'steps',
                                    label: 'Steps 步骤条'
                                }
                            ]
                        },
                        {
                            value: 'others',
                            label: 'Others',
                            children: [
                                {
                                    value: 'dialog',
                                    label: 'Dialog 对话框'
                                },
                                {
                                    value: 'tooltip',
                                    label: 'Tooltip 文字提示'
                                },
                                {
                                    value: 'popover',
                                    label: 'Popover 弹出框'
                                },
                                {
                                    value: 'card',
                                    label: 'Card 卡片'
                                },
                                {
                                    value: 'carousel',
                                    label: 'Carousel 走马灯'
                                },
                                {
                                    value: 'collapse',
                                    label: 'Collapse 折叠面板'
                                }
                            ]
                        }
                    ]
                },
                {
                    value: 'ziyuan',
                    label: '资源',
                    children: [
                        {
                            value: 'axure',
                            label: 'Axure Components'
                        },
                        {
                            value: 'sketch',
                            label: 'Sketch Templates'
                        },
                        {
                            value: 'jiaohu',
                            label: '组件交互文档'
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        expendList() {
            return CarCollector.filter((el) => el.expand);
        },
        tableColList() {
            return CarCollector.filter((el) => el.expand === undefined);
        },
        editColList() {
            return CarCollector.filter((el) => el.edit);
        }
    },
    methods: {
        // 删除操作
        handleDelete(row) {
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then((falg) => {
                    falg === 'confirm' &&
                        deletePlan(row.collectId).then(() => {
                            this.$message.success('删除成功');
                            this.$refs.collectTable.queryTableData();
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        closeDialog() {
            this.editVisible = false;
            this.isAdd = true;
            this.form = {};
        },
        add() {
            this.editVisible = true;
        },
        // 编辑操作
        handleEdit(row) {
            this.isAdd = false;
            this.form = row;
            this.editVisible = true;
        },
        check(row) {
            this.checkContentData = row;
            this.checkDialog = true;
        },
        closeCheckDialog() {
            this.checkContentData = null;
            this.checkDialog = false;
        },
        // 保存编辑
        saveEdit() {
            this.$refs.form.validate((flag) => {
                if (flag) {
                    if (this.isAdd) {
                        addcollect(this.form).then(() => {
                            this.closeDialog();
                            this.$message.success(`添加成功`);
                            this.$refs.collectTable.queryTableData();
                        });
                    } else {
                        editcollect(this.form.collectId, this.form).then((res) => {
                            this.closeDialog();
                            this.$message.success(`修改成功`);
                            this.$refs.collectTable.queryTableData();
                        });
                    }
                }
            });
        }
    }
};
</script>

<style lang="less">
header {
    background-color: #f1f1f1;
}
</style>
