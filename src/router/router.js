import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Home from '../components/common/Home.vue'


Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      // console.log('路由-前置-钩子')
      next()
    }
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
  },
  //录入管理
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin/Admin.vue'),
  },
  {
    path: '/home',
    component: Home,
    meta: { title: '首页' },
    children: [
      {
        path: '/first',
        component: () => import('../components/page/index/Index.vue'),
        meta: { title: '系统首页' }
      },
      //自定义查询
      {
        path: '/weight',
        component: () => import('../components/page/weight/Weightstatistics.vue'),
        meta: { title: '重量统计' }
      },
      {
        path: '/warning',
        component: () => import('../components/page/weight/Warningstatistics.vue'),
        meta: { title: '预警统计' }
      },
      //公告管理
      {
        path: '/input',
        component: () => import('../components/page/input/Input.vue'),
        meta: { title: '公告录入' }
      },
      {
        path: '/see',
        component: () => import('../components/page/input/See.vue'),
        meta: { title: '公告查看' }
      },
      //资料上报
      {
        path: '/upload',
        component: () => import('../components/page/reporting/Upload.vue'),
        meta: { title: '上报计划' }
      },
      {
        path: '/markdown',
        component: () => import('../components/page/reporting/VueEditor.vue'),
        meta: { title: '信息上报' }
      },
      {
        path: '/mechanism',
        component: () => import('../components/page/reporting/Markdown.vue'),
        meta: { title: '机构信息' }
      },
      //日常巡查Inspection
      {
        path: '/standard',
        component: () => import('../components/page/Inspection/Standard.vue'),
        meta: { title: '违规标准' }
      },
      {
        path: '/inspect',
        component: () => import('../components/page/Inspection/Inspect.vue'),
        meta: { title: '违规检查' },
      },
      //点击新增按钮进入违规录入
      {
        path: '/addone',
        component: () => import('../components/page/Inspection/components/Addone.vue'),
        meta: { title: '违规录入' },
      },
      //违规查看VioSee
      {
        path: '/VioSee',
        name: 'VioSee',
        component: () => import('../components/page/Inspection/components/Viosee.vue'),
        meta: { title: '违规查看' },
      },
      {
        path: '/history',
        component: () => import('../components/page/Inspection/History.vue'),
        meta: { title: '违规历史' }
      },
      //监督管理
      {
        path: '/weightst',
        component: () => import('../components/page/supervise/Weightst.vue'),
        meta: { title: '重量统计' }
      },
      {
        path: '/organization',
        component: () => import('../components/page/supervise/Organization.vue'),
        meta: { title: '医废分级机构' }
      },
      {
        path: '/municipal',
        component: () => import('../components/page/supervise/Municipal.vue'),
        meta: { title: '市级报表统计' }
      },
      {
        path: '/regional',
        component: () => import('../components/page/supervise/Regional.vue'),
        meta: { title: '区域医废报表' }
      },
      {
        path: '/medical',
        component: () => import('../components/page/supervise/Medical.vue'),
        meta: { title: '医院医废报表' }
      },
      {
        path: '/early',
        component: () => import('../components/page/supervise/Early.vue'),
        meta: { title: '医院预警报表' }
      },
      {
        path: '/warn',
        component: () => import('../components/page/supervise/Warn.vue'),
        meta: { title: '预警统计' }
      },
      {
        path: '/regionalearly',
        component: () => import('../components/page/supervise/Regionalearly.vue'),
        meta: { title: '区域预警报表' }
      },
      {
        path: '/classified',
        component: () => import('../components/page/supervise/Classified.vue'),
        meta: { title: '医废分级汇总' }
      },
      //报表统计
      {
        path: '/workload',
        component: () => import('../components/page/report/Workload.vue'),
        meta: { title: '工作量报表' }
      },
      {
        path: '/department',
        component: () => import('../components/page/report/Department.vue'),
        meta: { title: '科室医废报表' }
      },
      {
        path: '/type',
        component: () => import('../components/page/report/Type.vue'),
        meta: { title: '医废类型报表' }
      },
      {
        path: '/notout',
        component: () => import('../components/page/report/Notout.vue'),
        meta: { title: '未出预警报表' }
      },
      {
        path: '/violations',
        component: () => import('../components/page/report/Violations.vue'),
        meta: { title: '违规预警报表' }
      },
      {
        path: '/earlytype',
        component: () => import('../components/page/report/Earlytype.vue'),
        meta: { title: '预警类型报表' }
      },
      //车辆定位
      {
        path: '/collector',
        component: () => import('../components/page/car/Collector.vue'),
        meta: { title: '收集人' }
      },
      {
        path: '/line',
        component: () => import('../components/page/car/Line.vue'),
        meta: { title: '线路配置' }
      },
      {
        path: '/realtime',
        component: () => import('../components/page/car/Realtime.vue'),
        meta: { title: '实时轨迹' }
      },
      {
        path: '/historical',
        component: () => import('../components/page/car/Historical.vue'),
        meta: { title: '历史轨迹' }
      },
      //医废收集collection
      {
        path: '/collection',
        component: () => import('../components/page/collection/Collection.vue'),
        meta: { title: '医废收集' }
      },
      {
        path: '/storage',
        component: () => import('../components/page/collection/Storage.vue'),
        meta: { title: '医废入库' }
      },
      {
        path: '/collecthistory',
        component: () => import('../components/page/collection/Collecthistory.vue'),
        meta: { title: '收集历史' }
      },
      //医废出库
      {
        path: '/maintain',
        component: () => import('../components/page/outlibrary/Maintain.vue'),
        meta: { title: '信息维护' }
      },
      {
        path: '/operation',
        component: () => import('../components/page/outlibrary/Operation.vue'),
        meta: { title: '出库操作' }
      },
      {
        path: '/record',
        component: () => import('../components/page/outlibrary/Record.vue'),
        meta: { title: '出库记录' }
      },
      //医废预警
      {
        path: '/abnormal',
        component: () => import('../components/page/warn/Abnormal.vue'),
        meta: { title: '异常预警' }
      },
      {
        path: '/management',
        component: () => import('../components/page/warn/Management.vue'),
        meta: { title: '预警处置' }
      },
      {
        path: '/earlyrecord',
        component: () => import('../components/page/warn/Earlyrecord.vue'),
        meta: { title: '预警记录' }
      },
      //预警推送
      {
        path: '/push',
        component: () => import('../components/page/push/Push.vue'),
        meta: { title: '预警推送' }
      },
      //统计分析
      {
        path: '/statistics',
        component: () => import('../components/page/statistics/Statistics.vue'),
        meta: { title: '科室医废统计' }
      },
      {
        path: '/Monitoring',
        component: () => import('../components/page/statistics/Monitoring.vue'),
        meta: { title: '监测点医废统计' }
      },
      //预警分析
      {
        path: '/analysis',
        component: () => import('../components/page/analysis/Analysis.vue'),
        meta: { title: '科室预警分析' }
      },
      //视频监控
      {
        path: '/video',
        component: () => import('../components/page/monitor/Video.vue'),
        meta: { title: '视频监控' }
      },
      //设备管理equipment
      {
        path: '/equipment',
        component: () => import('../components/page/equipment/Equipment.vue'),
        meta: { title: '设备管理' }
      },
      //信息补录information
      {
        path: '/information',
        component: () => import('../components/page/information/Information.vue'),
        meta: { title: '医废补录' }
      },
      {
        path: '/examine',
        component: () => import('../components/page/information/Examine.vue'),
        meta: { title: '补录审核' }
      },
      //系统帮助
      {
        path: '/help',
        component: () => import('../components/page/help/Help.vue'),
        meta: { title: '系统帮助' }
      },
      //数据字典
      {
        path: '/zidian',
        component: () => import('../components/page/dictionaries/Zidian.vue'),
        meta: { title: '数据字典' }
      },

    ]
  },

  ]
})

router.beforeEach((to, from, next) => { /* 全局前置钩子 */
  // console.log('全局-前置-钩子')
  next()
})
router.beforeResolve((to, from, next) => { /* 全局解析守卫 */
  // console.log('全局-解析-守卫')
  next()
})
router.afterEach((to, from) => { /* 全局后置钩子 */
  // console.log('全局-后置-钩子')
})


// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

export default router
