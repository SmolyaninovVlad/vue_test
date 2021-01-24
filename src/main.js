import Vue from 'vue';
import InputMask from 'vue-input-mask';

import App from './App.vue';

import './assets/css/main.scss';

Vue.component('input-mask', InputMask);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
