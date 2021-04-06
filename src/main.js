import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';

Vue.use(ElementUI);

import {mavonEditor} from "mavon-editor";
import "mavon-editor/dist/css/index.css";

Vue.component("mavon-editor", mavonEditor);

import VueDOMPurifyHTML from 'vue-dompurify-html'

Vue.use(VueDOMPurifyHTML)

import "./assets/css/main.css"

import VeHistogram from 'v-charts/lib/histogram';

Vue.component(VeHistogram.name, VeHistogram);
import VePie from 'v-charts/lib/pie';

Vue.component(VePie.name, VePie);
import VeLine from 'v-charts/lib/line.common'

Vue.component(VeLine.name, VeLine)
import VeRadar from 'v-charts/lib/radar.common'

Vue.component(VeRadar.name, VeRadar)
// 引入echarts

//引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入饼状图组件
require('echarts/lib/chart/radar')
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
Vue.prototype.$echarts = echarts //引入组件
Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
