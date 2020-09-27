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
            <div class="cont-center-cont1" id="mapChart">
                <img src="../../../assets/boxbg.png" alt />
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'dashboard',
    data() {
        return {};
    },
    components: {},
    computed: {},

    methods: {
        loadMap(mapCode, mapName) {
            var myChart = this.$echarts.init(document.getElementById('mapChart'));
            var uploadedDataURL = '430000.json';
            let that = this;
            $.getJSON(uploadedDataURL, function (geoJson) {
                that.$echarts.registerMap('hunan', geoJson);
                myChart.hideLoading();
                var geoCoordMap = {};
                var data1 = [
                    { name: '长沙市', value: 3, attr3: 3, attr4: 1, attr5: 56 },
                    { name: '株洲市', value: 0, attr3: 0, attr4: 0, attr5: 99 },
                    { name: '湘潭市', value: 0, attr3: 0, attr4: 0, attr5: 98 },
                    { name: '衡阳市', value: 0, attr3: 0, attr4: 0, attr5: 68 },
                    { name: '邵阳市', value: 3, attr3: 3, attr4: 2, attr5: 60 },
                    { name: '岳阳市', value: 0, attr3: 0, attr4: 0, attr5: 100 },
                    { name: '常德市', value: 0, attr3: 0, attr4: 0, attr5: 85 },
                    { name: '张家界市', value: 0, attr3: 0, attr4: 0, attr5: 79 },
                    { name: '益阳市', value: 1, attr3: 1, attr4: 1, attr5: 30 },
                    { name: '娄底市', value: 0, attr3: 0, attr4: 0, attr5: 60 },
                    { name: '郴州市', value: 0, attr3: 0, attr4: 0, attr5: 80 },
                    { name: '永州市', value: 0, attr3: 0, attr4: 0, attr5: 88 },
                    { name: '怀化市', value: 0, attr3: 0, attr4: 0, attr5: 87 },
                    { name: '湘西土家族苗族自治州', value: 0, attr3: 0, attr4: 0, attr5: 70 }
                ];
                myChart.setOption({
                    tooltip: {
                        //formatter :'{b}<br/>采购量:{c}万元<br/>已采购：{d}万元'
                        formatter: function (params) {
                            //alert(JSON.stringify(params));
                            var res = '<div><p>' + params.name + '</p></div>';
                            res += '<p>医院总数:' + params.data.attr3 + '</p>';
                            res += '<p>异常医院数:' + params.data.attr4 + '</p>';
                            return res;
                        }
                    },
                    visualMap: {
                        show: false,
                        min: 0,
                        max: 6,
                        text: ['高', '低'],
                        realtime: false,
                        calculable: true,
                        inRange: {
                            color: ['#eeeeee', '#d2e9ff', '#d2e9ff', '#d2e9ff', '#d2e9ff']
                        },
                        textStyle: {
                            color: '#000'
                        }
                    },

                    series: [
                        {
                            name: '地图数据',
                            type: 'map',
                            aspectScale: 1.95,
                            zoom: 1.1,
                            roam: true, //是否开启鼠标缩放和平移漫游
                            mapType: 'hunan', // 自定义扩展图表类型
                            itemStyle: {
                                normal: {
                                    borderColor: '#dddddd'
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: 'darkslategray'
                                        }
                                    }
                                }
                            },
                            data: data1,
                            label: {
                                //区域名样式
                                normal: {
                                    show: true,
                                    textStyle: {
                                        fontSize: 12,
                                        color: 'rgba(0,0,0,1)'
                                    }
                                },
                                emphasis: {
                                    textStyle: {
                                        color: 'rgba(255,255,255,1)'
                                    }
                                }
                            }
                        }
                    ]
                });
            });
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
    .cont-center-cont1 {
        height: 56%;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.03);
        background-image: url(../../../assets/boxbg.png);
        background-size: 100% 100%;
    }
}
</style>
