<template>
    <div class="leftbox">
        <h1>整改通知单</h1>
        <el-divider></el-divider>
        <el-divider></el-divider>
        <div class="con-box">
            <span>违规单位:{{msg.hospitalId}}</span>
            <span style="margin-left:50px">时限：{{msg.abarbeitungTime}}&nbsp;天</span>
            <div class="weigui">
                <span>因违反:</span>
                <div class="c-box">{{msg.content}}</div>
            </div>
            <div>
                <span>处罚内容:</span>
                <div class="d-box">{{msg.way}}</div>
            </div>
            <div class="photo">
                <span>现场照片:</span>
                <div></div>
            </div>
        </div>

        <div class="right-box">
            <div >时 间:{{newtime}}</div>
            <div style="margin-top:10px">单 位:湖南省</div>
            <div style="margin-top:10px">下发人:卫监所</div>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
import axios from 'axios';
export default {
    components: {},
    data() {
        return {
            tableData: [],
            form: {},
            msg: [],
            newtime:[]
        };
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },

    mounted: function () {
        this.msg = this.$route.params.data;
        // console.log(this.msg);
        this.newtime = moment(this.msg.createDate).format('YYYY-MM-DD HH:mm:ss');
        // console.log(this.newtime)
    }
};
</script>

<style lang="less" scoped>
.leftbox {
    width: 900px;
    h1 {
        color: red;
        text-align: center;
    }
    .con-box {
        font-size: 16px;
        .weigui {
            margin-top: 30px;
            .c-box {
                margin-left: 50px;
                font-weight: bold;
            }
        }
        .d-box {
            margin-left: 50px;
            font-weight: bold;
        }
        .photo {
            margin-top: 30px;
        }
    }
    .right-box {
        float: right;
        margin-top: 200px;
    }
}
</style>

