require('@/assets/main.scss');

import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import VueResoure from 'vue-resource';
import routes from './routes';
import makeStore from './store/store';
import Vuex from "vuex";
import lodash from 'lodash';  

Vue.config.productionTip = false;
Object.defineProperty(Vue.prototype, '$lodash', { value: lodash });
Vue.use(VueRouter);
Vue.use(VueResoure);
Vue.use(Vuex);

const router = new VueRouter({routes});

const store = makeStore();

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');