<template>
    <div>
		<e-table ref="officeTable" :dataOrigin="dataOrigin" :tableCols="tableColList" :customSearchList= customSearchList :showOperation="true"  new-search>
			<template #expand="scope">
				<el-form label-position="left"  class="demo-table-expand">
					<el-form-item :label="item.label" v-for="item in expendList" :key="item.prop">
						<span>{{ scope.rowData[item.prop] }}</span>
					</el-form-item>
				</el-form>
			</template>
            <template #outDetail="scope">
                <el-button
                    type="text"
                    icon="el-icon-view"
                    class="red"
                    @click="check(scope.rowData)"
                    >查看</el-button
                >
            </template>
		</e-table>
        <el-dialog :visible.sync="checkDialog" width="20%" center>
            <div v-if="checkContentData !== null">
                <span style="font-size: 12px; color: #ccc000">出库重量明细:</span>
                <div>
                    {{ checkContentData.outDetail }}
                </div>
            </div>
        </el-dialog>
	</div>
</template>

<script>
import { trashOuthistoryTableURL} from '@/api/record';
import ETable from '@/components/common/ETable';
import {trashOuthistoryTableCols} from '@/data/staicData';
export default {
	components: {
		ETable
	},
    data() {
        return {
            tableData: [],
            checkDialog: false,
            checkContentData: null,
            form: {},
			dataOrigin: {
				url: trashOuthistoryTableURL
			},
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
        };
    },
	computed: {
		expendList() {
			return trashOuthistoryTableCols.filter(el => el.expand);
		},
		tableColList() {
			return trashOuthistoryTableCols.filter(el => el.expand === undefined);
		},
		editColList() {
			return trashOuthistoryTableCols.filter(el => el.edit);
		}
	},
	mounted() {
	
	},
    methods: {
       //查看按钮
        check(row) {
            this.checkContentData = row;
            this.checkDialog = true;
        },
        closeCheckDialog() {
            this.checkContentData = null;
            this.checkDialog = false;
        },
    }
};
</script>
