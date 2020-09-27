<template>
    <div>
        <e-table
            ref="collectTable"
            :dataOrigin="dataOrigin"
            :tableCols="tableColList"
            :showOperation="true"
            new-search
        >
            <template #operationArea>
                <el-button type="primary" @click="add">添加</el-button>
            </template>
            <template #expand="scope">
                <el-form label-position="left" class="demo-table-expand">
                    <el-form-item :label="item.label" v-for="item in expendList" :key="item.prop">
                        <span>{{ scope.rowData[item.prop] }}</span>
                    </el-form-item>
                </el-form>
            </template>

            <template #operation="scope">
                <el-button  type="text" icon="el-icon-edit" @click="handleEdit(scope.rowData)">编辑</el-button>
                <el-button  type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.rowData)">删除</el-button>
            </template>
        </e-table>
        <!-- 编辑框 -->
        <el-dialog :title="isAdd ? '新增' : '编辑'" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="auto">
                <el-form-item prop="planName" label="计划名称" :rules="[{ required: true, message: '请输入计划名称', trigger: 'blur' }]">
                    <el-input v-model="form.planName"></el-input>
                </el-form-item>
                <el-form-item prop="writeTime" label="发布时间" :rules="[{ required: true, message: '请输入发布时间', trigger: 'blur' }]">
                    <el-date-picker v-model="form.writeTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
                <el-form-item prop="content" label="上报内容"> 
                    <el-input v-model="form.content"></el-input>          
                </el-form-item>
               
                <el-form-item prop="remark" label="备注">
                    <el-input type="textarea" :rows="5" v-model="form.remark"></el-input>     
                </el-form-item>
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
import { PlanTableURL, addPlan, deletePlan, editPlan } from '@/api/plan';
import ETable from '@/components/common/ETable';
import { planTableCols } from '@/data/staicData';

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
                url: PlanTableURL,
            },
            isAdd: true,
            customSearchList: [
                {
                    
                }
            ]
        };
    },
    computed: {
        expendList() {
            return planTableCols.filter((el) => el.expand);
        },
        tableColList() {
            return planTableCols.filter((el) => el.expand === undefined);
        },
        editColList() {
            return planTableCols.filter((el) => el.edit);
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
                        deletePlan(row.planId).then(() => {
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
                        addPlan(this.form).then(() => {
                            this.closeDialog();
                            this.$message.success(`添加成功`);
                            this.$refs.collectTable.queryTableData();
                        });
                    } else {
                        editPlan(this.form.planId, this.form).then((res) => {
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
