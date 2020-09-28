<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <!-- <el-submenu index="1">
              <template slot="title"><i class="el-icon-first-aid-kit"></i>医废监测</template>
              
            </el-submenu>-->
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-s-home',
                    index: 'first',
                    title: '首页'
                },

                {
                    icon: 'el-icon-s-operation',
                    index: 'chaxun',
                    title: '自定义查询',
                    subs: [
                        {
                            index: 'weight',
                            title: '重量统计'
                        },
                        {
                            index: 'warning',
                            title: '预警统计'
                        }
                    ]
                },
                {
                    icon: 'el-icon-chat-square',
                    index: 'gonggao',
                    title: '公告管理',
                    subs: [
                        {
                            index: 'input',
                            title: '公告录入'
                        },
                        {
                            index: 'see',
                            title: '公告查看'
                        }
                    ]
                },
                {
                    icon: 'el-icon-upload',
                    index: 'shangbao',
                    title: '资料上报',
                    subs: [
                        {
                            index: 'upload',
                            title: '上报计划'
                        },
                        {
                            index: 'markdown',
                            title: '信息上报'
                        },
                        {
                            index: 'mechanism',
                            title: '机构信息'
                        }
                    ]
                },
                {
                    icon: 'el-icon-s-custom',
                    index: 'icon',
                    title: '日常巡查',
                    subs: [
                        {
                            index: 'standard',
                            title: '违规标准'
                        },
                        {
                            index: 'inspect',
                            title: '违规检查'
                        },
                        {
                            index: 'history',
                            title: '违规历史'
                        }
                    ]
                },
                {
                    icon: 'el-icon-thumb',
                    index: 'charts',
                    title: '监督管理',
                    subs: [
                        {
                            index: 'weightst',
                            title: '重量统计'
                        },
                        {
                            index: 'organization',
                            title: '医废分级机构'
                        },
                        {
                            index: 'municipal',
                            title: '市级报表统计'
                        },
                        {
                            index: 'Regional',
                            title: '区域医废报表'
                        },
                        {
                            index: 'medical',
                            title: '医院医废报表'
                        },
                        {
                            index: 'early',
                            title: '医院预警报表'
                        },
                        {
                            index: 'warn',
                            title: '预警统计'
                        },
                        {
                            index: 'regionalearly ',
                            title: '区域预警报表'
                        },
                        {
                            index: 'classified',
                            title: '医废分级汇总'
                        }
                    ]
                },
                {
                    icon: 'el-icon-tickets',
                    index: 'baobiao',
                    title: '报表统计',
                    subs: [
                        {
                            index: 'workload',
                            title: '工作量报表'
                        },
                        {
                            index: 'department',
                            title: '科室医废报表'
                        },
                        {
                            index: 'type',
                            title: '医废类型报表'
                        },
                        {
                            index: 'notout',
                            title: '未出预警报表'
                        },
                        {
                            index: 'violations',
                            title: '违规预警报表'
                        },
                        {
                            index: 'earlytype',
                            title: '预警类型报表'
                        }
                    ]
                },
                {
                    icon: 'el-icon-location-information',
                    index: 'i18n',
                    title: '车辆定位',
                    subs: [
                        {
                            index: 'collector',
                            title: '收集人'
                        },
                        {
                            index: 'line',
                            title: '线路配置'
                        },
                        {
                            index: 'realtime',
                            title: '实时轨迹'
                        },
                        {
                            index: 'historical',
                            title: '历史轨迹'
                        }
                    ]
                },
                {
                    icon: 'el-icon-first-aid-kit',
                    index: 'yifei',
                    title: '医废收集',
                    subs: [
                        {
                            index: 'collection',
                            title: '医废收集'
                        },
                        {
                            index: 'storage',
                            title: '医废入库'
                        },
                        {
                            index: 'collecthistory',
                            title: '收集历史'
                        }
                    ]
                },
                {
                    icon: 'el-icon-truck',
                    index: '/warehouse',
                    title: '医废出库',
                    subs: [
                        {
                            index: 'maintain',
                            title: '信息维护'
                        },
                        {
                            index: 'operation',
                            title: '出库操作'
                        },
                        {
                            index: 'record',
                            title: '出库记录'
                        }
                    ]
                },
                {
                    icon: 'el-icon-message-solid',
                    index: '/donate',
                    title: '医废预警',
                    subs: [
                        {
                            index: 'abnormal',
                            title: '异常预警'
                        },
                        {
                            index: 'management',
                            title: '预警处置'
                        },
                        {
                            index: 'earlyrecord',
                            title: '预警记录'
                        }
                    ]
                },
                {
                    icon: 'el-icon-guide',
                    index: '/push',
                    title: '预警推送'
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: 'tongji',
                    title: '统计分析',
                    subs: [
                        {
                            index: 'statistics',
                            title: '科室医废统计'
                        },
                        {
                            index: 'monitoring',
                            title: '监测点医废统计'
                        }
                    ]
                },
                {
                    icon: 'el-icon-data-line',
                    index: 'fengxi',
                    title: '预警分析',
                    subs: [
                        {
                            index: 'analysis',
                            title: '科室预警分析'
                        }
                    ]
                },
                {
                    icon: 'el-icon-video-camera',
                    index: 'video',
                    title: '视频监控'
                },
                {
                    icon: 'el-icon-mobile-phone',
                    index: 'equipment',
                    title: '设备管理'
                },
                {
                    icon: 'el-icon-folder-opened',
                    index: 'bulu',
                    title: '信息补录',
                    subs: [
                        {
                            index: 'information',
                            title: '医废补录'
                        },
                        {
                            index: 'examine',
                            title: '补录审核'
                        }
                    ]
                },
                {
                    icon: 'el-icon-question',
                    index: 'help',
                    title: '系统帮助'
                },

                {
                    icon: 'el-icon-document',
                    index: 'zidian',
                    title: '数据字典'
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', (msg) => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
}
.sidebar > ul {
    height: 100%;
}
</style>
