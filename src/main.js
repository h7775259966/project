import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import './registerServiceWorker'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import echarts from 'echarts'
//element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; //默认主题
import './components/common/directives';
import 'babel-polyfill';


// 导入bootstrap
// import "bootstrap"
// import 'bootstrap/dist/js/bootstrap.min.js';
// import "bootstrap/dist/css/bootstrap.css"
import $ from 'jquery';


//vxe-table表格插件
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
Vue.use(VXETable)
// 给 vue 实例挂载全局窗口对象，例如：
Vue.prototype.$XModal = VXETable.modal
// 给 vue 实例挂载全局打印对象，例如：
Vue.prototype.$XPrint = VXETable.print


//xe-ajax异步请求数据
import XEAjax from 'xe-ajax'
Vue.prototype.$ajax = XEAjax
 


Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'small'
});

/* requireComponent 包含基础模块的文件集合 */
const requireComponent = require.context(
  /* 在 ./components/Base 文件夹中寻找基础模块 */
  './components/Base',
  /* 是否包含子文件夹 */
  true,
  /* 只要是 .vue 结尾的文件都是基础模块 */
  /[\w-]+\.vue$/
)

/* 对这个文件集合进行遍历 - import - 全局注册 */
requireComponent.keys().forEach(fileName => {
  /* 获取组件配置 */
  const componentConfig = requireComponent(fileName)
  /* 从文件名中得到组件名 */
  const componentName = upperFirst(
    camelCase(
      fileName
      /* 移除开头的 "./_" */
        .replace(/^\.\/_/, '')
      /* 去掉文件的后缀名，也即 .vue */
        .replace(/\.\w+$/, '')
    )
  )
  /* 全局注册组件 */
  Vue.component(componentName, componentConfig.default || componentConfig)
})

VXETable.setup({
  icon: {
    // table
    TABLE_SORT_ASC: 'vxe-icon--caret-top',
    TABLE_SORT_DESC: 'vxe-icon--caret-bottom',
    TABLE_FILTER_NONE: 'vxe-icon--funnel',
    TABLE_FILTER_MATCH: 'vxe-icon--funnel',
    TABLE_EDIT: 'vxe-icon--edit-outline',
    TABLE_TREE_LOADED: 'vxe-icon--refresh roll',
    TABLE_TREE_OPEN: 'vxe-icon--caret-right rotate90',
    TABLE_TREE_CLOSE: 'vxe-icon--caret-right',
    TABLE_EXPAND_LOADED: 'vxe-icon--refresh roll',
    TABLE_EXPAND_OPEN: 'vxe-icon--arrow-right rotate90',
    TABLE_EXPAND_CLOSE: 'vxe-icon--arrow-right',

    // button
    BUTTON_DROPDOWN: 'vxe-icon--arrow-bottom',
    BUTTON_LOADING: 'vxe-icon--refresh roll',

    // select
    SELECT_OPEN: 'vxe-icon--caret-bottom rotate180',
    SELECT_CLOSE: 'vxe-icon--caret-bottom',

    // pager
    PAGER_JUMP_PREV: 'vxe-icon--d-arrow-left',
    PAGER_JUMP_NEXT: 'vxe-icon--d-arrow-right',
    PAGER_PREV_PAGE: 'vxe-icon--arrow-left',
    PAGER_NEXT_PAGE: 'vxe-icon--arrow-right',
    PAGER_JUMP_MORE: 'vxe-icon--more',

    // input
    INPUT_CLEAR: 'vxe-icon--close',
    INPUT_PWD: 'vxe-icon--eye-slash',
    INPUT_SHOW_PWD: 'vxe-icon--eye',
    INPUT_PREV_NUM: 'vxe-icon--caret-top',
    INPUT_NEXT_NUM: 'vxe-icon--caret-bottom',
    INPUT_DATE: 'vxe-icon--calendar',
    INPUT_SEARCH: 'vxe-icon--search',

    // modal
    MODAL_ZOOM_IN: 'vxe-icon--square',
    MODAL_ZOOM_OUT: 'vxe-icon--zoomout',
    MODAL_CLOSE: 'vxe-icon--close',
    MODAL_INFO: 'vxe-icon--info',
    MODAL_SUCCESS: 'vxe-icon--success',
    MODAL_WARNING: 'vxe-icon--warning',
    MODAL_ERROR: 'vxe-icon--error',
    MODAL_QUESTION: 'vxe-icon--question',
    MODAL_LOADING: 'vxe-icon--refresh roll',

    // toolbar
    TOOLBAR_TOOLS_REFRESH: 'vxe-icon--refresh',
    TOOLBAR_TOOLS_REFRESH_LOADING: 'vxe-icon--refresh roll',
    TOOLBAR_TOOLS_IMPORT: 'vxe-icon--upload',
    TOOLBAR_TOOLS_EXPORT: 'vxe-icon--download',
    TOOLBAR_TOOLS_ZOOM_IN: 'vxe-icon--zoomin',
    TOOLBAR_TOOLS_ZOOM_OUT: 'vxe-icon--zoomout',
    TOOLBAR_TOOLS_CUSTOM: 'vxe-icon--menu',

    // form
    FORM_PREFIX: 'vxe-icon--info',
    FORM_SUFFIX: 'vxe-icon--info',
    FORM_FOLDING: 'vxe-icon--arrow-top rotate180',
    FORM_UNFOLDING: 'vxe-icon--arrow-top'
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


