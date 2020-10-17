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
			<template #cityId="scope">
				{{scope.rowData.cityName}}
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
				<el-form-item prop="cityId" label="所属市级" :rules="[
					{ required: true, message: '请选择所属市', trigger: 'blur' },
				]">
                    <el-select  v-model="form.cityId" clearable>
						<el-option v-for="o in optionsList.cityId" :key="o.value" :label="o.label" :value="o.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="zoneName" label="区县级单位名称"
				:rules="[
					{ required: true, message: '请输入区县级单位名称', trigger: 'blur' },
				]">
					<el-input v-model="form.zoneName"></el-input>
				</el-form-item>
                <el-form-item prop="zoneNumber" label="区县级单位编号"
				:rules="[
					{ required: true, message: '请输入区县级单位编号', trigger: 'blur' },
				]">
					<el-input v-model="form.zoneNumber"></el-input>
				</el-form-item>
                <el-form-item prop="principal" label="区县级单位负责人" 
                :rules="[
					{ required: true, message: '请输入区县级单位负责人', trigger: 'blur' },
				]">
					<el-input v-model="form.principal"></el-input>
				</el-form-item>
                <el-form-item prop="longitude" label="经度">
					<el-input v-model="form.longitude"></el-input>
				</el-form-item>
                <el-form-item prop="latitude" label="纬度">
					<el-input v-model="form.latitude"></el-input>
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
import { zoneURL, editZone, addZone, deleteZone, allCity} from '@/api/admin';
import ETable from '@/components/common/ETable';
import {zoneCols} from '@/data/staicData';
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
				url: zoneURL
			},
			isAdd: true,
			optionsList: {}
        };
    },
	computed: {
		expendList() {
			return zoneCols.filter(el => el.expand);
		},
		tableColList() {
			return zoneCols.filter(el => el.expand === undefined);
		},
		editColList() {
			return zoneCols.filter(el => el.edit);
		}
	},
	mounted() {
		this.allCity();
	},
    methods: {
		//获取所有市
		allCity() {
			allCity().then(res => {
				// console.log(res)
				this.optionsList['cityId'] = res.queryResult.list.map(el => ({label: el.cityName, value: el.cityId}));
			})
		},
        // 删除操作
        handleDelete(row) {
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(falg => {
				falg === 'confirm' && deleteZone(row.zoneId).then(() => {
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
						addZone(this.form).then(() => {
							this.closeDialog();
							this.$message.success(`添加成功`);
							this.$refs.depTable.queryTableData();
						})
				} else {
						editZone(this.form.zoneId, this.form).then(res => {
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
