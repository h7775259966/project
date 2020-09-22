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
                <el-form label-position="left" class="demo-table-expand" >
                    <el-form-item :label="item.label" v-for="item in expendList" :key="item.prop">
                        <span>{{ scope.rowData[item.prop] }}</span>
                    </el-form-item>
                </el-form>
            </template>
            <!-- <template> -->
                <!--  #status="scope" -->
                <!-- <el-input v-model="form.status"></el-input> -->
            <!-- </template> -->
            <template #operation="scope">
                <el-button
                    v-if="kind === 'edit'"
                    type="text"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.rowData)"
                >编辑</el-button>
                <el-button
                    v-if="kind === 'edit'"
                    type="text"
                    icon="el-icon-delete"
                    class="red"
                    @click="handleDelete(scope.rowData)"
                >删除</el-button>
                <el-button
                    type="text"
                    icon="el-icon-document"
                    class="red"
                    @click="check(scope.rowData)"
                >下发</el-button>
            </template>
        </e-table>
        <!-- 编辑框 -->
        <el-dialog :title="isAdd ? '新增' : '编辑'" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item
                    prop="planName"
                    label="计划名称"
                    :rules="[
					{ required: true, message: '请输入计划名称', trigger: 'blur' },
				]"
                >
                    <el-input v-model="form.planeName"></el-input>
                </el-form-item>
                <el-form-item prop="writeTime" label="发布时间">
                    <el-date-picker v-model="form.writeTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
                <el-form-item prop="content" label="上报内容">
                    <el-input v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item prop="hospitalId" label="上报医院">
                    <el-input v-model="form.hospitalld"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="status" label="状态">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in customSearchList.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item> -->
                <!-- <el-form-item prop="status" label="状态">
					<el-input v-model="form.status"></el-input>
                </el-form-item>-->
                <el-form-item
                    prop="remark"
                    label="备注"
                    :rules="[
					{ required: true,  trigger: 'blur' },
				]"
                >
                    <el-input type="textarea" :rows="5" v-model="form.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
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
import { planTableCols } from '@/data/staicData';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
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
                    label: '处理状态',
                    type: 'select',
                    prop: 'status',
                    options: [
                        {
                            label: '未下发',
                            value: '0'
                        },
                        {
                            label: '已下发',
                            value: '1'
                        },
                        {
                            label: '未完成',
                            value: '2'
                        },
                        {
                            label: '已完成',
                            value: '3'
                        },
                        {
                            label: '已同意',
                            value: '4'
                        },
                        {
                            label: '已关闭',
                            value: '5'
                        }
                    ]
                }
            ],
            customTime: []
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
            console.log(row)
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
                    console.log(this.form.planId,this.form)
                    this.closeDialog();
                    this.$message.success(`修改成功`);
                    console.log(this.$refs.planTable)
                    debugger
                    this.$refs.planTable.queryTableData();
                });
            }
        }
    }
};
</script>
