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
                <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.rowData)">编辑</el-button>
                <el-button
                    type="text"
                    icon="el-icon-delete"
                    class="red"
                    @click="handleDelete(scope.rowData)"
                >删除</el-button>
            </template>
        </e-table>
        <!-- 编辑框 -->
        <el-dialog title="添加" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="auto">
                <el-form-item
                    prop="dictApi"
                    label="状态归属"
                    :rules="[
					{ required: true, message: '请输入状态归属', trigger: 'blur' },
				]"
                >
                    <el-input v-model="form.dictApi"></el-input>
                </el-form-item>
                <el-form-item
                    prop="dictLabel"
                    label="状态名称"
                    :rules="[
					{ required: true, message: '请输入状态名称', trigger: 'blur' },
				]"
                >
                    <el-input v-model="form.dictLabel"></el-input>
                </el-form-item>
                <el-form-item
                    prop="dictValue"
                    label="状态值"
                    :rules="[
					{ required: true, message: '请输入状态值', trigger: 'blur' },
				]"
                >
                    <el-input v-model="form.dictValue"></el-input>
                </el-form-item>
                <el-form-item prop="remark" label="备注">
                    <el-input v-model="form.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- <el-dialog :title="isAdd ? '新增' : '编辑'" :visible.sync="editVisible" width="30%">
			<el-form ref="form" :model="form" label-width="auto">
				<el-form-item :prop="item.prop" :label="item.label" v-for="item in editColList" :key="item.prop">
					<el-input v-if="item.type === 'input'" v-model="form[item.prop]"></el-input>
					<el-select v-if="item.type === 'select'" v-model="form[item.prop]">
						<el-option v-for="o in (item.options || optionsList[item.prop])" :key="o.value" :label="o.label" :value="o.value"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveEdit">确 定</el-button>
			</span>
        </el-dialog>-->
    </div>
</template>

<script>
import { dictListURL, addDict, delDict, editDict, findDict } from '@/api/date';
import ETable from '@/components/common/ETable';
import { dataDictionarys } from '@/data/staicData';
export default {
    components: {
        ETable
    },

    data() {
        return {
            tableData: [],
            editVisible: false,
            form: {},
            dataOrigin: {
                url: dictListURL
            },
            isAdd: true,
            optionsList: {}
        };
    },
    computed: {
        expendList() {
            return dataDictionarys.filter((el) => el.expand);
        },
        tableColList() {
            return dataDictionarys.filter((el) => el.expand === undefined);
        },
        editColList() {
            return dataDictionarys.filter((el) => el.edit);
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
                        delDict(row.id).then(() => {
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
        // 保存编辑
        saveEdit() {
            this.$refs.form.validate((flag) => {
                if (flag) {
                    if (this.isAdd) {
                        addDict(this.form).then(() => {
                            this.closeDialog();
                            this.$message.success(`添加成功`);
                            this.$refs.collectTable.queryTableData();
                        });
                    } else {
                        editDict(this.form.id, this.form).then((res) => {
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

<style>
</style>

