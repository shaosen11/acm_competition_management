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

// import VCharts from 'v-charts'
// Vue.use(VCharts)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
