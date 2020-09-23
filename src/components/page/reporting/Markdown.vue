<template>
    <div>
        <e-table
            ref="planTable"
            :dataOrigin="dataOrigin"
            :tableCols="tableColList"
            :customSearchList="customSearchList"
            :showOperation="true"
        >
            <template #operationArea v-if="kind === 'edit'">
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
                <el-button v-if="kind === 'edit'" type="text" @click="handleEdit(scope.rowData)">详情</el-button>
            </template>
        </e-table>
        <!-- 编辑框 -->
        <el-dialog :title="isAdd ? '新增' : '编辑'" :visible.sync="editVisible" width="32%">
            <el-form ref="form" :model="form" label-width="auto">
                <el-form-item
                    prop="planeName"
                    label="医院名称"
                    :rules="[
					{ required: true, message: '请输入计划名称', trigger: 'blur' },
				]"
                >
                    <el-input v-model="form.planeName"></el-input>
                </el-form-item>
                <el-form-item prop="writeTime" label="医院负责人">
                    <el-date-picker v-model="form.writeTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
                <el-form-item prop="content" label="医废第一负责人">
                    <el-input v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item prop="hospitalld" label="医院床位">
                    <el-input v-model="form.hospitalld"></el-input>
                </el-form-item>
                <el-form-item prop="hospitalld" label="科室数量">
                    <el-input v-model="form.hospitalld"></el-input>
                </el-form-item>
                <el-form-item prop="hospitalld" label="平均医废量/日">
                    <el-input v-model="form.hospitalld"></el-input>
                </el-form-item>
                                <el-form-item prop="hospitalld" label="医院性质">
                    <el-input v-model="form.hospitalld"></el-input>
                </el-form-item>
                <el-form-item prop="hospitalld" label="医废处置方式">
                    <el-input v-model="form.hospitalld"></el-input>
                </el-form-item>
                                <el-form-item prop="hospitalld" label="医院等级">
                    <el-input v-model="form.hospitalld"></el-input>
                </el-form-item>

                <el-form-item
                    prop="remark"
                    label="医院说明"
                    :rules="[
					{ required: true,  trigger: 'blur' },
				]"
                >
                    <el-input type="textarea" :rows="5" v-model="form.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">           
                <el-button type="primary" @click="saveEdit">返  回</el-button>
            </span>
        </el-dialog>
        <el-dialog
            :title="checkContentData === null ? '' : checkContentData.headline"
            :visible.sync="checkDialog"
            width="70%"
            center
        >
            <div v-if="checkContentData !== null">
                <div
                    style="text-align:center; color: #258AFF;"
                >{{moment(checkContentData.writeTime).format('YYYY-MM-DD HH:mm:ss')}} 撰稿人：{{checkContentData.writer}} 发布单位：{{checkContentData.unit}}</div>
                <div style="padding-top: 30px; min-height: 200px;">{{checkContentData.content}}</div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import moment from 'moment';
import { fillPlan, addPlan, delPlan, editPlan, getPlan } from '@/api/plan';
import ETable from '@/components/common/ETable';
import { OrganizationInformation } from '@/data/staicData';
import Timecom from '../../Base/time';
export default {
    components: {
        ETable,
        Timecom
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
            checkDialog: false,
            checkContentData: null,
            tableData: [],
            editVisible: false,
            form: {},
            dataOrigin: {
                url: fillPlan
            },
            isAdd: true,
            customSearchList: [
                {
                    label: '医院等级',
                    type: 'select',
                    prop: 'status',
                    options: [
                        {
                            label: '其他',
                            value: '0'
                        },
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
                }
            ],
            customTime: []
        };
    },
    computed: {
        expendList() {
            return OrganizationInformation.filter((el) => el.expand);
        },
        tableColList() {
            return OrganizationInformation.filter((el) => el.expand === undefined);
        },
        editColList() {
            return OrganizationInformation.filter((el) => el.edit);
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
                        delPlan(row.planId).then(() => {
                            this.$message.success('删除成功');
                            this.$refs.planTable.queryTableData();
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
            if (this.isAdd) {
                addPlan(this.form).then(() => {
                    this.closeDialog();
                    this.$message.success(`添加成功`);
                    this.$refs.planTable.queryTableData();
                });
            } else {
                editPlan(this.form.planId, this.form).then((res) => {
                    this.closeDialog();
                    this.$message.success(`修改成功`);
                    this.$refs.planTable.queryTableData();
                });
            }
        }
    }
};
</script>
