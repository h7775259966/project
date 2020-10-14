<template>
    <div>
        <e-table
            ref="collectTable"
            :dataOrigin="dataOrigin"
            :tableCols="tableColList"
            :customSearchList="kind === 'check' ? customSearchListCheck : customSearchList"
            :showOperation="true"
            new-search
        >
            <template #expand="scope">
                <el-form label-position="left" class="demo-table-expand">
                    <el-form-item :label="item.label" v-for="item in expendList" :key="item.prop">
                        <span>{{ scope.rowData[item.prop] }}</span>
                    </el-form-item>
                </el-form>
            </template>
            <template #status="scope">
                {{ scope.rowData.status == 1 ? '待出库' : '出库完成' }}
            </template>
            <template #outDetail="scope">
                <el-button
                    v-if="kind === 'edit' && scope.rowData.status == 1"
                    type="text"
                    icon="el-icon-view"
                    class="red"
                    @click="check(scope.rowData, 2)"
                    >查看</el-button
                >
                <el-button v-if="kind === 'edit' && scope.rowData.status == 2" type="text" class="red" @click="scope.rowData, 1"
                    >无</el-button
                >
            </template>
            <template #operation="scope">
                <el-button
                    v-if="kind === 'edit' && scope.rowData.status == 1"
                    type="text"
                    icon="el-icon-truck"
                    @click="handletrashOut(scope.rowData)"
                    >出库</el-button
                >
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
                <el-form-item prop="outTime" label="出库时间">
                    <el-date-picker v-model="form.outTime" type="datetime" placeholder="选择日期时间"> </el-date-picker>
                </el-form-item>
                <el-form-item prop="company" label="转运公司" :rules="[{ required: true, message: '请输入转运公司', trigger: 'blur' }]">
                    <el-select  v-model="form.company">
						<el-option v-for="o in optionsCompany" :key="o.id" :label="o.content" :value="o.content"></el-option>
					</el-select>
                </el-form-item>
                <el-form-item prop="car" label="车牌号" :rules="[{ required: true, message: '请输入车牌号', trigger: 'blur' }]">
                    <el-select  v-model="form.car">
						<el-option v-for="o in optionsCar" :key="o.id" :label="o.content" :value="o.content"></el-option>
					</el-select>
                </el-form-item>
                <el-form-item prop="name" label="转运人" :rules="[{ required: true, message: '请输入转运人', trigger: 'blur' }]">
                    <el-select  v-model="form.name">
						<el-option v-for="o in optionsName" :key="o.id" :label="o.content" :value="o.content"></el-option>
					</el-select>
                </el-form-item>
                <el-form-item prop="outName" label="出库人" :rules="[{ required: true, message: '请输入出库人', trigger: 'blur' }]">
                    <el-input v-model="form.outName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveEdit">出 库</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="checkDialog" width="20%" center>
            <div v-if="checkContentData !== null">
                <span style="font-size: 12px; color: #ccc000">可出库详情:</span>
                <div>
                    {{ checkContentData.outDetail }}
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { trashOutTableURL,deletetrashOut, changeStatus, allCar, allCompany, allName } from '@/api/operation';
import ETable from '@/components/common/ETable';
import { trashOutTableCols } from '@/data/staicData';
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
                url: trashOutTableURL,
                params:
                	this.kind === 'check' ? { status: 2 } : {}
            },
            isAdd: true,
            optionsCar: {},
            optionsCompany: {},
            optionsName: {},
            customSearchList: [
                {
                    label: '出库状态',
                    type: 'select',
                    prop: 'status',
                    options: [
                        {
                            label: '待出库',
                            value: '1'
                        },
                        {
                            label: '出库完成',
                            value: '2'
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        expendList() {
            return trashOutTableCols.filter((el) => el.expand);
        },
        tableColList() {
            return trashOutTableCols.filter((el) => el.expand === undefined);
        },
        editColList() {
            return trashOutTableCols.filter((el) => el.edit);
        }
	},
	mounted() {
		this.allCar();
		this.allCompany();
		this.allName();
	},
    methods: {
		//获取所有车牌号
		allCar() {
			allCar().then(res => {
				this.optionsCar = res.queryResult.list;
			})
		},
		//获取所有转运公司
		allCompany() {
			allCompany().then(res => {
				this.optionsCompany = res.queryResult.list;
			})
		},
		//获取所有转运人
		allName() {
			allName().then(res => {
				this.optionsName = res.queryResult.list;	
			})
		},
        // 删除操作
        handleDelete(row) {
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then((falg) => {
                    falg === 'confirm' &&
                        deletetrashOut(row.trashOutId).then(() => {
                            this.$message.success('删除成功');
                            this.$refs.collectTable.queryTableData();
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
        handletrashOut(row) {
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
                if (flag) {
					changeStatus(this.form.trashOutId, this.form).then((res) => {
						this.closeDialog();
						this.$message.success('出库成功');
						this.$refs.collectTable.queryTableData();
					});
				}
			})  
        }
    }
};
</script>

