<template>
    <div>
		<e-table ref="collectTable" :dataOrigin="dataOrigin" :tableCols="tableColList" :showOperation="true" >
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
			<template #operation="scope">
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
			<el-form ref="form" :model="form" label-width="70px" >
				<el-form-item prop="headline" label="标题"
				:rules="[
					{ required: true, message: '请输入标题', trigger: 'blur' },
				]">
					<el-input v-model="form.headline"></el-input>
				</el-form-item>
				<el-form-item prop="writeTime" label="发布时间">
					<el-date-picker
						v-model="form.writeTime"
						type="datetime"
						placeholder="选择日期时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item prop="writer" label="撰稿人"
				:rules="[
				{ required: true, message: '请输入撰稿人', trigger: 'blur' },
				]">
					<el-input v-model="form.writer"></el-input>
				</el-form-item>
				<el-form-item prop="issuer" label="发布人">
					<el-input v-model="form.issuer"></el-input>
				</el-form-item>
				<el-form-item prop="unit" label="发布机构">
					<el-input v-model="form.unit"></el-input>
				</el-form-item>
				<el-form-item prop="content" label="内容"
				:rules="[
					{ required: true, message: '请输入内容', trigger: 'blur' },
				]">
					<el-input type="textarea" :rows="5" v-model="form.content"></el-input>
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
import { ExamineTableURL, editExamine, addExamine, deleteExamine } from '@/api/violationExamine';
import ETable from '@/components/common/ETable';
import {violationExamineTableCols} from '@/data/staicData';
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
				url: ExamineTableURL
			},
			isAdd: true,
			optionsList: {}
        };
    },
	computed: {
		expendList() {
			return violationExamineTableCols.filter(el => el.expand);
		},
		tableColList() {
			return violationExamineTableCols.filter(el => el.expand === undefined);
		},
		editColList() {
			return violationExamineTableCols.filter(el => el.edit);
		},
		
	},
    methods: {
        // 删除操作
        handleDelete(row) {
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(falg => {
				falg === 'confirm' && deleteExamine(row.violationExamineId).then(() => {
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
        // 保存编辑
        saveEdit() {
			if(this.isAdd) {
				addExamine(this.form).then(() => {
					this.closeDialog();
					this.$message.success(`添加成功`);
					this.$refs.collectTable.queryTableData();
				})
			}
        },
    }
};
</script>

<style>
.el-upload--text {
	width: auto;
	height: auto;
}
</style>

