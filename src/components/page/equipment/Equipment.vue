<template>
    <div>
		<e-table ref="collectTable" :dataOrigin="dataOrigin" :tableCols="tableColList" :showOperation="true"  new-search>
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
            <template #status="scope" >
				{{scope.rowData.status === 1 ? '离线' : '在线'}}
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
        <!-- 编辑框 -->
		<el-dialog :title="isAdd ? '新增' : '编辑'" :visible.sync="editVisible" width="30%">
			<el-form ref="form" :model="form" label-width="auto" >
                <el-form-item prop="hospitalId" label="所属医疗机构" >
                    <el-select  v-model="form.hospitalId">
						<el-option v-for="o in optionsList.hospitalId" :key="o.value" :label="o.label" :value="o.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="equipmentName" label="设备名称"
				:rules="[
					{ required: true, message: '请输入设备名称', trigger: 'blur' },
				]">
					<el-input v-model="form.equipmentName"></el-input>
				</el-form-item>
				<el-form-item prop="equipmentNum" label="设备编号"
				:rules="[
				{ required: true, message: '请输入设备编号', trigger: 'blur' },
				]">
					<el-input v-model="form.equipmentNum"></el-input>
				</el-form-item>
				<el-form-item prop="equipmentFirm" label="设备生产商">
					<el-input v-model="form.equipmentFirm"></el-input>
				</el-form-item>
				<el-form-item prop="equipmentSIM" label="SIM卡号">
					<el-input v-model="form.equipmentSIM"></el-input>
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
import { equipmentTableURL, addequipment, deleteequipment, editequipment, allHospital} from '@/api/equipment';
import ETable from '@/components/common/ETable';
import {equipmentTableCols} from '@/data/staicData';
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
			checkDialog: false,
			checkContentData: null,
            tableData: [],
            editVisible: false,
            form: {},
			dataOrigin: {
				url: equipmentTableURL
			},
            isAdd: true,
            optionsList: {}
        };
    },
	computed: {
		expendList() {
			return equipmentTableCols.filter(el => el.expand);
		},
		tableColList() {
			return equipmentTableCols.filter(el => el.expand === undefined);
		},
		editColList() {
			return equipmentTableCols.filter(el => el.edit);
		}
    },
    mounted() {
        this.allHospital();
        // console.log(this.optionsList)
	},
    methods: {
        allHospital() {
			allHospital().then(res => {
				this.optionsList['hospitalId'] = res.queryResult.list.map(el => ({label: el.hospitalName, value: el.hospitalId}));
			})
		},
        // 删除操作
        handleDelete(row) {
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(falg => {
				falg === 'confirm' && deleteequipment(row.equipmentId).then(() => {
					this.$message.success('删除成功');
					this.$refs.collectTable.queryTableData();
				})
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
                if (flag) {
                    if(this.isAdd) {
                        addequipment(this.form).then(() => {
                            this.closeDialog();
                            this.$message.success(`添加成功`);
                            this.$refs.collectTable.queryTableData();
                        })
                    }
                    else {
                        editequipment(this.form.equipmentId, this.form).then(res => {
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
