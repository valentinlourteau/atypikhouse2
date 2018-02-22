// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
//libraries
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import vuexI18n from 'vuex-i18n';
import VueLocalStorage from 'vue-ls';
import VeeValidate from 'vee-validate';
import GoogleMapsLoader from 'google-maps';
//components
import Home from './components/view/Home';
import Account from './components/view/Account';
import Discover from './components/view/Discover';
import RealEstate from './components/view/realEstate/RealEstate';
import NewRealEstate from './components/view/realEstate/NewRealEstate';
//utils
import TD from './class/utils/TokenDecrypter';

Vue.use(Vuetify, { theme: {
  primary: '#FFEB3B',
  secondary: '#9E9E9E',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueLocalStorage); 
Vue.use(VueResource);

const veeValidateConfig = {
		  errorBagName: 'errors', // change if property conflicts
		  fieldsBagName: 'fields', 
		  delay: 0, 
		  locale: 'en', 
		  dictionary: null, 
		  strict: true, 
		  classes: true, 
		  classNames: {
		    touched: 'touched', // the control has been blurred
		    untouched: 'untouched', // the control hasn't been blurred
		    valid: 'valid', // model is valid
		    invalid: 'invalid', // model is invalid
		    pristine: 'pristine', // control has not been interacted with
		    dirty: 'dirty' // control has been interacted with
		  },
		  events: 'input|blur',
		  inject: true,
		  validity: false,
		  aria: true,
		  i18n: null, // the vue-i18n plugin instance
		  i18nRootKey: 'validations' // the nested key under which the
										// validation messsages will be located
		};

Vue.use(VeeValidate, veeValidateConfig);

Vue.config.productionTip = false

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/home', component: Home},
    { path: '/account', component: Account},
    { path: '/discover', component: Discover},
    { path: '/realEstate/home', component: RealEstate},
    { path: '/realEstate/new', component: NewRealEstate},
  ],
  mode: 'history'
});

const store = new Vuex.Store({
  state: {
	  user: Vue.ls.get("user"),
  },
  mutations: {
	  onSetToken(state, token) {
		  Vue.ls.set("token", token);
		  // On définit les headers
		  Vue.http.headers.common['Authorization'] = 'Bearer ' + token;
	  },
	  onSetUser(state, user) {
		  Vue.ls.set("user", user);
		  state.user = user;
	  }
  },
});

import translationsEn from './resources/translations/translation_en';
import translationsFr from './resources/translations/translation_fr';

Vue.use(vuexI18n.plugin, store);

GoogleMapsLoader.KEY = 'AIzaSyB1h7TjJ_nYVQn09j9JZsdVwD59C7Skp78';
GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
GoogleMapsLoader.LANGUAGE = 'fr';

export default store;

/* eslint-disable no-new */
var vue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

App.vue
