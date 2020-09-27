<template>
    <e-table ref="collectTable" :dataOrigin="dataOrigin" :tableCols="tableColList" :customSearchList="filterForm" new-search>
        <template #expand="scope">
            <el-form label-position="left" class="demo-table-expand">
                <el-form-item :label="item.label" v-for="item in expendList" :key="item.prop">
                    <span>{{ scope.rowData[item.prop] }}</span>
                </el-form-item>
            </el-form>
        </template>
    </e-table>
</template>

<script>
import { trashCollectTableURL, edittrashCollect, addtrashCollect, deletetrashCollect, checktrashCollect } from '@/api/trashCollect';
import { trashCollectTableCols } from '@/data/staicData';
import ETable from '@/components/common/ETable';
export default {
    components: {
        ETable
    },

    data() {
        return {
            editVisible: false,
            form: {},
            dataOrigin: {
                url: trashCollectTableURL
            },
            isAdd: true,
            optionsList: {},
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
        };
    },
    computed: {
        expendList() {
            return trashCollectTableCols.filter((el) => el.expand);    
        },
        tableColList() {
            return trashCollectTableCols.filter((el) => el.expand === undefined);
        },
        editColList() {
            return trashCollectTableCols.filter((el) => el.edit);
        }
    },

    methods: {
        //下发按钮
        Issue() {
            this.$refs.form.validate((flag) => {
                if (flag) {
                    addExamine(this.form).then(() => {
                        this.$message.success(`下发成功`);
                        this.$router.push('/inspect');
                    });
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
</style>

