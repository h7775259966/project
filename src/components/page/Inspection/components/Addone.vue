<template>
    <div>
        <el-button type="primary" class="button" @click="Issue">下发整改任务</el-button>
        <div class="box">
            <el-form :label-position="labelPosition" label-width="auto" ref="form" :model="form">
                <div class="leftbox">
                    <el-form-item
                        label="违规单位"
                        prop="hospitalId"
                        :rules="[{ required: true, message: '请输入违规单位', trigger: 'blur' },]"
                    >
                        <el-input v-model="form.hospitalId"></el-input>
                    </el-form-item>
                    <el-form-item label="违规时间">
                        <el-date-picker
                            style="width:300px"
                            v-model="form.violationTime"
                            type="datetime"
                            placeholder="选择日期时间"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item
                        label="整改时限/天"
                        prop="abarbeitungTime"
                        :rules="[{ required: true, message: '请输入天数', trigger: 'blur' },]"
                    >
                        <el-input-number
                            v-model="form.abarbeitungTime"
                            style="width:300px"
                            controls-position="right"
                            placeholder="请输入天数"
                            :min="1"
                        ></el-input-number>
                    </el-form-item>
                    <el-form-item
                        label="违规内容"
                        prop="content"
                        :rules="[{ required: true, message: '请输入违规内容', trigger: 'blur' },]"
                    >
                        <el-input
                            type="textarea"
                            :rows="5"
                            resize="none"
                            style="width:300px"
                            placeholder="请输入违规内容"
                            v-model="form.content"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="处罚内容"
                        prop="way"
                        :rules="[{ required: true, message: '请输入处罚内容', trigger: 'blur' },]"
                    >
                        <el-input
                            type="textarea"
                            :rows="5"
                            resize="none"
                            style="width:300px"
                            placeholder="请输入处罚内容"
                            v-model="form.way"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="现场照片">
                        <el-upload class="upload-demo" v-model="form.picture" action :limit="3">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                </div>
            </el-form>
            <!-- 违规标准对照表 -->

            <div class="rightbox">
                <span class="span" style="margin-left:20px;font-size:20px;">违规标准对照表:</span>
                <e-table ref="collectTable" :dataOrigin="dataOrigin" :tableCols="tableColList">
                    <template #expand="scope">
                        <el-form label-position="left" class="demo-table-expand">
                            <el-form-item
                                :label="item.label"
                                v-for="item in expendList"
                                :key="item.prop"
                            >
                                <span>{{ scope.rowData[item.prop] }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </e-table>
            </div>
        </div>
    </div>
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
.el-upload--text {
    width: auto;
    height: auto;
}
.el-input {
    width: 300px;
}
.button {
    margin-bottom: 20px;
}

.leftbox {
    float: left;
}
.rightbox {
    width: 100%;
}

.box {
    display: flex;
}
</style>

