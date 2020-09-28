<template>
  <div class="index">
    <div>
      <div class="header">
        <h1>湖南智慧卫监—在线监管</h1>
        <span class="time">{{nowTime}}</span>
        <span class="set-box">
          <!-- <a href="/home" class="setting">进入管理</a> -->
          <router-link to="/first" class="setting">进入管理</router-link>
          <a href="javascript:;" class="setting">视频插件</a>
          <a href="/" class="logout">退出</a>
        </span>
      </div>
      <div class="count">
        <div class="total">
          <span class="white" style="margin-right:10px;">接入数</span>
          <span class="green">当日在线监测数</span>
        </div>
        <div class="quality">
          <h5>医废检测</h5>
          <div class="white">
            <span class="white">6</span> |
            <span class="green">0</span>
          </div>
        </div>
        <!-- <div class="quality">
          <h5>水质检测</h5>
          <div class="white">
            <span class="white">3</span> |
            <span class="green">0</span>
          </div>
        </div> -->
      </div>
      <div style="font-weight: 700;padding: 12px 45px;">
        <a href="#" class="orange" style="font-size:14px;">医废监测中心</a>
      </div>
    </div>
    <div class="content">
      <div class="cont-left">
        <div class="cont-left-cont1">
          <h5 class="cont-title">医废收集总量统计</h5>
          <div class="cont-main">
            <div class="waste-count">
              <span>
                总重量:
                <i>0.00</i>
              </span>
              <span>
                总包次:
                <i>0</i>
              </span>
            </div>
            <div id="wasteCharts" style="width:100%;height:calc(100% - 32px)"></div>
          </div>
        </div>
        <div class="cont-left-cont2">
          <h5 class="cont-title">各类预警处理统计</h5>
          <div class="cont-main" id="warningCharts"></div>
        </div>
      </div>
      <div class="cont-center">
        <div class="cont-center-cont1" id="mapChart"></div>
        <div class="cont-center-cont2">
          <h5 class="cont-title">异常处理情况</h5>
          <div class="cont-main">
            <table
              class="table table2"
              border="0"
              cellspacing="0"
              cellpadding="0"
              style="width: 100%;"
            >
              <tr>
                <td>暂无数据</td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="cont-right">
        <div class="cont-right-cont1">
          <h5 class="cont-title" style="position:relative;">
            监管区域详情
            <span
              style="position:absolute;font-size: 15px;color: #a6e22e;right:50px;top: 13px;"
            >合计:6家 | 在线:0</span>
          </h5>
          <div class="cont-main">
            <table
              id="cityStatic"
              width="100%"
              class="tableIndex table table-hover"
              style="margin-top: 0px;"
              border="0"
              cellspacing="0"
              cellpadding="0"
            >
              <thead>
                <tr>
                  <th style="width: 125px; " data-field="hospitalName">监管区域</th>
                  <th style data-field="collectType">接入数量</th>
                  <th style data-field="onlineCount">在线数量</th>
                  <th style data-field="articleQuality">医废重量</th>
                  <th style data-field="packageCount">医废包次</th>
                </tr>
              </thead>
              <tbody>
                <tr data-index="0">
                  <td style="width: 125px; ">合计</td>
                  <td style>6</td>
                  <td style>0</td>
                  <td style>0</td>
                  <td style>0</td>
                </tr>
                <tr data-index="1">
                  <td style="width: 125px; ">长沙市</td>
                  <td style>3</td>
                  <td style>0</td>
                  <td style>0</td>
                  <td style>0</td>
                </tr>
                <tr data-index="2">
                  <td style="width: 125px; ">张家界市</td>
                  <td style>1</td>
                  <td style>0</td>
                  <td style>0</td>
                  <td style>0</td>
                </tr>
                <tr data-index="3">
                  <td style="width: 125px; ">岳阳市</td>
                  <td style>1</td>
                  <td style>0</td>
                  <td style>0</td>
                  <td style>0</td>
                </tr>
                <tr data-index="4">
                  <td style="width: 125px; ">衡阳市</td>
                  <td style>1</td>
                  <td style>0</td>
                  <td style>0</td>
                  <td style>0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index", // eslint-disable-next-line
  data: function () {
    return {
      nowTime: "",
    };
  },
  mounted() {
    // 当前时间
    this.nowTimes();
    this.wasteCharts();
    this.warningCharts();
    this.loadMap("43000", "湖南省");
  },
  methods: {
    // 医废收集总量统计
    wasteCharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("wasteCharts"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            textStyle: {
              color: "#fff",
              fontSize: 12,
            },
          },
        },
        legend: {
          top: "10",
          right: "center",
          // orient: 'vertical',
          data: ["总重量", "总包次"],
          itemWidth: 20,
          itemHeight: 10,
          textStyle: {
            fontSize: 12,
            color: "#e8eef5",
          },
          icon: "rect",
        },
        grid: {
          top: 40,
          left: 50,
          bottom: 30,
          right: 50,
        },
        xAxis: [
          {
            name: "",
            nameTextStyle: {
              color: "#e8eef5",
              fontSize: 12,
              padding: [0, 0, 0, -5],
            },
            type: "category",
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#096ad2",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#e8eef5",
              fontSize: 12,
              margin: 5,
            },
            data: ["感染性", "损伤性", "药物性", "病理性", "化学性"],
          },
        ],
        yAxis: [
          {
            name: "",
            nameTextStyle: {
              color: "#e8eef5",
              fontSize: 12,
              padding: [0, 0, 0, -5],
            },
            max: function (value) {
              if (value.max < 5) {
                return 5;
              } else {
                return value.max;
              }
            },
            type: "value",
            axisLine: {
              show: true,
              lineStyle: {
                color: "#096ad2",
              },
            },
            axisLabel: {
              color: "#e8eef5",
              fontSize: 12,
              margin: 5,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "总重量",
            type: "bar",
            label: {
              show: false,
              position: "top",
              fontSize: 14,
              color: "#3DC3F0",
              fontWeight: "bold",
            },
            barMaxWidth: 8,
            itemStyle: {
              color: "#66cdaa",
            },
            data: [60, 110, 180, 100, 250],
          },
          {
            name: "总包次",
            type: "bar",
            label: {
              show: false,
              position: "top",
              fontSize: 14,
              color: "#3D8BF0",
              fontWeight: "bold",
            },
            barMaxWidth: 8,
            itemStyle: {
              color: "#dcff3c",
            },
            data: [90, 130, 170, 130, 150],
          },
        ],
      });
    },
    // 各类预警处理统计
    warningCharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(
        document.getElementById("warningCharts")
      );
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            textStyle: {
              color: "#fff",
              fontSize: 12,
            },
          },
        },
        legend: {
          top: "10",
          right: "center",
          // orient: 'vertical',
          data: ["已完成", "未完成"],
          itemWidth: 20,
          itemHeight: 10,
          textStyle: {
            fontSize: 12,
            color: "#e8eef5",
          },
          icon: "rect",
        },
        grid: {
          top: 40,
          left: 100,
          bottom: 40,
          right: 50,
        },
        xAxis: {
          name: "",
          nameTextStyle: {
            color: "#e8eef5",
            fontSize: 12,
            padding: [0, 0, 0, -5],
          },
          max: function (value) {
            if (value.max < 5) {
              return 5;
            } else {
              return value.max;
            }
          },
          type: "value",
          axisLine: {
            show: true,
            lineStyle: {
              color: "#096ad2",
            },
          },
          axisLabel: {
            color: "#e8eef5",
            fontSize: 12,
            margin: 5,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          name: "",
          nameTextStyle: {
            color: "#e8eef5",
            fontSize: 12,
            padding: [0, 0, 0, -5],
          },
          type: "category",
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#096ad2",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#e8eef5",
            fontSize: 12,
            margin: 5,
          },
          data: [
            "违规交接预警",
            "出库重量预警",
            "入库重量预警",
            "未出医废预警",
            "泄露预警",
            "遗失预警",
            "破损预警",
            "入库超时预警",
            "出库超时预警",
          ],
        },
        series: [
          {
            name: "已完成",
            type: "bar",
            label: {
              show: false,
              position: "top",
              fontSize: 14,
              color: "#66cdaa",
              fontWeight: "bold",
            },
            barMaxWidth: 8,
            itemStyle: {
              color: "#00effa",
            },
            data: [60, 110, 180, 100, 250, 160, 100, 250, 160],
          },
          {
            name: "未完成",
            type: "bar",
            label: {
              show: false,
              position: "top",
              fontSize: 14,
              color: "#3D8BF0",
              fontWeight: "bold",
            },
            barMaxWidth: 8,
            itemStyle: {
              color: "#ff6347",
            },
            data: [90, 130, 170, 130, 150, 240, 130, 170, 130],
          },
        ],
      });
    },
    /**
 加载地图：根据地图所在省市的行政编号，
 获取对应的json地图数据，然后向echarts注册该区域的地图
 最后加载地图信息
 @params {String} mapCode:地图行政编号,for example['中国':'100000', '湖南': '430000']
 @params {String} mapName: 地图名称
 */
    loadMap(mapCode, mapName) {
      // var myChart = echarts.init(document.getElementById('mapChart'));
      var myChart = this.$echarts.init(document.getElementById("mapChart"));
      var uploadedDataURL = "43000.json";
      let that = this;
      $.getJSON(uploadedDataURL, function (geoJson) {
        that.$echarts.registerMap("hunan", geoJson);
        myChart.hideLoading();
        var geoCoordMap = {};
        var data1 = [
          { name: "长沙市", value: 3, attr3: 3, attr4: 1, attr5: 56 },
          { name: "株洲市", value: 0, attr3: 0, attr4: 0, attr5: 99 },
          { name: "湘潭市", value: 0, attr3: 0, attr4: 0, attr5: 98 },
          { name: "衡阳市", value: 0, attr3: 0, attr4: 0, attr5: 68 },
          { name: "邵阳市", value: 3, attr3: 3, attr4: 2, attr5: 60 },
          { name: "岳阳市", value: 0, attr3: 0, attr4: 0, attr5: 100 },
          { name: "常德市", value: 0, attr3: 0, attr4: 0, attr5: 85 },
          { name: "张家界市", value: 0, attr3: 0, attr4: 0, attr5: 79 },
          { name: "益阳市", value: 1, attr3: 1, attr4: 1, attr5: 30 },
          { name: "娄底市", value: 0, attr3: 0, attr4: 0, attr5: 60 },
          { name: "郴州市", value: 0, attr3: 0, attr4: 0, attr5: 80 },
          { name: "永州市", value: 0, attr3: 0, attr4: 0, attr5: 88 },
          { name: "怀化市", value: 0, attr3: 0, attr4: 0, attr5: 87 },
          {name: "湘西土家族苗族自治州", value: 0, attr3: 0, attr4: 0, attr5: 70,}
        ];

        myChart.setOption({
          tooltip: {
            //formatter :'{b}<br/>采购量:{c}万元<br/>已采购：{d}万元'
            formatter: function (params) {
              //alert(JSON.stringify(params));
              var res = "<div><p>" + params.name + "</p></div>";
              res += "<p>医院总数:" + params.data.attr3 + "</p>";
              res += "<p>异常医院数:" + params.data.attr4 + "</p>";
              return res;
            },
          },
          visualMap: {
            show: false,
            min: 0,
            max: 6,
            text: ["高", "低"],
            realtime: false,
            calculable: true,
            inRange: {
              color: ["#eeeeee", "#d2e9ff", "#d2e9ff", "#d2e9ff", "#d2e9ff"],
            },
            textStyle: {
              color: "#000",
            },
          },

          series: [
            {
              name: "地图数据",
              type: "map",
              aspectScale: 1.95,
              zoom: 1.2,
              roam: true, //是否开启鼠标缩放和平移漫游
              mapType: "hunan", // 自定义扩展图表类型
              itemStyle: {
                normal: {
                  borderColor: "#dddddd",
                },
                emphasis: {
                  label: {
                    show: true,
                    textStyle: {
                      color: "darkslategray",
                    },
                  },
                },
              },
              data: data1,
              label: {
                //区域名样式
                normal: {
                  show: true,
                  textStyle: {
                    fontSize: 12,
                    color: "rgba(0,0,0,1)",
                  },
                },
                emphasis: {
                  textStyle: {
                    color: "rgba(255,255,255,1)",
                  },
                },
              },
            },
          ],
        });
      });
    },
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? "0" + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds();
      let week = new Date(timeStamp).getDay();
      let weeks = ["日", "一", "二", "三", "四", "五", "六"];
      let getWeek = "星期" + weeks[week];
      this.nowTime = year +"年" + month + "月" + date + "日" + " " + hh + ":" + mm + ":" + ss + "  " + getWeek;
      },
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
      this.clear();
    },
    clear() {
      clearInterval(this.nowTimes);
      this.nowTimes = null;
    },
  },
};
</script>

