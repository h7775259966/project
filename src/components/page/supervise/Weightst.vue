<template>
    <div style="background-color: #fff;">
        <div class="title">
            <h2>当天医废重量统计</h2>
        </div>
        <div class="container-fluid listweight">
            <div class="row">
                <div class="col-lg-2 bg-warning" style="width: 20%;">
                    <strong>0</strong>
                    <span>感染性</span>
                </div>
                <div class="col-lg-2 bg-success" style="width: 20%;">
                    <strong>0</strong>
                    <span>损伤性</span>
                </div>
                <div class="col-lg-2 bg-info" style="width: 20%;">
                    <strong>0</strong>
                    <span>病理性</span>
                </div>
                <div class="col-lg-2 bg-warning" style="width: 20%;">
                    <strong>0</strong>
                    <span>药物性</span>
                </div>
                <div class="col-lg-2 bg-danger" style="width: 20%;">
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
        <div class="container">
            <div class="schart-box">
                <div class="content-title">柱状图</div>
                <schart class="schart" canvasId="bar" :options="options1"></schart>
            </div>
            <div class="schart-box">
                <div class="content-title">折线图</div>
                <schart class="schart" canvasId="line" :options="options2"></schart>
            </div>
            <div class="schart-box">
                <div class="content-title">饼状图</div>
                <schart class="schart" canvasId="pie" :options="options3"></schart>
            </div>
            <div class="schart-box">
                <div class="content-title">环形图</div>
                <schart class="schart" canvasId="ring" :options="options4"></schart>
            </div>
        </div>
    </div>
</template>

<script>
import Schart from 'vue-schart';
export default {
    name: 'basecharts',
    components: {
        Schart
    },
    data() {
        return {
            value: '',
            options1: {
                type: 'bar',
                title: {
                    text: '最近一周各品类销售图'
                },
                bgColor: '#fbfbfb',
                labels: ['周一', '周二', '周三', '周四', '周五'],
                datasets: [
                    {
                        label: '家电',
                        fillColor: 'rgba(241, 49, 74, 0.5)',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '百货',
                        data: [164, 178, 190, 135, 160]
                    },
                    {
                        label: '食品',
                        data: [144, 198, 150, 235, 120]
                    }
                ]
            },
            options2: {
                type: 'line',
                title: {
                    text: '最近几个月各品类销售趋势图'
                },
                bgColor: '#fbfbfb',
                labels: ['6月', '7月', '8月', '9月', '10月'],
                datasets: [
                    {
                        label: '家电',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '百货',
                        data: [164, 178, 150, 135, 160]
                    },
                    {
                        label: '食品',
                        data: [114, 138, 200, 235, 190]
                    }
                ]
            },
            options3: {
                type: 'pie',
                title: {
                    text: '服装品类销售饼状图'
                },
                legend: {
                    position: 'left'
                },
                bgColor: '#fbfbfb',
                labels: ['T恤', '牛仔裤', '连衣裙', '毛衣', '七分裤', '短裙', '羽绒服'],
                datasets: [
                    {
                        data: [334, 278, 190, 235, 260, 200, 141]
                    }
                ]
            },
            options4: {
                type: 'ring',
                title: {
                    text: '环形三等分'
                },
                showValue: false,
                legend: {
                    position: 'bottom',
                    bottom: 40
                },
                bgColor: '#fbfbfb',
                labels: ['vue', 'react', 'angular'],
                datasets: [
                    {
                        data: [500, 500, 500]
                    }
                ]
            }
        };
    }
};
</script>

<style scoped lang="less">
.schart-box {
    display: inline-block;
    margin: 20px;
}
.schart {
    width: 600px;
    height: 400px;
}
.content-title {
    clear: both;
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}
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
.time-1{
    
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
.block{
    float: left;
}
.block-2 {
    float: right;
}
</style>