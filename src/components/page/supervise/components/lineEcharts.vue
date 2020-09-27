<template>
    <div class="charts">
        <div :id="id" style="min-height: 350px; width: 500px; height: 400px"></div>
    </div>
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'lineEcharts',
    props: {
        id: {
            type: String,
            default: 'pieChart'
        }
    },
    data() {
        return {
            pieChart: null
        };
    },
    mounted() {
        this.drawPie();
    },
    methods: {
        drawPie() {
            this.pieChart = echarts.init(document.getElementById(this.id));
            this.pieChart.setOption({
                // title: {
                //     text: '未来一周气温变化',
                //     subtext: '纯属虚构'
                // },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['感染性', '病理性', '损伤性', '药物性', '化学性']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: { readOnly: false },
                        // magicType: { type: ['line', 'bar'] },
                        // restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    name:'时间',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                },
                yAxis: {
                    type: 'value',
                    name:'重量(kg)'
                },
                series: [
                    {
                        name: '感染性',
                        type: 'line',
                        data: [1, 11, 1, 13, 1, 13, 10],

                    },
                    {
                        name: '病理性',
                        type: 'line',
                        data: [1, 3, 2, 5, 3, 2, 0],
                    },
                    {
                        name: '损伤性',
                        type: 'line',
                        data: [1, 14, 10, 13, 15, 13, 10],
                      
                      
                    },
                    {
                        name: '药物性',
                        type: 'line',
                        data: [17, 14, 15, 13, 18, 13, 10],
              
                   
                    },
                    {
                        name: '化学性',
                        type: 'line',
                        data: [7, 1, 5, 3, 12, 3, 9],
                   
                     
                    }
                ]
            });
        }
    }
};
</script>

<style>
.charts {
    width: 600px;
    height: 400px;
}
</style>