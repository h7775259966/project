<template>
    <div class="crumbs">
		<Button />
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="医院管理" name="first">
                <Hospital />
            </el-tab-pane>
            <el-tab-pane label="部门管理" name="second">
                <Department />
            </el-tab-pane>
            <el-tab-pane label="科室管理" name="third">
                <Office />
            </el-tab-pane>
            <el-tab-pane label="护士管理" name="fourth">
                <Nurse />
            </el-tab-pane>
            <el-tab-pane label="收集人管理" name="fifth">
                <Collect />
            </el-tab-pane>
            <el-tab-pane label="省级单位" name="sixth">
                <Province />
            </el-tab-pane>
            <el-tab-pane label="市级单位" name="seventh">
                <City />
            </el-tab-pane>
            <el-tab-pane label="区县级单位" name="eighth">
                <Area />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Hospital from './components/hospital';
import Department from './components/department';
import Office from './components/office';
import Nurse from './components/nurse';
import Collect from './components/collect';
import Province from './components/province';
import City from './components/city';
import Area from './components/area';
import Button from '../components/button'
export default {
    components: {
        Hospital,
        Department,
        Office,
        Nurse,
        Collect,
        Province,
        City,
        Area,
		Button
    },
    data() {
        return {
            activeName: 'first',
            activeClass: 'one'
        };
    },
    methods: {
        
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>
