<template>
    <div>
        <div class="charts">
            <div :id="id" style="min-height: 350px; width: 500px; height: 400px"></div>
        </div>
    </div>
</template>

<script>
let echarts = require('echarts/lib/echarts');

require('echarts/lib/chart/bar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

export default {
    name: 'barEcharts',
    props: {
        id: {
            type: String,
            default: 'chart'
        }
    },
    data() {
        return {
            chart: null
        };
    },
    mounted() {
        this.drawBar();
    },
    methods: {
        drawBar() {
            this.chart = echarts.init(document.getElementById(this.id));
            let colors = ['#5793f3', '#d14a61', '#675bba'];
            this.chart.setOption({
                color: colors,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        // restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
                    name: '时间'
                    
                },
                yAxis: {
                    type: 'value',
                    name: '重量(kg)'
                },
                series: [
                    {
                        name:'重量(kg)',
                        data: [10, 20, 10, 8, 7, 11, 13],
                        type: 'bar'
                    }
                ]
            });
        }
    }
};
</script>

<style >
.charts {
    width: 600px;
    height: 400px;
}
</style>