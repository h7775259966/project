<template>
    
        <e-table ref="collectTable" :dataOrigin="dataOrigin" :tableCols="tableColList">
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
import { addExamine } from '@/api/violationExamine';
import { violationTableURL } from '@/api/violation';
import { violationStandardTableCols } from '@/data/staicData';
import ETable from '@/components/common/NosearchTable';
import axios from 'axios';
export default {
    components: {
        ETable
    },

    data() {
        return {
            labelPosition: 'left',
            num: 1,
            data: [],
            editVisible: false,
            form: {},
            dataOrigin: {
                url: violationTableURL
            },
            isAdd: true,
            optionsList: {}
        };
    },
    computed: {
        expendList() {
            return violationStandardTableCols.filter((el) => el.expand);
        },
        tableColList() {
            return violationStandardTableCols.filter((el) => el.expand === undefined);
        },
        editColList() {
            return violationStandardTableCols.filter((el) => el.edit);
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

