<template>
    <div>
        <e-table
            ref="collectTable"
            :dataOrigin="dataOrigin"
            :tableCols="tableColList"
            :showOperation="true"
        >
            <template #operationArea>
                <el-button type="primary" @click="add">新增</el-button>
            </template>
            <template #expand="scope">
                <el-form label-position="left" class="demo-table-expand">
                    <el-form-item :label="item.label" v-for="item in expendList" :key="item.prop">
                        <span>{{ scope.rowData[item.prop] }}</span>
                    </el-form-item>
                </el-form>
            </template>
            <template #operation="scope">
                <router-link :to="{name:'VioSee',params:{data:scope.rowData}}">
                    <el-button
                        type="text"
                        icon="el-icon-document"
                        class="red"
                    >查看</el-button>
                </router-link>
                <el-button
                    type="text"
                    icon="el-icon-delete"
                    class="red"
                    @click="handleDelete(scope.rowData)"
                >删除</el-button>
            </template>
        </e-table>
    </div>
</template>

<script>
import { ExamineTableURL, editExamine, addExamine, deleteExamine, checkExamine } from '@/api/violationExamine';
import ETable from '@/components/common/ETable';
import { violationExamineTableCols } from '@/data/staicData';
export default {
    components: {
        ETable
    },

    data() {
        return {
            tableData: [],
            checkContentData: null,
            form: {},
            dataOrigin: {
                url: ExamineTableURL
            },
            isAdd: true,
            optionsList: {}
        };
    },
    computed: {
        expendList() {
            return violationExamineTableCols.filter((el) => el.expand);
        },
        tableColList() {
            return violationExamineTableCols.filter((el) => el.expand === undefined);
        },
        editColList() {
            return violationExamineTableCols.filter((el) => el.edit);
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
                        deleteExamine(row.violationExamineId).then(() => {
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
            this.$router.push('/addone');
        },
        // 保存编辑
        saveEdit() {
            if (this.isAdd) {
                addExamine(this.form).then(() => {
                    this.closeDialog();
                    this.$message.success(`添加成功`);
                    this.$refs.collectTable.queryTableData();
                });
            }
        }
    }
};
</script>

<style>
</style>

