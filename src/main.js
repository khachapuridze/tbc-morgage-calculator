import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Swiper, { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';
import './assets/main.css';

import VueAwesomeSwiper from 'vue-awesome-swiper';

import 'swiper/swiper-bundle.css';

Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;
Swiper.use([Navigation, Pagination, Scrollbar, Autoplay]);
new Vue({
	router,
	store,
	render: function(h) {
		return h(App);
	},
}).$mount('#app');
