<template>
    <e-table ref="collectTable" new-search :customSearchList="filterForm" :dataOrigin="dataOrigin" :tableCols="tableColList">
        <template #expand="scope">
            <el-form label-position="left" class="demo-table-expand">
                <el-form-item :label="item.label" v-for="item in expendList" :key="item.prop">
                    <span>{{ scope.rowData[item.prop] }}</span>
                </el-form-item>
            </el-form>
        </template>
        <template #collectMethods="scope" >
			{{scope.rowData.collectMethods === 1 ? '小车收集' : '补录'}}
		</template>
    </e-table>
</template>

<script>
import { trashPutTableURL} from '@/api/storage';
import { trashPutTableCols } from '@/data/staicData';
import ETable from '@/components/common/ETable.vue';
export default {
    components: {
        ETable
    },

    data() {
        return {
            filterForm: [
                {
                    label: '所属科室',
                    prop: 'officeId',
                    type: 'input'
                },
                {
                    label: '废物类型',
                    prop: 'trash',
                    type: 'input'
                },
                {
                    label: '条形编码',
                    prop: 'code',
                    type: 'input'
                },
                {
                    label: '开始时间',
                    prop: 'startTime',
                    type: 'datetime'
                },
                {
                    label: '结束时间',
                    prop: 'endTime',
                    type: 'datetime'
                }
            ],
            editVisible: false,
            form: {},
            dataOrigin: {
                url: trashPutTableURL
            },
            isAdd: true,
            optionsList: {}
        };
    },
    computed: {
        expendList() {
            return trashPutTableCols.filter((el) => el.expand);
        },
        tableColList() {
            return trashPutTableCols.filter((el) => el.expand === undefined);
        },
        editColList() {
            return trashPutTableCols.filter((el) => el.edit);
        }
    },

    methods: {
        
    }
};
</script>

<style lang="less" scoped>

</style>

