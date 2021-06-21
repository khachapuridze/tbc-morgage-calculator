import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueMq from 'vue-mq';
import ElementUI from 'element-ui';

import Swiper, { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';
import './assets/main.css';

import VueAwesomeSwiper from 'vue-awesome-swiper';

import 'swiper/swiper-bundle.css';

Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;
Swiper.use([Navigation, Pagination, Scrollbar, Autoplay]);
Vue.use(VueMq, {
	breakpoints: {
		phone: 767,
		tablet: 1025,
		md: 1365,
		lg: 1599,
	},
	defaultBreakpoint: 'sm', // customize this for SSR
});
Vue.use(ElementUI);
new Vue({
	router,
	store,
	render: function(h) {
		return h(App);
	},
}).$mount('#app');
