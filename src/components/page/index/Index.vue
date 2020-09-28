<template>
    <div>
        <header>
            <div class="title-r">
                <span>
                    总监测点数：
                    <strong class="greencircle">6</strong>
                </span>
                <span>
                    异常监测点数：
                    <strong class="redcircle">0</strong>
                </span>
            </div>
            <span>监测区域：</span>
            <span id="province">湖南省</span>
            <span id="navBread"></span>
        </header>
        <nav>
            <div id="mapbar"><map-bar></map-bar></div>
            <div id="barchart">
                <div id="main" style="width: 600px; height: 400px"></div>
            </div>
        </nav>
    </div>
</template>

<script>
import mapBar from './map';
export default {
    name: 'dashboard',
    data() {
        return {};
    },
    components: {
        mapBar
    },
    computed: {},
    mounted() {
        this.barmap();
    },

    methods: {
        barmap(barcode, barname) {
            let mapchart = this.$echarts.init(document.getElementById('main'));
            var option = {
                title: {
                    text: '近七天医废统计'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['重量统计(kg)', '数量统计(kg)']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: { show: true, readOnly: false },
                        saveAsImage: { show: true }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        data: ['2020-09-20', '2020-09-21', '2020-09-22', '2020-09-23', '2020-09-24', '2020-09-25', '2020-09-26']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '重量统计(kg)',
                        type: 'bar',
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                    },
                    {
                        name: '数量统计(kg)',
                        type: 'bar',
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                    }
                ]
            };
            mapchart.setOption(option);
        }
    }
};
</script>


<style lang="less" scoped>
header {
    height: 45px;
    line-height: 45px;
    padding-bottom: 5px;
    border-bottom: dotted 1px #ddd;
    .title-r {
        float: right;
        vertical-align: middle;
        .greencircle {
            display: inline-block;
            width: 60px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 100%;
            background: #1ab394;
            color: white;
            font-size: 20px;
            vertical-align: middle;
        }
        .redcircle {
            display: inline-block;
            width: 60px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 100%;
            background: #ed5565;
            color: white;
            font-size: 20px;
            vertical-align: middle;
        }
    }
}
nav {
    background-color: #fff;
    overflow: hidden;
    margin-top: 5%;
    #mapbar{
        float: left;
    }
    #barchart{
        float: right;
    }
}
</style>
