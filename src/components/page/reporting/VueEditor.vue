<template>
    <div>	
        <span>信息上报</span>
		<e-table ref="collectTable" :dataOrigin="dataOrigin" :tableCols="tableColList"  :showOperation="true">
			<template #expand="scope">
				<el-form label-position="left"  class="demo-table-expand">
					<el-form-item :label="item.label" v-for="item in expendList" :key="item.prop">
						<span>{{ scope.rowData[item.prop] }}</span>
					</el-form-item>
				</el-form>
			</template>
			<!-- <template #operation="scope">
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
				>查看</el-button>
			</template> -->
		</e-table>
		<!-- 编辑框 -->
		<!-- <el-dialog title="添加" :visible.sync="editVisible" width="30%">
			<el-form ref="form" :model="form" label-width="70px">
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
		</el-dialog> -->
		<!-- <el-dialog
			:title="checkContentData === null ? '' : checkContentData.headline"
			:visible.sync="checkDialog"
			width="70%"
			center>
			<div v-if="checkContentData !== null">
				<div style="text-align:center; color: #258AFF;">{{moment(checkContentData.writeTime).format('YYYY-MM-DD HH:mm:ss')}} 撰稿人：{{checkContentData.writer}} 发布单位：{{checkContentData.unit}}</div>
				<div style="padding-top: 30px; min-height: 200px;">{{checkContentData.content}}</div>
			</div>
		</el-dialog> -->
	</div>
</template>

<script>
import moment from 'moment';
import { addNoticeTableURL, addNotice, deleteNotice, editNotice} from '@/api/notice';
import ETable from '@/components/common/NosearchTable';
import {InformationReporting} from '@/data/staicData';
export default {
	components: {
        ETable,
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
            // editVisible: false,
            form: {},
			dataOrigin: {
				url: addNoticeTableURL
			},
			isAdd: true,
			customTime:[
				
			]
			
        };
    },
	computed: {
		expendList() {
			return InformationReporting.filter(el => el.expand);
		},
		tableColList() {
			return InformationReporting.filter(el => el.expand === undefined);
		},
		editColList() {
			return InformationReporting.filter(el => el.edit);
		}
	},
    methods: {
        // 删除操作
        // handleDelete(row) {
        //     this.$confirm('确定要删除吗？', '提示', {
        //         type: 'warning'
        //     }).then(falg => {
		// 		falg === 'confirm' && deleteNotice(row.noticeWriteId).then(() => {
		// 			this.$message.success('删除成功');
		// 			this.$refs.collectTable.queryTableData();
		// 		})
		// 	}).catch((err)=>{
        //         console.log(err);
        //     })
        // },
		closeDialog() {
			// this.editVisible = false;
			this.isAdd = true;
			this.form = {};
		},
		// add() {
		// 	this.editVisible = true;
		// },
        // 编辑操作
        handleEdit(row) {
			this.isAdd = false;
            this.form = row;
            // this.editVisible = true;
		},
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
						addNotice(this.form).then(() => {
							this.closeDialog();
							this.$message.success(`添加成功`);
							this.$refs.collectTable.queryTableData();
						})
					} else {
						editNotice(this.form.noticeWriteId, this.form).then(res => {
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
