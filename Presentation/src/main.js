import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Chartkick.use(Chart));
Vue.config.productionTip = false;
Vue.config.silent = true;

Vue.prototype.$globals = { 
  exemploHub: "https://localhost:44385/exemploHub",
  endpoint: "https://localhost:44385/api/",
  modulo: "123",
  headerPadrao: { 
    'Usuario': JSON.parse(localStorage.getItem("login"))?.id,
    'Content-Type': 'application/json' 
  },
}

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
