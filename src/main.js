import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './Store/store'
import './registerServiceWorker'
import AppDate from './components/AppDate'
import VueSpinners from 'vue-spinners'


import firebase from 'firebase'

Vue.component('AppDate', AppDate)

Vue.use(VueSpinners)

const config = {
  apiKey: "AIzaSyCDjgIupXGSmKFfDev00wm-mHRbxCw82gs",
  authDomain: "chsvkforum.firebaseapp.com",
  databaseURL: "https://chsvkforum.firebaseio.com",
  projectId: "chsvkforum",
  storageBucket: "chsvkforum.appspot.com",
  messagingSenderId: "236067532231"
};
firebase.initializeApp(config);

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged((user)=>{
  if(user){
    store.dispatch('fetchAuthUser')
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
