<template>
    <div>
		<e-table ref="collectTable" :dataOrigin="dataOrigin" :tableCols="tableColList" :showOperation="true" new-search>
			<template #expand="scope">
				<el-form label-position="left"  class="demo-table-expand">
					<el-form-item :label="item.label" v-for="item in expendList" :key="item.prop">
						<span>{{ scope.rowData[item.prop] }}</span>
					</el-form-item>
				</el-form>
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
		<!-- 编辑框 -->
		<el-dialog :title="isAdd ? '新增' : '编辑'" :visible.sync="editVisible" width="30%">
			<el-form ref="form" :model="form" label-width="auto" >
				<el-form-item prop="replenishTime" label="补录时间">
					<el-date-picker 
						v-model="form.replenishTime" 
						type="datetime" 
						placeholder="选择日期时间"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item prop="collectTime" label="收集时间">
					<el-date-picker 
						v-model="form.collectTime" 
						type="datetime" 
						placeholder="选择日期时间"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item prop="officeId" label="科室名称"
				:rules="[
					{ required: true, message: '请输入科室名称', trigger: 'blur' },
				]">
					<el-input v-model="form.officeId"></el-input>
				</el-form-item>
				<el-form-item prop="nurseId" label="护士名称"
				:rules="[
				{ required: true, message: '请输入护士名称', trigger: 'blur' },
				]">
					<el-input v-model="form.nurseId"></el-input>
				</el-form-item>
				<el-form-item prop="replenishWeight" label="医废重量">
					<el-input v-model="form.replenishWeight"></el-input>
				</el-form-item>
				<el-form-item prop="replenishNumber" label="医废数量">
					<el-input v-model="form.replenishNumber"></el-input>
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
import { replenishTableURL, editreplenish, addreplenish, deletereplenish, } from '@/api/information';
import ETable from '@/components/common/ETable';
import {replenishTableCols} from '@/data/staicData';
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
            tableData: [],
			editVisible: false,
			checkDialog: false,
			checkContentData: null,
            form: {},
			dataOrigin: {
				url: replenishTableURL,
				
			},
			isAdd: true,
			optionsList: {},
			
        };
    },
	computed: {
		expendList() {
			return replenishTableCols.filter(el => el.expand);
		},
		tableColList() {
			return replenishTableCols.filter(el => el.expand === undefined);
		},
		editColList() {
			return replenishTableCols.filter(el => el.edit);
		},
		
	},
    methods: {
        // 删除操作
        handleDelete(row) {
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(falg => {
				falg === 'confirm' && deletereplenish(row.replenishId).then(() => {
					this.$message.success('删除成功');
					this.$refs.collectTable.queryTableData();
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
		//查看按钮
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
			this.$refs.form.validate(flag => {
				if(flag) {
					if(this.isAdd) {
						addreplenish(this.form).then(() => {
							this.closeDialog();
							this.$message.success(`添加成功`);
							this.$refs.collectTable.queryTableData();
						})
					} else {
						editreplenish(this.form.noticeWriteId, this.form).then(res => {
							this.closeDialog();
							this.$message.success(`修改成功`);
							this.$refs.collectTable.queryTableData();
						})
					}
				}
			})
        },
    }
};
</script>

<style lang="less" scoped>
</style> 