<style lang="less" scoped>

a {
  outline: none;
}
a:hover {
  text-decoration: underline;
}
.white {
  color: #e0f7fa;
}
.green {
  color: #00c853;
}
.orange {
  color: #f2ae43;
}
.index {
  height: 100%;
  background: url(../assets/bg.png) no-repeat 50% 0;
  position: relative;
}
.header {
  position: relative;
  height: 70px;
  h1 {
    font-size: 40px;
    font-weight: 700;
    line-height: 75px;
    background: linear-gradient(to right, greenyellow, red);
    -webkit-background-clip: text;
    text-align: center;
    color: transparent;
  }
}
.time {
  position: absolute;
  top: 50px;
  left: 30px;
  font-size: 14px;
  color: #fff;
}
.set-box {
  position: absolute;
  top: 50px;
  right: 30px;
  a {
    font-size: 14px;
    color: #fff;
    padding-left: 14px;
    margin-left: 4px;
  }
  .setting {
    background: url(../assets/setting.png) no-repeat left center/14px;
  }
  .logout {
    background: url(../assets/logout.png) no-repeat left center/16px;
  }
}
.count {
  margin-left: 10%;
  padding-top: 20px;
}
.total {
  padding: 35px 30px 10px;
  background: rgba(65, 242, 251, 0.1);
  display: inline-block;
  border-radius: 10px;
  vertical-align: top;
  span {
    font-size: 14px;
  }
}
.quality {
  padding: 10px 10px;
  background: rgba(65, 242, 251, 0.1);
  display: inline-block;
  border-radius: 10px;
  margin-left: 50px;
  h5 {
    color: #e3cf7a;
    margin-bottom: 20px;
    text-align: center;
  }
  div {
    span {
      font-size: 18px;
      margin: 0 20px;
    }
  }
}
.content {
  height: calc(100% - 211px);
  display: flex;
  .cont-left {
    width: 25%;
    height: 100%;
    padding: 0 15px;
  }
  .cont-center {
    width: 50%;
    height: 100%;
    padding: 0 15px;
  }
  .cont-right {
    width: 25%;
    height: 100%;
    padding: 0 15px;
  }
}
.cont-left-cont1 {
  height: 36%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.03);
  background-image: url(../assets/boxbg.png);
  background-size: 100% 100%;
}
.cont-left-cont2 {
  height: 56%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.03);
  background-image: url(../assets/boxbg.png);
  background-size: 100% 100%;
  margin-top: 12px;
}
.cont-title {
  color: #f2ae43;
  font-weight: 700;
  font-size: 18px;
  padding: 10px;
}
.cont-main {
  height: calc(100% - 40px);
  overflow: hidden;
}
.cont-center-cont1 {
  height: 56%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.03);
  background-image: url(../assets/boxbg.png);
  background-size: 100% 100%;
}
.cont-center-cont2 {
  height: 36%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.03);
  background-image: url(../assets/boxbg.png);
  background-size: 100% 100%;
  margin-top: 12px;
}
.cont-right-cont1 {
  height: calc(92% + 12px);
  width: 100%;
  background-color: rgba(255, 255, 255, 0.03);
  background-image: url(../assets/boxbg.png);
  background-size: 100% 100%;
}
.waste-count {
  text-align: center;
}
.waste-count span {
  margin: 0 10px;
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  line-height: 26px;
  padding: 2px 12px;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  i {
    font-style: normal;
    font-size: 22px;
    font-weight: bold;
  }
}
.table {
  color: #fff;
  font-size: 14px;
  div {
    padding: 8px;
    text-align: center;
  }
  tr th,
  tr td {
    padding: 8px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.15);
    // border-top: 1px solid #ddd;
  }
  tr:hover {
    background: #000;
  }
}
.table2 {
  animation: myMove 15s linear infinite;
  animation-fill-mode: forwards;
}
@keyframes myMove {
  0% {
    transform: translateY(250px);
  }
  100% {
    transform: translateY(-50px);
  }
}
</style>