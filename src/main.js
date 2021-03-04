import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
Vue.use(ElementUI);

import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
Vue.component("mavon-editor", mavonEditor);

import VueDOMPurifyHTML from 'vue-dompurify-html'
Vue.use(VueDOMPurifyHTML)

import "./assets/css/main.css"

import VeHistogram from 'v-charts/lib/histogram';
Vue.component(VeHistogram.name, VeHistogram);
import VePie from 'v-charts/lib/pie';
Vue.component(VePie.name, VePie);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
