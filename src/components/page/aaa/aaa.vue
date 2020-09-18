<template>
    <div>111111</div>
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

