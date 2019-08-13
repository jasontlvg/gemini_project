const x= require('./scss/resultados.scss');
const y= require('./js/bootstrap');
const z= require('popper.js');
// const w= require('./js/script.js');
const o= require('chart.js');

window.raiz='./';
// window.raiz='http://geminigold.com/admin/';

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

const hola= require('./img/exia.jpg');

import Vue from 'vue';
import App from './components/App.vue';

new Vue({
    render: h => h(App)
}).$mount('#app');


