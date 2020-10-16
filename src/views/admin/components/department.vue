<template>
    <div>
		<e-table ref="depTable" :dataOrigin="dataOrigin" :tableCols="tableColList" :showOperation="true" :expand="true" new-search>
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
			<template #hospitalId="scope">
				{{scope.rowData.hospitalName}}
			</template>
			<template #operation="scope">
				<el-button
					type="text"
					icon="el-icon-edit"
					@click="handleEdit(scope.rowData)"
				>编辑</el-button>
				<el-button
					type="text"
					icon="el-icon-delete"
					class="red"
					@click="handleDelete(scope.rowData)"
				>删除</el-button>
			</template>
		</e-table>
		<el-dialog :title="isAdd ? '新增' : '编辑'" :visible.sync="editVisible" width="30%">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item prop="hospitalId" label="所属医院" :rules="[
					{ required: true, message: '请选择所属医院', trigger: 'blur' },
				]">
                    <el-select  v-model="form.hospitalId" clearable>
						<el-option v-for="o in optionsList.hospitalId" :key="o.value" :label="o.label" :value="o.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="departmentName" label="部门名称"
				:rules="[
					{ required: true, message: '请输入部门名称', trigger: 'blur' },
				]">
					<el-input v-model="form.departmentName"></el-input>
				</el-form-item>
				<el-form-item prop="number" label="部门编号"
				:rules="[
					{ required: true, message: '请输入部门编号', trigger: 'blur' },
				]">
					<el-input v-model="form.number" type="number"  placeholder="请输入数字"  @keyup.native="proving($event)" min="1"></el-input>
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
import { departmentTableURL, editDepartment, addDepartment, deleteDepartment, allHospital } from '@/api/admin';
import ETable from '@/components/common/ETable';
import {departmentTableCols} from '@/data/staicData';
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
				url: departmentTableURL
			},
			isAdd: true,
			optionsList: {}
        };
    },
	computed: {
		expendList() {
			return departmentTableCols.filter(el => el.expand);
		},
		tableColList() {
			return departmentTableCols.filter(el => el.expand === undefined);
		},
		editColList() {
			return departmentTableCols.filter(el => el.edit);
		}
	},
	mounted() {
		this.allHospital();
	},
    methods: {
		allHospital() {
			allHospital().then(res => {
				this.optionsList['hospitalId'] = res.queryResult.list.map(el => ({label: el.hospitalName, value: el.hospitalId}));
			})
		},
		//部门编号input操作
		proving(e) {
            let boolean = new RegExp('^[1-9][0-9]*$').test(e.target.value);
            if (!boolean) {
                this.$message.warning('请输入数字');
                e.target.value = ' ';
            }
        },
        // 删除操作
        handleDelete(row) {
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(falg => {
				falg === 'confirm' && deleteDepartment(row.departmentId).then(() => {
					this.$message.success('删除成功');
					this.$refs.depTable.queryTableData();
				})
			}).catch((err)=>{
                console.log(err);
            })
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
				if(flag) {
					if(this.isAdd) {
						addDepartment(this.form).then(() => {
							this.closeDialog();
							this.$message.success(`添加成功`);
							this.$refs.depTable.queryTableData();
						})
				} else {
						editDepartment(this.form.departmentId, this.form).then(res => {
							this.closeDialog();
							this.$message.success(`修改成功`);
							this.$refs.depTable.queryTableData();
						})
					}
				}	
			})
        },
    }
};
</script>
