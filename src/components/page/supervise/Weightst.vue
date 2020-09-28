<template>
    <div style="background-color: #fff">
        <div class="title">
            <h2>当天医废重量统计</h2>
        </div>
        <div class="container-fluid listweight">
            <div class="row">
                <div class="col-lg-2 bg-warning" style="width: 20%">
                    <strong>0</strong>
                    <span>感染性</span>
                </div>
                <div class="col-lg-2 bg-success" style="width: 20%">
                    <strong>0</strong>
                    <span>损伤性</span>
                </div>
                <div class="col-lg-2 bg-info" style="width: 20%">
                    <strong>0</strong>
                    <span>病理性</span>
                </div>
                <div class="col-lg-2 bg-warning" style="width: 20%">
                    <strong>0</strong>
                    <span>药物性</span>
                </div>
                <div class="col-lg-2 bg-danger" style="width: 20%">
                    <strong>0</strong>
                    <span>化学性</span>
                </div>
            </div>
        </div>
        <section class="time-1">
            <div class="block">
                <span>医废日统计：{{ value }}</span>
                <el-date-picker
                    v-model="value"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']"
                ></el-date-picker>
                <el-button type="primary">查询</el-button>
            </div>
            <div class="block-2">
                <span>医废类型日统计：{{ value }}</span>
                <el-date-picker
                    v-model="value"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']"
                ></el-date-picker>
                <el-button type="primary">查询</el-button>
            </div>
        </section>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>-->
        <div class="ehcats">
            <div class="container">
                <bar-echarts></bar-echarts>
            </div>
            <div class="line">
                <lin-echarts></lin-echarts>
            </div>
        </div>
        <span>医废月统计</span>
        <div class="barEcharts">
            
            <div id="pieGraph" style="height: 350px"></div>
        </div>
    </div>
</template>

<script>
import barEcharts from './components/barEcharts';
import linEcharts from './components/lineEcharts';

let echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入柱状图
require('echarts/lib/chart/pie');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

export default {
    components: {
        barEcharts,
        linEcharts
    },
    data() {
        return {
            value: ''
        };
    },
    mounted() {
        this.drawBar();
        
    },
    methods: {
        drawBar() {
            // 基于dom，初始化echarts实例
            let barGraph = echarts.init(document.getElementById('pieGraph'));
            // 绘制图表
            barGraph.setOption({
                tooltip: {
                    trigger: 'axis',
                },
                
                legend: {
                    data: ['感染性', '病理性', '损伤性', '药物性', '化学性']
                },
                
                xAxis: {
                    type: 'category',
                    name: '时间',
                    splitLine: { show: false },
                                axisPointer: {
                type: 'shadow'
            },
                    data: ['2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-07', '2020-08', '2020-09', '2020-10', '2020-11', '2020-12']
                },
                grid: {
                    left: '2%',
                    right: '10%',
                    top: '8%',
                    containLabel: true
                },
                yAxis: {
                    type: 'value',
                    name: '重量(kg)',
                    splitLine: { show: true },
                    
                },
                series: [
                    {
                        name: '感染性',
                        type: 'bar',
                        data: [1, 11, 1, 13, 1, 13, 10, 1, 13, 1, 13,],

                    },
                    {
                        name: '病理性',
                        type: 'bar',
                        data: [1, 3, 2, 5, 3, 2, 0, 1, 13, 1, 13,],
                    },
                    {
                        name: '损伤性',
                        type: 'bar',
                        data: [1, 14, 10, 13, 15, 13, 10, 1, 13, 1, 13,],
                      
                      
                    },
                    {
                        name: '药物性',
                        type: 'bar',
                        data: [17, 14, 15, 13, 18, 13, 10, 1, 13, 1, 13,],        
                    },
                    {
                        name: '化学性',
                        type: 'bar',
                        data: [7, 1, 5, 3, 12, 3, 9, 1, 13, 1, 13,], 
                    }
                ]
            });
         
        },
           
       
    }
};
</script>

<style scoped lang="less">
.title {
    border-bottom: 1px dotted #ddd;
    padding-bottom: 5px;
    height: 45px;
    line-height: 45px;
}
.title h2 {
    line-height: 45px;
    font-size: 14px;
    font-weight: 700;
}
.listweight div {
    text-align: center;
    padding: 8px 0;
}
.listweight div strong {
    font-size: 30px;
    display: block;
    line-height: 1.8em;
    font-weight: 700;
}

.listweight div span {
    line-height: 1.5em;
    font-size: 14px;
}
.container-fluid {
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
    &::before {
        content: '';
        display: table;
    }
    .row {
        margin-left: -15px;
        margin-right: -15px;
        .col-lg-2 {
            float: left;
            position: relative;
            min-height: 1px;
        }
        .bg-warning {
            background-color: #fcf8e3;
        }
        .bg-success {
            background-color: #dff0d8;
        }
        .bg-info {
            background-color: #d9edf7;
        }
        .bg-danger {
            background-color: #f2dede;
        }
    }
}
.time-1 {
    height: 40px;
    line-height: 40px;
    width: 100%;
    overflow: hidden;
}
.block .block-2 {
    border-top: 4px solid #eee;
    border-bottom: 1px solid #eee;
    background: #f9f8f8;
}
.block {
    float: left;
}
.block-2 {
    float: right;
}
.ehcats {
    overflow: hidden;
    margin-top: 2%;
    .container {
        float: left;
    }
    .line {
        float: right;
    }
}
.barEcharts{
    margin-top: 2%;
    span{
        padding: 5% 0;
    }
}
</style>