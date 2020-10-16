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
			<template #customSearch="scope">
				<el-form-item label="所属部门">
                    <el-cascader
                        @change="getDep($event, scope.customSearch)"
						:props="depProps"
						clearable
                    ></el-cascader>
                </el-form-item>
			</template>
			<template #departmentId="scope">
				{{scope.rowData.departmentName}}
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
			<el-form ref="form" :model="form" label-width="auto" >
				<el-form-item prop="officeName" label="科室名称"
				:rules="[
					{ required: true, message: '请输入科室名称', trigger: 'blur' },
				]">
					<el-input v-model="form.officeName"></el-input>
				</el-form-item>
				<el-form-item prop="number" label="科室编号"
				:rules="[
					{ required: true, message: '请输入科室编号', trigger: 'blur' },
				]">
					<el-input v-model="form.number" type="number"  placeholder="请输入数字"  @keyup.native="proving($event)" min="1"></el-input>
				</el-form-item>
				<el-form-item label="所属部门">
                    <el-cascader
                        @change="getDep"
						:props="depProps"
						v-model="selectedOptions"
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
import { officeTableURL, editOffice, addOffice, deleteOffice, allDepartment, allHospital, getDepByHosp } from '@/api/admin';
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
			optionsList: {},
			selectedOptions:[],
			depProps: {
                lazy: true,
                lazyLoad: (node, resolve) => {
                    const { level, value } = node;
					let nodes = [];
                    if (level === 0) {
						allHospital().then(res => {
							nodes = res.queryResult.list.map((item) => {
								return {
									label: item.hospitalName,
									value: {hospitalId: item.hospitalId},
									leaf: false
								};
							});
							resolve(nodes);
						})
                    }
                    if (level === 1) {
						// console.log(value.hospitalId)
                        getDepByHosp(value.hospitalId).then((res) => {
                            nodes = res.queryResult.list.map((item) => {
                                return {
                                    label: item.departmentName,
                                    value: {departmentId: item.departmentId},
                                    leaf: true
                                };
                            });
							resolve(nodes);
						});
					}
					
				}
            },
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
		getDep(v, c) {
			if(c) {
				Object.assign(c, ...v)
				return
			}
			Object.assign(this.form, ...v);
			
			// this.form.departmentId = v.filter(el => el.departmentId)[0]['departmentId']
		},
		allDepartment() {
			allDepartment().then(res => {
				this.optionsList['departmentId'] = res.queryResult.list.map(el => ({label: el.departmentName, value: el.departmentId}));
			})
		},
		//科室编号input操作
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
			this.$refs.form.validate(flag => {
                if (flag) {
					if(this.isAdd) {
						addOffice(this.form).then(() => {
							this.closeDialog();
							this.$message.success(`添加成功`);
							this.$refs.officeTable.queryTableData();
						})
					}else {
						editOffice(this.form.officeId, this.form).then(res => {
							this.closeDialog();
							this.$message.success(`修改成功`);
							this.$refs.officeTable.queryTableData();
						})
					}  
				}
			})
        },
    }
};
</script>
