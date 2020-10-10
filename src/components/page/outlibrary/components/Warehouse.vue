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
			<template #outDetail="scope" >
				<el-button
					type="text"
					icon="el-icon-view"
					class="red"
					@click="check(scope.rowData)"
				>查看</el-button>
			</template>
			<template #operation="scope">
				<el-button
					type="text"
					icon="el-icon-truck"
					@click="handleEdit(scope.rowData)"
				>出库</el-button>
				<el-button
					type="text"
					icon="el-icon-delete"
					class="red"
					@click="handleDelete(scope.rowData)"
				>删除</el-button>
			</template>
		</e-table>
		<!-- 编辑框 -->
		<el-dialog title="出库" :visible.sync="editVisible" width="30%">
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
		</el-dialog>
		<el-dialog
			:visible.sync="checkDialog"
			width="20%"
			center>
			<div v-if="checkContentData !== null">
				<span style="font-size: 12px;color:#ccc000;">可出库详情:</span>
				<div>
					{{checkContentData.outDetail}}
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { trashOutTableURL, edittrashOut, addtrashOut, deletetrashOut } from '@/api/operation';
import ETable from '@/components/common/ETable';
import {trashOutTableCols} from '@/data/staicData';
export default {
	components: {
		ETable
	},
	
    data() {
        return {
            tableData: [],
			editVisible: false,
			checkDialog: false,
			checkContentData: null,
            form: {},
			dataOrigin: {
				url: trashOutTableURL
			},
			isAdd: true,
			optionsList: {}
        };
    },
	computed: {
		expendList() {
			return trashOutTableCols.filter(el => el.expand);
		},
		tableColList() {
			return trashOutTableCols.filter(el => el.expand === undefined);
		},
		editColList() {
			return trashOutTableCols.filter(el => el.edit);
		},
		
	},
    methods: {
        // 删除操作
        handleDelete(row) {
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(falg => {
				falg === 'confirm' && deletetrashOut(row.trashOutId).then(() => {
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
			if(this.isAdd) {
				addtrashOut(this.form).then(() => {
					this.closeDialog();
					this.$message.success(`添加成功`);
					this.$refs.collectTable.queryTableData();
				})
			}
			else {
				edittrashOut(this.form.trashOutId, this.form).then(res => {
					this.closeDialog();
					this.$message.success(`修改成功`);
					this.$refs.collectTable.queryTableData();
				})
			}
			
        },
    }
};
</script>

<style lang="less" scoped>
	
	.el-dialog__body{
		margin: 5px 25px 30px!important;
	}
	 
</style> 
