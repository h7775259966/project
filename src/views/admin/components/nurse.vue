<template>
    <div>
        <e-table ref="nurseTable" :dataOrigin="dataOrigin" :tableCols="tableColList" :showOperation="true" :expand="true" new-search>
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
                <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.rowData)">删除</el-button>
            </template>
        </e-table>
        <!-- 编辑框 -->
        <!-- <el-dialog :title="isAdd ? '新增' : '编辑'" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="auto">
                <template v-for="item in editColList">
                    <el-form-item :prop="item.prop" v-if="item.prop !== 'officeName'" :label="item.label" :key="item.prop">
                        <el-input v-if="item.type === 'input'" v-model="form[item.prop]"></el-input>
                        <el-cascader
                            ref="office"
                            @change="getOffice"
                            v-else-if="item.type === 'cascader' && item.prop === 'departmentName'"
                            :props="props"
                        ></el-cascader>
                    </el-form-item>
                </template>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog> -->
        <el-dialog :title="isAdd ? '新增' : '编辑'" :visible.sync="editVisible" width="30%">
			<el-form ref="form" :model="form" label-width="auto" >
				<el-form-item prop="nurseName" label="护士姓名"
				:rules="[
					{ required: true, message: '请输入护士姓名', trigger: 'blur' },
				]">
					<el-input v-model="form.nurseName"></el-input>
				</el-form-item>
				<el-form-item prop="nurseCode" label="护士条形码"
				:rules="[
					{ required: true, message: '请输入护士条形码', trigger: 'blur' },
				]">
					<el-input v-model="form.nurseCode"></el-input>
				</el-form-item>
                <el-form-item  label="所属部门科室">
                    <el-cascader
                        ref="office"
                        @change="getOffice"
                        :props="props"
                    ></el-cascader>
                </el-form-item>
				<el-form-item prop="remarks" label="备注">
					<el-input v-model="form.remarks"></el-input>
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
import { nurseTableURL, editNurse, addNurse, deleteNurse, allDepartment, allOffice, getOfficeById } from '@/api/admin';
import ETable from '@/components/common/ETable';
import { nurseTableCols } from '@/data/staicData';
let id = 0;
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
                url: nurseTableURL
            },
            offices: [],
            isAdd: true,
            optionsList: {},
            props: {
                lazy: true,
                lazyLoad: (node, resolve) => {
                    const { level, value } = node;
                    let nodes = [];
                    if (level === 0) {
                        nodes = this.optionsList['departmentName'].map((item) => {
                            return {
                                label: item.label,
                                value: item.value,
                                leaf: false
                            };
                        });
                        resolve(nodes);
                    }
                    if (level === 1) {
                        getOfficeById(value).then((res) => {
                            this.offices = res.queryResult.list;
                            nodes = res.queryResult.list.map((item) => {
                                return {
                                    label: item.officeName,
                                    value: item.officeId,
                                    departmentId: item.departmentId,
                                    departmentName: item.departmentName,
                                    leaf: true
                                };
                            });
                            resolve(nodes);
                        });
                    }
                }
            }
        };
    },
    computed: {
        expendList() {
            return nurseTableCols.filter((el) => el.expand);
        },
        tableColList() {
            return nurseTableCols.filter((el) => el.expand === undefined);
        },
        editColList() {
            return nurseTableCols.filter((el) => el.edit);
        }
    },
    mounted() {
        this.allDepartment();
        this.allOffice();
        // console.log( this.optionsList)
    },
    methods: {
        getOffice(v) {
            const ite = this.offices.filter((item) => v[1] === item.officeId);
            const { remarks, ...rest } = ite[0];
            Object.assign(this.form, rest);
        },
        allDepartment() {
            allDepartment().then((res) => {
                this.optionsList['departmentName'] = res.queryResult.list.map((el) => ({
                    label: el.departmentName,
                    value: el.departmentId
                }));
            });
        },
        allOffice() {
            allOffice().then((res) => {
                this.optionsList['officeName'] = res.queryResult.list.map((el) => ({ label: el.officeName, value: el.officeId }));
            });
        },
        // 删除操作
        handleDelete(row) {
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then((falg) => {
                    falg === 'confirm' &&
                        deleteNurse(row.nurseId).then(() => {
                            this.$message.success('删除成功');
                            this.$refs.nurseTable.queryTableData();
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
            this.$refs.form.validate(flag => {
                if (flag) {
                    if (this.isAdd) {
                        addNurse(this.form).then(() => {
                            this.closeDialog();
                            this.$message.success(`添加成功`);
                            this.$refs.nurseTable.queryTableData();
                        });
                    } else {
                        editNurse(this.form.nurseId, this.form).then((res) => {
                            this.closeDialog();
                            this.$message.success(`修改成功`);
                            this.$refs.nurseTable.queryTableData();
                        });
                    }
                }
            })
            
        }
    }
};
</script>
