<template>
    <div>	
		<e-table ref="collectTable" :dataOrigin="dataOrigin" :tableCols="tableColList" :customSearchList="customSearchList" :showOperation="true">
			<template #expand="scope">
				<el-form label-position="left"  class="demo-table-expand">
					<el-form-item :label="item.label" v-for="item in expendList" :key="item.prop">
						<span>{{ scope.rowData[item.prop] }}</span>
					</el-form-item>
				</el-form>
			</template>
			<template #operation="scope">
				
				<el-button
					v-if="kind === 'edit'"
					type="text"
					icon="el-icon-delete"
					class="red"
					@click="handleDelete(scope.rowData)"
				>删除</el-button>
			</template>
		</e-table>
		
		
	</div>
</template>

<script>
import moment from 'moment';
import { addWarnTableURL, addWarn, deleteWarn, editWarn} from '@/api/warnpush';
import ETable from '@/components/common/ETable';
import {warnpushTableCols} from '@/data/staicData';
import Timecom from '../../Base/time';
export default {
	components: {
		ETable,
		Timecom
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
            editVisible: false,
            form: {},
			dataOrigin: {
				url: addWarnTableURL
			},
			isAdd: true,
			customSearchList: [
				{
					label: '开始时间',
					type: 'datetime',
					prop: 'startTime',
				},
				{
					label: '结束时间',
					type: 'datetime',
					prop: 'endTime',
				}	
			],
			customTime:[
				
			]
			
        };
    },
	computed: {
		expendList() {
			return warnpushTableCols.filter(el => el.expand);
		},
		tableColList() {
			return warnpushTableCols.filter(el => el.expand === undefined);
		},
		editColList() {
			return warnpushTableCols.filter(el => el.edit);
		}
	},
    methods: {
        // 删除操作
        handleDelete(row) {
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(falg => {
				falg === 'confirm' && deleteWarn(row.pushId).then(() => {
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
        
    }
};
</script>
