<template>
    <div>
        <e-table ref="hospTable" :dataOrigin="dataOrigin" :tableCols="tableColList" :showOperation="true" :expand="true" new-search>
            <template #operationArea>
                <el-button type="primary" @click="add">新增</el-button>
			</template>
			<template #customSearch="scope">
				<el-form-item label="所属区">
                    <el-cascader
                        @change="getZone($event, scope.customSearch)"
						:props="zoneProps"
                        clearable
                    ></el-cascader>
                </el-form-item>
			</template>
            <template #expand="scope" >
                <el-form label-position="left" class="demo-table-expand">
                    <el-form-item :label="item.label" v-for="item in expendList" :key="item.prop">
                        <span>{{ scope.rowData[item.prop] }} </span>
                    </el-form-item>
                </el-form>
            </template>
            <template #regime="scope" >
				{{scope.rowData.regime === 1 ? '公立' : '民营'}}
			</template>
            <template #processingMode="scope" >
				{{scope.rowData.processingMode === 1 ? '自行处理' : '集中处理'}}
			</template>
            <template #operation="scope">
                <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.rowData)">编辑</el-button>
                <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.rowData)">删除</el-button>
            </template>
        </e-table>
        <!-- 编辑框 -->
        <el-dialog :title="isAdd ? '新增' : '编辑'" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="auto">
                <el-form-item
                    prop="hospitalName"
                    label="医院名称"
                    :rules="[{ required: true, message: '请输入医院名称', trigger: 'blur' }]"
                >
                    <el-input v-model="form.hospitalName"></el-input>
				</el-form-item>
				<el-form-item prop="zoneId"
                    label="医院区域">
					<el-cascader
						ref="getZone"
						@change="getZone"
						:props="zoneProps"
					></el-cascader>
				</el-form-item>
                <el-form-item
                    prop="hospitalNumber"
                    label="医院编号"
                    :rules="[{ required: true, message: '请输入医院编号', trigger: 'blur' }]"
                >
                    <el-input v-model="form.hospitalNumber"></el-input>
                </el-form-item>
                <el-form-item
                    prop="grade"
                    label="医院等级"
                    :rules="[{ required: true, message: '请输入医院等级', trigger: 'blur' }]"
                >
                    <el-input v-model="form.grade" type="number" placeholder="请输入数字" @keyup.native="proving($event)" min="1"></el-input>
                </el-form-item>
                <el-form-item prop="regime" label="医院体制">
                    <el-select v-model="form.regime" placeholder="请选择">
                        <el-option :value="1" label="公立"></el-option>
                        <el-option :value="2" label="民营"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="officeNumber" label="科室数">
                    <el-input v-model="form.officeNumber" type="number"  placeholder="请输入数字"  @keyup.native="proving($event)" min="1"></el-input>
                </el-form-item>
                <el-form-item prop="bedNumber" label="床位数">
                    <el-input v-model="form.bedNumber" type="number"  placeholder="请输入数字"  @keyup.native="proving($event)" min="1"></el-input>
                </el-form-item>
                <el-form-item prop="averageTrash" label="平均医废量/日">
                    <el-input v-model="form.averageTrash"></el-input>
                </el-form-item>
                <el-form-item
                    prop="principal"
                    label="医废第一负责人"
                    :rules="[{ required: true, message: '请输入医废第一负责人', trigger: 'blur' }]"
                >
                    <el-input v-model="form.principal"></el-input>
                </el-form-item>
                <el-form-item prop="hospitalContent" label="医院说明">
                    <el-input v-model="form.hospitalContent"></el-input>
                </el-form-item>
                <el-form-item prop="processingMode" label="医废处置方式">
                   <el-select v-model="form.processingMode" placeholder="请选择">
                        <el-option :value="1" label="自行处理"></el-option>
                        <el-option :value="2" label="集中处理"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="remarks" label="备注">
                    <el-input v-model="form.remarks"></el-input>
                </el-form-item>
                <el-form-item prop="picture" label="图片">
                    <el-upload v-model="form.picture" action="https://jsonplaceholder.typicode.com/posts/" :limit="1">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
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
import { hospitalTableURL, editHospital, addHospital, deleteHospital, cityList, cityAll, zoneList } from '@/api/admin';
import ETable from '@/components/common/ETable';
import { hospitalTableCols } from '@/data/staicData';
export default {
    components: {
        ETable
    },

    data() {
        return {
            tableData: [],
            editVisible: false,
            form: {
				
			},
			zoneProps: {
                lazy: true,
                lazyLoad: (node, resolve) => {
                    const { level, value } = node;
					let nodes = [];
                    if (level === 0) {
						cityAll().then(res => {
							nodes = res.queryResult.list.map((item) => {
								return {
									label: item.cityName,
									value: {cityId: item.cityId},
									leaf: false
								};
							});
							resolve(nodes);
						})
                    }
                    if (level === 1) {
                        zoneList(value.cityId).then((res) => {
                            nodes = res.queryResult.list.map((item) => {
                                return {
                                    label: item.zoneName,
                                    value: {zoneId: item.zoneId},
                                    leaf: true
                                };
                            });
                            resolve(nodes);
                        });
                    }
                }
            },
            dataOrigin: {
                url: hospitalTableURL
            },
            isAdd: true,
            optionsList: {},
            options: [
                {
                    label: '自行处理',
                    value: '1'
                },
                {
                    label: '集中处理',
                    value: '2'
                }
            ],
            regime: [
                {
                    label: '公立',
                    value: '1'
                },
                {
                    label: '民营',
                    value: '2'
                }
			],
			cityLists: []
        };
    },
    
    computed: {
        
        expendList() {
            return hospitalTableCols.filter((el) => el.expand);
        },
        tableColList() {
            return hospitalTableCols.filter((el) => el.expand === undefined);
        },
        editColList() {
            return hospitalTableCols.filter((el) => el.edit);
        },
	},
	created() {
	},
    methods: {
		getZone(v, c) {
			if(c) {
				Object.assign(c, ...v)
				return
			}
			 Object.assign(this.form, ...v);
			// this.form.zoneId = v.filter(el => el.zoneId)[0]['zoneId']
		},
		// getOffice(v) {
        //     Object.assign(this.form, ...v);
        // },
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
            })
                .then((falg) => {
                    falg === 'confirm' &&
                        deleteHospital(row.hospitalId).then(() => {
                            this.$message.success('删除成功');
                            this.$refs.hospTable.queryTableData();
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
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
            this.$refs.form.validate((flag) => {
                if (flag) {
                    if (this.isAdd) {
                        addHospital(this.form).then(() => {
                            this.closeDialog();
                            this.$message.success(`添加成功`);
                            this.$refs.hospTable.queryTableData();
                        });
                    } else {
                        editHospital(this.form.hospitalId, this.form).then((res) => {
                            this.closeDialog();
                            this.$message.success(`修改成功`);
                            this.$refs.hospTable.queryTableData();
                        });
                    }
                }
            });
        }
    }
};
</script>

<style>
.el-upload--text {
    width: auto;
    height: auto;
}
</style>

