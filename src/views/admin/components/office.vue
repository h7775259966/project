<template>
    <div>
		<e-table ref="officeTable" :dataOrigin="dataOrigin" :tableCols="tableColList" :showOperation="true" :expand="true" new-search>
			<template #operationArea>
				<el-button type="primary" @click="add">新增</el-button>
			</template>
			<template #expand="scope">
				<el-form label-position="left"  class="demo-table-expand">
					<el-form-item :label="item.label" v-for="item in expendList" :key="item.prop">
						<span>{{ scope.rowData[item.prop] }}</span>
					</el-form-item>
				</el-form>
			</template>
			<template #departmentId="scope">
				{{scope.rowData.departmentName}}
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
			<el-form ref="form" :model="form" label-width="auto">	
				<el-form-item :prop="item.prop" :label="item.label" v-for="item in editColList" :key="item.prop">
					<el-input v-if="item.type === 'input'" v-model="form[item.prop]"></el-input>
					<el-select v-if="item.type === 'select'" v-model="form[item.prop]">
						<el-option v-for="o in (item.options || optionsList[item.prop])" :key="o.prop" :label="o.label" :value="o.value"></el-option>
					</el-select>
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
import { officeTableURL, editOffice, addOffice, deleteOffice, allDepartment } from '@/api/admin';
import ETable from '@/components/common/ETable';
import {officeTableCols} from '@/data/staicData';
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
				url: officeTableURL
			},
			isAdd: true,
			optionsList: {}
        };
    },
	computed: {
		expendList() {
			return officeTableCols.filter(el => el.expand);
		},
		tableColList() {
			return officeTableCols.filter(el => el.expand === undefined);
		},
		editColList() {
			return officeTableCols.filter(el => el.edit);
		}
	},
	mounted() {
		this.allDepartment();
	},
    methods: {
		allDepartment() {
			allDepartment().then(res => {
				this.optionsList['departmentId'] = res.queryResult.list.map(el => ({label: el.departmentName, value: el.departmentId}));
			})
		},
        // 删除操作
        handleDelete(row) {
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(falg => {
				falg === 'confirm' && deleteOffice(row.officeId).then(() => {
					this.$message.success('删除成功');
					this.$refs.officeTable.queryTableData();
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
			if(this.isAdd) {
					addOffice(this.form).then(() => {
						this.closeDialog();
						this.$message.success(`添加成功`);
						this.$refs.officeTable.queryTableData();
					})
				} else {
					editOffice(this.form.officeId, this.form).then(res => {
						this.closeDialog();
						this.$message.success(`修改成功`);
						this.$refs.officeTable.queryTableData();
					})
				}
				
			// this.$refs.form.validate(flag => {
				
			// })
        },
    }
};
</script>
