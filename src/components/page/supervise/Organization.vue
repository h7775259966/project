<template>
    <div>
        <header>
            <p>医废分级统计</p>
            <div id="heard">
                <div class="block">
                    <span class="demonstration">开始时间：</span>
                    <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"> </el-date-picker>
                </div>
                <div class="block-1">
                    <span class="demonstration">结束时间：</span>
                    <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"> </el-date-picker>
                    <el-button type="primary" class="btn">查询</el-button>
                </div>
            </div>
        </header>
        <nav>
            <vxe-table
                border
                resizable
                :tree-config="{ children: 'children' }"
                :expand-config="{ lazy: true, loadMethod: loadContentMethod }"
                :data="tableData"
            >
                <vxe-table-column type="expand" width="80">
                    <template v-slot:content="{ row }">
                        <vxe-grid :columns="row.childCols" :data="row.childData"></vxe-grid>
                    </template>
                </vxe-table-column>
                <vxe-table-column field="name" title="名称" tree-node></vxe-table-column>
                <vxe-table-column field="size" title="总量(kg)"></vxe-table-column>
                <vxe-table-column field="type" title="总数(包)"></vxe-table-column>
                <vxe-table-column field="violationWeight" title="感染性(重量)"></vxe-table-column>
                <vxe-table-column field="packets" title="感染性(数量)"></vxe-table-column>
                <vxe-table-column field="date" title="病理性(重量)"></vxe-table-column>
                <vxe-table-column field="date" title="病理数(数量)"></vxe-table-column>
                <vxe-table-column field="date" title="损伤性(重量)"></vxe-table-column>
                <vxe-table-column field="date" title="损伤数(数量)"></vxe-table-column>
                <vxe-table-column field="date" title="药物性(重量)"></vxe-table-column>
                <vxe-table-column field="date" title="药物数(数量)"></vxe-table-column>
                <vxe-table-column field="date" title="化学性(重量)"></vxe-table-column>
                <vxe-table-column field="date" title="化学数(数量)"></vxe-table-column>
            </vxe-table>
        </nav>
    </div>
</template>

<script>
import Axios from 'axios';
export default {
    data() {
        return {
            tableData: [],
            value1: ''
        };
    },
    created() {
        
        
        this.tableData = res;
        this.getdata(res);
    },
    methods: {
        loadContentMethod({ row }) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    let childCols = XEUtils.sample(
                        [
                            { type: 'seq', title: 'Sequence' },
                            { field: 'name', title: 'Name' },
                            { field: 'role', title: 'Role' },
                            { field: 'age', title: 'Age' },
                            { field: 'sex', title: 'Sex' }
                        ],
                        XEUtils.random(3, 5)
                    );
                    let childData = XEUtils.sample(
                        [
                            { name: 'TEST1', role: 'Develop', age: 20, sex: '女' },
                            { name: 'TEST2', role: 'Develop', age: 22, sex: '女' },
                            { name: 'TEST3', role: 'Develop', age: 24, sex: '男' },
                            { name: 'TEST4', role: 'Develop', age: 26, sex: '女' },
                            { name: 'TEST5', role: 'Develop', age: 28, sex: '男' },
                            { name: 'TEST6', role: 'Develop', age: 30, sex: '男' }
                        ],
                        XEUtils.random(1, 5)
                    );
                    row.childCols = childCols;
                    row.childData = childData;
                    resolve();
                }, 500);
            });
        },
        getdata(res) {
            Axios.get('/Untitled.json').then((res) => {
                console.log(res);
            });
        }
    }
};
</script>

<style lang="less">
header {
    p {
        background-color: #fff;
        padding: 10px 0px 10 10px;
        line-height: 30px;
    }
    #heard {
        overflow: hidden;
        line-height: 40px;
        background-color: #ddd;
        padding: 0px 5px;
        border-top: #fff 1px dotted;
        .block {
            float: left;
        }
        .block-1 {
            float: right;
            .btn {
                margin-left: 15px;
            }
        }
    }
}
</style>