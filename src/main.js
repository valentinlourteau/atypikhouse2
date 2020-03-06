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
import PortalVue from 'portal-vue';
import VueLodash from 'vue-lodash';
import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer';
import VueAgile from 'vue-agile';
import moment from 'moment';
//pages
import Home from './components/view/Home';
import Account from './components/view/Account';
import Discover from './components/view/Discover';
import about from './components/view/About';
import Contact from './components/view/Contact';
import MyTrips from './components/view/MyTrips';
import TripDetail from './components/view/TripDetail';
import CGV from './components/view/CGV';
import CGU from './components/view/CGU';
import PlanSite from './components/view/PlanSite';
import MentionLegale from './components/view/MentionLegale';
import Inputs from './components/view/admin/Inputs';
import HealthCheck from './components/view/admin/HealthCheck';
import Manager from './components/view/Manager';
import ManageUsers from './components/view/ManageUsers';
import Alerte from './components/view/Alerte';
import RealEstate from './components/view/realEstate/RealEstate';
import NewRealEstate from './components/view/realEstate/NewRealEstate';
import RealEstateDetail from './components/view/realEstate/RealEstateDetail';
import Messages from './components/view/Messages'
import Notifications from './components/view/Notifications'
//utils
import TD from './class/utils/TokenDecrypter';

Vue.use(VueLodash, {name : 'lodash'});
Vue.prototype.moment = moment;
Vue.use(Viewer)

Vue.use(Vuetify, { theme: {
  primary: '#ffeb3b',
  secondary: '#2196F3',
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
Vue.use(VueAgile);
const veeValidateConfig = {
		  errorBagName: 'errors', // change if property conflicts
		  fieldsBagName: 'fields', 
		  delay: 1500, 
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
Vue.use(PortalVue)
Vue.config.productionTip = false
Vue.config.productionTip = false;
const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/home', component: Home},
    { path: '/account', component: Account},
    { path: '/mytrips', component:MyTrips},
    { path: '/manageUsers', component:ManageUsers},
    { path: '/alerte', component:Alerte},
    { path: '/manager', component: Manager},
    { path: '/tripDetail/:reservationId', component: TripDetail},
    { path: '/cgv', component: CGV},   
	{ path: '/cgu', component: CGU},
    { path: '/plansite', component: PlanSite},
    { path: '/contact', component: Contact},
    { path: '/mentionlegale', component: MentionLegale},
    { path: '/discover', component: Discover},
    { path: '/About', component: about},
    { path: '/realEstate/home', component: RealEstate},
    { path: '/realEstate/new', component: NewRealEstate},
    { path: '/realEstate/new/:accomodationId', component: NewRealEstate},
    { path: '/realEstate/edit/:accomodationId', component: NewRealEstate},
	{ path: '/realEstate/detail', component: RealEstateDetail},
	{ path: '/messages', component: Messages},
	{ path: '/notifications', component: Notifications},
	{ path: '/admin/inputs', component: Inputs},
	{ path: '/admin/health-check', component: HealthCheck},
  ],
  mode: 'history'
});
const store = new Vuex.Store({
  state: {
	  user : Vue.ls.get("user"),
	  snackbar : "",
  },
  mutations: {
	  snackbar(state, text) {
		state.snackbar = new String(text);  
	  },
	  onSetToken(state, token) {
		  Vue.ls.set("token", token);
		  // On définit les headers
		  Vue.http.headers.common['Authorization'] = 'Bearer ' + token;
	  },
	  onSetUser(state, user) {
		  Vue.ls.set("user", user);
		  state.user = user;
	  },
  },
});
import translationsEn from './resources/translations/translation_en';
import translationsFr from './resources/translations/translation_fr';
Vue.use(vuexI18n.plugin, store);
Vue.i18n.add('fr', translationsFr);
Vue.i18n.add('en', translationsEn);
Vue.i18n.set('fr');
// Vue.http.options.root = 'http://46.226.111.181:4040/api/';

//saisir ici l'ip v4 du pc si jamais on veut se servir de l'api sur le même réseau
//Vue.http.options.root = 'http://192.168.1.16:4040/api/';
Vue.http.options.root = 'http://localhost:4040/api/';
Vue.http.options.rejectUnauthorized = false;
Vue.http.headers.common['Authorization'] = 'Bearer ' + Vue.ls.get("token");


GoogleMapsLoader.KEY = 'AIzaSyCQcQLvoNyLPv5XDt4mBW-kizJHd-_Vxf4';
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